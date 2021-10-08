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
/*          Extend EvaluationResult for more export options         */
/* ---------------------------------------------------------------- */


/**
 * @method toCSV
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Creates a string representing the evaluation results in a CSV format
 *
 * @param {Number}  rule_categories_filter   Filter results based on rule categories
 * @param {Number}  guideline_filter         Filter results based on WCAG Guildines
 * @param {Number}  rule_filter              The ID of the rule to show the results
 * @param {Boolean} details                  Boolean indicating whether to include event and color information
 *
 * @return {String} Returns a string in CSV format
 */

OpenAjax.a11y.EvaluationResult.prototype.toCSV = function (rule_categories_filter, guideline_filter, rule_filter, details) {

  if (typeof rule_categories_filter !== 'number')  rule_categories_filter = OpenAjax.a11y.RULE_CATEGORIES.ALL;
  if (typeof guideline_filter       !== 'number')  guideline_filter =OpenAjax.a11y.WCAG20_GUIDELINE.ALL;
  if (typeof rule_filter            !== 'string')  rule_filter = false;
  if (typeof details                !== 'boolean') details = true;

  OpenAjax.a11y.logger.info("RCF: " + rule_categories_filter);
  OpenAjax.a11y.logger.info("GLF: " + guideline_filter);
  OpenAjax.a11y.logger.info(" RF: " + rule_filter);

  function formatCSV(s, first) {
    if (typeof first !== 'boolean') first = false;
    if (typeof s !== 'string') s = 'not a string';

    s = '"' + s.replace(/"/gi, "'") + '"';

    if (first) {
      return s;
    }

    return ',' + s;

  }

  function formatCSVNumber(value) {
    if (typeof value !== 'number') {
      value = '';
    }
    return formatCSV(value.toString());
  }

  function getEventsForCSV(de) {

    function addEvent(s) {
      if (events.length) {
        events += ';' + s;
      }
      else {
        events = s;
      }

      return events;
    }

    var events = '';

    if (de.hasClickEvents()) {
      addEvent('onClick');
    }
    if (de.hasChangeEvents()) {
      addEvent('onChange');
    }
    if (de.hasMouseEvents()) {
      addEvent('onMouse');
    }
    if (de.hasKeyboardEvents()) {
      addEvent('onKeyboard');
    }
    if (de.hasFocusEvents()) {
      addEvent('onFocus');
    }
    if (de.hasDragEvents()) {
      addEvent('onDrag');
    }

    return events;
  }

    function getARIAForCSV(de) {

      var items = '';

      for (var i = 0; i < de.aria_attributes.length; i++ ) {
        var item = de.aria_attributes[i];
        if (i > 0) items += ';';
        if (item.value.indexOf(' ') > 0 || item.name === 'aria-label') {
          items = item.name + "='" + item.value + "'";
        }
        else {
          items = item.name + '=' + item.value;
        }
      }

      return items;
    }

  var cleanForUTF8  = OpenAjax.a11y.util.cleanForUTF8;

  var ruleset = this.getRuleset();

  var ruleset_info = ruleset.getRulesetInfo();

  var csv = "";

  var now = new Date();

  csv += formatCSV("eval_url", true)        + formatCSV(cleanForUTF8(this.url))   + "\n";
  csv += formatCSV("eval_title", true)      + formatCSV(cleanForUTF8(this.title)) + "\n";

  csv += formatCSV("Date", true) + formatCSV(now.toLocaleDateString()) + "\n";
  csv += formatCSV("Time", true) + formatCSV(now.toLocaleTimeString()) + "\n";

  csv += formatCSV("ruleset_id", true)      + formatCSV(ruleset.getId())      + "\n";
  csv += formatCSV("ruleset_title", true)   + formatCSV(ruleset_info.title)   + "\n";
  csv += formatCSV("ruleset_version", true) + formatCSV(ruleset_info.version) + "\n";

  var rule_group       = this.getRuleResultsAll();
  var rule_results     = rule_group.getRuleResultsArray();
  var rule_results_len = rule_results.length;

  csv += formatCSV("Rule ID", true);
  csv += formatCSV("Result");
  csv += formatCSV("Result Message");
  csv += formatCSV("Element");
  csv += formatCSV("Ordinal Position in DOM");
  csv += formatCSV("Role Attribute");
  csv += formatCSV("ID Attribute");
  csv += formatCSV("Class Attribute");
  csv += formatCSV("HREF or SRC Attribute");
  csv += formatCSV("Source of Accessible Name");
  csv += formatCSV("Accessible Name");

  if (details) {
    csv += formatCSV("Background Color");
    csv += formatCSV("Color");
    csv += formatCSV("Opacity");
    csv += formatCSV("Background Image");
    csv += formatCSV("Font Size");
    csv += formatCSV("Font Weight");
    csv += formatCSV("Color Contrast Ratio");

    csv += formatCSV("ARIA Properties and States");
    csv += formatCSV("Events");
  }
  csv += '\n';

  for (var i = 0; i < rule_results_len; i++) {

    var rule = rule_results[i].getRule();

    if (rule_filter) {
      if (rule.getId() !== rule_filter) {
        continue;
      }
    }
    else {
      OpenAjax.a11y.logger.info("RC: " + rule.getCategory() & rule_categories_filter);
      OpenAjax.a11y.logger.info("GL: " + rule.getGuideline() & guideline_filter);
      if (!((rule.getCategory() & rule_categories_filter) &&
            (rule.getGuideline() & guideline_filter))) {
        continue;
      }
    }

    var element_results     = rule_results[i].getElementResultsArray();
    var element_results_len = element_results.length;

    for (var j = 0; j < element_results_len; j++) {
      var er = element_results[j];
      var de = er.getDOMElement();
      var cs = de.computed_style;

      var result_csv = "";

      switch (er.getResultValue()) {

        case OpenAjax.a11y.ELEMENT_RESULT_VALUE.PASS:
          result_csv = "Pass";
          break;

        case OpenAjax.a11y.ELEMENT_RESULT_VALUE.HIDDEN:
          result_csv = "Hidden";
          break;

        case OpenAjax.a11y.ELEMENT_RESULT_VALUE.MANUAL_CHECK:
          result_csv = "Manual Check";
          break;

        case OpenAjax.a11y.ELEMENT_RESULT_VALUE.WARNING:
          result_csv = "Warning";
          break;

        case OpenAjax.a11y.ELEMENT_RESULT_VALUE.VIOLATION:
          result_csv = "Violation";
          break;

        default:
          result_csv = "Unknown";
          break;
      }

      var identifiers = er.getAccessibleName();

      csv += formatCSV(er.getRuleResult().getRule().getIdNLS(), true);
      csv += formatCSV(result_csv);
      csv += formatCSV(er.getResultMessage());
      csv += formatCSV(de.tag_name);
      csv += formatCSVNumber(de.document_order);
      csv += formatCSV(de.role);
      csv += formatCSV(de.id);
      csv += formatCSV(de.class_name);
      csv += formatCSV(identifiers[2]);
      csv += formatCSV(identifiers[0]);
      csv += formatCSV(identifiers[1]);

      if (details) {
        csv += formatCSV('#' + cs.background_color_hex);
        csv += formatCSV('#' + cs.color_hex);
        csv += formatCSV(cs.opacity);
        csv += formatCSV(cs.background_image);
        csv += formatCSV(cs.font_size);
        if (cs.font_weight < 700) {
          csv += formatCSV('normal');
        }
        else {
          csv += formatCSV('Bold');
        }
        csv += formatCSVNumber(cs.color_contrast_ratio);

        csv += formatCSV(getARIAForCSV(de));
        csv += formatCSV(getEventsForCSV(de));

      }

      csv += '\n';
    }
  }

  csv = unescape(encodeURIComponent(csv));

  return csv;

};

/**
 * @method toHTML
 *
 * @param {Number}  rule_categories_filter   Filter results based on rule categories
 * @param {Number}  guideline_filter         Filter results based on WCAG Guildines
 * @param {Number}  rule_filter              Yje ID of the rule to show the results
 *
 * @return {String} Returns a string in HMTL format
 */

OpenAjax.a11y.EvaluationResult.prototype.toHTML = function (category_filter, guideline_filter, rule_id) {

  if (typeof category_filter !== 'number') category_filter = OpenAjax.a11y.RULE_CATEGORIES.ALL;
  if (typeof guideline_filter !== 'number') guideline_filter = 0;
  if (typeof rule_id !== 'string') rule_id = "";


  function htmlSummary (title, summary) {
    var html = "";
    var spaces = "      ";

    html += spaces + "<h2>" + title + "</h2>\n";

    html += spaces + "<table class='summary'>\n";
    html += spaces + "  <thead>\n";
    html += spaces + "    <tr>\n";
    html += spaces + "     <th title='Violations'>V</th>\n";
    html += spaces + "     <th title='Warnings'>W</th>\n";
    html += spaces + "     <th title='Manual Checks'>MC</th>\n";
    html += spaces + "     <th title='Passed'>P</th>\n";
    html += spaces + "    </tr>\n";
    html += spaces + "  </thead>\n";
    html += spaces + "  <tbody>\n";
    html += spaces + "    <tr>\n";
    html += spaces + "     <td class='violation'>"    + summary.violations    + "</td>\n";
    html += spaces + "     <td class='warning'>"      + summary.warnings      + "</td>\n";
    html += spaces + "     <td class='manual_check'>" + summary.manual_checks + "</td>\n";
    html += spaces + "     <td class='passed'>"       + summary.passed        + "</td>\n";
    html += spaces + "   </tr>\n";
    html += spaces + " </tbody>\n";
    html += spaces + "</table>\n";

    return html;
  }

  function htmlGroupSummaries (eval_result, isCategory) {
    if (typeof isCategory !== 'boolean') isCategory = true;

    var i = 0, v = 0, w = 0, mc = 0, p = 0;
    var group_result;

    var html = "";
    var html_group_details = "";
    var spaces = "      ";

    var groupLabel = "Guideline";
    var groups = wcag_guidelines;

    if (isCategory) {
      groupLabel = "Category";
      groups = rule_categories;
    }

    var rr_all     = eval_result.getRuleResultsAll();
    var rr_summary = rr_all.getRuleResultsSummary();

    html += htmlSummary('Page Summary', rr_summary);

    html += spaces + "<p>The following table shows a summary of how many rules have violations, warnings, required manual checking or passed for a partciular group of rules.</>\n";

    html += spaces + "<div class='row'>\n";
    html += spaces + "  <div class='col-xs-10 col-sm-8 col-md-6 col-lg-4 col-xl-2'>\n";

    html += spaces + "<table class='table table-striped details'>\n";
    html += spaces + "  <thead>\n";
    html += spaces + "    <tr>\n";
    html += spaces + "     <th>" + groupLabel + "</th>\n";
    html += spaces + "     <th class='num' title='Violations'>V</th>\n";
    html += spaces + "     <th class='num' title='Warnings'>W</th>\n";
    html += spaces + "     <th class='num' title='Manual Checks'>MC</th>\n";
    html += spaces + "     <th class='num' title='Passed'>P</th>\n";
    html += spaces + "    </tr>\n";
    html += spaces + "  </thead>\n";
    html += spaces + "  <tbody>\n";


    for (i = 0; i < groups.length; i++ ) {
      if (isCategory) {
        group_result  = eval_result.getRuleResultsByCategory(groups[i]);
      }
      else {
        group_result  = eval_result.getRuleResultsByGuideline(groups[i]);
      }

      var summary    = group_result.getRuleResultsSummary();
      var group_info = group_result.getRuleGroupInfo();

      html += spaces + "    <tr>\n";
      html += spaces + "     <td>" + group_info.title      + "</td>\n";
      html += spaces + "     <td class='num' style='width: 3em;'>" + summary.violations    + "</td>\n";
      html += spaces + "     <td class='num' style='width: 3em;'>" + summary.warnings      + "</td>\n";
      html += spaces + "     <td class='num' style='width: 3em;'>" + summary.manual_checks + "</td>\n";
      html += spaces + "     <td class='num' style='width: 3em;'>" + summary.passed        + "</td>\n";
      html += spaces + "   </tr>\n";

      v  += summary.violations;
      w  += summary.warnings;
      mc += summary.manual_checks;
      p  += summary.passed;

      html_group_details += htmlGroupSummary(group_result);

    }

    html += spaces + "   <tr class='totals'>\n";
    html += spaces + "     <td>All Rules</td>\n";
    html += spaces + "     <td class='num'>" + v  + "</td>\n";
    html += spaces + "     <td class='num'>" + w  + "</td>\n";
    html += spaces + "     <td class='num'>" + mc + "</td>\n";
    html += spaces + "     <td class='num'>" + p  + "</td>\n";
    html += spaces + "   </tr>\n";

    html += spaces + " </tbody>\n";
    html += spaces + "</table>\n";

    html += spaces + "  </div>\n";

    html += spaces + "  <div class='col-xs-2 col-sm-4 col-md-6 col-lg-8 col-xl-10'></div>\n";

    html += spaces + "</div>\n";

    return html + html_group_details;
  }

  function htmlGroupSummary (group_result, details) {

    if (typeof details !== 'boolean') details = false;

    function cleanMessages(msgs) {

      var new_msgs = [];

      for(var i = 0; i < msgs.length; i++) {
        var msg = msgs[i];
        if (msg.indexOf('N/A') < 0 && msg.indexOf('None') < 0) new_msgs.push(msg);
      }

      return new_msgs;
    }

    var summary      = group_result.getRuleResultsSummary();
    var group_info   = group_result.getRuleGroupInfo();
    var rule_results = group_result.getRuleResultsArray();

    var html = "";
    var html_elem_results = "";
    var spaces = "      ";

    html += htmlSummary(group_info.title + ' Rule Results', summary);

    html += spaces + "<p>The following table shows a summary of rule results for the group.</>\n";

    html += spaces + "<table class='table table-striped details'>\n";
    html += spaces + "  <thead>\n";
    html += spaces + "    <tr>\n";
    html += spaces + "     <th>Rule Summary</th>\n";
    html += spaces + "     <th>Rule Result</th>\n";
    html += spaces + "     <th title='WCAG 2.0 Success Criteria Level'>Level</th>\n";
    html += spaces + "     <th>Required</th>\n";
    html += spaces + "     <th>Result Message</th>\n";
    html += spaces + "    </tr>\n";
    html += spaces + "  </thead>\n";
    html += spaces + "  <tbody>\n";

    for (var i = 0; i < rule_results.length; i++ ) {
      var rule_result = rule_results[i];
      var result_messages = cleanMessages(rule_result.getResultMessagesArray());
      var result = rule_result.getResultValueNLS();

      if (result !== 'N/A') {
        html_elem_results += htmlElementResults(rule_result);
      }

      if (result === 'P')   result = '<abbr title="Pass">P</abbr>';
      if (result === 'V')   result = '<abbr title="Violation">V</abbr>';
      if (result === 'W')   result = '<abbr title="Warning">W</abbr>';
      if (result === 'MC')  result = '<abbr title="Manual Check">MC</abbr>';
      if (result === 'N/A') result = '<abbr title="Not Applicable">N/A</abbr>';

      html += spaces + "    <tr>\n";
      html += spaces + "     <td><a target='_rule_details' href='https://fae.disability.illinois.edu/rulesets/" + rule_result.getRule().getId() + "/'>" + rule_result.getRuleSummary() + "</a></td>\n";
      html += spaces + "     <td>" + result + "</td>\n";
      html += spaces + "     <td>" + rule_result.getWCAG20Level() + "</td>\n";
      html += spaces + "     <td>" + rule_result.isRuleRequiredNLS() + "</td>\n";
      if (result_messages.length === 0) {
        html += spaces + "     <td></td>\n";
      }
      else {
        if (result_messages.length === 1) {
          html += spaces + "     <td>" + result_messages[0] + "</td>\n";
        }
        else {
          html += spaces + "     <td>\n";
          html += spaces + "      <ul>\n";
          for(var j = 0; j < result_messages.length; j++) {
            html += spaces + "         <li>" + result_messages[j] + "</li>\n";
          }
          html += spaces + "      </ul>\n";
          html += spaces + "     </td>\n";
        }
      }
      html += spaces + "   </tr>\n";

    }

    html += spaces + " </tbody>\n";
    html += spaces + "</table>\n";

    if (details) {
      html += html_elem_results;
    }

    return html;
  }

  function htmlElementResults (rule_result) {

    function getARIAForHTML(de) {

      var items = '';

      for (var i = 0; i < de.aria_attributes.length; i++ ) {
        var item = de.aria_attributes[i];
        if (i > 0) items += ';';
        if (item.value.indexOf(' ') > 0 || item.name === 'aria-label') {
          items = item.name + "='" + item.value + "'";
        }
        else {
          items = item.name + '=' + item.value;
        }
      }

      return items;
    }


    function getEventsForHTML(de) {

      function addEvent(s) {
        if (events.length) {
          events += ';' + s;
        }
        else {
          events = s;
        }

        return events;
      }

      var events = '';

      if (de.hasClickEvents()) {
        addEvent('onClick');
      }
      if (de.hasChangeEvents()) {
        addEvent('onChange');
      }
      if (de.hasMouseEvents()) {
        addEvent('onMouse');
      }
      if (de.hasKeyboardEvents()) {
        addEvent('onKeyboard');
      }
      if (de.hasFocusEvents()) {
        addEvent('onFocus');
      }
      if (de.hasDragEvents()) {
        addEvent('onDrag');
      }

      return events;
    }

    var html = "";
    var spaces = "      ";

    html += spaces + "<h3> Element Results for " + rule_result.getRuleSummary() + "</h3>\n";
    html += spaces + "<p><a href='https://fae.disability.illinois.edu/rulesets/" + rule_result.getRule().getId() + "/'>More information on " + rule_result.getRuleSummary() + ".</p>\n";

    html += spaces + "<table class='table table-striped details'>\n";
    html += spaces + "  <thead>\n";
    html += spaces + "    <tr>\n";
    html += spaces + "     <th>Result</th>\n";
    html += spaces + "     <th>Rule Message</th>\n";
    html += spaces + "     <th>Element</th>\n";
    html += spaces + "     <th title='Ordinal Position in DOM'>Order</th>\n";
    html += spaces + "     <th><code>role</code></th>\n";
    html += spaces + "     <th title='ID Attribute'><code>id</code></th>\n";
    html += spaces + "     <th title='Class Attribute'><code>class</code></th>\n";
    html += spaces + "     <th title='HREF or SRC Attribute'><code>href/src</code></th>\n";
    html += spaces + "     <th title='Source of Accessible Name'>Source</th>\n";
    html += spaces + "     <th title='Accessible Name or text content'>Accessible Name</th>\n";
    html += spaces + "     <th title='Background Color'>BG Color</th>\n";
    html += spaces + "     <th>Color</th>\n";
    html += spaces + "     <th>Opacity</th>\n";
    html += spaces + "     <th title='Background Image'>BG Image</th>\n";
    html += spaces + "     <th title='Font Size'>size</th>\n";
    html += spaces + "     <th title='Font Weight'>weight</th>\n";
    html += spaces + "     <th title='Color Contrast Ratio'>CCR</th>\n";
    html += spaces + "     <th title='ARIA Properties and States'>ARIA</th>\n";
    html += spaces + "     <th title='User interface events associated with element'>Events</th>\n";
    html += spaces + "    </tr>\n";
    html += spaces + "  </thead>\n";
    html += spaces + "  <tbody>\n";

    var element_results     = rule_result.getElementResultsArray();

    if (element_results.length) {
      for (var i = 0; i < element_results.length; i++) {
        var er = element_results[i];
        var de = er.getDOMElement();
        var cs = de.computed_style;

        var identifiers = er.getAccessibleName();

        html += spaces + "    <tr>\n";
        html += spaces + "      <td>" + er.getResultValueNLS() + "</td>\n";
        html += spaces + "      <td>" + er.getResultMessage()  + "</td>\n";
        html += spaces + "      <td>" + de.tag_name            + "</td>\n";
        html += spaces + "      <td class='num'>" + de.document_order      + "</td>\n";
        html += spaces + "      <td>" + de.role                + "</td>\n";
        html += spaces + "      <td>" + de.id                  + "</td>\n";
        html += spaces + "      <td>" + de.class_name          + "</td>\n";
        html += spaces + "      <td>" + identifiers[2]         + "</td>\n";
        html += spaces + "      <td>" + identifiers[0]         + "</td>\n";
        html += spaces + "      <td>" + identifiers[1]         + "</td>\n";
        html += spaces + "      <td class='num'>" + '#' + cs.background_color_hex + "</td>\n";
        html += spaces + "      <td class='num'>" + '#' + cs.color_hex   + "</td>\n";
        html += spaces + "      <td class='num'>" + cs.opacity           + "</td>\n";
        html += spaces + "      <td>" + cs.background_image  + "</td>\n";
        html += spaces + "      <td class='num'>" + cs.font_size         + "</td>\n";

        if (cs.font_weight < 700) {
          html += spaces + "      <td>normal</td>\n";
        }
        else {
          html += spaces + "      <td>bold</td>\n";
        }

        html += spaces + "      <td class='num'>" + cs.color_contrast_ratio + "</td>\n";
        html += spaces + "      <td>" + getARIAForHTML(de) + "</td>\n";
        html += spaces + "      <td>" + getEventsForHTML(de) + "</td>\n";

        html += spaces + "    </tr>\n";
      }
    }
    else {
        html += spaces + "    <tr>\n";
        html += spaces + "      <td>N/A</td>\n";
        html += spaces + "      <td><em>no element results</em></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "      <td></td>\n";
        html += spaces + "    </tr>\n";
    }

    html += spaces + " </tbody>\n";
    html += spaces + "</table>\n";

    return html;
  }

  var RC = OpenAjax.a11y.RULE_CATEGORIES;
  var rule_categories = [RC.LANDMARKS, RC.HEADINGS, RC.STYLES_READABILITY, RC.IMAGES, RC.LINKS, RC.TABLES, RC.FORMS, RC.WIDGETS_SCRIPTS, RC.AUDIO_VIDEO, RC.KEYBOARD_SUPPORT, RC.TIMING, RC.SITE_NAVIGATION];

  var GL = OpenAjax.a11y.WCAG20_GUIDELINE;
  var wcag_guidelines = [GL.G_1_1, GL.G_1_2, GL.G_1_3, GL.G_1_4, GL.G_2_1, GL.G_2_2, GL.G_2_3, GL.G_2_4, GL.G_3_1, GL.G_3_2, GL.G_3_3, GL.G_4_1];

  var cleanForUTF8  = OpenAjax.a11y.util.cleanForUTF8;

  var ruleset = this.getRuleset();

  var ruleset_info = ruleset.getRulesetInfo();

  var now = new Date();


  var html =  "<!DOCTYPE html>\n";
  html += "<html>\n";
  html += "  <head>\n";
  html += "    <title>AInspector Evaluation Result</title>\n";
  html += "    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'>";
  html += "    <style type='text/css'>\n";
  html += "       main {margin: 2em 1em; }\n";

  html += "       table.summary {border-collapse: separate; border-spacing: 0.5em 0.25em; margin-bottom: 1em; }\n";
  html += "       table.summary th, table.summary td   { width: 3em; padding: 1px; text-align: center;}\n";

  html += "       table.details         { margin-bottom: 3.5em;}\n";
  html += "       table.details th.num  { text-align: center; max-width: 3em;}\n";
  html += "       table.details td.num  { text-align: right;}\n";
  html += "       table.details td ul   { margin-left: 0; padding-left: 0; list-style: none}\n";
  html += "       table.details .totals { font-weight: bold;}\n";

  html += "       .violation    { background-color: rgb(255, 174, 174) }\n";
  html += "       .warning      { background-color: rgb(255, 236, 148) }\n";
  html += "       .manual_check { background-color: rgb(180, 216, 231) }\n";
  html += "       .passed       { background-color: rgb(176, 229, 124) }\n";
  html += "    </style>\n";
  html += "  </head>\n";
  html += "  <body>\n";
  html += "    <main>\n";

  html += "      <h1>AInspector Evaluation Result</h1>\n";

  html += "      <ul class='info'>\n";
  html += "        <li><strong>URL:</strong> "   + cleanForUTF8(this.url)    + "</li>\n";
  html += "        <li><strong>Title:</strong> " + cleanForUTF8(this.title)  + "</li>\n";

  html += "        <li><strong>Date:</strong> " + now.toLocaleDateString()  + "</li>\n";
  html += "        <li><strong>Time:</strong> " + now.toLocaleTimeString()  + "</li>\n";

  html += "        <li><strong>Ruleset:</strong> " +ruleset_info.title  + "</li>\n";
  html += "        <li><strong>Ruleset Version:</strong> " + ruleset_info.version  + "</li>\n";
  html += "      </ul>\n";


  if (category_filter) {
    if (category_filter === OpenAjax.a11y.RULE_CATEGORIES.ALL) {
      html += htmlGroupSummaries(this, true);
    }
    else {
      html += htmlGroupSummary(this.getRuleResultsByCategory(category_filter), true);
    }
  }
  else {
    if (guideline_filter) {
      if (guideline_filter === OpenAjax.a11y.WCAG20_GUIDELINE.ALL) {
        html += htmlGroupSummaries(this, false);
      }
      else {
        html += htmlGroupSummary(this.getRuleResultsByGuideline(guideline_filter), true);
      }
    }
    else {
      if (rule_id) {
        html += htmlElementResults(this.getRuleResult(rule_id));
      }
      else {
        html += "<p style='color: red'>Error in defining result filters</p>";
      }
    }
  }

  html += "        </main>\n";
  html += "  </body>\n";
  html += "</html>\n";
  return html;

};

