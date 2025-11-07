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
   * @desc Provide text alternative for audio only
   */

  { rule_id             : 'AUDIO_1',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : true,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.2.1',
    wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
    target_resources    : ['audio', 'embed', 'object', 'track'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.allMediaElements.forEach( me => {

        if (me.isAudio || !me.isVideo) {
          const de = me.domElement;

          if (de.visibility.isVisibleToAT || me.hasAutoPlay) {
            if (me.allowsTracks) {
              if (me.tracks.length) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
              }
              else {
                if (de.accDescription.name) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
                }
              }
            }
            else {
              if (de.accDescription.name) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.tagName]);
              }
              else {
                if (me.isAudio) {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
                }
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      });

    } // end validate function
  },

    /**
     * @object AUDIO_2
     *
     * @desc  Audio automatically starts
     */

  { rule_id             : 'AUDIO_2',
    last_updated        : '2024-01-04',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.AUDIO_VIDEO,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '1.4.2',
    wcag_related_ids    : [],
    target_resources    : [],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validate function
  }

];
