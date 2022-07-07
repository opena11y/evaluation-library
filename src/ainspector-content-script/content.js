/*
*   content.js
*/

import {viewId}                from './panelConstants.js';
import {getSummaryInfo}        from './getSummaryInfo.js';
import {getRuleResultsInfo}    from './getRuleResultsInfo.js';
import {getElementResultsInfo} from './getElementResultsInfo.js';
import {highlightModule}       from './highlightModule.js';
import {highlightElements}     from './highlightElements.js';

const debug = true;

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
  const aiInfo     = infoAInspectorEvaluation; // eslint-disable-line 
  const ruleResult = ainspectorSidebarRuleResult; // eslint-disable-line

  if (debug) {
    console.log(`[getEvaluationInfo][           view]: ${aiInfo.view}`);
    console.log(`[getEvaluationInfo][      groupType]: ${aiInfo.groupType}`);
    console.log(`[getEvaluationInfo][        groupId]: ${aiInfo.groupId}`);
    console.log(`[getEvaluationInfo][         ruleId]: ${aiInfo.ruleId}`);
    console.log(`[getEvaluationInfo][      rulesetId]: ${aiInfo.rulesetId}`);
    console.log(`[getEvaluationInfo][      highlight]: ${aiInfo.highlight}`);
    console.log(`[getEvaluationInfo][       position]: ${aiInfo.position}`);
    console.log(`[getEvaluationInfo][  highlightOnly]: ${aiInfo.highlightOnly}`);
    console.log(`[getEvaluationInfo][removeHighlight]: ${aiInfo.removeHighlight}`);
    console.log(`[ainspectorSidebarRuleResult][ruleId]: ${(ruleResult && ruleResult.rule) ? ruleResult.rule.getId() : 'none'}`);
  }

  let info = {};
  info.id       = 'info';
  info.title    = document.title;
  info.location = document.location.href
  info.ruleset  = aiInfo.rulesetId;

  switch(aiInfo.view) {
    case viewId.summary:
      highlightModule.removeHighlight(document);
      info.infoSummary = getSummaryInfo();
      break;

    case viewId.ruleResults:
      highlightModule.removeHighlight(document);
      info.infoRuleResults = getRuleResultsInfo(aiInfo.groupType, aiInfo.groupId);
      break;

    case viewId.elementResults:
      if (aiInfo.highlightOnly) {
        info.infoHighlight = highlightElements(aiInfo.highlight, aiInfo.position);
      } else {
        highlightModule.removeHighlight(document);
        info.infoElementResults = getElementResultsInfo(aiInfo.ruleId, aiInfo.highlight, aiInfo.position);
        highlightElements(aiInfo.highlight, aiInfo.position);
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
//    highlightModule.removeHighlight(document);
  }
});
