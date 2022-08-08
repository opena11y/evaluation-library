/* focusRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
// import DebugLogging  from '../debug.js';

/* Constants */
// const debug = new DebugLogging('Focus Rules', true);

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
    dom_cache.linkInfo.allLinkDomElements.forEach( de => {
      if (de.visibility.isVisibleOnScreen) {
        rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
      }
    });
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

    dom_cache.controlInfo.allControlElements.forEach( ce => {
      const de = ce.domElement;
      if (de.tagName === 'select') {
        if (de.visibility.isVisibleOnScreen) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    });
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
}

];




