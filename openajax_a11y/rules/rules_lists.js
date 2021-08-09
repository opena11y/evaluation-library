/**
 * Copyright 2011-2018 OpenAjax Alliance
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
/*            OpenAjax Alliance List Rules                          */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object LIST_1
 *
 * @desc Verify list elements are used semantically
*/

{ rule_id             : 'LIST_1',
  last_updated        : '2015-08-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : [],
  target_resources    : ['ul', 'ol', 'li', 'dl', 'dt', 'dd', '[role="list"]', '[role="listitem"]', '[role="group"]'],
  primary_property    : 'tag_name',
  resource_properties : ['accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

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
          if (le.list_type === OpenAjax.a11y.LIST.CONTAINER) {
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

    } // end validate function
  },
/**
 * @object LIST_2
 *
 * @desc Verify list benefits from an accessible name
*/

{ rule_id             : 'LIST_2',
  last_updated        : '2015-08-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1'],
  target_resources    : ['ul', 'ol', '[role="list"]', '[role="group"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role', 'computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

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
    } // end validate function
  }
]);

