/* elementResult.js */

/* Imports */
import BaseResult               from './baseResult.js';
import DebugLogging             from './debug.js';

/* Constants */

const debug = new DebugLogging('PageResult', false);

/* ---------------------------------------------------------------- */
/*                             PageResult                           */
/* ---------------------------------------------------------------- */

/**
 * @class ElementResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       domCache            - DomCache reference to element information used by this rule result
 * @param  {String}       message_id          - String reference to the message string in the NLS file
 * @param  {Array}        message_arguments   - Array  array of values used in the message string
 * @param  {Array}        props               - Array of properties that are defined in the validation function (NOTE: typically undefined)
 * @param  {String}       elem_identifier     - String identifying the element (Optional)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     result_value        - Constant representing result value of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          - String reference to the message string in the NLS file
 * @property  {Array}      message_arguments   - Array  array of values used in the message string
 */

export default class PageResult extends BaseResult {
  constructor (rule_result, result_value, domCache, message_id, message_arguments) {
    super(rule_result, result_value, message_id, message_arguments)

    this.domCache = domCache;

    if (debug.flag) {
      debug.log(`${this.result_value}: ${this.result_message}`)
    }
  }

  /**
   * @getter isPageResult
   *
   * @desc Returns true, since this class is a PageResult
   *       Use to distinguish from ElementResult class
   *    
   * @return {Boolean} true
   */

  get isPageResult () {
    return true;
  }

  /**
   * @method getResultIdentifier
   *
   * @desc Gets a string identifying the element, typically element and//or a key attribute
   *       or property value
   *
   * @return {String} see description
   */

  getResultIdentifier () {
    return 'page';
  }

}
