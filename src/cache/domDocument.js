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
  constructor (parentInfo, position, doc, domElem=null) {
    this.parentInfo = parentInfo;
    this.ordinalPosition = position;
    this.doc = doc;
    this.domElement = domElem;

    this.tagName = domElem && domElem.tagName ? domElem.tagName.toLowerCase() : 'root';
    this.title   = domElem && domElem.node.title   ? domElem.node.title : doc.title;

    this.hasRefresh = false;
    this.refreshTime = '';
    this.refreshURL = '';

    this.hasViewport = false;
    this.userScalable = '';
    this.maxScale = '';


    const metas = doc && doc.documentElement ?
                     Array.from(doc.querySelectorAll('head meta')) :
                     [];

    metas.forEach( (meta) => {
      // Page refesh
      const hasRefresh = meta.hasAttribute('http-equiv') &&
                         meta.getAttribute('http-equiv').toLowerCase() === 'refresh';
      const content    = meta.hasAttribute('content') ?
                         meta.getAttribute('content').split(';') :
                         '';

      const refreshTime = hasRefresh ? parseInt(content[0]) : '';

      const refreshURL  = hasRefresh &&
                          content.length > 1 &&
                          content[1].includes('=')
                          ? content[1].split('=')[1] : [];

      if (hasRefresh && !isNaN(refreshTime)) {
        this.hasRefresh   = true;
        this.refreshTime  = refreshTime;
        this.refreshURL   = refreshURL;
      }



      // View point scaling

      this.hasViewport  = meta.hasAttribute('name') &&
                           meta.getAttribute('name').toLowerCase() === 'viewport';
      this.userScalable = meta.hasAttribute('user-scalable') ?
                           meta.getAttribute('user-scalable').toLowerCase() != 'no':
                           true;
      this.maxScale     = meta.hasAttribute('maximum-scale') ?
                           parseFloat(meta.getAttribute('maximum-scale')) :
                           10.0;

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

  getIdentifier (name) {
    return this.tagName === 'root' ?  name : `${this.tagName}${this.title ? ':  ' + this.title : ''}`;
  }

}

