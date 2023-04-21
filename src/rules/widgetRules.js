/* widgetRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('ARIA Rules', false);


/*
 * OpenA11y Rules
 * Rule group: Widget Rules
 */

export const widgetRules = [
/**
 * @object WIDGET_1
 *
 * @desc ARIA Widgets must have accessible names
 */

{ rule_id             : 'WIDGET_1',
  last_updated        : '2021-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['ARIA Widget roles'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.allDomElements.forEach(de => {
      const ai = de.ariaInfo;
      // There are other rules that check for accessible name for labelable controls, landmarks, headings and links
      if (ai.isWidget && !de.isLabelable && !de.isLink) {
        if (de.visibility.isVisibleToAT) {
          if (de.accName.name) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.role, de.accName.name]);
          }
          else {
            if (ai.isNameRequired) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName, de.role]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName, de.role]);              
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
        }
      }
    });

   } // end validation function
},

/**
 * @object WIDGET_2
 *
 * @desc Elements with onClick event handlers event handlers need role
 */

{ rule_id             : 'WIDGET_2',
  last_updated        : '2022-08-15',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['Elements with onclick events'],
  validate            : function (dom_cache, rule_result) {

    function hasDecendantWidgetRole (domElement) {
      for (let i = 0; i < domElement.children.length; i += 1) {
        const cde = domElement.children[i];
        if (cde.isDomElement) {
          if (cde.ariaInfo.isWidget) {
            return true;
          }
          if (hasDecendantWidgetRole(cde)) {
            return true;
          }
        }
      }
      return false;
    }

    dom_cache.allDomElements.forEach(de => {
      if (de.eventInfo.hasClick) {
        if (de.visibility.isVisibleToAT) {
          if (de.ariaInfo.isWidget) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.role]);
          }
          else {
            if (hasDecendantWidgetRole(de)) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName, de.role]);
            }
            else {
              if (de.hasRole) {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName, de.role]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tagName]);
              }
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
        }
      }
    });
  } // end validation function
},

/**
 * @object WIDGET_3
 *
 * @desc Elements with role values must have valid widget or landmark roles
 */

{ rule_id             : 'WIDGET_3',
  last_updated        : '2021-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.allDomElements.forEach(de => {
      if (de.hasRole) {
        if (de.visibility.isVisibleToAT) {
          if (!de.ariaInfo.isValidRole) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
          }
          else {
            if (de.ariaInfo.isAbstractRole) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.role]);
            } else {
              if (de.ariaInfo.isWidget) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role]);
              }
              else {
                if (de.ariaInfo.isLandmark) {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.role]);
                }
                else {
                  if (de.ariaInfo.isLive) {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.role]);
                  }
                  else {
                    if (de.ariaInfo.isSection) {
                      rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', [de.role]);
                    }
                    else {
                      rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_5', [de.role]);
                    }
                  }
                }
              }            
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
        }        
      }
    });
  } // end validation function
},

/**
 * @object WIDGET_4
 *
 * @desc Elements with ARIA attributes have valid values
 */

{ rule_id             : 'WIDGET_4',
  last_updated        : '2021-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-atomic]',
                         '[aria-autocomplete]',
                         '[aria-busy]',
                         '[aria-checked]',
                         '[aria-colcount]',
                         '[aria-colindex]',
                         '[aria-colspan]',
                         '[aria-current]',
                         '[aria-disabled]',
                         '[aria-dropeffect]',
                         '[aria-expanded]',
                         '[aria-grabbed]',
                         '[aria-haspopup]',
                         '[aria-hidden]',
                         '[aria-invalid]',
                         '[aria-label]',
                         '[aria-labelledby]',
                         '[aria-live]',
                         '[aria-modal]',
                         '[aria-multiline]',
                         '[aria-multiselectable]',
                         '[aria-orientation]',
                         '[aria-pressed]',
                         '[aria-readonly]',
                         '[aria-relevant]',
                         '[aria-required]',
                         '[aria-rowcount]',
                         '[aria-rowindex]',
                         '[aria-rowspan]',
                         '[aria-selected]',
                         '[aria-sort]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.allDomElements.forEach(de => {
      de.ariaInfo.validAttrs.forEach( attr => {
        if (de.visibility.isVisibleToAT) {
          const allowedValues = attr.values ? attr.values.join(' | ') : '';
          if (de.ariaInfo.invalidAttrValues.includes(attr)) {
            if (attr.type === 'nmtoken' || attr.type === 'boolean' || attr.type === 'tristate') {
              if (attr.value === '') {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [attr.name, allowedValues]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [attr.name, attr.value, allowedValues]);
              }
            }
            else {
              if (attr.type === 'nmtokens') {
                if (attr.value === '') {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [attr.name, allowedValues]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_4', [attr.name, attr.value, allowedValues]);
                }
              }
              else {
                if (attr.type === 'integer') {
                  if (attr.value === '') {
                    rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_5', [attr.name]);
                  }
                  else {
                    if (attr.allowUndeterminedValue) {
                      rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_6', [attr.name, attr.value]);
                    }
                    else {
                      rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_7', [attr.name, attr.value]);
                    }
                  }
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_8', [attr.name, attr.value, attr.type]);
                }  
              }
            }
          }
          else {
            if (attr.type === 'boolean' || 
                attr.type === 'nmtoken' || 
                attr.type === 'nmtokens' || 
                attr.type === 'tristate') {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [attr.name, attr.value]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [attr.name, attr.value, attr.type]);
            }
          }
        }
        else {
          if (attr.value === '') {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [attr.name]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [attr.name, attr.value]);
          }
        }
      });
    });
   } // end validation function
},

/**
 * @object WIDGET_5
 *
 * @desc ARIA attributes must be defined
 */

{ rule_id             : 'WIDGET_5',
  last_updated        : '2022-08-15',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-atomic]',
                         '[aria-autocomplete]',
                         '[aria-busy]',
                         '[aria-checked]',
                         '[aria-controls]',
                         '[aria-describedby]',
                         '[aria-disabled]',
                         '[aria-dropeffect]',
                         '[aria-expanded]',
                         '[aria-flowto]',
                         '[aria-grabbed]',
                         '[aria-haspopup]',
                         '[aria-hidden]',
                         '[aria-invalid]',
                         '[aria-label]',
                         '[aria-labelledby]',
                         '[aria-level]',
                         '[aria-live]',
                         '[aria-multiline]',
                         '[aria-multiselectable]',
                         '[aria-orientation]',
                         '[aria-owns]',
                         '[aria-pressed]',
                         '[aria-readonly]',
                         '[aria-relevant]',
                         '[aria-required]',
                         '[aria-selected]',
                         '[aria-sort]',
                         '[aria-valuemax]',
                         '[aria-valuemin]',
                         '[aria-valuenow]',
                         '[aria-valuetext]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.allDomElements.forEach(de => {
      de.ariaInfo.invalidAttrs.forEach( attr => {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [attr.name]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [attr.name]);
        }
      });
      de.ariaInfo.validAttrs.forEach( attr => {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [attr.name]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [attr.name]);
        }
      });
    });
  } // end validation function
},

/**
 * @object WIDGET_6
 *
 * @desc Widgets must have required properties
 */

{ rule_id             : 'WIDGET_6',
  last_updated        : '2021-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[checkbox]',
                         '[combobox]',
                         '[menuitemcheckbox]',
                         '[menuitemradio]',
                         '[meter]',
                         '[option]',
                         '[separator]',
                         '[scrollbar]',
                         '[slider]',
                         '[switch]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      de.ariaInfo.requiredAttrs.forEach( reqAttrInfo => {
        if (de.visibility.isVisibleToAT) {
          if (reqAttrInfo.isDefined) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role, reqAttrInfo.name, reqAttrInfo.value]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role, reqAttrInfo.name]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role, reqAttrInfo.name]);
        }
      });
    });
   } // end validation function
},

/**
 * @object WIDGET_7
 *
 * @desc Widgets must have required owned elements
 */

{ rule_id             : 'WIDGET_7',
  last_updated        : '2023-03-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[feed]',
                         '[grid]',
                         '[list]',
                         '[listbox]',
                         '[menu]',
                         '[menubar]',
                         '[radiogroup]',
                         '[row]',
                         '[rowgroup]',
                         '[table]',
                         '[tablist]',
                         '[tree]',
                         '[treegrid]'],
  validate            : function (dom_cache, rule_result) {

    function getRequiredChildrenCount(domElement, requiredChildren) {
      let count = 0;
      let i;
      const ai = domElement.ariaInfo;
      const cdes = domElement.children;
      const odes = ai.ownedDomElements;
      for(i = 0; i < cdes.length; i += 1) {
        const cde = cdes[i];
        if (cde.isDomElement) {
          if (requiredChildren.includes(cde.role)) {
            return 1;
          }
          count += getRequiredChildrenCount(cde, requiredChildren);
        }
      }

      for(i = 0; i < odes.length; i += 1) {
        const ode = odes[i];
        if (requiredChildren.includes(ode.role)) {
          return 1;
        }
        count += getRequiredChildrenCount(ode, requiredChildren);
      }
      return count;
    }

    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.hasRequiredChildren) {
        const rc = de.ariaInfo.requiredChildren;
        if (de.visibility.isVisibleToAT) {
          if (de.ariaInfo.isBusy) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.role]);
          }
          else {
            const count = getRequiredChildrenCount(de, rc);
            if (count > 0) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role, rc.join(', ')]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role, rc.join(', ')]);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role, rc.join(', ')]);
        }
      }
    });
   } // end validation function
},

/**
 * @object WIDGET_8
 *
 * @desc Widgets must have required parent roles
 */

{ rule_id             : 'WIDGET_8',
  last_updated        : '2023-03-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : [ "caption",
                          "cell",
                          "columnheader",
                          "gridcell",
                          "listitem",
                          "menuitem",
                          "menuitemcheckbox",
                          "menuitemradio",
                          "option",
                          "row",
                          "rowgroup",
                          "rowheader",
                          "tab",
                          "treeitem"
                      ],
  validate            : function (dom_cache, rule_result) {


    function checkForRequiredParent(domElement, requiredParents) {
      if (!domElement || !domElement.ariaInfo) {
        return '';
      }
      const ai = domElement.ariaInfo;
      const obdes = ai.ownedByDomElements;
      const pde = domElement.parentInfo.domElement;

      // Check first for aria-owns relationships
      for (let i = 0; i < obdes.length; i += 1) {
        const obde = obdes[i];
        if (requiredParents.includes(obde.role)) {
          return obde.role;
        }
        else {
          return checkForRequiredParent(obde.parentInfo.domElement, requiredParents);
        }
      }

      // Check parent domElement
      if (pde) {
        if (requiredParents.includes(pde.role)) {
          return pde.role;
        }
        else {
          return checkForRequiredParent(pde, requiredParents);
        }
      }
      return '';
    }

    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.hasRequiredParents) {
        const rp = de.ariaInfo.requiredParents;
        if (de.visibility.isVisibleToAT) {
          const result = checkForRequiredParent(de, rp);
          if (result) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role, result]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role, rp.join(', ')]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role, rp.join(', ')]);
        }
      }
    });
   } // end validation function
},

/**
 * @object WIDGET_9
 *
 * @desc Widgets cannot be owned by more than one widget
 */

{ rule_id             : 'WIDGET_9',
  last_updated        : '2023-04-05',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-owns]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.allDomElements.forEach( de => {
      const ownedByCount = de.ariaInfo.ownedByDomElements.length;
      if (ownedByCount > 0) {
        if (ownedByCount === 1) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName, ownedByCount]);
        }
      }
    });
   } // end validation function
},

/**
 * @object WIDGET_10
 *
 * @desc Range widgets with aria-valuenow mut be in range of aria-valuemin and aria-valuemax
 */

{ rule_id             : 'WIDGET_10',
  last_updated        : '2023-04-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="meter"]',
                         '[role="progress"]',
                         '[role="scrollbar"]',
                         '[role="separator"][tabindex=0]',
                         '[role="slider"]',
                         '[role="spinbutton"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.isRange) {
        const ai = de.ariaInfo;
        if (de.visibility.isVisibleToAT) {
          const now  = ai.valueNow;
          const min  = ai.valueMin;
          const max  = ai.valueMax;
          const text = ai.valueText;
          if (ai.hasValueNow) {
            if (ai.validValueNow) {
              if (ai.validValueMin && ai.validValueMax) {
                if ((now >= min) && (now <= max)) {
                  if (text) {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, text, now]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName, now, min, max]);
                  }
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [now, min, max]);
                }
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [min, max]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [now]);
            }
          }
          else {
            if (ai.isValueNowRequired) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_4', [de.elemName]);
            } else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.elemName]);
            }
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
 * @object WIDGET_11
 *
 * @desc Verify range elements with aria-valuetext attribute
 */

{ rule_id             : 'WIDGET_11',
  last_updated        : '2023-04-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="meter"]',
                         '[role="progress"]',
                         '[role="scrollbar"]',
                         '[role="separator"][tabindex=0]',
                         '[role="slider"]',
                         '[role="spinbutton"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.isRange && de.ariaInfo.valueText) {
        const ai = de.ariaInfo;
        if (de.visibility.isVisibleToAT) {
          const now  = ai.valueNow;
          const text = ai.valueText;
          if (ai.hasValueNow) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [text, now]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      }
    });
  }
},
/**
 * @object WIDGET_12
 *
 * @desc Element with widget role label should describe the purpose of the widget
 *
 */

{ rule_id             : 'WIDGET_12',
  last_updated        : '2015-08-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[Widget roles'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.allDomElements.forEach( de => {
      if (de.ariaInfo.isWidget) {
        if (de.visibility.isVisibleToAT) {
          if (de.accName.name) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.accName.name, de.elemName]);
          }
          else {
            if (de.ariaInfo.isNameRequired) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName, de.role]);
            }
            else {
             rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName, de.role]);

            }
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
 * @object WIDGET_13
 *
 * @desc Roles that prohibit accessible names
 */

{ rule_id             : 'WIDGET_13',
  last_updated        : '2021-07-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : [ "caption",
                          "code",
                          "deletion",
                          "emphasis",
                          "generic",
                          "insertion",
                          "none",
                          "paragraph",
                          "presentation",
                          "strong",
                          "subscript",
                          "superscript"],
  validate            : function (dom_cache, rule_result) {
    dom_cache.allDomElements.forEach( de => {
      if (!de.ariaInfo.isNameRequired && de.accName.name) {
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      }
    });
   } // end validation function
},

/**
 * @object WIDGET_14
 *
 * @desc     Verify live regions are being used properly
 */
{ rule_id             : 'WIDGET_14',
  last_updated        : '2017-02-08',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : [],
  target_resources    : ['[role="alert"]','[role="log"]','[role="status"]','[aria-live]'],
  validate          : function (dom_cache, rule_result) {

    debug.flag && debug.log(`[WIDGET 14] ${dom_cache} ${rule_result}`);

/*
    var TEST_RESULT = TEST_RESULT;
    var VISIBILITY  = VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;


    for (var i = 0; i < dom_elements_len; i++ ) {

      var de =dom_elements[i];

      if (de.type != Node.ELEMENT_NODE || !de.is_live || (de.aria_live === 'off')) continue;

      var has_failure = false;

      var has_live_role =  de.role && de.role.length && (" alert log status".indexOf(de.role) > 0);


      if (de.has_aria_live) {
        if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, de.aria_live]);
        }
        else {
          if (has_live_role) {

            switch (de.role) {

              case 'alert':
                if (de.aria_live === 'polite') {
                  rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', ['polite', 'assertive',  de.role]);
                  has_failure = true;
                }
                break;

              case 'log':
              case 'status':
                if (de.aria_live === 'assertive') {
                  rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', ['assertive', 'polite', de.role]);
                  has_failure = true;
                }
                break;

              default:
                break;

            }
          }
          else {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name, de.aria_live]);
          }
        }
      }

      if (de.has_aria_atomic && has_live_role && (de.role === 'alert' || de.role === 'status')) {

        if (de.aria_atomic === 'false') {
          rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.role]);
          has_failure = true;
        }

      }

      if(has_live_role && !has_failure) {

        switch (de.role) {

          case 'alert':
            if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
              rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tag_name, de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tag_name]);
            }
            break;

          case 'log':
            if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
              rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tag_name, de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_3', [de.tag_name]);
            }
            break;

          case 'status':
            if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
              rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tag_name, de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_4', [de.tag_name]);
            }
            break;

          default:
            break;
        }
      }
    }
    */

  } // end validation function
},

/**
 * @object WIDGET_15
 *
 * @desc     Roles with deprecated ARIA attributes
 */
{ rule_id             : 'WIDGET_15',
  last_updated        : '2021-08-10',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : ['4.1.2'],
  target_resources    : [
        "alert",
        "alertdialog",
        "article",
        "banner",
        "blockquote",
        "button",
        "caption",
        "cell",
        "checkbox",
        "code",
        "command",
        "complementary",
        "composite",
        "contentinfo",
        "definition",
        "deletion",
        "dialog",
        "directory",
        "document",
        "emphasis",
        "feed",
        "figure",
        "form",
        "generic",
        "grid",
        "group",
        "heading",
        "img",
        "input",
        "insertion",
        "landmark",
        "link",
        "list",
        "listbox",
        "listitem",
        "log",
        "main",
        "marquee",
        "math",
        "meter",
        "menu",
        "menubar",
        "menuitem",
        "menuitemcheckbox",
        "menuitemradio",
        "navigation",
        "note",
        "option",
        "paragraph",
        "presentation",
        "progressbar",
        "radio",
        "radiogroup",
        "range",
        "region",
        "row",
        "rowgroup",
        "scrollbar",
        "search",
        "section",
        "sectionhead",
        "select",
        "separator",
        "spinbutton",
        "status",
        "strong",
        "structure",
        "subscript",
        "superscript",
        "switch",
        "tab",
        "table",
        "tablist",
        "tabpanel",
        "term",
        "time",
        "timer",
        "toolbar",
        "tooltip",
        "tree",
        "treegrid",
        "treeitem",
        "widget",
        "window"
    ],
  validate          : function (dom_cache, rule_result) {

    debug.flag && debug.log(`[WIDGET 15] ${dom_cache} ${rule_result}`);

/*
     var VISIBILITY  = VISIBILITY;
     var TEST_RESULT = TEST_RESULT;

     var dom_elements     = dom_cache.element_cache.dom_elements;
     var dom_elements_len = dom_elements.length;

     for (var i = 0; i < dom_elements_len; i++) {
        var de = dom_elements[i];
        var style = de.computed_style;
        var role = de.role;
        var implicit_role = '';
        var deprecatedProps = [];

        if (!de.has_role && de.element_aria_info) {
          implicit_role = de.element_aria_info.defaultRole;
        }

        if (de.has_role && aria.designPatterns[role]) {
          deprecatedProps = aria.designPatterns[role].deprecatedProps;
        } else {
          if (implicit_role && aria.designPatterns[implicit_role]) {
            deprecatedProps = aria.designPatterns[implicit_role].deprecatedProps;
          }
        }

        if (deprecatedProps.length) {
          for (var j = 0; j < deprecatedProps.length; j += 1) {
            var prop = deprecatedProps[j];

            if (de.node.hasAttribute(prop)) {

              if (role) {
                if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
                  rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [prop, de.tag_name, role]);
                } else {
                  rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [prop, de.tag_name, role]);
                }
              } else {
                if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
                  rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [prop, de.tag_name, implicit_role]);
                } else {
                  rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [prop, de.tag_name, implicit_role]);
                }
              }
            }
          }
        }
      }
      */

  } // end validation function
},

/**
 * @object WIDGET_16
 *
 * @desc     Web components require manual check
 */
{ rule_id             : 'WIDGET_16',
  last_updated        : '2021-09-12',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.WIDGETS_SCRIPTS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.1.1',
  wcag_related_ids    : ['1.1.1','1.4.1','1.4.3','1.4.4','2.1.2','2.2.1','2.2.2', '2.4.7','2.4.3','2.4.7','3.3.2'],
  target_resources    : ["Custom elements using web component APIs"],
  validate          : function (dom_cache, rule_result) {

    debug.flag && debug.log(`[WIDGET 16] ${dom_cache} ${rule_result}`);

/*
    var VISIBILITY  = VISIBILITY;
    var TEST_RESULT = TEST_RESULT;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var style = de.computed_style;

      if (de.tag_name.indexOf('-') >= 0) {
        if (!de.node.shadowRoot) {
          if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
          } else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
        }
      }
    }
    */

  } // end validation function
}

];




