/* constants.js */

import DebugLogging  from './debug.js';

/* Constants */
const debug = new DebugLogging('constants', false)

export {
  ELEMENT_RESULT_VALUE,
  IMPLEMENTATION_VALUE,
  REFERENCES,
  RULESET,
  RULE_CATEGORIES,
  RULE_RESULT_VALUE,
  RULE_SCOPE,
  TEST_RESULT,
  VERSION,
  WCAG_PRINCIPLE,
  WCAG_GUIDELINE,
  WCAG_SUCCESS_CRITERION,
  WCAG_LEVEL,
  getGuidelineId
}

const VERSION = '2.0.beta1';

/**
 * @constant RULESET
 * @type Number
 * @desc Constants related to the priority of learning a rule
 *       For example people new to accessibility would start
 *       with understanding TRIAGE rules and then moving to MORE
 *       and as they gain experience can use ALL
 *
 * @example
 * RULESET.TRIAGE
 * RULESET.MORE
 * RULESET.ALL
 */

const RULESET =  {
  TRIAGE: 1,
  MORE: 3,
  ALL:7
}

/**
 * @constant RULE_CATEGORIES * @type Number
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

const RULE_CATEGORIES = {
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
 * @constant RULE_SCOPE * @type Number
 * @desc Defines scope of a rule
 *
 * @example
 * RULE_SCOPE.UNKNOWN
 * RULE_SCOPE.ELEMENT
 * RULE_SCOPE.PAGE
 * RULE_SCOPE.WEBSITE
 */

const RULE_SCOPE =  {
  UNKNOWN : 0,
  ELEMENT : 1,
  PAGE    : 2,
  WEBSITE : 3
};

  /**
 * @constant TEST_RESULT * @type Number
 * @desc Types of rule results, used in validation functions
 *
 * @example
 * TEST_RESULT.FAIL
 * TEST_RESULT.HIDDEN
 * TEST_RESULT.MANUAL_CHECK
 * TEST_RESULT.NONE
 * TEST_RESULT.PASS
 */

const TEST_RESULT = {
  PASS         : 1,
  FAIL         : 2,
  MANUAL_CHECK : 3,
  HIDDEN       : 4,
  NONE         : 5
}

/**
 * @constant IMPLEMENTATION_VALUE * @type Number
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

const IMPLEMENTATION_VALUE = {
  UNDEFINED                   : 0,
  NOT_APPLICABLE              : 1,
  NOT_IMPLEMENTED             : 2,
  PARTIAL_IMPLEMENTATION      : 3,
  ALMOST_COMPLETE             : 4,
  COMPLETE                    : 5,
  COMPLETE_WITH_MANUAL_CHECKS : 6,
  MANUAL_CHECKS_ONLY          : 7
}

  /**
 * @constant ELEMENT_RESULT_VALUE * @type Number
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

const ELEMENT_RESULT_VALUE = {
  UNDEFINED      : 0,
  PASS           : 1,
  HIDDEN         : 2,  // Content is hidden and not tested for accessibility
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

/**
 * @constant RULE_RESULT_VALUE * @type Number
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

const RULE_RESULT_VALUE = {
  UNDEFINED      : 0,
  NOT_APPLICABLE : 1,
  PASS           : 2,
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
}

  /**
 * @constant WCAG_PRINCIPLE
 * @type Number
 * @desc Numercial constant representing a WCAG 2.0 Principles
 *
 * @example
 * WCAG_PRINCIPLE.P_1
 * WCAG_PRINCIPLE.P_2
 * WCAG_PRINCIPLE.P_3
 * WCAG_PRINCIPLE.P_4
 */
const WCAG_PRINCIPLE = {
  P_1          : 0x000001,
  P_2          : 0x000002,
  P_3          : 0x000004,
  P_4          : 0x000008,
  ALL          : 0x00000F
};

  /**
 * @constant WCAG_GUIDELINE
 * @type Number
 * @desc Numercial constant representing a WCAG 2.0 Guidelines
 *
 * @example
 * WCAG_GUIDELINE.G_1_1
 * WCAG_GUIDELINE.G_1_2
 * WCAG_GUIDELINE.G_1_3
 * WCAG_GUIDELINE.G_1_4
 * WCAG_GUIDELINE.G_2_1
 * WCAG_GUIDELINE.G_2_2
 * WCAG_GUIDELINE.G_2_3
 * WCAG_GUIDELINE.G_2_4
 * WCAG_GUIDELINE.G_3_1
 * WCAG_GUIDELINE.G_3_2
 * WCAG_GUIDELINE.G_3_3
 * WCAG_GUIDELINE.G_4_1
 */

const WCAG_GUIDELINE = {
  G_1_1          : 0x000010,
  G_1_2          : 0x000020,
  G_1_3          : 0x000040,
  G_1_4          : 0x000080,
  G_2_1          : 0x000100,
  G_2_2          : 0x000200,
  G_2_3          : 0x000400,
  G_2_4          : 0x000800,
  G_2_5          : 0x001000,
  G_3_1          : 0x002000,
  G_3_2          : 0x004000,
  G_3_3          : 0x008000,
  G_4_1          : 0x010000,
  ALL            : 0x01FFF0
}

/**
 * @constant WCAG_SUCCESS_CRITERION * @type Number
 * @desc Numercial constant representing a WCAG 2.x Success Criteria
 *
 * @example
 * WCAG_SUCCESS_CRITERION.SC_1_1_1
 * ....
 * WCAG_SUCCESS_CRITERION.SC_4_1_2
 */

const WCAG_SUCCESS_CRITERION = {
  SC_1_1_1          : 0x1101,
  SC_1_2_1          : 0x1201,
  SC_1_2_2          : 0x1202,
  SC_1_2_3          : 0x1203,
  SC_1_2_4          : 0x1204,
  SC_1_2_5          : 0x1205,
  SC_1_2_6          : 0x1206,
  SC_1_2_7          : 0x1207,
  SC_1_2_8          : 0x1208,
  SC_1_2_9          : 0x1209,
  SC_1_3_1          : 0x1301,
  SC_1_3_2          : 0x1302,
  SC_1_3_3          : 0x1303,
  SC_1_3_4          : 0x1304,
  SC_1_3_5          : 0x1305,
  SC_1_3_6          : 0x1306,
  SC_1_4_1          : 0x1401,
  SC_1_4_2          : 0x1402,
  SC_1_4_3          : 0x1403,
  SC_1_4_4          : 0x1404,
  SC_1_4_5          : 0x1405,
  SC_1_4_6          : 0x1406,
  SC_1_4_7          : 0x1407,
  SC_1_4_8          : 0x1408,
  SC_1_4_9          : 0x1409,
  SC_1_4_10         : 0x1410,
  SC_1_4_11         : 0x1411,
  SC_1_4_12         : 0x1412,
  SC_1_4_13         : 0x1413,
  SC_2_1_1          : 0x2101,
  SC_2_1_2          : 0x2102,
  SC_2_1_3          : 0x2103,
  SC_2_1_4          : 0x2104,
  SC_2_2_1          : 0x2201,
  SC_2_2_2          : 0x2202,
  SC_2_2_3          : 0x2203,
  SC_2_2_4          : 0x2204,
  SC_2_2_5          : 0x2205,
  SC_2_2_6          : 0x2206,
  SC_2_3_1          : 0x2301,
  SC_2_3_2          : 0x2302,
  SC_2_3_3          : 0x2303,
  SC_2_4_1          : 0x2401,
  SC_2_4_2          : 0x2402,
  SC_2_4_3          : 0x2403,
  SC_2_4_4          : 0x2404,
  SC_2_4_5          : 0x2405,
  SC_2_4_6          : 0x2406,
  SC_2_4_7          : 0x2407,
  SC_2_4_8          : 0x2408,
  SC_2_4_9          : 0x2409,
  SC_2_4_10         : 0x2410,
  SC_2_5_1          : 0x2501,
  SC_2_5_2          : 0x2502,
  SC_2_5_3          : 0x2503,
  SC_2_5_4          : 0x2504,
  SC_2_5_5          : 0x2505,
  SC_2_5_6          : 0x2506,
  SC_3_1_1          : 0x3101,
  SC_3_1_2          : 0x3102,
  SC_3_1_3          : 0x3103,
  SC_3_1_4          : 0x3104,
  SC_3_1_5          : 0x3105,
  SC_3_1_6          : 0x3106,
  SC_3_2_1          : 0x3201,
  SC_3_2_2          : 0x3202,
  SC_3_2_3          : 0x3203,
  SC_3_2_4          : 0x3204,
  SC_3_2_5          : 0x3205,
  SC_3_3_1          : 0x3301,
  SC_3_3_2          : 0x3302,
  SC_3_3_3          : 0x3303,
  SC_3_3_4          : 0x3304,
  SC_3_3_5          : 0x3305,
  SC_3_3_6          : 0x3306,
  SC_4_1_1          : 0x4101,
  SC_4_1_2          : 0x4102,
  SC_4_1_3          : 0x4103
}

/**
 * @constant REFERENCES
 * @type Number
 * @desc Types of reference for supplemential materials to help people understand an accessibility requirement and
 *       how to improve the accessibility
 *
 * @example
 * REFERENCES.UNKNOWN
 * REFERENCES.SPECIFICATION
 * REFERENCES.WCAG_TECHNIQUE
 * REFERENCES.TECHNIQUE
 * REFERENCES.EXAMPLE
 * REFERENCES.MANUAL_CHECK
 * REFERENCES.AUTHORING_TOOL
 * REFERENCES.OTHER
 */

const REFERENCES = {
  UNKNOWN         : 0,
  AUTHORING_TOOL  : 1,
  EXAMPLE         : 2,
  LIBRARY_PRODUCT : 3,
  MANUAL_CHECK    : 4,
  OTHER           : 5,
  PURPOSE         : 6,
  RULE_CATEGORY   : 7,
  REFERENCE       : 8,
  SPECIFICATION   : 9,
  TECHNIQUE       : 10,
  WCAG_TECHNIQUE  : 11
}

/**
 * @constant WCAG_LEVEL
 * @type Number
 * @desc Constants related to the level of importance of a success criteria
 *
 * @example
 * WCAG_LEVEL.A
 * WCAG_LEVEL.AA
 * WCAG_LEVEL.AAA
 */

const WCAG_LEVEL =  {
  A       : 4,
  AA      : 2,
  AAA     : 1,
  UNKNOWN : 0
}

/*  Constant helper functions */

/**
 * @function getGuidelineId
 *
 * @desc Returns constant identifying the WCAG Guideline
 *
 * @param {String} sc - String representing a success criteria (e.g. '2.4.1')
 *
 * @return {Integer}
 */

function getGuidelineId(sc) {
  debug.flag && debug.log(`[getGuidelineId][sc]: ${sc}`)
  const parts = sc.split('.');
  const gl = (parts.length === 3) ? `G_${parts[0]}_${parts[1]}` : ``;
  if (!gl) {
    return 0;
  }
  debug.flag && debug.log(`[getGuidelineId][gl]: ${gl}`)
  return WCAG_GUIDELINE[gl];
}
