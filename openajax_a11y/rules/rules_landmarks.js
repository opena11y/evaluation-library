/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object LANDMARK_1
 *
 * @desc Each page should have at least one main landmark
 *
 */
{ rule_id             : 'LANDMARK_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['main', '[role="main"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;

    var main_count = 0;

    for (var i = 0; i < main_elements_len; i++ ) {
      var me = main_elements[i];
      var de = me.dom_element;

      if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
        if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, me, 'ELEMENT_HIDDEN_1', [de.tag_name]);
        else rule_result.addResult(TEST_RESULT.HIDDEN, me, 'ELEMENT_HIDDEN_2', []);
      }
      else {
        if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, me, 'ELEMENT_PASS_1', [de.tag_name]);
        else rule_result.addResult(TEST_RESULT.PASS, me, 'ELEMENT_PASS_2', []);
        main_count++;
      }
    }

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    if (page_element) {
      // Test if no h1s
      if (main_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', []);
      else if (main_count === 1) rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_2', [main_count]);
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['Page', 'all'],
  primary_property    : 'parent_landmark',
  resource_properties : ['tag_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var elements_with_content    = dom_cache.headings_landmarks_cache.elements_with_content;
    var elements_with_content_len = elements_with_content.length;

    var pass_count   = 0;
    var fail_count   = 0;
    var mc_count     = 0;

    var tag_name = "";

    for (var i = 0; i < elements_with_content_len; i++ ) {
      var de =elements_with_content[i];

      if (de.tag_name) tag_name = de.tag_name;
      else tag_name = de.parent_element.tag_name;

//      OpenAjax.a11y.logger.debug("  Content: " + de.toString()  +  " " + de.may_have_renderable_content);

      if (de.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
        rule_result.addResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [tag_name]);
      }
      else {
        if (de.parent_landmark) {
          rule_result.addResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [tag_name, de.parent_landmark.landmark]);
          pass_count++;
        }
        else {
          if (de.may_have_renderable_content) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [tag_name]);
            mc_count++;
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [tag_name]);
            fail_count++;
          }
        }
      }
    }

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['nav', '[role="navigation"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var container_elements     = dom_cache.lists_cache.container_elements;
    var container_elements_len = container_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var i, ci, le, de, cs, li;


    var navigation_count = 0;

    for (i = 0; i < landmark_elements_len; i++ ) {
      le = landmark_elements[i];
      de = le.dom_element;
      cs = de.computed_style;

      var tag_name = le.dom_element.tag_name;

      if (le.landmark === 'navigation') {
        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          navigation_count++;
          if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
        }
        else {
         rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
        }
      }
    }

    if (page_element) {
      // Test if no navigation landmarks
      if (navigation_count === 0) {

        var list_of_links_count = 0;

        var MINIMUM_LINKS = 4;

        for (i = 0; i < container_elements_len; i++) {
          ci = container_elements[i];
          de = ci.dom_element;
          cs = de.computed_style;

          var li_count       = ci.getListItemCount();
          var one_link_count = ci.getListItemCountOneLink();
          var sublist_count  = ci.getSublistCount();

          if (li_count <= (1 + one_link_count + sublist_count)) {
            if (!ci.parent_landmark && (one_link_count > MINIMUM_LINKS)) {
              list_of_links_count += 1;
              rule_result.addResult(TEST_RESULT.FAIL, ci, 'ELEMENT_FAIL_1', [de.tag_name, one_link_count]);
            }
          }
        }

        // Are there any list of links on the page
        if (list_of_links_count > 0) {
          rule_result.addResult(TEST_RESULT.FAIL, page_element, 'WEBSITE_FAIL_1', []);
        }
      }
      else {
        if (navigation_count === 1) rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_1', []);
        else rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_2', [navigation_count]);
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['header', '[role="banner"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    var les = [];

    var le, de, cs, tag_name;

    for (var i = 0; i < landmark_elements_len; i++ ) {
      le = landmark_elements[i];
      de = le.dom_element;
      cs = de.computed_style;
      tag_name = de.tag_name;

      if (le.landmark === 'banner') {
        if (cs.is_visible_to_at === VISIBILITY.HIDDEN) {
          if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
        }
        else {
          landmark_count++;
          les.push(le);
        }
      }
    }

    if (page_element) {
      // Test if no banner landmarks
      if (landmark_count === 0) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
      }
      else {
        if (landmark_count === 1) {
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_1', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_2', [landmark_count]);
        }
        for (i = 0; i < les.length; i++) {
          le = les[i];
          de = le.dom_element;
          if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
        }
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['header', '[role="banner"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    var les = [];

    var le, de, cs, tag_name;

    for (var i = 0; i < landmark_elements_len; i++ ) {
      le = landmark_elements[i];
      de = le.dom_element;
      cs = de.computed_style;
      tag_name = de.tag_name;

      if (le.landmark === 'banner') {
        if (cs.is_visible_to_at === VISIBILITY.HIDDEN) {
          if (de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
        }
        else {
          if (!de.body_element) {
            landmark_count++;
            les.push(le);
          }
        }
      }
    }

    if (page_element) {
      if (landmark_count > 1) {
        rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', [landmark_count]);
        for (i = 0; i < les.length; i++) {
          le = les[i];
          de = le.dom_element;
          if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', []);
        }
      }
      else {
        if (landmark_count === 1) {
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);

          le = les[0];
          de = le.dom_element;
          if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
        }
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['footer', '[role="contentinfo"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    var les = [];

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var de = le.dom_element;
      var cs = de.computed_style;
      var tag_name = de.tag_name;

      if (le.landmark === 'contentinfo') {
        if (cs.is_visible_to_at === VISIBILITY.HIDDEN) {
          if(de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
        }
        else {
          landmark_count++;
          les.push(le);
        }
      }
    }

    if (page_element) {
      // Test if no contentinfo landmarks
      if (landmark_count === 0) {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
      }
      else {
        if (landmark_count === 1) {
          de = les[0].dom_element;
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_1', []);
          if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, les[0], 'ELEMENT_PASS_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, les[0], 'ELEMENT_PASS_2', []);
        }
        else {
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'WEBSITE_PASS_2', [landmark_count]);
          for (i = 0; i < les.length; i++) {
            le = les[i];
            de = les[i].dom_element;
            if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
            else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
          }
        }
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['footer', '[role="contentinfo"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['tag_name', 'role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    var les = [];

    var LANDMARK_ROLE = 'contentinfo';

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var de = le.dom_element;
      var cs = de.computed_style;
      var tag_name = de.tag_name;

      if (le.landmark === 'contentinfo') {
        if (cs.is_visible_to_at === VISIBILITY.HIDDEN) {
          if(de.has_role) rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.HIDDEN, le, 'ELEMENT_HIDDEN_2', []);
        }
        else {
          if (!de.body_element) {
            landmark_count++;
            les.push(le);
          }
        }
      }
    }

    if (page_element) {
      // Test if no contentinfo landmarks
      if (landmark_count > 1) {
        rule_result.addResult(TEST_RESULT.FAIL, page_element, 'PAGE_FAIL_1', [landmark_count]);
        for (i = 0; i < les.length; i++) {
          le = les[i];
          de = le.dom_element;
          if (de.has_role) rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.FAIL, le, 'ELEMENT_FAIL_2', []);
        }
      }
      else {
        if (landmark_count === 1) {
          rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);

          le = les[0];
          de = le.dom_element;
          if (de.has_role) rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.PASS, le, 'ELEMENT_PASS_2', []);
        }
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['header', '[role="banner"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['header', '[role="banner"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['role', 'tag_name', 'parent_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['nav', '[role="naviation"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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

//        OpenAjax.a11y.logger.debug("Landmarks: " +  landmark.landmark + " -> " + cce.landmark);

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['main', '[role="main"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['footer', '[role="contentinfo"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['header', '[role="banner"]'],
  primary_property    : 'accessible_name',
  resource_properties : ['role', 'tag_name', 'parent_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['[role="search"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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

//    OpenAjax.a11y.logger.debug("  LANDMARK 14 Rule");

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['[role="form"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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

//          OpenAjax.a11y.logger.debug("  Search: " + fail_count);

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['[role="region"]'],
  primary_property    : 'computed_label',
  resource_properties : ['tag_name', 'role', 'computed_label_source', 'aria-label', 'aria-labelledby', 'title'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;
    var fail_count = 0;

    for (var i = 0; i < landmark_elements_len; i++ ) {

      var le = landmark_elements[i];
      var de = le.dom_element;
      var cs = de.computed_style;

      if (le.landmark === 'region') {

//        OpenAjax.a11y.logger.debug("  Region: " + fail_count);

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {

          if ((le.computed_label_source !== OpenAjax.a11y.SOURCE.NONE) &&
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

//       OpenAjax.a11y.logger.debug("TAG NAME: " + de.tag_name);

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
  primary_property    : 'computed_label',
  resource_properties : ['tag_name', 'role', 'computed_label_source', 'aria-label', 'aria-labelledby', 'title'],
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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['main', 'nav', 'header', 'footer', 'section', 'aside', '[role="application"]','[role="banner"]', '[role="complementary"]','[role="contentinfo"]','[role="form"]','[role="main"]','[role="navigation"]','[role="region"]','[role="search"]'],
  primary_property    : 'computed_label',
  resource_properties : ['tag_name', 'role', 'computed_label_source', 'aria-label', 'aria-labelledby', 'title'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['aside', '[role="complementary"]'],
  primary_property    : 'parent_landmark',
  resource_properties : ['role', 'tag_name', 'accessible_name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

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

]);
