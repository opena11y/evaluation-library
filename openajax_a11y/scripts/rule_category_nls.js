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
/*                       Rule Categories                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleCategories
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc Rule Category information with properties with localized NLS values
 *
 * @property  {Array}   nls - Associative array of rule category information
 */

OpenAjax.a11y.nls.RuleCategories = function() {

  var rcs_nls = {};

  return {

    /**
     * @method addNLS
     *
     * @memberOf OpenAjax.a11y.nls.RuleCategories
     *
     * @desc Adds a localized version of Rule Category Information
     *
     * @param  {string}  loc       - Language code of WCAG 2.0
     * @param  {Object}  nls_info  - Localized WCAG 2.0 object
     */

    addNLS : function (loc, nls_info) {

      OpenAjax.a11y.logger.info("[RuleCategories] Adding NLS: " + loc);

      rcs_nls[loc] = new OpenAjax.a11y.nls.RuleCategoriesNLS(loc, nls_info.abbreviation, nls_info.title, nls_info.url, nls_info.rule_categories);


    },

    /**
     * @method getNLS
     *
     * @memberOf OpenAjax.a11y.nls.RuleCategories
     *
     * @desc Returns an RuleCateogryInfo object for the requested rule category and language
     *
     * @param {Number}  rc   -  Constant representing the rule category
     * @param {String}  loc  -  String representing the language of the results
     */

    getNLS : function(loc) {

      var locale = "en-us";

      if ((typeof loc === 'string') && loc.length) locale = loc;

      return rcs_nls[locale];

    }
  };
}();


/* ---------------------------------------------------------------- */
/*                       RuleCategoryNLS                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleCategoriesNLS
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAG 2.0 information with properties with localized NLS values
 *
 * @param  {String}  locale - Language code
 * @param  {String}  abbrev - Localized abbreviation of Rule Categories
 * @param  {String}  title  - Localized title of  Rule Categories
 * @param  {String}  url    - URL to the translation of  Rule Categories
 * @param  {Object}  rcs    - Array of objects defining the  Rule Categories
 *
 * @property  {String}  locale - Language code
 * @property  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @property  {String}  title  - Localized title of WCAG 2.0 guidelines
 * @property  {String}  url    - URL to the translation of WCAG 2.0
 *
 * @property  {Object}  rule_categories -Array of object defining the rule categories
 */

OpenAjax.a11y.nls.RuleCategoriesNLS = function(locale, abbrev, title, url, rcs) {

  this.locale = locale;
  this.abbrev = abbrev;
  this.title  = title;
  this.url    = url;
  this.rule_categories = [];

  for (var i = 0; i < rcs.length; i++) {

//    OpenAjax.a11y.logger.debug("[RuleCategoriesNLS] Adding rule category " + rcs[i].title + " for " + locale);

    var rc_nls = new OpenAjax.a11y.nls.RuleCategoryNLS(rcs[i]);

    this.rule_categories.push(rc_nls);

  }

};

/**
 * @method getRuleCategory
 *
 * @memberOf OpenAjax.a11y.nls.RuleCategoriesNLS
 *
 * @desc Returns an object with a localized version of rule category information
 *
 * @param {String}  id  -  id for the rule category item to get NLS information
 *
 * @return {Object}  Rule Category NLS object
 */

OpenAjax.a11y.nls.RuleCategoriesNLS.prototype.getRuleCategory = function(id) {

  for (var i = 0; i < this.rule_categories.length; i++) {

    var rc = this.rule_categories[i];

    if (rc.id === id) return rc;

  } // end loop

  return null;
};



/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.RuleCategoriesNLS
 *
 * @desc Returns an nls JSON representation of wcag 2.0 information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.RuleCategoriesNLS.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "  ";

  var len = this.rule_categories.length;

  var json = "";

  json += "{";

  for (var i = 0; i < len; i++) {

    json += this.rule_categories[i].toJSON(next_prefix);

    if ((i+1) !== len) json += ",";
  }

  json += prefix + "}";

  return json;
};

/* ---------------------------------------------------------------- */
/*                       RuleCategoryNLS                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleCategoryNLS
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc Rule Category information with properties with localized NLS values
 *
 * @param  {Object}  info          - Rule category information
 *
 * @property  {Number}  id            - id of the rule category item
 * @property  {String}  title         - Title of the rule category item
 * @property  {String}  description   - Description of rule category item
 * @property  {String}  url           - URL to information on the rule category item
 */

OpenAjax.a11y.nls.RuleCategoryNLS = function(info) {

  this.id           = info.id;         // Number
  this.title        = info.title;
  this.description  = info.description;
  this.url          = info.url;

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.RuleCategoryNLS
 *
 * @desc Returns an nls JSON representation of rule category information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.RuleCategoryNLS.prototype.toJSON = function(prefix) {

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";

  var json = "";

  json += prefix + "\"" + this.id + "\" : {";

  json += prefix + "  \"id\"           : "   + this.id.toString() + ",";
  json += prefix + "  \"title\"        : " + JSON.stringify(this.title)       + ",";
  json += prefix + "  \"description\"  : " + JSON.stringify(this.description) + ",";
  json += prefix + "  \"url\"          : " + JSON.stringify(this.url)         + "";

  json += prefix + "}";

  return json;
};

