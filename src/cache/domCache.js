/* domCache.js */

/* Imports */
import ControlInfo      from './controlInfo.js';
import DOMElement       from './domElement.js';
import DOMText          from './domText.js';
import IFrameInfo       from './iframeInfo.js';
import IdInfo           from './idInfo.js';
import ImageInfo        from './imageInfo.js';
import LinkInfo         from './linkInfo.js';
import ListInfo         from './listInfo.js';
import MediaInfo         from './mediaInfo.js';
import StructureInfo    from './structureInfo.js';
import TableInfo        from './tableInfo.js';
import DebugLogging     from '../debug.js';

/* Constants */
const debug = new DebugLogging('domCache', false);
debug.flag = false;
debug.showDomTexts = false;
debug.showDomElems = false;
debug.showTree = false;

const skipableElements = [
  'base',
  'content',
  'input[type=hidden]',
  'link',
  'meta',
  'noscript',
  'script',
  'style',
  'template',
  'shadow',
  'title'
];

/**
 * @class ParentInfo
 *
 * @desc Contains reference to ancestor objects in the DOMCache
 *
 * @param  {Object}  info - Parent ParentInfo object
 */

class ParentInfo {
  constructor (info) {
    this.controlElement  = null;
    this.document        = null;
    this.parentDocument  = null;
    this.useParentDocForName = false;
    this.documentIndex   = 0;
    this.domElement      = null;
    this.landmarkElement = null;
    this.listElement     = null;
    this.mapElement      = null;
    this.mediaElement    = null;
    this.tableElement    = null;
    this.tableRowGroup   = null;

    if (info) {
      this.controlElement  = info.controlElement;
      this.document        = info.document;
      this.parentDocument  = info.parentDocument;
      this.useParentDocForName = info.useParentDocForName;
      this.documentIndex   = info.documentIndex;
      this.domElement      = info.domElement;
      this.landmarkElement = info.landmarkElement;
      this.listElement     = info.listElement;
      this.mapElement      = info.mapElement;
      this.mediaElement    = info.mediaElement;
      this.tableElement    = info.tableElement;
      this.tableRowGroup   = info.tableRowGroup;
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
    this.documentIndex = 0;

    this.allDomElements = [];
    this.allDomTexts    = [];

    const parentInfo = new ParentInfo();
    parentInfo.document        = startingDoc;
    parentInfo.accNameDocument = startingDoc;

    this.controlInfo   = new ControlInfo();
    this.idInfo        = new IdInfo();
    this.imageInfo     = new ImageInfo();
    this.linkInfo      = new LinkInfo();
    this.listInfo      = new ListInfo();
    this.mediaInfo      = new MediaInfo();
    this.structureInfo = new StructureInfo();
    this.tableInfo     = new TableInfo();
    this.iframeInfo    = new IFrameInfo();

    this.startingDomElement = new DOMElement(parentInfo, startingElement, 1);
    this.allDomElements.push(this.startingDomElement);

    // Information on rule results associated with page
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];

    this.transverseDOM(parentInfo, startingElement);
    this.computeAriaOwnsRefs();
    this.tableInfo.computeTableTypes();
    this.tableInfo.computeHeaders(this);
  }

  getDomElementById(id) {
    return this.allDomElements.find( de => de.id === id);
  }

  // Tests if a tag name can be skipped
  isSkipableElement(tagName, type) {
    const elemSelector = (tagName === 'input') && (typeof type === 'string') ? 
                         `${tagName}[type=${type}]` :
                         tagName;
    return skipableElements.includes(elemSelector);
  }

  // Tests if a tag name is a custom element
  isCustomElement(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  // Tests if a node is a iframe element
  isIFrameElement(tagName) {
    return tagName === 'iframe';
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
    let tagName, newParentInfo;
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
              parentDomElement.hasContent = true;
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
          tagName = node.tagName.toLowerCase();

          if (!this.isSkipableElement(tagName, node.getAttribute('type'))) {
            // check for slotted content
            if (this.isSlotElement(node)) {
              // if no slotted elements, check for default slotted content
              const isSlotContent = node.assignedNodes().length > 0;

              const assignedNodes = isSlotContent ?
                                    node.assignedNodes() :
                                    node.assignedNodes({ flatten: true });

              for (let i = 0; i < assignedNodes.length; i += 1) {
                const assignedNode = assignedNodes[i];
                if (assignedNode.nodeType === Node.TEXT_NODE) {
//                  debug.log(`[assignedNode][TEXT][${i} of ${assignedNodes.length}]: ${assignedNode.tagName}`);
/*                  domItem = new DOMText(parentDomElement, node);
                  // Check to see if text node has any renderable content
                  if (domItem.hasContent) {
                    // Merge text nodes in to a single DomText node if sibling text nodes
                    if (parentDomElement) {
                      parentDomElement.hasContent = true;
                      // if last child node of parent is a DomText node merge text content
                      if (parentDomElement.isLastChildDomText) {
                        parentDomElement.addTextToLastChild(domItem.text);
                      } else {
                        parentDomElement.addChild(domItem);
                        this.allDomTexts.push(domItem);
                      }
                    }
                  }
*/
                }

                if (assignedNode.nodeType === Node.ELEMENT_NODE) {
                  domItem = new DOMElement(parentInfo, assignedNode, this.ordinalPosition);

                  this.ordinalPosition += 1;
                  this.allDomElements.push(domItem);

                  if (parentDomElement) {
                    parentDomElement.addChild(domItem);
                  }

                  newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);
                  newParentInfo.useParentDocForName = isSlotContent;

                  this.transverseDOM(newParentInfo, assignedNode);
                }
              }
            } else {
              domItem = new DOMElement(parentInfo, node, this.ordinalPosition);
              this.ordinalPosition += 1;
              this.allDomElements.push(domItem);

              if (parentDomElement) {
                parentDomElement.addChild(domItem);
              }
              newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);

              // check for custom elements
              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  domItem.isShadowClosed = false;
                  newParentInfo.parentDocument  = newParentInfo.document;
                  newParentInfo.document        = node.shadowRoot;
                  this.documentIndex += 1;
                  newParentInfo.documentIndex = this.documentIndex;
                  this.transverseDOM(newParentInfo, node.shadowRoot);
                }
                else {
                  domItem.isShadowClosed = true;
                }
              } else {
                // Check for iframe tag
                if (this.isIFrameElement(tagName)) {
                  let isCrossDomain = false;
                  try {
                    const doc = node.contentDocument || node.contentWindow.document;
                    newParentInfo.document = doc;
                    this.documentIndex += 1;
                    newParentInfo.documentIndex = this.documentIndex;
                    this.transverseDOM(newParentInfo, doc);
                  } catch (error) {
                    isCrossDomain = true;
                  }                    
                  this.iframeInfo.update(domItem, isCrossDomain);
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
   * @param {Object}  parentInfo       - Parent DomElement associated DOMElement
   * @param {Object}  domElement       - The dom element to start transversing the dom
   *
   * @returns {Object} ParentInfo  - updated ParentInfo object for use in the transversal
   */

  updateDOMElementInformation (parentInfo, domElement) {
    const documentIndex   = parentInfo.documentIndex;

    const controlElement  = parentInfo.controlElement;
    const landmarkElement = parentInfo.landmarkElement;
    const listElement     = parentInfo.listElement;
    const mapElement      = parentInfo.mapElement;
    const mediaElement    = parentInfo.mediaElement;
    const tableElement    = parentInfo.tableElement;
    const tableRowGroup   = parentInfo.tableRowGroup;

    let newParentInfo = new ParentInfo(parentInfo);
    newParentInfo.domElement = domElement;

    newParentInfo.controlElement  = this.controlInfo.update(controlElement, domElement);
    newParentInfo.mapElement      = this.imageInfo.update(mapElement, domElement);
    this.idInfo.update(documentIndex, domElement);
    this.linkInfo.update(domElement);
    newParentInfo.listElement     = this.listInfo.update(listElement, domElement);
    newParentInfo.mediaElement    = this.mediaInfo.update(mediaElement, domElement);
    newParentInfo.landmarkElement = this.structureInfo.update(landmarkElement, domElement, documentIndex);
    [newParentInfo.tableElement, newParentInfo.tableRowGroup] = this.tableInfo.update(tableElement, tableRowGroup, domElement);
    return newParentInfo;
  }

  /**
   * @method computeAriaOwnsRefs
   *
   * @desc  If aria-owns is defined, identify parent child relationships
   */

  computeAriaOwnsRefs() {

    function addOwenedByRefToDescendants(ownerDomElement, domElement) {
      domElement.ariaInfo.ownedByDomElements.push(ownerDomElement);
      for (let i = 0; i < domElement.children.length; i += 1) {
        const child = domElement.children[i];
        if (child.isDomElement) {
          addOwenedByRefToDescendants(ownerDomElement, child);
        }
      }
    }

    for (let i = 0; i < this.allDomElements.length; i += 1) {
      const de = this.allDomElements[i];
      if (de.ariaInfo.hasAriaOwns) {
        for (let j = 0; j < de.ariaInfo.ariaOwnsIds.length; j += 1) {
          const id = de.ariaInfo.ariaOwnsIds[j];
          if (id) {
            const ode = this.getDomElementById(id);
            if (ode) {
              de.ariaInfo.ownedDomElements.push(ode);
              addOwenedByRefToDescendants(de, ode);
            }
          }
        }
      }
    }
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */

  showDomElementTree () {
    if (debug.flag) {
      if (debug.showDomElems) {
        debug.log(' === AllDomElements ===', true);
        this.allDomElements.forEach( de => {
          debug.domElement(de);
        });
      }

      if (debug.showDomTexts) {
        debug.log(' === AllDomTexts ===', true);
        this.allDomTexts.forEach( dt => {
          debug.domText(dt);
        });
      }

      if (debug.showTree) {
        debug.log(' === DOMCache Tree ===', true);
        debug.domElement(this.startingDomElement);
        this.startingDomElement.showDomElementTree(' ');
      }
    }
  }
}
