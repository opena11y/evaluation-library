/*
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
/*                            DOMCache                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a DOMCache Object
 *
 * @param  {String}  url       - URL of the page being evaluated
 * @param  {String}  title     - The value of title property of the document being evaluated
 * @param  {Object}  document  - The document object reference of the document being evaluated
 *
 * @property {String}  nls       - NLS cache items for properties
 * @property {String}  url       - URL of the page being evaluated
 * @property {String}  base_url  - Base URL of the page being evaluated calculated from the URL
 * @property {String}  title     - The value of title property of the document being evaluated
 * @property {Object}  document  - The document object reference of the document being evaluated
 *
 * DOM cache element objects
 * @property {Object}  element_cache          - dom element cache for all elements
 * @property {Object}  element_with_id_cache  - dom element cache items with a defined id
 *
 * Specialize cache element objects
 * @property {Object}  abbreviations_cache       - Cache of abbreviation elements
 * @property {Object}  color_contrast_cache      - Cache of abbreviation items
 * @property {Object}  controls_cache            - Cache of form controls and widgets
 * @property {Object}  headings_landmarks_cache  - Cache of headings and abbreviations
 * @property {Object}  frames_cache              - Cache of frames and iframes
 * @property {Object}  images_cache              - Cache of image and area elements
 * @property {Object}  keyboard_focus_cache      - Cache of all interactive elements on a web page
 * @property {Object}  languages_cache           - Cache of language change items
 * @property {Object}  links_cache               - Cache of a and area elements
 * @property {Object}  lists_cache               - Cache of list elements
 * @property {Object}  media_cache               - Cache of media elements
 * @property {Object}  tables_cache              - Cache of table elements
 * @property {Object}  timing_cache              - Cache of elements with moving, flashing or auto-updating content
 *
 * @example
 *
 * var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, locale);
 * dom_cache.updateDOMElementCache();
 * dom_cache.updateAllCaches();
 */

OpenAjax.a11y.cache.DOMCache = function (url, title, document) {

 this.nls = OpenAjax.a11y.nls.Cache.getCacheNLS();

 this.url = url;
 this.base_url = this.url;
 this.has_body_element = false;

 var pos = this.base_url.lastIndexOf('/');
 if (pos >= 0) {
  this.base_url = this.base_url.substring(0,(pos+1));
 }
 else {
  this.base_url = this.base_url + "/";
 }

 this.title = title;
 this.document = document;
 this.lang = document.documentElement.getAttribute('lang');

};

/**
 * @method initCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Initialize specialized caches
 *    The specialized caches will be updated all at once or or when
 *    needed by a rule depending on how an evaluation is requested
 */

OpenAjax.a11y.cache.DOMCache.prototype.initCache = function () {

 this.element_with_id_cache = new OpenAjax.a11y.cache.DOMElementCache();
 this.element_cache         = new OpenAjax.a11y.cache.DOMElementCache();

 this.abbreviations_cache      = new OpenAjax.a11y.cache.AbbreviationsCache(this);
// this.color_contrast_cache     = new OpenAjax.a11y.cache.ColorContrastCache(this);
 this.text_cache               = new OpenAjax.a11y.cache.TextCache(this);
 this.controls_cache           = new OpenAjax.a11y.cache.ControlsCache(this);
 this.headings_landmarks_cache = new OpenAjax.a11y.cache.HeadingsLandmarksCache(this);
 this.frames_cache             = new OpenAjax.a11y.cache.FramesCache(this);
 this.images_cache             = new OpenAjax.a11y.cache.ImagesCache(this);
 this.keyboard_focus_cache     = new OpenAjax.a11y.cache.KeyboardFocusCache(this);
 this.languages_cache          = new OpenAjax.a11y.cache.LanguagesCache(this);
 this.links_cache              = new OpenAjax.a11y.cache.LinksCache(this);
 this.lists_cache              = new OpenAjax.a11y.cache.ListsCache(this);
 this.media_cache              = new OpenAjax.a11y.cache.MediaCache(this);
 this.tables_cache             = new OpenAjax.a11y.cache.TablesCache(this);
 this.timing_cache             = new OpenAjax.a11y.cache.TimingFlashingCache(this);

 this.frame_count = 0;
 this.iframe_count = 0;

 // Page information
 this.element_information         = new OpenAjax.a11y.cache.ElementInformation();

};

/**
 * @method isUpToDate
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Checks to see if the specified cache is up to date
 *
 * @param cache_name String Cache to update
 *
 * @return Object with two properties:
 *     o.up_to_date Boolean true if cache is up to date, otherwise false
 *     o.exists   Boolean true if cache exists, otherwise false
 */

OpenAjax.a11y.cache.DOMCache.prototype.isUpToDate = function (cache_name) {

 if (this[cache_name])
  return { up_to_date: this[cache_name].up_to_date, exists : true };
 else
  return { up_to_date: false, exists : false };

};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates the specified cache
 *
 * @param cache_name String name of the cache to update
 *
 * @return {Boolean} Returns true if cache is updated, false if cache does not exist
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateCache = function (cache_name) {

 if (this[cache_name]) {
  if (!this[cache_name].up_to_date) {
   this[cache_name].updateCache();
  }
  return true;
 }

 return false;

};

/**
 * @method traverseDOMElementsForAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates all the specialized caches at one time, in general this
 *    is faster than updating the caches individually based on the
 *    needs of rules, but may create caches that will not be used if
 *    some rules are disabled
 *
 * @param  dom_element            Object  Current DOMElement object being processed
 * @param  landmark_info          Object  LandmarkInfo object containing current landmark and heading information for tree representations
 * @param  heading_global_info    Object  HeadingInfo object containing current heading information used for heading nesting rules
 * @param  heading_landmark_info  Object  HeadingInfo object containing current heading information used for heading nesting rules
 * @param  table_info             Object  TableInfo object containing current table information for tree representations
 * @param  control_info           Object  ControlInfo object containing current control information for tree representations
 * @param  list_info              Object  Current LanguageElement object that contains the DOMElement
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.traverseDOMElementsForAllCaches = function (dom_element,
                                          landmark_info,
                                          heading_global_info,
                                          table_info,
                                          control_info,
                                          list_info,
                                          media_info,
                                          frame_info) {

 if (!dom_element) return;
 // if an element for through all the children elements looking for text

 if (dom_element.type == Node.ELEMENT_NODE) {
   // flag for testing for an HTML DOM versus a XML DOM
   if (dom_element.tag_name === 'body') this.has_body_element = true;

//  OpenAjax.a11y.logger.debug("[traverseDOMElementsForAllCaches][dom_element]: " + dom_element.tag_name + " " + dom_element.type);

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);

  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info, heading_global_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);
  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var li = this.lists_cache.updateCacheItems(dom_element, list_info);
  var mi = this.media_cache.updateCacheItems(dom_element, media_info);
  var fi = this.frames_cache.updateCacheItems(dom_element, frame_info);

//  if (dom_element.tag_name === 'h2')        OpenAjax.a11y.logger.debug("[traverseDOMElementsForAllCaches][dom_element]: " + dom_element);
//  if (dom_element.tag_name === 'input')     OpenAjax.a11y.logger.debug("[traverseDOMElementsForAllCaches][dom_element]: " + dom_element);
//  if (dom_element.tag_name === 'textarea')  OpenAjax.a11y.logger.debug("[traverseDOMElementsForAllCaches][dom_element]: " + dom_element);

  var children_length = dom_element.child_dom_elements.length;
  for (var i = 0; i < children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.child_dom_elements[i], hi, heading_global_info, ti, ci, li, mi, fi);
  } // end loop

  this.element_information.countElement(dom_element);

 } else {
   this.text_cache.updateCacheItems(dom_element);
   this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info, heading_global_info);
 }

};


/**
 * @method updateAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverses the DOMElements and
 *       calls the update function to see which specialized caches want information on this element
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateAllCaches = function () {
 var children = this.element_cache.child_dom_elements;
 var children_len = children.length;

  var hi = new OpenAjax.a11y.cache.LandmarkInfo(null);
  var hi_g = new OpenAjax.a11y.cache.HeadingInfo(null);
  var ti = new OpenAjax.a11y.cache.TableInfo(null);
  var ci = new OpenAjax.a11y.cache.ControlInfo(null);
  var li = new OpenAjax.a11y.cache.ListInfo(null);
  var mi = new OpenAjax.a11y.cache.MediaInfo();
  var fi = new OpenAjax.a11y.cache.FrameInfo(null);


  for (var i = 0; i < children_len; i++) {
    this.traverseDOMElementsForAllCaches(children[i], hi, hi_g, ti, ci, li, mi, fi);
  }

  this.controls_cache.calculateControlLabels();
  this.controls_cache.applyAriaOwns();

  this.keyboard_focus_cache.createKeyboardFocusCache();
  this.timing_cache.createTimingFlashingCache();

};

/**
 * @method updateDOMElementCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates a DOMElement object caches by traversing the DOM of the browser object
 *
 * @return DOMCache Object
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElementCache = function () {

 this.initCache();

 // add title information to DOMElement Cache

 this.addTitleDOMElement();

 // if the page contains a body element start there, since there are fewer elements to traverse
 if (this.document && this.document.body) {
  // OpenAjax.a11y.logger.debug("Creating DOM elements from body element");
  this.updateDOMElements(this.document.body, null, null);
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.logger.debug("Creating DOM elements with frames");
  this.updateDOMElements(this.document, null, null);
 }

 // Calculate aria-descriptions
 this.calculateDescriptions();

 return this;

};

/**
 * @method addTitleDOMElement
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Adds a DOMElement to represent a TITLE
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.addTitleDOMElement = function () {

  var n;
  var node;
  var de;
  var titles = this.document.getElementsByTagName('title');

  if (titles && titles.length && titles[0]) {

    node = titles[0];

    de = new OpenAjax.a11y.cache.DOMElement(node, null);

    this.document_has_title = true;

    de.addComputedStyle(null);
    de.calculateXPath(null);

    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);

    // get any text nodes associated with the title element
    for (n = node.firstChild; n !== null; n = n.nextSibling) {
      this.updateDOMElements( n, de, null);
    } // end loop

  }
  else {

    node = this.document.createElement('title');

    de = new OpenAjax.a11y.cache.DOMElement(node, null);

    this.document_has_title = false;

    de.addComputedStyle(null);
    de.xpath = "";

    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);

  }

};

/**
 * @method updateDOMElements
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverse document DOM and create a tree of DOMElement objects.
 *    The DOMElement objects will be used to generate more specific
 *    lists of elements without need to touch the document DOM.
 *    Additional information is collected on tables to be used in
 *    creating the table cache
 *
 * @param  {Object} node               - node is the current node object tbing analyzed
 * @param  {Object} parent_dom_element - DOMElement object that is the parent of the current node
 * @param  {Object} previous_sibling   - The DOMElement or DOMText object that is the previous sibling
 *
 * return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElements = function (node, parent_dom_element, previous_sibling) {


  var n;
  var de;
  var dom_element;

  switch (node.nodeType ) {

  case Node.DOCUMENT_NODE:
  case Node.DOCUMENT_TYPE_NODE:
    // OpenAjax.a11y.logger.debug("Document node type");
    break;

  case Node.ELEMENT_NODE:

    var tag_name = node.tagName.toLowerCase();

    if (tag_name === 'input' && tag_name === 'hidden') break;

    if (tag_name === 'body') dom_element = new OpenAjax.a11y.cache.DOMElement(node, parent_dom_element, this.document);
    else dom_element = new OpenAjax.a11y.cache.DOMElement(node, parent_dom_element, null);

    dom_element.addComputedStyle(parent_dom_element);

    dom_element.calculateXPath(parent_dom_element);
    this.element_cache.addDOMElement(dom_element);

    if (parent_dom_element) {
      parent_dom_element.has_element_children = true;
      parent_dom_element.addChild(dom_element);
    }
    else {
      this.element_cache.addChild(dom_element);
    }

//    if (dom_element.tag_name === 'h2')       OpenAjax.a11y.logger.debug("[updateDOMElements][ELEMENT_NODE][DOMElement]: " + dom_element);
//    if (dom_element.tag_name === 'input')    OpenAjax.a11y.logger.debug("[updateDOMElements][ELEMENT_NODE][DOMElement]: " + dom_element);
//    if (dom_element.tag_name === 'textarea') OpenAjax.a11y.logger.debug("[updateDOMElements][ELEMENT_NODE][DOMElement]: " + dom_element);


    if (dom_element.id && dom_element.id.length) {
      // use append so that document_order of the dom_element does not get updated

      de = this.element_with_id_cache.getDOMElementById(dom_element.id);

//      if (de) OpenAjax.a11y.logger.debug("[DOMCache][updateDOMElements] id 1: " + dom_element.id + " id 2:" + de.id + " " + (de === dom_element));

      if (de) {
        dom_element.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de.id_unique          = OpenAjax.a11y.ID.NOT_UNIQUE;
      }

      this.element_with_id_cache.dom_elements.push(dom_element);

    }

    switch (dom_element.tag_name) {

    case 'frame':
    case 'iframe':

      if (dom_element.tag_name === 'frame') this.frame_count += 1;
      else this.iframe_count += 1;

//      OpenAjax.a11y.logger.debug("[updateDOMElements]iframe][found]");

      try {
        var frame_doc = node.contentWindow.document;

        if (frame_doc && frame_doc.firstChild) {
          for (n = frame_doc.firstChild; n !== null; n = n.nextSibling) {
            this.updateDOMElements( n, dom_element, null);
          } // end loop
        }
      } catch (e) {
//        OpenAjax.a11y.logger.debug("[updateDOMElements][iframe][error]: " + e);
      }

      break;

    default:
      break;

    } // end switch

    var ps = null;

    for (n = node.firstChild; n !== null; n = n.nextSibling ) {
      ps = this.updateDOMElements(n, dom_element, ps);
    } // end loop

    return dom_element;

  case Node.TEXT_NODE:
   // OpenAjax.a11y.logger.debug("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);

   if (dom_text.text_length) {

     if (!previous_sibling || previous_sibling.type != Node.TEXT_NODE) {

       this.element_cache.addDOMText(dom_text);
       if (parent_dom_element) parent_dom_element.addChild(dom_text);
       return dom_text;

     } else {

       if (previous_sibling) previous_sibling.addText(dom_text.text);

       return previous_sibling;
     }
   }
   else {
     return previous_sibling;
   }

  default:
    break;
  } // end switch

  return null;

};


/**
 * @method calculateDescriptions
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description if a element has an aria-describedby attribute defined
 */

OpenAjax.a11y.cache.DOMCache.prototype.calculateDescriptions = function () {

  var de;
  var dom_elements     = this.element_cache.dom_elements;
  var dom_elements_len = dom_elements.length;

  for (var i = 0; i < dom_elements_len; i++ ) {
    de = dom_elements[i];

    if (typeof de.aria_describedby === 'string' && de.aria_describedby.length && !de.calculated_aria_description) {
      de.calculated_aria_description    = this.getTextFromIDs(de.aria_describedby);
      de.undefined_aria_describedby_ids = this.getUndefinedIDs(de.aria_describedby);
    }
  }
};

/**
 * @method getNameForLink
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a computed accessible name for a link, using ARIA properties if defined
 *
 * @param {LinkElement} link - Link element object
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameForLink = function (link) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var computed_label = "";
  var computed_label_source = SOURCE.NONE;
  var de = link.dom_element;

  if (de.has_aria_labelledby) {
    computed_label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    computed_label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else if (de.has_aria_label) {
    computed_label = de.aria_label;
    computed_label_source = SOURCE.ARIA_LABEL;
  }
  else if (de.has_title) {
    computed_label = de.title;
    computed_label_source = SOURCE.TITLE_ATTRIBUTE;
  }
  else {
    computed_label = de.getText();
    computed_label_source = SOURCE.TEXT_CONTENT;
  }

  link.accessible_name                = computed_label;
  link.accessible_name_for_comparison = OpenAjax.a11y.util.normalizeSpace(computed_label.toLowerCase());
  link.accessible_name_length         = computed_label.length;
  link.accessible_name_source         = computed_label_source;

  this.getDescriptionFromARIADescribedby(link);
};


/**
 * @method getCaptionForTable
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a computed caption and summary for a table element, using ARIA properties if defined
 *
 * @param {TableElement} table   - Table element object
 * @param {CaptionElement}       - Caption element object (can be null)
 */

OpenAjax.a11y.cache.DOMCache.prototype.getAccessibleNameDescriptionForTable = function (table, caption) {

  var SOURCE             = OpenAjax.a11y.SOURCE;
  var DESCRIPTION_SOURCE = OpenAjax.a11y.DESCRIPTION_SOURCE;

  var de = table.dom_element;

  if (!caption || caption.accessible_name_for_comparison === "") {

    if (de.has_aria_labelledby) {
      table.accessible_name        = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
      table.accessible_name_source = SOURCE.ARIA_LABELLEDBY;
    }
    else if (de.has_aria_label) {
      table.accessible_name        = de.aria_label;
      table.accessible_name_source = SOURCE.ARIA_LABEL;
    }
    else {
      if (de.has_summary) {
        table.accessible_name        = de.summary;
        table.accessible_name_source = SOURCE.TABLE_SUMMARY;
      }
      else {
        if (de.has_title) {
          table.accessible_name        = de.title;
          table.accessible_name_source = SOURCE.TITLE_ATTRIBUTE;
        }
      }
    }
  }
  else {
    table.accessible_name        = caption.accessible_name;
    table.accessible_name_source = SOURCE.TABLE_CAPTION;
  }

  table.accessible_name_for_comparison = OpenAjax.a11y.util.normalizeSpace(table.accessible_name.toLowerCase());
  table.accessible_name_length         = table.accessible_name_for_comparison.length;

  // now look for accessible description

//  OpenAjax.a11y.logger.debug("[getAccessibleNameDescriptionForTable]        name: " + table.accessible_name);
//  OpenAjax.a11y.logger.debug("[getAccessibleNameDescriptionForTable]      source: " + table.accessible_name_source);
//  OpenAjax.a11y.logger.debug("[getAccessibleNameDescriptionForTable] has_summary: " + de.has_summary);
//  OpenAjax.a11y.logger.debug("[getAccessibleNameDescriptionForTable]     summary: " + de.summary);


  if ((table.accessible_name_source === SOURCE.TABLE_CAPTION) ||
      (table.accessible_name_source === SOURCE.ARIA_LABELLEDBY) ||
      (table.accessible_name_source === SOURCE.ARIA_LABEL)) {

    if (de.has_summary) {
      table.accessible_description        = de.summary;
      table.accessible_description_source = DESCRIPTION_SOURCE.TABLE_SUMMARY;
    }
    else {
      if (de.has_title) {
        table.accessible_description = de.title;
        table.accessible_description_source = DESCRIPTION_SOURCE.TITLE_ATTRIBUTE;
      }
      else {
        table.accessible_description = this.getDescriptionFromARIADescribedby(table);
        if (table.accessible_description.length) table.accessible_description_source = DESCRIPTION_SOURCE.ARIA_DESCRIBEDBY;
      }
    }
  }
  else {
    if (table.accessible_name_source === SOURCE.TABLE_SUMMARY) {
      if (de.has_title) {
        table.accessible_description = de.title;
        table.accessible_description_source = DESCRIPTION_SOURCE.TITLE_ATTRIBUTE;
      }
      else {
        table.accessible_description = this.getDescriptionFromARIADescribedby(table);
        if (table.accessible_description.length) table.accessible_description_source = DESCRIPTION_SOURCE.ARIA_DESCRIBEDBY;
      }
    }
    else {
      table.accessible_description = this.getDescriptionFromARIADescribedby(table);
      if (table.accessible_description.length) table.accessible_description_source = DESCRIPTION_SOURCE.ARIA_DESCRIBEDBY;
    }
  }

  table.accessible_description_for_comparison = OpenAjax.a11y.util.normalizeSpace(table.accessible_description.toLowerCase());
  table.accessible_description_length         = table.accessible_description_for_comparison.length;


};

/**
 * @method getNameFromARIALabel
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a computed label and accessible name based on ARIA properties
 *
 * @param {Object} control           - Control cache element object
 * @param {String} prefix            - Used to include role in the accessible label for landmarks and widgets
 * @param {Boolean} only_when_label  - Only add prefix if there is a label defined (i.e. for REGION landmark)
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameFromARIALabel = function (control, prefix, only_when_label) {

  if (typeof prefix !== 'string') prefix = "";
  else prefix += " ";

  if (typeof only_when_label !== 'boolean') only_when_label = false;

  var SOURCE = OpenAjax.a11y.SOURCE;

  var computed_label = "";
  var computed_label_source = SOURCE.NONE;
  var de = control.dom_element;
  var wi = de.role_info;

  if (de.aria_labelledby) {
    computed_label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    computed_label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else if (de.aria_label) {
    computed_label = de.aria_label;
    computed_label_source = SOURCE.ARIA_LABEL;
  }
  else if (wi && wi.nameFromContent) {
    computed_label = de.getText();
    computed_label_source = SOURCE.TEXT_CONTENT;
  } else if (de.title) {
    computed_label = de.title;
    computed_label_source = SOURCE.TITLE_ATTRIBUTE;
  }

  if ((only_when_label && computed_label.length) ||
      !only_when_label) {
    computed_label = prefix + computed_label;
  }

  control.computed_label = computed_label;
  control.computed_label_length = computed_label.length;
  control.computed_label_source = computed_label_source;
  control.computed_label_for_comparison = OpenAjax.a11y.util.normalizeSpace(computed_label);
  control.accessible_name = computed_label;

  this.getDescriptionFromARIADescribedby(control);
};

/**
 * @method getDescriptionFromARIADescribedby
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description based on ARIA properties
 *
 * @param {Object} element - Cache element object
 *
 * @return  {String} Description string, if no aria-describedby the string is empty
 */

OpenAjax.a11y.cache.DOMCache.prototype.getDescriptionFromARIADescribedby = function (element) {

  var de = element.dom_element;
  if (typeof de === 'undefined') de = element;

  if (de && de.aria_describedby) {
    element.accessible_description = this.element_with_id_cache.getTextFromIds(de.aria_describedby);
    element.accessible_description_for_comparison = OpenAjax.a11y.util.normalizeSpace(element.accessible_description.toLowerCase());
  }
  else {
    element.accessible_description = "";
    element.accessible_description_for_comparison = "";
  }

  return element.accessible_description;

};


/**
 * @method getTextFromIDs
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Returns the text content of the elements identified in the list of ids
 *
 * @param {String}  ids  An string with space separated ids
 *
 * @return String
 */

OpenAjax.a11y.cache.DOMCache.prototype.getTextFromIDs = function (ids) {

  if (!ids || ids.length === 0) return "";

  return this.element_with_id_cache.getTextFromIds(ids);

};

/**
 * @method getUndefinedIDs
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Returns the text content of the elements identified in the list of ids
 *
 * @param {String}  ids  An string with space separated ids
 *
 * @return {String} A string of the invalid ids, string is empty if all valid
 */

OpenAjax.a11y.cache.DOMCache.prototype.getUndefinedIDs = function (ids) {

  if (!ids || ids.length === 0) return "";

  return this.element_with_id_cache.getUndefinedIds(ids);

};


/**
 * @method sortArrayOfObjects
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Sort an array of objects by one of its properties and marks any properties that are duplicates
 *
 * @param {Array}   objects   - Array of objects to sort
 * @param {String}  property  - Text string of property to sort
 * @param {Boolean} ascending - True sort by ascending values otherwise sort by descending values
 *
 * @return Array of sorted objects
 */

OpenAjax.a11y.cache.DOMCache.prototype.sortArrayOfObjects = function(objects, property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;
  var return_objects = [];

  if( !objects && objects.length && !objects[0][property] ) {
    return return_objects;
  } // endif

  var objects_len = objects.length;

  for (i = 0; i < objects_len; i++) {
    return_objects[i] = objects[i];
    return_objects[i].duplicate = false;
  }

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < objects_len; i++ ) {
        if (return_objects[i-1][property] > return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        }
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < objects_len; i++) {
        if (return_objects[i-1][property] < return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        }
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }
        }
      } // end loop
    } while (swapped);
  }

  return return_objects;

};

/**
 * @method getDuplicateObjects
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Get duplicate objects in an array based on one of its properties and marks any properties that are duplicates
 *       Algorithm assumes that the object list is sorted by the property, so objects with duplicate properties are adjacent
 *       to each other
 *
 * @param {Array}   objects   - Array of objects to sort
 * @param {String}  property  - Text string of property to sort
 *
 * @return [Array][Array] of duplicate objects
 */

OpenAjax.a11y.cache.DOMCache.prototype.getDuplicateObjects = function(objects, property) {

  if( !objects && objects.length && !objects[0][property] ) {
    return return_objects;
  } // endif

  var return_objects = [];
  var objects_len = objects.length;

  var i = 0;
  var j = 0;
  var k = 1;
  while (k < objects_len) {
    return_objects.push([objects[j]]);

    if (objects[j][property] === objects[k][property]) {
      while ((k < objects_len) &&
             (objects[j][property] === objects[k][property])) {
        return_objects[i].push(objects[k]);
        k++;
      }

    }
    j = k;
    k++;
    i++;
  }


  return return_objects;

};



