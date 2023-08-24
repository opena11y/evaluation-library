/* languageRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
// import {accNamesTheSame} from '../utils.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Language Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Language Rules
 */

export const languageRules = [

  /**
   * @object LANGUAGE_1
   *
   * @desc HTML element must have a lang attribute
   */

  { rule_id             : 'LANGUAGE_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '3.1.1',
    wcag_related_ids    : [],
    target_resources    : ['html'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Language 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT    = TEST_RESULT;

  //    logger.debug( "Language Codes: " + typeof LANGUAGE_CODES);

      var page_element = dom_cache.headings_landmarks_cache.page_element;

      if (page_element) {
         if (dom_cache.lang && dom_cache.lang.length) {
           if (util.validLanguageCode(dom_cache.lang)) {
             rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', [dom_cache.lang]);
           }
           else {
             rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_2', [dom_cache.lang]);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', []);
         }
      }

*/

    } // end validation function
  },

  /**
   * @object LANGUAGE_2
   *
   * @desc Identify the elements on the page where the text content is different language from the primary content
   */

  { rule_id             : 'LANGUAGE_2',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    rule_required       : true,
    wcag_primary_id     : '3.1.2',
    wcag_related_ids    : ['3.1.1'],
    target_resources    : ['[lang]'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Language 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT    = TEST_RESULT;
      var VISIBILITY     = VISIBILITY;

      var dom_elements     = dom_cache.languages_cache.dom_elements;
      var dom_elements_len = dom_elements.length;

  //
  //    logger.debug("[Language Rule 2]  Language 2: " + dom_elements_len);
      var fail_count = 0;
      var pass_count = 0;

      for (var i = 0; i < dom_elements_len; i++) {
        var de = dom_elements[i];

        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {

           if (util.validLanguageCode(de.lang)) {
             rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tag_name, de.lang]);
             pass_count++;
           }
           else {
             rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.lang]);
             fail_count++;
           }

        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.lang]);
        }
      }

      var page_element = dom_cache.headings_landmarks_cache.page_element;

      if (page_element) {
        if (fail_count === 1) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', []);
        else if (fail_count > 1) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_2', [fail_count]);
        else if (pass_count === 1) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
        else if (pass_count > 1) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [pass_count]);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_3', []);
      }
*/
    } // end validation function
  }

]





