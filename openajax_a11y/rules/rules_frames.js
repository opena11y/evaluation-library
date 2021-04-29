//
// OpenAjax Alliance Rules
// Rule group: Styling Rules
//
OpenAjax.a11y.RuleManager.addRulesFromJSON([


  /**
   * @object FRAME_1
   *
   * @desc  Evaluate frame elements for a title attribute
   */

  { rule_id             : 'FRAME_1',
    last_updated        : '2015-07-31',
    rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
    rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
    rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['frame'],
    primary_property    : 'title',
    resource_properties : ['accessible_name'],
    language_dependency : "",
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

      var frame_elements     = dom_cache.frames_cache.frame_elements;
      var frame_elements_len = frame_elements.length;

      // Check to see if valid cache reference
      if (frame_elements && frame_elements_len) {

        for (var i = 0; i < frame_elements_len; i++) {
          var fe = frame_elements[i];
          var de = fe.dom_element;
          var cs = de.computed_style;

          // if no content in frame ignore
          if (fe.src.length === 0) continue;

          if ((cs.is_visible_to_at === VISIBILITY.VISIBLE) &&
              (cs.is_visible_onscreen === VISIBILITY.VISIBLE)){

            if (de.has_title && de.title.length) {
              rule_result.addResult(TEST_RESULT.PASS, fe, 'ELEMENT_PASS_1', [de.title]);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_1', []);
            }

          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'ELEMENT_HIDDEN_1', []);
          }
        } // end loop
      }

    } // end validate function
  },

  /**
   * @object FRAME_2
   *
   * @desc  Evaluate iframe elements for an accessible name
   */

  { rule_id             : 'FRAME_2',
    last_updated        : '2015-07-31',
    rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
    rule_category       : OpenAjax.a11y.RULE_CATEGORIES.STYLES_READABILITY,
    rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
    wcag_primary_id     : '2.4.1',
    wcag_related_ids    : [],
    target_resources    : ['iframe'],
    primary_property    : 'accessible_name',
    resource_properties : ['title', 'aria_label', 'aria_labelledby'],
    language_dependency : "",
    validate            : function (dom_cache, rule_result) {

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

      var iframe_elements     = dom_cache.frames_cache.iframe_elements;
      var iframe_elements_len = iframe_elements.length;

      // Check to see if valid cache reference
      if (iframe_elements && iframe_elements_len) {

        for (var i = 0; i < iframe_elements_len; i++) {
          var fe = iframe_elements[i];
          var de = fe.dom_element;

          // if no content in frame ignore
          if (fe.src.length === 0) continue;

          if ((fe.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) &&
              (fe.dom_element.computed_style.is_visible_onscreen === VISIBILITY.VISIBLE)){

            if (fe.computed_label.length) {
              rule_result.addResult(TEST_RESULT.PASS, fe, 'ELEMENT_PASS_1', [fe.computed_label]);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, fe, 'ELEMENT_FAIL_1', []);
            }

          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'ELEMENT_HIDDEN_1', []);
          }
        } // end loop
      }


    } // end validate function
  }

]);




