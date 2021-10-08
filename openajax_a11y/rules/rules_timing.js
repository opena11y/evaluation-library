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

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Media Rules                         */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object TIMING_1
 *
 * @desc Timing adjustable for pages with interactive elements
 */

{ rule_id             : 'TIMING_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TIMING,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.2.1',
  wcag_related_ids    : [],
  target_resources    : ['a', 'input', 'button', 'wdiget'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var page_element = dom_cache.timing_cache.page_element;

    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);

  } // end validate function
},

/**
 * @object TIMING_2
 *
 * @desc Stop, puase or hide content that is moving, scrolling, flashing or auto updating
 */

{ rule_id             : 'TIMING_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TIMING,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.2.2',
  wcag_related_ids    : [],
  target_resources    : ['applet', 'canvas', 'embed', 'img', 'object', 'svg'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var timing_elements     = dom_cache.timing_cache.timing_elements;
    var timing_elements_len = timing_elements.length;

    var page_element = dom_cache.timing_cache.page_element;

    for (var i = 0; i < timing_elements_len; i++) {
      var mbe = timing_elements[i];
      var de = mbe.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, mbe, 'ELEMENT_MC_1', [de.tag_name]);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, mbe, 'ELEMENT_HIDDEN_1', [de.tag_name]);
      }
    }

    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);

  } // end validate function
},

/**
 * @object TIMING_3
 *
 * @desc Web pages do not contain anything that flashes more than three times in any one second period
 */

{ rule_id             : 'TIMING_3',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TIMING,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.3.1',
  wcag_related_ids    : [],
  target_resources    : ['applet', 'canvas', 'embed', 'img', 'object', 'svg'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var timing_elements     = dom_cache.timing_cache.timing_elements;
    var timing_elements_len = timing_elements.length;

    var page_element = dom_cache.timing_cache.page_element;

    for (var i = 0; i < timing_elements_len; i++) {
      var mbe = timing_elements[i];
      var de = mbe.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, mbe, 'ELEMENT_MC_1', [de.tag_name]);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, mbe, 'ELEMENT_HIDDEN_1', [de.tag_name]);
      }
    }

    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);

  } // end validate function
}

]);
