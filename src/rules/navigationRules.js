/* navigationRules.js */

/* Imports */
import {
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Navigation Rules', false);
debug.flag = false;


/* Helper Functions */

function isHeadingLevelOne (domElement) {
  return ((domElement.tagName == 'h1')  ||
          ((domElement.role='heading') &&
          (domElement.ariaInfo.ariaLevel === 1)));
}

function isHeadingLevelTwo (domElement) {
  return ((domElement.tagName == 'h2')  ||
          ((domElement.role='heading') &&
          (domElement.ariaInfo.ariaLevel === 2)));
}

/*
 * OpenA11y Rules
 * Rule Category: List Rules
 */

export const navigationRules = [

  /**
   * @object NAVIGATION_1
   *
   * @desc Page has at least two of the following resources: table of contents, site map,
   *       search, navigation links, sand trail
   */

  { rule_id             : 'NAVIGATION_1',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : true,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '2.4.5',
    wcag_related_ids    : [],
    target_resources    : ['Website', 'role=\'search\'', 'role=\'navigation\''],
    validate            : function (dom_cache, rule_result) {

      let navigationCount = 0;
      let searchCount = 0;

      dom_cache.structureInfo.allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'navigation') {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            navigationCount += 1;
          }
        }

        if (de.role === 'search') {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            searchCount += 1;
          }
        }
      });

      if ((navigationCount > 0) && (searchCount > 0)) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_1', []);
      }
      else {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_2', []);
      }

    } // end validation function
  },

  /**
   * @object NAVIGATION_2
   *
   * @desc  Landmarks are in the same relative order when used to identify sections of web pages within the same website
   *
   */

  { rule_id             : 'NAVIGATION_2',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '3.2.3',
    wcag_related_ids    : ['3.2.4'],
    target_resources    : ['Website', 'role=\'main\'', 'role=\'navigation\'', 'role=\'banner\'', 'role=\'contentinfo\'','role=\'search\''],
    validate            : function (dom_cache, rule_result) {

      const landmarkRoles = [
        'banner',
        'complementary',
        'contentinfo',
        'main',
        'navigation',
        'search'];

      let landmarks = [];

      dom_cache.structureInfo.allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (landmarkRoles.includes(de.role)) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.role]);
            landmarks.push(de.role);
          }
        }
      });

      if ((landmarks.length > 0)) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_1', [landmarks.join(', ')]);
      }
    } // end validation function
  },

  /**
   * @object NAVIGATION_3
   *
   * @desc  h2 elements are in the same relative order when used to identify sections of web pages within the same website
   *
   */

  { rule_id             : 'NAVIGATION_3',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '3.2.3',
    wcag_related_ids    : ['3.2.4'],
    target_resources    : ['Website', 'h2'],
    validate            : function (dom_cache, rule_result) {

      let headingCount = 0;

      dom_cache.structureInfo.allHeadingDomElements.forEach( de => {
        if (de.visibility.isVisibleToAT) {
          if (isHeadingLevelOne(de)) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            headingCount += 1;
          }

          if (isHeadingLevelTwo(de)) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            headingCount += 1;
          }
        }
      });

      if ((headingCount > 0)) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_1', []);
      }
      else {
        rule_result.addWebsiteResult(TEST_RESULT.FAIL, dom_cache, 'WEBSITE_FAIL_1', []);
      }

    } // end validation function
  },

  /**
   * @object NAVIGATION_4
   *
   * @desc  landmarks identifying the same sections in a website have the same accessible name
   *
   */

  { rule_id             : 'NAVIGATION_4',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '3.2.4',
    wcag_related_ids    : ['3.2.3'],
    target_resources    : ['Website', 'role=\'search\'', 'role=\'navigation\'', 'role=\'main\'', 'role=\'banner\'', 'role=\'contentinfo\'', 'h2'],
    validate            : function (dom_cache, rule_result) {

      const landmarkRoles = [
        'banner',
        'complementary',
        'contentinfo',
        'main',
        'navigation',
        'search'];

      let landmarks = [];

      dom_cache.structureInfo.allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (landmarkRoles.includes(de.role)) {
          if (de.visibility.isVisibleToAT) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.role]);
            landmarks.push(de.role);
          }
        }
      });

      if ((landmarks.length > 0)) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_1', [landmarks.join(', ')]);
      }

    } // end validation function
  },

  /**
   * @object NAVIGATION_5
   *
   * @desc  h2 elements used to identify sections of web pages within the same accessible name
   *
   */

  { rule_id             : 'NAVIGATION_5',
    last_updated        : '2023-08-24',
    rule_scope          : RULE_SCOPE.WEBSITE,
    rule_category       : RULE_CATEGORIES.SITE_NAVIGATION,
    rule_required       : true,
    first_step          : false,
    axe_refs            : [],
    wave_refs           : [],
    wcag_primary_id     : '3.2.4',
    wcag_related_ids    : ['3.2.3'],
    target_resources    : ['Website', 'h2'],
    validate            : function (dom_cache, rule_result) {

      let headingCount = 0;

      dom_cache.structureInfo.allHeadingDomElements.forEach( de => {
        if (de.visibility.isVisibleToAT) {
          if (isHeadingLevelOne(de)) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            headingCount += 1;
          }

          if (isHeadingLevelTwo(de)) {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);
            headingCount += 1;
          }
        }
      });

      if ((headingCount > 0)) {
        rule_result.addWebsiteResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'WEBSITE_MC_1', []);
      }
      else {
        rule_result.addWebsiteResult(TEST_RESULT.FAIL, dom_cache, 'WEBSITE_FAIL_1', []);
      }

    } // end validation function
  }
];




