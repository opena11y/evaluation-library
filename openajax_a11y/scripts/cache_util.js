/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';


/* ---------------------------------------------------------------- */
/*        Utilities and String Extensions                           */
/* ---------------------------------------------------------------- */

/**
 * @namespace OpenAjax.a11y.util
 */

OpenAjax.a11y =  OpenAjax.a11y || {};
OpenAjax.a11y.util =  OpenAjax.a11y.util || {};

/**
 * @function cleanForUTF8
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Returns an string with only UTF8 characters
 *
 * @param  {String}  str - string to test
 *
 * @return {String}  String with only UTF 8
 */

OpenAjax.a11y.util.cleanForUTF8 = function(str) {

  var nstr = "";
  var str_len = str.length;

  for (var i = 0; i < str_len; i++) {
    var c = str[i];
    if (c >= ' ' && c < '~') nstr += c;
  }

  return nstr;
};


/**
 * @function getFormattedDate
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Returns a fomratted string (YYYY-MM-DD) represeting the current date
 *       with leading zeros
 *
 * @return {String}  Formatted date string
 */

OpenAjax.a11y.util.getFormattedDate = function() {

  function leadingZero(n) {
    var n1 = n.toString();
    if (n < 10) n1 = "0" + n;
    return n1;
  }

  var date = new Date();

  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var hours = date.getHours() + 1;
  var minutes = date.getMinutes() + 1;

  return y + "-" + leadingZero(m) + "-" + leadingZero(d) + ":" + leadingZero(hours)+ ":" + leadingZero(minutes);

};


/**
 * @function getStringUsingURL
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Reads a URL into a string
 *       Used with creating HTML reports
 *
 * @param  {String}  url     - url to file
 */

OpenAjax.a11y.util.initStringUsingURL = function(url) {

  var xmlhttp = new XMLHttpRequest();

//  OpenAjax.a11y.logger.debug( "REQUESTING URL: " + url);

  xmlhttp.open("GET", url, false);
  xmlhttp.send(null);

  var str = xmlhttp.responseText;

//  OpenAjax.a11y.logger.debug( "TEXT: " + str);

  return str;

};



/**
 * @function validLanguageCode
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Identifies if a language code is valid
 *
 * @param  {String}  language code -  INAN language code
 *
 * @return {Boolean}  If a valid language code return true, otherwsie false
 */

OpenAjax.a11y.util.validLanguageCode = function(code) {

  var LANGUAGE_CODES = OpenAjax.a11y.LANGUAGE_CODES;

  code = code.toLowerCase();

  if ((typeof code === 'string') || code.length) {

    var parts = code.split("-");

    if (parts.length > 1) {
      for (var i = 0; i <parts.length; i++) {
        if (LANGUAGE_CODES.subtags.indexOf(parts[i]) < 0) return false;
      }
      return true;
    }
    else {
      if (LANGUAGE_CODES.subtags.indexOf(code) >= 0) return true;
      if (LANGUAGE_CODES.tags.indexOf(code) >= 0) return true;
    }
  }

  return false;

};


/**
 * @function transformElementMarkup
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Converts element markup in strings to capitalized text (default) or adds <code> element
 *
 * @param {String}  str  - String to convert element text
 *
 * @return  String
 */

OpenAjax.a11y.util.transformElementMarkup = function(str) {

  var new_str = "";

  var transform_option = 1; // default is capitalize

  if (OpenAjax.a11y.ELEMENT_FORMATING == "HTML") transform_option = 2; // transform to html
  if (OpenAjax.a11y.ELEMENT_FORMATING == "NONE") transform_option = 3; // just removes @ sign from string

  if (str && str.length) {
    var max = str.length;
    var transform_flag = false;

    for (var i = 0; i < max; i++) {

      var c = str[i];

      if (c == '@') {

        if (transform_option == 2) {
          if (transform_flag)
            new_str += '</code>';
          else
            new_str += '<code>';
        }

        transform_flag = !transform_flag;
        continue;
      }

      if (transform_flag && transform_option == 1)
        new_str += c.toUpperCase();
      else
        new_str += c;
    }
  }
  return new_str;
};

/**
 * @function urlExists
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Determines if a URL exits
 *
 * @param {String} url      - url to test if it exists
 *
 * @return  Number
 */

OpenAjax.a11y.util.urlExists = function (url) {

 if (OpenAjax.a11y.SUPPORTS_URL_TESTING && OpenAjax.a11y.URL_TESTING_ENABLED) {
  try {

   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send(null);
   if (http.status!==404) {
//     OpenAjax.a11y.logger.debug( "URL: " + url + " (valid)");
     return OpenAjax.a11y.URL_RESULT.VALID;
   }
   else {
//     OpenAjax.a11y.logger.debug( "URL: " + url + " (INVALID)");
     return OpenAjax.a11y.URL_RESULT.INVALID;
   }
  }
  catch (e) {
   return OpenAjax.a11y.URL_RESULT.ERROR;
  }
 }
 else {
  return OpenAjax.a11y.URL_RESULT.NOT_TESTED;
 }

};

/**
 * @function RGBToHex
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Converts an RGB color to Hex values
 *
 * @param {String} rgb_color - RGB Color
 *
 * @return  String
 */

OpenAjax.a11y.util.RGBToHEX = function( rgb_color ) {

 function stringToHex(d) {
  var hex = Number(d).toString(16);
  if (hex.length == 1) {
   hex = "0" + hex;
  }
  return hex;
 }

 var i;
 var length;

 if (!rgb_color) return "000000";

 var hex = [];
 var color_hex = "000000";
 var components = rgb_color.match(/[\d.]+/g);

 if (components && components.length) {
  length = components.length;

  if (length == 3) {
   // RGB value
   for (i=0; i<3; i++) {
    hex.push(stringToHex(components[i]));
   } // end loop

   color_hex = hex[0] + hex[1] + hex[2];
   // OpenAjax.a11y.logger.debug( rgb_color + " " + color_hex );

  }
  else {

   if (length == 4) {
    // RGBA value
    for (i=0; i<3; i++) {
     hex[i] = stringToHex(Math.round(parseFloat(components[i])*parseFloat(components[3])));
    } // end loop
    color_hex = hex[0] + hex[1] + hex[2];
   }
  }
 }

 return color_hex;
};


/**
 * @function normalizeSpace
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Normalizes spaces in a string
 *
 * @param {String} s - string to be normalized
 *
 * @return  String
 */

OpenAjax.a11y.util.normalizeSpace = function (s) {
  // Replace repeated spaces, newlines and tabs with a single space

  if (typeof s !== 'string') return "";

// **** NOTE *****
// This function was changed to support fae-util based on HTMLUnit, which does not seem to
// handle character entities the same as a browser DOM
// This resulted in special characters being generated triggering false positives in some
/// rules, usually Landmark rules related to content being outside a landmark

//  if (s.replace) return s.replace(/^\s*|\s(?=\s)|\s*$/g, "");

  var len = s.length;
  var s1 = "";
  var last_c = 32;

  for (var i = 0; i < len; i++) {

    var c = s.charCodeAt(i);

    // only include printable characters less than '~' character
    if (c < 32 || c > 126) continue;

    if ((c !== 32) || (last_c !== 32)) {
      s1 += s[i];
      last_c = c;
    }

  }

  // trim off any trailing spaces
  while(s1.length && s1.slice(-1) === ' ') {
    s1 = s1.slice(0, -1);
  }

  return s1;

};

/**
 * @function replaceAll
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Normalizes spaces in a string
 *
 * @param {String}  s       - String to have replacements
 * @param {String}  str1    - String to replace
 * @param {String}  str2    - The replacement string
 *
 * @return  String
 */

OpenAjax.a11y.util.replaceAll = function(s, str1, str2) {

  var len = s.length;
  var pos = s.indexOf(str1);
  var s1  = "";

  while (pos >= 0) {

    s1 += s.slice(0,pos);
    s1 += str2;
    s   = s.slice((pos+str1.length), len);

    pos = s.indexOf(str1);
    len = s.length;

  }

  s1 += s.slice(0, len);

  return s1;

};
