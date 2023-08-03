/*
*   content.js
*/

import {evaluate}         from './evaluate.js';
import {viewId}           from './panelConstants.js';
import getAllRulesInfo    from './getAllRulesInfo.js';
import getRuleGroupInfo   from './getRuleGroupInfo.js';
import getRuleResultInfo  from './getRuleResultInfo.js';
import {
  getRulesetLabel
} from '../_locale/locale.js';
import {
  addHighlightStyle,
  clearHighlights,
  highlightResults
} from './highlight.js';
import DebugLogging from '../debug.js';


const debug = new DebugLogging('Content', false);
debug.flag = true;

/*
**  Connect to panel.js script and set up listener/handler
*/
// NOTE: browser is a global object 
var panelPort = browser.runtime.connect({ name: 'content' }); // eslint-disable-line 

panelPort.onMessage.addListener(messageHandler);

function messageHandler (message) {
  switch (message.id) {
    case 'getInfo':
      getEvaluationInfo(panelPort);
      break;
  }
}

/*
*   Send 'info' message with evaluation information to sidebar script.
*/

function getEvaluationInfo(panelPort) {

  // NOTE: infoAInspectorEvaluation is a global variable in the page
  const aiInfo   = infoAInspectorEvaluation;    // eslint-disable-line
  let ruleResult = ainspectorSidebarRuleResult; // eslint-disable-line

  if (debug.flag) {
    debug.log(`[getEvaluationInfo][           view]: ${aiInfo.view}`);
    debug.log(`[getEvaluationInfo][      groupType]: ${aiInfo.groupType}`);
    debug.log(`[getEvaluationInfo][        groupId]: ${aiInfo.groupId}`);
    debug.log(`[getEvaluationInfo][         ruleId]: ${aiInfo.ruleId}`);
    debug.log(`[getEvaluationInfo][        ruleset]: ${aiInfo.ruleset}`);
    debug.log(`[getEvaluationInfo][          level]: ${aiInfo.level}`);
    debug.log(`[getEvaluationInfo][    scopeFilter]: ${aiInfo.scopeFilter}`);
    debug.log(`[getEvaluationInfo][ firstStepRules]: ${aiInfo.firstStepRules} (${aiInfo.firstStepRules.length})` );
    debug.log(`[getEvaluationInfo][      highlight]: ${aiInfo.highlight}`);
    debug.log(`[getEvaluationInfo][       position]: ${aiInfo.position}`);
    debug.log(`[getEvaluationInfo][  highlightOnly]: ${aiInfo.highlightOnly}`);
    debug.log(`[getEvaluationInfo][removeHighlight]: ${aiInfo.removeHighlight}`);
    debug.log(`[ainspectorSidebarRuleResult][ruleId]: ${(ruleResult && ruleResult.rule) ? ruleResult.rule.getId() : 'none'}`);
    debug.log(`[ainspectorSidebarRuleResult][length]: ${(ruleResult && ruleResult.rule) ? ruleResult.getAllResultsArray().length : 'none'}`);
  }

  let info = {};
  info.id          = 'info';
  info.title       = document.title;
  info.location    = document.location.href
  info.ruleset     = aiInfo.ruleset;
  info.level       = aiInfo.level;
  info.scopeFilter = aiInfo.scopeFilter;
  info.evaluationLabel = getRulesetLabel(aiInfo.ruleset, aiInfo.level, aiInfo.scopeFilter);

  switch(aiInfo.view) {
    case viewId.allRules:
      clearHighlights();
      info.infoAllRules = getAllRulesInfo(aiInfo.ruleset, info.level, aiInfo.scopeFilter, aiInfo.firstStepRules);
      ruleResult = false;
      break;

    case viewId.ruleGroup:
      clearHighlights();
      info.infoRuleGroup = getRuleGroupInfo(aiInfo.groupType, aiInfo.groupId, aiInfo.ruleset, info.level, aiInfo.scopeFilter, aiInfo.firstStepRules);
      ruleResult = false;
      break;

    case viewId.ruleResult:
      addHighlightStyle();
      clearHighlights();
      if (aiInfo.highlightOnly) {
        if (ruleResult && ruleResult.getAllResultsArray) {
          highlightResults(ruleResult.getAllResultsArray(), aiInfo.highlight, aiInfo.position);
          info.infoHighlight = true;
        }
      } else {
        const evaluationResult  = evaluate(aiInfo.ruleset, aiInfo.level, aiInfo.scopeFilter, aiInfo.firstStepRules);
        ruleResult = evaluationResult.getRuleResult(aiInfo.ruleId);
        info.infoRuleResult = getRuleResultInfo(ruleResult);
        highlightResults(ruleResult.getAllResultsArray(), aiInfo.highlight, aiInfo.position);
      }
      break;

    default:
      break;
  }

  panelPort.postMessage(info);
}

/*
*  This message handler is used to remove element highlighting
*  when the sidebar is closed
*/
// NOTE: browser is a global object 
browser.runtime.onMessage.addListener(request => {  // eslint-disable-line
  // to be executed on receiving messages from the panel
  if ((request.option    === 'highlight') &&
      (request.highlight === 'none')) {
    clearHighlights();
  }
});
