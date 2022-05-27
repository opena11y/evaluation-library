/* focusRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Focus Rules', true);

/*
 * OpenA11y Alliance Rules
 * Rule group: Focus Rules
 */

export const focusRules = [

/**
 * @object FOCUS_1
 *
 * @desc Focus order
 */

{ rule_id             : 'FOCUS_1',
  last_updated        : '2022-05-24',
  rule_scope          : RULE_SCOPE.PAGE,
  rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.3',
  wcag_related_ids    : ['2.1.1', '2.1.2', '2.4.7', '3.2.1'],
  target_resources    : ['Page', 'a', 'area', 'button', 'input', 'object', 'select', 'area', 'widgets'],
  validate            : function (dom_cache, rule_result) {

    let controlCount = 0
    let removedCount = 0;

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      if (de.isInteractiveElement ||
          (de.ariaInfo.isWidget && !de.ariaInfo.hasRequiredParents)) {
        if (de.visibility.isVisibleOnScreen) {
          controlCount += 1;
          if (de.isInteractiveElement && (de.tabIndex < 0)) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName, de.role, de.tabIndex]);
            removedCount += 1;
          }
          else {
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName, de.role]);
            } else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
            }
          }
        }
        else {
          if (de.hasRole) {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);
          }
        }
      }
    });

    if (controlCount > 1) {
      if (removedCount == 0) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', [controlCount]);
      }
      else {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_2', [controlCount, removedCount]);
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
  last_updated        : '2022-05-24',
  rule_scope          : RULE_SCOPE.PAGE,
  rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.7',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '3.2.1'],
  target_resources    : ['Page', 'a', 'applet', 'area', 'button', 'input', 'object', 'select', 'area', 'widgets'],
  validate            : function (dom_cache, rule_result) {

    let controlCount = 0
    let hiddenCount = 0;

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      if (de.isInteractiveElement ||
          de.ariaInfo.isWidget) {
        if (de.visibility.isVisibleOnScreen) {
          controlCount += 1;
          if (de.hasRole) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName, de.role]);
          } else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
          }
        }
        else {
          hiddenCount += 1;
          if (de.hasRole) {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);
          }
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


/*
     var VISIBILITY  = VISIBILITY;
     var TEST_RESULT = TEST_RESULT;

     var page_element = dom_cache.keyboard_focus_cache.page_element;

//     logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

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

//     logger.debug(" Visible Interactive Count: " + visible_interactive_count);

     if (visible_interactive_count > 1) {

       if (visible_interactive_count === interactive_elements_len) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', [interactive_elements_len]);
       }
       else {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [visible_interactive_count, (interactive_elements_len - visible_interactive_count)]);
       }

     }

*/

   } // end validation function

},

/**
 * @object FOCUS_3
 *
 * @desc Target of a link does not go to a page with popup windows
 */

{ rule_id             : 'FOCUS_3',
  last_updated        : '2022-05-24',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.LINKS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.2.1',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '2.4.7'],
  target_resources    : ['a', 'area', 'select'],
  validate            : function (dom_cache, rule_result) {

/*
     var VISIBILITY  = VISIBILITY;
     var TEST_RESULT = TEST_RESULT;

//     logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

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
*/

   } // end validation function
},

/**
 * @object FOCUS_4
 *
 * @desc Select elements with onchange events
 */

{ rule_id             : 'FOCUS_4',
  last_updated        : '2022-05-24',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : ['2.1.1', '2.1.2',  '2.4.3', '2.4.7'],
  target_resources    : ['select'],
  validate            : function (dom_cache, rule_result) {

/*
     var VISIBILITY  = VISIBILITY;
     var TEST_RESULT = TEST_RESULT;

//     logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

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
*/

   } // end validation function
},

/**
 * @object FOCUS_5
 *
 * @desc Form include a submit button
 *
 */

{ rule_id             : 'FOCUS_5',
  last_updated        : '2022-05-24',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : [],
  target_resources    : ['form', 'input[type="submit"]', 'input[type="button"]', 'input[type="image"]', 'button', '[role="button"]'],
  validate            : function (dom_cache, rule_result) {

/*
    function has_submit_button(control) {

      var cce = control.child_cache_elements;
      var cce_len = cce.length;

      var has_submit = false;

      for(var i = 0; i < cce_len; i++) {
        var ce = cce[i];
        var de = ce.dom_element;
        var cs = de.computed_style;

        if(ce.control_type === CONTROL_TYPE.SUBMIT) {
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

//        logger.debug("Control: " + ce + " de: " + de + " cs: " + cs);

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

    var TEST_RESULT  = TEST_RESULT;
    var VISIBILITY   = VISIBILITY;
    var CONTROL_TYPE =  CONTROL_TYPE;

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

//        logger.debug("Form: " + fe + " controls: " + fe.number_of_controls + " cache elements: " + fe.child_cache_elements);

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
    */

  } // end validate function
}

];




