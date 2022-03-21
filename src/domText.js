/* domText.js */

// Debug constants
const debug = false;
const moduleName = 'domText';

// Imports
import {debugConsole, debugTag, debugSeparator}  from './debug.js';

/**
 * @class DOMText
 *
 * @desc Used to represent a dom text node for use in computing information 
 *       usefule for accessibility rules.
 * 
 *       NOTE: Adjacent dom text node in the live dom are combined into a 
 *             single DOMText object
 *
 * @param  {Object}  parentDomElement - Parent DOMElement object (is null for top level)
 * @param  {Object}  textNode         - dom text node to be represented
 */

export default class DOMText {
  constructor (parentDomElement, textNode) {
    this.parentDomElement = parentDomElement;
    this.text = textNode.textContent.trim();
    if (this.hasContent) {
      debugConsole(debug, moduleName, '[text]' + this.text  + ' (' + this.text.length + ')');
    }
  }

  get isDomText () {
    return true;
  }

  get hasContent () {
    return this.text.length;
  }

  addTextNode (textNode) {
    const s = textNode.textContent.trim();
    if (s) {
      this.text += ' ' + s;
    }
    debugConsole(debug, moduleName, '[addTextNode]: ' + s + ' (' + s.length + ')');
  }
}
