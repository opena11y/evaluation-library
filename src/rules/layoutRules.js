/* layoutRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
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
   *           maintaining meanful sequence
   */
  { rule_id             : 'LAYOUT_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.TABLES,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : ['1.3.1'],
    target_resources    : ['Page', 'table'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Layout 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*
       function getNestingLevel(table_element, level) {

         var l = level;
         var pte = table_element.parent_table_element;

         if (pte) {
           if ((pte.table_role === TABLE_ROLE.DATA) || pte.max_column == 1) {
             l = getNestingLevel(pte, level);
           }
           else {
             l = getNestingLevel(pte, (level+1));
           }
         }
         return l;
       }

       var TEST_RESULT   = TEST_RESULT;
       var VISIBILITY    = VISIBILITY;

       var table_elements     = dom_cache.tables_cache.table_elements;
       var table_elements_len = table_elements.length;

       var page_element = dom_cache.headings_landmarks_cache.page_element;
       var layout_pass = 0;
       var layout_mc   = 0;

       // Check to see if valid cache reference
       if (table_elements && table_elements_len) {

         for (var i = 0; i < table_elements_len; i++) {

           var te = table_elements[i];
           var de = te.dom_element;
           var cs = de.computed_style;

           if (te.table_role === TABLE_ROLE.LAYOUT) {

             if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

               var nesting_level = getNestingLevel(te, 0);

               te.nesting_level = nesting_level;

               if (te.max_column === 1)  {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'ELEMENT_PASS_1', []);
                 layout_pass++;
               }
               else {

                 if (nesting_level === 0) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, te, 'ELEMENT_MC_2', [te.max_row, te.max_column]);
                   layout_mc++;
                 }
                 else {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, te, 'ELEMENT_MC_3', [te.nesting_level]);
                   layout_mc++;
                 }
               }
             }
             else {
               rule_result.addResult(TEST_RESULT.HIDDEN, te, 'ELEMENT_HIDDEN_1', []);
             }
           }
         } // end loop
       }

       if (layout_mc) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
       }
       else {
         if (layout_pass) {
           rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
         }
       }
*/
     }  // end validation function
   },

  /**
   * @object LAYOUT_2
   *
   * @desc     Do not use nested tables more than 1 column wide for positioning content
   *           Fails with one or more one levels of nesting.
   */
  { rule_id             : 'LAYOUT_2',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : ['table'],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[Language 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*
       var TEST_RESULT   = TEST_RESULT;
       var VISIBILITY    = VISIBILITY;

       var i;
       var te;

       var table_elements     = dom_cache.tables_cache.table_elements;
       var table_elements_len = table_elements.length;


       // Check to see if valid cache reference
       if (table_elements && table_elements_len) {

         for (i=0; i < table_elements_len; i++) {

           te = table_elements[i];

           if (te.table_role === TABLE_ROLE.LAYOUT) {

             if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

               if (te.max_column > 1) {

                 if (te.nesting_level > 0) rule_result.addResult(TEST_RESULT.FAIL, te, 'ELEMENT_FAIL_1', [te.max_row, te.max_column, te.nesting_level]);
                 else rule_result.addResult(TEST_RESULT.PASS, te, 'ELEMENT_PASS_1', []);
               }
               else {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'ELEMENT_PASS_2', []);
               }
             }
             else {
               rule_result.addResult(TEST_RESULT.HIDDEN, te, 'ELEMENT_HIDDEN_1', []);
             }
           }
         } // end loop
       }
       */
    } // end validation function
  },

  /**
   * @object LAYOUT_3
   *
   * @desc     Check to see if aria-flowto property ordering makes sense to AT users.
   */
  { rule_id             : 'LAYOUT_3',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '1.3.2',
    wcag_related_ids    : [],
    target_resources    : ['[aria_flowto]'],
    validate          : function (dom_cache, rule_result) {

      debug.log(`[Language 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*
      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var dom_elements     = dom_cache.element_cache.dom_elements;
      var dom_elements_len = dom_elements.length;

      for (var i = 0; i < dom_elements_len; i++ ) {

        var de =dom_elements[i];

        if (de.type != Node.ELEMENT_NODE) continue;

  //      logger.debug('[RULE][LAYOUT 3]: ' + de.tag_name + ' (' + de.has_aria_flowto + ')');

        if (de.has_aria_flowto) {
          if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
            rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
          }
        }
      }
      */
    } // end validation function
  }
];
