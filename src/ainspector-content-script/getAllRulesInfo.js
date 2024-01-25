 /* evaluate.js */

import {evaluate}           from './evaluate.js';
import {getRuleResultsItem} from './getRuleResultsItem.js';
import {
  RULE_CATEGORIES,
  WCAG_GUIDELINE,
  RULE_SCOPE
} from '../constants.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('getAllRuleInfo', false);
debug.flag = false;

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
    RULE_CATEGORIES.COLOR_CONTENT,
    RULE_CATEGORIES.IMAGES,
    RULE_CATEGORIES.LINKS,
    RULE_CATEGORIES.FORMS,
    RULE_CATEGORIES.TABLES_LAYOUT,
    RULE_CATEGORIES.WIDGETS_SCRIPTS,
    RULE_CATEGORIES.AUDIO_VIDEO,
    RULE_CATEGORIES.KEYBOARD_SUPPORT,
    RULE_CATEGORIES.TIMING_LIVE,
    RULE_CATEGORIES.SITE_NAVIGATION
  ];

  let rcResults = [];
  rcIds.forEach ((id) => {
    const summary = evalResult.getRuleResultsByCategory(id).getRuleResultsSummary();
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
    WCAG_GUIDELINE.G_2_5,
    WCAG_GUIDELINE.G_3_1,
    WCAG_GUIDELINE.G_3_2,
    WCAG_GUIDELINE.G_3_3,
    WCAG_GUIDELINE.G_4_1
  ];

  let glResults = [];
  glIds.forEach ((id) => {
    const summary = evalResult.getRuleResultsByGuideline(id).getRuleResultsSummary();
    glResults.push(getSummaryItem(summary, id));
  });
  return glResults;
}

function getScopeResults (evalResult) {

  const scIds = [
    RULE_SCOPE.ELEMENT,
    RULE_SCOPE.PAGE,
    RULE_SCOPE.WEBSITE
  ];

  let scResults = [];
  scIds.forEach ((id) => {
    const summary = evalResult.getRuleResultsByScope(id).getRuleResultsSummary();
    scResults.push(getSummaryItem(summary, id));
  });
  return scResults;
}

/*
*   getAllRulesInfo
*   (1) Run evlauation library;
*   (2) return result object for the all rules view in the sidebar;
*/
export default function getAllRulesInfo (ruleset, level, scopeFilter) {

  debug.flag && debug.log(`[    ruleset]: ${ruleset}`);
  debug.flag && debug.log(`[      level]: ${level}`);
  debug.flag && debug.log(`[scopeFilter]: ${scopeFilter}`);

  const evaluationResult  = evaluate(ruleset, level, scopeFilter);
  const ruleGroupResult   = evaluationResult.getRuleResultsAll();
  const ruleSummaryResult = ruleGroupResult.getRuleResultsSummary();
  const ruleResults       = ruleGroupResult.getRuleResultsArray();

  const info = {};

  info.violations    = ruleSummaryResult.violations;
  info.warnings      = ruleSummaryResult.warnings;
  info.manual_checks = ruleSummaryResult.manual_checks;
  info.passed        = ruleSummaryResult.passed;

  info.rcResults = getRuleCategoryResults(evaluationResult);
  info.glResults = getGuidelineResults(evaluationResult);
  info.scResults = getScopeResults(evaluationResult);
  info.json = evaluationResult.toJSON();

  info.allRuleResults = [];
  ruleResults.forEach( ruleResult => {
    info.allRuleResults.push(getRuleResultsItem(ruleResult));
  });

  return info;
}
