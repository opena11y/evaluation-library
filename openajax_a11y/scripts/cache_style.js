/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @constructor DOMElementComputedStyle
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Create a dom element computed style object is used to add style properties to dom element cache objects
 *
 * @param  {DOMElement}  dom_element     - dom element node to add computed style information to
 * @param  {DOMElement}  parent_element  - parent dom element node for computing inherited properties
 *
 * @property  {String}  display      - Computed value of the CSS 'display' property
 * @property  {String}  visibility   - Computed value of the CSS 'visibility' property
 * @property  {Boolean} aria_hidden  - aria-hidden property
 *
 * @property  {Number}  is_visible_onscreen   - Constant representing the graphical visibility of the element (i.e is it visible to people with sight)
 * @property  {Number}  is_visible_to_at      - Constant representing the assistive technology visibility of the element (i.e is it visible to people using a screen reader)
 *
 * @property  {String}  color                 - Computed value of the CSS 'color' property
 * @property  {String}  color_hex             - Computed value of the CSS 'color' property in hexidecimal format
 * @property  {String}  opacity               - Computed value of the CSS 'opacity' property
 * @property  {String}  background_color      - Computed value of the CSS 'background-color' property
 * @property  {String}  background_color_hex  - Computed value of the CSS 'background-color' property in hexidecimal format
 * @property  {String}  background_image      - Computed value of the CSS 'background-image' property
 * @property  {String}  background_repeat     - Computed value of the CSS 'background-repeat' property
 * @property  {String}  background_position   - Computed value of the CSS 'background-position' property
 *
 * @property  {String}  font_family  - Computed value of the CSS 'font-family' property
 * @property  {String}  font_size    - Computed value of the CSS 'font-size' property
 * @property  {String}  font_weight  - Computed value of the CSS 'font-weight' property
 *
 * @property  {String}  position  - Computed value of the CSS 'position' property
 * @property  {String}  left      - Computed value of the CSS 'left' property
 * @property  {String}  top       - Computed value of the CSS 'top' property
 * @property  {String}  width     - Computed value of the width of the rendered element in pixels
 * @property  {String}  height    - Computed value of the height of the rendered element in pixels
 *
 * @property  {String}  pseudo_before   - Computed value content in the :before pseudo
 * @property  {String}  pseudo_after    - Computed value content in the :after pseudo
 */

OpenAjax.a11y.cache.DOMElementComputedStyle = function (dom_element, parent_element) {

  function normalizeBackgroundImage(value, parent_element) {

    var v = value;

    if ((value.toLowerCase() === 'inherit') ||
        (value.toLowerCase() === 'none') ||
        (value === '')) {

      if (parent_element) {
        v = parent_element.computed_style.background_image;
      }
      else {
        v = 'none';
      }
    }

    return v;

  } // end function

  function  normalizeFontSize(value, parent_element) {
    if (value.toLowerCase() == 'inherit') {
      if (parent_element) {
        return parent_element.computed_style.font_size;
      }
      else {
        return 12;
      }
    }
    else {
      return value;
    }
  } // end function

  function  normalizeFontWeight(value, parent_element) {
    if (isNaN(value) ) {
      switch (value.toLowerCase()) {
      case 'bold':
        return 700;

      case 'normal':
        return 400;

      case 'inherit':
        if (parent_element) {
          return parent_element.computed_style.font_weight;
        }
        else {
          return 400;
        }

      case 'bolder':
        return 700;

      default:
        return 400;
      }
    }
    else {
      return parseInt(value,10);
    }
  } // end function


  function  normalizePositionTop(value, parent_element) {
    if (value.toLowerCase() == 'inherit') {
      if (parent_element) {
        return parent_element.computed_style.top;
      }
      else {
        return 0;
      }
    }
    else {
      return parseInt(value,10);
    }
  } // end function

  function  normalizePositionLeft(value, parent_element) {
    if (value.toLowerCase() == 'inherit') {
      if (parent_element) {
        return parent_element.computed_style.left;
      }
      else {
        return 0;
      }
    }
    else {
      return parseInt(value,10);
    }
  } // end function

  this.display  = "";
  this.visibility = "";
  this.aria_hidden = false;

  this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.UNKNOWN;
  this.is_visible_to_at = OpenAjax.a11y.VISIBILITY.UNKNOWN;

  this.color   = "";

  this.background_color = "";
  this.background_image = "";
  this.background_repeat = "";
  this.background_position = "";

  this.outline_style = "";
  this.outline_color = "";
  this.outline_width = "";

  this.font_family = "";
  this.font_size  = "";
  this.font_weight = "";
  this.position  = "";
  this.left    = "";
  this.top     = "";
  this.heigth  = "";
  this.width   = "";
  this.area   = "";

  this.psuedo_focus = "";
  this.psuedo_before = "";
  this.psuedo_after  = "";

  // check to see if getComputedStyle is defined for the engine
  if (!window.getComputedStyle) return;

//  OpenAjax.a11y.logger.debug("Element: " + dom_element );

  try {
    var style = window.getComputedStyle(dom_element.node, null);

    this.display    = style.getPropertyValue("display");
    this.visibility = style.getPropertyValue("visibility");

    this.color               = style.getPropertyValue("color");
    this.opacity             = style.getPropertyValue("opacity");

    this.background_color    = style.getPropertyValue("background-color");
    this.background_image    = normalizeBackgroundImage(style.getPropertyValue("background-image"), parent_element);
    this.background_repeat   = style.getPropertyValue("background-repeat");
    this.background_position = style.getPropertyValue("background-position");

    this.outline_style    = style.getPropertyValue("outline-style");
    this.outline_color    = style.getPropertyValue("outline-color");
    this.outline_width    = style.getPropertyValue("outline-width");

    this.font_family = style.getPropertyValue("font-family");
    this.font_size   = normalizeFontSize(style.getPropertyValue("font-size"), parent_element);
    this.font_weight = normalizeFontWeight(style.getPropertyValue("font-weight"), parent_element);

    this.position = style.getPropertyValue("position");
  }
  catch (e) {
    return;
  }

  // :before and :after pseudo elements

  if (style) {
    var before = window.getComputedStyle(dom_element.node, "::before");
    this.pseudo_before = before.getPropertyValue("content");

    var after = window.getComputedStyle(dom_element.node, "::after");
    this.pseudo_after  = after.getPropertyValue("content");

/*
    var focus = window.getComputedStyle(dom_element.node, "::focus");
    this.focus = focus;

    var pv = focus.getPropertyValue("color");
    if (pv && pv.length) this.focus  += "color :" + pv + "; ";

    pv = focus.getPropertyValue("background-color");
    if (pv && pv.length) this.focus  += "background-color :" + pv + "; ";

    pv = focus.getPropertyValue("background-image");
    if (pv && pv.length) this.focus  += "background-image :" + pv + "; ";


    pv = focus.getPropertyValue("border-style");
    if (pv && pv.length) this.focus  += "border-style :" + pv + "; ";

    pv = focus.getPropertyValue("border-width");
    if (pv && pv.length) this.focus  += "border-width :" + pv + "; ";

    pv = focus.getPropertyValue("border-color");
    if (pv && pv.length) this.focus  += "border-color :" + pv + "; ";


    pv = focus.getPropertyValue("outline-style");
    if (pv && pv.length) this.focus  += "outline-style :" + pv + "; ";

    pv = focus.getPropertyValue("outline-width");
    if (pv && pv.length) this.focus  += "outline-width :" + pv + "; ";

    pv = focus.getPropertyValue("outline-color");
    if (pv && pv.length) this.focus  += "outline-color :" + pv + "; ";
*/

  }

  // test if getBoundingClientRect is supported

  if (dom_element.node.getBoundingClientRect) {
    var client_rect = dom_element.node.getBoundingClientRect();
    this.client_rect = client_rect;
    if (client_rect) {
      this.top     = client_rect.top;
      this.left    = client_rect.left;
      this.height  =  Math.round(client_rect.height);
      this.width   =  Math.round(client_rect.width);
      this.area    = Math.round(this.height * this.width);
    }
    else {
      this.top  = normalizePositionTop(style.getPropertyValue("top"), parent_element);
      this.left = normalizePositionLeft(style.getPropertyValue("left"), parent_element);
    }
  }
  else {
    this.top     = normalizePositionTop(style.getPropertyValue("top"), parent_element);
    this.left    = normalizePositionLeft(style.getPropertyValue("left"), parent_element);
  }

  if ((this.background_color.indexOf("0, 0, 0, 0") > 0) ||
      (this.background_color == 'transparent') ||
      (this.background_color == 'inherit')) {

    if (parent_element && parent_element.computed_style) {
      this.background_color   = parent_element.computed_style.background_color;
      this.background_color_hex = parent_element.computed_style.background_color_hex;
    }
    else {
      // This is an edge case test typcially for body elements and frames
      this.background_color = 'rgb(255,255,255)';
      this.background_color_hex = 'ffffff';
    }
  }
  else {
    this.background_color_hex = OpenAjax.a11y.util.RGBToHEX(this.background_color);
  }

  if (parent_element &&
      parent_element.computed_style ) {

    var parent_style = parent_element.computed_style;

    // We do have parent_element so use its information if needed
    if ((this.display === 'inherit') ||
        (parent_style.display == 'none'))  {
      this.display = 'none';
    }

    if ((this.visibility === 'inherit') ||
        (parent_style.visibility === 'hidden')) {
      this.visibility = parent_style.visibility;
    }

    if (this.color == 'inherit') {
      this.color = parent_style.color;
      this.color_hex = parent_style.color_hex;
    }
    else {
      this.color_hex = OpenAjax.a11y.util.RGBToHEX(style.getPropertyValue("color"));
    }

    if (this.font_family === 'inherit') {
      this.font_family = parent_style.font_family;
    }

    if (this.position === 'inherit') {
      this.position = parent_style.position;
    }
  }

  // Calcuate visibility of node content in graphical renderings and to assistive technologies

  if (this.visibility &&
      this.visibility.length &&
      this.display &&
      this.display.length ) {

    if ((this.visibility === 'hidden') ||
        (this.display === 'none')) {

      if (dom_element.tag_name !== 'area') {
        this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.HIDDEN;
        this.is_visible_to_at    = OpenAjax.a11y.VISIBILITY.HIDDEN;
      }
      else {
        this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.VISIBLE;
        this.is_visible_to_at    = OpenAjax.a11y.VISIBILITY.VISIBLE;
      }

    }
    else {
      if ((parseInt(this.top, 10) < 0) ||
          (parseInt(this.left, 10) < 0) ||
          (parseInt(this.height, 10) < 4) ||
          (parseInt(this.width, 10) < 4)) {
        this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.HIDDEN;
      }
      else {
        this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.VISIBLE;
      }

      if (((typeof dom_element.aria_hidden === 'string') &&
          (dom_element.aria_hidden === "true")) ||
          (parent_style && parent_style.aria_hidden)) {
        this.aria_hidden = true;
        this.is_visible_to_at = OpenAjax.a11y.VISIBILITY.HIDDEN;
      }
      else {
        this.is_visible_to_at = OpenAjax.a11y.VISIBILITY.VISIBLE;
      }
    }
  }

  this.is_large_font = (parseInt(this.font_size,10) >= 18) || ((parseInt(this.font_size,10) >= 14) && (parseInt(this.font_weight,10) >= 300));

};

/**
 * @method calculateColorContrast
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 *
 * @desc Calculates a color contrast raio (CCR) value for the element style object
 *
 * @return {Number}  Returns a number representing the color contrast ratio (CCR)
 */

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.calculateColorContrastRatio = function () {

 if( this.color_hex &&
   (this.color_hex.length == 6) &&
    this.background_color_hex &&
   (this.background_color_hex.length == 6)) {
  var L1 = this.getLuminance(this.color_hex);
  var L2 = this.getLuminance(this.background_color_hex);
  this.color_contrast_ratio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;
 }
 else {
  this.color_contrast_ratio = null;
 }

 return this.color_contrast_ratio;

};


/**
 * @method getLuminance
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 *
 * @desc Get the luminance value of a hex incoded color
 *
 * @param {String}  color  - Hex representation of a CSS color value
 *
 * @return {Number}  Returns a number representing the limnance value
 */

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.getLuminance = function (color) {

 // OpenAjax.a11y.logger.debug("  " + color );

 // Get decimal values
 var R8bit = parseInt(color.substring(0,2),16);
 var G8bit = parseInt(color.substring(2,4),16);
 var B8bit = parseInt(color.substring(4,6),16);

 // Get sRGB values
 var RsRGB = R8bit/255;
 var GsRGB = G8bit/255;
 var BsRGB = B8bit/255;
  // Calculate luminance
 var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow(((RsRGB + 0.055)/1.055), 2.4);
 var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow(((GsRGB + 0.055)/1.055), 2.4);
 var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow(((BsRGB + 0.055)/1.055), 2.4);

 return (0.2126 * R + 0.7152 * G + 0.0722 * B);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 *
 * @desc Creates a text string representation of the computed style object
 *
 * @return {String} Returns a text string representation of the computed style object
 */

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.toString = function (color) {
  return "Computed style " + this.color_hex + " " + this.background_color_hex + " " + this.color_contrast_ratio;
};
