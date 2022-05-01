/* evaluationResult.js */

/* Imports */
import DebugLogging  from './debug.js';
import {getFormattedDate} from './utils.js';

/* Constants */
const debug = new DebugLogging('EvaluationResult', false)

export default class EvaluationResult {
  constructor (allRules, domCache, title, url) {
    this.title = title;
    this.url = url;
    this.date = getFormattedDate();
    this.allRuleResults = [];

    debug.flag && debug.log(`[title]: ${this.title}`);

    allRules.forEach (rule => {
      const ruleResult = new RuleResult(rule);
      rule.evaluate(domCache, ruleResult);
      this.allRuleResults(ruleResult);
    });

  }

  /**
   * @method getTitle
   *
   * @desc Get the title of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getTitle () {
    return this.title;
  }

  /**
   * @method getURL
   *
   * @desc Get the url of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getURL () {
    return this.url;
  }

  /**
   * @method getDate
   *
   * @desc Get the date the document
   *
   * @return {String}  String representing the title
   */

  getDate () {
    return this.date;
  }

  /**
   * @method getRuleResult
   *
   * @desc Gets rule result object with the associated id
   *
   * @param {String}  rule_id  - id of the rule associated with the rule result
   *
   * @return {RuleResult} Returns the ResultResult object
   */
  getRuleResult (rule_id) {
    return this.ruleResults.find( rr => rr.rule.rule_id === rule_id);
  }

  /**
   * @method getRuleResultsAll
   *
   * @desc Returns an object containing a set of all rule results
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsAll (group_filter) {

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

  }

  /**
   * @method getRuleResultsByGuideline
   *
   * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
   *
   * @param {Number}  guideline_id  -  Number representing the guideline id
   * @param {Number}  group_filter -  Number of bit mask for which rule groups to include
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByGuideline (guideline_id, group_filter) {

    if (typeof group_filter !== 'number') group_filter = OpenAjax.a11y.RULE_GROUP.GROUP123;

    var gl_info = OpenAjax.a11y.info.GuidelineInfo(guideline_id);

    var rgr = new OpenAjax.a11y.RuleGroupResult(this, gl_info.title, gl_info.url, gl_info.description);

    for (var i = 0; i < this.rule_results.length; i++) {

       var rr = this.rule_results[i];
       var r = rr.getRule();

       if ((r.getGuideline() & guideline_id)&&
           (r.getGroup()     & group_filter)) {
         rgr.addRuleResult(rr);
       }

    }

    return rgr;

  }


  /**
   * @method getRuleResultsByCategory
   *
   * @desc Returns an object containing the rule results for the rules in a rule category
   *
   * @param {Number}  category_id  -  Number of the rule category
   * @param {Number}  group_filter -  Number of bit mask for which rule groups to include
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByCategory (category_id, group_filter) {

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

  }

  /**
   * @method toJSON
   *
   * @desc Creates a string representing the evaluation results in a JSON format
   *
   * @param  {Boolean}  include_element_results  -  Optional param, if true then element
   *                                                results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  toJSON (include_element_results) {

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

  }
}

