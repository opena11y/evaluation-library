/* layoutRules.js */

/* Imports */
import {
//  HEADER_SOURCE,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TABLE_TYPE,
  TEST_RESULT
} from '../constants.js';


import DebugLogging      from '../debug.js';

/* Constants */


const debug = new DebugLogging('Layout Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Layout Rules
 */

export const layoutRules = [

  /**
   * @object LAYOUT_1
   *
   * @desc     Make sure content is in a meaningful sequence
   *           tables used for layout must be checked for
   *           maintaining meaningful sequence
   */
  { rule_id             : 'LAYOUT_1',
    last_updated        : '2023-09-06',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : ['1.3.1'],
    target_resources    : ['Page', 'table'],
    validate            : function (dom_cache, rule_result) {

      let layoutPass = 0;
      let layoutManualCheck = 0;

      dom_cache.tableInfo.allTableElements.forEach( te => {
        const de = te.domElement;

        if (te.tableType === TABLE_TYPE.LAYOUT) {
          if (de.visibility.isVisibleToAT) {
            if (te.colCount === 1)  {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              layoutPass += 1;
            }
            else {
              if (te.nestinglevel === 0) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [te.rowCount, te.colCount]);
                layoutManualCheck += 1;
              }
              else {
                 rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [te.nestingLevel]);
                 layoutManualCheck += 1;
              }
            }
          }
          else {
           rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });

      if (layoutManualCheck) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [layoutManualCheck]);
      }
      else {
        if (layoutPass) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
        }
      }
    }  // end validation function
  },

  /**
   * @object LAYOUT_2
   *
   * @desc     Do not use nested tables more than 1 column wide for positioning content
   *           Fails with one or more one levels of nesting.
   */
  { rule_id             : 'LAYOUT_2',
    last_updated        : '2023-09-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : ['table'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.tableInfo.allTableElements.forEach( te => {
        const de = te.domElement;

        if (te.tableType === TABLE_TYPE.LAYOUT) {
          if (de.visibility.isVisibleToAT) {

            if (te.colCount > 1) {
              if (te.nestingLevel > 0) {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [te.rowCount, te.colCount, te.nestingLevel]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
            }
          }
          else {
           rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });

    } // end validation function
  },

  /**
   * @object LAYOUT_3
   *
   * @desc    Verify if the aria-flow to property ordering makes sense to AT users.
   */
  { rule_id             : 'LAYOUT_3',
    last_updated        : '2023-09-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : ['[aria_flowto]'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {

        if (de.ariaInfo.flowTo) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName, de.flowTo]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName, de.flowTo]);
          }
        }

      });
    } // end validation function
  },

  /**
   * @object LAYOUT_4
   *
   * @desc    Verify if the page support both port
   */
  { rule_id             : 'LAYOUT_4',
    last_updated        : '2023-09-14',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TABLES_LAYOUT,
    rule_required       : true,
    wcag_primary_id     : '1.3.4',
    wcag_related_ids    : [],
    target_resources    : ['page'],
    validate          : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [])

    } // end validate function
  }
];
