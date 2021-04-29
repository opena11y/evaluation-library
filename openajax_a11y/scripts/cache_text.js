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
/*                            TextCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor TextCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to text nodes in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 *
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    text_nodes     - List of text nodes in the document
 * @property {Number}   length         - Number of image element objects in the list
 */

OpenAjax.a11y.cache.TextCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.text_nodes = [];
  this.length = 0;

};

/**
 * @method addTextNode
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Adds a text node to the list of image elements and generates a cache id for the object.
 *
 * @param  {DOMText}  text_node  - text_node object to add
 *
 * @return {Number} Returns the length of the list of image element objects
 */

OpenAjax.a11y.cache.TextCache.prototype.addTextNode = function (text_node) {


  // item must exist and have the position property
  if (text_node) {

    var pe = text_node.parent_element;

    if (pe.tag_name !== 'script' && pe.tag_name !== 'style' &&  pe.tag_name !== 'object') {
      this.length = this.length + 1;
      text_node.document_order = this.length;
      this.text_nodes.push(text_node);
    }
  }

  return this.length;

};


/**
 * @deprecated getTextNodeByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Finds the the text node object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {DOMText | null} Returns cache text node object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.TextCache.prototype.getTextNodeByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Finds the the text node object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of text node object
 *
 * @return {ImageElement | null} Returns cache text node object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.TextCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var text_nodes_len = this.text_nodes.length;

  if (cache_id && cache_id.length) {
    for (i=0; i < text_nodes_len; i++) {
      if (this.text_nodes[i].cache_id == cache_id) {
        return this.text_nodes[i];
      }
    } // end loop
  }

 return null;
};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Resests the TextCache object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.TextCache.prototype.emptyCache = function () {

  this.text_nodes.length = 0;
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Updates the images cache object by checking to see if a dom element
 *          should be added to the cache
 *
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in images cache
 */

OpenAjax.a11y.cache.TextCache.prototype.updateCacheItems = function (dom_element) {

  if (dom_element.type === Node.TEXT_NODE) {

//    OpenAjax.a11y.logger.debug("  ADDED TEXT: " + dom_element.text );

    this.addTextNode(dom_element);

  }

};

/**
 * @method traverseDOMElementsForTextNodes
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Traverses DOM Element objects in the tree to update the text cache
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in images cache
 */

OpenAjax.a11y.cache.TextCache.prototype.traverseDOMElementsForTextNodes = function (dom_element) {

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForTextNodes(dom_element.child_dom_elements[i]);
    } // end loop
  }
  else {
     this.updateCacheItems(dom_element);
  }

};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.TextCache
 *
 * @desc Traverses the DOMElements to update the text cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the links cache are disabled, this cache would
 *       not be updated
 */

OpenAjax.a11y.cache.TextCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;

  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForTextNodes(children[i]);
  }

  this.up_to_date = true;
};

