/* ruleGroupResult.js */

/* Imports */
import DebugLogging       from './debug.js';
import RuleResultsSummary from './ruleResultsSummary.js';
import {getImplementationValue} from './_locale/locale.js';
import {cleanForUTF8}     from './utils.js';

/* Constants */
const debug = new DebugLogging('ruleGroupResult', false)

/**
 * @class RuleGroupResult
 *
 * @desc Constructs a data structure of cache items associated with a rule category
 *       Node results can be filtered when a rule result is added to the group
 *
 * @param  {Object}  evaluation_result  - ruleset and evaluation results used to generate
 *                              the filtered results
 * @param  {String}  group_id  - id used to identify this grouping of rules and filtering rules
 *
 * @param  {String}  title     - Title for the group
 * @param  {String}  url       - URL to more information on the group
 * @param  {String}  desc      - Description of the group
 *
 * @property  {Object}  rule_group_information - Information on rules in the group
 * @property  {Array}   rule_results           - List of rule result objects in the group
 *
 * @property  {EvaluationResult} evaluation_result - ruleset and evaluation results
 *                                                   used to generate the filtered
 *                                                   results
 *
 * @property  {RuleResultsSummary}  rule_results_summary  - Summary of the rule results for
 *                                                           the group
 */


export default class RuleGroupResult {
  constructor (evaluationResult, title, url, desc) {
    this.evaluation_result = evaluationResult;

    this.title       = title;
    this.url         = url;
    this.description = desc;

    this.rules_required    = 0;
    this.rules_recommended = 0;

    this.rule_results = [];
    this.rule_results_summary = new RuleResultsSummary();
  }

  /**
   * @method getEvaluationResult
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Returns the evaluation result the rule group result is a part of
   *
   * @return {EvaluationResult}  see description
   */

  getEvaluationResult = function () {
    return this.evaluation_result;
  }

  /**
   * @method getImplementationScore
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Return a numerical value between (0-100) indicated
   *
   * @return {Number}  see description
   */

  getImplementationScore = function () {
    return this.rule_results_summary.implementation_score;
  }


  /**
   * @method getImplementationValue
   *
   * @desc Return a numerical constant indicating the level of implementation
   *
   * @return {Number}  see description
   */

  getImplementationValue = function () {
    return this.rule_results_summary.implementation_value;
  }

   /**
   * @method getImplementationValueNLS
   *
   * @desc Returns a string indicating the level of implementation:
   *
   * @return {String} see description
   */

  getImplementationValueNLS = function () {
    return getImplementationValue(this.getImplementationValue());
  }

  /**
   * @method getRuleResultsArray
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Return a list of rule results associated with the group
   *
   * @return {Array}  see description
   */

  getRuleResultsArray = function () {
    return this.rule_results;
  }

  /**
   * @method getRuleResultsSummary
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Gets numerical summary information about the rule results
   *
   * @return {RuleResultsSummary} Returns the rule result summary object
   */

  getRuleResultsSummary = function () {
    return this.rule_results_summary;
  }

  /**
   * @method hasRuleResults
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Tests if any of the rules in this group applied to the content in the page
   *       Basically is there at least one rule result that was a violation, warning,
   *       manual check or pass
   *
   * @return {Boolean} True if any of the rule have results, otherwise false
   */

  hasRuleResults = function () {
    return this.rule_results_summary.hasResults();
  }

  /**
   * @method hasRules
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Tests if their are any rule results in this group
   *
   * @return {Boolean} True if the group contains at least one rule, otherwise false
   */

  hasRules = function () {
    return this.rule_results.length > 0;
  }


  /**
   * @method addRuleResult
   * @private
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Adds a rule result to the grouping aggregation of results if the group id has a match in the group
   *
   * @param  {RuleResult}  rule_result   - Filtered rule result object to aggregate
   */

  addRuleResult (rule_result) {

    this.rule_results.push(rule_result);
    this.rule_results_summary.updateSummary(rule_result);

    if (rule_result.isRuleRequired()) {
      this.rules_required += 1;
    }
    else {
      this.rules_recommended += 1;
    }
  }

  /**
   * @method toJSON
   *
   * @memberOf OpenAjax.a11y.RuleGroupResult
   *
   * @desc Returns an JSON representation of the rule category results
   *
   * @param {String}  prefix           -  A prefix string typically spaces
   * @param {Boolean} flag (optional)  -  True (default) to include filtered element results, false to not include
   *
   * @return  {String}  JSON string representing the report data
   */

  toJSON (prefix, flag) {

    if (typeof prefix !== 'string') prefix = '';
    if (typeof flag   !== 'boolean') flag = true;

    var cleanForUTF8  = OpenAjax.a11y.util.cleanForUTF8;

    const ruleset         = this.evaluation_result.getRuleset();
    var ruleset_info    = ruleset.getRulesetInfo();

    var eval_title = this.evaluation_result.title;
    var eval_url   = this.evaluation_result.url;
    var date       = this.evaluation_result.date.split(':');
    var eval_time  = date[1] + ":" + date[2];
    var eval_date  = date[0];

    const ruleGroupResultInfo {
      eval_url:         cleanForUTF8(this.evaluation_result.eval_url);
      eval_url_encoded: encodeURI(this.evaluation_result.eval_url);
      eval_title: this.evaluation_result.title;

      ruleset_id:

    }

    var json = "";

    json += prefix + "{";

    json += prefix + "  \"eval_url\"                  : " + JSON.stringify(cleanForUTF8(eval_url))   + ",\n";
    json += prefix + "  \"eval_url_encoded\"          : " + JSON.stringify(encodeURI(eval_url))      + ",\n";
    json += prefix + "  \"eval_title\"                : " + JSON.stringify(cleanForUTF8(eval_title)) + ",\n";

    json += prefix + "  \"ruleset_id\"                : " + JSON.stringify(ruleset.getId())         + ",\n";
    json += prefix + "  \"ruleset_title\"             : " + JSON.stringify(ruleset_info.title)      + ",\n";
    json += prefix + "  \"ruleset_abbrev\"            : " + JSON.stringify(ruleset_info.abbrev)     + ",\n";
    json += prefix + "  \"ruleset_version\"           : " + JSON.stringify(ruleset_info.version)    + ",\n";

    json += prefix + "  \"group_title\"   : " + JSON.stringify(rule_group_info.title) + ",\n";
    json += prefix + "  \"group_url\"     : " + JSON.stringify(rule_group_info.url)   + ",\n";

    json += prefix + "  \"rule_results\" : [\n";

    var rule_results     = this.rule_results;
    var rule_results_len = rule_results.length;
    var comma_len   = rule_results_len - 1;

    for (var i = 0; i < rule_results_len; i++) {
      json += rule_results[i].toJSON(prefix + "  ", flag);
      if (i < comma_len) json += ",";
    }

    json += prefix + "  ]\n";

    json += "}";

    return json;

  }
}


