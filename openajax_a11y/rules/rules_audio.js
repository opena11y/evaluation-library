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
 * @object AUDIO_1
 *
 * @desc Audio elements must have captions or text transcripts
 */

{ rule_id             : 'AUDIO_1',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
  target_resources    : ['audio', 'track'],
  primary_property    : 'type',
  resource_properties : ['controls', 'autoplay', 'name', 'src', 'label'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var audio_elements     = dom_cache.media_cache.audio_elements;
    var audio_elements_len = audio_elements.length;

    for (var i = 0; i < audio_elements_len; i++) {
      var ae = audio_elements[i];
      var de = ae.dom_element;
      var cs = de.computed_style;

      if ((cs.is_visible_to_at === VISIBILITY.VISIBLE) ||
          (ae.has_autoplay)) {
        if (ae.getTextTracks().length) rule_result.addResult(TEST_RESULT.PASS, ae, 'ELEMENT_PASS_1', []);
        else if (de.has_aria_describedby) rule_result.addResult(TEST_RESULT.PASS, ae, 'ELEMENT_PASS_2', []);
        else rule_result.addResult(TEST_RESULT.FAIL, ae, 'ELEMENT_FAIL_1', []);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ae, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object AUDIO_2
 *
 * @desc If object element is used for audio only, object must have captions or text transcript
 */

{ rule_id             : 'AUDIO_2',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
  target_resources    : ['object', 'param'],
  primary_property    : 'type',
  resource_properties : ['data', 'name', 'value', 'valuetype'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var object_elements     = dom_cache.media_cache.object_elements;
    var object_elements_len = object_elements.length;

    for (var i = 0; i < object_elements_len; i++) {
      var oe = object_elements[i];
      var de = oe.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        if (de.has_aria_describedby) {
          rule_result.addResult(TEST_RESULT.PASS, oe, 'ELEMENT_PASS_1', []);
        }
        else {
          if ((typeof oe.type === 'string') &&
               (oe.type.indexOf('audio') >= 0)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_2', []);
          }
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, oe, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object AUDIO_3
 *
 * @desc If embed element is used for audio only, embed  must have captions or text transcript
 */

{ rule_id             : 'AUDIO_3',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
  target_resources    : ['embed'],
  primary_property    : 'type',
  resource_properties : ['src'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var embed_elements     = dom_cache.media_cache.embed_elements;
    var embed_elements_len = embed_elements.length;

    for (var i = 0; i < embed_elements_len; i++) {
      var ee = embed_elements[i];
      var de = ee.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        if (de.has_aria_describedby) {
          rule_result.addResult(TEST_RESULT.PASS, ee, 'ELEMENT_PASS_1', []);
        }
        else {
          if ((typeof ee.type === 'string') &&
              (ee.type.indexOf('audio') >= 0)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_2', []);
          }
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ee, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

  /**
   * @object AUDIO_4
   *
   * @desc  Audio automatically starts
   */

{ rule_id             : 'AUDIO_4',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.4.2',
  wcag_related_ids    : [],
  target_resources    : [],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

      var page_element = dom_cache.media_cache.page_element;

      if (page_element) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
       }

    } // end validate function
  }

]);
