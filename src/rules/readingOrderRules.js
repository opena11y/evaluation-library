/* readingOrderRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Reading Order Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Reading Order Rules
 */

export const readingOrderRules = [

    /**
     * @object ORDER_1
     *
     * @desc Reading order is meaningful when content is positioned using CSS
     */

  { rule_id             : 'ORDER_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : [],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[Order 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var dom_elements     = dom_cache.element_cache.dom_elements;
      var dom_elements_len = dom_elements.length;

      for (var i = 0; i < dom_elements_len; i++) {

        var de = dom_elements[i];
        var cs = de.computed_style;

        if (cs.position === 'absolute' || cs.position === 'relative' || cs.position === 'fixed') {

          if (cs.is_visible_to_at  === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name, cs.position]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, cs.position]);
          }

        }

      }
*/

    } // end validate function
  }
];
