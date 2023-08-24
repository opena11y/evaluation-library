/* frameRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Frame Rules', false);
debug.flag = false;


/*
 * OpenA11y Rules
 * Rule Category: Frame Rules
 */

export const frameRules = [

  /**
   * @object FRAME_1
   *
   * @desc  Evaluate frame elements for a title attribute
   */

  { rule_id             : 'FRAME_1',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['frame'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.allDomElements.forEach( de => {
        if (de.tagName === 'frame' && de.node.src) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
            }
          }
          else {
           rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });
    } // end validate function
  },

  /**
   * @object FRAME_2
   *
   * @desc  Evaluate iframe elements for an accessible name
   */

  { rule_id             : 'FRAME_2',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['iframe'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.iframeInfo.allIFrameElements.forEach( ife => {
        const de = ife.domElement;
        if (de.tagName === 'iframe' && de.node.src) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
            }
          }
          else {
           rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });
    } // end validate function
  }

];




