/* domCache.js */

/* Imports */
import DOMElement  from './domElement.js';
import DOMText     from './domText.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('domCache', false);


const skipableElements = [
  'base',
  'link',
  'noscript',
  'object',
  'script',
  'style',
  'template',
  'content',
  'shadow'
]

/**
 * @class DOMCache
 *
 * @desc Builds a cache of the dom from the startingNode and computes
 *       information useful for accessibility rules
 *       The dom cache is passed into rules for computing evaluation
 *       results
 *
 * @param  {Object}  startingNode - Browser document object model (DOM) to build cache
 */

export default class DOMCache {
  constructor (startingNode) {
  	this.domCache = new DOMElement(null, startingNode);
    this.transverseDOM(this.domCache, startingNode);
  }

  // Tests if a tag name can be skipped
  isSkipable(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustomElement(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  /**
   * @method transverseDOM
   *
   * @desc Used to collect accessibility information for all the element nd text
   *       nodes on a web page for use the the rules.  It pre-computes values
   *       that are used by the accessibility rules to test accessibility 
   *       requirements 
   *
   * @param {Object}  parentDomElement  - Parent DomElement associated with the
   *                                      parent element node of the starting node  
   * @param {Object}  startingNode      - The dom element to start transversing the
   *                                      dom
   */

  transverseDOM(parentDomElement, startingNode) {
    let domItem = null;
    let isLastDomText = false;  // used for combining ajacent dom text nodes
    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          // Combine text nodes if siblings
          if (isLastDomText) {
            domItem.addTextNode(node);
          } else {
            domItem = new DOMText(parentDomElement, node)
            if (domItem.hasContent) {
              parentDomElement.addChild(domItem);            
              isLastDomText = true;
            } 
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();
          if (!this.isSkipable(tagName)) {
            if (tagName === 'slot') {
              let assignedNodes = node.assignedNodes();
              // if no slotted elements, check for default slotted content
              assignedNodes = assignedNodes.length ? assignedNodes : node.assignedNodes({ flatten: true });
              if (assignedNodes.length) {
                assignedNodes.forEach( assignedNode => {
                  this.transverseDOM(parentDomElement, assignedNode);
                });
              }
            } else {
              domItem = new DOMElement(parentDomElement, node);
              parentDomElement.addChild(domItem);

              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  this.transverseDOM(domItem, node.shadowRoot);
                }
              } else {
                if ((tagName === 'frame') || (tagName === 'iframe')) {
                  if (node.contentWindow.document) {
                    this.transverseDOM(domItem, node.contentWindow.document);
                  }
                } else {
                  this.transverseDOM(domItem, node);
                }
              }
            }
          }   
          isLastDomText = false;
          break;

        default:
          break;  

      } /* end switch */
    } /* end for */
  }


}
