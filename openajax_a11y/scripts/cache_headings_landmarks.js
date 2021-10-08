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

/* ---------------------------------------------------------------- */
/*            OpenAjax Heading and Landmark Cache                   */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/*                    LandmarkInfo Object                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc LandmarkInfo is the constructor for information related to landmarks
 *       in building the headings/landmark cache
 *
 * @param {LandmarkInfo}  landmark_info - Current landmark (if any)
 *
 * @property {LandmarkElement}  landmark_element         - parent landmark element
 * @property {LandmarkElement}  main_element             - parent main landmark element
 * @property {SectionElement}   html5_sectioning_element - parent HTML5 sectioning element
 * @property {Object}           page_element             - page object element
 * @property {Object}           body_element             - body element page object element
 * @property {Object}           iframe_element           - iframe object element
 * @property {Object}           inside_sectioning_element - True if inside a sectioning element
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
    this.main_element     = landmark_info.main_element;
    this.page_element     = landmark_info.page_element;
    this.body_element     = landmark_info.body_element;
    this.iframe_element   = landmark_info.iframe_element;
    this.html5_sectioning_element      = landmark_info.html5_sectioning_element;
    this. inside_sectioning_element    = landmark_info.inside_sectioning_element;
  }
  else {
    this.landmark_element              = null;
    this.main_element                  = null;
    this.page_element                  = null;
    this.body_element                  = null;
    this.iframe_element                = null;
    this.html5_sectioning_element      = null;
    this.inside_sectioning_element    = false;

  }

};

/**
 * @constructor HeadingInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc HeadingInfo is the constructor for information related to heading nesting
 *       in building the headings/landmark cache
 *
 * @param {HeadingInfo}  heading_info - Current heading information (if any)
 *
 * @property {HeadingElement}  nesting_h1  - Visible heading object at H1 level
 * @property {HeadingElement}  nesting_h2  - Visible heading object at H2 level
 * @property {HeadingElement}  nesting_h3  - Visible heading object at H3 level
 * @property {HeadingElement}  nesting_h4  - Visible heading object at H4 level
 * @property {HeadingElement}  nesting_h5  - Visible heading object at H5 level
 */

OpenAjax.a11y.cache.HeadingInfo = function (heading_info) {

  if (heading_info) {
    this.is_past_first_h1 = heading_info.is_past_first_h1;
    this.nesting_h1       = heading_info.nesting_h1;
    this.nesting_h2       = heading_info.nesting_h2;
    this.nesting_h3       = heading_info.nesting_h3;
    this.nesting_h4       = heading_info.nesting_h4;
    this.nesting_h5       = heading_info.nesting_h5;
  }
  else {
    this.is_past_first_h1 = false;
    this.nesting_h1       =  null;
    this.nesting_h2       =  null;
    this.nesting_h3       =  null;
    this.nesting_h4       =  null;
    this.nesting_h5       =  null;
  }

};

/* ---------------------------------------------------------------- */
/*                     HeadingsLandmarksCache                       */
/* ---------------------------------------------------------------- */

/**
 * @constructs HeadingsLandmarksCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc HeadingsLandmarksCache is the constructor for lists of heading and landmrk element objects and
 *       the root of a tree representation of the landmark and heading element relationships
 *
 * @param {DOMCache}  dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}  child_cache_elements  - Root array of the tree representation of the landmarks and headings in the document
 *
 * @property {Array}   landmark_elements        - List of all the landmark elements in the document
 * @property {String}  landmarks_sort_property  - Name of the landmark element property the landmark elements array is currently sorted
 * @property {Number}  landmark_length          - The length of the landmark elements list, used in calculating cache id values
 *
 * @property {Array}   heading_elements        - List of all the heading elements in the document
 * @property {String}  headings_sort_property  - Name of the heading element property the heading elements array is currently sorted
 * @property {Number}  heading_length          - The length of the heading elements list, used in calculating cache id values
 *
 * @property {Array}   section_elements        - List of all the HTML5 sectioning elements in the document
 * @property {Number}  section_length          - The length of the HTML5 sectioning elements list, used in calculating cache id values
 *
 * @property {Array}   elements_with_content   - List of content elements and text nodes outside of landmarks
 *
 * @property {Array}   main_elements  - List of all the main landmark elements in the document
 * @property {Number}  main_length    - The length of the main landmark elements list, used in calculating cache id values
 *
 * @property {Array}   h1_elements    - List of all the h1 heading elements in the document
 * @property {Number}  h1_length      - The length of the main landmark elements list, used in calculating cache id values
 *
 * @property {Boolean}  has_main_landmarks  - True if document contians at lewast one main landmark, otherwise false
 * @property {Boolean}  has_title           - Title element is defined in the document
 *
 * @property {TitleElement} title_element  - The title element is used as a placeholder for title rule results
 * @property {PageElementHeadingsLandmarks}  page_element   - The body element is used as a placeholder rule results for items missing in a document like H1 elements and Main landmarks
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache = function (dom_cache) {

  this.dom_cache = dom_cache;

  this.up_to_date    = false;

  this.child_cache_elements   = [];

  this.landmark_elements = [];
  this.landmarks_sort_property = 'document_order';
  this.landmark_length  = 0;

  this.heading_elements = [];
  this.headings_sort_property  = 'document_order';
  this.heading_length  = 0;

  this.section_elements = [];
  this.all_section_elements = [];

  this.elements_with_content = [];

  this.main_elements = [];
  this.main_length   = 0;

  this.h1_elements   = [];
  this.h1_length     = 0;

  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

  this.title_element = null;
  this.page_element  = null;

  this.iframe_elements = [];

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Adds a landmark or header element object to the root level of a tree of landmark/heading elements
 *
 * @param {LandmarkElement | HeadingElement} child_element - Landmark or heading element object to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  }

};

/**
 * @method addLandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a landmark element object to the heading elements list
 *
 * @param  {LandmarkElement} heading_element  - Landmark element object to a landmark elements list
 *
 * @return {Number} Returns the length of the landmark elements list
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addLandmarkElement = function (landmark_element) {

  if (landmark_element) {
    var de = landmark_element.dom_element;

    this.landmark_length = this.landmark_length + 1;
    landmark_element.document_order = this.landmark_length;
    landmark_element.cache_id = "landmark_" + this.landmark_length;
    this.landmark_elements.push(landmark_element);

  }


  return this.landmark_length;
};

/**
 * @method addHeadingElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a heading element object to the heading elements list
 *
 * @param  {HeadingElement} heading_element  - HeadingElement object to a heading_elements array
 *
 * @return {Number} Returns the length of the heading elements list
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addHeadingElement = function (heading_element) {

  if (heading_element) {
    this.heading_length = this.heading_length + 1;
    heading_element.document_order = this.heading_length;
    heading_element.cache_id = "heading_" + this.heading_length;
    this.heading_elements.push(heading_element);
  }
  return this.heading_length;
};

/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Adds a main landmark or h1 heading element object to the root level of a tree of title and main elements
 *
 * @param {MainElement | H1Element}  child_element - Main landmark or h1 heading element object to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildMainElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  }

};

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a h1 element object to the h1 heading elements list
 *
 * @param  {H1Element}  h1_element  -  h1 heading element to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addH1Element = function (h1_element) {

  if (h1_element && h1_element.main_type === OpenAjax.a11y.MAIN.H1_ELEMENT) {
    this.h1_length = this.h1_length + 1;
    h1_element.document_order = this.h1_length;
    h1_element.cache_id = "h1_" + this.h1_length;
    this.h1_elements.push(h1_element);
  }

};

/**
 * @method addMainElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc    Adds a main, h1 or title element object to the main_elements array and cacluates a cache id value
 *
 * @param  {MainElement | H1Element | TitleElement | PageElementHeadingsLandmarks}  main_element  Main, h1 heading or title element object to add
 *
 * @return  {Number}  length is the number of elements in the main_elements list
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addMainElement = function (main_element) {

  if (main_element) {
    this.main_length = this.main_length + 1;
    main_element.document_order = this.main_length;
    main_element.cache_id = "main_" + this.main_length;
    this.main_elements.push(main_element);
  }

  return this.length;
};


/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark or heading element object with the cache id value
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | HeadingElement | null} Returns a landmark element object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var elements_with_content     = this.elements_with_content;
  var elements_with_content_len = elements_with_content.length;
  var item = null;

  item = this.getLandmarkElementByCacheId(cache_id);
  if (item) return item;

  item = this.getHeadingElementByCacheId(cache_id);
  if (item) return item;

  for (i = 0; i < elements_with_content_len; i++) {
    item = this.elements_with_content[i];
    if (item.cache_id == cache_id) return item;
  }

  return item;

};

/**
 * @method getLandmarkElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark element object with the cache id value
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | null} Returns a landmark element object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getLandmarkElementByCacheId = function (cache_id) {

  var i;
  var landmark_elements_len = this.landmark_elements.length;

  if (cache_id) {
    for (i=0; i<landmark_elements_len; i++) {
      if (this.landmark_elements[i].cache_id == cache_id) {
        return this.landmark_elements[i];
      }
    } // end loop
  }
 return null;
};

/**
 * @method getHeadingElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the heading element object with the cache id value
 *
 * @param  {String}  cache_id  - cache id of a heading element object
 *
 * @return  {HeadingElement | null}  Returns a heading object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getHeadingElementByCacheId = function (cache_id) {

  var i;
  var heading_elements_len = this.heading_elements.length;

  if (cache_id) {
    for (i=0; i<heading_elements_len; i++) {
      if (this.heading_elements[i].cache_id == cache_id) {
        return this.heading_elements[i];
      }
    } // end loop
  }

  return null;
};

/**
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Empties the landmark and headings cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.initCache = function () {

  this.child_cache_elements  = [];

  this.up_to_date = false;

  this.landmark_elements = [];
  this.landmark_length = 0;
  this.landmarks_sort_property = 'document_order';

  this.section_elements = [];

  this.heading_elements = [];
  this.heading_length = 0;
  this.headings_sort_property = 'document_order';


  this.main_elements = [];
  this.main_length   = 0;

  this.h1_elements   = [];
  this.h1_length     = 0;

  this.page_element = null;

  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

  this.iframe_elements = [];

};

/**
 * @method getListOfSectionElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Returns a list of section element in the document
 *
 * @return {Array}  Returns array of section element objects
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getListOfSectionElements = function () {

  function getChildren(ses) {

    var len = ses.length;

    for (var i = 0; i < len; i++) {
      var se = ses[i];
      list.push(se);
      getChildren(se.child_cache_elements);
    }

  }

  var list = [];

  getChildren(this.section_elements);

  return list;


};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Updates the landmarks and headings cache by checking to see if a DOMElement
 *          should be added
 *
 * @param  {DOMElement}    dom_element    - DOMElement object to check for inclusion in links cache
 * @param  {LandmarkInfo}  landmark_info  - Information about the current landmarks that are parents to this item
 * @param  {HeadingInfo}   heading_info   - Information about the current headers used for nesting rules
 *
 * @return {LandmarkInfo}  Returns updated landmark info object
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCacheItems = function (dom_element, landmark_info, heading_info) {

  var me;
  var le;
  var he;
  var se;
  var li = new OpenAjax.a11y.cache.LandmarkInfo(landmark_info);
  var tag_name = dom_element.tag_name;

  if (typeof landmark_info.landmark_element === 'object') {
    dom_element.parent_landmark = landmark_info.landmark_element;
  } else {
    dom_element.parent_landmark = null;
  }

  if (typeof landmark_info.body_element === 'object') {
    dom_element.body_element    = landmark_info.body_element;
  } else {
    dom_element.body_landmark = null;
  }

//  OpenAjax.a11y.logger.debug("Body Element: " +  dom_element.body_element);

  if (dom_element.type == Node.ELEMENT_NODE) {

//    if (!landmark_info.inside_sectioning_element) OpenAjax.a11y.logger.debug("inside sectioning element: " +  landmark_info.inside_sectioning_element + " : " + dom_element.tag_name);

    switch(tag_name) {

      case 'article':
      case 'aside':
      case 'main':
      case 'nav':
      case 'section':
        li.inside_sectioning_element = true;
        break;

      default:
        break;
    }


    // Collect section elements for role restriction rules
    switch(tag_name) {

      case 'address':
      case 'article':
      case 'aside':
      case 'body':
      case 'footer':
      case 'header':
      case 'nav':
      case 'section':

//        OpenAjax.a11y.logger.debug("Section Element: " + tag_name + " (" + this.section_elements.length + " , " + this.getListOfSectionElements().length + ")" );

        se = new OpenAjax.a11y.cache.SectionElement(dom_element);

        this.all_section_elements.push(se);

        if (landmark_info.html5_sectioning_element) landmark_info.html5_sectioning_element.addChildElement(se);
        else this.section_elements.push(se);

        li.html5_sectioning_element = se;

        break;

      default:
        break;

    }

    if (!dom_element.is_landmark &&
        (tag_name == 'h1')) {

      this.has_h1_elements = true;

      he = new OpenAjax.a11y.cache.H1Element(dom_element, landmark_info.main_element);

      this.addH1Element(he);
      this.addHeadingElement(he);

      if (landmark_info.main_element) {
        landmark_info.main_element.addH1Element(he);
      }

      if (landmark_info.landmark_element) {
        landmark_info.landmark_element.addChildElement(he);
      }
      else {
        this.addChildElement(he);
      }

      he.isH1UsedAsLabelForMainRole();

      if ((dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE) &&
            he.name_for_comparison.length) {

        heading_info.is_past_first_h1 = true;
        heading_info.nesting_h1       = he;
        heading_info.nesting_h2       = null;
        heading_info.nesting_h3       = null;
        heading_info.nesting_h4       = null;
        heading_info.nesting_h5       = null;

        if (li.landmark_element) {

          var hi = li.landmark_element.heading_info;

          hi.nesting_h1 = he;
          hi.nesting_h2 = null;
          hi.nesting_h3 = null;
          hi.nesting_h4 = null;
          hi.nesting_h5 = null;

        }
      }


      return li;
    }

    if (!dom_element.is_landmark && (
        (tag_name == 'h2') ||
        (tag_name == 'h3') ||
        (tag_name == 'h4') ||
        (tag_name == 'h5') ||
        (tag_name == 'h6'))) {

      he = new OpenAjax.a11y.cache.HeadingElement(dom_element, landmark_info, heading_info);

      this.addHeadingElement(he);

      if (landmark_info.landmark_element) {
        landmark_info.landmark_element.addChildElement(he);
      }
      else {
        this.addChildElement(he);
      }

      if ((dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE) &&
          he.name_for_comparison.length) {

        switch (tag_name) {

        case 'h2':
          heading_info.nesting_h2 = he;
          heading_info.nesting_h3 = null;
          heading_info.nesting_h4 = null;
          heading_info.nesting_h5 = null;

          if (li.landmark_element) {

            li.landmark_element.heading_info.nesting_h2 = he;
            li.landmark_element.heading_info.nesting_h3 = null;
            li.landmark_element.heading_info.nesting_h4 = null;
            li.landmark_element.heading_info.nesting_h5 = null;
          }
          break;

        case 'h3':
          heading_info.nesting_h3 = he;
          heading_info.nesting_h4 = null;
          heading_info.nesting_h5 = null;

          if (li.landmark_element) {

            li.landmark_element.heading_info.nesting_h3 = he;
            li.landmark_element.heading_info.nesting_h4 = null;
            li.landmark_element.heading_info.nesting_h5 = null;
          }
          break;

        case 'h4':
          heading_info.nesting_h4 = he;
          heading_info.nesting_h5 = null;

          if (li.landmark_element) {
            li.landmark_element.heading_info.nesting_h4 = he;
            li.landmark_element.heading_info.nesting_h5 = null;
          }
          break;

        case 'h5':
          heading_info.nesting_h5 = he;

          if (li.landmark_element) {
            li.landmark_element.heading_info.nesting_h5 = he;
          }
          break;

        default:
          break;
        }
      }

      return li;
    }

    if (dom_element.is_landmark ||
        (dom_element.tag_name === 'aside' && !dom_element.has_role) ||
//         (dom_element.tag_name === 'form' && !dom_element.has_role) ||
        (dom_element.tag_name === 'main' && !dom_element.has_role) ||
        (dom_element.tag_name === 'nav' && !dom_element.has_role) ||
        (((dom_element.tag_name === 'section' || dom_element.tag_name === 'form') && !dom_element.has_role) &&
         (dom_element.has_aria_label ||
          dom_element.has_aria_labelledby ||
          dom_element.has_title)) ||
        (!landmark_info.inside_sectioning_element && (
         (dom_element.tag_name === 'footer' && !dom_element.has_role)) ||
         (dom_element.tag_name === 'header' && !dom_element.has_role))) {

      if (dom_element.role == 'main' || (dom_element.tag_name === 'main'  && !dom_element.has_role)) {

        this.has_main_landmarks = true;

        me = new OpenAjax.a11y.cache.MainElement(dom_element, dom_element);

        this.dom_cache.getNameFromARIALabel(me, "MAIN");

        this.addLandmarkElement(me);
        this.addMainElement(me);

        if (landmark_info.landmark_element) {
          landmark_info.landmark_element.addChildElement(me);
        }
        else {
          this.addChildElement(me);
        }

        li.landmark_element = me;
        li.main_element     = me;

        return li;
      }
      else {


        if (dom_element.has_role) {
          le = new OpenAjax.a11y.cache.LandmarkElement(dom_element);
          this.dom_cache.getNameFromARIALabel(le, dom_element.role.toUpperCase());
        }
        else {

          switch (dom_element.tag_name) {

          case 'aside':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'complementary');
            this.dom_cache.getNameFromARIALabel(le, "COMPLEMENTARY");
            break;

          case 'footer':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'contentinfo');
            this.dom_cache.getNameFromARIALabel(le, "CONTENTINFO");
            break;

          case 'form':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'form');
            this.dom_cache.getNameFromARIALabel(le, "FORM", true);
            break;

          case 'header':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'banner');
            this.dom_cache.getNameFromARIALabel(le, "BANNER");
            break;

          case 'nav':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'navigation');
            this.dom_cache.getNameFromARIALabel(le, "NAVIGATION");
            break;

          case 'section':
            le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, 'region');
            this.dom_cache.getNameFromARIALabel(le, "REGION", true);
            break;

          default:
            break;

          }
        }

        this.addLandmarkElement(le);

        if (landmark_info.landmark_element) {
          landmark_info.landmark_element.addChildElement(le);
        }
        else {
          this.addChildElement(le);
        }

        li.landmark_element = le;

        return li;
      }
    }

    if (tag_name == 'title' && !this.has_title) {

      me = new OpenAjax.a11y.cache.TitleElement(dom_element);

      // There is only one title for a document, even when there are frames and iframes
      this.has_title = true;

      this.title_element = me;

      return li;
    }

    if (tag_name == 'body' && !this.page_element) {

      me = new OpenAjax.a11y.cache.PageElementHeadingsLandmarks(dom_element, this.title_element);

      // There is only one body element for a document, even when there are frames and iframes
      this.page_element = me;

      return li;
    }



    // elements that contain rendered content without having child dom text nodes
    if ((tag_name == 'area')     ||
        (tag_name == 'canvas')   ||
        (tag_name == 'input')    ||
        (tag_name == 'img')      ||
        (tag_name == 'textarea') ||
        (tag_name == 'select')) {

      if (!((tag_name == 'input') &&  (dom_element.input_type == 'hidden'))) {
        this.elements_with_content.push(dom_element);
        if (dom_element.parent_landmark) dom_element.parent_landmark.addToElementCount(1);
      }

      return li;
    }

    // elements that may have rendered content without having child dom text nodes
    if ((tag_name === 'applet')   ||
        (tag_name === 'embed')    ||
        (tag_name === 'object')) {
      dom_element.may_have_renderable_content = true;
      this.elements_with_content.push(dom_element);

//      OpenAjax.a11y.logger.debug("Parent Element: " +  dom_element.parent_landmark + " (" + dom_element + ")");

      if (dom_element.parent_landmark) dom_element.parent_landmark.addToElementCount(1);

      return li;
    }

    // Keep track of iframe elements
    if ((tag_name == 'iframe')) {
      this.iframe_elements.push(dom_element);
      li.iframe_element = dom_element;
      return li;
    }

    // Keep track of body elements
    if ((tag_name == 'body')) {
      li.body_element = dom_element;
      return li;
    }


  }
  else {
    tag_name = dom_element.parent_element.tag_name;
    if (tag_name != 'title'  &&
        tag_name != 'script' &&
        tag_name != 'style'  &&
        dom_element.text_length) {
      this.elements_with_content.push(dom_element);

//      OpenAjax.a11y.logger.debug("Parent Element: " +  dom_element.parent_landmark + " (" + dom_element + ")");

      if (dom_element.parent_landmark) dom_element.parent_landmark.addToElementCount(1);

    }
  }

  return li;

};

/**
 * @method traverseDOMElementsForLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses DOMElement objects in the tree to update the landmarks and headings cache
 *
 * @param  {DOMElement}    dom_element - DOMElement object to check for inclusion in landmarks and headings cache
 * @param  {LandmarkInfo}  landmark_info  - Information about the current landmarks that are parents to this item
 * @param  {HeadingInfo}   heading_info   - Information about the current headers used for nesting rules
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.traverseDOMElementsForLandmarkElements = function (dom_element, landmark_info, heading_info) {

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    var li = this.updateCacheItems(dom_element, landmark_info, heading_info);

    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForLandmarkElements(dom_element.child_dom_elements[i], li);
    }
  }
};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses the DOMElements to update the landmarks and heading cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the landmark and headings cache are disabled, this
 *       cache would not be updated
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCache = function () {
  var i;
  var li;
  var hi;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;

  this.initCache();

  li = new OpenAjax.a11y.cache.LandmarkInfo(null);
  hi = new OpenAjax.a11y.cache.HeadingInfo(null);

  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLandmarkElements(children[i], li, hi);
  }

  this.up_to_date = true;
};


/**
 * @method sortLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc    Sorts the landmark elements list based on a property of the landmark element object
 *
 * @param   {String}   property   - LandmarkElement object property used to sort the cache
 * @param   {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  Return true if list was sorted; false was not sorted due to an error
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortLandmarkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.landmark_elements && this.landmark_elements.length && !this.landmark_elements[0][property] ) {
    return false;
  } // endif

  var landmark_elements_len = this.landmark_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++ ) {
        if (this.landmark_elements[i-1][property] > this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++) {
        if (this.landmark_elements[i-1][property] < this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }

  this.landmark_sort_property = property;

  return true;

};

/**
 * @method sortHeadingElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Sorts the heading_elements array based on a property of the HeadingElement object
 *
 * @param {String}   property   - HeadingElement object property used to sort the cache
 * @param {Boolean}  ascending  -  true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  true if list was sorted, false if not
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortHeadingElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.heading_elements && this.heading_elements.length && !this.heading_elements[0][property] ) {
    return false;
  } // endif

  var heading_elements_len = this.heading_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < heading_elements_len; i++ ) {
        if (this.heading_elements[i-1][property] > this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        }
      } // end loop

    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < heading_elements_len; i++) {

        if (this.heading_elements[i-1][property] < this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }

  this.heading_sort_property = property;

  return true;

};

/* ---------------------------------------------------------------- */
/*                       SectionElement                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor SectionElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a section element object used to hold information about an HTML5 section element
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the landmark element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the landmark element
 *
 * @property  {Array}  child_cache_elements  - Array of child cache section element objects as part of section element tree
 */

OpenAjax.a11y.cache.SectionElement = function (dom_element) {

  this.dom_element           = dom_element;

  this.child_cache_elements  = [];

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Adds a LandmarkElement or HeaderElement object to the tree of landmark/heading elements
 *
 * @param {LandmarkElement | HeadingElement}  child_element  - Landmark element or heading element object to add
 */

OpenAjax.a11y.cache.SectionElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_cache_elements.push(child_element);
  }

};


/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SectionElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.SectionElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.SectionElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'elements_with_content_count');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.SectionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.SectionElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.SectionElement
 *
 * @desc Returns a text string representation of the section element
 *
 * @return {String} Returns string represention the section element object
 */

OpenAjax.a11y.cache.SectionElement.prototype.toString = function () {
 var de = this.dom_element;
 var s = de.tag_name;
 if (de.has_role) s = de.tag_name + "[role=" + de.role + "]";
 if (this.accessible_name && this.accessible_name.length) s += ": " + this.accessible_name;

 return s;
};



/* ---------------------------------------------------------------- */
/*                       LandmarkElement                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a landmark element object used to hold information about a landmark
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the landmark element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the landmark element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the landmark element in the document in relationship to other landmark elements
 * @property  {String}      role            - String representing the type of landmark
 *
 * @property  {Array}  child_cache_elements  - Array of child cache landmark and heading element objects as part of cache landmark and header tree
 *
 * @property  {CacheElement}          - iframe or frame reference, this is useful for landmarks rules related to only one (NOTE: can be null)
 *
 * @property  {String}   computed_label                  - Accessible label of the landmark
 * @property  {Number}   computed_label_length           - Length of label text
 * @property  {Number}   computed_label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...)
 * @property  {String}   computed_label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.LandmarkElement = function (dom_element, landmark) {

  if ((dom_element.tag_name === 'footer') &&
      (dom_element.parent_landmark === null) &&
      (!dom_element.has_role || (dom_element.role === 'contentinfo'))) {
    dom_element.element_aria_info = OpenAjax.a11y.ariaInHTML.elementInfo['footer[contentinfo]'];
    dom_element.implicit_role = dom_element.element_aria_info.defaultRole;
  }

  if ((dom_element.tag_name === 'header') &&
      (dom_element.parent_landmark === null) &&
      (!dom_element.has_role || (dom_element.role === 'banner'))) {
    dom_element.element_aria_info = OpenAjax.a11y.ariaInHTML.elementInfo['header[banner]'];
    dom_element.implicit_role = dom_element.element_aria_info.defaultRole;
  }

  this.dom_element           = dom_element;
  this.cache_id              = "";
  this.document_order        = 0;
  this.role                  = dom_element.role;

  this.landmark              = dom_element.role;
  if (landmark) this.landmark = landmark;

  var hi = new OpenAjax.a11y.cache.HeadingInfo(null);
  this.heading_info = hi;

  this.child_cache_elements  = [];

  this.computed_label                 = "";
  this.computed_label_length          = 0;
  this.computed_label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison  = "";
  this.accessible_name                = "";

  this.elements_with_content_count = 0;

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Adds a LandmarkElement or HeaderElement object to the tree of landmark/heading elements
 *
 * @param {LandmarkElement | HeadingElement}  child_element  - Landmark element or heading element object to add
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_cache_elements.push(child_element);
  }

};


/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method addToElementCount
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Adds N elements to the count of elements with content
 *
 * @param {Number}  n  - Number of elements to add to count
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addToElementCount = function (n) {

  if (n > 0) this.elements_with_content_count += n;

};


/**
 * @method getElementsWithContentCount
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Get the number of child elements with content, inlcuding the elements with
 *       content of child landmark elements
 *
 * @return {Number}  Number of elements with content
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getElementsWithContentCount = function () {

  var count = this.elements_with_content_count;

  var child_elements     = this.child_cache_elements;
  var child_elements_len = child_elements.length;

  for (var i = 0; i < child_elements_len; i++) {

    var cle = child_elements[i];

    if (cle.getElementsWithContentCount) {
      count += cle.getElementsWithContentCount();
    }
  }

  return count;
};

/**
 * @method getHeadings
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Get all the heading elements in a landmark
 *
 * @return {Array}  Array of heading elements
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getHeadings = function () {

  var headings = [];

  var child_elements     = this.child_cache_elements;
  var child_elements_len = child_elements.length;

  for (var i = 0; i < child_elements_len; i++) {

    var cle = child_elements[i];

    if (typeof cle.level === 'number') headings.push(cle);
    else if (cle.getHeadings) headings = headings.concat(cle.getHeadings());
  }

  return headings;
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'elements_with_content_count');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns a text string representation of the landmark element
 *
 * @return {String} Returns string represention the landmark element object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.toString = function () {
 var de = this.dom_element;
 var s = de.tag_name;
 if (de.has_role) s = de.tag_name + "[role=" + de.role + "]";
 if (this.accessible_name && this.accessible_name.length) s += ": " + this.accessible_name;

 return s;
};

/* ---------------------------------------------------------------- */
/*                       HeadingElement                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor HeadingElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a heading element object used to hold information about a h1 - h6 heading elements
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the heading element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the heading element in the document in relationship to other heading elements
 *
 * @property  {Object}  landmark_info       - Landmark information object
 * @property  {Object}  heading_info        - heading information object
 * @property  {Number}  level               - Level of the heading
 *
 * @property  {String}   name                  - Calculated accessible name of the heading
 * @property  {Number}   name_length           - Length of accessible name
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {String}   name_from_text_nodes  - Accessible name content from text nodes
 * @property  {String}   name_from_image_alt   - Accessible name content from alt content of images
 * @property  {Number}   image_count           - Number of images that are descendents of the link
 * @property  {Boolean}  text_only_from_image  - true if accessble name is only from an image, otherwise false
 * @property  {Boolean}  is_visible            - true if element is visible to AT and/or screen, otherwise false
 * @property  {Boolean}  has_content           - true if element has content, otherwise false
 *
 * @property  {HeadingElement}  nesting_parent_heading   - "parent" heading viewed from a document perspective (i.e. ignore landmarks), can be null
 * @property  {HeadingElement}  landmark_parent_heading  - "parent" heading in current landmark, can be null
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element, landmark_info, heading_info) {


  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  var le = landmark_info.landmark_element;

  this.last_parent_heading          = null;
  this.nesting_parent_heading       = null;
  this.last_landmark_parent_heading = null;
  this.landmark_parent_heading      = null;
  this.is_past_first_h1        = heading_info.is_past_first_h1;

  var ano = dom_element.getTextObject(true);  // text content must be visible

  this.name                  = ano.name;
  this.name_length           = ano.name.length;
  this.name_for_comparison   = OpenAjax.a11y.util.normalizeSpace(ano.name.toLowerCase());
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt   = ano.name_from_image_alt;
  this.image_count           = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);

  var is_visible = dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE;
  var has_content = this.name_for_comparison.length > 0;

  this.is_visible  = is_visible;
  this.has_content = has_content;

  switch( dom_element.tag_name) {

  case 'h1':
    this.level = 1;

    if (is_visible && has_content) {

      this.last_parent_heading          = null;
      this.nesting_parent_heading       = null;

      if (le) {
        this.last_landmark_parent_heading = null;
        this.landmark_parent_heading      = null;
      }
    }
    break;

  case 'h2':
    this.level = 2;

    if (is_visible && has_content) {

      this.last_parent_heading          = heading_info.nesting_h1;
      this.nesting_parent_heading       = heading_info.nesting_h1;

      if (le) {
        this.last_landmark_parent_heading = le.heading_info.nesting_h1;
        this.landmark_parent_heading      = le.heading_info.nesting_h1;
      }
    }

    break;

  case 'h3':
    this.level = 3;

    if (is_visible && has_content) {
      this.last_parent_heading     = heading_info.nesting_h2;
      this.nesting_parent_heading  = heading_info.nesting_h2;

      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h1;

      if (le) {
        this.landmark_parent_heading      = le.heading_info.nesting_h2;
        this.last_landmark_parent_heading = le.heading_info.nesting_h2;

        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h1;
      }
    }

    break;

  case 'h4':
    this.level = 4;

    if (is_visible && has_content) {
      this.last_parent_heading     = heading_info.nesting_h3;
      this.nesting_parent_heading  = heading_info.nesting_h3;

      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h2;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h1;

      if (le) {
        this.landmark_parent_heading      = le.heading_info.nesting_h3;
        this.last_landmark_parent_heading = le.heading_info.nesting_h3;

        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h2;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h1;
      }
    }

    break;

  case 'h5':
    this.level = 5;

    if (is_visible && has_content) {
      this.last_parent_heading     = heading_info.nesting_h4;
      this.nesting_parent_heading  = heading_info.nesting_h4;

      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h3;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h2;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h1;

      if (le) {
        this.landmark_parent_heading      = le.heading_info.nesting_h4;
        this.last_landmark_parent_heading = le.heading_info.nesting_h4;

        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h3;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h2;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h1;
      }
    }
    break;

  case 'h6':
    this.level = 6;

    if (is_visible && has_content) {
      this.last_parent_heading     = heading_info.nesting_h5;
      this.nesting_parent_heading  = heading_info.nesting_h5;

      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h4;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h3;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h2;
      if (this.last_parent_heading === null) this.last_parent_heading = heading_info.nesting_h1;

      if (le) {
        this.landmark_parent_heading      = le.heading_info.nesting_h5;
        this.last_landmark_parent_heading = le.heading_info.nesting_h5;

        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h4;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h3;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h2;
        if (this.last_landmark_parent_heading === null) this.last_landmark_parent_heading = le.heading_info.nesting_h1;
      }
    }

    break;

  default:
    this.level = 0;
    break;
  } // end switch

  return this;

};


/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
 cache_nls.addPropertyIfDefined(properties, this, 'image_count');
 cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');

 cache_nls.addPropertyIfDefined(properties, this, 'level');
 cache_nls.addPropertyIfDefined(properties, this, 'is_past_first_h1');
 cache_nls.addPropertyIfDefined(properties, this, 'nesting_parent_heading');
 cache_nls.addPropertyIfDefined(properties, this, 'last_parent_heading');
 cache_nls.addPropertyIfDefined(properties, this, 'landmark_parent_heading');
 cache_nls.addPropertyIfDefined(properties, this, 'last_landmark_parent_heading');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("Heading property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];

};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns a text string representation of the heading (h1-h6) element
 *
 * @return {String} Returns string represention the heading element object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.toString = function() {
 var de = this.dom_element;
 var s = de.tag_name;
 if (de.has_role) s = de.tag_name + "[role=" + de.role + "]";
 if (this.name && this.name.length) s += ": " + this.name;
 else s += ": no content";

 return s;
};

/* ---------------------------------------------------------------- */
/*                        MainElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor MainElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a main landmark element object used to hold information about a main landmark
 *
 * @param  {DOMElement}   dom_element      - The dom element object representing the landmark element
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the main landmark element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 * @property  {String}       role             - String identifying the landmark as "main"
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree
 *
 * @property  {Array}   h1_elements  -  List of all the h1 heading elements that are children of the main landmark
 * @property  {Number}  type         -  Constant representing the type of main landmark
 *
 * @property  {String}   label                  - Accessible label of the landmark
 * @property  {Number}   label_length           - Length of label text
 * @property  {Number}   label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...)
 * @property  {String}   label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.MainElement = function (dom_element) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;
  this.role            = dom_element.role;
  this.landmark        = "main";

  var hi = new OpenAjax.a11y.cache.HeadingInfo(null);
  this.heading_info = hi;


  this.child_cache_elements = [];
  this.h1_elements          = [];
  this.main_type            = OpenAjax.a11y.MAIN.ROLE_MAIN;

  this.computed_label                 = "";
  this.computed_label_length          = 0;
  this.computed_label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison  = "";
  this.accessible_name                = "";

  this.elements_with_content_count = 0;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a child landmark or heading object to the tree of landmarks and heading elements
 *
 * @param {Object}  cache_element  -  landmark or heading element object to add to the tree
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildElement = function (cache_element) {

  if (cache_element) {
    this.child_cache_elements.push(cache_element);
  }

};

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a H1 element to the list of H1 elements that are a child elements of the main content
 *
 * @param {H1Element}  h1_element  -  H1 element object to add to list
 */

OpenAjax.a11y.cache.MainElement.prototype.addH1Element = function (h1_element) {

  if (h1_element) {
    this.h1_elements.push(h1_element);
  }

};


/**
 * @method addToElementCount
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds N elements to the count of elements with content
 *
 * @param {Number}  n  - Number of elements to add to count
 */

OpenAjax.a11y.cache.MainElement.prototype.addToElementCount = function (n) {

  if (n > 0) this.elements_with_content_count += n;

};

 /**
 * @method getElementsWithContentCount
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Get the number of child elements with content, inlcuding the elements with
 *       content of child landmark elements
 *
 * @return {Number}  Number of elements with content
 */

OpenAjax.a11y.cache.MainElement.prototype.getElementsWithContentCount = function () {

  var count = this.elements_with_content_count;

  var child_elements     = this.child_cache_elements;
  var child_elements_len = child_elements.length;

  for (var i = 0; i < child_elements_len; i++) {

    var cle = child_elements[i];

    if (cle.getElementsWithContentCount) {
      count += cle.getElementsWithContentCount();
    }
  }

  return count;
};

 /**
 * @method getHeadings
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Get all the heading elements in a landmark
 *
 * @return {Array}  Array of heading elements
 */

OpenAjax.a11y.cache.MainElement.prototype.getHeadings = function () {

  var headings = [];

  var child_elements     = this.child_cache_elements;
  var child_elements_len = child_elements.length;

  for (var i = 0; i < child_elements_len; i++) {

    var cle = child_elements[i];

    if (typeof cle.level === 'number') headings.push(cle);
    else if (cle.getHeadings) headings = headings.concat(cle.getHeadings());
  }

  return headings;
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MainElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'elements_with_content_count');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MainElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns a text string representation of the main landmark element
 *
 * @return {String} Returns string represention the landmark element object
 */

OpenAjax.a11y.cache.MainElement.prototype.toString = function () {
 var de = this.dom_element;
 var s = de.tag_name;
 if (de.has_role) s = de.tag_name + "[role=" + de.role + "]";
 if (this.accessible_name && this.accessible_name.length) s += ": " + this.accessible_name;

 return s;

};

/* ---------------------------------------------------------------- */
/*                         H1Element                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor H1Element
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a h1 heading element object used to hold information about a h1 heading elements used for titling
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the heading element
 * @param  {MainElement}      main_landmark    - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}      main_landmark    - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree
 *
 * @property  {Number}   type               -  Constant representing the type of main landmark
 * @property  {Boolean}  is_label_for_main  - true if h1 is being used as a label for main landmark, otherwise false
 * @property  {Boolean}  is_child_of_main   - true if h1 is the child of the main landmark it is a label for, otherwise false
 * @property  {Boolean}  text_only_from_image  - true if accessble name is only from an image, otherwise false
 * @property  {Boolean}  is_visible            - true if element is visible to AT and/or screen, otherwise false
 * @property  {Boolean}  has_content           - true if element has content, otherwise false
 *
 * @property  {String}   name                  - Calculated accessible name of the heading
 * @property  {Number}   name_length           - Length of accessible name
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.H1Element = function (dom_element, main_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  this.main_landmark    = main_landmark;   // restricted to main landmarks
  this.child_cache_elements = [];   // The child array is always empty for an H1Element
  this.level = 1;


  this.main_type            = OpenAjax.a11y.MAIN.H1_ELEMENT;
  this.is_label_for_main    = false;

  if (main_landmark) this.is_child_of_main = true;
  else this.is_child_of_main     = false;

  var ano = dom_element.getTextObject(true);  // text content must be visible

  this.name                  = ano.name;
  this.name_length           = ano.name.length;
  this.name_for_comparison   = OpenAjax.a11y.util.normalizeSpace(ano.name.toLowerCase());
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt   = ano.name_from_image_alt;
  this.image_count           = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);

  var is_visible = dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE;
  var has_content = this.name_for_comparison.length > 0;

  this.is_visible  = is_visible;
  this.has_content = has_content;

  if (is_visible && has_content) {

    this.last_parent_heading          = null;
    this.nesting_parent_heading       = null;

    this.last_landmark_parent_heading = null;
    this.landmark_parent_heading      = null;
  }


};

/**
 * @method isH1UsedAsLabelForMainRole
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc  Determines if an H1 element is being used as a label for a main Role
 *
 * @return  {Boolean}  True if the h1 element is being used as a label for the main landmark it is contained in, otherwise false
 */

OpenAjax.a11y.cache.H1Element.prototype.isH1UsedAsLabelForMainRole = function () {

  if (this.dom_element.id.length === 0 ||
      this.main_landmark === null) {
    this.is_label_for_main = false;
    return;
  }

  var me = this.main_landmark;
  var de = me.dom_element;

  if (de.aria_labelledby && de.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    this.is_label_for_main = true;
  }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.H1Element.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'main_type');
 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
 cache_nls.addPropertyIfDefined(properties, this, 'image_count');
 cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');
 cache_nls.addPropertyIfDefined(properties, this, 'is_label_for_main');
 cache_nls.addPropertyIfDefined(properties, this, 'is_child_of_main');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.H1Element.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns a text string representation of the h1 heading element
 *
 * @return {String} Returns string represention the h1 heading element object
 */

OpenAjax.a11y.cache.H1Element.prototype.toString = function () {
 var de = this.dom_element;
 var s = de.tag_name;
 if (de.has_role) s = de.tag_name + "[role=" + de.role + "]";
 if (this.name && this.name.length) s += ": " + this.name;
 else s += ": no content";

 return s;

};

/* ---------------------------------------------------------------- */
/*                       TitleElement                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor TitleElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a title element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {Number}   type  -  Constant representing the title element
 *
 * @property  {String}   name                  - Calculated accessible name of the heading
 * @property  {Number}   name_length           - Length of accessible name
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.TitleElement = function (dom_element) {

  this.dom_element     = dom_element;
  this.cache_id        = "title";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.TITLE_ELEMENT;

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = OpenAjax.a11y.util.normalizeSpace(this.name.toLowerCase());

  // these can probably be removed some day
  this.child_cache_elements = [];  // This array is always empty for the title element

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TitleElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'main_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns a text string representation of the title element
 *
 * @return {String} Returns string represention the title element object
 */

OpenAjax.a11y.cache.TitleElement.prototype.toString = function () {
  var str = "title: ";

  if (this.name.length) str += this.name;
  else str += 'no content';

  return str;
};


/* ---------------------------------------------------------------- */
/*                       PageElementHeadingsLandmarks                               */
/* ---------------------------------------------------------------- */

/**
 * @constructor PageElementHeadingsLandmarks
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a body element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {TitleElement} title_element    - Reference to title element (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree
 *
 * @property  {Number}   type  -  Constant representing the body element
 *
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks = function (dom_element, title_element) {

  this.dom_element     = dom_element;
  this.cache_id        = "page_heading";
  this.document_order  = 0;
  this.is_page_element = true;
  this.title_element   = title_element;

  this.main_type          = OpenAjax.a11y.MAIN.BODY_ELEMENT;

  this.child_cache_elements = []; // this is always empty for the body element

  this.num_main_landmarks = 0;          // are defined in landmark rules
  this.num_visible_main_landmarks = 0;  // are defined in landmark rules

};

/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Adds a main landmark  object to the tree of title and main elements
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element);
  }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getCacheProperties = function (unsorted) {

  var properties = this.dom_element.getCacheProperties(unsorted);

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.PageElementHeadingsLandmarks
 *
 * @desc Returns a text string representation of the title element
 *
 * @return {String} Returns string represention the title element object
 */

OpenAjax.a11y.cache.PageElementHeadingsLandmarks.prototype.toString = function () {

  return "page";
};
