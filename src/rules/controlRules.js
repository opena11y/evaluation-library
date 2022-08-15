/* controlRules.js */

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
 *       accessible name using label elements
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (!ce.isInputTypeImage) {
        if (de.isLabelable) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role, de.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
          }
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
  last_updated        : '2022-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="image"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (ce.isInputTypeImage) {
        if (de.visibility.isVisibleToAT) {
          if (de.accName.source !== 'none') {
            if (de.accName.name.length) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    });
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (ce.isInputTypeRadio) {
        if (de.visibility.isVisibleToAT) {
          const gce = ce.getGroupControlElement(); 
          if (gce) {
            const gde = gce.domElement;
            if (gde.tagName === 'fieldset') {
              debug.log(`[radio][${de.node.getAttribute('name')}]: ${de.accName.name} (${gde.accName.name})`);
              if (gde.accName.name) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [gde.accName.name]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);              
              }
            }
            else {
              if (gde.accName.name) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [gde.tagName, gde.role, gde.accName.name]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [gde.tagName, gde.role]);              
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);              
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    });
  } // end validate function
},

/**
 * @object CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 */
{ rule_id             : 'CONTROL_4',
  last_updated        : '2022-07-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : false,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['button'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (de.role === 'button') {
        if (de.visibility.isVisibleOnScreen) {
          if (ce.isInputTypeImage) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_4', [ce.typeAttr]);              
          }
            else {
            if (de.tagName === 'input') {
              if (de.accName.source === 'value') {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [ce.typeAttr]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [ce.typeAttr]);              
              }            
            }
            else {
              if (de.tagName === 'button') {
                if (ce.hasTextContent) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
                }
                else {
                  if (ce.hasSVGContent) {
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);
                  }
                }            
              }
              else {
                if (ce.hasTextContent) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.tagName]);
                }
                else {
                  if (ce.hasSVGContent) {
                    rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tagName]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [de.tagName]);
                  }
                }                          
              }
            }
          }
        }
        else {
          if (de.tagName === 'input' || ce.isInputTypeImage) {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [ce.typeAttr]);
          }
          else {
            if (de.tagName === 'button') {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_3', [de.tagName]);            
            }
          }
        }
      }
    });
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (de.id) {
        const docIndex = de.parentInfo.documentIndex;
        if (dom_cache.idInfo.idCountsByDoc[docIndex][de.id] > 1) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName, de.id]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tagName, de.id]);
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.id]);
        }
      }
    });
  } // end validate function
},

/**
 * @object CONTROL_6
 *
 * @desc Label element with a for attribute reference does not reference a form control
 */
{ rule_id             : 'CONTROL_6',
  last_updated        : '2022-07-11',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (ce.isLabel && ce.labelForAttr) {
        if (de.visibility.isVisibleToAT) {
          if (ce.isLabelForAttrValid) {
            if (ce.labelforTargetUsesAriaLabeling) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [ce.labelForAttr]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [ce.labelForAttr]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [ce.labelForAttr]);
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    });
  } // end validate function
},

/**
 * @object CONTROL_7
 *
 * @desc Label or legend element must contain text content
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (ce.isLabel || ce.isLegend) {
        if (de.visibility.isVisibleOnScreen) {
          if (ce.hasTextContent) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
          }
          else {
            if (ce.hasSVGContent) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
            }
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      }
    });  
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      let le;
      if (ce.isFieldset) {
        if (de.visibility.isVisibleToAT) {

          const legendCount = ce.legendElements.length;

          switch (legendCount) {
            case 0:
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
              break;

            case 1:
              le = ce.legendElements[0];
              if (le.domElement.visibility.isVisibleToAT) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', []);
              }
              break;
            
            default:
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [legendCount]);
              break;  
          }

        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      }
    });  
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
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (de.accName.source === 'title') {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
        }
        else {      
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      }
    });  
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

    dom_cache.controlInfo.allControlElements.forEach(ce1 => {
      const de1 = ce1.domElement;
      let count;
      if (de1.ariaInfo.isNameRequired) {
        if (de1.visibility.isVisibleToAT) {
          count = 0;
          dom_cache.controlInfo.allControlElements.forEach(ce2 => {
            const de2 = ce2.domElement;
            if ((ce1 !== ce2) && 
                ((de1.ariaInfo.requiredParents.length === 0) || 
                 (ce1.parentControlElement === ce2.parentControlElement)) &&
                de2.ariaInfo.isNameRequired && 
                de2.visibility.isVisibleToAT) {
              if ((de1.role === de2.role) && 
                  (ce1.nameForComparision === ce2.nameForComparision)) {
                count += 1;
              }
            }
          });
          if (count === 0){
            rule_result.addElementResult(TEST_RESULT.PASS, de1, 'ELEMENT_PASS_1', []);
          } 
          else {
            // Since their ar often duplicate button on pages, when two or more buttons share the same
            // name it should be a manual check
            if (de1.role === 'button') {
              if (de1.hasRole) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de1, 'ELEMENT_MC_1', [de1.tagName, de1.role]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de1, 'ELEMENT_MC_2', [de1.tagName]);
              }
            }
            else {
              if (de1.hasRole) {
                rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_1', [de1.tagName, de1.role]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_2', [de1.tagName]);
              }
            }
          }
        }
        else {
          if (de1.hasRole) {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de1, 'ELEMENT_HIDDEN_1', [de1.tagName, de1.role]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de1, 'ELEMENT_HIDDEN_2', [de1.tagName]);
          }
        }
      }
    });  
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
  last_updated        : '2022-08-08',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="submit"]', 'input[type="reset"]','button[type="submit"]', 'button[type="reset"]'],
  validate            : function (dom_cache, rule_result) {

    let de1, de2, count;

    if (dom_cache.controlInfo.allFormElements.length > 1 ) {
      dom_cache.controlInfo.allFormElements.forEach(fe1 => {
        const sb1 = fe1.getButtonControl('submit');
        if (sb1) {
          de1 = sb1.domElement;
          count = 0;
          if (de1.visibility.isVisibleToAT) {
            dom_cache.controlInfo.allFormElements.forEach(fe2 => {
              if (fe1 !== fe2) {
                const sb2 = fe2.getButtonControl('submit');
                if (sb1 && sb2) {
                  de2 = sb2.domElement;
                  if (de2.visibility.isVisibleToAT && 
                      (sb1.nameForComparision === sb2.nameForComparision)) {
                    count += 1;
                  }
                }
              }
            });
            if (count) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_1', [de1.tagName, de1.typeAttr, de1.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de1, 'ELEMENT_PASS_1', [de1.tagName, de1.typeAttr, de1.accName.name]);                
            }          
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de1, 'ELEMENT_HIDDEN_1', [de1.tagName, de1.typeAttr]);
          }
        }

        const rb1 = fe1.getButtonControl('reset');
        if (rb1) {
          de1 = rb1.domElement;
          count = 0;
          if (de1.visibility.isVisibleToAT) {
            dom_cache.controlInfo.allFormElements.forEach(fe2 => {
              if (fe1 !== fe2) {
                const rb2 = fe2.getButtonControl('reset');
                if (rb1 && rb2) {
                  de2 = rb2.domElement;
                  if (de2.visibility.isVisibleToAT && 
                      (rb1.nameForComparision === rb2.nameForComparision)) {
                    count += 1;
                  }
                }
              }
            });
            if (count) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_1', [de1.tagName, de1.typeAttr, de1.accName.name]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de1, 'ELEMENT_PASS_1', [de1.tagName, de1.typeAttr, de1.accName.name]);                
            }          
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de1, 'ELEMENT_HIDDEN_1', [de1.tagName, de1.typeAttr]);
          }
        }
      });
    }
  } // end validate function
}

];




