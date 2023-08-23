/* timingInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('TimingInfo', false);

/**
 * @class TimingInfo
 *
 * @desc Collects information on the elements with possible animations on a web page
 *       for use in rules
 */

export default class TimingInfo {
  constructor () {
    this.allTimingElements  = [];
  }

  /**
   * @method isTimingElement
   *
   * @desc Tests if a domElement for being a possible element with visual animations
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isTimingElement (domElement) {
    return (domElement.tagName === 'canvas') ||
           (domElement.tagName === 'embed') ||
           (domElement.tagName === 'img') ||
           (domElement.tagName === 'object') ||
           (domElement.tagName === 'svg');
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement could be an animation, if so save reference
   *
   * @param  {Object}  domElement        - DOMElement object representing an element in the DOM
   */

  update (domElement) {
    if (this.isTimingElement(domElement)) {
      this.allTimingElements.push(domElement);
    }
  }

  /**
   * @method showImageInfo
   *
   * @desc showImageInfo is used for debugging the ImageInfo, ImageElement and MapElement objects
   */

  showTimingInfo () {
    if (debug.flag) {
      debug.log('== All Timing elements ==', 1);
      this.allTimingElements.forEach( de => {
        debug.log(`[fileName]: ${de.tagName}`, true);
      });
    }
  }
}


