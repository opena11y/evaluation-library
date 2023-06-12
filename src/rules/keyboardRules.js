/* keyboardRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Keyboard Rules', false);
debug.flag = false;


/*
 * OpenA11y Rules
 * Rule Category: Keyboard Rules
 */

export const keyboardRules = [

  /**
   * @object KEYBOARD_1
   *
   * @desc Widget elements on non-interactive elements or that override the default role of an interactive element
   *       need keyboard event handlers on the widget element or a parent element of the widget
   */

  { rule_id             : 'KEYBOARD_1',
    last_updated        : '2023-06-10',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    ruleset             : RULESET.TRIAGE,
    wcag_primary_id     : '2.1.1',
    wcag_related_ids    : ['4.1.2'],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {
        if (de.ariaInfo.isWidget) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.role]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
          }
        }
      });

    } // end validation function

  },
  /**
   * @object KEYBOARD_2
   *
   * @desc All operations available through the keyboard
   */

  { rule_id             : 'KEYBOARD_2',
    last_updated        : '2023-06-10',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    ruleset             : RULESET.TRIAGE,
    wcag_primary_id     : '2.1.1',
    wcag_related_ids    : ['2.1.2', '2.4.3',  '2.4.7', '3.2.1'],
    target_resources    : ['Page', 'object', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[KEYBOARD 2]: ${dom_cache} ${rule_result}`);

  /*
       var VISIBILITY  = VISIBILITY;
       var TEST_RESULT = TEST_RESULT;

       var page_element = dom_cache.keyboard_focus_cache.page_element;

  //     logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

       var interactive_elements      = dom_cache.controls_cache.interactive_elements;
       var interactive_elements_len  = interactive_elements.length;

       var interactive_count = 0;

       for (var i = 0; i < interactive_elements_len; i++) {


         var ie =interactive_elements[i];
         var de = ie.dom_element;
         var cs = de.computed_style;

         if ((cs.is_visible_to_at    === VISIBILITY.VISIBLE) ||
             (cs.is_visible_onscreen === VISIBILITY.VISIBLE)) {

           if (de.hasEvents() || de.has_tabindex || ie.is_embedded_app) {
             interactive_count++;
             if (de.hasEvents()) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [de.tag_name]);
             else if (de.has_tabindex) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tab_index, de.tag_name]);
             else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_3', [de.tag_name]);
           }
           else {
             rule_result.addResult(TEST_RESULT.PASS, ie, 'ELEMENT_PASS_1', [de.tag_name]);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name]);
         }
       }  // endfor

       if (interactive_count > 1) {
         if (interactive_count === 1) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
         }
         else {
           if (interactive_count >1) {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [interactive_count]);
           }
           else {
             if (interactive_elements_len > 0) {
               if (interactive_elements_len === 1) {
                 rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
               }
               else {
                 rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_2', [interactive_elements_len]);
               }
             }
           }
         }
       }
       */

     } // end validation function
  },

  /**
   * @object KEYBOARD_3
   *
   * @desc No keyboard trap
   */

  { rule_id             : 'KEYBOARD_3',
    last_updated        : '2023-06-10',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    ruleset             : RULESET.TRIAGE,
    wcag_primary_id     : '2.1.2',
    wcag_related_ids    : ['2.1.1', '2.4.3',  '2.4.7', '3.2.1'],
    target_resources    : ['object'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[KEYBOARD 3]: ${dom_cache} ${rule_result}`);

  /*
       var VISIBILITY  = VISIBILITY;
       var TEST_RESULT = TEST_RESULT;

  //     logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

       var media_elements      = dom_cache.media_cache.media_elements;
       var media_elements_len  = media_elements.length;


       for (var i = 0; i < media_elements_len; i++) {

         var me = media_elements[i];

         var de = me.dom_element;
         if (!de) de =me;

         var cs = de.computed_style;

         if ((cs.is_visible_to_at    === VISIBILITY.VISIBLE) ||
             (cs.is_visible_onscreen === VISIBILITY.VISIBLE)) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'ELEMENT_MC_1', [me.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, me, 'ELEMENT_HIDDEN_1', [me.tag_name]);
         }
       }  // endfor

       */

     } // end validation function
  }
];




