/* pointerRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Pointer Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Pointer Rules
 */

export const pointerRules = [

  /**
   * @object POINTER_1
   *
   * @desc
  */

  { rule_id             : 'POINTER_1',
    last_updated        : '2023-12-03',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    rule_required       : true,
    wcag_primary_id     : '2.5.1',
    wcag_related_ids    : [],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  },

  /**
   * @object POINTER_2
   *
   * @desc Pointer Cancellation
  */

  { rule_id             : 'POINTER_2',
    last_updated        : '2023-12-03',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    rule_required       : true,
    wcag_primary_id     : '2.5.2',
    wcag_related_ids    : [],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  },

  /**
   * @object POINTER_3
   *
   * @desc Dragging Movements
  */

  { rule_id             : 'POINTER_3',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    rule_required       : true,
    wcag_primary_id     : '2.5.7',
    wcag_related_ids    : [],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  }

];

