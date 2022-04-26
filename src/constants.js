/* constants.js */

/**
 * @constant RULE_CATEGORIES
 * @type Number
 * @desc Numercial constant representing a rule category and is bit maskable
 *
 * @example
 * RULE_CATEGORIES.UNDEFINED
 * RULE_CATEGORIES.AUDIO_VIDEO
 * RULE_CATEGORIES.FORMS
 * RULE_CATEGORIES.HEADINGS
 * RULE_CATEGORIES.IMAGES
 * RULE_CATEGORIES.KEYBOARD_SUPPORT
 * RULE_CATEGORIES.LINKS
 * RULE_CATEGORIES.LANDMARKS
 * RULE_CATEGORIES.SITE_NAVIGATION
 * RULE_CATEGORIES.STYLES_READABILITY
 * RULE_CATEGORIES.TABLES
 * RULE_CATEGORIES.TIMING
 * RULE_CATEGORIES.WIDGETS_SCRIPTS
 */

export const RULE_CATEGORIES = {
  UNDEFINED              : 0x0000,
  LANDMARKS              : 0x0001,
  HEADINGS               : 0x0002,
  STYLES_READABILITY     : 0x0004,
  IMAGES                 : 0x0008,
  LINKS                  : 0x0010,
  TABLES                 : 0x0020,
  FORMS                  : 0x0040,
  WIDGETS_SCRIPTS        : 0x0080,
  AUDIO_VIDEO            : 0x0100,
  KEYBOARD_SUPPORT       : 0x0200,
  TIMING                 : 0x0400,
  SITE_NAVIGATION        : 0x0800,
  // Composite categories
  ALL                    : 0x0FFF
};

/**
 * @constant RULE_SCOPE
 * @type Number
 * @desc Defines scope of a rule
 *
 * @example
 * RULE_SCOPE.UNKNOWN
 * RULE_SCOPE.ELEMENT
 * RULE_SCOPE.PAGE
 * RULE_SCOPE.WEBSITE
 */

export const RULE_SCOPE =  {
  UNKNOWN : 0,
  ELEMENT : 1,
  PAGE    : 2,
  WEBSITE : 3
};

/**
 * @constant TEST_RESULT
 * @type Number
 * @desc Types of rule results, used in validation functions
 *
 * @example
 * TEST_RESULT.FAIL
 * TEST_RESULT.HIDDEN
 * TEST_RESULT.MANUAL_CHECK
 * TEST_RESULT.NONE
 * TEST_RESULT.PASS
 */

export const TEST_RESULT = {
  PASS         : 1,
  FAIL         : 2,
  MANUAL_CHECK : 3,
  HIDDEN       : 4,
  NONE         : 5
};

/**
 * @constant IMPLEMENTATION_VALUE
 * @type Number
 * @desc Constants used to represent the level of implementation
 *
 * @example
 * IMPLEMENTATION_VALUE.UNDEFINED
 * IMPLEMENTATION_VALUE.NOT_APPLICABLE
 * IMPLEMENTATION_VALUE.NOT_IMPLEMENTED
 * IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION
 * IMPLEMENTATION_VALUE.ALMOST_COMPLETE
 * IMPLEMENTATION_VALUE.COMPLETE
 * IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS
 * IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY
 */

export const IMPLEMENTATION_VALUE = {
  UNDEFINED                   : 0,
  NOT_APPLICABLE              : 1,
  NOT_IMPLEMENTED             : 2,
  PARTIAL_IMPLEMENTATION      : 3,
  ALMOST_COMPLETE             : 4,
  COMPLETE                    : 5,
  COMPLETE_WITH_MANUAL_CHECKS : 6,
  MANUAL_CHECKS_ONLY          : 7
};

/**
 * @constant ELEMENT_RESULT_VALUE
 * @type Number
 * @desc Constants used to represent evaluation results at the element level
 *
 * @example
 * ELEMENT_RESULT_VALUE.UNDEFINED
 * ELEMENT_RESULT_VALUE.PASS
 * ELEMENT_RESULT_VALUE.HIDDEN
 * ELEMENT_RESULT_VALUE.MANUAL_CHECK
 * ELEMENT_RESULT_VALUE.VIOLATION
 * ELEMENT_RESULT_VALUE.WARNING
 */
export const ELEMENT_RESULT_VALUE = {
  UNDEFINED      : 0,
  PASS           : 1,
  HIDDEN         : 2,  // Content is hidden and not tested for accessibility
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

/**
 * @constant RULE_RESULT_VALUE
 * @type Number
 * @desc Constants used to represent evaluation results at the rule level
 *
 * @example
 * RULE_RESULT_VALUE.UNDEFINED
 * RULE_RESULT_VALUE.NOT_APPLICABLE
 * RULE_RESULT_VALUE.PASS
 * RULE_RESULT_VALUE.MANUAL_CHECK
 * RULE_RESULT_VALUE.WARNING
 * RULE_RESULT_VALUE.VIOLATION
 */
export const RULE_RESULT_VALUE = {
  UNDEFINED      : 0,
  NOT_APPLICABLE : 1,
  PASS           : 2,
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

