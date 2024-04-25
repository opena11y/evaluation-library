 /* getRuleResultInfo.js */

import {evaluate}           from './evaluate.js';
import {getRuleResultsItem} from './getRuleResultsItem.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('getRuleGroupInfo', false);
debug.flag = false;


/*
*   getRuleResultsInfo
*   (1) Run evlauation library;
*   (2) return result objec for the group view in the sidebar;
*/
export default function getRuleGroupInfo (groupType, groupId, ruleset, level, scopeFilter, ariaVersion) {

  let info = {};

  const evaluationResult  = evaluate(ruleset, level, scopeFilter, ariaVersion);
  const ruleGroupResult = (groupType === 'gl') ?
                          evaluationResult.getRuleResultsByGuideline(groupId) :
                          (groupType === 'rc') ? evaluationResult.getRuleResultsByCategory(groupId) :
                          evaluationResult.getRuleResultsByScope(groupId);

  const ruleGroupInfo     = ruleGroupResult.getRuleGroupInfo();
  const ruleSummaryResult = ruleGroupResult.getRuleResultsSummary();
  const ruleResults       = ruleGroupResult.getRuleResultsArray();

  info.groupLabel = ruleGroupInfo.title.replace('Guideline ', '');

  info.groupType     = groupType;
  info.violations    = ruleSummaryResult.violations;
  info.warnings      = ruleSummaryResult.warnings;
  info.manual_checks = ruleSummaryResult.manual_checks;
  info.passed        = ruleSummaryResult.passed;

  info.ruleResults = [];

  info.json = ruleGroupResult.toJSON('');

  for(let i = 0; i < ruleResults.length; i++) {
    info.ruleResults.push(getRuleResultsItem(ruleResults[i]));
  }

  return info;
}
