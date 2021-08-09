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
/*                            LanguagesCache                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor LanguagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for languages cache object which contains a list of
 *    language items representing the language changes of content
 *    in the in a document. The language items also contain a list of all the
 *    dom element objects that share the same language
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object
 *
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches
 *                                         based on whether a rule needs the cache
 *
 * @property {String}    sort_property   - Property of language item that the list is sorted on
 * @property {Boolean}   sort_ascending  - true if list is sorted by ascending values, otherwsie false
 *
 * @property {Array}    language_items  - List of language items
 * @property {Number}   length          - Number of language items in list
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */
OpenAjax.a11y.cache.LanguagesCache = function (dom_cache) {

  this.dom_cache  = dom_cache;
  this.up_to_date = false;

  this.dom_elements =[];

};

/**
 * @method addLanguageItem
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Adds a DOM Element object with an language property to the langauge item list.
 *       If the abreviation item does not exist the function will create one
 *
 * @param {DOMElement}  dom_element  - dom element to add to a abbreviation list
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.addLanguageItem = function (dom_element) {

   this.dom_elements.push(dom_element);

};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Empties all the language items from the cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.emptyCache = function () {

    this.dom_elements.length = 0;
    this.up_to_date = false;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Updates the language cache object with information from a dom element object
 *       This is used during the creation of the cache and is used by the functions for
 *       either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCacheItems = function (dom_element) {

    if (dom_element.has_lang && dom_element.lang.length) {
      this.addLanguageItem(dom_element);
    }
};

/**
 * @method traverseDOMElementsForLanguages
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.traverseDOMElementsForLanguages = function (dom_element) {

    var i;
    if (!dom_element) return;

    if (dom_element.type == Node.ELEMENT_NODE) {

        this.updateCacheItems(dom_element);

        for (i = 0; i < dom_element.child_dom_elements.length; i++) {
            this.traverseDOMElementsForLanguages(dom_element.child_dom_elements[i]);
        }
        // end loop
    }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 *    This function is used to update the language cache
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCache = function () {
    var i;
    var children = this.dom_cache.element_cache.child_dom_elements;
    var children_len = children.length;

    for (i = 0; i < children_len; i++) {
        this.traverseDOMElementsForLanguages(children[i]);
    }

    this.up_to_date = true;
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Returns a text string representation of the language cache object
 *
 * @return {String} Returns string represention the language cache object
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.toString = function () {

    var i;

    var str = "\n\n Elements with Lang Attributes\n";

    var dom_elements     = this.dom_elements;
    var dom_elements_len = dom_elements.length;

    for (i = 0; i < dom_elements_len; i++) {
        str += dom_elements[i].toString();
    }
    // end loop

    return str;
};

