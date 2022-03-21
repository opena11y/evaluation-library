/* debug.js */

// Debug tools

function debugMessage(message, moduleName='debug') {
  console.log(`[${moduleName}]` + message);
}

function debugTag (node, moduleName) {
  if (node && node.tagName) {
    debugMessage(`[${node.tagName}]: ${node.textContent.trim().substring(0, 20).trim()}`, moduleName);
  }
}

function debugSeparator (moduleName) {
    debugMessage('-----------------------------', moduleName);
}

/* colorContrast.js */
const moduleName$2 = 'ColorContrast';

// Constants
const defaultFontSize = 16; // In pixels (px)
const fontWeightBold = 300; 

/**
 * @class ColorContrast
 *
 * @desc Identifies the text properties used to determine WCAG color contrast 
 *       requirements including computing the color contrast ratio based on 
 *       text and background colors
 *
 * @param  {Object}  parentDomElement - Parent DomElement containing ancestor style information
 * @param  {Object}  elementNode      - dom element node 
 */

class ColorContrast {
  constructor (parentDomElement, elementNode) {
    let parentComputedStyle = parentDomElement ? parentDomElement.computedStyle : false;
    let style = window.getComputedStyle(elementNode, null);

    this.opacity            = this.normalizeOpacity(style, parentComputedStyle);

    this.color              = style.getPropertyValue("color");
    this.colorHex           = this.RGBToHEX(this.color, this.opacity);
    this.backgroundColor    = this.normalizeBackgroundColor(style, parentComputedStyle);
    this.backgroundColorHex = this.RGBToHEX(this.backgroundColor);

    this.backgroundImage    = this.normalizeBackgroundImage(style, parentComputedStyle);
    this.backgroundRepeat   = style.getPropertyValue("background-repeat");
    this.backgroundPosition = style.getPropertyValue("background-position");

    this.fontFamily = style.getPropertyValue("font-family");
    this.fontSize   = this.normalizeFontSize(style, parentComputedStyle);
    this.fontWeight = this.normalizeFontWeight(style, parentComputedStyle);
    this.isLargeFont = this.getLargeFont(this.fontSize, this.fontWeight);

    const L1 = this.getLuminance(this.colorHex);
    const L2 = this.getLuminance(this.backgroundColorHex);
    this.colorContrastRatio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;

    {
      debugSeparator(moduleName$2);
      debugTag(elementNode, moduleName$2);
      debugMessage(`[      opacity]: ${this.opacity}`, moduleName$2);
      debugMessage(`[        color]: ${this.color}`, moduleName$2);
      debugMessage(`[     colorHex]: ${this.colorHex}`, moduleName$2);
      debugMessage(`[   background]: ${this.backgroundColor}`, moduleName$2);
      debugMessage(`[backgroundHex]: ${this.backgroundColorHex}`, moduleName$2);
      debugMessage(`\n[   fontFamily]: ${this.fontFamily}`, moduleName$2);
      debugMessage(`[     fontSize]: ${this.fontSize}`, moduleName$2);
      debugMessage(`[   fontWeight]: ${this.fontWeight}`, moduleName$2);
      debugMessage(`[  isLargeFont]: ${this.isLargeFont}`, moduleName$2);
      debugMessage(`\n[          ccr]: ${this.colorContrastRatio}`, moduleName$2);
    }
  }

  /**
   * @method normalizeOpacity
   *
   * @desc Normalizes opacity to a number 
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing the opacity
   */

  normalizeOpacity (style, parentComputedStyle) {
    let opacity = style.getPropertyValue("opacity");

    if (isNaN(opacity)) {
      opacity = opacity.toLowerCase();

      switch (opacity) {
        case 'inherit':
        case 'unset':
          opacity = parentComputedStyle.opacity;
          break;

        case 'initial':
        case 'revert':
          opacity = 1.0;
          break;

        default:
          if (opacity.indexOf('%')) {
            opacity = parseInt(opacity.split('%')[0]);
            if (isNaN(opacity)) {
              opacity = 1.0;
            } else {
              opacity = opacity / 100;
            }
          }
          else {
            opacity = parseFloat(opacity);
            if (isNaN(opacity)) {
              opacity = 1.0;
            }
          }
          break;
      }  // end switch
    }

    // Make sure opacity is between 0 and 1
    opacity = Math.max(Math.min(opacity, 1.0), 0.0);

    return opacity;
  }  

  /**
   * @method normalizeBackgroundColor
   *
   * @desc Normalizes background color
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {String}  Returns the background color
   */

  normalizeBackgroundColor (style, parentComputedStyle) {
    let backgroundColor = style.getPropertyValue("background-color");

    if ((backgroundColor.indexOf("0, 0, 0, 0") > 0) ||
        (backgroundColor == 'transparent') ||
        (backgroundColor == 'inherit')) {

      if (parentComputedStyle) {
        backgroundColor   = parentComputedStyle.backgroundCcolor;
      }
      else {
        // This is an edge case test typcially for body elements and frames
        backgroundColor = 'rgb(255,255,255)';
      }
    }
    return backgroundColor;
  }

  /**
   * @method normalizeBackgroundImage
   *
   * @desc Normalizes background image 
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {String}  Returns a reference to a background image URL or none
   */

  normalizeBackgroundImage (style, parentComputedStyle) {
    let backgroundImage = style.getPropertyValue("background-image").toLowerCase();

    if ((backgroundImage === 'inherit') ||
        (backgroundImage === 'none') ||
        (backgroundImage === '')) {
      if (parentComputedStyle) {
        backgroundImage = parentComputedStyle.backgroundImage;
      }
      else {
        backgroundImage = 'none';
      }
    }
    return backgroundImage;
  }

  /**
   * @method normalizeFontSize
   *
   * @desc Normalizes font size to a number 
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing font size value in pixels (px)
   */

  normalizeFontSize (style, parentComputedStyle) {
    let fontSize = style.getPropertyValue("font-size");
    if (isNaN(fontSize)) {
      if (fontSize.toLowerCase() == 'inherit') {
        if (parentComputedStyle) {
          fontSize = parentComputedStyle.fontSize;
        }
        else {
          fontSize = defaultFontSize;
        }
      } else {
        fontSize = parseInt(fontSize, 10);
        if (isNaN(fontSize)) {
          fontSize = defaultFontSize;
        }
      }
    } 
    return fontSize;
  }

  /**
   * @method normalizeFontWeight
   *
   * @desc Normalizes font weight to a number 
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing font weight value
   */

  normalizeFontWeight (style, parentComputedStyle) {
    let fontWeight = style.getPropertyValue("font-weight");

    if (isNaN(fontWeight)) {
      switch (fontWeight.toLowerCase()) {
      case 'bold':
        fontWeight = 700;
        break;

      case 'normal':
        fontWeight = 400;
        break;

      case 'inherit':
        if (parentComputedStyle) {
          fontWeight = parentComputedStyle.fontWeight;
        }
        else {
          fontWeight = 400;
        }
        break;

      case 'bolder':
        fontWeight = 700;
        break;

      default:
        fontWeight = 400;
        break;

      }
    }
    else {
      fontWeight = parseInt(fontWeight, 10);
    }    
    return fontWeight;
  }

  /**
   * @method getLuminance
   *
   * @desc Get the luminance value of a hex encoded color
   *
   * @param {String}  color    - Hex representation of a color value
   *
   * @return {Number}  Returns a number representing the limnance value
   */

  getLuminance (color) {

    // Get decimal values
    const R8bit = parseInt(color.substring(0,2),16);
    const G8bit = parseInt(color.substring(2,4),16);
    const B8bit = parseInt(color.substring(4,6),16);

    // Get sRGB values
    const RsRGB = R8bit/255;
    const GsRGB = G8bit/255;
    const BsRGB = B8bit/255;
    // Calculate luminance
    const R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow(((RsRGB + 0.055)/1.055), 2.4);
    const G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow(((GsRGB + 0.055)/1.055), 2.4);
    const B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow(((BsRGB + 0.055)/1.055), 2.4);

    return (0.2126 * R + 0.7152 * G + 0.0722 * B);

  }

  /**
  * @function RGBToHex
  *
  * @desc Converts an RGB color to Hex values
  *
  * @param {String} rgbColor  - RGB Color rgb(rr, gg, bb) or rgb(rr, gg, bb, aa)
  * @param {Number}  opacity  - A number between 0 and 1 representing CSS value
  *                             default value is 1.0
  *
  * @return  {String}  - Hex version of the RDB color 
  */

  RGBToHEX ( rgbColor, opacity=1.0 ) {

    // num is a string or a number representing a base 10 number
    function toHex(num) {
      let hex = Number(num).toString(16);
      if (hex.length == 1) {
        hex = "0" + hex;
      }
      return hex;
    }

    // if rgbNumber not defined return 0000000
    if (!rgbColor) {
      return "000000";
    }

    let hex = [];
    let value;
    let colorHex = "000000";
    let rgbParts = rgbColor.match(/[\d.]+/g);

    if (rgbParts && rgbParts.length) {

      switch (rgbParts.length) {
        case 3:
          // RGB values to HEX value
          rgbParts.forEach( rgbColor => {
            value = opacity * Math.round(parseFloat(rgbColor));
            hex.push(toHex(value));            
          });
          colorHex = hex.join('');
          break;

        case 4:
          // RGBA value to HEX valuye
          let A = parseFloat(rgbParts[3]);
          // remove A value from array
          rgbParts.pop();
          rgbParts.forEach( rgbColor => {
            value = opacity * A * Math.round(parseFloat(rgbColor));
            hex.push(toHex(value));            
          });
          colorHex = hex.join('');
          break;
      }
    }
   return colorHex;
  }

  /**
   * @method getLargeFont
   *
   * @desc Returns a boolean indiciating if the fontis considered large
   *
   * @param {Number}  fontSize    - Computed style object for an element node 
   * @param {Number}  fontWeight  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns true if considered a large font, otherwise fals
   */

  getLargeFont (fontSize, fontWeight) {
    let isSizeReallyBig = fontSize > (1.2 * defaultFontSize);
    let isSizeBig       = fontSize > defaultFontSize;
    let isBold          = fontWeight >= fontWeightBold;

    return isSizeReallyBig || (isSizeBig && isBold);
  }
}

/* colorContrast.js */

// Constants

/**
 * @class Visibility
 *
 * @desc Identifies the properties used to determine the visibility of the element
 *       for both the graphical rendering and assistive technologies
 *
 * @param  {Object}  parentDomElement - Parent DomElement containing ancestor style information
 * @param  {Object}  elementNode      - dom element node 
 */

class Visibility {
  constructor (parentDomElement, elementNode) {
    let parentComputedStyle = parentDomElement ? parentDomElement.computedStyle : false;
    let style = window.getComputedStyle(elementNode, null);
    let tagName = elementNode.tagName ? elementNode.tagName : '';

    this.isHidden           = this.normalizeHidden (elementNode, parentComputedStyle);
    this.isAriaHidden       = this.normalizeAriaHidden (elementNode, parentComputedStyle);
    this.isDisplayNone      = this.normalizeDisplay (style, parentComputedStyle);
    this.isVisibilityHidden = this.normalizeVisibility (style, parentComputedStyle);

    // Set default values for visibility
    this.isVisibleOnScreen = true;
    this.isVisibleToAT     = true; // AT -> Assistive Technology

    if (this.isHidden ||
        this.isDisplayNone ||
        this.isVisibilityHidden) {

      if (this.isHidden && (tagName !== 'area')) {
        this.isVisibleOnScreen = false;
        this.isVisibleToAt     = false;
      }
    }

    if (this.isAriaHidden) {
        this.isVisibleToAt = false;
    }
  }

  /**
   * @method normalizeHidden
   *
   * @desc Determine if the hidden attribute is set on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node                 - dom element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    hidden attribute 
   */

  normalizeHidden (node, parentComputedStyle) {
    let hidden = node.getAttribute('hidden');
    hidden = hidden ? true : false;
    if (parentComputedStyle && 
        parentComputedStyle.hidden)  {
      hidden = true;
    }
    return hidden;
  }

  /**
   * @method normalizeAriaHidden
   *
   * @desc Determine if the aria-hidden attribute is set to true on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node                 - dom element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    aria-hidden attribute set to true 
   */

  normalizeAriaHidden (node, parentComputedStyle) {
    let ariaHidden = node.getAttribute('aria-hidden');
    if (ariaHidden) {
      ariaHidden = ariaHidden.toLowerCase();
    }
    ariaHidden = (ariaHidden === 'true') ? true : false;

    if (parentComputedStyle && 
        parentComputedStyle.ariaHidden)  {
      ariaHidden = true;
    }
    return ariaHidden;
  }

  /**
   * @method normalizeDisplay
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS display property
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeDisplay (style, parentComputedStyle) {
    let display = style.getPropertyValue("display");
    let isDisplayNone = false;

    if ((display === 'none') || 
        (parentComputedStyle && parentComputedStyle.isDisplayNone)) {
      isDisplayNone = true;
    }

    return isDisplayNone;
  }

  /**
   * @method normalizeVisiibility
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS visibility property
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeVisibility (style, parentComputedStyle) {
    let visibility = style.getPropertyValue("visibility");
    let isVisibilityHidden = false; 

    if ((visibility === 'collapse') ||
        (visibility === 'hidden')) {
        isVisibilityHidden = true;
    }
    return isVisibilityHidden;
  }

}

/* domElement.js */
const moduleName$1 = 'domElement';

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}  parentDomElement - Parent DOMElement object (is null for top level)
 * @param  {Object}  elementNode      - dom element node to be represented
 */

class DOMElement {
  constructor (parentDomElement, elementNode) {
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();
    this.parentDomElement = parentDomElement; 
    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];
    debugTag(moduleName$1, elementNode);
  }

  get isDomText () {
    return false;
  }

  addChild (domItem) {
    this.children.push(domItem);
  }
}

/* domText.js */

// Debug constants
const debug = false;
const moduleName = 'domText';

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

class DOMText {
  constructor (parentDomElement, textNode) {
    this.parentDomElement = parentDomElement;
    this.text = textNode.textContent.trim();
    if (this.hasContent && debug) {
      debugMessage('[text]' + this.text  + ' (' + this.text.length + ')', moduleName);
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
  }
}

/* domCache.js */

/* Constants */

const skipableElements = [
  'base',
  'link',
  'noscript',
  'object',
  'script',
  'style',
  'template',
  'content',
  'shadow'
];

/**
 * @class DOMCache
 *
 * @desc Builds a cache of the dom from the startingNode and computes
 *       information useful for accessibility rules
 *       The dom cache is passed into rules for computing evaluation
 *       results
 *
 * @param  {Object}  startingNode - Browser document object model (DOM) to build cache
 */

class DOMCache {
  constructor (startingNode) {
  	this.domCache = new DOMElement(null, startingNode);
    this.transverseDOM(this.domCache, startingNode);
  }

  // Tests if a tag name can be skipped
  isSkipable(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustomElement(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  /**
   * @method transverseDOM
   *
   * @desc Used to collect accessibility information for all the element nd text
   *       nodes on a web page for use the the rules.  It pre-computes values
   *       that are used by the accessibility rules to test accessibility 
   *       requirements 
   *
   * @param {Object}  parentDomElement  - Parent DomElement associated with the
   *                                      parent element node of the starting node  
   * @param {Object}  startingNode      - The dom element to start transversing the
   *                                      dom
   */

  transverseDOM(parentDomElement, startingNode) {
    let domItem = null;
    let isLastDomText = false;  // used for combining ajacent dom text nodes
    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          // Combine text nodes if siblings
          if (isLastDomText) {
            domItem.addTextNode(node);
          } else {
            domItem = new DOMText(parentDomElement, node);
            if (domItem.hasContent) {
              parentDomElement.addChild(domItem);            
              isLastDomText = true;
            } 
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();
          if (!this.isSkipable(tagName)) {
            if (tagName === 'slot') {
              node.assignedNodes({ flatten: true }).forEach( assignedNode => {
                domItem = new DOMElement(parentDomElement, assignedNode);
                parentDomElement.addChild(domItem);
              });
            } else {
              domItem = new DOMElement(parentDomElement, node);
              parentDomElement.addChild(domItem);

              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  this.transverseDOM(domItem, node.shadowRoot);
                }
              } else {
                if ((tagName === 'frame') || (tagName === 'iframe')) {
                  if (node.contentWindow.document) {
                    this.transverseDOM(domItem, node.contentWindow.document);
                  }
                } else {
                  this.transverseDOM(domItem, node);
                }
              }
            }
          }   
          isLastDomText = false;
          break;

      } /* end switch */
    } /* end for */
  }


}

/* evaluationResult.js */

class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;
  }
}

/* evaluate.js */

class EvaluationLibrary {
  constructor () {
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingNode - Browser document object model (DOM) to be evaluated
   * @param  {String}  title        - Title of document being analyzed
   * @param  {String}  url          - url of document being analyzed
   */

  evaluate (startingNode, title='', url='') {
    let domCache = new DOMCache(startingNode);
    let evaluationResult = new EvaluationResult(domCache, title, url);
    return evaluationResult;
  }

}

export default EvaluationLibrary;
