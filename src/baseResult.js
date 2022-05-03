/* elementResult.js */

/* Imports */
import {
  getCommonMessage,
  getBaseResultMessage
} from './_locale/locale.js'

/* ---------------------------------------------------------------- */
/*                             BaseResult                           */
/* ---------------------------------------------------------------- */

/**
 * @class Result
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
  constructor (ruleResult, resultValue, msgId, msgArgs) {

    const msg = ruleResult.rule.base_result_msgs[msgId];

    this.rule_result    = ruleResult;
    this.result_value   = resultValue;
    this.result_message = getBaseResultMessage(msg, msgArgs);
  }

  /**
   * @getter isElementResult
   *
   * @desc Returns true, since this class is the base result class
   *       Use to distinguish from PageResult class
   *    
   * @return {Boolean} false
   */

  get isElementResult () {
    return false;
  }

  /**
   * @getter isPageResult
   *
   * @desc Returns false, since this class is the base result class
   *       Use to distinguish from ElementResult class
   *
   * @return {Boolean} false
   */

  get isPageResult () {
    return false;
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
    return 'undefined';
  }

  /**
   * @method getOrdinalPosition
   *
   * @desc Gets a string identifying the ordinal position,
   *       is overrided by ElementResult and not needed for
   *       PageResults
   *
   * @return {String} see @desc
   */

  getOrdinalPosition () {
    return '';
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
   * @desc Gets a string representation of the rule result value
   *
   * @return {String} see @desc
   */

  getResultValueNLS () {
    return getCommonMessage('ruleResult', this.result_value);
  }

 /**
   * @method getDataForJSON
   *
   * @desc Object containing the data for exporting result to JSON
   *
   * @return {Object} see @desc
   */

  getDataForJSON () {
    const data = {
      result_value:       this.getResultValue(),
      result_value_nls:   this.getResultValueNLS(),
      result_identifier:  this.getResultIdentifier(),
      ordinal_position:   this.getOrdinalPosition(),
      message:            this.result_message
    }
    return data;
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
