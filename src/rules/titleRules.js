/* titleRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Title Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Title Rules
 */

export const titleRules = [

  /**
   * @object TITLE_1
   *
   * @desc the title element text content must describe the purpose or content of the page
   */

  { rule_id             : 'TITLE_1',
    last_updated        : '2023-09-04',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    wcag_primary_id     : '2.4.2',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['Page', 'title'],
    validate            : function (dom_cache, rule_result) {
      if (dom_cache.hasTitle) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [dom_cache.title]);
      }
      else {
        rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
      }
    } // end validate function
  },

  /**
   * @object TITLE_2
   *
   * @desc The words in the @h1@ content must be part of the title element text content.
   *
   */

  { rule_id             : 'TITLE_2',
    last_updated        : '2023-09-04',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    wcag_primary_id     : '2.4.2',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['Page', 'title', 'h1'],
    validate            : function (dom_cache, rule_result) {

      function similiarContent (title, h1) {
        if (typeof title !== 'string') {
          title = '';
        }
        if (typeof h1 !== 'string') {
          h1 = '';
        }
        title = title.toLowerCase();
        h1 = h1.toLowerCase();

        const wordsTitle = title.split(' ');
        const wordsH1 = h1.split(' ');

        let count = 0;
        wordsH1.forEach( word => {
          if (wordsTitle.includes(word)) {
            count += 1;
          }
        });

        return count > ((wordsH1.length * 8) / 10);
      }

      const visibleH1Elements = [];
      let passedH1Count = 0;

      if (dom_cache.hasTitle) {

        // Get h1s visible to AT
        dom_cache.structureInfo.allH1DomElements.forEach( de => {
          if (de.visibility.isVisibleToAT) {
            visibleH1Elements.push(de);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        })

        const visibleH1Count = visibleH1Elements.length;

        visibleH1Elements.forEach( de => {

          if (de.accName.name) {
            if (similiarContent(dom_cache.title, de.accName.name)) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              passedH1Count += 1;
            }
            else {
              if (visibleH1Count > 2) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, dom_cache, 'ELEMENT_FAIL_2', []);
          }
        });

        if (visibleH1Count === 0) {
          rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_2', []);
        }
        else {
          if (visibleH1Count > 2) {
            rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
          }
          else {
            if (visibleH1Count !== passedH1Count) {
              rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_4', []);
            }
            else {
              if (visibleH1Count === 1) {
                rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
              }
              else {
                rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_2', []);
              }
            }
          }
        }
      }
      else {
        rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
      }



/*

        function compareTextContent(s1, s2) {

          var words = s2.split(' ');
          var words_len = words.length;
          var words_match = 0;
          var words_not_matched = 0;
          var characters_match = 0;
          var characters_not_matched = 0;

  //        logger.debug("Comparison: " + s1 + "/" + s2);

          for (var i = 0; i < words_len; i++) {
            var w = words[i];
            if (s1.indexOf(w) >= 0) {
              characters_match += w.length;
              words_match++;
            }
            else {
              characters_not_matched += w.length;
              words_not_matched++;
            }
          }

  //        logger.debug("Match Information: " + (characters_match * words_match) + "/" + (characters_not_matched * words_not_matched));

          if (characters_not_matched === 0) return true;

          var p = (100 * characters_match * words_match) / ((characters_match  * words_match) + (characters_not_matched * words_not_matched ));

  //        logger.debug("Match Percentage: " + p);

          if (p > 80) return true;

          return false;
        }

        var TEST_RESULT = TEST_RESULT;
        var VISIBILITY  = VISIBILITY;

        var title_element  = dom_cache.headings_landmarks_cache.title_element;
        var page_element   = dom_cache.headings_landmarks_cache.page_element;
        var h1_elements    = dom_cache.headings_landmarks_cache.h1_elements;
        var visible_h1_element_count = 0;
        var passed_h1_element_count  = 0;
        var i, h1, de, cs;

  //      logger.debug('[RULE][TITLE 2] Title: ' + title_element.name_for_comparison + '(' + title_element.name_for_comparison.length + ')');

        if (title_element.name_for_comparison.length === 0) {
          rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', []);
        }
        else {

          var h1_count = h1_elements.length;

          for(i = 0; i < h1_count; i++) {
            h1 = h1_elements[i];
            de = h1.dom_element;
            cs = de.computed_style;
            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) visible_h1_element_count += 1;
          }

          for(i = 0; i < h1_count; i++) {
            h1 = h1_elements[i];
            de = h1.dom_element;
            cs = de.computed_style;

  //          logger.debug('[RULE][TITLE 2] H1: ' + h1.name_for_comparison + '(' + h1.name_for_comparison.length + ')');

            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              if (h1.name_for_comparison.length) {
                if (compareTextContent(title_element.name_for_comparison, h1.name_for_comparison)) {
                  rule_result.addResult(TEST_RESULT.PASS, h1, 'ELEMENT_PASS_1', []);
                  passed_h1_element_count++;
                }
                else {
                  if (visible_h1_element_count > 2) {
                    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, h1, 'ELEMENT_MC_1', []);
                  }
                  else {
                    rule_result.addResult(TEST_RESULT.FAIL, h1, 'ELEMENT_FAIL_1', []);
                  }
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, h1, 'ELEMENT_FAIL_2', []);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, h1, 'ELEMENT_HIDDEN_1', []);
            }
          }

          if (visible_h1_element_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_2', []);
          else if (visible_h1_element_count > 2) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
          else if (visible_h1_element_count !== passed_h1_element_count) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_4', []);
          else if (visible_h1_element_count === 1) rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
          else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_2', []);
        }
        */
      } // end validate function
    }
 ];
