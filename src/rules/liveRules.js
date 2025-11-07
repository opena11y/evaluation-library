/* liveRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Live Region Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Sensory Rules
 */

export const liveRules = [

/**
 * @object LIVE_1
 *
 * @desc  Verify live regions are being used properly
 */
{ rule_id             : 'LIVE_1',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.PAGE,
  rule_category       : RULE_CATEGORIES.TIMING_LIVE,
  rule_required       : true,
  axe_id              : '',
  wave_id             : '',
  wcag_primary_id     : '4.1.3',
  wcag_related_ids    : [],
  target_resources    : ['[role="alert"]','[role="log"]','[role="status"]','[aria-live]'],
  validate          : function (dom_cache, rule_result) {

    let liveCount = 0;

    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.isLive) {
        if (de.visibility.isVisibleToAT) {
          if (de.ariaInfo.ariaLive) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.ariaInfo.ariaLive]);
          }
          else {
            if (de.role === 'alert') {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            }
            else {
              if (de.role === 'log') {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', []);
              }
              else {
                // Status role
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', []);
              }
            }
          }
        }
        else {
          if (de.ariaInfo.ariaLive) {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.ariaInfo.ariaLive]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName, de.role]);
          }
        }
      }
    });

    if (dom_cache.hasScripting || liveCount) {
      if (liveCount) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }
      else {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_2', []);
      }
    }
  } // end validation function
}

];
