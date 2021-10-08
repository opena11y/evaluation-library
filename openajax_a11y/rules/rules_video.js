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
 * @object VIDEO_1
 *
 * @desc Video elements used for prerecorded video only content using the video element must have text or audio description
 */

{ rule_id             : 'VIDEO_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4'],
  target_resources    : ['video', 'track'],
  primary_property    : '',
  resource_properties : ['controls', 'autoplay', 'name', 'type', 'src', 'label'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var video_elements     = dom_cache.media_cache.video_elements;
    var video_elements_len = video_elements.length;

    for (var i = 0; i < video_elements_len; i++) {
      var ve = video_elements[i];
      var de = ve.dom_element;
      var cs = de.computed_style;

      if ((cs.is_visible_to_at === VISIBILITY.VISIBLE) ||
          (ve.has_autoplay)) {
        if (ve.getTextTracks().length) rule_result.addResult(TEST_RESULT.PASS, ve, 'ELEMENT_PASS_1', []);
        else if (de.has_aria_describedby) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ve, 'ELEMENT_MC_1', []);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ve, 'ELEMENT_MC_2', []);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ve, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_2
 *
 * @desc Video elements used for prerecorded video only content using the object element must have text or audio description
 */

{ rule_id             : 'VIDEO_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4'],
  target_resources    : ['object', 'param'],
  primary_property    : '',
  resource_properties : ['data', 'type', 'name', 'value', 'valuetype'],
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
        if (oe.isTypeVideo()) {
          if (de.has_aria_describedby) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_1', []);
          else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_2', []);
        }
        else {
          if (de.has_aria_describedby) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_3', []);
          else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_4', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, oe, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_3
 *
 * @desc Video elements used for prerecorded video only content using the embed element must have text or audio description
 */

{ rule_id             : 'VIDEO_3',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4'],
  target_resources    : ['embed'],
  primary_property    : '',
  resource_properties : ['src', 'type'],
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
        if (ee.isTypeVideo()) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_2', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ee, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_4
 *
 * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the video element must have captions
 */

{ rule_id             : 'VIDEO_4',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.2',
  wcag_related_ids    : ['1.2.4'],
  target_resources    : ['video', 'track'],
  primary_property    : '',
  resource_properties : ['controls', 'autoplay', 'name', 'type', 'src', 'label'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var video_elements     = dom_cache.media_cache.video_elements;
    var video_elements_len = video_elements.length;

    for (var i = 0; i < video_elements_len; i++) {
      var ve = video_elements[i];
      var de = ve.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        if (ve.hasCaptionTrack() || ve.hasSubtitleTrack()) rule_result.addResult(TEST_RESULT.PASS, ve, 'ELEMENT_PASS_1', []);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ve, 'ELEMENT_MC_1', []);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ve, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_5
 *
 * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the object element must have captions
 */

{ rule_id             : 'VIDEO_5',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.2',
  wcag_related_ids    : ['1.2.4'],
  target_resources    : ['object', 'param'],
  primary_property    : '',
  resource_properties : ['data', 'type', 'name', 'value', 'valuetype'],
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
        if (oe.isTypeVideo()) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_2', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, oe, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_6
 *
 * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the embed element must have captions
 */

{ rule_id             : 'VIDEO_6',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.2',
  wcag_related_ids    : ['1.2.1', '1.2.4'],
  target_resources    : ['embed'],
  primary_property    : '',
  resource_properties : ['src', 'type'],
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
        if (ee.isTypeVideo()) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_2', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ee, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_7
 *
 * @desc Prerecorded video with synchronized audio (i.e. movie) using the video element must have audio description
 */

{ rule_id             : 'VIDEO_7',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.3',
  wcag_related_ids    : ['1.2.5'],
  target_resources    : ['video', 'track'],
  primary_property    : '',
  resource_properties : ['controls', 'autoplay', 'name', 'type', 'src', 'label'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var video_elements     = dom_cache.media_cache.video_elements;
    var video_elements_len = video_elements.length;

    for (var i = 0; i < video_elements_len; i++) {
      var ve = video_elements[i];
      var de = ve.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
        if (ve.hasDescriptionTrack()) rule_result.addResult(TEST_RESULT.PASS, ve, 'ELEMENT_PASS_1', []);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ve, 'ELEMENT_MC_1', []);
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ve, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_8
 *
 * @desc Prerecorded video with synchronized audio (i.e. movie) using the object element must have audio description
 */

{ rule_id             : 'VIDEO_8',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.3',
  wcag_related_ids    : ['1.2.1', '1.2.5'],
  target_resources    : ['object', 'param'],
  primary_property    : '',
  resource_properties : ['data', 'type', 'name', 'value', 'valuetype'],
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
        if (oe.isTypeVideo()) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, oe, 'ELEMENT_MC_2', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, oe, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
},

/**
 * @object VIDEO_9
 *
 * @desc Prerecorded video with synchronized audio (i.e. movie) using the embed element must have audio description
 */

{ rule_id             : 'VIDEO_9',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.2.3',
  wcag_related_ids    : ['1.2.1', '1.2.5'],
  target_resources    : ['embed'],
  primary_property    : '',
  resource_properties : ['src', 'type'],
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
        if (ee.isTypeVideo()) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ee, 'ELEMENT_MC_2', []);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, ee, 'ELEMENT_HIDDEN_1', []);
      }
    }
  } // end validate function
}

]);
