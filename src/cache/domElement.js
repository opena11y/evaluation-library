/* domElement.js */

/* Imports */
import ColorContrast     from './colorContrast.js';
import Visibility        from './visibility.js';
import DebugLogging      from '../debug.js';
import AriaValidation    from '../aria/ariaValidation.js';
import getAriaInHTMLInfo from '../aria-in-html/ariaInHtml.js';
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
    const role = elementNode.role;

    this.parentInfo       = parentInfo; 
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();

    this.ariaInHTMLInfo   = getAriaInHTMLInfo(elementNode);
    this.role             = role ? role : this.ariaInHTMLInfo.defaultRole;
    this.ariaValidation   = new AriaValidation(this.role, elementNode);

    this.accName           = getAccessibleName(elementNode);
    this.accDescription    = getAccessibleDesc(elementNode);
    this.errMessage        = getErrMessage(elementNode);

    debug.flag && debug.log(`[       tagName]: ${this.tagName} (${this.role})`, 1);
    debug.flag && this.accName && debug.log(`[       aacName]: ${this.accName.name} (${this.accName.source})`);
    debug.flag && this.accDescription && debug.log(`[aacDescription]: ${this.accDescription.name} (${this.accDescription.source})`);
    debug.flag && this.errMessage && debug.log(`[    errMessage]: ${this.errMessage.name} (${this.errMessage.source})`);

    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];
  }

  get isDomText () {
    return false;
  }

  get isLastChildDomText () {
    let flag = false;
    const lastChild = this.getLastChild();
    if (lastChild && lastChild.isDomText) {
      flag = true;
    }
    return flag;
  }

  addChild (domItem) {
    this.children.push(domItem);
  }

  getLastChild () {
    let len = this.children.length;
    let domItem = null;
    if (len) {
      domItem = this.children[len-1]
    }
    return domItem;
  }

  getAriaInHTMLInfo (node) {
    let role = 'generic';
    return role;
  }


  addTextToLastChild (text) {
    const domItem = this.getLastChild();
    if (domItem && domItem.isDomText) {
      domItem.addText(text);
    }
  }

 }
