/*
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
/*                            Properties NLS                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor Cache
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc Constructs a DOMCache Object
 *
 * @property {String}  nls       - NLS cache items for properties
 */

OpenAjax.a11y.nls.Cache = function() {

  var cache_nls = {};

  return {
    /**
     * @method addCacheNLSFromJSON()
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Constructs a DOMCache Object
     *
     * @param  {locale}  locale         - Language code
     * @param  {Object}  cache_nls_data - NLS cache items for properties
     */

    addCacheNLSFromJSON : function(locale, cache_nls_data) {
      cache_nls[locale] = cache_nls_data;
    },

    /**
     * @method getCacheNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the current cache nls object
     *
     * @param  {String}  loc  -  String representing the language
     */

    getCacheNLS : function(loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;
      cache_nls[locale];
    },

    /**
     * @method getElementResultValueNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Gets a label for the element result value
     *
     * @param  {Number}  result_value  -  The constant representing the element result value
     * @param  {String}  loc  -  String representing the language
     *
     * @return {String} see description
     */

    getElementResultValueNLS : function(result_value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;
      return cache_nls[locale].element_result_nls[result_value];
    },

    /**
     * @method getRuleResultValueNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Gets a label for the rule result value
     *
     * @param  {Number}  result_value  -  The constant representing the rule result value
     * @param  {String}  loc  -  String representing the language
     *
     * @return {String} see description
     */

    getRuleResultValueNLS : function(result_value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;
      return cache_nls[locale].rule_result_nls[result_value];
    },


    /**
     * @method getLabelAndValueNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the label, human readable value and description of a cache property
     *
     * @param  {String}           property  - The object property
     * @param  {String | Number}  value     - Current value of a property
     * @param  {String}            loc      -  String representing the language
     *
     * @return {Object} Returns object with three properties 'label', 'value' and 'description'
     */

    getLabelAndValueNLS : function (property, value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var info = {};  // return object

      info.label       = property;
      info.value       = value;
      info.description = "no description";

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        var cp = locale_nls.resource_properties[property];

        // if null return default
        if (!cp) return info;

        if (typeof cp.label === 'string')       info.label       = cp.label;
        if (typeof cp.description === 'string') info.description = cp.description;

        switch(typeof value) {

        case 'string':

          if (value !== "") info.value = value;
          else info.value = "no " + info.label + " defined";
          break;


        case 'object':

          if (value) info.value = value.toString();
          else info.value = "no " + info.label + " defined";
          break;

        case 'boolean':
          if (value)
            info.value = locale_nls.boolean_values.true_value;
          else
            info.value = locale_nls.boolean_values.false_value;
          break;

        case 'number':
          if (cp.values && cp.values[value])
            info.value = cp.values[value].toString();
          else
            info.value = String(value);

          break;

        default:
          break;
        }
      }

      return info;
    },

    /**
     * @method getLabelNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the label and description of a cache property
     *
     * @param  {String}  property  - The object property
     * @param  {String}  loc       -  String representing the language
     *
     * @return {Object} Returns object with two properties 'label' and 'description'
     */

    getLabelNLS : function (property, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var info = {};  // return object

      info.label       = property;
      info.description = "";

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        var cp = locale_nls.resource_properties[property];

        // if null return default
        if (!cp) return info;

        if (cp.label)       info.label       = cp.label;
        if (cp.description) info.description = cp.description;

      }

      return info;
    },

    /**
     * @method getValueNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the value of a cache property
     *
     * @param  {String}           property  - The object property
     * @param  {String | Number}  value     - Current value of a property
     * @param  {String}  loc                -  String representing the language
     *
     * @return {String} Returns string with the localized value of a property
     */

    getValueNLS : function (property, value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var str = "";  // return object

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        var cp = locale_nls.resource_properties[property];

        // if null return default
        if (!cp) return value;

        switch(typeof value) {

        case 'boolean':

          if (value)
            str = locale_nls.boolean_values.true_value;
          else
            str = locale_nls.boolean_values.false_value;
          break;

        case 'number':

//          OpenAjax.a11y.logger.debug("Number property: " + property);

          if (cp.values)
            str = cp.values[value].toString();
          else
            str = String(value);

          break;

        default:
          break;
        }
      }

      return str;
    },

    /**
     * @method getYesNoNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Get a localized "Yes" or "No" string
     *
     * @param {Boolean}  value  - A boolean value to get  string
     * @param {String}   loc    - String representing the language
     *
     * @return {String} Returns 'Yes" if true, otherwise 'No'
     */

    getYesNoNLS : function (value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var locale_nls = cache_nls[locale];

      if (typeof value !== 'boolean') return locale_nls.not_boolean_value;

      if (value) return locale_nls.yes_no_values.yes_value;

      return locale_nls.yes_no_values.no_value;
    },

    /**
     * @method getBooleanNLS
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Get a localized "Yes" or "No" string
     *
     * @param {Boolean}  value  - A boolean value to get  string
     * @param {String}   loc    - String representing the language
     *
     * @return {String} Returns 'Yes" if true, otherwise 'No'
     */

    getBooleanNLS : function (value, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var locale_nls = cache_nls[locale];

      if (typeof value !== 'boolean') return locale_nls.not_boolean_value;

      if (value) return locale_nls.boolean_values.true_value;

      return locale_nls.boolean_values.false_value;
    },


    /**
     * @method getNLSMissingLabelMessage
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the missing form control label message and style
     *
     * @param {String}   loc    - String representing the language
     *
     * @return {String} Returns an object with a 'label' and 'style' property
     */

    getNLSMissingLabelMessage : function (loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var label_style;  // return object

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        label_style = locale_nls.missing_label;

        // if null return default
        if (!label_style) return "";

      }
      return label_style;
    },

    /**
     * @method getNLSEmptyAltTextMessage
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns the empty alt text message message and style
     *
     * @param {String}   loc    - String representing the language
     *
     * @return {String} Returns an object with a 'label' and 'style' property
     */

    getNLSEmptyAltTextMessage : function (loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var label_style;  // return object

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        label_style = locale_nls.empty_alt_text;

        // if null return default
        if (!label_style) return "";

      }
      return label_style;
    },

    /**
     * @method getNLSMissingAltMessage
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns an NLS localized 'missing alt attribute' message
     *
     * @param {String}   loc    - String representing the language
     *
     * @return {String} Returns an object with a 'label' and 'style' property
     */

    getNLSMissingAltMessage : function (loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var label_style;  // return object

      var locale_nls = cache_nls[locale];

      if (locale_nls) {

        label_style = locale_nls.missing_alt;

        // if null return default
        if (!label_style) return "";
      }
      return label_style;
    },


    /**
     * @method addPropertyIfDefined
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Adds an item to a list of properties
     *
     * @param  {Array}   list      - List of properties
     * @param  {Object}  item      - Cache item
     * @param  {String}  property  - Property of cache
     * @param  {String}  loc       - String representing the language
     */

    addPropertyIfDefined : function (list, item, property, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      if ((typeof item[property] !== 'undefined')) {
        list.push(this.getLabelAndValueNLS(property, item[property], locale));
      } // endif

    },


    /**
     * @method addPropertyIfUnefined
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Adds an item to a list of properties if it is not defined
     * @param  {Array}   list      - List of properties
     * @param  {Object}  item      - Cache item
     * @param  {String}  property  - Property of cache
     * @param  {String}  loc       - String representing the language
     */

    addPropertyIfUndefined : function (list, item, property, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      //  OpenAjax.a11y.logger.debug("Undefined '" + item + "': " + item[property]);

      if ((typeof item[property] === 'undefined') ||
          (item[property] === null) ||
          (item[property] === "")) {
        list.push(this.getLabelAndValueNLS(property, 'undefined', locale));
      } // endif
    },

    /**
     * @method addInvalidAttribute
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Adds information about an invalid attribute to a list
     *
     * @param  {Array}   list      - List of properties
     * @param  {String}  attribute - Attribute of an element represented in the cache
     * @param  {String}  loc       - String representing the language
     */

    addInvalidAttribute : function (list, attribute, loc) {
      var locale = "en-us";
      if ((typeof loc === 'string') && loc.length) locale = loc;

      var locale_nls = cache_nls[locale];
      var o = {};

      o.label = locale_nls.invalid_attribute.label;
      o.value = attribute;
      o.style = locale_nls.invalid_attribute.style;

      list.push(o);
    },


    /**
     * @method toJSON
     *
     * @memberOf OpenAjax.a11y.nls.Cache
     *
     * @desc Returns an nls JSON representation of rule category and rule scope information
     *
     * @param {String} prefix  -  A prefix string typically spaces
     *
     * @return {String}  JSON formatted string
     */

    toJSON : function(prefix) {

      var locale_nls = cache_nls[OpenAjax.a11y.locale];

      var json = "";

      json += prefix + "\"rule_scope\": [";

      for (var i = 0; i < locale_nls.rule_scope.length; i++) {

        var rs = locale_nls.rule_scope[i];

        json += prefix + "  {\n";
        json += prefix + "    \"id\"          : \"" + rs['id']    + "\",\n";
        json += prefix + "    \"title\"       : \"" + rs['title'] + "\",\n";
        json += prefix + "    \"url\"         : \"" + rs['url']   + "\",\n";
        json += prefix + "    \"description\" : \"" + rs['desc']  + "\"\n";

        if ( (i + 1) === locale_nls.rule_scope.length) json += prefix + "  }\n";
        else json += prefix + "  },\n";

      }

      json += prefix + "]";

      return json;
    }
  };
}();
