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
   * @desc Pre-recorded video only must have description
   */

  { rule_id             : 'VIDEO_1',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4'],
    target_resources    : ['embed', 'object', 'track', 'video'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.allMediaElements.forEach( me => {

        if (me.isVideo || !me.isAudio) {
          const de = me.domElement;

          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.hasDescriptionTrack) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                if (de.accDescription.name) {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
                }
              }
            }
            else {
              if (me.isVideo) {
                if (de.accDescription.name) {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', [de.tagName]);
                }
              }
              else {
                if (de.accDescription.name) {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_5', [de.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_6', [de.tagName]);
                }
              }

            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_2
   *
   * @desc Prerecorded video with synchronized audio (i.e. movie, lecture) must have captions
   */

  { rule_id             : 'VIDEO_2',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : true,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.2',
    wcag_related_ids    : ['1.2.4'],
    target_resources    : ['embed', 'object', 'track', 'video'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.allMediaElements.forEach( me => {
        if (me.isVideo || !me.isAudio) {
          const de = me.domElement;
          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.hasCaptionTrack) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              }
            }
            else {
              if (me.isVideo) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_3
   *
   * @desc Prerecorded video with synchronized audio (i.e. movie) using the video element must have audio description
   */

  { rule_id             : 'VIDEO_3',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.3',
    wcag_related_ids    : ['1.2.5'],
    target_resources    : ['embed', 'object', 'track', 'video'],
    validate          : function (dom_cache, rule_result) {

       dom_cache.mediaInfo.allMediaElements.forEach( me => {
        if (me.isVideo || !me.isAudio) {
          const de = me.domElement;
          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.hasDescriptionTrack) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              }
            }
            else {
              if (me.isVideo) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_4
   *
   * @desc Captions (Live)
   */

  { rule_id             : 'VIDEO_4',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.4',
    wcag_related_ids    : ['1.2.2'],
    target_resources    : ['embed', 'object', 'track', 'video'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.allMediaElements.forEach( me => {
        if (me.isVideo || !me.isAudio) {
          const de = me.domElement;
          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.hasCaptionTrack) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              }
            }
            else {
              if (me.isVideo) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object VIDEO_5
   *
   * @desc Audio Description (Prerecorded)
   */

  { rule_id             : 'VIDEO_5',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.5',
    wcag_related_ids    : ['1.2.3'],
    target_resources    : ['embed', 'object', 'track', 'video'],
    validate          : function (dom_cache, rule_result) {

       dom_cache.mediaInfo.allMediaElements.forEach( me => {
        if (me.isVideo || !me.isAudio) {
          const de = me.domElement;
          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.hasDescriptionTrack) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              }
            }
            else {
              if (me.isVideo) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

    } // end validate function
  }
];
