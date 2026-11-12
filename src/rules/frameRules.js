/* frameRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Frame Rules', false);
debug.flag = false;


/*
 * OpenA11y Rules
 * Rule Category: Frame Rules
 */

export const frameRules = [

  /**
   * @object FRAME_1
   *
   * @desc  Evaluate frame elements for a title attribute
   */

  { rule_id             : 'FRAME_1',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : ['frame-title',
                           'hidden-content'],
    wave_refs           : [],
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['frame'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.allDomElements.forEach( de => {
        if (de.tagName === 'frame' && de.node.src && !de.hasRole) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.accName.name]);
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
   * @object FRAME_2
   *
   * @desc  Evaluate iframe elements for an accessible name
   */

  { rule_id             : 'FRAME_2',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : ['frame-title',
                           'hidden-content'],
    wave_refs           : ['iframe'],
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['iframe'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.iframeInfo.allIFrameElements.forEach( ife => {
        const de = ife.domElement;
        if ((de.tagName === 'iframe') &&
             !de.hasRole &&
            de.node.src) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.accName.name]);
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
 * @object FRAME_3
 *
 * @desc   iframes accessible names must be unique
 */

{ rule_id             : 'FRAME_3',
  last_updated        : '2026-11-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
  rule_required       : true,
  first_step          : false,
  axe_refs            : ['frame-title-unique',
                         'hidden-content'],
  wave_refs           : [],
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['iframe'],
  validate          : function (dom_cache, rule_result) {

    const visibleFrames = []

     dom_cache.iframeInfo.allIFrameElements.forEach( ife => {
      const de = ife.domElement;
      if (de.visibility.isVisibleToAT) {
        visibleFrames.push(ife);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });

    visibleFrames.forEach( (ife1) => {
      let count = 0;
      const de = ife1.domElement;
      const accName1 = ife1.domElement.accName.name;
      if (accName1) {
        visibleFrames.forEach( (ife2) => {
          if (ife1 !== ife2) {
            const accName2 = ife2.domElement.accName.name;
            if (accName2) {
              if (accName1.toLowerCase() === accName2.toLowerCase()) {
                count += 1;
              }
            }
          }
        });
        if (count) {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [accName1, de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [accName1, de.elemName]);
        }
      }
      else {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.elemName]);
      }
    });

  } // end validation function
},

/**
 * @object FRAME_4
 *
 * @desc   Frames that contain interactive content cannot have tabindex=-1
 */

{ rule_id             : 'FRAME_4',
  last_updated        : '2026-11-07',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_required       : true,
  first_step          : false,
  axe_refs            : ['frame-focusable-content',
                         'hidden-content'],
  wave_refs           : [],
  wcag_primary_id     : '2.4.3',
  wcag_related_ids    : [],
  target_resources    : ['iframe'],
  validate          : function (dom_cache, rule_result) {

    dom_cache.iframeInfo.allIFrameElements.forEach( (ife) => {
      const de = ife.domElement;
      if (de.visibility.isVisibleToAT) {
        if (de.descendantInteractiveCount > 0 && de.tabIndex < 0) {
         rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.descendantInteractiveCount]);
        }
      }
      else {
         rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
      }
    });

  } // end validation function
}


];




