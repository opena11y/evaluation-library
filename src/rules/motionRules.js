/* motionRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Motion Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Motion Rules
 */

export const motionRules = [

  /**
   * @object MOTION_1
   *
   * @desc
  */

  { rule_id             : 'MOTION_1',
    last_updated        : '2023-12-03',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.4',
    wcag_related_ids    : [],
    target_resources    : ['page'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

   } // end validation function  }
  }

];

