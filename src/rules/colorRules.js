/* colorRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Color Rules', false);
debug.flag = false;


/*
 * OpenA11y Alliance Rules
 * Rule group: Color Rules
 */

export const colorRules = [
  /**
   * @object COLOR_1
   *
   * @desc  Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
   */

  { rule_id             : 'COLOR_1',
    last_updated        : '2022-04-21',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    ruleset             : RULESET.TRIAGE,
    rule_required       : true,
    wcag_primary_id     : '1.4.3',
    wcag_related_ids    : ['1.4.1','1.4.6'],
    target_resources    : ['text content'],
    validate            : function (dom_cache, rule_result) {

      let index = 0;
      function checkResult(domElement, result) {
        const node    = domElement.node;
        const tagName = node.tagName;
        const id      = node.id ? `[id=${node.id}]` : '';
        const cc      = domElement.colorContrast;
        const crr     = cc.colorContrastRatio
        debug.flag && debug.log(`[${index += 1}][${result}][${tagName}]${id}: ${crr}`);
      }


      const MIN_CCR_NORMAL_FONT = 4.5;
      const MIN_CCR_LARGE_FONT  = 3.1;

      debug.flag && debug.log(`===== COLOR 1 ====`);

      dom_cache.allDomTexts.forEach( domText => {
        const de  = domText.parentDomElement;
        const cc  = de.colorContrast;
        const ccr = cc.colorContrastRatio;

        if (de.visibility.isVisibleOnScreen) {
          if (cc.isLargeFont) {
            if (ccr >= MIN_CCR_LARGE_FONT) {
              // Passes color contrast requirements
              if (cc.hasBackgroundImage) {
                checkResult(de, 'MC');
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_3', [ccr]);
              }
              else {
                checkResult(de, 'PASS');
                rule_result.addElementResult(TEST_RESULT.PASS, domText, 'ELEMENT_PASS_2', [ccr]);
              }
            }
            else {
              // Fails color contrast requirements
              if (cc.hasBackgroundImage) {
                checkResult(de, 'MC');
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_4', [ccr]);
              }
              else {
                checkResult(de, 'FAIL');
                rule_result.addElementResult(TEST_RESULT.FAIL, domText, 'ELEMENT_FAIL_2', [ccr]);
              }
            }
          }
          else {
            if (ccr >= MIN_CCR_NORMAL_FONT) {
              // Passes color contrast requirements
              if (cc.hasBackgroundImage) {
                checkResult(de, 'MC');
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_1', [ccr]);
              }
              else {
                checkResult(de, 'PASS');
                rule_result.addElementResult(TEST_RESULT.PASS, domText, 'ELEMENT_PASS_1', [ccr]);
              }
            }
            else {
              // Fails color contrast requirements
              if (cc.hasBackgroundImage) {
                checkResult(de, 'MC');
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, domText, 'ELEMENT_MC_2', [ccr]);
              }
              else {
                checkResult(de, 'FAIL');
                rule_result.addElementResult(TEST_RESULT.FAIL, domText, 'ELEMENT_FAIL_1', [ccr]);
              }
            }
          }
        } else {
          checkResult(de, 'HIDDEN');
          rule_result.addElementResult(TEST_RESULT.HIDDEN, domText, 'ELEMENT_HIDDEN_1', []);
        }
      });
    } // end validate function
  },

  /**
   * @object COLOR_1
   *
   * @desc  Use of color
   */

  { rule_id             : 'COLOR_2',
    last_updated        : '2022-04-21',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.STYLES_READABILITY,
    ruleset             : RULESET.TRIAGE,
    wcag_primary_id     : '1.4.1',
    wcag_related_ids    : [],
    target_resources    : [],
    validate            : function (dom_cache, rule_result) {

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);

    } // end validate function
  }

];




