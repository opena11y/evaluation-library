/* timingRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Timing Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Timing Rules
 */

export const timingRules = [

  /**
   * @object TIMING_1
   *
   * @desc Timing adjustable for pages with interactive elements
   */

  { rule_id             : 'TIMING_1',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TIMING_LIVE,
    rule_required       : true,
    wcag_primary_id     : '2.2.1',
    wcag_related_ids    : [],
    target_resources    : ['a', 'input', 'button', 'wdiget'],
    validate          : function (dom_cache, rule_result) {

    if (dom_cache.controlInfo.allControlElements.length) {
      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
    }

    } // end validate function
  },

  /**
   * @object TIMING_2
   *
   * @desc Stop, pause or hide content that is moving, scrolling, flashing or auto updating
   */

  { rule_id             : 'TIMING_2',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TIMING_LIVE,
    rule_required       : true,
    wcag_primary_id     : '2.2.2',
    wcag_related_ids    : [],
    target_resources    : ['canvas', 'embed', 'img', 'object', 'svg'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.timingInfo.allTimingDomElements.forEach( de => {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      });

      if (dom_cache.timingInfo.allTimingDomElements.length > 0) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }
    } // end validate function
  },

  /**
   * @object TIMING_3
   *
   * @desc Web pages do not contain anything that flashes more than three times in any one second period
   */

  { rule_id             : 'TIMING_3',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TIMING_LIVE,
    rule_required       : true,
    wcag_primary_id     : '2.3.1',
    wcag_related_ids    : [],
    target_resources    : ['canvas', 'embed', 'img', 'object', 'svg'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.timingInfo.allTimingDomElements.forEach( de => {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      });

      if (dom_cache.timingInfo.allTimingDomElements.length > 0) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

    } // end validate function
  }
];
