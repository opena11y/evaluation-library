/* domElement.js */

/* Imports */
import AriaInfo          from './ariaInfo.js';
import ColorContrast     from './colorContrast.js';
import DebugLogging      from '../debug.js';
import EventInfo         from './eventInfo.js';
import getAriaInHTMLInfo from './ariaInHtml.js';
import Visibility        from './visibility.js';
import {
  hasInvalidState,
  hasCheckedState,
  hasSelectedState,
  isLabelable
} from '../utils.js'
import {
  getAccessibleName,
  getAccessibleDesc,
  getErrMessage
} from '../accName/getaccname.js';

/* Constants */
const debug = new DebugLogging('DOMElement', false);
debug.flag = false;

const elementsWithContent = [
  'area',
  'audio',
  'canvas',
  'img',
  'input',
  'select',
  'svg',
  'textarea',
  'video'
];

const elementsThatMayHaveContent = [
  'embed',
  'object'
];

const landmarkRoles = ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search'];
const requireAccessibleNames = ['region', 'form'];

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}   parentInfo       - ParentInfo object (can be null for top level)
 * @param  {Object}   elementNode      - dom element node to be represented
 * @param  {Number}   ordinalPosition  - Number indicating the ordinal position of the element
 *                                       in the DOM
 * @param  {String}   ariaVersion      - Version of ARIA to use for roles, props and state info
 * @param  {Boolean}  addDataId        - If true, add data attribute based on ordinal position
 *                                       in the DOM
 */

export default class DOMElement {
  constructor (parentInfo, elementNode, ordinalPosition, ariaVersion='ARIA12', addDataId) {
    const parentDomElement = parentInfo.domElement;
    const accNameDoc       = parentInfo.useParentDocForName ?
                             parentInfo.parentDocument :
                             parentInfo.document;

    this.ordinalPosition  = ordinalPosition;
    this.parentInfo       = parentInfo;
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();
    this.isLabelable      = isLabelable(elementNode);
    this.lang             = elementNode.hasAttribute('lang') ?
                            elementNode.getAttribute('lang') :
                            '';

    if (addDataId) {
      elementNode.setAttribute('data-opena11y-id', ordinalPosition);
    }

    this.ariaInHTMLInfo  = getAriaInHTMLInfo(elementNode);
    const defaultRole = this.ariaInHTMLInfo.defaultRole;

    this.hasRole = elementNode.hasAttribute('role');
    this.role    = this.hasRole ?
                   elementNode.getAttribute('role') :
                   defaultRole;

    this.roleDescription = elementNode.hasAttribute('aria-roledescription') ?
                              elementNode.getAttribute('aria-roledescription') :
                              '';

    this.accesskey = elementNode.hasAttribute('accesskey') ? elementNode.getAttribute('accesskey') : '';

    // used for button and form control related rules
    this.typeAttr = elementNode.getAttribute('type');

    this.hasNativeCheckedState  = hasCheckedState(elementNode);
    this.hasNativeInvalidState  = hasInvalidState(elementNode);
    this.hasNativeSelectedState = hasSelectedState(elementNode);

    this.ariaInfo  = new AriaInfo(accNameDoc, this.hasRole, this.role, defaultRole, elementNode, ariaVersion);
    this.eventInfo = new EventInfo(elementNode);

    this.isInert   = elementNode.hasAttribute('inert') ?
                     elementNode.inert :
                     parentInfo.isInert;

    this.tabIndex             = checkTabIndex(elementNode);
    this.isTabStop            = checkIsTabStop(elementNode);
    this.isInteractiveElement = checkForInteractiveElement(elementNode);

    this.accName        = getAccessibleName(accNameDoc, elementNode);
    this.accDescription = getAccessibleDesc(accNameDoc, elementNode, (this.accName.source !== 'title'));
    this.errMessage     = getErrMessage(accNameDoc, elementNode);


    this.colorContrast = new ColorContrast(parentDomElement, elementNode);
    this.visibility    = new Visibility(parentDomElement, elementNode);

    this.id         = elementNode.id        ? elementNode.id   : '';
    this.name       = elementNode.name      ? elementNode.name : '';
    this.className  = elementNode.className ? elementNode.className : '';
    this.htmlAttrs  = this.getHtmlAttrs(elementNode);
    this.ariaAttrs  = this.getAriaAttrs(elementNode);

    this.hasContent = elementsWithContent.includes(this.tagName);
    this.mayHaveContent = elementsThatMayHaveContent.includes(this.tagName);


    this.isLink      = this.role === 'link';
    this.isLandmark  = this.checkIsLandamrk();
    this.isHeading   = this.role === 'heading';
    this.isInDialog  = this.tagName === 'dialog' ||
                       this.role === 'dialog' ||
                       parentInfo.inDialog;

    // CSS Position property and size information

    const cssStyle = window.getComputedStyle(elementNode, null);
    const elemRect = elementNode.getBoundingClientRect();

    this.cssPosition = cssStyle.getPropertyValue('position');

    this.top      = window.scrollY + elemRect.top;
    this.left     = window.scrollX + elemRect.left;
    this.height   = Math.round(10 * elemRect.height, 1) / 10;
    this.width    = Math.round(10 * elemRect.width, 1) / 10;
    this.area     = this.height * this.width;

    this.authorWidth    = cssStyle.getPropertyValue('width');
    this.authorHeight   = cssStyle.getPropertyValue('height');
    this.authorLeft     = cssStyle.getPropertyValue('left');
    this.authorRight    = cssStyle.getPropertyValue('right');
    this.authorTop      = cssStyle.getPropertyValue('top');
    this.authorBottom   = cssStyle.getPropertyValue('bottom');
    this.authorDisplay  = cssStyle.getPropertyValue('display');
    this.authorPosition = cssStyle.getPropertyValue('position');

    this.authorSizing = (this.authorWidth  !== 'auto') ||
                        (this.authorHeight !== 'auto') ||
                        ((this.authorLeft   !== 'auto') &&
                         (this.authorRight  !== 'auto')) ||
                        ((this.authorTop    !== 'auto') &&
                         (this.authorBottom !== 'auto'));

    this.children = [];

    // Information on rule results associated with this element
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];

    // A name that can be used in rule results to identify the element
    this.elemName = this.tagName;
    this.elemName += elementNode.type ? `[type=${elementNode.type}]` : '';
    this.elemName += this.hasRole ? `[role=${this.role}]` : '';
    this.elemName += this.id ? `#${this.id}` : '';

    // Potential references to other cache objects

    this.tableCell = null;
    this.tableElement = null;
    this.ControlElement = null;

    if (parentInfo.tableCell &&
        this.isInteractiveElement) {
      parentInfo.tableCell.interactiveDomElements.push(this);
    }

  }


  /**
   * @method isDomText
   *
   * @desc
   *
   * @return {Boolean} Returns false since this is a DOMElement object
   */

  get isDomText () {
    return false;
  }


  /**
   * @method isDomElement
   *
   * @desc Returns true since this is a DOMElement object
   *
   * @return {Boolean} see @desc
   */

  get isDomElement () {
    return true;
  }

  /**
   * @method checkIsLandamrk
   *
   * @desc Returns true if the domElement has a landmark role, otherwise false
   *
   * @returns  {Boolean}  see @desc
   */

  checkIsLandamrk () {
    let flag = false;
    const role = this.role || this.defaultRole;
    const name = this.accName.name;

    if (landmarkRoles.includes(role)) {
      if (requireAccessibleNames.includes(role)) {
        flag = name && name.length;
      } else {
        flag = true;
      }
    }

    return flag;
  }

  /**
   * @method isLastChildDomText
   *
   * @desc
   *
   * @return {Boolean} Returns true if the last child is a DOMText object, otherwise false
   */

  get isLastChildDomText () {
    let flag = false;
    const lastChild = this.getLastChild();
    if (lastChild && lastChild.isDomText) {
      flag = true;
    }
    return flag;
  }

  /**
   * @method addChild
   *
   * @desc
   *
   * @param {Object}  domItem  -
   */

  addChild (domItem) {
    this.children.push(domItem);
  }

  /**
   * @method getIndentifier
   *
   * @desc
   */

  getIdentifier () {
    let identifier = this.node.hasAttribute('type') ?
                     `${this.tagName}[${this.node.getAttribute('type')}]` :
                     this.tagName;
    return identifier;
  }

  /**
   * @method getLastChild
   *
   * @desc
   */

  getLastChild () {
    let len = this.children.length;
    let domItem = null;
    if (len) {
      domItem = this.children[len-1]
    }
    return domItem;
  }

  /**
   * @method getHtmlAttrs
   *
   * @desc Get non-ARIA attributes for the element in a name value object
   *
   * @param {Object}  node  - DOM node element
   *
   * @param {Array} array of objects with attribute name and value properties
   */

  getHtmlAttrs (node) {
    const htmlAttrs = {};
    const attrs = Array.from(node.attributes);
    attrs.forEach( attr => {
      if (attr.name.toLowerCase().indexOf('aria') !== 0) {
        htmlAttrs[attr.name] = attr.value;
      }
    });
    return htmlAttrs;
  }

  /**
   * @method getAriaAttrs
   *
   * @desc Get ARIA attributes for the element in a name value object
   *
   * @param {Object}  node  - DOM node element
   *
   * @param {Array} array of objects with attribute name and value properties
   */

  getAriaAttrs (node) {
    const ariaAttrs = {};
    const attrs = Array.from(node.attributes);
    attrs.forEach( attr => {
      if (attr.name.toLowerCase().indexOf('aria') === 0) {
        ariaAttrs[attr.name] = attr.value;
      }
    });
    return ariaAttrs;
  }

  /**
   * @method addTextToLastChild
   *
   * @desc Adds the text content to an existing DOMText object
   *
   * @param {String}  text  - text content to add
   */

  addTextToLastChild (text) {
    const domItem = this.getLastChild();
    if (domItem && domItem.isDomText) {
      domItem.addText(text);
    }
  }

  /**
   * @method hasTextContent
   *
   * @desc Checks to see if the element contains any text content
   *
   * @return {Boolean} True it there are text nodes, otherwise false
   */

  hasTextContent () {

    function anyDOMText (domItems) {
      for (let i = 0; i < domItems.length; i += 1) {
        const domItem = domItems[i];
        if (domItem.isDomText) {
          return true;
        }
        else {
          if (anyDOMText (domItem.children)) {
            return true;
          }
        }
      }
      return false;
    }
    return anyDOMText(this.children);
  }


  toString () {
    let type = '';
    let id = '';

    if (this.node.type) {
      type = `[type=${this.node.type}]`;
    }

    if (this.node.id) {
      id = `[id=${this.node.id}]`;
    }

    return `(${this.ordinalPosition}): ${this.tagName}${type}${id}[${this.role}]`;
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */
  showDomElementTree (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    if (debug.flag) {
      this.children.forEach( domItem => {
        if (domItem.isDomText) {
          debug.domText(domItem, prefix);
        } else {
          debug.domElement(domItem, prefix);
          domItem.showDomElementTree(prefix + '   ');
        }
      });
    }
  }
}

// Helper functions

/**
 * @function checkForInteractiveElement
 *
 * @desc Returns true if the element is natively interactive
 *
 * @param  {Object}   node    - DOM node
 *
 * @return Returns true if the elements is interactive, otherwise false
 */

function checkForInteractiveElement (node) {
  const tagName     = node.tagName.toLowerCase();
  const hasHref     = node.hasAttribute('href');
  const hasControls = node.hasAttribute('controls');
  const type        = node.hasAttribute('type') ? node.getAttribute('type') : 'text';

  switch (tagName ) {
    case 'a':
    case 'area':
      return hasHref;

    case 'audio':
      return hasControls;

    case 'button':
      return true;

    case 'input':
      return type !== 'hidden';

    case 'output':
      return true;

    case 'select':
      return true;

    case 'textarea':
      return true;

    case 'video':
      return hasControls;

    default:
      break;

  }

  return false;
}


/**
 * @function checkIsTabStop
 *
 * @desc Returns true if the tabindex is defined and greater than or equal to zero,
 *       or the element's native semantics is an interactive element
 *
 * @param  {Object}  node - DOM node
 *
 * @return Returns true if the elements is a tab stop, otherwise false
 */

function checkIsTabStop (node) {
  return (node.tabIndex >= 0) || checkForInteractiveElement(node);
}

/**
 * @function checkTabIndex
 *
 * @desc Returns value of tabindex if it is defined
 *
 * @param  {Object}  node - DOM node
 *
 * @return see @desc
 */

function checkTabIndex (node) {
  if (node.tabIndex >= 0) {
    return node.tabIndex;
  }
  return node.hasAttribute('tabIndex') ? -1 : undefined;
}

