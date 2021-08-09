/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
 * @object FOCUS_1
 *
 * @desc Focus order
 */

{ rule_id             : 'FOCUS_1',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.4.3',
  wcag_related_ids    : ['2.1.1', '2.1.2', '2.4.7', '3.2.1'],
  target_resources    : ['Page', 'a', 'applet', 'area', 'button', 'input', 'object', 'select', 'area', 'widgets'],
  primary_property    : 'tabindex',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

     var page_element = dom_cache.keyboard_focus_cache.page_element;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var interactive_elements     = dom_cache.keyboard_focus_cache.interactive_elements;
     var interactive_elements_len = interactive_elements.length;

     var tab_count = 0;
     var visible_count = 0;

     for (var i = 0; i < interactive_elements_len; i++) {

       var ie = interactive_elements[i];

       var de = ie.dom_element;
       if (!de) de =ie;

       var cs = de.computed_style;

       if ((cs.is_visible_to_at    === VISIBILITY.VISIBLE) ||
           (cs.is_visible_onscreen === VISIBILITY.VISIBLE)) {

         visible_count++;

         if (de.tab_index >= 0) {
           if (de.is_widget) {
             // only include widgets that can be part of the tab order
             if (de.is_tab_stoppable) {
                tab_count++;
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [de.tag_name, de.role]);
             }
           }
           else {
             tab_count++;
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tag_name]);
           }
         }
         else {
           if (de.is_widget) {
             // only include widgets that can be part of the tab order
             if (de.is_tab_stoppable) {
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_3', [de.tag_name, de.role, de.tab_index]);
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_4', [de.tag_name, de.tab_index]);
           }
         }

       }
       else {

         if (de.is_widget) {
           // only include widgets that can be part of the tab order
           if (de.is_tab_stoppable) {
             rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name, de.role]);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_2', [de.tag_name]);
         }
       }
     }  // endfor

 //    OpenAjax.a11y.logger.debug(" Visible count: " + visible_count + "  Tab count: " + tab_count);

     if (visible_count > 1) {

       if (tab_count === visible_count) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', [tab_count]);
       }
       else {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [tab_count, (visible_count-tab_count)]);
       }

     }


   } // end validation function
},

/**
 * @object FOCUS_2
 *
 * @desc Focus style
 */

{ rule_id             : 'FOCUS_2',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.4.7',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '3.2.1'],
  target_resources    : ['Page', 'a', 'applet', 'area', 'button', 'input', 'object', 'select', 'area', 'widgets'],
  primary_property    : 'has_outline',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

     var page_element = dom_cache.keyboard_focus_cache.page_element;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var interactive_elements     = dom_cache.keyboard_focus_cache.interactive_elements;
     var interactive_elements_len = interactive_elements.length;

     var visible_interactive_count = 0;

     for (var i = 0; i < interactive_elements_len; i++) {

       var ie = interactive_elements[i];

       var de = ie.dom_element;
       if (!de) de =ie;

       var cs = de.computed_style;

       if (cs.is_visible_onscreen === VISIBILITY.VISIBLE) {

         visible_interactive_count++;

         if (de.is_widget) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [de.tag_name, de.role]);
         }
         else {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tag_name]);
         }

       }
       else {

         if (de.is_widget) {
           rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name, de.role]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_2', [de.tag_name]);
         }

       }
     }  // endfor

//     OpenAjax.a11y.logger.debug(" Visible Interactive Count: " + visible_interactive_count);

     if (visible_interactive_count > 1) {

       if (visible_interactive_count === interactive_elements_len) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', [interactive_elements_len]);
       }
       else {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [visible_interactive_count, (interactive_elements_len - visible_interactive_count)]);
       }

     }


   } // end validation function

},

/**
 * @object FOCUS_3
 *
 * @desc Target of a link does not go to a page with popup windows
 */

{ rule_id             : 'FOCUS_3',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.2.1',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '2.4.7'],
  target_resources    : ['a', 'area', 'select'],
  primary_property    : 'href',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var link_elements     = dom_cache.links_cache.link_elements;
     var link_elements_len = link_elements.length;

     for (var i = 0; i < link_elements_len; i++) {

       var le = link_elements[i];

       var de = le.dom_element;
       if (!de) de =le;

       var cs = de.computed_style;

       if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [de.tag_name]);

       }
       else {
         rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name, de.role]);
       }
     }  // endfor

   } // end validation function
},

/**
 * @object FOCUS_4
 *
 * @desc Select elements with onchange events
 */

{ rule_id             : 'FOCUS_4',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '2.4.7'],
  target_resources    : ['select'],
  primary_property    : 'events.has_change',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var control_elements     = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;

     for (var i = 0; i < control_elements_len; i++) {

       var ce = control_elements[i];

       var de = ce.dom_element;

       var cs = de.computed_style;

       if ((de.tag_name === 'select') &&
            de.events.has_change) {

         if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.tag_name, de.role]);
         }
       }
     }  // endfor

   } // end validation function
},

/**
 * @object FOCUS_5
 *
 * @desc Form include a submit button
 *
 */

{ rule_id             : 'FOCUS_5',
  last_updated        : '2014-11-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : [],
  target_resources    : ['form', 'input[type="submit"]', 'input[type="button"]', 'input[type="image"]', 'button', '[role="button"]'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function has_submit_button(control) {

      var cce = control.child_cache_elements;
      var cce_len = cce.length;

      var has_submit = false;

      for(var i = 0; i < cce_len; i++) {
        var ce = cce[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        if(ce.control_type === OpenAjax.a11y.CONTROL_TYPE.SUBMIT) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_2', []);
            has_submit = true;
          }
          else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_2', []);                          }
        }

        if (ce.child_cache_elements && ce.child_cache_elements.length) {
          has_submit = has_submit || has_submit_button(ce);
        }

      }

      return has_submit;

    }

    function has_other_button(control, count) {

      var cee = control.child_cache_elements;
      var cee_len = cee.length;

      for(var i = 0; i < cee_len; i++) {
        var ce = cee[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

//        OpenAjax.a11y.logger.debug("Control: " + ce + " de: " + de + " cs: " + cs);

        if (ce.control_type === CONTROL_TYPE.BUTTON_INPUT) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_3', ['button']);
            count += 1;
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_3', ['button']);
          }
        }
        else {
           if (ce.control_type === CONTROL_TYPE.IMAGE) {
             if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_3', ['image']);
               count += 1;
             }
             else {
               rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_3', ['image']);
             }
           }
           else {
             if (ce.control_type === CONTROL_TYPE.BUTTON_ELEMENT) {
               if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
                 rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_4', []);
                 count += 1;
               }
               else {
                 rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_4', []);
               }
             }
             else {
               if (de.has_role && (de.role === 'button')) {
                 if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
                  rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_5', [de.tag_name]);
                   count += 1;
                 }
                 else {
                  rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_5', [de.tag_name]);
                 }
               }
             }
           }
        }

        if (ce.child_cache_elements && ce.child_cache_elements.length) {
          count += has_other_button(ce, count);
        }

      }

      return count;

    }

    function hasVisibleFormControls(controls) {

      for (var i = 0; i < controls.length; i++) {

        var ce = controls[i];
        if (ce.control_type === CONTROL_TYPE.LABEL) continue;

        var de = ce.dom_element;
        var cs = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          return true;
        }
        else {
          if (ce.child_cache_elements && ce.child_cache_elements.length) {
            var result = hasVisibleFormControls(ce.child_cache_elements);
            if (result) return true;
          }
        }
      }

      return false;
    }

    var TEST_RESULT  = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY   = OpenAjax.a11y.VISIBILITY;
    var CONTROL_TYPE =  OpenAjax.a11y.CONTROL_TYPE;

    var form_elements   = dom_cache.controls_cache.form_elements;
    var form_elements_len = form_elements.length;

    // Check to see if valid cache reference
    if (form_elements && form_elements_len) {

      // collect all the visible controls
      for (var i = 0; i < form_elements_len; i++) {
        var fe = form_elements[i];
        var de = fe.dom_element;
        var cs = de.computed_style;

        var control_type = fe.control_type;

//        OpenAjax.a11y.logger.debug("Form: " + fe + " controls: " + fe.number_of_controls + " cache elements: " + fe.child_cache_elements);

        if ((control_type === CONTROL_TYPE.FORM) &&
            (fe.number_of_controls > 0) &&
            (hasVisibleFormControls(fe.child_cache_elements))) {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (has_submit_button(fe)) {
              rule_result.addResult(TEST_RESULT.PASS, fe, 'ELEMENT_PASS_1', []);
            }
            else {
              var button_count = has_other_button(fe, 0);

              if (button_count === 1) {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, fe, 'ELEMENT_MC_1', []);
              }
              else {
                if (button_count > 1) {
                  rule_result.addResult(TEST_RESULT.MANUAL_CHECK, fe, 'ELEMENT_MC_2', [button_count]);
                }
                else {
                  rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_1', []);
                }
              }
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'ELEMENT_HIDDEN_1', []);
          }
        }
      } // end loop
    }
  } // end validate function
},

/**
 * @object FOCUS_6
 *
 * @desc Checkbox and radio button events cause a change in context
 *
 */

{ rule_id             : 'FOCUS_6',
  last_updated        : '2014-08-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP3,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : [],
  target_resources    : ['input[type="submit"]'],
  primary_property    : '',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT  = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY   = OpenAjax.a11y.VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      // collect all the visible controls
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        var control_type = ce.control_type;

//        OpenAjax.a11y.logger.debug(fe);

        if ((control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX) ||
            (control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO)) {

          if ((de.role === 'checkbox') || (de.role === 'radio')) {
            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_2', [de.tag_name, de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_2', [de.tag_name, de.role]);
            }
          }
          else {
            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [ce.type]);
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [ce.type]);
            }
          }
        }
      } // end loop
    }
  } // end validate function
}


]);




