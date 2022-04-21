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
 * @class ParentInfo
 *
 * @desc Contains reference to ancestor objects in the DOMCache
 *
 * @param  {Object}  info - Parent ParentInfo object
 */


class ParentInfo {
  constructor (info) {
    this.document = null;
    this.domElement = null;
    this.landmarkElement = null;
    this.controlElement = null;

    if (info) {
      this.document = info.document;
      this.domElement = info.domElement;
      this.landmarkElement = info.landmarkElement;
      this.controlElement = info.controlElement;
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
 * @param  {Object}  startingDoc     - Browser document object model (DOM) to build cache
 * @param  {Object}  startingElement - DOM node to start evalution, if not defined use
 *                                     document.body
 */

export default class DOMCache {
  constructor (startingDoc, startingElement) {
    if (typeof startingElement !== 'object') {
      startingElement = startingDoc.body;
    }
    const parentInfo = new ParentInfo();
    parentInfo.document = startingDoc;

    this.structureInfo = new StructureInfo();
  	this.domCache = new DOMElement(parentInfo, startingElement);

    this.transverseDOM(parentInfo, startingElement);
  }

  // Tests if a tag name can be skipped
  isSkipable(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustom(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  // Tests if a tag name is an iframe or frame
  isIFrame(tagName) {
    return tagName === 'iframe' || tagName === 'frame';
  }

  // Tests if a tag name is a slot
  isSlotted(tagName) {
    return tagName  === 'slot';
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
    let parentDomElement = parentInfo.domElement;

    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          domItem = new DOMText(parentInfo, node);
          debug.flag && debug.log('[text]: ' + domItem.getText);
          // Check to see if text node has any renderable content
          if (domItem.hasContent) {
            // Merge text nodes in to a single DomText node if sibling text nodes
            if (parentDomElement) {
              // if last child node of parent is a DomText node merge text content
              if (parentDomElement.isLastChildDomText) {
                parentDomElement.addTextToLastChild(domItem.text);
              } else {
                parentDomElement.addChild(domItem);
              }
            }
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();
          debug.flag && debug.log('[tagName]: ' + tagName);

          if (!this.isSkipable(tagName)) {
            // check for slotted content
            if (this.isSlotted(tagName)) {
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
              if (parentDomElement) {
                parentDomElement.addChild(domItem);
              }
              const newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);

              // check for custom elements
              if (this.isCustom(tagName)) {
                if (node.shadowRoot) {
                  newParentInfo.document = node.shadowRoot;
                  this.transverseDOM(newParentInfo, node.shadowRoot);
                }
              } else {
                // Check for iframe or frame tag
                if (this.isIFrame(tagName)) {
                  if (node.contentWindow.document) {
                    newParentInfo.document = node.contentWindow.document;
                    this.transverseDOM(newParentInfo, node.contentWindow.document);
                  }
                } else {
                  this.transverseDOM(newParentInfo, node);
                }
              }
            }
          }   
          break;

        default:
          break;  

      } /* end switch */
    } /* end for */
  }

  updateDOMElementInformation (parentInfo, domElement) {
    const landmarkElement = parentInfo.landmarkElement;
    let newParentInfo = new ParentInfo(parentInfo);
    newParentInfo.domElement = domElement;

    newParentInfo.landmarkElement = this.structureInfo.update(landmarkElement, domElement);

    return newParentInfo;
  }

}
