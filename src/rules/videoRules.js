/* videoRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Audio Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Video Rules
 */

export const videoRules = [

  /**
   * @object VIDEO_1
   *
   * @desc Video elements used for prerecorded video only content using the video element must have text or audio description
   */

  { rule_id             : 'VIDEO_1',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4'],
    target_resources    : ['video', 'track'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.videoElements.forEach( ve => {
        const de = ve.domElement;
        if (de.visibility.isVisibleToAT || ve.hasAutoPlay) {
          if (ve.tracks.length) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            if (de.accDescription.name) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_2
   *
   * @desc Video elements used for prerecorded video only content using the object element must have text or audio description
   */

  { rule_id             : 'VIDEO_2',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4'],
    target_resources    : ['object', 'param'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.objectElements.forEach( oe => {
        const de = oe.domElement;
        if (de.visibility.isVisibleToAT) {
          if (oe.isVideo) {
            if (de.accDescription.name) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            }
          }
          else {
            if (de.accDescription.name) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', []);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_3
   *
   * @desc Video elements used for prerecorded video only content using the embed element must have text or audio description
   */

  { rule_id             : 'VIDEO_3',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4'],
    target_resources    : ['embed'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.embedElements.forEach( ee => {
        const de = ee.domElement;
        if (de.visibility.isVisibleToAT) {
          if (ee.isVideo) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_4
   *
   * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the video element must have captions
   */

  { rule_id             : 'VIDEO_4',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.2',
    wcag_related_ids    : ['1.2.4'],
    target_resources    : ['video', 'track'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.videoElements.forEach( ve => {
        const de = ve.domElement;
        if (de.visibility.isVisibleToAT) {
          if (ve.hasCaptionTrack || ve.hasSubtitleTrack) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_5
   *
   * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the object element must have captions
   */

  { rule_id             : 'VIDEO_5',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.2',
    wcag_related_ids    : ['1.2.4'],
    target_resources    : ['object', 'param'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.objectElements.forEach( oe => {
        const de = oe.domElement;
        if (de.visibility.isVisibleToAT) {
          if (oe.isVideo) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_6
   *
   * @desc Live and prerecorded video with synchronized audio (i.e. movie, lecture) using the embed element must have captions
   */

  { rule_id             : 'VIDEO_6',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.2',
    wcag_related_ids    : ['1.2.1', '1.2.4'],
    target_resources    : ['embed'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.embedElements.forEach( ee => {
        const de = ee.domElement;
        if (de.visibility.isVisibleToAT) {
          if (ee.isVideo) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_7
   *
   * @desc Prerecorded video with synchronized audio (i.e. movie) using the video element must have audio description
   */

  { rule_id             : 'VIDEO_7',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.3',
    wcag_related_ids    : ['1.2.5'],
    target_resources    : ['video', 'track'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.videoElements.forEach( ve => {
        const de = ve.domElement;
        if (de.visibility.isVisibleToAT) {
          if (ve.hasDescriptionTrack) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_8
   *
   * @desc Prerecorded video with synchronized audio (i.e. movie) using the object element must have audio description
   */

  { rule_id             : 'VIDEO_8',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.3',
    wcag_related_ids    : ['1.2.1', '1.2.5'],
    target_resources    : ['object', 'param'],
    validate          : function (dom_cache, rule_result) {


      dom_cache.mediaInfo.objectElements.forEach( oe => {
        const de = oe.domElement;
        if (de.visibility.isVisibleToAT) {
          if (oe.isVideo) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_9
   *
   * @desc Prerecorded video with synchronized audio (i.e. movie) using the embed element must have audio description
   */

  { rule_id             : 'VIDEO_9',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.3',
    wcag_related_ids    : ['1.2.1', '1.2.5'],
    target_resources    : ['embed'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.embedElements.forEach( ee => {
        const de = ee.domElement;
        if (de.visibility.isVisibleToAT) {
          if (ee.isVideo) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      });

    } // end validate function
  }
];
