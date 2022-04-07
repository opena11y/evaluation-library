/* aria.js */

/* Imports */
import DebugLogging     from '../debug.js';
import {ariaInfo} from '../aria/ariaInfo.js';

/* Constants */
const debug = new DebugLogging('AriaValidation', true);


class ariaAttribute {
  constructor (attr, value) {
    this.attr  = attr;
    this.value = value;
  }
}

/**
 * @class AriaValidation
 *
 * @desc Validates aria information for a dom node
 *
 * @param  {String}  role  - ARIA role for the element
 * @param  {Object}  node  - dom element node
 */

export default class AriaValidation {
  constructor (role, node) {

    this.isValidRole          = false;
    this.isNameRequired       = false;
    this.isNameProhibited     = false;
    this.hasName              = false;

    this.invalidAttrs         = [];
    this.invalidAttrValues    = []
    this.invalidRefs          = []
    this.missingRequiredAttrs = [];
    this.unsupportedAttrs     = [];
    this.deprecatedAttrs      = [];

  }
}
