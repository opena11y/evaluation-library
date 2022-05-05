/*
*   debug.js
*
*   Usage
*     import DebugLogging from './debug.js';
*     const debug = new DebugLogging('myLabel', true); // e.g. 'myModule'
*     ...
*     if (debug.flag) debug.log('myMessage');
*
*   Notes
*     new DebugLogging() - calling the constructor with no arguments results
*                   in debug.flag set to false and debug.label set to 'debug';
*                   constructor accepts 0, 1 or 2 arguments in any order
*                   @param flag [optional] {boolean} - sets debug.flag
*                   @param label [optional] {string} - sets debug.label
*   Properties
*     debug.flag    {boolean} allows you to switch debug logging on or off;
*                   default value is false
*     debug.label   {string} rendered as a prefix to each log message;
*                   default value is 'debug'
*   Methods
*     debug.log        calls console.log with label prefix and message
*                      @param message {object} - console.log calls toString()
*                      @param spaceAbove [optional] {boolean}
*
*     debug.tag        outputs tagName and textContent of DOM element
*                      @param node {DOM node reference} - usually an HTMLElement
*                      @param spaceAbove [optional] {boolean}
*
*     debug.domElement outputs tagName, role, name and number of children of
*                      DOMElement object
*                      @param node {DOM node reference} - usually an HTMLElement
*                      @param prefix [optional] {String}
*
*     debug.domText    outputs text content of DOMText object
*                      @param node {DOM node reference} - usually an HTMLElement
*                      @param prefix [optional] {String}
*
*     debug.separator  outputs only debug.label and a series of hyphens
*                      @param spaceAbove [optional] {boolean}
*/

class DebugLogging {
  constructor (...args) {
    // Default values for cases where fewer than two arguments are provided
    this._flag = false;
    this._label = 'debug';

    // The constructor may be called with zero, one or two arguments. If two
    // arguments, they can be in any order: one is assumed to be the boolean
    // value for '_flag' and the other one the string value for '_label'.
    for (const [index, arg] of args.entries()) {
      if (index < 2) {
        switch (typeof arg) {
          case 'boolean':
            this._flag = arg;
            break;
          case 'string':
            this._label = arg;
            break;
        }
      }
    }
  }

  get flag () { return this._flag; }

  set flag (value) {
    if (typeof value === 'boolean') {
      this._flag = value;
    }
  }

  get label () { return this._label; }

  set label (value) {
    if (typeof value === 'string') {
      this._label = value;
    }
  }

  log (message, spaceAbove) {
    const newline = spaceAbove ? '\n' : '';
    console.log(`${newline}[${this._label}] ${message}`);
  }

  tag (node, spaceAbove) {
    if (node && node.tagName) {
      const text = node.textContent.trim().replace(/\s+/g, ' ');
      this.log(`[${node.tagName}]: ${text.substring(0, 40)}`, spaceAbove);
    }
  }

  color (message, color="#000", backgroundColor='#fff', spaceAbove) {
    const newline = spaceAbove ? '\n' : '';
    console.log(`${newline}[${this._label}] ` + `%c${message}`, `color: ${color}; background: ${backgroundColor}`);
  }

  separator (spaceAbove) {
    this.log('-----------------------------', spaceAbove);
  }

  domElement (domElement, prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }

    if (domElement) {
      const accName = domElement.accName;
      const count   = domElement.children.length;
      const pos     = domElement.ordinalPosition;
      if (accName.name.length) {
        this.log(`${prefix}[${domElement.tagName}][${domElement.role}]: ${accName.name} (src: ${accName.source}, children: ${count}, position: ${pos})`);
      } else {
        this.log(`${prefix}[${domElement.tagName}][${domElement.role}] (children: ${count}, position: ${pos})`);
      }
    }
  }

  domText (domText, prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    const maxDisplay = 20;
    if (domText) {
      if (domText.getText.length < maxDisplay) {
        this.log(`${prefix}[text]: ${domText.getText} (parent: ${domText.parentDomElement.tagName})`);
      } else {
        this.log(`${prefix}[text]: ${domText.getText.substring(0, maxDisplay)} ... (parent: ${domText.parentDomElement.tagName})`);
      }
    }
  }

}

/* colorContrast.js */

/* Constants */
const debug$j = new DebugLogging('colorContrast', false);
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
    let parentColorContrast = parentDomElement ? parentDomElement.colorContrast : false;
    let style = window.getComputedStyle(elementNode, null);

    if (debug$j.flag) {
      debug$j.separator();
      debug$j.tag(elementNode);
    }

    this.opacity            = this.normalizeOpacity(style, parentColorContrast);

    this.color              = style.getPropertyValue("color");
    this.colorHex           = this.RGBToHEX(this.color, this.opacity);
    this.backgroundColor    = this.normalizeBackgroundColor(style, parentColorContrast);
    this.backgroundColorHex = this.RGBToHEX(this.backgroundColor);

    this.backgroundImage    = this.normalizeBackgroundImage(style, parentColorContrast);
    this.backgroundRepeat   = style.getPropertyValue("background-repeat");
    this.backgroundPosition = style.getPropertyValue("background-position");
    this.hasBackgroundImage = this.backgroundImage !== 'none';

    this.fontFamily = style.getPropertyValue("font-family");
    this.fontSize   = this.normalizeFontSize(style, parentColorContrast);
    this.fontWeight = this.normalizeFontWeight(style, parentColorContrast);
    this.isLargeFont = this.getLargeFont(this.fontSize, this.fontWeight);

    const L1 = this.getLuminance(this.colorHex);
    const L2 = this.getLuminance(this.backgroundColorHex);
    this.colorContrastRatio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;

    if (debug$j.flag) {
      debug$j.log(`[                    opacity]: ${this.opacity}`);
      debug$j.log(`[Background Repeat/Pos/Image]: ${this.backgroundRepeat}/${this.backgroundPosition}/${this.backgroundImage}`);
      debug$j.log(`[ Family/Size/Weight/isLarge]: "${this.fontFamily}"/${this.fontSize}/${this.fontWeight}/${this.isLargeFont}`);
      debug$j.color(`[   CCR for Color/Background]: ${this.colorContrastRatio} for #${this.colorHex}/#${this.backgroundColorHex}`, this.color, this.backgroundColor);
    }
  }

  /**
   * @method normalizeOpacity
   *
   * @desc Normalizes opacity to a number 
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentColorContrast  - Computed color contrast information for parent
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing the opacity
   */

  normalizeOpacity (style, parentColorContrast) {
    let opacity = style.getPropertyValue("opacity");
    let parentOpacity = 1.0;

    if (parentColorContrast) {
      parentOpacity = parentColorContrast.opacity;
    }

    if (isNaN(opacity)) {
      opacity = opacity.toLowerCase();

      switch (opacity) {
        case 'inherit':
        case 'unset':
          opacity = parentOpacity;
          break;

        case 'initial':
        case 'revert':
          opacity = 1.0;
          break;

        default:
          if (opacity.indexOf('%')) {
            opacity = parseInt(opacity.split('%')[0]);
            if (isNaN(opacity)) {
              opacity = parentOpacity;
            } else {
              opacity = parentOpacity * (opacity / 100);
            }
          }
          else {
            opacity = parseFloat(opacity) * parentOpacity;
            if (isNaN(opacity)) {
              opacity = 1.0;
            }
          }
          break;
      }  // end switch
    } else {
      opacity = parseFloat(opacity) * parentOpacity;
      if (isNaN(opacity)) {
        opacity = 1.0;
      }

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
   * @param {Object}  parentColorContrast  - Computed color contrast information for parent
   *                                         DomElement
   *
   * @return {String}  Returns the background color
   */

  normalizeBackgroundColor (style, parentColorContrast) {
    let backgroundColor = style.getPropertyValue("background-color");
    if ((backgroundColor == 'rgba(0, 0, 0, 0)') ||
        (backgroundColor == 'transparent') ||
        (backgroundColor == 'inherit')) {

      if (parentColorContrast) {
        backgroundColor   = parentColorContrast.backgroundColor;
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
   * @param {Object}  parentColorContrast  - Computed color contrast information for parent
   *                                         DomElement
   *
   * @return {String}  Returns a reference to a background image URL or none
   */

  normalizeBackgroundImage (style, parentColorContrast) {
    let backgroundImage = style.getPropertyValue("background-image").toLowerCase();

    if ((backgroundImage === 'inherit') ||
        (backgroundImage === 'none') ||
        (backgroundImage === '')) {
      if (parentColorContrast) {
        backgroundImage = parentColorContrast.backgroundImage;
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
   * @param {Object}  parentColorContrast  - Computed color contrast information for parent
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing font size value in pixels (px)
   */

  normalizeFontSize (style, parentColorContrast) {
    let fontSize = style.getPropertyValue("font-size");
    if (isNaN(fontSize)) {
      if (fontSize.toLowerCase() == 'inherit') {
        if (parentColorContrast) {
          fontSize = parentColorContrast.fontSize;
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
   * @param {Object}  parentColorContrast  - Computed color contrast information for parent
   *                                         DomElement
   *
   * @return {Number}  Returns a number representing font weight value
   */

  normalizeFontWeight (style, parentColorContrast) {
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
        if (parentColorContrast) {
          fontWeight = parentColorContrast.fontWeight;
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
            value = Math.round(opacity * Math.round(parseFloat(rgbColor)));
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
            value = Math.round(opacity * A * Math.round(parseFloat(rgbColor)));
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
   * @param {Number}  fontSize    - font size of the element in pixels
   * @param {Number}  fontWeight  - Numberical value of the font wieght (100-900)
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

/* Constants */
const debug$i = new DebugLogging('visibility', false);

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
    let parentVisibility = parentDomElement ? parentDomElement.visibility : false;
    let style = window.getComputedStyle(elementNode, null);
    let tagName = elementNode.tagName ? elementNode.tagName : '';

    this.isHidden           = this.normalizeHidden (elementNode, parentVisibility);
    this.isAriaHidden       = this.normalizeAriaHidden (elementNode, parentVisibility);
    this.isDisplayNone      = this.normalizeDisplay (style, parentVisibility);
    this.isVisibilityHidden = this.normalizeVisibility (style, parentVisibility);

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

    if (debug$i.flag) {
      debug$i.separator();
      debug$i.tag(elementNode);
      debug$i.log('[          isHidden]: ' + this.isHidden);
      debug$i.log('[      isAriaHidden]: ' + this.isAriaHidden);
      debug$i.log('[     isDisplayNone]: ' + this.isDisplayNone);
      debug$i.log('[isVisibilityHidden]: ' + this.isVisibilityHidden);
      debug$i.log('[ isVisibleOnScreen]: ' + this.isVisibleOnScreen);
      debug$i.log('[     isVisibleToAT]: ' + this.isVisibleToAT);
    }
  }

  /**
   * @method normalizeHidden
   *
   * @desc Determine if the hidden attribute is set on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node              - dom element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    hidden attribute 
   */

  normalizeHidden (node, parentVisibility) {
    let hidden = node.getAttribute('hidden');
    hidden = hidden ? true : false;
    if (parentVisibility &&
        parentVisibility.hidden)  {
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
   * @param {Object}  node              - dom element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    aria-hidden attribute set to true 
   */

  normalizeAriaHidden (node, parentVisibility) {
    let ariaHidden = node.getAttribute('aria-hidden');
    if (ariaHidden) {
      ariaHidden = ariaHidden.toLowerCase();
    }
    ariaHidden = (ariaHidden === 'true') ? true : false;

    if (parentVisibility &&
        parentVisibility.ariaHidden)  {
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
   * @param {Object}  style             - Computed style object for an element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeDisplay (style, parentVisibility) {
    let display = style.getPropertyValue("display");
    let isDisplayNone = false;

    if ((display === 'none') || 
        (parentVisibility && parentVisibility.isDisplayNone)) {
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
   * @param {Object}  style             - Computed style object for an element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeVisibility (style, parentVisibility) {
    let visibility = style.getPropertyValue("visibility");
    let isVisibilityHidden = false; 

    if ((visibility === 'collapse') ||
        (visibility === 'hidden')) {
        isVisibilityHidden = true;
    }
    return isVisibilityHidden;
  }

}

/* propertyDataTypes.js is a generated file, use "npm run aria" */
const propertyDataTypes = {
  'aria-activedescendant': {
    propType: 'property',
    type: 'idref',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-atomic': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-autocomplete': {
    propType: 'property',
    type: 'nmtoken',
    values: [
      'inline',
      'list',
      'both',
      'none'
    ],
    defaultValue: 'none',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-busy': {
    propType: 'state',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-checked': {
    propType: 'state',
    type: 'tristate',
    values: [
      'false',
      'mixed',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-colcount': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: true,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-colindex': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-colspan': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-controls': {
    propType: 'property',
    type: 'idrefs',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-current': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'page',
      'step',
      'location',
      'date',
      'time',
      'true',
      'false'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-describedby': {
    propType: 'property',
    type: 'idrefs',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-details': {
    propType: 'property',
    type: 'idref',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-disabled': {
    propType: 'state',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-dropeffect': {
    propType: 'property',
    type: 'nmtokens',
    values: [
      'copy',
      'execute',
      'link',
      'move',
      'none',
      'popup'
    ],
    defaultValue: 'none',
    deprecated: true,
    idlAttribute: ''
  },
  'aria-errormessage': {
    propType: 'property',
    type: 'idref',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-expanded': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'false',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-flowto': {
    propType: 'property',
    type: 'idrefs',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-grabbed': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'false',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: true,
    idlAttribute: ''
  },
  'aria-haspopup': {
    propType: 'property',
    type: 'nmtoken',
    values: [
      'false',
      'true',
      'menu',
      'listbox',
      'tree',
      'grid',
      'dialog'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-hidden': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'false',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-invalid': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'grammar',
      'false',
      'spelling',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-keyshortcuts': {
    propType: 'property',
    type: 'string',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-label': {
    propType: 'property',
    type: 'string',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-labelledby': {
    propType: 'property',
    type: 'idrefs',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-level': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-live': {
    propType: 'property',
    type: 'nmtoken',
    values: [
      'assertive',
      'off',
      'polite'
    ],
    defaultValue: 'off',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-modal': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-multiline': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-multiselectable': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-orientation': {
    propType: 'property',
    type: 'nmtoken',
    values: [
      'horizontal',
      'undefined',
      'vertical'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-owns': {
    propType: 'property',
    type: 'idrefs',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-placeholder': {
    propType: 'property',
    type: 'string',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-posinset': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-pressed': {
    propType: 'state',
    type: 'tristate',
    values: [
      'false',
      'mixed',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-readonly': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-relevant': {
    propType: 'property',
    type: 'nmtokens',
    values: [
      'additions',
      'additions',
      'all',
      'removals',
      'text'
    ],
    defaultValue: 'additions',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-required': {
    propType: 'property',
    type: 'boolean',
    values: [
      'false',
      'true'
    ],
    defaultValue: 'false',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-roledescription': {
    propType: 'property',
    type: 'string',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-rowcount': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: true,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-rowindex': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-rowspan': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: false,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-selected': {
    propType: 'state',
    type: 'nmtoken',
    values: [
      'false',
      'true',
      'undefined'
    ],
    defaultValue: 'undefined',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-setsize': {
    propType: 'property',
    type: 'integer',
    allowUndeterminedValue: true,
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-sort': {
    propType: 'property',
    type: 'nmtoken',
    values: [
      'ascending',
      'descending',
      'none',
      'other'
    ],
    defaultValue: 'none',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-valuemax': {
    propType: 'property',
    type: 'number',
    values: [],
    defaultValue: '100',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-valuemin': {
    propType: 'property',
    type: 'number',
    values: [],
    defaultValue: '0',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-valuenow': {
    propType: 'property',
    type: 'number',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  },
  'aria-valuetext': {
    propType: 'property',
    type: 'string',
    values: [],
    defaultValue: '',
    deprecated: false,
    idlAttribute: ''
  }
};

/* designPatterns.js is a generated file, use "npm run aria" */
const designPatterns = {
  alert: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure live',
    isAbstract: false
  },
  alertdialog: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-modal',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure window',
    isAbstract: false
  },
  application: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-activedescendant',
      'aria-disabled',
      'aria-errormessage',
      'aria-expanded',
      'aria-haspopup',
      'aria-invalid'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-activedescendant',
      'aria-disabled',
      'aria-errormessage',
      'aria-expanded',
      'aria-haspopup',
      'aria-invalid'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  article: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-posinset',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-posinset',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure section',
    isAbstract: false
  },
  banner: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  blockquote: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  button: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-disabled',
      'aria-haspopup',
      'aria-expanded',
      'aria-pressed'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-haspopup',
      'aria-expanded',
      'aria-pressed'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  caption: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [
      'figure',
      'grid',
      'table',
      'treegrid'
    ],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  cell: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-colindex',
      'aria-colspan',
      'aria-rowindex',
      'aria-rowspan'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-colindex',
      'aria-colspan',
      'aria-rowindex',
      'aria-rowspan'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'row'
    ],
    requiredChildren: [],
    roleType: 'structure section',
    isAbstract: false
  },
  checkbox: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-checked',
      'aria-errormessage',
      'aria-expanded',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [
      'aria-errormessage',
      'aria-expanded',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [
      'aria-checked'
    ],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  code: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  columnheader: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-colindex',
      'aria-colspan',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-expanded',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-readonly',
      'aria-relevant',
      'aria-required',
      'aria-roledescription',
      'aria-rowindex',
      'aria-rowspan',
      'aria-selected'
    ],
    deprecatedProps: [],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'row'
    ],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  combobox: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-controls',
      'aria-expanded',
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [
      'aria-controls',
      'aria-expanded'
    ],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  command: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  complementary: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  composite: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-activedescendant',
      'aria-disabled'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-activedescendant',
      'aria-disabled'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  contentinfo: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  definition: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  deletion: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  dialog: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-modal',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'window',
    isAbstract: false
  },
  directory: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  document: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  emphasis: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  feed: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'article'
    ],
    roleType: 'structure',
    isAbstract: false
  },
  figure: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  form: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  generic: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  grid: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-colcount',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-rowcount',
      'aria-multiselectable',
      'aria-readonly'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-multiselectable',
      'aria-readonly'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'row',
      'rowgroup'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  gridcell: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-colindex',
      'aria-colspan',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-rowindex',
      'aria-rowspan',
      'aria-disabled',
      'aria-errormessage',
      'aria-expanded',
      'aria-haspopup',
      'aria-invalid',
      'aria-readonly',
      'aria-required',
      'aria-selected'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-expanded',
      'aria-haspopup',
      'aria-invalid',
      'aria-readonly',
      'aria-required',
      'aria-selected'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'row'
    ],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  group: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-activedescendant',
      'aria-disabled'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-activedescendant',
      'aria-disabled'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  heading: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  img: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  input: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  insertion: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  landmark: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  link: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  list: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'listitem'
    ],
    roleType: 'structure',
    isAbstract: false
  },
  listbox: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-orientation',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-errormessage',
      'aria-expanded',
      'aria-invalid',
      'aria-multiselectable',
      'aria-readonly',
      'aria-required'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [
      'aria-errormessage',
      'aria-expanded',
      'aria-invalid',
      'aria-multiselectable',
      'aria-readonly',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'group',
      'option'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  listitem: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-level',
      'aria-posinset',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-level',
      'aria-posinset',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'directory',
      'list'
    ],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  log: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget live',
    isAbstract: false
  },
  main: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  marquee: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget live',
    isAbstract: false
  },
  math: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  meter: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuetext'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: true,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'range',
    isAbstract: false
  },
  menu: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-orientation',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'group',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  menubar: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-orientation',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'group',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  menuitem: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup',
      'aria-posinset',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup',
      'aria-posinset',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'group',
      'menu',
      'menubar'
    ],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  menuitemcheckbox: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-expanded',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-posinset',
      'aria-relevant',
      'aria-roledescription',
      'aria-setsize',
      'aria-checked'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [
      'aria-checked'
    ],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [
      'group',
      'menu',
      'menubar'
    ],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  menuitemradio: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-checked',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-expanded',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-posinset',
      'aria-relevant',
      'aria-roledescription',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-checked',
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [
      'group',
      'menu',
      'menubar'
    ],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  navigation: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  note: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  option: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-selected',
      'aria-checked',
      'aria-posinset',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-checked',
      'aria-posinset',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [
      'aria-selected'
    ],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [
      'group',
      'listbox'
    ],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  paragraph: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  presentation: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  progressbar: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: true,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'range widget',
    isAbstract: false
  },
  radio: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-checked',
      'aria-posinset',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-posinset',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [
      'aria-checked'
    ],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  radiogroup: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-orientation',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-errormessage',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [
      'aria-errormessage',
      'aria-invalid',
      'aria-readonly',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'radio'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  range: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    hasRange: true,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  region: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  row: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-colindex',
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-rowindex',
      'aria-setsize',
      'aria-selected'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-colindex',
      'aria-expanded',
      'aria-level',
      'aria-posinset',
      'aria-rowindex',
      'aria-setsize',
      'aria-selected'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'grid',
      'rowgroup',
      'table',
      'treegrid'
    ],
    requiredChildren: [
      'cell',
      'columnheader',
      'gridcell',
      'rowheader'
    ],
    roleType: 'structure widget',
    isAbstract: false
  },
  rowgroup: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'grid',
      'table',
      'treegrid'
    ],
    requiredChildren: [
      'row'
    ],
    roleType: 'structure',
    isAbstract: false
  },
  rowheader: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-colindex',
      'aria-colspan',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-readonly',
      'aria-relevant',
      'aria-required',
      'aria-roledescription',
      'aria-rowindex',
      'aria-rowspan',
      'aria-selected',
      'aria-expanded',
      'aria-sort'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-expanded',
      'aria-sort'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'row'
    ],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  scrollbar: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-valuetext',
      'aria-controls',
      'aria-valuenow',
      'aria-disabled',
      'aria-orientation',
      'aria-valuemax',
      'aria-valuemin'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-orientation',
      'aria-valuemax',
      'aria-valuemin'
    ],
    hasRange: true,
    requiredProps: [
      'aria-controls',
      'aria-valuenow'
    ],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'range widget',
    isAbstract: false
  },
  search: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'landmark',
    isAbstract: false
  },
  searchbox: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-autocomplete',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-multiline',
      'aria-owns',
      'aria-placeholder',
      'aria-readonly',
      'aria-relevant',
      'aria-required',
      'aria-roledescription'
    ],
    deprecatedProps: [],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  section: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  sectionhead: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  select: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  separator: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-disabled',
      'aria-orientation',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuetext'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-orientation',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuetext'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  slider: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-valuetext',
      'aria-valuenow',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-orientation',
      'aria-readonly',
      'aria-valuemax',
      'aria-valuemin'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-orientation',
      'aria-readonly',
      'aria-valuemax',
      'aria-valuemin'
    ],
    hasRange: true,
    requiredProps: [
      'aria-valuenow'
    ],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget range',
    isAbstract: false
  },
  spinbutton: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-errormessage',
      'aria-invalid',
      'aria-readonly',
      'aria-required',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [
      'aria-errormessage',
      'aria-invalid',
      'aria-readonly',
      'aria-required',
      'aria-valuemax',
      'aria-valuemin',
      'aria-valuenow',
      'aria-valuetext'
    ],
    hasRange: true,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget range',
    isAbstract: false
  },
  status: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure live',
    isAbstract: false
  },
  strong: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  structure: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  subscript: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  superscript: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  switch: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-expanded',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-readonly',
      'aria-relevant',
      'aria-required',
      'aria-roledescription',
      'aria-checked'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [
      'aria-checked'
    ],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  tab: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup',
      'aria-posinset',
      'aria-selected',
      'aria-setsize'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-disabled',
      'aria-expanded',
      'aria-haspopup',
      'aria-posinset',
      'aria-selected',
      'aria-setsize'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: true,
    requiredParents: [
      'tablist'
    ],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  table: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-colcount',
      'aria-rowcount'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-colcount',
      'aria-rowcount'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'row',
      'rowgroup'
    ],
    roleType: 'structure',
    isAbstract: false
  },
  tablist: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-multiselectable',
      'aria-orientation'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [
      'aria-multiselectable',
      'aria-orientation'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'tab'
    ],
    roleType: 'widget',
    isAbstract: false
  },
  tabpanel: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  term: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  textbox: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-multiline',
      'aria-placeholder',
      'aria-readonly',
      'aria-required'
    ],
    deprecatedProps: [],
    supportedProps: [
      'aria-activedescendant',
      'aria-autocomplete',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid',
      'aria-multiline',
      'aria-placeholder',
      'aria-readonly',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'widget',
    isAbstract: false
  },
  time: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget live',
    isAbstract: false
  },
  timer: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget live',
    isAbstract: false
  },
  toolbar: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  },
  tooltip: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  tree: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-orientation',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription',
      'aria-errormessage',
      'aria-invalid',
      'aria-multiselectable',
      'aria-required'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [
      'aria-errormessage',
      'aria-invalid',
      'aria-multiselectable',
      'aria-required'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'group',
      'treeitem'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  treegrid: {
    inheritedProps: [
      'aria-activedescendant',
      'aria-atomic',
      'aria-busy',
      'aria-colcount',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-multiselectable',
      'aria-orientation',
      'aria-owns',
      'aria-readonly',
      'aria-relevant',
      'aria-required',
      'aria-roledescription',
      'aria-rowcount'
    ],
    deprecatedProps: [
      'aria-haspopup'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [
      'row',
      'rowgroup'
    ],
    roleType: 'widget structure',
    isAbstract: false
  },
  treeitem: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-checked',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-level',
      'aria-live',
      'aria-owns',
      'aria-posinset',
      'aria-relevant',
      'aria-roledescription',
      'aria-selected',
      'aria-setsize',
      'aria-expanded',
      'aria-haspopup'
    ],
    deprecatedProps: [
      'aria-errormessage',
      'aria-invalid',
      'aria-selected'
    ],
    supportedProps: [
      'aria-expanded',
      'aria-haspopup'
    ],
    hasRange: false,
    requiredProps: [],
    nameRequired: true,
    nameFromContent: true,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [
      'group',
      'tree'
    ],
    requiredChildren: [],
    roleType: 'structure widget',
    isAbstract: false
  },
  widget: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  window: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: false,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'abstract',
    isAbstract: true
  },
  none: {
    inheritedProps: [
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-disabled',
      'aria-dropeffect',
      'aria-errormessage',
      'aria-flowto',
      'aria-grabbed',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-live',
      'aria-owns',
      'aria-relevant',
      'aria-roledescription'
    ],
    deprecatedProps: [
      'aria-disabled',
      'aria-errormessage',
      'aria-haspopup',
      'aria-invalid'
    ],
    supportedProps: [],
    hasRange: false,
    requiredProps: [],
    nameRequired: false,
    nameFromContent: false,
    nameProhibited: true,
    childrenPresentational: false,
    requiredParents: [],
    requiredChildren: [],
    roleType: 'structure',
    isAbstract: false
  }
};

// LOW-LEVEL FUNCTIONS
/* constants */
const elementsWithInvalid = ['form', 'fieldset', 'input', 'legend'];
const inputsWithChecked   = ['checkbox', 'radio'];

/* helper functions */

/*
*   normalize: Trim leading and trailing whitespace and condense all
*   internal sequences of whitespace to a single space. Adapted from
*   Mozilla documentation on String.prototype.trim polyfill. Handles
*   BOM and NBSP characters.
*/
function normalize (s) {
  let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return s.replace(rtrim, '').replace(/\s+/g, ' ');
}

/*
*   getAttributeValue: Return attribute value if present on element,
*   otherwise return empty string.
*/
function getAttributeValue (element, attribute) {
  let value = element.getAttribute(attribute);
  return (value === null) ? '' : normalize(value);
}

/*
*   hasEmptyAltText: Determine whether the alt attribute is present
*   and its value is the empty string.
*/
function hasEmptyAltText (element) {
  let value = element.getAttribute('alt');

   // Attribute is present
  if (value !== null)
    return (normalize(value).length === 0);

  return false;
}

/**
 * @function hasInvalidState
 *
 * @desc Identifies elements with the invalid state, that would overide
 *       or replace the use of aria-invalid attribute
 *
 * @param  {Object}  node   - DOM element node
 *
 * @returns {Boolean} true it element has a invalid state, otherwise false
 */

function hasInvalidState (node) {
  return elementsWithInvalid.includes(node.tagName.toLowerCase());
}

/**
 * @function hasCheckedState
 *
 * @desc Identifies elements with the checked state, that would overide
 *       or replace the use of aria-checked attribute
 *
 * @param  {Object}  node   - DOM element node
 *
 * @returns {Boolean} true it element has a checked state, otherwise false
 */

function hasCheckedState (node) {
  let flag = node.tagName.toLowerCase() === 'input';
  flag = flag && inputsWithChecked.includes(node.type.toLowerCase());
  return flag;
}

/**
 * @function replaceAll
 *
 * @desc Normalizes spaces in a string
 *
 * @param {String}  s       - String to have replacements
 * @param {String}  str1    - String to replace
 * @param {String}  str2    - The replacement string
 *
 * @return  String
 */

function replaceAll (s, str1, str2) {
  let len = s.length;
  let pos = s.indexOf(str1);
  let s1  = "";

  while (pos >= 0) {
    s1 += s.slice(0,pos);
    s1 += str2;
    s   = s.slice((pos+str1.length), len);

    pos = s.indexOf(str1);
    len = s.length;
  }
  s1 += s.slice(0, len);
  return s1;
}

/**
 * @function getFormattedDate
 *
 * @desc Returns a fomratted string (YYYY-MM-DD) represeting the current date
 *       with leading zeros
 *
 * @return {String}  Formatted date string
 */

function getFormattedDate() {

  function leadingZero(n) {
    let n1 = n.toString();
    if (n < 10) n1 = "0" + n;
    return n1;
  }

  const date = new Date();

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hours = date.getHours() + 1;
  const minutes = date.getMinutes() + 1;

  return y + "-" + leadingZero(m) + "-" + leadingZero(d) + ":" + leadingZero(hours)+ ":" + leadingZero(minutes);
}

/**
 * @function cleanForUTF8
 *
 * @desc Returns an string with only UTF8 characters
 *
 * @param  {String}  str - string to clean
 *
 * @return {String}  String with only ASCII characters
 */

function cleanForUTF8 (str) {
  let nstr = '';
  str.split().forEach( c => {
    if (c >= ' ' && c < '~') nstr += c;
  });
  return nstr;
}

/* ariaValidation.js */

/* Debug help functions */

function debugRefs (refs) {
  let s = '';
  refs.forEach(r => {
    s += `[${r.name} -> ${r.invalidIds.join()}]\n`;
  });
  return s;
}

function debugAttrs (attrs) {
  let s = '';
  attrs.forEach(attr => {
    if (typeof attr === 'string') {
      s += attr + ' ';
    } else {
      if (attr.invalidTokens && attr.invalidTokens.length) {
        s += `[${attr.name}=${attr.invalidTokens.join(' ')}]\n`;
      } else {
        s += `[${attr.name}=${attr.value}]\n`;
      }
    }
  });
  return s;
}

/* Constants */
const debug$h = new DebugLogging('AriaValidation', false);

/**
 * @class TokenInfo
 *
 * @desc Information about an ARIA attribute that can include one or
 *       more tokens.  The invalidTokens array contains a list of
 *       invalid tokens.
 *
 * @param  {String}  name   - name of attribute
 * @param  {String}  value  - value of attribute
 */

class TokenInfo {
  constructor (name, value) {
    this.name = name;
    this.value = value;
    this.invalidTokens = [];
  }
}

/**
 * @class RefInfo
 *
 * @desc Information about an ARIA attributes the reference IDs.
 *       The invalidIds array is a array of the invalid ID values.
 *
 * @param  {String}  name   - name of attribute
 * @param  {String}  value  - value of attribute
 */

class RefInfo {
  constructor (name, value) {
    this.name = name;
    this.value = value;
    this.invalidIds = [];
  }
}

/**
 * @class AriaValidation
 *
 * @desc Validates aria information for a dom node
 *
 * @param  {String}  role  - ARIA role for the element
 * @param  {Object}  node  - dom element node
 */

class AriaValidation {
  constructor (doc, role, defaultRole, node) {
    let designPattern = designPatterns[role] || null;
    this.isValidRole  = designPattern !== null;

    // if role is not valid use default role for element for validation
    if (!this.isValidRole) {
      designPattern = designPatterns[defaultRole];
    }

    this.isNameRequired     = designPattern.nameRequired;
    this.isNameProhibited   = designPattern.nameProbihited;

    const attrs = Array.from(node.attributes);

    this.validAttrs        = [];
    this.invalidAttrs      = [];

    attrs.forEach( attr =>  {
      if (attr.name.indexOf('aria') === 0) {
        if (typeof propertyDataTypes[attr.name] === 'object') {
          this.validAttrs.push(attr);
        } else {
          this.invalidAttrs.push(attr);
        }
      }
    });

    this.invalidAttrValues  = this.checkForInvalidAttributeValue(this.validAttrs);
    this.invalidRefs        = this.checkForInvalidReferences(doc, this.validAttrs);
    this.unsupportedAttrs   = this.checkForUnsupportedAttribute(this.validAttrs, designPattern);
    this.deprecatedAttrs    = this.checkForDeprecatedAttribute(this.validAttrs, designPattern);
    this.missingReqAttrs    = this.checkForMissingRequiredAttributes(this.validAttrs, designPattern, node);

    if (debug$h.flag) {
      node.attributes.length && debug$h.log(`${node.outerHTML}`, 1);
      debug$h.log(`[invalidAttrValues]: ${debugAttrs(this.invalidAttrValues)}`);
      debug$h.log(`[      invalidRefs]: ${debugRefs(this.invalidRefs)}`);
      debug$h.log(`[ unsupportedAttrs]: ${debugAttrs(this.unsupportedAttrs)}`);
      debug$h.log(`[  deprecatedAttrs]: ${debugAttrs(this.deprecatedAttrs)}`);
      debug$h.log(`[  missingReqAttrs]: ${debugAttrs(this.missingReqAttrs)}`);
      debug$h.log(`[     invalidAttrs]: ${debugAttrs(this.invalidAttrs)}`);
    }
  }

  // check if the value of the aria attribute
  // is allowed
  checkForInvalidAttributeValue (attrs) {
    const booleanValues = ['true', 'false'];
    const tristateValues = ['true', 'false', 'mixed'];
    const attrsWithInvalidValues = [];

    attrs.forEach( attr => {
      const attrInfo  = propertyDataTypes[attr.name];
      const value     = attr.value.toLowerCase();
      const values    = value.split(' ');
      const tokenInfo = new TokenInfo (attr.name, attr.value);

      switch (attrInfo.type) {
        case 'boolean':
          if (!booleanValues.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'integer':
          const num = Number(value);
          if (!Number.isInteger(num) || (num <= 0)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtoken':
          if (!attrInfo.values.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtokens':
          values.forEach( v => {
            if (!attrInfo.values.includes(v.trim())) {
              tokenInfo.invalidTokens.push(v);
            }
          });
          if (tokenInfo.invalidTokens.length) {
            attrsWithInvalidValues.push(tokenInfo);
          }
          break;

        case 'number':
          if (isNaN(value) || (value === '')) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'tristate':
          if (!tristateValues.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

      }

    });

    return attrsWithInvalidValues;
  }

  // checks for valid IDREF and IDREFs for
  // aria attributes like aria-labelledby,
  // aria-controls, etc...
  checkForInvalidReferences (doc, attrs) {
    const invalidRefs = [];

    attrs.forEach( attr => {
      const attrInfo = propertyDataTypes[attr.name];
      const idRefs = attr.value.split(' ');

      if ((attrInfo.type === 'idref') ||
          (attrInfo.type === 'idrefs')) {

        const refInfo = new RefInfo (attr.name, attr.value);

        idRefs.forEach( id => {
          if (doc && !doc.querySelector(`#${id}`)) {
            refInfo.invalidIds.push(id);
          }
        });
        if (refInfo.invalidIds.length) {
          invalidRefs.push(refInfo);
        }
      }
    });

    return invalidRefs;
  }

  // checks for the use of an aria-attribute that
  // is not defined for the specific role
  checkForUnsupportedAttribute (attrs, designPattern) {
    const unsupportedAttrs = [];

    attrs.forEach( attr => {
      const name     = attr.name.toLowerCase();
      if (!designPattern.supportedProps.includes(name) &&
        !designPattern.requiredProps.includes(name) &&
        !designPattern.inheritedProps.includes(name)) {
        unsupportedAttrs.push(attr);
      }
    });

    return unsupportedAttrs;
  }

  // checks for aria attributes that are deprecated for all roles
  // and the use of aria attributes that should no longer be used
  // on elements with a specific role
  checkForDeprecatedAttribute (attrs, designPattern) {
    const deprecatedAttrs = [];

    attrs.forEach( attr => {
      const name     = attr.name.toLowerCase();
      const attrInfo = propertyDataTypes[name];
      if (designPattern.deprecatedProps.includes(name) ||
        attrInfo.deprecated) {
        deprecatedAttrs.push(attr);
      }
    });

    return deprecatedAttrs;
  }

  // checks for required aria attributes for a specific role
  // In some cased native HTML semanitics like "checked' property of
  // an input element can be used to satisfy the requirement
  checkForMissingRequiredAttributes(attrs, designPattern, node) {
    const missingReqAttrNames = [];
    designPattern.requiredProps.forEach (reqAttr => {
      const defaultValue = propertyDataTypes[reqAttr].defaultValue;
      let flag = (defaultValue !== '') && (defaultValue !== 'undefined');
      attrs.forEach( attr => {
        attr.name.toLowerCase();
        flag = flag || (attr.name === reqAttr);
        flag = flag || ((reqAttr === 'aria-checked') && hasCheckedState(node));
      });
      if (!flag) {
        missingReqAttrNames.push(reqAttr);
      }
    });
    return missingReqAttrNames;
  }
}

/* generated file, use npm run aria-in-html */
const ariaInHTMLInfo = {
  title: 'ARIA in HTML',
  status: 'W3C Recommendation 09 December 2021',
  reference: 'https://www.w3.org/TR/html-aria/',
  anyRoleAllowed: false,
  noRoleAllowed: false,
  elementInfo: {
    'a[href]': {
      tagName: 'a',
      defaultRole: 'link',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'button',
        'checkbox',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'radio',
        'switch',
        'tab',
        'treeitem'
      ],
      attr1: 'href',
      id: 'a[href]'
    },
    a: {
      tagName: 'a',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'a'
    },
    abbr: {
      tagName: 'abbr',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'abbr'
    },
    address: {
      tagName: 'address',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'address'
    },
    'area[href]': {
      tagName: 'area',
      defaultRole: 'link',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'href',
      id: 'area[href]'
    },
    area: {
      tagName: 'area',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'area'
    },
    article: {
      tagName: 'article',
      defaultRole: 'article',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application',
        'document',
        'feed',
        'main',
        'none',
        'presentation',
        'region'
      ],
      id: 'article'
    },
    aside: {
      tagName: 'aside',
      defaultRole: 'complementary',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'feed',
        'none',
        'note',
        'presentation',
        'region',
        'search'
      ],
      id: 'aside'
    },
    audio: {
      tagName: 'audio',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application'
      ],
      id: 'audio'
    },
    b: {
      tagName: 'b',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'b'
    },
    base: {
      tagName: 'base',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'base'
    },
    bdi: {
      tagName: 'bdi',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'bdi'
    },
    bdo: {
      tagName: 'bdo',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'bdo'
    },
    blockquote: {
      tagName: 'blockquote',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'blockquote'
    },
    body: {
      tagName: 'body',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'body'
    },
    br: {
      tagName: 'br',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'presentation',
        'none'
      ],
      id: 'br'
    },
    button: {
      tagName: 'button',
      defaultRole: 'button',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'checkbox',
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'radio',
        'switch',
        'tab'
      ],
      id: 'button'
    },
    canvas: {
      tagName: 'canvas',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'canvas'
    },
    caption: {
      tagName: 'caption',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'caption'
    },
    cite: {
      tagName: 'cite',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'cite'
    },
    code: {
      tagName: 'code',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'code'
    },
    col: {
      tagName: 'col',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'col'
    },
    colgroup: {
      tagName: 'colgroup',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'colgroup'
    },
    data: {
      tagName: 'data',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'data'
    },
    datalist: {
      tagName: 'datalist',
      defaultRole: 'listbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'datalist'
    },
    dd: {
      tagName: 'dd',
      defaultRole: 'definition',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'dd'
    },
    del: {
      tagName: 'del',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'del'
    },
    dfn: {
      tagName: 'dfn',
      defaultRole: 'term',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'dfn'
    },
    details: {
      tagName: 'details',
      defaultRole: 'group',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'details'
    },
    dialog: {
      tagName: 'dialog',
      defaultRole: 'dialog',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'alertdialog'
      ],
      id: 'dialog'
    },
    div: {
      tagName: 'div',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'div'
    },
    dl: {
      tagName: 'dl',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'list',
        'presentation',
        'none'
      ],
      id: 'dl'
    },
    dt: {
      tagName: 'dt',
      defaultRole: 'term',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'listitem'
      ],
      id: 'dt'
    },
    em: {
      tagName: 'em',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'em'
    },
    embed: {
      tagName: 'embed',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application',
        'document',
        'img',
        'presentation',
        'none'
      ],
      id: 'embed'
    },
    fieldset: {
      tagName: 'fieldset',
      defaultRole: 'group',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'radiogroup'
      ],
      id: 'fieldset'
    },
    figcaption: {
      tagName: 'figcaption',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'presentation',
        'none'
      ],
      id: 'figcaption'
    },
    'figure[figcaption]': {
      tagName: 'figure',
      defaultRole: 'figure',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      hasFigcaption: true,
      id: 'figure[figcaption]'
    },
    figure: {
      tagName: 'figure',
      defaultRole: 'figure',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'figure'
    },
    'footer[contentinfo]': {
      tagName: 'footer',
      defaultRole: 'contentinfo',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'none',
        'presentation'
      ],
      isLandmark: true,
      id: 'footer[contentinfo]'
    },
    footer: {
      tagName: 'footer',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'none',
        'presentation'
      ],
      id: 'footer'
    },
    form: {
      tagName: 'form',
      defaultRole: 'form',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'search',
        'none',
        'presentation'
      ],
      id: 'form'
    },
    h1: {
      tagName: 'h1',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h1'
    },
    h2: {
      tagName: 'h2',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h2'
    },
    h3: {
      tagName: 'h3',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h3'
    },
    h4: {
      tagName: 'h4',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h4'
    },
    h5: {
      tagName: 'h5',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h5'
    },
    h6: {
      tagName: 'h6',
      defaultRole: 'heading',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation',
        'tab'
      ],
      id: 'h6'
    },
    head: {
      tagName: 'head',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'head'
    },
    'header[banner]': {
      tagName: 'header',
      defaultRole: 'banner',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'none',
        'presentation'
      ],
      isLandmark: true,
      id: 'header[banner]'
    },
    header: {
      tagName: 'header',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'group',
        'none',
        'presentation'
      ],
      id: 'header'
    },
    hgroup: {
      tagName: 'hgroup',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'hgroup'
    },
    hr: {
      tagName: 'hr',
      defaultRole: 'separator',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'none',
        'presentation'
      ],
      id: 'hr'
    },
    html: {
      tagName: 'html',
      defaultRole: 'document',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'html'
    },
    i: {
      tagName: 'i',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'i'
    },
    iframe: {
      tagName: 'iframe',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application',
        'document',
        'img',
        'none',
        'presentation'
      ],
      id: 'iframe'
    },
    'img[accname]': {
      tagName: 'img',
      defaultRole: 'img',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'button',
        'checkbox',
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'progressbar',
        'scrollbar',
        'separator',
        'slider',
        'switch',
        'tab',
        'treeitem'
      ],
      hasAccname: true,
      id: 'img[accname]'
    },
    'img[alt]': {
      tagName: 'img',
      defaultRole: 'img',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'button',
        'checkbox',
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'progressbar',
        'scrollbar',
        'separator',
        'slider',
        'switch',
        'tab',
        'treeitem'
      ],
      attr1: 'alt',
      id: 'img[alt]'
    },
    'img[emptyalt]': {
      tagName: 'img',
      defaultRole: 'presentation',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'alt=""',
      id: 'img[emptyalt]'
    },
    img: {
      tagName: 'img',
      defaultRole: 'img',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'img'
    },
    'input[type=button]': {
      tagName: 'input',
      defaultRole: 'button',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'radio',
        'switch',
        'tab'
      ],
      attr1: 'type=button',
      id: 'input[type=button]'
    },
    'input[type=checkbox]': {
      tagName: 'input',
      defaultRole: 'checkbox',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'menuitemcheckbox',
        'option',
        'switch',
        'button'
      ],
      attr1: 'type=checkbox',
      id: 'input[type=checkbox]'
    },
    'input[type=color]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=color',
      id: 'input[type=color]'
    },
    'input[type=date]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=date',
      id: 'input[type=date]'
    },
    'input[type=datetime-local]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=datetime-local',
      id: 'input[type=datetime-local]'
    },
    'input[type=email][list]': {
      tagName: 'input',
      defaultRole: 'combobox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=email',
      attr2: 'list',
      id: 'input[type=email][list]'
    },
    'input[type=email]': {
      tagName: 'input',
      defaultRole: 'textbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=email',
      id: 'input[type=email]'
    },
    'input[type=file]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=file',
      id: 'input[type=file]'
    },
    'input[type=hidden]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      attr1: 'type=hidden',
      id: 'input[type=hidden]'
    },
    'input[type=image]': {
      tagName: 'input',
      defaultRole: 'button',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'radio',
        'switch'
      ],
      attr1: 'type=image',
      id: 'input[type=image]'
    },
    'input[type=month]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=month',
      id: 'input[type=month]'
    },
    'input[type=number]': {
      tagName: 'input',
      defaultRole: 'spinbutton',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=number',
      id: 'input[type=number]'
    },
    'input[type=password]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=password',
      id: 'input[type=password]'
    },
    'input[type=radio]': {
      tagName: 'input',
      defaultRole: 'radio',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'menuitemradio'
      ],
      attr1: 'type=radio',
      id: 'input[type=radio]'
    },
    'input[type=range]': {
      tagName: 'input',
      defaultRole: 'slider',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=range',
      id: 'input[type=range]'
    },
    'input[type=reset]': {
      tagName: 'input',
      defaultRole: 'button',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=reset',
      id: 'input[type=reset]'
    },
    'input[type=search][list]': {
      tagName: 'input',
      defaultRole: 'combobox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=search',
      attr2: 'list',
      id: 'input[type=search][list]'
    },
    'input[type=search]': {
      tagName: 'input',
      defaultRole: 'searchbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=search',
      id: 'input[type=search]'
    },
    'input[type=submit]': {
      tagName: 'input',
      defaultRole: 'button',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=submit',
      id: 'input[type=submit]'
    },
    'input[type=tel][list]': {
      tagName: 'input',
      defaultRole: 'combobox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=tel',
      attr2: 'list',
      id: 'input[type=tel][list]'
    },
    'input[type=tel]': {
      tagName: 'input',
      defaultRole: 'textbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=tel',
      id: 'input[type=tel]'
    },
    'input[type=text][list]': {
      tagName: 'input',
      defaultRole: 'combobox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=text',
      attr2: 'list',
      id: 'input[type=text][list]'
    },
    'input[type=text]': {
      tagName: 'input',
      defaultRole: 'textbox',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'combobox',
        'searchbox',
        'spinbutton'
      ],
      attr1: 'type=text',
      id: 'input[type=text]'
    },
    'input[type=time]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=time',
      id: 'input[type=time]'
    },
    'input[type=url][list]': {
      tagName: 'input',
      defaultRole: 'combobox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=url',
      attr2: 'list',
      id: 'input[type=url][list]'
    },
    'input[type=url]': {
      tagName: 'input',
      defaultRole: 'textbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=url',
      id: 'input[type=url]'
    },
    'input[type=week]': {
      tagName: 'input',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      attr1: 'type=week',
      id: 'input[type=week]'
    },
    ins: {
      tagName: 'ins',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'ins'
    },
    kbd: {
      tagName: 'kbd',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'kbd'
    },
    label: {
      tagName: 'label',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'label'
    },
    legend: {
      tagName: 'legend',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'legend'
    },
    li: {
      tagName: 'li',
      defaultRole: 'listitem',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'none',
        'presentation',
        'radio',
        'separator',
        'tab',
        'treeitem'
      ],
      id: 'li'
    },
    link: {
      tagName: 'link',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'link'
    },
    main: {
      tagName: 'main',
      defaultRole: 'main',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'main'
    },
    map: {
      tagName: 'map',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'map'
    },
    math: {
      tagName: 'math',
      defaultRole: 'math',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'math'
    },
    mark: {
      tagName: 'mark',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'mark'
    },
    menu: {
      tagName: 'menu',
      defaultRole: 'list',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'directory',
        'group',
        'listbox',
        'menu',
        'menubar',
        'none',
        'presentation',
        'radiogroup',
        'tablist',
        'toolbar',
        'tree'
      ],
      id: 'menu'
    },
    meta: {
      tagName: 'meta',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'meta'
    },
    meter: {
      tagName: 'meter',
      defaultRole: 'generic',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'meter'
    },
    nav: {
      tagName: 'nav',
      defaultRole: 'navigation',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'menu',
        'menubar',
        'tablist'
      ],
      id: 'nav'
    },
    noscript: {
      tagName: 'noscript',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'noscript'
    },
    object: {
      tagName: 'object',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application',
        'document',
        'img'
      ],
      id: 'object'
    },
    ol: {
      tagName: 'ol',
      defaultRole: 'list',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'directory',
        'group',
        'listbox',
        'menu',
        'menubar',
        'none',
        'presentation',
        'radiogroup',
        'tablist',
        'toolbar',
        'tree'
      ],
      id: 'ol'
    },
    optgroup: {
      tagName: 'optgroup',
      defaultRole: 'group',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'optgroup'
    },
    option: {
      tagName: 'option',
      defaultRole: 'option',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'option'
    },
    output: {
      tagName: 'output',
      defaultRole: 'status',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'output'
    },
    p: {
      tagName: 'p',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'p'
    },
    param: {
      tagName: 'param',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'param'
    },
    picture: {
      tagName: 'picture',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'picture'
    },
    pre: {
      tagName: 'pre',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'pre'
    },
    progress: {
      tagName: 'progress',
      defaultRole: 'progressbar',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'progress'
    },
    q: {
      tagName: 'q',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'q'
    },
    rp: {
      tagName: 'rp',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'rp'
    },
    rt: {
      tagName: 'rt',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'rt'
    },
    ruby: {
      tagName: 'ruby',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'ruby'
    },
    s: {
      tagName: 's',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 's'
    },
    samp: {
      tagName: 'samp',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'samp'
    },
    script: {
      tagName: 'script',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'script'
    },
    'section[accname]': {
      tagName: 'section',
      defaultRole: 'region',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'alert',
        'alertdialog',
        'application',
        'banner',
        'complementary',
        'contentinfo',
        'dialog',
        'document',
        'feed',
        'log',
        'main',
        'marquee',
        'navigation',
        'none',
        'note',
        'presentation',
        'search',
        'status',
        'tabpanel'
      ],
      hasAccname: true,
      id: 'section[accname]'
    },
    section: {
      tagName: 'section',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'alert',
        'alertdialog',
        'application',
        'banner',
        'complementary',
        'contentinfo',
        'dialog',
        'document',
        'feed',
        'log',
        'main',
        'marquee',
        'navigation',
        'none',
        'note',
        'presentation',
        'search',
        'status',
        'tabpanel'
      ],
      id: 'section'
    },
    select: {
      tagName: 'select',
      defaultRole: 'combobox',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'menu'
      ],
      id: 'select'
    },
    'select[size-or-multiple]': {
      tagName: 'select',
      defaultRole: 'listbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      hasSizeOrMultiple: true,
      id: 'select[size-or-multiple]'
    },
    slot: {
      tagName: 'slot',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'slot'
    },
    small: {
      tagName: 'small',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'small'
    },
    source: {
      tagName: 'source',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'source'
    },
    span: {
      tagName: 'span',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'span'
    },
    strong: {
      tagName: 'strong',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'strong'
    },
    style: {
      tagName: 'style',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'style'
    },
    sub: {
      tagName: 'sub',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'sub'
    },
    summary: {
      tagName: 'summary',
      defaultRole: 'button',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'summary'
    },
    sup: {
      tagName: 'sup',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'sup'
    },
    SVG: {
      tagName: 'SVG',
      defaultRole: 'graphics-document',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'SVG'
    },
    table: {
      tagName: 'table',
      defaultRole: 'table',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'table'
    },
    tbody: {
      tagName: 'tbody',
      defaultRole: 'rowgroup',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'tbody'
    },
    template: {
      tagName: 'template',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'template'
    },
    textarea: {
      tagName: 'textarea',
      defaultRole: 'textbox',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      id: 'textarea'
    },
    tfoot: {
      tagName: 'tfoot',
      defaultRole: 'rowgroup',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'tfoot'
    },
    thead: {
      tagName: 'thead',
      defaultRole: 'rowgroup',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'thead'
    },
    time: {
      tagName: 'time',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'time'
    },
    title: {
      tagName: 'title',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'title'
    },
    'td[cell]': {
      tagName: 'td',
      defaultRole: 'cell',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyTable: true,
      id: 'td[cell]'
    },
    'td[gridcell]': {
      tagName: 'td',
      defaultRole: 'gridcell',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyGrid: true,
      ownedbyTreegrid: true,
      id: 'td[gridcell]'
    },
    td: {
      tagName: 'td',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'td'
    },
    'th[cell]': {
      tagName: 'th',
      defaultRole: 'cell',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyTable: true,
      id: 'th[cell]'
    },
    'th[gridcell]': {
      tagName: 'th',
      defaultRole: 'gridcell',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyGrid: true,
      ownedbyTreegrid: true,
      id: 'th[gridcell]'
    },
    'th[colheader]': {
      tagName: 'th',
      defaultRole: 'colheader',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyTable: true,
      ownedbyGrid: true,
      ownedbyTreegrid: true,
      id: 'th[colheader]'
    },
    th: {
      tagName: 'th',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'th'
    },
    'tr[table]': {
      tagName: 'tr',
      defaultRole: 'row',
      noRoleAllowed: true,
      anyRoleAllowed: false,
      ownedbyTable: true,
      ownedbyGrid: true,
      ownedbyTreegrid: true,
      id: 'tr[table]'
    },
    tr: {
      tagName: 'tr',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'tr'
    },
    track: {
      tagName: 'track',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [],
      id: 'track'
    },
    u: {
      tagName: 'u',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'u'
    },
    ul: {
      tagName: 'ul',
      defaultRole: 'list',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'directory',
        'group',
        'listbox',
        'menu',
        'menubar',
        'none',
        'presentation',
        'radiogroup',
        'tablist',
        'toolbar',
        'tree'
      ],
      id: 'ul'
    },
    var: {
      tagName: 'var',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'var'
    },
    video: {
      tagName: 'video',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: false,
      allowedRoles: [
        'application'
      ],
      id: 'video'
    },
    wbr: {
      tagName: 'wbr',
      defaultRole: 'generic',
      noRoleAllowed: false,
      anyRoleAllowed: true,
      id: 'wbr'
    }
  }
};

/* ariaInHtml.js */

/* Constants */
const debug$g = new DebugLogging('ariaInHtml', false);
const higherLevelElements = [
  'article',
  'aside',
  'footer',
  'header',
  'main',
  'nav',
  'region',
  'section'
  ];

const landmarkRoles$1 = [
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'region',
  'search'
  ];

/**
* @function getAriaInHTMLInfo
*
* @desc Uses the ARIA in HTML specification to identify a default role and provide
*       role restriction information
*
* @param  {Object}  node        - Element node from a berowser DOM
*/

function getAriaInHTMLInfo (node) {
  let elemInfo, type;

  let tagName = node.tagName.toLowerCase();
  const elementInfo = ariaInHTMLInfo.elementInfo;

  switch (tagName) {
    case 'a':
      if (node.href) {
        elemInfo = elementInfo['a[href]'];
      } else {
        elemInfo = elementInfo['a'];
      }
      break;

    case 'area':
      if (node.href) {
        elemInfo = elementInfo['area[href]'];
      } else {
        elemInfo = elementInfo['area'];
      }
      break;

    case 'header':
      if (isTopLevel(node)) {
        elemInfo = elementInfo['header[banner]'];
      } else {
        elemInfo = elementInfo['header'];
      }
      break;

    case 'figure':
      if (node.querySelector('figcaption')) {
        elemInfo = elementInfo['figure[figcaption]'];
      } else {
        elemInfo = elementInfo['figure'];
      }
      break;

    case 'footer':
      if (isTopLevel(node)) {
        elemInfo = elementInfo['footer[contentinfo]'];
      } else {
        elemInfo = elementInfo['footer'];
      }
      break;

    case 'img':
      if (node.hasAttribute('aria-label') ||
          node.hasAttribute('aria-labelledby')) {
          elemInfo = elementInfo['img[accname]'];
      } else {
        if (node.hasAttribute('alt')) {
          if (node.alt.trim().length) {
            elemInfo = elementInfo['img[alt]'];
          } else {
            elemInfo = elementInfo['img[emptyalt]'];
          }
        } else {
          elemInfo = elementInfo['img'];
        }
      }
      break;

    case 'input':
      type = node.getAttribute('type');
      if (!type) {
        type = 'text';
      }
      let selector = tagName + '[type=' + type + ']';
      if (node.hasAttribute('list')) {
        selector += '[list]';
      }
      elemInfo = elementInfo[selector];
      break;

    case 'section':
      if (node.hasAttribute('aria-label') ||
        node.hasAttribute('aria-labelledby')||
        node.hasAttribute('title')) {
        elemInfo = elementInfo['section[accname]'];
      } else {
        elemInfo = elementInfo['section'];
      }
      break;

    case 'select':
      if (node.multiple || (node.size > 1)) {
        elemInfo = elementInfo['select[size-or-multiple]'];
      } else {
        elemInfo = elementInfo['select'];
      }
      break;

    case 'td':
    case 'th':
      if (isCellInGrid(node)) {
          elemInfo = elementInfo[`${tagName}[gridcell]`];
      } else {
        if (isCellInLayoutTable(node)) {
          elemInfo = elementInfo[tagName];
        } else {
          elemInfo = elementInfo[`${tagName}[cell]`];
        }
      }
      break;

    case 'tr':
      if (isCellInLayoutTable(node)) {
        elemInfo = elementInfo['tr'];
      } else {
        elemInfo = elementInfo[`tr[table]`];
      }
      break;

    default:
      elemInfo = elementInfo[tagName];

  }

  if (!elemInfo) {
      elemInfo = {
      "tagName": node.tagName,
      "defaultRole": "generic",
      "noRoleAllowed": false,
      "anyRoleAllowed": true,
      "id": "custom"
    };
  }

  if (debug$g.flag) {
    if (tagName === 'h2') {
      debug$g.tag(node);
    }
    debug$g.log(`[elemInfo][id]: ${elemInfo.id} (${tagName})`);
  }

  return elemInfo;
}


/**
* @function getString
*
* @desc Checks if a value is a string, if it is a string convert it to lowercase.
*       If not a string, return an empty string
*
* @param  {String}  value        - value to be checked
*/

function getString (value) {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return '';
}

/**
* @function isTopLevel
*
* @desc Tests the node to see if it is in the content of any other
*       elements with default landmark roles or is the descendant
*       of an element with a defined landmark role
*
* @param  {Object}  node        - Element node from a berowser DOM
*/

function isTopLevel (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (higherLevelElements.includes(tagName) ||
        landmarkRoles$1.includes(role)) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

/**
* @function isCellInGrid
*
* @desc Tests the table cell is part of a grid widget
*
* @param  {Object}  node - Element node from a berowser DOM
*/

function isCellInGrid  (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (tagName === 'table') {
      return role === 'grid' || role === 'treegrid';
    }

    node = node.parentNode;
  }
  return false;
}

/**
* @function isCellInLayoutTable
*
* @desc Tests the table cell is part of a table that
*       has been identified as being used for layout
*
* @param  {Object}  node - Element node from a berowser DOM
*/

function isCellInLayoutTable  (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (tagName === 'table') {
      return role === 'none' || role === 'presentation';
    }
    node = node.parentNode;
  }
  return false;
}

/*
*   dom.js: functions for getting information about DOM elements
*/

/*
*   isDescendantOf: Determine whether element is a descendant of any
*   element in the DOM with a tagName in the list of tagNames.
*/
function isDescendantOf (element, tagNames) {
  if (typeof element.closest === 'function') {
    return tagNames.some(name => element.closest(name) !== null);
  }
  return false;
}

/*
*   hasParentWithName: Determine whether element has a parent with
*   tagName in the list of tagNames.
*/
function hasParentWithName (element, tagNames) {
  let parentTagName = element.parentElement.tagName.toLowerCase();
  if (parentTagName) {
    return tagNames.some(name => parentTagName === name);
  }
  return false;
}

/*
*   roles.js
*
*   Note: The information in this module is based on the following documents:
*   1. ARIA in HTML (https://specs.webplatform.org/html-aria/webspecs/master/)
*   2. WAI-ARIA 1.1 (http://www.w3.org/TR/wai-aria-1.1/)
*   3. WAI-ARIA 1.0 (http://www.w3.org/TR/wai-aria/)
*/

/*
*   inListOfOptions: Determine whether element is a child of
*   1. a select element
*   2. an optgroup element that is a child of a select element
*   3. a datalist element
*/
function inListOfOptions (element) {
  let parent = element.parentElement,
      parentName = parent.tagName.toLowerCase(),
      parentOfParentName = parent.parentElement.tagName.toLowerCase();

  if (parentName === 'select')
    return true;

  if (parentName === 'optgroup' && parentOfParentName === 'select')
    return true;

  if (parentName === 'datalist')
    return true;

  return false;
}

/*
*   validRoles: Reference list of all concrete ARIA roles as specified in
*   WAI-ARIA 1.1 Working Draft of 14 July 2015
*/
var validRoles = [

  // LANDMARK
  'application',
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'search',

  // WIDGET
  'alert',
  'alertdialog',
  'button',
  'checkbox',
  'dialog',
  'gridcell',
  'link',
  'log',
  'marquee',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'option',
  'progressbar',
  'radio',
  'scrollbar',
  'searchbox',             // ARIA 1.1
  'slider',
  'spinbutton',
  'status',
  'switch',                // ARIA 1.1
  'tab',
  'tabpanel',
  'textbox',
  'timer',
  'tooltip',
  'treeitem',

  // COMPOSITE WIDGET
  'combobox',
  'grid',
  'listbox',
  'menu',
  'menubar',
  'radiogroup',
  'tablist',
  'tree',
  'treegrid',

  // DOCUMENT STRUCTURE
  'article',
  'cell',                  // ARIA 1.1
  'columnheader',
  'definition',
  'directory',
  'document',
  'group',
  'heading',
  'img',
  'list',
  'listitem',
  'math',
  'none',                  // ARIA 1.1
  'note',
  'presentation',
  'region',
  'row',
  'rowgroup',
  'rowheader',
  'separator',
  'table',                 // ARIA 1.1
  'text',                  // ARIA 1.1
  'toolbar'
];

/*
*   getValidRole: Examine each value in space-separated list by attempting
*   to find its match in the validRoles array. If a match is found, return
*   it. Otherwise, return null.
*/
function getValidRole (spaceSepList) {
  let arr = spaceSepList.split(' ');

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i].toLowerCase();
    let validRole = validRoles.find(role => role === value);
    if (validRole) return validRole;
  }

  return null;
}

/*
*   getAriaRole: Get the value of the role attribute, if it is present. If
*   not specified, get the default role of element if it has one. Based on
*   ARIA in HTML as of 21 October 2015.
*/
function getAriaRole (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (element.hasAttribute('role')) {
    return getValidRole(getAttributeValue(element, 'role'));
  }

  switch (tagName) {

    case 'a':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'area':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'article':     return 'article';
    case 'aside':       return 'complementary';
    case 'body':        return 'document';
    case 'button':      return 'button';
    case 'datalist':    return 'listbox';
    case 'details':     return 'group';
    case 'dialog':      return 'dialog';
    case 'dl':          return 'list';
    case 'fieldset':    return 'group';

    case 'footer':
      if (!isDescendantOf(element, ['article', 'section']))
        return 'contentinfo';
      break;

    case 'form':        return 'form';

    case 'h1':          return 'heading';
    case 'h2':          return 'heading';
    case 'h3':          return 'heading';
    case 'h4':          return 'heading';
    case 'h5':          return 'heading';
    case 'h6':          return 'heading';

    case 'header':
      if (!isDescendantOf(element, ['article', 'section']))
        return 'banner';
      break;

    case 'hr':          return 'separator';

    case 'img':
      if (!hasEmptyAltText(element))
        return 'img';
      break;

    case 'input':
      if (type === 'button')    return 'button';
      if (type === 'checkbox')  return 'checkbox';
      if (type === 'email')     return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'image')     return 'button';
      if (type === 'number')    return 'spinbutton';
      if (type === 'password')  return 'textbox';
      if (type === 'radio')     return 'radio';
      if (type === 'range')     return 'slider';
      if (type === 'reset')     return 'button';
      if (type === 'search')    return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'submit')    return 'button';
      if (type === 'tel')       return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'text')      return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      if (type === 'url')       return (element.hasAttribute('list')) ? 'combobox' : 'textbox';
      break;

    case 'li':
      if (hasParentWithName(element, ['ol', 'ul']))
        return 'listitem';
      break;

    case 'link':
      if (element.hasAttribute('href'))
        return 'link';
      break;

    case 'main':      return 'main';

    case 'menu':
      if (type === 'toolbar')
        return 'toolbar';
      break;

    case 'menuitem':
      if (type === 'command')   return 'menuitem';
      if (type === 'checkbox')  return 'menuitemcheckbox';
      if (type === 'radio')     return 'menuitemradio';
      break;

    case 'meter':       return 'progressbar';
    case 'nav':         return 'navigation';
    case 'ol':          return 'list';

    case 'option':
      if (inListOfOptions(element))
        return 'option';
      break;

    case 'output':      return 'status';
    case 'progress':    return 'progressbar';
    case 'section':     return 'region';
    case 'select':      return 'listbox';
    case 'summary':     return 'button';

    case 'tbody':       return 'rowgroup';
    case 'tfoot':       return 'rowgroup';
    case 'thead':       return 'rowgroup';

    case 'textarea':    return 'textbox';

    // TODO: th can have role 'columnheader' or 'rowheader'
    case 'th':          return 'columnheader';

    case 'ul':          return 'list';
  }

  return null;
}

/*
*   nameFromIncludesContents: Determine whether the ARIA role of element
*   specifies that its 'name from' includes 'contents'.
*/
function nameFromIncludesContents (element) {
  let elementRole = getAriaRole(element);
  if (elementRole === null) return false;

  let contentsRoles = [
    'button',
    'cell',                // ARIA 1.1
    'checkbox',
    'columnheader',
    'directory',
    'gridcell',
    'heading',
    'link',
    'listitem',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'radio',
    'row',
    'rowgroup',
    'rowheader',
    'switch',              // ARIA 1.1
    'tab',
    'text',                // ARIA 1.1
    'tooltip',
    'treeitem'
  ];

  let contentsRole = contentsRoles.find(role => role === elementRole);
  return (typeof contentsRole !== 'undefined');
}

/*
*   embedded.js
*
*   To calculate the accessible name of a form element from its label, it is
*   necessary to aggregate the text nodes in the label along with the values
*   of any embedded controls that text content may contain.
*
*   isEmbeddedControl is used to determine whether or not a form control can
*   be embedded within text content.
*
*   getEmbeddedControlValue is used to get the value of an embedded control
*   based on its ARIA role.
*/

/*
*   isEmbeddedControl: Determine whether element has a role that corresponds
*   to an HTML form control that could be embedded within text content.
*/
function isEmbeddedControl (element) {
  let embeddedControlRoles = [
    'textbox',
    'combobox',
    'listbox',
    'slider',
    'spinbutton'
  ];
  let role = getAriaRole(element);

  return (embeddedControlRoles.indexOf(role) !== -1);
}

/*
*   getEmbeddedControlValue: Based on the role of element, use native semantics
*   of HTML to get the corresponding text value of the embedded control.
*/
function getEmbeddedControlValue (element) {
  let role = getAriaRole(element);

  switch (role) {
    case 'textbox':
      return getTextboxValue(element);

    case 'combobox':
      return getComboboxValue(element);

    case 'listbox':
      return getListboxValue(element);

    case 'slider':
      return getSliderValue(element);

    case 'spinbutton':
      return getSpinbuttonValue(element);
  }

  return '';
}

// LOW-LEVEL FUNCTIONS

/*
*   getInputValue: Get current value of 'input' or 'textarea' element.
*/
function getInputValue (element) {
  return normalize(element.value);
}

/*
*   getRangeValue: Get current value of control with role 'spinbutton'
*   or 'slider' (i.e., subclass of abstract 'range' role).
*/
function getRangeValue (element) {
  let value;

  value = getAttributeValue(element, 'aria-valuetext');
  if (value.length) return value;

  value = getAttributeValue(element, 'aria-valuenow');
  if (value.length) return value;

  return getInputValue(element);
}

// HELPER FUNCTIONS FOR SPECIFIC ROLES

function getTextboxValue (element) {
  let inputTypes = ['email', 'password', 'search', 'tel', 'text', 'url'],
      tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && inputTypes.indexOf(type) !== -1) {
    return getInputValue(element);
  }

  if (tagName === 'textarea') {
    return getInputValue(element);
  }

  return '';
}

function getComboboxValue (element) {
  let inputTypes = ['email', 'search', 'tel', 'text', 'url'],
      tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && inputTypes.indexOf(type) !== -1) {
    return getInputValue(element);
  }

  return '';
}

function getSliderValue (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && type === 'range') {
    return getRangeValue(element);
  }

  return '';
}

function getSpinbuttonValue (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  if (tagName === 'input' && type === 'number') {
    return getRangeValue(element);
  }

  return '';
}

function getListboxValue (element) {
  let tagName = element.tagName.toLowerCase();

  if (tagName === 'select') {
    let arr = [], selectedOptions = element.selectedOptions;

    for (let i = 0; i < selectedOptions.length; i++) {
      let option = selectedOptions[i];
      let value = normalize(option.value);
      if (value.length) arr.push(value);
    }

    if (arr.length) return arr.join(' ');
  }

  return '';
}

/*
*   namefrom.js
*/

/*
*   getElementContents: Construct the ARIA text alternative for element by
*   processing its element and text node descendants and then adding any CSS-
*   generated content if present.
*/
function getElementContents (element, forElement) {
  let result = '';

  if (element.hasChildNodes()) {
    let children = element.childNodes,
        arrayOfStrings = [];

    for (let i = 0; i < children.length; i++) {
      let contents = getNodeContents(children[i], forElement);
      if (contents.length) arrayOfStrings.push(contents);
    }

    result = (arrayOfStrings.length) ? arrayOfStrings.join(' ') : '';
  }

  return addCssGeneratedContent(element, result);
}

// HIGHER-LEVEL FUNCTIONS THAT RETURN AN OBJECT WITH SOURCE PROPERTY

/*
*   nameFromAttribute
*/
function nameFromAttribute (element, attribute) {
  let name;

  name = getAttributeValue(element, attribute);
  if (name.length) return { name: name, source: attribute };

  return null;
}

/*
*   nameFromAltAttribute
*/
function nameFromAltAttribute (element) {
  let name = element.getAttribute('alt');

  // Attribute is present
  if (name !== null) {
    name = normalize(name);
    return (name.length) ?
      { name: name, source: 'alt' } :
      { name: '<empty>', source: 'alt' };
  }

  // Attribute not present
  return null;
}

/*
*   nameFromContents
*/
function nameFromContents (element) {
  let name;

  name = getElementContents(element);
  if (name.length) return { name: name, source: 'contents' };

  return null;
}

/*
*   nameFromDefault
*/
function nameFromDefault (name) {
  return name.length ? { name: name, source: 'default' } : null;
}

/*
*   nameFromDescendant
*/
function nameFromDescendant (element, tagName) {
  let descendant = element.querySelector(tagName);
  if (descendant) {
    let name = getElementContents(descendant);
    if (name.length) return { name: name, source: tagName + ' element' };
  }

  return null;
}

/*
*   nameFromLabelElement
*/
function nameFromLabelElement (doc, element) {
  let name, label;

  // label [for=id]
  if (element.id) {
    label = doc.querySelector('[for="' + element.id + '"]');
    if (label) {
      name = getElementContents(label, element);
      if (name.length) return { name: name, source: 'label reference' };
    }
  }

  // label encapsulation
  if (typeof element.closest === 'function') {
    label = element.closest('label');
    if (label) {
      name = getElementContents(label, element);
      if (name.length) return { name: name, source: 'label encapsulation' };
    }
  }

  return null;
}

/*
*   nameFromDetailsOrSummary: If element is expanded (has open attribute),
*   return the contents of the summary element followed by the text contents
*   of element and all of its non-summary child elements. Otherwise, return
*   only the contents of the first summary element descendant.
*/
function nameFromDetailsOrSummary (element) {
  let name, summary;

  function isExpanded (elem) { return elem.hasAttribute('open'); }

  // At minimum, always use summary contents
  summary = element.querySelector('summary');
  if (summary) name = getElementContents(summary);

  // Return either summary + details (non-summary) or summary only
  if (isExpanded(element)) {
    name += getContentsOfChildNodes(element, function (elem) {
      return elem.tagName.toLowerCase() !== 'summary';
    });
    if (name.length) return { name: name, source: 'contents' };
  }
  else {
    if (name.length) return { name: name, source: 'summary element' };
  }

  return null;
}

// LOW-LEVEL HELPER FUNCTIONS (NOT EXPORTED)

/*
*   getNodeContents: Recursively process element and text nodes by aggregating
*   their text values for an ARIA text equivalent calculation.
*   1. This includes special handling of elements with 'alt' text and embedded
*      controls.
*   2. The forElem parameter is needed for label processing to avoid inclusion
*      of an embedded control's value when the label is for the control itself.
*/
function getNodeContents (node, forElem) {
  let contents = '';
  let nc;
  let arr = [];

  if (node === forElem) return '';

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      if (node instanceof HTMLSlotElement) {
        // if no slotted elements, check for default slotted content
        const assignedNodes = node.assignedNodes().length ? node.assignedNodes() : node.assignedNodes({ flatten: true });
        assignedNodes.forEach( assignedNode => {
          nc = getNodeContents(assignedNode, forElem);
          if (nc.length) arr.push(nc);
        });
        contents = (arr.length) ? arr.join(' ') : '';
      } else {
        if (couldHaveAltText(node)) {
          contents = getAttributeValue(node, 'alt');
        }
        else if (isEmbeddedControl(node)) {
          contents = getEmbeddedControlValue(node);
        }
        else {
          if (node.hasChildNodes()) {
            let children = Array.from(node.childNodes);
            children.forEach( child => {
              nc = getNodeContents(child, forElem);
              if (nc.length) arr.push(nc);
            });
            contents = (arr.length) ? arr.join(' ') : '';
          }
        }
        // For all branches of the ELEMENT_NODE case...
      }
      contents = addCssGeneratedContent(node, contents);
      break;

    case Node.TEXT_NODE:
      contents = normalize(node.textContent);
  }

  return contents;
}

/*
*   couldHaveAltText: Based on HTML5 specification, determine whether
*   element could have an 'alt' attribute.
*/
function couldHaveAltText (element) {
  let tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case 'img':
    case 'area':
      return true;
    case 'input':
      return (element.type && element.type === 'image');
  }

  return false;
}

/*
*   addCssGeneratedContent: Add CSS-generated content for pseudo-elements
*   :before and :after. According to the CSS spec, test that content value
*   is other than the default computed value of 'none'.
*
*   Note: Even if an author specifies content: 'none', because browsers add
*   the double-quote character to the beginning and end of computed string
*   values, the result cannot and will not be equal to 'none'.
*/
function addCssGeneratedContent (element, contents) {
  let result = contents,
      prefix = getComputedStyle(element, ':before').content,
      suffix = getComputedStyle(element, ':after').content;

  if (prefix !== 'none') result = prefix + result;
  if (suffix !== 'none') result = result + suffix;

  return result;
}

/*
*   getContentsOfChildNodes: Using predicate function for filtering element
*   nodes, collect text content from all child nodes of element.
*/
function getContentsOfChildNodes (element, predicate) {
  let arr = [], content;

  Array.prototype.forEach.call(element.childNodes, function (node) {
    switch (node.nodeType) {
      case (Node.ELEMENT_NODE):
        if (predicate(node)) {
          content = getElementContents(node);
          if (content.length) arr.push(content);
        }
        break;
      case (Node.TEXT_NODE):
        content = normalize(node.textContent);
        if (content.length) arr.push(content);
        break;
    }
  });

  if (arr.length) return arr.join(' ');
  return '';
}

/*
*   getaccname.js
*
*   Note: Information in this module is based on the following documents:
*   1. HTML Accessibility API Mappings 1.0 (http://rawgit.com/w3c/aria/master/html-aam/html-aam.html)
*   2. SVG Accessibility API Mappings (http://rawgit.com/w3c/aria/master/svg-aam/svg-aam.html)
*/

const noAccName = {
  name: '',
  source: 'none'
};

/*
*   getAccessibleName: Use the ARIA Roles Model specification for accessible
*   name calculation based on its precedence order:
*   (1) Use aria-labelledby, unless a traversal is already underway;
*   (2) Use aria-label attribute value;
*   (3) Use whatever method is specified by the native semantics of the
*   element, which includes, as last resort, use of the title attribute.
*/
function getAccessibleName (doc, element, recFlag) {
  let accName = null;

  if (!recFlag) accName = nameFromAttributeIdRefs(doc, element, 'aria-labelledby');
  if (accName === null) accName = nameFromAttribute(element, 'aria-label');
  if (accName === null) accName = nameFromNativeSemantics(doc, element, recFlag);
  if (accName === null) accName = noAccName;

  return accName;
}

/*
*   getAccessibleDesc: Use the ARIA Roles Model specification for accessible
*   description calculation based on its precedence order:
*   (1) Use aria-describedby, unless a traversal is already underway;
*   (2) As last resort, use the title attribute.
*/
function getAccessibleDesc (doc, element, recFlag) {
  let accDesc = null;

  if (!recFlag) accDesc = nameFromAttributeIdRefs(doc, element, 'aria-describedby');
  if (accDesc === null) accDesc = nameFromAttribute(element, 'title');
  if (accDesc === null) accDesc = noAccName;

  return accDesc;
}


/*
*   getErrMessage: Use the ARIA Roles Model specification for accessible
*   description calculation based on its precedence order:
*   (1) Use aria-errormessage, unless a traversal is already underway;
*/
function getErrMessage (doc, element) {
  let errMessage = null;

  errMessage = nameFromAttributeIdRefs(doc, element, 'aria-errormessage');
  if (errMessage === null) errMessage = noAccName;

  return errMessage;
}

/*
*   nameFromNativeSemantics: Use method appropriate to the native semantics
*   of element to find accessible name. Includes methods for all interactive
*   elements. For non-interactive elements, if the element's ARIA role allows
*   its acc. name to be derived from its text contents, or if recFlag is set,
*   indicating that we are in a recursive aria-labelledby calculation, the
*   nameFromContents method is used.
*/
function nameFromNativeSemantics (doc, element, recFlag) {
  let tagName = element.tagName.toLowerCase(),
      ariaRole = getAriaRole(element),
      accName = null;

  // TODO: Verify that this applies to all elements
  if (ariaRole && (ariaRole === 'presentation' || ariaRole === 'none')) {
    return null;
  }

  switch (tagName) {
    // FORM ELEMENTS: INPUT
    case 'input':
      switch (element.type) {
        // HIDDEN
        case 'hidden':
          if (recFlag) {
            accName = nameFromLabelElement(doc, element);
          }
          break;

        // TEXT FIELDS
        case 'email':
        case 'password':
        case 'search':
        case 'tel':
        case 'text':
        case 'url':
          accName = nameFromLabelElement(doc, element);
          if (accName === null) accName = nameFromAttribute(element, 'placeholder');
          break;

        // OTHER INPUT TYPES
        case 'button':
          accName = nameFromAttribute(element, 'value');
          break;

        case 'reset':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Reset');
          break;

        case 'submit':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Submit');
          break;

        case 'image':
          accName = nameFromAltAttribute(element);
          if (accName === null) accName = nameFromAttribute(element, 'value');
          break;

        default:
          accName = nameFromLabelElement(doc, element);
          break;
      }
      break;

    // FORM ELEMENTS: OTHER
    case 'button':
      accName = nameFromContents(element);
      break;

    case 'label':
      accName = nameFromContents(element);
      break;

    case 'keygen':
    case 'meter':
    case 'output':
    case 'progress':
    case 'select':
      accName = nameFromLabelElement(doc, element);
      break;

    case 'textarea':
      accName = nameFromLabelElement(doc, element);
      if (accName === null) accName = nameFromAttribute(element, 'placeholder');
      break;

    // EMBEDDED ELEMENTS
    case 'audio': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'embed':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'iframe':
      accName = nameFromAttribute(element, 'title');
      break;

    case 'img':
    case 'area': // added
      accName = nameFromAltAttribute(element);
      break;

    case 'object':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'svg': // added
      accName = nameFromDescendant(element, 'title');
      break;

    case 'video': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    // OTHER ELEMENTS
    case 'a':
      accName = nameFromContents(element);
      break;

    case 'details':
      accName = nameFromDetailsOrSummary(element);
      break;

    case 'figure':
      accName = nameFromDescendant(element, 'figcaption');
      break;

    case 'table':
      accName = nameFromDescendant(element, 'caption');
      break;

    // ELEMENTS NOT SPECIFIED ABOVE
    default:
      if (nameFromIncludesContents(element) || recFlag)
        accName = nameFromContents(element);
      break;
  }

  // LAST RESORT USE TITLE
  if (accName === null) accName = nameFromAttribute(element, 'title');

  return accName;
}

// HELPER FUNCTIONS (NOT EXPORTED)

/*
*   nameFromAttributeIdRefs: Get the value of attrName on element (a space-
*   separated list of IDREFs), visit each referenced element in the order it
*   appears in the list and obtain its accessible name (skipping recursive
*   aria-labelledby or aria-describedby calculations), and return an object
*   with name property set to a string that is a space-separated concatena-
*   tion of those results if any, otherwise return null.
*/
function nameFromAttributeIdRefs (doc, element, attribute) {
//  console.log(`[nameFromAttributeIdRefs][      doc]: ${doc}`)
//  console.log(`[nameFromAttributeIdRefs][  element]: ${element}`)
//  console.log(`[nameFromAttributeIdRefs][attribute]: ${attribute}`)
  let value = getAttributeValue(element, attribute);
  let idRefs, i, refElement, accName, arr = [];

  if (value.length) {
    idRefs = value.split(' ');

    for (i = 0; i < idRefs.length; i++) {
      refElement = doc.getElementById(idRefs[i]);
      if (refElement) {
        accName = getAccessibleName(doc, refElement, true);
        if (accName && accName.name.length) arr.push(accName.name);
      }
    }
  }

  if (arr.length)
    return { name: arr.join(' '), source: attribute };

  return null;
}

/* domElement.js */

/* Constants */
const debug$f = new DebugLogging('DOMElement', false);

/**
 * @class DOMElement
 *
 * @desc Used to represent a dom element node with additional
 *       information useful for accessibility rules
 *
 * @param  {Object}  parentInfo  - ParentInfo object (can be null for top level)
 * @param  {Object}  elementNode - dom element node to be represented
 */

class DOMElement {
  constructor (parentInfo, elementNode, ordinalPosition) {
    const parentDomElement = parentInfo.domElement;
    const doc              = parentInfo.document;

    this.ordinalPosition  = ordinalPosition;
    this.parentInfo       = parentInfo;
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();

    this.ariaInHTMLInfo  = getAriaInHTMLInfo(elementNode);
    const defaultRole = this.ariaInHTMLInfo.defaultRole;

    this.hasRole = elementNode.hasAttribute('role');
    this.role    = this.hasRole ?
                   elementNode.getAttribute('role') :
                   defaultRole;

    this.hasNativeCheckedState  = hasCheckedState(elementNode);
    this.hasNativeInvalidState  = hasInvalidState(elementNode);

    this.ariaValidation   = new AriaValidation(doc, this.role, defaultRole, elementNode);

    this.accName           = getAccessibleName(doc, elementNode);
    this.accDescription    = getAccessibleDesc(doc, elementNode);
    this.errMessage        = getErrMessage(doc, elementNode);

    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);

    this.id         = elementNode.id        ? elementNode.id : '';
    this.className  = elementNode.className ? elementNode.className : '';
    this.htmlAttrs  = this.getHtmlAttrs(elementNode);
    this.ariaAttrs  = this.getAriaAttrs(elementNode);

    this.hasContent = false;
    this.mayHaveContent = false;
    this.children = [];

    // Information on rule results associated with this element
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];
  }


  /**
   * @method isDomText
   *
   * @desc
   *
   * @return {Boolean} Returns false since this is a DOMElement object
   */

  get isDomText () {
    return false;
  }

  /**
   * @method isLastChildDomText
   *
   * @desc
   *
   * @return {Boolean} Returns true if the last child is a DOMText object, otherwise false
   */

  get isLastChildDomText () {
    let flag = false;
    const lastChild = this.getLastChild();
    if (lastChild && lastChild.isDomText) {
      flag = true;
    }
    return flag;
  }

  /**
   * @method addChild
   *
   * @desc
   *
   * @param {Object}  domItem  -
   */

  addChild (domItem) {
    this.children.push(domItem);
  }

  /**
   * @method getLastChild
   *
   * @desc
   */

  getLastChild () {
    let len = this.children.length;
    let domItem = null;
    if (len) {
      domItem = this.children[len-1];
    }
    return domItem;
  }

  /**
   * @method getHtmlAttrs
   *
   * @desc Get non-ARIA attributes for the element in a name value object
   *
   * @param {Object}  node  - DOM node element
   *
   * @param {Array} array of objects with attribute name and value properties
   */

  getHtmlAttrs (node) {
    const htmlAttrs = {};
    const attrs = Array.from(node.attributes);
    attrs.forEach( attr => {
      if (attr.name.toLowerCase().indexOf('aria') !== 0) {
        htmlAttrs[attr.name] = attr.value;
      }
    });
    return htmlAttrs;
  }

  /**
   * @method getAriaAttrs
   *
   * @desc Get ARIA attributes for the element in a name value object
   *
   * @param {Object}  node  - DOM node element
   *
   * @param {Array} array of objects with attribute name and value properties
   */

  getAriaAttrs (node) {
    const ariaAttrs = {};
    const attrs = Array.from(node.attributes);
    attrs.forEach( attr => {
      if (attr.name.toLowerCase().indexOf('aria') === 0) {
        ariaAttrs[attr.name] = attr.value;
      }
    });
    return ariaAttrs;
  }

  /**
   * @method addTextToLastChild
   *
   * @desc
   *
   * @param {String}  text  -
   */

  addTextToLastChild (text) {
    const domItem = this.getLastChild();
    if (domItem && domItem.isDomText) {
      domItem.addText(text);
    }
  }

  toString () {
    this.tagName;
    let type = '';
    let id = '';

    if (this.node.type) {
      type = `[type=${this.node.type}]`;
    }

    if (this.node.id) {
      id = `[id=${this.node.id}]`;
    }

    return `${this.tagName}${type}${id}[${this.role}]`;
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */
  showDomElementTree (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    if (debug$f.flag) {
      this.children.forEach( domItem => {
        if (domItem.isDomText) {
          debug$f.domText(domItem, prefix);
        } else {
          debug$f.domElement(domItem, prefix);
          domItem.showDomElementTree(prefix + '   ');
        }
      });
    }
  }
}

/* domText.js */

/* Constants */
new DebugLogging('domText', false);

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

class DOMText {
  constructor (parentDomElement, textNode) {
    this.parentDomElement = parentDomElement;
    this.text = textNode.textContent.trim();
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

/* listInfo.js */

/* Constants */
const debug$e = new DebugLogging('ListInfo', true);
const allListitemRoles = ['list', 'listitem', 'menu', 'menuitem', 'menuitemcheckbox', 'menuitemradio'];
const listRoles = ['list', 'menu'];

/**
 * @class ListElement
 *
 * @desc Idenifies a DOM element as being a container for a list of items.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class ListElement {
  constructor (domElement, parentListElement) {

    this.parentListElement = parentListElement;
    this.domElement = domElement;
    this.childListElements = [];
    this.isListRole = this.isList(domElement);
    this.linkCount = 0;  // Used in determining if a list is for navigation

    if (debug$e.flag) {
      debug$e.log('');
    }
  }

  /**
   * @method isList
   *
   * @desc Tests if a domElement is a list
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isList (domElement) {
    const role = domElement.role;
    return listRoles.includes(role);
  }

  addChildListitem (listElement) {
    this.childListElements.push(listElement);
  }

  showListInfo (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    debug$e.log(`${prefix}[List Count]: ${this.childListElements.length} [Link Count]: ${this.linkCount}`);
    this.childListElements.forEach( le => {
      debug$e.domElement(le.domElement, prefix);
      le.showListInfo(prefix + '  ');
    });
  }
}
/**
 * @class ListInfo
 *
 * @desc Collects information on the list elements on a web page for use in
 *       rules
 *
 * @param  {Object}  ListInfo   - Structural Information
 */

class ListInfo {
  constructor () {

    this.allListElements = [];
    this.childListElements = [];
    this.linkCount = 0;
  }

  /**
   * @method addChildListitem
   *
   * @desc Creates a new ListElement and to the array of
   *       ListElements
   *
   * @param  {Object}  domElement        - New ListElement object being added to ListInfo
   * @param  {Object}  parentListElement - ListElement object representing that parent ListElement
   *
   */

  addChildListitem (domElement, parentListElement) {
    const le = new ListElement(domElement, parentListElement);
    this.allListElements.push(le);

    if (parentListElement) {
      parentListElement.addChildListitem(le);
    } else {
      this.childListElements.push(le);
    }
    return le;
  }

  /**
   * @method isListitem
   *
   * @desc Tests if a domElement is a listitem
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isListitem (domElement) {
    const role = domElement.role;
    return allListitemRoles.includes(role);
  }

  /**
   * @method isLink
   *
   * @desc Tests if a domElement is a link
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isLink (domElement) {
    return domElement.role === 'link';
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement is a list item and if so adds the
   *       domElement to the List Info object and current ListElement
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   *
   * @return  {Object}  ListElement - ListElement object for use as the parent ListElement
   *                                  for descendant domElements
   */

  update (parentListElement, domElement) {
    let listElement = parentListElement;
    if (this.isListitem(domElement)) {
      listElement = this.addChildListitem(domElement, parentListElement);
    }
    if (this.isLink(domElement)) {
      this.linkCount += 1;
      while (parentListElement) {
        if (parentListElement.isListRole) {
          parentListElement.linkCount += 1;
          break;
        }
        parentListElement = parentListElement.parentListElement;
      }
    }
    return listElement;
  }

  /**
   * @method showListInfo
   *
   * @desc showListInfo is used for debugging the ListInfo and ListElement objects
   */

  showListInfo () {
    if (debug$e.flag) {
      debug$e.log('== All ListElements ==', 1);
      debug$e.log(`[linkCount]: ${this.linkCount}`);
      this.allListElements.forEach( le => {
        debug$e.domElement(le.domElement);
      });
      debug$e.log('== List Tree ==', 1);
      debug$e.log(`[linkCount]: ${this.linkCount}`);
      this.childListElements.forEach( le => {
        debug$e.domElement(le.domElement);
        le.showListInfo('  ');
      });
    }
  }
}

/* structureInfo.js */

/* Constants */
const debug$d = new DebugLogging('structureInfo', false);
const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const headingRole = 'heading';
const landmarkRoles = ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search'];
const requireAccessibleNames = ['region', 'form'];

/**
 * @class LandmarkElement
 *
 * @desc Idenifies a DOM element as being a landmark and relationships to other landmarks and headings.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class LandmarkElement {
  constructor (domElement, parentLandmarkElement) {

    this.parentLandmarkElement = parentLandmarkElement;
    this.domElement = domElement;
    this.childLandmarkElements = [];
    this.childHeadingDomElements = [];

    if (debug$d.flag) {
      debug$d.log('');
    }
  }

  addChildLandmark (LandmarkElement) {
    this.childLandmarkElements.push(LandmarkElement);
  }

  addChildHeading (domElement) {
    this.childHeadingDomElements.push(domElement);
  }

  showLandmarkInfo (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    debug$d.log(`${prefix}[Landmarks Count]: ${this.childLandmarkElements.length}`);
    this.childLandmarkElements.forEach( le => {
      debug$d.domElement(le.domElement, prefix);
      le.showLandmarkInfo(prefix + '  ');
    });
    debug$d.log(`${prefix}[Headings Count]: ${this.childHeadingDomElements.length}`);
    this.childHeadingDomElements.forEach( h => {
      debug$d.domElement(h, prefix);
    });
  }
}
/**
 * @class StructureInfo
 *
 * @desc Collects information on the landmarks or headings on a web page for use in
 *       rules
 *
 * @param  {Object}  structuralInfo   - Structural Information
 */

class StructureInfo {
  constructor () {

    this.allLandmarkElements = [];
    this.allHeadingDomElements = [];
    this.childLandmarkElements = [];

    if (debug$d.flag) ;
  }

  /**
   * @method addChildLandmark
   *
   * @desc Creates a new LandmarkElement and to the array of
   *       LandmarkElements
   *
   * @param  {Object}  domElement       - New LandmarkElement object being added to StrutureInfo
   * @param  {Object}  parentLandmarkElement - LandmarkElement object representing that parent
   *                                           LandmarkElement
   */

  addChildLandmark (domElement, parentLandmarkElement) {
    const le = new LandmarkElement(domElement, parentLandmarkElement);
    this.allLandmarkElements.push(le);

    if (parentLandmarkElement) {
      parentLandmarkElement.addChildLandmark(le);
    } else {
      this.childLandmarkElements.push(le);
    }

    return le;
  }

  /**
   * @method addChildHeading
   *
   * @desc
   *
   * @param  {Object}  domElement            - DOMElement object representing an element in the DOM
   * @param  {Object}  parentLandmarkElement - LandmarkElement object representing an landmark region
   */

  addChildHeading (domElement, parentLandmarkElement) {
    this.allHeadingDomElements.push(domElement);
    if (parentLandmarkElement) {
      parentLandmarkElement.addChildHeading(domElement);
    }
  }

  /**
   * @method isLandmark
   *
   * @desc Tests if a domElement is a landmark
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isLandmark (domElement) {
    let flag = false;
    const role = domElement.role || domElement.defaultRole;
    const name = domElement.accName.name;

    if (landmarkRoles.includes(role)) {
      if (requireAccessibleNames.includes(role)) {
        flag = name && name.length;
      } else {
        flag = true;
      }
    }

    return flag;
  }

  /**
   * @method isHeading
   *
   * @desc Tests if a domElement is a heading
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isHeading (domElement) {
    const tagName = domElement.tagName;
    const role = domElement.role;
    return (role === headingRole) || (headingTags.includes(tagName));
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement is a heading or landmark and if so adds the
   *       domElement to the StrutureInfo object and current LandmarkElement
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   *
   * @return  {Object}  LandmarkElement - Landmarklement object for use as the parent landmark
   *                                      element for descendant domElements
   */

  update (parentLandmarkElement, domElement) {
    let landmarkElement = parentLandmarkElement;
    if (this.isHeading(domElement)) {
      this.addChildHeading(domElement, parentLandmarkElement);
    }

    if (this.isLandmark(domElement)) {
      landmarkElement = this.addChildLandmark(domElement, parentLandmarkElement);
    }
    return landmarkElement;
  }

  /**
   * @method showStructureInfo
   *
   * @desc showSructureInfo is used for debugging the StructureInfo and LandmarkElement objects
   */

  showStructureInfo () {
    if (debug$d.flag) {
      debug$d.log('== All Headings ==', 1);
      this.allHeadingDomElements.forEach( h => {
        debug$d.domElement(h);
      });
      debug$d.log('== All Landmarks ==', 1);
      this.allLandmarkElements.forEach( le => {
        debug$d.domElement(le.domElement);
      });
      debug$d.log('== Structure Tree ==', 1);
      this.childLandmarkElements.forEach( le => {
        debug$d.domElement(le.domElement);
        le.showLandmarkInfo('  ');
      });
    }
  }
}

/* domCache.js */

/* Constants */
const debug$c = new DebugLogging('domCache', true);

const elementsWithContent = [
  'area',
  'audio',
  'canvas',
  'img',
  'input',
  'select',
  'svg',
  'textarea',
  'video'
];

const elementsThatMayHaveContent = [
  'embed',
  'object'
];

const skipableElements = [
  'base',
  'content',
  'link',
  'meta',
  'noscript',
  'object',
  'script',
  'style',
  'template',
  'shadow',
  'title'
];

/**
 * @class ParentInfo
 *
 * @desc Contains reference to ancestor objects in the DOMCache
 *
 * @param  {Object}  info - Parent ParentInfo object
 */

class ParentInfo {
  constructor (info) {
    this.document        = null;
    this.domElement      = null;
    this.landmarkElement = null;
    this.listElement     = null;
    this.controlElement  = null;

    if (info) {
      this.document        = info.document;
      this.domElement      = info.domElement;
      this.landmarkElement = info.landmarkElement;
      this.listElement     = info.listElement;
      this.controlElement  = info.controlElement;
    }
  }
}

/**
 * @class DOMCache
 *
 * @desc Builds a cache of the dom from the startingNode and computes
 *       information useful for accessibility rules
 *       The dom cache is passed into rules for computing evaluation
 *       results
 *
 * @param  {Object}  startingDoc     - Browser document object model (DOM) to build cache
 * @param  {Object}  startingElement - DOM node to start evalution, if not defined use
 *                                     document.body
 */

class DOMCache {
  constructor (startingDoc, startingElement) {
    if (typeof startingElement !== 'object') {
      startingElement = startingDoc.body;
    }

    this.ordinalPosition = 2;

    this.allDomElements = [];
    this.allDomTexts    = [];

    const parentInfo = new ParentInfo();
    parentInfo.document = startingDoc;

    this.structureInfo = new StructureInfo();
    this.listInfo      = new ListInfo();

  	this.startingDomElement = new DOMElement(parentInfo, startingElement, 1);
    parentInfo.domElement = this.startingDomElement;
    this.allDomElements.push(this.startingDomElement);

    // Information on rule results associated with page
    this.resultsHidden       = [];
    this.resultsPassed       = [];
    this.resultsViolations   = [];
    this.resultsWarnings     = [];
    this.resultsManualChecks = [];

    this.transverseDOM(parentInfo, startingElement);

    // Debug features
    if (debug$c.flag) {
      this.showDomElementTree();
      this.structureInfo.showStructureInfo();
      this.listInfo.showListInfo();
    }
  }

  // Tests if a tag name can be skipped
  isSkipableElement(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustomElement(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  // Tests if a node is a iframe element
  isIFrameElement(node) {
    return (node instanceof HTMLIFrameElement);
  }

  // Tests if a node is a slot element
  isSlotElement(node) {
    return (node instanceof HTMLSlotElement);
  }

  /**
   * @method transverseDOM
   *
   * @desc Used to collect accessibility information for all the element nd text
   *       nodes on a web page for use the the rules.  It pre-computes values
   *       that are used by the accessibility rules to test accessibility 
   *       requirements 
   *
   * @param {Object}  parentinfo      - Parent DomElement associated with the
   *                                    parent element node of the starting node
   * @param {Object}  startingNode    - The dom element to start transversing the
   *                                    dom
   */

  transverseDOM(parentInfo, startingNode) {
    let domItem = null;
    let parentDomElement = parentInfo.domElement;

    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          domItem = new DOMText(parentDomElement, node);
          // Check to see if text node has any renderable content
          if (domItem.hasContent) {
            // Merge text nodes in to a single DomText node if sibling text nodes
            if (parentDomElement) {
              parentDomElement.hasContent = true;
              // if last child node of parent is a DomText node merge text content
              if (parentDomElement.isLastChildDomText) {
                parentDomElement.addTextToLastChild(domItem.text);
              } else {
                parentDomElement.addChild(domItem);
                this.allDomTexts.push(domItem);
              }
            }
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();

          if (parentDomElement) {
            if (elementsWithContent.includes(tagName)) {
                parentDomElement.hasContent = true;
            }
            if (elementsThatMayHaveContent.includes(tagName)) {
                parentDomElement.mayHaveContent = true;
            }
          }

          if (!this.isSkipableElement(tagName)) {
            // check for slotted content
            if (this.isSlotElement(node)) {
                // if no slotted elements, check for default slotted content
              const assignedNodes = node.assignedNodes().length ?
                                    node.assignedNodes() :
                                    node.assignedNodes({ flatten: true });
              assignedNodes.forEach( assignedNode => {
                this.transverseDOM(parentInfo, assignedNode);
              });
            } else {
              domItem = new DOMElement(parentInfo, node, this.ordinalPosition);
              this.ordinalPosition += 1;
              this.allDomElements.push(domItem);

              if (parentDomElement) {
                parentDomElement.addChild(domItem);
              }
              const newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);

              // check for custom elements
              if (this.isCustomElement(tagName)) {
                if (node.shadowRoot) {
                  newParentInfo.document = node.shadowRoot;
                  this.transverseDOM(newParentInfo, node.shadowRoot);
                }
              } else {
                // Check for iframe or frame tag
                if (this.isIFrameElement(node)) {
                  if (node.contentWindow.document) {
                    newParentInfo.document = node.contentWindow.document;
                    this.transverseDOM(newParentInfo, node.contentWindow.document);
                  }
                } else {
                  this.transverseDOM(newParentInfo, node);
                }
              }
            }
          }   
          break;

      } /* end switch */
    } /* end for */
  }


  /**
   * @method updateDOMElementInformation
   *
   * @desc  Updates page level collections of elements for landmarks, headings and controls
   *
   * @param {Object}  parentinfo  - Parent DomElement associated DOMElement
   * @param {Object}  domElement  - The dom element to start transversing the
   *                                      dom
   *
   * @returns {Object} ParentInfo  - updated ParentInfo object for use in the transversal
   */

  updateDOMElementInformation (parentInfo, domElement) {
    const landmarkElement = parentInfo.landmarkElement;
    const listElement = parentInfo.listElement;

    let newParentInfo = new ParentInfo(parentInfo);
    newParentInfo.domElement = domElement;

    newParentInfo.landmarkElement = this.structureInfo.update(landmarkElement, domElement);
    newParentInfo.listElement     = this.listInfo.update(listElement, domElement);

    return newParentInfo;
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */

  showDomElementTree () {
    debug$c.log(' === AllDomElements ===', true);
    this.allDomElements.forEach( de => {
      debug$c.domElement(de);
    });

    debug$c.log(' === AllDomTexts ===', true);
    this.allDomTexts.forEach( dt => {
      debug$c.domText(dt);
    });

    debug$c.log(' === DOMCache Tree ===', true);
    debug$c.domElement(this.startingDomElement);
    this.startingDomElement.showDomElementTree(' ');
  }
}

/* constants.js */

/* Constants */
const debug$b = new DebugLogging('constants', false);

const VERSION = '2.0.beta1';

/**
 * @constant RULESET
 * @type Integer
 * @desc Constants related to the priority of learning a rule
 *       For example people new to accessibility would start
 *       with understanding TRIAGE rules and then moving to MORE
 *       and as they gain experience can use ALL
 *
 * @example
 * RULESET.TRIAGE
 * RULESET.MORE
 * RULESET.ALL
 */

const RULESET =  {
  TRIAGE: 1,
  MORE: 2,
  ALL: 3
};

/**
 * @constant RULE_CATEGORIES * @type Integer
 * @desc Numercial constant representing a rule category and is bit maskable
 *
 * @example
 * RULE_CATEGORIES.UNDEFINED
 * RULE_CATEGORIES.AUDIO_VIDEO
 * RULE_CATEGORIES.FORMS
 * RULE_CATEGORIES.HEADINGS
 * RULE_CATEGORIES.IMAGES
 * RULE_CATEGORIES.KEYBOARD_SUPPORT
 * RULE_CATEGORIES.LINKS
 * RULE_CATEGORIES.LANDMARKS
 * RULE_CATEGORIES.SITE_NAVIGATION
 * RULE_CATEGORIES.STYLES_READABILITY
 * RULE_CATEGORIES.TABLES
 * RULE_CATEGORIES.TIMING
 * RULE_CATEGORIES.WIDGETS_SCRIPTS
 */

const RULE_CATEGORIES = {
  UNDEFINED              : 0x0000,
  LANDMARKS              : 0x0001,
  HEADINGS               : 0x0002,
  STYLES_READABILITY     : 0x0004,
  IMAGES                 : 0x0008,
  LINKS                  : 0x0010,
  TABLES                 : 0x0020,
  FORMS                  : 0x0040,
  WIDGETS_SCRIPTS        : 0x0080,
  AUDIO_VIDEO            : 0x0100,
  KEYBOARD_SUPPORT       : 0x0200,
  TIMING                 : 0x0400,
  SITE_NAVIGATION        : 0x0800,
  // Composite categories
  ALL                    : 0x0FFF
};

  /**
 * @constant RULE_SCOPE * @type Integer
 * @desc Defines scope of a rule
 *
 * @example
 * RULE_SCOPE.UNKNOWN
 * RULE_SCOPE.ELEMENT
 * RULE_SCOPE.PAGE
 * RULE_SCOPE.WEBSITE
 */

const RULE_SCOPE =  {
  UNKNOWN : 0,
  ELEMENT : 1,
  PAGE    : 2,
  WEBSITE : 3
};

  /**
 * @constant TEST_RESULT * @type Integer
 * @desc Types of rule results, used in validation functions
 *
 * @example
 * TEST_RESULT.FAIL
 * TEST_RESULT.HIDDEN
 * TEST_RESULT.MANUAL_CHECK
 * TEST_RESULT.NONE
 * TEST_RESULT.PASS
 */

const TEST_RESULT = {
  PASS         : 1,
  FAIL         : 2,
  MANUAL_CHECK : 3,
  HIDDEN       : 4,
  NONE         : 5
};

/**
 * @constant IMPLEMENTATION_VALUE * @type Integer
 * @desc Constants used to represent the level of implementation
 *
 * @example
 * IMPLEMENTATION_VALUE.UNDEFINED
 * IMPLEMENTATION_VALUE.NOT_APPLICABLE
 * IMPLEMENTATION_VALUE.NOT_IMPLEMENTED
 * IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION
 * IMPLEMENTATION_VALUE.ALMOST_COMPLETE
 * IMPLEMENTATION_VALUE.COMPLETE
 * IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS
 * IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY
 */

const IMPLEMENTATION_VALUE = {
  UNDEFINED                   : 0,
  NOT_APPLICABLE              : 1,
  NOT_IMPLEMENTED             : 2,
  PARTIAL_IMPLEMENTATION      : 3,
  ALMOST_COMPLETE             : 4,
  COMPLETE                    : 5,
  COMPLETE_WITH_MANUAL_CHECKS : 6,
  MANUAL_CHECKS_ONLY          : 7
};

  /**
 * @constant RESULT_VALUE
 * @type Integer
 * @desc Constants used to represent evaluation results at the element level
 *
 * @example
 * RESULT_VALUE.UNDEFINED
 * RESULT_VALUE.PASS
 * RESULT_VALUE.HIDDEN
 * RESULT_VALUE.MANUAL_CHECK
 * RESULT_VALUE.VIOLATION
 * RESULT_VALUE.WARNING
 */

const RESULT_VALUE = {
  UNDEFINED      : 0,
  PASS           : 1,
  HIDDEN         : 2,  // Content is hidden and not tested for accessibility
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

/**
 * @constant RULE_RESULT_VALUE * @type Integer
 * @desc Constants used to represent evaluation results at the rule level
 *
 * @example
 * RULE_RESULT_VALUE.UNDEFINED
 * RULE_RESULT_VALUE.NOT_APPLICABLE
 * RULE_RESULT_VALUE.PASS
 * RULE_RESULT_VALUE.MANUAL_CHECK
 * RULE_RESULT_VALUE.WARNING
 * RULE_RESULT_VALUE.VIOLATION
 */

const RULE_RESULT_VALUE = {
  UNDEFINED      : 0,
  NOT_APPLICABLE : 1,
  PASS           : 2,
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

  /**
 * @constant WCAG_PRINCIPLE
 * @type Integer
 * @desc Numercial constant representing a WCAG 2.0 Principles
 *
 * @example
 * WCAG_PRINCIPLE.P_1
 * WCAG_PRINCIPLE.P_2
 * WCAG_PRINCIPLE.P_3
 * WCAG_PRINCIPLE.P_4
 */
const WCAG_PRINCIPLE = {
  P_1          : 0x000001,
  P_2          : 0x000002,
  P_3          : 0x000004,
  P_4          : 0x000008,
  ALL          : 0x00000F
};

  /**
 * @constant WCAG_GUIDELINE
 * @type Integer
 * @desc Numercial constant representing a WCAG 2.0 Guidelines
 *
 * @example
 * WCAG_GUIDELINE.G_1_1
 * WCAG_GUIDELINE.G_1_2
 * WCAG_GUIDELINE.G_1_3
 * WCAG_GUIDELINE.G_1_4
 * WCAG_GUIDELINE.G_2_1
 * WCAG_GUIDELINE.G_2_2
 * WCAG_GUIDELINE.G_2_3
 * WCAG_GUIDELINE.G_2_4
 * WCAG_GUIDELINE.G_3_1
 * WCAG_GUIDELINE.G_3_2
 * WCAG_GUIDELINE.G_3_3
 * WCAG_GUIDELINE.G_4_1
 */

const WCAG_GUIDELINE = {
  G_1_1          : 0x000010,
  G_1_2          : 0x000020,
  G_1_3          : 0x000040,
  G_1_4          : 0x000080,
  G_2_1          : 0x000100,
  G_2_2          : 0x000200,
  G_2_3          : 0x000400,
  G_2_4          : 0x000800,
  G_2_5          : 0x001000,
  G_3_1          : 0x002000,
  G_3_2          : 0x004000,
  G_3_3          : 0x008000,
  G_4_1          : 0x010000,
  ALL            : 0x01FFF0
};

/**
 * @constant WCAG_SUCCESS_CRITERION * @type Integer
 * @desc Numercial constant representing a WCAG 2.x Success Criteria
 *
 * @example
 * WCAG_SUCCESS_CRITERION.SC_1_1_1
 * ....
 * WCAG_SUCCESS_CRITERION.SC_4_1_2
 */

const WCAG_SUCCESS_CRITERION = {
  SC_1_1_1          : 0x1101,
  SC_1_2_1          : 0x1201,
  SC_1_2_2          : 0x1202,
  SC_1_2_3          : 0x1203,
  SC_1_2_4          : 0x1204,
  SC_1_2_5          : 0x1205,
  SC_1_2_6          : 0x1206,
  SC_1_2_7          : 0x1207,
  SC_1_2_8          : 0x1208,
  SC_1_2_9          : 0x1209,
  SC_1_3_1          : 0x1301,
  SC_1_3_2          : 0x1302,
  SC_1_3_3          : 0x1303,
  SC_1_3_4          : 0x1304,
  SC_1_3_5          : 0x1305,
  SC_1_3_6          : 0x1306,
  SC_1_4_1          : 0x1401,
  SC_1_4_2          : 0x1402,
  SC_1_4_3          : 0x1403,
  SC_1_4_4          : 0x1404,
  SC_1_4_5          : 0x1405,
  SC_1_4_6          : 0x1406,
  SC_1_4_7          : 0x1407,
  SC_1_4_8          : 0x1408,
  SC_1_4_9          : 0x1409,
  SC_1_4_10         : 0x1410,
  SC_1_4_11         : 0x1411,
  SC_1_4_12         : 0x1412,
  SC_1_4_13         : 0x1413,
  SC_2_1_1          : 0x2101,
  SC_2_1_2          : 0x2102,
  SC_2_1_3          : 0x2103,
  SC_2_1_4          : 0x2104,
  SC_2_2_1          : 0x2201,
  SC_2_2_2          : 0x2202,
  SC_2_2_3          : 0x2203,
  SC_2_2_4          : 0x2204,
  SC_2_2_5          : 0x2205,
  SC_2_2_6          : 0x2206,
  SC_2_3_1          : 0x2301,
  SC_2_3_2          : 0x2302,
  SC_2_3_3          : 0x2303,
  SC_2_4_1          : 0x2401,
  SC_2_4_2          : 0x2402,
  SC_2_4_3          : 0x2403,
  SC_2_4_4          : 0x2404,
  SC_2_4_5          : 0x2405,
  SC_2_4_6          : 0x2406,
  SC_2_4_7          : 0x2407,
  SC_2_4_8          : 0x2408,
  SC_2_4_9          : 0x2409,
  SC_2_4_10         : 0x2410,
  SC_2_5_1          : 0x2501,
  SC_2_5_2          : 0x2502,
  SC_2_5_3          : 0x2503,
  SC_2_5_4          : 0x2504,
  SC_2_5_5          : 0x2505,
  SC_2_5_6          : 0x2506,
  SC_3_1_1          : 0x3101,
  SC_3_1_2          : 0x3102,
  SC_3_1_3          : 0x3103,
  SC_3_1_4          : 0x3104,
  SC_3_1_5          : 0x3105,
  SC_3_1_6          : 0x3106,
  SC_3_2_1          : 0x3201,
  SC_3_2_2          : 0x3202,
  SC_3_2_3          : 0x3203,
  SC_3_2_4          : 0x3204,
  SC_3_2_5          : 0x3205,
  SC_3_3_1          : 0x3301,
  SC_3_3_2          : 0x3302,
  SC_3_3_3          : 0x3303,
  SC_3_3_4          : 0x3304,
  SC_3_3_5          : 0x3305,
  SC_3_3_6          : 0x3306,
  SC_4_1_1          : 0x4101,
  SC_4_1_2          : 0x4102,
  SC_4_1_3          : 0x4103
};

/**
 * @constant REFERENCES
 * @type Integer
 * @desc Types of reference for supplemential materials to help people understand an accessibility requirement and
 *       how to improve the accessibility
 *
 * @example
 * REFERENCES.UNKNOWN
 * REFERENCES.SPECIFICATION
 * REFERENCES.WCAG_TECHNIQUE
 * REFERENCES.TECHNIQUE
 * REFERENCES.EXAMPLE
 * REFERENCES.MANUAL_CHECK
 * REFERENCES.AUTHORING_TOOL
 * REFERENCES.OTHER
 */

const REFERENCES = {
  UNKNOWN         : 0,
  AUTHORING_TOOL  : 1,
  EXAMPLE         : 2,
  LIBRARY_PRODUCT : 3,
  MANUAL_CHECK    : 4,
  OTHER           : 5,
  PURPOSE         : 6,
  RULE_CATEGORY   : 7,
  REFERENCE       : 8,
  SPECIFICATION   : 9,
  TECHNIQUE       : 10,
  WCAG_TECHNIQUE  : 11
};

/**
 * @constant WCAG_LEVEL
 * @type Integer
 * @desc Constants related to the level of importance of a success criteria
 *
 * @example
 * WCAG_LEVEL.A
 * WCAG_LEVEL.AA
 * WCAG_LEVEL.AAA
 */

const WCAG_LEVEL =  {
  A       : 4,
  AA      : 2,
  AAA     : 1,
  UNKNOWN : 0
};

/*  Constant helper functions */

/**
 * @function getGuidelineId
 *
 * @desc Returns constant identifying the WCAG Guideline
 *
 * @param {String} sc - String representing a success criteria (e.g. '2.4.1')
 *
 * @return {Integer}
 */

function getGuidelineId(sc) {
  debug$b.flag && debug$b.log(`[getGuidelineId][sc]: ${sc}`);
  const parts = sc.split('.');
  const gl = (parts.length === 3) ? `G_${parts[0]}_${parts[1]}` : ``;
  if (!gl) {
    return 0;
  }
  debug$b.flag && debug$b.log(`[getGuidelineId][gl]: ${gl}`);
  return WCAG_GUIDELINE[gl];
}

/**
 * @function getResultValue
 *
 * @desc Returns RESULT_VALUE constant identifying the result based on
 *       the rule being required or recommended
 *
 * @param  {Integer}  testValue  - a TEST_VALUE constant representing the
 *                                 result
 * @param  {Boolean}  isrequired  - true if the rule is required
 *
 * @return {Integer} see @desc
 */

function getResultValue(testValue, isRequired) {
    switch (testValue) {

      case TEST_RESULT.PASS:
        return RESULT_VALUE.PASS;

      case TEST_RESULT.FAIL:
        if (isRequired) {
          return RESULT_VALUE.VIOLATION;
        }
        else {
          return RESULT_VALUE.WARNING;
        }

      case TEST_RESULT.MANUAL_CHECK:
        return RESULT_VALUE.MANUAL_CHECK;

      case TEST_RESULT.HIDDEN:
        return RESULT_VALUE.HIDDEN;
    }

    return RESULT_VALUE.NONE;
}

/* colorRules.js */

/* Constants */
new DebugLogging('Color Rules', false);

/*
 * OpenA11y Alliance Rules
 * Rule group: Styling Rules
 */

const colorRules$1 = [
  /**
   * @object COLOR_1
   *
   * @desc  Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
   */

  { rule_id             : 'COLOR_1',
    last_updated        : '2022-04-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    ruleset             : RULESET.TRIAGE,
    rule_required       : true,
    wcag_primary_id     : '1.4.3',
    wcag_related_ids    : ['1.4.1','1.4.6'],
    target_resources    : ['text content'],
    validate            : function (dom_cache, rule_result) {

      const MIN_CCR_NORMAL_FONT = 4.5;
      const MIN_CCR_LARGE_FONT  = 3.1;

      dom_cache.allDomTexts.forEach( domText => {
        const de  = domText.parentDomElement;
        const cc  = de.colorContrast;
        const ccr = cc.colorContrastRatio;
        const vis = de.visibility;

        if (vis.isVisibleOnScreen) {
          if (cc.isLargeFont) {
            if (ccr >= MIN_CCR_LARGE_FONT) {
              // Passes color contrast requirements
              if (cc.hasBackgroundImage) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_3', [ccr]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, domText, 'ELEMENT_PASS_2', [ccr]);
              }
            }
            else {
              // Fails color contrast requirements
              if (cc.hasBackgroundImage) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_4', [ccr]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, domText, 'ELEMENT_FAIL_2', [ccr]);
              }
            }
          }
          else {
            if (ccr >= MIN_CCR_NORMAL_FONT) {
              // Passes color contrast requirements
              if (cc.hasBackgroundImage) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_1', [ccr]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, domText, 'ELEMENT_PASS_1', [ccr]);
              }
            }
            else {
              // Fails color contrast requirements
              if (cc.background_image === "none") {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_2', [ccr]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, domText, 'ELEMENT_FAIL_1', [ccr]);
              }
            }
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, domText, 'ELEMENT_HIDDEN_1', []);
        }
      });
    } // end validate function
  },

  /**
   * @object COLOR_1
   *
   * @desc  Use of color
   */

  { rule_id             : 'COLOR_2',
    last_updated        : '2022-04-21',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    ruleset             : RULESET.TRIAGE,
    wcag_primary_id     : '1.4.1',
    wcag_related_ids    : [],
    target_resources    : [],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validate function
  }

];

/* landmarkRules.js */

/* Constants */
new DebugLogging('Landmark Rules', false);

/* common.js */

const common = {
  level: ['undefined', 'AAA', 'AA', 'undefined', 'A'],
  elementResult: ['undefined','P','H','MC','W','V'],
  ruleResult: ['undefined', 'N/A', 'P', 'MC', 'W', 'V'],
  ruleScopes: ['undefined', 'element', 'page', 'website'],
  allRuleResults: 'All Rule Results',
  implementationValue: [
    'undefined',
    'Not Applicable',
    'Not Implemented',
    'Partial Implementation',
    'Almost Complete',
    'Complete',
    'Complete with Manual Checks',
    'Manual Checks Only'
    ],
  ruleResultMessages: {
    'ACTION_NONE': 'No action needed',
    'NOT_APPLICABLE': 'Not applicable'
  }
};

/* ruleCategories.js */

const ruleCategories = [
  {
    id           : RULE_CATEGORIES.LANDMARKS,
    title        : 'Landmarks',
    url          : '',
    description  : 'Use ARIA landmark roles to structure the content of each page and identify major sections of content, thus making them more findable and navigable. The use of landmarks will, in many cases, reflect the visual styling and page layouts that web designers utilize to set apart various sections of content.'
  },
  {
    id           : RULE_CATEGORIES.HEADINGS,
    title        : 'Headings',
    url          : '',
    description  : 'Use heading elements (H1-H6) to provide appropriate labels for landmarks, and to identify subsections of content within landmarks.'
  },
  {
    id           : RULE_CATEGORIES.STYLES_READABILITY,
    title        : 'Styles/Content',
    url          : '',
    description  : 'Use proper HTML markup to identify the semantics and language of text content. Ensure that text is readable by adhering to color contrast guidelines, and that information is not conveyed solely by the use of color, shape, location or sound.'
  },
  {
    id           : RULE_CATEGORIES.IMAGES,
    title        : 'Images',
    url          : '',
    description  : 'Provide appropriate text alternatives for static images and graphics.'
  },
  {
    id           : RULE_CATEGORIES.LINKS,
    title        : 'Links',
    url          : '',
    description  : 'Use link text that properly describes the target of each link. Ensure consistency and uniqueness for links that are usable, predictable and understandable.'
  },
  {
    id           : RULE_CATEGORIES.TABLES,
    title        : 'Tables',
    url          : '',
    description  : 'Provide table captions or other meta-information as needed. Provide row and column header references for data cells of data tables. Ensure that tables used for layout properly linearize text content.'
  },
  {
    id           : RULE_CATEGORIES.FORMS,
    title        : 'Forms',
    url          : '',
    description  : 'Provide meaningful labels for form elements and usable and understandable error feedback as needed.'
  },
  {
    id           : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    title        : 'Widgets/Scripts',
    url          : '',
    description  : 'Use appropriate event handlers on elements to support native interactivity using JavaScript. Ensure that custom widgets created using JavaScript support keyboard interaction and include ARIA markup to describe their roles, properties and states.'
  },
  {
    id           : RULE_CATEGORIES.AUDIO_VIDEO,
    title        : 'Audio/Video',
    url          : '',
    description  : 'Provide appropriate text transcripts, captions or audio descriptions for elements used in rendering audio and video content.'
  },
  {
    id           : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    title        : 'Keyboard Support',
    url          : '',
    description  : 'Provide logical and sequential keyboard navigation among interactive elements such as links and form controls. Use standard models of keyboard interaction for custom widgets.'
  },
  {
    id           : RULE_CATEGORIES.TIMING,
    title        : 'Timing',
    url          : '',
    description  : 'Eliminate accessibility problems caused by time limits on input and by content that moves, scrolls, flashes or auto-updates.'
  },
  {
    id           : RULE_CATEGORIES.SITE_NAVIGATION,
    title        : 'Site Navigation',
    url          : '',
    description  : 'Ensure the consistent labeling and ordering of recurrent page sections across all pages within a website. Provide a meaningful title for each page within a website.'
  },
  // Composite rule categories
  {
    id           : RULE_CATEGORIES.ALL,
    title        : 'All Rules',
    url          : '',
    description  : 'Includes all rules in the ruleset and provides a way to sort and compare the results of all the rules.'
  }
];

/* ruleCategories.js */

const rulesets = [
  {
    id           : RULESET.TRIAGE,
    title        : 'Triage',
    description  : 'First set of rules to focus on for people new to accessibility or to get an initial view of accessibility of a resource, primarily rules that result in pass/fail results.'
  },
  {
    id           : RULESET.LEVEL,
    title        : 'WCAG A + Triage rules',
    description  : 'All WCAG Single-A rules and all WCAG Double-A rules in the Triage ruleset.'
  },
  {
    id           : RULESET.ALL,
    title        : 'WCAG A and AA rules',
    description  : 'WCAG Single-A and Double-A rules.'
  }
];

/* ruleCategories.js */

const wcag = {
  abbreviation: 'WCAG 2.1',
  title: 'Web Content Accessibility Guidelines (WCAG) 2.1',
  url: 'https://www.w3.org/TR/WCAG21/',
  status: 'W3C Recommendation 05 June 2018',
  level: 'Level ',
  levels: ['Undefined',  'AAA',  'AA',  '',  'A'  ],
  all_guidelines: {
    title: 'All Rules',
    description: 'All the rules related to WCAG 2.1.',
    url_spec: 'https://www.w3.org/TR/WCAG21/'
  },
  principles: {
    '1': {
      id: WCAG_PRINCIPLE.P_1,
      title: '1. Perceivable',
      description: 'Information and user interface components must be presentable to users in ways they can perceive.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#perceivable',
      guidelines: {
        '1.1': {
          id: WCAG_GUIDELINE.G_1_1,
          title: 'Guideline 1.1 Text Alternatives',
          description: 'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#text-alternatives',
          success_criteria: {
            '1.1.1': {
              id: WCAG_SUCCESS_CRITERION.SC_1_1_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.1.1 Non-text Content',
              description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#non-text-content',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#non-text-content',
              references: {
              }
            }
          }
        },
        '1.2': {
          id: WCAG_GUIDELINE.G_1_2,
          title: 'Guideline 1.2 Time-based Media',
          description: 'Provide alternatives for time-based media.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#time-based-media',
          success_criteria: {
            '1.2.1': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded)',
              description: 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-only-and-video-only-prerecorded',
              references: {
              }
            },
            '1.2.2': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.2.2 Captions (Prerecorded)',
              description: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#captions-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#captions-prerecorded',
              references: {
              }
            },
            '1.2.3': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_3,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.2.3 Audio Description or Media Alternative (Prerecorded)',
              description: 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-description-or-media-alternative-prerecorded',
              references: {
              }
            },
            '1.2.4': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_4,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.2.4 Captions (Live)',
              description: 'Captions are provided for all live audio content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#captions-live',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-live.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#captions-live',
              references: {
              }
            },
            '1.2.5': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_5,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.2.5 Audio Description (Prerecorded)',
              description: 'Audio description is provided for all prerecorded video content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-description-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-description-prerecorded',
              references: {
              }
            },
            '1.2.6': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.2.6 Sign Language (Prerecorded)',
              description: 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#sign-language-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/sign-language-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#sign-language-prerecorded',
              references: {
              }
            },
            '1.2.7': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_7,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.2.7 Extended Audio Description (Prerecorded)',
              description: 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/extended-audio-description-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#extended-audio-description-prerecorded',
              references: {
              }
            },
            '1.2.8': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_8,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.2.8 Media Alternative (Prerecorded)',
              description: 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/media-alternative-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#media-alternative-prerecorded',
              references: {
              }
            },
            '1.2.9': {
              id: WCAG_SUCCESS_CRITERION.SC_1_2_9,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.2.9 Audio-only (Live)',
              description: 'An alternative for time-based media that presents equivalent information for live audio-only content is provided.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-only-live',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-live.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-only-live',
              references: {
              }
            }
          }
        },
        '1.3': {
          id: WCAG_GUIDELINE.G_1_3,
          title: 'Guideline 1.3 Adaptable',
          description: 'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#adaptable',
          success_criteria: {
            '1.3.1': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.3.1 Info and Relationships',
              description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#info-and-relationships',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships',
              references: {
              }
            },
            '1.3.2': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.3.2 Meaningful Sequence',
              description: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#meaningful-sequence',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#meaningful-sequence',
              references: {
              }
            },
            '1.3.3': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_3,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.3.3 Sensory Characteristics',
              description: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#sensory-characteristics',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#sensory-characteristics',
              references: {
              }
            },
            '1.3.4': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_4,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.3.4 Orientation',
              description: 'Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#orientation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/orientation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#orientation',
              references: {
              }
            },
            '1.3.5': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_5,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.3.5 Identify Input Purpose',
              description: 'The purpose of each input field collecting information about the user can be programmatically determined when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#identify-input-purpose',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#identify-input-purpose',
              references: {
              }
            },
            '1.3.6': {
              id: WCAG_SUCCESS_CRITERION.SC_1_3_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.3.6 Identify Purpose',
              description: 'In content implemented using markup languages, the purpose of User Interface Components, icons, and regions can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#identify-purpose',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-purpose.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#identify-purpose',
              references: {
              }
            }
          }
        },
        '1.4': {
          id: WCAG_GUIDELINE.G_1_4,
          title: 'Guideline 1.4 Distinguishable',
          description: 'Make it easier for users to see and hear content including separating foreground from background.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#distinguishable',
          success_criteria: {
            '1.4.1': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.4.1 Use of Color',
              description: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#use-of-color',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#use-of-color',
              references: {
              }
            },
            '1.4.2': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 1.4.2 Audio Control',
              description: 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-control',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-control',
              references: {
              }
            },
            '1.4.3': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_3,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.3 Contrast (Minimum)',
              description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#contrast-minimum',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum',
              references: {
              }
            },
            '1.4.4': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_4,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.4 Resize text',
              description: 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#resize-text',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#resize-text',
              references: {
              }
            },
            '1.4.5': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_5,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.5 Images of Text',
              description: 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#images-of-text',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#images-of-text',
              references: {
              }
            },
            '1.4.6': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.4.6 Contrast (Enhanced)',
              description: 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#contrast-enhanced',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced',
              references: {
              }
            },
            '1.4.7': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_7,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.4.7 Low or No Background Audio',
              description: 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#low-or-no-background-audio',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/low-or-no-background-audio.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#low-or-no-background-audio',
              references: {
              }
            },
            '1.4.8': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_8,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.4.8 Visual Presentation',
              description: 'For the visual presentation of blocks of text, a mechanism is available to achieve the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#visual-presentation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#visual-presentation',
              references: {
              }
            },
            '1.4.9': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_9,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 1.4.9 Images of Text (No Exception)',
              description: 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#images-of-text-no-exception',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text-no-exception.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#images-of-text-no-exception',
              references: {
              }
            },
            '1.4.10': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_10,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.10 Reflow',
              description: 'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#reflow',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#reflow',
              references: {
              }
            },
            '1.4.11': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_11,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.11 Non-text Contrast',
              description: 'The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):',
              url_spec: 'https://www.w3.org/TR/WCAG21/#non-text-contrast',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast',
              references: {
              }
            },
            '1.4.12': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_12,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.12 Text Spacing',
              description: 'In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#text-spacing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#text-spacing',
              references: {
              }
            },
            '1.4.13': {
              id: WCAG_SUCCESS_CRITERION.SC_1_4_13,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 1.4.13 Content on Hover or Focus',
              description: 'Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#content-on-hover-or-focus',
              references: {
              }
            }
          }
        }
      }
    },
    '2': {
      id: WCAG_PRINCIPLE.P_2,
      title: '2. Operable',
      description: 'User interface components and navigation must be operable.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#operable',
      guidelines: {
        '2.1': {
          id: WCAG_GUIDELINE.G_2_1,
          title: 'Guideline 2.1 Keyboard Accessible',
          description: 'Make all functionality available from a keyboard.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard-accessible',
          success_criteria: {
            '2.1.1': {
              id: WCAG_SUCCESS_CRITERION.SC_2_1_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.1.1 Keyboard',
              description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#keyboard',
              references: {
              }
            },
            '2.1.2': {
              id: WCAG_SUCCESS_CRITERION.SC_2_1_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.1.2 No Keyboard Trap',
              description: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#no-keyboard-trap',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#no-keyboard-trap',
              references: {
              }
            },
            '2.1.3': {
              id: WCAG_SUCCESS_CRITERION.SC_2_1_3,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.1.3 Keyboard (No Exception)',
              description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard-no-exception',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard-no-exception.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#keyboard-no-exception',
              references: {
              }
            },
            '2.1.4': {
              id: WCAG_SUCCESS_CRITERION.SC_2_1_4,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.1.4 Character Key Shortcuts',
              description: 'If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#character-key-shortcuts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#character-key-shortcuts',
              references: {
              }
            }
          }
        },
        '2.2': {
          id: WCAG_GUIDELINE.G_2_2,
          title: 'Guideline 2.2 Enough Time',
          description: 'Provide users enough time to read and use content.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#enough-time',
          success_criteria: {
            '2.2.1': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.2.1 Timing Adjustable',
              description: 'For each time limit that is set by the content, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#timing-adjustable',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#timing-adjustable',
              references: {
              }
            },
            '2.2.2': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.2.2 Pause, Stop, Hide',
              description: 'For moving, blinking, scrolling, or auto-updating information, all of the following are true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pause-stop-hide',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pause-stop-hide',
              references: {
              }
            },
            '2.2.3': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_3,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.2.3 No Timing',
              description: 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#no-timing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/no-timing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#no-timing',
              references: {
              }
            },
            '2.2.4': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_4,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.2.4 Interruptions',
              description: 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#interruptions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#interruptions',
              references: {
              }
            },
            '2.2.5': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_5,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.2.5 Re-authenticating',
              description: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#re-authenticating',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/re-authenticating.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#re-authenticating',
              references: {
              }
            },
            '2.2.6': {
              id: WCAG_SUCCESS_CRITERION.SC_2_2_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.2.6 Timeouts',
              description: 'Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours when the user does not take any actions.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#timeouts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/timeouts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#timeouts',
              references: {
              }
            }
          }
        },
        '2.3': {
          id: WCAG_GUIDELINE.G_2_3,
          title: 'Guideline 2.3 Seizures and Physical Reactions',
          description: 'Do not design content in a way that is known to cause seizures or physical reactions.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions',
          success_criteria: {
            '2.3.1': {
              id: WCAG_SUCCESS_CRITERION.SC_2_3_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.3.1 Three Flashes or Below Threshold',
              description: 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#three-flashes-or-below-threshold',
              references: {
              }
            },
            '2.3.2': {
              id: WCAG_SUCCESS_CRITERION.SC_2_3_2,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.3.2 Three Flashes',
              description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#three-flashes',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#three-flashes',
              references: {
              }
            },
            '2.3.3': {
              id: WCAG_SUCCESS_CRITERION.SC_2_3_3,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.3.3 Animation from Interactions',
              description: 'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#animation-from-interactions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#animation-from-interactions',
              references: {
              }
            }
          }
        },
        '2.4': {
          id: WCAG_GUIDELINE.G_2_4,
          title: 'Guideline 2.4 Navigable',
          description: 'Provide ways to help users navigate, find content, and determine where they are.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#navigable',
          success_criteria: {
            '2.4.1': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.4.1 Bypass Blocks',
              description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#bypass-blocks',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#bypass-blocks',
              references: {
              }
            },
            '2.4.2': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.4.2 Page Titled',
              description: 'Web pages have titles that describe topic or purpose.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#page-titled',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#page-titled',
              references: {
              }
            },
            '2.4.3': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_3,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.4.3 Focus Order',
              description: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#focus-order',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#focus-order',
              references: {
              }
            },
            '2.4.4': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_4,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.4.4 Link Purpose (In Context)',
              description: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#link-purpose-in-context',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#link-purpose-in-context',
              references: {
              }
            },
            '2.4.5': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_5,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 2.4.5 Multiple Ways',
              description: 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#multiple-ways',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#multiple-ways',
              references: {
              }
            },
            '2.4.6': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_6,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 2.4.6 Headings and Labels',
              description: 'Headings and labels describe topic or purpose.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#headings-and-labels',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels',
              references: {
              }
            },
            '2.4.7': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_7,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 2.4.7 Focus Visible',
              description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#focus-visible',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#focus-visible',
              references: {
              }
            },
            '2.4.8': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_8,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.4.8 Location',
              description: 'Information about the user\'s location within a set of Web pages is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#location',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/location.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#location',
              references: {
              }
            },
            '2.4.9': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_9,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.4.9 Link Purpose (Link Only)',
              description: 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#link-purpose-link-only',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#link-purpose-link-only',
              references: {
              }
            },
            '2.4.10': {
              id: WCAG_SUCCESS_CRITERION.SC_2_4_10,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.4.10 Section Headings',
              description: 'Section headings are used to organize the content.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#section-headings',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/section-headings.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#section-headings',
              references: {
              }
            }
          }
        },
        '2.5': {
          id: WCAG_GUIDELINE.G_2_5,
          title: 'Guideline 2.5 Input Modalities',
          description: 'Make it easier for users to operate functionality through various inputs beyond keyboard.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#input-modalities',
          success_criteria: {
            '2.5.1': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.5.1 Pointer Gestures',
              description: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pointer-gestures',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pointer-gestures',
              references: {
              }
            },
            '2.5.2': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.5.2 Pointer Cancellation',
              description: 'For functionality that can be operated using a single pointer, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pointer-cancellation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pointer-cancellation',
              references: {
              }
            },
            '2.5.3': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_3,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.5.3 Label in Name',
              description: 'For user interface components with labels that include text or images of text, the name contains the text that is presented visually.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#label-in-name',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#label-in-name',
              references: {
              }
            },
            '2.5.4': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_4,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 2.5.4 Motion Actuation',
              description: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#motion-actuation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#motion-actuation',
              references: {
              }
            },
            '2.5.5': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_5,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.5.5 Target Size',
              description: 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels except when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#target-size',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#target-size',
              references: {
              }
            },
            '2.5.6': {
              id: WCAG_SUCCESS_CRITERION.SC_2_5_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 2.5.6 Concurrent Input Mechanisms',
              description: 'Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/concurrent-input-mechanisms.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#concurrent-input-mechanisms',
              references: {
              }
            }
          }
        }
      }
    },
    '3': {
      id: WCAG_PRINCIPLE.P_3,
      title: '3. Understandable',
      description: 'Information and the operation of user interface must be understandable.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#understandable',
      guidelines: {
        '3.1': {
          id: WCAG_GUIDELINE.G_3_1,
          title: 'Guideline 3.1 Readable',
          description: 'Make text content readable and understandable.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#readable',
          success_criteria: {
            '3.1.1': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 3.1.1 Language of Page',
              description: 'The default human language of each Web page can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#language-of-page',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#language-of-page',
              references: {
              }
            },
            '3.1.2': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_2,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 3.1.2 Language of Parts',
              description: 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#language-of-parts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#language-of-parts',
              references: {
              }
            },
            '3.1.3': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_3,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.1.3 Unusual Words',
              description: 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#unusual-words',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/unusual-words.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#unusual-words',
              references: {
              }
            },
            '3.1.4': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_4,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.1.4 Abbreviations',
              description: 'A mechanism for identifying the expanded form or meaning of abbreviations is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#abbreviations',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/abbreviations.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#abbreviations',
              references: {
              }
            },
            '3.1.5': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_5,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.1.5 Reading Level',
              description: 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#reading-level',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#reading-level',
              references: {
              }
            },
            '3.1.6': {
              id: WCAG_SUCCESS_CRITERION.SC_3_1_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.1.6 Pronunciation',
              description: 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pronunciation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pronunciation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pronunciation',
              references: {
              }
            }
          }
        },
        '3.2': {
          id: WCAG_GUIDELINE.G_3_2,
          title: 'Guideline 3.2 Predictable',
          description: 'Make Web pages appear and operate in predictable ways.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#predictable',
          success_criteria: {
            '3.2.1': {
              id: WCAG_SUCCESS_CRITERION.SC_3_2_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 3.2.1 On Focus',
              description: 'When any user interface component receives focus, it does not initiate a change of context.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#on-focus',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#on-focus',
              references: {
              }
            },
            '3.2.2': {
              id: WCAG_SUCCESS_CRITERION.SC_3_2_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 3.2.2 On Input',
              description: 'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#on-input',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#on-input',
              references: {
              }
            },
            '3.2.3': {
              id: WCAG_SUCCESS_CRITERION.SC_3_2_3,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 3.2.3 Consistent Navigation',
              description: 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#consistent-navigation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#consistent-navigation',
              references: {
              }
            },
            '3.2.4': {
              id: WCAG_SUCCESS_CRITERION.SC_3_2_4,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 3.2.4 Consistent Identification',
              description: 'Components that have the same functionality within a set of Web pages are identified consistently.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#consistent-identification',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#consistent-identification',
              references: {
              }
            },
            '3.2.5': {
              id: WCAG_SUCCESS_CRITERION.SC_3_2_5,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.2.5 Change on Request',
              description: 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#change-on-request',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#change-on-request',
              references: {
              }
            }
          }
        },
        '3.3': {
          id: WCAG_GUIDELINE.G_3_3,
          title: 'Guideline 3.3 Input Assistance',
          description: 'Help users avoid and correct mistakes.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#input-assistance',
          success_criteria: {
            '3.3.1': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 3.3.1 Error Identification',
              description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-identification',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-identification',
              references: {
              }
            },
            '3.3.2': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 3.3.2 Labels or Instructions',
              description: 'Labels or instructions are provided when content requires user input.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#labels-or-instructions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#labels-or-instructions',
              references: {
              }
            },
            '3.3.3': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_3,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 3.3.3 Error Suggestion',
              description: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-suggestion',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-suggestion',
              references: {
              }
            },
            '3.3.4': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_4,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 3.3.4 Error Prevention (Legal, Financial, Data)',
              description: 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-prevention-legal-financial-data',
              references: {
              }
            },
            '3.3.5': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_5,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.3.5 Help',
              description: 'Context-sensitive help is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#help',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/help.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#help',
              references: {
              }
            },
            '3.3.6': {
              id: WCAG_SUCCESS_CRITERION.SC_3_3_6,
              level: WCAG_LEVEL.AAA,
              title: 'Success Criterion 3.3.6 Error Prevention (All)',
              description: 'For Web pages that require the user to submit information, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-prevention-all',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-all.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-prevention-all',
              references: {
              }
            }
          }
        }
      }
    },
    '4': {
      id: WCAG_PRINCIPLE.P_4,
      title: '4. Robust',
      description: 'Content must be robust enough that it can be interpreted by by a wide variety of user agents, including assistive technologies.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#robust',
      guidelines: {
        '4.1': {
          id: WCAG_GUIDELINE.G_4_1,
          title: 'Guideline 4.1 Compatible',
          description: 'Maximize compatibility with current and future user agents, including assistive technologies.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#compatible',
          success_criteria: {
            '4.1.1': {
              id: WCAG_SUCCESS_CRITERION.SC_4_1_1,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 4.1.1 Parsing',
              description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#parsing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#parsing',
              references: {
              }
            },
            '4.1.2': {
              id: WCAG_SUCCESS_CRITERION.SC_4_1_2,
              level: WCAG_LEVEL.A,
              title: 'Success Criterion 4.1.2 Name, Role, Value',
              description: 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#name-role-value',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#name-role-value',
              references: {
              }
            },
            '4.1.3': {
              id: WCAG_SUCCESS_CRITERION.SC_4_1_3,
              level: WCAG_LEVEL.AA,
              title: 'Success Criterion 4.1.3 Status Messages',
              description: 'In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#status-messages',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#status-messages',
              references: {
              }
            }
          }
        }
      }
    }
  }
};

/* colorRules.js */

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

const colorRules = {
  COLOR_1: {
      ID:                    'Color 1',
      DEFINITION:            'Text content must exceed Color Contrast Ratio (CCR) of 3.1 for large and/or bolded text and 4.5 for any other size or style of text.',
      SUMMARY:               'Text must exceed CCR threshold',
      TARGET_RESOURCES_DESC: 'All elements with text content',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the foreground and background colors of the text element to meet the CCR threshold.',
        FAIL_P:   'Change the foreground and background colors of the %N_F text elements to meet the CCR threshold.',
        MANUAL_CHECK_S:     'One element requires manual checking for CCR threshold to the use of a background image.',
        MANUAL_CHECK_P:     '%N_MC elements require manual checking for CCR thrshold to the use of background images.',
        HIDDEN_S: 'The element with text content that is hidden was not analyzed for color contrast accessibility.',
        HIDDEN_P: 'The %N_H elements with text content that are hidden were not analyzed for color contrast accessibility.',
        NOT_APPLICABLE:  'No visible text content on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'CCR of %1 exceeds 4.5.',
        ELEMENT_PASS_2:   'CCR of %1 exceeds 3.1 for large or bolded text.',
        ELEMENT_FAIL_1:   'CCR of %1, adjust foreground and background colors to exceed 4.5.',
        ELEMENT_FAIL_2:   'CCR of %1 for large or bolded text, adjust foreground and background colors to exceed 3.1.',
        ELEMENT_MC_1:     'CCR of %1 is greater than 4.5, but background image may reduce color contrast.',
        ELEMENT_MC_2:     'CCR of %1 is less than or equal to 4.5, but background image may improve color contrast.',
        ELEMENT_MC_3:     'CCR of %1 is greater than 3.1 for large or bolded text, but background image may reduce color contrast.',
        ELEMENT_MC_4:     'CCR of %1 is less than or equal to 3.1 for large and bolded text, but background image may improve color contrast.',
        ELEMENT_HIDDEN_1: 'CCR was not tested since the text is hidden from assistive technologies.'
      },
      PURPOSES:       [ 'The higher the color contrast of text the more easy it is to read, especially for people with visual impairments.'
                      ],
      TECHNIQUES:     [ 'Change the foreground color to a more complementary color to the background color.',
                        'Change the background color to a more complementary color to the foreground color.',
                        'Remove background images or verify they do not compromise color contrast requirements.'
                      ],
      MANUAL_CHECKS:  [ 'Use graphic editing tools to analyze the color(s) of the background image and then recacluate the CCR with the range of colors in the background image.',
                        'Verify the range of colors that could be part of the background of text is have a CCR > 4.5.'
      ],
      INFORMATIONAL_LINKS: [{ type:  REFERENCES.SPECIFICATION,
                         title: 'WCAG 2.0 Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
                         url:   'https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast'
                       },
                       { type:  REFERENCES.WCAG_TECHNIQUE,
                         title: 'How to meet Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
                         url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast'
                       },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G17: Ensuring that a contrast ratio of at least 7:1 exists between text (and images of text) and background behind the text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G17'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G18'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G148: Not specifying background color, not specifying text color, and not using technology features that change those default',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G148'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G174: Providing a control with a sufficient contrast ratio that allows users to switch to a presentation that uses sufficient contrast',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G174'
                      }
                      ]
  },
  COLOR_2: {
      ID:                    'Color 2',
      DEFINITION:            'Color must not be the only way to convey information on the page.',
      SUMMARY:               'Use of color',
      TARGET_RESOURCES_DESC: 'Any content on the page that refers to or is a specific color',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element on the page.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1: 'Verify color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element on the page.'
      },
      PURPOSES:       [ 'For people with color blindness and other forms of visual impairments will not be able to see colors or color differences.',
                        'This requirement also includes references to color of content on page to identify some type of information, there should be redundant labeling of the content, for example using text labels to also identify and refer to the information.'
                      ],
      TECHNIQUES:     [ 'Provide redundant text labels for content presented in color, it the color is presenting meaningful information.',
                        'Use background patterns to also identify information.'
                      ],
      MANUAL_CHECKS:  [ 'Verify the page does not use color alone to identify or refer to information on the page.'
                      ],
      INFORMATIONAL_LINKS: [{ type:  REFERENCES.SPECIFICATION,
                         title: 'WCAG 2.0 Success Criterion 1.4.1 Use of Color',
                         url:   'https://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color'
                       },
                       { type:  REFERENCES.WCAG_TECHNIQUE,
                         title: 'How to meet Success Criterion 1.4.1 Use of Color',
                         url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color'
                       },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G14: Ensuring that information conveyed by color differences is also available in text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G14'
                      }
                      ]
  }
};

/* landmarkRules.js */

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

const landmarkRules = {

  // ----------------------------------------------------------------
  // LANDMARK_1: main landmark: at least one
  // ----------------------------------------------------------------

  LANDMARK_1: {
      ID:         'Landmark 1',
      DEFINITION: 'Each page must have at least one @main@ landmark, used to identify the main content.',
      SUMMARY:    '@main@ landmark: at least one',
      TARGET_RESOURCES_DESC: '@[role="main"]@ and @main@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a @main@ landmark to the page.',
        FAIL_P:   'Add a @main@ landmark to the page.',
        HIDDEN_S: 'One @main@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @main@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'Page has one @main@ landmark.',
        PAGE_PASS_2: 'Page has %1 @main@ landmarks.',
        PAGE_FAIL_1: 'Add a @main@ landmark that identifies the main content of the page.',
        ELEMENT_PASS_1:   '@%1[role="main"]@ defines a @main@ landmark.',
        ELEMENT_PASS_2:   '@main@ element defines a @main@ landmark.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="main"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@main@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'A @main@ landmark provides a navigation point to the primary content of the page for users of assistive technologies.',
        'Most pages only need one @main@ landmark, but in the case of portals or mashups, there may be more than one @main@ landmark on a "page".'
      ],
      TECHNIQUES: [
        'A @main@ element or an element with a @role="main"@ attribute defines a @main@ landmark.',
        'When there is only one @main@ landmark on the page (the typical case), do not use a label.',
        'When there is more than one @main@ landmark, use the @aria-labelledby@ or @aria-label@ attribute to describe the content of each.',
        'If you need to support Microsoft Internet Explorer 8, you must NOT use the @main@ element since the element is supported in the accessibility API, just use @role="main"@ to identify the main landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: main role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The MAIN element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-main-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_2: Page structure must/should be defined by landmarks
  // ----------------------------------------------------------------

  LANDMARK_2: {
      ID:         'Landmark 2',
      DEFINITION: 'All rendered content must be placed inside of container elements with appropriate ARIA landmark roles.',
      SUMMARY:    'All content must be contained in landmarks',
      TARGET_RESOURCES_DESC: 'all rendered content',
      RULE_RESULT_MESSAGES: {
        FAIL_S: 'Update the landmark structure of the page by placing the one element not contained in a landmark into a container element with a proper landmark role.',
        FAIL_P: 'Update the landmark structure of the page by placing the %N_F elements not contained in landmarks into one or more container elements with proper landmark roles.',
        MANUAL_CHECK_S: 'One element may contain renderable content.  If so, move it into a container element with proper landmark role.',
        MANUAL_CHECK_P: '%N_MC elements may contain renderable content.  If so, move them into container elements with proper landmark roles.',
        HIDDEN_S: 'One hidden element with renderable content was found.  If it could become visible make sure it is in a container element with a proper landmark role.',
        HIDDEN_P: '%N_H hidden elements with renderable content were found.  If any could become visible make sure they are in container elements with proper landmark roles.',
        NOT_APPLICABLE: 'No renderable content found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'All %1 elements with content are contained in landmarks.',
        PAGE_MC_1:   '%1 element(s) may contain renderable content. If so, move it/them into appropriate landmarks.',
        PAGE_FAIL_1: 'Move %1 element(s) into appropriate landmarks. (This may require creating additional landmarks.)',
        ELEMENT_PASS_1:   '@%1@ element is contained in @%2@ landmark.',
        ELEMENT_MC_1:     '@%1@ element may contain renderable content. If so, move it into an appropriate landmark.',
        ELEMENT_FAIL_1:   'Move @%1@ element into an appropriate landmark. (This may require creating an additional landmark.)',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Landmarks provide a way to organize the various types of content on a page for users of assistive technologies. The organization of content regions using landmarks is functionally similar to the way visual designers organize information for people who rely on a graphical rendering of the content.',
        'When content is not contained in a landmark, it will be unreachable using landmark navigation, which is an important feature provided by assistive technologies such as screen readers.'
      ],
      TECHNIQUES: [
        'Use the appropriate landmarks to identify the different regions of content on a web page.',
        'The most important landmark roles are @main@ and @navigation@, as nearly every page will include at least those regions.',
        'Other commonly used landmark roles include @banner@, @contentinfo@, @complementary@ and @search@.',
        'Use HTML5 sectioning elements that have a default ARIA landmark role: @main@ (@main@), @nav@ (@navigation@), @aside@ (@complementary@) and in some situations @header@ (@banner@) and @footer@ (@contentinfo@). When using these elements, the @role@ attribute should NOT be defined.',
        'In HTML4 and XHTML 1.0 documents, a landmark can be created using a @div@ element with a @role@ attribute and the appropriate ARIA landmark role value (e.g., @role="main"@).',
        'The @search@ role is typically placed on a @form@ element or a @div@ that surrounds the search form.'
      ],
      MANUAL_CHECKS: [
        '@object@, @embed@ and @applet@ tags may be used to render content. Use inspection tools to determine if any of these elements actually render content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sections',
          url:   'https://www.w3.org/TR/html5/sections.html#sections'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_3: navigation landmark: at least one
  // ----------------------------------------------------------------

  LANDMARK_3: {
      ID:         'Landmark 3',
      DEFINITION: 'Each page in a website must have at least one @navigation@ landmark, used to identify website navigation links.',
      SUMMARY:    '@navigation@ landmark: at least one',
      TARGET_RESOURCES_DESC: '@[role="navigation"]@ or top-level @nav@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add one or more @navigation@ landmarks that identify groups of links that support website navigation.',
        FAIL_P:   'Add one or more @navigation@ landmarks that identify groups of links that support website navigation.',
        HIDDEN_S: 'One @navigation@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @navigation@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No lists of links found on page.'
      },
      BASE_RESULT_MESSAGES: {
        WEBSITE_PASS_1: 'The page contains one @navigation@ landmark.',
        WEBSITE_PASS_2: 'The page contains %1 @navigation@ landmarks.',
        WEBSITE_FAIL_1: 'Add at least one @navigation@ landmark to the page to identify the links used for website or page content navigation.',
        ELEMENT_PASS_1:   '@%1[role="navigation"]@ defines a @navigation@ landmark.',
        ELEMENT_PASS_2:   '@nav@ element defines a @navigation@ landmark.',
        ELEMENT_FAIL_1:   '@%1@ list element has %2 links and not in any landmark.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="navigation"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Navigation landmarks provide a way to identify groups (e.g. lists) of links that are intended to be used for website or page content navigation.'
      ],
      TECHNIQUES: [
        'Reserve the @navigation@ landmark for website and page navigation links.',
        'Website and page navigation links should be top-level @navigation@ landmarks (i.e. not contained in other landmarks).',
        'The @nav@ element or an element with @role="navigation"@ attribute defines a @navigation@ landmark and must be on a container element (e.g., @div@) for @ol@ and @ul@ elements that contain li elements with links. (This may require adding a container element.)',
        'If there is only one @navigation@ landmark on the page, do not use a label.',
        'If there is more than one @navigation@ landmark, use the @aria-labelledby@, @aria-label@ oe @title@ attribute to describe the purpose of the links (e.g., Table of Contents, Site Map, etc.) contained in each.',
        'If the same set of links is used in more than one place on a page, use "Copy 1", "Copy 2" ... "Copy N" as a part of the accessible name to make the navigation labels unique and help orient assistive technology users that the group of links is repeated on the page.'
      ],
      MANUAL_CHECKS: [
        'A list of links to other pages in the website, or to content sections of the current page, should use a @navigation@ landmark.',
        'Verify the links are used for website or page navigation purposes.',
        'Verify the labels uniquely identify each set of navigational links.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: navigation role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#navigation'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The NAV element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-nav-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H97: Grouping related links using the nav element',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H97.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_4: banner landmark: for branding content
  // ----------------------------------------------------------------

  LANDMARK_4: {
      ID:         'Landmark 4',
      DEFINITION: 'Website branding content, typically at the top of a web page, must be identified by using the @banner@ landmark.',
      SUMMARY:    '@banner@ landmark: identifies branding content',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If there is branding content, typically at the top of the page, use the @banner@ landmark to identify it.',
        MANUAL_CHECK_P: 'If there is branding content, typically at the top of the page, use the @banner@ landmark to identify it.',
        HIDDEN_S: 'One @banner@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H@ banner@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:   'Page has @banner@ landmark.',
        PAGE_PASS_2:   'Page has %1 @banner@ landmarks.',
        PAGE_MC_1:     'If the page has a branding banner, use @role="banner"@ on its container element.',
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a @banner@ landmark.',
        ELEMENT_PASS_2:   'The top level @header@ element defines a @banner@ landmark.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'A top level @header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'A @banner@ landmark provides a way to identify organizational or company branding content, usually replicated across all pages and located at the top of each page.'
      ],
      TECHNIQUES: [
        'The @header@ element defines a @banner@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@ or @section@.',
        'If the @header@ element technique is not being used, a @role="banner"@ attribute on the container element for the branding content can be used to define a @banner@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @banner@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate @banner@ landmarks in each frame.'
      ],
     MANUAL_CHECKS: [
        'Banners are a convention used on most web sites to convey branding information, and may also be used as a location for advertising information.',
        'The @banner@ landmark identifies the banner content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning content',
          url:   'https://www.w3.org/TR/html5/dom.html#sectioning-content-0'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning root',
          url:   'https://www.w3.org/TR/html5/sections.html#sectioning-root'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_5: banner landmark: no more than one
  // ----------------------------------------------------------------

  LANDMARK_5: {
      ID:         'Landmark 5',
      DEFINITION: 'Each page must contain no more than one @banner@ landmark.',
      SUMMARY:    '@banner@ landmark: no more than one',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S: 'More than one @banner@ landmark found on the page. Only one @banner@ landmark is allowed per page or iframe.',
        FAIL_P: 'More than one @banner@ landmark found on the page. Only one @banner@ landmark is allowed per page or iframe.',
        HIDDEN_S: 'One @banner@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H@ banner@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:      'The page contains one @banner@ landmark.',
        PAGE_FAIL_1:      'The page contains %1 @banner@ landmarks. Modify the page to have only one container element with a @banner@ landmark role.',
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a @banner@ landmark.',
        ELEMENT_PASS_2:   'Top level @header@ element defines a @banner@ landmark.',
        ELEMENT_FAIL_1:   '@%1[role="banner"]@ defines a @banner@ landmark.  Modify the page to include only one @banner@ element.',
        ELEMENT_FAIL_2:   'Top level @header@ element defines a @banner@ landmark.  Modify the page to include only one @banner@ element.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'Top level @header@ element  was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'A banner landmark provides a way to identify redundant branding content, usually placed at the top of each web page.'
      ],
      TECHNIQUES: [
        'The @header@ element defines a @banner@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@ or @section@.',
        'If the @header@ element technique is not being used, a @role="banner"@ attribute on the container element for the branding content can be used to define a @banner@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @banner@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate @banner@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Banners are a convention used on most web sites to convey branding information, and may also be used as a location for advertising information.',
        'The @banner@ landmark identifies the banner content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_6: contentinfo landmark: for admin content
  // ----------------------------------------------------------------

  LANDMARK_6: {
      ID:         'Landmark 6',
      DEFINITION: 'Website administrative content (e.g., copyright, contact, privacy info, etc., typically at the bottom of a web page) must be identified by using the @contentinfo@ landmark.',
      SUMMARY:    '@contentinfo@ landmark: identifies admin content',
      TARGET_RESOURCES_DESC: '@[role="contentinfo"]@ and top-level @footer@ element',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If there is administrative content (e.g., copyright, contact, privacy info, etc.), typically at the bottom of the page, use the @contentinfo@ landmark or top level @footer@ element to identify it.',
        MANUAL_CHECK_P: 'If there is administrative content (e.g., copyright, contact, privacy info, etc.), typically at the bottom of the page, use the @contentinfo@ landmark or top level @footer@ element to identify it.',
        HIDDEN_S: 'One @contentinfo@ landmark or @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @contentinfo@ landmarks or @footer@ elements that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'Page has @contentinfo@ landmark or top level @footer@ element.',
        PAGE_PASS_2: 'Page has %1 @contentinfo@ landmarks and/or top level @footer@ elements.',
        PAGE_MC_1:   'If the page has administrative content, use @role="contentinfo"@ or @footer@ element on its container element.',
        ELEMENT_PASS_1:   '@%1@ element has @role="contentinfo"@.',
        ELEMENT_PASS_2:   'Top level @footer@ element with the default @role="contentinfo"@.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'The @contentinfo@ landmark provides a way to identify administrative content, typically found at the bottom of each page in a website and referred to as footer information in publishing contexts.',
        'The @contentinfo@ landmark typically includes information and/or links to copyright, contact info, privacy policies and other general information found on all pages in the website.'
      ],
      TECHNIQUES: [
        'The @footer@ element defines a @contentinfo@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@ or @section@.',
        'If the @footer@ element technique is not being used, a @role="contentinfo"@ attribute on the container element for the administrative content can be used to define a @contentinfo@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @contentinfo@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate possible @contentinfo@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Footers are a convention used on most web sites to provide copyright, contact, privacy and other types of adminstrative content.',
        'The @contentinfo@ landmark identifies the footer content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning content',
          url:   'https://www.w3.org/TR/html5/dom.html#sectioning-content-0'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning root',
          url:   'https://www.w3.org/TR/html5/sections.html#sectioning-root'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_7: contentinfo landmark: no more than one
  // ----------------------------------------------------------------

  LANDMARK_7: {
      ID:         'Landmark 7',
      DEFINITION: 'Each page must contain no more than one @contentinfo@ landmark.',
      SUMMARY:    '@contentinfo@ landmark: no more than one',
      TARGET_RESOURCES_DESC: '@[role="contentinfo"]@ and top-level @footer@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'More than one @contentinfo@ landmark found on the page. Only one @contentinfo@ landmark is allowed per page or iframe.',
        FAIL_P:   'More than one @contentinfo@ landmark found on the page. Only one @contentinfo@ landmark is allowed per page or iframe.',
        HIDDEN_S: 'One @contentinfo@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @contentinfo@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:      'The page contains one @contentinfo@ landmark.',
        PAGE_FAIL_1:      'The page contains %1 @contentinfo@ landmarks and/or @footer@ elements. Modify the page to have only one container element with a @contentinfo@ landmark role or @footer@ element.',
        ELEMENT_PASS_1:   '@%1[role="contentinfo"]@ defines a @contentinfo@ landmark.',
        ELEMENT_PASS_2:   'Top level @footer@ element defines a @contentinfo@ landmark.',
        ELEMENT_FAIL_1:   '@%1[role="contentinfo"]@ defines a @contentinfo@ landmark.  Modify the page to include only one @contentinfo@ element.',
        ELEMENT_FAIL_2:   'Top level @footer@ element defines a @contentinfo@ landmark.  Modify the page to include only one @contentinfo@ element.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'The @contentinfo@ landmark provides a way to identify administrative content, typically found at the bottom of each page in a website and referred to as footer information in publishing contexts.',
        'The @contentinfo@ landmark typically includes information and/or links to copyright, contact info, privacy policies and other general information found on all pages in the website.',
        'The @footer@ element that is NOT contained in an @section@ and @aside@ element has the default role of @contentinfo@ landmark.'
      ],
      TECHNIQUES: [
        'The @footer@ element defines a @contentinfo@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@ or @section@.',
        'If the @footer@ element technique is not being used, a @role="contentinfo"@ attribute on the container element for the administrative content can be used to define a @contentinfo@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @contentinfo@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate possible @contentinfo@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Footers are a convention used on most web sites to provide copyright, contact, privacy and other types of adminstrative content.',
        'The @contentinfo@ landmark identifies the footer content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_8: banner landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_8: {
      ID:         'Landmark 8',
      DEFINITION: 'The @banner@ landmark must be a top-level landmark.',
      SUMMARY:    '@banner@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @banner@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the @banner@ landmarks on the page to ensure that each is a top-level landmark.',
        HIDDEN_S: 'One element with @[role="hidden"]@ attribute or @header@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="hidden"]@ attributes or @header@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with @[role="banner"]@ or @header@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a top-level @banner@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="banner"]@ defines a top-level @banner@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@header@ element defines a top-level @banner@ landmark.',
        ELEMENT_PASS_4:   '@header@ element defines a top-level @banner@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="banner"]@ element is a top-level landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @header@ element is a top-level landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.',
        'Banner content is usually the content at beginning of a page that repeats on most pages within a website.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @banner@ landmark or @header@ element is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'A @header@ element with the context of the @body@ element or an element with @[role="contentinfo"]@ attribute defines a @banner@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The HEADER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-header-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_9: banner landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_9: {
      ID:         'Landmark 9',
      DEFINITION: 'The @banner@ landmark must only contain @navigation@, @region@ or @search@ landmarks.',
      SUMMARY:    '@banner@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@banner@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @banner@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        FAIL_P:   'Update the %N_F landmarks that are part of the @banner@ landmark to ensure that the @banner@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        HIDDEN_S: 'One element with @[role="banner"]@ or top-level @header@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="banner"]@ or top-level @header@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="banner"]@ or top-level @header@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @banner@ landmark.',
        ELEMENT_PASS_2:   '@banner@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@banner@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@banner@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page so that the @%1@ landmark is not contained in the @banner@ landmark or @header@ element. Depending on the content in this landmark, consider moving it outside the @banner@ landmark.',
        ELEMENT_FAIL_2:   'The  @banner@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @banner@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
         'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @banner@ landmark, use only @navigation@, @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The HEADER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-header-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sections',
          url:   'https://www.w3.org/TR/html5/sections.html#sections'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_10: navigation landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_10: {
      ID:         'Landmark 10',
      DEFINITION: 'The @navigation@ landmark must only contain @region@ or @search@ landmarks.',
      SUMMARY:    '@navigation@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@navigation@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @navigation@ landmark only contains @region@ or @search@ landmarks.',
        FAIL_P:   'Update the %N_F @navigation@ landmarks on the page to ensure that they only contain  @region@ or @search@ landmarks.',
        HIDDEN_S: 'One @navigation@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @navigation@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @navigation@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @navigation@ landmark.',
        ELEMENT_PASS_2:   '@navigation@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@navigation@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@navigation@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page such that the @%1@ landmark is not contained by the @navigation@ landmark. Depending on the content in this landmark, consider moving it outside the @navigation@ landmark.',
        ELEMENT_FAIL_2:   'The  @navigation@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @navigation@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="navigation"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@nav@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @navigation@ landmark, use only @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: navigation role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#navigation'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The NAV element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-nav-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_11: main landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_11: {
      ID:         'Landmark 11',
      DEFINITION: 'The @main@ landmark must be a top-level landmark.',
      SUMMARY:    '@main@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@main@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @main@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the  @main@ landmarks on the page to ensure that each is a top-level @main@ landmark.',
        HIDDEN_S: 'One element with @[role="main"]@ attribute or a @main@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="main"]@ attribute and/or @main@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="main"]@ attributes or @main@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="main"]@ attribute defines a top-level @main@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="main"]@ attribute defines a top-level @main@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@main@ element defines a top-level @main@ landmark.',
        ELEMENT_PASS_4:   '@main@ element defines a top-level @main@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="main"]@ element defines a top-level @main@ landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @main@ element defines a top-level @main@ landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1[role="main"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@main@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Top-level landmarks are the easiest landmarks to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @main@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'The @main@ element or an element with @[role="main"]@ attribute defines a @main@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: main role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The MAIN element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-main-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_12: contentinfo landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_12: {
      ID:         'Landmark 12',
      DEFINITION: 'The @contentinfo@ landmark must be a top-level landmark.',
      SUMMARY:    '@contentinfo@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@contentinfo@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @contentinfo@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the @contentinfo@ landmarks on the page to ensure that each @contentinfo@ landmark is a top-level landmark.',
        HIDDEN_S: 'One element with @[role="contentinfo"]@ attribute or @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with  @[role="contentinfo"]@ attributes and/or @footer@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with @[role="contentinfo"]@ attribute and/or @footer@ elements landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="contentinfo"]@ attribute defines a top-level @contentinfo@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="contentinfo"]@ attribute defines a top-level @contentinfo@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@footer@ element defines a top-level @contentinfo@ landmark.',
        ELEMENT_PASS_4:   '@footer@ element defines a top-level @contentinfo@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="contentinfo"]@ element defines a top-level @contentinfo@ landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @footer@ element defines a top-level @contentinfo@ landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @contentinfo@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'A @footer@ element with the context of the @body@ element or an element with @[role="contentinfo"]@ attribute defines a @contentinfo@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_13: contentinfo landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_13: {
      ID:         'Landmark 13',
      DEFINITION: 'The @contentinfo@ landmark must only contain @navigation@, @region@ or @search@ landmarks.',
      SUMMARY:    '@contentinfo@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@contentinfo@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @contentinfo@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        FAIL_P:   'Update the %N_F landmarks that are part of the @contentinfo@ landmark to ensure that the @contentinfo@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        HIDDEN_S: 'One element with @[role="contentinfo"]@ or top-level @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="contentinfo"]@ or top-level @footer@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="contentinfo"]@ or top-level @footer@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @contentinfo@ landmark.',
        ELEMENT_PASS_2:   '@contentinfo@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@contentinfo@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@contentinfo@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page so that the @%1@ landmark is not contained in the @contentinfo@ landmark. Depending on the content in this landmark, consider moving it outside the @contentinfo@ landmark.',
        ELEMENT_FAIL_2:   'The  @contentinfo@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @contentinfo@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="contentinfo"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
         'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @contentinfo@ landmark, use only @navigation@, @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sections',
          url:   'https://www.w3.org/TR/html5/sections.html#sections'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_14: search landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_14: {
      ID:         'Landmark 14',
      DEFINITION: 'The @search@ landmark must only contain @region@ landmarks.',
      SUMMARY:    '@search@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@search@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @search@ landmark only contains @region@ landmarks.',
        FAIL_P:   'Update the %N_F @search@ landmarks on the page to ensure that each only contains  @region@ landmarks.',
        HIDDEN_S: 'One @search@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @search@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @search@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ landmark can be part of @search@ landmark.',
        ELEMENT_PASS_2: '@search@ landmark does not contain any @region@ landmarks.',
        ELEMENT_PASS_3: '@search@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4: '@search@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1: 'Update the landmark structure on the page such that the @%1@ landmark is not contained by the @search@ landmark. Depending on the content in this landmark, consider moving it outside the @search@ landmark.',
        ELEMENT_FAIL_2:   'The  @search@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @search@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="search"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@%1@ element with @role="@%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'A @search@ landmark identifies a form on the page used to search for content across the entire website.',
        'For @search@ landmarks containing more than one search option and where each option can be represented as its own section, use @region@ landmarks to identify these sections.',
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'Website search options should be top-level @search@ landmarks (e.g. not contained in other landmarks).',
        'Include a @role="search"@ attribute on an element that contains all of the search form controls.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: search role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#search'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_15: form landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_15: {
      ID:         'Landmark 15',
      DEFINITION: 'The @form@ landmark must only contain @region@ landmarks.',
      SUMMARY:    '@form@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@form@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmark structure on the page to ensure that the @form@ landmark only contains @region@ landmarks.',
        FAIL_P:   'Update the %N_F @form@ landmarks on the page to ensure that each only contains @region@ landmarks.',
        HIDDEN_S: 'One @form@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @form@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @form@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @form@ landmark.',
        ELEMENT_PASS_2:   '@form@ landmark does not contain any @region@ landmarks.',
        ELEMENT_PASS_3:   '@form@ landmark contains one @region@ landmark.',
        ELEMENT_PASS_4:   '@form@ landmark contains %1 @region@ landmarks.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1@ landmark is not contained by the @form@ landmark. Depending on the content in this landmark, consider moving it outside the @form@ landmark.',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @form@ landmark contains only @region@ landmarks.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="form"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@form@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_3: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Form landmarks provide a way to identify groups of form controls and widgets on the page.',
        'For @form@ landmarks containing more than one group of controls, where each is considered its own section, use @region@ landmarks to identify these sections.',
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'A @form@ element or an element with a @role="form"@ attribute, which also has an author-defined accessible name, will be considered an @form@ landmark.',
        'A @form@ landmark should be a container element of all the form controls in the form.',
        'Use a element @[role=region]@ attribute or a @section@ on an element that identifies subgroups or sections of controls.',
        'Use ARIA labeling techniques to give each region an accessible name describing the contents of the region.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: form role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#form'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_16: region landmark labeling
  // ----------------------------------------------------------------

  LANDMARK_16: {
      ID:         'Landmark 16',
      DEFINITION: 'Each element with an @[role=region]@ that should be an @region@ landmark must have an accessible name.',
      SUMMARY:    '@region@ landmark must have accessible name',
      TARGET_RESOURCES_DESC: 'Elements with @role="region"@ and @section@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Determine whether the element with ARIA role of @region@ should be a landmark and if so, add an accessible name to the element.',
        MANUAL_CHECK_P: 'Determine if any of the %N_MC elements with ARIA role of @region@ should be landmarks, and if so, add an accessible name to the those elements.',
        HIDDEN_S: 'One element with ARIA role of @region@ that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with ARIA role of @region@ that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with ARIA role of @region@ on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="region"]@ element has an accessible name and is considered an ARIA landmark.',
        ELEMENT_PASS_2:   '@section@ element has an accessible name.',
        ELEMENT_MC_1:     'Determine if the @%1[role="region"]@ element should be an ARIA landmark, and if so, add an accessible name.',
        ELEMENT_MC_2:     'Determine if the @section@ element should be an ARIA landmark, and if so, add an accessible name.',
        ELEMENT_HIDDEN_1: '@%1[role="region"]@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@section@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'The @region@ landmark is used to identify subsections of @banner@, @complementary@, @contentinfo@, @main@, @navigation@ and @search@ landmarks.',
        'For an element with an @[role=region]@ to be considered an @region@ landmark on the page, it must have an accessible name that identifies the contents of the region.'
      ],
      TECHNIQUES: [
        'A @section@ element or an element with a @role="region"@ attribute, which also has an author-defined accessible name, will be considered an @region@ landmark.',
        'Use the @aria-labelledby@ attribute to provide an accessible name by referencing the @id@s of one or more heading (e.g. h2, h3, h4 element) or other elements that identify the contents of the region.',
        'Use the @aria-label@ attribute to provide an accessible name that identifies the contents of the region.',
        'The @title@ attribute may also be used to provide an accessible name to identify the contents of the region. Note, however, that this technique also generates a tooltip in many  web browsers.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: region role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#region'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The SECTION element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-section-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA20: Using the region role to identify a region of the page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA20'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }

      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_17: unique acc. names for landmarks with same role
  // ----------------------------------------------------------------

  LANDMARK_17: {
      ID:         'Landmark 17',
      DEFINITION: 'Multiple instances of landmarks with the same role must have unique accessible names.',
      SUMMARY:    'Landmarks must be uniquely identifiable',
      TARGET_RESOURCES_DESC: 'Landmarks',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Review the landmark labeling to ensure that its accessible name is unique among other landmarks of the same type.',
        FAIL_P:   'Review the labeling of %N_T landmarks to ensure that, if any other landmarks of the same type exist on the page, each has a unique accessible name.',
        HIDDEN_S: 'One landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark has a unique label.',
        ELEMENT_FAIL_1:   'Change the accessible name "%1" of the @%2@ landmark (or the other duplicates) so that it is unique on the page.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Landmarks identify the regions of content on a page.',
        'When a landmark does not have an author-defined accessible name, assistive technologies will use its ARIA role as an identifier.',
        'When there is more than one landmark of the same type on the page (e.g., multiple @navigation@ and/or @region@ landmarks), additional labeling through the use of author-defined accessible names is needed to allow users to differentiate among them.'
      ],
      TECHNIQUES: [
        'Use the @aria-labelledby@ attribute to provide a unique accessible name by referencing the @id@ of a heading or other element on the page that describes the content of the landmark.',
        'Use the @aria-label@ attribute to provide a unique accessible name that describes the content of the landmark.',
        'The @title@ attribute may be used to provide a unique accessible name that describes the content of the landmark. Note, however, that many browsers will also generate a tooltip from the @title@ attribute value.',
        'While ARIA landmarks may be defined using the @role@ attribute, some HTML5 sectioning elements have default landmark roles (e.g., @main@, @nav@, @aside@, and in some situations, @header@ and @footer@). Thus when multiple @nav@ elements, for example, are used on a page, define a unique accessible name for each of them.'
                    ],
      MANUAL_CHECKS: [
        'Verify that the label describes the content of the landmark.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: region role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#region'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sections',
          url:   'https://www.w3.org/TR/html5/sections.html#sections'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_18: Landmarks must be descriptive
  // ----------------------------------------------------------------

  LANDMARK_18: {
      ID:         'Landmark 18',
      DEFINITION: 'Landmarks must identify regions of content on the page according to the ARIA Landmark Roles specification.',
      SUMMARY:    'Landmarks must identify content regions',
      TARGET_RESOURCES_DESC: 'Elements with ARIA Landmark roles',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Verify that the landmark role correctly identifies the content region for which the element is a container.',
        MANUAL_CHECK_P:  'Verify that each of the %N_MC landmark roles correctly identifies the content region for which its corresponding element is a container.',
        HIDDEN_S:        'One landmark that is hidden was not evaluated.',
        HIDDEN_P:        '%N_H landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:      'Verify the @%1@ landmark with the label "%2" describes the type of content it contains.',
        ELEMENT_HIDDEN_1:  'The @%1@ landmark was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'When ARIA landmarks are used to identify regions of content on the page, users of assistive technologies gain programmatic access to those regions through built-in navigation commands.',
        'Proper use of landmarks provides a navigable structure where common sections or features of pages can be easily accessed or, conversely, skipped over if they represent repeated blocks of content.',
        'If the appropriate landmark roles are NOT used, the type or purpose of each content region will be less obvious to users of assistive technologies.',
        'In the worst-case scenario, when NO landmark roles are present, the content on the page will be presented to users of assistive technologies as a single undifferentiated block.',
        'Visual styling of blocks of content are often good indicators of potential landmarks (e.g. @banner@, @main@, @navigation@, @contentinfo@).'
      ],
      TECHNIQUES: [
        'Use the appropriate landmarks to identify the different regions of content on a web page.',
        'The most important landmark roles are @main@ and @navigation@, as nearly every page will include at least those regions.',
        'Other commonly used landmark roles include @banner@, @contentinfo@, @complementary@ and @search@.',
        'Use HTML5 sectioning elements that have a default ARIA landmark role: @main@ (@main@), @nav@ (@navigation@), @aside@ (@complementary@) and in some situations @header@ (@banner@) and @footer@ (@contentinfo@). When using these elements, the @role@ attribute should NOT be defined.',
        'In HTML4 and XHTML 1.0 documents, a landmark can be created using a @div@ element with a @role@ attribute and the appropriate ARIA landmark role value (e.g., @role="main"@).',
        'The @search@ role is typically placed on a @form@ element or a @div@ that surrounds the search form.',
        'When there are multiple instances of a particular landmark role on a page, provide a unique accessible name for each landmark with the same role to enable users to differentiate among them.',
        'An alternative landmark can be created in HTML5 by using the @section@ element, which has a default landmark role of @region@, with an author-defined accessible name (e.g., using @aria-labelledby@ to reference a heading element).',
        'Do not nest landmarks with the same role (e.g., do not place navigation landmarks within a navigation landmark). Instead, use the @section@ element technique described above to provide additional subsections within a standard landmark.',
        'If a region on a page does not correspond to one of the defined ARIA landmark roles, the @section@ element technique described above can be used to create a landmark container for the content.'
      ],
      MANUAL_CHECKS: [
        'View the accessible names of the landmarks on the page and verify that each uniquely describes the type of content the landmark contains.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sections',
          url:   'https://www.w3.org/TR/html5/sections.html#sections'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }

      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_19: complementary landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_19: {
      ID:         'Landmark 19',
      DEFINITION: 'The @complementary@ landmark must be a top-level landmark.',
      SUMMARY:    '@complementary@ landmark: must be top level',
      TARGET_RESOURCES_DESC: '@complementary@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @complementary@ landmark on the page to ensure that it is a top-level @complementary@ landmark.',
        FAIL_P:   'Update the @complementary@ landmarks on the page to ensure that each is a top-level  @complementary@ landmark or a child of a @main@ landmark.',
        HIDDEN_S: 'One element with @[role="complementary"]@ attribute or @aside@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="complementary"]@ attribute and/or @aside@ elements  that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="complementary"]@ attributes and/or @aside@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="complementary"]@ attribute defines a @complementary@ landmark that is a top-level landmark.',
        ELEMENT_PASS_2:   '@%1[role="complementary"]@ attribute defines a @complementary@ landmark that is a top-level landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@aside@ element defines a @complementary@ landmark that is a top-level landmark.',
        ELEMENT_PASS_4:   '@aside@ element defines a @complementary@ landmark is a top-level landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="complementary"]@ attribute defines a @complementary@ that is a top-level landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @aside@ element is a top-level landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1[role="complementary"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@aside@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        '@complementary@ landmarks provide a way to identify sections of a page that may not be considered the main content, but that provide important supporting or related information to the main content.',
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'Use an @aside@ element to define a @complementary@ landmark.',
        'If the @aside@ element technique is not being used, a @role="complementary"@ attribute on the container element of the supporting content can be used to define a @complementary@ landmark.',
        'When creating the landmark structure on the page, ensure that the @complementary@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: complementary role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#complementary'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The ASIDE element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-aside-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://w3c.github.io/aria-practices/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://w3c.github.io/aria-practices/examples/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  }
};

/* messages.js for English messages */

const messages$1 = {
  common: common,
  ruleCategories: ruleCategories,
  rulesets: rulesets,
  wcag: wcag,
  rules: {}
};

messages$1.rules = Object.assign(messages$1.rules, colorRules);
messages$1.rules = Object.assign(messages$1.rules, landmarkRules);

/* locale.js */

/* Constants */
const debug$a = new DebugLogging('locale', false);

const messages = {
  en: messages$1
};

// Default language is 'en' for English
var locale = 'en';

/**
 * @function getCommonMessage
 *
 * @desc Gets a string associated with strings in the common messages
 *
 * @param {String} id     - id is used as the key into the common messages
 * @param {integer} value - If the key identifies an array the value is used to
 *                          select a value from the array
 */

function getCommonMessage(id, value=0) {
  let message = messages[locale].common[id];
  if (Array.isArray(message) ||
      (typeof message === 'object')) {
    message = message[value];
  }

  if (!message) {
    message = `[common][error]: id="${id}"`;
  }
  debug$a.flag && debug$a.log(`[${id}][${value}]: ${message}`);
  return message;
}

/**
 * @function getImplementationValue
 *
 * @desc Gets a localized string description for a implementation level
 *
 * @param {integer} implementationId - If the id is an index into an array
 *                                     of strings
 */

function getImplementationValue(implementationId) {
  let message = messages[locale].common.implementationValues[implementationId];
  return message;
}

/**
 * @function getRuleCategoryInfo
 *
 * @desc Gets a object with keys into strings with rule category information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} categoryId - Used to idenitify the rule category
 * 
 * @return {Object}  see @desc
 */

function getRuleCategoryInfo(categoryId) {
  const ruleCategories = messages[locale].ruleCategories;
  for (let i = 0; i < ruleCategories.length; i +=1) {
    let rc = ruleCategories[i];
    if (rc.id === categoryId) {
      return rc;
    }
  }
  return null;
}

/**
 * @function getRulesetInfo
 *
 * @desc Gets a object with keys into strings with ruleset information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} rulesetId - Used to idenitify the ruleset
 * 
 * @return {Object}  see @desc
 */

function getRulesetInfo (rulesetId) {
  const rulesets = messages[locale].rulesets;
  for (let i = 0; i < rulesets.length; i +=1) {
    let rs = rulesets[i];
    if (rs.id === rulesetId) {
      return rs;
    }
  }
  return null;
}

/**
 * @function getGuidelineInfo
 *
 * @desc Gets a object with keys into strings with WCAG Guideline information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} categoryId - Used to idenitify the WCAG guideline
 */

function getGuidelineInfo(guidelineId) {
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      if (guideline.id === guidelineId) {
        debug$a.flag && debug$a.log(`[getGuidelineInfo][${guidelineId}]: ${guideline.title}`);
        return {
          title: guideline.title,
          url: encodeURIComponent(guideline.url_spec),
          description: guideline.description
        }
      }
    }
  }
  debug$a.flag && debug$a.log(`[getGuidelineInfo][${guidelineId}][ERROR]: `);
  return null;
}

/**
 * @function getSuccessCriterionInfo
 *
 * @desc Gets a object with keys into strings with WCAG Success Criteria information,
 *       keys are:
 *       'level'
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {String} successCriteriaIds - Used to idenitify the rule category (e.g. P.G.SC)
 *
 * @return {Object} see @desc
 */

function getSuccessCriterionInfo(successCriterionId) {
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      for (const sc in guideline.success_criteria) {
        const success_criterion = guideline.success_criteria[sc];
        if (sc === successCriterionId) {
          debug$a.flag && debug$a.log(`[getSuccessCriterionInfo][${successCriterionId}]: ${success_criterion.title}`);
          return {
            level: success_criterion.level,
            title: success_criterion.title,
            url: encodeURIComponent(success_criterion.url_spec),
            description: success_criterion.description
          }
        }
      }
    }
  }
  debug$a.flag && debug$a.log(`[getSuccessCriterionInfo][${successCriterionId}]: ERROR`);
  return null;
}

/**
 * @function getSuccessCriteriaInfo
 *
 * @desc Gets an array of objects, each object has a keys to a string with WCAG Success Criteria information,
 *       keys are:
 *       'level'
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Array of String} successCriteriaIds - An array of success criterion reference (e.g. P.G.SC)
 *
 * @return {Array od Objects} see @desc
 */

function getSuccessCriteriaInfo(successCriteriaIds) {
  debug$a.flag && debug$a.log(`[getSuccessCriteriaInfo]: ${successCriteriaIds.length}`);
  const scInfoArray = [];
  successCriteriaIds.forEach( sc => {
    scInfoArray.push(getSuccessCriterionInfo(sc));
  });
  return scInfoArray;
}

/**
 * @function getScope
 *
 * @desc Gets a localize string for the rule scope id
 *
 * @param {Integer} scopeId - Numberical id associates with the rule scope
 *
 * @returns {String} see @desc
 */

function getScope (scopeId) {
  return messages[locale].common.ruleScopes[scopeId];
}

/**
 * @function getRuleId
 *
 * @desc Gets a localize string for the rule id
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getRuleId (ruleId) {
  return messages[locale].rules[ruleId].ID;
}

/**
 * @function getRuleDefinition
 *
 * @desc Gets a localize string for a rule definition
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getRuleDefinition (ruleId) {
  debug$a.flag && debug$a.log(`[getRuleDefinition][${ruleId}]: ${messages[locale].rules[ruleId].DEFINITION}`);
  return messages[locale].rules[ruleId].DEFINITION;
}

/**
 * @function getRuleSummary
 *
 * @desc Gets a localize string for a rule summary
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getRuleSummary (ruleId) {
  debug$a.flag && debug$a.log(`[getRuleSummary][${ruleId}]: ${messages[locale].rules[ruleId].SUMMARY}`);
  return transformElementMarkup(messages[locale].rules[ruleId].SUMMARY);
}

/**
 * @function getTargetResourcesDesc
 *
 * @desc Gets a description of the target resources
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getTargetResourcesDesc (ruleId) {
  debug$a.flag && debug$a.log(`[getTargetResourcesDesc][${ruleId}]: ${messages[locale].rules[ruleId].TARGET_RESOURCES_DESC}`);
  return transformElementMarkup(messages[locale].rules[ruleId].TARGET_RESOURCES_DESC);
}

/**
 * @function getPurposes
 *
 * @desc Gets an array of localized strings describing the purpose of the rule
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array of Strings} see @desc
 */

function getPurposes (ruleId) {
  const purposes = [];
  messages[locale].rules[ruleId].PURPOSES.forEach ( p => {
    purposes.push(transformElementMarkup(p));
  });
  debug$a.flag && debug$a.log(`[getPurposes][${ruleId}]: ${purposes.join('; ')}`);
  return purposes;
}

/**
 * @function getTechniques
 *
 * @desc Gets an array of localized strings describing the techniques to implement the rule requirements
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array of Strings} see @desc
 */

function getTechniques (ruleId) {
  const techniques = [];
  messages[locale].rules[ruleId].TECHNIQUES.forEach ( t => {
    techniques.push(transformElementMarkup(t));
  });
  debug$a.flag && debug$a.log(`[getTechniques][${ruleId}]: ${techniques.join('; ')}`);
  return techniques;
}

/**
 * @function getInformationLinks
 *
 * @desc Gets an array of objects with keys to localized strings to more information about the rule,
 *       the keys include:
 *       'type': Integer
 *       'title' : String
 *       'url' : String
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array} see @desc
 */

function getInformationLinks (ruleId) {
  const infoLinks = [];
  messages[locale].rules[ruleId].INFORMATIONAL_LINKS.forEach( infoLink => {
    infoLinks.push(
      {
        type: infoLink.type,
        title: infoLink.title,
        url: encodeURIComponent(infoLink.url)
      }
    );
    debug$a.flag && debug$a.log(`[infoLink][title]: ${infoLink.title}`);
    debug$a.flag && debug$a.log(`[infoLink][  url]: ${encodeURIComponent(infoLink.url)}`);
  });
  return infoLinks;
}

/**
 * @function getManualChecks
 *
 * @desc Gets an array of localized strings describing manual checks for verifying rule requirements
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array of Strings} see @desc
 */

function getManualChecks (ruleId) {
  const manualChecks = [];
  messages[locale].rules[ruleId].MANUAL_CHECKS.forEach ( mc => {
    manualChecks.push(transformElementMarkup(mc));
  });
  debug$a.flag && debug$a.log(`[getManualChecks][${ruleId}]: ${manualChecks.join('; ')}`);
  return manualChecks;
}

/**
 * @function getRuleResultMessages
 *
 * @desc Gets an array of localized strings for rule results
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array of Strings} see @desc
 */

function getRuleResultMessages (ruleId) {
  const resultMessages = {};
  const msgs = messages[locale].rules[ruleId].RULE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    resultMessages[key] = transformElementMarkup(msgs[key]);
    debug$a.flag && debug$a.log(`[getRuleResultMessages][${ruleId}][${key}]: ${resultMessages[key]}`);
  }
  return resultMessages;
}

/**
 * @function getBaseResultMessages
 *
 * @desc Gets an array of localized strings for element results
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array of Strings} see @desc
 */

function getBaseResultMessages (ruleId) {
  const resultMessages = {};
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    resultMessages[key] = transformElementMarkup(msgs[key]);
    debug$a.flag && debug$a.log(`[getBaseResultMessages][${ruleId}][${key}]: ${resultMessages[key]}`);
  }
  return resultMessages;
}

/**
 * @method getBaseResultMessage
 *
 * @desc Returns an localized element result message
 *
 * @return {String} String with element result message
 */

function getBaseResultMessage (msg, msgArgs) {
  let message = msg;
  msgArgs.forEach( (arg, index) => {
    const argId = "%" + (index + 1);

    if (typeof arg === 'string') {
      arg = filterTextContent(arg);
    }
    else {
      if (typeof arg === 'number') {
        arg = arg.toString();
      }
      else {
        arg = "";
      }
    }
    message = message.replace(argId, arg);
  });
  return transformElementMarkup(message);
}

/**
 * @function transformElementMarkup
 *
 * @desc Converts element markup identified in strings with '@' characters will be capitalized text
 *       or encapsulated within a code element.
 *
 * @param {String}   elemStr     - Element result message to convert content inside '@' to caps
 * @param {Boolean}  useCodeTags - If true content between '@' characters will be encapsulated
 *                                 in either a code element or if false or ommitted capitalized
 * @return  String
 */

function transformElementMarkup (elemStr, useCodeTags=false) {
  let newStr = "";
  let transform_flag = false;

  if (typeof elemStr === 'string') {
    for (let c of elemStr) {
      if (c === '@') {
        transform_flag = !transform_flag;
        if (useCodeTags) {
          newStr += (transform_flag ? '<code>' : '</code>');
        }
        continue;
      }
      newStr += (transform_flag && !useCodeTags) ? c.toUpperCase() : c;
    }
  }
  return newStr;
}

/* rule.js */

/* Constants */
const debug$9 = new DebugLogging('Rule', false);

/* ----------------------------------------------------------------   */
/*                             Rule                                   */
/* ----------------------------------------------------------------   */

/**
 * @constructor Rule
 *
 * @desc Creates and validates a rule used to evaluate an accessibility feature
 *       of a document
 *
 * @param {Object}    rule_item          - Object containing rule information
 */

class Rule {
  constructor (rule_item) {

    // Rule information that is NOT dependent on locale
    this.rule_id             = rule_item.rule_id; // String
    this.rule_required       = rule_item.rule_required; // Boolean
    this.rule_scope_id       = rule_item.rule_scope; // Integer
    this.rule_category_id    = rule_item.rule_category; // Integer
    this.ruleset_id          = rule_item.ruleset; // Integer
    this.last_updated        = rule_item.last_updated; // String
    this.target_resources    = rule_item.target_resources; // array of strings
    this.wcag_primary_id     = rule_item.wcag_primary_id;  // String (P.G.SC)
    this.wcag_related_ids    = rule_item.wcag_related_ids; // Array of Strings (P.G.SC)
    this.wcag_guideline_id   = getGuidelineId(rule_item.wcag_primary_id); // Integer
    this.validate            = rule_item.validate;  // function

    // Rule information that is locale dependent
    this.rule_category_info  = getRuleCategoryInfo(this.rule_category_id); // Object with keys to strings
    this.guideline_info      = getGuidelineInfo(this.wcag_guideline_id); // Object with keys to strings
    this.ruleset_info        = getRulesetInfo(this.ruleset_id); // Object with keys to strings
    this.rule_scope          = getScope(this.rule_scope_id); // String
    this.wcag_primary        = getSuccessCriterionInfo(this.wcag_primary_id);
    this.wcag_related        = getSuccessCriteriaInfo(this.wcag_related_ids);
    this.wcag_level          = getCommonMessage('level', this.wcag_primary.level);

    this.rule_nls_id           = getRuleId(this.rule_id); // String
    this.summary               = getRuleSummary(this.rule_id); // String
    this.definition            = getRuleDefinition(this.rule_id); // String
    this.target_resources_desc = getTargetResourcesDesc(this.rule_id); // String
    this.purposes              = getPurposes(this.rule_id);  // Array of strings
    this.techniques            = getTechniques(this.rule_id);  // Array of strings
    this.manual_checks         = getManualChecks(this.rule_id);  // Array of strings
    this.informational_links   = getInformationLinks(this.rule_id);  // Array of objects with keys to strings

    // Localized messsages for evaluation results
    this.rule_result_msgs = getRuleResultMessages(this.rule_id); // Object with keys to strings
    this.base_result_msgs = getBaseResultMessages(this.rule_id); // Object with keys to strings

    debug$9.flag && this.toJSON();
  }

  /**
   * @method getId
   *
   * @desc Get the programmatic id that uniquely identifies the rule
   *
   * @return {String} The rule id
   */

  getId () {
    return this.rule_id;
  }

  /**
   * @method getIdNLS
   *
   * @desc Get a localized human readable id for uniquely identifying the rule
   *
   * @return {String} Localized string of the rule id
   */

  getIdNLS () {
    return this.rule_nls_id;
  }

  /**
   * @method getGuideline
   *
   * @desc Get number of the associated guideline
   *
   * @return  {Integer} see description
   */

  getGuideline () {
   return this.wcag_guideline_id;
  };

  /**
   * @method getGuidelineInfo
   *
   * @desc Get information about the WCAG Guideline associated with the rule
   *
   * @return  {GuidelineInfo}  see description
   */

  getGuidelineInfo () {
   return this.guideline_info;
  }

  /**
   * @method getCategory
   *
   * @desc Get a numerical constant representing the rule category
   *
   * @return {Integer}  see @desc
   */

  getCategory () {
    return this.rule_category_id;
  }

  /**
   * @method getCategoryInfo
   *
   * @desc Get a localized title, url and description of the rule category
   *
   * @return {RuleCategoryInfoItem}  see @desc
   */

  getCategoryInfo () {
    return this.rule_category_info;
  }

  /**
   * @method getRuleset
   *
   * @desc Get a numerical constant representing the ruleset
   *
   * @return {Integer}  see @desc
   */

  getRuleset () {
    return this.ruleset_id;
  }

  /**
   * @method getRulesetInfo
   *
   * @desc Get a localized title, url and description of the ruleset
   *
   * @return {Object}  see @desc
   */

  getRulesetInfo () {
    return this.ruleset_info;
  }

  /**
   * @method getScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Integer} rule scope constant
   */

  getScope () {
    return this.rule_scope_id;
  }


  /**
   * @method getScopeNLS
   *
   * @desc Get a localized string of the rule scope (i.e. 'element' or 'page')
   *
   * @return {String} Localized string of the rule scope
   */

  getScopeNLS () {
    return this.rule_scope;
  }


  /**
   * @method getDefinition
   *
   * @desc Gets the definition of the rule
   *
   * @return {String} Localized string of the rule definition
   */
  getDefinition () {
    return this.definition;
  }

  /**
   * @method getSummary
   *
   * @desc Gets the summary of the rule
   *
   * @return {String} Localized string of the rule summary
   */
  getSummary (required) {
    return this.summary;
  }

  /**
   * @method getPurposes
   *
   * @desc Gets an array strings representing the purpose, basically
   *       how does the rule help people with disabilities
   *
   * @return  {Array}  Returns an array of localized string describing the purpose
   */

  getPurposes () {
    return this.purposes;
  }

  /**
   * @method getTargetResourcesDescription
   *
   * @desc Get a description of the markup or page feature the rule is evaluates
   *
   * @return  {String}  Localized string representing the markup or page feature
   *                    tested by the rule
   */

  getTargetResourcesDescription () {
    return this.target_resources_desc;
  }

  /**
   * @method getTargetResources
   *
   * @desc Returns an localized array strings representing target resources of
   *       the rule
   *
   * @return  {Array}  Returns an array of strings identifying the elements and/or
   *                    attributes that the rule evaluates
   */

  getTargetResources () {
    return this.target_resources;
  }

  /**
   * @method getTechniques
   *
   * @desc Get the techniques to implement the requirements of the rule
   *
   * @return  {Array}  Array of InformationalLinkInfo objects
   */
  getTechniques () {
    return this.techniques;
  }

  /**
   * @method getManualCheckProcedures
   *
   * @desc Gets manual checking proceedures for evaluating the rule
   *       requirements
   *
   * @return  {Array}  Array of InformationalLinkInfo objects
   */

  getManualCheckProcedures () {
    return this.manual_checks;
  }

  /**
   * @method getInformationalLinks
   *
   * @desc Get information links related to understanding or implementation of the rule
   *
   * @return  {Array}  Returns an array of InformationalLinkInfo objects
   *
   * @example
   *
   * var node_list = [];
   * var info_links = rule.getInformationalLinks();
   *
   * for(var i = 0; i < info_links.length; i++) {
   *   var info_link = info_links[i];
   *
   *   // Using object properties to create a link element
   *   var node = document.createElement('a');
   *   node.appendChild(document.createTextNode(info_link.title));
   *   node.setAttribute('href',  info_link.url);
   *   node.setAttribute('class', info_link.type_const.toString());
   *
   *   node_list.push(node);
   * }
   */

  getInformationalLinks () {
    return this.informationa_links;
  }

  /**
   * @method getPrimarySuccessCriterion
   *
   * @desc Get id of the primary WCAG Success Criteria for the rule
   *
   * @return  {Integer}  see description
   */

  getPrimarySuccessCriterion () {
    return this.wcag_primary_id;
  }

  /**
   * @method getPrimarySuccessCriterionNLS
   *
   * @desc Get information about primary WCAG Success Criteria for the rule
   *
   * @return  {SuccessCriterionInfo}  Object representing information about the SC
   */

  getPrimarySuccessCriterionNLS () {
    return this.wcag_primary;
  }

  /**
   * @method getRelatedSuccessCriteria
   *
   * @desc Get information about the related WCAG Success Criteria for the rule
   *
   * @return  {Array}  Array of SuccessCriterionInfo objects
   */

  getRelatedSuccessCriteria () {
    return this.wcag_related;
  }

  /**
   * @method getWCAGLevel
   *
   * @desc Get the string representation of the the WCAG Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAGLevel () {
    return this.wcag_level;
  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON representation of the rule
   *
   * @return  {String}  Returns a JSON representation of the rule
   */

  toJSON () {

    const ruleInfo = {
      last_updated: this.last_updated,

      rule_id:      this.rule_id,
      rule_nls_id:  this.rule_nls_id,
      summary:      this.summary,
      definition:   this.definition,

      rule_required:  this.rule_required,

      target_resources_desc:  this.target_resources_desc,

      rule_scope_id:  this.rule_scope_id,
      rule_scope:     this.rule_scope,

      rule_category_id:   this.rule_category_id,
      rule_category_info: this.rule_category_info,
      
      ruleset_id:   this.ruleset_id,
      ruleset_info: this.ruleset_info,
      
      wcag_guideline_id:  this.wcag_guideline_id,
      guideline_info:     this.guideline_info,

      target_resources:  this.target_resources,

      wcag_primary_id:  this.wcag_primary_id,
      wcag_primary:     this.wcag_primary,
      wcag_level:       this.wcag_level,

      wcag_related_ids: this.wcag_related_ids,
      wcag_related:     this.wcag_related,

      purposes:       this.purposes,
      techniques:     this.techniques,
      manual_checks:  this.manual_checks,

      informational_links:    this.informational_links
    };

    const json = JSON.stringify(ruleInfo, null, '  ');
    debug$9.flag && debug$9.log(`[JSON]: ${json}`);
    return json;

  }
}

/* allRules.js */

/* Constants */
new DebugLogging('Rules', false);

const allRules = [];

function addToArray (ruleArray) {
  ruleArray.forEach( r => {
    allRules.push(new Rule(r));
  });
}

addToArray(colorRules$1);
// addToArray(landmarkRules);

/* resultSummary.js */

const debug$8 = new DebugLogging('ruleResultSummary', false);

/* ---------------------------------------------------------------- */
/*                             RuleResultsSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleResultsSummary
 *
 * @desc Constructor for an object that contains summary of rule results for a
 *       set of rule result objects or a cache item result
 *
 * @property  {Number}  violations      - Number of rule results with at
 *                                        least one violation
 * @property  {Number}  warnings        - Number of rule results with at
 *                                        least one warning
 * @property  {Number}  failures        - Number of rule results with at
 *                                        least one violation or warning
 * @property  {Number}  manual_checks   - Number of rule results with at
 *                                        least one manual check
 * @property  {Number}  passed          - Number of rule results that all
 *                                        element results pass
 * @property  {Number}  not_applicable  - Number of rule results with no
 *                                        element results
 */

class RuleResultsSummary  {

  constructor () {
    this.v   = 0;  // Number of rule results with are violations
    this.w   = 0;  // Number of rule results with are warnings
    this.mc  = 0;  // Number of rule results with are manual checks
    this.p   = 0;  // Number of rule results with are passed
    this.na  = 0;  // Number of rule results with are not applicable
    this.hmc = 0;  // True if any of the rule results includes at least one element
                  // result that is a manual check

    this.t   =  0;  // total number of rule results with results
    this.sum =  0;  // summ of the implementation scores for all rule results
    this.is  = -1;  // implementation score for group
    this.iv  = IMPLEMENTATION_VALUE.UNDEFINED; // implementation value for the group

    debug$8.flag && debug$8.log(`[RuleResultsSummary]: ${this.toString()}`);
  }

   get violations()     { return this.v;  }
   get warnings()       { return this.w;  }
   get manual_checks()  { return this.mc; }
   get passed()         { return this.p;  }
   get not_applicable() { return this.na;  }

   get implementation_score() { return this.is;  }
   get implementation_value() { return this.iv;  }

  /**
   * @method updateSummary
   *
   * @desc Updates rule result summary calculation
   *
   * @param  {RuleResult}  rule_result  - Rule result object to add to summary
   */

  updateSummary ( rule_result ) {

    const rrv = rule_result.getResultValue();

    if (rrv === RULE_RESULT_VALUE.VIOLATION        ) this.v  += 1;
    else if (rrv === RULE_RESULT_VALUE.WARNING     ) this.w  += 1;
    else if (rrv === RULE_RESULT_VALUE.MANUAL_CHECK) this.mc += 1;
    else if (rrv === RULE_RESULT_VALUE.PASS        ) this.p  += 1;
    else  this.na += 1;

    this.hmc = this.hmc || (rule_result.getElementResultsSummary().manual_checks > 0);

    const rris = rule_result.getImplementationScore();

    if (rris >= 0) {
      this.t += 1;
      this.sum = this.sum + rris;
      this.is = Math.round(this.sum/this.t);
      if ((this.is === 100) && ((this.v + this.w) > 0)) {
        this.is = 99;
      }
    }

    if (this.hmc) {
      this.iv = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;
    }
    else {
      this.iv = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    }

    if (this.is === 100) {
      if (this.hmc) {
        this.iv = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
      }
      else {
        this.iv = IMPLEMENTATION_VALUE.COMPLETE;
      }
    } else {
      if (this.is > 95) this.iv = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
      else if (this.is > 50) this.iv = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
      else if (this.is >= 0) this.iv = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;
    }

  }

  /**
   * @method hasResults
   *
   * @desc True if at least one element results is a violation, warning, manual check
   *       or passed, otherwise false (e.g no element results or all hidden)
   *
   * @return {Boolean} see description
   */

  hasResults () {
    return this.v || this.w || this.mc || this.p || this.na;
  }

  /**
   * @method toString
   *
   * @desc output information about the summary
   *
   * @return  {String}  Information about rule summary
   */

  toString () {
    return "V: " + this.v + " W: " + this.w + " MC: " + this.mc + " P: " + this.p + " NA: " + this.na;
  }
}

/* ruleGroupResult.js */

/* Constants */
const debug$7 = new DebugLogging('ruleGroupResult', false);

/**
 * @class RuleGroupResult
 *
 * @desc Constructs a data structure of cache items associated with a rule category
 *       Node results can be filtered when a rule result is added to the group
 *
 * @param  {Object}  evaluation_result  - ruleset and evaluation results used to generate
 *                              the filtered results
 * @param  {String}  group_id  - id used to identify this grouping of rules and filtering rules
 *
 * @param  {String}  title     - Title for the group
 * @param  {String}  url       - URL to more information on the group
 * @param  {String}  desc      - Description of the group
 *
 * @param  {Integer} ruleset - Numerical constant that specifies the ruleset
 *                             By default all rules ar included
 * 
 * @property  {Object}  rule_group_information - Information on rules in the group
 * @property  {Array}   rule_results           - List of rule result objects in the group
 *
 * @property  {EvaluationResult} evaluation_result - ruleset and evaluation results
 *                                                   used to generate the filtered
 *                                                   results
 *
 * @property  {RuleResultsSummary}  rule_results_summary  - Summary of the rule results for
 *                                                           the group
 */


class RuleGroupResult {
  constructor (evaluationResult, title, url, desc, ruleset=RULESET.ALL) {
    this.evaluation_result = evaluationResult;

    this.title       = title;
    this.url         = url;
    this.description = desc;

    this.rules_required    = 0;
    this.rules_recommended = 0;

    this.ruleset = ruleset;

    this.rule_results = [];
    this.rule_results_summary = new RuleResultsSummary();

    debug$7.flag && debug$7.log(`[title]: ${this.title} (${ruleset})`);
  }

  /**
   * @method getEvaluationResult
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Returns the evaluation result the rule group result is a part of
   *
   * @return {EvaluationResult}  see description
   */

  getEvaluationResult = function () {
    return this.evaluation_result;
  }

  /**
   * @method getImplementationScore
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Return a numerical value between (0-100) indicated
   *
   * @return {Number}  see description
   */

  getImplementationScore = function () {
    return this.rule_results_summary.implementation_score;
  }


  /**
   * @method getImplementationValue
   *
   * @desc Return a numerical constant indicating the level of implementation
   *
   * @return {Number}  see description
   */

  getImplementationValue = function () {
    return this.rule_results_summary.implementation_value;
  }

   /**
   * @method getImplementationValueNLS
   *
   * @desc Returns a string indicating the level of implementation:
   *
   * @return {String} see description
   */

  getImplementationValueNLS = function () {
    return getImplementationValue(this.getImplementationValue());
  }

  /**
   * @method getRuleResultsArray
   *
   * @desc Return a list of rule results associated with the group
   *
   * @return {Array}  see description
   */

  getRuleResultsArray = function () {
    return this.rule_results;
  }

  /**
   * @method getRuleResultsSummary
   *
   * @desc Gets numerical summary information about the rule results
   *
   * @return {RuleResultsSummary} Returns the rule result summary object
   */

  getRuleResultsSummary = function () {
    return this.rule_results_summary;
  }

  /**
   * @method hasRuleResults
   *
   * @desc Tests if any of the rules in this group applied to the content in the page
   *       Basically is there at least one rule result that was a violation, warning,
   *       manual check or pass
   *
   * @return {Boolean} True if any of the rule have results, otherwise false
   */

  hasRuleResults = function () {
    return this.rule_results_summary.hasResults();
  }

  /**
   * @method hasRules
   *
   * @desc Tests if their are any rule results in this group
   *
   * @return {Boolean} True if the group contains at least one rule, otherwise false
   */

  hasRules = function () {
    return this.rule_results.length > 0;
  }


  /**
   * @method addRuleResult
   *
   * @desc Adds a rule result to the grouping aggregation of results if the group id has a match in the group
   *
   * @param  {RuleResult}  rule_result   - Filtered rule result object to aggregate
   */

  addRuleResult (rule_result) {
    if (rule_result.rule.getRuleset() <= this.ruleset) {
      this.rule_results.push(rule_result);
      this.rule_results_summary.updateSummary(rule_result);

      if (rule_result.isRuleRequired()) {
        this.rules_required += 1;
      }
      else {
        this.rules_recommended += 1;
      }
    }
  }

  /**
   * @method toJSON
   *
   * @desc Returns an JSON representation of the rule group results
   *
   * @param {Boolean} flag (optional)  -  True (default) to include filtered element results, false to not include
   *
   * @return  {String}  JSON string representing the report data
   */

  toJSON (flag=false) {

    const date = this.evaluation_result.date.split(':');
    const rule_results = [];
    this.rule_results.forEach( rr => {
      rule_results.push(rr.getDataForJSON(flag));
    });

    const ruleGroupResultInfo = {
      version: VERSION,
      eval_title: this.evaluation_result.title,
      eval_url: cleanForUTF8(this.evaluation_result.eval_url),
      eval_url_encoded: encodeURI(this.evaluation_result.eval_url),
          eval_date: date[0],
      eval_time: date[1] + ":" + date[2],
      rule_results: rule_results
    };

    const json = JSON.stringify(ruleGroupResultInfo);
    debug$7.flag && debug$7.log(`[JSON]: ${json}`);
    return json;
  }
}

/* elementResult.js */

/* ---------------------------------------------------------------- */
/*                             BaseResult                           */
/* ---------------------------------------------------------------- */

/**
 * @class Result
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element or page
 *
 * @param  {ResultRule}   ruleResult   - reference to the rule result object
 * @param  {Number}       resultValue  - Constant representing result value of the evaluation result
 * @param  {String}       msgId        - String reference to the message string in the NLS file
 * @param  {Array}        msgArgs      - Array  array of values used in the message string
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result    - reference to the rule result object
 * @property  {Number}     result_value   - Constant representing result value of the evaluation result
 * @property  {String}     result_message - String reference to the message string in the NLS file
 */

class BaseResult {
  constructor (ruleResult, resultValue, msgId, msgArgs) {

    const msg = ruleResult.rule.base_result_msgs[msgId];

    this.rule_result    = ruleResult;
    this.result_value   = resultValue;
    this.result_message = getBaseResultMessage(msg, msgArgs);
  }

  /**
   * @getter isElementResult
   *
   * @desc Returns true, since this class is the base result class
   *       Use to distinguish from PageResult class
   *    
   * @return {Boolean} false
   */

  get isElementResult () {
    return false;
  }

  /**
   * @getter isPageResult
   *
   * @desc Returns false, since this class is the base result class
   *       Use to distinguish from ElementResult class
   *
   * @return {Boolean} false
   */

  get isPageResult () {
    return false;
  }

  /**
   * @getter isWebsiteResult
   *
   * @desc Returns false, since this class is the base result class
   *       Use to distinguish from ElementResult class
   *
   * @return {Boolean} true
   */

  get isWebsiteResult () {
    return false;
  }

  /**
   * @method getRuleResult
   *
   * @desc Gets the rule result that this element result is associated with.
   *       Provides access to rule and ruleset information if needed
   *
   * @return {Object} see @desc
   */
  getRuleResult () {
     return this.rule_result;
  }

  /**
   * @method getElementIdentifier
   *
   * @desc Gets a string identifying the result,
   *       is overrided by ElementResult and PageResult
   *
   * @return {String} see @desc
   */

  getResultIdentifier () {
    return 'undefined';
  }

  /**
   * @method getOrdinalPosition
   *
   * @desc Gets a string identifying the ordinal position,
   *       is overrided by ElementResult and not needed for
   *       PageResults
   *
   * @return {String} see @desc
   */

  getOrdinalPosition () {
    return '';
  }

  /**
   * @method getResultValue
   *
   * @desc Returns an numerical constant representing the element result
   *
   * @return {Number} see @desc
   */
   getResultValue () {
     return this.result_value;
   }

  /**
   * @method getResultValueNLS
   *
   * @desc Gets a string representation of the rule result value
   *
   * @return {String} see @desc
   */

  getResultValueNLS () {
    return getCommonMessage('ruleResult', this.result_value);
  }

 /**
   * @method getDataForJSON
   *
   * @desc Object containing the data for exporting result to JSON
   *
   * @return {Object} see @desc
   */

  getDataForJSON () {
    const data = {
      result_value:       this.getResultValue(),
      result_value_nls:   this.getResultValueNLS(),
      result_identifier:  this.getResultIdentifier(),
      ordinal_position:   this.getOrdinalPosition(),
      message:            this.result_message
    };
    return data;
  }

  /**
   * @method toJSON
   *
   * @desc Creates JSON object descibing the properties of the result
   *
   * @return {String} see @desc
   */

  toJSON () {
    return JSON.stringify(this.getDataForJSON(), null, '  ');
  }
}

/* elementResult.js */

/* Constants */

const debug$6 = new DebugLogging('ElementResult', false);

/**
 * @class ElementResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       domElement          - DOmElement reference to element information used by this rule result
 * @param  {String}       message_id          - String reference to the message string in the NLS file
 * @param  {Array}        message_arguments   - Array  array of values used in the message string
 * @param  {Array}        props               - Array of properties that are defined in the validation function (NOTE: typically undefined)
 * @param  {String}       elem_identifier     - String identifying the element (Optional)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     result_value        - Constant representing result value of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          - String reference to the message string in the NLS file
 * @property  {Array}      message_arguments   - Array  array of values used in the message string
 */

class ElementResult extends BaseResult {
  constructor (rule_result, result_value, domElement, message_id, message_arguments) {
    super(rule_result, result_value, message_id, message_arguments);

    this.domElement = domElement;

    if (debug$6.flag) {
      debug$6.log(`${this.result_value}: ${this.result_message}`);
    }
  }

  /**
   * @getter isElementResult
   *
   * @desc Returns true, since this class is a ElementResult
   *       Use to distinguish from PageResult class
   *    
   * @return {Boolean} true
   */

  get isElementResult () {
    return true;
  }

  /**
   * @method getHTMLAttributes
   *
   * @desc Gets common HTML attributes related to elements
   *       some elements have special props like alt
   *
   * @return {Object} with attribute name as key to attribute value
   */
   
  getHTMLAttributes () {
    return this.domElement.htmlAttrs;
  }

  /**
   * @method getAriaAttributes
   *
   * @desc Gets ARIA attributes
   *
   * @return {Object} with attribute name as key to attribute value
   */
  getAriaAttributes () {
    return this.domElement.ariaAttrs;
  }

 /**
 * @method getAccessibleNameInfo
 *
 * @desc Gets accessible name and description information
 *
 * @return {Object}
 */
  getAccessibleNameInfo () {
    const info = {
      name:            this.domElement.accName.name,
      name_source:     this.domElement.accName.source,
      name_required:   this.domElement.ariaValidation.isNameRequired,
      name_prohibited: this.domElement.ariaValidation.isNameProhibited,
    };
    return info;
  }

  /**
  * @method getColorContrastInfo
  *
  * @desc Gets color contrast information for an element result
  *
  * @return {Object} Object with color contrast keys and values
  */
  getColorContrastInfo () {
    const info = {};
    const rule = this.rule_result.getRule();

    if (rule && (rule.getId() === 'COLOR_1')) {
      const cc = this.domElement.colorContrast;
      if (cc) {
        info.color_contrast_ratio  = cc.colorContrastRatio;
        info.color                 = cc.color;
        info.color_hex             = '#' + cc.colorHex;
        info.background_color      = cc.backgroundColor;
        info.background_color_hex  = '#' + cc.backgroundColorHex;
        info.font_family           = cc.fontFamily;
        info.font_size             = cc.fontSize;
        info.font_weight           = cc.fontWeight;
        info.large_font            = cc.isLargeFont ? 'Yes' : 'no';
        info.background_image      = cc.backgroundImage;
        info.background_repeat     = cc.backgroundRepeat;
        info.background_position   = cc.backgroundPosition;
      }
    }
    return info;
  }

  /**
  * @method getVisibilityInfo
  *
  * @desc Gets visibility information for an element result
  *
  * @return {Object} Object with vibility keys and values
  */
  getVisibilityInfo () {
    var info = {};
    var cs;
    if (this.dom_element) {
      cs = this.dom_element.computed_style;
      if (cs) {
        info.graphical_rendering  = this.visibility[cs.is_visible_onscreen];
        info.assistive_technology = this.visibility[cs.is_visible_to_at];
      }
    }
    return info;
  }

  /**
   * @method getResultIdentifier
   *
   * @desc Gets a string identifying the element, typically element and//or a key attribute
   *       or property value
   *
   * @return {String} see description
   */

  getResultIdentifier () {
    const de = this.domElement;
    const identifier =  de.node.hasAttribute('type') ?
                        `${de.tagName}[${de.getAttribute('type')}]` :
                        de.tagName;
    return identifier;
  }


  /**
   * @method getOrdinalPosition
   *
   * @desc Gets a string identifying the ordinal position,
   *       is overrided by ElementResult and PageResult
   *
   * @return {String} see description
   */

  getOrdinalPosition () {
    return this.domElement.ordinalPosition;
  }

}

/* resultSummary.js */

const debug$5 = new DebugLogging('ElementResultSummary', false);

/* ---------------------------------------------------------------- */
/*                             ResultSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @class ResultsSummary
 *
 * @desc Constructor for an object that contains summary of element, page, website
 *       results for rule result
 *
 * @property  {Integer}  p  - Number of element, page or website results that passed
 * @property  {Integer}  v  - Number of required element, page or website results that
 *                            failed
 * @property  {Integer}  w  - Number of recommended element, page or website results
 *                            that failed
 * @property  {Integer}  mc - Number of element, page or website results that require
 *                            a mannual check
 * @property  {Integer}  h  - Number of element, page or website results that are hidden
 */

class ResultsSummary {
  constructor () {
    // Element result counts
    this.p   = 0;
    this.v   = 0;
    this.w   = 0;
    this.mc  = 0;
    this.h   = 0;

    debug$5.flag && debug$5.log(`[ElementResultsSummary]: ${this.toString()}`);
  }

  get violations()     { return this.v;   }
  get warnings()       { return this.w;   }
  get manual_checks()  { return this.mc;  }
  get passed()         { return this.p;   }
  get hidden()         { return this.h;   }

  /**
   * @method hasResults
   *
   * @desc True if at least one element results is a violation, warning, manual check
   *       or passed, otherwise false (e.g no element results or all hidden)
   *
   * @return {Boolean} see description
   */

  hasResults () {
    return (this.v || this.w || this.mc || this.p);
  }

  /**
   * @method addViolations
   * @private
   *
   * @desc Adds violation element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addViolations ( n ) {
    if (n > 0) {
      this.v += n;
    }
  }

  /**
   * @method addWarnings
   *
   * @desc Adds warning element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addWarnings ( n ) {
    if (n > 0) {
      this.w += n;
    }
  }

  /**
   * @method addManualChecks
   *
   * @desc Adds manual check element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addManualChecks ( n ) {
    if ( n > 0) {
      this.mc += n;
    }
  }

  /**
   * @method addPassed
   *
   * @desc Adds passed element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

   addPassed ( n ) {
     if (n > 0) {
       this.p += n;
     }
   }

  /**
   * @method addHidden
   * @private
   *
   * @desc Adds hidden element results to the summary calculation
   *
   * @param  {Integer}  n  -  Number of element results that are hidden
   */

  addHidden ( n ) {
    if (n > 0) {
      this.h += n;
    }
  }

  /*
   * @method toString
   *
   * @desc output information about the summary
   *
   * @return  {String}  Information about element summary
   */

  toString () {
    return "V: " + this.v + " W: " + this.w + " MC: " + this.mc + " P: " + this.p + " H: " + this.h;
  }
}

/* elementResult.js */

/* Constants */

const debug$4 = new DebugLogging('PageResult', false);

/**
 * @class PageResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       domCache            - DomCache reference to element information used by this rule result
 * @param  {String}       message_id          - String reference to the message string in the NLS file
 * @param  {Array}        message_arguments   - Array  array of values used in the message string
 * @param  {Array}        props               - Array of properties that are defined in the validation function (NOTE: typically undefined)
 * @param  {String}       elem_identifier     - String identifying the element (Optional)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     result_value        - Constant representing result value of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          - String reference to the message string in the NLS file
 * @property  {Array}      message_arguments   - Array  array of values used in the message string
 */

class PageResult extends BaseResult {
  constructor (rule_result, result_value, domCache, message_id, message_arguments) {
    super(rule_result, result_value, message_id, message_arguments);

    this.domCache = domCache;

    if (debug$4.flag) {
      debug$4.log(`${this.result_value}: ${this.result_message}`);
    }
  }

  /**
   * @getter isPageResult
   *
   * @desc Returns true, since this class is a PageResult
   *       Use to distinguish from ElementResult class
   *    
   * @return {Boolean} true
   */

  get isPageResult () {
    return true;
  }

  /**
   * @method getResultIdentifier
   *
   * @desc Gets a string identifying the page result
   *
   * @return {String} see description
   */

  getResultIdentifier () {
    return 'page';
  }

}

/* elementResult.js */

/* Constants */

const debug$3 = new DebugLogging('PageResult', false);

/**
 * @class WebsiteResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       domCache            - DomCache reference to element information used by this rule result
 * @param  {String}       message_id          - String reference to the message string in the NLS file
 * @param  {Array}        message_arguments   - Array  array of values used in the message string
 * @param  {Array}        props               - Array of properties that are defined in the validation function (NOTE: typically undefined)
 * @param  {String}       elem_identifier     - String identifying the element (Optional)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     result_value        - Constant representing result value of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          - String reference to the message string in the NLS file
 * @property  {Array}      message_arguments   - Array  array of values used in the message string
 */

class WebsiteResult extends BaseResult {
  constructor (rule_result, result_value, domCache, message_id, message_arguments) {
    super(rule_result, result_value, message_id, message_arguments);

    this.domCache = domCache;

    if (debug$3.flag) {
      debug$3.log(`${this.result_value}: ${this.result_message}`);
    }
  }

  /**
   * @getter isWebsiteResult
   *
   * @desc Returns true, since this class is a WebResult
   *       Use to distinguish from ElementResult class
   *    
   * @return {Boolean} true
   */

  get isWebsiteResult () {
    return true;
  }

  /**
   * @method getResultIdentifier
   *
   * @desc Gets a string identifying the website result
   *
   * @return {String} see description
   */

  getResultIdentifier () {
    return 'website';
  }

}

/* ruleResult.js */

const debug$2 = new DebugLogging('ruleResult', false);

/* ---------------------------------------------------------------- */
/*                             RuleResult                           */
/* ---------------------------------------------------------------- */

 /**
 * @class RuleResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a ruleset rule
 *
 * @param  {Rule}  Rule  - Rule associated with the result
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {Object} rule                   - Rule associated with the result
 *
 * @property  {Array}  results_passed         - Array of all the results
 *                                              that passed
 * @property  {Array}  results_violations     - Array of all the results
 *                                              that resulted in violations
 * @property  {Array}  results_warnings       - Array of all the results
 *                                              that resulted in warnings
 * @property  {Array}  results_manual_checks  - Array of all the results
 *                                              that require manual evaluations
 * @property  {Array}  results_hidden         - Array of all the results
 *                                              that are hidden
 *
 * @property  {ElementResultsSummary} results_summary  - Summary of the node results for
 *                                               the rule result
 */

class RuleResult {

  constructor (rule) {
    this.rule = rule;

    this.results_passed         = [];
    this.results_violations     = [];
    this.results_warnings       = [];
    this.results_manual_checks  = [];
    this.results_hidden         = [];

    this.results_summary = new ResultsSummary();

    if (debug$2.flag) {
      debug$2.log(this.toString());
    }
  }

  /**
   * @method validate
   *
   * @desc Executes the validate function of the rule and stores the
   *       results in this rule result
   */

  validate (domCache) {
    this.rule.validate(domCache, this);
  }

  /**
   * @method hasHiddenElementResults
   *
   * @desc True if at least one element result is a hidden,
   *       otherwise false if no element results or all element results are hidden
   *
   * @return {Boolean} see description
   */

  hasHiddenElementResults () {
    return this.results_summary.hidden > 0;
  }

  /**
   * @method getImplementationScore
   *
   * @desc Returns a number between 0 - 100 indicating the level of
   *       implementation the violations, warnings and passed element results
   *       A score value of -1 means the rule only had manual checks or was not
   *       applicable
   *
   * @return {Integer} see description
   */

  getImplementationScore () {
    let score = -1;
    const ers = this.getResultsSummary();
    const failures = ers.violations + ers.warnings;
    const passed = ers.passed;
    const total = failures + passed;

    if (total > 0) {
      score = Math.round((100 * passed) / total);
      if ((score === 100) && (failures > 0)) score = 99;
    }
    return score;
  }

  /**
   * @method getImplementationValue
   *
   * @desc Return a numerical constant indicating the level of implementation:
   *
   * @return {Integer} see description
   */

  getImplementationValue () {

    let value     = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    const summary = this.getResultsSummary();
    const score   = this.getImplementationScore();

    if (summary.manual_checks > 0) {
      value = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;
    }

    if (score === 100) {
      if (summary.manual_checks > 0) {
        value = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
      }
      else {
        value = IMPLEMENTATION_VALUE.COMPLETE;
      }
    } else {
      if (score > 95) {
        value = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
      } else {
        if (score > 50) {
          value = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
        } else {
          if (score >= 0) {
            value = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;
          }
        }
      }
    }
    return value;
  }

  /**
   * @method getImplementationValueNLS
   *
   * @desc Returns a string indicating the level of implementation:
   *
   * @return {String} see description
   */

  getImplementationValueNLS () {
    return getCommonMessage('implementationValue', this.getImplementationValue());
  }

  /**
   * @method getResultsSummary
   *
   * @desc Gets numerical summary information about the results
   *
   * @return {ElementResultSummary} see @desc
   */

  getResultsSummary () {
    return this.results_summary;
  }

  /**
   * @method getResultValue
   *
   * @desc Gets the rule result value based on element results
   *
   * @return {RULE_RESULT_VALUE} Returns a rule result value constant
   */

  getResultValue () {
    let resultValue = RULE_RESULT_VALUE.NOT_APPLICABLE;
    const summary = this.getResultsSummary();

    if (summary.violations > 0) resultValue = RULE_RESULT_VALUE.VIOLATION;
    else if (summary.warnings > 0) resultValue = RULE_RESULT_VALUE.WARNING;
    else if (summary.manual_checks > 0) resultValue = RULE_RESULT_VALUE.MANUAL_CHECK;
    else if (summary.passed > 0) resultValue = RULE_RESULT_VALUE.PASS;

    return resultValue;
  }

  /**
   * @method getResultValueNLS
   *
   * @desc Gets a short string representation of the rule result value:
   *
   * @return {String} Returns a string representing the rule result value
   */

  getResultValueNLS () {
    return getCommonMessage('ruleResult', this.getResultValue());
  }

  /**
   * @method getMessage
   *
   * @desc Generates a localized rule result message
   *
   * @param {String}  id      -  Id of the rule result message string
   *
   * @return {String} Strings with rule result message
   */

  getMessage (id) {
    let message;
    if ((id === 'ACTION_NONE') ||
        (id === 'NOT_APPLICABLE')) {
      message = getCommonMessage('ruleResultMessages', id);
    }

    if (!message) {
      message = this.rule.rule_result_msgs[id];
      if (typeof message !== 'string' || (message.length === 0)) {
        message = "Message is missing for rule id: " + this.rule.rule_id + " and mesage id: " + id;
      }

      const summary = this.results_summary;
      const failures = summary.violations + summary.warnings;
      const total    = summary.violations + summary.warnings + summary.passed;

      // Replace tokens with rule values
      message = replaceAll(message, "%N_F",  failures.toString());
      message = replaceAll(message, "%N_P",  summary.passed.toString());
      message = replaceAll(message, "%N_T",  (total + summary.manual_checks).toString());
      message = replaceAll(message, "%N_MC", summary.manual_checks.toString());
      message = replaceAll(message, "%N_H",  summary.hidden.toString());
      message = transformElementMarkup(message);
    }
    return message;
  }

  /**
   * @method getResultMessagesArray
   *
   * @desc Generates a localized rule result messages
   *
   * @return {Array} An array of strings with rule result messages
   *                 (typically only one string in the array)
   */

  getResultMessagesArray () {

    const summary = this.results_summary;

    let messages = [];
    let message = "";
    let prefix;

    const failures = summary.violations + summary.warnings;

    if (!failures && !summary.manual_checks) {
      if (summary.passed === 0) {
        messages.push(this.getMessage('NOT_APPLICABLE'));
      }
      else {
        messages.push(this.getMessage('ACTION_NONE'));
      }
    }
    else {
      if (failures > 0) {
        prefix =  this.isRuleRequired() ?
                  getCommonMessage('ruleResult', RESULT_VALUE.VIOLATION) :
                  getCommonMessage('ruleResult', RESULT_VALUE.WARNING);

        message = (failures === 1) ?
                  this.getMessage('FAIL_S') :
                  this.getMessage('FAIL_P');
        messages.push(prefix + ': ' + message);
      }

      if (summary.manual_checks > 0) {
        prefix = getCommonMessage('ruleResult', RESULT_VALUE.MANUAL_CHECK);
        message = (summary.manual_checks === 1) ?
                  this.getMessage('MANUAL_CHECK_S') :
                  this.getMessage('MANUAL_CHECK_P');
        messages.push(prefix + ': ' + message);
      }
    }

    if (summary.hidden > 0) {
        prefix = getCommonMessage('ruleResult', RESULT_VALUE.HIDDEN);
      message = (summary.hidden === 1) ?
                this.getMessage('HIDDEN_S') :
                this.getMessage('HIDDEN_P');
      messages.push(prefix + ': ' + message);
    }
    return messages;
  }

  /**
   * @method getResultMessage
   *
   * @desc Generates a localized rule result messages
   *
   * @return {String} Returns a single string with all result messages
   */

  getResultMessage   () {
    const messages = this.getResultMessagesArray();
    return messages.join('; ');
  }

  /**
   * @method getAllResultsArray
   *
   * @desc Returns an array of all results in severity order
   *
   * @return {Array} see @desc
   */

  getAllResultsArray   () {
    return this.results_violations.concat(
      this.results_warnings,
      this.results_manual_checks,
      this.results_passed,
      this.results_hidden);
  }

  /**
   * @method updateResults
   *
   * @desc Updates rule result information for a element or page result
   *
   * @param  {Integer}  test_result   - Number representing if a result value
   * @param  {Object}   result_item   - Reference to ElementResult or PageResult object
   * @param  {Object}   dom_item      - Reference to DOMcache or domElement objects
   */

  updateResults (result_value, result_item, dom_item) {
    switch (result_value) {
      case RESULT_VALUE.HIDDEN:
        this.results_hidden.push(result_item);
        dom_item.resultsHidden.push(result_item);
        this.results_summary.addHidden(1);
        break;

      case RESULT_VALUE.PASS:
        this.results_passed.push(result_item);
        dom_item.resultsPassed.push(result_item);
        this.results_summary.addPassed(1);
        break;

      case RESULT_VALUE.VIOLATION:
        this.results_violations.push(result_item);
        dom_item.resultsViolations.push(result_item);
        this.results_summary.addViolations(1);
        break;

      case RESULT_VALUE.WARNING:
        this.results_warnings.push(result_item);
        dom_item.resultsWarnings.push(result_item);
        this.results_summary.addWarnings(1);
        break;

      case RESULT_VALUE.MANUAL_CHECK:
        this.results_manual_checks.push(result_item);
        dom_item.resultsManualChecks.push(result_item);
        this.results_summary.addManualChecks(1);
        break;
    } // end switch
  }

  /**
   * @method addElementResult
   *
   * @desc Adds a element result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}  dom_item            - Reference to DOMcache item (e.g. domElement, domText objects)
   * @param  {String}  message_id          - Reference to the message string in the NLS file
   * @param  {Array}   message_arguements  - Array of values used in the message string
   */

  addElementResult (test_result, dom_item, message_id, message_arguments) {
    const dom_element = dom_item.isDomText ? dom_item.parentDomElement : dom_item;
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const element_result = new ElementResult(this, result_value, dom_element, message_id, message_arguments);

    this.updateResults(result_value, element_result, dom_element);
  }

  /**
   * @method addPageResult
   *
   * @desc Adds a page result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}   dom_cache           - Reference to DOMcache for saving page results
   * @param  {String}   message_id          - Reference to the message string in the NLS file
   * @param  {Array}    message_arguements  - Array of values used in the message string
   */

  addPageResult (test_result, dom_cache, message_id, message_arguments) {
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const page_result = new PageResult(this, result_value, dom_cache, message_id, message_arguments);

    this.updateResults(result_value, page_result, dom_cache);
  }

  /**
   * @method addWebsiteResult
   *
   * @desc Adds a website result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}   dom_cache           - Reference to DOMcache for saving page results
   * @param  {String}   message_id          - Reference to the message string in the NLS file
   * @param  {Array}    message_arguements  - Array of values used in the message string
   */

  addWebsiteResult (test_result, dom_cache, message_id, message_arguments) {
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const website_result = new WebsiteResult(this, result_value, dom_cache, message_id, message_arguments);

    this.updateResults(result_value, website_result, dom_cache);
  }

  /**
   * @method isRuleRequired
   *
   * @desc Tests whether the rule is a required or recommended rule in this ruleset
   *
   * @return {Boolean}  True if rule is a required rule, false if a recommended rule
   */

  isRuleRequired   () {
    return this.rule.rule_required;
  }

  /**
   * @method getRuleDefinition
   *
   * @desc Gets the definition of the rule
   *
   * @return {String} Localized string of the rule definition based on being
   *                  required or recommended
   */
  getRuleDefinition   () {
    return this.rule.getDefinition(this.isRuleRequired());
  }

  /**
   * @method getRuleSummary
   *
   * @desc Gets the summary of the rule
   *
   * @return {String} Localized string of the rule summary based on being
   *                  required or recommended
   */

  getRuleSummary   () {
    return this.rule.getSummary(this.isRuleRequired());
  }

  /**
   * @method getWCAG20Level
   *
   * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG 2.0 success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAG20Level   () {
    return this.rule.getWCAG20Level();
  }

  /**
   * @method getWCAG20LevelNLS
   *
   * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG 2.0 success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAG20LevelNLS   () {
    return this.rule.getWCAG20Level();
  }

  /**
   * @method getRuleScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Integer} rule scope constant
   */

  getRuleScope   () {
    return this.rule.getScope();
  }

  /**
   * @method getRuleScopeNLS
   *
   * @desc Get a localized string of the rule scope (i.e. 'element' or 'page')
   *
   * @return {String} Localized string of the rule scope
   */

  getRuleScopeNLS   () {
    return this.rule.getScopeNLS();
  }

  /**
   * @method getDataForJSON
   *
   * @desc Object containing the data for exporting a rule result to JSON
   *
   * @param {Boolean} flag    -  if true include element result details
   *
   * @return {Object} see @desc
   */

  getDataForJSON (flag=false) {

    const summary = this.results_summary;

    const data = {
      rule_id: this.rule.getId(),
      rule_summary: this.getRuleSummary(),

      success_criteria_nls:  this.rule.getPrimarySuccessCriterion().title,
      success_criteria_code: this.rule.getPrimarySuccessCriterion().id,

      guideline_nls:  this.rule.getGuidelineInfo().title,
      guideline_code: this.rule.getGuidelineInfo().id,

      rule_category_nls:  this.rule.getCategoryInfo().title,
      rule_category_code: this.rule.getCategoryInfo().id,

      rule_scope_code_nls: this.rule.getScopeNLS(),
      rule_scope_code:     this.rule.getScope(),

      ruleset_nls:  this.rule.getRulesetInfo(),
      ruleset_code: this.rule.getRuleset(),

      result_value_nls: this.getResultValueNLS(),
      result_value:     this.getResultValue(),
      result_message:   this.getResultMessage(),

      rule_required: this.isRuleRequired(),
      has_hidden:    this.hasHiddenElementResults(),

      implementation_score: this.getImplementationScore(),
      implementation_value: this.getImplementationValue(),
      implementation_nls:   this.getImplementationValueNLS(),

      results_passed:       summary.passed,
      results_violation:    summary.violations,
      results_warning:      summary.warnings,
      results_failure:     (summary.violations + summary.warnings),
      results_manual_check: summary.manual_checks,
      results_hidden:       summary.hidden,

      results: []
    };

    if (flag) {
      data.results = [];
      this.getAllResultsArray().forEach ( result => {
        data.results.push(result.getDataForJSON());
      });
    }
    return data; 
  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON representation of the rule result
   *
   * @param {Boolean} flag    -  if true include element result details
   *
   * @return  {String}  see @desc
   */

  toJSON (flag=false) {
    return JSON.stringify(this.getDataForJSON(flag), null, '  ');
  }

  /**
   * @method toString
   *
   * @desc Creates a text string representation of the rule result object
   *
   * @return {String} Returns a text string representation of the rule result object
   */

  toString () {
    return this.getRuleDefinition() + " (" + this.results_summary + ")";
  }

}

/* evaluationResult.js */

/* Constants */
const debug$1 = new DebugLogging('EvaluationResult', true);

class EvaluationResult {
  constructor (allRules, domCache, title, url) {
    this.title = title;
    this.url = url;
    this.date = getFormattedDate();
    this.version = VERSION;
    this.allRuleResults = [];

    debug$1.flag && debug$1.log(`[title]: ${this.title}`);

    allRules.forEach (rule => {
      const ruleResult = new RuleResult(rule);
      ruleResult.validate(domCache);
      this.allRuleResults.push(ruleResult);
    });
    debug$1.flag && debug$1.log(`[JSON]: ${this.toJSON(true)}`);
  }

  /**
   * @method getTitle
   *
   * @desc Get the title of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getTitle () {
    return this.title;
  }

  /**
   * @method getURL
   *
   * @desc Get the url of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getURL () {
    return this.url;
  }

  /**
   * @method getDate
   *
   * @desc Get the date the document
   *
   * @return {String}  String representing the title
   */

  getDate () {
    return this.date;
  }

  /**
   * @method getRuleResult
   *
   * @desc Gets rule result object with the associated id
   *
   * @param {String}  rule_id  - id of the rule associated with the rule result
   *
   * @return {RuleResult} Returns the ResultResult object
   */
  getRuleResult (rule_id) {
    return this.ruleResults.find( rr => rr.rule.rule_id === rule_id);
  }

  /**
   * @method getRuleResultsAll
   *
   * @desc Returns an object containing a set of all rule results
   *
   * @param  {Integer}  ruleset - Numerical constant that specifies the ruleset
   *                             By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsAll (ruleset=RULESET.ALL) {
    var rgr = new RuleGroupResult(this, getCommonMessage('allRuleResults'), "", "", ruleset);
    this.allRuleResults.forEach( rr => {
      rgr.addRuleResult(rr);
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByGuideline
   *
   * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
   *
   * @param {Integer}  guidelineId  - Number representing the guideline id
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByGuideline (guidelineId, ruleset=RULESET.ALL) {
    const glInfo = getGuidelineInfo(guidelineId);
    const rgr = new RuleGroupResult(this, glInfo.title, glInfo.url, glInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getGuideline() & guidelineId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByCategory
   *
   * @desc Returns an object containing the rule results for the rules in a rule category
   *
   * @param {Integer}  categoryId  -  Number of the rule category
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByCategory (categoryId, ruleset=RULESET.ALL) {
    var rcInfo = getRuleCategoryInfo(categoryId);
    var rgr = new RuleGroupResult(this, rcInfo.title, rcInfo.url, rcInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getRuleCategory() & categoryId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  /**
   * @method getDataForJSON
   *
   * @desc Creates a data object with rule, element and page results
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  getDataForJSON (flag=false) {

    const data = {
      eval_url: cleanForUTF8(this.url),
      eval_url_encoded: encodeURI(this.url),
      eval_title: cleanForUTF8(this.title),

      // For compatibility with previous versions of the library
      ruleset_id:     'ARIA_STRICT',
      ruleset_title:  'HTML and ARIA Techniques',
      ruleset_abbrev: 'HTML5+ARIA',
      ruleset_version: VERSION,

      rule_results: []
    };

//    json += this.dom_cache.element_information.toJSON(true, "  ");

    this.allRuleResults.forEach( rr => {
      data.rule_results.push(rr.getDataForJSON(flag));
    });
    return data;
  }

  /**
   * @method toJSON
   *
   * @desc Creates a string representing the evaluation results in a JSON format
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  toJSON (flag=false) {
    return JSON.stringify(this.getDataForJSON(flag), null, '  ');
  }
}

/* evaluate.js */

/* Constants */
const debug   = new DebugLogging('EvaluationLibrary', false);

class EvaluationLibrary {
  constructor () {
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   */

  evaluate (startingDoc, title='', url='') {
    let domCache = new DOMCache(startingDoc);
    let evaluationResult = new EvaluationResult(allRules, domCache, title, url);
    if (debug.flag) {
      debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON()}`);
    }
    return evaluationResult;
  }

}

export { EvaluationLibrary as default };
