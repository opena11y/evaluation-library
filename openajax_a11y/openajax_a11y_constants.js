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

/*
 * Support IE and Node constant
 */


try {
    if (Node.ELEMENT_NODE != 1) {
        throw true;
    }
}
catch(e) {
    var Node = {
        ELEMENT_NODE:                1,
        ATTRIBUTE_NODE:              2,
        TEXT_NODE:                   3,
        CDATA_SECTION_NODE:          4,
        ENTITY_REFERENCE_NODE:       5,
        ENTITY_NODE:                 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE:                8,
        DOCUMENT_NODE:               9,
        DOCUMENT_TYPE_NODE:         10,
        DOCUMENT_FRAGMENT_NODE:     11,
        NOTATION_NODE:              12
    };
}

/* ---------------------------------------------------------------- */
/*                       OpenAjax Constants                         */
/* ---------------------------------------------------------------- */


/**
 * @namespace OpenAjax
 */

var OpenAjax = OpenAjax || {};

// export { OpenAjax };

/**
 * @namespace OpenAjax.a11y
 */

OpenAjax.a11y = OpenAjax.a11y || {};
OpenAjax.a11y.VERSION = "1.3.0";

/**
 * @method getVersion
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Get the current version of the evaluation library, rules and rulesets
 *
 * @return  {String}  Returns the version number of the evaluation library
 */

OpenAjax.a11y.getVersion = function () {
  return this.VERSION;
};

/**
 * @namespace OpenAjax.a11y.cache
 */

OpenAjax.a11y.cache = OpenAjax.a11y.cache || {};

/**
 * @namespace OpenAjax.a11y.nls
 */

OpenAjax.a11y.nls = OpenAjax.a11y.nls || {};

/**
 * @constant EVENT_HANDLER_PROCESSOR
 * @memberOf OpenAjax.a11y
 * @type String
 * @default 'none'
 * @desc Defines an event handler enumeration method
 *       Since there is no standard way to enumerate event handlers
 *       need to use proprietary methods to get event information.
 *
 *       Current support:
 *       'firefox'  : uses Firefox (Mozilla) component technology to get
 *                    event information
 *       'fae-util' : uses HTMLUnit features of fae-util to find event
 *                    information
 *       'none'     : disables gathering of event information and
 *                    therefore event related rules are not analyzed
 */
OpenAjax.a11y.EVENT_HANDLER_PROCESSOR = "none";

/**
 * @constant URL_TESTING_ENABLED
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 * @default false
 * @desc Enable or disable testing of broken links
 *       the default should be false, due to performance issues
 *       of testing links
 */
OpenAjax.a11y.URL_TESTING_ENABLED  = false;

/**
 * @constant SUPPORTS_URL_TESTING
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 * @default false
 * @desc If true the analysis engine supports URL testing
 */
OpenAjax.a11y.SUPPORTS_URL_TESTING = true;

/**
 * @constant DATA_TABLE_ASSUMPTION
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 * @default true
 * @desc If true assume table markup is for a data table
 *       If false assume table markup is for layout, unless header cells or other
 *       information indciates its a data table
 */
OpenAjax.a11y.DATA_TABLE_ASSUMPTION  = true;


/**
 * @constant ELEMENT_FORMATING
 * @memberOf OpenAjax.a11y
 * @type String
 * @default 'CAPS'
 * @desc Defines the formating of element names in NLS message strings
 */
OpenAjax.a11y.ELEMENT_FORMATING = 'CAPS';


/**
 * @constant RESULT_FILTER
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to filtering both node results and rule results
 * @example
 * OpenAjax.a11y.RESULT_FILTER.ALL
 * OpenAjax.a11y.RESULT_FILTER.PASS
 * OpenAjax.a11y.RESULT_FILTER.VIOLATION
 * OpenAjax.a11y.RESULT_FILTER.WARNING
 * OpenAjax.a11y.RESULT_FILTER.WEBSITE_MANUAL_CHECK
 * OpenAjax.a11y.RESULT_FILTER.ELEMENT_MANUAL_CHECK
 * OpenAjax.a11y.RESULT_FILTER.HIDDEN
 * OpenAjax.a11y.RESULT_FILTER.NA
 */
OpenAjax.a11y.RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER || {
  PASS                 : 0x0001,
  VIOLATION            : 0x0002,
  WARNING              : 0x0004,
  WEBSITE_MANUAL_CHECK : 0x0008,
  PAGE_MANUAL_CHECK    : 0x0010,
  ELEMENT_MANUAL_CHECK : 0x0020,
  MANUAL_CHECK         : 0x0038,
  HIDDEN               : 0x0040, // hidden only applies to node results
  NOT_APPLICABLE       : 0x0080,  // not applicable only applies to rule results
  PAGE                 : 0x0100,
  ALL                  : 0x01FF
};

/**
 * @constant DEFAULT_PREFS
 * @memberOf OpenAjax.a11y
 * @type Object
 * @desc Default setting for consumers of the OpenAjax cache
 */

OpenAjax.a11y.DEFAULT_PREFS = OpenAjax.a11y.DEFAULT_PREFS || {
  RULESET_ID     : "WCAG20_ARIA_TRANS",
  WCAG20_LEVEL   : 3,
  BROKEN_LINKS   : false
};


/**
 * @constant WCAG20_PRINCIPLE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a WCAG 2.0 Principles
 *
 * @example
 * OpenAjax.a11y.WCAG20_PRINCIPLE.P_1
 * OpenAjax.a11y.WCAG20_PRINCIPLE.P_2
 * OpenAjax.a11y.WCAG20_PRINCIPLE.P_3
 * OpenAjax.a11y.WCAG20_PRINCIPLE.P_4
 */
OpenAjax.a11y.WCAG20_PRINCIPLE = OpenAjax.a11y.WCAG20_PRINCIPLE || {
  P_1          : 0x000001,
  P_2          : 0x000002,
  P_3          : 0x000004,
  P_4          : 0x000008,
  ALL          : 0x00000F
};

/**
 * @constant WCAG20_GUIDELINE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a WCAG 2.0 Guidelines
 *
 * @example
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_1_1
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_1_2
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_1_3
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_1_4
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_2_1
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_2_2
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_2_3
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_2_4
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_3_1
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_3_2
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_3_3
 * OpenAjax.a11y.WCAG20_GUIDELINE.G_4_1
 */
OpenAjax.a11y.WCAG20_GUIDELINE = OpenAjax.a11y.WCAG20_GUIDELINE || {
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
};

/**
 * @constant WCAG20_SUCCESS_CRITERION
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a WCAG 2.0 Success Criteria
 *
 * @example
 * OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_1_1
 * ....
 * OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_2
 */
OpenAjax.a11y.WCAG20_SUCCESS_CRITERION = OpenAjax.a11y.WCAG20_SUCCESS_CRITERION || {
  SC_1_1_1          : 1101,
  SC_1_2_1          : 1201,
  SC_1_2_2          : 1202,
  SC_1_2_3          : 1203,
  SC_1_2_4          : 1204,
  SC_1_2_5          : 1205,
  SC_1_2_6          : 1206,
  SC_1_2_7          : 1207,
  SC_1_2_8          : 1208,
  SC_1_2_9          : 1209,
  SC_1_3_1          : 1301,
  SC_1_3_2          : 1302,
  SC_1_3_3          : 1303,
  SC_1_3_4          : 1304,
  SC_1_3_5          : 1305,
  SC_1_3_6          : 1306,
  SC_1_4_1          : 1401,
  SC_1_4_2          : 1402,
  SC_1_4_3          : 1403,
  SC_1_4_4          : 1404,
  SC_1_4_5          : 1405,
  SC_1_4_6          : 1406,
  SC_1_4_7          : 1407,
  SC_1_4_8          : 1408,
  SC_1_4_9          : 1409,
  SC_1_4_10         : 1410,
  SC_1_4_11         : 1411,
  SC_1_4_12         : 1412,
  SC_1_4_13         : 1413,
  SC_2_1_1          : 2101,
  SC_2_1_2          : 2102,
  SC_2_1_3          : 2103,
  SC_2_1_4          : 2104,
  SC_2_2_1          : 2201,
  SC_2_2_2          : 2202,
  SC_2_2_3          : 2203,
  SC_2_2_4          : 2204,
  SC_2_2_5          : 2205,
  SC_2_2_6          : 2206,
  SC_2_3_1          : 2301,
  SC_2_3_2          : 2302,
  SC_2_3_3          : 2303,
  SC_2_4_1          : 2401,
  SC_2_4_2          : 2402,
  SC_2_4_3          : 2403,
  SC_2_4_4          : 2404,
  SC_2_4_5          : 2405,
  SC_2_4_6          : 2406,
  SC_2_4_7          : 2407,
  SC_2_4_8          : 2408,
  SC_2_4_9          : 2409,
  SC_2_4_10         : 2410,
  SC_2_5_1          : 2501,
  SC_2_5_2          : 2502,
  SC_2_5_3          : 2503,
  SC_2_5_4          : 2504,
  SC_2_5_5          : 2505,
  SC_2_5_6          : 2506,
  SC_3_1_1          : 3101,
  SC_3_1_2          : 3102,
  SC_3_1_3          : 3103,
  SC_3_1_4          : 3104,
  SC_3_1_5          : 3105,
  SC_3_1_6          : 3106,
  SC_3_2_1          : 3201,
  SC_3_2_2          : 3202,
  SC_3_2_3          : 3203,
  SC_3_2_4          : 3204,
  SC_3_2_5          : 3205,
  SC_3_3_1          : 3301,
  SC_3_3_2          : 3302,
  SC_3_3_3          : 3303,
  SC_3_3_4          : 3304,
  SC_3_3_5          : 3305,
  SC_3_3_6          : 3306,
  SC_4_1_1          : 4101,
  SC_4_1_2          : 4102,
  SC_4_1_3          : 4103
};

/**
 * @constant RULE_CATEGORIES
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a rule category and is bit maskable
 *
 * @example
 * OpenAjax.a11y.RULE_CATEGORIES.UNDEFINED
 * OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO
 * OpenAjax.a11y.RULE_CATEGORIES.FORMS
 * OpenAjax.a11y.RULE_CATEGORIES.HEADINGS
 * OpenAjax.a11y.RULE_CATEGORIES.IMAGES
 * OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT
 * OpenAjax.a11y.RULE_CATEGORIES.LINKS
 * OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS
 * OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION
 * OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY
 * OpenAjax.a11y.RULE_CATEGORIES.TABLES
 * OpenAjax.a11y.RULE_CATEGORIES.TIMING
 * OpenAjax.a11y.RULE_CATEGORIES.WIDGETS_SCRIPTS
 */

OpenAjax.a11y.RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES || {
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
 * @constant RULE_SUMMARY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a rule summary option
 *
 * @example
 * OpenAjax.a11y.RULE_SUMMARY.UNDEFINED
 * OpenAjax.a11y.RULE_SUMMARY.CATEGORIES
 * OpenAjax.a11y.RULE_SUMMARY.WCAG20
 * OpenAjax.a11y.RULE_SUMMARY.GUIDELINE
 * OpenAjax.a11y.RULE_SUMMARY.RULESET_TYPE
 */
OpenAjax.a11y.RULE_SUMMARY = OpenAjax.a11y.RULE_SUMMARY || {
  UNDEFINED        : 0,
  CATEGORIES       : 1,
  WCAG20           : 10,
  PRINCIPLES       : 11,
  GUIDELINES       : 12,
  SUCCESS_CRITERIA : 13,
  RULESET_TYPE     : 20
};

/**
 * @constant ELEMENT_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numercial constant representing a element type option
 *
 * @example
 * OpenAjax.a11y.ELEMENT_TYPE.UNKNOWN
 * OpenAjax.a11y.ELEMENT_TYPE.ALL
 * OpenAjax.a11y.ELEMENT_TYPE.AUDIO
 * OpenAjax.a11y.ELEMENT_TYPE.AUDIO_VIDEO
 * OpenAjax.a11y.ELEMENT_TYPE.SITE_NAVIGATION
 * OpenAjax.a11y.ELEMENT_TYPE.HEADINGS
 * OpenAjax.a11y.ELEMENT_TYPE.HEADINGS_LANDMARKS
 * OpenAjax.a11y.ELEMENT_TYPE.IMAGES
 * OpenAjax.a11y.ELEMENT_TYPE.LANDMARKS
 * OpenAjax.a11y.ELEMENT_TYPE.LANGUAGE
 * OpenAjax.a11y.ELEMENT_TYPE.LINKS
 * OpenAjax.a11y.ELEMENT_TYPE.LISTS
 * OpenAjax.a11y.ELEMENT_TYPE.TABLES
 * OpenAjax.a11y.ELEMENT_TYPE.TEXT
 * OpenAjax.a11y.ELEMENT_TYPE.TIMING
 * OpenAjax.a11y.ELEMENT_TYPE.VIDEO
 * OpenAjax.a11y.ELEMENT_TYPE.WIDGETS
 */
OpenAjax.a11y.ELEMENT_TYPE = OpenAjax.a11y.ELEMENT_TYPE || {
  UNDEFINED          : 0,
  ALL                : 1,
  ABBREVIATIONS      : 2,
  AUDIO              : 3,
  AUDIO_VIDEO        : 4,
  SITE_NAVIGATION      : 5,
  HEADINGS           : 6,
  IMAGES             : 7,
  LANGUAGE           : 8,
  LANDMARKS          : 9,
  LAYOUT             : 10,
  LINKS              : 11,
  LISTS              : 12,
  TABLES             : 13,
  TEXT               : 14,
  TIMING             : 15,
  VIDEO              : 16,
  WIDGETS            : 17,
  HEADINGS_LANDMARKS : 100,
  LAYOUT_TABLES      : 101
};


/**
 * @constant CACHE_NAMES
 * @memberOf OpenAjax.a11y
 * @type Array
 * @desc Property names of specialized caches
 */

OpenAjax.a11y.CACHE_NAMES = ['abbreviations_cache',
                             'color_contrast_cache',
                             'controls_cache',
                             'dom_cache',
                             'headings_landmarks_cache',
                             'images_cache',
                             'keyboard_focus_cache',
                             'languages_cache',
                             'links_cache',
                             'lists_cache',
                             'media_cache',
                             'tables_cache',
                             'text_cache',
                             'timing_cache'];


/**
 * @constant WCAG20_LEVEL
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the level of importance of a success criteria
 * @example
 * OpenAjax.a11y.WCAG20_LEVEL.A
 * OpenAjax.a11y.WCAG20_LEVEL.AA
 * OpenAjax.a11y.WCAG20_LEVEL.AAA
 */
OpenAjax.a11y.WCAG20_LEVEL = OpenAjax.a11y.WCAG20_LEVEL || {
  A       : 4,
  AA      : 2,
  AAA     : 1,
  UNKNOWN : 0
};

/**
 * @constant EVALUATION_LEVELS
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the level of rules that wil be evaluated
 *       These are a bit mask for WCAG20_LEVEL constants
 * @example
 * OpenAjax.a11y.EVALUATION_LEVELS.A
 * OpenAjax.a11y.EVALUATION_LEVELS.A_AA
 * OpenAjax.a11y.EVALUATION_LEVELS.A_AA_AAA
 */

OpenAjax.a11y.EVALUATION_LEVELS = OpenAjax.a11y.EVALUATION_LEVELS || {
  A        : 4,
  A_AA     : 6,
  A_AA_AAA : 7
};


/**
 * @constant RULE_GROUP
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines a grouping of rules
 *
 * @example
 * OpenAjax.a11y.RULE_GROUP.GROUP1
 * OpenAjax.a11y.RULE_GROUP.GROUP2
 * OpenAjax.a11y.RULE_GROUP.GROUP3
 * OpenAjax.a11y.RULE_GROUP.GROUP12
 * OpenAjax.a11y.RULE_GROUP.GROUP123
 */
OpenAjax.a11y.RULE_GROUP = OpenAjax.a11y.RULE_GROUP || {
  GROUP1   : 0x0001,
  GROUP2   : 0x0002,
  GROUP3   : 0x0004,
  GROUP12  : 0x0003,
  GROUP123 : 0x0007
};



/**
 * @constant RULE_SCOPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines scope of a rule
 *
 * @example
 * OpenAjax.a11y.RULE_SCOPE.UNKNOWN
 * OpenAjax.a11y.RULE_SCOPE.ELEMENT
 * OpenAjax.a11y.RULE_SCOPE.PAGE
 * OpenAjax.a11y.RULE_SCOPE.WEBSITE
 */
OpenAjax.a11y.RULE_SCOPE = OpenAjax.a11y.RULE_SCOPE || {
  UNKNOWN : 0,
  ELEMENT : 1,
  PAGE    : 2,
  WEBSITE : 3
};


/**
 * @constant TEST_RESULT
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Types of rule results, used in validation functions
 *
 * @example
 * OpenAjax.a11y.TEST_RESULT.FAIL
 * OpenAjax.a11y.TEST_RESULT.HIDDEN
 * OpenAjax.a11y.TEST_RESULT.MANUAL_CHECK
 * OpenAjax.a11y.TEST_RESULT.NONE
 * OpenAjax.a11y.TEST_RESULT.PASS
 */
OpenAjax.a11y.TEST_RESULT = OpenAjax.a11y.TEST_RESULT || {
  PASS         : 1,
  FAIL         : 2,
  MANUAL_CHECK : 3,
  HIDDEN       : 4,
  NONE         : 5
};

/**
 * @constant ELEMENT_RESULT_VALUE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants used to represent evaluation results at the element level
 *
 * @example
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.UNDEFINED
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.PASS
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.HIDDEN
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.MANUAL_CHECK
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.VIOLATION
 * OpenAjax.a11y.ELEMENT_RESULT_VALUE.WARNING
 */
OpenAjax.a11y.ELEMENT_RESULT_VALUE = OpenAjax.a11y.ELEMENT_RESULT_VALUE || {
  UNDEFINED      : 0,
  PASS           : 1,
  HIDDEN         : 2,  // Content is hidden and not tested for accessibility
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

/**
 * @constant RULE_RESULT_VALUE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants used to represent evaluation results at the rule level
 *
 * @example
 * OpenAjax.a11y.RULE_RESULT_VALUE.UNDEFINED
 * OpenAjax.a11y.RULE_RESULT_VALUE.NOT_APPLICABLE
 * OpenAjax.a11y.RULE_RESULT_VALUE.PASS
 * OpenAjax.a11y.RULE_RESULT_VALUE.MANUAL_CHECK
 * OpenAjax.a11y.RULE_RESULT_VALUE.WARNING
 * OpenAjax.a11y.RULE_RESULT_VALUE.VIOLATION
 */
OpenAjax.a11y.RULE_RESULT_VALUE = OpenAjax.a11y.RULE_RESULT_VALUE || {
  UNDEFINED      : 0,
  NOT_APPLICABLE : 1,
  PASS           : 2,
  MANUAL_CHECK   : 3,
  WARNING        : 4,
  VIOLATION      : 5
};

/**
 * @constant IMPLEMENTATION_VALUE
* @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants used to represent the level of implementation
 *
 * @example
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.UNDEFINED
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.NOT_APPLICABLE
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.NOT_IMPLEMENTED
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.ALMOST_COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY
 */
OpenAjax.a11y.IMPLEMENTATION_VALUE = OpenAjax.a11y.IMPLEMENTATION_VALUE || {
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
 * @constant STATUS
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Status of rule acceptance for inclusion in a ruleset
 *
 * @example
 * OpenAjax.a11y.STATUS.UNDEFINED
 * OpenAjax.a11y.STATUS.PROPOSED
 * OpenAjax.a11y.STATUS.ACCEPTED
 * OpenAjax.a11y.STATUS.DEPRICATED
 */
OpenAjax.a11y.STATUS = OpenAjax.a11y.STATUS || {
  UNDEFINED  : 0,
  PROPOSED   : 1,
  ACCEPTED   : 2,
  DEPRICATED : 3
};

/**
 * @constant REFERENCES
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Types of reference for supplemential materials to help people understand an accessibility requirement and
 *       how to improve the accessibility
 *
 * @example
 * OpenAjax.a11y.REFERENCES.UNKNOWN
 * OpenAjax.a11y.REFERENCES.SPECIFICATION
 * OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE
 * OpenAjax.a11y.REFERENCES.TECHNIQUE
 * OpenAjax.a11y.REFERENCES.EXAMPLE
 * OpenAjax.a11y.REFERENCES.MANUAL_CHECK
 * OpenAjax.a11y.REFERENCES.AUTHORING_TOOL
 * OpenAjax.a11y.REFERENCES.OTHER
 */

OpenAjax.a11y.REFERENCES = OpenAjax.a11y.REFERENCES || {
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
};

/**
 * @constant VISIBILITY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Visbility of an item in graphical renderings and to asssitive technologies
 *
 * @example
 * OpenAjax.a11y.VISIBILITY.UNKNOWN
 * OpenAjax.a11y.VISIBILITY.HIDDEN
 * OpenAjax.a11y.VISIBILITY.VISIBLE
 */
OpenAjax.a11y.VISIBILITY = OpenAjax.a11y.VISIBILITY || {
  UNKNOWN : 1,
  HIDDEN  : 2,
  VISIBLE : 3
};

/**
 * @constant ID
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc ID of an item
 * @example
 * OpenAjax.a11y.ID.NOT_DEFINED
 * OpenAjax.a11y.ID.UNIQUE
 * OpenAjax.a11y.ID.NOT_UNIQUE
 */
OpenAjax.a11y.ID = OpenAjax.a11y.ID || {
  NOT_DEFINED  : 1,
  UNIQUE       : 2,
  NOT_UNIQUE   : 3
};


/**
 * @constant LIST
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the lists cache
 * @example
 * OpenAjax.a11y.LIST.CONTAINER
 * OpenAjax.a11y.LIST.ITEM
 * OpenAjax.a11y.LIST.LANDMARK
 */
OpenAjax.a11y.LIST = OpenAjax.a11y.LIST || {
  UNDEFINED : 0,
  CONTAINER : 1,
  ITEM      : 2,
  LANDMARK  : 3
};

/**
 * @constant MEDIA
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the probability of being media object with audio and video
 * @example
 * OpenAjax.a11y.MEDIA.UNDEFINED
 * OpenAjax.a11y.MEDIA.NO
 * OpenAjax.a11y.MEDIA.MAYBE
 * OpenAjax.a11y.MEDIA.YES
 */
OpenAjax.a11y.MEDIA = OpenAjax.a11y.MEDIA || {
  UNDEFINED : 0,
  NO        : 1,
  MAYBE     : 2,
  YES       : 3
};

/**
 * @constant URL_RESULT
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Staus of rule acceptance for inclusion in the public ruleset
 * @example
 * OpenAjax.a11y.URL_RESULT.INVALID
 * OpenAjax.a11y.URL_RESULT.VALID
 * OpenAjax.a11y.URL_RESULT.NOT_TESTED
 * OpenAjax.a11y.URL_RESULT.ERROR
 */
OpenAjax.a11y.URL_RESULT = OpenAjax.a11y.URL_RESULT || {
  INVALID    :  1,
  VALID      :  2,
  NOT_TESTED :  3,
  ERROR      :  4
};

/**
 * @constant SOURCE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc What markup was used as the source for calculating the accessible name
 * @example
 * OpenAjax.a11y.SOURCE.NONE
 * OpenAjax.a11y.SOURCE.LABEL_REFERENCE
 * OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION
 * OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.BUTTON_TYPE
 * OpenAjax.a11y.SOURCE.TEXT_CONTENT
 * OpenAjax.a11y.SOURCE.ARIA_LABELLEDBY
 * OpenAjax.a11y.SOURCE.ARIA_LABEL
 * OpenAjax.a11y.SOURCE.TABLE_CAPTION
 * OpenAjax.a11y.SOURCE.TABLE_SUMMARY
*/
OpenAjax.a11y.SOURCE = OpenAjax.a11y.SOURCE || {
  NONE                 : 1,
  LABEL_REFERENCE      : 2,
  LABEL_ENCAPSULATION  : 3,
  TITLE_ATTRIBUTE      : 4,
  VALUE_ATTRIBUTE      : 5,
  ALT_ATTRIBUTE        : 6,
  BUTTON_TYPE          : 7,
  TEXT_CONTENT         : 8,
  ARIA_LABELLEDBY      : 9,
  ARIA_LABEL           : 10,
  TABLE_CAPTION        : 11,
  TABLE_SUMMARY        : 12
};

/**
 * @constant SOURCE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc What markup was used as the source for calculating the accessible name
 * @example
 * OpenAjax.a11y.DESCRIPTION_SOURCE.NONE
 * OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.ARIA_DESCRIBEDBY
 * OpenAjax.a11y.SOURCE.TABLE_SUMMARY
*/
OpenAjax.a11y.DESCRIPTION_SOURCE = OpenAjax.a11y.DESCRIPTION_SOURCE || {
  NONE                 : 1,
  TITLE_ATTRIBUTE      : 2,
  ARIA_DESCRIBEDBY     : 3,
  TABLE_SUMMARY        : 4
};


/**
 * @constant HEADER_SOURCE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc What markup was used as the source for table cell headers
 * @example
 * OpenAjax.a11y.HEADER_SOURCE.NONE
 * OpenAjax.a11y.HEADER_SOURCE.HEADERS_ATTRIBUTE
 * OpenAjax.a11y.HEADER_SOURCE.ROW_OR_COLUMN_HEADERS
 */
OpenAjax.a11y.HEADER_SOURCE = OpenAjax.a11y.HEADER_SOURCE || {
  NONE                  : 1,
  HEADERS_ATTRIBUTE     : 2,
  ROW_OR_COLUMN_HEADERS : 3
};


/**
 * @constant CONTROL_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Indentify the cache control element type
 *
 * @example
 * OpenAjax.a11y.CONTROL_TYPE.UNKNOWN
 * OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT
 * OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT
 * OpenAjax.a11y.CONTROL_TYPE.CHECKBOX
 * OpenAjax.a11y.CONTROL_TYPE.COLOR
 * OpenAjax.a11y.CONTROL_TYPE.DATE
 * OpenAjax.a11y.CONTROL_TYPE.DATETIME
 * OpenAjax.a11y.CONTROL_TYPE.DATETIME_LOCAL
 * OpenAjax.a11y.CONTROL_TYPE.EMAIL
 * OpenAjax.a11y.CONTROL_TYPE.FIELDSET
 * OpenAjax.a11y.CONTROL_TYPE.FILE
 * OpenAjax.a11y.CONTROL_TYPE.FORM
 * OpenAjax.a11y.CONTROL_TYPE.HIDDEN
 * OpenAjax.a11y.CONTROL_TYPE.IMAGE
 * OpenAjax.a11y.CONTROL_TYPE.LABEL
 * OpenAjax.a11y.CONTROL_TYPE.METER
 * OpenAjax.a11y.CONTROL_TYPE.MONTH
 * OpenAjax.a11y.CONTROL_TYPE.NUMBER
 * OpenAjax.a11y.CONTROL_TYPE.OPTION
 * OpenAjax.a11y.CONTROL_TYPE.OPTGROUP
 * OpenAjax.a11y.CONTROL_TYPE.PASSWORD
 * OpenAjax.a11y.CONTROL_TYPE.PROGRESS
 * OpenAjax.a11y.CONTROL_TYPE.RADIO
 * OpenAjax.a11y.CONTROL_TYPE.RANGE
 * OpenAjax.a11y.CONTROL_TYPE.RESET
 * OpenAjax.a11y.CONTROL_TYPE.SEARCH
 * OpenAjax.a11y.CONTROL_TYPE.SELECT
 * OpenAjax.a11y.CONTROL_TYPE.SUBMIT
 * OpenAjax.a11y.CONTROL_TYPE.TEL
 * OpenAjax.a11y.CONTROL_TYPE.TEXT
 * OpenAjax.a11y.CONTROL_TYPE.TEXTAREA
 * OpenAjax.a11y.CONTROL_TYPE.TIME
 * OpenAjax.a11y.CONTROL_TYPE.URL
 * OpenAjax.a11y.CONTROL_TYPE.WEEK
 * OpenAjax.a11y.CONTROL_TYPE.WIDGET
 */
OpenAjax.a11y.CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE || {
  UNKNOWN        : 1,
  BUTTON_ELEMENT : 2,
  BUTTON_INPUT   : 3,
  CHECKBOX       : 4,
  COLOR          : 5,
  DATE           : 6,
  DATETIME       : 7,
  DATETIME_LOCAL : 8,
  EMAIL          : 9,
  FIELDSET       : 10,
  FILE           : 11,
  FORM           : 12,
  GROUP          : 13,
  HIDDEN         : 14,
  IMAGE          : 15,
  LABEL          : 16,
  METER          : 17,
  MONTH          : 18,
  NUMBER         : 19,
  OPTION         : 20,
  OPTGROUP       : 22,
  PASSWORD       : 23,
  PROGRESS       : 24,
  RADIO          : 25,
  RANGE          : 26,
  RESET          : 27,
  SEARCH         : 28,
  SELECT         : 29,
  SUBMIT         : 30,
  TEL            : 31,
  TEXT           : 32,
  TEXTAREA       : 33,
  TIME           : 34,
  URL            : 35,
  WEEK           : 36,
  WIDGET         : 37
};

/**
 * @constant MAIN
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for MAIN cache elements
 * @example
 * OpenAjax.a11y.MAIN.ROLE_MAIN
 * OpenAjax.a11y.MAIN.H1_ELEMENT
 * OpenAjax.a11y.MAIN.TITLE_ELEMENT
 */
OpenAjax.a11y.MAIN = OpenAjax.a11y.MAIN || {
  ROLE_MAIN      :  1,
  H1_ELEMENT     :  2,
  TITLE_ELEMENT  :  3
};

/**
 * @constant TABLE_ROLE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for TABLE_ROLE table cache elements
 * @example
 * OpenAjax.a11y.TABLE_ROLE.UNKNOWN
 * OpenAjax.a11y.TABLE_ROLE.LAYOUT
 * OpenAjax.a11y.TABLE_ROLE.DATA
 */

OpenAjax.a11y.TABLE_ROLE = OpenAjax.a11y.TABLE_ROLE || {
  UNKNOWN : 1,
  LAYOUT  : 2,
  DATA    : 3,
  COMPLEX : 4
};

/**
 * @constant TABLE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for TABLE cache elements
 * @example
 * OpenAjax.a11y.TABLE.TABLE_ELEMENT
 * OpenAjax.a11y.TABLE.CAPTION_ELEMENT
 * OpenAjax.a11y.TABLE.THEAD_ELEMENT
 * OpenAjax.a11y.TABLE.TBODY_ELEMENT
 * OpenAjax.a11y.TABLE.TR_ELEMENT
 * OpenAjax.a11y.TABLE.TH_ELEMENT
 * OpenAjax.a11y.TABLE.TD_ELEMENT
 */
OpenAjax.a11y.TABLE = OpenAjax.a11y.TABLE || {
  TABLE_ELEMENT   :  1,
  CAPTION_ELEMENT :  2,
  THEAD_ELEMENT   :  3,
  TBODY_ELEMENT   :  4,
  TR_ELEMENT      :  5,
  TH_ELEMENT      :  6,
  TD_ELEMENT      :  7
};

/**
 * @constant LINK_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for LINK cache elements
 * @example
 * OpenAjax.a11y.LINK_TYPE.EMPTY
 * OpenAjax.a11y.LINK_TYPE.OTHER
 * OpenAjax.a11y.LINK_TYPE.INTERNAL
 * OpenAjax.a11y.LINK_TYPE.HTTP
 * OpenAjax.a11y.LINK_TYPE.HTTPS
 * OpenAjax.a11y.LINK_TYPE.FTP
 * OpenAjax.a11y.LINK_TYPE.FTS
 * OpenAjax.a11y.LINK_TYPE.FILE
 * OpenAjax.a11y.LINK_TYPE.JAVASCRIPT
 * OpenAjax.a11y.LINK_TYPE.MAILTO
 * OpenAjax.a11y.LINK_TYPE.TARGET
 */
OpenAjax.a11y.LINK_TYPE = OpenAjax.a11y.LINK_TYPE || {
  EMPTY      : 0,
  OTHER      : 1,
  INTERNAL   : 2,
  HTTP       : 3,
  HTTPS      : 4,
  FTP        : 5,
  FTPS       : 6,
  FILE       : 7,
  JAVASCRIPT : 8,
  MAILTO     : 9,
  TARGET     : 10
};

/**
 * @constant FILTERED_RULE_RESULT_RETURN_VALUE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Used for rule aggregation
 * @example
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.NO_MATCH
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.ADDED
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.NOT_ADDED
 */
OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE = OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE || {
  NO_MATCH  : 0,
  ADDED     : 1,
  NOT_ADDED : 2
};
