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

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Media Rules                         */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object ROLE_1
 *
 * @desc main element may only have roles 'main' or 'presentation'
 */

{ rule_id             : 'ROLE_1',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['main'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];

      if (de.tag_name === 'main') {

        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE ) {

           if (de.role && de.role.length > 0) {
             if (de.role.indexOf('presentation') >= 0) {
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
             }
             else {
               if (de.role.indexOf('main') < 0) {
//                 OpenAjax.a11y.logger.debug("FAIL 1: " + de.role );
                 rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
               }
             }
           }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    }

  } // end validate function
},

/**
 * @object ROLE_2
 *
 * @desc body element role restrictions
 */

{ rule_id             : 'ROLE_2',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['body'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

//   OpenAjax.a11y.logger.debug("Section Elements: " + section_elements_len );

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 2: " + de.tag_name + "[" + de.has_role + "]");

      if (de.has_role && de.tag_name === 'body') {

        var role = de.role;

        if ((role !== 'application') && (role !== 'document')) {
          rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_3
 *
 * @desc List container element role restrictions
 */

{ rule_id             : 'ROLE_3',
  last_updated        : '2015-05-04',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['ul', 'ol'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if ((de.tag_name === 'ul' || de.tag_name === 'ol') && de.has_role) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE ) {

          if (de.role && de.role.length > 0) {
            if (de.role.indexOf('presentation') >= 0) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
            }
            else {
              if ('directory group listbox menu menubar presentation radiogroup tablist toolbar tree '.indexOf(de.role + ' ') < 0) {
                rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, de.role]);
              }
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        }
      }
    }

  } // end validate function
},

/**
 * @object ROLE_4
 *
 * @desc article element role restrictions
 */

{ rule_id             : 'ROLE_4',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['article'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

//   OpenAjax.a11y.logger.debug("Section Elements: " + section_elements_len );

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 4: " + de.tag_name + "[" + de.has_role + "]");

      if (de.tag_name === 'article' && de.has_role) {

        var role = de.role;
        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          if ('application article document main region '.indexOf(role + ' ') < 0) {
            rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_5
 *
 * @desc section element role restrictions
 */

{ rule_id             : 'ROLE_5',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['section'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 5: " + de.tag_name + "[" + de.has_role + "]");

      if (de.has_role && de.tag_name === 'section') {

        var role = de.role;
        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          if ((role !== 'alert'       ) &&
              (role !== 'alertdialog' ) &&
              (role !== 'application' ) &&
              (role !== 'contentinfo' ) &&
              (role !== 'dialog'      ) &&
              (role !== 'document'    ) &&
              (role !== 'log'         ) &&
              (role !== 'main'        ) &&
              (role !== 'marquee'     ) &&
              (role !== 'presentation') &&
              (role !== 'region'      ) &&
              (role !== 'search'      ) &&
              (role !== 'status'      )) {
            rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_6
 *
 * @desc nav element role restrictions
 */

{ rule_id             : 'ROLE_6',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['nav'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 6: " + de.tag_name + "[" + de.has_role + "]");

      if (de.tag_name === 'nav' && de.has_role) {
        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          var role = de.role;

          if (role === 'presentation') {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
          }
          else {
            if (role !== 'navigation') {
              rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_7
 *
 * @desc aside element role restrictions
 */

{ rule_id             : 'ROLE_7',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['aside'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 7: " + de.tag_name + "[" + de.has_role + "]");

      if (de.has_role && de.tag_name === 'aside') {

        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          var role = de.role;

          if ((role !== 'complementary') &&
              (role !== 'region'       ) &&
              (role !== 'note'         ) &&
              (role !== 'search'       ) &&
              (role !== 'presentation' )) {
            rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_8
 *
 * @desc header element role restrictions
 */

{ rule_id             : 'ROLE_8',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['header'],
  primary_property    : 'role',
  resource_properties : ['role'],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("[ROLE RULE 8] tag: " + de.tag_name + "[" + de.has_role + "]");

      if (de.has_role && de.tag_name === 'header') {

        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (de.has_role) {
            var role = de.role;

            if (role === 'presentation') {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              if (role !== 'banner') {
                rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
              }
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_9
 *
 * @desc footer element role restrictions
 */

{ rule_id             : 'ROLE_9',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['footer'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var section_elements     = dom_cache.headings_landmarks_cache.getListOfSectionElements();
    var section_elements_len = section_elements.length;

    for (var i = 0; i < section_elements_len; i++) {
      var se = section_elements[i];
      var de = se.dom_element;

//      OpenAjax.a11y.logger.debug("ROLE 9: " + de.tag_name + "[" + de.has_role + "]");

      if (de.has_role && de.tag_name === 'footer') {

        var cs   = de.computed_style;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (de.has_role) {
            var role = de.role;

            if (role === 'presentation') {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              if (role !== 'contentinfo' ) {
                rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [role]);
              }
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_10
 *
 * @desc h1, h2, h3, h4, h5 and h6 element role restrictions
 */

{ rule_id             : 'ROLE_10',
  last_updated        : '2015-05-14',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1','2.4.6', '4.1.1', '4.1.2'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {


    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if (de.has_role && ('h1 h2 h3 h4 h5 h6 '.indexOf(de.tag_name + ' ') >= 0)) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          var role = de.role;

          if (role === 'presentation') {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.tag_name]);
          }
          else {
            if ((role !== 'heading') &&
                (role !== 'tab'    )) {
              rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tag_name, role]);
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tag_name, role]);
        }
      }
    }
  } // end validate function
},

/**
 * @object ROLE_11
 *
 * @desc List element role restrictions
 */

{ rule_id             : 'ROLE_11',
  last_updated        : '2015-05-04',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['li'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if ((de.tag_name === 'li') && de.has_role) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE ) {

          if (de.role && de.role.length > 0) {
            if (de.role.indexOf('presentation') >= 0) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
            }
            else {
              if ('listitem menuitem menuitemcheckbox menuitemradio option tab treeitem '.indexOf(de.role + ' ') < 0) {
                rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
              }
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
        }
      }
    }

  } // end validate function
},

/**
 * @object ROLE_12
 *
 * @desc a element role semantic restrictions
 */

{ rule_id             : 'ROLE_12',
  last_updated        : '2015-05-04',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['a'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if ((de.tag_name === 'a') && de.has_href && de.has_role) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE ) {

          if (de.role && de.role.length > 0) {
            if (' button checkbox link menuitem menuitemcheckbox menuitemradio tab switch treeitem '.indexOf(' ' + de.role + ' ') < 0) {
              rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role]);
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
        }
      }
    }

  } // end validate function
},

/**
 * @object ROLE_13
 *
 * @desc select element role semantic restrictions
 */

{ rule_id             : 'ROLE_13',
  last_updated        : '2016-05-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['select'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if ((de.tag_name === 'select') && de.has_role) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE ) {

          if (de.role && de.role.length > 0) {
            if (' listbox menu '.indexOf(' ' + de.role + ' ') < 0) {
              rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role]);
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
        }
      }
    }

  } // end validate function
},

/**
 * @object ROLE_14
 *
 * @desc textarea element role semantic restrictions
 */

{ rule_id             : 'ROLE_14',
  last_updated        : '2016-05-21',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.FORMS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['textarea'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : '',
  validate          : function (dom_cache, rule_result) {

    var TEST_RESULT    = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY     = OpenAjax.a11y.VISIBILITY;

    var dom_elements     = dom_cache.element_cache.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      var cs = de.computed_style;

      if ((de.tag_name === 'textarea') && de.has_role) {

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE ) {

          if (de.role && de.role.length > 0) {
            if (' textbox '.indexOf(' ' + de.role + ' ') < 0) {
              rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.role]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.role]);
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.role]);
        }
      }
    }

  } // end validate function
}






]);
