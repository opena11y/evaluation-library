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
/*                             Rule                                 */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rule
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates and validates a rule used to evaluate an accessibility feature
 *       of a document
 *
 * @param {Object}    rule_item          - Object containing rule information
 * @param {Object}    rules_nls          - NLS information for rules
 * @param {String}    locale             - String representing the language
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property {Object}    cache_nls           - Cache messages NLS reference for the current language
 * @property {Object}    wcag20_nls          - WCAG 2.0 message NLS reference for the current language
 * @property {Object}    rules_nls           - Rule message NLS reference for the current language
 *
 * @property {String}    rule_id             - Unique id of the rule
 * @property {String}    rule_scope_id       - Defines the scope of the rule:
 *                                             page or element
 * @property {Number}    rule_category       - Rule category
 * @property {Number}    rule_group          - Group category
 * @property {String}    wcag_primary_id     - Id of the primary WCAG 2.0
 *                                             success criterion
 * @property {Array}     wcag_related_ids    - Array of ids of related WCAG 2.0
 *                                             success criteria
 * @property {String}    primary_property    - Primary property used in the evaluation
 *                                             of the rule
 * @property {Array}     resource_properties - What properties of a cache or dom
 *                                             element the rules uses in the evaluation
 * @property {Array}     target_objects      - The html objects the rule evaluates
 *                                             (NOTE: this is informative information)
 * @property {String}    language            - The lanaguage code or codes (space
 *                                             separated) if the rule is language
 *                                             specfic, default is empty string
 * @property {function}  validate            - Function for evaluting the rule
 *                                             requirements using the DOM cache
 *
 */

OpenAjax.a11y.Rule = function (rule_item, rules_nls, locale) {


  this.locale     = "en-us";
  this.rule_nls   = {};
  this.common_nls = {};
  this.guideline_info = {};
  this.rule_category_info = {};
  this.wcag_guideline_id = 0;

  if ((typeof locale === 'string') && locale.length) this.locale = locale;

  var indexes      = rule_item.wcag_primary_id.split('.');
  var gl_id = indexes[0] + "." + indexes[1];
  this.wcag_guideline_code = gl_id;


  if (rules_nls &&
      rules_nls[this.locale] &&
      rules_nls[this.locale].rules[rule_item.rule_id]) {

    this.common_nls  = rules_nls[this.locale];
    this.rule_nls    = rules_nls[this.locale].rules[rule_item.rule_id];
    this.wcag20_nls  = OpenAjax.a11y.nls.WCAG20.getNLS(this.locale);

    this.rule_category_info = OpenAjax.a11y.info.RuleCategoryInfo(rule_item.rule_category);
    this.guideline_info     = OpenAjax.a11y.info.GuidelineInfo(gl_id);

    switch(gl_id) {
    case '1.1':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_1_1;
      break;

    case '1.2':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_1_2;
      break;

    case '1.3':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_1_3;
      break;

    case '1.4':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_1_4;
      break;

    case '2.1':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_2_1;
      break;

    case '2.2':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_2_2;
      break;

    case '2.3':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_2_3;
      break;

    case '2.4':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_2_4;
      break;

    case '3.1':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_3_1;
      break;

    case '3.2':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_3_2;
      break;

    case '3.3':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_3_3;
      break;

    case '4.1':
      this.wcag_guideline_id = OpenAjax.a11y.WCAG20_GUIDELINE.G_4_1;
      break;

    default:
      this.wcag_guideline_id = 0;
      break;
    }
  }

  this.rule_id             = rule_item.rule_id;
  this.rule_scope_id       = rule_item.rule_scope;
  this.rule_category_id    = rule_item.rule_category;
  this.rule_group_id       = rule_item.rule_group;
  this.wcag_primary_id     = rule_item.wcag_primary_id;
  this.wcag_related_ids    = rule_item.wcag_related_ids;
  this.last_updated        = rule_item.last_updated;
  this.target_resources    = rule_item.target_resources;
  this.primary_property    = rule_item.primary_property;
  this.resource_properties = rule_item.resource_properties;
  this.language_dependency = rule_item.language_dependency;
  this.validate            = rule_item.validate;


};

/**
 * @method setLocale
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Set the NLS information for rule messages
 *
 */

OpenAjax.a11y.Rule.prototype.setLocale = function (rule_nls, locale) {

  if ((typeof locale === 'string') && locale.length) this.locale = locale;

  if (rule_nls &&
      rule_nls[this.locale] &&
      rule_nls[this.locale].rules[this.rule_id]) {

    this.common_nls = rule_nls[this.locale];
    this.rule_nls   = rule_nls[this.locale].rules[this.rule_id];
    this.wcag20_nls = OpenAjax.a11y.nls.WCAG20.getNLS(this.locale);
  }

};

/**
 * @method getId
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the programmatic id that uniquely identifies the rule
 *
 * @return {String} The rule id
 */

OpenAjax.a11y.Rule.prototype.getId = function () {

  return this.rule_id;

};


/**
 * @method getNLS
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns a NLS reference for the rule
 *
 * @return {Object} see description
 */

OpenAjax.a11y.Rule.prototype.getNLS = function () {

  return this.rule_nls;

};

/**
 * @method getCommonNLS
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns a NLS reference for common nls information
 *
 * @return {Object} see description
 */

OpenAjax.a11y.Rule.prototype.getCommonNLS = function () {

  return this.common_nls;

};


/**
 * @method getIdNLS
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get a localized human readable id for uniquely identifying the rule
 *
 * @return {String} Localized string of the rule id
 */

OpenAjax.a11y.Rule.prototype.getIdNLS = function () {

  return this.rule_nls['ID'];

};

/**
 * @method getGuideline
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get number of the associated guideline
 *
 * @return  {String}  see description
 */

OpenAjax.a11y.Rule.prototype.getGuideline = function () {

   return this.wcag_guideline_id;

};



/**
 * @method getGuidelineInfo
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get information about the WCAG 2.0 Guideline associated with the rule
 *
 * @return  {GuidelineInfo}  see description
 */

OpenAjax.a11y.Rule.prototype.getGuidelineInfo = function () {

   return this.guideline_info;

};

/**
 * @method getCategory
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get a numerical constant representing the rule category
 *
 * @return {Number}  see description
 */

OpenAjax.a11y.Rule.prototype.getCategory = function () {

  return this.rule_category_id;

};

/**
 * @method getCategoryInfo
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get a localized title, url and description of the rule category
 *
 * @return {RuleCategoryInfoItem}  Returns a InformationalLinkInfo object
 */

OpenAjax.a11y.Rule.prototype.getCategoryInfo = function () {

  return this.rule_category_info;

};


/**
 * @method getGroup
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc  Get a numerical constant representing the rule group
 *
 * @return {Number}  see description
 */

OpenAjax.a11y.Rule.prototype.getGroup = function () {

  return this.rule_group_id;

};

/**
 * @method getGroupNLS
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc  Get a string representing the rule group
 *
 * @return {String}  see description
 */

OpenAjax.a11y.Rule.prototype.getGroupNLS = function () {

  var RULE_GROUP = OpenAjax.a11y.RULE_GROUP;

  switch (this.rule_group_id) {

  case RULE_GROUP.GROUP1:
    return "Group 1";

  case RULE_GROUP.GROUP2:
    return "Group 2";

  case RULE_GROUP.GROUP3:
    return "Group 3";

  default:
    break;

  }

  return "Undefined";

};

/**
 * @method getScope
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the rule scope constant of the rule
 *
 * @return {Number} rule scope constant
 */

OpenAjax.a11y.Rule.prototype.getScope = function () {

  return this.rule_scope_id;

};


/**
 * @method getScopeNLS
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get a localized string of the rule scope (i.e. 'element' or 'page')
 *
 * @return {String} Localized string of the rule scope
 */

OpenAjax.a11y.Rule.prototype.getScopeNLS = function () {

  if (this.rule_scope_id) return this.common_nls.rule_scope[this.rule_scope_id];

  return this.common_nls.rule_scope[OpenAjax.a11y.RULE_SCOPE.UNKNOWN];

};



/**
 * @method getDefinition
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Gets the definition of the rule
 *
 * @param {Boolean}  required  - True if rule is required
 *
 * @return {String} Localized string of the rule definition based on being
 *                  required or recommended
 */
OpenAjax.a11y.Rule.prototype.getDefinition = function (required) {


//  OpenAjax.a11y.logger.debug("  Rule ID: " + this.rule_id);


  var str = this.rule_nls['DEFINITION'];

  var message;

  var vstr;

  if (str) {

    vstr = "%s";

    if (str.indexOf(vstr) >= 0) {

     if (typeof required === 'boolean') {

      if (required) message = this.common_nls.message_severities.MUST;
      else message = this.common_nls.message_severities.SHOULD;

     }
     else {
       // If no rule type is defined assume "must"
        message = this.common_nls.message_severities.MUST + "/" + this.common_nls.message_severities.SHOULD;
     }

     str = str.replace(vstr, message);
   }

   return OpenAjax.a11y.util.transformElementMarkup(str);
 }

 return "Definition not found for rule: " + this.rule_id;

};

/**
 * @method getSummary
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Gets the summary of the rule
 *
 * @param {Boolean}  required  - True if rule is required
 *
 * @return {String} Localized string of the rule summary based on being
 *                  required or recommended
 */
OpenAjax.a11y.Rule.prototype.getSummary = function (required) {

  var str = this.rule_nls['SUMMARY'];

  var message;

  var vstr;

  if (str) {

    vstr = "%s";

    if (str.indexOf(vstr) >= 0) {

      if (typeof required === 'boolean') {

        if (required) message = this.common_nls.message_severities.MUST;
        else message = this.common_nls.message_severities.SHOULD;

      }
      else {
        // If no rule type is defined assume "must"
        message = this.common_nls.message_severities.MUST + "/" + this.common_nls.message_severities.SHOULD;
      }

      str = str.replace(vstr, message);

    }
    return OpenAjax.a11y.util.transformElementMarkup(str);
  }

  return "Summary not found for rule: " + this.rule_id;

};

/**
 * @method getPurpose
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Gets an array strings representing the purpose, basically
 *       how does the rule help people with disabilities
 *
 * @return  {Array}  Returns an array of localized string describing the purpose
 */
OpenAjax.a11y.Rule.prototype.getPurpose = function () {

  var list = this.rule_nls['PURPOSE'];

  var new_list = [];

  if (list && list.length) {

    for (var i = 0; i < list.length; i++) {

      new_list.push(OpenAjax.a11y.util.transformElementMarkup(list[i]));

    } // end for

    return new_list;
  }

  return [];

};

/**
 * @method getTargetResourcesDescription
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get a description of the markup or page feature the rule is evaluates
 *
 * @return  {String}  Localized string representing the markup or page feature
 *                    tested by the rule
 */
OpenAjax.a11y.Rule.prototype.getTargetResourcesDescription = function () {

  var target = this.rule_nls['TARGET_RESOURCES_DESC'];

  if (target) return OpenAjax.a11y.util.transformElementMarkup(target);

  return "** Target resource description not defined";

};

/**
 * @method getTargetResources
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing target resources of
 *       the rule
 *
 * @return  {Array}  Returns an array of strings identifying the elements and/or
 *                    attributes that the rule evaluates
 */
OpenAjax.a11y.Rule.prototype.getTargetResources = function () {

  if (this.target_resources) return this.target_resources;

  return [];

};

/**
 * @method getTargetResourcePrimaryProperty
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the primary attribute or calculated property of element used to evaluate a rule
 *
 * @return  {String}  see description
 */
OpenAjax.a11y.Rule.prototype.getTargetResourcePrimaryProperty = function () {

  if (typeof this.primary_property === 'string') return this.primary_property;

  return "";

};


/**
 * @method getTargetResourceSecondaryProperties
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the attributes and calculated properties of element used to evaluate a rule
 *
 * @return  {Array}  Returns an array of strings identifying the calculated properties
 *                   and/or attributes that the rule uses to evaluate the rule requirements
 */
OpenAjax.a11y.Rule.prototype.getTargetResourceSecondaryProperties = function () {

  if (this.resource_properties) return this.resource_properties;

  return [];

};


/**
 * @method getTechniques
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the techniques to implement the requirements of the rule
 *
 * @return  {Array}  Array of InformationalLinkInfo objects
 */
OpenAjax.a11y.Rule.prototype.getTechniques = function () {

  var list = this.rule_nls['TECHNIQUES'];

  var new_list = [];

  if (list && list.length) {

    for (var i = 0; i < list.length; i++) {

      var item = list[i];

      var ref;

      if (typeof item === 'string') ref = new OpenAjax.a11y.info.InformationalLinkInfo(OpenAjax.a11y.REFERENCES.TECHNIQUE, item, "");
      else ref = new OpenAjax.a11y.info.InformationalLinkInfo(OpenAjax.a11y.REFERENCES.TECHNIQUE, item.title, item.url);

      new_list.push(ref);

    } // end for

    return new_list;
  }

  return [];

};

/**
 * @method getManualCheckProcedures
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Gets manual checking proceedures for evaluating the rule
 *       requirements
 *
 * @return  {Array}  Array of InformationalLinkInfo objects
 */

OpenAjax.a11y.Rule.prototype.getManualCheckProcedures = function () {

  var list = this.rule_nls['MANUAL_CHECKS'];

  var new_list = [];

  if (list && list.length) {

    for (var i = 0; i < list.length; i++) {

      var item = list[i];

      var ref;

      if (typeof item === 'string') ref = new OpenAjax.a11y.info.InformationalLinkInfo(OpenAjax.a11y.REFERENCES.MANUAL_CHECK, item, "");
      else ref = new OpenAjax.a11y.info.InformationalLinkInfo(OpenAjax.a11y.REFERENCES.MANUAL_CHECK, item.title, item.url);

      new_list.push(ref);

    } // end for

    return new_list;
  }

  return [];

};



/**
 * @method getInformationalLinks
 *
 * @memberOf OpenAjax.a11y.Rule
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

OpenAjax.a11y.Rule.prototype.getInformationalLinks = function () {

  var list = this.rule_nls['INFORMATIONAL_LINKS'];

  var new_list = [];

  if (list && list.length) {

    for (var i = 0; i < list.length; i++) {

      var link = list[i];

      var ref = new OpenAjax.a11y.info.InformationalLinkInfo(link.type, link.title, link.url);

      new_list.push(ref);

    } // end for

    return new_list;
  }

  return [];

};


/**
 * @method getPrimarySuccessCriterion
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get id of the primary WCAG 2.0 Success Criteria for the rule
 *
 * @return  {Number}  see description

OpenAjax.a11y.Rule.prototype.getPrimarySuccessCriterion = function () {

 return this.wcag_primary_id;

};
 */

/**
 * @method getPrimarySuccessCriterion
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get information about primary WCAG 2.0 Success Criteria for the rule
 *
 * @return  {SuccessCriterionInfo}  Object representing information about the SC
 */

OpenAjax.a11y.Rule.prototype.getPrimarySuccessCriterion = function () {

  var info = new OpenAjax.a11y.info.SuccessCriterionInfo(this.wcag_primary_id);

  return info;

};

/**
 * @method getRelatedSuccessCriteria
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get information about the related WCAG 2.0 Success Criteria for the rule
 *
 * @return  {Array}  Array of SuccessCriterionInfo objects
 */

OpenAjax.a11y.Rule.prototype.getRelatedSuccessCriteria = function () {

  var list = [];

  var ids = this.wcag_related_ids;
  var ids_len = ids.length;

  for (var i = 0; i < ids_len; i++) {

    var id = ids[i];

    var ref = new OpenAjax.a11y.info.SuccessCriterionInfo(id);

    list.push(ref);
  }

  return list;
};

/**
 * @method getWCAG20Level
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
 *       based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level
 *                    (i.e. A, AA or AAA)
 */

OpenAjax.a11y.Rule.prototype.getWCAG20Level = function () {

  return this.getPrimarySuccessCriterion().level_nls;

};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns a JSON representation of the rule
 *
 * @param  {String}   prefix    - String of leading spaces for formatting JSON output (Optional)
 * @param  {Boolean}  required  - Required is needed for adjusting definition and summary strings to ruleset
 *                                requirements
 *
 * @return  {String}  Returns a JSON representation of the rule
 */

OpenAjax.a11y.Rule.prototype.toJSON = function (prefix, required) {

  function stringItem(property, value, last) {
    if (typeof value === 'string') json += prefix + "    \"" + property + "\" : " + JSON.stringify(value);
    else json += prefix + "    \"" + property + "\" : \"\"";

    if (last) json += "\n";
    else json += ",\n";
  }

  function numberItem(property, value, last) {
    json += prefix + "    \"" + property + "\" : " + value;

    if (last) json += "\n";
    else json += ",\n";
  }

  function stringListItem(property, list, last) {
    json += prefix + "    \"" + property + "\" : [";

    if (list && list.length) {
      var last_item = list.length - 1;
      for (var i = 0; i < list.length; i++) {
        if (last_item === i) json += JSON.stringify(list[i]);
        else json += JSON.stringify(list[i]) + ",";
      }
    }

    if (last) json += "]\n";
    else json += "],\n";
  }

  function addListOfStrings(name, list, last) {

    json += prefix + "    \"" + name + "\" : [\n";

    if (list && list.length) {
      var last_item = list.length - 1;
      for (var i = 0; i < list.length; i++) {
        if (last_item === i) json += "          " + JSON.stringify(list[i]) + "\n";
        else json += "          " + JSON.stringify(list[i]) + ",\n";
      }
    }

    if (last) json += prefix + "    ]\n";
    else json += prefix + "    ],\n";

  }



  function addInformationalLinks(last) {

    function addReferenceItem(reference, last) {

      json += prefix + "      { \"type\"  : "   + reference['type']  + ",\n";
      json += prefix + "        \"title\" : " + JSON.stringify(reference['title']) + ",\n";
      json += prefix + "        \"url\"   : " + JSON.stringify(reference['url'])   + "\n";

      if (last) json += prefix + "      }\n";
      else json += prefix + "      },\n";

    }

    json += prefix + "    \"informational_links\" : [\n";

    var info_links = rule_nls['INFORMATIONAL_LINKS'];

    if (info_links && info_links.length) {
      var last_item = info_links.length - 1;
      for (var i = 0; i < info_links.length; i++) {
        if (last_item === i) addReferenceItem(info_links[i], true);
        else addReferenceItem(info_links[i], false);
      }
    }

    if (last) json += prefix + "    ]\n";
    else json += prefix + "    ],\n";

  }

  function addMessages(name, list, last) {

    json += prefix + "    \"" + name + "\" : {\n";

    if (list) {
      var first = true;
      for (var item in list) {
        if (first) json += "           " + JSON.stringify(item) + ": " + JSON.stringify(list[item]);
        else json += ",\n          " + JSON.stringify(item) + ": " + JSON.stringify(list[item]);
        first = false;
      }
    }

    if (last) json += "\n" + prefix + "    }\n";
    else json += "\n" + prefix + "    },\n";

  }




  if (typeof prefix !== 'string') prefix = "";

  var json = "";

  var rule_nls = this.rule_nls;

  OpenAjax.a11y.logger.debug("[RULE] Exporting rule: " + this.rule_id);

  json += prefix + "  {\n";

  stringItem(    'rule_id',             this.rule_id);
  numberItem(    'rule_scope',          this.getScope());
//  stringItem(    'rule_scope_nls',      this.getScopeNLS());
  numberItem(    'rule_category',       this.getCategory());
  stringItem(    'rule_category_nls',   this.getCategoryInfo().title);
  numberItem(    'rule_group',          this.getGroup());
  stringItem(    'rule_group_nls',      this.getGroupNLS());
  stringItem(    'wcag_primary',        this.wcag_primary_id);
  stringListItem('wcag_related',        this.wcag_related_ids);
  stringItem(    'last_updated',        this.last_updated);
  stringListItem('target_resources',    this.target_resources);
  stringItem(    'language_dependency', this.language_dependency);
  stringItem(    'primary_property',    this.primary_property);
  stringListItem('resource_properties', this.resource_properties);
  stringItem(    'validate',            this.validate.toString());

  stringItem('nls_rule_id', rule_nls['ID']);

  if (typeof required === 'boolean') {
    stringItem('definition', this.getRuleDefinition(required));
    stringItem('summary', this.getRuleSummary(required));
  }
  else {
    stringItem('definition', rule_nls['DEFINITION']);
    stringItem('summary', rule_nls['SUMMARY']);
  }

  stringItem('target_resource_desc', rule_nls['TARGET_RESOURCES_DESC']);

  addListOfStrings('purpose',       rule_nls['PURPOSE']);

  addListOfStrings('techniques',    rule_nls['TECHNIQUES']);

  addListOfStrings('manual_checks', rule_nls['MANUAL_CHECKS']);

  addInformationalLinks();

  addMessages('rule_result_messages', rule_nls['RULE_RESULT_MESSAGES'], false);
  addMessages('node_result_messages', rule_nls['NODE_RESULT_MESSAGES'], true);

  json += prefix + "  }";

  return json;

};


/* ---------------------------------------------------------------- */
/*                             RuleManager                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleManager
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an array of rule objects for evaluating accessibility
 */

OpenAjax.a11y.RuleManager = function () {

   var rules      = [];
   var rules_nls  = {};
   var locale     = 'en-us';

   return {

     /**
      * @method addRule
      *
      * @memberOf OpenAjax.a11y.RuleManager
      *
      * @desc Adds a new rule to the list of rules
      *
      * @param  {Object}    rule_item          - Object containing rule information
      *
      * @return  {Boolean} Returns true if the rule was added successfully; false if there was an error
      */

      addRule : function (rule_item) {

        var errors = false;

        if (typeof rule_item.rule_id !== 'string') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule ID is missing");
          errors = true;
        }

        if (this.getRuleByRuleId(rule_item.rule_id)) {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Duplicate Rule ID: " + rule_item.rule_id);
          errors = true;
        }

        if (typeof rule_item.wcag_primary_id !== 'string') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " primary wcag id is missing");
          errors = true;
        }

        if (!rule_item.wcag_related_ids) {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " related wcag ids is missing");
          errors = true;
        }

        if (typeof rule_item.rule_scope !== 'number') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " rule scope is missing or not a number");
          errors = true;
        }

        if (typeof rule_item.rule_category !== 'number') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " rule category is missing or not a number");
          errors = true;
        }

        if (typeof rule_item.rule_category !== 'number') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " rule category is missing or not a number");
          errors = true;
        }

        if (typeof rule_item.rule_group !== 'number') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " rule group is missing or not a number");
          errors = true;
        }

        if (typeof rule_item.primary_property !== 'string') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " primary property is missing or not a string");
          errors = true;
        }

        if (!rule_item.resource_properties) {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " resource properties is missing or not an array");
          errors = true;
        }

        if (typeof rule_item.language_dependency !== 'string') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " language property is missing or not a string");
          errors = true;
        }

        if (typeof rule_item.validate !== 'function') {
          OpenAjax.a11y.logger.error("[RuleManager]  ** Rule " + rule_item.rule_id + " validate property is missing or not a function");
          errors = true;
        }

        if (errors) return false;

        var rule = new OpenAjax.a11y.Rule(rule_item, rules_nls, locale);

        rules.push(rule);

        return true;

      },

      /**
       * @method addRulesFromJSON
       *
       * @memberOf OpenAjax.a11y.RuleManager
       *
       * @desc Adds a rules from a list of rules in JSON format
       *
       * @param {Object}    rule_array  - An array of objects representing OAA rules
       *
       * @return  {Boolean} Returns true if the rules were added successfully; false if there was an error
       */

       addRulesFromJSON : function (rule_array) {

        var rule_item;

        OpenAjax.a11y.logger.info("[RuleManager] Loading Rules");

        for (var i = 0; i < rule_array.length; i++) {

          rule_item = rule_array[i];

      //    OpenAjax.a11y.logger.debug("[RuleManager] Rule: " + rule_item.rule_id);
      //    OpenAjax.a11y.logger.debug("  last update: " + rule_item.last_updated);
      //    OpenAjax.a11y.logger.debug("   properties: " + typeof rule_item.resource_properties);
      //    OpenAjax.a11y.logger.debug("     language: " + rule_item.language_dependency);
      //    OpenAjax.a11y.logger.debug("     validate: " + typeof rule_item.validate);

          this.addRule(rule_item);

        }

      },

      /**
       * @method addRulesNLSFromJSON
       *
       * @memberOf OpenAjax.a11y.RuleManager
       *
       * @desc Adds a rule NLS information for a specific lanaguage
       *
       * @param {String}  loc             - Language of NLS rule information (i.e. 'en-us')
       * @param {Object}  rules_nls_info  - Object containing rule NLS information
       */

      addRulesNLSFromJSON : function (loc, rules_nls_info) {

        rules_nls[loc] = rules_nls[loc] || {};

      //  this.rules_nls[locale] = rules_nls;

//        OpenAjax.a11y.logger.debug("[RuleManager] LOADING RULE NLS INFORMATION");

        for (var item in rules_nls_info) {

          switch (item) {

          case 'rule_scope':
          case 'message_severities':
          case 'rule_categories':
          case 'ACTION_NONE':
          case 'NOT_APPLICABLE':

            rules_nls[loc][item] = rules_nls_info[item];
//            OpenAjax.a11y.logger.debug("[RuleManager]  Add " + item + ": " + rules_nls_info[item]);

            break;

          case 'rules':

            rules_nls[loc][item] = rules_nls[loc][item] || {};

            for (var rule_id in rules_nls_info[item]) {
//              OpenAjax.a11y.logger.debug("[RuleManager] Rule NLS " + rule_id);
              rules_nls[loc][item][rule_id] = rules_nls_info[item][rule_id];
            }

            break;

          default:
            break;

          }
        }
      },

      /**
       * @method setLocale
       *
       * @memberOf OpenAjax.a11y.RuleManager
       *
       * @desc Set the language to return strings
       *
       * @param  {String}  loc   - String identifying the language
       */

      setLocale : function (loc) {

        if ((typeof loc === 'string') && (loc.length)) {
          locale = loc;
          for (var i = 0; i < rules.length; i++) rules[i].setLocale(rules_nls, locale);
        }
        else {
          throw new Error("[RuleManager] ** Invalid locale");
        }

      },

      /**
       * @method getRuleByRuleId
       *
       * @memberOf OpenAjax.a11y.RuleManager
       *
       * @desc Returned rule object with the id
       *
       * @param  {String}  rule_id   - id of the rule to find
       *
       * @return  {Rule} Returns rule object if the rule id is found; null if the rule id is not found
       */

      getRuleByRuleId : function (rule_id) {

        var rule;
        var rule_len = rules.length;

        for (var i = 0; i < rule_len; i++ ) {
          rule = rules[i];
          if (rule.getId() === rule_id) return rule;
        }

        return null;
      },

      /**
       * @method toJSON
       *
       * @memberOf OpenAjax.a11y.Rules
       *
       * @desc Exports current rule information to a JSON format
       *
       * @return {String}  JSON formatted string
       */

      toJSON : function (prefix) {

        if (typeof prefix !== 'string') prefix = "";

        var json = "";

        OpenAjax.a11y.logger.debug("[RuleManager] Number of rules: " + rules.length);

        json += prefix + "[\n";

        var last = rules.length - 1;
        for (var i = 0; i < rules.length; i++ ) {

          var rule = rules[i];

          if (i === last) json += rule.toJSON(prefix)  + "\n";
          else json += rule.toJSON(prefix) + ",\n";

        }

        json += prefix + "]";

        return json;
      }
   };
}();


