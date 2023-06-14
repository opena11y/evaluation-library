 /* getRuleResultInfo.js */

import {getDetailsAction} from './getDetailsAction.js';
import {
  RESULT_VALUE
} from '../constants.js';

/* Constants */

/*
*   getRuleResultInfo
*   (1) Run evlauation library;
*   (2) return result objec for the rule view in the sidebar;
*/

export default function getRuleResultInfo(ruleResult) {

  const elemSummaryResult = ruleResult.getResultsSummary();

  const rule = ruleResult.getRule();
  const required = ruleResult.isRuleRequired()
  const title = rule.getSummary(required);

  let info = {};

  info.title          = title;

  info.violations     = elemSummaryResult.violations;
  info.warnings       = elemSummaryResult.warnings;
  info.manual_checks  = elemSummaryResult.manual_checks;
  info.passed         = elemSummaryResult.passed;
  info.hidden         = elemSummaryResult.hidden;

  info.detailsAction  = getDetailsAction(ruleResult);
  info.ruleResult     = getResultInfo(ruleResult);
  info.elementResults = getElementResultInfo(ruleResult);
  info.otherResult    = getPageOrWebsiteResultInfo(ruleResult);

  // get JSON with element result details
  info.json = ruleResult.toJSON('', true);

  // Save reference to rule results for highlighting elements
  ainspectorSidebarRuleResult = ruleResult; // eslint-disable-line 

  return info;
}

// ----------------------
// Rule Result functions
// ----------------------

function getResultInfo(ruleResult) {

  let rule   = ruleResult.getRule()

  var info = {
    'ruleId'        : rule.getId(),
    'scope'         : rule.getScopeNLS(),
    'summary'       : ruleResult.getRuleSummary(),
    'definition'    : ruleResult.getRuleDefinition(),
    'required'      : ruleResult.isRuleRequired(),
    'wcag'          : ruleResult.getRule().getPrimarySuccessCriterionInfo().id,
    'result'        : ruleResult.getResultValueNLS(),
    'category'      : rule.getCategoryInfo().title,
    'guideline'     : rule.getGuidelineInfo().title,
    'resultValue'   : ruleResult.getResultValue(),
    'level'         : ruleResult.getWCAGLevel(),
    'messages'      : ruleResult.getResultMessagesArray(),
    'detailsAction' : getDetailsAction(ruleResult)
  };

  return info;
}

function getElementResultInfo(ruleResult) {

  function addElementResult(index, elementResult) {

    let accNameInfo     = JSON.stringify(elementResult.getAccessibleNameInfo());
    let ccrInfo         = JSON.stringify(elementResult.getColorContrastInfo());
    let headerInfo      = JSON.stringify(elementResult.getTableCellHeaderInfo());
    let tableInfo       = JSON.stringify(elementResult.getTableInfo());
    let visibilityInfo  = JSON.stringify(elementResult.getVisibilityInfo());
    let htmlAttrInfo    = JSON.stringify(elementResult.getHTMLAttributes());
    let ariaAttrInfo    = JSON.stringify(elementResult.getAriaAttributes());

    const item = {
      'index'            : (index + 1).toString(),
      'tagName'          : elementResult.getTagName(),
      'id'               : elementResult.getId(),
      'className'        : elementResult.getClassName(),
      'hasRole'          : elementResult.getHasRole(),
      'role'             : elementResult.getRole(),
      'position'         : elementResult.getOrdinalPosition(),
      'result'           : elementResult.getResultValueNLS(),
      'resultLong'       : elementResult.getResultValueLongNLS(),
      'resultValue'      : elementResult.getResultValue(),
      'actionMessage'    : elementResult.getResultMessage(),
      'resultType'       : elementResult.getResultType(),
      'accNameInfo'      : accNameInfo,
      'ccrInfo'          : ccrInfo,
      'headerInfo'       : headerInfo,
      'tableInfo'        : tableInfo,
      'visibilityInfo'   : visibilityInfo,
      'htmlAttrInfo'     : htmlAttrInfo,
      'ariaAttrInfo'     : ariaAttrInfo,
      'isElementResult'  : elementResult.isElementResult,
      'isPageResult'     : elementResult.isPageResult,
      'isWebsiteResult'  : elementResult.isWebsiteResult,
      'isActionMessage'  : elementResult.isActionMessage,
    };

    // Adjust sort order of element results for AInspector Sidebar
    if (item.resultValue === RESULT_VALUE.HIDDEN) {
      item.resultValue = 1;
    }
    else {
      if (item.resultValue === RESULT_VALUE.PASS) {
        item.resultValue = 2;
      }
    }
    elementResults.push(item);
  }

  var elementResults = [];

  var allResults = ruleResult.getAllResultsArray();

  for(let i = 0; i < allResults.length; i++) {
    const result = allResults[i];
    if (result.isElementResult) {
      addElementResult(i, result);
    }
  }
  return elementResults;
}

function getPageOrWebsiteResultInfo(ruleResult) {

  var allResults = ruleResult.getAllResultsArray();

  for(let i = 0; i < allResults.length; i++) {
    const result = allResults[i];
    if (!result.isElementResult) {
      return  {
        'otherName'        : result.getResultIdentifier(),
        'position'         : 0,
        'result'           : result.getResultValueNLS(),
        'resultLong'       : result.getResultValueLongNLS(),
        'resultValue'      : result.getResultValue(),
        'actionMessage'    : result.getResultMessage(),
        'resultType'       : result.getResultType(),
        'isElementResult'  : result.isElementResult,
        'isPageResult'     : result.isPageResult,
        'isWebsiteResult'  : result.isWebsiteResult,
        'isActionMessage'  : result.isActionMessage,
      };
    }
  }
  return null;
}
