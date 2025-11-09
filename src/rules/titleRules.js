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
    first_step          : false,
    axe_refs            : ['document-title'],
    wave_refs           : [],
    wcag_primary_id     : '2.4.2',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['Page', 'title'],
    validate            : function (dom_cache, rule_result) {
      if (dom_cache.hasTitle) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
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
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
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
        // Replace special characters and '_' with spaces
        title = title.toLowerCase().replace(/\W+/g, ' ').replace('_', ' ');
        h1 = h1.toLowerCase().replace(/\W+/g, ' ').replace('_', ' ');

        const wordsTitle = title.split(' ');
        const wordsH1 = h1.split(' ');

        let count = 0;
        wordsH1.forEach( word => {
          if (wordsTitle.includes(word)) {
            count += 1;
          }
        });

        const result = count >= ((wordsH1.length * 8) / 10);

        return [result, count, wordsH1.length];
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

        let result, wordsInTitleCount, wordsInH1;

        visibleH1Elements.forEach( de => {
          if (de.accName.name) {
            [result, wordsInTitleCount, wordsInH1] = similiarContent(dom_cache.title, de.accName.name);
            if (result) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              passedH1Count += 1;
            }
            else {
              if (visibleH1Count > 2) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [wordsInTitleCount, wordsInH1]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);
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

    } // end validate function
  }
];
