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
/*                              FrameInfo                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor FrameInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a list information object for preserving the current frame information
 *        when traversing the DOM
 *
 * @param {FrameInfo} frame_info - Current list information object
 *
 * @property {FrameElement}    parent_frame - parent frame element object
 */

OpenAjax.a11y.cache.FrameInfo = function (frame_info) {

  if (frame_info) {
    this.parent_frame   = frame_info.frame_landmark;
  }
  else {
    this.parent_frame   = null;
  }

};

/* ---------------------------------------------------------------- */
/*                            FramesCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor FramesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for frames cache object which contains a list of
 *    frame and iframe items defined in a document.
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the frame elements in the document
 *
 * @property {Array}   frame_elements    - List of the frame element objects in the document that are not children of a container item
 * @property {Array}   iframe_elements   - List of the iframe element objects
 * @property {Number}  length              - Number of containter element objects in list
 */

OpenAjax.a11y.cache.FramesCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.child_cache_elements = [];
  this.frame_elements       = [];
  this.iframe_elements      = [];

};

/**
 * @method addFrameElement
 *
 * @memberOf OpenAjax.a11y.cache.FramesCache
 *
 * @desc Adds a frame element object to the list of frame elements
 *
 * @param  {FrameElement} frame_element   - frame element object to add
 *
 * @return  {Boolean} Returns true if frame element was added to list
 */

OpenAjax.a11y.cache.FramesCache.prototype.addFrameElement = function (frame_element) {

  if (frame_element) {
    if (frame_element.dom_element.tag_name === 'frame') this.frame_elements.push(frame_element);
    else this.iframe_elements.push(frame_element);
    return true;
  }

  return false;

};



/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.FramesCache
 *
 * @desc Update the FramesCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new list element object should be added to this cache.
 *
 * @param  {DOMElement}   dom_element  - dom element object to check for inclusion in lists cache
 * @param  {FrameInfo}    frame_info    - Information about the current frame relationships in the DOM
 *
 * @return {FrameInfo}  Returns updated frame information object
 */

OpenAjax.a11y.cache.FramesCache.prototype.updateCacheItems = function (dom_element, frame_info) {

  var fi = new OpenAjax.a11y.cache.FrameInfo(frame_info);

  // check whether we need to add a new FrameElement
  switch (dom_element.tag_name) {

  case 'frame':
  case 'iframe':

    var fe = new OpenAjax.a11y.cache.FrameElement(dom_element, frame_info);
    this.dom_cache.getNameFromARIALabel(fe);

    this.addFrameElement(fe);

    if (frame_info.parent_frame) {
      frame_info.parent_frame.addChildElement(fe);
    }
    else {
      this.addChildElement(fe);
    }

    fi.parent_frame = fe;

//    OpenAjax.a11y.logger.debug( "[FramesCache][updateCacheItems]      fe: " + fe);
//    OpenAjax.a11y.logger.debug( "[FramesCache][updateCacheItems]  frames: " + this.frame_elements.length);
//    OpenAjax.a11y.logger.debug( "[FramesCache][updateCacheItems] iframes: " + this.iframe_elements.length);

    break;


  default:
    break;

  } // end switch

  return fi;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.FramesCache
 *
 * @desc Add a top-level frame element object to the frames cache
 *
 * @param {FrameElement} frame_element - frame cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.FramesCache.prototype.addChildElement = function (frame_element) {


  if (frame_element) {
    this.child_cache_elements.push(frame_element);
    return true;
  }

  return false;

};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.FramesCache
 *
 * @desc Empties all the properties of the list cache
 */

OpenAjax.a11y.cache.FramesCache.prototype.emptyCache = function () {

  this.dom_cache = null;
  this.up_to_date = false;

  this.child_elements     = [];

  this.frame_elements = [];
  this.iframe_elements = [];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FramesCache
 *
 * @desc Returns a text string representation of the lists cache object
 *
 * @return {String} Returns string represention the lists cache object
 */

OpenAjax.a11y.cache.FramesCache.prototype.toString = function () {

 var str = "Frame Information: ";

 if (this.frame_elements.length === 1) str += "1 frame element";
 else str += this.frame_elements.length + " frame elements";

 if (this.iframe_elements.length === 1) str += " and 1 iframe element";
 else str += " and " + this.iframe_elements.length + " iframe elements";

 return str;
};


/* ---------------------------------------------------------------- */
/*                           FrameElement                       */
/* ---------------------------------------------------------------- */

/**
 * @constructor FrameElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a OL, UL, DL element in the DOM
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the input element
 * @param  {FrameInfo}   frame_info    - Current frame information
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the container element
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the container element is contained in
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of frame cache tree
 *
 */

OpenAjax.a11y.cache.FrameElement = function (dom_element, frame_info) {

  this.dom_element    = dom_element;

  this.parent_frame   = frame_info.parent_frame;

  this.child_cache_elements = [];

  this.computed_label                 = "";
  this.computed_label_length          = 0;
  this.computed_label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison  = "";
  this.accessible_name                = "";

  this.has_name = false;
  this.src = "";
  if (dom_element.has_src) this.src = dom_element.src;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Add a frame element object to the tree of list cache items
 *
 * @param {FrameElement } frame_element - frame cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.FrameElement.prototype.addChildElement = function (frame_element) {

  if (frame_element) {
    this.child_cache_elements.push(frame_element);
//    OpenAjax.a11y.logger.debug( "[FrameElement][addChildElement] adding child element: " + list_element + " (" + this.child_cache_elements.length + ")");
//    OpenAjax.a11y.logger.debug( "[FrameElement][addChildElement] " + this.toString());

    return true;
  }

  return false;

};




/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FrameElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.FrameElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.FrameElement.prototype.getAttributes = function () {

  var attributes = this.dom_element.getAttributes();

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.FrameElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'list_type');
  cache_nls.addPropertyIfDefined(properties, this, 'link_count');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FrameElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.FrameElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FrameElement
 *
 * @desc Returns a text string representation of the container element object
 *
 * @return {String} Returns string represention the container element object
 */

OpenAjax.a11y.cache.FrameElement.prototype.toString = function () {

  var str = this.dom_element.tag_name + ": " ;

  if (this.computed_label_source != OpenAjax.a11y.SOURCE.NONE) {
    if (this.accessible_name.length) str += this.accessible_name;
    else str += 'empty';
  }
  else {
     str += 'no name';
  }

  if (this.src.length) str +=  ' (' + this.src + ')';
  else str +=  ' (no source url defined)';

  return str;


};



