/* htmlRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('HTML Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: HTML Rules
 */

export const htmlRules = [

  { rule_id             : 'HTML_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '4.1.1',
    wcag_related_ids    : [],
    target_resources    : ['b', 'i'],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[HTML 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT    = TEST_RESULT;
      var VISIBILITY     = VISIBILITY;

      var dom_elements     = dom_cache.element_cache.dom_elements;
      var dom_elements_len = dom_elements.length;

      for (var i = 0; i < dom_elements_len; i++) {
        var de = dom_elements[i];

        if (de.tag_name === 'b') {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
             rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.lang]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.lang]);
          }
        }
        else {
          if (de.tag_name === 'i') {
            if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
               rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tag_name, de.lang]);
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tag_name, de.lang]);
            }
          }
        }
      }
*/
    } // end validate function
  },

  /**
   * @object HTML_2
   *
   * @desc Change marquee elements to use accessible techniques
   */

  { rule_id             : 'HTML_2',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '2.3.1',
    wcag_related_ids    : ['2.2.2', '4.1.1'],
    target_resources    : ['marquee'],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[HTML 2: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT    = TEST_RESULT;
      var VISIBILITY     = VISIBILITY;

      var dom_elements     = dom_cache.element_cache.dom_elements;
      var dom_elements_len = dom_elements.length;

      for (var i = 0; i < dom_elements_len; i++) {
        var de = dom_elements[i];

        if (de.tag_name === 'marquee') {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
             rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.lang]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.lang]);
          }
        }
      }
*/
    } // end validate function
  }
];
