/* landmarkRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Landmark Rules', false);

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

      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let mainCount = 0;

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
            mainCount += 1;
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

      if (mainCount === 0) {
        rule_result.addPageResult(TEST_RESULT.FAIL, dom_cache, 'PAGE_FAIL_1', []);
      } else {
        if (mainCount === 1) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
        } else {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_2', [mainCount]);
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_2
   *
   * @desc All rendered content should be contained in a landmark
   */
  { rule_id             : 'LANDMARK_2',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['Page', 'all'],
    validate            : function (dom_cache, rule_result) {
      dom_cache.allDomElements.forEach ( de => {
        if (de.hasContent || de.mayHaveContent) {
          if (de.visibility.isVisibleToAT) {
            if (de.parentInfo.landmarkElement) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.parent_landmark.landmark]);
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
    last_updated        : '2014-11-28',
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
   * @desc Each page may have one banner landmark
   *
   */

  { rule_id             : 'LANDMARK_4',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {

      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let bannerCount = 0;

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'banner') {
          if (de.visibility.isVisibleToAT) {
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
            }
            bannerCount += 1;
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

      if (bannerCount === 0) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      } else {
        if (bannerCount === 1) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
        } else {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_2', [bannerCount]);
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_5
   *
   * @desc Each page may have only one banner landmark
   *
   */

  { rule_id             : 'LANDMARK_5',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {

      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let bannerCount = 0;
      let visibleBannerDomElements = [];

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'banner') {
          if (de.visibility.isVisibleToAT) {
            visibleBannerDomElements.push(de);
            bannerCount += 1;
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

      if (bannerCount > 0) {
        if (bannerCount === 1) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
          visibleBannerDomElements.forEach( de => {
            if (de.hasRole) {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            }
          });
        } else {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_FAIL_2', [bannerCount]);
          visibleBannerDomElements.forEach( de => {
            if (de.hasRole) {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_FAIL_1', [de.tagName]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_FAIL_2', []);
            }
          });
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_6
   *
   * @desc Each page may have one contentinfo landmark
   *
   */
  { rule_id             : 'LANDMARK_6',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {
      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let contentinfoCount = 0;

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'contentinfo') {
          if (de.visibility.isVisibleToAT) {
            if (de.hasRole) {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', []);
            }
            contentinfoCount += 1;
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

      if (contentinfoCount === 0) {
        rule_result.addPageResult(TEST_RESULT.MANUAL_CHECK, dom_cache, 'PAGE_MC_1', []);
      } else {
        if (contentinfoCount === 1) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
        } else {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_2', [contentinfoCount]);
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_7
   *
   * @desc Each page may have only one contentinfo landmark
   *
   */
  { rule_id             : 'LANDMARK_7',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    rule_required       : true,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : ['1.3.1', '2.4.6'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {

      const allLandmarkElements = dom_cache.structureInfo.allLandmarkElements;
      let contentinfoCount = 0;
      let visibleBannerDomElements = [];

      allLandmarkElements.forEach( le => {
        const de = le.domElement;
        if (de.role === 'contentinfo') {
          if (de.visibility.isVisibleToAT) {
            visibleBannerDomElements.push(de);
            contentinfoCount += 1;
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

      if (contentinfoCount > 0) {
        if (contentinfoCount === 1) {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_PASS_1', []);
          visibleBannerDomElements.forEach( de => {
            if (de.hasRole) {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            }
          });
        } else {
          rule_result.addPageResult(TEST_RESULT.PASS, dom_cache, 'PAGE_FAIL_2', [contentinfoCount]);
          visibleBannerDomElements.forEach( de => {
            if (de.hasRole) {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_FAIL_1', [de.tagName]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_FAIL_2', []);
            }
          });
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_8
   *
   * @desc banner landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_8',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.PAGE,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    required            : true,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'banner') {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (de.parent_landmark === null) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tag_name]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', []);
            }
            else {

              var de1 = de.parent_landmark.dom_element;

              if (de1 && (de.body_element !== de1.body_element)) {
                if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', [de.tag_name]);
                else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', []);
              }
              else {
                if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [de.tag_name, de.parent_landmark.landmark]);
                else  rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [de.parent_landmark.landmark]);
              }
            }

          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_9
   *
   * @desc Banner landmark should only contain only search and navigation landmarks
   */
  { rule_id             : 'LANDMARK_9',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      function checkLandmarkChildren(landmark) {

        var cces     = landmark.child_cache_elements;
        var cces_len = cces.length;
        var fail_count = 0;

        for (var i = 0; i < cces_len; i++) {

          var cce = cces[i];
          var de = cce.dom_element;
          var cs = de.computed_style;
          landmark_count++;

          if (!cce.landmark) continue;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if ((cce.landmark === 'navigation') ||
                (cce.landmark === 'region') ||
                (cce.landmark === 'search')||
                (cce.landmark === 'application')) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [de.role]);
              else rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [de.tag_name]);
              pass_list += ' ' + cce.landmark;
            }
            else {
              if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [de.role]);
              else rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [de.tag_name]);
              fail_count++;
              fail_list += ' ' + cce.landmark;
            }
            if (cce.landmark) fail_count += checkLandmarkChildren(cce);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, cce, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
        }

        return fail_count;
      }

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      var fail_count = 0;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'banner') {

          var fail_list = '';
          var pass_list = '';
          var landmark_count = 0;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            fail_count = checkLandmarkChildren(le);

            if (fail_count === 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [fail_list.toUpperCase()]);
            else if (fail_count > 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_3', [fail_count, fail_list.toUpperCase()]);
            else if (landmark_count === 0) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            else if (landmark_count === 1) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', [pass_list.toUpperCase()]);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', [landmark_count, pass_list.toUpperCase()]);
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', [de.tag_name]);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_10
   *
   * @desc Navigation landmark should only contain only region and search landmarks
   */
  { rule_id             : 'LANDMARK_10',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['nav', '[role="naviation"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      function checkLandmarkChildren(landmark) {

        var cces     = landmark.child_cache_elements;
        var cces_len = cces.length;
        var fail_count = 0;

        for (var i = 0; i < cces_len; i++) {
          var cce = cces[i];
          var de = cce.dom_element;
          var cs = de.computed_style;

          if (!cce.landmark) continue;

          landmark_count++;

  //        logger.debug("Landmarks: " +  landmark.landmark + " -> " + cce.landmark);

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if ((cce.landmark === 'region') ||
                (cce.landmark === 'search')||
                (cce.landmark === 'application')) {
               rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [cce.landmark]);
               pass_list += ' ' + cce.landmark;
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [cce.landmark]);
              fail_count++;
              fail_list += ' ' + cce.landmark;
            }
            fail_count += checkLandmarkChildren(cce);
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', [de.tag_name]);
          }
        }

        return fail_count;
      }


      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      var fail_count = 0;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;


        if (le.landmark === 'navigation') {

          var fail_list = '';
          var pass_list = '';
          var landmark_count = 0;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            fail_count = checkLandmarkChildren(le);

            if (fail_count === 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [fail_list.toUpperCase()]);
            else if (fail_count > 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_3', [fail_count, fail_list.toUpperCase()]);
            else if (landmark_count === 0) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            else if (landmark_count === 1) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', [pass_list.toUpperCase()]);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', [landmark_count, pass_list.toUpperCase()]);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_11
   *
   * @desc Main landmark must be a top level lanmark
   */
  { rule_id             : 'LANDMARK_11',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', '[role="main"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'main') {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (de.parent_landmark) {
              var de1 = de.parent_landmark.dom_element;

              if (de1 && (de.body_element !== de1.body_element)) {
                if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', [de.tag_name]);
                else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', []);
              }
              else {
                if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [de.tag_name, de.parent_landmark.landmark]);
                else rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [de.parent_landmark.landmark]);
              }
            }
            else {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tag_name]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', []);
            }
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_12
   *
   * @desc Contentinfo landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_12',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['footer', '[role="contentinfo"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'contentinfo') {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (de.parent_landmark === null) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tag_name]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', []);
            }
            else {

              var de1 = de.parent_landmark.dom_element;

              if (de1 && (de.body_element !== de1.body_element)) {
                if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', [de.tag_name]);
                else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', []);
              }
              else {
                if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [de.tag_name, de.parent_landmark.landmark]);
                else  rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [de.parent_landmark.landmark]);
              }
            }

          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_13
   *
   * @desc Contentinfo landmark should only contain only search, region and navigation landmarks
   */
  { rule_id             : 'LANDMARK_13',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['header', '[role="banner"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      function checkLandmarkChildren(landmark) {

        var cces     = landmark.child_cache_elements;
        var cces_len = cces.length;
        var fail_count = 0;

        for (var i = 0; i < cces_len; i++) {

          var cce = cces[i];
          var de = cce.dom_element;
          var cs = de.computed_style;
          landmark_count++;

          if (!cce.landmark) continue;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if ((cce.landmark === 'navigation') ||
                (cce.landmark === 'region') ||
                (cce.landmark === 'search') ||
                (cce.landmark === 'application')) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [de.role]);
              else rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [de.tag_name]);
              pass_list += ' ' + cce.landmark;
            }
            else {
              if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [de.role]);
              else rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [de.tag_name]);
              fail_count++;
              fail_list += ' ' + cce.landmark;
            }
            if (cce.landmark) fail_count += checkLandmarkChildren(cce);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, cce, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
        }

        return fail_count;
      }

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      var fail_count = 0;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'contentinfo') {

          var fail_list = '';
          var pass_list = '';
          var landmark_count = 0;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            fail_count = checkLandmarkChildren(le);

            if (fail_count === 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [fail_list.toUpperCase()]);
            else if (fail_count > 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_3', [fail_count, fail_list.toUpperCase()]);
            else if (landmark_count === 0) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            else if (landmark_count === 1) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', [pass_list.toUpperCase()]);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', [landmark_count, pass_list.toUpperCase()]);
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', [de.tag_name]);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_14
   *
   * @desc Search landmark should only contain only region landmarks
   */
  { rule_id             : 'LANDMARK_14',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="search"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      function checkLandmarkChildren(landmark) {

        var cces     = landmark.child_cache_elements;
        var cces_len = cces.length;
        var fail_count = 0;

        for (var i = 0; i < cces_len; i++) {

          var cce = cces[i];
          var de = cce.dom_element;
          var cs = de.computed_style;

          if (!cce.landmark) continue;

          landmark_count++;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if ((cce.landmark === 'region') ||
                (cce.landmark === 'application')) {
               rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [cce.landmark]);

               pass_list += ' ' + cce.landmark;
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [cce.landmark]);
              fail_count++;
              fail_list += ' ' + cce.landmark;
            }
            fail_count += checkLandmarkChildren(cce);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, cce, 'ELEMENT_HIDDEN_2', [de.tag_name, de.landmark]);
          }
        }

        return fail_count;
      }


      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      var fail_count = 0;

      for (var i = 0; i < landmark_elements_len; i++ ) {

        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'search') {

          var fail_list = '';
          var pass_list = '';
          var landmark_count = 0;


          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            fail_count = checkLandmarkChildren(le);

            if (fail_count === 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [fail_list.toUpperCase()]);
            else if (fail_count > 1) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_3', [fail_count, fail_list.toUpperCase()]);
            else if (landmark_count === 0) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            else if (landmark_count === 1) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', [pass_list.toUpperCase()]);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', [landmark_count, pass_list.toUpperCase()]);

          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_15
   *
   * @desc Form landmark should only contain only region landmarks
   */
  { rule_id             : 'LANDMARK_15',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="form"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      function checkLandmarkChildren(landmark) {

        var cces     = landmark.child_cache_elements;
        var cces_len = cces.length;
        var fail_count = 0;

        for (var i = 0; i < cces_len; i++) {

          var cce = cces[i];
          var de = cce.dom_element;
          var cs = de.computed_style;

          if (!cce.landmark) continue;

          landmark_count++;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            if ((cce.landmark === 'region') ||
                (cce.landmark === 'application')) {
               rule_result.addResult(TEST_RESULT.PASS, cce, 'ELEMENT_PASS_1', [cce.landmark]);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, cce, 'ELEMENT_FAIL_1', [cce.landmark]);
              fail_count++;
            }
            fail_count += checkLandmarkChildren(cce);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, cce, 'ELEMENT_HIDDEN_3', [cce.dom_element.tag_name, cce.landmark]);
          }
        }

        return fail_count;
      }


      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      var fail_count = 0;

      for (var i = 0; i < landmark_elements_len; i++ ) {

        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'form') {

          var landmark_count = 0;

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            fail_count = checkLandmarkChildren(le);

  //          logger.debug("  Search: " + fail_count);

            if (fail_count > 0) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', []);
            else if (landmark_count === 0) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            else if (landmark_count === 1) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', []);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', [landmark_count]);
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_16
   *
   * @desc Elements with the role=region must have accessible name to be considered a landmark
   */
  { rule_id             : 'LANDMARK_16',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['[role="region"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {

        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'region') {

  //        logger.debug("  Region: " + fail_count);

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if ((le.computed_label_source !== SOURCE.NONE) &&
                (le.computed_label.length > 0)) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [ de.tag_name]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
            }
            else {
              if (de.has_role) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [de.tag_name]);
              else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', []);
            }
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }

      var section_elements     = dom_cache.headings_landmarks_cache.all_section_elements;
      var section_elements_len = section_elements.length;

      for (i = 0; i < section_elements_len; i++ ) {

        le = section_elements[i];
        de = le.dom_element;
        cs = de.computed_style;

  //       logger.debug("TAG NAME: " + de.tag_name);

        if (de.tag_name === 'section' &&
            !de.has_role &&
            !de.has_aria_labelledby &&
            !de.has_aria_label &&
            !de.has_title) {
          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', []);
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }

    } // end validate function
  },

  /**
   * @object LANDMARK_17
   *
   * @desc Landmark must have unique labels
   */

  { rule_id             : 'LANDMARK_17',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      var i;
      var les   = [];

      for (i = 0; i < landmark_elements_len; i++ ) {

        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) les.push(le);
        else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name, de.landmark]);

      } // end loop

      // sort labels

      les = dom_cache.sortArrayOfObjects(les,'computed_label_for_comparison', true);

      for (i = 0; i < les.length; i++) {

        le = les[i];

        if (le.duplicate) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [le.computed_label, le.landmark]);
        else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [le.landmark]);

      }

    } // end validate function
  },

  { rule_id             : 'LANDMARK_18',
    last_updated        : '2015-08-07',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
          rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [le.landmark]);
        }
        else {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [le.landmark, le.computed_label]);
        }
      }
    } // end validate function
  },

  /**
   * @object LANDMARK_19
   *
   * @desc Complementary landmark must be a top level landmark
   */
  { rule_id             : 'LANDMARK_19',
    last_updated        : '2014-11-28',
    rule_scope          : RULE_SCOPE.ELEMENT,
    rule_category       : RULE_CATEGORIES.LANDMARKS,
    ruleset             : RULESET.MORE,
    wcag_primary_id     : '1.3.1',
    wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
    target_resources    : ['aside', '[role="complementary"]'],
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = TEST_RESULT;
      var VISIBILITY  = VISIBILITY;

      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      for (var i = 0; i < landmark_elements_len; i++ ) {
        var le = landmark_elements[i];
        var de = le.dom_element;
        var cs = de.computed_style;

        if (le.landmark === 'complementary') {

          if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (!de.parent_landmark) {
              if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.tag_name]);
              else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_3', []);
            }
            else {
              var de1 = de.parent_landmark.dom_element;

              if (de1 && (de.body_element !== de1.body_element)) {
                if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', [de.tag_name]);
                else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_4', []);
              }
              else {
                if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [de.tag_name, de.parent_landmark.landmark]);
                else rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', [de.parent_landmark.landmark]);
              }
            }
          }
          else {
            if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
          }
        }
      }
    } // end validate function
  }
];
