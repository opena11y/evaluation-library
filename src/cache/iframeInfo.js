/* iframeInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('iframeInfo', false);

/**
 * @class IFrameElement
 *
 * @desc Idenifies a DOM element as being an iframe.
 *
 * @param  {Object}  domElement   - dome element information
 */

class IFrameElement {
  constructor (domElement, isCrossDomain) {
    this.domElement = domElement;
    this.src = domElement.node.src;
    this.isCrossDomain = isCrossDomain;
  }

  showInfo () {
    if (debug.flag) {
      debug.log(`[          src]: ${this.src}`);
      debug.log(`[isCrossDomain]: ${this.isCrossDomain}`);
    }
  }
}

/**
 * @class IframeInfo
 *
 * @desc Collects information on the iframes in a web page
 */

export default class IframeInfo {
  constructor () {
    this.allIFrameElements = [];
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement has a role of "link"
   *
   * @param  {Object}  domElement        - DOMElement object representing an element in the DOM
   */

  update (domElement, isCrossDomain) {
    const ife = new IFrameElement(domElement, isCrossDomain);
    this.allIFrameElements.push(ife);
  }

  /**
   * @method showLinkInfo
   *
   * @desc showLinkInfo is used for debugging the LinkInfo object
   */

  showIFrameInfo () {
    if (debug.flag) {
      debug.log(`== ${this.allIFrameElements.length} IFrames ==`, 1);
      this.allIFrameElements.forEach( ife => {
        ife.showInfo();
      });
    }
  }
}


