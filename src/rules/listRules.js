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
    first_step          : false,
    axe_refs            : ['list',
                           'listitem',
                           'hidden-content'],
    wave_refs           : ['ol',
                           'ul',
                           'dl'],
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : [],
    target_resources    : ['ul', 'ol', 'li', '[role="list"]', '[role="listitem"]'],
    validate            : function (dom_cache, rule_result) {

      const domDoc = dom_cache.getRootDomDocument();

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
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, domDoc, 'PAGE_MC_1', [listCount]);
      }

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
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
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
    } // end validate function
  },
 /**
   * @object LIST_1
   *
   * @desc Verify definition lists are properly structured
  */

  { rule_id             : 'LIST_3',
    last_updated        : '2026-11-07',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : ['definition-list',
                           'dlitem',
                           'hidden-content'],
    wave_refs           : ['dl'],
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : [],
    target_resources    : ['dl', 'dt', 'dd'],
    validate            : function (dom_cache, rule_result) {

      function hasPreviousSibling (node, tagName) {
        let flag = false;
        let elem = node.previousElementSibling;
        while (elem) {
          if (elem.tagName.toLowerCase() === tagName) {
            flag = true;
            break;
          }
          elem = elem.previousElementSibling;
        }
        return flag;
      }

      dom_cache.allDomElements.forEach ( de => {
        const tagName       = de.tagName;
        const parentTagName = de.parentInfo ? de.parentInfo.domElement.tagName : '';

        let elem;
        let tagName1;

        switch (tagName) {

          case 'dl':
            if (de.visibility.isVisibleToAT) {
              elem     = de.node.firstElementChild ? de.node.firstElementChild : null;
              tagName1 = elem ? elem.tagName.toLowerCase() : 'empty';
              tagName1 === 'dt' ?
                            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', []) :
                            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_4', [tagName1]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [tagName]);
            }
            break;

          case 'dt':
            if (de.visibility.isVisibleToAT) {
              if (parentTagName === 'dl') {
                elem     = de.node.nextElementSibling ? de.node.nextElementSibling : null;
                tagName1 = elem ? elem.tagName.toLowerCase() : 'empty';
                tagName1 === 'dd' ?
                             rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [tagName]) :
                             rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [tagName]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [tagName]);
            }
            break;

          case 'dd':
            if (de.visibility.isVisibleToAT) {
              if (parentTagName === 'dl') {
                hasPreviousSibling(de.node, 'dt') ?
                                 rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [tagName]) :
                                 rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [tagName]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [tagName]);
            }
            break;

          default:
            if (parentTagName === 'dl') {
              if (de.visibility.isVisibleToAT) {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_5', [tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [tagName]);
              }
            }
            break;
        } /* end switch */

      });


    } // end validate function
  }
];

