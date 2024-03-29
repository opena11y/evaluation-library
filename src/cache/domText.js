/* domText.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('domText', false)

/**
 * @class DOMText
 *
 * @desc Used to represent a dom text node for use in computing information 
 *       usefule for accessibility rules.
 * 
 *       NOTE: Adjacent dom text nodes in the live dom are combined into a
 *             single DOMText object
 *
 * @param  {Object}  parentInfo - ParentInfo object 
 * @param  {Object}  textNode   - dom text node to be represented
 */

export default class DOMText {
  constructor (parentDomElement, textNode) {
    this.parentDomElement = parentDomElement;
    this.text = textNode.textContent.trim();
    if (debug.flag) {
      debug.log(`[text]: ${this.text}`)
    }
  }

  /**
   * @method getText
   *
   * @desc
   *
   * @return {String} Returns text content
   */

  get getText () {
    return this.text;
  }

  /**
   * @method isDomElement
   *
   * @desc Returns false since this is a DOMText object
   *
   * @return {Boolean} see @desc
   */

  get isDomElement () {
    return false;
  }  

  /**
   * @method isDomText
   *
   * @desc
   *
   * @return {Boolean} Returns true since this is a DOMText object
   */

  get isDomText () {
    return true;
  }

  /**
   * @method hasContent
   *
   * @desc
   *
   * @return {Boolean} Returns true if the DOMText has content, otherwise false
   */

  get hasContent () {
    return this.text.length;
  }

  addText (text) {
    const s = text.trim();
    if (s) {
      this.text += ' ' + s;
    }
  }
}
