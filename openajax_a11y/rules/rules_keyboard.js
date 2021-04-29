/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesFromJSON([

/**
 * @object KEYBOARD_1
 *
 * @desc Widget elements on non-interactive elements or that override the default role of an interactive element
 *       need keyboard event handlers on the widget element or a parent element of the widget
 */

{ rule_id             : 'KEYBOARD_1',
  last_updated        : '2017-02-08',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP3,
  wcag_primary_id     : '2.1.1',
  wcag_related_ids    : ['4.1.2'],
  target_resources    : ['widgets'],
  primary_property    : 'role',
  resource_properties : ['tab_index', 'is_owned', 'has_key_down', 'has_key_press', 'has_key_up', 'ancestor_has_key_down', 'ancestor_has_key_press', 'ancestor_has_key_up'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function checkForKeyboardOnRequiredChildren(widget) {

      function checkChildren(children) {

        if (!children || !children.length) return false;

        var children_len = children.length;

        for (var i = 0; (i < children_len); i++) {

          var we = children[i];
          var de = we.dom_element;

          kbd_events = getEventsOnElementOrAncestors(de);

          if (kbd_events.length) return kbd_events;

//           OpenAjax.a11y.logger.debug("[checkForKeyboardOnRequiredChildren] " + widget + ": " + we + " ("+ flag + ")");


          if (de.role_info && de.role_info.reqChildren && de.role_info.reqChildren.length) {
            kbd_events = checkChildren(we.child_cache_elements);
            if (kbd_events.length) return kbd_events;
          }
        }
        return "";
      }

      return checkChildren(widget.child_cache_elements);
    }

    function getEventsOnElement(de) {

      var kbd_events = "";

      if (de.events.has_key_down)  kbd_events = "keydown ";
      if (de.events.has_key_press) kbd_events += "keypress ";
      if (de.events.has_key_up)    kbd_events += "keyup ";

      return kbd_events.trim();
    }

    function getEventsOnElementAncestors(de) {

      var kbd_events = "";

      if (de.events.ancestor_has_key_down)  kbd_events = "keydown ";
      if (de.events.ancestor_has_key_press) kbd_events += "keypress ";
      if (de.events.ancestor_has_key_up)    kbd_events += "keyup ";

      return kbd_events.trim();
    }

    function getEventsOnElementOrAncestors(de) {

      var kbd_events = "";

      if (de.events.has_key_down  || de.events.ancestor_has_key_down)  kbd_events = "keydown ";
      if (de.events.has_key_press || de.events.ancestor_has_key_press) kbd_events += "keypress ";
      if (de.events.has_key_up    || de.events.ancestor_has_key_up)    kbd_events += "keyup ";

      return kbd_events.trim();
    }

    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

    var widget_elements     = dom_cache.controls_cache.widget_elements;
    var widget_elements_len = widget_elements.length;

    if (widget_elements && widget_elements) {

      for (var i = 0; i < widget_elements_len; i++) {
        var we = widget_elements[i];
        var de = we.dom_element;
        var style = de.computed_style;

        var kbd_events = "";

//         OpenAjax.a11y.logger.debug("  KEYBOARD RULE 1: " + de.role + " ("+ we.toString() + ")");

        if (de.role_info.roleType === 'widget') {

          if (style.is_visible_to_at === VISIBILITY.VISIBLE) {

            kbd_events = getEventsOnElement(de);

            if (kbd_events.length) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_1', [kbd_events, de.role]);
            }
            else {

              kbd_events = getEventsOnElementAncestors(de);

              if (kbd_events.length) {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_2', [kbd_events, de.role]);
              }
              else {
                if (we.parent_widget && we.parent_widget.dom_element) {
                  kbd_events = getEventsOnElementOrAncestors(we.parent_widget.dom_element);
                  if (kbd_events.length) {
                    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_3', [kbd_events, we.parent_widget.dom_element.toString(), de.role]);
                    continue;
                  }
                }

                kbd_events = checkForKeyboardOnRequiredChildren(we);

                if (kbd_events.length) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_4', [kbd_events, de.role]);
                else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'ELEMENT_MC_5', [de.role]);

              }
            }
          }
          else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'ELEMENT_HIDDEN_1', [we.toString()]);
          }
        }
      } // end loop
    }
  } // end validation function

},
/**
 * @object KEYBOARD_2
 *
 * @desc All operations available through the keyboard
 */

{ rule_id             : 'KEYBOARD_2',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.1.1',
  wcag_related_ids    : ['2.1.2', '2.4.3',  '2.4.7', '3.2.1'],
  target_resources    : ['Page', 'applet', 'object', 'widgets'],
  primary_property    : 'tab_index',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

     var page_element = dom_cache.keyboard_focus_cache.page_element;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var interactive_elements      = dom_cache.controls_cache.interactive_elements;
     var interactive_elements_len  = interactive_elements.length;

     var interactive_count = 0;

     for (var i = 0; i < interactive_elements_len; i++) {

//       OpenAjax.a11y.logger.debug(" Interactive element: " + interactive_elements[i] + " (" + i + ")");

       var ie =interactive_elements[i];
       var de = ie.dom_element;
       var cs = de.computed_style;
       var tab_index = parseInt(de.tab_index,10);

       if ((cs.is_visible_to_at    === VISIBILITY.VISIBLE) ||
           (cs.is_visible_onscreen === VISIBILITY.VISIBLE)) {

         if (de.hasEvents() || de.has_tabindex || ie.is_embedded_app) {
           interactive_count++;
           if (de.hasEvents()) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [de.tag_name]);
           else if (de.has_tabindex) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tab_index, de.tag_name]);
           else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_3', [de.tag_name]);
         }
         else {
           rule_result.addResult(TEST_RESULT.PASS, ie, 'ELEMENT_PASS_1', [de.tag_name]);
         }
       }
       else {
         rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name]);
       }
     }  // endfor

//     OpenAjax.a11y.logger.debug(" Interactive count: " + interactive_count + " (" + interactive_elements_len + ")");

     if (interactive_count > 1) {
       if (interactive_count === 1) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_1', []);
       }
       else {
         if (interactive_count >1) {
           rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'PAGE_MC_2', [interactive_count]);
         }
         else {
           if (interactive_elements_len > 0) {
             if (interactive_elements_len === 1) {
               rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_1', []);
             }
             else {
               rule_result.addResult(TEST_RESULT.PASS, page_element, 'PAGE_PASS_2', [interactive_elements_len]);
             }
           }
         }
       }
     }

   } // end validation function
},

/**
 * @object KEYBOARD_3
 *
 * @desc No keyboard trap
 */

{ rule_id             : 'KEYBOARD_3',
  last_updated        : '2014-11-28',
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.KEYBOARD_SUPPORT,
  rule_group          : OpenAjax.a11y.RULE_GROUP.GROUP1,
  wcag_primary_id     : '2.1.2',
  wcag_related_ids    : ['2.1.1', '2.4.3',  '2.4.7', '3.2.1'],
  target_resources    : ['object', 'applet'],
  primary_property    : 'tab_index',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

//     OpenAjax.a11y.logger.debug(" Page Element: " + page_element + "  " + page_element.dom_element);

     var media_elements      = dom_cache.media_cache.media_elements;
     var media_elements_len  = media_elements.length;


     for (var i = 0; i < media_elements_len; i++) {

       var me = media_elements[i];

       var de = me.dom_element;
       if (!de) de =me;

       var cs = de.computed_style;

       if ((cs.is_visible_to_at    === VISIBILITY.VISIBLE) ||
           (cs.is_visible_onscreen === VISIBILITY.VISIBLE)) {
         rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'ELEMENT_MC_1', [me.tag_name]);
       }
       else {
         rule_result.addResult(TEST_RESULT.HIDDEN, me, 'ELEMENT_HIDDEN_1', [me.tag_name]);
       }
     }  // endfor

   } // end validation function
}


]);




