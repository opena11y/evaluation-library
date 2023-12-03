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
    wcag_primary_id     : '2.1.4',
    wcag_related_ids    : [],
    target_resources    : ['page'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[SHORTCUT_1]: ${dom_cache} ${rule_result}`);

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  }
];

