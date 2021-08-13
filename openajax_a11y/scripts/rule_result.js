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
/*                             RuleResult                           */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a ruleset rule
 *
 * @param  {RuleMapping}  rule_mapping  - RuleMapping object
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {String}  message  -  String message of rule implementation and correction
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

OpenAjax.a11y.RuleResult = function (rule_mapping) {

  this.rule = rule_mapping.rule;

  this.element_results_passed         = [];
  this.element_results_violations     = [];
  this.element_results_warnings       = [];
  this.element_results_manual_checks  = [];
  this.element_results_hidden         = [];

  this.element_results_summary = new OpenAjax.a11y.info.ElementResultsSummary();

  this.rule_required       = rule_mapping.required;

  this.rule_result_messages = [];

  this.implementation_score = -1;
  this.implementation_value = OpenAjax.a11y.IMPLEMENTATION_VALUE.UNDEFINED;
  this.implementation_nls   = "";
};

 /**
 * @method hasElementResults
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc True if at least one element result is a violation, warning, manual check or pass,
 *       otherwise false if no element results or all element results are hidden
 *
 * @return {Boolean} see description
 */

OpenAjax.a11y.RuleResult.prototype.hasElemetResults = function () {

   var ers = this.element_results_summary;

   if (ers.violations || ers.warnings || ers.manual_checks || ers.passed) return true;

   return false;

};


 /**
 * @method hasHiddenElementResults
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc True if at least one element result is a hidden,
 *       otherwise false if no element results or all element results are hidden
 *
 * @return {Boolean} see description
 */

OpenAjax.a11y.RuleResult.prototype.hasHiddenElementResults = function () {

   return (this.element_results_summary.hidden > 0);

};

 /**
 * @method getImplementationScore
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a number between 0 - 100 indicating the level of
 *       implementation the violations, warnings and passed element results
 *
 * @return {Number} see description
 */

OpenAjax.a11y.RuleResult.prototype.getImplementationScore = function () {

  if (this.implementation_score < 0) {
    var ers = this.getElementResultsSummary();

//    var f = ers.violations + ers.warnings + ers.manual_checks;
    var f = ers.violations + ers.warnings;
    var p = ers.passed;
    var t = f + p;

    if (t) {
      var score = Math.round((100*p)/t);
      if ((score === 100) && (f > 0)) score = 99;
      this.implementation_score = score;
    }

//    OpenAjax.a11y.logger.debug("CALC OF IS   f: " + f + " p: " + p + " t: " + t + " (" + ers.toString() + ")");
  }

// OpenAjax.a11y.logger.debug("Implementation Score: " + this.implementation_score + " (" + this.getRule().getRuleId() + ")");

  return this.implementation_score;

};

 /**
 * @method getImplementationValue
 *
 * @memberOf OpenAjax.a11y.RuleResult
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
 * @return {Number} see description
 */

OpenAjax.a11y.RuleResult.prototype.getImplementationValue = function () {

  var IMPLEMENTATION_VALUE = OpenAjax.a11y.IMPLEMENTATION_VALUE;

  if (this.implementation_value === IMPLEMENTATION_VALUE.UNDEFINED) {

    var ers = this.getElementResultsSummary();

    var is  = this.getImplementationScore();

    var iv = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    if (ers.manual_checks > 0) iv = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;

    if (is === 100) {

      if (ers.manual_checks > 0) iv = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
      else iv = IMPLEMENTATION_VALUE.COMPLETE;

    } else {
      if (is > 95) iv = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
      else if (is > 50) iv = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
      else if (is >= 0) iv = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;
    }
    this.implementation_value = iv;
  }

  return this.implementation_value;

};

 /**
 * @method getImplementationValueNLS
 *
 * @memberOf OpenAjax.a11y.RuleResult
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

OpenAjax.a11y.RuleResult.prototype.getImplementationValueNLS = function () {

  var IMPLEMENTATION_VALUE = OpenAjax.a11y.IMPLEMENTATION_VALUE;

  if (this.implementation_nls === "") {
    var iv = this.getImplementationValue();
    var nls = "Undefined";

    if (iv === IMPLEMENTATION_VALUE.NOT_APPLICABLE)                   nls = "Not Applicable";
    else if (iv === IMPLEMENTATION_VALUE.NOT_IMPLEMENTED)             nls = "Not Implemented";
    else if (iv === IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION)      nls = "Partial Implementation";
    else if (iv === IMPLEMENTATION_VALUE.ALMOST_COMPLETE)             nls = "Almost Complete";
    else if (iv === IMPLEMENTATION_VALUE.COMPLETE)                    nls = "Complete";
    else if (iv === IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS) nls = "Complete with Manual Checks";
    else if (iv === IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY)          nls = "Manual Checks Only";

    this.implementation_nls = nls;
  }

  return this.implementation_nls;

};

 /**
 * @method getElementResultsSummary
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets numerical summary information about the element results
 *
 * @return {ElementResultSummary} Returns the ElementResultsSummary object
 */
OpenAjax.a11y.RuleResult.prototype.getElementResultsSummary = function () {

  return this.element_results_summary;

};



 /**
 * @method getResultValue
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets the rule result value based on element results:<br/>
 *         OpenAjax.a11y.RULE_RESULT_VALUE.VIOLATION<br/>
 *         OpenAjax.a11y.RULE_RESULT_VALUE.WARNING<br/>
 *         OpenAjax.a11y.RULE_RESULT_VALUE.MANUAL_CHECK<br/>
 *         OpenAjax.a11y.RULE_RESULT_VALUE.PASSED<br/>
 *         OpenAjax.a11y.RULE_RESULT_VALUE.NOT_APPLICABLE <br/>
 *
 * @return {RULE_RESULT_VALUE} Returns a rule result value constant
 */
OpenAjax.a11y.RuleResult.prototype.getResultValue = function () {

  var RULE_RESULT_VALUE    = OpenAjax.a11y.RULE_RESULT_VALUE;

  var ers = this.getElementResultsSummary();

  if (ers.violations) return RULE_RESULT_VALUE.VIOLATION;
  else if (ers.warnings) return RULE_RESULT_VALUE.WARNING;
  else if (ers.manual_checks) return RULE_RESULT_VALUE.MANUAL_CHECK;
  else if (ers.passed) return RULE_RESULT_VALUE.PASS;

  return RULE_RESULT_VALUE.NOT_APPLICABLE;

};


 /**
 * @method getResultValueNLS
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets a string representation of the rule result value: <br/>
 *         'V'<br/>
 *         'W'<br/>
 *         'MC'<br/>
 *         'P'<br/>
 *         'n/a'<br/>
 *
 * @return {String} Returns a string representing the rule result value
 */
OpenAjax.a11y.RuleResult.prototype.getResultValueNLS = function () {

  var ers = this.getElementResultsSummary();

  if (ers.violations)         return 'V';
  else if (ers.warnings)      return 'W';
  else if (ers.manual_checks) return 'MC';
  else if (ers.passed)        return 'P';

  return 'N/A';

};
 /**
 * @method getMessage
 * @private
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Generates a localized rule result message
 *
 * @param {String}  id      -  Id of the rule result message string
 * @param {String}  prefix  -  Prefix message for the string
 *
 * @return {String} Strings with rule result message
 */
OpenAjax.a11y.RuleResult.prototype.getMessage = function (id, prefix) {

  if (typeof prefix !== 'string') prefix = "";

  var rule = this.getRule();

  var rule_nls   = rule.getNLS();
  var common_nls = rule.getCommonNLS();
  var rule_id    = rule.getId();

//  OpenAjax.a11y.logger.debug("[RuleResult]    rule nls: " +  rule_nls['ID']);
//  OpenAjax.a11y.logger.debug("[RuleResult]     rule id: " +  rule_id);
//  OpenAjax.a11y.logger.debug("[RuleResult]  message id: " +  id);
//  OpenAjax.a11y.logger.debug("[RuleResult]   messages : " +  typeof rule_nls['RULE_RESULT_MESSAGES']);

  var message = rule_nls['RULE_RESULT_MESSAGES'][id];

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

  var replaceAll = OpenAjax.a11y.util.replaceAll;

  var failures = rs.violations + rs.warnings;
  var total    = rs.violations + rs.warnings + rs.passed;

  message = replaceAll(message, "%N_F",  failures.toString());

  message = replaceAll(message, "%N_P",  rs.passed.toString());

  message = replaceAll(message, "%N_T",  (total + rs.manual_checks).toString());

  message = replaceAll(message, "%N_MC", rs.manual_checks.toString());

  message = replaceAll(message, "%N_H",  rs.hidden.toString());

  message = OpenAjax.a11y.util.transformElementMarkup(message);

  return message;

};


 /**
 * @method getResultMessagesArray
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Generates a localized rule result messages
 *
 * @return {Array} An array of strings with rule result messages
 *                 (typically only one string in the array)
 */

OpenAjax.a11y.RuleResult.prototype.getResultMessagesArray = function () {

  // If the messages already exist, just return them
  if (this.rule_result_messages.length) return this.rule_result_messages;

  var ers = this.element_results_summary;

  var messages = [];
  var m = "";

  var failures = ers.violations + ers.warnings;

  if (!failures && !ers.manual_checks) {

   if (ers.passed === 0) messages.push(this.getMessage('NOT_APPLICABLE'));
   else messages.push(this.getMessage('ACTION_NONE'));

  }
  else {

    if (failures > 0) {
      if (this.rule_required)  m = "V: ";
      else m = "W: ";

      if (failures === 1) m += this.getMessage('FAIL_S');
      else m += this.getMessage('FAIL_P');
      messages.push(m);
    }

    if (ers.manual_checks > 0) {
      if (ers.manual_checks === 1) m = "MC: " + this.getMessage('MANUAL_CHECK_S');
      else m = "MC: " + this.getMessage('MANUAL_CHECK_P');
      messages.push(m);
    }

  }

  if (ers.hidden > 0) {
    if (ers.hidden === 1) m = "H: " + this.getMessage('HIDDEN_S');
    else m = "H: " + this.getMessage('HIDDEN_P');
    messages.push(m);
  }

  this.messages = messages;

  return messages;

};

 /**
 * @method getResultMessage
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Generates a localized rule result messages
 *
 * @return {String} Returns a single string with all result messages
 */

OpenAjax.a11y.RuleResult.prototype.getResultMessage = function () {

  var messages = this.getResultMessagesArray();
  var last = messages.length - 1;
  var m = "";

  for (var i = 0; i < messages.length; i++ ) {
    m += messages[i];
    if (i < last) m += "; ";
  }

  return m;

};

 /**
 * @method getPrimaryLabel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets a string identifying the primary attribute or property
 *
 * @return {String} see description
 */

OpenAjax.a11y.RuleResult.prototype.getPrimaryLabel = function () {

  var r = this.getRule();
  var pp = r.getTargetResourcePrimaryProperty();

  var label = "";

  if ((typeof pp === 'string') && pp.length) {
    label = OpenAjax.a11y.nls.Cache.getLabelNLS(pp).label;
  }

  return label;

};


/**
 * @method getElementResultsArray
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an array of element results in severity order
 *
 * @return {Array} Returns a array of element results
 */

OpenAjax.a11y.RuleResult.prototype.getElementResultsArray = function () {

  function addElementResults(items) {
    var i;
    var len = items.length;

    for (i = 0; i < len; i++) {
      element_results.push(items[i]);
    }
  }

  var element_results = [];

  addElementResults(this.element_results_passed);
  addElementResults(this.element_results_violations);
  addElementResults(this.element_results_warnings);
  addElementResults(this.element_results_manual_checks);
  addElementResults(this.element_results_hidden);

  return element_results;

};


/**
 * @method addResult
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Adds a result of an evaluation of rule on a node in the dom
 *
 * @param  {Number}  test_result         - Number representing if a node passed, failed, manual check or other test result
 * @param  {Object}  cache_item          - Reference to cache item associated with the test
 * @param  {String}  message_id          - Reference to the message string in the NLS file
 * @param  {Array}   message_arguements  - Array of values used in the message string
 * @param  {String}  element_identifier  - String identifying the element (Optional)
 */

OpenAjax.a11y.RuleResult.prototype.addResult = function (test_result, cache_item, message_id, message_arguments, element_identifier) {

  var ELEMENT_RESULT_VALUE    = OpenAjax.a11y.ELEMENT_RESULT_VALUE;
  var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

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
    if (this.rule_required) element_result_value = ELEMENT_RESULT_VALUE.VIOLATION;
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

  var element_result = new OpenAjax.a11y.ElementResult(this, element_result_value, cache_item, message_id, message_arguments, element_identifier);

//  OpenAjax.a11y.logger.debug("  ADD RESULT - text result: " + test_result + " cache item: " + cache_item + "  msg ID: " + message_id + " args: " + message_arguments);

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

};

/**
 * @method isRuleRequired
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Tests whether the rule is a required or recommended rule in this ruleset
 *
 * @return {Boolean}  True if rule is a required rule, false if a recommended rule
 */

OpenAjax.a11y.RuleResult.prototype.isRuleRequired = function () {

  return this.rule_required;

};

/**
 * @method isRuleRequiredNLS
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns 'Yes' or "No' depending on whether the rule is required or recommended rule
 *
 * @return {String} Returns "Yes" if required, otherwise "No"
 */

OpenAjax.a11y.RuleResult.prototype.isRuleRequiredNLS = function () {

  return OpenAjax.a11y.nls.Cache.getYesNoNLS(this.isRuleRequired());

};

/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Get information about the rule
 *
 * @return {Rule} Rule Object
 */

OpenAjax.a11y.RuleResult.prototype.getRule = function () {

  return this.rule;

};


/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets the definition of the rule
 *
 * @return {String} Localized string of the rule definition based on being
 *                  required or recommended
 */
OpenAjax.a11y.RuleResult.prototype.getRuleDefinition = function () {

  return this.getRule().getDefinition(this.rule_required);

};

/**
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Gets the summary of the rule
 *
 * @return {String} Localized string of the rule summary based on being
 *                  required or recommended
 */

OpenAjax.a11y.RuleResult.prototype.getRuleSummary = function () {

  return this.getRule().getSummary(this.rule_required);

};



/**
 * @method getWCAG20Level
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
 *       based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level
 *                    (i.e. A, AA or AAA)
 */

OpenAjax.a11y.RuleResult.prototype.getWCAG20Level = function () {

  return this.getRule().getWCAG20Level();

};

/**
 * @method getWCAG20LevelNLS
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Get the string representation of the the WCAG 2.0 Success Criterion Level
 *       based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level
 *                    (i.e. A, AA or AAA)
 */

OpenAjax.a11y.RuleResult.prototype.getWCAG20LevelNLS = function () {

  return this.getRule().getWCAG20Level();

};

/**
 * @method getRuleScope
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Get the rule scope constant of the rule
 *
 * @return {Number} rule scope constant
 */

OpenAjax.a11y.RuleResult.prototype.getRuleScope = function () {

  return this.getRule().getScope();

};

/**
 * @method getRuleScopeNLS
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Get a localized string of the rule scope (i.e. 'element' or 'page')
 *
 * @return {String} Localized string of the rule scope
 */

OpenAjax.a11y.RuleResult.prototype.getRuleScopeNLS = function () {

  return this.getRule().getScopeNLS();

};




/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a JSON representation of the cache item
 *
 * @param {String}  prefix  -  A prefix string typically spaces
 * @param {Boolean} flag    -  if true include node result details
 *
 * @return  {String}  String representing the cache item result object
 */

OpenAjax.a11y.RuleResult.prototype.toJSON = function(prefix, flag) {

  if (typeof flag !== 'boolean') flag = false;

  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else {
    next_prefix = prefix + "  ";
    next_prefix_2 = next_prefix + "  ";
  }

  var i;
  var json = "";
  var rule = this.getRule();
  var ers  = this.getElementResultsSummary();

  json += prefix + "{ \"rule_id\"               : \"" + rule.getId()                            + "\",\n";
  json += prefix + "  \"rule_summary\"          :   " + JSON.stringify(this.getRuleSummary())   + ",\n";
  json += prefix + "  \"success_criteria_nls\"  : \"" + rule.getPrimarySuccessCriterion().title + "\",\n";
  json += prefix + "  \"success_criteria_code\" : \"" + rule.getPrimarySuccessCriterion().id    + "\",\n";
  json += prefix + "  \"guideline_nls\"         : \"" + rule.getGuidelineInfo().title           + "\",\n";
  json += prefix + "  \"guideline_code\"        : \"" + rule.getGuidelineInfo().id              + "\",\n";
  json += prefix + "  \"rule_category_nls\"     : \"" + rule.getCategoryInfo().title            + "\",\n";
  json += prefix + "  \"rule_category_code\"    : "   + rule.getCategory()                      + ",\n";
  json += prefix + "  \"rule_scope_code_nls\"   : \"" + rule.getScopeNLS()                      + "\",\n";
  json += prefix + "  \"rule_scope_code\"       : "   + rule.getScope()                         + ",\n";
  json += prefix + "  \"rule_group_code_nls\"   : \"" + rule.getGroupNLS()                      + "\",\n";
  json += prefix + "  \"rule_group_code\"       : "   + rule.getGroup()                         + ",\n";
  json += prefix + "  \"result_message\"        :   " + JSON.stringify(this.getResultMessage()) + ",\n";
  json += prefix + "  \"result_value_nls\"      : \"" + this.getResultValueNLS()                + "\",\n";
  json += prefix + "  \"result_value\"          : "   + this.getResultValue()                   + ",\n";

  json += prefix + "  \"rule_required\"         : "   + this.isRuleRequired()          + ",\n";
  json += prefix + "  \"has_hidden\"            : "   + this.hasHiddenElementResults() + ",\n";

  json += prefix + "  \"implementation_score\"  : "   + this.getImplementationScore() + ",\n";
  json += prefix + "  \"implementation_value\"  : "   + this.getImplementationValue() + ",\n";
  json += prefix + "  \"implementation_nls\"    : \"" + this.getImplementationValueNLS()   + "\",\n";

  json += prefix + "  \"elements_passed\"       : "   + ers.passed                     + ",\n";
  json += prefix + "  \"elements_violation\"    : "   + ers.violations                 + ",\n";
  json += prefix + "  \"elements_warning\"      : "   + ers.warnings                   + ",\n";
  json += prefix + "  \"elements_failure\"      : "   + (ers.violations+ers.warnings)  + ",\n";
  json += prefix + "  \"elements_manual_check\" : "   + ers.manual_checks              + ",\n";
  json += prefix + "  \"elements_hidden\"       : "   + ers.hidden;

  if (flag) {
    json += ",\n";

    var element_results     = this.getElementResultsArray();
    var element_results_len = element_results.length;
    var comma_count         = element_results_len - 1;

    json += prefix + "  \"element_results\" : [\n";
    for (i = 0; i < element_results_len; i++) {
      json += element_results[i].toJSON(next_prefix_2);
      if (i < comma_count) json += ",\n";
      else json += "\n";
    }
    json += prefix + "  ]\n";
  }
  else {
    json += "\n";
  }

  json += prefix + "}";

  return json;

};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a text string representation of the rule result object
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.RuleResult.prototype.toString = function () {

 return this.getRuleDefinition() + " (" + this.element_results_summary + ")";

};

