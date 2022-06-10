/* rule.js */

import {
  getGuidelineId
} from '../constants.js';

import {
  getCommonMessage,
  getBaseResultMessages,
  getGuidelineInfo,
  getInformationLinks,
  getManualChecks,
  getPurposes,
  getRuleCategoryInfo,
  getRuleId,
  getRuleDefinition,
  getRuleResultMessages,
  getRuleSummary,
  getRulesetInfo,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTargetResourcesDesc,
  getTechniques,
  getScope
} from '../_locale/locale.js';

import DebugLogging from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rule', false);

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

    // Rule information that is NOT dependent on locale
    this.rule_id             = rule_item.rule_id; // String
    this.rule_required       = rule_item.rule_required; // Boolean
    this.rule_scope_id       = rule_item.rule_scope; // Integer
    this.rule_category_id    = rule_item.rule_category; // Integer
    this.ruleset_id          = rule_item.ruleset; // Integer
    this.last_updated        = rule_item.last_updated; // String
    this.target_resources    = rule_item.target_resources; // array of strings
    this.wcag_primary_id     = rule_item.wcag_primary_id  // String (P.G.SC)
    this.wcag_related_ids    = rule_item.wcag_related_ids // Array of Strings (P.G.SC)
    this.wcag_guideline_id   = getGuidelineId(rule_item.wcag_primary_id); // Integer
    this.validate            = rule_item.validate;  // function

    // Rule information that is locale dependent
    this.rule_category_info  = getRuleCategoryInfo(this.rule_category_id); // Object with keys to strings
    this.guideline_info      = getGuidelineInfo(this.wcag_guideline_id); // Object with keys to strings
    this.ruleset_info        = getRulesetInfo(this.ruleset_id); // Object with keys to strings
    this.rule_scope          = getScope(this.rule_scope_id) // String
    this.wcag_primary        = getSuccessCriterionInfo(this.wcag_primary_id);
    this.wcag_related        = getSuccessCriteriaInfo(this.wcag_related_ids);
    this.wcag_level          = getCommonMessage('level', this.wcag_primary.level);

    this.rule_nls_id           = getRuleId(this.rule_id); // String
    this.summary               = getRuleSummary(this.rule_id); // String
    this.definition            = getRuleDefinition(this.rule_id); // String
    this.target_resources_desc = getTargetResourcesDesc(this.rule_id); // String
    this.purposes              = getPurposes(this.rule_id);  // Array of strings
    this.techniques            = getTechniques(this.rule_id);  // Array of strings
    this.manual_checks         = getManualChecks(this.rule_id);  // Array of strings
    this.informational_links   = getInformationLinks(this.rule_id);  // Array of objects with keys to strings

    // Localized messsages for evaluation results
    this.rule_result_msgs = getRuleResultMessages(this.rule_id); // Object with keys to strings
    this.base_result_msgs = getBaseResultMessages(this.rule_id); // Object with keys to strings

    debug.flag && this.toJSON();
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
   * @return  {Integer} see description
   */

  getGuideline () {
   return this.wcag_guideline_id;
  };

  /**
   * @method getGuidelineInfo
   *
   * @desc Get information about the WCAG Guideline associated with the rule
   *
   * @return  {GuidelineInfo}  see description
   */

  getGuidelineInfo () {
   return this.guideline_info;
  }

  /**
   * @method getCategoryInfo
   *
   * @desc Get a numerical constant representing the rule category
   *
   * @return {Integer}  see @desc
   */

  getCategory () {
    return this.rule_category_id;
  }

  /**
   * @method getCategoryInfo
   *
   * @desc Get a localized title, url and description of the rule category
   *
   * @return {RuleCategoryInfoItem}  see @desc
   */

  getCategoryInfo () {
    return this.rule_category_info;
  }

  /**
   * @method getRuleset
   *
   * @desc Get a numerical constant representing the ruleset
   *
   * @return {Integer}  see @desc
   */

  getRuleset () {
    return this.ruleset_id;
  }

  /**
   * @method getRulesetInfo
   *
   * @desc Get a localized title, url and description of the ruleset
   *
   * @return {Object}  see @desc
   */

  getRulesetInfo () {
    return this.ruleset_info;
  }

  /**
   * @method getScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Integer} rule scope constant
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
   * @return {String} Localized string of the rule definition
   */
  getDefinition () {
    return this.definition;
  }

  /**
   * @method getSummary
   *
   * @desc Gets the summary of the rule
   *
   * @return {String} Localized string of the rule summary
   */
  getSummary (required) {
    return this.summary;
  }

  /**
   * @method getPurposes
   *
   * @desc Gets an array strings representing the purpose, basically
   *       how does the rule help people with disabilities
   *
   * @return  {Array}  Returns an array of localized string describing the purpose
   */

  getPurposes () {
    return this.purposes;
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
    return this.target_resources_desc;
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
    return this.target_resources;
  }

  /**
   * @method getTechniques
   *
   * @desc Get the techniques to implement the requirements of the rule
   *
   * @return  {Array}  Array of InformationalLinkInfo objects
   */
  getTechniques () {
    return this.techniques;
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
    return this.manual_checks;
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
    return this.informational_links;
  }

  /**
   * @method getPrimarySuccessCriterionId
   *
   * @desc Get id of the primary WCAG Success Criteria for the rule
   *
   * @return  {Integer}  see description
   */

  getPrimarySuccessCriterionId () {
    return this.wcag_primary_id;
  }

  /**
   * @method getPrimarySuccessCriterionInfo
   *
   * @desc Get information about primary WCAG Success Criteria for the rule
   *
   * @return  {SuccessCriterionInfo}  Object representing information about the SC
   */

  getPrimarySuccessCriterionInfo () {
    return this.wcag_primary;
  }

  /**
   * @method getRelatedSuccessCriteriaInfo
   *
   * @desc Get information about the related WCAG Success Criteria for the rule
   *
   * @return  {Array}  Array of SuccessCriterionInfo objects
   */

  getRelatedSuccessCriteriaInfo () {
    return this.wcag_related;
  }

  /**
   * @method getWCAGLevel
   *
   * @desc Get the string representation of the the WCAG Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAGLevel () {
    return this.wcag_level;
  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON representation of the rule
   *
   * @return  {String}  Returns a JSON representation of the rule
   */

  toJSON () {

    const ruleInfo = {
      last_updated: this.last_updated,

      rule_id:      this.rule_id,
      rule_nls_id:  this.rule_nls_id,
      summary:      this.summary,
      definition:   this.definition,

      rule_required:  this.rule_required,

      target_resources_desc:  this.target_resources_desc,

      rule_scope_id:  this.rule_scope_id,
      rule_scope:     this.rule_scope,

      rule_category_id:   this.rule_category_id,
      rule_category_info: this.rule_category_info,
      
      ruleset_id:   this.ruleset_id,
      ruleset_info: this.ruleset_info,
      
      wcag_guideline_id:  this.wcag_guideline_id,
      guideline_info:     this.guideline_info,

      target_resources:  this.target_resources,

      wcag_primary_id:  this.wcag_primary_id,
      wcag_primary:     this.wcag_primary,
      wcag_level:       this.wcag_level,

      wcag_related_ids: this.wcag_related_ids,
      wcag_related:     this.wcag_related,

      purposes:       this.purposes,
      techniques:     this.techniques,
      manual_checks:  this.manual_checks,

      informational_links:    this.informational_links
    };

    const json = JSON.stringify(ruleInfo, null, '  ');
    debug.flag && debug.log(`[JSON]: ${json}`);
    return json;

  }
}
