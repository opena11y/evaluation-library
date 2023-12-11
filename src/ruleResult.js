/* ruleResult.js */

/* Imports */
import DebugLogging  from './debug.js';

/* Constants */
import {
  IMPLEMENTATION_VALUE,
  RESULT_VALUE,
  RULE_RESULT_VALUE,
  getResultValue
} from './constants.js';
import ElementResult  from './elementResult.js';
import ResultsSummary from './elementResultsSummary.js';
import PageResult     from './pageResult.js';
import {replaceAll}   from './utils.js';
import WebsiteResult  from './websiteResult.js';
import {
  getCommonMessage,
  transformElementMarkup
} from './locale/locale.js';


/* constants */
const debug = new DebugLogging('ruleResult', false);
debug.flag = false;

 /**
 * @class RuleResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a ruleset rule
 *
 * @param  {Rule}  Rule  - Rule associated with the result
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {Object} rule                   - Rule associated with the result
 *
 * @property  {Array}  results_passed         - Array of all the results
 *                                              that passed
 * @property  {Array}  results_violations     - Array of all the results
 *                                              that resulted in violations
 * @property  {Array}  results_warnings       - Array of all the results
 *                                              that resulted in warnings
 * @property  {Array}  results_manual_checks  - Array of all the results
 *                                              that require manual evaluations
 * @property  {Array}  results_hidden         - Array of all the results
 *                                              that are hidden
 *
 * @property  {ElementResultsSummary} results_summary  - Summary of the node results for
 *                                               the rule result
 */

export default class RuleResult {

  constructor (rule) {
    this.rule = rule;

    this.results_passed         = [];
    this.results_violations     = [];
    this.results_warnings       = [];
    this.results_manual_checks  = [];
    this.results_hidden         = [];

    this.results_summary = new ResultsSummary();
  }

  /**
   * @method validate
   *
   * @desc Executes the validate function of the rule and stores the
   *       results in this rule result
   */

  validate (domCache) {
    this.rule.validate(domCache, this);
  }

  /**
   * @method hasHiddenElementResults
   *
   * @desc True if at least one element result is a hidden,
   *       otherwise false if no element results or all element results are hidden
   *
   * @return {Boolean} see description
   */

  hasHiddenElementResults () {
    return this.results_summary.hidden > 0;
  }

  /**
   * @method getImplementationScore
   *
   * @desc Returns a number between 0 - 100 indicating the level of
   *       implementation the violations, warnings and passed element results
   *       A score value of -1 means the rule only had manual checks or was not
   *       applicable
   *
   * @return {Integer} see description
   */

  getImplementationScore () {
    let score = -1;
    const ers = this.getResultsSummary();
    const failures = ers.violations + ers.warnings;
    const passed = ers.passed;
    const total = failures + passed;

    if (total > 0) {
      score = Math.round((100 * passed) / total);
      if ((score === 100) && (failures > 0)) score = 99;
    }
    return score;
  }

  /**
   * @method getImplementationValue
   *
   * @desc Return a numerical constant indicating the level of implementation:
   *
   * @return {Integer} see description
   */

  getImplementationValue () {

    let value     = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    const summary = this.getResultsSummary();
    const score   = this.getImplementationScore();

    if (summary.manual_checks > 0) {
      value = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;
    }

    if (score === 100) {
      if (summary.manual_checks > 0) {
        value = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
      }
      else {
        value = IMPLEMENTATION_VALUE.COMPLETE;
      }
    } else {
      if (score > 95) {
        value = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
      } else {
        if (score > 50) {
          value = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
        } else {
          if (score >= 0) {
            value = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;
          }
        }
      }
    }
    return value;
  }

  /**
   * @method getImplementationValueNLS
   *
   * @desc Returns a string indicating the level of implementation:
   *
   * @return {String} see description
   */

  getImplementationValueNLS () {
    return getCommonMessage('implementationValue', this.getImplementationValue());
  }

  /**
   * @method getResultsSummary
   *
   * @desc Gets numerical summary information about the results
   *
   * @return {ElementResultSummary} see @desc
   */

  getResultsSummary () {
    return this.results_summary;
  }

  /**
   * @method getResultValue
   *
   * @desc Gets the rule result value based on element results
   *
   * @return {RULE_RESULT_VALUE} Returns a rule result value constant
   */

  getResultValue () {
    let resultValue = RULE_RESULT_VALUE.NOT_APPLICABLE;
    const summary = this.getResultsSummary();

    if (summary.violations > 0) resultValue = RULE_RESULT_VALUE.VIOLATION;
    else if (summary.warnings > 0) resultValue = RULE_RESULT_VALUE.WARNING;
    else if (summary.manual_checks > 0) resultValue = RULE_RESULT_VALUE.MANUAL_CHECK;
    else if (summary.passed > 0) resultValue = RULE_RESULT_VALUE.PASS;

    return resultValue;
  }

  /**
   * @method getResultValueNLS
   *
   * @desc Gets a short string representation of the rule result value:
   *
   * @return {String} Returns a string representing the rule result value
   */

  getResultValueNLS () {
    return getCommonMessage('ruleResult', this.getResultValue());
  }

  /**
   * @method getMessage
   *
   * @desc Generates a localized rule result message
   *
   * @param {String}  id      -  Id of the rule result message string
   *
   * @return {String} Strings with rule result message
   */

  getMessage (id) {
    let message;
    if ((id === 'ACTION_NONE') ||
        (id === 'NOT_APPLICABLE')) {
      message = getCommonMessage('ruleResultMessages', id);
    }

    if (!message) {
      message = this.rule.rule_result_msgs[id];
      if (typeof message !== 'string' || (message.length === 0)) {
        message = "Message is missing for rule id: " + this.rule.rule_id + " and mesage id: " + id;
      }

      const summary = this.results_summary;
      const failures = summary.violations + summary.warnings;
      const total    = summary.violations + summary.warnings + summary.passed;

      // Replace tokens with rule values
      message = replaceAll(message, "%N_F",  failures.toString());
      message = replaceAll(message, "%N_P",  summary.passed.toString());
      message = replaceAll(message, "%N_T",  (total + summary.manual_checks).toString());
      message = replaceAll(message, "%N_MC", summary.manual_checks.toString());
      message = replaceAll(message, "%N_H",  summary.hidden.toString());
      message = transformElementMarkup(message);
    }
    return message;
  }

  /**
   * @method getResultMessagesArray
   *
   * @desc Generates a localized rule result messages
   *
   * @return {Array} An array of strings with rule result messages
   *                 (typically only one string in the array)
   */

  getResultMessagesArray () {

    const summary = this.results_summary;

    let messages = [];
    let message = "";
    let prefix;

    const failures = summary.violations + summary.warnings;

    if (!failures && !summary.manual_checks) {
      if (summary.passed === 0) {
        messages.push(this.getMessage('NOT_APPLICABLE'));
      }
      else {
        messages.push(this.getMessage('ACTION_NONE'));
      }
    }
    else {
      if (failures > 0) {
        prefix =  this.isRuleRequired() ?
                  getCommonMessage('baseResult', RESULT_VALUE.VIOLATION) :
                  getCommonMessage('baseResult', RESULT_VALUE.WARNING);

        message = (failures === 1) ?
                  this.getMessage('FAIL_S') :
                  this.getMessage('FAIL_P');
        messages.push(prefix + ': ' + message);
      }

      if (summary.manual_checks > 0) {
        prefix = getCommonMessage('baseResult', RESULT_VALUE.MANUAL_CHECK);
        message = (summary.manual_checks === 1) ?
                  this.getMessage('MANUAL_CHECK_S') :
                  this.getMessage('MANUAL_CHECK_P');
        messages.push(prefix + ': ' + message);
      }
    }

    if (summary.hidden > 0) {
        prefix = getCommonMessage('baseResult', RESULT_VALUE.HIDDEN);
      message = (summary.hidden === 1) ?
                this.getMessage('HIDDEN_S') :
                this.getMessage('HIDDEN_P');
      messages.push(prefix + ': ' + message);
    }
    return messages;
  }

  /**
   * @method getResultMessage
   *
   * @desc Generates a localized rule result messages
   *
   * @return {String} Returns a single string with all result messages
   */

  getResultMessage   () {
    const messages = this.getResultMessagesArray();
    return messages.join('; ');
  }

  /**
   * @method getAllResultsArray
   *
   * @desc Returns an array of all results in severity order
   *
   * @return {Array} see @desc
   */

  getAllResultsArray   () {
    return [].concat(
      this.results_violations,
      this.results_warnings,
      this.results_manual_checks,
      this.results_passed,
      this.results_hidden);
  }

  /**
   * @method updateResults
   *
   * @desc Updates rule result information for a element or page result
   *
   * @param  {Integer}  test_result   - Number representing a result value
   * @param  {Object}   result_item   - Reference to ElementResult or PageResult object
   * @param  {Object}   dom_item      - Reference to DOMcache or domElement objects
   */

  updateResults (result_value, result_item, dom_item) {
    switch (result_value) {
      case RESULT_VALUE.HIDDEN:
        this.results_summary.addHidden(1);
        this.results_hidden.push(result_item);
        dom_item.resultsHidden.push(result_item);
        break;

      case RESULT_VALUE.PASS:
        this.results_summary.addPassed(1);
        this.results_passed.push(result_item);
        dom_item.resultsPassed.push(result_item);
        break;

      case RESULT_VALUE.VIOLATION:
        this.results_summary.addViolations(1);
        this.results_violations.push(result_item);
        dom_item.resultsViolations.push(result_item);
        break;

      case RESULT_VALUE.WARNING:
        this.results_summary.addWarnings(1);
        this.results_warnings.push(result_item);
        dom_item.resultsWarnings.push(result_item);
        break;

      case RESULT_VALUE.MANUAL_CHECK:
        this.results_summary.addManualChecks(1);
        this.results_manual_checks.push(result_item);
        dom_item.resultsManualChecks.push(result_item);
        break;

      default:
        break;
    } // end switch
  }

  /**
   * @method addElementResult
   *
   * @desc Adds a element result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}  dom_item            - Reference to DOMcache item (e.g. domElement, domText objects)
   * @param  {String}  message_id          - Reference to the message string in the NLS file
   * @param  {Array}   message_arguements  - Array of values used in the message string
   */

  addElementResult (test_result, dom_item, message_id, message_arguments) {
    const dom_element = dom_item.isDomText ? dom_item.parentDomElement : dom_item;
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const element_result = new ElementResult(this, result_value, dom_element, message_id, message_arguments);

    this.updateResults(result_value, element_result, dom_element);
  }

  /**
   * @method addPageResult
   *
   * @desc Adds a page result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}   dom_cache           - Reference to DOMcache for saving page results
   * @param  {String}   message_id          - Reference to the message string in the NLS file
   * @param  {Array}    message_arguements  - Array of values used in the message string
   */

  addPageResult (test_result, dom_cache, message_id, message_arguments) {
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const page_result = new PageResult(this, result_value, dom_cache, message_id, message_arguments);

    this.updateResults(result_value, page_result, dom_cache);
  }

  /**
   * @method addWebsiteResult
   *
   * @desc Adds a website result from an evaluation of rule on the dom
   *
   * @param  {Integer}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}   dom_cache           - Reference to DOMcache for saving page results
   * @param  {String}   message_id          - Reference to the message string in the NLS file
   * @param  {Array}    message_arguements  - Array of values used in the message string
   */

  addWebsiteResult (test_result, dom_cache, message_id, message_arguments) {
    const result_value = getResultValue(test_result, this.isRuleRequired());
    const website_result = new WebsiteResult(this, result_value, dom_cache, message_id, message_arguments);

    this.updateResults(result_value, website_result, dom_cache);
  }

  /**
   * @method isRuleRequired
   *
   * @desc Tests whether the rule is a required or recommended rule in this ruleset
   *
   * @return {Boolean}  True if rule is a required rule, false if a recommended rule
   */

  isRuleRequired () {
    return this.rule.rule_required;
  }

  /**
   * @method getRule
   *
   * @desc Gets the associated rule
   *
   * @return {Object} Rule object
   */
  getRule () {
    return this.rule;
  }

  /**
   * @method getRuleDefinition
   *
   * @desc Gets the definition of the rule
   *
   * @return {String} Localized string of the rule definition based on being
   *                  required or recommended
   */
  getRuleDefinition () {
    return this.rule.getDefinition(this.isRuleRequired());
  }

  /**
   * @method getRuleSummary
   *
   * @desc Gets the summary of the rule
   *
   * @return {String} Localized string of the rule summary based on being
   *                  required or recommended
   */

  getRuleSummary   () {
    return this.rule.getSummary(this.isRuleRequired());
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

  getWCAGLevel   () {
    return this.rule.getWCAGLevel();
  }

  /**
   * @method getRuleScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Integer} rule scope constant
   */

  getRuleScope   () {
    return this.rule.getScope();
  }

  /**
   * @method getRuleScopeNLS
   *
   * @desc Get a localized string of the rule scope (i.e. 'element' or 'page')
   *
   * @return {String} Localized string of the rule scope
   */

  getRuleScopeNLS   () {
    return this.rule.getScopeNLS();
  }

  /**
   * @method getDataForJSON
   *
   * @desc Object containing the data for exporting a rule result to JSON
   *
   * @param {Boolean} flag    -  if true include element result details
   *
   * @return {Object} see @desc
   */

  getDataForJSON (flag=false) {

    const summary = this.results_summary;

    const data = {
      rule_id: this.rule.getId(),
      rule_summary: this.getRuleSummary(),

      success_criteria_nls:  this.rule.getPrimarySuccessCriterionInfo().title,
      success_criteria_code: this.rule.getPrimarySuccessCriterionInfo().id,

      guideline_nls:  this.rule.getGuidelineInfo().title,
      guideline_code: this.rule.getGuidelineInfo().id,

      rule_category_nls:  this.rule.getCategoryInfo().title,
      rule_category_code: this.rule.getCategoryInfo().id,

      rule_scope_code_nls: this.rule.getScopeNLS(),
      rule_scope_code:     this.rule.getScope(),

      result_value_nls: this.getResultValueNLS(),
      result_value:     this.getResultValue(),
      result_message:   this.getResultMessage(),

      rule_required: this.isRuleRequired(),
      has_hidden:    this.hasHiddenElementResults(),

      implementation_score: this.getImplementationScore(),
      implementation_value: this.getImplementationValue(),
      implementation_nls:   this.getImplementationValueNLS(),

      results_passed:       summary.passed,
      results_violation:    summary.violations,
      results_warning:      summary.warnings,
      results_failure:     (summary.violations + summary.warnings),
      results_manual_check: summary.manual_checks,
      results_hidden:       summary.hidden,

      results: []
    }

    if (flag) {
      const results = this.getAllResultsArray();
      results.forEach ( result => {
        data.results.push(result.getDataForJSON());
      });
    }
    return data;
  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON representation of the rule result
   *
   * @param {Boolean} flag    -  if true include element result details
   *
   * @return  {String}  see @desc
   */

  toJSON (flag=false) {
    return JSON.stringify(this.getDataForJSON(flag), null, '  ');
  }

  /**
   * @method toString
   *
   * @desc Creates a text string representation of the rule result object
   *
   * @return {String} Returns a text string representation of the rule result object
   */

  toString () {
    return this.getRuleDefinition() + " (" + this.results_summary + ")";
  }

}
