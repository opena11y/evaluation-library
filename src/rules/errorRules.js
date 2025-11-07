/* errorRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Error Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Error Rules
 */

export const errorRules = [

  /**
   * @object ERROR_1
   *
   * @desc Identify form controls with invalid values
   *
   */

  { rule_id             : 'ERROR_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '3.3.1',
    wcag_related_ids    : [],
    target_resources    : ['input[type="checkbox"]',
                           'input[type="date"]',
                           'input[type="file"]',
                           'input[type="radio"]',
                           'input[type="number"]',
                           'input[type="password"]',
                           'input[type="tel"]' ,
                           'input[type="text"]',
                           'input[type="url"]',
                           'select',
                           'textarea',
                           'meter',
                           'progress',
                           'widgets'],
    validate            : function (dom_cache, rule_result) {

      dom_cache.controlInfo.allControlElements.forEach( ce => {

        if (ce.isInteractive) {
          const de = ce.domElement;

          if (de.visibility.isVisibleToAT) {
            if (ce.hasValidityState) {
              if (!ce.isValid) {
                if (ce.hasAriaInvalid) {
                  if (ce.ariaInvalid) {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
                  }
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
                }
              }
              else {
                 if (ce.hasAriaInvalid) {
                  if (de.ariaInvalid) {
                    rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.elemName]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName]);
                  }
                }
                else {
                  if (ce.hasPattern) {
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.elemName]);
                  }
                }
              }
            }
            else {
              if (ce.hasAriaInvalid) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', [de.elemName]);
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
   * @object ERROR_2
   *
   * @desc Use required attribute on required standard form controls
   *
   */

  { rule_id             : 'ERROR_2',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '3.3.3',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea'],
    validate            : function (dom_cache, rule_result) {

        dom_cache.controlInfo.allControlElements.forEach( ce => {

        if (ce.isInteractive) {
          const de = ce.domElement;
          if (ce.hasRequired || ce.hasAriaRequired) {
            if (de.visibility.isVisibleToAT) {
              if (ce.hasRequired && ce.hasAriaRequired && !ce.ariaRequired) {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
              }
              else {
                if (de.hasRequired) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName]);
                }
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
            }
          }
        }
      });
    } // end validate function
  },

  /**
   * @object ERROR_3
   *
   * @desc Provide correction suggestions
   *
   */

  { rule_id             : 'ERROR_3',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '3.3.3',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
    validate            : function (dom_cache, rule_result) {

      const suggestionRoles = ['textbox', 'select', 'slider', 'spinbutton'];

        dom_cache.controlInfo.allControlElements.forEach( ce => {
          const de = ce.domElement;

          if (suggestionRoles.includes(de.role)) {
            if (de.visibility.isVisibleToAT) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
            }
          }
      });

    } // end validate function
  },

  /**
   * @object ERROR_4
   *
   * @desc Provide error prevention
   *
   */

  { rule_id             : 'ERROR_4',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '3.3.4',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
    validate            : function (dom_cache, rule_result) {

      const excludeRoles = ['group',
                            'listitem',
                            'menuitem',
                            'menuitemradio',
                            'menuitemcheckbox',
                            'option',
                            'scrollbar'];

      let count = 0;

      dom_cache.controlInfo.allControlElements.forEach( ce => {
        const de = ce.domElement;

        if (ce.isInteractive && !excludeRoles.includes(de.role)) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
            count += 1;
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      });

      if (count) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      }
    } // end validate function
  }
];




