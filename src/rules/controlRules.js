/* controlRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Control Rules', false);
debug.flag = false;

const autoFillValues = [
  'name',
  'honorific-prefix',
  'given-name',
  'additional-name',
  'family-name',
  'honorific-suffix',
  'nickname',
  'organization-title',
  'username',
  'new-password',
  'current-password',
  'organization',
  'street-address',
  'address-line1',
  'address-line2',
  'address-line3',
  'address-level4',
  'address-level3',
  'address-level2',
  'address-level1',
  'country',
  'country-name',
  'postal-code',
  'cc-name',
  'cc-given-name',
  'cc-additional-name',
  'cc-family-name',
  'cc-number',
  'cc-exp',
  'cc-exp-month',
  'cc-exp-year',
  'cc-csc',
  'cc-type',
  'transaction-currency',
  'transaction-amount',
  'language',
  'bday',
  'bday-day',
  'bday-month',
  'bday-year',
  'sex',
  'url',
  'photo',
  'tel',
  'tel-country-code',
  'tel-national',
  'tel-area-code',
  'tel-local',
  'tel-local-prefix',
  'tel-local-suffix',
  'tel-extension',
  'email',
  'impp',
];


/*
 * OpenA11y Alliance Rules
 * Rule Category: Form Control Rules
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
  rule_required       : true,
  first_step          : true,
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
  rule_required       : true,
  first_step          : true,
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
  rule_required       : true,
  first_step          : true,
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
  rule_required       : false,
  first_step          : false,
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
  rule_required       : true,
  first_step          : false,
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
  rule_required       : true,
  first_step          : false,
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
  rule_required       : true,
  first_step          : false,
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
  rule_required       : true,
  first_step          : false,
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
  rule_required       : true,
  first_step          : false,
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
  rule_required       : true,
  first_step          : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.controlInfo.allControlElements.forEach(ce1 => {
      const de1 = ce1.domElement;
      if (de1.ariaInfo.isDPUBRole || de1.role === 'option') {
        return;
      }
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
  rule_required       : true,
  first_step          : false,
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
},

/**
 * @object CONTROL_12
 *
 * @desc Form include a submit button
 *
 */

{ rule_id             : 'CONTROL_12',
  last_updated        : '2023-08-22',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : true,
  wcag_primary_id     : '3.2.2',
  wcag_related_ids    : [],
  target_resources    : ['form', 'input[type="submit"]', 'input[type="button"]', 'input[type="image"]', 'button', '[role="button"]'],
  validate            : function (dom_cache, rule_result) {

    function getChildButtonDomElements (ce) {
      let buttonDomElements = [];

      ce.childControlElements.forEach( cce => {
        const de = cce.domElement;
        if (de.role === 'button') {
          buttonDomElements.push(de);
        }
        buttonDomElements = buttonDomElements.concat(getChildButtonDomElements(cce));
      });

      return buttonDomElements;
    }

    dom_cache.controlInfo.allFormElements.forEach( fce => {
      const de = fce.domElement;
      if (de.visibility.isVisibleOnScreen) {
        const buttonDomElements = getChildButtonDomElements(fce);
        let submitButtons = 0;
        let otherButtons  = 0;

        buttonDomElements.forEach( b => {
          if (b.tagName === 'input') {
            const type = b.node.getAttribute('type');
            if (type === 'submit') {
              if (b.visibility.isVisibleOnScreen) {
                submitButtons += 1;
                rule_result.addElementResult(TEST_RESULT.PASS, b, 'ELEMENT_PASS_2', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.HIDDEN, b, 'ELEMENT_HIDDEN_2', []);
              }
            }
            else {
              if ((type === 'button') || (type === "image")) {
               if (b.visibility.isVisibleOnScreen) {
                  otherButtons += 1;
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, b, 'ELEMENT_MC_3', [type]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.HIDDEN, b, 'ELEMENT_HIDDEN_3', [type]);
                }
              }
            }
          }
          else {
            if (b.tagName === 'button') {
             if (b.visibility.isVisibleOnScreen) {
                otherButtons += 1;
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, b, 'ELEMENT_MC_4', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.HIDDEN, b, 'ELEMENT_HIDDEN_4', []);
              }
            } else {
              if (b.role === 'button') {
               if (b.visibility.isVisibleOnScreen) {
                  otherButtons += 1;
                  rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, b, 'ELEMENT_MC_5', [b.tagName]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.HIDDEN, b, 'ELEMENT_HIDDEN_5', [b.tagName]);
                }
              }
            }
          }
        });

        if (submitButtons > 0) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
        }
        else {
          if (otherButtons > 0) {
            if (otherButtons === 1) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [otherButtons]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
          }
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
      }
    });

  } // end validation function
},

/**
 * @object CONTROL_13
 *
 * @desc Use names that support autocomplete
 *
 */

{ rule_id             : 'CONTROL_13',
  last_updated        : '2023-09-18',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : false,
  wcag_primary_id     : '1.3.5',
  wcag_related_ids    : ['3.3.2', '2.4.6'],
  target_resources    : ['input[type="text"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (ce.isInputTypeText) {
        if (de.visibility.isVisibleToAT) {
          if (autoFillValues.includes(ce.nameAttr)) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, ce.nameAttr]);
          } else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      }
    });
  } // end validation function
},

/**
 * @object CONTROL_14
 *
 * @desc   HTML form controls must use native properties and states
 */
{ rule_id             : 'CONTROL_14',
  last_updated        : '2023-09-30',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : false,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : [],
  target_resources    : ["input", "option", "select", "textarea"],
  validate          : function (dom_cache, rule_result) {

    function checkForNativeStates (domElement, ariaAttr, htmlAttr, result='fail') {

      if (domElement.node.hasAttribute(ariaAttr)) {
        if (domElement.visibility.isVisibleToAT) {
          if (result === 'fail') {
            rule_result.addElementResult(TEST_RESULT.FAIL, domElement, 'ELEMENT_FAIL_1', [htmlAttr, ariaAttr, domElement.elemName]);
          } else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domElement, 'ELEMENT_MC_1', [htmlAttr, ariaAttr, domElement.elemName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, domElement, 'ELEMENT_HIDDEN_1', [ariaAttr, domElement.elemName]);
        }
      }
    }

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      switch (de.tagName) {
        case 'button':
          checkForNativeStates(de, 'aria-disabled', 'disabled', 'mc');
          break;

        case 'fieldset':
          checkForNativeStates(de, 'aria-disabled', 'disabled', 'mc');
          break;

        case 'input':
          checkForNativeStates(de, 'aria-disabled', 'disabled', 'mc');
          checkForNativeStates(de, 'aria-invalid',  'invalid');
          checkForNativeStates(de, 'aria-required', 'required');
          if ((de.typeAttr === 'checkbox') || (de.typeAttr === 'radio')) {
            checkForNativeStates(de, 'aria-checked', 'checked');
          }
          break;

        case 'option':
          checkForNativeStates(de, 'aria-disabled', 'disabled');
          checkForNativeStates(de, 'aria-selected', 'selected');
          break;

        case 'select':
          checkForNativeStates(de, 'aria-disabled', 'disabled', 'mc');
          checkForNativeStates(de, 'aria-invalid',  'invalid');
          checkForNativeStates(de, 'aria-required', 'required');
          checkForNativeStates(de, 'aria-multiselectable', 'multiple');
          break;

        case 'textarea':
          checkForNativeStates(de, 'aria-disabled', 'disabled', 'mc');
          checkForNativeStates(de, 'aria-invalid',  'invalid');
          checkForNativeStates(de, 'aria-required', 'required');
          break;
      }
    });

  } // end validation function
},

/**
 * @object CONTROL_15
 *
 * @desc   Label in Name
 */

{ rule_id             : 'CONTROL_15',
  last_updated        : '2023-12-01',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : false,
  wcag_primary_id     : '2.5.3',
  wcag_related_ids    : [],
  target_resources    : ["input", "output", "select", "textarea", "widgets"],
  validate          : function (dom_cache, rule_result) {

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;

      if (ce.isInteractive) {
        if (de.accName.includesAlt) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
        else {
          if (de.accName.includesAriaLabel) {
            if (de.visibility.isVisibleToAT) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.elemName]);
            }
          }
          else {
            if (de.accName.nameIsNotVisible) {
              if (de.visibility.isVisibleToAT) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.elemName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_3', [de.elemName]);
              }
            }

          }
        }
      }

    });

  } // end validation function
},

/**
 * @object CONTROL_16
 *
 * @desc   Redundant Entry
 */

{ rule_id             : 'CONTROL_16',
  last_updated        : '2023-12-01',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : false,
  wcag_primary_id     : '3.3.7',
  wcag_related_ids    : [],
  target_resources    : ["input", "select", "textarea"],
  validate          : function (dom_cache, rule_result) {

    const includeTags = ['form', 'input', 'select', 'textarea']

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      if (includeTags.includes(de.tagName)) {
        if (de.visibility.isVisibleToAT) {
          if (autoFillValues.includes(ce.autocomplete)) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, ce.autocomplete]);
          } else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      }
      else {
        if (de.isInteractive && (de.ariaInfo.requiredParents.length === 0)) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      }
   });

  } // end validation function
},

/**
 * @object CONTROL_17
 *
 * @desc   Avoid label encapsulation
 */

{ rule_id             : 'CONTROL_17',
  last_updated        : '2023-12-16',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.FORMS,
  rule_required       : true,
  first_step          : false,
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : [],
  target_resources    : ["input", 'output', "select", "textarea"],
  validate          : function (dom_cache, rule_result) {

    dom_cache.controlInfo.allControlElements.forEach(ce => {
      const de = ce.domElement;
      if (!ce.isInputTypeImage) {
        if (de.isLabelable) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.source.indexOf('encapsulation') < 0) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, de.accName.source]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
      }
    });
  } // end validation function
}



];




