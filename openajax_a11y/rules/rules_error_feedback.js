/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object ERROR_1
 *
 * @desc Identify form controls with invalid values
 *
 */

{ rule_id             : 'ERROR_1',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.1',
  wcag_related_ids    : [],
  target_resources    : ['input[type="checkbox"]', 'input[type="date"]', 'input[type="file"]', 'input[type="radio"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', 'meter', 'progress'],
  primary_property    : 'aria-invalid',
  resource_properties : ['validity', 'validation_message', 'pattern'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      // collect all the visible controls
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        if (ce.has_validity) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (!ce.is_valid) {
              if (de.has_aria_invalid) {
                if (de.aria_invalid) rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [ce.toString()]);
                else rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', [ce.toString()]);
              }
              else {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [ce.toString()]);
              }
            }
            else {
              if (de.has_aria_invalid) {
                if (de.aria_invalid) rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_2', [ce.toString()]);
                else rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_2', [ce.toString()]);
              }
              else {
                if (ce.has_pattern) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_2', [ce.toString()]);
                else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_3', [ce.toString()]);
              }
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [ce].toString());
          }
        }
      } // end loop
    }
  } // end validate function
},

/**
 * @object ERROR_2
 *
 * @desc Use required attribute on required standard form controls
 *
 */

{ rule_id             : 'ERROR_2',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.3',
  wcag_related_ids    : [],
  target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea'],
  primary_property    : 'has_required',
  resource_properties : ['has_aria_required', 'aria_required'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // collect all the visible controls
    for (var i = 0; i < control_elements_len; i++) {
      var ce = control_elements[i];
      var de = ce.dom_element;
      var cs = de.computed_style;

      var control_type = ce.control_type;

      if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX  ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.DATE      ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.EMAIL     ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.FILE      ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.NUMBER    ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD  ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO     ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.TEL       ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT      ||
          control_type === OpenAjax.a11y.CONTROL_TYPE.URL ) {

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
        if ((control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA) ||
            (control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT)) {

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

  } // end validate function
},

/**
 * @object ERROR_3
 *
 * @desc Use aria-required attribute widgets
 *
 */

{ rule_id             : 'ERROR_3',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS_SCRIPTS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.3',
  wcag_related_ids    : [],
  target_resources    : ['[role=""],'],
  primary_property    : 'has_aria_required',
  resource_properties : ['aria_required'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

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
  } // end validate function
},

/**
 * @object ERROR_4
 *
 * @desc Provide correction suggestions
 *
 */

{ rule_id             : 'ERROR_4',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.3',
  wcag_related_ids    : [],
  target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
  primary_property    : 'aria-invalid',
  resource_properties : ['validity', 'validation_message', 'pattern'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // collect all the visible controls
    for (var i = 0; i < control_elements_len; i++) {
      var ce = control_elements[i];
      var de = ce.dom_element;
      var cs = de.computed_style;

      var control_type = ce.control_type;

      if (control_type === OpenAjax.a11y.CONTROL_TYPE.DATE        ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.EMAIL     ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.FILE      ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.NUMBER    ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD  ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEL       ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT      ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.URL ) {
        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.node.getAttribute('type')]);
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.node.getAttribute('type')]);
        }
      }
      else {
        if ((control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA) ||
            (control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT)) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_2', [de.tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_2', [de.tag_name]);
          }
        }
      }
    }

  } // end validate function
},

/**
 * @object ERROR_5
 *
 * @desc Provide error prevention
 *
 */

{ rule_id             : 'ERROR_5',
  last_updated        : '2015-04-09',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.4',
  wcag_related_ids    : [],
  target_resources    : ['input[type="text"]', 'input[type="date"]', 'input[type="file"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', '[role="textbox"]', '[role="combobox"]', '[role="gridcell"]'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

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

  } // end validate function
}


]);




