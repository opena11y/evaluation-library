 /* getRuleResultsItem.js */

import {getDetailsAction} from './getDetailsAction.js';

// ----------------------
// Rule Group Result functions
// ----------------------

export function getRuleResultsItem(ruleResult) {

  let ruleId = ruleResult.getRule().getId();
  let rule = ruleResult.getRule();
  let elemResults = ruleResult.getResultsSummary();

  let item = {
    'ruleId'         : ruleId,
    'scope'          : rule.getScopeNLS(),
    'summary'        : ruleResult.getRuleSummary(),
    'required'       : ruleResult.isRuleRequired(),
    'ruleCategory'   : rule.rule_category_info.title,
    'guideline'      : rule.guideline_info.title.replace('Guideline ',''),
    'wcag'           : rule.getPrimarySuccessCriterionInfo().id,
    'result'         : ruleResult.getResultValueNLS(),
    'resultValue'    : ruleResult.getResultValue(),
    'level'          : ruleResult.getWCAGLevel(),
    'messages'       : ruleResult.getResultMessagesArray(),
    'detailsAction'  : getDetailsAction(ruleResult),
    'elemViolations'   : elemResults.violations,
    'elemWarnings'     : elemResults.warnings,
    'elemManualChecks' : elemResults.manual_checks,
    'elemPassed'       : elemResults.passed,
    'elemHidden'       : elemResults.hidden
  };

  return item;

}