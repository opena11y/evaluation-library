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
} from '../utils/utils.js'
import {
  getAccessibleName,
  getAccessibleDesc,
  getErrMessage,
  getGroupingLabels,
  nameFromNativeSemantics
} from '../utils/getaccname.js';

/* Constants */
const debug = new DebugLogging('DOMElement', true);

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
  constructor (parentInfo, elementNode) {
    const parentDomElement = parentInfo.domElement;
    const doc              = parentInfo.document;

    this.ariaInHTMLInfo  = getAriaInHTMLInfo(elementNode);
    const defaultRole    = this.ariaInHTMLInfo.defaultRole;
    const role           = elementNode.getAttribute('role');

    this.parentInfo       = parentInfo; 
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();

    this.hasNativeCheckedState  = hasCheckedState(elementNode);
    this.hasNativeInvalidState  = hasInvalidState(elementNode);

    this.ariaInHTMLInfo   = getAriaInHTMLInfo(elementNode);
    this.role             = role ? role : defaultRole;
    this.ariaValidation   = new AriaValidation(doc, this.role, defaultRole, elementNode);

    this.accName           = getAccessibleName(doc, elementNode);
    this.accDescription    = getAccessibleDesc(doc, elementNode);
    this.errMessage        = getErrMessage(doc, elementNode);

    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];
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
   * @method getAriaInHTMLInfo
   *
   * @desc
   *
   * @param {Object}  node  -
   */

  getAriaInHTMLInfo (node) {
    let role = 'generic';
    return role;
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
