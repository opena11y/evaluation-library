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

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*                       ElementInformation                         */
/* ---------------------------------------------------------------- */

/**
 * @constructor ElementInformation
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @param  {Object}  dom_cache  -  DOMCache object used for evaluation
 *
 */

/**
 * @private
 * @constructor Internal Properties
 *
 */

OpenAjax.a11y.cache.ElementInformation = function () {

  // General page element counts and fram usage

  this.all_element_count    = 0;
  this.all_hidden_count     = 0;
  this.all_offscreen_count  = 0;

  this.frame_count      = 0;
  this.iframe_count     = 0;

  // Image counts

  this.all_images_count = 0;
  this.img_count        = 0;
  this.canvas_count     = 0;
  this.svg_count        = 0;
  this.figure_count     = 0;
  this.figcaption_count = 0;
  this.alt_attribute_count      = 0;
  this.longdesc_attribute_count = 0;

  // heading level counts

  this.all_headings_count = 0;
  this.h1_count           = 0;
  this.h2_count           = 0;
  this.h3_count           = 0;
  this.h4_count           = 0;
  this.h5_count           = 0;
  this.h6_count           = 0;

  // HTML5 Section Element counts

  this.all_sections_count = 0;
  this.address_count      = 0;
  this.article_count      = 0;
  this.aside_count        = 0;
  this.details_count      = 0;
  this.dialog_count       = 0;
  this.header_count       = 0;
  this.footer_count       = 0;
  this.main_count         = 0;
  this.nav_count          = 0;
  this.section_count      = 0;
  this.summary_count      = 0;

  // List element counts

  this.all_lists_count = 0;
  this.ul_count        = 0;
  this.ol_count        = 0;
  this.li_count        = 0;

  this.dl_count       = 0;
  this.dt_count       = 0;
  this.dd_count       = 0;

  this.all_links_count  = 0;
  this.a_count          = 0;
  this.area_count       = 0;

  // Table element counts

  this.all_tables_count  = 0;
  this.table_count       = 0;
  this.th_count          = 0;
  this.td_count          = 0;
  this.caption_count     = 0;
  this.summary_attribute_count    = 0;
  this.scope_attribute_count      = 0;
  this.headers_attribute_count    = 0;

  // Form control counts

  this.all_forms_count      = 0;
  this.input_button_count   = 0;
  this.input_checkbox_count = 0;
  this.input_color_count    = 0;
  this.input_date_count     = 0;
  this.input_datetime_count = 0;
  this.input_email_count    = 0;
  this.input_file_count     = 0;
  this.input_image_count    = 0;
  this.input_month_count    = 0;
  this.input_number_count   = 0;
  this.input_password_count = 0;
  this.input_radio_count    = 0;
  this.input_range_count    = 0;
  this.input_reset_count    = 0;
  this.input_search_count   = 0;
  this.input_submit_count   = 0;
  this.input_text_count     = 0;
  this.input_tel_count      = 0;
  this.input_time_count     = 0;
  this.input_url_count      = 0;
  this.input_week_count     = 0;

  this.autofocus_attribute_count   = 0;
  this.placeholder_attribute_count = 0;
  this.pattern_attribute_count     = 0;
  this.required_attribute_count    = 0;

  this.output_count    = 0;
  this.progress_count  = 0;
  this.meter_count     = 0;

  this.label_count     = 0;
  this.fieldset_count  = 0;
  this.legend_count    = 0;
  this.title_attribute_count    = 0;

  // media counts

  this.button_count      = 0;
  this.select_count      = 0;
  this.textarea_count    = 0;

  this.all_media_count  = 0;
  this.audio_count      = 0;
  this.embed_count      = 0;
  this.object_count     = 0;
  this.video_count      = 0;
  this.track_count      = 0;
  this.source_count     = 0;

  // ARIA Landmark counts

  this.all_landmarks_count      = 0;

  this.role_application_count   = 0;
  this.role_banner_count        = 0;
  this.role_complementary_count = 0;
  this.role_contentinfo_count   = 0;
  this.role_form_count          = 0;
  this.role_main_count          = 0;
  this.role_navigation_count    = 0;
  this.role_region_count        = 0;
  this.role_search_count        = 0;

  // ARIA Structure counts

  this.all_structures_count    = 0;

  this.role_article_count      = 0;
  this.role_directory_count    = 0;
  this.role_document_count     = 0;
  this.role_heading_count      = 0;
  this.role_math_count         = 0;
  this.role_note_count         = 0;
  this.role_presentation_count = 0;

  // ARIA Widget counts

  this.all_widgets_count   = 0;

  this.role_button_count   = 0;
  this.role_link_count     = 0;

  this.aria_describedby_count = 0;
  this.aria_describedat_count = 0;

  this.aria_labelledby_count  = 0;
  this.aria_label_count       = 0;

  this.aria_owns_count       = 0;
  this.aria_activedescendant_count = 0;
  this.aria_flowto_count     = 0;
  this.aria_controls_count   = 0;
  this.aria_hidden_count     = 0;

  // ARIA Live Region counts

  this.all_lives_count    = 0;

  this.aria_live_count    = 0;
  this.role_alert_count   = 0;
  this.role_log_count     = 0;
  this.role_status_count  = 0;

  // Event counts

  this.all_events_count      = 0;

  this.load_event_count      = 0;

  this.blur_event_count      = 0;
  this.focus_event_count     = 0;

  this.change_event_count    = 0;

  this.drag_events_count     = 0;

  this.click_event_count        = 0;
  this.double_click_event_count = 0;

  this.keyboard_events_count  = 0;
  this.mouse_events_count     = 0;
  this.touch_events_count     = 0;
  this.pointer_events_count   = 0;


};

/**
 * @method countElement
 *
 * @memberOf OpenAjax.a11y.cache.ElementInformation
 *
 * @desc Counts elements of interest
 *
 * @param  {Object}  dom_element  - DOM element object
 */

OpenAjax.a11y.cache.ElementInformation.prototype.countElement = function (dom_element) {

  var tag_name = dom_element.tag_name;
  var node = dom_element.node;
  var cs   = dom_element.computed_style;

  this.all_element_count++;

  if (cs.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.HIDDEN) {
    this.all_hidden_count++;
    if (cs.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE) {
      this.all_offscreen_count++;
    }
  }

  switch (tag_name) {

  case 'frame':
    this.frame_count++;
    break;

  case 'iframe':
    this.iframe_count++;
    break;

  case 'img':
    this.img_count++;
    this.all_images_count++;

    if (dom_element.has_alt)      this.alt_attribute_count++;
    if (dom_element.has_longdesc) this.longdesc_attribute_count++;

    break;

  case 'canvas':
    this.canvas_count++;
    this.all_images_count++;
    break;

  case 'svg':
    this.svg_count++;
    this.all_images_count++;
    break;

  case 'figure':
    this.figure_count++;
    this.all_images_count++;
    break;

  case 'figcaption':
    this.figcaption_count++;
    this.all_images_count++;
    break;

  case 'h1':
    this.h1_count++;
    this.all_headings_count++;
    break;

  case 'h2':
    this.h2_count++;
    this.all_headings_count++;
    break;

  case 'h3':
    this.h3_count++;
    this.all_headings_count++;
    break;

  case 'h4':
    this.h4_count++;
    this.all_headings_count++;
    break;

  case 'h5':
    this.h5_count++;
    this.all_headings_count++;
    break;

  case 'h6':
    this.h6_count++;
    this.all_headings_count++;
    break;

  case 'header':
    this.header_count++;
    this.all_sections_count++;
    break;

  case 'footer':
    this.footer_count++;
    this.all_sections_count++;
    break;

  case 'section':
    this.section_count++;
    this.all_sections_count++;
    break;

  case 'address':
    this.address_count++;
    this.all_sections_count++;
    break;

  case 'article':
    this.article_count++;
    this.all_sections_count++;
    break;

  case 'aside':
    this.aside_count++;
    this.all_sections_count++;
    break;

  case 'details':
    this.details_count++;
    this.all_sections_count++;
    break;

  case 'dialog':
    this.dialog_count++;
    this.all_sections_count++;
    break;

  case 'summary':
    this.summary_count++;
    this.all_sections_count++;
    break;

  case 'main':
    this.main_count++;
    this.all_sections_count++;
    break;

  case 'nav':
    this.nav_count++;
    this.all_sections_count++;
    break;

  case 'ul':
    this.ul_count++;
    this.all_lists_count++;
    break;

  case 'ol':
    this.ol_count++;
    this.all_lists_count++;
    break;

  case 'li':
    this.li_count ++;
    this.all_lists_count++;
    break;

  case 'dl':
    this.dl_count++;
    this.all_lists_count++;
    break;

  case 'dt':
    this.dt_count++;
    this.all_lists_count++;
    break;

  case 'dd':
    this.dd_count++;
    this.all_lists_count++;
    break;

  case 'a':
    this.a_count  ++;
    this.all_links_count++;
    break;

  case 'area':
    this.area_count       = 0;
    this.all_links_count++;
    break;

  case 'table':
    this.table_count++;
    this.all_tables_count++;

    if (dom_element.has_summary) this.summary_attribute_count++;

    break;

  case 'th':
  case 'td':
    if (tag_name == 'th') this.th_count ++;
    else this.td_count ++;

    this.all_tables_count++;

    if (dom_element.has_scope)   this.scope_attribute_count++;
    if (dom_element.has_headers) this.headers_attribute_count++;

    break;

  case 'caption':
    this.caption_count++;
    this.all_tables_count++;
    break;

  case 'input':

    var type = dom_element.node.getAttribute('type');

    if (dom_element.has_autofocus)   this.autofocus_attribute_count++;
    if (dom_element.has_required)    this.required_attribute_count++;
    if (dom_element.has_pattern)     this.pattern_attribute_count++;
    if (dom_element.has_placeholder) this.placeholder_attribute_count++;
    if (dom_element.has_title)       this.title_attribute_count++;

    switch (type) {

    case 'checkbox':
      this.input_checkbox_count++;
      this.all_forms_count++;
      break;

    case 'radio':
      this.input_radio_count++;
      this.all_forms_count++;
      break;

    case 'button':
      this.input_button_count++;
      this.all_forms_count++;
      break;

    case 'color':
      this.input_color_count++;
      this.all_forms_count++;
      break;

    case 'date':
      this.input_date_count++;
      this.all_forms_count++;
      break;

    case 'datetime':
      this.input_datetime_count++;
      this.all_forms_count++;
      break;

    case 'email':
      this.input_email_count++;
      this.all_forms_count++;
      break;

    case 'file':
      this.input_file_count++;
      this.all_forms_count++;
      break;

    case 'image':
      this.input_image_count++;
      this.all_forms_count++;
      break;

    case 'month':
      this.input_month_count++;
      this.all_forms_count++;
      break;

    case 'number':
      this.input_number_count++;
      this.all_forms_count++;
      break;

    case 'password':
      this.input_password_count++;
      this.all_forms_count++;
      break;

    case 'range':
      this.input_range_count++;
      this.all_forms_count++;
      if (node.required) this.required_attribute_count++;
      break;

    case 'reset':
      this.input_reset_count++;
      this.all_forms_count++;
      break;

    case 'search':
      this.input_search_count++;
      this.all_forms_count++;
      break;

    case 'submit':
      this.input_submit_count++;
      this.all_forms_count++;
      break;

    case 'tel':
      this.input_tel_count++;
      this.all_forms_count++;
      break;

    case 'text':
      this.input_text_count++;
      this.all_forms_count++;
      break;

    case 'time':
      this.input_time_count++;
      this.all_forms_count++;
      break;

    case 'url':
      this.input_url_count++;
      this.all_forms_count++;
      break;

    case 'week':
      this.input_week_count ++;
      this.all_forms_count++;
      break;

    default:
      break;
   }
   break;

  case 'output':
    this.output_count++;
    this.all_forms_count++;
    if (dom_element.has_title)   this.title_attribute_count++;
    break;

  case 'progress':
    this.progress_count++;
    this.all_forms_count++;
    if (dom_element.has_title)   this.title_attribute_count++;
    break;

  case 'meter':
    this.meter_count++;
    this.all_forms_count++;
    if (dom_element.has_title)   this.title_attribute_count++;
    break;

  case 'label':
    this.label_count++;
    this.all_forms_count++;
    break;

  case 'fieldset':
    this.fieldset_count++;
    this.all_forms_count++;
    break;

  case 'legend':
    this.legend_count++;
    this.all_forms_count++;
    break;

  case 'button':
    this.button_count++;
    this.all_forms_count++;
    if (dom_element.has_title)   this.title_attribute_count++;
    break;

  case 'select':
    this.select_count++;
    this.all_forms_count++;
    if (dom_element.has_autofocus)   this.autofocus_attribute_count++;
    if (dom_element.has_required)    this.required_attribute_count++;
    if (dom_element.has_pattern)     this.pattern_attribute_count++;
    if (dom_element.has_placeholder) this.placeholder_attribute_count++;
    if (dom_element.has_title)       this.title_attribute_count++;
    break;

  case 'textarea':
    this.textarea_count++;
    this.all_forms_count++;
    if (dom_element.has_autofocus)   this.autofocus_attribute_count++;
    if (dom_element.has_required)    this.required_attribute_count++;
    if (dom_element.has_pattern)     this.pattern_attribute_count++;
    if (dom_element.has_placeholder) this.placeholder_attribute_count++;
    if (dom_element.has_title)       this.title_attribute_count++;

    break;

  // Media elements

  case 'audio':
    this.audio_count++;
    this.all_media_count++;
    break;

  case 'embed':
    this.embed_count++;
    this.all_media_count++;
    break;

  case 'object':
    this.object_count++;
    this.all_media_count++;
    break;

  case 'video':
    this.video_count++;
    this.all_media_count++;
    break;

  case 'track':
    this.track_count++;
    this.all_media_count++;
    break;

  case 'source':
    this.source_count++;
    this.all_media_count++;
    break;

  default:
    break;

  }


  if (dom_element.has_role) {

    var role = dom_element.role;

    switch (role) {

      // Landmark roles

      case 'application':
        this.role_banner_count++;
        this.all_landmarks_count++;
        break;

      case 'banner':
        this.role_banner_count++;
        this.all_landmarks_count++;
        break;

      case 'complementary':
        this.role_complementary_count++;
        this.all_landmarks_count++;
        break;

      case 'contentinfo':
        this.role_contentinfo_count++;
        this.all_landmarks_count++;
        break;

      case 'form':
        this.role_form_count++;
        this.all_landmarks_count++;
        break;

      case 'main':
        this.role_main_count++;
        this.all_landmarks_count++;
        break;

      case 'navigation':
        this.role_navigation_count++;
        this.all_landmarks_count++;
        break;

      case 'region':
        this.role_region_count++;
        this.all_landmarks_count++;
        break;

      case 'search':
        this.role_search_count++;
        this.all_landmarks_count++;
        break;

      // Structure roles

      case 'article':
        this.role_article_count++;
        this.all_structures_count++;
        break;

      case 'directory':
        this.role_directory_count++;
        this.all_structures_count++;
        break;

      case 'document':
        this.role_document_count++;
        this.all_structures_count++;
        break;

      case 'heading':
        this.role_heading_count++;
        this.all_structures_count++;
        break;

      case 'math':
        this.role_math_count++;
        this.all_structures_count++;
        break;

      case 'note':
        this.role_note_count++;
        this.all_structures_count++;
        break;

      case 'none':
      case 'presentation':
        this.role_presentation_count++;
        this.all_structures_count++;
        break;

      // Live region roles

      case 'alert':
        this.role_alert_count++;
        this.all_lives_count++;
        break;

      case 'log':
        this.role_log_count++;
        this.all_lives_count++;
        break;

      case 'status':
        this.role_status_count++;
        this.all_lives_count++;
        break;

      // Widget roles

      case 'button':
        this.role_button_count++;
        this.all_widgets_count++;
        break;

      case 'link':
        this.role_link_count++;
        this.all_widgets_count++;
        break;

      default:
        this.all_widgets_count++;
        break;
    }

  }

  // Check for ARIA attribute related content

  if (dom_element.has_aria_describedby) this.aria_describedby_count++;
  if (dom_element.has_aria_describedat) this.aria_describedat_count++;

  if (dom_element.has_aria_labelledby) this.aria_labelledby_count++;
  if (dom_element.has_aria_label)      this.aria_label_count++;

  if (dom_element.has_aria_owns)             this.aria_owns_count++;
  if (dom_element.has_aria_activedescendant) this.aria_activedescendant_count++;
  if (dom_element.has_aria_flowto)           this.aria_flowto_count++;
  if (dom_element.has_aria_controls)         this.aria_controls_count++;
  if (dom_element.has_aria_hidden)           this.aria_hidden_count++;

  if (dom_element.has_aria_live) {
    this.aria_live_count++;
    this.all_lives_count++;
  }

  // Check for events

  var events = dom_element.events;

  if (events.has_blur)  {
    this.blur_event_count++;
    this.all_events_count++;
  }

  if (events.has_change)  {
    this.change_event_count++;
    this.all_events_count++;
  }

  if (events.has_click)  {
    this.click_event_count++;
    this.all_events_count++;
  }

  if (events.has_double_click)  {
    this.double_click_event_count++;
    this.all_events_count++;
  }

  if (events.has_focus)  {
    this.focus_event_count++;
    this.all_events_count++;
  }

  if (events.has_load)  {
    this.load_event_count++;
    this.all_events_count++;
  }

  if (events.has_key_down ||
      events.has_key_press||
      events.has_key_up) {
    this.keyboard_events_count++;
    this.all_events_count++;
  }

  if (events.has_mouse_down  ||
      events.has_mouse_up    ||
      events.has_mouse_move  ||
      events.has_mouse_out   ||
      events.has_mouse_over  ||
      events.has_mouse_enter ||
      events.has_mouse_leave) {
    this.mouse_events_count++;
    this.all_events_count++;
  }

  if (events.has_drag ||
      events.has_drag_end||
      events.has_drag_enter ||
      events.has_drag_leave ||
      events.has_drag_over ||
      events.has_drag_start ||
      events.has_drop) {
    this.drag_events_count++;
    this.all_events_count++;
  }

  if (events.has_pointer_up ||
      events.has_pointer_cancel ||
      events.has_pointer_move ||
      events.has_pointer_over ||
      events.has_pointer_out ||
      events.has_pointer_enter ||
      events.has_pointer_leave) {
    this.pointer_events_count++;
    this.all_events_count++;
  }

  if (events.has_touch_start ||
      events.has_touch_end ||
      events.has_touch_leave ||
      events.has_touch_move ||
      events.has_touch_cancel ) {
    this.touch_events_count++;
    this.all_events_count++;
  }

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.ElementInformation
 *
 * @desc Creates a string representing the element information on a web page in a JSON format
 *
 * @param  {Boolean}  add_comma  - if true add comma to end of JSON object
 * @param  {String}   prefix     - Optional string of prefix characters (e.g. typically spaces)
 *
 * @return {String} Returns a string in JSON format
 */

OpenAjax.a11y.cache.ElementInformation.prototype.toJSON = function (add_comma, prefix) {

  if (typeof add_comma !== 'boolean') add_comma = false;
  if (typeof prefix    !== 'string')  prefix = "";

  var json = "";

  json += prefix + "\"markup_information\": {\n";

  json += prefix + "  \"summary\": {\n";
  json += prefix + "    \"all_element_count\"    : " + this.all_element_count   + ",\n";
  json += prefix + "    \"all_hidden_count\"     : " + this.all_hidden_count    + ",\n";
  json += prefix + "    \"all_offscreen_count\"  : " + this.all_offscreen_count + ",\n\n";

  json += prefix + "    \"frame_count\"          : " + this.frame_count  + ",\n";
  json += prefix + "    \"iframe_count\"         : " + this.iframe_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"images\": {\n";
  json += prefix + "    \"all_images_count\"     : " + this.all_images_count + ",\n\n";

  json += prefix + "    \"img_count\"            : " + this.img_count        + ",\n";
  json += prefix + "    \"canvas_count\"         : " + this.canvas_count     + ",\n";
  json += prefix + "    \"svg_count\"            : " + this.canvas_count     + ",\n";
  json += prefix + "    \"figure_count\"         : " + this.figure_count     + ",\n";
  json += prefix + "    \"figcaption_count\"     : " + this.figcaption_count + ",\n\n";

  json += prefix + "    \"alt_attribute_count\"      : " + this.alt_attribute_count      + ",\n";
  json += prefix + "    \"longdesc_attribute_count\" : " + this.longdesc_attribute_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"headings\": {\n";
  json += prefix + "    \"all_headings_count\"   : " + this.all_headings_count + ",\n\n";

  json += prefix + "    \"h1_count\"             : " + this.h1_count + ",\n";
  json += prefix + "    \"h2_count\"             : " + this.h2_count + ",\n";
  json += prefix + "    \"h3_count\"             : " + this.h3_count + ",\n";
  json += prefix + "    \"h4_count\"             : " + this.h4_count + ",\n";
  json += prefix + "    \"h5_count\"             : " + this.h5_count + ",\n";
  json += prefix + "    \"h6_count\"             : " + this.h6_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"sections\": {\n";
  json += prefix + "    \"all_sections_count\"   : " + this.all_sections_count + ",\n\n";

  json += prefix + "    \"address_count\"        : " + this.address_count + ",\n";
  json += prefix + "    \"article_count\"        : " + this.article_count + ",\n";
  json += prefix + "    \"aside_count\"          : " + this.aside_count   + ",\n";
  json += prefix + "    \"details_count\"        : " + this.details_count + ",\n";
  json += prefix + "    \"dialog_count\"         : " + this.dialog_count  + ",\n";
  json += prefix + "    \"footer_count\"         : " + this.footer_count  + ",\n";
  json += prefix + "    \"header_count\"         : " + this.header_count  + ",\n";
  json += prefix + "    \"main_count\"           : " + this.main_count    + ",\n";
  json += prefix + "    \"nav_count\"            : " + this.nav_count     + ",\n";
  json += prefix + "    \"section_count\"        : " + this.section_count + ",\n";
  json += prefix + "    \"summary_count\"        : " + this.summary_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"lists\": {\n";
  json += prefix + "    \"all_lists_count\"      : " + this.all_lists_count + ",\n\n";

  json += prefix + "    \"ul_count\"             : " + this.ul_count + ",\n";
  json += prefix + "    \"ol_count\"             : " + this.ol_count + ",\n";
  json += prefix + "    \"li_count\"             : " + this.li_count + ",\n\n";

  json += prefix + "    \"dl_count\"             : " + this.dl_count + ",\n";
  json += prefix + "    \"dt_count\"             : " + this.dt_count + ",\n";
  json += prefix + "    \"dd_count\"             : " + this.dd_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"links\": {\n";
  json += prefix + "    \"all_links_count\"      : " + this.all_links_count + ",\n\n";

  json += prefix + "    \"a_count\"              : " + this.a_count    + ",\n";
  json += prefix + "    \"area_count\"           : " + this.area_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"tables\": {\n";
  json += prefix + "    \"all_tables_count\"        : " + this.all_tables_count        + ",\n\n";

  json += prefix + "    \"table_count\"             : " + this.table_count             + ",\n";
  json += prefix + "    \"th_count\"                : " + this.th_count                + ",\n";
  json += prefix + "    \"td_count\"                : " + this.td_count                + ",\n";
  json += prefix + "    \"caption_count\"           : " + this.caption_count           + ",\n";
  json += prefix + "    \"summary_attribute_count\" : " + this.summary_attribute_count + ",\n";
  json += prefix + "    \"scope_attribute_count\"   : " + this.scope_attribute_count   + ",\n";
  json += prefix + "    \"headers_attribute_count\" : " + this.headers_attribute_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"forms\": {\n";
  json += prefix + "    \"all_forms_count\"      : " + this.all_forms_count      + ",\n\n";

  json += prefix + "    \"input_button_count\"   : " + this.input_button_count   + ",\n";
  json += prefix + "    \"input_checkbox_count\" : " + this.input_checkbox_count + ",\n";
  json += prefix + "    \"input_color_count\"    : " + this.input_color_count    + ",\n";
  json += prefix + "    \"input_date_count\"     : " + this.input_date_count     + ",\n";
  json += prefix + "    \"input_datetime_count\" : " + this.input_datetime_count + ",\n";
  json += prefix + "    \"input_email_count\"    : " + this.input_email_count    + ",\n";
  json += prefix + "    \"input_file_count\"     : " + this.input_file_count     + ",\n";
  json += prefix + "    \"input_image_count\"    : " + this.input_image_count    + ",\n";
  json += prefix + "    \"input_month_count\"    : " + this.input_month_count    + ",\n";
  json += prefix + "    \"input_number_count\"   : " + this.input_number_count   + ",\n";
  json += prefix + "    \"input_password_count\" : " + this.input_password_count + ",\n";
  json += prefix + "    \"input_radio_count\"    : " + this.input_radio_count    + ",\n";
  json += prefix + "    \"input_range_count\"    : " + this.input_range_count    + ",\n";
  json += prefix + "    \"input_reset_count\"    : " + this.input_reset_count    + ",\n";
  json += prefix + "    \"input_search_count\"   : " + this.input_search_count   + ",\n";
  json += prefix + "    \"input_submit_count\"   : " + this.input_submit_count   + ",\n";
  json += prefix + "    \"input_tel_count\"      : " + this.input_tel_count      + ",\n";
  json += prefix + "    \"input_text_count\"     : " + this.input_text_count     + ",\n";
  json += prefix + "    \"input_time_count\"     : " + this.input_time_count     + ",\n";
  json += prefix + "    \"input_url_count\"      : " + this.input_url_count      + ",\n";
  json += prefix + "    \"input_week_count\"     : " + this.input_week_count     + ",\n\n";

  json += prefix + "    \"autofocus_attribute_count\"   : " + this.autofocus_attribute_count   + ",\n";
  json += prefix + "    \"placeholder_attribute_count\" : " + this.placeholder_attribute_count + ",\n";
  json += prefix + "    \"pattern_attribute_count\"     : " + this.pattern_attribute_count     + ",\n";
  json += prefix + "    \"required_attribute_count\"    : " + this.required_attribute_count    + ",\n\n";

  json += prefix + "    \"output_count\"         : " + this.output_count   + ",\n";
  json += prefix + "    \"progress_count\"       : " + this.progress_count + ",\n";
  json += prefix + "    \"meter_count\"          : " + this.meter_count    + ",\n\n";

  json += prefix + "    \"fieldset_count\"        : " + this.fieldset_count        + ",\n";
  json += prefix + "    \"label_count\"           : " + this.label_count           + ",\n";
  json += prefix + "    \"legend_count\"          : " + this.legend_count          + ",\n";
  json += prefix + "    \"title_attribute_count\" : " + this.title_attribute_count + ",\n\n";

  json += prefix + "    \"button_count\"         : " + this.button_count   + ",\n";
  json += prefix + "    \"select_count\"         : " + this.select_count   + ",\n";
  json += prefix + "    \"textarea_count\"       : " + this.textarea_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"media\": {\n";
  json += prefix + "    \"all_media_count\"      : " + this.all_media_count + ",\n\n";
  json += prefix + "    \"audio_count\"          : " + this.audio_count     + ",\n";
  json += prefix + "    \"embed_count\"          : " + this.embed_count     + ",\n";
  json += prefix + "    \"object_count\"         : " + this.object_count    + ",\n";
  json += prefix + "    \"video_count\"          : " + this.video_count     + ",\n";
  json += prefix + "    \"source_count\"         : " + this.source_count    + ",\n";
  json += prefix + "    \"track_count\"          : " + this.track_count     + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"landmarks\": {\n";
  json += prefix + "    \"all_landmarks_count\"       : " + this.all_landmarks_count      + ",\n\n";
  json += prefix + "    \"role_application_count\"    : " + this.role_application_count   + ",\n";
  json += prefix + "    \"role_banner_count\"         : " + this.role_banner_count        + ",\n";
  json += prefix + "    \"role_complementary_count\"  : " + this.role_complementary_count + ",\n";
  json += prefix + "    \"role_contentinfo_count\"    : " + this.role_contentinfo_count   + ",\n";
  json += prefix + "    \"role_form_count\"           : " + this.role_form_count          + ",\n";
  json += prefix + "    \"role_main_count\"           : " + this.role_main_count          + ",\n";
  json += prefix + "    \"role_navigation_count\"     : " + this.role_navigation_count    + ",\n";
  json += prefix + "    \"role_region_count\"         : " + this.role_region_count        + ",\n";
  json += prefix + "    \"role_search_count\"         : " + this.role_search_count        + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"structures\": {\n";
  json += prefix + "    \"all_structures_count\"      : " + this.all_structures_count    + ",\n\n";
  json += prefix + "    \"role_article_count\"        : " + this.role_article_count      + ",\n";
  json += prefix + "    \"role_directory_count\"      : " + this.role_directory_count    + ",\n";
  json += prefix + "    \"role_document_count\"       : " + this.role_document_count     + ",\n";
  json += prefix + "    \"role_heading_count\"        : " + this.role_heading_count      + ",\n";
  json += prefix + "    \"role_math_count\"           : " + this.role_math_count         + ",\n";
  json += prefix + "    \"role_note_count\"           : " + this.role_note_count         + ",\n";
  json += prefix + "    \"role_presentation_count\"   : " + this.role_presentation_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"widgets\": {\n";
  json += prefix + "    \"all_widgets_count\"           : " + this.all_widgets_count + ",\n\n";
  json += prefix + "    \"role_button_count\"           : " + this.role_button_count + ",\n";
  json += prefix + "    \"role_link_count\"             : " + this.role_link_count + ",\n";
  json += prefix + "    \"aria_describedby_count\"      : " + this.aria_describedby_count + ",\n";
  json += prefix + "    \"aria_describedat_count\"      : " + this.aria_describedat_count + ",\n";
  json += prefix + "    \"aria_labelledby_count\"       : " + this.aria_labelledby_count + ",\n";
  json += prefix + "    \"aria_label_count\"            : " + this.aria_label_count + ",\n";
  json += prefix + "    \"aria_owns_count\"             : " + this.aria_owns_count + ",\n";
  json += prefix + "    \"aria_activedescendant_count\" : " + this.aria_activedescendant_count + ",\n";
  json += prefix + "    \"aria_flowto_count\"           : " + this.aria_flowto_count + ",\n";
  json += prefix + "    \"aria_controls_count\"         : " + this.aria_controls_count + ",\n";
  json += prefix + "    \"aria_hidden_count\"           : " + this.aria_hidden_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"lives\": {\n";
  json += prefix + "    \"all_lives_count\"       : " + this.all_lives_count   + ",\n\n";
  json += prefix + "    \"aria_live_count\"       : " + this.aria_live_count   + ",\n";
  json += prefix + "    \"role_alert_count\"      : " + this.role_alert_count  + ",\n";
  json += prefix + "    \"role_log_count\"        : " + this.role_log_count    + ",\n";
  json += prefix + "    \"role_status_count\"     : " + this.role_status_count + "\n";
  json += prefix + "  },\n";

  json += prefix + "  \"events\": {\n";
  json += prefix + "    \"all_events_count\"         : " + this.all_events_count         + ",\n\n";
  json += prefix + "    \"blur_event_count\"         : " + this.blur_event_count         + ",\n";
  json += prefix + "    \"focus_event_count\"        : " + this.focus_event_count        + ",\n";
  json += prefix + "    \"change_event_count\"       : " + this.change_event_count       + ",\n";
  json += prefix + "    \"click_event_count\"        : " + this.click_event_count        + ",\n";
  json += prefix + "    \"double_click_event_count\" : " + this.double_click_event_count + ",\n";
  json += prefix + "    \"drag_events_count\"        : " + this.drag_events_count        + ",\n";
  json += prefix + "    \"keyboard_events_count\"    : " + this.keyboard_events_count    + ",\n";
  json += prefix + "    \"load_event_count\"         : " + this.load_event_count         + ",\n";
  json += prefix + "    \"mouse_events_count\"       : " + this.mouse_events_count       + ",\n";
  json += prefix + "    \"pointer_events_count\"     : " + this.pointer_events_count     + ",\n";
  json += prefix + "    \"touch_events_count\"       : " + this.touch_events_count       + "\n";
  json += prefix + "  }\n";

  if (add_comma) json += prefix + "},\n";
  else json += prefix + "}\n";

  return json;

};
