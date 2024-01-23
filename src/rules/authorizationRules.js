/* authorizationRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Authorization Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Autyhorizatiom Rules
 */

export const authorizationRules = [

  /**
   * @object AUTHORIZATION_1
   *
   * @desc ccessible Authorization (Minimum)
   */

  { rule_id             : 'AUTHORIZATION_1',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    wcag_primary_id     : '3.3.8',
    wcag_related_ids    : [],
    target_resources    : ['widgets'],
    validate          : function (dom_cache, rule_result) {

      if (dom_cache.controlInfo.hasTextInput) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

    } // end validate function
  }
];
