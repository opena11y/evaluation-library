/* domText.js */

// Debug tools
const debug = true;
function debugConsole(s) {
  if (debug) {
    console.log('[DOMText]' + s);
  } 
}

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
      debugConsole('[text]' + this.text  + ' (' + this.text.length + ')');
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
    debugConsole('[addTextNode]: ' + s + ' (' + s.length + ')');
  }
}