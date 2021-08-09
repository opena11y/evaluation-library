/**
 * Copyright 2011-2017  OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*      OpenAjax Alliance Table Rules                               */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**

   **
 * @object LAYOUT_1
 *
 * @desc     Make sure content is in a meaningful sequence
 *           tables used for layout must be checked for
 *           maintaining meanful sequence
 */
{ rule_id             : 'LAYOUT_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.2',
  wcag_related_ids    : ['1.3.1'],
  target_resources    : ['Page', 'table'],
  primary_property    : 'is_data_table',
  resource_properties : ['max_column', 'max_row', 'nesting_level'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     function getNestingLevel(table_element, level) {

       var l = level;
       var pte = table_element.parent_table_element;

       if (pte) {
         if ((pte.table_role === OpenAjax.a11y.TABLE_ROLE.DATA) || pte.max_column == 1) {
           l = getNestingLevel(pte, level);
         }
         else {
           l = getNestingLevel(pte, (level+1));
         }
       }
       return l;
     }

     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

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

         if (te.table_role === OpenAjax.a11y.TABLE_ROLE.LAYOUT) {

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

   }  // end validation function
 },

/**
 * @object LAYOUT_2
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning content
 *           Fails with one or more one levels of nesting.
 */
{ rule_id             : 'LAYOUT_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.2',
  wcag_related_ids    : [],
  target_resources    : ['table'],
  primary_property    : 'nesting_level',
  resource_properties : ['is_data_table', 'max_column', 'max_row'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

     var i;
     var te;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;


     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {

       for (i=0; i < table_elements_len; i++) {

         te = table_elements[i];

         if (te.table_role === OpenAjax.a11y.TABLE_ROLE.LAYOUT) {

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
  } // end validation function
},

/**
 * @object LAYOUT_3
 *
 * @desc     Check to see if aria-flowto property ordering makes sense to AT users.
 */
{ rule_id             : 'LAYOUT_3',
  last_updated        : '2017-01-17',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.2',
  wcag_related_ids    : [],
  target_resources    : ['[aria_flowto]'],
  primary_property    : 'aria_flowto',
  resource_properties : ['aria_flowto'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++ ) {

      var de =dom_elements[i];

      if (de.type != Node.ELEMENT_NODE) continue;

//      OpenAjax.a11y.logger.debug('[RULE][LAYOUT 3]: ' + de.tag_name + ' (' + de.has_aria_flowto + ')');

      if (de.has_aria_flowto) {
        if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
        }
      }
    }
  } // end validation function
}
]);
