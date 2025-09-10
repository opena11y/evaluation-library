/* evaluationResult.js */

/* Imports */
import DebugLogging  from './debug.js';

import {
  VERSION,
  RULESET
} from './constants.js';

import {
  getFormattedDate,
  cleanForUTF8
} from './utils.js';

import HeadingResults         from './results/headingResults.js';
import LandmarkRegionResults  from './results/landmarkRegionResults.js';
import LinkResults            from './results/linkResults.js';
import RuleResultsSummary     from './results/ruleResultsSummary.js';
import RuleResultsGroup       from './results/ruleResultsGroup.js';

import DOMCache        from './cache/domCache.js';
import RuleGroupResult from './ruleGroupResult.js';
import RuleResult      from './ruleResult.js';
import {allRules}      from './rules/allRules.js';

import {
  getCommonMessage,
  getGuidelineInfo,
  getRuleCategoryInfo,
  getRuleScopeInfo,
  getRulesetLabel,
  getBaseResultMessages,
  getInformationLinks,
  getManualChecks,
  getPurposes,
  getRuleId,
  getRuleDefinition,
  getRuleResultMessages,
  getRuleSummary,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTargetResourcesDesc,
  getTechniques,
  getScope,
  getWCAGVersion
} from './locale/locale.js';

import {
  RULE_CATEGORIES,
  WCAG_GUIDELINE
} from './constants.js';

/* Constants */
const debug = new DebugLogging('EvaluationResult', false)
debug.flag = false;

/* helper functions */

function validateRuleset(ruleset) {
  if (typeof ruleset === 'string') {
    ruleset = ruleset.toUpperCase();
    if (['WCAG20', 'WCAG21', 'WCAG22'].includes(ruleset)) {
      return ruleset;
    }
  }
  return 'WCAG21';
}

function validateLevel(level) {
  if (typeof level === 'string') {
    level = level.toUpperCase();
    if (['A', 'AA', 'AAA'].includes(level)) {
      return level;
    }
  }
  return 'AA';
}

function validateScopeFilter(scopeFilter) {
  if (typeof scopeFilter === 'string') {
    scopeFilter = scopeFilter.toUpperCase();
    if (['ALL', 'PAGE', 'WEBSITE'].includes(scopeFilter)) {
      return scopeFilter;
    }
  }
  return 'ALL';
}

function validateAriaVersion(ariaVersion) {
  if (typeof ariaVersion === 'string') {
    ariaVersion = ariaVersion.toUpperCase();
    if (['ARIA12', 'ARIA13'].includes(ariaVersion)) {
      return ariaVersion;
    }
  }
  return 'ARIA12';
}
function isWCAG(ruleset, level, rule) {

  switch (ruleset.toUpperCase()) {
    case 'WCAG20':
      if (!rule.isWCAG20) {
        return false;
      }
      break;

    case 'WCAG21':
      if (!rule.isWCAG21) {
        return false;
      }
      break;

    case 'WCAG22':
      if (!rule.isWCAG22) {
        return false;
      }
      break;

    default:
      return false;


  }

  switch (level.toUpperCase()) {
    case 'A':
      if (!rule.isLevelA) {
        return false;
      }
      break;

    case 'AA':
      if (!rule.isLevelA && !rule.isLevelAA) {
        return false;
      }
      break;

    case 'AAA':
      return true;

    default:
      return false;
  }

  return true;

}

/**
 * @class EvaluateResult
 *
 * @desc Creates an evaluation result object
 *
 * @param  {Object} startingDoc  - A reference to a DOM element to start the evaluation
 *                                 (typically body element)
 * @param  {String} title        - A title of the evaluation
 *                                 (typically the title of the document)
 * @param  {String} url          - The URL to the document
 *
 * @return see @desc
 */

export default class EvaluationResult {
  constructor (startingDoc, title, url) {

    this.startingDoc = startingDoc
    this.title       = title;
    this.url         = url;
    this.ruleset     = '';
    this.level       = '';
    this.scopeFilter = '';
    this.ariaVersion = '1.2';

    this.date           = getFormattedDate();
    this.version        = VERSION;
    this.allDomElements = [];
    this.allRuleResults = [];

    this._headings           = new HeadingResults();
    this._landmarkRegions    = new LandmarkRegionResults();
    this._links              = new LinkResults();
    this._ruleResultsSummary = new RuleResultsSummary();
    this._rcRuleResultsGroup = new RuleResultsGroup(RULE_CATEGORIES);
    this._glRuleResultsGroup = new RuleResultsGroup(WCAG_GUIDELINE);

    debug.flag && debug.log(`[title]: ${this.title}`);
    debug.flag && debug.log(`[  url]: ${this.url}`);

  }

  get headings () {
    return this._headings;
  }

  get landmarkRegions () {
    return this._landmarkRegions;
  }

  get links () {
    return this._links;
  }

  get ruleResultSummary () {
    return this._ruleResultsSummary;
  }

  get rcRuleGroupResults () {
    return this._rcRuleResultsGroup;
  }

  get glRuleGroupResults () {
    return this._glRuleResultsGroup;
  }

  /**
   * @method getTitle
   *
   * @desc Get the title of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getTitle () {
    return this.title;
  }

  /**
   * @method getURL
   *
   * @desc Get the url of the evaluated document
   *
   * @return {String}  String representing the title
   */

  getURL () {
    return this.url;
  }

  /**
   * @method getDate
   *
   * @desc Get the date the document
   *
   * @return {String}  String representing the title
   */

  getDate () {
    return this.date;
  }

  /**
   * @method getRulesetLabel
   *
   * @desc Get the Ruleset information
   *
   * @return {String}  String representing the ruleset and levels
   */

  getRulesetLabel () {
    return getRulesetLabel(this.ruleset, this.level, this.ariaVersion);;
  }

  /**
   * @method runWCAGRules
   *
   * @desc Updates rule results array with results from a WCAG features
   *
   * @param  {String}  ruleset     - Set of rules to evaluate (values: 'WCAG20', 'WCAG21', 'WCAG22')
   * @param  {String}  level       - WCAG Level (values: 'A', 'AA', 'AAA')
   * @param  {String}  scopeFilter - Filter rules by scope (values: "ALL" | "PAGE" | "WEBSITE")
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 (values: 'ARIA12' | ARIA13")
   * @param  {Boolean} addDataId   - If true, create a data-opena11y-id attribute
   *                                 on element nodes for use in navigation and
   *                                 highlighting
   */

  runWCAGRules (ruleset='WCAG21',
                level='AA',
                scopeFilter='ALL',
                ariaVersion='ARIA12',
                addDataId=false) {

    const startTime = new Date();

    this.ruleset     = validateRuleset(ruleset);
    this.level       = validateLevel(level);
    this.scopeFilter = validateScopeFilter(scopeFilter);
    this.ariaVersion = validateAriaVersion(ariaVersion);
    addDataId = typeof addDataId === 'boolean' ? addDataId : false;

    debug.flag && debug.log(`[evaluateWCAG][    ruleset]: ${this.ruleset}`);
    debug.flag && debug.log(`[evaluateWCAG][      level]: ${this.level}`);
    debug.flag && debug.log(`[evaluateWCAG][scopeFilter]: ${this.scopeFilter}`);
    debug.flag && debug.log(`[evaluateWCAG][ariaVersion]: ${this.ariaVersion}`);
    debug.flag && debug.log(`[evaluateWCAG][  addDataId]: ${addDataId}`);

    const domCache      = new DOMCache(this.startingDoc, this.startingDoc.body, this.ariaVersion, addDataId);
    this.allDomElements = domCache.allDomElements;
    this.allRuleResults = [];
    this._ruleResultsSummary.clear();
    this._rcRuleResultsGroup.clear();
    this._glRuleResultsGroup.clear();

    allRules.forEach (rule => {

      if (isWCAG(this.ruleset, this.level, rule)) {
        if ((this.scopeFilter === 'ALL') ||
            ((this.scopeFilter === 'PAGE')    && rule.isScopePage) ||
            ((this.scopeFilter === 'WEBSITE') && rule.isScopeWebsite)) {
          const ruleResult = new RuleResult(rule);

          ruleResult.validate(domCache);
          this.allRuleResults.push(ruleResult);
          this._ruleResultsSummary.update(ruleResult);
          this._rcRuleResultsGroup.update(rule.rule_category_id, ruleResult);
          this._glRuleResultsGroup.update(rule.wcag_guideline_id, ruleResult);
        }
      }
    });

    this._headings.update(domCache);
    this._landmarkRegions.update(domCache);
    this._links.update(domCache, this.url);

    const endTime = new Date();
    debug.flag && debug.log(`[evaluateWCAG][Run Time]: ${endTime.getTime() - startTime.getTime()} msecs`);

  }

  /**
   * @method runRuleListRules
   *
   * @desc Updates rule results array with results from a specific set of rules
   *
   * @param  {Array}   ruleList  - Array of rule IDs to include in the evaluation
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 (values: 'ARIA12' | ARIA13")
   * @param  {Boolean} addDataId   - If true, create a data-opena11y-oridinal-position attribute
   *                                 on element nodes for use in navigation and highlighting
   */

  runRuleListRules (ruleList,
                    ariaVersion='ARIA12',
                    addDataId=false) {
    const startTime = new Date();
    debug.flag && debug.log(`[evaluateRuleList][ruleList]: ${ruleList}`);

    this.ruleset     = 'RULELIST';
    this.ariaVersion = ariaVersion;

    const domCache      = new DOMCache(this.startingDoc, this.startingDoc.body, ariaVersion, addDataId);
    this.allDomElements = domCache.allDomElements;
    this.allRuleResults = [];
    this._ruleResultsSummary.clear();
    this._rcRuleResultsGroup.clear();
    this._glRuleResultsGroup.clear();

    allRules.forEach (rule => {

      if (ruleList.includes(rule.getId())) {
        const ruleResult = new RuleResult(rule);
        ruleResult.validate(domCache);
        this.allRuleResults.push(ruleResult);
        this._ruleResultsSummary.update(ruleResult);
        this._rcRuleResultsGroup.update(rule.rule_category_id, ruleResult);
        this._glRuleResultsGroup.update(rule.wcag_guideline_id, ruleResult);
      }
    });

    this._headings.update(domCache.structureInfo);
    this._landmarkRegions.update(domCache.structureInfo);
    this._links.update(domCache.linkInfo, this.url);

    const endTime = new Date();
    debug.flag && debug.log(`[evaluateWCAG][Run Time]: ${endTime.getTime() - startTime.getTime()} msecs`);

  }

 /**
   * @method runFirstStepRules
   *
   * @desc Updates rule results array with results first step rules
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 (values: 'ARIA12' | ARIA13")
   * @param  {Boolean} addDataId   - If true, create a data-opena11y-oridinal-position attribute
   *                                 on element nodes for use in navigation and highlighting
   */

  runFirstStepRules (ariaVersion='ARIA12',
                     addDataId=false) {
    const startTime = new Date();

    this.ruleset     = 'FIRSTSTEP';
    this.ariaVersion = ariaVersion;

    const domCache      = new DOMCache(this.startingDoc, this.startingDoc.body, ariaVersion, addDataId);
    this.allDomElements = domCache.allDomElements;
    this.allRuleResults = [];
    this._ruleResultsSummary.clear();
    this._rcRuleResultsGroup.clear();
    this._glRuleResultsGroup.clear();

    allRules.forEach (rule => {

      if (rule.isFirstStep) {
        const ruleResult = new RuleResult(rule);
        ruleResult.validate(domCache);
        this.allRuleResults.push(ruleResult);
        this._ruleResultsSummary.update(ruleResult);
        this._rcRuleResultsGroup.update(rule.rule_category_id, ruleResult);
        this._glRuleResultsGroup.update(rule.wcag_guideline_id, ruleResult);
      }
    });

    this._headings.update(domCache.structureInfo);
    this._landmarkRegions.update(domCache.structureInfo);
    this._links.update(domCache.linkInfo, this.url);

    const endTime = new Date();
    debug.flag && debug.log(`[evaluateWCAG][Run Time]: ${endTime.getTime() - startTime.getTime()} msecs`);

  }

  /**
   * @method getRuleResult
   *
   * @desc Gets rule result object with the associated id
   *
   * @param {String}  rule_id  - id of the rule associated with the rule result
   *
   * @return {RuleResult} Returns the ResultResult object
   */
  getRuleResult (rule_id) {
    return this.allRuleResults.find( rr => rr.rule.rule_id === rule_id);
  }

  /**
   * @method getRuleResultWithSummary
   *
   * @desc Gets rule result object with the associated id and
   *
   * @param {String}  rule_id  - id of the rule associated with the rule result
   *
   * @return array [String, {RuleResultSummary}, {array}, {array}]  see description
   */
  getRuleResultWithSummary (rule_id) {
    debug.log(`[getRuleResultWithSummary][rule_id]: ${rule_id}`);
    const rule_result = this.allRuleResults.find( rr => rr.rule.rule_id === rule_id);

    const ruleTitle       = rule_result.rule.getSummary();

    const s = rule_result.getResultsSummary()
    const element_summary = {
            violations:    s.violations,
            warnings:      s.warnings,
            manual_checks: s.manual_checks,
            passed:        s.passed,
            hidden:        s.hidden
          };

    const page_result    = false;
    const website_result = false;

    const element_results = [];

    rule_result.getAllResultsArray().forEach( (er) => {
      if (er.isElementResult) {
        const de = er.domElement;
        const element_result = {
          id:                     er.getResultId(),
          element:                er.getResultIdentifier(),
          result_value:           er.getResultValue(),
          result_abbrev:          er.getResultValueNLS(),
          result_long:            er.getResultValueLongNLS(),
          position:               er.getOrdinalPosition(),
          action:                 er.getResultMessage(),
          definition:             getRuleDefinition(rule_id),
          implied_role:           !de.hasRole,
          role:                   de.role,
          role_description:       de.roleDescription,
          tag_name:               de.elemName.includes('#') ?
                                  de.elemName.split('#')[0] :
                                  de.elemName,

          accessible_name_required:   de.ariaInfo.isNameRequired,
          accessible_name_prohibited: de.ariaInfo.isNameProhibited,

          accessible_name:            de.accName,
          accessible_description:     de.accDescription,
          error_message:              de.errMessage,

          html_attributes:            de.html_attrs,
          aria_attributes:            de.aria_attrs
        }

        // For color contrast rules add color contrast information
        if ((rule_id === 'COLOR_1') || (rule_id === 'COLOR_3')) {
          const cc = de.colorContrast;
          const cc_result = element_result.color_contrast = {};

          cc_result.has_text_nodes         = cc.hasTextNodes;
          cc_result.opacity                = cc.opacity;
          cc_result.background_color_elem  = cc.backgroundColorElem;
          cc_result.background_color       = cc.backgroundColorHex;
          cc_result.color                  = cc.color;
          cc_result.colorHex               = cc.colorHex;

          cc_result.has_background_image   = cc.hasBackgroundImage;
          cc_result.background_image       = cc.backgroundImage;
          cc_result.background_repeat      = cc.backgroundRepeat;
          cc_result.background_position    = cc.backgroundPosition;

          cc_result.font_family            = cc.fontFamily;
          cc_result.font_size              = cc.fontSize;
          cc_result.font_weight            = cc.fontWeight;
          cc_result.is_large_font          = cc.is_large_font;

          cc_result.ccr                    = cc.colorContrastRatio;

          cc_result.is_positioned          = cc.isPositioned;
          cc_result.is_transparent         = cc.isTransparent;
        }

        // For table cell header rule add table cell information
        if (rule_id === 'TABLE_1') {
          const tc = de.tableCell;
          const tc_result = element_result.table_cell = {};

          tc_result.is_header       = tc.isHeader;

          tc_result.start_row       = tc.startRow;
          tc_result.start_column    = tc.startColumn;
          tc_result.end_row         = tc.endRow;
          tc_result.end_column      = tc.endColumn;

          tc_result.headers         = tc.headers;
          tc_result.headers_source  = tc.headersSource;

          tc_result.has_content     = tc.hasContent;
        }

        // For table rules related to purpose, naming and size information
        if ((rule_id.indexOf('TABLE') === 0) && (rule_id !== 'TABLE_1')){
          const te = de.tableElement;
          const te_result = element_result.table = {};
          te_result.table_type         = te.tableType;

          te_result.rows               = te.rowCount;
          te_result.columns            = te.colCount;
          te_result.spanned_data_cells = te.spannedDataCells;

          te_result.cell_count         = te.cellCoount;
          te_result.header_cell_count  = te.headerCellCoount;
        }

        element_results.push(element_result);
      }

      if (er.isPageResult) {
        page_result = {
          id:            er.getResultId(),
          element:       er.getResultIdentifier(),
          result_value:  er.getResultValue(),
          result_abbrev: er.getResultValueNLS(),
          result_long:   er.getResultValueLongNLS(),
          action:        er.getResultMessage(),
          definition:    getRuleDefinition(rule_id),
          position:      '',
        }
      }

      if (er.isWebsiteResult) {
        website_result = {
          id:            er.getResultId(),
          element:       er.getResultIdentifier(),
          result_value:  er.getResultValue(),
          result_abbrev: er.getResultValueNLS(),
          result_long:   er.getResultValueLongNLS(),
          action:        er.getResultMessage(),
          definition:    getRuleDefinition(rule_id),
          position:      '',
        }
      }

    });

    const info_elements   = [];

    return [ruleTitle, element_summary, website_result, page_result, element_results];

  }



  /**
   * @method getDomElementById
   *
   * @desc Returns an DomElement object with the associated id, otherwise
   *       null if the DomElement does not exist
   *
   * @param  {Stirng}  id  -  ID of the element in the DOM
   *
   * @return {DomElement}  see @desc
   */

  getDomElementById (id) {
    for (let i = 0; i < this.allDomElements.length; i += 1) {
      if (this.allDomElements[i].id === id) {
        return this.allDomElements[i];
      }
    }
    return null;
  }

  /**
   * @method getRuleResultsAll
   *
   * @desc Returns an object containing a set of all rule results
   *
   * @param  {Integer}  ruleset - Numerical constant that specifies the ruleset
   *                             By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsAll (ruleset=RULESET.ALL) {
    const rgr = new RuleGroupResult(this, getCommonMessage('allRuleResults'), "", "", ruleset);
    this.allRuleResults.forEach( rr => {
      rgr.addRuleResult(rr);
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByGuideline
   *
   * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
   *
   * @param {Integer}  guidelineId  - Number representing the guideline id
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   * 
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByGuideline (guidelineId, ruleset=RULESET.ALL) {
    const glInfo = getGuidelineInfo(guidelineId);
    const rgr = new RuleGroupResult(this, glInfo.title, glInfo.url, glInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getGuideline() & guidelineId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  /**
   * @method getRuleResultsByGuidelineWithSummary
   *
   * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
   *       and a summary of rule results
   *
   * @param {Integer}  guidelineId  - Number representing the guideline id
   *
   * @return array [String, {RuleResultsSummary}, {array}, {array}]  see description
   */

  getRuleResultsByGuidelineWithSummary (guidelineId) {
    const glInfo  = getGuidelineInfo(guidelineId);
    const glTitle = glInfo.title;

    const summary = new RuleResultsSummary();
    const rule_results = [];
    const info_rules = [];

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getGuideline() & guidelineId) {
        const result = this.getRuleResultInfo (rr);
        rule_results.push(result);

        const info = this.getRuleInfo(rr);
        info_rules.push(info);

        summary.update(rr);
      }
    });
    return [glTitle, summary, rule_results, info_rules];
  }
  /**
   * @method getRuleResultsByCategory
   *
   * @desc Returns an object containing the rule results for the rules in a rule category
   *
   * @param {Integer}  categoryId  -  Number of the rule category
   * @param {Integer}  ruleset      - Numerical constant that specifies the ruleset
   *                                  By default all rules are included
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByCategory (categoryId, ruleset=RULESET.ALL) {
    const rcInfo = getRuleCategoryInfo(categoryId);
    const rgr = new RuleGroupResult(this, rcInfo.title, rcInfo.url, rcInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getCategory() & categoryId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }

  getRuleResultInfo (rule_result) {
    return {      id: rule_result.rule.getId(),
             summary: rule_result.rule.getSummary(),
              result: rule_result.getResultValueNLS(),
        result_value: rule_result.getResultValue(),
                  sc: rule_result.rule.getPrimarySuccessCriterionId(),
               level: rule_result.rule.getWCAGLevel(),
            required: rule_result.isRuleRequired()
        };
  }

  getRuleInfo (rule_result) {
    const rule = rule_result.rule;
    const id = rule.getId();
    return {
        id: id,
        rule_category_info:    getRuleCategoryInfo(rule.rule_category_id), // Object with keys to strings
        guideline_info:        getGuidelineInfo(rule.wcag_guideline_id), // Object with keys to strings
        rule_scope:            getScope(rule.rule_scope_id), // String
        wcag_primary:          getSuccessCriterionInfo(rule.wcag_primary_id),
        wcag_related:          getSuccessCriteriaInfo(rule.wcag_related_ids),
        wcag_level:            getCommonMessage('level', rule.wcag_primary.level),
        wcag_version:          getWCAGVersion(rule.wcag_primary_id),

        rule_nls_id:           getRuleId(id), // String
        summary:               getRuleSummary(id), // String
        definition:            getRuleDefinition(id), // String
        targets:               getTargetResourcesDesc(id), // String
        purposes:              getPurposes(id),  // Array of strings
        techniques:            getTechniques(id),  // Array of strings
        manual_checks:         getManualChecks(id),  // Array of strings
        informational_links:   getInformationLinks(id),  // Array of objects with keys to strings

        actions:       rule_result.getResultMessagesArray()
      };
  }

  /**
   * @method getRuleResultsByCategoryWithSummary
   *
   * @desc Returns an object containing the rule results for the rules in a rule category
   *       and a summary of rule results
   *
   * @param {Integer}  categoryId  -  Number of the rule category
   *
   * @return array [String, {RuleResultsSummary}, {array}, {array}]  see description
   */

  getRuleResultsByCategoryWithSummary (categoryId) {
    const rcInfo = getRuleCategoryInfo(categoryId);
    const summary = new RuleResultsSummary();
    const rule_results = [];
    const info_rules = [];

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getCategory() & categoryId) {

        const result = this.getRuleResultInfo (rr);
        rule_results.push(result);

        const info = this.getRuleInfo(rr);
        info_rules.push(info);

        summary.update(rr);
      }
    });
    return [rcInfo.title, summary, rule_results, info_rules];
  }

  /**
   * @method getRuleResultsByScope
   *
   * @desc Returns an object containing the rule results based on rule scope
   *
   * @param {Integer}  scope Id  -  Number of the scope
   * @param {Integer}  ruleset   - Numerical constant that specifies the ruleset
   *                               By default all rules are included
   *
   * @return {RuleGroupResult}  see description
   */

  getRuleResultsByScope (scopeId, ruleset=RULESET.ALL) {
    const scopeInfo = getRuleScopeInfo(scopeId);
    const rgr = new RuleGroupResult(this, scopeInfo.title, scopeInfo.url, scopeInfo.description, ruleset);

    this.allRuleResults.forEach( rr => {
      if (rr.getRule().getScope() & scopeId) {
        rgr.addRuleResult(rr);
      }
    });
    return rgr;
  }


  /**
   * @method getDataForJSON
   *
   * @desc Creates a data object with rule, element and page results
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  getDataForJSON (flag=false) {

    const thisRef = this;

    const data = {
      eval_url: cleanForUTF8(thisRef.url),
      eval_url_encoded: encodeURI(thisRef.url),
      eval_title: cleanForUTF8(thisRef.title),

      // For compatibility with previous versions of the library
      ruleset:      thisRef.ruleset,
      wcag_level:   thisRef.relevel,
      scope_filter: thisRef.scopeFilter,
      version:      thisRef.version,
      date:         thisRef.date.toString(),

      rule_results: []
    }

//    json += this.dom_cache.element_information.toJSON(true, "  ");

    this.allRuleResults.forEach( rr => {
      data.rule_results.push(rr.getDataForJSON(flag));
    });
    return data;
  }

  /**
   * @method toJSON
   *
   * @desc Creates a string representing the evaluation results in a JSON format
   *
   * @param  {Boolean}  flag  -  Optional param, if true then element
   *                             results are included in the JSON file
   *
   * @return {String} Returns a string in JSON format
   */

  toJSON (flag=false) {
    return JSON.stringify(this.getDataForJSON(flag), null, '  ');
  }
}

