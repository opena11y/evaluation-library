/* domCache.js */

/* Imports */
import DOMElement    from './domElement.js';
import DOMText       from './domText.js';
import StructureInfo from './structureInfo.js';
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
 * @class parentInfo
 *
 * @desc Contains reference to ancestor objects in the DOMCache
 *
 * @param  {Object}  info - Parent ParentInfo object
 */


class parentInfo {
  constructor (info) {
    if (info) {
      this.domElement = info.domElement;
      this.landmarkElement = info.landmrkElement;
      this.controlElement = info.controlElement;
    } else {
      this.domElement = null;
      this.landmarkElement = null;
      this.controlElement = null;
    }
  }
}

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
    this.structureInfo = new StructureInfo();
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
   * @param {Object}  parentinfo  - Parent DomElement associated with the
   *                                      parent element node of the starting node  
   * @param {Object}  startingNode      - The dom element to start transversing the
   *                                      dom
   */

  transverseDOM(parentInfo, startingNode) {
    let domItem = null;
    let isLastDomText = false;  // used for combining ajacent dom text nodes
    parentInfo = new ParentInfo(parentInfo);
    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          // Combine text nodes if siblings
          if (isLastDomText) {
            domItem.addTextNode(node);
          } else {
            domItem = new DOMText(parentInfo, node)
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
                  this.transverseDOM(parentInfo, assignedNode);
                });
              }
            } else {
              domItem = new DOMElement(parentInfo, node);
              parentInfo.parentDomElement.addChild(domItem);
              parentInfo.domElement = domItem;

              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  this.transverseDOM(parentInfo, node.shadowRoot);
                }
              } else {
                if ((tagName === 'frame') || (tagName === 'iframe')) {
                  if (node.contentWindow.document) {
                    this.transverseDOM(parentInfo, node.contentWindow.document);
                  }
                } else {
                  this.transverseDOM(parentInfo, node);
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
