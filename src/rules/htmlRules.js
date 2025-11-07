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
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
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
    } // end validate function
  }
];
