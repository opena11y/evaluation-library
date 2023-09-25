/* listRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('List Rules', false);
debug.flag = false;


/*
 * OpenA11y Rules
 * Rule Category: List Rules
 */

export const listRules = [

  /**
   * @object LIST_1
   *
   * @desc Verify list elements are used semantically
  */

  { rule_id             : 'LIST_1',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : [],
    target_resources    : ['ul', 'ol', 'li', '[role="list"]', '[role="listitem"]'],
    validate            : function (dom_cache, rule_result) {

      let listCount = 0;

      dom_cache.listInfo.allListElements.forEach ( le => {
        const de = le.domElement;

        if (de.role === 'list') {
          if (de.visibility.isVisibleToAT) {
            listCount += 1;
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }

       if (de.role === 'listitem') {
          if (de.visibility.isVisibleToAT) {
            listCount += 1;
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }

      });

      if (listCount) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [listCount]);
      }


/*

        var TEST_RESULT = TEST_RESULT;
        var VISIBILITY  = VISIBILITY;

        var page_element = dom_cache.keyboard_focus_cache.page_element;

        var list_elements     = dom_cache.lists_cache.list_elements;
        var list_elements_len = list_elements.length; // loop control

        for (var i = 0; i < list_elements_len; i++) {
          var le = list_elements[i];
          var de = le.dom_element;
          var cs = de.computed_style;

          var tag_name = de.tag_name;
          if (de.has_role) tag_name += '[role=' + de.role + ']';

          if (cs.is_visible_to_at  === VISIBILITY.VISIBLE) {
            if (le.list_type === LIST.CONTAINER) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [tag_name]);
            }
            else  {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', [tag_name]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          }

        } // end loop

        if (list_elements_len > 0) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', [list_elements_len]);
        }

*/

      } // end validate function
    },
  /**
   * @object LIST_2
   *
   * @desc Verify list benefits from an accessible name
  */

  { rule_id             : 'LIST_2',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    wcag_primary_id     : '2.4.6',
    wcag_related_ids    : ['1.3.1'],
    target_resources    : ['ul', 'ol', '[role="list"]'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.listInfo.allListElements.forEach ( le => {
        const de = le.domElement;

        if (de.role === 'list') {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName, de.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }

      });


/*

        var TEST_RESULT = TEST_RESULT;
        var VISIBILITY  = VISIBILITY;

        var container_elements     = dom_cache.lists_cache.container_elements;
        var container_elements_len = container_elements.length; // loop control

        for (var i = 0; i < container_elements_len; i++) {
          var le = container_elements[i];
          var de = le.dom_element;
          var cs = de.computed_style;

          var tag_name = de.tag_name;
          if (de.has_role) tag_name += '[role=' + de.role + ']';

          if (cs.is_visible_to_at  === VISIBILITY.VISIBLE) {
            if (le.accessible_name.length) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [le.accessible_name]);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', [tag_name]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          }

        } // end loop

        */

      } // end validate function
    }
];

