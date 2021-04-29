/**
 * Copyright 2011-2018  OpenAjax Alliance
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

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Media Rules                         */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

{ rule_id             : 'HTML_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : [],
  target_resources    : ['b', 'i'],
  primary_property    : 'tag_name',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];

      if (de.tag_name === 'b') {
        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
           rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.lang]);
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.lang]);
        }
      }
      else {
        if (de.tag_name === 'i') {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
             rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tag_name, de.lang]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tag_name, de.lang]);
          }
        }
      }
    }

  } // end validate function
},

/**
 * @object HTML_2
 *
 * @desc Change marquee elements to use accessible techniques
 */

{ rule_id             : 'HTML_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.3.1',
  wcag_related_ids    : ['2.2.2', '4.1.1'],
  target_resources    : ['marquee'],
  primary_property    : 'tag_name',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];

      if (de.tag_name === 'marquee') {
        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {
           rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.lang]);
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.lang]);
        }
      }
    }

  } // end validate function
}
]);
