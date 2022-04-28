/* rule.js   */

import {
  getGuidelineId
} from '../constants.js';

import {
  getCommonMessage,
  getGuidelineInfo,
  getInformationLinks,
  getManualChecks,
  getPurposes,
  getRuleCategoryInfo,
  getRuleId,
  getRuleDefinition,
  getRuleSummary,
  getTargetResourcesDesc,
  getTechniques,
  getScope
} from '../_locale/locale.js';

import {
  transformElementMarkup
} from '../utils.js';

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

export default class Rule {
  constructor (rule_item) {

    // Rule information that is NOT dependent locale
    this.rule_id             = rule_item.rule_id; // String
    this.rule_required       = rule_item.rule_required; // Boolean
    this.rule_scope_id       = rule_item.rule_scope; // Integer
    this.rule_category_id    = rule_item.rule_category; // Integer
    this.wcag_primary_id     = rule_item.wcag_primary_id; // String
    this.wcag_related_ids    = rule_item.wcag_related_ids; // Array of strings
    this.last_updated        = rule_item.last_updated; // String
    this.target_resources    = rule_item.target_resources; // array of strings
    this.primary_property    = rule_item.primary_property; // string
    this.validate            = rule_item.validate;  // function
    this.wcag_guideline_id   = getGuidelineId(rule_item.wcag_primary_id); // Integer

    // Rule information that is locale dependent
    this.rule_category_info  = getRuleCategoryInfo(this.rule_category); // Object with keys to strings
    this.guideline_info      = getGuidelineInfo(this.wcag_guideline_id); // Object with keys to strings
    this.rule_scope          = getScope(this.rule_scope_id) // String

    this.rule_nls_id           = getRuleId(this.rule_id); // String
    this.summary               = getRuleSummary(this.rule_id); // String
    this.definition            = getRuleDefinition(this.rule_id); // String
    this.target_resources_desc = getTargetResourcesDesc(this.rule_id); // String
    this.purposes              = getPurposes(this.rule_id);  // Array of strings
    this.techniques            = getTechniques(this.rule_id);  // Array of strings
    this.manual_checks         = getManualChecks(this.rule_id);  // Array of strings
    this.informational_links   = getInformationLinks(this.rule_id);  // Array of objects with keys to strings

    // Localized messsages for evaluation results
//    this.page_result_msgs = getPageResultMessages(this.rule_id); // Object with keys to strings
//    this.elem_result_msgs = getElementResultMessages(this.rule_id); // Object with keys to strings
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
   * @return  {Number} see description
   */

  getGuideline () {
   return this.wcag_guideline_id;
  };

  /**
   * @method getGuidelineInfo
   *
   * @desc Get information about the WCAG 2.0 Guideline associated with the rule
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
   * @return {Number}  see description
   */

  getCategory () {
    return this.rule_category_id;
  }

  /**
   * @method getCategoryInfo
   *
   * @desc Get a localized title, url and description of the rule category
   *
   * @return {RuleCategoryInfoItem}  Returns a InformationalLinkInfo object
   */

  getCategoryInfo () {
    return this.rule_category_info;
  }

  /**
   * @method getScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Number} rule scope constant
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
   * @param {Boolean}  required  - True if rule is required
   *
   * @return {String} Localized string of the rule definition based on being
   *                  required or recommended
   */
  getDefinition (required) {

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

     return transformElementMarkup(str);
   }

   return "Definition not found for rule: " + this.rule_id;

  }

  /**
   * @method getSummary
   *
   * @desc Gets the summary of the rule
   *
   * @param {Boolean}  required  - True if rule is required
   *
   * @return {String} Localized string of the rule summary based on being
   *                  required or recommended
   */
  getSummary (required) {
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
      return transformElementMarkup(str);
    }
    return "Summary not found for rule: " + this.rule_id;

  }

  /**
   * @method getPurpose
   *
   * @desc Gets an array strings representing the purpose, basically
   *       how does the rule help people with disabilities
   *
   * @return  {Array}  Returns an array of localized string describing the purpose
   */

  getPurpose () {
    var list = this.rule_nls['PURPOSE'];
    var new_list = [];
    if (list && list.length) {
      for (var i = 0; i < list.length; i++) {
        new_list.push(transformElementMarkup(list[i]));
      } // end for
      return new_list;
    }
    return [];
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
    var target = this.rule_nls['TARGET_RESOURCES_DESC'];
    if (target) return transformElementMarkup(target);
    return "** Target resource description not defined";
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
    if (this.target_resources) return this.target_resources;
    return [];
  }

  /**
   * @method getTargetResourcePrimaryProperty
   *
   * @desc Get the primary attribute or calculated property of element used to evaluate a rule
   *
   * @return  {String}  see description
   */
  getTargetResourcePrimaryProperty () {
    if (typeof this.primary_property === 'string') return this.primary_property;
    return "";
  };


  /**
   * @method getTargetResourceSecondaryProperties
   *
   * @desc Get the attributes and calculated properties of element used to evaluate a rule
   *
   * @return  {Array}  Returns an array of strings identifying the calculated properties
   *                   and/or attributes that the rule uses to evaluate the rule requirements
   */
  getTargetResourceSecondaryProperties () {
    if (this.resource_properties) return this.resource_properties;
    return [];
  }


  /**
   * @method getTechniques
   *
   * @desc Get the techniques to implement the requirements of the rule
   *
   * @return  {Array}  Array of InformationalLinkInfo objects
   */
  getTechniques () {
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
  }

  /**
   * @method getPrimarySuccessCriterion
   *
   * @desc Get id of the primary WCAG 2.0 Success Criteria for the rule
   *
   * @return  {Number}  see description
   */

  getPrimarySuccessCriterion () {
    return this.wcag_primary_id;
  }

  /**
   * @method getPrimarySuccessCriterionNLS
   *
   * @desc Get information about primary WCAG 2.0 Success Criteria for the rule
   *
   * @return  {SuccessCriterionInfo}  Object representing information about the SC
   */

  getPrimarySuccessCriterionNLS () {
    var info = new OpenAjax.a11y.info.SuccessCriterionInfo(this.wcag_primary_id);
    return info;
  }

  /**
   * @method getRelatedSuccessCriteria
   *
   * @desc Get information about the related WCAG 2.0 Success Criteria for the rule
   *
   * @return  {Array}  Array of SuccessCriterionInfo objects
   */

  getRelatedSuccessCriteria () {
    var list = [];
    var ids = this.wcag_related_ids;
    var ids_len = ids.length;
    for (var i = 0; i < ids_len; i++) {
      var id = ids[i];
      var ref = new OpenAjax.a11y.info.SuccessCriterionInfo(id);
      list.push(ref);
    }
    return list;
  }

  /**
   * @method getWCAGLevel
   *
   * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG 2.0 success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAGLevel () {
    return this.getPrimarySuccessCriterion().level_nls;
  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON representation of the rule
   *
   * @param  {String}   prefix    - String of leading spaces for formatting JSON output (Optional)
   * @param  {Boolean}  required  - Required is needed for adjusting definition and summary strings to ruleset
   *                                requirements
   *
   * @return  {String}  Returns a JSON representation of the rule
   */

  toJSON (prefix, required) {

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

  }
}
