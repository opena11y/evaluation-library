/* sensoryRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
//import {accNamesTheSame} from '../utils.js';

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
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '1.3.3',
    wcag_related_ids    : [''],
    target_resources    : ['button', 'link'],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[Sensory 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;

      var page_element = dom_cache.headings_landmarks_cache.page_element;

      if (page_element) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MANUAL_CHECK_1', []);
      }
      */
    } // end validate function
  }

];
