/* spacingRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Spacing Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Spacing Rules
 */

export const spacingRules = [

  /**
   * @object SPACING_1
   *
   * @desc Text Spacing
   */

  { rule_id             : 'SPACING_1',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    wcag_primary_id     : '1.4.12',
    wcag_related_ids    : [],
    target_resources    : ['text'],
    validate          : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validate function
  }
];
