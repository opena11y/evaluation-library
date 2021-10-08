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
/*                       Rule Scopes                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleScopes
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc Rule Category information with properties with localized NLS values
 *
 * @property  {Array}   nls - Associative array of rule category information
 */

OpenAjax.a11y.nls.RuleScopes = function() {

  this.nls = {};

};

/**
 * @method addNLS
 *
 * @memberOf OpenAjax.a11y.nls.RuleScopes
 *
 * @desc Adds a localized version of WCAG 2.0 requirements to the cache
 *
 * @param  {string}  locale  - Language code of WCAG 2.0
 * @param  {Object}  nls     - Localized WCAG 2.0 object
 */

OpenAjax.a11y.nls.RuleScopes.prototype.addNLS = function (locale, nls) {

  OpenAjax.a11y.logger.info("  LOADING RULE SCOPE INFORMATION FOR " + locale);

  this.nls[locale] = new OpenAjax.a11y.nls.RuleScopesNLS(locale, nls.abbreviation, nls.title, nls.url, nls.rule_scopes);

};

/**
 * @method getNLS
 *
 * @memberOf OpenAjax.a11y.nls.RuleScopes
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements
 *
 */

OpenAjax.a11y.nls.RuleScopes.prototype.getNLS = function() {

  return this.nls[OpenAjax.a11y.locale];

};


/* ---------------------------------------------------------------- */
/*                       RuleScopesNLS                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleScopesNLS
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAG 2.0 information with properties with localized NLS values
 *
 * @param  {String}  locale - Language code
 * @param  {String}  abbrev - Localized abbreviation of Rule Scope
 * @param  {String}  title  - Localized title of  Rule Scope
 * @param  {String}  url    - URL to the translation of  Rule Scope
 * @param  {Object}  rcs    - Array of objects defining the  Rule Scope
 *
 * @property  {String}  locale - Language code
 * @property  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @property  {String}  title  - Localized title of WCAG 2.0 guidelines
 * @property  {String}  url    - URL to the translation of WCAG 2.0
 *
 * @property  {Object}  rule_scopes -Array of object defining the rule Scope
 */

OpenAjax.a11y.nls.RuleScopesNLS = function(locale, abbrev, title, url, rule_scopes) {

  this.locale = locale;
  this.abbrev = abbrev;
  this.title  = title;
  this.url    = url;
  this.rule_scopes = [];

  for (var i = 0; i < rule_scopes.length; i++) {

    OpenAjax.a11y.logger.debug("   Rule Scope " + rule_scopes[i].title + " for " + locale);

    var rs_nls = new OpenAjax.a11y.nls.RuleScopeNLS(rule_scopes[i]);

    this.rule_scopes.push(rs_nls);

  }

};

/**
 * @method getRuleScope
 *
 * @memberOf OpenAjax.a11y.nls.RuleScopesNLS
 *
 * @desc Returns an object with a localized version of rule category information
 *
 * @param {String}  id  -  id for the rule category item to get NLS information
 *
 * @return {Object}  Rule Scope NLS object
 */

OpenAjax.a11y.nls.RuleScopesNLS.prototype.getRuleScope = function(id) {

  for (var i = 0; i < this.rule_scopes.length; i++) {

    var rs = this.rule_scopes[i];

    if (rs.id === id) return rs;

  } // end loop

  return null;
};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.RuleScopesNLS
 *
 * @desc Returns an nls JSON representation of rule scope information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.RuleScopesNLS.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "  ";

  var len = this.rule_scopes.length;

  var json = "";


  json += "{";

  for (var i = 0; i < len; i++) {

    json += this.rule_scopes[i].toJSON(next_prefix);

    if ((i+1) !== len)  json += ",";

  }


  json += prefix + "}";

  return json;
};

/* ---------------------------------------------------------------- */
/*                       RuleScopeNLS                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleScopeNLS
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc Rule Category information with properties with localized NLS values
 *
 * @param  {Object}  info          - Principle information
 *
 * @property  {Number}  id            - Rule scope id
 * @property  {String}  title         - Title of the rule scope item
 * @property  {String}  description   - Description of rule scope item
 * @property  {String}  url           - URL to more information on rule scope item
 *
 */

OpenAjax.a11y.nls.RuleScopeNLS = function(info) {

  this.id           = parseInt(info.id, 10);         // Number
  this.title        = info.title;
  this.description  = info.description;
  this.url          = info.url;

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls..RuleScopeNLS.
 *
 * @desc Returns an nls JSON representation of rule scope information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.RuleScopeNLS.prototype.toJSON = function(prefix) {

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

