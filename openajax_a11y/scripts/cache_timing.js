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
/*                            TimingFlashing                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor TimingFlashing
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to links in a web page
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {Object}   page_elements             - Cache element representing the page level results
 * @property {Array}    timing_elements  - List of element objects related to moving, flashing, scrolling and auto updating content
 */

OpenAjax.a11y.cache.TimingFlashingCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  this.page_element = null;
  this.timing_elements = [];

};



/**
 * @method createTimingFlashingCache
 *
 * @memberOf OpenAjax.a11y.cache.TimingFlashingCache
 *
 * @desc Populates the keyboard focus cache from the link, controls and media caches
 */

OpenAjax.a11y.cache.TimingFlashingCache.prototype.createTimingFlashingCache = function () {

//  OpenAjax.a11y.logger.debug("[Timing Cache] Page Element: " + this.dom_cache.element_cache.getPageElement());

  this.page_element = new OpenAjax.a11y.cache.PageElementTimingFlashing(this.dom_cache.element_cache.getPageElement());

  this.timing_elements = this.dom_cache.images_cache.image_elements;
  this.timing_elements = this.timing_elements.concat(this.dom_cache.images_cache.canvas_elements);
  this.timing_elements = this.timing_elements.concat(this.dom_cache.images_cache.svg_elements);
  this.timing_elements = this.timing_elements.concat(this.dom_cache.media_cache.media_elements);

};


/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.TimingFlashingCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.TimingFlashingCache.prototype.getItemByCacheId = function (cache_id) {

  var i;

  var link_elements_len = this.link_elements.length;

  if (cache_id && cache_id.length) {
   for (i=0; i < link_elements_len; i++) {
     if (this.link_elements[i].cache_id == cache_id) {
       return this.link_elements[i];
     }
   } // end loop
 }

 return null;
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.TimingFlashingCache
 *
 * @desc Resests the TimingFlashing object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.TimingFlashingCache.prototype.emptyCache = function () {

  this.interactive_elements = [];
  this.length = 0;
  this.up_to_date = false;

};


/* ---------------------------------------------------------------- */
/*                       PageElementTimingFlashing                   */
/* ---------------------------------------------------------------- */

/**
 * @constructor PageElementTimingFlashing
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a body element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the page element
 */

OpenAjax.a11y.cache.PageElementTimingFlashing = function (dom_element) {

  this.dom_element     = dom_element;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getCacheProperties = function (unsorted) {

  var properties = this.dom_element.getCacheProperties(unsorted);

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.PageElementTimingFlashing
 *
 * @desc Returns a text string representation of the title element
 *
 * @return {String} Returns string represention the title element object
 */

OpenAjax.a11y.cache.PageElementTimingFlashing.prototype.toString = function () {
  return "page";
};


