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
 *       NOTE: Adjacent dom text node in the live dom are combined into a 
 *             single DOMText object
 *
 * @param  {Object}  parentInfo - ParentInfo object 
 * @param  {Object}  textNode   - dom text node to be represented
 */

export default class DOMText {
  constructor (parentInfo, textNode) {
    this.parentInfo = parentInfo;
    this.text = textNode.textContent.trim();

    if (this.hasContent) {
      if (parentInfo && parentInfo.domElement) {
        const domElement = parentInfo.domElement;
        if (domElement.isLastChildText) {
          domElement.addTextToLastChild(this.text);
        } else {
          domElement.addChild(this);
        }
      }
    } 
  }

  get isDomText () {
    return true;
  }

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