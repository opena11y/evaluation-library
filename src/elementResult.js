/* elementResult.js */

/* Imports */
import {ELEMENT_RESULT_VALUE} from './constants.js';
import {
  filterTextContent,
  transformElementMarkup
} from './utils/utils.js'
import DebugLogging  from './debug.js';

/* Constants */

const debug = new DebugLogging('elementResult', false);

/* ---------------------------------------------------------------- */
/*                             ElementResult                           */
/* ---------------------------------------------------------------- */

/**
 * @class ElementResult
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       domElement          - DOmElement reference to element information used by this rule result
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

export default class ElementResult {
  constrcutor (rule_result, result_value, domElement, message_id, message_arguments) {

    this.rule_result = rule_result;
    this.result_value   = result_value;
    this.result_message = "";

    this.message_id        = message_id;
    this.message_arguments = message_arguments;

    this.domElement = domElement;

    if (debug.flag) {
      debug.log(`${this.result_value}: ${this.result_message}`)
    }
  }

  /**
  * @method getHTMLAttributes
  *
  * @desc Gets common HTML attributes related to elements
  *       some elements have special props like alt
  *
  * @return {Object} with attribute name as key to attribute value
  */
  getHTMLAttributes () {
    return this.domElement.htmlAttrs;
  }

 /**
 * @method getAriaAttributes
 *
 * @desc Gets ARIA attributes
 *
  * @return {Object} with attribute name as key to attribute value
 */
  getAriaAttributes () {
    return this.domElement.ariaAttrs;
  }

 /**
 * @method getAccessibleNameInfo
 *
 * @desc Gets accessible name and description information
 *
 * @return {Object}
 */
  getAccessibleNameInfo () {
    const info = {
      name:            this.domElement.accName.name,
      name_source:     this.domElement.accName.source,
      name_required:   this.domElement.ariaValidation.isNameRequired,
      name_prohibited: this.domElement.ariaValidation.isNameProhibited,
    }
    return info;
  }

  /**
  * @method getColorContrastInfo
  *
  * @desc Gets color contrast information for an element result
  *
  * @return {Object} Object with color contrast keys and values
  */
  getColorContrastInfo () {
    const info = {};
    const rule = this.rule_result.getRule();

    if (rule && (rule.getId() === 'COLOR_1')) {
      const cc = this.domElement.colorContrast;
      if (cc) {
        info.color_contrast_ratio  = cc.colorContrastRatio;
        info.color                 = cc.color;
        info.color_hex             = '#' + cc.colorHex;
        info.background_color      = cc.backgroundColor;
        info.background_color_hex  = '#' + cc.backgroundColorHex;
        info.font_family           = cc.fontFamily;
        info.font_size             = cc.fontSize;
        info.font_weight           = cc.fontWeight;
        info.large_font            = cc.isLargeFont ? 'Yes' : 'no';
        info.background_image      = cc.backgroundImage;
        info.background_repeat     = cc.backgroundRepeat;
        info.background_position   = cc.backgroundPosition;
      }
    }
    return info;
  }

  /**
  * @method getVisibilityInfo
  *
  * @desc Gets visibility information for an element result
  *
  * @return {Object} Object with vibility keys and values
  */
  getVisibilityInfo () {
    var info = {};
    var cs;
    if (this.dom_element) {
      cs = this.dom_element.computed_style;
      if (cs) {
        info.graphical_rendering  = this.visibility[cs.is_visible_onscreen];
        info.assistive_technology = this.visibility[cs.is_visible_to_at];
      }
    }
    return info;
  }

  /**
   * @method getRuleResult
   *
   * @desc Gets the rule result that this element result is associated with.
   *       Provides access to rule and ruleset information if needed
   *
   * @return {Object} see description
   */
  getRuleResult () {
     return this.rule_result;
  }

  /**
   * @method getElementIdentifier
   *
   * @desc Gets a string identifying the element, typically element and//or a key attribute
   *       or property value
   *
   * @return {String} see description
   */

  getElementIdentifier () {
    return this.domElement.toString();
  }


  /**
   * @method getResultValue
   *
   * @desc Returns an numerical constant representing the element result
   *
   * @return {Number} see description
   */
   getResultValue () {
     return this.result_value;
   }

  /**
   * @method getResultValueNLS
   *
   * @desc Gets a string representation of the rule result value
   *
   * @return {String} see description
   */

  getResultValueNLS () {
    const elementResultNLS = ['Undefined','P','H','MC','W','V'];
    return elementResultNLS[this.result_value];
  }

  /**
   * @method getResultMessage
   *
   * @desc Returns an localized element result message
   *
   * @return {String} String with element result message
   */
  getResultMessage () {
    const rule       = this.getRuleResult().getRule();
    const rule_nls   = rule.getNLS();
    const common_nls = rule.getCommonNLS();
    let message;

    // If no message id return the empty string
    if (this.message_id.length === 0) return "";

    let str = rule_nls['NODE_RESULT_MESSAGES'][this.message_id];

    if (!str) return common_nls.missing_message + this.message_id;

    let vstr; // i.e. %1, %2 ....
    let message_arguments_len = this.message_arguments.length;

    // check to see if message has result value dependence

    vstr = "%s";

    if (str.indexOf(vstr) >= 0) {

      switch (this.result_value) {
        case ELEMENT_RESULT_VALUE.VIOLATION:
          message = common_nls.message_severities.MUST;
          break;

        case ELEMENT_RESULT_VALUE.WARNING:
          message = common_nls.message_severities.SHOULD;
          break;

        case ELEMENT_RESULT_VALUE.MANUAL_CHECK:
          message = common_nls.message_severities.MAY;
          break;

        default:
          message = "";
          break;
      }
      str = str.replace(vstr, message);
    }

    // Replace

    for (var i = 0; i < message_arguments_len; i++) {
      vstr = "%" + (i+1);
      message = this.message_arguments[i];

      if (typeof message === 'string') {
        message = filterTextContent(message);
      }
      else {
        if (typeof message === 'number') {
          message = message.toString();
        }
        else {
          message = "";
        }
      }
      str = str.replace(vstr, message);
    } // end loop

    return transformElementMarkup(str);

  }

  /**
   * @method toJSON
   *
   * @memberOf OpenAjax.a11y.ElementResult
   *
   * @desc Creates JSON object descibing the properties of the node result
   *
   * @param {String} prefix  -  A prefix string typically spaces
   *
   * @return String information about the node result
   */

  toJSON (prefix) {

    let json = "";

    const className = this.domElement.className;
    const id        = this.domElement.id;
    const position  = this.domElement.ordinalPosition;

    json += prefix + "{ \"result_value\"       : \"" + this.getResultValue()       + "\",\n";
    json += prefix + "  \"result_value_nls\"   : \"" + this.getResultValueNLS()    + "\",\n";
    json += prefix + "  \"element_identifier\" : " + JSON.stringify(this.getElementIdentifier()) + ",\n";
    json += prefix + "  \"ordinal_position\"   : " + position + ",\n";
    json += prefix + "  \"message\"            : " + JSON.stringify(this.getResultMessage()) + ",\n";
    json += prefix + "  \"class\"              : " + JSON.stringify(className) + ",\n";
    json += prefix + "  \"id\"                 : " + JSON.stringify(id) + "\n";
    json += prefix + "}";

    return json;
  }
}
