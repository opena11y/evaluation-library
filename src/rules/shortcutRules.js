/* shortcutRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Shortcut Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Shortcut Rules
 */

export const shortcutRules = [

  /**
   * @object SHORTCUT_1
   *
   * @desc Ability to adjust author defined keyboard shortcuts if they exist
  */

  { rule_id             : 'SHORTCUT_1',
    last_updated        : '2023-12-03',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    first_step          : false,
    wcag_primary_id     : '2.1.4',
    wcag_related_ids    : [],
    target_resources    : ['page'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  },

  /**
   * @object SHORTCUT_2
   *
   * @desc Avoid using accesskey attribute
  */

  { rule_id             : 'SHORTCUT_2',
    last_updated        : '2023-12-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    first_step          : false,
    wcag_primary_id     : '2.1.4',
    wcag_related_ids    : [],
    target_resources    : ['a', 'input', 'output', 'select', 'textarea'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {
        if (de.accesskey) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.accesskey]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.accesskey]);
          }
        }
      });

   } // end validation function  }
  }

];

