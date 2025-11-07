/* targetSizeRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Size', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Target Size Rules
 */

export const targetSizeRules = [

  /**
   * @object TARGET_SIZE_1
   *
   * @desc Link target size minimum
   */

  { rule_id             : 'TARGET_SIZE_1',
    last_updated        : '2023-10-26',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LINKS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.8',
    wcag_related_ids    : [],
    target_resources    : ['links'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.linkInfo.allLinkDomElements.forEach( de => {
        const h = de.height;
        const w = de.width;

        if (!de.parentInfo.inParagraph && de.authorSizing) {
          if ((w < 24) || (h < 24)) {
            if (de.visibility.isVisibleOnScreen) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [h, w]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [h, w]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object TARGET_SIZE_2
   *
   * @desc Link target size enhanced
   */

  { rule_id             : 'TARGET_SIZE_2',
    last_updated        : '2023-10-26',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LINKS,
    rule_required       : false,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.5',
    wcag_related_ids    : [],
    target_resources    : ['links'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.linkInfo.allLinkDomElements.forEach( de => {
        const h = de.height;
        const w = de.width;
        if (!de.parentInfo.inParagraph && de.authorSizing) {
          if ((w < 44) || (h < 44)) {
            if (de.visibility.isVisibleOnScreen) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [h, w]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [h, w]);
          }
        }
      });

    } // end validate function
  },

  /**
   * @object TARGET_SIZE_3
   *
   * @desc button target size minimum
   */

  { rule_id             : 'TARGET_SIZE_3',
    last_updated        : '2023-10-29',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.8',
    wcag_related_ids    : [],
    target_resources    : ['button', 'input[type=button]', 'input[type=image]', 'input[type=reset]', 'input[type=submit]', '[role=button]'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.controlInfo.allButtonElements.forEach( be => {
        const de = be.domElement;
        const h = de.height;
        const w = de.width;
        if ((w < 24) || (h < 24)) {
          if (de.visibility.isVisibleOnScreen) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName, h, w]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, h, w]);
        }
      });

    } // end validate function
  },

  /**
   * @object TARGET_SIZE_4
   *
   * @desc Button target size enhanced
   */

  { rule_id             : 'TARGET_SIZE_4',
    last_updated        : '2023-10-29',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : false,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.5',
    wcag_related_ids    : [],
    target_resources    : ['button', 'input[type=button]', 'input[type=image]', 'input[type=reset]', 'input[type=submit]', '[role=button]'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.controlInfo.allButtonElements.forEach( be => {
        const de = be.domElement;
        const h = de.height;
        const w = de.width;

        if (debug.flag) {
          debug.log(`[${de.accName.name}] h: ${h}  w: ${w}`);
          debug.log(`[       width]: ${de.authorWidth}`);
          debug.log(`[      height]: ${de.authorHeight}`);
          debug.log(`[      inLink]: ${de.parentInfo.inLink}`);
          debug.log(`[      inPara]: ${de.parentInfo.inParagraph}`);
          debug.log(`[authorSizing]: ${de.authorSizing}`);
          debug.log(`[     top]: ${de.authorTop}`);
          debug.log(`[  bottom]: ${de.authorBottom}`);
          debug.log(`[    left]: ${de.authorLeft}`);
          debug.log(`[   right]: ${de.authorRight}`);
          debug.log(`[ display]: ${de.authorDisplay}`);
          debug.log(`[position]: ${de.authorPosition}`);
        }

        if ((w < 44) || (h < 44)) {
          if (de.visibility.isVisibleOnScreen) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.eleName, h, w]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, h, w]);
        }
      });

    } // end validate function
  },

 /**
   * @object TARGET_SIZE_5
   *
   * @desc Checkbox and radio button target size minimum
   */

  { rule_id             : 'TARGET_SIZE_5',
    last_updated        : '2023-11-17',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : true,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.8',
    wcag_related_ids    : [],
    target_resources    : ['input[type=checkbox]', 'input[type=radio]', '[role=radio]', '[role=checkbox]]'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.controlInfo.allControlElements.forEach( ce => {
        const de = ce.domElement;

        if (de.role === 'radio' || de.role === 'checkbox') {
          if (de.visibility.isVisibleOnScreen) {
            let h = de.height;
            let w = de.width;
            if (( h < 24) || ( w < 24)) {
              if (ce.hasLabel) {
                h = ce.labelHeight;
                w = ce.labelWidth;
                if (( h < 24) || (w < 24)) {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [h, w]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [h, w]);
                }
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName, h, w]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, h, w]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }


      });

    } // end validate function
  },

 /**
   * @object TARGET_SIZE_6
   *
   * @desc Checkbox and radio button target size enhanced
   */

  { rule_id             : 'TARGET_SIZE_6',
    last_updated        : '2023-11-17',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.FORMS,
    rule_required       : false,
    first_step          : false,
    axe_id              : '',
    wave_id             : '',
    wcag_primary_id     : '2.5.5',
    wcag_related_ids    : [],
    target_resources    : ['input[type=checkbox]', 'input[type=radio]', '[role=radio]', '[role=checkbox]]'],
    validate          : function (dom_cache, rule_result) {

      dom_cache.controlInfo.allControlElements.forEach( ce => {
        const de = ce.domElement;

        if (de.role === 'radio' || de.role === 'checkbox') {
          if (de.visibility.isVisibleOnScreen) {
            let h = de.height;
            let w = de.width;
            if (( h < 44) || ( w < 44)) {
              if (ce.hasLabel) {
                h = ce.labelHeight;
                w = ce.labelWidth;
                if (( h < 44) || (w < 44)) {
                  rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [h, w]);
                }
                else {
                  rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [h, w]);
                }
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName, h, w]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, h, w]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
          }
        }


      });

    } // end validate function
  }



];
