/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

//
// OpenAjax Alliance Rules
// Rule group: Styling Rules
//
OpenAjax.a11y.RuleManager.addRulesFromJSON([


  /**
   * @object COLOR_1
   *
   * @desc  Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
   */

  { rule_id             : 'COLOR_1',
    last_updated        : '2014-11-21',
    rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
    rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
    rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
    wcag_primary_id     : '1.4.3',
    wcag_related_ids    : ['1.4.1','1.4.6'],
    target_resources    : ['textnodes'],
    primary_property    : 'color_contrast_ratio',
    resource_properties : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font'],
    language_dependency : "",
    validate            : function (dom_cache, rule_result) {

      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT  = 3.1;

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

      var cc_items     = dom_cache.text_cache.text_nodes;
      var cc_items_len = cc_items.length;

      for (var i = 0; i < cc_items_len; i++) {

        var cc_item = cc_items[i];
        var pe = cc_item.parent_element;
        var cs = pe.computed_style;

        // if color contrast raio is undefined, skip this item
        if (!cs.color_contrast_ratio) continue;

        if (cs.is_visible_onscreen === VISIBILITY.VISIBLE) {

          if (!cs.is_large_font) {
            if (cs.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) {
              // Passes color contrast requirements
              if (cs.background_image != "none") {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'ELEMENT_MC_1', [cs.color_contrast_ratio]);
              }
              else {
                rule_result.addResult(TEST_RESULT.PASS, cc_item, 'ELEMENT_PASS_1', [cs.color_contrast_ratio]);
              }
            }
            else {

              // Fails color contrast requirements
              if (cs.background_image === "none") {
                rule_result.addResult(TEST_RESULT.FAIL, cc_item, 'ELEMENT_FAIL_1', [cs.color_contrast_ratio]);
              }
              else {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'ELEMENT_MC_2', [cs.color_contrast_ratio]);
              }
            }
          }
          else {
            if (cs.color_contrast_ratio >= MIN_CCR_LARGE_FONT) {
              // Passes color contrast requirements
              if (cs.background_image != "none") {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'ELEMENT_MC_3', [cs.color_contrast_ratio]);
              }
              else {
                rule_result.addResult(TEST_RESULT.PASS, cc_item, 'ELEMENT_PASS_2', [cs.color_contrast_ratio]);
              }
            }
            else {
              // Fails color contrast requirements
              if (cs.background_image === "none") {
                rule_result.addResult(TEST_RESULT.FAIL, cc_item, 'ELEMENT_FAIL_2', [cs.color_contrast_ratio]);
              }
              else {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'ELEMENT_MC_4', [cs.color_contrast_ratio]);
              }
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, cc_item, 'ELEMENT_HIDDEN_1', []);
        }

      } // end loop

    } // end validate function
  },

  /**
   * @object COLOR_1
   *
   * @desc  Use of color
   */

  { rule_id             : 'COLOR_2',
    last_updated        : '2014-04-04',
    rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
    rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
    rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
    wcag_primary_id     : '1.4.1',
    wcag_related_ids    : [],
    target_resources    : [],
    primary_property    : '',
    resource_properties : [],
    language_dependency : "",
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

      var page_element = dom_cache.headings_landmarks_cache.page_element;

      if (page_element) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
       }

    } // end validate function
  }

]);




