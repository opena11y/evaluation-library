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
var wcag20_nls = wcag20_nls || {};

/* ---------------------------------------------------------------- */
/*                       WCAG20                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAG 2.0 information with properties with localized NLS values
 *
 * @property  {Array}   nls - Associative array of WCAG 2.0 information
 */

OpenAjax.a11y.nls.WCAG20 = function() {

  var wcag10_nls = {};

  return {
    /**
     * @method addNLS
     *
     * @memberOf OpenAjax.a11y.nls.WCAG20
     *
     * @desc Adds a localized version of WCAG 2.0 requirements to the cache
     *
     * @param  {string}  locale  - Language code of WCAG 2.0
     * @param  {Object}  nls     - Localized WCAG 2.0 object
     */

    addNLS : function (locale, nls) {

      OpenAjax.a11y.logger.info("[WCAG20 NLS] Adding WCAG 2.0 NLS for locale: " + locale);

      var  p,  p_id,  np;  /* WCAG 2.0 Principle */
      var  g,  g_id,  ng;  /* WCAG 2.0 Guideline */
      var sc, sc_id, nsc;  /* WCAG 2.0 Success Criterion */

      // Validate the WCAG 2.0 NLS properties
      if (!nls.abbreviation) OpenAjax.a11y.logger.error("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
      if (!nls.title)  OpenAjax.a11y.logger.error("Missing title property for WCAG 2.0 with locale: "              + locale);
      if (!nls.url)    OpenAjax.a11y.logger.error("Missing url property for WCAG 2.0 with locale: "                + locale);
      if (!nls.levels) OpenAjax.a11y.logger.error("Missing levels property for WCAG 2.0 with locale: "             + locale);
      if (!nls.evaluation_levels) OpenAjax.a11y.logger.error("Missing evaluation_levels property for locale: "     + locale);
      if (!nls.all_guidelines) OpenAjax.a11y.logger.error("Missing all guideline property for locale: "     + locale);

      var wcag20 = new OpenAjax.a11y.nls.WCAG20NLS(locale, nls.abbreviation, nls.title, nls.url, nls.levels, nls.evaluation_levels, nls.all_guidelines);

     //  OpenAjax.a11y.logger.debug("WCAG 2.0 " + nls.title + " for " + locale);

      if (!nls.principles) {

        OpenAjax.a11y.logger.debug("[WCAG20 NLS] Missing principles object or not at an object for WCAG 2.0 with locale: " + locale);
        return;

      } else {

        for (p_id in nls.principles) {

          p = nls.principles[p_id];

          //  OpenAjax.a11y.logger.debug("Principle " + p.title + " " + p.id);

          np = new OpenAjax.a11y.nls.WCAG20NLSPrinciple(p_id, p);

          for (g_id in p.guidelines) {

            g = p.guidelines[g_id];

            // OpenAjax.a11y.logger.debug("  Guideline " + g.title + " " + g.id);

            ng = new OpenAjax.a11y.nls.WCAG20NLSGuideline(np, g_id, g);

            for (sc_id in g.success_criteria) {

              sc = g.success_criteria[sc_id];

              nsc = new OpenAjax.a11y.nls.WCAG20NLSSuccessCriterion(np, ng, sc_id, sc);

              //  OpenAjax.a11y.logger.debug("    Success Criteria " + nsc.sc_id + " (" + sc_id + "): " + sc.title);

              ng.success_criteria.push(nsc);

            } // end loop

            np.guidelines.push(ng);

          } // end loop

          wcag20.principles.push(np);

        } // end loop
      }

      wcag10_nls[locale] = wcag20;

    },

    /**
     * @method getNLS
     *
     * @memberOf OpenAjax.a11y.nls.WCAG20
     *
     * @desc Returns an object with a localized version of WCAG 2.0 requirements
     *
     * @param  {String}  locale  - Country code for the language
     */

    getNLS : function(locale) {

      if ((typeof locale === 'string') && (locale.length > 0)) {
        return wcag10_nls[locale];
      }
      return wcag10_nls['en-us'];

    }
  };
}();


/* ---------------------------------------------------------------- */
/*                       WCAG20NLS                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLS
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAG 2.0 information with properties with localized NLS values
 *
 * @param  {String}  locale - Language code
 * @param  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @param  {String}  title  - Localized title of WCAG 2.0 guidelines
 * @param  {String}  url    - URL to the translation of WCAG 2.0
 * @param  {Object}  levels - WCAG 2.0 levels for success criteria
 *
 * @property  {String}  locale - Language code
 * @property  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @property  {String}  title  - Localized title of WCAG 2.0 guidelines
 * @property  {String}  url    - URL to the translation of WCAG 2.0
 * @property  {Object}  levels - WCAG 2.0 levels for success criteria
 *
 * @property  {Array}   principles - Array of WCAG 2.0 principle objects associated with the principle
 */

OpenAjax.a11y.nls.WCAG20NLS = function(locale, abbrev, title, url, levels, evaluation_levels, all_gl) {

  this.locale = locale;
  this.abbrev = abbrev;
  this.title  = title;
  this.url    = url;
  this.levels = levels;
  this.evaluation_levels = evaluation_levels;
  this.all_guidelines = all_gl;

  this.principles = [];

};


/**
 * @method getNLSItemById
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLS
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements
 *
 * @param {String}  id  -  id for the wcag item to get NLS information
 *
 * @return {WCAG20Info}  return WCAG 2.0 information object
 */

OpenAjax.a11y.nls.WCAG20NLS.prototype.getNLSItemById = function(id) {

  if (id === OpenAjax.a11y.WCAG20_GUIDELINE.ALL) return this.all_guidelines;

  for (var i = 0; i < this.principles.length; i++) {

     var p = this.principles[i];

//     OpenAjax.a11y.logger.debug("P Compare: " + p.principle_id + " " + id );

     if ((p.id === id) || (p.principle_id === id)) return p;

     for (var j = 0; j < p.guidelines.length; j++) {

       var g = p.guidelines[j];

//       OpenAjax.a11y.logger.debug("  G Compare: " + g.id + " " + id + " " + (g.id === id));

       if ((g.id === id) || (g.guideline_id === id)) return g;

       for (var k = 0; k < g.success_criteria.length; k++ ) {

         var sc = g.success_criteria[k];

//         OpenAjax.a11y.logger.debug("  SC Compare: " + sc.success_criteria_id + " " + id );

         if ((sc.id === id) || (sc.sc_id === id)) return sc;

       } // end loop

     } // end loop

  } // end loop

  return null;
};


/**
 * @method getSuccessCriteriaLevel
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLS
 *
 * @desc Returns the success criteria
 *
 * @param {String}  sc_id  -  String representing the success criteria id
 *
 * @return {Number}  Number representing the WCAG 2.0 success level
 */

OpenAjax.a11y.nls.WCAG20NLS.prototype.getSuccessCriteriaLevel = function (sc_id) {

  var principles = this.principles;

  for (var i = 0; i < principles.length; i++) {

    var p = wcag20_nls.principles[i];

    for (var j = 0; j < p.guidelines.length; j++) {

      var g = p.guidelines[i];

      for (var k = 0; k < g.success_criteria.length; k++) {

        var sc = g.success_criteria[i];

        if ((sc.id === sc_id) || (sc.sc_id === sc_id)) return sc.level;

      }
    }
  }

  return OpenAjax.a11y.WCAG20_LEVEL.UNKNOWN;

};



/**
 * @method getWCAG20LevelNLS
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLS
 *
 * @desc Returns an NLS localized version of WCAG 2.0 success criterion level
 *
 * @param {String}  see descriptions
 */

OpenAjax.a11y.nls.WCAG20NLS.prototype.getWCAG20LevelNLS = function (level) {

  var level_nls = this.levels[level];

  OpenAjax.a11y.logger.debug("[WCAG20NLS]  level NLS: " + level_nls + " (" + level + ") ");

  if (typeof this.levels[level] !== 'string') return "Undefined";

  return this.levels[level];

};


/**
 * @method getEvaluationLevelsNLS
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLS
 *
 * @desc Returns an NLS localized version of WCAG 2.0 success criterion levels
 *
 * @param {Number}  levels  -  Numerical constant defined in OAA cache representing the evaluation levels
 *
 * @return {String} String representing the evaluation levels (i.e A, A and AA, A, AA and AAA)
 */

OpenAjax.a11y.nls.WCAG20NLS.prototype.getEvaluationLevelsNLS = function (levels) {

  return this.evaluation_levels[levels];

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLS
 *
 * @desc Returns an nls JSON representation of wcag 2.0 information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.WCAG20NLS.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "  ";

  var json = "";

  json += "{";

  for (var i = 0; i < this.principles.length; i++) json += this.principles[i].toJSON(next_prefix);

  json += prefix + "}";

  return json;
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSPrinciple                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSPrinciple
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAg 2.0 Principle information with properties with localized NLS values
 *
 * @param  {Object}  principle_id  - Principle id
 * @param  {Object}  info          - Principle information
 *
 * @property  {String}  principle_id  - Principle id
 * @property  {String}  title         - Title of the principle
 * @property  {String}  description   - Description of principle
 * @property  {String}  url_spec      - URL to information on the requirement
 *
 * @property  {Array}   guidelines - Array of WCAG 2.0 guideline objects associated with the principle
 */

OpenAjax.a11y.nls.WCAG20NLSPrinciple = function(principle_id, info) {

  this.principle_id = principle_id;    // Text string
  this.id           = info.id;         // Number
  this.title        = info.title;
  this.description  = info.description;
  this.url_spec     = info.url_spec;

  this.guidelines = [];

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLSPrinciple
 *
 * @desc Returns an nls JSON representation of wcag 2.0 principle information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.WCAG20NLSPrinciple.prototype.toJSON = function(prefix) {

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";

  var json = "";

  json += prefix + "\"" + this.principle_id + "\" : {";

  json += prefix + "  \"id\"             : " + this.id + ",";
  json += prefix + "  \"type\"           : \"p\",";
  json += prefix + "  \"title\"          : " + JSON.stringify(this.title) + ",";
  json += prefix + "  \"description\"    : " + JSON.stringify(this.description) + ",";
  json += prefix + "  \"url\"            : " + JSON.stringify(this.url_spec) + "";

  json += prefix + "},";

  for (var i = 0; i < this.guidelines.length; i++) json += this.guidelines[i].toJSON(prefix);

  return json;
};


/* ---------------------------------------------------------------- */
/*                       WCAG20NLSGuideline                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSGuideline
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc WCAg 2.0 Guideline information with properties with localized NLS values
 *
 * @param  {WCAG20NLSPrinciple}  principle     - Principle object reference
 * @param  {String}              guideline_id  - Guideline ID
 * @param  {Object}              info          - Guideline information object
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference
 *
 * @property  {String}  guideline_id  - Guideline id
 * @property  {String}  title         - Title of the guideline
 * @property  {String}  description   - Description of the guideline
 * @property  {String}  url_spec      - URL to information on the guideline requirement
 *
 * @property  {Array}   success_criteria  - Array of WCAG 2.0 success criteria objects associated with the principle
 */

OpenAjax.a11y.nls.WCAG20NLSGuideline = function(principle, guideline_id, info) {

  this.principle     = principle;

  this.guideline_id  = guideline_id;
  this.id            = info.id;         // Number

  this.title         = info.title;
  this.description   = info.description;
  this.url_spec      = info.url_spec;

  this.success_criteria = [];

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLSGuideline
 *
 * @desc Returns an nls JSON representation of wcag 2.0 guideline information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.WCAG20NLSGuideline.prototype.toJSON = function(prefix) {

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";

  var json = "";

  json += prefix + "\"" + this.guideline_id + "\" : {";

  json += prefix + "  \"id\"             : " + this.id + ",";
  json += prefix + "  \"type\"           : \"g\",";
  json += prefix + "  \"title\"          : " + JSON.stringify(this.title) + ",";
  json += prefix + "  \"description\"    : " + JSON.stringify(this.description) + ",";
  json += prefix + "  \"url\"            : " + JSON.stringify(this.url_spec);

  json += prefix + "},";

  for (var i = 0; i < this.success_criteria.length; i++) json += this.success_criteria[i].toJSON(prefix);

  return json;
};



/* ---------------------------------------------------------------- */
/*                       WCAG20NLSSuccessCriterion                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSSuccessCriterion
 *
 * @memberOf OpenAjax.a11y.nls
 *
 * @desc  WCAG 2.0 Success Criteria information with properties with localized NLS values
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference
 * @param  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 * @param  {String}              sc_id      - Success criterion ID
 * @param  {Object}              info       - Success criterion information object
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference
 * @property  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @property  {String}  sc_id          - Success criterion ID
 * @property  {String}  title          - Title of the success criterion
 * @property  {String}  level          - Level of importance of a success criterion
 * @property  {String}  url_spec       - URL to information on the success criteria requirement
 * @property  {String}  url_meet       - URL to information on how to meet the success criteria requirements
 * @property  {String}  url_understand - URL to information on how to understand the success criteria requirements
 * @property  {Array}   resources      - Other information related to the success criterion
 */

OpenAjax.a11y.nls.WCAG20NLSSuccessCriterion = function(principle, guideline, sc_id, info) {

  this.principle  = principle;
  this.guideline  = guideline;

  this.sc_id        = sc_id;      // String
  this.id           = info.id;    // Number

  this.level          = info.level;
  this.title          = info.title;
  this.description    = info.description;
  this.url_spec       = info.url_spec;
  this.url_meet       = info.url_meet;
  this.url_understand = info.url_understand;

  this.resources = [];

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.nls.WCAG20NLSSuccessCriterion
 *
 * @desc Returns an nls JSON representation of wcag 2.0 success criterion information
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.nls.WCAG20NLSSuccessCriterion.prototype.toJSON = function(prefix) {

  function getNLSLevel(level) {

    if (level === OpenAjax.a11y.WCAG20_LEVEL.A) return "A";
    if (level === OpenAjax.a11y.WCAG20_LEVEL.AA) return "AA";
    if (level === OpenAjax.a11y.WCAG20_LEVEL.AAA) return "AAA";

    return "unknown";
  }

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";

  var json = "";

  json += prefix + "\"" + this.sc_id + "\" : {";

  json += prefix + "  \"id\"             : " + this.id + ",";
  json += prefix + "  \"type\"           : \"sc\",";
  json += prefix + "  \"level\"          : \"" + getNLSLevel(this.level) + "\",";
  json += prefix + "  \"title\"          : " + JSON.stringify(this.title) + ",";
  json += prefix + "  \"description\"    : " + JSON.stringify(this.description) + ",";
  json += prefix + "  \"url\"            : \"" + this.url_spec + "\",";
  json += prefix + "  \"url_meet\"       : \"" + this.url_meet + "\",";
  json += prefix + "  \"url_understand\" : \"" + this.url_understand + "\"";

  if (this.sc_id === '4.1.2') json += prefix + "}";
  else json += prefix + "},";

  return json;
};

