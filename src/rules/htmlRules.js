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

  /**
   * @object HTML_1
   *
   * @desc Change marquee elements to use accessible techniques
   */

  { rule_id             : 'HTML_1',
    last_updated        : '2023-09-01',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    wcag_primary_id     : '2.3.1',
    wcag_related_ids    : ['2.2.2', '4.1.1'],
    target_resources    : ['marquee'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {

        if (de.tagName === 'marquee') {
          if (de.visibility.isVisibleToAT) {
             rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });

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
