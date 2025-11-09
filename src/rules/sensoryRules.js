/* sensoryRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Sensory Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Sensory Rules
 */

export const sensoryRules = [

    /**
     * @object SENSORY_1
     *
     * @desc Content does not rely solely on sensory characteristics
     */

  { rule_id             : 'SENSORY_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '1.3.3',
    wcag_related_ids    : [],
    target_resources    : ['button', 'link'],
    validate          : function (dom_cache, rule_result) {
      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
    } // end validate function
  }

];
