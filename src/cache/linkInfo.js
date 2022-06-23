/* linkInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('linkInfo', false);

/**
 * @class LinkInfo
 *
 * @desc Collects information on the links in a web page
 */

export default class LinkInfo {
  constructor () {
    this.allLinkDomElements = [];
  }

  /**
   * @method isLink
   *
   * @desc Tests if a domElement for role of "link"
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isLink (domElement) {
    return domElement.role === 'link';
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement has a role of "link"
   *
   * @param  {Object}  domElement        - DOMElement object representing an element in the DOM
   */

  update (domElement) {
    if (this.isLink(domElement)) {
      this.allLinkDomElements.push(domElement);
    }
  }

  /**
   * @method showLinkInfo
   *
   * @desc showLinkInfo is used for debugging the LinkInfo object
   */

  showLinkInfo () {
    if (debug.flag) {
      debug.log('== All Links ==', 1);
      this.allLinkDomElements.forEach( de => {
        debug.domElement(de);
      });
    }
  }
}


