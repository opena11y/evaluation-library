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
/*                       EvaluationResult                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor EvaluationResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {Object}  dom        -  DOM of the web page being evaluated
 * @param  {String}  title      -  Title of the web page being evaluated
 * @param  {String}  url        -  URL of the web page being evaluated
 * @param  {Object}  ruleset    -  Ruleset object used to generate
 * @param  {Object}  dom_cache  -  DOMCache object used for evaluation
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {Object}  ruleset            - Ruleset object used to generate
 *                                           the evaluation
 *
 * @property {Object} dom    - Reference to browser document object model
 *                             (DOM) that holds the document to be analyzed
 * @property {String} title  - The title of the document evaluated
 * @property {String} url    - The url of the document evaluated
 * @property {String} date   - Date of the evaluation
 * @property {String} time   - Time of day the document was evaluated
 *
 * @property {Object} dom_cache  - Reference to DOMCache object
 *
 * @property {Array}  rule_results  - Array of rule result objects
 *
 * @example
 *

 * var url   = window.location.href;
 * var title = window.title;
 * var doc   = window.document;
 *
 * var rs = OpenAjax.a11y.RulesetManager.getRuleset('WCAG20_TRANS');

 * var evaluator_factory = OpenAjax.a11y.EvaluatorFactory.newInstance();
 * evaluator_factory.setParameter('ruleset', rs);
 * evaluator_factory.setFeature('eventProcessing', 'firefox');
 *
 * var evaluator = evaluator_factory.newEvaluator();
 *
 * var evaluation = evaluator.evaluate(url, title, doc);
 *
 */

OpenAjax.a11y.EvaluationResult = function (dom, title, url, ruleset, dom_cache) {

  this.ruleset = ruleset;

  this.title = title;
  this.url   = url;

  this.date = OpenAjax.a11y.util.getFormattedDate();

  this.dom       = dom;
  this.dom_cache = dom_cache;

  this.rule_results = [];

  this.page_information =  new OpenAjax.a11y.info.PageInfo(dom_cache);

};

/**
 * @method getDOM
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Get the document object evaluated
 *
 * @return {Object}  Document object
 */

OpenAjax.a11y.EvaluationResult.prototype.getDOM = function () {
  return this.dom;
};


/**
 * @method getRuleset
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Return ruleset of information
 *
 * @return {RulesetInfo}  RulesetInfo object
 */

OpenAjax.a11y.EvaluationResult.prototype.getRuleset = function () {
  return this.ruleset;
};

/**
 * @method getPageInfo
 * @private
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Return information on the web page evaluated
 *
 * @return {PageInfo}  PageInfo object
 */

OpenAjax.a11y.EvaluationResult.prototype.getPageInfo = function () {
  return this.page_information;
};


/**
 * @method getTitle
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Get the title of the evaluated document
 *
 * @return {String}  String representing the title
 */

OpenAjax.a11y.EvaluationResult.prototype.getTitle = function () {
  return this.title;
};

/**
 * @method getURL
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Get the url of the evaluated document
 *
 * @return {String}  String representing the title
 */

OpenAjax.a11y.EvaluationResult.prototype.getURL = function () {
  return this.url;
};

/**
 * @method getDate
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Get the date the document
 *
 * @return {String}  String representing the title
 */

OpenAjax.a11y.EvaluationResult.prototype.getDate = function () {
  return this.date;
};

 /**
 * @method addRuleResult
 * @private
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Adds a rule result to the evaluation result
 *
 * @param {RuleResult}  rule_result  - Rule result object to add
 */
OpenAjax.a11y.EvaluationResult.prototype.addRuleResult = function (rule_result) {

  if (rule_result) {
    this.rule_results.push(rule_result);
  }

};


 /**
 * @method getRuleResult
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Gets rule result object with the associated id
 *
 * @param {String}  rule_id  - id of the rule associated with the rule result
 *
 * @return {RuleResult} Returns the ResultResult object
 */
OpenAjax.a11y.EvaluationResult.prototype.getRuleResult = function (rule_id) {

  for (var i = 0; i < this.rule_results.length; i++ ) {

    var rr = this.rule_results[i];

    if (rr.getRule().getId() === rule_id) return rr;
  }

  return null;

};



/**
 * @method getRuleResultsAll
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Returns an object containing a set of all rule results
 *
* @param {Number}  group_filter -  Number of bit mask for which rule groups to include
 *
 * @return {RuleGroupResult}  see description
 */

OpenAjax.a11y.EvaluationResult.prototype.getRuleResultsAll = function (group_filter) {

  if (typeof group_filter !== 'number') group_filter = OpenAjax.a11y.RULE_GROUP.GROUP123;

  var rgr = new OpenAjax.a11y.RuleGroupResult(this, "All Rule Results", "", "");

  for (var i = 0; i < this.rule_results.length; i++) {
     var rr = this.rule_results[i];
     var r = rr.getRule();

     if (r.getGroup() & group_filter) {
       rgr.addRuleResult(rr);
     }
  }

  return rgr;

};

/**
 * @method getRuleResultsByGuideline
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
 *
 * @param {Number}  guideline_id  -  Number representing the guideline id
 * @param {Number}  group_filter -  Number of bit mask for which rule groups to include
 *
 * @return {RuleGroupResult}  see description
 */

OpenAjax.a11y.EvaluationResult.prototype.getRuleResultsByGuideline = function (guideline_id, group_filter) {

  if (typeof group_filter !== 'number') group_filter = OpenAjax.a11y.RULE_GROUP.GROUP123;

  var gl_info = OpenAjax.a11y.info.GuidelineInfo(guideline_id);

  var rgr = new OpenAjax.a11y.RuleGroupResult(this, gl_info.title, gl_info.url, gl_info.description);

  for (var i = 0; i < this.rule_results.length; i++) {

     var rr = this.rule_results[i];
     var r = rr.getRule();

//     OpenAjax.a11y.logger.debug("[EvaluationResult][getRuleResultsByGuideline] Compare: " + r.getGuideline() + " " + guideline_id + " " + (r.getGuideline() & guideline_id));

     if ((r.getGuideline() & guideline_id)&&
         (r.getGroup()     & group_filter)) {
       rgr.addRuleResult(rr);
     }

  }

  return rgr;

};


/**
 * @method getRuleResultsByCategory
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Returns an object containing the rule results for the rules in a rule category
 *
 * @param {Number}  category_id  -  Number of the rule category
 * @param {Number}  group_filter -  Number of bit mask for which rule groups to include
 *
 * @return {RuleGroupResult}  see description
 */

OpenAjax.a11y.EvaluationResult.prototype.getRuleResultsByCategory = function (category_id, group_filter) {

  if (typeof group_filter !== 'number') group_filter = OpenAjax.a11y.RULE_GROUP.GROUP123;

  var rc_info = OpenAjax.a11y.info.RuleCategoryInfo(category_id);

  var rgr = new OpenAjax.a11y.RuleGroupResult(this, rc_info.title, rc_info.url, rc_info.description);

  for (var i = 0; i < this.rule_results.length; i++) {

     var rr = this.rule_results[i];
     var r = rr.getRule();

     if ((r.getCategory() & category_id) &&
         (r.getGroup()    & group_filter)) {
       rgr.addRuleResult(rr);
     }
  }

  return rgr;

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Creates a string representing the evaluation results in a JSON format
 *
 * @param  {Boolean}  include_element_results  -  Optional param, if true then element
 *                                                results are included in the JSON file
 *
 * @return {String} Returns a string in JSON format
 */

OpenAjax.a11y.EvaluationResult.prototype.toJSON = function (include_element_results) {

  if (typeof include_element_results !== 'boolean') include_element_results = false;

  var cleanForUTF8  = OpenAjax.a11y.util.cleanForUTF8;

  var ruleset = this.getRuleset();

  var ruleset_info = ruleset.getRulesetInfo();

  var json = "{\n";

  json += "  \"eval_url\"                  : " + JSON.stringify(cleanForUTF8(this.url))   + ",\n";
  json += "  \"eval_url_encoded\"          : " + JSON.stringify(encodeURI(this.url))      + ",\n";
  json += "  \"eval_title\"                : " + JSON.stringify(cleanForUTF8(this.title)) + ",\n";

  json += "  \"ruleset_id\"                : " + JSON.stringify(ruleset.getId())         + ",\n";
  json += "  \"ruleset_title\"             : " + JSON.stringify(ruleset_info.title)      + ",\n";
  json += "  \"ruleset_abbrev\"            : " + JSON.stringify(ruleset_info.abbrev)     + ",\n";
  json += "  \"ruleset_version\"           : " + JSON.stringify(ruleset_info.version)    + ",\n";

  json += this.dom_cache.element_information.toJSON(true, "  ");
//  json += this.dom_cache.aria_information.toJSON(true, "  ");
//  json += this.dom_cache.event_information.toJSON(true, "  ");

  var rule_group       = this.getRuleResultsAll();
  var rule_results     = rule_group.getRuleResultsArray();
  var rule_results_len = rule_results.length;

  json += "  \"rule_results\": [\n";

  for (var i = 0; i < rule_results_len; i++) {

    json += rule_results[i].toJSON("    ", include_element_results);

    if (i < (rule_results_len-1))  json += ",\n";
    else json += "\n";

  }

  json += "                ]\n";

  json += "}\n";

  json = unescape(encodeURIComponent(json));

  return json;

};
