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


/* ---------------------------------------------------------------- */
/*                      RuleGroupResult                             */
/* ---------------------------------------------------------------- */


/**
 * @constructor RuleGroupResult
 *
 * @memberOf OpenAjax.a11y
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


OpenAjax.a11y.RuleGroupResult = function(eval_result, title, url, desc) {

  if (typeof title !== 'string') title = "no title";
  if (typeof url   !== 'string') url   = "";
  if (typeof desc  !== 'string') desc  = "";

  this.rule_group_information = new OpenAjax.a11y.info.RuleGroupInfo(title, url, desc, 0, 0);

  this.evaluation_result = eval_result;

  this.rule_results = [];

  this.rule_results_summary = new OpenAjax.a11y.info.RuleResultsSummary();

  this.implementation_nls = "";

};


/**
 * @method getEvaluationResult
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Returns the evaluation result the rule group result is a part of
 *
 * @return {EvaluationResult}  see description
 */

OpenAjax.a11y.RuleGroupResult.prototype.getEvaluationResult = function () {
  return this.evaluation_result;
};

/**
 * @method getImplementationScore
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Return a numerical value between (0-100) indicated
 *
 * @return {Number}  see description
 */

OpenAjax.a11y.RuleGroupResult.prototype.getImplementationScore = function () {
  return this.rule_results_summary.implementation_score;
};


/**
 * @method getImplementationValue
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Return a numerical constant indicating the level of implementation:<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.UNDEFINED    <br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.NOT_APPLICABLE<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.NOT_IMPLEMENTED<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.ALMOST_COMPLETE<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.COMPLETE<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS<br/>
 *         OpenAjax.a11y.IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY<br/>
 *
 * @return {Number}  see description
 */

OpenAjax.a11y.RuleGroupResult.prototype.getImplementationValue = function () {
  return this.rule_results_summary.implementation_value;
};

 /**
 * @method getImplementationValueNLS
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Returns a string indicating the level of implementation: <br/>
 *         "Undefined"    <br/>
 *         "Not applicable"<br/>
 *         "Not implemented"<br/>
 *         "Partial implementation""<br/>
 *         "Almost complete"<br/>
 *         "Complete"<br/>
 *         "Complete with manual checks"<br/>
 *         "Manual checks only"<br/>
 *
 * @return {String} see description
 */

OpenAjax.a11y.RuleGroupResult.prototype.getImplementationValueNLS = function () {

  var IMPLEMENTATION_VALUE = OpenAjax.a11y.IMPLEMENTATION_VALUE;

  if (this.implementation_nls === "") {
    var iv = this.getImplementationValue();
    var nls = "Undefined";

    if (iv === IMPLEMENTATION_VALUE.NOT_APPLICABLE) nls = "Not Applicable";
    else if (iv === IMPLEMENTATION_VALUE.NOT_IMPLEMENTED) nls = "Not Implemented";
    else if (iv === IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION) nls = "Partial Implementation";
    else if (iv === IMPLEMENTATION_VALUE.ALMOST_COMPLETE) nls = "Almost Complete";
    else if (iv === IMPLEMENTATION_VALUE.COMPLETE) nls = "Complete";
    else if (iv === IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS) nls = "Complete with Manual Checks";
    else if (iv === IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY) nls = "Manual Checks Only";

    this.implementation_nls = nls;
  }

  return this.implementation_nls;

};

/**
 * @method getRuleResultsArray
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Return a list of rule results associated with the group
 *
 * @return {Array}  see description
 */

OpenAjax.a11y.RuleGroupResult.prototype.getRuleResultsArray = function () {
  return this.rule_results;
};



/**
 * @method getRuleResultsSummary
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Gets numerical summary information about the rule results
 *
 * @return {RuleResultsSummary} Returns the rule result summary object
 */

OpenAjax.a11y.RuleGroupResult.prototype.getRuleResultsSummary = function () {

  return this.rule_results_summary;

};

/**
 * @method getRuleGroupInfo
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Return information on the group of rules
 *
 * @return {RuleGroupInfo}  RuleGroupInfo object
 */

OpenAjax.a11y.RuleGroupResult.prototype.getRuleGroupInfo = function () {
  return this.rule_group_information;
};


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

OpenAjax.a11y.RuleGroupResult.prototype.hasRuleResults = function () {

   return this.rule_results_summary.hasResults();

};

/**
 * @method hasRules
 *
 * @memberOf OpenAjax.a11y.RuleGroupResult
 *
 * @desc Tests if their are any rule results in this group
 *
 * @return {Boolean} True if the group contains at least one rule, otherwise false
 */

OpenAjax.a11y.RuleGroupResult.prototype.hasRules = function () {

   return this.rule_results.length > 0;

};


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

OpenAjax.a11y.RuleGroupResult.prototype.addRuleResult = function(rule_result) {

  this.rule_results.push(rule_result);
  this.rule_results_summary.addRuleResult(rule_result);

  if (rule_result.isRuleRequired()) this.getRuleGroupInfo().incRequiredRuleCount();
  else this.getRuleGroupInfo().incRecommendedRuleCount();

};


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

OpenAjax.a11y.RuleGroupResult.prototype.toJSON = function(prefix, flag) {

  if (typeof flag !== 'boolean') flag = true;

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";

  var rule_group_info = this.getRuleGroupInfo();

  var ruleset_title   = this.evaluation_result.ruleset_title;
  var ruleset_abbrev  = this.evaluation_result.ruleset_abbrev;
  var ruleset_version = this.evaluation_result.ruleset_version;
  var ruleset_id      = this.evaluation_result.ruleset_id;

  var eval_title = this.evaluation_result.title;
  var eval_url   = this.evaluation_result.url;
  var date       = this.evaluation_result.date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  var json = "";

  json += prefix + "{";

  json += prefix + "  \"group_title\"   : " + JSON.stringify(rule_group_info.title) + ",";
  json += prefix + "  \"group_url\"     : " + JSON.stringify(rule_group_info.url)   + ",";

  json += prefix + "  \"ruleset_title\"   : " + JSON.stringify(ruleset_title)   + ",";
  json += prefix + "  \"ruleset_version\" : " + JSON.stringify(ruleset_version) + ",";
  json += prefix + "  \"ruleset_id\"      : \"" + ruleset_id + "\",";

  json += prefix + "  \"eval_title\"    : " + JSON.stringify(eval_title) + ",";
  json += prefix + "  \"eval_url\"      : " + JSON.stringify(eval_url)   + ",";
  json += prefix + "  \"eval_date\"     : " + JSON.stringify(eval_date)  + ",";
  json += prefix + "  \"eval_time\"     : " + JSON.stringify(eval_time)  + ",";

  json += prefix + "  \"required_rules\"    : \"" + rule_group_info.required_rules    + "\",";
  json += prefix + "  \"recommened_rules\"  : \"" + rule_group_info.recommended_rules + "\",";

  json += prefix + "  \"has_results\"  : \"" + this.hasResults() + "\",";
  json += prefix + "  \"has_rules\"    : \"" + this.hasRules()   + "\",";

  json += prefix + "  \"implementation_score\" : \"" + this.rule_results_summary.implementation_score + "\",";
  json += prefix + "  \"implementation_value\" : \"" + this.rule_results_summaryrs.implementation_value + "\",";

  json += prefix + "  \"rule_results\" : [";

  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;
  var comma_len   = results_len - 1;

  for (var i = 0; i < rule_results_len; i++) {
    json += rule_results[i].toJSON(prefix + "  ", flag);
    if (i < comma_len) json += ",";
  }

  json += prefix + "  ]\n";

  json += "}";

  return json;

};




