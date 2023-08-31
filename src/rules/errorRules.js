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
    wcag_primary_id     : '3.3.3',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea'],
    validate            : function (dom_cache, rule_result) {

        dom_cache.controlInfo.allControlElements.forEach( ce => {

        if (ce.isInteractive) {
          const de = ce.domElement;
          debug.log(`[ERROR 2][${de.elemName}]: ${ce.hasRequired} ${ce.hasAriaRequired} ${ce.ariaRequired}`);
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
/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY = VISIBILITY;

      var control_elements   = dom_cache.controls_cache.control_elements;
      var control_elements_len = control_elements.length;

      // collect all the visible controls
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        var control_type = ce.control_type;

        if (control_type === CONTROL_TYPE.CHECKBOX  ||
            control_type === CONTROL_TYPE.DATE      ||
            control_type === CONTROL_TYPE.EMAIL     ||
            control_type === CONTROL_TYPE.FILE      ||
            control_type === CONTROL_TYPE.NUMBER    ||
            control_type === CONTROL_TYPE.PASSWORD  ||
            control_type === CONTROL_TYPE.RADIO     ||
            control_type === CONTROL_TYPE.TEL       ||
            control_type === CONTROL_TYPE.TEXT      ||
            control_type === CONTROL_TYPE.URL ) {

          var input_type = de.node.getAttribute('type');

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (de.has_required || de.has_aria_required) {
              if (de.has_required && de.has_aria_required && !de.aria_required) {
                rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', [input_type]);
              }
              else {
                if (de.has_required) rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [input_type]);
                else rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_2', [input_type]);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [input_type]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [input_type]);
          }
        }
        else {
          if ((control_type === CONTROL_TYPE.TEXTAREA) ||
              (control_type === CONTROL_TYPE.SELECT)) {

            var tag_name = de.tag_name;

            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              if (de.has_required || de.has_aria_required) {
                if (de.has_required && de.has_aria_required && !de.aria_required) {
                  rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_2', [tag_name]);
                }
                else {
                  if (de.has_required) rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_3', [tag_name]);
                  else rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_4', [tag_name]);
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_2', [tag_name]);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_2', [de.tag_name]);
            }
          }
        }
      }
*/

    } // end validate function
  },

  /**
   * @object ERROR_3
   *
   * @desc Use aria-required attribute widgets
   *
   */

  { rule_id             : 'ERROR_3',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    rule_required       : true,
    wcag_primary_id     : '3.3.3',
    wcag_related_ids    : [],
    target_resources    : ['widgets'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Error 3: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY = VISIBILITY;

      var widget_elements     = dom_cache.controls_cache.widget_elements;
      var widget_elements_len = widget_elements.length;

      // collect all the visible controls
      for (var i = 0; i < widget_elements_len; i++) {
        var we = widget_elements[i];
        var de = we.dom_element;
        var cs = de.computed_style;

        var role = de.role;

        if (role === 'combobox'     ||
            role === 'gridcell'     ||
            role === 'listbox'      ||
            role === 'radiogroup'   ||
            role === 'spinbutton'   ||
            role === 'textarea'     ||
            role === 'tree'         ||
            role === 'textbox'    ||
            role === 'treegrid') {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (de.has_aria_required) {
              rule_result.addResult(TEST_RESULT.PASS, we, 'ELEMENT_PASS_1', [de.tag_name, role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_1', [de.tag_name, role]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, we, 'ELEMENT_HIDDEN_1', [de.tag_name, role]);
          }
        }
      }
      */
    } // end validate function
  },

  /**
   * @object ERROR_4
   *
   * @desc Provide correction suggestions
   *
   */

  { rule_id             : 'ERROR_4',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    wcag_primary_id     : '3.3.3',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Error 4: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY = VISIBILITY;

      var control_elements   = dom_cache.controls_cache.control_elements;
      var control_elements_len = control_elements.length;

      // collect all the visible controls
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        var control_type = ce.control_type;

        if (control_type === CONTROL_TYPE.DATE        ||
              control_type === CONTROL_TYPE.EMAIL     ||
              control_type === CONTROL_TYPE.FILE      ||
              control_type === CONTROL_TYPE.NUMBER    ||
              control_type === CONTROL_TYPE.PASSWORD  ||
              control_type === CONTROL_TYPE.TEL       ||
              control_type === CONTROL_TYPE.TEXT      ||
              control_type === CONTROL_TYPE.URL ) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.node.getAttribute('type')]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.node.getAttribute('type')]);
          }
        }
        else {
          if ((control_type === CONTROL_TYPE.TEXTAREA) ||
              (control_type === CONTROL_TYPE.SELECT)) {
            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_2', [de.tag_name]);
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_2', [de.tag_name]);
            }
          }
        }
      }
*/
    } // end validate function
  },

  /**
   * @object ERROR_5
   *
   * @desc Provide error prevention
   *
   */

  { rule_id             : 'ERROR_5',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    wcag_primary_id     : '3.3.4',
    wcag_related_ids    : [],
    target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
    validate            : function (dom_cache, rule_result) {

      debug.log(`[Error 5: ${dom_cache} ${rule_result} ${TEST_RESULT}]`);

/*

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY = VISIBILITY;

      var control_elements     = dom_cache.controls_cache.control_elements;
      var control_elements_len = control_elements.length;

      var control_count = 0;

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

  //      console.log('[ERROR_5][tag]: ' + de.tag_name + ' [role]: ' + de.role + ' [isWidget]: ' + de.is_widget);

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.node.getAttribute('type')]);
          control_count += 1;
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.node.getAttribute('type')]);
        }
      }

      if (control_elements_len) {
        var page_element = dom_cache.headings_landmarks_cache.page_element;
        if (page_element && control_count) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
      }
*/
    } // end validate function
  }
];




