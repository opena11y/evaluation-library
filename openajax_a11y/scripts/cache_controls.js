/*
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
/*                       ControlInfo                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor ControlInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ControlInfo object for preserving the current control information
 *        when traversing the DOM for form control information
 *
 * @param {ControlInfo} control_info - Current ControlInfo object
 *
 * @property {ControlElement}   control_element  - Parent ControlElement (if any)
 * @property {FieldsetElement}  fieldset_element - Parent FieldsetElement (if any)
 * @property {GroupingElement}  grouping_element - Parent GroupingElement (if any)
 * @property {SelectElement}    select_element   - Parent SelectElement (if any)
 * @property {LabelElement}     label_element    - Parent LabelElement (if any)
 * @property {FormElement}      form_element     - Parent FormElement (if any)
 */

OpenAjax.a11y.cache.ControlInfo = function (control_info) {

 if (control_info) {
  this.control_element  = control_info.control_element;
  this.fieldset_element = control_info.fieldset_element;
  this.grouping_element = control_info.grouping_element;
  this.select_element   = control_info.select_element;
  this.label_element    = control_info.label_element;
  this.form_element     = control_info.form_element;
  this.parent_widget    = control_info.parent_widget;
 }
 else {
  this.control_element  = null;
  this.fieldset_element = null;
  this.grouping_element = null;
  this.select_element   = null;
  this.label_element    = null;
  this.form_element     = null;
  this.parent_widget    = null;
 }
};

/* ---------------------------------------------------------------- */
/*                       ControlsCache                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor ControlsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc ControlsCache is the constructor for lists of control cache element objects and
 *       the root of a tree representation of the control cache element relationships
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the controls in the document
 *
 * @property {Array}    control_elements      - List of all the InputElement, TextareaElement, ButtonElement, SelectElement,
 * @property {Number}   control_length        - Length of the control_elements array and used in calculating cache IDs
 *
 * @property {Array}    widget_elements      - List of all the widget elements
 * @property {Number}   widget_length        - Length of the widget list array and used in calculating cache IDs
 *
 * @property {Array}    interactive_elements  - List of all interactive elements
 *
 * @property {Array}    elements_with_role            - List of all the widget elements
 * @property {Number}   elements_with_aria_attributes - Length of the widget list array and used in calculating cache IDs
 *
 * @property {Number}   elements_with_events  - List of DOM elements with event handlers
 *
 * @property {Array}    label_elements        - List of all the LabelElement objects in the cache
 * @property {Number}   label_length          - Length of the label_elements array and used in calculating cache IDs
 *
 * @property {Array}    grouping_elements     - List of all the FieldsetElement objects in the cache
 * @property {Number}   grouping_length       - Length of the Fireldset_elements array and used in calculating cache IDs
 *
 * @property {Array}    form_elements         - List of all the FormElement objects in the cache
 * @property {Number}   form_length           - Length of the form_elements array and used in calculating cache IDs
 *
 * @property {String}   sort_property         - The property the list of control element object is currenlty sorted by
 * @property {Boolean}  ascending             - true if the list is ascending order or false if descending
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this
 */

OpenAjax.a11y.cache.ControlsCache = function (dom_cache) {

  this.dom_cache     = dom_cache;
  this.up_to_date    = false;

  this.child_cache_elements  = [];

  this.interactive_elements = [];

  this.control_elements = [];
  this.control_length  = 0;

  this.widget_elements = [];
  this.widget_length  = 0;

  this.elements_with_role = [];
  this.elements_with_aria_attributes = [];

  this.elements_with_events = [];

  this.label_elements  = [];
  this.label_length   = 0;

  this.grouping_elements = [];
  this.grouping_length = 0;

  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a cache control element to the root tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (control_element) {

  if (control_element) {
    this.child_cache_elements.push(control_element);
  }

};

/**
 * @method addControlElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a cache control element to the list of controls array and generates a cache_id for each control
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 *
 * @return  {Number} Returns the number of control objects in the control_elements array
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addControlElement = function (control_element) {

  OpenAjax.a11y.logger.debug("  Adding control element: " + control_element.dom_element.tag_name + " ("+ control_element.is_widget + ")");

  // item must exist and have the position property
  if (control_element) {
    this.control_length += 1;
    control_element.document_order = this.control_length;
    control_element.cache_id = "control_" + this.control_length;
    this.control_elements.push( control_element );
    return true;
  }

  return this.control_length;

};

/**
 * @method addLabelElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add LabelElement object to list of label elements and generates a cache id for the object
 *
 * @param  {LabelElement} label_element  - LabelElement object to add
 *
 * @return  Nothing
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabelElement = function (label_element) {

  if (label_element) {
    this.label_length += 1;
    label_element.document_order = this.label_length;
    label_element.cache_id = "label_" + this.label_length;
    this.label_elements.push( label_element );
  }

};

/**
 * @method addFormElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add a FormElement object to the list of form elements and generates a cache id for the object
 *
 * @param  {FormElement} form_element  - FormElement to add
 *
 * @return {Number} Returns number of FormElement objects in the list of form elements
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addFormElement = function (form_element) {

  // item must exist and have the position property
  if (form_element) {
    this.form_length = this.form_length + 1;
    form_element.document_order = this.form_length;
    form_element.cache_id = "form_" + this.form_length;
    this.form_elements.push( form_element );
  }

  return this.form_length;

};

/**
 * @method addGroupingElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a GroupingElement to the list of grouping elements and generates a cache id for the object
 *
 * @param  {GroupingElement}  grouping_element  - GroupingElement to add
 *
 * @return {Number} Returns the number of GroupingElement objects in the list of grouping elements
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addGroupingElement = function (grouping_element) {

  if (grouping_element) {
    this.grouping_length = this.grouping_length + 1;
    grouping_element.document_order = this.grouping_length;
    grouping_element.cache_id = "grouping_" + this.grouping_length;
    this.grouping_elements.push(grouping_element);
  }

  return this.grouping_length;

};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Resests the ControlsCache object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.ControlsCache.prototype.emptyCache = function () {

  this.up_to_date    = false;

  this.child_cache_elements  = [];

  this.control_elements = [];
  this.control_length  = 0;

  this.label_elements  = [];
  this.label_length   = 0;

  this.grouping_elements = [];
  this.grouping_length = 0;

  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Updates the ControlsCache object by checking to see if a DOMElement
 *          should be added to the control cache objects
 *
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo}  control_info  - Information about the current control relationships in the DOM
 *
 * @return {ControlInfo}  Returns updated control info object
 */

OpenAjax.a11y.cache.ControlsCache.prototype.updateCacheItems = function (dom_element, control_info) {

  var be;
  var fe;
  var ie;
  var le;
  var me;
  var oe;
  var pe;
  var se;
  var te;
  var we;

//  if (dom_element.tag_name === 'h2')       OpenAjax.a11y.logger.debug("DOM Element (ctl): " + dom_element);
//  if (dom_element.tag_name === 'textarea') OpenAjax.a11y.logger.debug("DOM Element (ctl): " + dom_element);
//  if (dom_element.tag_name === 'button')   OpenAjax.a11y.logger.debug("DOM Element (ctl): " + dom_element);

  var interactive_element_added = false;

  var ci = new OpenAjax.a11y.cache.ControlInfo(control_info);

  var normalizeSpace = OpenAjax.a11y.util.normalizeSpace;

  // check for widget

  if (dom_element.hasEvents()) {
    this.elements_with_events.push(dom_element);

    if (!interactive_element_added) {
      ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, true);

      this.dom_cache.getNameForLink(ie);

      this.interactive_elements.push(ie);
      interactive_element_added = true;
    }

  }

  if (dom_element.has_role) this.elements_with_role.push(dom_element);

  if (dom_element.has_aria_attributes) {

    // OpenAjax.a11y.logger.debug(dom_element + " has aria attributes");
    this.elements_with_aria_attributes.push(dom_element);
  }


  if (dom_element.is_widget) {

    we = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
    this.addLabel(we, "", OpenAjax.a11y.SOURCE.NONE);

    this.addControlElement(we);
    this.widget_elements.push(we);

    if (control_info.control_element) {
      control_info.control_element.addChildControl(we);
    }
    else {
      this.addChildControl(we);
    }

    ci.control_element = we;

    if (!we.has_aria_owns) ci.parent_widget = we;

  }
  else {


    switch (dom_element.tag_name) {

    case 'form':
      fe = new OpenAjax.a11y.cache.FormElement(dom_element, control_info);

      this.addFormElement(fe);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(fe);
      }
      else {
        this.addChildControl(fe);
      }

      ci.control_element = fe;
      ci.form_element = fe;

      break;

    case 'fieldset':
      fe = new OpenAjax.a11y.cache.FieldsetElement(dom_element, control_info);

      this.addGroupingElement(fe);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(fe);
      }
      else {
        this.addChildControl(fe);
      }

      ci.control_element = fe;
      ci.fieldset_element = fe;
      ci.grouping_element = fe;
      break;

    case 'legend':
      le = new OpenAjax.a11y.cache.LegendElement(dom_element, control_info);
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_for_comparison = normalizeSpace(le.computed_label.toLowerCase());
      le.computed_label_length = le.computed_label_for_comparison.length;

      this.addLabelElement(le);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(le);
      }
      else {
        this.addChildControl(le);
      }

      if (control_info.fieldset_element) {
        control_info.fieldset_element.legend_element = le;
      }

      ci.control_element = le;
      break;

    case 'label':
      le = new OpenAjax.a11y.cache.LabelElement(dom_element, control_info);
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_for_comparison = normalizeSpace(le.computed_label.toLowerCase());
      le.computed_label_length = le.computed_label_for_comparison.length;

      this.addLabelElement(le);

      if (control_info.control_element) {
//        OpenAjax.a11y.logger.debug("[Controls Cache]  Adding child control: " + control_info.control_element);
        control_info.control_element.addChildControl(le);
      }
      else {
        this.addChildControl(le);
      }

      ci.control_element = le;
      ci.label_element  = le;
      break;

    case 'input':
      ie = new OpenAjax.a11y.cache.InputElement(dom_element, control_info);
      this.addLabel(ie, "", OpenAjax.a11y.SOURCE.NONE);

      if (ie.dom_element.node.type.toLowerCase() != "hidden") {

        this.addControlElement(ie);

        if (control_info.control_element) {
          control_info.control_element.addChildControl(ie);
        }
        else {
          this.addChildControl(ie);
        }

        if (control_info.form_element) {
          control_info.form_element.number_of_controls += 1;
        }

        if (control_info.grouping_element) {
          control_info.grouping_element.number_of_controls += 1;
        }
      }


      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }

      break;

    case 'button':
      be = new OpenAjax.a11y.cache.ButtonElement(dom_element, control_info);

      this.addLabel(be, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(be);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(be);
      }
      else {
        this.addChildControl(be);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }

      ci.control_element = be;

      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }


      break;

    case 'meter':
      me = new OpenAjax.a11y.cache.MeterElement(dom_element, control_info);
      this.addLabel(me, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(me);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(me);
      }
      else {
        this.addChildControl(me);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }

      break;


    case 'progress':
      pe = new OpenAjax.a11y.cache.ProgressElement(dom_element, control_info);
      this.addLabel(pe, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(pe);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(pe);
      }
      else {
        this.addChildControl(pe);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }


      break;

    case 'output':
      oe = new OpenAjax.a11y.cache.OutputElement(dom_element, control_info);
      this.addLabel(oe, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(oe);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(oe);
      }
      else {
        this.addChildControl(oe);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }

      break;


    case 'textarea':
      te = new OpenAjax.a11y.cache.TextareaElement(dom_element, control_info);
      this.addLabel(te, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(te);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(te);
      }
      else {
        this.addChildControl(te);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }

      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }

      break;

    case 'select':
      se = new OpenAjax.a11y.cache.SelectElement(dom_element, control_info);
      this.addLabel(se, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(se);

      if (control_info.control_element) {
        control_info.control_element.addChildControl(se);
      }
      else {
        this.addChildControl(se);
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;
      }

      if (control_info.grouping_element) {
        control_info.grouping_element.number_of_controls += 1;
      }

      ci.select_element = se;
      ci.control_element = se;

      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }

      break;

    case 'optgroup':
      oe = new OpenAjax.a11y.cache.OptgroupElement(dom_element, control_info);

      if (dom_element.node.label && dom_element.node.label.length) {
        oe.label = dom_element.node.label;
        oe.label_length = oe.label.length;
      }

      if (control_info.control_element) {
       control_info.control_element.addChildControl(oe);
      }
      else {
        this.addChildControl(oe);
      }

      ci.control_element = oe;
      break;

    case 'option':
      oe = new OpenAjax.a11y.cache.OptionElement(dom_element, control_info);

      oe.computed_label = this.getElementTextContent(oe, false);
      oe.computed_label_for_comparison = normalizeSpace(oe.computed_label.toLowerCase());
      oe.computed_label_length = oe.computed_label_for_comparison.length;


      if (control_info.control_element) {
        control_info.control_element.addChildControl(oe);
      }
      else {
        this.addChildControl(oe);
      }

      if (control_info.select_element) {
        control_info.select_element.addOption(oe);
      }

      break;

    case 'a':
    case 'object':
    case 'embed':
    case 'applet':
    case 'video':
    case 'audio':

      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, false, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }

      break;

    default:

      // check to see if it is a grouping label
      if(dom_element.is_group) {
        ge = new OpenAjax.a11y.cache.GroupingElement(dom_element, control_info);

        this.addGroupingElement(ge);
        this.addControlElement(ge);

        if (control_info.control_element) {
          control_info.control_element.addChildControl(ge);
        }
        else {
          this.addChildControl(ge);
        }

        ci.control_element = ge;
        ci.grouping_element = ge;

      }

      break;

    } // end switch

    if (dom_element.has_tabindex && (parseInt(dom_element.tab_index,10) > 0)) {
      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, true, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }
    }

    if (dom_element.has_tabindex &&
        (parseInt(dom_element.tab_index,10) < 0) &&
        ((tag_name === 'a') ||
         (tag_name === 'button') ||
         (tag_name === 'input') ||
         (tag_name === 'textarea') ||
         (tag_name === 'select') ||
         (tag_name === 'option') ||
         (tag_name === 'progress') ||
         (tag_name === 'meter'))) {
      if (!interactive_element_added) {
        ie = new OpenAjax.a11y.cache.InteractiveElement(dom_element, true, false);

        this.dom_cache.getNameForLink(ie);

        this.interactive_elements.push(ie);
        interactive_element_added = true;
      }
    }


    // if we are in a widget there a few HTML elements with implied roles

    if (control_info.parent_widget) {

      var implied_role = null;
      var role = control_info.parent_widget.dom_element.role;
      var tag_name = dom_element.tag_name;

      if (tag_name === 'tr' && (" grid rowgroup treegrid".indexOf(role) > 0)) {
        implied_role = 'row';
      }

      if ((tag_name === 'td' || tag_name === 'th') && (" grid rowgroup treegrid".indexOf(role) > 0)) {

        var scope = dom_element.node.getAttribute('scope');

        if (typeof scope === 'string') {
          scope = scope.toLowerCase();
          if (scope === 'col') implied_role = 'columnheader';
          else if (scope === 'row') implied_role = 'rowheader';
        }
      }

      if ((tag_name === 'thead' || tag_name === 'tfoot' || tag_name === 'tbody') && role === 'grid') {
        implied_role = 'rowgroup';
      }

      if (implied_role && (implied_role.length > 0)) {

//        OpenAjax.a11y.logger.debug("  Adding implied role: " + implied_role);

        dom_element.setImpliedRole(implied_role);

        we = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
        this.addLabel(we, "", OpenAjax.a11y.SOURCE.NONE);

        this.addControlElement(we);
        this.widget_elements.push(we);

        if (control_info.control_element) {
          control_info.control_element.addChildControl(we);
        }
        else {
          this.addChildControl(we);
        }

        ci.control_element = we;
        if (!we.has_aria_owns) ci.parent_widget = we;

      }

    }

  }

  return ci;
};

/**
 * @method traverseDOMElementsForControlElements
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses DOMElement objects in the tree to update the controls cache
 *
 * @param  {DOMElement}  dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo} control_info  - Current control information object that contains information
 */

OpenAjax.a11y.cache.ControlsCache.prototype.traverseDOMElementsForControlElements = function (dom_element, control_info) {

  var i;
  var ci;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    ci = this.updateCacheItems(dom_element, control_info);

    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForFormElements(dom_element.child_dom_elements[i], ci);
    } // end loop

  }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the DOMElements to update the controls cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the controls cache are disabled, this cache would
 *       not be updated
 */

OpenAjax.a11y.cache.ControlsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;

 var control_info = new OpenAjax.a11y.cache.ControlInfo(null);

 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForControlElements(children[i], control_info);
 }

 this.calculateControlLabels();
 this.applyAriaOwns();

 this.up_to_date = true;
};

/**
 * @method getRuleResults
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Returns an array of rule results for the cache items in the controls cache
 *
 * @param  {Number}  filter  - Filter for returning rules with particular type(s) of
 *
 * @return {Array} Returns array of rule results, can be empty
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getRuleResults = function (filter) {

  function traverseCacheItems(cache_item) {

    var flag = false;
    var de = cache_item.dom_element;

    if ((local_filter & RESULT_FILTER.PASS)                  && de.rules_passed.length)        flag = true;
    if (!flag && (local_filter & RESULT_FILTER.VIOLATION)    && de.rules_violations.length)    flag = true;
    if (!flag && (local_filter & RESULT_FILTER.WARNING)      && de.rules_warnings.length)      flag = true;
    if (!flag && (local_filter & RESULT_FILTER.WEBSITE_MANUAL_CHECK) && de.rules_manual_checks.length) flag = true;
    if (!flag && (local_filter & RESULT_FILTER.PAGE_MANUAL_CHECK)    && de.rules_manual_checks.length) flag = true;
    if (!flag && (local_filter & RESULT_FILTER.ELEMENT_MANUAL_CHECK) && de.rules_manual_checks.length) flag = true;
    if (!flag && (local_filter & RESULT_FILTER.NA)       && de.rules_hidden.length)        flag = true;

    if (flag) cache_items.push(cache_item);

    if (cache_item.child_cache_elements) {
      var child_cache_elements     = cache_item.child_cache_elements;
      var child_cache_elements_len = child_cache_elements.length;

      for (var i = 0; i < child_cache_elements_len; i++) {
        var ci = child_cache_elements[i];

        traverseCacheItems(ci);
      }
    }
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var local_filter;

  if (!filter)
    local_filter = RESULT_FILTER.ALL;
  else
    local_filter = filter;

  var rule_results = [];

  var child_cache_elements     = this.child_cache_elements;
  var child_cache_elements_len = child_cache_elements.length;

  for (var i = 0; i < child_cache_elements_len; i++) {
    var ci = child_cache_elements[i];

    traverseCacheItems(ci);

  }

  return cache_items;

};



/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {Object} Returns cache control element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getItemByCacheId = function (cache_id) {

  var item = null;

  item = this.getControlElementByCacheId(cache_id);
  if (item) return item;

  item = this.getLabelElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFormElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFieldsetElementByCacheId(cache_id);

  return item;

};

/**
 * @method getControlElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {Object} Returns cache control element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementByCacheId = function (cache_id) {

  for (var i = 0; i<this.control_elements.length; i++) {
    if (this.control_elements[i].cache_id == cache_id) return this.control_elements[i];
  }

  return null;
};

/**
 * @method getControlElementById
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching id
 *
 * @param  {String }  id  - id of control cache element object
 *
 * @return {Object} Returns cache control element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementById = function (id) {

  for (var i = 0; i < this.control_elements.length; i++) {
    if (this.control_elements[i].dom_element.id == id) {
      return this.control_elements[i];
    }
  }

  return null;
};

/**
 * @method getLabelElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the LabelElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of LabelElement object
 *
 * @return {LabelElement}  Returns label element with the cache id if found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getLabelElementByCacheId = function (cache_id) {

  for (var i = 0; i < this.label_elements.length; i++) {
    if (this.label_elements[i].cache_id == cache_id) return this.label_elements[i];
  }

  return null;
};

/**
 * @method getFormElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FormElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FormElement object
 *
 * @return {FormElement}  Returns form element with the cache id if found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getFormElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.form_elements.length; i++) {
  if (this.form_elements[i].cache_id == cache_id) {
   return this.form_elements[i];
  }
 }

 return null;
};

/**
 * @method getFieldsetElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FieldsetElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FieldsetElement object
 *
 * @return {FieldsetElement}  Returns fieldset element with the cache id if found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getFieldsetElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.grouping_elements.length; i++) {
  if (this.grouping_elements[i].cache_id == cache_id) {
   return this.grouping_elements[i];
  }
 }

 return null;
};

/**
 * @method getElementTextContent
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the cache to get the text content associated with the label, this will include the
 *       values of form controls in the label references
 *
 * @param  {LabelElement}  label_element           - LabelElement object to calculate the text content
 * @param  {Boolean}       include_control_values  - True if the values of form controls should be included in
 *                                                   accessible name calculation
 *
 * @return {String}  Returns the text content of a LabelElement
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getElementTextContent = function (label_element, include_control_values) {

 var strings = [];

 function getText(dom_element) {
  var i;

  // If text node get the text and return
  if( dom_element.type == Node.TEXT_NODE ) {
   var text = dom_element.text;
   strings.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == Node.ELEMENT_NODE ) {

     switch (dom_element.tag_name) {

     case 'img':
     case 'area':
       if (( typeof dom_element.alt === 'string') &&
           dom_element.alt.length) strings.push(dom_element.alt);
       break;

     case 'input':
     case 'output':
       if (include_control_values && dom_element.node.type == 'text') strings.push(dom_element.node.value);
       break;

     case 'select':
     // *** need to add some code here to get
       return;
       break;

     case 'textarea':
     // *** need to add some code here to get
       return;
       break;

     default:
       break;

    } // end switch

    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
     getText( dom_element.child_dom_elements[i]);
    }

   }
  }
 } // end function getText

 getText(label_element.dom_element);

 return OpenAjax.a11y.util.normalizeSpace(strings.join(""));

};

/**
 * @method calculateLabelsUsingARIA
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the array for control cache elements and calculates the accessible name for
 *         any control elements if there is ARIA markup
 */

OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsUsingARIA = function () {

  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;

  // first check if an label by reference

  for (var i = 0; i < control_elements_len; i++) {

    var ce = control_elements[i];
    var de = ce.dom_element;

    if ( (de.aria_labelledby && de.aria_labelledby.length) ||
         (de.aria_label && de.aria_label.length) ||
         (de.role_info)) {

      this.dom_cache.getNameFromARIALabel(ce);

      // If title attribute is the result clear label for use of other labeling techniques
      if (ce.computed_label_source == OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE && !ce.role_info) {
        ce.computed_label = "";
        ce.computed_label_for_comparison = "";
        ce.computed_label_length = 0;
        this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);
//        OpenAjax.a11y.logger.debug("   LABEL 3: " + ce.computed_label);
      }
    }
  }
};


/**
 * @method getGroupingLabel
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Returns legend content for computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control  -  Control Object
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getGroupingLabel = function (control) {

   var grouping_element = control.grouping_element;
   var label = "";

   // Add fieldset/legend information if defined
   while (grouping_element) {

     if (grouping_element.computed_label) {
       label +=  " " + grouping_element.computed_label;
     }
     else {
       if (grouping_element &&
           grouping_element.legend_element&&
           grouping_element.legend_element.computed_label) {
         label +=  " " + grouping_element.legend_element.computed_label;
       }
     }
     grouping_element = grouping_element.grouping_element;
   }

   return label;

};

/**
 * @method addLabel
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds legend content to computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control -  Control Object
 * @param {String}  label   -  label text
 * @param {Number}  source  -  label source
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabel = function (control, label, source) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  if (source === SOURCE.NONE) {
    control.computed_label  = "";
    if (control.dom_element.role_info) control.accessible_name = "";
  } else {
    if (!control.labels) control.labels = [];
    control.labels.push(label);

    control.computed_label = "";

    for (var i = 0; i < control.labels.length; i++) {
      control.computed_label += control.labels[i];
    }

    if ((source != SOURCE.ARIA_LABELLEDBY) &&
        (source != SOURCE.ARIA_LABEL)) {
      control.computed_label += this.getGroupingLabel(control);
    }
  }

  control.computed_label_source         = source;
  control.computed_label_for_comparison = OpenAjax.a11y.util.normalizeSpace(control.computed_label.toLowerCase());
  control.computed_label_length         = control.computed_label_for_comparison.length;

};


/**
 * @method calculateLabelsByReference
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are referenced by label elements with for attribute
 */

OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByReference = function () {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;

  // first check if an label by reference

  for (var i = 0; i < label_elements_len; i++) {

    var le = label_elements[i];

//    OpenAjax.a11y.logger.debug("LABEL: " + le + " (" + le.for_id + ")");

    var id;
    if (le.for_id) {
      id = le.for_id;
    }
    else {
      id = null;
    }

    if (id && id.length && !le.hidden_label) {

      var ce = this.getControlElementById(id);

      if (ce) {

        // check to see if label defined (i.e. an ARIA technique)
        le.unused_label = false;

        if ((ce.computed_label_source !== SOURCE.ARIA_LABELLEDBY) &&
            (ce.computed_label_source !== SOURCE.ARIA_LABEL)) {
          this.addLabel(ce, le.computed_label, OpenAjax.a11y.SOURCE.LABEL_REFERENCE);
          le.control_element = ce;
        }
        else {
          le.duplicate_label = true;
        }
      }
      else {
        le.unused_label = true;
      }

    }
  }
};

/**
 * @method calculateLabelsByEncapsulation
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are encapsulated by a label element
 */

OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByEncapsulation = function () {

  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;

  for (var i = 0; i < control_elements_len; i++) {

    var ce = control_elements[i];

    switch (ce.control_type) {

    case OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT:
      if (ce.computed_label_for_comparison.length === 0) {
        this.addLabel(ce, this.getElementTextContent(ce, false), OpenAjax.a11y.SOURCE.TEXT_CONTENT);
      }
      break;

    default:

      // first check if an label exists

      if (ce.computed_label_for_comparison.length === 0 && ce.label_element) {
        this.addLabel(ce, ce.label_element.computed_label, OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION);
        ce.label_element.unused_label = false;
        ce.label_element.control_element = ce;
      }
      break;
    } // end switch
  } // end loop
};

/**
 * @method calculateLabelsByOther
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of control elements and calculates the
 *       accessible label for any control elements that do NOT have
 *       a computed label, but has a VALUE, ALT or TITLE attribute value
 */

OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByOther = function () {

  var CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE;

  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;

  // first check if an label exits

  for (var i = 0; i < control_elements_len; i++) {

    var ce = control_elements[i];

    if (ce.computed_label_for_comparison.length === 0) {
      var de = ce.dom_element;

      switch (ce.control_type) {

      case CONTROL_TYPE.BUTTON_INPUT:

        if ((ce.computed_label_for_comparison.length === 0) && ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);
        }
        else {
          this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);
        }
        break;

      case CONTROL_TYPE.IMAGE:

        if (de.alt) {
          this.addLabel(ce, de.alt, OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE);
        }
        else {
          if (de.title && de.title.length) {
            this.addLabel(ce, de.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);
          }
          else {
            this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);
          }
        }
        break;

      case CONTROL_TYPE.SUBMIT:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);
        }
        else {
          this.addLabel(ce, "SUBMIT", OpenAjax.a11y.SOURCE.BUTTON_TYPE);
        }
        break;

      case CONTROL_TYPE.RESET:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);
        }
        else {
          this.addLabel(ce, "RESET", OpenAjax.a11y.SOURCE.BUTTON_TYPE);
        }
        break;

      default:

        if (de.title &&
            de.title.length) {
          // first check if an label exists

          this.addLabel(ce, ce.dom_element.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);
        }

        break;
      } // end switch
    }
  }
};

/**
 * @method calculateControlLabels
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Calculates labels for all form controls, based on the order of label
 *       calculation techniques used by browsers to generate accessible names
 *       for accessibility APIs used by assistive technologies
 */

OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {

  // These functions are called in the order of overrides
  // Once a control has a label it is ignored by subsequent function calls
  this.calculateLabelsUsingARIA();
  this.calculateLabelsByReference();
  this.calculateLabelsByEncapsulation();
  this.calculateLabelsByOther();
};

/**
 * @method applyAriaOwns
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Applies parent/child widget relationships based on the aria-owns property
 *       if aria-owns property is defined for any widgets
 */

OpenAjax.a11y.cache.ControlsCache.prototype.applyAriaOwns = function () {

  var widgets = this.widget_elements;
  var widgets_len = widgets.length;

  for (var i = 0; i < widgets_len; i++) {

    var widget = widgets[i];

    if (widget.has_aria_owns) {

//      OpenAjax.a11y.logger.debug("  Owned: " + widget.cache_id);

      var ids = widget.getOwnedIds();
      var ids_len = ids.length;

      for (var j = 0; j < ids_len; j++) {

         var id = ids[j];

         var ce = this.getControlElementById(id);

         if (ce) {

           this.removeFromChildCacheElements(ce);
           widget.addChildControl(ce, true);
           ce.addOwnerControl(widget);
           // update event information owned controls

         }
      }
    }

  }

};


/**
 * @method removeFromChildCacheElements
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Removes a control from the tree view of form controls and widgets
 */

OpenAjax.a11y.cache.ControlsCache.prototype.removeFromChildCacheElements = function (item) {

  function removeItem(list) {

    for (var i = 0; i < list.length; i++ ) {

      if (list[i] === item) {
        list = list.splice(i, 1);
        return true;
      }

      if (list.child_cach_elements && list.child_cach_elements.lengh) {
         if (removeItem(item)) return true;
      }
    }
    return false;
  }

  removeItem(this.child_cache_elements);

};


/* ---------------------------------------------------------------- */
/*                       FormElement                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor FormElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FormElement object used to hold information about form elements
 *
 * @param  {DOMelement}   dom_element   - dom_element object references DOMElement of the form element
 * @param  {ControlInfo}  control_info  - Information about the parent control cache
 *
 * @property  {DOMElement}  dom_element           - DOMElement associated with the form element
 * @property  {String}      cache_id              - String that uniquely identifies the cache element in the DOMCache
 * @property  {Number}      document_order        - Ordinal position of the form element in the document in relationship to other form elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 * @property  {Boolean}     is_valid       - True if the pattern is valid, otherwise false
 *
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {String}  action  - The value of the action attribute of the form control
 * @property  {String}  method  - The value of the method attribute of the form control
 * @property  {String}  name_attribute  - The value of the name attribute of the form control
 */

OpenAjax.a11y.cache.FormElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.child_cache_elements = [];
  this.cache_id     = "";
  this.document_order = 0;

  this.needs_label  = false;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FORM;
  this.number_of_controls = 0;

  this.action = dom_element.node.action;
  this.method = dom_element.node.method;

  this.name_attribute   = dom_element.node.name;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.FormElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.FormElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties();

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FormElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.FormElement.prototype.getEvents = function (unsorted) {

  return this.dom_element.getEvents();

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns a text string representation of the FormElement
 *
 * @return {String} Returns string represention the FormElement object
 */

OpenAjax.a11y.cache.FormElement.prototype.toString = function () {
  var s = "form(";

  if (this.number_of_controls === 1) s += "1 control)";
  else s += this.number_of_controls + " controls)";

  return s;
};

/* ---------------------------------------------------------------- */
/*                       FieldsetElement                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor FieldsetElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FieldsetElement object used to hold information about fieldset elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the fieldset element
 * @param  {ControlInfo}  control_info  - Information about parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the fieldset element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the fieldset element in the document in relationship to other fieldset elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {FieldsetElement}  fieldset_element  - Reference to any fieldset elements this fieldset is nested in
 * @property  {LegendElement}    legend_element    - Reference to the legend element contained in the fieldset
 * @property  {Number}           legend_count      - Number of legend elements contained in the fieldset
 */

OpenAjax.a11y.cache.FieldsetElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.needs_label = false;
  this.has_validity = false;
  this.has_pattern = false;

  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FIELDSET;
  this.number_of_controls = 0;

  this.grouping_element = control_info.grouping_element;

  this.legend_element = null;

  this.legend_count = 0;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_cache_elements.push(child_control);
  }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns a text string representation of the fieldset element
 *
 * @return {String} Returns string represention the FieldsetElement object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.toString = function () {

 var s = "fieldset: ";

 if (this.legend_element && this.legend_element.computed_label.length) s += this.legend_element.computed_label;
 else s += 'no legend';

 return s;

};

/* ---------------------------------------------------------------- */
/*                       GroupingElement                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor GroupingElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a GroupingElement object used to hold information about fieldset elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the fieldset element
 * @param  {ControlInfo}  control_info  - Information about parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the fieldset element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the fieldset element in the document in relationship to other fieldset elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 *
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {GroupingElement}  fieldset_element  - Reference to any fieldset elements this fieldset is nested in
 */

OpenAjax.a11y.cache.GroupingElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.needs_label = false;
  this.has_validity = false;
  this.has_pattern = false;

  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.GROUPING;
  this.number_of_controls = 0;

  this.grouping_element = control_info.grouping_element;

  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_for_comparison = "";

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.GroupingElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.GroupingElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_cache_elements.push(child_control);
  }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.GroupingElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns a text string representation of the grouping element
 *
 * @return {String} Returns string represention the GroupingElement object
 */

OpenAjax.a11y.cache.GroupingElement.prototype.toString = function () {

  var de = this.dom_element;
  var s  = de.tag_name;

  if (de.has_role) s += '[role=' + de.role + ']';

  if (this.computed_label) s += ': ' + this.computed_label;

  return s;

};

/* ---------------------------------------------------------------- */
/*                       LegendElement                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor LegendElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LegendElement object used to hold information about legend elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the legend element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the legend element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the legend element in the document in relationship to other legend elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this legend is nested in
 * @property  {String}           computed_label                - Text content of the legend element
 * @property  {String}           computed_label_for_comparison - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  this.document_order = 0;

  this.needs_label = false;
  this.has_validity = false;
  this.has_pattern = false;

  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.LEGEND;

  this.grouping_element = control_info.grouping_element;

  this.labels = [];
  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_for_comparison = "";

  if (control_info.grouping_element) {
    control_info.grouping_element.legend_count++;
  }

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control);
 }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LegendElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns a text string representation of the legend element
 *
 * @return {String} Returns string represention the LegendElement object
 */

OpenAjax.a11y.cache.LegendElement.prototype.toString = function () {
 if (this.computed_label.length)
   return "legend: " + this.computed_label;
 else
   return "legend: empty";

};

/* ---------------------------------------------------------------- */
/*                       LabelElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor LabelElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LabelElement object used to hold information about label elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the label element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the label element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the label element in the document in relationship to other label elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Text content of the label element
 * @property  {Number}      computed_label_len             - Length of the computed label
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {Boolean}     unused_label                   - Boolean indicting where the label references a form control
 * @property  {Object}      control_element    - Reference to the control that the label elements is associated with
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this label is nested in
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.needs_label = false;
  this.has_validity = false;
  this.has_pattern = false;

  this.child_cache_elements = [];

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.LABEL;

  this.labels = [];
  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_for_comparison = "";
  this.computed_label_source = OpenAjax.a11y.SOURCE.TEXT_CONTENT;

  this.unused_label    =  true;
  this.duplicate_label =  false;
  this.hidden_label = (dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.HIDDEN);
  this.control_element =  null;

  this.grouping_element = control_info.grouping_element;

  this.for_id = dom_element.node.getAttribute('for');

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control);
 }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LabelElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'for_id');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'unused_label');
  cache_nls.addPropertyIfDefined(properties, this, 'hidden_label');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns a text string representation of the label element
 *
 * @return {String} Returns string represention the LabelElement object
 */

OpenAjax.a11y.cache.LabelElement.prototype.toString = function () {
 if (this.computed_label_for_comparison.length)
   return "label: " + this.computed_label;
 else
   return "label: empty";
};

/* ---------------------------------------------------------------- */
/*                       InputElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor InputElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InputElement object used to hold information about input elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {String}      type                  - Type of input element
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 * @property  {String}      name_attribute        - Text content of the name attribute
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Calculated label for the input element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {Number}      computed_label_source          - Constant representing how a label was calculated
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      readonly   - The value of the readonly attribute
 * @property  {String}      disabled   - The value of the disabled attribute
 * @property  {String}      value      - The value of the readonly attribute
 * @property  {String}      checked    - The value of the disabled attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.InputElement = function (dom_element, control_info) {

  var node = dom_element.node;

  dom_element.is_interactive = true;

  this.dom_element = dom_element;
  this.cache_id    = "";
  this.document_order = 0;

  this.value   = node.value;
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type  = OpenAjax.a11y.CONTROL_TYPE.UNKNOWN;

  this.needs_label  = false;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid = true;

  if (node.validity &&
      (typeof node.validity.valid === 'boolean')) {
    this.is_valid     = node.validity.valid;
  }

  var pattern = node.getAttribute('pattern');
  if (pattern && (pattern.length > 0)) this.has_pattern = true;

  var type = "";

  if (dom_element.has_type_attr) type = dom_element.type_attr;

  if ((typeof type !== 'string') || (type.length === 0)) type = 'text';

  this.type = type;

  switch (type) {

  case 'button':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT;
    break;

  case 'checkbox':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.CHECKBOX;
    this.needs_label  = true;
    break;

  case 'color':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.COLOR;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'date':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.DATE;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'datetime':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.DATETIME;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'datetime-local':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.DATETIME_LOCAL;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'month':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.MONTH;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'time':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.TIME;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'week':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.WEEK;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'email':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.EMAIL;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;


  case 'file':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.FILE;
    this.needs_label  = true;
    break;

  case 'hidden':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.HIDDEN;
    break;

  case 'image':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.IMAGE;
    break;

  case 'number':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.NUMBER;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'password':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.PASSWORD;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'radio':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RADIO;
    this.needs_label  = true;
    break;

  case 'range':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RANGE;
    this.needs_label  = true;
    this.has_validity = true;
    break;

  case 'reset':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RESET;
    break;

  case 'search':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.SEARCH;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'submit':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.SUBMIT;
    break;

  case 'tel':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.TEL;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'text':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.TEXT;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  case 'url':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.URL;
    this.needs_label  = true;
    this.has_validity = true;
    this.has_pattern = dom_element.has_pattern;
    break;

  default:
    break;
  }

  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.is_owned = false;
  this.owner_controls = [];

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.InputElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.InputElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');
  cache_nls.addPropertyIfDefined(properties, this, 'has_validity');
  cache_nls.addPropertyIfDefined(properties, this, 'has_pattern');
  cache_nls.addPropertyIfDefined(properties, this, 'is_valid');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.InputElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns a text string representation of the input element
 *
 * @return {String} Returns string represention the InputElement object
 */

OpenAjax.a11y.cache.InputElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "input[" + this.type + "]: " + label;

};

/* ---------------------------------------------------------------- */
/*                       ButtonElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor ButtonElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ButtonElement object used to hold information about button elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the button element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the button element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this button element is nested in
 *
 * @property  {String}     computed_label                  - Calculated label for the button element
 * @property  {Number}     computed_label_length           - Length of the label property
 * @property  {String}     computed_ label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {String}     readonly              - The value of the readonly attribute
 * @property  {String}     disabled              - The value of the disabled attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

  dom_element.is_interactive = true;

  this.dom_element = dom_element;
  this.cache_id    = "";

  this.child_cache_elements = [];

  var node = dom_element.node;

  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT;

  this.name_attribute = node.getAttribute('name');

  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

  this.grouping_element = control_info.grouping_element;

  this.is_owned = false;
  this.owner_controls = [];

  this.needs_label  = false;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};


/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
  if (child_control) {
    this.child_cache_elements.push(child_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUnefined(attributes, this, 'name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns a text string representation of the button element
 *
 * @return {String} Returns string represention the ButtonElement object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "button: " + label;
};

/* ---------------------------------------------------------------- */
/*                    TextareaElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor TextareaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a TextareaElement object used to hold information about textarea elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the textarea element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the textarea element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Calculated label for the textarea element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      rows       - The value of the rows attribute
 * @property  {String}      cols       - The value of the cols attribute
 *
 * @property  {String}      readonly   - The value of the readonly attribute
 * @property  {String}      disabled   - The value of the disabled attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.TextareaElement = function (dom_element, control_info) {

  var node = dom_element.node;

  dom_element.is_interactive = true;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  this.type = "textarea";

  this.needs_label  = true;
  this.has_validity = true;
  this.has_pattern  = false;
  this.is_valid     = true;

  if (node.validity &&
      (typeof node.validity.valid === 'boolean')) {
    this.is_valid     = node.validity.valid;
  }

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.TEXTAREA;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.name_attribute  = node.getAttribute('name');

  this.rows = node.getAttribute('rows');
  this.cols = node.getAttribute('cols');

  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

  this.is_owned = false;
  this.owner_controls = [];

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.TextareaElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  cache_nls.addPropertyIfUndefined(attributes, this, 'rows');
  cache_nls.addPropertyIfUndefined(attributes, this, 'cols');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns a text string representation of the textarea element
 *
 * @return {String} Returns string represention the Element object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.toString = function () {
  var str = "textarea";

  if (this.rows && this.cols) str = "[" + this.rows + "x" + this.cols + "]";

  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return str + ": " + label;
};

/* ---------------------------------------------------------------- */
/*                    ProgressElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor ProgressElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ProgressElement object used to hold information about Progress elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the Progress element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the Progress element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Calculated label for the Progress element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}  max   - The value of the max attribute
 * @property  {String}  value - The value of the value attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.ProgressElement = function (dom_element, control_info) {

  var node = dom_element.node;

  dom_element.is_interactive = true;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  this.type = "Progress";

  this.needs_label  = true;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.Progress;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.name_attribute  = node.getAttribute('name');

  this.value   = node.getAttribute('value');
  this.max     = node.getAttribute('max');
  this.percent = 0;

  var d = parseInt(this.max, 10);
  var v = parseInt(this.value, 10);

  if ((typeof d === 'number') &&
      (typeof v === 'number') &&
      (d > 0)) this.percent = (100.0 * v) / d;

  this.is_owned = false;
  this.owner_controls = [];

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.ProgressElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  cache_nls.addPropertyIfUndefined(attributes, this, 'value');
  cache_nls.addPropertyIfUndefined(attributes, this, 'max');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');
  cache_nls.addPropertyIfDefined(properties, this, 'percent');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ProgressElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ProgressElement
 *
 * @desc Returns a text string representation of the Progress element
 *
 * @return {String} Returns string represention the Element object
 */

OpenAjax.a11y.cache.ProgressElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "Progress: " + label;
};

/* ---------------------------------------------------------------- */
/*                    OutputElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor OutputElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OutputElement object used to hold information about Progress elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the Progress element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the Progress element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Calculated label for the Progress element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String} value - The value of the value attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.OutputElement = function (dom_element, control_info) {

  var node = dom_element.node;

  dom_element.is_interactive = true;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  this.type = "Progress";

  this.needs_label  = true;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.Output;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.value = node.getAttribute('value');

  this.is_owned = false;
  this.owner_controls = [];

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.OutputElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OutputElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OutputElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OutputElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  cache_nls.addPropertyIfUndefined(attributes, this, 'value');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OutputElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OutputElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OutputElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.OutputElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.OutputElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OutputElement
 *
 * @desc Returns a text string representation of the Progress element
 *
 * @return {String} Returns string represention the Element object
 */

OpenAjax.a11y.cache.OutputElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "Output: " + label;
};


/* ---------------------------------------------------------------- */
/*                    MeterElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor MeterElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a MeterElement object used to hold information about Progress elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the Progress element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the Progress element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      computed_label                 - Calculated label for the Progress element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String} max   - The value of the max attribute
 * @property  {String} max   - The value of the min attribute
 * @property  {String} value - The value of the value attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.MeterElement = function (dom_element, control_info) {

  var node = dom_element.node;

  dom_element.is_interactive = true;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  this.type = "Progress";

  this.needs_label  = true;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.METER;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.min   = node.getAttribute('min');
  this.max   = node.getAttribute('max');
  this.value = node.getAttribute('value');

  this.is_owned = false;
  this.owner_controls = [];

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.MeterElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MeterElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MeterElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MeterElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  cache_nls.addPropertyIfUndefined(attributes, this, 'value');
  cache_nls.addPropertyIfUndefined(attributes, this, 'max');
  cache_nls.addPropertyIfUndefined(attributes, this, 'min');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MeterElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');
  cache_nls.addPropertyIfDefined(properties, this, 'value');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MeterElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MeterElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.MeterElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.MeterElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MeterElement
 *
 * @desc Returns a text string representation of the Progress element
 *
 * @return {String} Returns string represention the Element object
 */

OpenAjax.a11y.cache.MeterElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "Meter: " + label;
};

/* ---------------------------------------------------------------- */
/*                      SelectElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor SelectElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a SelectElement object used to hold information about select elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the select element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the select element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - String indicating the type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Array}       option_elements       - Array of child cache option elements
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this select element is nested in
 *
 * @property  {String}      computed_label                 - Calculated label for the select element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 * @property  {String}      size                  - The value of the size attribute
 * @property  {String}      multiple              - The value of the multiple attribute
 *
 * @property  {Boolean}  is_owned       - True if this control is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.SelectElement = function (dom_element, control_info) {

  dom_element.is_interactive = true;

  this.dom_element    = dom_element;

  this.cache_id       = "";
  this.document_order = 0;

  this.child_cache_elements = [];

  this.option_elements = [];

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.SELECT;

  var node = dom_element.node;

  this.name_attribute  = node.getAttribute('name');
  this.type = "select";

  this.size   = node.size;
  this.multiple = node.multiple;

  this.label_element  = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.is_owned = false;
  this.owner_controls = [];

  this.needs_label  = true;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  if (node.validity &&
      (typeof node.validity.valid === 'boolean')) {
    this.is_valid     = node.validity.valid;
  }

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.SelectElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control);
 }

};

/**
 * addOption
 *
 * @desc add a OptionElement object reference to the tree of
 *
 * @param  child_control    Object control cache element object
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.SelectElement.prototype.addOption = function (option_element) {

  if (option_element) {
    this.option_elements.push(option_element);
    option_element.document_order = this.option_elements.length;
    option_element.cache_id    = this.cache_id + "_" + this.option_elements.length;
  }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SelectElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.SelectElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns a text string representation of the select element
 *
 * @return {String} Returns string represention the SelectElement object
 */

OpenAjax.a11y.cache.SelectElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return "select[" + this.option_elements.length + " options]: " + label;
};

/* ---------------------------------------------------------------- */
/*                       OptgroupElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor OptgroupElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {SelectElement}  select_element     - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}      computed_label                 - Calculated label for the select element
 * @property  {Number}      computed_label_length          - Length of the label property
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";

 this.child_cache_elements = [];

 this.control_type = OpenAjax.a11y.CONTROL_TYPE.OPTGROUP;

 this.select_element = control_info.select_element;

 this.computed_label = dom_element.node.computed_label;
 if (this.computed_label) {
   this.computed_label_length = this.computed_label.length;
   this.computed_label_for_comparison = OpenAjax.a11y.util.normalizeSpace(this.computed_label.toLowerCase());
 }
 else {
   this.computed_label_length = 0;
   this.computed_label_for_comparison = "";
 }

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control);
 }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns a text string representation of the optgroup element
 *
 * @return {String} Returns string represention the OptgroupElement object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.toString = function () {
 return "OPTGROUP with " + this.child_cache_elements.length + " options";
};

/* ---------------------------------------------------------------- */
/*                      OptionElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor OptionElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element        - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Number}      control_type       - Constant indicating the type of cache control object
 *
 * @property  {SelectElement}  select_element  - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}         value           - Value of the value attribute
 */

OpenAjax.a11y.cache.OptionElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";

 this.control_type   = OpenAjax.a11y.CONTROL_TYPE.OPTION;

 this.select_element = control_info.select_element;

 this.value = dom_element.node.value;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptionElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns a text string representation of the option element
 *
 * @return {String} Returns string represention the OptionElement object
 */

OpenAjax.a11y.cache.OptionElement.prototype.toString = function () {
 return "OPTION: " + this.value;
};

/* ---------------------------------------------------------------- */
/*                       WidgetElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor WidgetElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InputElement object used to hold information about input elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {Boolean}     has_aria_owns              - if the widget has aria-owns, use this to calculate children
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree
 * @property  {String}      type                  - String indicating the type of input element
 * @property  {Number}      control_type          - Constant indicating the type of cache control object
 *
 * @property  {Boolean}     needs_label    - True if the control needs a label element or aria technique, otherwise false
 * @property  {Boolean}     has_validity   - True if the control supports validation, otherwise false
 * @property  {Boolean}     is_valid       - True if the control has a valid value, otherwise false
 * @property  {Boolean}     has_pattern    - True if the pattern attribute is defined, otherwise false
 *
 * @property  {String}      name_attribute        - Text content of the name attribute
 *
 * @property  {String}  computed_label                 - Calculated label for the input element
 * @property  {Number}  computed_label_length          - Length of the label property
 * @property  {Number}  computed_label_source          - Constant representing how a label was calculated
 * @property  {String}  computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}  readonly  - The value of the readonly attribute
 * @property  {String}  disabled  - The value of the disabled attribute
 * @property  {String}  value     - The value of the readonly attribute
 * @property  {String}  checked   - The value of the disabled attribute
 *
 * @property  {Boolean}  is_owned       - True if this widget is owned by another widget
 * @property  {Array}    owner_controls - Array of all the widgets that own this widget (NOTE: More than one owner is an error)
 */

OpenAjax.a11y.cache.WidgetElement = function (dom_element, control_info) {

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.has_aria_owns       = dom_element.hasOwns();
  this.cache_id       = "";
  this.document_order = 0;
  this.parent_widget  = control_info.parent_widget;

  this.child_cache_elements = [];
  this.type    = node.type;
  this.value   = node.value;
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.WIDGET;

  this.label_element    = control_info.label_element;
  this.grouping_element = control_info.grouping_element;

  this.aria_attributes_with_invalid_values  = [];
  this.aria_attributes_missing              = [];

  this.is_owned = false;
  this.owner_controls = [];

  var role_info = OpenAjax.a11y.aria.getRoleObject(dom_element.role);

  this.needs_label  = false;
  this.has_validity = false;
  this.has_pattern  = false;
  this.is_valid     = true;

  if (role_info && role_info.reqName) this.needs_label  = true;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidegtElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add
 * @param  {Boolean} override_owns  - If true, allow child elements to be added if the widget has an owns property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.addChildControl = function (child_control, override_owns) {

  if (this.has_aria_owns && ((typeof override_owns != 'boolean') || ((typeof override_owns === 'boolean') && !override_owns))) return;

  if (child_control) {
   this.child_cache_elements.push(child_control);
  }
};

/**
 * @method addOwnerControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Adds a ARIA owner control element reference
 *
 * @param  {WidegtElement} owner_control   - Cache control element object to add
 */

OpenAjax.a11y.cache.WidgetElement.prototype.addOwnerControl = function (owner_control) {

  if (owner_control) {
   this.is_owned = true;
   this.parent_widget = owner_control;
   this.owner_controls.push(owner_control);
  }
};

/**
 * @method getOwnedIds
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of strings representing the ids in the aria-owns property
 *
 * @return {Array} Returns an array of string objects represrenting the ids of the aria-owns property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getOwnedIds = function () {

  var aria_owns = this.dom_element.aria_owns;
  var return_array = [];

  if (typeof aria_owns === 'string' && (aria_owns.length > 0)) {

    if (aria_owns.indexOf(' ') > 0) {
      return_array = aria_owns.split(' ');
    }
    else {
      return_array.push(aria_owns);
    }

  }

  return return_array;

};

/**
 * @method hasChildRole
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Tests if a widget has a child ARIA element with a certain role
 *
 * @param {String}  role -  Role to find
 *
 * @return {Boolean} Returns true if widget has child element with role, otherwise false
 */

OpenAjax.a11y.cache.WidgetElement.prototype.hasChildRole = function (role) {

   function checkCacheChildren(list) {

     var flag = false;

     for (var i = 0; (i < list.length); i++) {

       var item = list[i];

       if (item.dom_element.role === role) {
         flag = true;
         break;
       }
       else {
         if (item.child_cache_elements && item.child_cache_elements.length) {
           flag = checkCacheChildren(item.child_cache_elements);
         }
       }
     }

     return flag;

   }

   return checkCacheChildren(this.child_cache_elements);

};

/**
 * @method hasParentRole
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Tests if a widget has a parent element with a certain role
 *
 * @param {String}  role -  Role to find
 *
 * @return {Boolean} Returns true if widget has child element with role, otherwise false
 */

OpenAjax.a11y.cache.WidgetElement.prototype.hasParentRole = function (role) {

   function checkParentRole(widget) {

     if (!widget) return false;

     if (widget.dom_element.role === role) return true;

     return checkParentRole(widget.parent_widget);

   }

   return checkParentRole(this.parent_widget);

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');
  cache_nls.addPropertyIfDefined(properties, this, 'is_section');
  cache_nls.addPropertyIfDefined(properties, this, 'is_owned');
  cache_nls.addPropertyIfDefined(properties, this, 'needs_label');
  cache_nls.addPropertyIfDefined(properties, this, 'owner_controls');
  cache_nls.addPropertyIfDefined(properties, this, 'parent_widget');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns a text string representation of the input element
 *
 * @return {String} Returns string represention the InputElement object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.toString = function () {
  var label = "no label";
  if (this.computed_label_for_comparison.length) label = this.computed_label;

  return this.dom_element.tag_name + "[role=" + this.dom_element.role + "]: " + label;

};

/* ---------------------------------------------------------------- */
/*                       InteractiveElement                         */
/* ---------------------------------------------------------------- */

/**
 * @constructor InteractiveElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InteractiveElement object used to hold information about elements that could respond to user actions
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element
 * @param  {String}       tag_name      - The dom element object representing the input element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 */

OpenAjax.a11y.cache.InteractiveElement = function (dom_element, has_tabindex, has_events) {

  this.is_embedded_app = false;
  this.has_tabindex_behavior = false;

  this.dom_element = dom_element;
  var tag_name = dom_element.tag_name;

  this.element_id = tag_name;

  if (tag_name === 'input') {
    if (dom_element.has_type_attr) this.element_id += "input[type=" + dom_element.type_attr + "]";
    else this.element_id += 'input[type=text]';
  }

  if (has_tabindex || dom_element.has_tabindex) {
    if ((dom_element.tabindex !== '0') ||
         ((tag_name !== 'a') &&
          (tag_name !== 'button') &&
          (tag_name !== 'input') &&
          (tag_name !== 'select') &&
          (tag_name !== 'textarea'))) {

      this.element_id += tag_name + '[tabindex=' + dom_element.tabindex + ']';
      this.has_tabindex_behavior = true;
     }
  }

  if (has_events || dom_element.hasEvents()) this.element_id +=  tag_name + "[events]";

  if (tag_name === 'object' ||
      tag_name === 'embed' ||
      tag_name === 'video' ||
      tag_name === 'audio') {
    this.is_embedded_app = true;
    this.element_id += tag_name;
  }
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

//  cache_nls.addPropertyIfUndefined(attributes, this, 'name');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var label_style = {};

  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }

};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('computed_label_source', this.computed_label_source);

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.InteractiveElement
 *
 * @desc Returns a text string representation of the input element
 *
 * @return {String} Returns string represention the InteractiveElement object
 */

OpenAjax.a11y.cache.InteractiveElement.prototype.toString = function () {

    var str = "";

    if (this.accessible_name_for_comparison.length) str = ': ' + this.accessible_name;

    return this.element_id + str;

};
