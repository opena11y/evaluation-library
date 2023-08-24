/* bypassRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
//import {accNamesTheSame} from '../utils.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Bypass Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Bypass Rules
 */

export const bypassRules = [

  /**
   * @object BYPASS_1
   *
   * @desc Looking for links or that support bypassing blocks of content
  */

  { rule_id             : 'BYPASS_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['2.4.4'],
    target_resources    : ['a'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Bypass 1: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var link_elements     = dom_cache.links_cache.link_elements;
      var link_elements_len = link_elements.length;

      var control_elements     = dom_cache.controls_cache.control_elements;
      var control_elements_len = control_elements.length;

      var page_element = dom_cache.headings_landmarks_cache.page_element;

      var bypass_links = [];
      var bypass_link = false;
      var skipto_link = false;
      var focusable   = false;
      var missing     = false;

      var i, ce, cs, de, le, id;

      for (i = 0; i < control_elements_len; i++) {

        ce = control_elements[i];
        de = ce.dom_element;

        if ((de.role === 'button') && (de.class_name !== '') && (de.class_name.toLowerCase().indexOf('skipto') >= 0)) {
          bypass_links.push(ce);
          rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', []);
          skipto_link = true;
          break;
        }
      }

      for (i = 0; (!skipto_link && (i < link_elements_len) && (i < 2)); i++) {

        le = link_elements[i];
        de = le.dom_element;
        cs = de.computed_style;

        if (le.href && le.href.length && (le.href.indexOf('#') >= 0 )) {
          id = le.href.substring((le.href.indexOf('#')+1), le.href.length);

          if (id.length) {
            bypass_link = true;

            // check for id first
            de = dom_cache.element_with_id_cache.getDOMElementById(id);

            // check for name second
            if (!de) de = dom_cache.element_cache.getDOMElementByName(id);

            if (de) {
              if (cs.is_visible_to_at == VISIBILITY.VISIBLE) {
                if ((de.tab_index >= 0) || de.has_tabindex || de.is_interactive) {
                  bypass_links.push(le);
                  rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);

  //                logger.debug("[BYPASS 1] tag: " + de.tag_name + " tabindex: " + de.tab_index  + " has tabindex: " + de.has_tabindex + " has href: " + de.has_href );

                  if ((de.tag_name !== 'a') ||
                      (de.tab_index < 0) ||
                      (de.tab_index > 0) ||
                       de.has_href) {
                    focusable = true;
                    rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', []);
                  }
                  else {
                    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
                  }
                }
                else {
                  rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', [id]);
                  rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', []);
              }
            }
            else {
              missing = true;
              rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [id]);
            }
          }
        }
      }

      if (skipto_link || (bypass_link && focusable)) {
        rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
      }
      else {
        if (missing) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', []);
        else if (bypass_link) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', []);
      }
*/
    } // end validation function  }
  }
];

