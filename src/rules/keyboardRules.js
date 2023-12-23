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

/* helper functions */


function isNativeTabStop (domElement) {
  return domElement.isLabelable || ['a', 'area', 'button'].includes(domElement.tagName);
}

function isTabStop (domElement) {
  return isNativeTabStop(domElement) ||
         ((typeof domElement.tabIndex === 'number') && (domElement.tabIndex >= 0));
}

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
    rule_required       : true,
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
    last_updated        : '2023-10-08',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.3',
    wcag_related_ids    : ['2.1.1', '2.1.2', '2.4.7', '3.2.1'],
    target_resources    : ['links', 'controls', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      let mcCount = 0;
      let passCount = 0;

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
    rule_required       : true,
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
  },

  /**
   * @object KEYBOARD_4
   *
   * @desc Check elements with tabindex > 0
   */

  { rule_id             : 'KEYBOARD_4',
    last_updated        : '2023-08-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.1.2',
    wcag_related_ids    : ['2.1.1', '2.4.3',  '2.4.7', '3.2.1'],
    target_resources    : ['object'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.allDomElements.forEach( de => {
        if (isTabStop(de) && de.tabIndex > 0) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName, de.tabIndex]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName, de.tabIndex]);
          }
        }
      });
     } // end validation function
  },

  /**
   * @object KEYBOARD_5
   *
   * @desc Focus style
   */

  { rule_id             : 'KEYBOARD_5',
    last_updated        : '2023-08-22',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.7',
    wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '3.2.1'],
    target_resources    : ['Page', 'a', 'applet', 'area', 'button', 'input', 'object', 'select', 'area', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      let controlCount = 0;
      let hiddenCount = 0;

      dom_cache.allDomElements.forEach( de => {
        if (de.ariaInfo.isWidget) {
          if (de.visibility.isVisibleToAT) {
            controlCount += 1;
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
          }
          else {
            hiddenCount += 1;
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      });

      if (controlCount > 1) {
        if (hiddenCount == 0) {
          rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [controlCount]);
        }
        else {
          rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_2', [controlCount, hiddenCount]);
        }
      }

    } // end validation function
  },

  /**
   * @object KEYBOARD_6
   *
   * @desc Select elements with onchange events
   */

  { rule_id             : 'KEYBOARD_6',
    last_updated        : '2023-08-22',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '3.2.2',
    wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '2.4.7'],
    target_resources    : ['select'],
    validate            : function (dom_cache, rule_result) {

     dom_cache.controlInfo.allControlElements.forEach(ce => {
        const de = ce.domElement;
        if (de.tagName === 'select') {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
        }
      });

    } // end validation function
  },

  /**
   * @object KEYBOARD_7
   *
   * @desc Content on Hover or Focus
   */

  { rule_id             : 'KEYBOARD_7',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '1.4.13',
    wcag_related_ids    : [],
    target_resources    : ['button', 'input', 'links', 'output', 'textarea', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      if (dom_cache.hasScripting) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }

    } // end validation function
  },

  /**
   * @object KEYBOARD_8
   *
   * @desc Focus Order
   */

  { rule_id             : 'KEYBOARD_8',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.3',
    wcag_related_ids    : [],
    target_resources    : ['button', 'input', 'links', 'output', 'textarea', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validation function
  },

  /**
   * @object KEYBOARD_9
   *
   * @desc Focus Not Obscured (Minimum)
   */

  { rule_id             : 'KEYBOARD_9',
    last_updated        : '2023-12-16',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.11',
    wcag_related_ids    : [],
    target_resources    : ['button', 'input', 'links', 'output', 'textarea', 'widgets'],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validation function
  }

];




