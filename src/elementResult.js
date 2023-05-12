/* elementResult.js */

/* Imports */
import {RESULT_TYPE}  from './constants.js';
import BaseResult     from './baseResult.js';
import DebugLogging   from './debug.js';

/* Constants */

const debug = new DebugLogging('ElementResult', false);
debug.flag = false;

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

export default class ElementResult extends BaseResult {
  constructor (rule_result, result_value, domElement, message_id, message_arguments) {
    super(rule_result,
          result_value,
          message_id,
          message_arguments,
          domElement.getIdentifier());

    this.domElement = domElement;
    this.result_type    = RESULT_TYPE.ELEMENT;

    if (debug.flag) {
      debug.log(`${this.result_value}: ${this.result_message}`)
    }
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
    const de = this.domElement;
    const typeAttr = de.node.getAttribute('type');
    const identifier =  typeAttr ?
                        `${de.tagName}[type=${typeAttr}]` :
                        de.tagName;
    return identifier;
  }

  /**
   * @method getTagName
   *
   * @desc Gets a string identifying the elements tag
   *
   * @return {String} see description
   */

  getTagName () {
    return this.getResultIdentifier();
  }

  /**
   * @method getId
   *
   * @desc Gets a string identifying the elements id 
   *
   * @return {String} see description
   */

  getId () {
    let id = this.domElement.node.id;
    id = id ? '#' + id : '';
    return id;
  }

  /**
   * @method getClassName
   *
   * @desc Gets a string identifying the elements class names
   *
   * @return {String} see description
   */

  getClassName () {
    let names = this.domElement.node.classList.value;
    if (names) {
      names = '.' + names.replaceAll(' ', '.');
    }
    return names;
  }

  /**
   * @method getHasRole
   *
   * @desc True if the element has a role attribute, otherwise false
   *
   * @return {Boolean} see description
   */

  getHasRole () {
    return this.domElement.hasRole;
  }

  /**
   * @method getRole
   *
   * @desc Gets a string identifying the elements role
   *
   * @return {String} see description
   */

  getRole () {
    return this.domElement.role;
  }

  /**
   * @method getOrdinalPosition
   *
   * @desc Gets a string identifying the ordinal position,
   *       is overrided by ElementResult and PageResult
   *
   * @return {String} see description
   */

  getOrdinalPosition () {
    return this.domElement.ordinalPosition;
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
      name_required:   this.domElement.ariaInfo.isNameRequired,
      name_prohibited: this.domElement.ariaInfo.isNameProhibited,
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
  * @method getTableInfo
  *
  * @desc Gets table information
  *
  * @return {Object} Object with keys and values
  */
  getTableInfo () {
    const info = {};
    const te = this.domElement.tableElement;
    if (te) {
      info.type         = te.tableType;
      info.cell_count   = te.cellCount;
      info.header_count = te.headerCellCount;
    }
    return info;
  }

  /**
  * @method getTableCellHeaderInfo
  *
  * @desc Gets table header information for data cells
  *
  * @return {Object} Object with header keys and values
  */
  getTableCellHeaderInfo () {
    const info = {};
    const tableCell = this.domElement.tableCell;
    if (tableCell) {
      info.count   = tableCell.headers.length;
      info.headers = tableCell.headers.join(' | ');
      info.source  = tableCell.headerSource;
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


}
