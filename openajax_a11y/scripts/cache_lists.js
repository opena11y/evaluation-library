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
/*                              ListInfo                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a list information object for preserving the current list information
 *        when traversing the DOM
 *
 * @param {ListInfo} list_info - Current list information object
 *
 * @property {LandmarkElement | ListElement | ContainerElement}  list_element      - Parent container list or container element object
 * @property {ContainerElement}                container_element - Parent container element object
 * @property {LandmarkElement}                 parent_landmark  - Parent landmark element object
 */

OpenAjax.a11y.cache.ListInfo = function (list_info) {

  if (list_info) {
    this.list_element      = list_info.list_element;
    this.container_element = list_info.container_element;
    this.parent_landmark   = list_info.parent_landmark;
    this.article_or_section = list_info.article_or_section;
  }
  else {
    this.list_element      = null;
    this.container_element = null;
    this.parent_landmark   = null;
    this.article_or_section = false;
  }

};

/* ---------------------------------------------------------------- */
/*                            ListsCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for lists cache object which contains a list of
 *    list items representing the list (i.e ul, ol , dl, li, dt and dd)
 *    elements defined in a document.
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the list elements in the document
 *
 * @property {Array}   container_elements  - List of the container element objects in the document that are not children of a container item
 * @property {Array}   listitem_elements   - List of the listitem element objects
 * @property {Number}  length              - Number of containter element objects in list
 *
 * @property {String}   sort_property   - Property of contanter element objectthe list is sorted on
 * @property {Boolean}  sort_ascending  - true if list is sorted by ascending values, otherwise false
 *
 * @property {Number}  landmark_count   - Number of containter element objects in list
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.ListsCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.child_cache_elements = [];

  this.list_elements = [];
  this.container_elements = [];
  this.listitem_elements = [];

  this.landmark_count  = 0;

};

/**
 * @method addContainerElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Adds a container element object to the list of container elements
 *
 * @param  {ContainerElement} container_element   - Container element object to add
 *
 * @return  {Number} Returns the number of container element objects in the list of container element objects
 */

OpenAjax.a11y.cache.ListsCache.prototype.addContainerElement = function (container_element) {

  if (container_element) {
    this.container_elements.push(container_element);
    return true;
  }

  return false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Update the ListsCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new list element object should be added to this cache.
 *
 * @param  {DOMElement}   dom_element  - dom element object to check for inclusion in lists cache
 * @param  {ListInfo}     list_info    - Information about the current list relationships in the DOM
 *
 * @return {ListInfo}  Returns updated list information object
 */

OpenAjax.a11y.cache.ListsCache.prototype.updateCacheItems = function (dom_element, list_info) {

  var li = new OpenAjax.a11y.cache.ListInfo(list_info);

  var tag_name = dom_element.tag_name;
  var role     = dom_element.getRole();

  if (tag_name === 'ul' ||
      tag_name === 'ol' ||
      tag_name === 'dl' ||
      role === 'list' ||
      role === 'group') {

    var ce = new OpenAjax.a11y.cache.ContainerElement(dom_element, list_info);

    this.dom_cache.getNameFromARIALabel(ce);

    if (!list_info.container_element) this.addContainerElement(ce);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(ce);
    }
    else {
      this.addChildElement(ce);
    }

    this.list_elements.push(ce);
    li.container_element = ce;
    li.list_element      = ce;

//    OpenAjax.a11y.logger.debug( "[ListCache][Container]: " + ce);
  }

  if (tag_name === 'li' ||
      tag_name === 'dt' ||
      tag_name === 'dd' ||
      role === 'listitem') {

    var le = new OpenAjax.a11y.cache.ListElement(dom_element, list_info);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(le);
    }
    else {
      this.addChildElement(le);
    }

    this.list_elements.push(le);
    this.listitem_elements.push(le);

    li.list_element = le;
  }

  if ((dom_element.tag_name === 'a') ||
      (dom_element.getRole() === 'link')) {

    if (list_info.list_element &&
        (typeof list_info.list_element.link_count === 'number') &&
        dom_element.node.href &&
        dom_element.node.href.length) {
      list_info.list_element.link_count += 1;

//      if (list_info.container_element) OpenAjax.a11y.logger.debug( "[ListCache][updateCacheItems]: " + list_info.container_element);

    }



  }

  return li;

};

/**
 * @method traverseDOMElementsForListElements
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 */

OpenAjax.a11y.cache.ListsCache.prototype.traverseDOMElementsForListElements = function (dom_element, list_info) {

  var i;
  var li;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    li = this.updateCacheItems(dom_element, list_info);

    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForListElements(dom_element.child_dom_elements[i], li);
    } // end loop

  }

};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the list cache
 *    This function is used to update the list cache
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.ListsCache.prototype.updateCache = function () {

 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;

 var list_info = new OpenAjax.a11y.cache.ListInfo(null);

 for (i = 0; i < children_len; i++) {
  this.traverseDOMElementsForListElements(children[i], list_info);
 }

 this.up_to_date = true;
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Add a top-level list element object to the lists cache
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addChildElement = function (list_element) {


  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @deprecated getListElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc retrieve list element from lists cache based on its cache id
 *
 * @param  {String}  cache_id  -  cache id of the list cache element object to find
 *
 * @return {ListElement} Returns list cache object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.ListsCache.prototype.getListElementByCacheId = function (cache_id) {
 return this.getItemByCacheId(cache_id);
};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Empties all the properties of the list cache
 */

OpenAjax.a11y.cache.ListsCache.prototype.emptyCache = function () {

  this.dom_cache = null;
  this.up_to_date = false;

  this.child_elements     = [];

  this.container_elements = [];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Returns a text string representation of the lists cache object
 *
 * @return {String} Returns string represention the lists cache object
 */

OpenAjax.a11y.cache.ListsCache.prototype.toString = function () {

 var str ="\n\nList Information\n";

 var list_length = this.container_elements.length;

 for (var i=0; i < list_length; i++ ) {
  str += this.container_elements[i].toString();
 } // end loop

 return str;
};

/* ---------------------------------------------------------------- */
/*                            ListElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a LI, DT, DD element in the DOM
 *
 * @param  {DOMelement}        dom_element       - The dom element object representing the input element
 * @param  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the list element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the list element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree
 *
 * @property  {Number}  link_count    - Number of links in this list element
 */

OpenAjax.a11y.cache.ListElement = function (dom_element, list_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.parent_list_element = list_info.list_element;
  this.parent_container    = list_info.container_element;
  this.parent_landmark     = list_info.parent_landmark;

  this.list_type = OpenAjax.a11y.LIST.ITEM;

  this.child_cache_elements = [];

  this.link_count = 0;

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Add a list element object to the tree of list cache items
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
//    OpenAjax.a11y.logger.debug( "[ListElement][addChildElement] adding child element: " + list_element + " (" + this.child_cache_elements.length + ")");
//    OpenAjax.a11y.logger.debug( "[ListElement][addChildElement] " + this.toString());
    return true;
  }

  return false;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ListElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'list_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ListElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns a text string representation of the list item object
 *
 * @return {String} Returns string represention the list item object
 */

OpenAjax.a11y.cache.ListElement.prototype.toString = function () {

  var tag_name = this.dom_element.tag_name;
  var str = tag_name;
  var role = this.dom_element.getRole();

  if (role.length) str += '[role=' + role + ']: ';
  else str += ': ';

  str +=  this.dom_element.getText();

  return str;

};

/* ---------------------------------------------------------------- */
/*                           ContainerElement                       */
/* ---------------------------------------------------------------- */

/**
 * @constructor ContainerElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a OL, UL, DL element in the DOM
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the input element
 * @param  {ListInfo}    list_info    - Current list information about
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the container element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the container element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the container element is contained in
 * @property  {LandmarkElement}   parent_landmark   - Reference to the landmark element the container element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree
 *
 * @property  {Number}  links_count           - Number list elements that are links
 * @property  {Number}  links_in_domain       - Number of links that are in the same domain of the page
 *
 * @property  {Array}  list_elements          - Array of list elements
 * @property  {Number} length                 - Number of list elements in the container
 */

OpenAjax.a11y.cache.ContainerElement = function (dom_element, list_info) {

  this.dom_element    = dom_element;

  this.parent_list_element = list_info.list_element;
  this.parent_container    = list_info.container_element;
  this.parent_landmark     = list_info.parent_landmark;

  this.list_type = OpenAjax.a11y.LIST.CONTAINER;

  this.child_cache_elements = [];

  this.link_count     = 0;
  this.link_in_domain = 0;

  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_source = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison = "";
  this.accessible_name = "";

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Add a list element object to the tree of list cache items
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ContainerElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
//    OpenAjax.a11y.logger.debug( "[ContainerElement][addChildElement] adding child element: " + list_element + " (" + this.child_cache_elements.length + ")");
//    OpenAjax.a11y.logger.debug( "[ContainerElement][addChildElement] " + this.toString());

    return true;
  }

  return false;

};

/**
 * @method getListItemCount
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Gets the number of list items including sublist list items
 *
 * @return {Number} see description
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getListItemCount = function () {

  function getCount(list) {

    var max = list.length;
    var i;  // loop counter
    var ce; // loop placeholder

    //  OpenAjax.a11y.logger.debug( "[ContainerElement][isListOfLinks] Number of children: " + max);

    for (i = 0; i < max; i++) {
      ce = list[i];

      if (ce.child_cache_elements.length) {
        getCount(ce.child_cache_elements);
      }

      // ignore elements that are not 'li'
      if (ce.list_type !== OpenAjax.a11y.LIST.ITEM) continue;
      count += 1;
    }

    return count;
  }
  var count = 0;

  getCount(this.child_cache_elements);

  return count;

};

/**
 * @method getListItemCountOneLink
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Gets the number of list items that have one link in them including sublist list items
 *
 * @return {Number} see description
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getListItemCountOneLink = function () {

  function getCount(list) {

    var max = list.length;
    var i;  // loop counter
    var ce; // loop placeholder

    //  OpenAjax.a11y.logger.debug( "[ContainerElement][isListOfLinks] Number of children: " + max);

    for (i = 0; i < max; i++) {
      ce = list[i];

      if (ce.child_cache_elements.length) {
        getCount(ce.child_cache_elements);
      }

      // ignore elements that are not 'li'
      if (ce.list_type !== OpenAjax.a11y.LIST.ITEM) continue;

      if (ce.link_count === 1) count += 1;
    }

    return count;
  }
  var count = 0;

  getCount(this.child_cache_elements);

  return count;

};

/**
 * @method getSublistCount
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Gets the number of sub lists
 *
 * @return {Number} see description
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getSublistCount = function () {

  function getCount(list) {

    var max = list.length;
    var i;  // loop counter
    var ce; // loop placeholder

    //  OpenAjax.a11y.logger.debug( "[ContainerElement][isListOfLinks] Number of children: " + max);

    for (i = 0; i < max; i++) {
      ce = list[i];

      if (ce.child_cache_elements.length) {
        getCount(ce.child_cache_elements);
      }

      // ignore elements that are not 'li'
      if (ce.list_type !== OpenAjax.a11y.LIST.CONTAINER) continue;

      count += 1;
    }

    return count;
  }
  var count = 0;

  getCount(this.child_cache_elements);

  return count;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getAttributes = function () {

  var attributes = this.dom_element.getAttributes();

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getCacheProperties = function (unsorted) {

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
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns a text string representation of the container element object
 *
 * @return {String} Returns string represention the container element object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.toString = function () {

  var count = this.getListItemCount();
  var tag_name = this.dom_element.tag_name;
  var role = this.dom_element.getRole();

  var str = tag_name;

  if (role.length) str += '[role=' + role + ']';

  if (this.computed_label.length) str += ': ' + this.computed_label;


  if (count === 1) str += ' (1 list item)';
  else str += ' (' + count + ' list items)';

  return str;

// return this.dom_element.tag_name + ": " + this.getListItemCount() + " list items; " + this.getListItemCountOneLink() + " list items with one link" + this.getSublistCount() + " sublists";

};



