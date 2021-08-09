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
/*                      FilteredCacheItemResults                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredCacheItemResults
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructs a data structure of cache items associated with a rule category
 *       The cache items returned can be filtered by the tpe of evaluation result
 *
 * @param  {Object}  evaluation_result  - Evaluation result object containing the evaluation results
 *
 * @param  {String}  title     - Title for the group
 * @param  {String}  url       - URL to more information on the group
 * @param  {String}  desc      - Description of the group
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {Boolean} is_tree       - At least one of the CacheItemResults contains child items
 * @propert   {Object}  ruleset       - Ruleset object containing the evaluation results
 * @property  {Object}  dom_cache     - dom cache to use in generating filtered results
 *
 * @property  {Number}  element_type  - Element type(s) included in this cache list;
 * @property  {Number}  filter        - Node result filter used on the list
 *
 * @property  {Array}   cache_item_results        - list of top level cache item results
 *
 * @property  {Boolean}  has_elements  - True if group contains at least one element
 *
 * @property  {Boolean}  summary_result     - Summary of the node results for
 *                                            the rule
 */

 OpenAjax.a11y.FilteredCacheItemResults = function(eval_results, title, url, desc) {

  this.title = "";
  this.url = "";
  this.desc = "";

  if (typeof title === 'string') this.title = title;
  if (typeof url   === 'string') this.url = url;
  if (typeof desc  === 'string') this.desc = desc;

  this.is_tree = false;
  this.evaluation_results = eval_results;
  this.dom_cache = eval_results.dom_cache;

  this.element_type = OpenAjax.a11y.ELEMENT_TYPE.UNDEFINED;
  this.filter       = OpenAjax.a11y.RESULT_FILTER.ALL;

  this.has_elements = false;

  this.node_result_summary = new OpenAjax.a11y.ElementResultSummary();

  this.rule_results_summary = new OpenAjax.a11y.RuleResultsSummary();

  this.cache_item_results = [];

};

/**
 * @method getTitle
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns the title of the group
 *
 * @return  {String} String representing the title of the group
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.getTitle = function() {

  return this.title;
};

/**
 * @method getURL
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns the url of the group, can be empty
 *
 * @return  {String} String of the url to more information about a group
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.getURL = function() {

  return this.url;
};

/**
 * @method getDescription
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns the description of the group, can be empty
 *
 * @return  {String} String describing the group of rules
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.getDescription = function() {

  return this.desc;
};

/**
 * @method isTree
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Tests if the cache items has a tree structure (otherwise simple list)
 *
 * @return  {Boolean}  true if cache items are organized as a tree, otherwise false
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.isTree = function() {

  return this.is_tree;
};


 /**
 * @method getElementResultSummary
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Gets numerical summary information about the node results
 *
 * @return {ElementResultSummary} Returns the ElementResultSummary object
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.getElementResultSummary = function () {

  return this.node_result_summary;

};

 /**
 * @method getRuleResultsSummary
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Gets numerical summary information about the rule results
 *
 * @return {RuleResultsSummary} Returns the rule result summary object
 */
OpenAjax.a11y.FilteredCacheItemResults.prototype.getRuleResultsSummary = function () {

  return this.rule_results_summary;

};




/**
 * @method hasResults
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Tests if any of the rules in this group applied to the content in the page
 *
 * @return {Boolean} True if any of the rule have results, otherwise false
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.hasResults = function () {

   return this.node_result_summary.hasResults();

};

/**
 * @method hasElements
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Tests if any of their are any elements of this type
 *
 * @return {Boolean} True if the group contains at least one element, otherwise false
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.hasElements = function () {

   return this.has_elements;

};

/**
 * @method updateSummary
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Updated summary result counts with cache item results
 *
 * @param  {Array}   cache_item_result  - Cache item result to add to summary information
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.updateSummary = function(cache_item_result) {

  this.node_result_summary.addElementResultSummary(cache_item_result.getElementResultSummary());

};

/**
 * @method getCacheItemResults
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Constructs a data structure of cache items associated with a rule category
 *       The cache items returned can be filtered by the tpe of evaluation result
 *
 * @param  {Number}  element_type             - Number representing the element types to be included
 * @param  {Number}  filter        (optional) - Number representing the evaluation results filter (default all results)
 */

 OpenAjax.a11y.FilteredCacheItemResults.prototype.getCacheItemResults = function(element_type, filter) {

//  OpenAjax.a11y.logger.debug("FILTER: " + filter );

  var ELEMENT_TYPE = OpenAjax.a11y.ELEMENT_TYPE;

  this.element_type  = element_type;

  if (typeof filter !== 'number') filter = OpenAjax.a11y.RESULT_FILTER.ALL;

  this.filter = filter;

  this.cache_item_results = [];

  var ci_result = null;

  switch (element_type) {

  case ELEMENT_TYPE.ALL:
    this.title = "All Elements";
    this.filterCacheItemsByElementResultsFromTree(this.dom_cache.element_cache.child_dom_elements, filter, true);
    break;

  case ELEMENT_TYPE.AUDIO_VIDEO:
    this.title = "Audio and Video Elements";
    this.filterCacheItemsByElementResultsFromTree(this.dom_cache.media_cache.media_elements, filter);
    break;

  case ELEMENT_TYPE.FORMS:
    this.title = "Form Elements";
    this.filterCacheItemsByElementResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, filter);
    break;

  case ELEMENT_TYPE.HEADINGS_LANDMARKS:
    this.title = "Heading and Landmark Elements";
    var cache =  this.dom_cache.headings_landmarks_cache;

    if (cache.title_element) {
      ci_result = new OpenAjax.a11y.CacheItemResult(cache.title_element, filter, 1);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    if (cache.page_element)  {
      ci_result = new OpenAjax.a11y.CacheItemResult(cache.page_element, filter, 2);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    this.filterCacheItemsByElementResultsFromTree(cache.child_cache_elements, filter, 2);

    break;

  case ELEMENT_TYPE.IMAGES:
    this.title = "Image Elements";
    this.filterCacheItemsByElementResultsFromList(this.dom_cache.images_cache.image_elements, filter);
    break;

  case ELEMENT_TYPE.LINKS:
    this.title = "Link Elements";
    this.filterCacheItemsByElementResultsFromList(this.dom_cache.links_cache.link_elements, filter);
    break;

  case ELEMENT_TYPE.LAYOUT_TABLES:

    if (this.dom_cache.tables_cache.page_element)  {
      ci_result = new OpenAjax.a11y.CacheItemResult(this.dom_cache.tables_cache.page_element, filter, 1);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    this.title = "Table Elements";
    this.filterCacheItemsByElementResultsFromTree(this.dom_cache.tables_cache.child_cache_elements, filter, 1);
    break;

  case ELEMENT_TYPE.TEXT:
    this.title = "Elements with Text Content";
    this.filterCacheItemsByElementResultsFromList(this.dom_cache.text_cache.text_nodes, filter);
    break;

  case ELEMENT_TYPE.WIDGETS:
    this.title = "Widget Elements";
    this.filterCacheItemsByElementResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, filter);
    break;

  default:
    break;

  }

};

/**
 * @method filterCacheItemsByElementResultsFromList
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns a lists of cache item results by filtered node results based on
 *       the filter.  Does not traverse the children of the cache items
 *
 * @param  {Array}   cache_items  - List of cache element items
 * @param  {Number}  filter       - Number representing the types of results
 *                                  to include in the array
 * @param  {Number}  start        - Start for the ordinal position
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.filterCacheItemsByElementResultsFromList = function(cache_items, filter, start) {

  if (typeof start !== 'number') start = 0;

  var index = start + 1;

  this.is_tree = false;

  var cache_items_len = cache_items.length;

  for (var i = 0; i < cache_items_len; i++) {

    var ci = cache_items[i];

    var ci_result = new OpenAjax.a11y.CacheItemResult(ci, filter, index);

    index++;

    this.updateSummary(ci_result);

    if (ci_result) this.cache_item_results.push(ci_result);

  }

};


/**
 * @method filterCacheItemsByElementResultsFromTree
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns an nested lists of cache item results by node results based on the filter
 *
 * @param  {Array}    cache_items  - Array of cache element items
 * @param  {Number}   filter       - Number representing the types of results
 *                                   to include in the array
 * @param  {Boolean}  as_list      - Optional parameter to force result to be a list
 * @param  {Number}   start        - Start for the ordinal position
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.filterCacheItemsByElementResultsFromTree = function(cache_items, filter, as_list, start) {

   function traverseCacheItems(cache_item_result, cache_item) {

    var ci_result = new OpenAjax.a11y.CacheItemResult(cache_item, filter, index);

    index++;

    filtered_cache_item_results.updateSummary(ci_result);

    if (cache_item_result && !as_list) {
      cache_item_result.addChildCacheItemResult(ci_result);
      is_tree = true;
    } else {
      cache_item_results.push(ci_result);
    }

    var child_cache_elements     = [];
    var child_cache_elements_len = 0;

    if (cache_item.child_cache_elements) child_cache_elements = cache_item.child_cache_elements;
    else if (cache_item.child_dom_elements) child_cache_elements = cache_item.child_dom_elements;

    child_cache_elements_len = child_cache_elements.length;

//    OpenAjax.a11y.logger.debug("CI Result: " + ci_result + "   flag: " + OpenAjax.a11y.FilteredCacheItemResults.add_flag + "   children: " + child_cache_elements_len);

    for (var i = 0; i < child_cache_elements_len; i++) {

      var cces = child_cache_elements[i];
      traverseCacheItems(ci_result, cces);

    }

  }

  var is_tree = false;

  var filtered_cache_item_results = this;

  if (typeof as_list !== 'boolean') as_list = false;

  if (typeof start !== 'number') start = 0;

  var index = start + 1;

  var cache_item_results = [];

  var cache_items_len = cache_items.length;

  for (var i = 0; i < cache_items_len; i++) {
    var ci = cache_items[i];
    traverseCacheItems(null, ci);
  }

  this.is_tree = is_tree;
  this.cache_item_results = cache_item_results;

  OpenAjax.a11y.logger.debug("IS TREE: " + this.is_tree);

};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns an JSON representation of the filtered cache item results
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  JSON string representing the report data
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.toJSON = function(prefix, element_type_title) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";

  if (typeof  element_type_title !== 'string' ||  element_type_title.length === 0)  element_type_title = "no element title";

  var json = "";

  var ruleset_title   = this.evaluation_results.getRulesetTitle();
  var ruleset_version = this.evaluation_results.getRulesetVersion();
  var ruleset_id      = this.evaluation_results.getRulesetId();

  var eval_title = this.evaluation_results.getTitle();
  var eval_url   = this.evaluation_results.getURL();
  var date       = this.evaluation_results.getDate().split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  if (typeof eval_title != 'string' && eval_title.length === 0) eval_title = "no evaluation title";

  json += "{";

  json += prefix + "  \"element_type_title\" : " + JSON.stringify(element_type_title) + ",";

  json += prefix + "  \"ruleset_title\"      : " + JSON.stringify(ruleset_title)      + ",";
  json += prefix + "  \"ruleset_version\"    : " + JSON.stringify(ruleset_version)    + ",";
  json += prefix + "  \"ruleset_id\"         : \"" + ruleset_id + "\",";

  json += prefix + "  \"eval_title\"    : " + JSON.stringify(eval_title) + ",";
  json += prefix + "  \"eval_url\"      : " + JSON.stringify(eval_url)   + ",";
  json += prefix + "  \"eval_date\"     : " + JSON.stringify(eval_date)  + ",";
  json += prefix + "  \"eval_time\"     : " + JSON.stringify(eval_time)  + ",";


  if (this.is_tree) json += prefix + "  \"is_tree\" : true,";
  else json += prefix + "  \"is_tree\" : false,";

  json += prefix + "  \"results\" : [";

  var ci_results = this.cache_item_results;
  var ci_results_len = ci_results.length;
  var ci_results_last = ci_results_len - 1;

//  OpenAjax.a11y.logger.debug("  Number of cache results: " + ci_results.length);

  for (var i = 0; i < ci_results_len; i++) {

//    OpenAjax.a11y.logger.debug("  " + i + ": " + ci_results[i].cache_item.cache_id);

    json += ci_results[i].toJSON(next_prefix);

    if (i !== ci_results_last) json += ",";
  }
  json += prefix + "  ]";

  json += prefix + "}";

  return json;

};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns an HTML representation of the filtered cache item results
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the HTML for the report
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.toHTML = function(title) {

  var evaluation_results = this.evaluation_results;

  var wcag20_nls  = OpenAjax.a11y.nls.WCAG20.getNLS();

  var html = "";

  html += "<!DOCTYPE html>\n";
  html += "<html xml:lang='en' lang='en'>\n";
  html += "  <head>\n";
  html += "    <title>" + title + "</title>\n";
  html += "    <meta charset='ISO-8859-1' />\n";
  html += OpenAjax.a11y.report_css;
  html += "    <script type='text/javascript'>\n";
  html += "      var OAA_REPORT = {};\n";
  html += "      OAA_REPORT.element_type_data = " + this.toJSON("\n      ", title) + ";\n\n";
  html += "      OAA_REPORT.ruleset = " + evaluation_results.toJSON("\n      ", evaluation_results.getRulesetTitle()) + ";\n\n";
  html += "      OAA_REPORT.wcag20  = " + wcag20_nls.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += OpenAjax.a11y.report_element_type_view_js;
  html += "  </head>\n";
  html += OpenAjax.a11y.report_element_type_view_body;
  html += "</html>\n";

  return html;
};

/**
 * @method toCSV
 *
 * @memberOf OpenAjax.a11y.FilteredCacheItemResults
 *
 * @desc Returns an CSV representation of the filtered cache item results
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the CSV for the report
 */

OpenAjax.a11y.FilteredCacheItemResults.prototype.toCSV = function(title) {

  var eval_title = this.evaluation_result.title;
  var eval_url   = this.evaluation_result.url;
  var date       = this.evaluation_result.date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  if (eval_title.length > 30) eval_title = eval_title.slice(0,27) + "...";

  var csv = title + "\n\n";

  csv += "\"OAA ID\"";
  csv += ",\"Element Description\"";
  csv += ",\"Element id attribute\"";
  csv += ",\"Element class attribute\"";
  csv += ",\"Parent Landmark\"";
  csv += ",\"Rule ID\"";
  csv += ",\"Type\"";
  csv += ",\"WCAG 2.0 Success Criterion\"";
  csv += ",\"WCAG 2.0 Level\"";
  csv += ",\"Severity\"";
  csv += ",\"Evaluation Result Message\"";
  csv += ",\"Evaluation Date\"";
  csv += ",\"Evaluation Time\"";
  csv += "\"URL Evaluated\"";
  csv += ",\"Title of URL Evaluated\"";
  csv += "\n";

  var result_items     = this.cache_item_results;
  var result_items_len = result_items.length;

  for (var i = 0; i < result_items_len; i++) {

     var result_item      = result_items[i];
     var node_results     = result_item.node_results;
     var node_results_len = node_results.length;

     for (var j = 0; j < node_results_len; j++) {

       var node_result = node_results[j];

       var dom_element = result_item.cache_item;

       if (result_item.cache_item.dom_element) dom_element = result_item.cache_item.dom_element;
       else dom_element = result_item.cache_item;

       var cache_item = node_result.getCacheItem();

       csv += "\"" + cache_item.cache_id;
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(cache_item.toString());
       csv += "\",\"" + dom_element.getId();
       csv += "\",\"" + dom_element.getClassName();
       csv += "\",\"" + dom_element.getParentLandmark();
       csv += "\",\"" + node_result.getRuleIdNLS() + ": " + OpenAjax.a11y.util.escapeForJSON(node_result.getRuleSummary());
       csv += "\",\"" + node_result.getRuleType();
       csv += "\",\"" + node_result.getPrimarySuccessCriterion();
       csv += "\",\"" + node_result.getWCAG20Level();
       csv += "\",\"" + node_result.getResultValue().label;
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(node_result.getResultMessage());
       csv += "\",\"" + eval_date;
       csv += "\",\"" + eval_time;
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(eval_title);
       csv += "\",\"" + eval_url;
       csv += "\"\n";

    }
  }

  return csv;
};


/* ---------------------------------------------------------------- */
/*                           CacheItemResult                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor CacheItemResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Represents one of the cache items in a cache items filter result object
 *
 * @param  {CacheItem}  cache_item  - cache item to be included in filtered results
 * @param  {Number}     filter      - Number representing the types of results
 *                                    to include in the array
 * @param  {Number}     pos         - Position in a list
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property {Object}  cache_item  - Cache item object
 *
 * @property {Number}  ordinal_position      - Position in a list
 *
 * @property {Array}   filtered_node_results - Filtered node results of the cache item
 *
 * @property  {SummaryResult}  summary_result - Summary of the node results for
 *                                            the cache item
 *
 * @property {Number}  number_of_node_results_filtered  - Number of node results that
 *                                            have been filtered from the list
 *
 * @property {Array}   children  - Array of cache item result objects  (if there
 *                                 are parent/child relationships, like headings
 *                                 and landmarks)
 */

 OpenAjax.a11y.CacheItemResult = function(cache_item, filter, pos) {

  function addElementResultsWebsite(node_results) {

    var node_results_len = node_results.length;
    var count = 0;

    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
      if (node_result.isScopeWebsite()) {
        filtered_node_results.push(node_result);
        count++;
      }
    }

    return count;
  }

  function addElementResultsPage(node_results) {

    var node_results_len = node_results.length;
    var count = 0;

    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
      if (node_result.isScopePage()) {
        filtered_node_results.push(node_result);
        count++;
      }
    }

    return count;
  }

  function addElementResultsElement(node_results) {

    var node_results_len = node_results.length;
    var count = 0;

    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
      if (node_result.isScopeElement()) {
        filtered_node_results.push(node_result);
        count++;
      }
    }

    return count;
  }

  function addElementResults(node_results) {

    var node_results_len = node_results.length;

    for (var i = 0; i < node_results_len; i++) filtered_node_results.push(node_results[i]);

    return node_results_len;
  }


  this.cache_item = cache_item;

  this.filtered_node_results     = [];

  this.number_of_node_results_filtered = 0;

  this.is_tree = false;

  this.ordinal_position = pos;

  var rs = new OpenAjax.a11y.ElementResultSummary();

  this.children = [];

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var filtered_node_results = this.filtered_node_results;

  var de = cache_item;
  if (typeof cache_item.dom_element  != 'undefined') de = cache_item.dom_element;

  if (RESULT_FILTER.VIOLATION            & filter) rs.addViolations(addElementResults(de.rules_violations));
  if (RESULT_FILTER.WEBSITE_MANUAL_CHECK & filter) rs.addManualChecks(addElementResultsWebsite(de.rules_manual_checks));
  if (RESULT_FILTER.PAGE_MANUAL_CHECK    & filter) rs.addManualChecks(addElementResultsPage(de.rules_manual_checks));
  if (RESULT_FILTER.ELEMENT_MANUAL_CHECK & filter) rs.addManualChecks(addElementResultsElement(de.rules_manual_checks));
  if (RESULT_FILTER.WARNING              & filter) rs.addWarnings(addElementResults(de.rules_warnings));
  if (RESULT_FILTER.PASS                 & filter) rs.addPassed(addElementResults(de.rules_passed));
  if (RESULT_FILTER.HIDDEN               & filter) rs.addHidden(addElementResults(de.rules_hidden));

  this.number_of_node_results_filtered  = (de.rules_passed.length        - rs.passed);
  this.number_of_node_results_filtered += (de.rules_violations.length    - rs.violations);
  this.number_of_node_results_filtered += (de.rules_warnings.length      - rs.warnings);
  this.number_of_node_results_filtered += (de.rules_manual_checks.length - rs.manual_checks);
  this.number_of_node_results_filtered += (de.rules_hidden.length        - rs.hidden);

  this.node_result_summary = rs;


};

/**
 * @method addChildCacheItemResult
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Adds a cache item result to the children list of a cache item result object
 *
 * @param  {Object}  cache_item  - cache item to be included in filtered results
 */

OpenAjax.a11y.CacheItemResult.prototype.addChildCacheItemResult = function(cache_item) {

  if (cache_item) {
    this.children.push(cache_item);
    this.is_tree = true;
  }

};


/**
 * @method isTree
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Tests if the cache items has a tree structure (otherwise simple list)
 *
 * @return  {Boolean}  true if cache items are organized as a tree, otherwise false
 */

OpenAjax.a11y.CacheItemResult.prototype.isTree = function() {

  return this.is_tree;
};

/**
 * @method agetCacheItem
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Get cache item object
 *
 * @return  {Object}  Cache item object
 */

OpenAjax.a11y.CacheItemResult.prototype.getCacheItem = function() {

  return this.cache_item;

};


/**
 * @method getElementResultSummary
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Gets numerical summary information about the cache item results
 *
 * @return {ResultSummary} Returns the ResultSummary object
 *
 */

OpenAjax.a11y.CacheItemResult.prototype.getElementResultSummary = function () {

  return this.node_result_summary;

};

/**
 * @method hasResults
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Tests if node has any rule results
 *
 * @param  {Boolean}  True if there are rule results, otherwise false
 */

OpenAjax.a11y.CacheItemResult.prototype.hasResults = function() {

  return this.node_result_summary.hasResults();

};

/**
 * @method getHighestResultValueConstant
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Gets highest result value for the node results for this cache item
 *
 * @return {Number} Number representing the highest result value
 */

OpenAjax.a11y.CacheItemResult.prototype.getHighestResultValueConstant = function () {

  var RESULT_VALUE =  OpenAjax.a11y.RESULT_VALUE;

  var rs = this.getElementResultSummary();

  if (rs.violations)    return RESULT_VALUE.VIOLATION;
  if (rs.warnings)      return RESULT_VALUE.WARNING;
  if (rs.manual_checks) return RESULT_VALUE.MANUAL_CHECK;
  if (rs.passed)        return RESULT_VALUE.PASS;
//  if (rs.hidden)        return RESULT_VALUE.HIDDEN;

  return RESULT_VALUE.NONE;

};


/**
 * @method getElementResults
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Gets an array of node results for the cache item
 *
 * @param  {Array}  Array of node results
 */

OpenAjax.a11y.CacheItemResult.prototype.getElementResults = function() {

  return this.filtered_node_results;

};

/**
 * @method getOrdinalPosition
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Gets ordinal position of the cache item in the DOM, 1 based
 *
 * @param  {Number}  Number representing the ordinal position
 */

OpenAjax.a11y.CacheItemResult.prototype.getOrdinalPosition = function() {

  return this.ordinal_position;

};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.CacheItemResult
 *
 * @desc Returns a JSON representation of the cache item
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  String representing the cache item result object
 */

OpenAjax.a11y.CacheItemResult.prototype.toJSON = function(prefix) {

  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else {
    next_prefix = prefix + "  ";
    next_prefix_2 = next_prefix + "  ";
  }

  var i;
  var json = "";

  var rs = this.getElementResultSummary();

  json += prefix + "{ \"cache_item\"    : \"" + OpenAjax.a11y.util.escapeForJSON(this.cache_item.toString()) + "\",";
  json += prefix + "  \"cache_id\"      : \"" + this.cache_item.cache_id + "\",";
  json += prefix + "  \"violations\"    : "  + rs.violations    + ",";
  json += prefix + "  \"manual_checks\" : "  + rs.manual_checks + ",";
  json += prefix + "  \"warnings\"      : "  + rs.warnings      + ",";
  json += prefix + "  \"passed\"        : "  + rs.passed        + ",";
  json += prefix + "  \"hidden\"        : "  + rs.hidden        + ",";
  json += prefix + "  \"total\"         : "  + rs.total         + ",";

  json += prefix + "  \"filtered\"      : "  + this.number_of_node_results_filtered  + ",";

  if (this.filtered_node_results.length > 0) {
    json += prefix + "  \"node_results\" : [";

    var n_results      = this.filtered_node_results;
    var n_results_len  = n_results.length;
    var n_results_last = n_results_len - 1;

    for (i = 0; i < n_results_len; i++) {
      json += n_results[i].toJSON(next_prefix);
      if (i !== n_results_last) json += ",";
    }
    json += prefix + "  ],";
  }
  else {
    json += prefix + "  \"node_results\" : [],";
  }

  if (this.children.length > 0) {
    json += prefix + "  \"children\" : [";

    var children      = this.children;
    var children_len  = children.length;
    var children_last = children_len - 1;

    for (i = 0; i < children_len; i++) {
      json += children[i].toJSON(next_prefix_2);
      if (i !== children_last) json += ',';
    }
    json += prefix + "  ]";
  }
  else {
    json += prefix + "  \"children\" : []";
  }

  json += prefix + "}";

  return json;

};
