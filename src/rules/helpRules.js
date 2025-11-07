/* helpRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Help Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Help Rules
 */

export const helpRules = [

  /**
   * @object HELP_1
   *
   * @desc
  */

  { rule_id             : 'HELP_1',
    last_updated        : '2023-12-03',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '3.2.6',
    wcag_related_ids    : [],
    target_resources    : ['page'],
    validate            : function (dom_cache, rule_result) {

      rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

   } // end validation function  }
  }

];

