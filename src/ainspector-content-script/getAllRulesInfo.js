 /* evaluate.js */

import {evaluate}           from './evaluate.js';
import {getRuleResultsItem} from './getRuleResultsItem.js';
import {
  RULE_CATEGORIES,
  WCAG_GUIDELINE,
  RULE_SCOPE
} from '../constants.js';

// ----------------------
// All Rules Result functions
// ----------------------

function getSummaryItem (summary, id) {
  let item = {
    'id'             : id,
    'violations'     : summary.violations,
    'warnings'       : summary.warnings,
    'manual_checks'  : summary.manual_checks,
    'passed'         : summary.passed,
    'not_applicable' : summary.not_applicable
  };
  return item;
}

function getRuleCategoryResults (evalResult) {

  const rcIds = [
    RULE_CATEGORIES.LANDMARKS,
    RULE_CATEGORIES.HEADINGS,
    RULE_CATEGORIES.STYLES_READABILITY,
    RULE_CATEGORIES.IMAGES,
    RULE_CATEGORIES.LINKS,
    RULE_CATEGORIES.FORMS,
    RULE_CATEGORIES.TABLES,
    RULE_CATEGORIES.WIDGETS_SCRIPTS,
    RULE_CATEGORIES.AUDIO_VIDEO,
    RULE_CATEGORIES.KEYBOARD_SUPPORT,
    RULE_CATEGORIES.TIMING,
    RULE_CATEGORIES.SITE_NAVIGATION
  ];

  let rcResults = [];
  rcIds.forEach ((id) => {
    let summary = evalResult.getRuleResultsByCategory(id).getRuleResultsSummary();
    rcResults.push(getSummaryItem(summary, id));
  });
  return rcResults;
}

function getGuidelineResults (evalResult) {

  const glIds = [
    WCAG_GUIDELINE.G_1_1,
    WCAG_GUIDELINE.G_1_2,
    WCAG_GUIDELINE.G_1_3,
    WCAG_GUIDELINE.G_1_4,
    WCAG_GUIDELINE.G_2_1,
    WCAG_GUIDELINE.G_2_2,
    WCAG_GUIDELINE.G_2_3,
    WCAG_GUIDELINE.G_2_4,
    WCAG_GUIDELINE.G_3_1,
    WCAG_GUIDELINE.G_3_2,
    WCAG_GUIDELINE.G_3_3,
    WCAG_GUIDELINE.G_4_1
  ];

  let glResults = [];
  glIds.forEach ((id) => {
    let summary = evalResult.getRuleResultsByGuideline(id).getRuleResultsSummary();
    glResults.push(getSummaryItem(summary, id));
  });
  return glResults;
}

function getScopeResults (evalResult) {

  const scopeResults = {
    website: getSummaryItem(evalResult.getRuleResultsByScope(RULE_SCOPE.WEBSITE).getRuleResultsSummary(), 'scope-website'),
    page:    getSummaryItem(evalResult.getRuleResultsByScope(RULE_SCOPE.PAGE).getRuleResultsSummary(), 'scope-page'),
    element: getSummaryItem(evalResult.getRuleResultsByScope(RULE_SCOPE.ELEMENT).getRuleResultsSummary(), 'scope-element')
  }

  return scopeResults;
}

/*
*   getAllRulesInfo
*   (1) Run evlauation library;
*   (2) return result objec for the summary view in the sidebar;
*/
export default function getAllRulesInfo () {

  const info = {};

  const evaluationResult  = evaluate();
  const ruleGroupResult   = evaluationResult.getRuleResultsAll();
  const ruleSummaryResult = ruleGroupResult.getRuleResultsSummary();
  const ruleResults       = ruleGroupResult.getRuleResultsArray();


  info.ruleset  = 'ARIA_STRICT';

  info.violations    = ruleSummaryResult.violations;
  info.warnings      = ruleSummaryResult.warnings;
  info.manual_checks = ruleSummaryResult.manual_checks;
  info.passed        = ruleSummaryResult.passed;

  info.rcResults    = getRuleCategoryResults(evaluationResult);
  info.glResults    = getGuidelineResults(evaluationResult);
  info.scopeResults = getScopeResults(evaluationResult);
  info.json = evaluationResult.toJSON();

  info.allRuleResults = [];
  ruleResults.forEach( ruleResult => {
    info.allRuleResults.push(getRuleResultsItem(ruleResult));
  });

  return info;
}
