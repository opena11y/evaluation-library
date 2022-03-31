/* domElement.js */

/* Imports */
import ColorContrast  from './colorContrast.js';
import Visibility     from './visibility.js';
import DebugLogging   from '../debug.js';
import ariaInHTML     from '../aria/ariaInHtml.js';

/* Constants */
const debug = new DebugLogging('DOMElement', false);

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}  parentDomElement - Parent DOMElement object (is null for top level)
 * @param  {Object}  elementNode      - dom element node to be represented
 * @param  {Object}  parentInfo       - Object with references to special parent objects
 */

export default class DOMElement {
  constructor (parentDomElement, elementNode, parentInfo) {
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();
    this.role             = this.node.role;
    this.ariaInHTMLInfo   = getAriaInHTMLInfo(elementNode, parentInfo);
    this.parentDomElement = parentDomElement; 
    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];

    debug.flag && debug.tag(elementNode);
  }

  get isDomText () {
    return false;
  }

  addChild (domItem) {
    this.children.push(domItem);
  }

  getAriaInHTMLInfo (node) {
    let role = 'generic';
    if (ariaInHTML)
    return role;
  }
}
