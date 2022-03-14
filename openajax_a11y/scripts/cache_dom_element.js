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
 * See the License for the specific language governing permissions andf
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*                       DOMElementCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMElementCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a DOMElementCache object for represeting a DOM in a web browser
 *
 * @property {Array}  dom_elements        - A simple array of all the DOMElement objects in the cache
 * @property {Array}  dom_text            - A simple array of all the DOMText objects in the cache
 * @property {Object} page_element        - The dom element that is used as a place to collect results for rules with scope of page
 * @property {Array}  child_dom_elements  - The roor of a tree of DOMElement objects representing the node relationships on the DOM
 * @property {String} sort_property       - String  The DOMElement property the dom_elements array is sorted by
 * @property {Number} length              - The running length of the dom_elements array used for calculating the cache_id property of a DOMElement
 */

OpenAjax.a11y.cache.DOMElementCache = function () {

 this.dom_elements = [];
 this.dom_text = [];

 this.child_dom_elements = [];

 this.page_element = null;

 this.sort_property = 'document_order';
 this.length = 0;
 this.text_length = 0;

};

/**
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Initializes properties of the DOMElementCache
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.initCache = function () {

 this.dom_elements         = [];
 this.child_dom_elements   = [];
 this.sort_property        = 'document_order';
 this.page_element         = null;
 this.length               = 0;

};

/**
 * @method getPageElement
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Gets the DOM node used to contain page level rule results
 *
 * @return {DOMElement} DOM element object used to contain page level rule results
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getPageElement = function () {

 return this.page_element;

};

/**
 * @method addDOMElement
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement object to the array of all DOMElements and calculates the elements cache ID
 *
 * @param {DOMElement}  dom_element  - DOMElement object to add
 *
 * @return  {Number}  Returns the current number of elements in the array of DOMElements
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMElement = function (dom_element) {

  // item must exist and have the position property
  if (dom_element) {
    this.length = this.length + 1;
    dom_element.document_order = this.dom_elements.length + 1;
    dom_element.cache_id = "element_" + this.length;
    this.dom_elements.push( dom_element );

    // only one page element per page
    if (!this.page_element &&
        (dom_element.tag_name === 'body')) {
      this.page_element = dom_element;
    }
 }

 return this.dom_elements.length;

};

/**
 * @method addDOMText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOM text object to the array of all DOM text and calculates the cache ID
 *
 * @param {DOMText}  dom_text  - DOM text object to add
 *
 * @return  {Number}  Returns the current number of elements in the array of DOM text objects
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMText = function (dom_text) {

 // item must exist and have the position property
 if (dom_text) {
  this.text_length  += 1;
  dom_text.document_order = this.text_length;
  dom_text.cache_id       = "text_" + this.text_length;
  this.dom_text.push(dom_text);
 }

 return this.dom_text.length;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement or DOMText object to the root level of the tree reflecting the DOM of document
 *
 * @param {DOMElement | DOMText} dom_object  - DOMElement or DOMText object to add to the tree
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addChild = function (dom_object) {

  if (dom_object) {
    this.child_dom_elements.push(dom_object);
  }
};

/**
 * @method getDOMElementById
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns the DOMElement object with the id attribute value
 *
 * @param {String} id - id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated id if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementById = function (id) {

  var dom_elements     = this.dom_elements;
  var dom_elements_len = dom_elements.length;

  if (id && id.length) {
    for (var i = 0; i < dom_elements_len; i++) {
      var de = dom_elements[i];
      if (de.id === id) {
        return de;
      }
    } // end loop
  }
  return null;
};


/**
 * @method getDOMElementByName
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns the DOMElement object with the id attribute value
 *
 * @param {String} name - name of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated name if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByName = function (name) {

  var dom_elements     = this.dom_elements;
  var dom_elements_len = dom_elements.length;

  if (name && name.length) {
    for (var i = 0; i < dom_elements_len; i++) {

      var de = dom_elements[i];

      if (de.has_name && (de.name === name)) {
        return de;
      }
    } // end loop
  }
  return null;
};

/**
 * @deprecated getDOMElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var dom_elements_len = this.dom_elements.length;

  if (cache_id && cache_id.length) {
    for (i=0; i < dom_elements_len; i++) {
      if (this.dom_elements[i].cache_id == cache_id) {
        return this.dom_elements[i];
      }
    } // end loop
  }
  return null;
};


/**
 * @method getItemsByElementResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns an array of cache items with node results based on the filter
 *
 * @param  {Number}  filter  - Filter for returning items with node results of a
 *                             particular type(s)
 *
 * @return {Array} Returns array of cache items, can be empty
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemsByElementResults = function (filter, all_flag) {

  return OpenAjax.a11y.util.getItemsByElementResults(this.dom_elements, filter, all_flag);

};


/**
 * @method getTextFromIds
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc    Gets the accessible text content from a list of ids
 *
 * @note    Used in calculating accessible names, labels and descriptions
 *
 * @param   {String} ids - a space separated list of ids
 *
 * @return  {String} Returns a string with the concatenated text content of the elements with ids
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getTextFromIds = function( ids ) {

  var i;
  var text_array = [];
  var id_array = ids.split(' ');
  var id_array_len = id_array.length;
  var dom_element = null;

  for (i=0; i<id_array_len; i++) {
    dom_element = this.getDOMElementById(id_array[i]);
    if (dom_element) {
      text_array.push(dom_element.getText());
    }
  } // end loop

  return text_array.join(' ');
};

/**
 * @method getUndefinedIds
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc    Idenfies any undefined ids in the DOM from a string of ids
 *
 * @note    Tests if a list of ids are include valid values
 *
 * @param   {String} ids - a space separated list of ids
 *
 * @return  {String} Returns a string containing the list of invalid ids
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getUndefinedIds = function( ids ) {

  var i;
  var invalid_ids = [];
  var id_array = ids.split(' ');
  var id_array_len = id_array.length;

  for (i=0; i<id_array_len; i++) {
    var id = id_array[i];
    var dom_element = this.getDOMElementById(id);
    if (!dom_element) invalid_ids.push(id);
  } // end loop

  return invalid_ids.join(' ');
};


/**
 * @method checkForUniqueIDs
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Check DOMElements for unique ids and set id_unique property for all DOMElements in the cache
 *       Sets the 'id_unique' property on DOMElement objects that do not have unique ID attribute values
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.checkForUniqueIDs = function () {

  var i;
  var j;

  var dom_elements = this.dom_elements;
  var dom_elements_len1 = dom_elements.length-1;
  var dom_elements_len2 = dom_elements.length;

  var de1;
  var de2;

  for (i = 0; i < dom_elements_len1; i++ ) {
    de1 = dom_elements[i];

    for (j=i+1; j < dom_elements_len2; j++) {
      de2 = dom_elements[j];

      if(de1.id.length && de2.id.length && de1.id == de2.id) {
        de1.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de2.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
      }
    }
  }
};


/* ---------------------------------------------------------------- */
/*                       DOMText Object                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMText
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc DOMText object represents DOM nodes of type text
 *
 *
 * @param  {Object}      node           - The DOM text node
 * @param  {DOMElement}  parent_element - DOMElement object that is the current parent in the tree
 *
 * @property  {LandmarkElement}  parent_landmark - LandmarkElement object that contains the text content
 * @property  {DOMElement}       body_element    - DOMElement of the body element that this element is
 *                                                 this is important for testing if elements are in the
 *                                                 same document if their are frames and iframes
 *
 * @property {Number}  type - Type of DOM node element or text
 * @property {String}  text - Text content of DOM text node
 *
 * @property {String}   text_normalized         - Normalized text in the node
 * @property {Number}   text_length             - length of the normalized text in the node
 *
 * @property {String}  cache_id        - String that uniquely identifies the cache element in the DOMCache
 * @property {Number}  document_order  - The ordinal position of this DOM text node in the DOM
 *
 * @property {Object}  computed_style  - Object that contains information about run time styling of the node
 * @property {Object}  events          - Object that contains information about event handlers attached to the node and its descendents
 *
 * @property {Boolean}  has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}    rules_violations       - Array of ElementResult objects with severity of 'Violation'
 * @property {Array}    rules_manual_checks    - Array of ElementResult objects with severity of 'Manual Check'
 * @property {Array}    rules_warnings         - Array of ElementResult objects with severity of 'Warning'
 * @property {Array}    rules_passed           - Array of ElementResult objects with severity of 'Passed'
 * @property {Array}    rules_hidden           - Array of ElementResult objects with severity of 'Hidden'
 */

OpenAjax.a11y.cache.DOMText = function (node, parent_element) {

  this.node = node;
  this.type = Node.TEXT_NODE;
  this.text = node.data;
  this.parent_element = parent_element;

  this.parent_landmark      = null;
  this.body_element         = null;

  this.text_normalized = OpenAjax.a11y.util.normalizeSpace(this.text);
  var text_length      = this.text_normalized.length;
  this.text_length     = text_length;

  parent_element.addToCharacterCount(text_length);

  this.computed_style = parent_element.computed_style;

  // Create areas to store rule results associates with this node
  this.has_rule_results = false;
  this.rules_violations                = [];
  this.rules_manual_checks             = [];
  this.rules_warnings                  = [];
  this.rules_passed                    = [];
  this.rules_hidden                    = [];
};

/**
 * @method addText
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   Check DOMElement for presence of attribute with specified value
 *
 * @param  {String} text  - text content to add
 *
 * @return {Number}  Length of the normailized text content of the DOM text node
 */

OpenAjax.a11y.cache.DOMText.prototype.addText = function (text) {

  this.text += text;

  this.text_normalized = OpenAjax.a11y.util.normalizeSpace(this.text);

  var text_length = this.text_normalized.length;

  this.parent_element.addToCharacterCount(text_length - this.text_length);

  this.text_length = text_length;

};


/**
 * @method getId
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   If defined, return the id of the dom node containing this text
 *
 * @return {String} If defined return id value, else empty string
 */

OpenAjax.a11y.cache.DOMText.prototype.getId = function () {

  return this.parent_element.getId();

};

/**
 * @method getClassName
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   If defined, return the class attribute value of the dom node containing this text
 *
 * @return {String} If defined return class value value, else empty string
 */

OpenAjax.a11y.cache.DOMText.prototype.getClassName = function () {

  return this.parent_element.getClassName();

};

/**
 * @method getParentLandmark
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   If defined, return the parent landmark element information
 *
 * @return {String} If defined return class value value, else empty string
 */

OpenAjax.a11y.cache.DOMText.prototype.getParentLandmark = function () {

  return this.parent_element.getParentLandmark();

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMText.prototype.getElementResults = function () {

  function addResultNodes(items) {

    var len = items.length;

    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }

  }

  var result_nodes = [];

  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_hidden);

  return result_nodes;

};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the worst severity level of rule results
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMText.prototype.getAccessibility = function () {

  var cache_nls      = OpenAjax.a11y.nls.Cache;
  var RESULT_VALUE       = OpenAjax.a11y.RESULT_VALUE;

  var severity = cache_nls.getResultValueNLS(RESULT_VALUE.NONE);

//  if (this.rules_hidden.length) {
//    severity = cache_nls.getResultValueNLS(RESULT_VALUE.HIDDEN);
//  }

  if (this.rules_passed.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.PASS);
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.MANUAL_CHECK);
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.WARNING);
  }

  if (this.rules_violations.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.VIOLATION);
  }

  return severity;

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have attributes
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getAttributes = function () {

  return [];

};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have events
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getEvents = function () {

  return [];

};


/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'text_normalized');
  cache_nls.addPropertyIfDefined(properties, this, 'text_length');
  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');

  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');
  cache_nls.addPropertyIfDefined(properties, this, 'body_element');

  return properties;

};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_onscreen');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_to_at');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_style');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_width');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_focus');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_before');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_after');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMText.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    if (typeof this.computed_style[property] == 'undefined') {
      if (typeof this.parent_element[property] == 'undefined') {
        if (this.parent_landmark) {
          if (typeof this.parent_landmark[property] == 'undefined') {
            if (typeof this.parent_landmark.dom_element[property] == 'undefined') {
              return null;
            }
            else {
              return this.parent_landmark.dom_element[property];
            }
          }
          else {
            return this.parent_landmark[property];
          }
        }
      }
      else {
        return this.parent_element[property];
      }
    }
    else {
      return this.computed_style[property];
    }
  }

  return this[property];
};


/**
 * @method getColorContrastElementResult
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns a node result for a color contrast rule
 *
 * @return {Object} Returns node result object of a color contrast rule
 */

OpenAjax.a11y.cache.DOMText.prototype.getColorContrastElementResult = function() {

  function findColorContrastRule(node_results) {

    var node_results_len = node_results.length;

    for (var i = 0; i < node_results_len; i++ ) {

      var node_result = node_results[i];

      var rule_id = node_result.getRuleId();

      if (rule_id === "COLOR_1") return node_result;
      if (rule_id === "COLOR_2") return node_result;

    }

    return null;
  }

  var nr = findColorContrastRule(this.rules_violations);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_manual_checks);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_warnings);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_passed);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_hidden);
  if (nr) return nr;

  return null;

};

/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text content of a DOMText element
 *
 * @return {String} Returns the text content dom text node
 */

OpenAjax.a11y.cache.DOMText.prototype.getText = function() {
  return this.text_normalized;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text representation of a DOMText element
 *
 * @return {String} Returns a string representing the DOM text node
 */

OpenAjax.a11y.cache.DOMText.prototype.toString = function(option) {
  var str;

  if (option == 'text') str = "'" +  this.text_normalized + "'";
  else str = this.parent_element.tag_name + ": '" +  this.text_normalized + "'";

  return str;
};


/* ---------------------------------------------------------------- */
/*                       DOMElement Object                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc The DOMElement object represents a dom node of a document
 *
 * @param {Object} node                     - DOM node object of the element
 * @param {Object} parent_element           - DOMElement object that is the parent element of this node
 *
 * @property  {String}    cache_id            - String that uniquely identifies the cache element in the DOMCache
 * @property  {String}    xpath               - String that identifies the position of the element in the document
 *
 * @property {Array}      child_dom_elements  - The child DOMElement and DOMText objects of this DOMElement in the tree
 * @property {DOMElement} parent_element      - The parent DOMElement of this DOMElement in the tree
 *
 * @property {LandmarkElement}  parent_landmark - LandmarkElement object that contains this element
 * @property  {DOMElement}       body_element    - DOMElement of the body element that this element is
 *                                                 this is important for testing if elements are in the
 *                                                 same document if their are frames and iframes
 *
 * @property {Number}     type                - Type of DOM node is element
 * @property {Number}     document_order      - The ordinal position of this DOM element node in the DOM
 *
 * @property {Object}     node                - Reference to the 'live' DOM element represented by this object
 * @property {String}     tag_name            - Tag name of the HTML element in lowercase characters (i.e. p, div, h1, span ...)
 * @property {Array}      aria_attributes     - Array of ARIA properties and states defined for the node
 *
 * @property {String}     id         - id attribute value of the DOM node (can be empty)
 * @property {Number}     id_unique  - Indicates if id is defined, unique or has a duplicate in the document
 *
 * @property {Number}     character_count  - Count of text charcters in the immediate child DOM text nodes
 *
 * @property {String}     class_name     - The value of the class attribute of the DOM node
 * @property {String}     role           - The value of the role attribute of the DOM node
 *
 * @property {String}     alt      - String   The value of the alt attribute of the DOM node
 * @property {Boolean}    has_alt  - true if the alt attribute is defined, otherwise false
 *
 * @property {String}     src      - String   The value of the src attribute of the DOM node
 * @property {Boolean}    has_src  - true if the src attribute is defined, otherwise false
 *
 * @property {String}     href      - String   The value of the href attribute of the DOM node
 * @property {Boolean}    has_href  - true if the href attribute is defined, otherwise false
 *
 * @property {String}     title               - The value of the title            attribute of the DOM node
 * @property {String}     aria_describedby    - The value of the aria-describedby attribute of the DOM node
 * @property {String}     aria_hidden         - The value of the aria-hidden      attribute of the DOM node
 * @property {String}     aria_label          - The value of the aria-label       attribute of the DOM node
 * @property {String}     aria_labelledby     - The value of the aria-labelledby  attribute of the DOM node
 *
 * @property {Boolean}     has_aria_activedescendant     - True if the current element has defined aria-activedescendent attribute, otherwise false
 * @property {Boolean}     ancestor_has_aria_activedescendant - True if a ancestor element has defined aria-activedescendent attribute, otherwise false
 *
 * @property {String}     calculated_aria_description  - If aria-describedby defined this is a string of the
 *                                                       description content
 *
 * @property {String}     role                - Implicit or set role on the element
 * @property {String}     implicit_role       - Implict role of the elements based on ARIA in HTML spec
 * @property {Boolean}    has_role            - True if element has a role value, otherwise false
 * @property {Boolean}    has_aria_owns            - True if element has a aria-owns property, otherwise false
 * @property {Boolean}    has_aria-attributes - True if element has a aria attributes, otherwise false
 * @property {Boolean}    is_widget           - True if element is a ARIA widget, otherwise false
 * @property {Boolean}    is_landmark         - True if element is a ARIA landmark, otherwise false
 * @property {Boolean}    is_live             - True if element is a ARIA live region, otherwise false
 * @property {Boolean}    is_section          - True if element is a section role, otherwise false
 * @property {Array}      aria_attributes     - Array of ARIA property and state attributes (i.e. attributes
 *                                              beginning with 'aria-')
 * @property {Array}      other_attributes    - Array of other attribute names and values found on the element
 *                                              not sotred in another property of this object
 *
 * @property {Array}      invalid_aria_attributes             - Array of attributes that start with aria-, but are not defined by aria
 * @property {Array}      aria_attributes_with_invlaid_values - Array of attributes who have
 *
 *
 * @property {Object}     role_info       - Object containing information about a widget
 * @property {Object}     owned_by        - Array of reference to Widget objects that own the dom element using aria-owns
 * @property {Object}     widget_element  - Reference to the corresponding widget element
 *
 *
 * @property {Object}     events              - Object that contains information about events associated with the node
 * @property {Object}     computed_style      - Object that contains information about run time styling of the node
 * @property {Boolean}    has_outline         - True if element CSS outline property is not 'none' and 'width' > 0
 *
 * @property {Boolean}    has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}      rules_passed           - Array of ElementResult objects with severity of 'Passed'
 * @property {Array}      rules_violations       - Array of ElementResult objects with severity of 'Violation'
 * @property {Array}      rules_manual_checks    - Array of ElementResult objects with severity of 'Manual Check'
 * @property {Array}      rules_warnings         - Array of ElementResult objects with severity of 'Warning'
 * @property {Array}      rules_hidden           - Array of ElementResult objects with severity of 'Hidden'
 *
 * @param {Object}    node            - The DOM text node
 * @param {DOMElement}  parent_element  - DOMElement object that is the parent DOMElement object in the tree
 * @param {doc}   document  - Document object of the current page being analyzed, only defined when element
                              is a 'body' element to get information about events attached to the document
 */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element, doc) {

  function addAriaAttribute (name, value) {

    function getTokens(list) {

      var str = "";
      var last = list.length - 1;

      for (var i = 0; i < list.length; i++) {
         str += list[i];
         if (i !== last) str += " | ";
      }

      return str;
    }

    function validValue(value, type, values, allowUndeterminedValue) {

      var i;
      var j;

      var v = parseInt(value, 10);

      switch (type) {

      case 'boolean':
        if (value === 'true' || value === 'false') return true;
        break;

      case 'decimal':
        if (typeof parseFloat(value) === 'number') return true;
        break;

      case 'idref':
        if (value.length) return true;
        break;

      case 'idrefs':
        if (value.length) return true;
        break;

      case 'integer':
        if (!isNaN(v) &&
            ( v > 0) ||
            (allowUndeterminedValue && (v === -1 || v === 0))) {
          return true;
        }
        break;

      case 'nmtoken':
        for (i = 0; i < values.length; i++) {
          if (value === values[i]) return true;
        }
        break;

      case 'tristate':
      case 'nmtokens':
        var tokens = [];
        tokens.push(value);
        if (value.indexOf(' ') > 0) tokens = value.split(' ');

        var flag = true;

        for (i = 0; i < tokens.length && flag; i++) {
          flag = false;
          for (j = 0; j < values.length && !flag; j++) {
            if (tokens[i] === values[j]) flag = true;
          }
        }
        return flag;

      case 'number':
        if (!isNaN(value) && value.length) return true;
        break;

      case 'positive':
        if (!isNaN(value) &&
            (parseInt(value, 10) > 0)) return true;
        break;

      case 'string':
        if (value.length) return true;
        break;

      default:
        break;

      }

      return false;

    }   // end addAriaAttribute function

    var property_info = OpenAjax.a11y.aria.propertyDataTypes[name];

    var av = {};
    av.name = name;
    av.value = value;
    av.type = "undefined";
    av.is_valid_attribute = true;
    av.is_value_valid     = false;
    av.tokens = null;

    if (property_info) {
      av.type = property_info.type;
      if (property_info.values && property_info.values.length) {
        av.tokens = getTokens(property_info.values);
      }

      if (typeof property_info.values !== 'undefined') {
        av.is_value_valid = validValue(av.value, av.type, property_info.values, property_info.allowUndeterminedValue);
      } else {
        av.is_value_valid = validValue(av.value, av.type, []);
      }
    }
    else {
      av.is_valid_attribute = false;
      invalid_aria_attributes.push(av);
    }
    aria_attributes.push(av);
  }


  function addOtherAttribute (name, value) {

    var oa = {};
    oa.name  = name;
    oa.value = "";

    if (typeof value !== 'undefined') {
      oa.value = value;
      other_attributes.push(oa);
    }
    else {
      if ((name === 'required') ||
          (name === 'readonly') ||
          (name === 'disabled') ||
          (name === 'multiple')) {
        other_attributes.push(oa);
      }
    }
  }


  var i;
  var attr;
  var attributes;
  var role_info;

  // check to make sure it is a valid node
  if (!node) return null;


  this.document = doc;

  this.has_element_children = false;

  this.type           = Node.ELEMENT_NODE;
  this.document_order = 0;
  this.node           = node;
  this.tag_name       = node.tagName.toLowerCase();
  this.id             = node.id;
  this.name           = "";

//  OpenAjax.a11y.logger.debug("[DOMElement][tag_name]: " + this.tag_name);

  this.owned_by = [];
  this.widget_element = null;

  this.element_aria_info = OpenAjax.a11y.ariaInHTML.getElementAriaInfo(node);

//  OpenAjax.a11y.logger.debug("[DOMElement][element_aria_info]: " + this.element_aria_info);

  if (!this.id || this.id.length === 0) {
    this.id_unique  = OpenAjax.a11y.ID.NOT_DEFINED;
  }
  else {
    this.id_unique  = OpenAjax.a11y.ID.UNIQUE;
  }

  this.character_count = 0;

  // Save relationships with other elements
  this.parent_element = parent_dom_element;
  this.child_dom_elements = [];

  var aria_attributes = [];
  var invalid_aria_attributes = [];
  var other_attributes = [];

  this.parent_landmark = null;
  this.body_element    = null;

  // Cache important attributes for accessibility
  i = 0;
  attr = null;
  attributes = node.attributes;

  this.html_attrs = {};
  this.aria_attrs = {};

  this.class_name = "";

  if (typeof node.className === 'string') this.class_name = node.className;

//  OpenAjax.a11y.logger.debug("[DOMElement][tag_name]" + this.tag_name);

  this.tab_index = node.tabIndex;

//  OpenAjax.a11y.logger.debug("[DOMElement]: " + node.tagName + "; tabindex: " + this.tab_index+ "; is number: " + !isNaN(this.tab_index));

  this.draggable = undefined;

  this.is_interactive  = false;
  if ((this.tag_name === 'a') ||
      (this.tag_name === 'button') ||
      (this.tag_name === 'input') ||
      (this.tag_name === 'select') ||
      (this.tag_name === 'textarea') ||
      (this.tag_name === 'video') ||
      (this.tag_name === 'audio') ||
      (this.tag_name === 'object') ||
      (this.tag_name === 'embed') ||
      (this.tag_name === 'applet')) {
    this.is_interactive  = true;
  }

  this.input_type = '';
  if (this.tag_name === 'input') {
    this.input_type = 'text';

    if (node.getAttribute('type')) {
      this.input_type = node.getAttribute('type');
    }

    this.input_type = this.input_type.toLowerCase();

  }

  this.is_widget       = false;
  this.is_implied_role = false;
  this.is_landmark     = false;
  this.is_live         = false;
  this.is_section      = false;
  this.is_abstract     = false;
  this.is_presentation = false;
  this.is_group        = false;

  this.has_alt                   = false;
  this.has_aria_atomic           = false;
  this.has_aria_attributes       = false;
  this.has_aria_activedescendant = false;
  this.has_aria_controls         = false;
  this.has_aria_describedby      = false;
  this.has_aria_flowto           = false;
  this.has_aria_hidden           = false;
  this.has_aria_invalid          = false;
  this.has_aria_label            = false;
  this.has_aria_labelledby       = false;
  this.has_aria_live             = false;
  this.has_aria_owns             = false;
  this.has_aria_required         = false;
  this.has_autofocus             = false;
  this.has_headers               = false;
  this.has_href                  = false;
  this.has_type_attr             = false;
  this.has_lang                  = false;
  this.has_longdesc              = false;
  this.has_name                  = false;
  this.has_pattern               = false;
  this.has_placeholder           = false;
  this.has_required              = false;
  this.has_role                  = false;
  this.has_scope                 = false;
  this.has_src                   = false;
  this.has_summary               = false;
  this.has_tabindex              = false;
  this.has_title                 = false;
  this.has_value                 = false;


  this.implicit_role  = this.element_aria_info.defaultRole;
  this.role           = "";
  this.role_info      = null;
  this.aria_invalid   = false;
  this.aria_required  = false;
  this.title = '';


  this.ancestor_has_aria_activedescendant = false;
  if (parent_dom_element) this.ancestor_has_aria_activedescendant = parent_dom_element.ancestor_has_aria_activedescendant;

  // Check for ARIA Attributes

  for (i = 0; i < attributes.length; i++) {

    attr = attributes[i];

    if (attr.name.toLowerCase().indexOf('aria-') === 0) {
      this.aria_attrs[attr.name] = attr.value;
    } else {
      this.html_attrs[attr.name] = attr.value;
    }

    var attr_value = OpenAjax.a11y.util.normalizeSpace(attr.value);

    switch (attr.name) {

    case 'alt':
      this.alt = attr.value;
      this.has_alt = true;
      addOtherAttribute(attr.name, attr_value);
      break;

    case 'aria-activedescendant':
      this.has_aria_activedescendant = true;
      addAriaAttribute('aria-activedescendant', attr_value);
      break;

    case 'aria-atomic':
      this.has_aria_atomic = true;
      this.aria_atomic = attr_value;
      addAriaAttribute('aria-atomic', attr_value);
      this.has_aria_attributes = true;
      break;

    case 'aria-controls':
      this.has_aria_controls  = true;
      addAriaAttribute('aria-controls', attr_value);
      break;

    case 'aria-describedby':
      this.has_aria_describedby = true;
      this.aria_describedby = attr_value;
      addAriaAttribute('aria-describedby', attr_value);
      this.has_aria_attributes = true;
      break;

    case 'aria-flowto':
      this.has_aria_flowto  = true;
      this.aria_flowto = attr_value;
      addAriaAttribute('aria-flowto', attr_value);
      break;

    case 'aria-hidden':
      this.aria_hidden = attr_value.toLowerCase();
      addAriaAttribute('aria-hidden', attr_value);
      this.has_aria_attributes = true;
      this.has_aria_hidden = true;
      break;

    case 'aria-invalid':
      this.aria_invalid = attr_value.toLowerCase() === 'true';
      addAriaAttribute('aria-invalid', attr_value);
      this.has_aria_invalid = true;
      break;

    case 'aria-label':
      this.aria_label = attr_value;;
      addAriaAttribute('aria-label', attr_value);
      this.has_aria_label = true;
      break;

    case 'aria-labelledby':
      this.has_aria_labelledby = true;
      this.aria_labelledby = attr_value;;
      addAriaAttribute('aria-labelledby', attr_value);
      break;

    case 'aria-live':
      this.is_live  = true;
      this.has_aria_live = true;
      this.aria_live = attr_value;
      addAriaAttribute('aria-live', attr_value);
      this.has_aria_attributes = true;
      break;

    case 'aria-owns':
      this.has_aria_owns  = true;
      this.aria_owns = attr_value;
      addAriaAttribute('aria-owns', attr_value);
      break;


    case 'aria-required':
      this.aria_required = attr_value.toLowerCase() === 'true';
      addAriaAttribute('aria-required', attr_value);
      this.has_aria_required = true;
      break;

    case 'autofocus':
      this.has_autofocus  = true;
      break;

    case 'class':
      this.class_name = attr_value.toLowerCase();
      addOtherAttribute(attr.name, attr_value);
      break;

    case 'draggable':
      this.draggable = attr_value.toLowerCase();
      addOtherAttribute(attr.name, attr_value);
      break;

    case 'headers':
      if (attr_value.length > 0) this.has_headers = true;
      break;

    case 'href':
      this.has_href = true;
      this.href = attr_value;
      addOtherAttribute('href', attr_value);
      break;

    case 'lang':
      this.lang = attr_value;
      this.has_lang = true;
      addOtherAttribute(attr.name, attr_value);
      break;

    case 'name':
      this.has_name = true;
      this.name = attr_value;
      break;

    case 'longdesc':
      if (attr_value.length > 0) {
        this.has_longdesc = true;
        this.longdesc = attr_value;
      }
      break;

    case 'pattern':
      if (attr_value.length > 0) this.has_pattern = true;
      break;

    case 'placeholder':
      if (attr_value.length > 0) this.has_placeholder = true;
      break;

    case 'required':
      this.has_required = true;
      break;

    case 'type':
      if (attr_value.length > 0) {
        this.has_type_attr = true;
        this.type_attr     = attr_value.toLowerCase();
      }
      break;


    case 'role':

      var role = attr_value.toLowerCase();

      this.has_role = true;
      this.role = role;

      role_info = OpenAjax.a11y.aria.getRoleObject(role);

      if (!role_info || !role_info.roleType) continue;

      this.role_info = role_info;

      if (role === 'group') this.is_group = true;
      if (role === 'none') this.is_presentation = true;
      if (role === 'presentation') this.is_presentation = true;

      if (role_info.roleType.indexOf('range') >= 0) {
        this.is_range = true;
      }

      if (role_info.roleType.indexOf('widget') >= 0 ||
          role_info.roleType.indexOf('window') >= 0) {

        this.is_interactive = true;
        this.is_widget = true;
        this.is_tab_stoppable = true;
        if (role_info.container && role_info.container.length) {
          this.is_tab_stoppable = false;
        }
      }

      this.is_landmark = role_info.roleType.indexOf('landmark') >= 0;
      this.is_live = role_info.roleType.indexOf('live') >= 0;
      this.is_section = role_info.roleType.indexOf('section') >= 0 || role_info.roleType.indexOf('structure') >= 0;
      this.is_abstract = role_info.roleType.indexOf('abstract') >= 0;

      break;

    case 'scope':
      this.scope = attr.value;
      if (attr_value.length > 0) this.has_scope = true;
      break;

    case 'src':
      this.has_src = true;
      this.src = attr.value;
      addOtherAttribute('src', attr.value);
      break;

    case 'summary':
      this.summary = attr.value;
      if (attr_value.length > 0) this.has_summary = true;
      break;

    case 'tabindex':
      if (!isNaN(attr.value)) {
        this.tabindex = attr.value;
        this.has_tabindex = true;
      }
      break;

    case 'title':
      this.has_title = true;
      this.title = attr.value;
      break;

    case 'value':
      this.has_value = true;
      this.value = attr.value;
      break;

    default:

      if (attr.name.indexOf('aria-') === 0 ) {
        addAriaAttribute(attr.name, attr_value);
        this.has_aria_attributes = true;
      }
      else {
        addOtherAttribute(attr.name, attr_value);
      }
      break;

    } // end switch
  } // end loop


  this.aria_attributes          = aria_attributes;
  this.other_attributes         = other_attributes;
  this.invalid_aria_attributes  = invalid_aria_attributes;

  this.events = {};
  this.events.supports_events = false;

  switch (OpenAjax.a11y.EVENT_HANDLER_PROCESSOR) {

  case 'firefox':
    this.events = this.EnumerateFirefoxEvents(node, parent_dom_element);
    break;

  case 'fae-util':
    this.events = this.EnumerateFaeUtilEvents(node, parent_dom_element);
    break;

  default:
    this.events = this.EnumerateInlineEvents(node, parent_dom_element);
    break;
  }


  // Create areas to store rule results associates with this node
  this.has_rule_results = false;
  this.rules_violations                = [];
  this.rules_manual_checks             = [];
  this.rules_warnings                  = [];
  this.rules_passed                    = [];
  this.rules_hidden                    = [];

//  OpenAjax.a11y.logger.debug("[DOMElement][done]");

  return this;

};

/**
 * @method getAttributeValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Get attribute value, if not defined by author returns default value, if no default
 *        value returns empty string
 *
 * @param  {String} attr          - ARIA Attribute to get value
 *
 * @return {String or Number} - Value of attribute based on the value type of the attribute,
 *                              if not defined return empty string
 }
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAttributeValue = function (attr) {


  function valueAsPropertyType(value) {

    var v;

    if (value) {
      switch (attr_info.type) {
        case 'decimal':
          v = parseFloat(value);
          if (!isNaN(v)) {
            value = v;
          }
          break;

        case 'number':
        case 'integer':
          v = parseInt(value, 10);
          if (!isNaN(v)) {
            value = v;
          }
          break;

        default:
          break;
      }
    }

    return value;
  }

  var value = '';
  var attr_info = OpenAjax.a11y.aria.propertyDataTypes[attr];

  if (attr_info) {
    // Try IDL first
    if (attr_info.idlAttribute) {
      value = this.node[attr_info.idlAttribute];
    }

    if (!value) {
      value = this.node.getAttribute(attr);
      if (!value) {
        value = attr_info.defaultValue;
      }
    }
  }

  return valueAsPropertyType(value);
}

/**
 * @method isAttributeValueValid
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Checkes the value based on the property information information
 *        for a valid value
 *
 * @param  {String}           attr - ARIA Attribute to validate
 * @param  {String or Number} value - Value to validate
 *
 * @return {Boolean} true if allowed value and type, otherwise false
 */

OpenAjax.a11y.cache.DOMElement.prototype.isAttributeValueValid = function (attr, value) {

  var attr_info = OpenAjax.a11y.aria.propertyDataTypes[attr];

  var flag = false;

  var v = parseInt(value, 10);

  switch (attr_info.type) {

  case 'boolean':
    flag = typeof value === 'boolean';
    break;

  case 'number':
  case 'decimal':
    flag = typeof value === 'number';
    break;

  case 'idref':
  case 'idrefs':
  case 'string':
    flag = (typeof value === 'string') && (value.length > 0);
    break;

  case 'integer':
  case 'positive':
    if ((typeof v === 'number') &&
        ((v > 0) ||
         (attr_info.type.allowUndeterminedValue && (v === -1 || v === 0)))) {
      flag = true;
    }
    break;

  case 'tristate':
  case 'nmtoken':
    flag = attr_info.values.indexOf(value.toLowerCase()) >= 0;
    break;

  case 'nmtokens':
    var values = value.split(' ');
    flag = true;
    for (var i = 0; i < values.length && flag; i += 1) {
      flag = flag && (attr_info.values.indexOf(values[i]) >= 0);
    }
    break;

  default:
    break;

  }

//  console.log('[valid][' + attr + '][value]: ' + value + ' (' + (typeof value) + ')' + ' [flag]: ' + flag);

  return flag;

}

/**
 * @method addOwnedby
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Updates array of reference to widget elements that own this dom element
 *
 * @param  {object} widget_element - Widget element that owns
 } r
 */

OpenAjax.a11y.cache.DOMElement.prototype.addOwnedBy = function (widget_element) {

  function updateReferences(de) {
    // a widget element can only own this node once
    if (de.owned_by.indexOf(widget_element) < 0) {
      var role = widget_element.dom_element.role;
      if (de.role_info && de.role_info.requiredParents.indexOf(role) >= 0) {
        de.owned_by.push(widget_element);
      }
    }

    if (widget_element.owned_dom_elements.indexOf(de) < 0) {
      widget_element.owned_dom_elements.push(de);
    }

    for (var i = 0; i < de.child_dom_elements.length; i += 1) {
      var child_de = de.child_dom_elements[i];
      if (child_de.type === Node.ELEMENT_NODE) {
        updateReferences(child_de);
      }
    }

  }

  updateReferences(this);

};

/**
 * @method setImpliedRole
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Sets an implid role for the DOM element
 *
 * @param  {String} role - new role for the element
 */

OpenAjax.a11y.cache.DOMElement.prototype.setImpliedRole = function (role) {

  if (!this.has_role && typeof role === 'string' && (role.length > 0)) {

    var role_info = OpenAjax.a11y.aria.getRoleObject(role);

    if (!role_info) return;

    this.has_role = true;
    this.role = role;
    this.is_implied_role = true;

    this.role_info = role_info;

    if (role_info && role_info.roleType) {

      if (role_info.roleType.indexOf('widget') >= 0 ||
          role_info.roleType.indexOf('window') >= 0) {
        this.is_widget = true;
      }

      if (role_info.roleType.indexOf('landmark') >= 0) {
        this.is_landmark = true;
      }

      if (role_info.roleType.indexOf('live') >= 0) {
        this.is_live = true;
      }

      if (role_info.roleType.indexOf('abstract') >= 0) {
        this.is_abstract = true;
      }

      if (role_info.roleType.indexOf('section') >= 0) {
        this.is_section = true;
      }

    }
  }
};

/**
 * @method getId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   If definded, return the id of the dom node
 *
 * @return {String} If defined return id value, else empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.getId = function () {

  if (this.id) return this.id;

  return "";

};

/**
 * @method getRole
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   If definded, return the role
 *
 * @return {String} If defined return role value, else empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.getRole = function () {

  if (this.role) return this.role;

  return "";

};

/**
 * @method getClassName
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   If defined, return the class attribute value of the dom node
 *
 * @return {String} If defined return class value value, else empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.getClassName = function () {

  if (this.class_name) return this.class_name;

  return "";

};


/**
 * @method getParentLandmark
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   If defined, return the parent landmark element information
 *
 * @return {String} If defined return class value value, else empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.getParentLandmark = function () {

  if (this.parent_landmark) return this.parent_landmark.toString();

  return "none";

};


/**
 * @method hasOwns
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Check DOMElement for presence of aria-owns attribute
 *
 * @return {boolean} Indicates whether or not DOMElement has aria-owns attribute with values
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasOwns = function () {

  return this.has_aria_owns;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getElementResults = function () {

  function addResultNodes(items) {

    var len = items.length;

    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }

  }

  var result_nodes = [];

  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_hidden);

  return result_nodes;

};

/**
 * @method containsInteractiveElements
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Tests if a DOM element has any descendants that are widgets
 *
 * @return {Boolean}  'True' if at least one descendant dom element is a widget, otherwise 'false'
 */

OpenAjax.a11y.cache.DOMElement.prototype.containsInteractiveElements = function () {

  function checkChildren(children) {

     if (!children || !children.length ) return false;

     var flag = false;

     for (var i = 0; (i < children.length) && !flag; i++) {

       var child = children[i];

       if (child.type != Node.ELEMENT_NODE) continue;

       if (child.is_interactive) flag = true;
       else if (child.child_dom_elements.length) flag = checkChildren(child.child_dom_elements);

     }

     return flag;

  }

  return checkChildren(this.child_dom_elements);

};


/**
 * @method getHasDescribedBy
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns NLS string on whether the dom element has a aria-describedby attribute
 *
 * @return {String} If true returns "Yes", else "No"
 */

OpenAjax.a11y.cache.DOMElement.prototype.getHasDescribedBy = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  if (this.has_aria_describedby) return cache_nls.getLabelAndValueNLS('has_aria_describedby', this.has_aria_describedby).value;

  return "";
};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the worst severity level of rule results
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAccessibility = function () {

  var cache_nls      = OpenAjax.a11y.nls.Cache;
  var RESULT_VALUE       = OpenAjax.a11y.RESULT_VALUE;

  var severity = cache_nls.getResultValueNLS(RESULT_VALUE.NONE);

  if (this.rules_passed.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.PASS);
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.MANUAL_CHECK);
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.WARNING);
  }

  if (this.rules_violations.length) {
    severity = cache_nls.getResultValueNLS(RESULT_VALUE.VIOLATION);
  }

  return severity;

};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var i;

  var attributes  = [];

  for (i = 0; i < this.aria_attributes.length; i++) {
    var aa = this.aria_attributes[i];
    attributes.push(cache_nls.getLabelAndValueNLS(aa.name, aa.value));
  }

  for (i = 0; i < this.other_attributes.length; i++) {
    var oa = this.other_attributes[i];
    attributes.push(cache_nls.getLabelAndValueNLS(oa.name, oa.value));
  }

  if (!unsorted) this.sortItems(attributes);

  return attributes;

};

/**
 * @method hasEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns if an element has user interface events attached to it
 *
 * @return {Boolean} Returns true if event user interface event handlers are attached to the node, otherwise false
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasEvents = function () {

  var has_events = false;

  has_events = has_events || this.events.has_load;

  has_events = has_events || this.events.has_change;

  has_events = has_events || this.events.has_click;
  has_events = has_events || this.events.has_double_click;

  has_events = has_events || this.events.has_focus;
  has_events = has_events || this.events.has_blur;

  has_events = has_events || this.events.has_key_down;
  has_events = has_events || this.events.has_key_press;
  has_events = has_events || this.events.has_key_up;

  has_events = has_events || this.events.has_mouse_down;
  has_events = has_events || this.events.has_mouse_up;
  has_events = has_events || this.events.has_mouse_move;
  has_events = has_events || this.events.has_mouse_out;
  has_events = has_events || this.events.has_mouse_over;
  has_events = has_events || this.events.has_mouse_enter;
  has_events = has_events || this.events.has_mouse_leave;

  has_events = has_events || this.events.has_drag;
  has_events = has_events || this.events.has_drag_end;
  has_events = has_events || this.events.has_drag_enter;
  has_events = has_events || this.events.has_drag_leave;
  has_events = has_events || this.events.has_drag_over;
  has_events = has_events || this.events.has_drag_start;
  has_events = has_events || this.events.has_drop;

  return has_events;
};


/**
 * @method   hasChangeEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has change events
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns "True" element has change event
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasChangeEvents = function (prop_list) {

  function addEvent(event, name) {

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

  addEvent(this.events.has_change,  'onchange');

  return has_event;

};

/**
 * @method getChangeEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying change event handler
 */

OpenAjax.a11y.cache.DOMElement.prototype.getChangeEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_change,  'onchange');

  return events;

};


/**
 * @method hasFocusEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has focus or blur events
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns "True" element has focus and blur events
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasFocusEvents = function (prop_list) {

  function addEvent(event, name) {

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

  addEvent(this.events.has_focus,  'onfocus');
  addEvent(this.events.has_blur,   'onblur');

  return has_event;

};

/**
 * @method getFocusEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying focus specfic event handlers
 */

OpenAjax.a11y.cache.DOMElement.prototype.getFocusEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_focus,  'onfocus');
  addEvent(this.events.has_blur,   'onblur');

  return events;

};



/**
 * @method hasClickEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has click or double click events
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns "True" element has click and double click events
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasClickEvents = function (prop_list) {

  function addEvent(event, name) {

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

  addEvent(this.events.has_click,  'onclick');
  addEvent(this.events.has_double_click,    'ondoubleclick');

  return has_event;

};

/**
 * @method getClickEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying click specfic event handlers
 */

OpenAjax.a11y.cache.DOMElement.prototype.getClickEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_click,  'onclick');
  addEvent(this.events.has_double_click,    'ondoubleclick');

  return events;

};

/**
 * @method hasMouseEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has mouse specfic event handlers (i.e. up, down, move, over, out)
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns "True" element has mouse up, down, move, over and/or out events
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasMouseEvents = function (prop_list) {

  function addEvent(event, name) {

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

  addEvent(this.events.has_mouse_down,  'onmousedown');
  addEvent(this.events.has_mouse_up,    'onmouseup');
  addEvent(this.events.has_mouse_move,  'onmousemove');
  addEvent(this.events.has_mouse_out,   'onmouseout');
  addEvent(this.events.has_mouse_over,  'onmouseover');
  addEvent(this.events.has_mouse_enter, 'onmouseenter');
  addEvent(this.events.has_mouse_leave, 'onmouseleave');

  return has_event;

};

/**
 * @method getMouseEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying mouse specfic event handlers (i.e. up, down, move, over, out)
 */

OpenAjax.a11y.cache.DOMElement.prototype.getMouseEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_mouse_down,  'onmousedown');
  addEvent(this.events.has_mouse_up,    'onmouseup');
  addEvent(this.events.has_mouse_move,  'onmousemove');
  addEvent(this.events.has_mouse_out,   'onmouseout');
  addEvent(this.events.has_mouse_over,  'onmouseover');
  addEvent(this.events.has_mouse_enter, 'onmouseenter');
  addEvent(this.events.has_mouse_leave, 'onmouseleave');

  return events;

};

/**
 * @method hasDragEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has drag specfic event handlers
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns true if element has drag events. otherwise false
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasDragEvents = function (prop_list) {

  function addEvent(event, name) {

//     OpenAjax.a11y.logger.debug("   " + name + "=" + event);

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

//  OpenAjax.a11y.logger.debug("DRAG: " + de.toString());

  addEvent(this.events.has_drag,       'ondrag');
  addEvent(this.events.has_drag_end,   'ondragend');
  addEvent(this.events.has_drag_enter, 'ondragenter');
  addEvent(this.events.has_drag_leave, 'ondragleave');
  addEvent(this.events.has_drag_over,  'ondragover');
  addEvent(this.events.has_drag_start, 'ondragstart');
  addEvent(this.events.has_drop,       'ondrop');

  return has_event;

};

/**
 * @method getDragEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying drag specfic event handlers
 */

OpenAjax.a11y.cache.DOMElement.prototype.getDragEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_drag,       'ondrag');
  addEvent(this.events.has_drag_end,   'ondragend');
  addEvent(this.events.has_drag_enter, 'ondragenter');
  addEvent(this.events.has_drag_leave, 'ondragleave');
  addEvent(this.events.has_drag_over,  'ondragover');
  addEvent(this.events.has_drag_start, 'ondragstart');
  addEvent(this.events.has_drop,       'ondrop');

  return events;

};

/**
 * @method hasKeyboardEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns true if the element has keyboard specfic event handlers
 *
 * @param  {Array}   prop_list : If defined, the names of the event handlers defined will be added to the list as property object
 *
 * @return {Boolean} Returns true if element has keyboard events, otherwise false
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasKeyboardEvents = function (str, prop_list) {

  function addEvent(event, name) {

    if (event) {
      has_event = true;

      if (prop_list && prop_list.length === 'number') {
        var prop = {};

        prop.label = name;
        prop.value = 'true';
        prop.description = "";

        prop_list.push(prop);
      }
    }
  }

  var has_event = false;

  addEvent(this.events.has_key_down,  'onkeydown');
  addEvent(this.events.has_key_press, 'onkeypress');
  addEvent(this.events.has_key_up,    'onkeyup');
  if (this.tag_name == 'a') addEvent(this.events.has_click, 'onclick');

  return has_event;

};

/**
 * @method getKeyboardEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns string identifying drag specfic event handlers
 */

OpenAjax.a11y.cache.DOMElement.prototype.getKeyboardEvents = function () {

  function addEvent(event, name) {
    if (event) {
      events += name + ' ';
    }
  }

  var events = "";

  addEvent(this.events.has_key_down,  'onkeydown');
  addEvent(this.events.has_key_press, 'onkeypress');
  addEvent(this.events.has_key_up,    'onkeyup');
  if (this.tag_name == 'a') addEvent(this.events.has_click, 'onclick');

  return events;

};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of objects representing events associated with the element
 *
 * @return {Array} Returns a array of event object results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getEvents = function () {

  function addHasEvent(event_type, event_on_element, event_on_ancestor) {

    var o = {};

    o.label = event_type;
    o.event_on_element        = nls_false;
    o.event_on_element_style  = "no";
    o.event_on_ancestor       = nls_false;
    o.event_on_ancestor_style = "no";

    if (event_on_element) {
      o.event_on_element        = nls_true;
      o.event_on_element_style  = "yes";
    }

    if (event_on_ancestor) {
      o.event_on_ancestor       = nls_true;
      o.event_on_ancestor_style = "yes";
    }

    events.push(o);

  }

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var nls_false = cache_nls.getBooleanNLS(false);
  var nls_true  = cache_nls.getBooleanNLS(true);

  var events = [];

  addHasEvent('blur',          this.events.has_blur,          this.events.ancestor_has_blur);
  addHasEvent('focus',         this.events.has_focus,         this.events.ancestor_has_focus);

  addHasEvent('click',         this.events.has_click,         this.events.ancestor_has_click);
  addHasEvent('double click',  this.events.has_double_click,  this.events.ancestor_has_double_click);

  addHasEvent('key down',      this.events.has_key_down,      this.events.ancestor_has_key_down);
  addHasEvent('key press',     this.events.has_key_press,     this.events.ancestor_has_key_press);
  addHasEvent('key down',      this.events.has_key_up,        this.events.ancestor_has_key_up);

  addHasEvent('mouse down',    this.events.has_mouse_down,    this.events.ancestor_has_mouse_down);
  addHasEvent('mouse up',      this.events.has_mouse_up,      this.events.ancestor_has_mouse_up);
  addHasEvent('mouse move',    this.events.has_mouse_move,    this.events.ancestor_has_mouse_move);

  addHasEvent('mouse leave',    this.events.has_mouse_leave,    this.events.ancestor_has_mouse_leave);
  addHasEvent('mouse enter',    this.events.has_mouse_enter,    this.events.ancestor_has_mouse_enter);

  addHasEvent('mouse out',     this.events.has_mouse_out,     this.events.ancestor_has_mouse_out);
  addHasEvent('mouse over',    this.events.has_mouse_over,    this.events.ancestor_has_mouse_over);

  addHasEvent('drag',        this.events.has_drag,       this.events.ancestor_has_drag);
  addHasEvent('drag end',    this.events.has_drag_end,   this.events.ancestor_has_drag_end);
  addHasEvent('drag enter',  this.events.has_drag_enter, this.events.ancestor_has_drag_enter);
  addHasEvent('drag leave',  this.events.has_drag_leave, this.events.ancestor_has_drag_leave);
  addHasEvent('drag over',   this.events.has_drag_over,  this.events.ancestor_has_drag_over);
  addHasEvent('drag start',  this.events.has_drag_start, this.events.ancestor_has_drag_start);
  addHasEvent('drop',        this.events.has_drop,       this.events.ancestor_has_drag_drop);

  addHasEvent('change',        this.events.has_change,        this.events.ancestor_has_change);

  return events;

};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_onscreen');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_to_at');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_style');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'outline_width');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_focus');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_before');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'pseudo_after');

  return properties;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCacheProperties = function () {

  var i;

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'id_unique');
  cache_nls.addPropertyIfDefined(properties, this, 'xpath');
  cache_nls.addPropertyIfDefined(properties, this, 'character_count');

  cache_nls.addPropertyIfDefined(properties, this, 'calculated_aria_description');

  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');
  cache_nls.addPropertyIfDefined(properties, this, 'body_element');

  cache_nls.addPropertyIfDefined(properties, this, 'is_interactive');
  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');
  cache_nls.addPropertyIfDefined(properties, this, 'is_landmark');
  cache_nls.addPropertyIfDefined(properties, this, 'is_live');

  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');
  cache_nls.addPropertyIfDefined(properties, this, 'has_role');
  cache_nls.addPropertyIfDefined(properties, this, 'is_implied_role');

  cache_nls.addPropertyIfDefined(properties, this, 'has_aria_activedescendant');
  cache_nls.addPropertyIfDefined(properties, this, 'is_owned');
  cache_nls.addPropertyIfDefined(properties, this, 'has_outline');

  var invalid_aria_attributes     = this.invalid_aria_attributes;
  var invalid_aria_attributes_len = invalid_aria_attributes.length;

  for (i = 0; i < invalid_aria_attributes_len; i++) {
    cache_nls.addInvalidAttribute(properties, invalid_aria_attributes[i]);
  }

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("dom element property: " + property + " value= " + this[property]);

  if (typeof this[property] === 'undefined') {
     if(typeof this.computed_style[property] === 'undefined') {
       if(typeof this.events[property] === 'undefined') {
         for (var i = 0; i < this.aria_attributes.length; i++) {
            var attr = this.aria_attributes[i];
            if (attr.name === property) return attr.value;
         }
         return null;
       }
       else {
         return this.events[property];
       }
     }
     else {
       return this.computed_style[property];
     }
  }

  return this[property];

};


/**
 * @method sortItems
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.sortItems = function (items) {

  var swapped = false;
  var temp = null;
  var i;
  var items_len = items.length;

  do{
    swapped = false;
    for (i = 1; i < items_len; i++ ) {
     if (items[i-1].label.toLowerCase() > items[i].label.toLowerCase()) {
      // swap the values
      temp = items[i-1];
      items[i-1] = items[i];
      items[i] = temp;
      swapped = true;
     }
    } // end loop
  } while (swapped);

};

/**
 * @method initEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Creates am initial event object with no events identified
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node
 *
 * @return {Object}  Returns an object with events set to false
 */

OpenAjax.a11y.cache.DOMElement.prototype.initEvents = function (parent_dom_element) {

  var events = {};
  events.supports_events = false;

    events.has_blur         = false;

    events.has_change       = false;

    events.has_click        = false;
    events.has_double_click = false;

    events.has_focus        = false;

    events.has_key_down     = false;
    events.has_key_press    = false;
    events.has_key_up       = false;

    events.has_load         = false;

    events.has_mouse_down   = false;
    events.has_mouse_up     = false;
    events.has_mouse_move   = false;
    events.has_mouse_out    = false;
    events.has_mouse_over   = false;
    events.has_mouse_enter  = false;
    events.has_mouse_leave  = false;

    events.has_drag       = false;
    events.has_drag_end   = false;
    events.has_drag_enter = false;
    events.has_drag_leave = false;
    events.has_drag_over  = false;
    events.has_drag_start = false;
    events.has_drop       = false;

    events.has_pointer_up      = false;
    events.has_pointer_cancel  = false;
    events.has_pointer_move    = false;
    events.has_pointer_over    = false;
    events.has_pointer_out     = false;
    events.has_pointer_enter   = false;
    events.has_pointer_leave   = false;

    events.has_touch_start   = false;
    events.has_touch_end     = false;
    events.has_touch_leave   = false;
    events.has_touch_move    = false;
    events.has_touch_cancel  = false;

    if (parent_dom_element && parent_dom_element.events) {
      events.ancestor_has_blur         = parent_dom_element.events.has_blur         || parent_dom_element.events.ancestor_has_blur;
      events.ancestor_has_change       = parent_dom_element.events.has_change       || parent_dom_element.events.ancestor_has_change;
      events.ancestor_has_click        = parent_dom_element.events.has_click        || parent_dom_element.events.ancestor_has_click;
      events.ancestor_has_double_click = parent_dom_element.events.has_double_click || parent_dom_element.events.ancestor_has_double_click;
      events.ancestor_has_focus        = parent_dom_element.events.has_focus        || parent_dom_element.events.ancestor_has_focus;
      events.ancestor_has_key_down     = parent_dom_element.events.has_key_down     || parent_dom_element.events.ancestor_has_key_down;
      events.ancestor_has_key_press    = parent_dom_element.events.has_key_press    || parent_dom_element.events.ancestor_has_key_press;
      events.ancestor_has_key_up       = parent_dom_element.events.has_key_up       || parent_dom_element.events.ancestor_has_key_up;
      events.ancestor_has_load         = parent_dom_element.events.has_load         || parent_dom_element.events.ancestor_has_load;

      events.ancestor_has_mouse_down   = parent_dom_element.events.has_mouse_down   || parent_dom_element.events.ancestor_has_mouse_down;
      events.ancestor_has_mouse_up     = parent_dom_element.events.has_mouse_up     || parent_dom_element.events.ancestor_has_mouse_up;
      events.ancestor_has_mouse_move   = parent_dom_element.events.has_mouse_move   || parent_dom_element.events.ancestor_has_mouse_move;
      events.ancestor_has_mouse_out    = parent_dom_element.events.has_mouse_out    || parent_dom_element.events.ancestor_has_mouse_out;
      events.ancestor_has_mouse_over   = parent_dom_element.events.has_mouse_over   || parent_dom_element.events.ancestor_has_mouse_over;
      events.ancestor_has_mouse_enter  = parent_dom_element.events.has_mouse_enter  || parent_dom_element.events.ancestor_has_mouse_enter;
      events.ancestor_has_mouse_leave  = parent_dom_element.events.has_mouse_leave  || parent_dom_element.events.ancestor_has_mouse_leave;

      events.ancestor_has_drag       = parent_dom_element.events.has_drag       || parent_dom_element.events.ancestor_has_drag;
      events.ancestor_has_drag_end   = parent_dom_element.events.has_drag_end   || parent_dom_element.events.ancestor_has_drag_end;
      events.ancestor_has_drag_enter = parent_dom_element.events.has_drag_enter || parent_dom_element.events.ancestor_has_drag_enter;
      events.ancestor_has_drag_leave = parent_dom_element.events.has_drag_leave || parent_dom_element.events.ancestor_has_drag_leave;
      events.ancestor_has_drag_over  = parent_dom_element.events.has_drag_over  || parent_dom_element.events.ancestor_has_drag_over;
      events.ancestor_has_drag_start = parent_dom_element.events.has_drag_start || parent_dom_element.events.ancestor_has_drag_start;
      events.ancestor_has_drop       = parent_dom_element.events.has_drop       || parent_dom_element.events.ancestor_has_drop;

      events.ancestor_has_pointer_up      = parent_dom_element.events.has_pointer_up     || parent_dom_element.events.ancestor_has_pointer_up;
      events.ancestor_has_pointer_cancel  = parent_dom_element.events.has_pointer_cancel || parent_dom_element.events.ancestor_has_pointer_cancel;
      events.ancestor_has_pointer_move    = parent_dom_element.events.has_pointer_move   || parent_dom_element.events.ancestor_has_pointer_move;
      events.ancestor_has_pointer_over    = parent_dom_element.events.has_pointer_over   || parent_dom_element.events.ancestor_has_pointer_over;
      events.ancestor_has_pointer_out     = parent_dom_element.events.has_pointer_out    || parent_dom_element.events.ancestor_has_pointer_out;
      events.ancestor_has_pointer_enter   = parent_dom_element.events.has_pointer_enter  || parent_dom_element.events.ancestor_has_pointer_enter;
      events.ancestor_has_pointer_leave   = parent_dom_element.events.has_pointer_leave  || parent_dom_element.events.ancestor_has_pointer_leave;

      events.ancestor_has_touch_start   = parent_dom_element.events.has_touch_start  || parent_dom_element.events.ancestor_has_touch_start;
      events.ancestor_has_touch_end     = parent_dom_element.events.has_touch_end    || parent_dom_element.events.ancestor_has_touch_end;
      events.ancestor_has_touch_leave   = parent_dom_element.events.has_touch_leave  || parent_dom_element.events.ancestor_has_touch_leave;
      events.ancestor_has_touch_move    = parent_dom_element.events.has_touch_move   || parent_dom_element.events.ancestor_has_touch_move;
      events.ancestor_has_touch_cancel  = parent_dom_element.events.has_touch_cancel || parent_dom_element.events.ancestor_has_touch_cancel;
    }
    else {
      events.ancestor_has_blur         = false;
      events.ancestor_has_change       = false;
      events.ancestor_has_click        = false;
      events.ancestor_has_double_click = false;
      events.ancestor_has_focus        = false;
      events.ancestor_has_key_down     = false;
      events.ancestor_has_key_press    = false;
      events.ancestor_has_key_up       = false;
      events.ancestor_has_load         = false;

      events.ancestor_has_mouse_down   = false;
      events.ancestor_has_mouse_up     = false;
      events.ancestor_has_mouse_move   = false;
      events.ancestor_has_mouse_out    = false;
      events.ancestor_has_mouse_over   = false;
      events.ancestor_has_mouse_enter  = false;
      events.ancestor_has_mouse_leave  = false;

      events.ancestor_has_drag       = false;
      events.ancestor_has_drag_end   = false;
      events.ancestor_has_drag_enter = false;
      events.ancestor_has_drag_leave = false;
      events.ancestor_has_drag_over  = false;
      events.ancestor_has_drag_start = false;
      events.ancestor_has_drop       = false;

      events.ancestor_has_pointer_up      = false;
      events.ancestor_has_pointer_cancel  = false;
      events.ancestor_has_pointer_move    = false;
      events.ancestor_has_pointer_over    = false;
      events.ancestor_has_pointer_out     = false;
      events.ancestor_has_pointer_enter   = false;
      events.ancestor_has_pointer_leave   = false;

      events.ancestor_has_touch_start   = false;
      events.ancestor_has_touch_end     = false;
      events.ancestor_has_touch_leave   = false;
      events.ancestor_has_touch_move    = false;
      events.ancestor_has_touch_cancel  = false;
   }

   return events;
};

/**
 * @method EnumerateFirefoxEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Finds the event information of the node for a DOMElement object
 *
 * @param  {Object}     node              - Object The DOM element node that corresponds
 *                                          to this DOMElement object, and from which
 *                                          common information is derived for the DOM
 *                                          element cache.
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node
 *
 * @return {Object}  Returns an object with event information
 */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFirefoxEvents = function (node, parent_dom_element) {

  var i;
  var event_info;

  var Components = Components || {};

  if (node.tagName && node.tagName.toLowerCase() === 'body') {
     event_info = this.EnumerateFirefoxEvents(this.document, null);
//     OpenAjax.a11y.logger.debug('body: ' + event_info.has_key_down);
     parent_dom_element = {};
     parent_dom_element.events = event_info;
  }

  var events = this.initEvents(parent_dom_element);

  var event_listener = Components.classes["@mozilla.org/eventlistenerservice;1"];

  if (event_listener !== null &&
    event_listener !== undefined) {

    events.supports_events = true;

   var event_listener_service = event_listener.getService(Components.interfaces.nsIEventListenerService);
   var node_event_service     = event_listener_service.getListenerInfoFor(node, {});

   for (i = 0; i < node_event_service.length; i++) {
     var node_event_information = node_event_service[i].QueryInterface(Components.interfaces.nsIEventListenerInfo);

//     OpenAjax.a11y.logger.debug("Event Info: type=" + node_event_information.type + " system event=" + node_event_information.inSystemEventGroup + " allows untrusted=" + node_event_information.allowsUntrusted);

       switch (node_event_information.type) {

       case "blur":
         events.has_blur = true;
         break;

       case "change":
         events.has_change = true;
         break;

       case "click":
         events.has_click = true;
         break;

       case "dbclick":
         events.has_double_click = true;
         break;

       case "focus":
         events.has_focus   = true;
         break;

       case "keydown":
         events.has_key_down  = true;
         break;

       case "keypress":
         events.has_key_press = true;
         break;

       case "keyup":
         events.has_key_up   = true;
         break;

       case "load":
         events.has_load    = true;
         break;

       case "mousedown":
         events.has_mouse_down = true;
         break;

       case "mouseup":
         events.has_mouse_up  = true;
         break;

       case "mousemove":
         events.has_mouse_move = true;
         break;

       case "mouseout":
         events.has_mouse_out = true;
         break;

       case "mouseover":
         events.has_mouse_over = true;
         break;

       case "mouseenter":
         events.has_mouse_enter = true;
         break;

       case "mouseleave":
         events.has_mouse_leave = true;
         break;

       case "drag":
         events.has_drag = true;
         break;

       case "dragend":
         events.has_drag_end = true;
         break;

       case "dragenter":
         events.has_drag_enter = true;
         break;

       case "dragleave":
         events.has_drag_leave = true;
         break;

       case "dragover":
         events.has_drag_over = true;
         break;

       case "dragstart":
         events.has_drag_start = true;
         break;

       case "drop":
         events.has_drop = true;
         break;

       case "pointerup":
         events.has_pointer_up = true;
         break;

       case "pointer_cancel":
         events.has_pointer_cancel = true;
         break;

       case "pointer_move":
         events.has_pointer_move = true;
         break;

       case "pointer_over":
         events.has_pointer_over = true;
         break;

       case "pointer_out":
         events.has_pointer_out = true;
         break;

       case "pointer_enter":
         events.has_pointer_enter = true;
         break;

       case "pointer_leave":
         events.has_pointer_leave = true;
         break;

       case "touchstart":
         events.has_touch_start = true;
         break;

       case "touchend":
         events.has_touch_end = true;
         break;

       case "touchcancel":
         events.has_touch_cancel = true;
         break;

       case "touchleave":
         events.has_touch_leave = true;
         break;

       case "touchmove":
         events.has_touch_move = true;
         break;

       default:
         break;

       } // endswitch
   } // end loop
 }

 return events;

};

/**
 * @method EnumerateFaeUtilEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Finds the event information of the node for a DOMElement object
 *
 * @param  {Object}     node              - Object The DOM element node that corresponds
 *                                          to this DOMElement object, and from which
 *                                          common information is derived for the DOM
 *                                          element cache.
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node
 *
 * @return {Object}  Returns an object with event information
 */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFaeUtilEvents = function (node, parent_dom_element) {

  function testForEvent(e) {

    var has_event = node.getAttribute(e);

    if (has_event == 'true') {
      events.supports_events = true;
      return true;
    }

    return false;

  }

  var events = this.initEvents(parent_dom_element);

  events.has_blur         = testForEvent('oaa-has-blur');
  events.has_change       = testForEvent('oaa-has-change');
  events.has_click        = testForEvent('oaa-has-click');
  events.has_double_click = testForEvent('oaa-has-double_click');
  events.has_focus        = testForEvent('oaa-has-focus');

  events.has_key_down     = testForEvent('oaa-has-key_down');
  events.has_key_press    = testForEvent('oaa-has-key_press');
  events.has_key_up       = testForEvent('oaa-has-key_up');

  events.has_load         = testForEvent('oaa-has-load');

  events.has_mouse_down   = testForEvent('oaa-has-mouse_down');
  events.has_mouse_up     = testForEvent('oaa-has-mouse_up');
  events.has_mouse_move   = testForEvent('oaa-has-mouse_move');
  events.has_mouse_out    = testForEvent('oaa-has-mouse_out');
  events.has_mouse_over   = testForEvent('oaa-has-mouse_over');

  events.has_mouse_enter  = testForEvent('oaa-has-mouse_enter');
  events.has_mouse_leave  = testForEvent('oaa-has-mouse_leave');

  events.has_drag       = testForEvent('oaa-has-drag');
  events.has_drag_end   = testForEvent('oaa-has-drag_end');
  events.has_drag_enter = testForEvent('oaa-has-drag_enter');
  events.has_drag_leave = testForEvent('oaa-has-drag_leave');
  events.has_drag_over  = testForEvent('oaa-has-over');
  events.has_drag_start = testForEvent('oaa-has-start');
  events.has_drop       = testForEvent('oaa-has-drop');

  events.has_pointer_up      = testForEvent('oaa-pointer-up');
  events.has_pointer_cancel  = testForEvent('oaa-pointer-cancel');
  events.has_pointer_move    = testForEvent('oaa-pointer-move');
  events.has_pointer_over    = testForEvent('oaa-pointer-over');
  events.has_pointer_out     = testForEvent('oaa-pointer-out');
  events.has_pointer_enter   = testForEvent('oaa-pointer-enter');
  events.has_pointer_leave   = testForEvent('oaa-pointer-leave');

  events.has_touch_start   = testForEvent('oaa-touch-start');
  events.has_touch_end     = testForEvent('oaa-touch-end');
  events.has_touch_leave   = testForEvent('oaa-touch-leave');
  events.has_touch_move    = testForEvent('oaa-touch-move');
  events.has_touch_cancel  = testForEvent('oaa-touch-cancel');

  return events;

};

/**
 * @method EnumerateInlineEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Finds the event information of the node for a DOMElement object based online on
 *        inline event markup
 *
 * @param  {Object}     node              - Object The DOM element node that corresponds
 *                                          to this DOMElement object, and from which
 *                                          common information is derived for the DOM
 *                                          element cache.
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node
 *
 * @return {Object}  Returns an object with event information
 */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateInlineEvents = function (node, parent_dom_element) {

  function testForEvent(e) {

    var has_event = node.getAttribute(e);

    if (has_event == 'true') {
      events.supports_events = true;
      return true;
    }

    return false;

  }

  function testForPropertyAndJQueryEvent(p) {

    // If JQuery is defined
    var $ = $ || {};

    if (typeof node['on' + p] === 'function') {
      events.supports_events = true;
      return true;
    }

    try {
      if ($(node)) {
        var $events = $._data($(node)[0], "events" );

        if(typeof $events != "undefined"){
          //iteration to get each one of the handlers
          $.each($events, function(i, event){
            $.each(event, function(i, handler){
              if(handler.type == p) return true;
          });
        });
        }
      }
    }
    catch(e) {
      return false;
    }

    return false;

  }


  var events = this.initEvents(parent_dom_element);

  var attributes = node.attributes;
  var attributes_len = attributes.length;

  for (var i = 0; i < attributes_len; i++) {

    switch(attributes[i].name.toLowerCase()) {

    case 'onblur':
      events.has_blur = true;
      break;

    case 'onchange':
      events.has_change = true;
      break;

    case 'onclick':
      events.has_click = true;
      break;

    case 'ondbclick':
      events.has_double_click = true;
      break;

    case 'onkeydown':
      events.has_key_down = true;
      break;

    case 'onkeypress':
      events.has_key_press = true;
      break;

    case 'onkeyup':
      events.has_key_up = true;

      break;

    case 'onload':
      events.has_load = true;

      break;

    case 'onmousedown':
      events.has_mouse_down = true;
      break;

    case 'onmouseup':
      events.has_mouse_up = true;
      break;

    case 'onmousemove':
      events.has_mouse_move = true;
      break;

    case 'onmouseout':
      events.has_mouse_out = true;
      break;

    case 'onmouseover':
      events.has_mouse_over = true;
      break;

    case 'onmouseenter':
      events.has_mouse_enter = true;
      break;

    case 'onmouseleave':
      events.has_mouse_leave = true;

      break;

    case 'onmousedrag':
      events.has_drag  = true;
      break;

    case 'ondragend':
      events.has_drag_end = true;
      break;

    case 'ondragenter':
      events.has_drag_enter  = true;
      break;

    case 'ondragleave':
      events.has_drag_leave = testForEvent('oaa-has-drag_leave');
      break;

    case 'ondragover':
      events.has_drag_over  = testForEvent('oaa-has-over');
      break;

    case 'onstart':
      events.has_drag_start = testForEvent('oaa-has-start');
      break;

    case 'ondrop':
      events.has_drop       = testForEvent('oaa-has-drop');
      break;

    case 'ontouchstart':
      events.has_touch_start   = testForEvent('oaa-touch-start');
      break;

    case 'ontouchend':
      events.has_touch_end     = testForEvent('oaa-touch-end');
      break;

    case 'ontouchleave':
      events.has_touch_leave   = testForEvent('oaa-touch-leave');
      break;

    case 'ontouchmove':
      events.has_touch_move    = testForEvent('oaa-touch-move');
      break;

    case 'ontouchcancel':
      events.has_touch_cancel  = testForEvent('oaa-touch-cancel');
      break;

    default:
      break;
    }
  }

  // test for use of events added using

  events.has_blur         = testForPropertyAndJQueryEvent('blur');
  events.has_change       = testForPropertyAndJQueryEvent('change');
  events.has_click        = testForPropertyAndJQueryEvent('click');
  events.has_double_click = testForPropertyAndJQueryEvent('dblclick');
  events.has_focus        = testForPropertyAndJQueryEvent('focus');

  events.has_key_down     = testForPropertyAndJQueryEvent('keydown');
  events.has_key_press    = testForPropertyAndJQueryEvent('keypress');
  events.has_key_up       = testForPropertyAndJQueryEvent('keyup');

  events.has_load         = testForPropertyAndJQueryEvent('load');

  events.has_mouse_down   = testForPropertyAndJQueryEvent('mousedown');
  events.has_mouse_up     = testForPropertyAndJQueryEvent('mouseup');
  events.has_mouse_move   = testForPropertyAndJQueryEvent('mousemove');
  events.has_mouse_out    = testForPropertyAndJQueryEvent('mouseout');
  events.has_mouse_over   = testForPropertyAndJQueryEvent('mouseover');

  events.has_mouse_enter  = testForPropertyAndJQueryEvent('mouseenter');
  events.has_mouse_leave  = testForPropertyAndJQueryEvent('mouseleave');

  events.has_drag       = testForPropertyAndJQueryEvent('drag');
  events.has_drag_end   = testForPropertyAndJQueryEvent('dragend');
  events.has_drag_enter = testForPropertyAndJQueryEvent('dragenter');
  events.has_drag_leave = testForPropertyAndJQueryEvent('dragleave');
  events.has_drag_over  = testForPropertyAndJQueryEvent('dragover');
  events.has_drag_start = testForPropertyAndJQueryEvent('dragstart');
  events.has_drop       = testForPropertyAndJQueryEvent('drop');

  events.has_touch_start   = testForPropertyAndJQueryEvent('touchstart');
  events.has_touch_end     = testForPropertyAndJQueryEvent('touchend');
  events.has_touch_leave   = testForPropertyAndJQueryEvent('touchleave');
  events.has_touch_move    = testForPropertyAndJQueryEvent('touchmove');
  events.has_touch_cancel  = testForPropertyAndJQueryEvent('touchcancel');



  if (parent_dom_element && parent_dom_element.events) {
    events.ancestor_has_blur         = parent_dom_element.events.has_blur         || parent_dom_element.events.ancestor_has_blur;
    events.ancestor_has_change       = parent_dom_element.events.has_change       || parent_dom_element.events.ancestor_has_change;
    events.ancestor_has_click        = parent_dom_element.events.has_click        || parent_dom_element.events.ancestor_has_click;
    events.ancestor_has_double_click = parent_dom_element.events.has_double_click || parent_dom_element.events.ancestor_has_double_click;
    events.ancestor_has_focus        = parent_dom_element.events.has_focus        || parent_dom_element.events.ancestor_has_focus;
    events.ancestor_has_key_down     = parent_dom_element.events.has_key_down     || parent_dom_element.events.ancestor_has_key_down;
    events.ancestor_has_key_press    = parent_dom_element.events.has_key_press    || parent_dom_element.events.ancestor_has_key_press;
    events.ancestor_has_key_up       = parent_dom_element.events.has_key_up       || parent_dom_element.events.ancestor_has_key_up;
    events.ancestor_has_load         = parent_dom_element.events.has_load         || parent_dom_element.events.ancestor_has_load;

    events.ancestor_has_mouse_down   = parent_dom_element.events.has_mouse_down   || parent_dom_element.events.ancestor_has_mouse_down;
    events.ancestor_has_mouse_up     = parent_dom_element.events.has_mouse_up     || parent_dom_element.events.ancestor_has_mouse_up;
    events.ancestor_has_mouse_move   = parent_dom_element.events.has_mouse_move   || parent_dom_element.events.ancestor_has_mouse_move;
    events.ancestor_has_mouse_out    = parent_dom_element.events.has_mouse_out    || parent_dom_element.events.ancestor_has_mouse_out;
    events.ancestor_has_mouse_over   = parent_dom_element.events.has_mouse_over   || parent_dom_element.events.ancestor_has_mouse_over;
    events.ancestor_has_mouse_enter  = parent_dom_element.events.has_mouse_enter  || parent_dom_element.events.ancestor_has_mouse_enter;
    events.ancestor_has_mouse_leave  = parent_dom_element.events.has_mouse_leave  || parent_dom_element.events.ancestor_has_mouse_leave;

    events.ancestor_has_drag       = parent_dom_element.events.has_drag       || parent_dom_element.events.ancestor_has_drag;
    events.ancestor_has_drag_end   = parent_dom_element.events.has_drag_end   || parent_dom_element.events.ancestor_has_drag_end;
    events.ancestor_has_drag_enter = parent_dom_element.events.has_drag_enter || parent_dom_element.events.ancestor_has_drag_enter;
    events.ancestor_has_drag_leave = parent_dom_element.events.has_drag_leave || parent_dom_element.events.ancestor_has_drag_leave;
    events.ancestor_has_drag_over  = parent_dom_element.events.has_drag_over  || parent_dom_element.events.ancestor_has_drag_over;
    events.ancestor_has_drag_start = parent_dom_element.events.has_drag_start || parent_dom_element.events.ancestor_has_drag_start;
    events.ancestor_has_drop       = parent_dom_element.events.has_drop       || parent_dom_element.events.ancestor_has_drop;

    events.has_pointer_up      = parent_dom_element.events.pointer_up     || parent_dom_element.events.ancestor_pointer_up;
    events.has_pointer_cancel  = parent_dom_element.events.pointer_cancel || parent_dom_element.events.ancestor_pointer_cancel;
    events.has_pointer_move    = parent_dom_element.events.pointer_move   || parent_dom_element.events.ancestor_pointer_move;
    events.has_pointer_over    = parent_dom_element.events.pointer_over   || parent_dom_element.events.ancestor_pointer_over;
    events.has_pointer_out     = parent_dom_element.events.pointer_out    || parent_dom_element.events.ancestor_pointer_out;
    events.has_pointer_enter   = parent_dom_element.events.pointer_enter  || parent_dom_element.events.ancestor_pointer_enter;
    events.has_pointer_leave   = parent_dom_element.events.pointer_leave  || parent_dom_element.events.ancestor_pointer_leave;

    events.ancestor_has_touch_start   = parent_dom_element.events.touch_start  || parent_dom_element.events.ancestor_touch_start;
    events.ancestor_has_touch_end     = parent_dom_element.events.touch_end    || parent_dom_element.events.ancestor_touch_end;
    events.ancestor_has_touch_leave   = parent_dom_element.events.touch_leave  || parent_dom_element.events.ancestor_touch_leave;
    events.ancestor_has_touch_move    = parent_dom_element.events.touch_move   || parent_dom_element.events.ancestor_touch_move;
    events.ancestor_has_touch_cancel  = parent_dom_element.events.touch_cancel || parent_dom_element.events.ancestor_touch_cancel;

  }

  return events;

};



/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds a DOMElement or DOMText object to the tree of DOM text/elements
 *
 * @param  {DOMElement | DOMText} child_object  - DOMElement or DOMText object
 *
 * @return  Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addChild = function ( child_object ) {

 if (child_object) {
  this.child_dom_elements.push(child_object);
 }

};

/**
 * @method addToCharacterCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Adds to the current character count of the text content of the
 *          contained in the DOMelement and its immediate children
 *
 * @param {Number} length - Number to add to the character count
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addToCharacterCount = function ( length ) {

 this.character_count += length;

};

/**
 * @method addComputedStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds computed style information to the DOMElement object and
 *          calculate the color contrast ratio
 *
 * @param  {DOMElement} parent_element  - The parent DOMElement object, used
 *                                        for information about inherited style
 *                                        information
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addComputedStyle = function (parent_element) {

 this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
 this.computed_style.calculateColorContrastRatio();

 this.has_outline = true;

 if (this.computed_style.outline_style === 'none') this.has_outline = false;
 if (this.computed_style.outline_width === '0')    this.has_outline = false;
};

/**
 * @method calculateXPath
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Calculate the XPath string that uniquely identifies the
 *           DOM node referenced by this DOMElement's node property and
 *           set its xpath property to this calculated value.
 *
 * @param  {DOMElement} parent_element - The parent DOMElement object, used
 *                                       for information for xpath calculation
 *
 * @usage Sets the DOMElement's xpath property
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.calculateXPath = function (parent_element) {

 function attributePredicate(attrName, attrValue) {
  return "[@" + attrName + "='" + attrValue + "']";
 }

 this.xpath = "";

 // If a root node ignore calculation
 if (!this.tag_name) {
  return;
 }

 // now build up the XPath using parent, tag_name, id, role and class values
 if (parent_element && parent_element.xpath) {
  this.xpath = parent_element.xpath + "/" + this.tag_name;
 }
 else {
  this.xpath = "/" + this.tag_name;
 }

 if (this.id) {
  this.xpath += attributePredicate("id", this.id);
 }

 if (this.role) {
  this.xpath += attributePredicate("role", this.role);
 }
 else {
  if (this.class_name) {
   this.xpath += attributePredicate("class", this.class_name);
  }
 }

};


/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns text content of a DOMElement, including the ALT text of images
 *       through recursion through the DOMText and DOMElement descendents of
 *       the DOMElement
 *
 * @return {String} Returns the text content of an element and its children
 */

OpenAjax.a11y.cache.DOMElement.prototype.getText = function() {

  function getText(dom_element, strings) {
    // If text node get the text and return
    if( dom_element.type == Node.TEXT_NODE ) {
      strings.push( dom_element.text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
        // check to see if IMG or AREA element and to use ALT content if defined
        if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {

          if (dom_element.alt) {
            strings.push(dom_element.alt);
          }

        } else {

          for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
            getText(dom_element.child_dom_elements[i], strings);
          } // end loop

        }
      }
    }
  } // end function getStrings

 // Create return object
 var str = "";
 var strings = [];

 getText(this, strings);

 if (strings.length) str = OpenAjax.a11y.util.normalizeSpace(strings.join(" "));

 return str;

};

 /**
 * @method getTextObject
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an object with information about the accessible text of a DOMElement object
 *         and its descendents
 *
 * @param {Boolean}  visible  - Optional, if true text must be visible to be included. default false
 *
 * @return {Object}  Returns an object with the following properties:
 *                     'height',
 *                     'width',
 *                     'image_count',
 *                     'name',
 *                     'name_from_text_nodes',
 *                     'name_from_image_alt',
 */

OpenAjax.a11y.cache.DOMElement.prototype.getTextObject = function(visible) {

  if (typeof visible !== 'boolean') visible = false;

  function getText(dom_element, strings, texts, alts) {
    // If text node get the text and return
    if( dom_element.type == Node.TEXT_NODE ) {
      var text = dom_element.text;
      strings.push( text );
      texts.push( text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
        // check to see if IMG or AREA element and to use ALT content if defined
        if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {

          if (dom_element.alt) {
            strings.push(dom_element.alt);
            alts.push(dom_element.alt);
          }

          if( dom_element.node.offsetHeight > o.height ) {
            o.height = dom_element.node.offsetHeight;
          } //endif

          if( dom_element.node.offsetWidth > o.width ) {
             o.width = dom_element.node.offsetWidth;
          } //endif

          o.image_count = o.image_count + 1;

        } else {

          for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
            if (!visible || dom_element.computed_style.is_visible_onscreen) {
              getText( dom_element.child_dom_elements[i], strings, texts, alts);
            }
          } // endfor

        } // endif
      } // endif
    } // endif
  } // end function getStrings

  // Create return object
  var o = {};
  var name_array = [];
  var name_from_text_nodes_array = [];
  var name_from_image_alt_array = [];
  o.height = 0;
  o.width = 0;
  o.image_count = 0;


  if (!visible || this.computed_style.is_visible_onscreen) {
    getText(this, name_array, name_from_text_nodes_array, name_from_image_alt_array);
  }

  var normalizeSpace = OpenAjax.a11y.util.normalizeSpace;

  o.name                 = normalizeSpace(name_array.join(""));
  o.name_from_text_nodes = normalizeSpace(name_from_text_nodes_array.join("").toLowerCase());
  o.name_from_image_alt  = normalizeSpace(name_from_image_alt_array.join("").toLowerCase());
  return o;

}; // end function OpenAjax.cache.util.getAccessibleText


/**
 * @method getElementCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns a String of the text content of a DOMElement and all its descendent DOMElements
 *
 * @return {Number}  Returns the number of descendent elements in a DOMElement object
 */

OpenAjax.a11y.cache.DOMElement.prototype.getElementCount = function() {

  function countElements(dom_element) {
    // If text node get the text and return
    if( dom_element.type == Node.ELEMENT_NODE ) {
      count++;
      for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
        countElements(dom_element.child_dom_elements[i]);
      } // end loop
    }
  } // end function getStrings

 // Create return object
 var count = 0;

 countElements(this);

 return count;

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Create a text String that represents the DOMElement object
 *
 * @return {String}
 */

OpenAjax.a11y.cache.DOMElement.prototype.toString = function() {
 var str = this.tag_name;

 if (this.tag_name === 'input' && this.type && this.type.length) str += '[type=' + this.type + ']';
 if (this.role && this.role.length) str += '[role=' + this.role + ']';
 if (this.id && this.id.length) str += "[id=" + this.id + ']';
 if (this.class_name && this.class_name.length) str += "[class=" + this.class_name + ']';

 return str;
};

