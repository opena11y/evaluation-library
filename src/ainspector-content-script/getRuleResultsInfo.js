 /* getRuleResultInfo.js */

import {evaluate}           from './evaluate.js';
import {getRuleResultsItem} from './getRuleResultsItem.js';

/*
*   getRuleResultsInfo
*   (1) Run evlauation library;
*   (2) return result objec for the group view in the sidebar;
*/
export function getRuleResultsInfo (groupType, groupId) {

  let info = {};

  const evaluationResult  = evaluate();
  const ruleGroupResult =  (groupType === 'gl') ? 
                          evaluationResult.getRuleResultsByGuideline(groupId) :
                          evaluationResult.getRuleResultsByCategory(groupId);

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
