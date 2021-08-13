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

/* --------------------------------------------------------------------------- */
/*     OpenAjax Alliance Rules that Have Been removed from the library         */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object CONTROL_12
 *
 * @desc Form control label should describe the purpose of the form control
 *
 */

{ rule_id             : 'CONTROL_12',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['button', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'input[type="submit"]', 'input[type="reset"]', 'select', 'textarea'],
  primary_property    : 'computed_label',
  resource_properties : ['computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

   var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var control_elements   = dom_cache.controls_cache.control_elements;
   var control_elements_len = control_elements.length;
   var ces   = [];

   // Check to see if valid cache reference
   if (control_elements && control_elements_len) {

     // collect all the visible controls
     for (var i = 0; i < control_elements_len; i++) {
       var ce = control_elements[i];
       var de = ce.dom_element;
       var cs = de.computed_style;

       var control_type = ce.control_type;

       if (control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT   ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX       ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.FILE           ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD       ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO          ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT         ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT           ||
           control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {

         if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

           if (ce.computed_label_for_comparison !== "") {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'ELEMENT_MC_1', [ce.computed_label, de.tag_name]);
           }
           else {
             rule_result.addResult(TEST_RESULT.FAIL, ce, 'ELEMENT_FAIL_1', [de.tag_name]);
           }
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'ELEMENT_HIDDEN_1', [de.tag_name]);
         }
       }
     } // end loop
   }
  } // end validate function
},

/**
 * @object HEADING_4
 *
 * @desc Headings should describe the content of the section they label
 *
 */
{ rule_id             : 'HEADING_4',
  last_updated        : '2014-11-25',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  primary_property    : 'name',
  resource_properties : ['tag_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    for (var i = 0; i < heading_elements_len; i++ ) {
      var he = heading_elements[i];
      var de = he.dom_element;
      if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'ELEMENT_HIDDEN_1', [de.tag_name]);
      }
      else {
        if (he.name.length) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'ELEMENT_MC_1', [de.tag_name]);
        else rule_result.addResult(TEST_RESULT.FAIL, he, 'ELEMENT_FAIL_1', [de.tag_name]);
      }
    }
  } // end validate function
},

/**
 * @object IMAGE_5
 *
 * @desc If an image has a height or width of 6 pixels its accessible name set to empty, role set to presentation or the image removed and use CSS position
 */
{ rule_id             : 'IMAGE_5',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['accessible_name_length', 'role', 'height', 'width', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_IMAGE_HEIGHT = 6;
    var MAX_IMAGE_WIDTH  = 6;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
        var cs = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          if ((cs.height <= MAX_IMAGE_HEIGHT) || (cs.width <= MAX_IMAGE_WIDTH)) {
            if (de.has_role && (de.role === 'presentation')) rule_result.addResult(TEST_RESULT.PASS, ie, 'ELEMENT_PASS_1', []);
            else if (ie.accessible_name_length === 0) rule_result.addResult(TEST_RESULT.PASS, ie, 'ELEMENT_PASS_2', []);
            else rule_result.addResult(TEST_RESULT.FAIL, ie, 'ELEMENT_FAIL_1', []);
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        }
      } // end loop
    }
  } // end validation function
},

/**
 * @object IMAGE_7
 *
 * @desc Image of text
 */
{ rule_id             : 'IMAGE_7',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '1.4.5',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'alt', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
        var cs = de.computed_style;

        if ((cs.is_visible_to_at === VISIBILITY.VISIBLE) &&
            (!de.has_role || (de.role !== 'presentation'))) {

          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', []);

        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', []);
        }
      } // end loop
    }
  } // end validation function
}  ,

/**
 * @object LANDMARK_18
 *
 * @desc Landmark should only be on p, div, span or HTML5 section elements
 */

{ rule_id             : 'LANDMARK_18',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
  primary_property    : 'tag_name',
  resource_properties : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var i;
    var les   = [];

    for (i = 0; i < landmark_elements_len; i++ ) {

      var le = landmark_elements[i];
      var de = le.dom_element;
      var cs = de.computed_style;

      if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

        if ((de.tag_name === 'address') ||
            (de.tag_name === 'article') ||
            (de.tag_name === 'aside'  ) ||
            (de.tag_name === 'body'   ) ||
            (de.tag_name === 'div'    ) ||
            (de.tag_name === 'footer' ) ||
            (de.tag_name === 'form'   ) ||
            (de.tag_name === 'figure' ) ||
            (de.tag_name === 'header' ) ||
            (de.tag_name === 'main'   ) ||
            (de.tag_name === 'p'      ) ||
            (de.tag_name === 'nav'    ) ||
            (de.tag_name === 'section') ||
            (de.tag_name === 'span'   )) {
          rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [de.role, de.tag_name]);
        }
        else {
          rule_result.addResult(TEST_RESULT.FAIL,  le, 'ELEMENT_FAIL_1', [de.role, de.tag_name]);
        }
      }
      else {
       rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [de.tag_name, de.role]);
      }

    } // end loop

  } // end validate function
},

/*
 * @object LINK_4
 *
 * @desc Links with the same HREF should have the same link text.
 */

{ rule_id             : 'LINK_4',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  primary_property    : 'accessible_name',
  resource_properties : ['href', 'accessible_name_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function updateResults(links, test_result, message) {

      for (var i = 0; i < links.length; i++) {

        var le = links[i];
        var links_len = links[i].length;

        var tag_name  = le.dom_element.tag_name;

        rule_result.addResult(test_result, le,  message, [tag_name, links_len], le.toString(le.href));

//        OpenAjax.a11y.logger.debug("  Update Item: " + i + " of " + links.length + " le: " + le.toString(le.href) + " " + (typeof le.toString(le.href)));

      }

    }

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var same_hrefs     = dom_cache.links_cache.getLinksThatShareTheSameHREF();
    var same_hrefs_len = same_hrefs.length;

    for (var i = 0; i < same_hrefs_len; i++) {

      var same_href = same_hrefs[i];

      if (same_href.same_names) updateResults(same_href.links, TEST_RESULT.PASS, 'ELEMENT_PASS_1');
      else updateResults(same_href.links, TEST_RESULT.MANUAL_CHECK, 'ELEMENT_MC_1');
//      else updateResults(same_href.links, TEST_RESULT.FAIL, 'ELEMENT_FAIL_1');

    }  // end loop

  } // end validate function
 },

/**
 * @object LINK_3
 *
 * @desc Links should have minimum dimensions for selecting and reading
 */

{ rule_id             : 'LINK_3',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  primary_property    : 'height',
  resource_properties : ['height', 'width', 'is_visible_onscreen'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var MIN_HEIGHT = 12;
    var MIN_WIDTH = 12;

    var passed = true;
    var node_result = null;

    // Check to see if valid cache reference
    if (dom_cache.links_cache.link_elements) {

      var link_elements_len = dom_cache.links_cache.link_elements.length;

      for (var i=0; i < link_elements_len; i++) {

        var le = dom_cache.links_cache.link_elements[i];
        var cs = le.dom_element.computed_style;

        var tag_name = le.dom_element.tag_name;

        // test if link is visible in a graphical rendering

        if (le.is_link) {

          if ((cs.is_visible_onscreen == VISIBILITY.VISIBLE) &
              (cs.height > 0) &&
              (cs.width > 0)) {

            if ((cs.height >= MIN_HEIGHT) &&
                 (cs.width >= MIN_WIDTH)) {
              rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [tag_name, cs.height, cs.width]);
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          }
        } // endif
      } // end loop
    }
  } // end validation function
},
  /**
   * @object ORDER_1
   *
   * @desc Content does not rely solely on sensory characteristics
   */

{ rule_id             : 'ORDER_1',
  last_updated        : '2015-08-15',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.2',
  wcag_related_ids    : [],
  target_resources    : [ 'article', 'aside', 'div', 'footer', 'header', 'main', 'nav', 'section'],
  primary_property    : 'position',
  resource_properties : ['display', 'height', 'width', 'area'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {

      var de = dom_elements[i];
      var cs = de.computed_style;
      var tag_name = de.tag_name;

      // skip elements that do not make sense at all
      if (tag_name !== 'article' &&
          tag_name !== 'aside'  &&
          tag_name !== 'div'    &&
          tag_name !== 'footer' &&
          tag_name !== 'header' &&
          tag_name !== 'main'   &&
          tag_name !== 'nav'     &&
          tag_name !== 'section') continue;

      if (cs.display !== 'block' && cs.display !== 'flex') continue;

      if (cs.height < 7 || cs.width < 7) continue;

      if (cs.is_visible_to_at  === VISIBILITY.VISIBLE) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name]);
      }
    }

  } // end validate function
}

]);

