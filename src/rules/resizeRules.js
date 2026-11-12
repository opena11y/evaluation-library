/* resizeRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Resize Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Resize Rules
 */

export const resizeRules = [

  /**
   * @object RESIZE_1
   *
   * @desc Resize content
   */

  { rule_id             : 'RESIZE_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : ['meta-viewport',
                           'meta-viewport-large',
                           'hidden-content'],
    wave_refs           : [],
    wcag_primary_id     : '1.4.4',
    wcag_related_ids    : [],
    target_resources    : ['content'],
    validate          : function (dom_cache, rule_result) {


      const MAX_SCALE = 2.0;

      const rootDoc = dom_cache.getRootDomDocument();
      let failsUserScalable = 0;
      let failsMaxScale     = 0;

      const domDocs = dom_cache.allDomDocuments;

      domDocs.forEach( (dd) => {
        if (dd.domElement) {
          if (dd.domElement.visibility.isVisibleOnScreen) {
            if (dd.hasViewport) {
              if (!dd.userScalable && dd.maxScale < MAX_SCALE) {
                rule_result.addPageResult(TEST_RESULT.FAIL, dd, 'PAGE_FAIL_1', [dd.maxScale]);
                failsUserScalable += 1;
                failsMaxScale += 1;
              }
              else {
                if (!dd.userScalable) {
                  rule_result.addPageResult(TEST_RESULT.FAIL, dd, 'PAGE_FAIL_2', []);
                  failsUserScalable += 1;
                }
                else {
                  if (dd.maxScale < MAX_SCALE) {
                    rule_result.addPageResult(TEST_RESULT.FAIL, dd, 'PAGE_FAIL_3', [dd.maxScale]);
                    failsMaxScale += 1;
                  }
                  else {
                    rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dd, 'PAGE_MC_1', []);
                  }
                }
              }
            }
            else {
              rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dd, 'PAGE_MC_1', []);
            }
          }
          else {
            rule_result.addPageResult(TEST_RESULT.HIDDEN, dd, 'PAGE_HIDDEN_1', []);
          }
        }
      });

      if (rootDoc.hasViewport) {
        if (failsUserScalable > 0 || failsMaxScale > 0) {
          if (!rootDoc.userScalable && rootDoc.maxScale < MAX_SCALE) {
            rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_7', [rootDoc.maxScale]);
            failsUserScalable += 1;
            failsMaxScale += 1;
          }
          else {
            if (!rootDoc.userScalable) {
              rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_8', []);
              failsUserScalable += 1;
            }
            else {
              if (rootDoc.maxScale < MAX_SCALE) {
                rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_9', [rootDoc.maxScale]);
                failsMaxScale += 1;
              }
              else {
                rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_4', []);
              }
            }
          }
        }
        else {
          if (!rootDoc.userScalable && rootDoc.maxScale < MAX_SCALE) {
            rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_4', [rootDoc.maxScale]);
            failsUserScalable += 1;
            failsMaxScale += 1;
          }
          else {
            if (!rootDoc.userScalable) {
              rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_2', []);
              failsUserScalable += 1;
            }
            else {
              if (rootDoc.maxScale < MAX_SCALE) {
                rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_3', [rootDoc.maxScale]);
                failsMaxScale += 1;
              }
              else {
                rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, rootDoc, 'PAGE_MC_1', []);
              }
            }
          }
        }
      }
      else {
        if (failsUserScalable > 0 && failsMaxScale > 0) {
          rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_4', []);
        }
        else {
          if (failsUserScalable > 0) {
            rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_5', []);
          }
          else {
            if (failsMaxScale > 0) {
              rule_result.addPageResult(TEST_RESULT.FAIL, rootDoc, 'PAGE_FAIL_6', []);
            }
            else {
              rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, rootDoc, 'PAGE_MC_1', []);
            }
          }
        }
      }

    } // end validate function
  },

 /**
   * @object RESIZE_2
   *
   * @desc Resize content
   */

  { rule_id             : 'RESIZE_2',
    last_updated        : '2023-09-19',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.COLOR_CONTENT,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '1.4.10',
    wcag_related_ids    : [],
    target_resources    : ['content'],
    validate          : function (dom_cache, rule_result) {

      const domDoc = dom_cache.getRootDomDocument();

      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, domDoc, 'PAGE_MC_1', []);
    } // end validate function
  }

];
