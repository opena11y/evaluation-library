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
/*                            ImageCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to images in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    image_elements  - List of image element objects in the document
 * @property {Number}   length          - Number of img and area element objects in the list
 *
 * @property {Array}    canvas_elements  - List of canvas element objects in the document
 * @property {Array}    svg_elements     - List of svg element objects in the document
 *
 * @property {String}   sort_property   - Image element object property the list of link objects is sorted by
 * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.ImagesCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.image_elements = [];
  this.length = 0;

  this.canvas_elements = [];
  this.svg_elements    = [];

  this.sort_property  = 'document_order';
  this.sort_ascending = true;

};

/**
 * @method addImageElement
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Adds a image element to the list of image elements and generates a cache id for the object.
 *
 * @param  {ImageElement}  image_element  - image element object to add
 *
 * @return {Number} Returns the length of the list of image element objects
 */

OpenAjax.a11y.cache.ImagesCache.prototype.addImageElement = function (image_element) {

  // item must exist and have the position property
  if (image_element) {
    this.length = this.length + 1;
    image_element.cache_id = "image_" + this.length;
    image_element.document_order = this.length;
    this.image_elements.push(image_element);
  }

  return this.length;

};

/**
 * @method addCanvasElement
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Adds a canvas element to the list of canvas elements and generates a cache id for the object.
 *
 * @param  {CanvasElement}  canvas_element  - canvas element object to add
 *
 * @return {Number} Returns the length of the list of canvas element objects
 */

OpenAjax.a11y.cache.ImagesCache.prototype.addCanvasElement = function (canvas_element) {

  // item must exist and have the position property
  if (canvas_element) {
    var len = this.canvas_elements.length;
    canvas_element.cache_id = "canvas_" + (len.length + 1);
    canvas_element.document_order = this.length;
    this.canvas_elements.push(canvas_element);
  }

  return len;

};


/**
 * @method addSVGElement
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Adds a SVG element to the list of SVG elements and generates a cache id for the object.
 *
 * @param  {SVGElement}  svg_element  - svg element object to add
 *
 * @return {Number} Returns the length of the list of svg element objects
 */

OpenAjax.a11y.cache.ImagesCache.prototype.addSVGElement = function (svg_element) {

  // item must exist and have the position property
  if (svg_element) {
    var len = this.svg_elements.length;
    svg_element.cache_id = "svg_" + (len.length + 1);
    svg_element.document_order = this.length;
    this.svg_elements.push(svg_element);
  }

  return len;

};

/**
 * @deprecated getImageElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getImageElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var image_elements_len = this.image_elements.length;

  if (cache_id && cache_id.length) {
    for (i=0; i < image_elements_len; i++) {
      if (this.image_elements[i].cache_id == cache_id) {
        return this.image_elements[i];
      }
    } // end loop
  }

 return null;
};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Resests the ImagesCache object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.ImagesCache.prototype.emptyCache = function () {

  this.image_elements = [];
  this.canvas_elements = [];
  this.svg_elements = [];
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Updates the images cache object by checking to see if a dom element
 *          should be added to the cache
 *
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in images cache
 */

OpenAjax.a11y.cache.ImagesCache.prototype.updateCacheItems = function (dom_element) {

  if ((dom_element.tag_name === 'img') ||
      (dom_element.tag_name === 'area') ||
      ((typeof dom_element.role === 'string') && (dom_element.role === 'img'))) {

    var image_element = new OpenAjax.a11y.cache.ImageElement(dom_element, this.dom_cache.base_url);

    this.getNameForImage(image_element);

    this.addImageElement(image_element);

  }

  if (dom_element.tag_name === 'canvas') {

    var canvas_element = new OpenAjax.a11y.cache.CanvasElement(dom_element, this.dom_cache.base_url);

    this.addCanvasElement(canvas_element);

  }


  if (dom_element.tag_name === 'svg') {

    var svg_element = new OpenAjax.a11y.cache.SVGElement(dom_element, this.dom_cache.base_url);

    this.addSVGElement(svg_element);

  }


};

/**
 * @method traverseDOMElementsForImageElements
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses DOMElement objects in the tree to update the images cache
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in images cache
 */

OpenAjax.a11y.cache.ImagesCache.prototype.traverseDOMElementsForImageElements = function (dom_element) {

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    this.updateCacheItems(dom_element);

    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForImageElements(dom_element.child_dom_elements[i]);
    } // end loop
  }

};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses the DOMElements to update the images cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the links cache are disabled, this cache would
 *       not be updated
 */

OpenAjax.a11y.cache.ImagesCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;

  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForImageElements(children[i]);
  }

  this.up_to_date = true;
};

/**
 * @method getNameFromARIALabel
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a computed accessible name based on ALT attribute and ARIA label properties
 *
 * @param {Object} image - Image cache element object
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getNameForImage = function (image) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var accessible_name = "";
  var accessible_name_source = SOURCE.NONE;
  var de = image.dom_element;

  if (de.has_aria_labelledby) {
    accessible_name = this.dom_cache.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    accessible_name_source = SOURCE.ARIA_LABELLEDBY;
  }
  else if (de.has_aria_label) {
    accessible_name = de.aria_label;
    accessible_name_source = SOURCE.ARIA_LABEL;
  }
  else if (de.has_alt) {
    accessible_name = de.alt;
    accessible_name_source = SOURCE.ALT_ATTRIBUTE;
  }
  else if (de.title) {
    accessible_name = de.title;
    accessible_name_source = SOURCE.TITLE_ATTRIBUTE;
  }

  image.accessible_name = accessible_name;
  image.accessible_name_length = accessible_name.length;
  image.accessible_name_source = accessible_name_source;
  image.accessible_name_for_comparison = OpenAjax.a11y.util.normalizeSpace(accessible_name.toLowerCase());

};

/* ---------------------------------------------------------------- */
/*                            ImageElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImageElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates image element object representing information related to an image or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the image or area element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the image or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the image or area element in the document in relationship to other image or area elements
 *
 * @property  {Boolean}     is_image        - True if the role of the image is an image, otherwise false (i.e. through use of role attribute)
 * @property  {Boolean}     is_presentation - True if the role of the image has been changed to presentation, otherwise false
 *
 * @property  {String}   source             - The url in the src property of an image element or href property of an area element
 * @property  {Boolean}  src_is_a_file_name - The filename is an image file and not a data base or other programatic reference
 * @property  {String}   file_name          - The filename of the image
 *
 * @property  {String}   longdesc           - The url in the longdesc property of an image element
 * @property  {Boolean}  has_longdesc       - Does the image have a longdesc attribute
 * @property  {Number}   longdesc_is_broken - Constant representing if the url is broken or untested
 * @property  {String}   longdesc_url       - The full URL of the longdesc attribute
 *
 * @property  {String}   alt                   - Calculated accessible name of the link
 * @property  {String}   alt_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {Number}   alt_length           - Number of images that are descendents of the link
 *
 * @property  {Number}   height  - Height of the image in pixels
 * @property  {Number}   width   - Width of the image in pixels
 */

OpenAjax.a11y.cache.ImageElement = function (dom_element, base_url) {

  if (!dom_element) return null;

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.source    = "";
  this.href      = "";
  this.file_name = "";
  this.is_image = true;
  this.is_presentation = false;

  if (dom_element.has_role && dom_element.role != 'img') this.is_image = false;
  if (dom_element.has_role && (dom_element.role === 'presentation' || dom_element.role === 'none')) this.is_presentation = true;

//  OpenAjax.a11y.logger.debug("Image element: " + dom_element.toString() + " has: " + dom_element.has_role + " role: " + dom_element.role  + " image: " + this.is_image + " presentation: " + this.is_presentation);

  if (dom_element.tag_name == 'img') {

    if (node.src) this.source = node.src;

    var pos = this.source.lastIndexOf('/');

    var file_name = "";
    this.src_is_a_file_name = false;

    if (this.source.length && pos >= 0 ) {
      file_name = this.source.substring((pos+1)).toLowerCase();

      if ((file_name.indexOf('.png') >= 0) ||
          (file_name.indexOf('.jpg') >= 0) ||
          (file_name.indexOf('.jpeg') >= 0) ||
          (file_name.indexOf('.gif') >= 0)) this.src_is_a_file_name = true;
    }

    this.file_name = file_name;
  }

  if (dom_element.tag_name === 'area') {
    this.href  = node.href;
  }

  this.accessible_name = "";
  this.accessible_name_length = "";
  this.accessible_name_source = OpenAjax.a11y.SOURCE.NONE;
  this.accessible_name_for_comparison = "";

  this.longdesc = node.getAttribute('longdesc');

  this.longdesc_is_broken = OpenAjax.a11y.URL_RESULT.NOT_TESTED;

  if (this.longdesc) {

    this.longdesc_url = this.longdesc;

    if (this.longdesc.indexOf('https:') == -1 ) {
      this.longdesc_url = base_url + this.longdesc;
    }

    this.has_longdesc = true;
    this.longdesc_is_broken = OpenAjax.a11y.util.urlExists(this.longdesc_url);
  }
  else {
    this.has_longdesc = false;
    this.longdesc     = null;
    this.longdesc_is_broken = null;
  }

  this.accessible_description = "";
  if (dom_element.has_aria_describedby) {
    this.accessible_description = dom_element.calculated_aria_description;
  }
  else {
    if (dom_element.has_title && (this.accessible_name_source !== OpenAjax.a11y.SOURCE.TITLE)) {
      this.accessible_description = dom_element.title;
    }
    else {
      if (dom_element.has_longdesc) {
        this.accessible_description = 'content of URL: ' + dom_element.longdesc;
      }
    }
  }


  this.height   = node.offsetHeight;
  this.width    = node.offsetWidth;

  return this;
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ImageElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var attributes = this.dom_element.getAttributes(unsorted);

  cache_nls.addPropertyIfDefined(attributes, this, 'title');
  cache_nls.addPropertyIfDefined(attributes, this, 'alt');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-label');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-labelledby');
  cache_nls.addPropertyIfDefined(attributes, this, 'longdesc');

  return attributes;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = [];

  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_desription');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_source');
  cache_nls.addPropertyIfDefined(properties, this, 'height');
  cache_nls.addPropertyIfDefined(properties, this, 'width');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');
  cache_nls.addPropertyIfDefined(properties, this, 'has_longdesc');
  cache_nls.addPropertyIfDefined(properties, this, 'longdesc_url');
  cache_nls.addPropertyIfDefined(properties, this, 'longdesc_is_broken');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("Image property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method getAltTextNLS
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If alt attribute is empty a empty alt text message will the returned
 *
 * @return {String | Object} Returns a String if the alt attribute has content,
 *                            but if label is empty it returns an object
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAltTextNLS = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.dom_element.has_alt) {
    if (this.alt_length) {
      return this.alt;
    }
    else {
      return cache_nls.getNLSEmptyAltTextMessage();
    }
  }
  else {
    return cache_nls.getNLSMissingAltMessage();
  }

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Creates a text string representation of the image element object
 *
 * @param   option     Options for identifying the features of the Images
 *                     'file'  Includes the the file name (default)
 *                     'short' Includes the short description instead of the file name
 *                     'long'  Includes the short description instead of the file name
 *
 * @return {String} Returns a text string representation of the image element object
 */

 OpenAjax.a11y.cache.ImageElement.prototype.toString = function (option) {

   function trimDescription(s) {
     var MAX_LENGTH = 100;

     if (typeof s !== 'string') return '';

     if (s.length > MAX_LENGTH) {
       s = s.substring(s, MAX_LENGTH) + "...";
     }

     return s;

   }


   if (typeof option === 'string') {
     option = option.toLowerCase();

     if (!(option === 'short' || option === 'long')) {
       option = 'file';
     }
   }

   var str = this.dom_element.tag_name;
   var de = this.dom_element;
   var cs = de.computed_style;

   if (de.has_role) {
     str += '[role=' + de.role + ']';
   }

   if (option === 'short') {

     if (de.is_presentation) {
         str += ": image is being defined as decorative";
     }
     else {
       if (this.accessible_name.length) {
         str +=  ": " + this.accessible_name;
       }
       else {
         if (this.accessible_name_source !== OpenAjax.a11y.SOURCE.NONE) {
           str += ': empty string (e.g. image is being defined as decorative)';
         }
         else {
           str += ': no short text alternative';
         }
       }
     }
   }
   else {
     if (option === 'long') {
       if (de.has_aria_describedby) {
          str +=  ': aria-describedby=\'' + trimDescription(de.calculated_aria_description) + '\'';
       }
       else {
         if (de.has_title && (this.accessible_name_source !== OpenAjax.a11y.SOURCE.TITLE)) {
           str +=  ': title=\'' + trimDescription(de.title) + '\'';
         }
         else {
           if (de.has_longdesc) {
             str += ': longdesc=\'' + de.longdesc + '\'';
           }
           else {
             str += ': alt=\'' + this.accessible_name + '\'';
           }
         }
       }
     }
     else {
       if (cs.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.HIDDEN) {
         if (cs.is_visible_to_at === OpenAjax.a11y.VISIBILITY.HIDDEN) str += " (hidden) : ";
         else str += " (off screen) : ";
       }
       else {
         str += " (" + this.height + "x" + this.width + ") : ";
       }
       if (this.src_is_a_file_name) {
         str += this.file_name;
       }
       else {
         str +=  "source is not a file name";
       }
     }
   }

   return str;
};


/* ---------------------------------------------------------------- */
/*                            CanvasElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor CanvasElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates image element object representing information related to an image or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the image or area element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the image or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the image or area element in the document in relationship to other image or area elements
 *
 * @property  {Boolean}     is_presentation - True if the role of the image has been changed to presentation, otherwise false
 *
 * @property  {String}      height  - Value of the height property in pixels
 * @property  {String}      width   - Value of the width property in pixels
 *
 */

OpenAjax.a11y.cache.CanvasElement = function (dom_element) {


  if (!dom_element) return null;

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.is_presentation = dom_element.is_presentation;

//  OpenAjax.a11y.logger.debug("Canvas element: " + dom_element.toString() + " has: " + dom_element.has_role + " role: " + dom_element.role  + " image: " + this.is_image + " presentation: " + this.is_presentation);

  this.accessible_name = null;
  this.accessible_name_length = null;
  this.accessible_name_source = OpenAjax.a11y.SOURCE.NONE;
  this.accessible_name_for_comparison = null;

  this.height   = node.getAttribute('height');
  this.width    = node.getAttribute('width');

  return this;
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var attributes = this.dom_element.getAttributes(unsorted);

  cache_nls.addPropertyIfDefined(attributes, this, 'width');
  cache_nls.addPropertyIfDefined(attributes, this, 'height');
  cache_nls.addPropertyIfDefined(attributes, this, 'title');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-label');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-labelledby');

  return attributes;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = [];

  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_source');
  cache_nls.addPropertyIfDefined(properties, this, 'height');
  cache_nls.addPropertyIfDefined(properties, this, 'width');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("Image property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.CanvasElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.CanvasElement
 *
 * @desc Creates a text string representation of the image element object
 *
 * @return {String} Returns a text string representation of the image element object
 */

 OpenAjax.a11y.cache.CanvasElement.prototype.toString = function () {
   var str = this.dom_element.tag_name;
   var cs = this.dom_element.computed_style;

   if (cs.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.HIDDEN) {
     if (cs.is_visible_to_at === OpenAjax.a11y.VISIBILITY.HIDDEN) str += " (hidden): ";
     else str += " (off screen): ";
   }
   else {
     str += " (" + this.height + "x" + this.width + "): ";
   }

   return str;
};


/* ---------------------------------------------------------------- */
/*                            SVGElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor SVGElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates image element object representing information related to an image or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the image or area element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the image or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the image or area element in the document in relationship to other image or area elements
 *
 * @property  {Boolean}     is_presentation - True if the role of the image has been changed to presentation, otherwise false
 *
 * @property  {String}      height  - Value of the height property in pixels
 * @property  {String}      width   - Value of the width property in pixels
 *
 */

OpenAjax.a11y.cache.SVGElement = function (dom_element) {


  if (!dom_element) return null;

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.is_presentation = false;
  if (dom_element.has_role && (dom_element.role === 'presentation' || dom_element.role === 'none')) this.is_presentation = true;

//  OpenAjax.a11y.logger.debug("Canvas element: " + dom_element.toString() + " has: " + dom_element.has_role + " role: " + dom_element.role  + " image: " + this.is_image + " presentation: " + this.is_presentation);

  this.accessible_name = null;
  this.accessible_name_length = null;
  this.accessible_name_source = OpenAjax.a11y.SOURCE.NONE;
  this.accessible_name_for_comparison = null;

  this.height   = node.getAttribute('height');
  this.width    = node.getAttribute('width');

  return this;
};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SVGElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.SVGElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.SVGElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var attributes = this.dom_element.getAttributes(unsorted);

  cache_nls.addPropertyIfDefined(attributes, this, 'width');
  cache_nls.addPropertyIfDefined(attributes, this, 'height');
  cache_nls.addPropertyIfDefined(attributes, this, 'title');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-label');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-labelledby');

  return attributes;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.SVGElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = [];

  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_source');
  cache_nls.addPropertyIfDefined(properties, this, 'height');
  cache_nls.addPropertyIfDefined(properties, this, 'width');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.SVGElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("Image property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.SVGElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.SVGElement
 *
 * @desc Creates a text string representation of the image element object
 *
 * @return {String} Returns a text string representation of the image element object
 */

 OpenAjax.a11y.cache.SVGElement.prototype.toString = function () {
   var str = this.dom_element.tag_name;
   var cs = this.dom_element.computed_style;

   if (cs.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.HIDDEN) {
     if (cs.is_visible_to_at === OpenAjax.a11y.VISIBILITY.HIDDEN) str += " (hidden) : ";
     else str += " (off screen) : ";
   }
   else {
     str += " (" + this.height + "x" + this.width + ") : ";
   }

   return str;
};




