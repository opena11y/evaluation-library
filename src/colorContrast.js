/* colorContrast.js */

// Debug resources
const debug = true;
const moduleName = 'ColorContrast';

// Imports
import {debugMessage, debugTag, debugSeparator}  from './debug.js';

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

export default class ColorContrast {
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

    if (debug) {
      debugSeparator(moduleName);
      debugTag(elementNode, moduleName);
      debugMessage(`[      opacity]: ${this.opacity}`, moduleName);
      debugMessage(`[        color]: ${this.color}`, moduleName);
      debugMessage(`[     colorHex]: ${this.colorHex}`, moduleName);
      debugMessage(`[   background]: ${this.backgroundColor}`, moduleName);
      debugMessage(`[backgroundHex]: ${this.backgroundColorHex}`, moduleName);
      debugMessage(`\n[   fontFamily]: ${this.fontFamily}`, moduleName);
      debugMessage(`[     fontSize]: ${this.fontSize}`, moduleName);
      debugMessage(`[   fontWeight]: ${this.fontWeight}`, moduleName);
      debugMessage(`[  isLargeFont]: ${this.isLargeFont}`, moduleName);
      debugMessage(`\n[          ccr]: ${this.colorContrastRatio}`, moduleName);
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
          rgbParts.pop()
          rgbParts.forEach( rgbColor => {
            value = opacity * A * Math.round(parseFloat(rgbColor));
            hex.push(toHex(value));            
          });
          colorHex = hex.join('');
          break;

        default:
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
};


