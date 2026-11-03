/* imageInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('imageInfo', false);

/**
 * @class ImageElement
 *
 * @desc Identifies a DOM element as an image or graphical object
 *
 * @param  {Object}  domElement   - Structural Information
 */

class ImageElement {
  constructor (domElement) {
    this.domElement = domElement;
    this.url = domElement.node.src ? new URL(domElement.node.src) : '';
    if (this.url) {
      const parts = this.url.pathname.split('/');
      this.fileName = parts.length ? parts.pop() : '';
    }
    else {
      this.fileName = '';
    }
  }

  addAreaDomElement (domElement) {
    this.areaDomElements.push(domElement);
  }

  toString () {
    return this.domElement.role;
  }
}

/**
 * @class MapElement
 *
 * @desc Identifies a DOM element as an image map
 *
 * @param  {Object}  domElement   - Structural Information
 */

class MapElement {
  constructor (domElement) {
    this.domElement = domElement;
    this.areaDomElements = [];
  }

  addAreaDomElement (domElement) {
    this.areaDomElements.push(domElement);
  }

  toString () {
    return this.domElement.role;
  }
}


/**
 * @class FigureElement
 *
 * @desc Identifies a DOM element as an figure element
 *
 * @param  {Object}  domElement   - Structural Information
 */

class FigureElement {
  constructor (domElement) {
    this.domElement = domElement;
    this.figcaptionDomElements = [];
  }

  addFigcaptionDomElement (domElement) {
    this.figcaptionDomElements.push(domElement);
  }

  toString () {
    return this.domElement.role;
  }
}

/**
 * @class ImageInfo
 *
 * @desc Collects information on the image elements on a web page for use in
 *       rules
 */

export default class ImageInfo {
  constructor () {
    this.allImageElements     = [];
    this.allSVGDomElements    = [];
    this.allMapElements       = [];
    this.allFigureElements    = [];
  }

  /**
   * @method addImageElement
   *
   * @desc Creates a new IamgeElement and to the array of
   *       ImageElements
   *
   * @param  {Object}  domElement -
   *
   */

  addImageElement (domElement) {
    const ie = new ImageElement(domElement);
    this.allImageElements.push(ie);
    return ie;
  }

  /**
   * @method addMapElement
   *
   * @desc Creates a new MapElement and to the array of
   *       MapElements
   *
   * @param  {Object}  domElement -
   *
   */

  addMapElement (domElement) {
    const me = new MapElement(domElement);
    this.allMapElements.push(me);
    return me;
  }

  /**
   * @method addFigureElement
   *
   * @desc Creates a new FigureElementto the array of
   *       FigureElements
   *
   * @param  {Object}  domElement -
   *
   */

  addFigureElement (domElement) {
    const fe = new FigureElement(domElement);
    this.allFigureElements.push(fe);
    return fe;
  }


  /**
   * @method isImage
   *
   * @desc Tests if a domElement for role of "img"
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isImage (domElement) {
    return (domElement.role === 'img') ||
           (domElement.role === 'image') || // Support in ARIA 1.3
           (domElement.tagName === 'img');
  }

  /**
   * @method isFigure
   *
   * @desc Tests if a domElement for role of "figure"
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isFigure (domElement) {
    return (domElement.role === 'figure') ||
           (domElement.tagName === 'figure');
  }

  /**
   * @method isFigcaption
   *
   * @desc Tests if a domElement for role of "figcaption"
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isFigcaption (domElement) {
    return (domElement.tagName === 'figcaption');
  }

  /**
   * @method isSVG
   *
   * @desc Tests if a domElement is an SVG graphic
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isSVG (domElement) {
    return domElement.tagName === 'svg';
  }

  /**
   * @method isMap
   *
   * @desc Tests if a domElement is an map element
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isMap (domElement) {
    return domElement.tagName === 'map';
  }

  /**
   * @method isArea
   *
   * @desc Tests if a domElement is an area element
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isArea (domElement) {
    return domElement.tagName === 'area';
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement has a role of "img" or a graphical tag name
   *
   * @param  {Object}  parentMapElement     - current ancestor MapElement object
   * @param  {Object}  parentFigureElement  - current ancestor FigureElement object
   * @param  {Object}  domElement           - DOMElement object representing an element in the DOM
   *
   * @return {Object}  Last MapElement object
   */

  update (parentMapElement, parentFigureElement, domElement) {
    let currentMapElement = parentMapElement;
    let currentFigureElement = parentFigureElement;

    if (this.isImage(domElement)) {
      this.addImageElement(domElement);
    }

   if (this.isSVG(domElement)) {
      this.allSVGDomElements.push(domElement);
    }

    if (this.isMap(domElement)) {
      currentMapElement = this.addMapElement(domElement);
    }

    if (this.isArea(domElement)) {
      if (parentMapElement) {
        parentMapElement.addAreaDomElement(domElement);
      }
    }

    if (this.isFigure(domElement)) {
      currentFigureElement = this.addFigureElement(domElement);
    }

    if (this.isFigcaption(domElement)) {
      if (parentFigureElement) {
        parentFigureElement.addFigcaptionDomElement(domElement);
      }
    }


    return [currentMapElement, currentFigureElement];
  }

  /**
   * @method showImageInfo
   *
   * @desc showImageInfo is used for debugging the ImageInfo, ImageElement and MapElement objects
   */

  showImageInfo () {
    if (debug.flag) {
      debug.log('== All Image elements ==', 1);
      this.allImageElements.forEach( ie => {
        debug.log(`[fileName]: ${ie.fileName}`, true);
        debug.log(`[    role]: ${ie.domElement.role}`);
        debug.log(`[    name]: ${ie.domElement.accName.name}`);
        debug.log(`[  source]: ${ie.domElement.accName.source}`);
        debug.log(`[  length]: ${ie.domElement.accName.name.length}`);
      });
      debug.log('== All SVG domElements  ==', 1);
      this.allSVGDomElements.forEach( de => {
        debug.domElement(de);
      });
      debug.log('== All MapElements ==', 1);
      this.allMapElements.forEach( me => {
        debug.domElement(me.domElement);
      });
    }
  }
}


