/*  ruleInformation.js */

/* Imports */

import {
  getCommonMessage,
  getGuidelineInfo,
  getInformationLinks,
  getPurposes,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleSummary,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTechniques
} from '../_locale/locale.js';

import {allRules} from './allRules.js';

/**
 * @class RuleInformation
 *
 * @desc Provides APIs to access rule informatino without have to do an evaluation
 */

export default class RuleInformation {
  constructor () {

  }

  getRuleCategoryInfo (rc) {
    return getRuleCategoryInfo(rc);
  }

  getGuidelineInfo (rc) {
    return getGuidelineInfo(rc);
  }

  getRuleInfo(rule) {
    const ruleInfo = {};
    const id = rule.rule_id;

    ruleInfo.id            = getRuleId(id);
    ruleInfo.filename      = 'rule-' + rule.rule_id.toLowerCase().replace('_', '-') + '.html';
    ruleInfo.last_updated  = rule.last_updated;

    ruleInfo.rule_scope       = rule.rule_scope;
    ruleInfo.rule_category    = getRuleCategoryInfo(rule.rule_category_id);
    ruleInfo.rule_category_id = rule.rule_category_id;
    ruleInfo.conformance      = rule.rule_required ? getCommonMessage('required') : getCommonMessage('recommended');

    ruleInfo.primary_id = rule.wcag_primary_id;
    ruleInfo.primary    = getSuccessCriterionInfo(rule.wcag_primary_id);
    ruleInfo.related    = getSuccessCriteriaInfo(rule.wcag_related_ids);

    ruleInfo.target_resources = rule.target_resources;

    ruleInfo.definition = getRuleDefinition(id);
    ruleInfo.summary    = getRuleSummary(id);
    ruleInfo.purposes   = getPurposes(id);

    ruleInfo.techniques = getTechniques(id);
    ruleInfo.information_links = getInformationLinks(id);

    return ruleInfo;
  }

  getRulesByCategory(rc) {
    const rules = [];
    allRules.forEach( rule => {
      if (rule.rule_category_id & rc) {
        rules.push(this.getRuleInfo(rule));
      }
    });
    return rules;
  }

  getRulesByGuideline(gl) {
    const rules = [];
    allRules.forEach( rule => {
      if (rule.wcag_primary_id.indexOf(gl) === 0) {
        rules.push(this.getRuleInfo(rule));
      }
    });

    rules.sort( (a, b) => {
      const aParts = a.primary_id.split('.');
      const bParts = b.primary_id.split('.');

      const p  = parseInt(aParts[0]) - parseInt(bParts[0]);
      const g  = parseInt(aParts[1]) - parseInt(bParts[1]);
      const sc = parseInt(aParts[2]) - parseInt(bParts[2]);

      if (p === 0) {
        if (g === 0) {
          return sc;
        }
        else {
          return g;
        }
      }
      return p;
    });

    return rules;
  }
}
