/**
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Link Rules                          */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object LINK_1
 *
 * @desc Link should describe the target of a link
 */

{ rule_id             : 'LINK_1',
  last_updated        : '2012-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  primary_property    : 'accessible_name',
  resource_properties : ['accessible_name_source', 'href', 'accessible_description'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var link_elements     = dom_cache.links_cache.link_elements;
    var link_elements_len = link_elements.length;

    var visible_link_elements = [];

    for (var i = 0; i < link_elements_len; i++) {

      var le = link_elements[i];
      var tag_name = le.dom_element.tag_name;

      if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE &&
          le.is_link) {
        visible_link_elements.push(le);
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
      }

    }

    var visible_link_elements_len = visible_link_elements.length;

    for (i = 0; i < visible_link_elements_len; i++) {

      le = visible_link_elements[i];

      var name        = le.accessible_name_for_comparison;
      var description = le.accessible_description_for_comparison;
      tag_name        = le.dom_element.tag_name;

      if (name.length) {
        if (description.length) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', [tag_name, name, description]);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', [tag_name, name]);
      }
      else {
        rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [tag_name]);
      }

    }  // end loop


  } // end valifdation function
},

/**
 * @object LINK_2
 *
 * @desc Links with the different HREFs should have the unique accessible names
 */

{ rule_id             : 'LINK_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],

  target_resources    : ['a', 'area', '[role=link]'],
  primary_property    : 'href',
  resource_properties : ['accessible_name', 'accessible_description', 'accessible_name_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function updateResults(links, test_result, message) {

      for (var i = 0; i < links.length; i++) {

        var le = links[i];
        var links_len = links[i].length;

//        OpenAjax.a11y.logger.debug("  Update Item: " + i + " of " + end + " le: " + le.toString());

        var tag_name  = le.dom_element.tag_name;

        rule_result.addResult(test_result, le,  message, [tag_name, links_len]);
      }

    }

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var same_names     = dom_cache.links_cache.getLinksThatShareTheSameName();
    var same_names_len = same_names.length;

    for (var i = 0; i < same_names_len; i++) {

      var same_name = same_names[i];

      if (same_name.same_hrefs) {
        updateResults(same_name.links, TEST_RESULT.PASS, 'ELEMENT_PASS_1');
      } else {
        if (same_name.unique_descriptions) {
          updateResults(same_name.links, TEST_RESULT.PASS, 'ELEMENT_PASS_2');
        } else {
          updateResults(same_name.links, TEST_RESULT.FAIL, 'ELEMENT_FAIL_1');
        }
      }
    }  // end loop

  } // end validate function
 }


]);




