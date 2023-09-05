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
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : [],
    validate          : function (dom_cache, rule_result) {

      const positionValues = [
        'absolute',
        'relative',
        'fixed']

      dom_cache.allDomElements.forEach( de => {
        if (positionValues.includes(de.cssPosition)) {
          if (de.visibility.isVisibleToAT) {
             rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName, de.cssPosition]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName, de.cssPosition]);
          }
        }
      });
    } // end validate function
  }
];
