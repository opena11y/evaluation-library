/* domDocument.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('domDocument', false)
debug.flag = false;

/**
 * @class DOMDocument
 *
 * @desc Used to represent a dom document node for use in computing information
 *       useful for accessibility rules.
 *
 * @param  {Object}  parentInfo - ParentInfo object 
 * @param  {Object}  doc        - Document object
 */

export default class DOMDocument {
  constructor (parentInfo, position, node, doc) {
    this.tagName = node && node.tagName ? node.tagName.toLowerCase() : 'root';
    this.title   = node && node.title   ? node.title : '';


    this.node =  node;
    this.position   = position;
    this.parentInfo = parentInfo;
    this.doc = doc;
    this._metaElems = [];

    const metas = doc && doc.documentElement ?
                     Array.from(doc.documentElement.querySelectorAll('head meta')) :
                     [];

    metas.forEach( (meta) => {
        const domMeta = new DOMMeta(this, meta);
        this._metaElems.push(domMeta);
    });

    // Information on rule results associated with this element
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];


  }


  /**
   * @method getBodyElement
   *
   * @desc Returns the DOM node to attach highlighting element for this DOM element
   *
   * @return {String} see description
   */

  getBodyElement () {
    return this.doc && this.doc.body ?
           this.doc.body :
           window.document.body;
   }

  /**
   * @method metaElems
   *
   * @desc
   *
   * @return {obj} Returns body element of document
   */

  getMetaItems () {
    return this._metaElems;
  }

  /**
   * @method getIndentifier
   *
   * @desc
   */

  getIdentifier () {
    return this.title ? `${this.tagName}: ${this.title}` : this.tagName;
  }

}

/**
 * @class DOMMeta
 *
 * @desc Used to represent a dom META element.
 *
 */

class DOMMeta {

  constructor (domDoc, metaElem) {
    this.domDoc = domDoc;
    this.node = metaElem;
    this.attrs = [];

  }

  /**
   * @method getBodyElement
   *
   * @desc Returns the DOM node to attach highlighting element for this DOM element
   *
   * @return {String} see description
   */

  getBodyElement () {
    return this.domDoc.getBodyElement();
  }

  /**
   * @method getIndentifier
   *
   * @desc
   */

  getIdentifier () {
    return 'meta';
  }

}
