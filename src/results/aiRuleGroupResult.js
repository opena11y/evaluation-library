/* aiRuleGroupResult.js */

/* Imports */
import DebugLogging from '../debug.js';

import RuleResultsSummary  from './ruleResultsSummary.js';

import {
  getCommonMessage,
  getGuidelineInfo,
  getRuleCategoryInfo,
  getInformationLinks,
  getManualChecks,
  getPurposes,
  getRuleId,
  getRuleDefinition,
  getRuleSummary,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTargetResourcesDesc,
  getTechniques,
  getScope,
  getWCAGVersion
} from '../locale/locale.js';

/* constants */
const debug = new DebugLogging('aiRuleGroupResult', false);
debug.flag = false;

/**
 * @function aiRuleResultsByCategory
 *
 * @desc Returns an object containing the rule results for the rules in a rule category
 *       and a summary of rule results
 *
 * @param {Integer}  categoryId  -  Number of the rule category
 *
 * @return array [String, {RuleResultsSummary}, {array}, {array}]  see description
 */

export function aiRuleResultsByCategory (allRuleResults, categoryId) {
  const rcInfo = getRuleCategoryInfo(categoryId);
  const summary = new RuleResultsSummary();
  const rule_results = [];
  const info_rules = [];

  allRuleResults.forEach( rr => {
    if (rr.getRule().getCategory() & categoryId) {

      const result = getRuleResultInfo (rr);
      rule_results.push(result);

      const info = getRuleInfo(rr);
      info_rules.push(info);

      summary.update(rr);
    }
  });
  return [rcInfo.title, summary, rule_results, info_rules];
}

/**
 * @method aiRuleResultsByGuideline
 *
 * @desc Returns an object containing the rule results associated with a WCAG 2.0 Guideline
 *       and a summary of rule results
 *
 * @param {Integer}  guidelineId  - Number representing the guideline id
 *
 * @return array [String, {RuleResultsSummary}, {array}, {array}]  see description
 */

export function aiRuleResultsByGuideline (allRuleResults, guidelineId) {
  const glInfo  = getGuidelineInfo(guidelineId);
  const glTitle = glInfo.title;

  const summary = new RuleResultsSummary();
  const rule_results = [];
  const info_rules = [];

  allRuleResults.forEach( rr => {
    if (rr.getRule().getGuideline() & guidelineId) {
      const result = getRuleResultInfo (rr);
      rule_results.push(result);

      const info = getRuleInfo(rr);
      info_rules.push(info);

      summary.update(rr);
    }
  });
  return [glTitle, summary, rule_results, info_rules];
}

/**
 * @method getRuleResultInfo
 *
 * @desc Returns object with rule result information for AInspector
 *
 * @return {Object} see @desc
 */

function getRuleResultInfo (rule_result) {
  return {      id: rule_result.rule.getId(),
           summary: rule_result.rule.getSummary(),
            result: rule_result.getResultValueNLS(),
      result_value: rule_result.getResultValue(),
                sc: rule_result.rule.getPrimarySuccessCriterionId(),
             level: rule_result.rule.getWCAGLevel(),
          required: rule_result.isRuleRequired()
      };
}

/**
 * @method getRuleinfo
 *
 * @desc Returns object with rule information for AInspector
 *
 * @return {Object} see @desc
 */

function getRuleInfo (rule_result) {
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
