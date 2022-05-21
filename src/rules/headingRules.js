/* headingRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import {accNamesTheSame} from '../utils.js';
import DebugLogging      from '../debug.js';

/* Constants */
const debug = new DebugLogging('Heading Rules', true);

/*
 * OpenA11y Rules
 * Rule group: Heading Rules
 */

export const headingRules = [

  /**
   * @object HEADING_1
   *
   * @desc Page contains at least one H1 element and each H1 element has content
   */
   { rule_id            : 'HEADING_1',
    last_updated        : '2022-05-19',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.HEADINGS,
    ruleset             : RULESET.TRIAGE,
    rule_required       : false,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.2', '2.4.6', '2.4.10'],
    target_resources    : ['h1'],
    validate            : function (dom_cache, rule_result) {
      let h1Count = 0;

      dom_cache.structureInfo.allHeadingDomElements.forEach( de => {
        if (de.tagName === 'h1') {
          if (de.visibility.isVisibleToAT) {
            if (de.accName && de.accName.name.length) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
              h1Count++;
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

      if (h1Count === 0) {
        rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
      }
      else {
        rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
      }
    } // end validate function
  },

  /**
   * @object HEADING_2
   *
   * @desc If there are main and/or banner landmarks and H1 elements,
   *       H1 elements should be children of main or banner landmarks
   *
   */
  { rule_id             : 'HEADING_2',
    last_updated        : '2022-05-19',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.HEADINGS,
    ruleset             : RULESET.MORE,
    rule_required       : false,
    wcag_primary_id     : '2.4.6',
    wcag_related_ids    : ['1.3.1', '2.4.1', '2.4.2', '2.4.10'],
    target_resources    : ['h1'],
    validate            : function (dom_cache, rule_result) {

      function checkForAnscetorLandmarkRole(de, role) {
        let ple = de.parentInfo.landmarkElement;
        while (ple) {
           if (ple.domElement.role === role) return true;
           ple = ple.parentLandmarkElement;
        }
        return false;
      }

      let h1Count = 0;

      dom_cache.structureInfo.allHeadingDomElements.forEach( de => {
        if (de.tagName === 'h1') {
          if (de.visibility.isVisibleToAT) {
            if (checkForAnscetorLandmarkRole(de, 'main')) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
            }
            else {
              if (checkForAnscetorLandmarkRole(de, 'banner')) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);
              }
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
 * @object HEADING_3
 *
 * @desc Sibling headings of the same level that share the same parent heading should be unique
 *       This rule applies only when there are no main landmarks on the page and at least one
 *       sibling heading
 *
 */
{ rule_id             : 'HEADING_3',
  last_updated        : '2014-11-25',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  required            : false,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {

    const visibleHeadings = [];
    const lastHeadingNamesAtLevel = ['', '', '', '', '', '', ''];
    const headingNameForComparison = [];

    function updateLastHeadingNamesAtLevel (level, name) {
      if ((level > 0) && (level < 7)) {
        lastHeadingNamesAtLevel[level] = name;
        for (let i = level + 1; i < 7; i += 1) {
          // clear lower level names, since a new heading context
          lastHeadingNamesAtLevel[i] = '';
        }
      }
    }

    function getParentHeadingName (level) {
      let name = '';
      while (level > 0) {
        name = lastHeadingNamesAtLevel[level];
        if (name.length) {
          break;
        }
        level -= 1;
      }
      return name;
    }

    dom_cache.structureInfo.allHeadingDomElements.forEach( de => {
      if (de.visibility.isVisibleToAT) {
        visibleHeadings.push(de);
      } else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
      }
    });


    visibleHeadings.forEach( (de, index) => {

      const name = de.accName.name.toLowerCase();

      // save the name of the last heading of each level
      switch (de.tagName) {
        case 'h1':
          updateLastHeadingNamesAtLevel(1, name);
          headingNameForComparison[index] = name;
          break;

        case 'h2':
          updateLastHeadingNamesAtLevel(2, name);
          headingNameForComparison[index] = getParentHeadingName(1) + name;
          break;

        case 'h3':
          updateLastHeadingNamesAtLevel(3, name);
          headingNameForComparison[index] = getParentHeadingName(2) + name;
          break;

        case 'h4':
          updateLastHeadingNamesAtLevel(4, name);
          headingNameForComparison[index] = getParentHeadingName(3) + name;
          break;

        case 'h5':
          updateLastHeadingNamesAtLevel(5, name);
          headingNameForComparison[index] = getParentHeadingName(4) + name;
          break;

        case 'h6':
          updateLastHeadingNamesAtLevel(6, name);
          headingNameForComparison[index] = getParentHeadingName(5) + name;
          break;

        default:
          break;
      }
    });

    visibleHeadings.forEach( (de1, index1) => {
      let duplicate = false;
      visibleHeadings.forEach( (de2, index2) => {
        if ((index1 !== index2) &&
          (headingNameForComparison[index1] ===  headingNameForComparison[index2])) {
          duplicate = true;
        }
      });
      if (duplicate) {
        rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_1', [de1.tagName]);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.PASS, de1, 'ELEMENT_PASS_1', [de1.tagName]);
      }
    });

  } // end validate function
},

/**
 * @object HEADING_5
 *
 * @desc Headings must be properly nested
 *
 */
{ rule_id             : 'HEADING_5',
  last_updated        : '2022-05-20',
  rule_scope          : RULE_SCOPE.PAGE,
  rule_category       : RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  required            : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {
    let nestingErrors = 0;
    let manualChecks = 0;

    if (dom_cache.structureInfo.hasMainLandmark) {
      dom_cache.structureInfo.allLandmarkElements.forEach ( le => {
        nestingErrors += checkHeadingNesting(dom_cache, rule_result, le.childHeadingDomElements, le.domElement.role);
      });

      dom_cache.structureInfo.allHeadingDomElements.forEach ( de => {
        if (!de.parentInfo.landmarkElement) {
          if (de.visibility.isVisibleToAT) {
            if (de.accName.name.length === 0) {
              rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              manualChecks += 1;
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });
    } else {
      nestingErrors = checkHeadingNesting(dom_cache, rule_result, dom_cache.structureInfo.allHeadingDomElements);
    }

    if (nestingErrors > 0) {
      rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', [nestingErrors]);
    }
    else {
      if (manualChecks > 0) {
        if (manualChecks === 1) {
          rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
        }
        else {
          rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_2', [manualChecks]);
        }
      } else {
        rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
      }
    }


  } // end validate function
},

/**
 * @object HEADING_6
 *
 * @desc Headings should not consist only of image content
 *
 */
{ rule_id             : 'HEADING_6',
  last_updated        : '2022-05-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.ALL,
  required            : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.structureInfo.allHeadingDomElements.forEach( (de, index) => {
      if (de.visibility.isVisibleToAT) {
        if (de.accName.name.length) {
          if (de.hasTextContent()) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tagName]);
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
      }
    });
  } // end validate function
},

/**
 * @object HEADING_7
 *
 * @desc First heading in contentinfo, complementary, form, navigation and search landmark must be an h2, except main landmark h1
 */
{ rule_id             : 'HEADING_7',
  last_updated        : '2022-05-20',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.ALL,
  required            : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['h2', '[role="contentinfo"]', '[role="complementary"]', '[role="form"]', '[role="navigation"]', '[role="search"]'],
  validate            : function (dom_cache, rule_result) {

    const testRoles = ['contentinfo', 'complementary', 'form', 'navigation', 'search'];

    dom_cache.structureInfo.allLandmarkElements.forEach( le => {
      const role = le.domElement.role;

      if (testRoles.indexOf(role) >= 0) {

        const de = le.getFirstVisibleHeadingDomElement();
        if (de) {
          const ariaLevel = de.ariaValidation.ariaLevel;
          if (ariaLevel === 2) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [role]);
            debug.log(`[${role}][${de}]: PASSED`);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role, ariaLevel]);
            debug.log(`[${role}][${de}]: FAILED`);
          }
        }
      }
    });
  } // end validate function
}

];

/*
 * Heading Rule Helper Functions
 */

function checkHeadingNesting(dom_cache, rule_result, headingDomElements, landmarkRole='') {
  const visibleHeadings = [];

  headingDomElements.forEach( de => {
    if (de.visibility.isVisibleToAT) {
      if (de.accName.name.length) {
        visibleHeadings.push(de);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);
      }
    }
    else {
      rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
    }
  });

  let nestingErrors = 0;
  let lastLevel = visibleHeadings.length ? visibleHeadings[0].ariaValidation.ariaLevel : 1;
  visibleHeadings.forEach( de => {
    const level = de.ariaValidation.ariaLevel;
    if ( level <= (lastLevel + 1)) {
      rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
      // Only update lastLevel when you get a pass
      lastLevel = level;
    }
    else {
      nestingErrors += 1;
      rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
    }
  });

  return nestingErrors;
}

