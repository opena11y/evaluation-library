/* landmarkRules.js */

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
const debug = new DebugLogging('Landmark Rules', false);

/* Helper Functions for Landmarks */


/**
 * @function validateTopLevelLandmark
 *
 * @desc Evaluate if a landmark role is top level (e.g. not contained in other landmarks)
 *
 * @param  {DOMCache}    dom_cache   - DOMCache object being used in the evaluation
 * @param  {RuleResult}  rule_result - RuleResult object
 * @param  {String}      role        - Landmark role to check
 */

function validateTopLevelLandmark(dom_cache, rule_result, role) {

  const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;

  allLandmarkElements.forEach( le => {
    const de = le.domElement;
    if (de.role === role) {
      if (de.visibility.isVisibleToAT) {

        if (de.parentInfo.landmarkElement === null) {
          if (de.hasRole) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', []);
          }
        }
        else {
          // Check to see if the two elements with the role share the same DOM (e.g. iframe check)
          // If in a different DOM, allow it to be the top level in that DOM
          const de1 = de.parentInfo.landmarkElement.domElement;

          if (de1 && (de.parentInfo.document !== de1.parentInfo.document)) {
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', []);
            }
          }
          else {
            // Fails if they are in the same DOM
            const landmarkRole = de.parentInfo.landmarkElement.domElement.role;
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName, landmarkRole]);
            } else  {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [landmarkRole]);
            }
          }
        }
      }
      else {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', []);
        }
      }
    }
  });
}

/**
 * @function validateAtLeastOne
 *
 * @desc Evaluate if the the landmark region role exists in the page.
 *       The required parameter determines if the landamrk is missing whether
 *       a failure or manual check is required
 *
 * @param  {DOMCache}    dom_cache    - DOMCache object being used in the evaluation
 * @param  {RuleResult}  rule_result  - RuleResult object
 * @param  {String}      role         - Landmark role
 * @oaram  {Boolean}     required     - Is the landamrk region role required
 */

function validateAtLeastOne(dom_cache, rule_result, role, required) {
  const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
  let roleCount = 0;

  allLandmarkElements.forEach( le => {
    const de = le.domElement;
    if (de.role === 'main') {
      if (de.visibility.isVisibleToAT) {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
        }
        roleCount += 1;
      }
      else {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', []);
        }
      }
    }
  });

  if (roleCount === 0) {
    if (required) {
      rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
    }
    else {
      rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
    }
  } else {
    if (roleCount === 1) {
      rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
    } else {
      rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_2', [roleCount]);
    }
  }
}


/**
 * @function validateNoMoreThanOne
 *
 * @desc Evaluate if the the landmark region role exists more than once on the page.
 *
 * @param  {DOMCache}    dom_cache    - DOMCache object being used in the evaluation
 * @param  {RuleResult}  rule_result  - RuleResult object
 * @param  {String}      role         - Landmark region role
 */

function validateNoMoreThanOne(dom_cache, rule_result, role) {

  const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
  let roleCount = 0;
  let visibleDomElements = [];

  allLandmarkElements.forEach( le => {
    const de = le.domElement;
    if (de.role === role) {
      if (de.visibility.isVisibleToAT) {
        visibleDomElements.push(de);
        roleCount += 1;
      }
      else {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', []);
        }
      }
    }
  });

  if (roleCount > 0) {
    if (roleCount === 1) {
      rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
      visibleDomElements.forEach( de => {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
        }
      });
    } else {
      rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_FAIL_1', [roleCount]);
      visibleDomElements.forEach( de => {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_FAIL_1', [de.tagName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_FAIL_2', []);
        }
      });
    }
  }
}

/**
 * @function validateLandmarkDescendants
 *
 * @desc Evaluate if the descendant landmark roles are a certain type
 *
 * @param  {DOMCache}    dom_cache             - DOMCache object being used in the evaluation
 * @param  {RuleResult}  rule_result           - RuleResult object
 * @param  {String}      role                  - Landmark region role
 * @param  {Array}       allowedLandmarkRoles  - An array of allowed descendant roles
 */

function validateLandmarkDescendants(dom_cache, rule_result, role, allowedLandmarkRoles) {

  function checkForDescendantLandmarks(landmarkElement) {
    const result = {
      failedCount: 0,
      failedRoles : [],
      passedCount: 0,
      passedRoles : []
    }

    landmarkElement.descendantLandmarkElements.forEach( le => {
      const de   = le.domElement;
      const role = de.role;
      if (allowedLandmarkRoles.includes(role)) {
        rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [role]);
        result.passedCount += 1;
        result.passedRoles.push(role);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
        result.failedCount += 1;
        result.failedRoles.push(role);
      }
    });

    return result;
  }

  const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
  let roleCount = 0;
  let visibleLandmarkElements = [];

  allLandmarkElements.forEach( le => {
    const de = le.domElement;
    if (de.role === role) {
      if (de.visibility.isVisibleToAT) {
        visibleLandmarkElements.push(le);
        roleCount += 1;
      }
      else {
        if (de.hasRole) {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', []);
        }
      }
    }
  });

  visibleLandmarkElements.forEach( le => {
    const de = le.domElement;
    const result = checkForDescendantLandmarks(le);
    const failedRoles = result.failedRoles.join(', ');
    const passedRoles = result.passedRoles.join(', ');

    if (result.failedCount === 1) {
      rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [failedRoles]);
    } else {
      if (result.failedCount > 1) {
        rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_3', [result.failedCount, failedRoles]);
      }
      else {
        if (result.passedCount === 0) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
        }
        else {
          if (result.passedCount === 1) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [passedRoles]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', [result.passedCount, passedRoles]);
          }
        }
      }
    }
  });
}

/**
 * @function validateUniqueAccessibleNames
 *
 * @desc Evaluate if the accessible names for the landmark role are unique.
 *
 * @param  {DOMCache}    dom_cache    - DOMCache object being used in the evaluation
 * @param  {RuleResult}  rule_result  - RuleResult object
 * @param  {String}      role         - Landmark region role
 */

function validateUniqueAccessibleNames(dom_cache, rule_result, role) {

  const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
  let roleCount = 0;
  let visibleDomElements = [];

  allLandmarkElements.forEach( le => {
    const de = le.domElement;
    if (de.role === role) {
      if (de.visibility.isVisibleToAT) {
        visibleDomElements.push(de);
        roleCount += 1;
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName, de.role]);
      }
    }
  });

  if (roleCount > 1) {
    visibleDomElements.forEach( (de1, index1) => {
      let duplicate = false;
      visibleDomElements.forEach( (de2, index2) => {
        if ((index1 !== index2) &&
            accNamesTheSame(de1.accName, de2.accName)) {
          duplicate = true;
        }
      });
      if (duplicate) {
        rule_result.addElementResult(TEST_RESULT.FAIL, de1, 'ELEMENT_FAIL_1', [de1.accName.name, role]);
      }
      else {
        rule_result.addElementResult(TEST_RESULT.PASS, de1, 'ELEMENT_PASS_1', [role]);
      }
    });
  }
}

/*
 * OpenA11y Alliance Rules
 * Rule group: Landmark Rules
 */

export const landmarkRules = [

  /**
   * @object LANDMARK_1
   *
   * @desc Each page should have at least one main landmark
   */

  { rule_id             : 'LANDMARK_1',
    last_updated        : '2022-05-03',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['main', '[role="main"]'],
    validate            : function (dom_cache, rule_result) {
      validateAtLeastOne(dom_cache, rule_result, 'main', true);
    } // end validate function
  },

  /**
   * @object LANDMARK_2
   *
   * @desc All rendered content should be contained in a landmark
   */
  { rule_id             : 'LANDMARK_2',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['Page', 'all'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.allDomElements.forEach ( de => {
        if (!de.ariaValidation.isLandmark &&
             de.tagName !== 'body' &&
            (de.hasContent || de.mayHaveContent)) {
          if (de.visibility.isVisibleToAT) {
            if (de.parentInfo.landmarkElement) {
              const role = de.parentInfo.landmarkElement.domElement.role;
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, role]);
            }
            else {
              if (de.mayHaveContent) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });
    } // end validate function
  },

  /**
   * @object LANDMARK_3
   *
   * @desc Each page within a website should have at least one navigation landmark
   *
   */
  { rule_id             : 'LANDMARK_3',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['nav', '[role="navigation"]'],
    validate            : function (dom_cache, rule_result) {

      const MINIMUM_LINKS = 4;
      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let navigationCount = 0;

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'navigation') {
          if (de.visibility.isVisibleToAT) {
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
            }
            navigationCount += 1;
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });

      if (navigationCount === 0) {
        // See if there are any lists of links greater than the MINIMUM_LINKS
        const allListElements = dom_cache.listInfo.allListElements;
        let listWithLinksCount = 0;
        allListElements.forEach ( le => {
          const de = le.domElement;
          if (le.linkCount > MINIMUM_LINKS) {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, one_link_count]);
            listWithLinksCount += 1;
          }
        });

        if (listWithLinksCount > 0) {
          rule_result.addWebsiteResult(TEST_RESULT.FAIL, dom_cache, 'WEBSITE_FAIL_1', []);
        }
      } else {
        if (navigationCount === 1) {
          rule_result.addWebsiteResult(TEST_RESULT.PASS, dom_cache, 'WEBSITE_PASS_1', []);
        } else {
          rule_result.addWebsiteResult(TEST_RESULT.PASS, dom_cache, 'WEBSITE_PASS_2', [navigationCount]);
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_4
   *
   * @desc Each page may have at least one banner landmark
   *
   */

  { rule_id             : 'LANDMARK_4',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {
      validateAtLeastOne(dom_cache, rule_result, 'banner', false);
    } // end validate function
  },

  /**
   * @object LANDMARK_5
   *
   * @desc Each page should not have more than one banner landmark
   *
   */

  { rule_id             : 'LANDMARK_5',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {
      validateNoMoreThanOne(dom_cache, rule_result, 'banner');
    } // end validate function
  },

  /**
   * @object LANDMARK_6
   *
   * @desc Each page may have one contentinfo landmark
   *
   */
  { rule_id             : 'LANDMARK_6',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {
      validateAtLeastOne(dom_cache, rule_result, 'contentinfo', false);
   } // end validate function
  },

  /**
   * @object LANDMARK_7
   *
   * @desc Each page may have only one contentinfo landmark
   *
   */
  { rule_id             : 'LANDMARK_7',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {
      validateNoMoreThanOne(dom_cache, rule_result, 'contentinfo');
    } // end validate function
  },

  /**
   * @object LANDMARK_8
   *
   * @desc banner landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_8',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    required            : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {
      validateTopLevelLandmark(dom_cache, rule_result, 'banner');
    } // end validate function
  },

  /**
   * @object LANDMARK_9
   *
   * @desc Banner landmark should only contain only region, navigation and search landmarks
   */
  { rule_id             : 'LANDMARK_9',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {
     validateLandmarkDescendants(dom_cache, rule_result, 'banner', ['navigation', 'region', 'search']);
    } // end validate function
  },

  /**
   * @object LANDMARK_10
   *
   * @desc Navigation landmark should only contain only region and search landmarks
   */
  { rule_id             : 'LANDMARK_10',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['nav', '[role="naviation"]'],
    validate            : function (dom_cache, rule_result) {
      validateLandmarkDescendants(dom_cache, rule_result, 'navigation', ['region', 'search']);
    } // end validate function
  },

  /**
   * @object LANDMARK_11
   *
   * @desc Main landmark must be a top level lanmark
   */
  { rule_id             : 'LANDMARK_11',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', '[role="main"]'],
    validate            : function (dom_cache, rule_result) {
      validateTopLevelLandmark(dom_cache, rule_result, 'main');
    } // end validate function
  },

  /**
   * @object LANDMARK_12
   *
   * @desc Contentinfo landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_12',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {
      validateTopLevelLandmark(dom_cache, rule_result, 'contentinfo');
    } // end validate function
  },

  /**
   * @object LANDMARK_13
   *
   * @desc Contentinfo landmark should only contain only search, region and navigation landmarks
   */
  { rule_id             : 'LANDMARK_13',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {
      validateLandmarkDescendants(dom_cache, rule_result, 'contentinfo', ['navigation', 'region', 'search']);
    } // end validate function
  },

  /**
   * @object LANDMARK_14
   *
   * @desc Search landmark should only contain only region landmarks
   */
  { rule_id             : 'LANDMARK_14',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="search"]'],
    validate            : function (dom_cache, rule_result) {
      validateLandmarkDescendants(dom_cache, rule_result, 'search', ['region']);
    } // end validate function
  },

  /**
   * @object LANDMARK_15
   *
   * @desc Form landmark should only contain only region landmarks
   */
  { rule_id             : 'LANDMARK_15',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="form"]'],
    validate            : function (dom_cache, rule_result) {
      validateLandmarkDescendants(dom_cache, rule_result, 'form', ['region']);
    } // end validate function
  },

  /**
   * @object LANDMARK_16
   *
   * @desc Elements with the role=region must have accessible name to be considered a landmark
   */
  { rule_id             : 'LANDMARK_16',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="region"]'],
    validate            : function (dom_cache, rule_result) {
      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.hasRole && de.role === 'region') {
          if (de.visibility.isVisibleToAT) {
            if ((de.accName)) {
              if (de.hasRole) {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [ de.tagName]);
              } else {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
              }
            }
            else {
              if (de.hasRole) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tagName]);
              } else {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
          }
        }
      });
    } // end validate function
  },

  /**
   * @object LANDMARK_17
   *
   * @desc Landmark must have unique labels
   */

  { rule_id             : 'LANDMARK_17',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
    validate            : function (dom_cache, rule_result) {
      const landmarkRoles = ['banner', 'complementary', 'contentinfo', 'navigation', 'region', 'search'];
      landmarkRoles.forEach( role => {
        validateUniqueAccessibleNames(dom_cache, rule_result, role);
      });
    } // end validate function
  },

  /**
   * @object LANDMARK_18
   *
   * @desc Landmark must identify content regions
   */

  { rule_id             : 'LANDMARK_18',
    last_updated        : '2015-08-07',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.NORE,
    rule_required       : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
    validate            : function (dom_cache, rule_result) {
      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.visibility.isVisibleToAT) {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.role, de.accName.name]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
        }
      });
    } // end validate function
  },

  /**
   * @object LANDMARK_19
   *
   * @desc Complementary landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_19',
    last_updated        : '2022-05-06',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : false,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['aside', '[role="complementary"]'],
    validate            : function (dom_cache, rule_result) {
      validateTopLevelLandmark(dom_cache, rule_result, 'complementary');
    } // end validate function
  }
];
