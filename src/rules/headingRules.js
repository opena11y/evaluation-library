/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object HEADING_1
 *
 * @desc Page contains at least one H1 element and each H1 element has content
 */
{ rule_id             : 'HEADING_1',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.TRIAGE,
  rule_required       : false,
  wcag_related_ids    : ['1.3.1', '2.4.2', '2.4.6', '2.4.10'],
  target_resources    : ['Page', 'h1'],
  validate            : function (dom_cache, rule_result) {
    const headingElements = dom_cache.structureInfo.allHeadingDomElements;
    let h1Count = 0;

    headingElements.forEach( de => {
      if (de.tagName === 'h1') {
        if (de.visibility.isVisibleToAT) {
          if (de.accName && de.accName.name.length) {
            rule_result.addElementResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', []);
            h1_count++;
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', []);
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
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : false,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.1', '2.4.2', '2.4.10'],
  target_resources    : ['h1'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function checkForAnscetorLandmarkRole(de, role) {
      let ple = de.parentInfo.landmarkElement;
      while (ple) {
         if (ple.domElement.role === role) return true;
         ple = ple.parentLandmarkElement;
      }
      return false;
    }

    const headingElements = dom_cache.structureInfo.allHeadingDomElements;
    let h1Count = 0;

    headingElements.forEach( de => {
      if (de.tagName === 'h1') {
        if (de.visibility.isVisibleToAT) {
          if (checkForAnscetorLandmarkRole(de, 'main')) {
            rule_result.addElementResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', []);
          }
          else {
            if (checkForAnscetorLandmarkRole(de, 'banner')) {
              rule_result.addElementResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_2', []);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', []);
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
 *
 */
{ rule_id             : 'HEADING_3',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : false,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {

    function getSiblingHeadings(index, heading_element) {

      var list = [];
      var flag = true;

      tested_list.push(heading_element);

      for (var i = (index+1); i < heading_elements_len; i++) {

        var he = heading_elements[i];

        if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
          tested_list.push(he);
          continue;
        }

        if (heading_element.level > he.level) return list;

        if (heading_element.level === he.level) {
          if (flag) list.push(heading_element);
          flag = false;

          list.push(he);
          tested_list.push(he);
        }

      }

      if (list.length > 1) return list;
      else return[];

    }

    function notInTestedList(he) {

      for (var i = 0; i < tested_list.length; i++) {
        if (tested_list[i] === he) return false;
      }

      return true;
    }

    function notInDoneList(he) {

      for (var i = 0; i < done_list.length; i++) {
        if (done_list[i] === he) return false;
      }

      return true;
    }


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    var tested_list = [];
    var done_list   = [];
    var i, j, k;
    var sibling_headings = [];
    var sibling_headings_len = 0;

    if (heading_elements_len > 1) {

      for (i = 0; i < (heading_elements_len-1); i++) {

        var he = heading_elements[i];

        if (notInTestedList(he)) sibling_headings = getSiblingHeadings(i, he);

        sibling_headings_len = sibling_headings.length;

        if (sibling_headings_len > 1) {

          for (j = 0; j < (sibling_headings_len-1); j++) {

            var sh1 = sibling_headings[j];
            var first_flag = true;

            if (notInDoneList(sh1) && sh1.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

              for (k = j+1; k < sibling_headings_len; k++) {
                var sh2 = sibling_headings[k];

                if (sh1.name_for_comparison === sh2.name_for_comparison) {
                  if (first_flag) {
                    rule_result.addResult(TEST_RESULT.FAIL, sh1, 'ELEMENT_FAIL_1', [sh1.dom_element.tag_name]);
                    done_list.push(sh1);
                  }
                  rule_result.addResult(TEST_RESULT.FAIL, sh2, 'ELEMENT_FAIL_1', [sh2.dom_element.tag_name]);
                  done_list.push(sh2);
                  first_flag = false;
                }
              }
            }
          }

          for (j = 0; j < sibling_headings_len; j++) {
            var sh = sibling_headings[j];
            if (notInDoneList(sh)) {
              if (sh.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
                rule_result.addResult(TEST_RESULT.PASS, sh, 'ELEMENT_PASS_1', [sh.dom_element.tag_name]);
              }
              done_list.push(sh);
            }
          }
        }
      }
    }
  } // end validate function
},

/**
 * @object HEADING_5
 *
 * @desc Headings must be properly nested
 *
 */
{ rule_id             : 'HEADING_5',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    for (var i = 0; i < heading_elements_len; i++) {

      var he = heading_elements[i];
      var tag_name = he.dom_element.tag_name;

      if (he.is_visible) {
        if (he.has_content) {
          if ((he.nesting_parent_heading === he.last_parent_heading)) {
            if (!he.nesting_parent_heading ||
                (he.nesting_parent_heading &&
                he.nesting_parent_heading.global_properly_nested)) {
              rule_result.addResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', [tag_name]);
              he.global_properly_nested = true;
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [tag_name]);
              he.global_properly_nested = false;
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [tag_name]);
            he.global_properly_nested = false;
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, he, 'ELEMENT_HIDDEN_2', [tag_name]);
        }
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'ELEMENT_HIDDEN_1', [tag_name]);
      }
    }

//    var page_element = dom_cache.headings_landmarks_cache.page_element;
//
//      if (heading_fail === 0) rule_result.addResult(TEST_RESULT.PASS, page_element, 'ELEMENT_PASS_2', []);
//      else if (heading_fail === 1) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'ELEMENT_FAIL_3', []);
//      else rule_result.addResult(TEST_RESULT.FAIL, page_element, 'ELEMENT_FAIL_4', [heading_fail]);
  } // end validate function
},

/**
 * @object HEADING_6
 *
 * @desc Headings should not consist only of image content
 *
 */
{ rule_id             : 'HEADING_6',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    for (var i = 0; i < heading_elements_len; i++ ) {
      var  he = heading_elements[i];
      var de = he.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.HIDDEN) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'ELEMENT_HIDDEN_1', [de.tag_name]);
      }
      else {
        if (he.name.length) {
          if (he.text_only_from_image) rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [de.tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', [de.tag_name]);
        }
        else {
          rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_2', [de.tag_name]);
        }
      }
    }
  } // end validate function
},

/**
 * @object HEADING_7
 *
 * @desc First heading in contentinfo, complementary, form, navigation and search landmark must be an h2, except main landmark h1
 */
{ rule_id             : 'HEADING_7',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['h2', '[role="banner"]', '[role="contentinfo"]', '[role="complementary"]', '[role="form"]', '[role="navigation"]', '[role="search"]'],
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var cs = le.dom_element.computed_style;

      if ((le.landmark === 'contentinfo') ||
          (le.landmark === 'complementary') ||
          (le.landmark === 'form') ||
          (le.landmark === 'navigation') ||
          (le.landmark === 'search')) {

        if (cs.is_visible_to_at) {

          var heading_elements = le.getHeadings();

          if (heading_elements.length) {
            var he = heading_elements[0];
            if (he.level === 2) {
//              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [le.landmark]);
              rule_result.addResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', [le.landmark]);
            }
            else {
//              rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [le.landmark, he.level]);
              rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [le.landmark, he.level]);
            }
          }
        }
      }
    }
  } // end validate function
},

/**
 * @object HEADING_8
 *
 * @desc Headings should be properly nested in a landmark
 */
{ rule_id             : 'HEADING_8',
  last_updated        : '2022-05-06',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var cs = le.dom_element.computed_style;

      if (cs.is_visible_to_at) {

        var heading_elements = le.getHeadings();
        var heading_elements_len = heading_elements.length;

        for (var j = 0; j < heading_elements_len; j++) {

          var he = heading_elements[j];
          var tag_name = he.dom_element.tag_name;

          if (he.is_visible) {

//            OpenAjax.a11y.logger.debug(" Heading: " + he + " (" + le + ")");
//            OpenAjax.a11y.logger.debug("  LPH: " + he.landmark_parent_heading + "  LLPH: " + he.last_landmark_parent_heading);
//            if (he.landmark_parent_heading) OpenAjax.a11y.logger.debug("  LPH nested: " + he.landmark_parent_heading.landmark_properly_nested );

            if (he.has_content) {

              if (he.landmark_parent_heading === he.last_landmark_parent_heading) {

                if (!he.last_landmark_parent_heading ||
                    (he.landmark_parent_heading &&
                     he.landmark_parent_heading.landmark_properly_nested)) {
                  rule_result.addResult(TEST_RESULT.PASS, he, 'ELEMENT_PASS_1', [tag_name, le.toString()]);
                  he.landmark_properly_nested = true;
                }
                else {
                  rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [tag_name, le.toString()]);
                  he.landmark_properly_nested = false;
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [tag_name, le.toString()]);
                he.landmark_properly_nested = false;
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_2', [tag_name, le.toString()]);
              he.landmark_properly_nested = false;
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, he, 'ELEMENT_HIDDEN_1', [tag_name, le.toString()]);
          }
        }
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', [le.toString()]);
      }
    }
  } // end validate function
}

]);




