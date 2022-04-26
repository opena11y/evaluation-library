/* ruleResult.js */

/* Imports */
import DebugLogging  from './debug.js';

/* Constants */
import {
  IMPLEMENTATION_VALUE,
  ELEMENT_RESULT_VALUE,
  TEST_RESULT,
  RULE_RESULT_VALUE
} from './constants.js';
import {ElementResult} from './elementResult.js';
import {
  ElementResultsSummary
} from './resultSummary.js';
import {
  replaceAll,
  transformElementMarkup
} from './utils/utils.js'

const debug = new DebugLogging('ruleResult', false);

/* ---------------------------------------------------------------- */
/*                             RuleResult                           */
/* ---------------------------------------------------------------- */

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
 * @property  {Object} rule                            - Rule associated with the result
 *
 * @property  {Array}  element_results_passed          - Array of all the element results
 *                                                       that passed
 * @property  {Array}  elements_results_violations     - Array of all the element results
 *                                                       that resulted in violations
 * @property  {Array}  elements_results_warnings       - Array of all the element results
 *                                                       that resulted in warnings
 * @property  {Array}  elements_results_manual_checks  - Array of all the element results
 *                                                       that require manual evaluations
 * @property  {Array}  elements_results_hidden         - Array of all the element results
 *                                                       that are hidden
 *
 * @property  {ElementResultsSummary} element_results_summary  - Summary of the node results for
 *                                               the rule result
 */

export default class RuleResult {

  constructor (rule) {
    this.rule = rule;

    this.element_results_passed         = [];
    this.element_results_violations     = [];
    this.element_results_warnings       = [];
    this.element_results_manual_checks  = [];
    this.element_results_hidden         = [];

    this.element_results_summary = new ElementResultsSummary();

    if (debug.flag) {
      debug.log(this.toString());
    }
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
    return this.element_results_summary.hidden > 0;
  }

  /**
   * @method getImplementationScore
   *
   * @desc Returns a number between 0 - 100 indicating the level of
   *       implementation the violations, warnings and passed element results
   *
   * @return {Number} see description
   */

  getImplementationScore () {

    let score = -1;
    const ers = this.getElementResultsSummary();
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
 * @return {Number} see description
 */

  getImplementationValue   () {

    let value     = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    const summary = this.getElementResultsSummary();
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

    const implValue = this.getImplementationValue();
    let nls = "Undefined";
    switch (implValue) {
      case IMPLEMENTATION_VALUE.NOT_APPLICABLE:
        nls = "Not Implemented";
        break;

      case IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION:
        nls = "Partial Implementation"
        break;

      case IMPLEMENTATION_VALUE.ALMOST_COMPLETE:
        nls = "Almost Complete";
        break;

      case IMPLEMENTATION_VALUE.COMPLETE:
        nls = "Complete";
        break;

      case IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS:
        nls = "Complete with Manual Checks";
        break;

      case IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY:
        nls = "Manual Checks Only"
        break;

      default:
        break;

    }
    return nls;
  }

  /**
  * @method getElementResultsSummary
  *
  * @desc Gets numerical summary information about the element results
  *
  * @return {ElementResultSummary} Returns the ElementResultsSummary object
  */
  getElementResultsSummary () {
    return this.element_results_summary;
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
    const summary = this.getElementResultsSummary();

    if (summary.violations > 0) resultValue = RULE_RESULT_VALUE.VIOLATION;
    else if (summary.warnings > 0) resultValue = RULE_RESULT_VALUE.WARNING;
    else if (summary.manual_checks > 0) resultValue = RULE_RESULT_VALUE.MANUAL_CHECK;
    else if (summary.passed > 0) resultValue = RULE_RESULT_VALUE.PASS;

    return resultValue;
  }

  /**
  * @method getResultValueNLS
  *
  * @desc Gets a string representation of the rule result value:
  *
  * @return {String} Returns a string representing the rule result value
  */
  getResultValueNLS () {
    const summary = this.getElementResultsSummary();

    if (summary.violations > 0)         return 'V';
    else if (summary.warnings > 0)      return 'W';
    else if (summary.manual_checks > 0) return 'MC';
    else if (summary.passed > 0)        return 'P';

    return 'N/A';
  }

  /**
  * @method getMessage
  *
  * @desc Generates a localized rule result message
  *
  * @param {String}  id      -  Id of the rule result message string
  * @param {String}  prefix  -  Prefix message for the string
  *
  * @return {String} Strings with rule result message
  */
  getMessage   (id, prefix) {

    if (typeof prefix !== 'string') prefix = "";

    const rule       = this.getRule();
    const rule_nls   = rule.getNLS();
    const common_nls = rule.getCommonNLS();
    const rule_id    = rule.getId();

    let message = rule_nls['RULE_RESULT_MESSAGES'][id];

    if (id === 'ACTION_NONE') {
      message = common_nls.ACTION_NONE;
      return message;
    }

    if (id === 'NOT_APPLICABLE') {
      message = common_nls.NOT_APPLICABLE;
      return message;
    }

    if (typeof message !== 'string' || (message.length === 0)) {
      message = "Message is missing for rule id: " + rule_id + " and mesage id: " + id;
    }
    else {
      message = prefix + message;
    }

    var type = "";

    if (message.indexOf("%RULE_TYPE") >= 0) {

      if (this.rule_mapping.required) type = common_nls.message_severities.MUST;
      else type = common_nls.message_severities.SHOULD;

      message = message.replaceAll("%RULE_TYPE", type);
    }

    var rs = this.getElementResultsSummary();

    // Replace tokens with rule values

    var failures = rs.violations + rs.warnings;
    var total    = rs.violations + rs.warnings + rs.passed;

    message = replaceAll(message, "%N_F",  failures.toString());
    message = replaceAll(message, "%N_P",  rs.passed.toString());
    message = replaceAll(message, "%N_T",  (total + rs.manual_checks).toString());
    message = replaceAll(message, "%N_MC", rs.manual_checks.toString());
    message = replaceAll(message, "%N_H",  rs.hidden.toString());
    message = transformElementMarkup(message);

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

    // If the messages already exist, just return them
    if (this.rule_result_messages.length) return this.rule_result_messages;

    const summary = this.element_results_summary;

    let messages = [];
    let message = "";

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
        if (this.isRuleRequired())  message = "V: ";
        else message = "W: ";

        if (failures === 1) message += this.getMessage('FAIL_S');
        else message += this.getMessage('FAIL_P');
        messages.push(message);
      }

      if (summary.manual_checks > 0) {
        if (summary.manual_checks === 1) message = "MC: " + this.getMessage('MANUAL_CHECK_S');
        else message = "MC: " + this.getMessage('MANUAL_CHECK_P');
        messages.push(message);
      }

    }

    if (summary.hidden > 0) {
      if (summary.hidden === 1) message = "H: " + this.getMessage('HIDDEN_S');
      else message = "H: " + this.getMessage('HIDDEN_P');
      messages.push(message);
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
    const last = messages.length - 1;
    let message = "";

    messages.forEach( (m, index) => {
      if (index < last) {
        message += m + '; ';
      } else {
        message += m;
      }
    });
    return message;

  }

  /**
   * @method getElementResultsArray
   *
   * @desc Returns an array of element results in severity order
   *
   * @return {Array} Returns a array of element results
   */

  getElementResultsArray   () {

    function addElementResults(items) {
      let i;
      const len = items.length;

      for (i = 0; i < len; i++) {
        element_results.push(items[i]);
      }
    }

    let element_results = [];

    addElementResults(this.element_results_passed);
    addElementResults(this.element_results_violations);
    addElementResults(this.element_results_warnings);
    addElementResults(this.element_results_manual_checks);
    addElementResults(this.element_results_hidden);

    return element_results;
  }


  /**
   * @method addResult
   *
   * @desc Adds a result of an evaluation of rule on a node in the dom
   *
   * @param  {Number}  test_result         - Number representing if a node passed, failed, manual check or other test result
   * @param  {Object}  cache_item          - Reference to cache item associated with the test
   * @param  {String}  message_id          - Reference to the message string in the NLS file
   * @param  {Array}   message_arguements  - Array of values used in the message string
   * @param  {String}  element_identifier  - String identifying the element (Optional)
   */

  addResult   (test_result, cache_item, message_id, message_arguments, element_identifier) {

    if (!cache_item) return;

    var dom_element_item = null;

    if (cache_item.dom_element) {
      dom_element_item = cache_item.dom_element;
    }
    else {
      dom_element_item = cache_item;
    }

    dom_element_item.has_rule_results = true;

    var element_result_value = ELEMENT_RESULT_VALUE.NONE;

    switch (test_result) {

    case TEST_RESULT.PASS:
      element_result_value = ELEMENT_RESULT_VALUE.PASS;
      break;

    case TEST_RESULT.FAIL:
      if (this.isRuleRequired()) element_result_value = ELEMENT_RESULT_VALUE.VIOLATION;
      else element_result_value = ELEMENT_RESULT_VALUE.WARNING;
      break;

    case TEST_RESULT.MANUAL_CHECK:
      element_result_value = ELEMENT_RESULT_VALUE.MANUAL_CHECK;
      break;

    case TEST_RESULT.HIDDEN:
      element_result_value = ELEMENT_RESULT_VALUE.HIDDEN;
      break;

    default:

      break;
    }

    var element_result = new ElementResult(this, element_result_value, cache_item, message_id, message_arguments, element_identifier);

    switch (element_result_value) {

    case ELEMENT_RESULT_VALUE.HIDDEN:
      this.element_results_hidden.push(element_result);
      if (dom_element_item)  dom_element_item.rules_hidden.push(element_result);
      this.element_results_summary.addHidden(1);
      break;

    case ELEMENT_RESULT_VALUE.PASS:
      this.element_results_passed.push(element_result);
      if (dom_element_item) dom_element_item.rules_passed.push(element_result);
      this.element_results_summary.addPassed(1);
      break;

    case ELEMENT_RESULT_VALUE.VIOLATION:
      this.element_results_violations.push(element_result);
      if (dom_element_item) dom_element_item.rules_violations.push(element_result);
      this.element_results_summary.addViolations(1);
      break;

    case ELEMENT_RESULT_VALUE.WARNING:
      this.element_results_warnings.push(element_result);
      if (dom_element_item) dom_element_item.rules_warnings.push(element_result);
      this.element_results_summary.addWarnings(1);
      break;

    case ELEMENT_RESULT_VALUE.MANUAL_CHECK:
      this.element_results_manual_checks.push(element_result);
      if (dom_element_item) dom_element_item.rules_manual_checks.push(element_result);
      this.element_results_summary.addManualChecks(1);
      break;

    default:
      break;
    } // end switch

  }

  /**
   * @method isRuleRequired
   *
   * @desc Tests whether the rule is a required or recommended rule in this ruleset
   *
   * @return {Boolean}  True if rule is a required rule, false if a recommended rule
   */

  isRuleRequired   () {
    return this.rule.rule_required;
  }

  /**
   * @method isRuleRequiredNLS
   *
   * @desc Returns 'Yes' or "No' depending on whether the rule is required or recommended rule
   *
   * @return {String} Returns "Yes" if required, otherwise "No"
   */

  isRuleRequiredNLS   () {
    return this.isRuleRequired() ? 'Yes' : 'No';

  }

/**
 * @method getRuleDefinition
 *
 * @desc Gets the definition of the rule
 *
 * @return {String} Localized string of the rule definition based on being
 *                  required or recommended
 */
  getRuleDefinition   () {

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
   * @method getWCAG20Level
   *
   * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG 2.0 success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAG20Level   () {
    return this.rule.getWCAG20Level();
  }

  /**
   * @method getWCAG20LevelNLS
   *
   * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
   *       based on the primary id of the rule
   *
   * @return  {String}  String representing the WCAG 2.0 success criterion level
   *                    (i.e. A, AA or AAA)
   */

  getWCAG20LevelNLS   () {
    return this.rule.getWCAG20Level();
  }

  /**
   * @method getRuleScope
   *
   * @desc Get the rule scope constant of the rule
   *
   * @return {Number} rule scope constant
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
   * @method toJSON
   *
   * @desc Returns a JSON representation of the cache item
   *
   * @param {String}  prefix  -  A prefix string typically spaces
   * @param {Boolean} flag    -  if true include element result details
   *
   * @return  {String}  String representing the cache item result object
   */

  toJSON = function(prefix, flag) {

    if (typeof flag !== 'boolean') flag = false;

    let next_prefix = "";
    let next_prefix_2 = "";

    if (typeof prefix !== 'string' || prefix.length === 0) {
      prefix = "";
    }
    else {
      next_prefix = prefix + "  ";
      next_prefix_2 = next_prefix + "  ";
    }

    let json = "";
    const summary  = this.getElementResultsSummary();

    json += prefix + "{ \"rule_id\"               : \"" + this.rule.getId()                            + "\",\n";
    json += prefix + "  \"rule_summary\"          :   " + JSON.stringify(this.getRuleSummary())   + ",\n";
    json += prefix + "  \"success_criteria_nls\"  : \"" + this.rule.getPrimarySuccessCriterion().title + "\",\n";
    json += prefix + "  \"success_criteria_code\" : \"" + this.rule.getPrimarySuccessCriterion().id    + "\",\n";
    json += prefix + "  \"guideline_nls\"         : \"" + this.rule.getGuidelineInfo().title           + "\",\n";
    json += prefix + "  \"guideline_code\"        : \"" + this.rule.getGuidelineInfo().id              + "\",\n";
    json += prefix + "  \"rule_category_nls\"     : \"" + this.rule.getCategoryInfo().title            + "\",\n";
    json += prefix + "  \"rule_category_code\"    : "   + this.rule.getCategory()                      + ",\n";
    json += prefix + "  \"rule_scope_code_nls\"   : \"" + this.rule.getScopeNLS()                      + "\",\n";
    json += prefix + "  \"rule_scope_code\"       : "   + this.rule.getScope()                         + ",\n";
    json += prefix + "  \"rule_group_code_nls\"   : \"" + this.rule.getGroupNLS()                      + "\",\n";
    json += prefix + "  \"rule_group_code\"       : "   + this.rule.getGroup()                         + ",\n";
    json += prefix + "  \"result_message\"        :   " + JSON.stringify(this.getResultMessage()) + ",\n";
    json += prefix + "  \"result_value_nls\"      : \"" + this.getResultValueNLS()                + "\",\n";
    json += prefix + "  \"result_value\"          : "   + this.getResultValue()                   + ",\n";

    json += prefix + "  \"rule_required\"         : "   + this.isRuleRequired()          + ",\n";
    json += prefix + "  \"has_hidden\"            : "   + this.hasHiddenElementResults() + ",\n";

    json += prefix + "  \"implementation_score\"  : "   + this.getImplementationScore() + ",\n";
    json += prefix + "  \"implementation_value\"  : "   + this.getImplementationValue() + ",\n";
    json += prefix + "  \"implementation_nls\"    : \"" + this.getImplementationValueNLS()   + "\",\n";

    json += prefix + "  \"elements_passed\"       : "   + summary.passed                     + ",\n";
    json += prefix + "  \"elements_violation\"    : "   + summary.violations                 + ",\n";
    json += prefix + "  \"elements_warning\"      : "   + summary.warnings                   + ",\n";
    json += prefix + "  \"elements_failure\"      : "   + (summary.violations + summary.warnings)  + ",\n";
    json += prefix + "  \"elements_manual_check\" : "   + summary.manual_checks              + ",\n";
    json += prefix + "  \"elements_hidden\"       : "   + summary.hidden;

    if (flag) {
      json += ",\n";
      const comma_count = element_results.length - 1;

      json += prefix + "  \"element_results\" : [\n";

      const element_results = this.getElementResults();

      element_results.forEach ( (er, index) => {
        if (index < comma_count) {
          json += er.toJSON(next_prefix_2) + ',\n';
        }
        else {
          json += er.toJSON(next_prefix_2) + ',';
        }
      });
      json += prefix + "  ]\n";
    }
    else {
      json += "\n";
    }
    json += prefix + "}";
    return json;
  }

  /**
   * @method toString
   *
   * @desc Creates a text string representation of the rule result object
   *
   * @return {String} Returns a text string representation of the rule result object
   */

  toString () {
    return this.getRuleDefinition() + " (" + this.element_results_summary + ")";
  }

}
