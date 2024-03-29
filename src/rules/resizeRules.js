/* resizeRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Resize Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Resize Rules
 */

export const resizeRules = [

  /**
   * @object RESIZE_1
   *
   * @desc Resize content
   */

  { rule_id             : 'RESIZE_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    first_step          : false,
    wcag_primary_id     : '1.4.4',
    wcag_related_ids    : [],
    target_resources    : ['content'],
    validate          : function (dom_cache, rule_result) {
      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
    } // end validate function
  },

 /**
   * @object RESIZE_1
   *
   * @desc Resize content
   */

  { rule_id             : 'RESIZE_2',
    last_updated        : '2023-09-19',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    first_step          : false,
    wcag_primary_id     : '1.4.10',
    wcag_related_ids    : [],
    target_resources    : ['content'],
    validate          : function (dom_cache, rule_result) {
      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
    } // end validate function
  }

];
