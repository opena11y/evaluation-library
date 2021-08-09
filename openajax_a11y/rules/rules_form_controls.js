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
 * @object CONTROL_1
 *
 * @desc textarea, select and input elements of type text,
 *       password, checkbox, radio and file must have an
 *       accessible label
 *
 */

{ rule_id             : 'CONTROL_1',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="date"]', 'input[type="file"]', 'input[type="radio"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', 'meter', 'progress'],
  primary_property    : 'computed_label',
  resource_properties : ['computed_label_source', 'name_attribute', 'fieldset_element'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];

        if (ce.needs_label) {

          if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {

            if (ce.computed_label && ce.computed_label.length) {
              rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [ce.toString(), ce.computed_label]);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', [ce.toString()]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [ce.toString()]);
          }
        }
      } // end loop
    }
  } // end validation function
},

/**
 * @object CONTROL_2
 *
 * @desc Every input type image must have an accessible name attribute with content
 */

{ rule_id             : 'CONTROL_2',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="image"]'],
  primary_property    : 'computed_label',
  resource_properties : ['computed_label_source', 'alt', 'aria_label', 'aria_labelledby', 'title'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;

        var type = control_elements[i].type;

        if (type === 'image') {

          if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {

            if (ce.computed_label) {
              if (ce.computed_label.length) {
                rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [ce.computed_label]);
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_2', []);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', []);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', []);
          }
        }
      } // end loop
    }
  } // end validation function
 },

/**
 * @object CONTROL_3
 *
 * @desc Groups of radio buttons should be contained in fieldset/legend or have some other group label
 */
{ rule_id             : 'CONTROL_3',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="radio"]'],
  primary_property    : 'grouping_element',
  resource_properties : [''],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        var type = control_elements[i].control_type;

        if (type == OpenAjax.a11y.CONTROL_TYPE.RADIO) {

          if (cs.is_visible_to_at == VISIBILITY.VISIBLE) {

            if (ce.grouping_element) {
              var ge = ce.grouping_element;
              var dge = ge.dom_element;

              if (ge.control_type === OpenAjax.a11y.CONTROL_TYPE.FIELDSET) {
                if (ge.legend_element &&
                    ge.legend_element.computed_label &&
                    ge.legend_element.computed_label.length) {
                  rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [ge.legend_element.computed_label]);
                }
                else {
                  rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_2', []);
                }
              }
              else {
                if (ge.computed_label &&
                    ge.computed_label.length) {
                  rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_2', [dge.tag_name, ce.grouping_element.computed_label]);
                }
                else {
                  rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_3', [dge.tag_name]);
                }
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', []);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', []);
          }
        }
      } // end loop
    }
  } // end validate function
},

/**
 * @object CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 */
{ rule_id             : 'CONTROL_4',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['button'],
  primary_property    : 'computed_label',
  resource_properties : ['computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT  = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY   = OpenAjax.a11y.VISIBILITY;
    var CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE;

    var control_elements     = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;


        if (ce.control_type === CONTROL_TYPE.BUTTON_ELEMENT) {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (ce.computed_label_for_comparison.length > 0) {
              rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', []);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', []);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', []);
          }

        }
        else {

          if (ce.control_type === CONTROL_TYPE.BUTTON_INPUT) {

            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

              if (ce.value && (ce.value.length > 0)) {
                rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', []);
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', []);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', []);
            }
          }
        }

      } // end loop
    }

  } // end validate function
},


/**
 * @object CONTROL_5
 *
 * @desc Ids on form controls must be unique
 *
 * @note Do not need to test for invisible elements, since getElementById searches all elements int he DOM
 */
{ rule_id             : 'CONTROL_5',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : ['3.3.2', '1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  primary_property    : 'id',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var ID          = OpenAjax.a11y.ID;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        switch (de.id_unique) {
        case ID.NOT_UNIQUE:
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', [de.tag_name, de.id]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_2', [de.tag_name, de.id]);
          }
          break;

        case ID.UNIQUE:
          rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', [de.id]);
          break;

        default:
          break;
        } // end switch

     } // end loop
   }
  } // end validate function
},

/**
 * @object CONTROL_6
 *
 * @desc Label element with a for attribute reference does not reference a form control
 */
{ rule_id             : 'CONTROL_6',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label'],
  primary_property    : 'for',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var label_elements      = dom_cache.controls_cache.label_elements;
   var label_elements_len  = label_elements.length;

   // Check to see if valid cache reference
   if (label_elements && label_elements_len) {

     for (var i = 0; i < label_elements_len; i++) {
       var le = label_elements[i];
       var de = le.dom_element;

       if (le.for_id && le.for_id.length) {

         if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
           if (le.unused_label) {
              rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [le.for_id]);
           }
           else {
              if (le.duplicate_label) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [le.for_id]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [le.for_id]);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', []);
         }
      }
     } // end loop
   }
  } // end validate function
},

/**
 * @object CONTROL_7
 *
 * @desc Label or legend element must contain content
 */

{ rule_id             : 'CONTROL_7',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label', 'legend'],
  primary_property    : 'computed_label',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var label_elements      = dom_cache.controls_cache.label_elements;
   var label_elements_len  = label_elements.length;

   // Check to see if valid cache reference
   if (label_elements && label_elements_len) {

     for (var i = 0; i < label_elements_len; i++) {
       var le = label_elements[i];
       var de = le.dom_element;
       var cs = de.computed_style;

       if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (le.computed_label_for_comparison.length === 0) {
           rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [le.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [le.tag_name]);
         }
       }
       else {
         rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [le.tag_name]);
       }
     } // end loop
   }
  } // end validate function
},


/**
 * @object CONTROL 8
 *
 * @desc Fieldset must contain exactly one legend element
 */

{ rule_id             : 'CONTROL_8',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6', '4.1.1'],
  target_resources    : ['fieldset'],
  primary_property    : 'legend_count',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var grouping_elements      = dom_cache.controls_cache.grouping_elements;
   var grouping_elements_len  = grouping_elements.length;

   // Check to see if valid cache reference
   if (grouping_elements && grouping_elements_len) {

     for (var i = 0; i < grouping_elements_len; i++) {
       var fe = grouping_elements[i];

       if (fe.control_type !== OpenAjax.a11y.CONTROL_TYPE.FIELDSET) continue;

       var de = fe.dom_element;

       if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (fe.legend_count === 0 || !fe.legend_element ) {
           rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_1', []);
         }
         else {
           if (fe.legend_count > 1) {
             rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_2', [(fe.legend_count-1)]);
           }
           else {
             de = fe.legend_element.dom_element;

             if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
               rule_result.addResult(TEST_RESULT.PASS, fe, 'ELEMENT_PASS_1', []);
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_3', []);
             }
           }
         }
       }
       else {
         rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'ELEMENT_HIDDEN_1', []);
       }
     } // end loop
   }

  } // end validate function
},

/**
 * @object CONTROL_9
 *
 * @desc Check form controls labeled using the TITLE attribute for accessible name
 */

{ rule_id             : 'CONTROL_9',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['input', 'select', 'textarea'],
  primary_property    : 'title',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var control_elements      = dom_cache.controls_cache.control_elements;
   var control_elements_len  = control_elements.length;

   // Check to see if valid cache reference
   if (control_elements && control_elements_len) {

     for (var i = 0; i < control_elements_len; i++) {
       var ce = control_elements[i];
       var de = ce.dom_element;

       if (ce.computed_label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.tag_name]);
         }
       }
     } // end loop
   }

  } // end validate function
},

/**
 * @object CONTROL_10
 *
 * @desc Accessible labels must be unique for every textarea,
 *       select and input element of type text, password, radio,
 *       and checkbox on a page
 */

{ rule_id             : 'CONTROL_10',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  primary_property    : 'computed_label',
  resource_properties : ['computed_label', 'fieldset_element', 'computed_label_source', 'name_attribute'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var control_elements   = dom_cache.controls_cache.control_elements;
   var control_elements_len = control_elements.length;
   var ces   = [];
   var ces_len = 0;
   var i, j;

   // Check to see if valid cache reference
   if (control_elements && control_elements_len) {

     // collect all the visible controls
     for (i = 0; i < control_elements_len; i++) {
       var ce = control_elements[i];
       var de = ce.dom_element;

//      console.debug("[CONTROL_10][element]: " + de.tag_name + " [role]: " + de.role + " [accname]: " + ce.computed_label + ' [needs_label]: ' + ce.needs_label);

       if (ce.needs_label) {

         var control_type = ce.toString();

         if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
           // Only test form controls with labels
           if (ce.computed_label && ce.computed_label.length) {
             ces.push(ce);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [control_type]);
         }
       }
     } // end loop

     // sort labels

     ces = dom_cache.sortArrayOfObjects(ces,'computed_label_for_comparison', true);
     ces = dom_cache.getDuplicateObjects(ces,'computed_label_for_comparison');

     for (i = 0; i < ces.length; i++) {
       ces_len = ces[i].length;

       ce      = ces[i][0];
       de      = ce.dom_element;

       if ((ces_len === 1) ||
           ((ces_len === 2) && ((de.role === 'tab') || (de.role === 'tabpanel')))) {
         rule_result.addResult(TEST_RESULT.PASS, ce, 'ELEMENT_PASS_1', []);
         if (ces_len === 2) rule_result.addResult(TEST_RESULT.PASS, ces[i][1], 'ELEMENT_PASS_1', []);
       }
       else {
         for (j = 0; j < ces_len; j++) {
           rule_result.addResult(TEST_RESULT.FAIL, ces[i][j], 'ELEMENT_FAIL_1', []);
         }
       }
     }

   }
  } // end validate function
},

/**
 * @object CONTROL_11
 *
 * @desc If there is more than one form on page, input element of type
 *       submit and reset must have unique labels in each form using the value attribute
 *
 */

{ rule_id             : 'CONTROL_11',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="submit"]', 'input[type="reset"]'],
  primary_property    : 'computed_label',
  resource_properties : ['value'],
  language_dependency : "",
  validate            : function (/* dom_cache, rule_result */) {

/* This rule needs to be completed
   function get_input_by_type(list, form, type) {

   }

   var TEST_RESULT  = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY   = OpenAjax.a11y.VISIBILITY;
   var CONTROL_TYPE =  OpenAjax.a11y.CONTROL_TYPE;

   var form_elements   = dom_cache.controls_cache.form_elements;
   var form_elements_len = form_elements.length;
   var fes   = [];

   var input_submit_info = [];
   var input_reset_info  = [];

   // Check to see if valid cache reference
   if (form_elements && form_elements_len) {

     // collect all the visible submit and reset buttons controls
     for (var i = 0; i < form_elements_len; i++) {
       var fe = form_elements[i];
       var de = fe.dom_element;
       var cs = de.computed_style;

       var control_type = fe.control_type;

       if (control_type === OpenAjax.a11y.CONTROL_TYPE.FORM) {

         if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

           get_input_by_type(input_submit_info, fe, 'submit');
           get_input_by_type(input_reset_info, fe, 'reset');

         }
       }
     } // end loop
   }
*/
  } // end validate function

}
]);




