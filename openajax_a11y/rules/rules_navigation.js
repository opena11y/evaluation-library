/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object NAVIGATION_1
 *
 * @desc Page has at least two of the following resources: table of contents, site map,
 *       search, navigation links, sand trail
 */

{ rule_id             : 'NAVIGATION_1',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '2.4.5',
  wcag_related_ids    : [],
  target_resources    : ['Website', 'role=\'search\'', 'role=\'navigation\''],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    var navigation_count = 0;
    var search_count     = 0;

    var LANDMARK_ROLE = 'navigation';

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var tag_name = le.dom_element.tag_name;

      if (le.role === 'navigation') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', []);
          navigation_count++;
        }
      }

      if (le.role === 'search') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', []);
          search_count++;
        }
      }

    }

    if (page_element) {
      if ((navigation_count > 0) && (search_count > 0)) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
      else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_2', []);
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
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.2.3',
  wcag_related_ids    : ['3.2.4'],
  target_resources    : ['Website', 'role=\'main\'', 'role=\'navigation\'', 'role=\'banner\'', 'role=\'contentinfo\'','role=\'search\''],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var main_count          = 0;
    var navigation_count    = 0;
    var banner_count        = 0;
    var contentinfo_count   = 0;
    var search_count        = 0;
    var complementary_count = 0;

    var landmark_count    = 0;

    var les = [];

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];

      if (le.role === 'main') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', []);

          if (main_count === 0) les.push('main');

          main_count += 1;
          landmark_count += 1;
        }
      }

      if (le.role === 'navigation') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', []);

          if (navigation_count === 0) les.push('navigation');

          navigation_count += 1;
          landmark_count += 1;
        }
      }

      if (le.role === 'banner') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_3', []);

          if (banner_count === 0) les.push('banner');

          banner_count += 1;
          landmark_count += 1;
        }
      }

      if (le.role === 'contentinfo') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_4', []);

          if (contentinfo_count === 0) les.push('contentinfo');

          contentinfo_count += 1;
          landmark_count += 1;
        }
      }

      if (le.role === 'search') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_5', []);

          if (search_count === 0) les.push('search');

          search_count += 1;
          landmark_count += 1;
        }
      }

      if (le.role === 'complementary') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_6', []);

          if (complementary_count === 0) les.push('complementary');

          complementary_count += 1;
          landmark_count += 1;
        }
      }


    }

    if (page_element) {
      if (landmark_count > 0) {

        var last = les.length - 1;
        var landmark_list = les[0];

        for (i = 1; i < les.length; i++) {
          if (i === last) landmark_list += " and " + les[i];
          else landmark_list += ", " + les[i];
        }
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', [landmark_list]);
      }
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
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.2.3',
  wcag_related_ids    : ['3.2.4'],
  target_resources    : ['Website', 'h2'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var heading_count = 0;

    for (var i = 0; i < heading_elements_len; i++ ) {
      var he = heading_elements[i];

      if ((he.level === 1) &&
         (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE)) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'ELEMENT_MC_1', []);
          heading_count += 1;
      }

      if ((he.level === 2) &&
         (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE)) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'ELEMENT_MC_2', []);
          heading_count += 1;
      }
    }

    if (page_element) {
       if (heading_count) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
       else rule_result.addResult(TEST_RESULT.FAIL, page_element, 'WEBSITE_FAIL_1', []);
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
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.2.4',
  wcag_related_ids    : ['3.2.3'],
  target_resources    : ['Website', 'role=\'search\'', 'role=\'navigation\'', 'role=\'main\'', 'role=\'banner\'', 'role=\'contentinfo\'', 'h2'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];

      if (le.role === 'main') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_1', []);
          landmark_count += 1;
        }
      }

      if (le.role === 'navigation') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_2', []);
          landmark_count += 1;
        }
      }

      if (le.role === 'search') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_3', []);
          landmark_count += 1;
        }
      }

      if (le.role === 'banner') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_4', []);
          landmark_count += 1;
        }
      }

      if (le.role === 'contentinfo') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_5', []);
          landmark_count += 1;
        }
      }

      if (le.role === 'complementary') {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'ELEMENT_MC_6', []);
          landmark_count += 1;
        }
      }

    }

    if (page_element  && landmark_count) {
      rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
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
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.SITE_NAVIGATION,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP2,
  wcag_primary_id     : '3.2.4',
  wcag_related_ids    : ['3.2.3'],
  target_resources    : ['Website', 'h2'],
  primary_property    : 'role',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var heading_count = 0;

    for (var i = 0; i < heading_elements_len; i++ ) {
      var he = heading_elements[i];

      if ((he.level === 1) &&
         (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE)) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'ELEMENT_MC_1', []);
          heading_count += 1;
      }

      if ((he.level === 2) &&
         (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE)) {
          rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'ELEMENT_MC_2', []);
          heading_count += 1;
      }
    }

    if (page_element) {
       if (heading_count) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'WEBSITE_MC_1', []);
       else rule_result.addResult(TEST_RESULT.FAIL, page_element, 'WEBSITE_FAIL_1', []);
    }

  } // end validation function
}

]);




