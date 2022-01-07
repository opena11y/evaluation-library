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
/*                       RulesetFactory                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor RulesetFactory
 *
 * @memberOf OpenAjax.a11y
 *
 * NOTE: The following properties are defined when the ruleset is created
 *
 * @property {Object}  ruleset_info        - RulesetInfo object
 * @property {Object}  rule_mapping_info   - Rule mapping information object
 * @property {String}  locale              - String representing the language
 */

OpenAjax.a11y.RulesetFactory = {

  /**
   * @method newInstance
   *
   * @memberOf OpenAjax.a11y.RulesetFactory
   *
   * @desc Gets a new instance of RulesetFactory object
   *
   * @return  {RulesetFactory}  see description
   */


  newInstance : function() {
    var ruleset_info = null;
    var rule_mapping_info = null;
    var locale = "en-us`";

    return {

      /**
       * @method setParameter
       *
       * @memberOf OpenAjax.a11y.RulesetFactory
       *
       * @desc Set required parameter for the ruleset
       *
       * @param  {String}           name   - Name of the parameter
       * @param  {String | Object}  value  - Value of the parameter
       */

      setParameter : function(name, value) {

        if (typeof name === 'string') {
          name = name.toLowerCase();
        }
        else {
          throw new Error("[OpenAjax A11y][Rulesetfactory] Parameter name not a string");
        }

        switch (name) {

        case 'rulesetinfo':
          if (value) {
            ruleset_info = value;
            return true;
          }
          else {
            throw new Error("[OpenAjax A11y][Rulesetfactory] Invalid Ruleset Information Object");
          }

        case 'rulemappinginfo':
          if (value) {
            rule_mapping_info = value;
            return true;
          }
          else {
            throw new Error("[OpenAjax A11y][Rulesetfactory] Invalid Rule Mapping Information Object");
          }

        default:
          throw new Error("[OpenAjax A11y][Rulesetfactory] Unsupported paramater: " + name);
        } // end switch
      }, // end setParameter

      /**
       * @method setFeature
       *
       * @memberOf OpenAjax.a11y.RulesetFactory
       *
       * @desc Set a optional feature for the ruleset
       *
       * @param  {String}           name   - Name of the feature
       * @param  {String | Object}  value  - Value of the feature
       */

      setFeature : function(name, value) {

        if (typeof name === 'string') {
          name = name.toLowerCase();
        }
        else {
          throw new Error("[OpenAjax A11y][Rulesetfactory] Feature name not a string");
        }

        switch(name) {

        case 'locale':
          if ((typeof value === 'string') && (value.length > 0)) {
            locale = value;
            return true;
          }
          else {
            throw new Error("[OpenAjax A11y][Rulesetfactory] Locale is not a string");
          }

        default:
          // throw exception to console
          throw new Error("[OpenAjax A11y][Rulesetfactory] Unsupported feature: " + name);

        }

      },  // end setFeature

      /**
       * @method newRuleset
       *
       * @memberOf OpenAjax.a11y.RulesetFactory
       *
       * @desc Gets a Ruleset object with the current parameters and features
       *
       * @return  {Ruleset}  see description
       */

      newRuleset : function() {

        if (ruleset_info && rule_mapping_info) {
          var ruleset = new OpenAjax.a11y.Ruleset(ruleset_info, rule_mapping_info, locale);
          return Object.freeze(ruleset);
        }

        return null;
      }
    };
  }
};



/* ---------------------------------------------------------------- */
/*                       Ruleset                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor Ruleset
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {Object} ruleset_info       -  JSON object representing ruleset information
 * @param  {Object} rule_mapping_info  -  JSON object representing rule mapping
 * @param  {String} loc                -  String identifying the language
 */

/**
 * @private
 * @constructor Internal Properties
 * NOTE: The following properties are defined when the ruleset is loaded
 *
 * @property {Object} ruleset_information  - Object containing ruleset information
 *
 * @property {Array}  rule_mappings - Array of RuleMapping objects
 *
 * @property {Number}   evaluation_levels          - Level of WCAG 2.0 Success Criteria to evaluate (i.e. A, AA, AAA)
 * @property {Boolean}  recommended_rules_enabled  - If true recommended rules are evaluated
 */

OpenAjax.a11y.Ruleset = function (ruleset_info, rule_mapping_info, loc) {

  // local references to current NLS information, based on current locale setting

//  OpenAjax.a11y.logger.info("[OpenAjax A11y][Ruleset] Creating Ruleset: " + ruleset_info['ruleset_id']);

  var wcag20_nls = OpenAjax.a11y.nls.WCAG20.getNLS(locale);

  if (typeof loc !== 'string') loc = "en-us";

  var locale = loc;

  var recommended_rules_enabled = true;
  var evaluation_levels         = OpenAjax.a11y.EVALUATION_LEVELS.A_AA;
  var rule_mappings             = [];

  var id          = "";
  var version     = "";
  var updated     = "";

  var author        = "";
  var author_url    = "";

  var title           = "";
  var tooltip         = "";
  var abbrev          = "";
  var description     = "";
  var description_url = "";

  var required_count = 0;
  var recommended_count = 0;

  // Check for ruleset id

  if (ruleset_info['ruleset_id']) {
    id  = ruleset_info['ruleset_id'];
//    OpenAjax.a11y.logger.debug("[Ruleset] id: " + id);
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset]   ** Ruleset missing id");
    return null;
  }

  // Check for ruleset version

  if (ruleset_info['version']) {
    version  = ruleset_info['version'];
//    OpenAjax.a11y.logger.debug("[Ruleset] version: " + version);
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing version");
    return null;
  }

  // Check for ruleset last updated date

  if (ruleset_info['last_updated']) {
    updated  = ruleset_info['last_updated'];
//    OpenAjax.a11y.logger.debug("[Ruleset] date: " + updated);
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing last updated date");
    return null;
  }

  // Check for author

  if (ruleset_info['author']) {
    author = ruleset_info['author'];
//    OpenAjax.a11y.logger.debug("[Ruleset] author: " + author);
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing author");
    return null;
  }

  // Check for author url

  if (ruleset_info['author_url']) {
    author_url = ruleset_info['author_url'];
//    OpenAjax.a11y.logger.debug("[Ruleset] author URL: " + author_url);
  }
  else {
    OpenAjax.a11y.logger.warning("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing author URL");
  }


  // Check for localized ruleset title

  if (ruleset_info.nls && ruleset_info.nls[locale].title) {
    title = ruleset_info.nls[locale].title;
//    OpenAjax.a11y.logger.debug("[Ruleset] title: " + title);
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing title");
    return null;
  }

  // Check for localized ruleset tooltip

  if (ruleset_info.nls[locale].tooltip) {
    tooltip = ruleset_info.nls[locale].tooltip;
//    OpenAjax.a11y.logger.debug("[Ruleset] tooltip: " + tooltip);
  }
  else {
    OpenAjax.a11y.logger.warning("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing tooltip");
  }

  // Check for localized ruleset abbreviation

  if (ruleset_info.nls[locale].abbrev) {
    abbrev = ruleset_info.nls[locale].abbrev;
//    OpenAjax.a11y.logger.debug("[Ruleset] abbrev: " + abbrev);
  }
  else {
    OpenAjax.a11y.logger.warning("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing abbreviation");
  }

  // Check for localized ruleset descriptions

  if (ruleset_info.nls[locale].description) {
    description = ruleset_info.nls[locale].description;
//    OpenAjax.a11y.logger.debug("[Ruleset] description: " + description);
  }
  else {
    OpenAjax.a11y.logger.warning("[OpenAjax A11y][Ruleset]  ** Ruleset " + id + " missing description");
  }

  // Check for localized ruleset description url (optional)

  if (ruleset_info.nls[locale].description_url) {
    description_url = ruleset_info.nls[locale].description_url;
//    OpenAjax.a11y.logger.debug("[Ruleset] description URL: " + description_url);
  }

//  OpenAjax.a11y.logger.debug("[Ruleset] mapping rules");

  if (rule_mapping_info) {

    for (var rule_id in rule_mapping_info) {

//      OpenAjax.a11y.logger.debug("[Ruleset]  rule id: " + rule_id);

      var rule_mapping = rule_mapping_info[rule_id];

//      OpenAjax.a11y.logger.debug("[Ruleset] required: " + rule_mapping.required);
//      OpenAjax.a11y.logger.debug("[Ruleset]  enabled: " + rule_mapping.enabled);

      var rule = OpenAjax.a11y.RuleManager.getRuleByRuleId(rule_id);

//      OpenAjax.a11y.logger.debug("[Ruleset] Rule: " + rule + " Required: " + rule_mapping.required + " " + (typeof rule_mapping.required));

      if (rule && (typeof rule_mapping.required === 'boolean')) {

        if (rule && (typeof rule_mapping.enabled === 'boolean')) {

          var rm = new OpenAjax.a11y.RuleMapping(rule, rule_mapping.required, rule_mapping.enabled);

//          OpenAjax.a11y.logger.debug("[Ruleset]  rule mapping: " + rm);

          rule_mappings.push(rm);

          if (rule_mapping.required) required_count++;
          else recommended_count++;
        }
      }
      else {
        OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset] ** Ruleset rule " + rule_id + " is missing valid 'required' property");
      }
    } // end loop
  }
  else {
    OpenAjax.a11y.logger.error("[OpenAjax A11y][Ruleset] ** Ruleset " + id + " does not have any rules");
  }

//  OpenAjax.a11y.logger.debug("[Ruleset] creating ruleset information: " + typeof OpenAjax.a11y.info.RulesetInfo);

  var ruleset_information = OpenAjax.a11y.info.RulesetInfo(id, version, updated, author, author_url, title, abbrev, tooltip, description, description_url, required_count, recommended_count);

//  OpenAjax.a11y.logger.debug("[Ruleset] ruleset information: " + ruleset_information.title);

  return {

    /**
     * @method getRulesetInfo
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Return ruleset of information
     *
     * @return {RulesetInfo}  RulesetInfo object
     */

    getRuleMappingsArray : function() {
      return rule_mappings;
    },

    /**
     * @method getId
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Return ruleset id
     *
     * @return {String}  see description
     */

    getId : function () {
      return id;
    },

    /**
     * @method getRulesetInfo
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Return ruleset of information
     *
     * @return {RulesetInfo}  RulesetInfo object
     */

    getRulesetInfo : function () {
      return ruleset_information;
    },

    /**
     * @method getEvaluationLevels
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Get WCAG levels to evaluate
     *
     * @return  {Number}  Number represents the levels of success criteria to test
     */

    getEvaluationLevels : function () {
      return evaluation_levels;
    },

    /**
     * @method getEvaluationLevelsNLS
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Get NLS WCAG levels to evaluate
     *
     * @return  {String}  String representing the levels of success criteria evaluated
     */

    getEvaluationLevelsNLS : function () {
      return wcag20_nls.getEvaluationLevelsNLS(evaluation_levels);
    },

    /**
     * @method getRecommendedRulesEnabled
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Get the state of the evaluation of recommeneded rules
     *
     * @return  {Boolean} True if evaluation included recommended rules, False if not to evaluate recommeneded rules
     */

     getRecommendedRulesEnabled : function () {
       return recommended_rules_enabled;
     },

    /**
     * @method getLocale
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Get the language of the ruleset
     *
     * @return  {String} see description
     */

     getLocale : function () {
       return locale;
     },

    /**
     * @method toJSON
     *
     * @memberOf OpenAjax.a11y.Ruleset
     *
     * @desc Creates a JSON representation of the rules in the ruleset
     *
     * @param  {String}  prefix         - A prefix string typically spaces for formatting output
     *
     * @return {String} JSON formatted string representing the ruleset
     */

    toJSON : function (prefix) {

      if (typeof prefix !== 'string' || prefix.length === 0) {
        prefix = "";
      }

      var next_prefix   = prefix + "  ";
      var next_prefix_2 = prefix + "    ";

      var json = "";

      json +=  prefix + "{\n";

      json += ruleset_information.toJSON(next_prefix);

      json += next_prefix + "\"wcag20_level\"        : "  + evaluation_levels + ",\n";
      json += next_prefix + "\"rec_rules_enabled\"   : "  + recommended_rules_enabled + ",\n";

      var rule_mappings_len = rule_mappings.length;
      var last = rule_mappings_len - 1;

      if (rule_mappings_len > 0) {
        json += next_prefix + "\"rule_mappings\" : {\n";

        for (var i = 0; i < rule_mappings_len; i++) {

          var rule_mapping = rule_mappings[i];
          var rule = rule_mapping.rule;

          json += next_prefix_2 + "\"" + rule.getId() + "\" : {\n";
          json += next_prefix_2 + "  \"enabled\"    : "  + rule_mapping.enabled + ",\n";
          json += next_prefix_2 + "  \"required\"   : "  + rule_mapping.required + "\n";

          if (i === last) json += next_prefix + "}\n";
          else json += next_prefix + "},\n";
        }  // end loop

       json += next_prefix + "  }\n";

      }
      else {
        json += next_prefix + "  \"rule_mappings\" : {}\n";
      }

      json += prefix + "}\n";

      return json;

    }
  };
};



/* ---------------------------------------------------------------- */
/*                       RuleMapping                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleMapping
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  Contains information about a rule in a ruleset
 *
 * @param  {Object}   rule      - id of the rule
 * @param  {Boolean}  required  - Boolean indicating if the rule is required or
 *                                recommended
 * @param  {Boolean}  required  - Boolean indicating if the rule is enabled or disabled
 *
 * @property  {Object}   rule      - rule object
 * @property  {Boolean}  required  - Boolean indicating if the rule is required or
 *                                   recommended
 * @property  {Boolean}  required  - Boolean indicating if the rule is enabled or disabled
 */


OpenAjax.a11y.RuleMapping = function (rule, required, enabled) {
   this.rule         = rule;
   this.required     = required;
   this.enabled      = enabled;
};



/* ---------------------------------------------------------------- */
/*                       RulesetManager                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor RulesetManager
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Information on the rulesets available for evauating documents
 *
 * @property  {Array}   rulesets - Associative array of rulesets
 */

OpenAjax.a11y.RulesetManager = function() {

  var rulesets = [];

  return {
    /**
     * @method addRuleset
     *
     * @memberOf OpenAjax.a11y.RulesetManager
     *
     * @desc Adds a localized version of WCAG 2.0 requirements to the cache
     *
     * @param  {Object}  rulesetdata - JSON object containing the ruleset information
     */

    addRuleset : function(ruleset) {
      rulesets.push(ruleset);
    },

    /**
    * @method getRuleset
    *
    * @memberOf OpenAjax.a11y.RulesetManager
    *
    * @desc Gets a ruleset with the specified ID
    *
    * @param  {string}  ruleset_id  - Ruleset id of the ruleset to return
    */

    getRuleset : function(ruleset_id) {

      for (var i = 0; i < rulesets.length; i++ ) {
        if (rulesets[i].getId() === ruleset_id) return rulesets[i];
      }

      // if ruleset_id is not defined, return the first ruleset, if it is defined
      if (rulesets[0]) return rulesets[0];

      return null;
    },

    /**
    * @method getAllRulesets
    *
    * @memberOf OpenAjax.a11y.RulesetManager
    *
    * @desc Gets ruleset information and id, returned as a list of objects
    *
    * @return  {Array}  List of objects with two properties:<br/>
    *                     rulesetId (String)
    *                     rulesetInfo (RulesetInfo object)
    */

    getAllRulesets : function() {

       var rs_info = [];

       for (var i = 0; i < rulesets.length; i++) {

          var rs = rulesets[i];

          rs_info.push({ rulesetId: rs.getId(), rulesetInfo: rs.getRulesetInfo() });

       }

      return rs_info;
    },

    /**
     * @method toJSON
     *
     * @memberOf OpenAjax.a11y.RulesetManager
     *
     * @desc Creates a JSON representation of the rules in the ruleset
     *
     * @return {String} JSON formatted string representing the ruleset
     */

    toJSON : function () {

      var json = "[\n";

      for(var i = 0, j = 1; i < rulesets.length; i++, j++) {
        json += rulesets[i].toJSON("  ");
        if (j < rulesets.length) json += ",\n";
        else json += "\n";
      }

      json += "]\n";

      return json;
    }

  };

}();

