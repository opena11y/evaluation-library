/* keyboardRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Keyboard Rules', false);
debug.flag = true;


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
    wcag_primary_id     : '2.1.1',
    wcag_related_ids    : ['4.1.2'],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {
        if (de.hasRole && de.ariaInfo.isWidget) {
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
   * @desc Sequential keyboard navigation
   */

  { rule_id             : 'KEYBOARD_2',
    last_updated        : '2023-08-17',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    wcag_primary_id     : '2.1.1',
    wcag_related_ids    : ['2.1.2', '2.4.3',  '2.4.7', '3.2.1'],
    target_resources    : ['links', 'controls', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      let mcCount = 0;
      let passCount = 0;

      function isNativeTabStop (domElement) {
        return domElement.isLabelable || ['a', 'area', 'button'].includes(domElement.tagName);
      }

      function isTabStop (domElement) {
        return isNativeTabStop(domElement) ||
               ((typeof domElement.tabIndex === 'number') && (domElement.tabIndex >= 0));
      }

      dom_cache.allDomElements.forEach( de => {
        if (isTabStop(de)) {
          if (de.visibility.isVisibleToAT) {
            if (de.tabIndex > 0 ) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
              mcCount += 1;
            }
            else {
              if (de.tabIndex === 0) {
                if (isNativeTabStop(de)) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
                  passCount += 1;
                }
                else {
                  if (de.hasRole && de.isWidget) {
                    // widget roles with tabindex=0
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.elemName]);
                    mcCount += 1;
                  }
                  else {
                    // non-interactive elements with tabindex=0
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', [de.elemName]);
                    mcCount += 1;
                  }
                }
              }
              else {
                if (isNativeTabStop(de) && (de.tabindex === 0)) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
                  passCount += 1;
                }
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      });

      if (mcCount) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }
      else {
        if (passCount) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
        }
      }

    } // end validation function
  },

  /**
   * @object KEYBOARD_3
   *
   * @desc No keyboard trap
   */

  { rule_id             : 'KEYBOARD_3',
    last_updated        : '2023-08-17',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    wcag_primary_id     : '2.1.2',
    wcag_related_ids    : ['2.1.1', '2.4.3',  '2.4.7', '3.2.1'],
    target_resources    : ['object'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.mediaInfo.allMediaElements.forEach( mediaElement => {
        const de = mediaElement.domElement;
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      });
     } // end validation function
  }
];




