/* evaluationResult.js */

/* Imports */
import DebugLogging  from './debug.js';
import {
  VERSION,
  RULESET
} from './constants.js';
import {
  getFormattedDate,
  cleanForUTF8
} from './utils.js';
import RuleGroupResult from './ruleGroupResult.js';
import RuleResult from './ruleResult.js';
import {
  getCommonMessage,
  getGuidelineInfo,
  getRuleCategoryInfo
} from './_locale/locale.js';

/* Constants */
const debug = new DebugLogging('EvaluationResult', false)

export default class EvaluationResult {
  constructor (allRules, domCache, title, url) {
    this.title = title;
    this.url = url;
    this.date = getFormattedDate();
    this.version = VERSION;
    this.allRuleResults = [];

    const startTime = new Date();
    debug.flag && debug.log(`[title]: ${this.title}`);

    allRules.forEach (rule => {
      const ruleResult = new RuleResult(rule);
      debug.flag && debug.log(`[validate]: ${ruleResult.rule.getId()}`);
      ruleResult.validate(domCache);
      this.allRuleResults.push(ruleResult);
    });

    const json = this.toJSON(true);
    debug.flag && debug.log(`[JSON]: ${json}`);

    const endTime = new Date();
    debug.flag && debug.log(`[Run Time]: ${endTime.getTime() - startTime.getTime()} msecs`);


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
    return this.allRuleResults.find( rr => rr.rule.rule_id === rule_id);
  }

  /**
   * @method getRuleResultsAll
   *
   * @desc Returns an object containing a set of all rule results
   *
   * @param  {Integer}  ruleset - Numerical constant that specifies the ruleset
   *                             By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsAll (ruleset=RULESET.ALL) {
    var rgr = new RuleGroupResult(this, getCommonMessage('allRuleResults'), "", "", ruleset);
    this.allRuleResults.forEach( rr => {
      rgr.addRuleResult(rr);
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByGuideline
   *
   * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
   *
   * @param {Integer}  guidelineId  - Number representing the guideline id
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByGuideline (guidelineId, ruleset=RULESET.ALL) {
    const glInfo = getGuidelineInfo(guidelineId);
    const rgr = new RuleGroupResult(this, glInfo.title, glInfo.url, glInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getGuideline() & guidelineId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByCategory
   *
   * @desc Returns an object containing the rule results for the rules in a rule category
   *
   * @param {Integer}  categoryId  -  Number of the rule category
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByCategory (categoryId, ruleset=RULESET.ALL) {
    var rcInfo = getRuleCategoryInfo(categoryId);
    var rgr = new RuleGroupResult(this, rcInfo.title, rcInfo.url, rcInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getCategory() & categoryId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  /**
   * @method getDataForJSON
   *
   * @desc Creates a data object with rule, element and page results
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  getDataForJSON (flag=false) {

    const data = {
      eval_url: cleanForUTF8(this.url),
      eval_url_encoded: encodeURI(this.url),
      eval_title: cleanForUTF8(this.title),

      // For compatibility with previous versions of the library
      ruleset_id:     'ARIA_STRICT',
      ruleset_title:  'HTML and ARIA Techniques',
      ruleset_abbrev: 'HTML5+ARIA',
      ruleset_version: VERSION,

      rule_results: []
    }

//    json += this.dom_cache.element_information.toJSON(true, "  ");

    this.allRuleResults.forEach( rr => {
      data.rule_results.push(rr.getDataForJSON(flag));
    });
    return data;
  }

  /**
   * @method toJSON
   *
   * @desc Creates a string representing the evaluation results in a JSON format
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  toJSON (flag=false) {
    return JSON.stringify(this.getDataForJSON(flag), null, '  ');
  }
}

