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
/*                            LinkCache                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinksCache
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
 * @property {Array}    area_elements  - List of area element objects in the document
 * @property {Array}    link_elements  - List of link element objects in the document
 * @property {Number}   length         - Number of link element objects in the list
 *
 * @property {String}   this.sort_property   - Link element object property the list of link objects is sorted by
 * @property {Boolean}  this.sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {Array}    links_sorted_by_href  - List of link element object sorted by href values;
 * @property {Array}    links_sorted_by_name  - List of link element object sorted by there accessible name (i.e link text);
 *
 * @property {Boolean}  sorted_by_href_ready  - True if list of link element objects sorted by href values is ready for use in rules
 * @property {Boolean}  sorted_by_name_ready  - True if list of link element objects sorted by name values is ready for use in rules
 */

OpenAjax.a11y.cache.LinksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.area_elements = [];
  this.link_elements = [];
  this.length = 0;

  this.links_sorted_by_href = [];
  this.links_sorted_by_name = [];

  this.sorted_by_name_ready = false;
  this.sorted_by_href_ready = false;

};

/**
 * @method getLinkElementsSortedByName
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Returns a list of link elements sorted by accessible name property
 *
 * @return {Array}  Returns an array of LinkElement objects
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementsSortedByName = function () {

  function compare(a,b) {

    return ((a.accessible_name_for_comparison > b.accessible_name_for_comparison) ||
            ((a.accessible_name_for_comparison === b.accessible_name_for_comparison) &&
             (a.href > b.href)));

  }


  if (!this.sorted_by_name_ready) {

    this.links_sorted_by_name.sort(compare);

    this.sorted_by_name_ready = true;

  }

/*
  OpenAjax.a11y.logger.debug( "Number of Links: " + this.links_sorted_by_name.length);

  for (i = 0; i < this.links_sorted_by_name.length; i++ ) {

    var l = this.links_sorted_by_name[i];

    OpenAjax.a11y.logger.debug( i + "  Name: " + l.accessible_name + "  Compare Name: " + l.accessible_name_for_comparison + " HREF: " + l.href );

  }
*/
  return this.links_sorted_by_name;

};

/**
 * @method getLinksThatShareTheSameName
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Returns a list of links that share the same accessible name
 *       links that are hidden are ignored
 *
 * @return  {Array} Returns at array of same name objects with the following properties:<br/>
 *                  links: an array of link objects<br/>
 *                  same_names: True if all the links in the array share the same accessible name<br/>
 *                  names_count: Number of different accessible names in the links array<br/>
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinksThatShareTheSameName = function () {

  function checkForUniqueDescriptions(sns) {

    function compareDescriptions( a, b ) {
      return a.accessible_description_for_comparison < b.accessible_description_for_comparison;
    }

    var same_name = sns.links.sort(compareDescriptions);
    sns.unique_descriptions = true;

    for (var i = 1; i < same_name.length; i++) {
      var name1 = same_name[i-1];
      var name2 = same_name[i];

      sns.unique_descriptions = same_names.unique_descriptions &&
      ((name1.accessible_description_for_comparison !== name2.accessible_description_for_comparison) ||
       (name1.href === name2.href));
    }

  }



  var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

  var list_of_same_names = [];
  var same_names = null;

  var names = this.getLinkElementsSortedByName();
  var names_len = names.length;

  var i = 0;
  var j = 1;

  while (j < names_len) {

    var name1 = names[i];
    var name2 = names[j];

    if (name1.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
      i++;
      j++;
      continue;
    }

    if (name2.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
      j++;
      continue;
    }

    if (name1.accessible_name_for_comparison === name2.accessible_name_for_comparison) {

      if (same_names) {

        same_names.links.push(name2);

        if (name1.href !== name2.href) {
            same_names.same_hrefs = false;
            same_names.hrefs_count += 1;
        }

      }
      else {
        same_names = {
          links       : [name1, name2],
          same_hrefs  : name1.href === name2.href,
          hrefs_count : (name1.href === name2.href) ? 1 : 2
        };
      }
    }
    else {
      if (same_names) {
        checkForUniqueDescriptions(same_names);
        list_of_same_names.push(same_names);
        same_names = null;
      }
    }

   i = j;
   j++;
  }

  if (same_names) {
    checkForUniqueDescriptions(same_names);
    list_of_same_names.push(same_names);
  }

/*
  OpenAjax.a11y.logger.debug( "Number of same name objects in list: " + list_of_same_names.length);

  for (i = 0; i < list_of_same_names.length; i++ ) {
    var item = list_of_same_names[i];
    OpenAjax.a11y.logger.debug( i  + " NAME: " + item.links[0].accessible_name + "  Number: " + item.links.length + "  Same HREF: " + item.same_hrefs);
  }
*/
  return list_of_same_names;

};

/**
 * @method getLinkElementsSortedByHREF
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Returns a list of link elements sorted by accessible name property
 *
 * @return {Array}  Returns an array of LinkElement objects
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementsSortedByHREF = function () {

  function compare(a,b) {

    return ((a.href > b.href) ||
            ((a.href === b.href) &&
             (a.accessible_name_for_comparison > b.accessible_name_for_comparison)));

  }


  if (!this.sorted_by_href_ready) {
    this.links_sorted_by_href.sort(compare);
    this.sorted_by_href_ready = true;
  }

  return this.links_sorted_by_href;

};


/**
 * @method getLinksThatShareTheSameHREF
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Returns a list of link elements that share the same HREF value
 *       links that are hidden are ignored
 *
 * @return  {Array} Returns at array of same href objects, with the followin properties:<br/>
 *                  links: an array of link objects<br/>
 *                  same_names: True if all the links in the array share the same accessible name<br/>
 *                  names_count: Number of different accessible names in the links array<br/>
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinksThatShareTheSameHREF = function () {

  var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

  var list_of_same_hrefs = [];
  var same_hrefs = null;

  var hrefs = this.getLinkElementsSortedByHREF();
  var hrefs_len = hrefs.length;

  var i = 0;
  var j = 1;

  while (j < hrefs_len) {

    var href1 = hrefs[i];
    var href2 = hrefs[j];

    if (href1.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
      i++;
      j++;
      continue;
    }

    if (href2.dom_element.computed_style.is_visible_to_at === VISIBILITY.HIDDEN) {
      j++;
      continue;
    }

    if (href1.href ===  href2.href) {

      if (same_hrefs) {

        same_hrefs.links.push(href2);

        if (href1.accessible_name_for_comparison !== href2.accessible_name_for_comparison) {
          same_hrefs.same_names = false;
          same_hrefs.names_count += 1;
        }

      }
      else {
        same_hrefs = {
          links : [href1, href2],
          same_names : href1.accessible_name_for_comparison === href2.accessible_name_for_comparison,
          names_count : (href1.accessible_name_for_comparison === href2.accessible_name_for_comparison) ? 1 : 2
        };
      }
    }
    else {
      if (same_hrefs) {
        list_of_same_hrefs.push(same_hrefs);
        same_hrefs = null;
      }
    }

   i = j;
   j++;
  }

  if (same_hrefs) list_of_same_hrefs.push(same_hrefs);

  return list_of_same_hrefs;

};


/**
 * @method addLinkElement
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Adds a link element to the list of link elements and generates a cache id for the object.
 *       Checks if the link has a duplicate href or name in the document
 *
 * @param  {LinkElement}  link_element  - link element to add
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.LinksCache.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.links_sorted_by_name.push(link_element);
    this.links_sorted_by_href.push(link_element);

    this.length = this.length + 1;
    link_element.cache_id = "link_" + this.length;
    link_element.document_order = this.length;
    this.link_elements.push(link_element);

    if (link_element.dom_element.tag_name === 'area') {
      this.area_elements.push(link_element);
    }
  }

  return this.length;
};

/**
 * @deprecated getLinkElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getItemByCacheId = function (cache_id) {

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
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Resests the LinksCache object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.LinksCache.prototype.emptyCache = function () {

  this.link_elements = [];
  this.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Updates the links cache object by checking to see if a dom element
 *          should be added to the cache
 *
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in links cache
 */

OpenAjax.a11y.cache.LinksCache.prototype.updateCacheItems = function (dom_element) {

  var link_element;

  if ((dom_element.tag_name === 'a'    && (dom_element.has_href || dom_element.hasClickEvents()) && !dom_element.is_widget) ||
      (dom_element.tag_name === 'area' && (dom_element.has_href || dom_element.hasClickEvents()) && !dom_element.is_widget) ||
      ((typeof dom_element.role === 'string') && (dom_element.role === 'link'))) {

        dom_element.is_interactive = true;

        link_element = new OpenAjax.a11y.cache.LinkElement(dom_element);

        this.dom_cache.getNameForLink(link_element);

        this.dom_cache.links_cache.addLinkElement(link_element);
  }

};

/**
 * @method traverseDOMElementsForLinkElements
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses dom element objects in the tree to update the links cache
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in links cache
 */

OpenAjax.a11y.cache.LinksCache.prototype.traverseDOMElementsForLinkElements = function (dom_element) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    this.updateCacheItems(dom_element);

    for (i = 0; i < dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForLinkElements(dom_element.child_dom_elements[i]);
    } // end loop
  }

};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses the DOMElements to update the links cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the links cache are disabled, this cache would
 *       not be updated
 */

OpenAjax.a11y.cache.LinksCache.prototype.updateCache = function () {

  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;

  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLinkElements(children[i]);
  }

  this.up_to_date = true;

};


/* ---------------------------------------------------------------- */
/*                            LinkElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates link element object representing information related to an a or area element on a web page
 *
 * @param  {DOMElement}   dom_element   - The dom element object representing the a or area element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the a or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the a or area element in the document in relationship to other a or area elements
 *
 * @property  {String}   href    - The absolute path of the href value
 * @property  {Boolean}  is_url  - true if href is a url, otherwise false (i.e. internal link or broken)
 * @property  {Boolean}  is_link - true if href is a internal or exteranl link, otherwise
 * @property  {Number}   link_type - Type of link contstant
 *
 * @property  {String}   tab_index  - value of the tabindex attribute
 * @property  {String}   name_attr  - value of the name attribute
 * @property  {String}   target     - value of the target attribute
 *
 * @property  {String}      accessible_name                - The accessible name for the link
 * @property  {String}      accessible_name_for_comparison - The accessible name for the link used for comparison
 * @property  {Number}      accessible_name_length         - Length of the accessible name used for comparison
 * @property  {Number}      accessible_name_source         - Numeric constant representing the source of the accessible name
 *                                                            - aria-labelledby
 *                                                            - aria-label
 *                                                            - child text content
 *                                                            - title
 *
 * @property  {String}      accessible_description                 - Accessible description for the link (from aria-describedby)
 * @property  {String}      accessible_description_for_comparison  - Accessible description for the link used for comparison
 *
 * @property  {Number}   height  - Height of the link in pixels
 * @property  {Number}   width   - Width of the link in pixels
 */

OpenAjax.a11y.cache.LinkElement = function (dom_element) {

  function getTypeOfLink(href, name, id) {

    if (typeof href != 'string') return OpenAjax.a11y.LINK_TYPE.OTHER;

    href = href.toLowerCase();

    if (href.length === 0) {
      if ((name && name.length) || (id && id.length))
        return OpenAjax.a11y.LINK_TYPE.TARGET;
      else
        return OpenAjax.a11y.LINK_TYPE.EMPTY;
    }

    if (href === '#') return OpenAjax.a11y.LINK_TYPE.EMPTY;

    if (href.indexOf('http://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTP;
    else
      if (href.indexOf('https://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTPS;
      else
        if (href.indexOf('ftp://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTP;
        else
          if (href.indexOf('ftps://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTPS;
          else
            if (href.indexOf('file://') >= 0) return OpenAjax.a11y.LINK_TYPE.FILE;
            else
              if (href.indexOf('javascript:') >= 0) return OpenAjax.a11y.LINK_TYPE.JAVASCRIPT;
              else
                if (href.indexOf('mailto:') >= 0) return OpenAjax.a11y.LINK_TYPE.MAILTO;
                else
                  if (href[0] === '#') return OpenAjax.a11y.LINK_TYPE.INTERNAL;

    return OpenAjax.a11y.LINK_TYPE.HTTP;
  }


  function testIfHrefIsURL(url) {

    if (typeof href != 'string') return false;

    if (url.indexOf('http://') >= 0) return true;
    else
      if (url.indexOf('https://') >= 0) return true;
      else
        if (url.indexOf('ftp://') >= 0) return true;
        else
          if (url.indexOf('ftps://') >= 0) return true;
          else
            if (url.indexOf('file://') >= 0) return true;

    return false;
  }

  if (!dom_element.node) return;

  var href = dom_element.node.href;

  if ((typeof dom_element.role === 'string') &&
      (dom_element.role === 'link') &&
      (href !== 'string')) href = "javascript:onclick";

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.role = dom_element.role;

  this.href  = href;
  this.is_url = testIfHrefIsURL(href);

  if (this.is_url) {
    this.is_broken = OpenAjax.a11y.util.urlExists(href);
  }
  else {
    this.is_broken = OpenAjax.a11y.URL_RESULT.NOT_A_URL;
  }

  this.tab_index = dom_element.node.tabIndex;

  this.name_attribute = dom_element.node.getAttribute("name");
  this.is_target = this.name_attribute && (this.name_attribute.length > 0);

  var link_type = getTypeOfLink(href, this.name_attribute, dom_element.id);

  this.link_type = link_type;

  this.is_link = false;

  if ((link_type !== OpenAjax.a11y.LINK_TYPE.OTHER) &&
      (link_type !== OpenAjax.a11y.LINK_TYPE.TARGET) &&
      (link_type !== OpenAjax.a11y.LINK_TYPE.EMPTY)) this.is_link = true;

  this.target  = dom_element.node.getAttribute("target");

  var ano = dom_element.getTextObject();

  var cs = dom_element.computed_style;

  // If the link is an image, use the image height and width
  if (ano.height > cs.height) cs.height = ano.height;
  if (ano.width > cs.width) cs.width = ano.width;

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LinkElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;
  var attributes = this.dom_element.getAttributes();

  cache_nls.addPropertyIfDefined(attributes, this, 'href');

  cache_nls.addPropertyIfDefined(attributes, this, 'tab_index');
  cache_nls.addPropertyIfDefined(attributes, this, 'name_attribute');
  cache_nls.addPropertyIfDefined(attributes, this, 'target');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-describedby');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-labelledby');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria-label');
  cache_nls.addPropertyIfDefined(attributes, this, 'title');

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_source');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_description');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_description_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'is_broken');
  cache_nls.addPropertyIfDefined(properties, this, 'is_url');
  cache_nls.addPropertyIfDefined(properties, this, 'is_target');
  cache_nls.addPropertyIfDefined(properties, this, 'link_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getLinkType
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items
 *
 * @return {String} Returns a NLS string representing the type of link
 */

OpenAjax.a11y.cache.LinkElement.prototype.getLinkType = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  return cache_nls.getValueNLS('link_type', this.link_type);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Creates a text string representation of the link element object
 *
 * @param  {String} option  - Substitute string for something other than accessible name
 *
 * @return {String} Returns a text string representation of the link element object
 */

 OpenAjax.a11y.cache.LinkElement.prototype.toString = function (option) {

   var str = "no name";

   if (typeof option === 'string') str = option;
   else if (this.accessible_name_for_comparison.length) str = this.accessible_name;

   if ((this.dom_element.tag_name === 'a') || (this.dom_element.tag_name === 'area')) {
     str = this.dom_element.tag_name + ": " + str;
   }
   else {
     str = this.dom_element.tag_name + "[link]: " + str;
   }

   return str;
 };


