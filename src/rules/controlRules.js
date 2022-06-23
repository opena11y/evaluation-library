/* formControlRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Control Rules', true);


/*
 * OpenA11y Alliance Rules
 * Rule group: Form Control Rules
 */

export const controlRules = [

/**
 * @object CONTROL_1
 *
 * @desc textarea, select and input elements of type text,
 *       password, checkbox, radio and file must have an
 *       accessible name
 *
 */

{ rule_id             : 'CONTROL_1',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="date"]', 'input[type="file"]', 'input[type="radio"]', 'input[type="number"]', 'input[type="password"]', 'input[type="tel"]' , 'input[type="text"]', 'input[type="url"]', 'select', 'textarea', 'meter', 'progress'],
  validate            : function (dom_cache, rule_result) {
    let count = 1;
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      const ai = de.ariaInfo;
      if (ai.isNameRequired || de.isLabelable) {
        debug.log(`[CONTROL 1][${count++}][${de.tagName}][${de.node.type}][${de.role}]: ${de.accName.name ? `${de.accName.name}(${de.accName.source})` : 'none'}`);
        if (de.visibility.isVisibleToAT) {
          if (de.accName.name) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.accName.name]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      }
    });
  } // end validation function
},

/**
 * @object CONTROL_2
 *
 * @desc Every input type image must have an accessible name attribute with content
 */

{ rule_id             : 'CONTROL_2',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="image"]'],
  validate            : function (dom_cache, rule_result) {

    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_2]: ${info}`);

    /*
    var TEST_RESULT = TEST_RESULT;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;

        var type = control_elements[i].type;

        if (type === 'image') {

          if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

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

    */

  } // end validation function
 },

/**
 * @object CONTROL_3
 *
 * @desc Groups of radio buttons should be contained in fieldset/legend or have some other group label
 */
{ rule_id             : 'CONTROL_3',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="radio"]'],
  validate            : function (dom_cache, rule_result) {

    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_3]: ${info}`);


    /*
    var TEST_RESULT = TEST_RESULT;
    var VISIBILITY  = VISIBILITY;

    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {

      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        var type = control_elements[i].control_type;

        if (type == CONTROL_TYPE.RADIO) {

          if (cs.is_visible_to_at == VISIBILITY.VISIBLE) {

            if (ce.grouping_element) {
              var ge = ce.grouping_element;
              var dge = ge.dom_element;

              if (ge.control_type === CONTROL_TYPE.FIELDSET) {
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

    */

  } // end validate function
},

/**
 * @object CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 */
{ rule_id             : 'CONTROL_4',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['button'],
  validate            : function (dom_cache, rule_result) {

    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_4]: ${info}`);

    /*
    var TEST_RESULT  = TEST_RESULT;
    var VISIBILITY   = VISIBILITY;
    var CONTROL_TYPE = CONTROL_TYPE;

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
    */

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
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : ['3.3.2', '1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_5]: ${info}`);

    /*
    var TEST_RESULT = TEST_RESULT;
    var VISIBILITY  = VISIBILITY;
    var ID          = ID;

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
    */

  } // end validate function
},

/**
 * @object CONTROL_6
 *
 * @desc Label element with a for attribute reference does not reference a form control
 */
{ rule_id             : 'CONTROL_6',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_6]: ${info}`);

    /*
   var TEST_RESULT   = TEST_RESULT;
   var VISIBILITY = VISIBILITY;

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

    */

  } // end validate function
},

/**
 * @object CONTROL_7
 *
 * @desc Label or legend element must contain content
 */

{ rule_id             : 'CONTROL_7',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label', 'legend'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_7]: ${info}`);

    /*
   var TEST_RESULT   = TEST_RESULT;
   var VISIBILITY = VISIBILITY;

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
    */

  } // end validate function
},


/**
 * @object CONTROL 8
 *
 * @desc Fieldset must contain exactly one legend element
 */

{ rule_id             : 'CONTROL_8',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6', '4.1.1'],
  target_resources    : ['fieldset'],
  validate            : function (dom_cache, rule_result) {

    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_8]: ${info}`);

    /*
   var TEST_RESULT   = TEST_RESULT;
   var VISIBILITY = VISIBILITY;

   var grouping_elements      = dom_cache.controls_cache.grouping_elements;
   var grouping_elements_len  = grouping_elements.length;

   // Check to see if valid cache reference
   if (grouping_elements && grouping_elements_len) {

     for (var i = 0; i < grouping_elements_len; i++) {
       var fe = grouping_elements[i];

       if (fe.control_type !== CONTROL_TYPE.FIELDSET) continue;

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
    */

  } // end validate function
},

/**
 * @object CONTROL_9
 *
 * @desc Check form controls labeled using the TITLE attribute for accessible name
 */

{ rule_id             : 'CONTROL_9',
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['input', 'select', 'textarea'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_9]: ${info}`);


    /*
   var TEST_RESULT   = TEST_RESULT;
   var VISIBILITY = VISIBILITY;

   var control_elements      = dom_cache.controls_cache.control_elements;
   var control_elements_len  = control_elements.length;

   // Check to see if valid cache reference
   if (control_elements && control_elements_len) {

     for (var i = 0; i < control_elements_len; i++) {
       var ce = control_elements[i];
       var de = ce.dom_element;

       if (ce.computed_label_source === SOURCE.TITLE_ATTRIBUTE) {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [de.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.tag_name]);
         }
       }
     } // end loop
   }
    */

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
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_10]: ${info}`);

    /*
   var TEST_RESULT = TEST_RESULT;
   var VISIBILITY = VISIBILITY;

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
    */

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
  last_updated        : '2022-06-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="submit"]', 'input[type="reset"]','button[type="submit"]', 'button[type="reset"]'],
  validate            : function (dom_cache, rule_result) {


    let info = {
      dom_cache: dom_cache,
      rule_result: rule_result
    }

    debug.flag && debug.log(`[CONTROL_2]: ${info}`);

    /*

    function checkButtons(fe1) {

      var flag1 = false;
      var flag2 = false;

      var sb1 = fe1.submit_button ? fe1.submit_button : null;
      var rb1 = fe1.reset_button ? fe1.reset_button : null;

      for (var j = 0; j < form_elements_len; j += 1) {
        var fe2 = form_elements[j];

        if (fe1.cache_id === fe2.cache_id) {
          continue;
        }

        var sb2 = fe2.submit_button ? fe2.submit_button : null;
        var rb2 = fe2.reset_button  ? fe2.reset_button : null;

        if (!flag1 && sb1 && sb2 && (sb1.computed_label_for_comparison === sb2.computed_label_for_comparison)) {

          if (sb2.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (sb1.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
              if (sb1.dom_element.tag_name === 'button') {
                rule_result.addResult(TEST_RESULT.FAIL, sb1, 'ELEMENT_FAIL_1', ['submit']);
              } else {
                rule_result.addResult(TEST_RESULT.FAIL, sb1, 'ELEMENT_FAIL_2', ['submit']);
              }
            } else {
             rule_result.addResult(TEST_RESULT.HIDDEN, sb1, 'ELEMENT_HIDDEN_1', ['submit']);
            }
            flag1 = true;
          }
        }

        if (!flag2 && rb1 && rb2 && (rb1.computed_label_for_comparison === rb2.computed_label_for_comparison)) {

          if (rb2.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (rb1.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
              if (rb1.dom_element.tag_name === 'button') {
                rule_result.addResult(TEST_RESULT.FAIL, rb1, 'ELEMENT_FAIL_1', ['reset']);
              } else {
                rule_result.addResult(TEST_RESULT.FAIL, rb1, 'ELEMENT_FAIL_2', ['reset']);
              }
            } else {
             rule_result.addResult(TEST_RESULT.HIDDEN, rb1, 'ELEMENT_HIDDEN_1', ['reset']);
            }
            flag2 = true;
          }
        }

        if (flag1 && flag2) {
          return;
        }
      } // end loop
    }

   var TEST_RESULT  = TEST_RESULT;
   var VISIBILITY   = VISIBILITY;
   var CONTROL_TYPE =  CONTROL_TYPE;

   var form_elements   = dom_cache.controls_cache.form_elements;
   var form_elements_len = form_elements.length;
   var fes   = [];

   var input_submit_info = [];
   var input_reset_info  = [];

   // Check to see if valid cache reference
   if (form_elements && form_elements_len) {

     for (var i = 0; i < form_elements_len; i += 1) {
       var fe = form_elements[i];
       checkButtons(fe);
     } // end loop
   }

   */
  } // end validate function
}

];




