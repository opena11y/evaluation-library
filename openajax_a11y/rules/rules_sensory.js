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

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Media Rules                         */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

  /**
   * @object SENSORY_1
   *
   * @desc Content does not rely solely on sensory characteristics
   */

{ rule_id             : 'SENSORY_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.3',
  wcag_related_ids    : [],
  target_resources    : [],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    if (page_element) {
      rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MANUAL_CHECK_1', []);
    }
  } // end validate function
}

]);
