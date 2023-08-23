/* audioRules.js */

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
 * Rule Category: Audio Rules
 */

export const audioRules = [

  /**
   * @object AUDIO_1
   *
   * @desc Audio elements must have captions or text transcripts
   */

  { rule_id             : 'AUDIO_1',
    last_updated        : '2014-11-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
    target_resources    : ['audio', 'track'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.audioElements.forEach( ae => {
        const de = ae.domElement;
        if (de.visibility.isVisibleToAT || ae.hasAutoPlay) {
          if (ae.tracks.length) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            if (de.accDescription.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      });

    } // end validate function
  },

  /**
   * @object AUDIO_2
   *
   * @desc If object element is used for audio only, object must have captions or text transcript
   */

  { rule_id             : 'AUDIO_2',
    last_updated        : '2014-11-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
    target_resources    : ['object', 'param'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.objectElements.forEach( oe => {
        const de = oe.domElement;
        if (de.visibility.isVisibleToAT) {
          if (de.accDescription.name) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            if (oe.type.includes('audio')) {
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
   * @object AUDIO_3
   *
   * @desc If embed element is used for audio only, embed  must have captions or text transcript
   */

  { rule_id             : 'AUDIO_3',
    last_updated        : '2014-11-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
    target_resources    : ['embed'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.embedElements.forEach( ee => {
        const de = ee.domElement;
        if (de.visibility.isVisibleToAT) {
          if (de.accDescription.name) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          }
          else {
            if (ee.type.includes('audio')) {
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
     * @object AUDIO_4
     *
     * @desc  Audio automatically starts
     */

  { rule_id             : 'AUDIO_4',
    last_updated        : '2014-11-21',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    wcag_primary_id     : '1.4.2',
    wcag_related_ids    : [],
    target_resources    : [],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validate function
  }

];
