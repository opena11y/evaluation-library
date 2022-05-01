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
  'content',
  'link',
  'meta',
  'noscript',
  'object',
  'script',
  'style',
  'template',
  'shadow',
  'title'
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

    this.ordinalPosition = 2;

    this.allDomElements = [];
    this.allDomTexts    = [];


    const parentInfo = new ParentInfo();
    parentInfo.document = startingDoc;

    this.structureInfo = new StructureInfo();
  	this.domCache = new DOMElement(parentInfo, startingElement, 1);
    parentInfo.domElement = this.domCache;
    this.allDomElements.push(this.domCache);

    this.transverseDOM(parentInfo, startingElement);

    // Debug features
    if (debug.flag) {
      this.showDomElementTree();
      this.structureInfo.showStructureInfo();
    }
  }

  // Tests if a tag name can be skipped
  isSkipableElement(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustomElement(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  // Tests if a node is a iframe element
  isIFrameElement(node) {
    return (node instanceof HTMLIFrameElement);
  }

  // Tests if a node is a slot element
  isSlotElement(node) {
    return (node instanceof HTMLSlotElement);
  }

  /**
   * @method transverseDOM
   *
   * @desc Used to collect accessibility information for all the element nd text
   *       nodes on a web page for use the the rules.  It pre-computes values
   *       that are used by the accessibility rules to test accessibility 
   *       requirements 
   *
   * @param {Object}  parentinfo      - Parent DomElement associated with the
   *                                    parent element node of the starting node
   * @param {Object}  startingNode    - The dom element to start transversing the
   *                                    dom
   */

  transverseDOM(parentInfo, startingNode) {
    let domItem = null;
    let parentDomElement = parentInfo.domElement;

    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          domItem = new DOMText(parentDomElement, node);
          // Check to see if text node has any renderable content
          if (domItem.hasContent) {
            // Merge text nodes in to a single DomText node if sibling text nodes
            if (parentDomElement) {
              // if last child node of parent is a DomText node merge text content
              if (parentDomElement.isLastChildDomText) {
                parentDomElement.addTextToLastChild(domItem.text);
              } else {
                parentDomElement.addChild(domItem);
                this.allDomTexts.push(domItem);
              }
            }
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();

          if (!this.isSkipableElement(tagName)) {
            // check for slotted content
            if (this.isSlotElement(node)) {
                // if no slotted elements, check for default slotted content
              const assignedNodes = node.assignedNodes().length ?
                                    node.assignedNodes() :
                                    node.assignedNodes({ flatten: true });
              assignedNodes.forEach( assignedNode => {
                this.transverseDOM(parentInfo, assignedNode);
              });
            } else {
              domItem = new DOMElement(parentInfo, node, this.ordinalPosition);
              this.ordinalPosition += 1;
              this.allDomElements.push(domItem);

              if (parentDomElement) {
                parentDomElement.addChild(domItem);
              }
              const newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);

              // check for custom elements
              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  newParentInfo.document = node.shadowRoot;
                  this.transverseDOM(newParentInfo, node.shadowRoot);
                }
              } else {
                // Check for iframe or frame tag
                if (this.isIFrameElement(node)) {
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


  /**
   * @method updateDOMElementInformation
   *
   * @desc  Updates page level collections of elements for landmarks, headings and controls
   *
   * @param {Object}  parentinfo  - Parent DomElement associated DOMElement
   * @param {Object}  domElement  - The dom element to start transversing the
   *                                      dom
   *
   * @returns {Object} ParentInfo  - updated ParentInfo object for use in the transversal
   */

  updateDOMElementInformation (parentInfo, domElement) {
    const landmarkElement = parentInfo.landmarkElement;
    let newParentInfo = new ParentInfo(parentInfo);
    newParentInfo.domElement = domElement;

    newParentInfo.landmarkElement = this.structureInfo.update(landmarkElement, domElement);

    return newParentInfo;
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */
  showDomElementTree () {
    debug.log(' === AllDomElements ===', true);
    this.allDomElements.forEach( de => {
      debug.domElement(de);
    });

    debug.log(' === AllDomTexts ===', true);
    this.allDomTexts.forEach( dt => {
      debug.domText(dt);
    });

    debug.log(' === DOMCache Tree ===', true);
    debug.domElement(this.domCache);
    this.domCache.showDomElementTree(' ');
  }

}
