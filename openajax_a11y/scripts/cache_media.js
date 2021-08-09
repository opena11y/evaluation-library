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
/*                      OpenAjax Media Cache                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor MediaInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a MediaInfo object for preserving the current media information
 *        when traversing the DOM for audio and video information
 *
 * @param {MediaInfo} media_info - Current MediaInfo object
 *
 * @property {MediaElement}   media_element  - Parent MediaElement (if any)
 */

OpenAjax.a11y.cache.MediaInfo = function (media_info) {

 if (media_info) {
  this.media_element  = media_info.media_element;
 }
 else {
  this.media_element  = null;
 }
};



/**
  * @constructor MediaCache
  *
  * @memberOf OpenAjax.a11y.cache
  *
  * @desc Creates cache object representing information related to audio, video and other media objects in a document
  *
  * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
  *
  * @property {DOMCache} dom_cache  - Reference to the DOMCache object
  *
  * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
  *                                   NOTE: This is a common property of all caches and is used when selectively build caches
  *                                         based on whether a rule needs the cache
  *
  * @property {Object}   page_element    - Object for referencing page level media rules
  *
  * @property {Array}    media_elements  - List of media element objects in the document
  * @property {Array}    object_elements - List of object elements in the document
  * @property {Array}    audio_elements  - List of audio element in the document
  * @property {Array}    video_elements  - List of video element in the document
  * @property {Array}    embed_elements  - List of embed element in the document
  * @property {Number}   length          - Number of media element objects in the list
  *
  * @property {String}   sort_property   - Image element object property the list of media objects is sorted by
  * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false
  *
  * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
  */

OpenAjax.a11y.cache.MediaCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;

  this.page_element = null;

  this.media_elements = [];
  this.object_elements = [];
  this.video_elements = [];
  this.audio_elements = [];
  this.embed_elements = [];
  this.length = 0;

  this.sort_property = 'document_order';
  this.sort_ascending = false;

};

/**
 * @method addMediaElement
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Adds a media element object to the list of media elements and generates a cache id for the object.
 *
 * @param  {MediaElement}  media_element  - media element object to add
 *
 * @return {Number} Returns the length of the list of media element objects
 */

OpenAjax.a11y.cache.MediaCache.prototype.addMediaElement = function ( media_element ) {

  // item must exist and have the position property
  if (media_element) {
    this.length = this.length + 1;
    media_element.cache_id = "media_" + this.length;
    media_element.document_order = this.length;
    this.media_elements.push( media_element );

    if (media_element.dom_element.tag_name === 'video')  this.video_elements.push(media_element);
    if (media_element.dom_element.tag_name === 'audio')  this.audio_elements.push(media_element);
    if (media_element.dom_element.tag_name === 'object') this.object_elements.push(media_element);
    if (media_element.dom_element.tag_name === 'embed')  this.embed_elements.push(media_element);

 }

 return this.length;

};

/**
 * @method getMediaElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getMediaElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var media_elements_len = this.media_elements.length;

  if (cache_id) {
    for (i=0; i < media_elements_len; i++) {
      if (this.media_elements[i].cache_id == cache_id) {
        return this.media_elements[i];
      }
    } // end loop
  }
  return null;
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Resests the media cache object properties and empties all the lists and arrays
 */

OpenAjax.a11y.cache.MediaCache.prototype.emptyCache = function () {

  this.page_element = null;

  this.media_elements  = [];
  this.audio_elements  = [];
  this.video_elements  = [];
  this.object_elements = [];

  this.sort_property = 'document_order';
  this.sort_ascending = false;
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Updates the media cache by checking to see if a dom element
 *          should be added to the cache
 *
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in media cache
 * @param  {MediaInfo}    media_info  - Information about the current media element relationships in the DOM
 *
 */

OpenAjax.a11y.cache.MediaCache.prototype.updateCacheItems = function (dom_element, media_info) {

  var mi = new OpenAjax.a11y.cache.MediaInfo(media_info);
  var media_element;

  var tag_name = dom_element.tag_name;

  if (tag_name == 'body' && !this.page_element) {

    var pe = new OpenAjax.a11y.cache.PageElementMedia(dom_element);

    // There is only one page element for a document, even when there are frames and iframes
    this.page_element = pe;

    return mi;
  }


  if ((tag_name === 'object') ||
      (tag_name === 'applet') ||
      (tag_name === 'embed') ||
      (tag_name === 'audio') ||
      (tag_name === 'video')) {

    media_element = new OpenAjax.a11y.cache.MediaElement(dom_element);
    this.dom_cache.media_cache.addMediaElement(media_element);

    mi.media_element = media_element;

  }
  else {

    if ((dom_element.tag_name === 'param') &&
        (media_info.media_element &&
         media_info.media_element.dom_element &&
         media_info.media_element.dom_element.tag_name === 'object')) {
       media_element = new OpenAjax.a11y.cache.MediaChildElement(dom_element);
       media_info.media_element.addMediaElement(media_element);
    }

    if ((dom_element.tag_name === 'track') &&
        (media_info.media_element && media_info.media_element.dom_element &&
         ((media_info.media_element.dom_element.tag_name === 'video') ||
         (media_info.media_element.dom_element.tag_name === 'audio')))) {
       media_element = new OpenAjax.a11y.cache.MediaChildElement(dom_element);
       media_info.media_element.addMediaElement(media_element);
    }

  }

  return mi;

};

/**
 * @method traverseDOMElementsForMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses DOMElement objects in the tree to update the media cache
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in media cache
 * @param  {MediaInfo}   media_info  - information about a media elements
 */

OpenAjax.a11y.cache.MediaCache.prototype.traverseDOMElementsForMediaElements = function (dom_element, media_info) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    var mi = this.updateCacheItems(dom_element, media_info);

    for (i=0; i<dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForMediaElements(dom_element.child_dom_elements[i], mi);
    } // end loop
  }

};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses the DOMElements to update the media cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules
 *       dependent on the media cache are disabled, this cache would
 *       not be updated
 */

OpenAjax.a11y.cache.MediaCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;

  var media_info = new OpenAjax.a11y.cache.MediaInfo();

  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForMediaElements(children[i], media_info);
  }

  this.up_to_date = true;
};

/**
 * @method sortMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Sorts media element array by a media element object property
 *
 * @param {String}   property   - Property of media element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.MediaCache.prototype.sortMediaElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.media_elements &&
      this.media_elements.length &&
      !this.media_elements[0][property] ) {
    return false;
  } // endif

  var media_elements_len = this.media_elements.length;

  if (ascending) {
    do {
      swapped = false;
      for (i=1; i<media_elements_len; i++) {
        if (this.media_elements[i-1][property] > this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < media_elements_len; i++) {
        if (this.media_elements[i-1][property] < this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }

  this.sort_property = property;

  return true;

};


/* ---------------------------------------------------------------- */
/*                            MediaElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor MediaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates media element object representing information related to an object, video, audio, embed or applet element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the media element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the media element
 * @property  {String}      cache_id        - String that uniquely identifies the media element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the media element in the document in relationship to other media elements
 */

OpenAjax.a11y.cache.MediaElement = function (dom_element) {

  this.document_order = 0;

  this.dom_element = dom_element;

  var node = dom_element.node;

  this.child_cache_elements = [];

  this.length = 0;

  var attributes = node.attributes;

  for (var i = 0; i < attributes.length; i++) {

    var attr = attributes[i];

    switch (attr.name) {

    case 'controls':
      this.has_controls = true;
      break;

    case 'autoplay':
      this.has_autoplay = true;
      break;

    default:
      break;

    }

  }

  if (dom_element.has_type) this.type = dom_element.type;
  else this.type ="";

  this.data       = node.getAttribute('data');
  this.alt        = node.getAttribute('alt');
  this.longdesc   = node.getAttribute('longdesc');
  this.name       = node.getAttribute('name');
  this.src        = node.getAttribute('src');

  this.file_name = "";
  this.src_is_a_file_name = false;

  if (typeof node.src === 'string'  && node.src.length) {

    var pos = this.src.lastIndexOf('/');

    if (pos >= 0 ) this.file_name = this.src.substring((pos+1));
    else this.file_name = this.src;

    this.src_is_a_file_name = true;
  }

};

/**
 * @method addMediaElement
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Adds a cache media element to the tree representation of media elements
 *
 * @param  {MediaElement } media_element   - Cache media element object to add
 */

OpenAjax.a11y.cache.MediaElement.prototype.addMediaElement = function (media_element) {

 if (media_element) {
    this.length = this.length + 1;
    media_element.cache_id = this.cache_id + "_child_" + this.length;
    media_element.document_order = this.length;
    this.child_cache_elements.push(media_element);
 }

};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MediaElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var attributes = this.dom_element.getAttributes(unsorted);

  cache_nls.addPropertyIfDefined(attributes, this, 'name');
  cache_nls.addPropertyIfDefined(attributes, this, 'controls');
  cache_nls.addPropertyIfDefined(attributes, this, 'autoplay');
  cache_nls.addPropertyIfDefined(attributes, this, 'type');
  cache_nls.addPropertyIfDefined(attributes, this, 'src');
  cache_nls.addPropertyIfDefined(attributes, this, 'file_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'data');
  cache_nls.addPropertyIfDefined(attributes, this, 'alt');
  cache_nls.addPropertyIfDefined(attributes, this, 'longdesc');
  cache_nls.addPropertyIfDefined(attributes, this, 'height');
  cache_nls.addPropertyIfDefined(attributes, this, 'width');

  return attributes;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var properties = [];

  cache_nls.addPropertyIfDefined(properties, this, 'alt_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method getTextTracks
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of media child elements for audio and video elements
 *
 * @return {Array} Returns a array of media child elements
 */

OpenAjax.a11y.cache.MediaElement.prototype.getTextTracks = function () {

  var tt = [];

  for (var i = 0; i < this.child_cache_elements.length; i++) {

    var cce = this.child_cache_elements[i];

    if (cce.dom_element.tag_name === 'track') tt.push(cce);

  }

  return tt;

};

/**
 * @method hasCaptionTrack
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns a boolean value on the availability of the caption track
 *
 * @return {Boolean} Returns a true if media element has a caption track, otherwise false
 */

OpenAjax.a11y.cache.MediaElement.prototype.hasCaptionTrack = function () {

  var tracks = this.getTextTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    if ((track.tag_name === 'track') &&
         (track.kind === 'captions')) return true;
  }

  return false;

};

/**
 * @method hasDescriptionTrack
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns a boolean value on the availability of the audio description track
 *
 * @return {Boolean} Returns a true if media element has a audio description track, otherwise false
 */

OpenAjax.a11y.cache.MediaElement.prototype.hasDescriptionTrack = function () {

  var tracks = this.getTextTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    if ((track.tag_name === 'track') &&
        (track.kind === 'descriptions')) return true;
  }

  return false;

};

/**
 * @method hasSubtitleTrack
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns a boolean value on the availability of the sub title track
 *
 * @return {Boolean} Returns a true if media element has a sub title track, otherwise false
 */

OpenAjax.a11y.cache.MediaElement.prototype.hasSubtitleTrack = function () {

  var tracks = this.getTextTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    if ((track.tag_name === 'track') &&
        (track.kind === 'subtitles')) return true;
  }

  return false;

};

/**
 * @method isTypeVideo
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns a boolean value on if the type attribute is a 'video' type
 *
 * @return {Boolean} Returns a true if 'video' type, otherwise false
 */

OpenAjax.a11y.cache.MediaElement.prototype.isTypeVideo = function () {

  if ((typeof this.type === 'string') &&
      (this.type.indexOf('video') >= 0)) return true;

  return false;

};

/**
 * @method isTypeAudio
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns a boolean value on if the type attribute is a 'audio' type
 *
 * @return {Boolean} Returns a true if 'audio' type, otherwise false
 */

OpenAjax.a11y.cache.MediaElement.prototype.isTypeAudio = function () {

  if ((typeof this.type === 'string') &&
      (this.type.indexOf('audio') >= 0)) return true;

  return false;

};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Creates a text string representation of the media element object
 *
 * @return {String} Returns a text string representation of the media element object
 */

 OpenAjax.a11y.cache.MediaElement.prototype.toString = function () {
   var str = this.dom_element.tag_name;
   if (this.type.length) str += "[type=" + this.type + "]";
   if (this.src  && this.src.length)  str += "[src=" + this.src   + "]";
   if (this.data && this.data.length) str += "[data=" + this.data + "]";
   return str;
 };


/* ---------------------------------------------------------------- */
/*                            MediaChildElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor MediaChildElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates media child element object representing possible caption and audio description information related to an object, video, audio on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the media element
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the media element
 * @property  {String}      cache_id        - String that uniquely identifies the media element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the media element in the document in relationship to other media elements
 */

OpenAjax.a11y.cache.MediaChildElement = function (dom_element) {

  this.document_order = 0;
  this.cache_id = "";

  this.dom_element = dom_element;
  var node = dom_element.node;

  this.tag_name     = dom_element.tag_name;
  this.name         = node.getAttribute('name');
  this.value        = node.getAttribute('value');
  this.src          = node.getAttribute('src');
  this.kind         = node.getAttribute('kind');
  this.srclang      = node.getAttribute('srclang');
  this.label        = node.getAttribute('label');
  this.default_attr = node.getAttribute('default');


};

/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns an array of node results in severity order
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getAttributes = function () {

  var cache_nls = OpenAjax.a11y.nls.Cache;

  var attributes = [];

  cache_nls.addPropertyIfDefined(attributes, this, 'name');
  cache_nls.addPropertyIfDefined(attributes, this, 'value');
  cache_nls.addPropertyIfDefined(attributes, this, 'src');
  cache_nls.addPropertyIfDefined(attributes, this, 'kind');
  cache_nls.addPropertyIfDefined(attributes, this, 'srclang');
  cache_nls.addPropertyIfDefined(attributes, this, 'label');
  cache_nls.addPropertyIfDefined(attributes, this, 'default_attr');

  return attributes;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getCacheProperties = function () {

  var properties = [];

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MediaChildElement.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MediaChildElement
 *
 * @desc Creates a text string representation of the media element object
 *
 * @return {String} Returns a text string representation of the media element object
 */

 OpenAjax.a11y.cache.MediaChildElement.prototype.toString = function () {

   if ((this.tag_name === 'track') &&
       (typeof this.kind === 'string') &&
       this.kind.length) return this.dom_element.tag_name + ": " + this.kind;

   return this.dom_element.tag_name;

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
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree
 *
 * @property  {Number}   type  -  Constant representing the body element
 *
 */

OpenAjax.a11y.cache.PageElementMedia = function (dom_element) {

  this.dom_element     = dom_element;
  this.cache_id        = "page_media";
  this.document_order  = 0;
  this.is_page_element = true;

  this.child_cache_elements = []; // this is always empty for the body element

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

OpenAjax.a11y.cache.PageElementMedia.prototype.getElementResults = function () {
  return this.dom_element.getElementResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns an array of style items
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.getStyle = function () {

  return this.dom_element.getStyle();

};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.getAttributes = function (unsorted) {

  var attributes = this.dom_element.getAttributes();

  if (!unsorted) this.dom_element.sortItems(attributes);

  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns an array of cache properties sorted by property name
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.getCacheProperties = function (unsorted) {

  var properties = this.dom_element.getCacheProperties(unsorted);

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns the value of a property
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }

  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.getEvents = function () {

  return this.dom_element.getEvents();

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.PageElementMedia
 *
 * @desc Returns a text string representation of the page media element
 *
 * @return {String} Returns string represention the title element object
 */

OpenAjax.a11y.cache.PageElementMedia.prototype.toString = function () {

  return "page (media)";
};
