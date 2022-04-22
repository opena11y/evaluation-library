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
*     debug.log     calls console.log with label prefix and message
*                   @param message {object} - console.log calls toString()
*                   @param spaceAbove [optional] {boolean}
*     debug.tag     outputs tagName and textContent of DOM element
*                   @param node {DOM node reference} - usually an HTMLElement
*                   @param spaceAbove [optional] {boolean}
*     debug.separator - outputs only debug.label and a series of hyphens
*                   @param spaceAbove [optional] {boolean}
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
      const count = domElement.children.length;
      if (accName.name.length) {
        this.log(`${prefix}[${domElement.tagName}][${domElement.role}]: ${accName.name} (src: ${accName.source}, children: ${count})`, 0);
      } else {
        this.log(`${prefix}[${domElement.tagName}][${domElement.role}] (children: ${count})`, 0);
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
        this.log(`${prefix}[text]: ${domText.getText}`, 0);
      } else {
        this.log(`${prefix}[text]: ${domText.getText.substring(0, maxDisplay)} ...`, 0);
      }
    }
  }

}

/* colorContrast.js */

/* Constants */
const debug$8 = new DebugLogging('colorContrast', false);
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

    if (debug$8.flag) {
      debug$8.separator();
      debug$8.tag(elementNode);
    }

    this.opacity            = this.normalizeOpacity(style, parentColorContrast);

    this.color              = style.getPropertyValue("color");
    this.colorHex           = this.RGBToHEX(this.color, this.opacity);
    this.backgroundColor    = this.normalizeBackgroundColor(style, parentColorContrast);
    this.backgroundColorHex = this.RGBToHEX(this.backgroundColor);

    this.backgroundImage    = this.normalizeBackgroundImage(style, parentColorContrast);
    this.backgroundRepeat   = style.getPropertyValue("background-repeat");
    this.backgroundPosition = style.getPropertyValue("background-position");

    this.fontFamily = style.getPropertyValue("font-family");
    this.fontSize   = this.normalizeFontSize(style, parentColorContrast);
    this.fontWeight = this.normalizeFontWeight(style, parentColorContrast);
    this.isLargeFont = this.getLargeFont(this.fontSize, this.fontWeight);

    const L1 = this.getLuminance(this.colorHex);
    const L2 = this.getLuminance(this.backgroundColorHex);
    this.colorContrastRatio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;

    if (debug$8.flag) {
      debug$8.log(`[                    opacity]: ${this.opacity}`);
      debug$8.log(`[Background Repeat/Pos/Image]: ${this.backgroundRepeat}/${this.backgroundPosition}/${this.backgroundImage}`);
      debug$8.log(`[ Family/Size/Weight/isLarge]: "${this.fontFamily}"/${this.fontSize}/${this.fontWeight}/${this.isLargeFont}`);
      debug$8.color(`[   CCR for Color/Background]: ${this.colorContrastRatio} for #${this.colorHex}/#${this.backgroundColorHex}`, this.color, this.backgroundColor);
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
const debug$7 = new DebugLogging('visibility', false);

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

    if (debug$7.flag) {
      debug$7.separator();
      debug$7.tag(elementNode);
      debug$7.log('[          isHidden]: ' + this.isHidden);
      debug$7.log('[      isAriaHidden]: ' + this.isAriaHidden);
      debug$7.log('[     isDisplayNone]: ' + this.isDisplayNone);
      debug$7.log('[isVisibilityHidden]: ' + this.isVisibilityHidden);
      debug$7.log('[ isVisibleOnScreen]: ' + this.isVisibleOnScreen);
      debug$7.log('[     isVisibleToAT]: ' + this.isVisibleToAT);
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

/* generated file, use npm run aria */
const ariaInfo = {
  title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2',
  status: 'W3C Candidate Recommendation Draft 08 December 2021',
  reference: 'https://www.w3.org/TR/wai-aria-1.2/',
  propertyDataTypes: {
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
  },
  designPatterns: {
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
  },
  rolesWithRequiredChildren: [
    'feed',
    'grid',
    'list',
    'listbox',
    'menu',
    'menubar',
    'radiogroup',
    'row',
    'rowgroup',
    'table',
    'tablist',
    'tree',
    'treegrid'
  ],
  rolesWithRequiredParent: [
    'caption',
    'cell',
    'columnheader',
    'gridcell',
    'listitem',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'option',
    'row',
    'rowgroup',
    'rowheader',
    'tab',
    'treeitem'
  ],
  rolesWithNameProhibited: [
    'caption',
    'code',
    'deletion',
    'emphasis',
    'generic',
    'insertion',
    'paragraph',
    'presentation',
    'strong',
    'subscript',
    'superscript',
    'none'
  ],
  rolesWithDeprecatedAttributes: [
    'alert',
    'alertdialog',
    'article',
    'banner',
    'blockquote',
    'button',
    'caption',
    'cell',
    'checkbox',
    'code',
    'command',
    'complementary',
    'composite',
    'contentinfo',
    'definition',
    'deletion',
    'dialog',
    'directory',
    'document',
    'emphasis',
    'feed',
    'figure',
    'form',
    'generic',
    'grid',
    'group',
    'heading',
    'img',
    'input',
    'insertion',
    'landmark',
    'link',
    'list',
    'listbox',
    'listitem',
    'log',
    'main',
    'marquee',
    'math',
    'meter',
    'menu',
    'menubar',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'navigation',
    'note',
    'option',
    'paragraph',
    'presentation',
    'progressbar',
    'radio',
    'radiogroup',
    'range',
    'region',
    'row',
    'rowgroup',
    'scrollbar',
    'search',
    'section',
    'sectionhead',
    'select',
    'separator',
    'spinbutton',
    'status',
    'strong',
    'structure',
    'subscript',
    'superscript',
    'switch',
    'tab',
    'table',
    'tablist',
    'tabpanel',
    'term',
    'time',
    'timer',
    'toolbar',
    'tooltip',
    'tree',
    'treegrid',
    'treeitem',
    'widget',
    'window'
  ],
  attributesThatMaybeDeprecated: [
    'aria-disabled',
    'aria-errormessage',
    'aria-haspopup',
    'aria-invalid',
    'aria-checked',
    'aria-selected'
  ]
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
const debug$6 = new DebugLogging('AriaValidation', false);

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
    let designPattern = ariaInfo.designPatterns[role];

    this.isValidRole          = typeof designPattern === 'object';

    // if role is not valid use default role for element for validation
    if (!this.isValidRole) {
      designPattern = ariaInfo.designPatterns[defaultRole];
    }

    this.nameRequired     = designPattern.nameRequired;
    this.nameProhibited   = designPattern.nameProbihited;

    const attrs = Array.from(node.attributes);

    this.validAttrs        = [];
    this.invalidAttrs      = [];

    attrs.forEach( attr =>  {
      if (attr.name.indexOf('aria') === 0) {
        if (typeof ariaInfo.propertyDataTypes[attr.name] === 'object') {
          this.validAttrs.push(attr);
        } else {
          this.invalidAttrs.push(attr);
        }
      }
    });

    this.invalidAttrValues  = this.checkForInalidAttributeValue(this.validAttrs);
    this.invalidRefs        = this.checkForInvalidReferences(doc, this.validAttrs);
    this.unsupportedAttrs   = this.checkForUnsupportedAttribute(this.validAttrs, designPattern);
    this.deprecatedAttrs    = this.checkForDeprecatedAttribute(this.validAttrs, designPattern);
    this.missingReqAttrs    = this.checkForMissingRequiredAttributes(this.validAttrs, designPattern, node);

    if (debug$6.flag) {
      node.attributes.length && debug$6.log(`${node.outerHTML}`, 1);
      debug$6.log(`[invalidAttrValues]: ${debugAttrs(this.invalidAttrValues)}`);
      debug$6.log(`[      invalidRefs]: ${debugRefs(this.invalidRefs)}`);
      debug$6.log(`[ unsupportedAttrs]: ${debugAttrs(this.unsupportedAttrs)}`);
      debug$6.log(`[  deprecatedAttrs]: ${debugAttrs(this.deprecatedAttrs)}`);
      debug$6.log(`[  missingReqAttrs]: ${debugAttrs(this.missingReqAttrs)}`);
      debug$6.log(`[     invalidAttrs]: ${debugAttrs(this.invalidAttrs)}`);
    }
  }

  // check if the value of the aria attribute
  // is allowed
  checkForInalidAttributeValue (attrs) {
    const booleanValues = ['true', 'false'];
    const tristateValues = ['true', 'false', 'mixed'];
    const attrsWithInvalidValues = [];

    attrs.forEach( attr => {
      const attrInfo  = ariaInfo.propertyDataTypes[attr.name];
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
      const attrInfo = ariaInfo.propertyDataTypes[attr.name];
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
      const attrInfo = ariaInfo.propertyDataTypes[name];
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
      const defaultValue = ariaInfo.propertyDataTypes[reqAttr].defaultValue;
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
const debug$5 = new DebugLogging('ariaInHtml', false);
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

      tagName += '[type=' + type + ']';

      if (node.hasAttribute('list')) {
        tagName += '[list]';
      }

      elemInfo = elementInfo[tagName];
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

  if (debug$5.flag) {
    if (tagName === 'h2') {
      debug$5.tag(node);
    }
    debug$5.log(`[elemInfo][id]: ${elemInfo.id} (${tagName})`);
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
      if (node.tagName.toLowerCase() === 'slot') {
        let assignedNodes = node.assignedNodes();
        // if no slotted elements, check for default slotted content
        assignedNodes = assignedNodes.length ? assignedNodes : node.assignedNodes({ flatten: true });
        assignedNodes = Array.from(assignedNodes);
        arr = [];
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
            arr = [];

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
const debug$4 = new DebugLogging('DOMElement', true);

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
  constructor (parentInfo, elementNode) {
    const parentDomElement = parentInfo.domElement;
    const doc              = parentInfo.document;

    this.ariaInHTMLInfo  = getAriaInHTMLInfo(elementNode);
    const defaultRole    = this.ariaInHTMLInfo.defaultRole;
    const role           = elementNode.getAttribute('role');

    this.parentInfo       = parentInfo; 
    this.node             = elementNode;
    this.tagName          = elementNode.tagName.toLowerCase();

    this.hasNativeCheckedState  = hasCheckedState(elementNode);
    this.hasNativeInvalidState  = hasInvalidState(elementNode);

    this.ariaInHTMLInfo   = getAriaInHTMLInfo(elementNode);
    this.role             = role ? role : defaultRole;
    this.ariaValidation   = new AriaValidation(doc, this.role, defaultRole, elementNode);

    this.accName           = getAccessibleName(doc, elementNode);
    this.accDescription    = getAccessibleDesc(doc, elementNode);
    this.errMessage        = getErrMessage(doc, elementNode);

    this.colorContrast    = new ColorContrast(parentDomElement, elementNode);
    this.visibility       = new Visibility(parentDomElement, elementNode);
    this.children = [];
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
   * @method getAriaInHTMLInfo
   *
   * @desc
   *
   * @param {Object}  node  -
   */

  getAriaInHTMLInfo (node) {
    let role = 'generic';
    return role;
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

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */
  showDomElementTree (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    if (debug$4.flag) {
      this.children.forEach( domItem => {
        if (domItem.isDomText) {
          debug$4.domText(domItem, prefix);
        } else {
          debug$4.domElement(domItem, prefix);
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
  constructor (parentInfo, textNode) {
    this.parentInfo = parentInfo;
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

/* structureInfo.js */

/* Constants */
const debug$3 = new DebugLogging('structureInfo', true);
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

    if (debug$3.flag) {
      debug$3.log('');
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
    debug$3.log(`${prefix}[Landmarks Count]: ${this.childLandmarkElements.length}`);
    this.childLandmarkElements.forEach( le => {
      debug$3.domElement(le.domElement, prefix);
      le.showLandmarkInfo(prefix + '  ');
    });
    debug$3.log(`${prefix}[Headings Count]: ${this.childHeadingDomElements.length}`);
    this.childHeadingDomElements.forEach( h => {
      debug$3.domElement(h, prefix);
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

    if (debug$3.flag) ;
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
    if (debug$3.flag) {
      debug$3.log('== All Headings ==', 1);
      this.allHeadingDomElements.forEach( h => {
        debug$3.domElement(h);
      });
      debug$3.log('== All Landmarks ==', 1);
      this.allLandmarkElements.forEach( le => {
        debug$3.domElement(le.domElement);
      });
      debug$3.log('== Structure Tree ==', 1);
      this.childLandmarkElements.forEach( le => {
        debug$3.domElement(le.domElement);
        le.showLandmarkInfo('  ');
      });
    }
  }
}

/* domCache.js */

/* Constants */
const debug$2 = new DebugLogging('domCache', true);


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
 * @class ParentInfo
 *
 * @desc Contains reference to ancestor objects in the DOMCache
 *
 * @param  {Object}  info - Parent ParentInfo object
 */


class ParentInfo {
  constructor (info) {
    this.document = null;
    this.domElement = null;
    this.landmarkElement = null;
    this.controlElement = null;

    if (info) {
      this.document = info.document;
      this.domElement = info.domElement;
      this.landmarkElement = info.landmarkElement;
      this.controlElement = info.controlElement;
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
    const parentInfo = new ParentInfo();
    parentInfo.document = startingDoc;

    this.structureInfo = new StructureInfo();
  	this.domCache = new DOMElement(parentInfo, startingElement);
    parentInfo.domElement = this.domCache;

    this.transverseDOM(parentInfo, startingElement);

    // Debug features
    this.showDomElementTree();
    this.structureInfo.showStructureInfo();
  }

  // Tests if a tag name can be skipped
  isSkipable(tagName) {
    return skipableElements.includes(tagName);
  }

  // Tests if a tag name is a custom element
  isCustom(tagName) {
    return tagName.indexOf('-') >= 0;
  }

  // Tests if a tag name is an iframe or frame
  isIFrame(tagName) {
    return tagName === 'iframe' || tagName === 'frame';
  }

  // Tests if a tag name is a slot
  isSlotted(tagName) {
    return tagName  === 'slot';
  }

  /**
   * @method transverseDOM
   *
   * @desc Used to collect accessibility information for all the element nd text
   *       nodes on a web page for use the the rules.  It pre-computes values
   *       that are used by the accessibility rules to test accessibility 
   *       requirements 
   *
   * @param {Object}  parentinfo  - Parent DomElement associated with the
   *                                      parent element node of the starting node  
   * @param {Object}  startingNode      - The dom element to start transversing the
   *                                      dom
   */

  transverseDOM(parentInfo, startingNode) {
    let domItem = null;
    let parentDomElement = parentInfo.domElement;

    for (let node = startingNode.firstChild; node !== null; node = node.nextSibling ) {

      switch (node.nodeType) {

        case Node.TEXT_NODE:
          domItem = new DOMText(parentInfo, node);
          // Check to see if text node has any renderable content
          if (domItem.hasContent) {
            // Merge text nodes in to a single DomText node if sibling text nodes
            if (parentDomElement) {
              // if last child node of parent is a DomText node merge text content
              if (parentDomElement.isLastChildDomText) {
                parentDomElement.addTextToLastChild(domItem.text);
              } else {
                parentDomElement.addChild(domItem);
              }
            }
          }
          break;

        case Node.ELEMENT_NODE:
          const tagName = node.tagName.toLowerCase();

          if (!this.isSkipable(tagName)) {
            // check for slotted content
            if (this.isSlotted(tagName)) {
              let assignedNodes = node.assignedNodes();
              // if no slotted elements, check for default slotted content
              assignedNodes = assignedNodes.length ? assignedNodes : node.assignedNodes({ flatten: true });
              assignedNodes = Array.from(assignedNodes);
              assignedNodes.forEach( assignedNode => {
                this.transverseDOM(parentInfo, assignedNode);
              });
            } else {
              domItem = new DOMElement(parentInfo, node);
              if (parentDomElement) {
                parentDomElement.addChild(domItem);
              }
              const newParentInfo = this.updateDOMElementInformation(parentInfo, domItem);

              // check for custom elements
              if (this.isCustom(tagName)) {
                if (node.shadowRoot) {
                  newParentInfo.document = node.shadowRoot;
                  this.transverseDOM(newParentInfo, node.shadowRoot);
                }
              } else {
                // Check for iframe or frame tag
                if (this.isIFrame(tagName)) {
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
    let newParentInfo = new ParentInfo(parentInfo);
    newParentInfo.domElement = domElement;

    newParentInfo.landmarkElement = this.structureInfo.update(landmarkElement, domElement);

    return newParentInfo;
  }

  /**
   * @method showDomElementTree
   *
   * @desc  Used for debugging the DOMElement tree
   */
  showDomElementTree () {
    if (debug$2.flag) {
      debug$2.separator(1);
      debug$2.log(' === DOMCache Tree ===');
      debug$2.domElement(this.domCache);
      this.domCache.showDomElementTree(' ');
    }
  }

}

/* evaluationResult.js */

/* Constants */
const debug$1 = new DebugLogging('EvaluationResult', false);

class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;
    if (debug$1.flag) {
      debug$1.log(`[title]: ${this.title}`);
    }
  }
}

/* evaluate.js */

/* Constants */
const debug = new DebugLogging('evaluationLibrary', false);


class EvaluationLibrary {
  constructor () {
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title        - Title of document being analyzed
   * @param  {String}  url          - url of document being analyzed
   */

  evaluate (startingDoc, title='', url='') {
    let domCache = new DOMCache(startingDoc);
    let evaluationResult = new EvaluationResult(domCache, title, url);
    if (debug.flag) {
      debug.log('EvaluationResult');
    }
    return evaluationResult;
  }

}

export { EvaluationLibrary as default };
