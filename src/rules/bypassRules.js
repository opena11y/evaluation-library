/* bypassRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Bypass Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Bypass Rules
 */

export const bypassRules = [

  /**
   * @object BYPASS_1
   *
   * @desc Looking for links or that support bypassing blocks of content
  */

  { rule_id             : 'BYPASS_1',
    last_updated        : '2023-08-25',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['2.4.4'],
    target_resources    : ['a'],
    validate            : function (dom_cache, rule_result) {

      const bypassTargets = [
        'content',
        'content-main',
        'main',
        'maincontent',
        'main-content',
        'site-content'
        ];

      const domElements     = dom_cache.allDomElements;
      const linkDomElements = dom_cache.linkInfo.allLinkDomElements;

      let de;
      let hasSkipToButton = false;
      let hasBypassLink = false;
      let linkDomElem = false;
      let targetDomElem = false;

      // Check for SkipTo.js page script button
      for (let i = 0; (i < domElements.length) && !hasSkipToButton; i += 1) {
        de = domElements[i];
        if (de.id === 'id-skip-to') {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
          hasSkipToButton = true;
        }
      }

      // Check for bypass block links
      for (let i = 0; (i < linkDomElements.length) && !hasSkipToButton && !hasBypassLink; i += 1) {
        linkDomElem = linkDomElements[i];

        let href = linkDomElem.node.href;

        if (href.indexOf('#') >= 0) {
          let  targetId = href.slice(href.indexOf('#')+1);
          debug.log(`[BYPASS 1][targetId]: ${targetId}`);

          if (bypassTargets.includes(targetId)) {
            hasBypassLink = true;

            for (let i = 0; (i < domElements.length) && (!targetDomElem); i += 1) {
              de = domElements[i];
              if ((de.id === targetId) || (de.name === targetId)) {
                targetDomElem = de;
              }
            }

            if (targetDomElem) {
              rule_result.addElementResult(TEST_RESULT.PASS, linkDomElem, 'ELEMENT_PASS_2', []);
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, targetDomElem, 'ELEMENT_MC_1', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, linkDomElem,   'ELEMENT_FAIL_1', []);
            }

          }

        }

      }

      if (hasSkipToButton) {
        rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
      }
      else {
        if (hasBypassLink) {
          if (targetDomElem) {
            rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
          }
          else {
            rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
          }
        }
        else {
          rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_2', []);
        }
      }
    } // end validation function  }
  }
];

