/* colorContrast.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('colorContrast', false);
const defaultFontSize = 16; // In pixels (px)
const fontWeightBold = 300; 

  /**
   * @function getLuminance
   *
   * @desc Get the luminance value of a hex encoded color
   *
   * @param {String}  color    - Hex representation of a color value
   *
   * @return {Number}  Returns a number representing the limnance value
   */

  function getLuminance (color) {

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

export function computeCCR (hex1, hex2) {
    const L1 = getLuminance(hex1);
    const L2 = getLuminance(hex2);
    return Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;
}

/*
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
    let parentColorContrast = parentDomElement ? parentDomElement.colorContrast : false;
    let style = window.getComputedStyle(elementNode, null);

    if (debug.flag) {
      debug.separator();
      debug.tag(elementNode);
    }

    this.opacity            = this.normalizeOpacity(style, parentColorContrast);

    this.backgroundColor    = this.normalizeBackgroundColor(style, parentColorContrast);
    this.backgroundColorHex = this.rgbToHex(this.backgroundColor, parentColorContrast.backgroundColorHex);
    this.color              = style.getPropertyValue("color");
    this.colorHex           = this.rgbToHex(this.color, this.backgroundColorHex, this.opacity);

    this.backgroundImage    = this.normalizeBackgroundImage(style, parentColorContrast);
    this.backgroundRepeat   = style.getPropertyValue("background-repeat");
    this.backgroundPosition = style.getPropertyValue("background-position");
    this.hasBackgroundImage = this.backgroundImage !== 'none';

    this.fontFamily = style.getPropertyValue("font-family");
    this.fontSize   = this.normalizeFontSize(style, parentColorContrast);
    this.fontWeight = this.normalizeFontWeight(style, parentColorContrast);
    this.isLargeFont = this.getLargeFont(this.fontSize, this.fontWeight);

    this.colorContrastRatio = computeCCR(this.colorHex, this.backgroundColorHex);

    if (debug.flag) {
      debug.log(`[                    opacity]: ${this.opacity}`);
      debug.log(`[           Background Image]: ${this.backgroundImage} (${this.hasBackgroundImage})`);
      debug.log(`[ Family/Size/Weight/isLarge]: "${this.fontFamily}"/${this.fontSize}/${this.fontWeight}/${this.isLargeFont}`);
      debug.color(`[   CCR for Color/Background]: ${this.colorContrastRatio} for #${this.colorHex}/#${this.backgroundColorHex}`, this.color, this.backgroundColor);
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

      debug.flag && debug.log(`[normalizeBackgroundColor][parentColorContrast]: ${parentColorContrast}`);

      if (parentColorContrast) {
        debug.flag && debug.log(`[normalizeBackgroundColor][backgroundColor]: ${parentColorContrast.backgroundColor}`);
        backgroundColor   = parentColorContrast.backgroundColor;
      }
      else {
        // This is an edge case test typically for body elements and frames
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

  /*
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

  /*
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
  * @function rgbToHex
  *
  * @desc Converts an RGB color to Hex values
  *
  * @param {String} colorRGB       - RGB Color rgb(rr, gg, bb) or rgb(rr, gg, bb, aa)
  * @param {String} backgroundHex  - Background color as a hex value
  * @param {Number}  opacity       - A number between 0 and 1 representing CSS value
  *                                  default value is 1.0
  *
  * @return  {String}  - Hex version of the RGB color
  */

  rgbToHex ( colorRGB, backgroundHex, opacity=1.0 ) {

    function hexToString(d) {
      let hex = Number(d).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }

    if (!colorRGB) return "000000";

    colorRGB = colorRGB.replace('"', '');
    colorRGB = colorRGB.split(')')[0];
    colorRGB = colorRGB.split('(')[1];
    const parts = colorRGB.split(',');
    let r1 = parseFloat(parts[0]);
    let g1 = parseFloat(parts[1]);
    let b1 = parseFloat(parts[2]);
    const o1 = parts.length === 4 ? parseFloat(parts[3]) : 1.0;

    if (typeof backgroundHex !== 'string' || backgroundHex.length !== 6) {
      backgroundHex = 'FFFFFF';
    }

    const r2 = parseInt(backgroundHex.substring(0,2), 16);
    const g2 = parseInt(backgroundHex.substring(2,4), 16);
    const b2 = parseInt(backgroundHex.substring(4,6), 16);

    const min = 0.0001;

    if (o1 < min) {
      return backgroundHex;
    }
    else {
      if (o1 < 1.0) {
        r1 = Math.round(r1 * o1 + r2 * (1 - o1));
        g1 = Math.round(g1 * o1 + g2 * (1 - o1));
        b1 = Math.round(b1 * o1 + b2 * (1 - o1));
      }
    }

    if (typeof opacity === 'string') {
      opacity = parseFloat(opacity);
    }

    if ((opacity === Number.NaN) || (opacity < 0.0) || (opacity > 1.0)) {
      opacity = 1.0;
    }

    if (opacity < 1.0) {
      r1 = Math.round(r1 * opacity + r2 * (1 - opacity));
      g1 = Math.round(g1 * opacity + g2 * (1 - opacity));
      b1 = Math.round(b1 * opacity + b2 * (1 - opacity));
    }

    return hexToString(r1) + hexToString(g1) + hexToString(b1);
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


