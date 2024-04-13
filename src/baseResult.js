/* baseResult.js */

/* Imports */
import DebugLogging from './debug.js';
import {
  RESULT_TYPE,
  RESULT_VALUE
} from './constants.js';
import {
  getCommonMessage,
  getBaseResultMessage
} from './locale/locale.js'

/* constants */
const debug = new DebugLogging('baseResult', false);

/**
 * @class baseResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element or page
 *
 * @param  {ResultRule}   ruleResult   - reference to the rule result object
 * @param  {Number}       resultValue  - Constant representing result value of the evaluation result
 * @param  {String}       msgId        - String reference to the message string in the NLS file
 * @param  {Array}        msgArgs      - Array  array of values used in the message string
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result    - reference to the rule result object
 * @property  {Number}     result_value   - Constant representing result value of the evaluation result
 * @property  {String}     result_message - String reference to the message string in the NLS file
 */

export default class BaseResult {
  constructor (ruleResult, resultValue, msgId, msgArgs, result_identifier) {

    const msg = ruleResult.rule.base_result_msgs[msgId];

    this.result_type       = RESULT_TYPE.BASE;
    this.rule_result       = ruleResult;
    this.result_value      = resultValue;
    debug.flag && debug.log(`[  msgId]: ${msgId}`);
    debug.flag && debug.log(`[    msg]: ${msg}`);
    debug.flag && debug.log(`[msgArgs]: ${msgArgs}`);
    this.result_message    = getBaseResultMessage(msg, msgArgs);
    this.result_identifier = result_identifier;

  }

  /**
   * @getter isActionMessage
   *
   * @desc Returns true if the result is a violation, warning or manual check
   *    
   * @return {Boolean} see @desc
   */

  get isActionMessage () {
    return (this.result_value === RESULT_VALUE.VIOLATION) ||
           (this.result_value === RESULT_VALUE.WARNING) ||
           (this.result_value === RESULT_VALUE.MANUAL_CHECK);
  }

  /**
   * @getter isElementResult
   *
   * @desc Returns false by default, override in ElementResult def
   *    
   * @return {Boolean} see @desc
   */

  get isElementResult () {
    return false;
  }

  /**
   * @getter isPageResult
   *
   * @desc Returns false by default, override in PageResult def
   *
   * @return {Boolean} see @desc
   */

  get isPageResult () {
    return false;
  }

  /**
   * @getter isWebsiteResult
   *
   * @desc Returns false by default, override in WebsiteResult def
   *
   * @return {Boolean} see @desc
   */

  get isWebsiteResult () {
    return false;
  }

  /**
   * @method getResultType
   *
   * @desc Returns the result type: element, page or website
   *
   * @return {String} see @desc
   */
  getResultType () {
    return getCommonMessage('resultType', this.result_type);
  }

  /**
   * @method getRuleResult
   *
   * @desc Gets the rule result that this element result is associated with.
   *       Provides access to rule and ruleset information if needed
   *
   * @return {Object} see @desc
   */
  getRuleResult () {
     return this.rule_result;
  }

  /**
   * @method getElementIdentifier
   *
   * @desc Gets a string identifying the result,
   *       is overrided by ElementResult and PageResult
   *
   * @return {String} see @desc
   */

  getResultIdentifier () {
    return this.result_identifier;
  }

  /**
   * @method getResultValue
   *
   * @desc Returns an numerical constant representing the element result
   *
   * @return {Number} see @desc
   */
   getResultValue () {
     return this.result_value;
   }

  /**
   * @method getResultValueNLS
   *
   * @desc Gets a abbreviated string representing of the rule result value
   *
   * @return {String} see @desc
   */

  getResultValueNLS () {
    return getCommonMessage('baseResult', this.result_value);
  }

  /**
   * @method getResultValueLongNLS
   *
   * @desc Gets a verbose string representing of the rule result value
   *
   * @return {String} see @desc
   */

  getResultValueLongNLS () {
    return getCommonMessage('baseResultLong', this.result_value);
  }

  /**
   * @method getResultMessage
   *
   * @desc Gets a string representation of the result message
   *
   * @return {String} see @desc
   */

  getResultMessage () {
    return this.result_message;
  }
  
 /**
   * @method getDataForJSON
   *
   * @desc Object containing the data for exporting result to JSON
   *
   * @return {Object} see @desc
   */

  getDataForJSON () {
    return {
      result_type:        this.result_type,
      result_value:       this.result_value,
      result_value_nls:   this.result_value_nls,
      result_identifier:  this.result_identifier,
      message:            this.result_message
    }
  }

  /**
   * @method toJSON
   *
   * @desc Creates JSON object descibing the properties of the result
   *
   * @return {String} see @desc
   */

  toJSON () {
    return JSON.stringify(this.getDataForJSON(), null, '  ');
  }
}
