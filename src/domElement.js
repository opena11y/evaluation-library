/* domElement.js */

// Debug constants
const debug = false;
const moduleName = 'domElement';

// Imports
import {debugMessage, debugTag, debugSeparator}  from './debug.js';
import ColorContrast  from './colorContrast.js';
import Visibility     from './visibility.js';

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}  parentDomElement - Parent DOMElement object (is null for top level)
 * @param  {Object}  elementNode      - dom element node to be represented
 */

export default class DOMElement {
  constructor (parentDomElement, elementNode) {
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();
    this.parentDomElement = parentDomElement; 
    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];
    debug && debugTag(moduleName, elementNode);
  }

  get isDomText () {
    return false;
  }

  addChild (domItem) {
    this.children.push(domItem);
  }
}
