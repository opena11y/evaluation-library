/* domElement.js */

/* Imports */
import ColorContrast  from './colorContrast.js';
import Visibility     from './visibility.js';
import DebugLogging   from '../debug.js';
// import ariaInHTML     from '../aria/ariaInHtml.js';

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
  constructor (parentInfo, elementNode) {

    let parentDomElement = null;

    if (parentInfo) {
      parentDomElement = parentInfo.domElement;
      if (parentDomElement) {
        parentDomElement.addChild(this);
      }
    }

    this.parentInfo       = parentInfo; 
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();
    this.role             = this.node.role;
//    this.ariaInHTMLInfo   = getAriaInHTMLInfo(elementNode, parentInfo);
    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];

    debug.flag && debug.tag(elementNode);
  }

  get isDomText () {
    return false;
  }

  get isLastChildText () {
    return true;
  }

  addChild (domItem) {
    this.children.push(domItem);
  }

  getAriaInHTMLInfo (node) {
    let role = 'generic';
    return role;
  }

  getLastChild () {
    let len = this.children.length;
    let domItem = null;
    if (len) {
      domItem = this.children[len-1]
    }
    return domItem;
  }

  addTextToLastChild (text) {
    const domItem = this.getLastChild();
    if (domItem && domItem.isDomText) {
      domItem.addText(text);
    }
  }

}
