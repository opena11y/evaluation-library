/* domElement.js */

/* Imports */
import ColorContrast     from './colorContrast.js';
import Visibility        from './visibility.js';
import DebugLogging      from '../debug.js';
import AriaValidation    from '../aria/ariaValidation.js';
import getAriaInHTMLInfo from '../aria-in-html/ariaInHtml.js';
import {
  hasInvalidState,
  hasCheckedState
} from '../utils.js'
import {
  getAccessibleName,
  getAccessibleDesc,
  getErrMessage,
  getGroupingLabels,
  nameFromNativeSemantics
} from '../accName/getaccname.js';

/* Constants */
const debug = new DebugLogging('DOMElement', false);

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}  parentInfo  - ParentInfo object (can be null for top level)
 * @param  {Object}  elementNode - dom element node to be represented
 */

export default class DOMElement {
  constructor (parentInfo, elementNode, ordinalPosition) {
    const parentDomElement = parentInfo.domElement;
    const doc              = parentInfo.document;

    this.ordinalPosition  = ordinalPosition;
    this.parentInfo       = parentInfo;
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();

    this.ariaInHTMLInfo  = getAriaInHTMLInfo(elementNode);
    const defaultRole = this.ariaInHTMLInfo.defaultRole;

    this.role         = elementNode.hasAttribute('role') ?
                        elementNode.getAttribute('role') :
                        defaultRole;

    this.hasNativeCheckedState  = hasCheckedState(elementNode);
    this.hasNativeInvalidState  = hasInvalidState(elementNode);

    this.ariaValidation   = new AriaValidation(doc, this.role, defaultRole, elementNode);

    this.accName           = getAccessibleName(doc, elementNode);
    this.accDescription    = getAccessibleDesc(doc, elementNode);
    this.errMessage        = getErrMessage(doc, elementNode);

    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);

    this.id         = elementNode.id        ? elementNode.id : '';
    this.className  = elementNode.className ? elementNode.className : '';
    this.htmlAttrs  = this.getHtmlAttrs(elementNode);
    this.ariaAttrs  = this.getAriaAttrs(elementNode);

    this.children = [];

    // Information on rule results associated with this element
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];
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
   * @desc
   *
   * @param {String}  text  -
   */

  addTextToLastChild (text) {
    const domItem = this.getLastChild();
    if (domItem && domItem.isDomText) {
      domItem.addText(text);
    }
  }

  toString () {
    let identifer = this.tagName;
    let type = '';
    let id = '';

    if (this.node.type) {
      type = `[type=${this.node.type}]`;
    }

    if (this.node.id) {
      id = `[id=${this.node.id}]`;
    }

    return `${this.tagName}${type}${id}[${this.role}]`;
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
