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
/*                      AbbreviationsCache                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor AbbreviationsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for abbreviations cache object which contains a list of
 *    abbreviation items representing the abbreviations defined
 *    in a document. The item also contains a list of all the
 *    dom element objects that share the same abbreviation
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {String}   sort_property   - Property of abbreviation item that the list is sorted on
 * @property {Boolean}  sort_ascending  - true if list is sorted by ascending values, otherwsie false
 *
 * @property {Array}   abbreviation_items  - List of abbreviation items
 * @property {Number}  length              - Number of abbreviation items in list
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.AbbreviationsCache = function (dom_cache) {

  this.dom_cache  = dom_cache;
  this.up_to_date = false;

  this.abbreviation_items = [];
  this.length = 0;

  this.sort_property  = 'abbreviation_text';
  this.sort_ascending = true;

};

/**
 * @method addAbbreviationItem
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Adds a DOM Element object with an abbreviation to the abbreviation item list.
 *       If the abreviation item does not exist the function will create one
 *
 * @param {DOMElement}  dom_element  - dom element to add to a abbreviation list
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.addAbbreviationItem = function (dom_element) {

 var abbreviation_item = null;
 var abbreviation_items_len = this.abbreviation_items.length;
 var found = false;
 var node_text = dom_element.getText();

 for (var i=0; i < abbreviation_items_len; i++ ) {
  abbreviation_item = this.abbreviation_items[i];

  if (node_text == abbreviation_item.abbreviation_text) {

    abbreviation_item.dom_elements.push(dom_element);
    abbreviation_item.count = abbreviation_item.dom_elements.length;

    found = true;
    break;
  }
 } // end loop

 if (!found) {
  abbreviation_item = new OpenAjax.a11y.cache.AbbreviationItem(node_text);

  abbreviation_item.dom_elements.push(dom_element);
  abbreviation_item.count = abbreviation_item.dom_elements.length;
  abbreviation_item.cache_id = "abbrev_" + this.length;

  this.abbreviation_items.push(abbreviation_item);
  this.length = this.length + 1;
 }

};

/**
 * @deprecated getAbbreviationItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns the abbreviation item with the cache id
 *
 * @param {String}  cache_id  - cache id of the abbreviation item object
 *
 * @return {AbbreviationItem} Returns abbreviation item object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getAbbreviationItemByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns the abbreviation item with the cache id
 *
 * @param {String}  cache_id  - cache id of the abbreviation item object
 *
 * @return {AbbreviationItem} Returns abbreviation item object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getItemByCacheId = function (cache_id) {

  var i, j;
  var ai, de;
  var dom_elements, dom_elements_len;

  var abbreviation_items     = this.abbreviation_items;
  var abbreviation_items_len = abbreviation_items.length;

  if (cache_id && cache_id.length) {

    for (i = 0; i < abbreviation_items_len; i++) {
      ai = abbreviation_items[i];

      if (ai.cache_id == cache_id) return ai;

      dom_elements     = ai.dom_elements;
      dom_elements_len = dom_elements.length;

      for (j = 0; j < dom_elements_len; j++ ) {
        de = dom_elements[j];
        if (de.cache_id == cache_id) return de;
      } // end loop
    } // end loop
  }

 return null;
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Empties all the abbreviation items from the cache
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.emptyCache = function () {

 this.abbreviation_items.length = 0;
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Updates the AbbreviationsCache object with information from a DOMElement object
 *    This is used during the creation of the cache and is used by the functions for
 *    either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the abbreviations cache
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'abbr') ||
   (dom_element.tag_name == 'acronym')) {

   this.addAbbreviationItem(dom_element);

 }

};

/**
 * @method traverseDOMElementsForAbbreviations
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.traverseDOMElementsForAbbreviations = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == Node.ELEMENT_NODE) {

  this.updateCacheItems(dom_element);

  for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
   this.traverseDOMElementsForAbbreviations(dom_element.child_dom_elements[i]);
  } // end loop

 }

};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 *    This function is used to update the abbreviation cache
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;

 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForAbbreviations(children[i]);
 }

 this.up_to_date = true;

};

/**
 * @method sortAbbreviationItems
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Sorts abbreviations by abbreviation_text property
 *
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.sortAbbreviationItems = function(ascending) {

  var swapped = false;
  var temp = null;
  var i;

  if( !this.abbreviation_items || (this.abbreviation_items.length === 0)) {
    return false;
  } // endif

  this.sort_ascending = ascending;

  var abbreviation_items_len = this.abbreviation_items.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < abbreviation_items_len; i++ ) {
        if (this.abbreviation_items[i-1].abbreviation_text > this.abbreviation_items[i].abbreviation_text) {
          // swap the values
          temp = this.abbreviation_items[i-1];
          this.abbreviation_items[i-1] = this.abbreviation_items[i];
          this.abbreviation_items[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < abbreviation_items_len; i++ ) {
        if (this.abbreviation_items[i-1].abbreviation_text < this.abbreviation_items[i].abbreviation_text) {
          // swap the values
          temp = this.abbreviation_items[i-1];
          this.abbreviation_items[i-1] = this.abbreviation_items[i];
          this.abbreviation_items[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }

  this.sort_property = 'abbreviation_text';

  return true;

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns a text string representation of the abbreviation cache object
 *
 * @return {String} Returns string represention the abbreviations cache object
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.toString = function () {

 var str ="\n\nAbbreviation Information\n";

 var list_length = this.abbreviation_items.length;

 for (var i=0; i < list_length; i++ ) {
  str += this.abbreviation_items[i].toString();
 } // end loop

 return str;
};

/* ---------------------------------------------------------------- */
/*                      AbbreviationItem                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor AbbreviationItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for abbreviation item object which contains information
 *       about dom elements that share the same abbreviation
 *
 * @param  {String}  abbreviation  - text of abbreviation
 *
 * @property  {String}  cache_id            - String that uniquely identifies the cache element in the DOMCache
 * @property  {String}  abbreviation_text   - text of abbreviation
 *
 * @property  {Array}   dom_elements  - List of dom elements associated with the abbreviation
 * @property  {Number}  count         - Number of dom elements that share this abbreviation
 */

OpenAjax.a11y.cache.AbbreviationItem = function (abbreviation) {

  this.cach_id = "";

  this.abbreviation_text = abbreviation;

  this.dom_elements = [];
  this.count = 0;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getElementResults = function () {
  return this.dom_elements[0].getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getStyle = function () {

  return this.dom_elements[0].getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getAttributes = function (unsorted) {

  return [];

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getCacheProperties = function (unsorted) {

  return [];

};


/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getEvents = function () {

  return [];

};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns a text string representation of the abbreviation item object
 *
 * @return {String} Returns string represention the abbreviation item object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.toString = function () {

 return "Abbreviation: " + abbreviation_text;
};



