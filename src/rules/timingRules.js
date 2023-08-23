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
    rule_category       : RULE_CATEGORIES.TIMING,
    rule_required       : true,
    wcag_primary_id     : '2.2.1',
    wcag_related_ids    : [],
    target_resources    : ['a', 'input', 'button', 'wdiget'],
    validate          : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

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
    rule_category       : RULE_CATEGORIES.TIMING,
    rule_required       : true,
    wcag_primary_id     : '2.2.2',
    wcag_related_ids    : [],
    target_resources    : ['canvas', 'embed', 'img', 'object', 'svg'],
    validate          : function (dom_cache, rule_result) {

     debug.log(`[TIMING 2]: ${dom_cache} ${rule_result} ${TEST_RESULT}`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var timing_elements     = dom_cache.timing_cache.timing_elements;
      var timing_elements_len = timing_elements.length;

      var page_element = dom_cache.timing_cache.page_element;

      for (var i = 0; i < timing_elements_len; i++) {
        var mbe = timing_elements[i];
        var de = mbe.dom_element;
        var cs = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, mbe, 'ELEMENT_MC_1', [de.tag_name]);
        }
        else {
         rule_result.addResult(TEST_RESULT.HIDDEN, mbe, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        }
      }

      rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
*/
    } // end validate function
  },

  /**
   * @object TIMING_3
   *
   * @desc Web pages do not contain anything that flashes more than three times in any one second period
   */

  { rule_id             : 'TIMING_3',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.TIMING,
    rule_required       : true,
    wcag_primary_id     : '2.3.1',
    wcag_related_ids    : [],
    target_resources    : ['canvas', 'embed', 'img', 'object', 'svg'],
    validate          : function (dom_cache, rule_result) {

     debug.log(`[TIMING 3]: ${dom_cache} ${rule_result} ${TEST_RESULT}`);

/*
      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var timing_elements     = dom_cache.timing_cache.timing_elements;
      var timing_elements_len = timing_elements.length;

      var page_element = dom_cache.timing_cache.page_element;

      for (var i = 0; i < timing_elements_len; i++) {
        var mbe = timing_elements[i];
        var de = mbe.dom_element;
        var cs = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, mbe, 'ELEMENT_MC_1', [de.tag_name]);
        }
        else {
         rule_result.addResult(TEST_RESULT.HIDDEN, mbe, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        }
      }

      rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
*/
    } // end validate function
  }
];
