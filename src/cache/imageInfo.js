/* imageInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('imageInfo', true);

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
};

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
};


/**
 * @class ImageInfo
 *
 * @desc Collects information on the landmarks or headings on a web page for use in
 *       rules
 */

export default class ImageInfo {
  constructor () {
    this.allImageElements  = [];
    this.allSVGDomElements    = [];
    this.allMapElements       = []
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
   * @method isImage
   *
   * @desc Tests if a domElement for role of "img"
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isImage (domElement) {
    return (domElement.tagName === 'img') || 
           (domElement.role === 'img');
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
   * @param  {Object}  parentMapElement  - current ancestor MapElement object
   * @param  {Object}  domElement        - DOMElement object representing an element in the DOM
   *
   * @return {Object}  Last MapElement object
   */

  update (parentMapElement, domElement) {
    let currentMapElement = parentMapElement;

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

    return currentMapElement;
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
        debug.log(`[    name]: ${ie.domElement.accName.name}`);
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
};


