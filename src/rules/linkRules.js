/* linkRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import {accNamesTheSame} from '../utils.js';

import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Link Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule Category: Link Rules
 */

export const linkRules = [

  /**
   * @object LINK_1
   *
   * @desc Link should describe the target of a link
   */

  { rule_id             : 'LINK_1',
    last_updated        : '2022-05-23',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LINKS,
    rule_required       : true,
    wcag_primary_id     : '2.4.4',
    wcag_related_ids    : ['2.4.9'],
    target_resources    : ['a', 'area', '[role=link]'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.linkInfo.allLinkDomElements.forEach (de => {
        if (de.visibility.isVisibleToAT) {
          const name = de.accName.name;
          const desc = de.accDescription.name;
          if (name.length) {
            if (desc.length) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName, name, desc]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName, name]);
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      });
    } // end valifdation function
  },

  /**
   * @object LINK_2
   *
   * @desc Links with the different HREFs should have the unique accessible names
   */

  { rule_id             : 'LINK_2',
    last_updated        : '2022-05-23',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LINKS,
    rule_required       : false,
    wcag_primary_id     : '2.4.4',
    wcag_related_ids    : ['2.4.9'],
    target_resources    : ['a', 'area', '[role=link]'],
    validate            : function (dom_cache, rule_result) {

      // array of visible DOM elements identified as links
      const visibleLinks = [];

      dom_cache.linkInfo.allLinkDomElements.forEach ( de => {
        if (de.visibility.isVisibleToAT) {
          visibleLinks.push(de);
        }
      })

      visibleLinks.forEach( (de1, index1) => {
        let differentHrefSameDescription      = 0;
        let differentHrefDifferentDescription = 0;
        let sameHref = 0;
        visibleLinks.forEach( (de2, index2) => {
          if (index1 !== index2) {
            if (accNamesTheSame(de1.accName, de2.accName)) {
              if (de1.node.href === de2.node.href) {
                sameHref += 1;
              }
              else {
                if (accNamesTheSame(de1.accDescription, de2.accDescription)) {
                  differentHrefSameDescription += 1;
                }
                else {
                  differentHrefDifferentDescription += 1;
                }
              }
            }
          }
        });

        if (differentHrefSameDescription) {
          rule_result.addElementResult(TEST_RESULT.FAIL, de1,  'ELEMENT_FAIL_1', [(differentHrefSameDescription + 1)]);
        } else {
          if (differentHrefDifferentDescription) {
            if (differentHrefDifferentDescription === 1) {
              rule_result.addElementResult(TEST_RESULT.PASS, de1,  'ELEMENT_PASS_3', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de1,  'ELEMENT_PASS_4', [differentHrefDifferentDescription]);
            }
          } else {
            if (sameHref) {
              if (sameHref === 1) {
                rule_result.addElementResult(TEST_RESULT.PASS, de1,  'ELEMENT_PASS_1', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, de1,  'ELEMENT_PASS_2', [sameHref]);
              }
            }
          }
        }
      });

    } // end validate function
  }
];




