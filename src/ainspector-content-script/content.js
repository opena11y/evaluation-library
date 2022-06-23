/*
*   content.js
*/

import {viewId}                from './panelConstants.js';
import {getSummaryInfo}        from './getSummaryInfo.js';
import {getRuleResultsInfo}    from './getRuleResultsInfo.js';
import {getElementResultsInfo} from './getElementResultsInfo.js';
import {highlightModule}       from './highlightModule.js';
import {highlightElements}     from './highlightElements.js';

const browser = browser || {};
var infoAInspectorEvaluation = infoAInspectorEvaluation || {};
const debug = true;


/*
**  Connect to panel.js script and set up listener/handler
*/
var panelPort = browser.runtime.connect({ name: 'content' });

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

  let view      = infoAInspectorEvaluation.view;
  let groupType = infoAInspectorEvaluation.groupType;
  let groupId   = infoAInspectorEvaluation.groupId;
  let ruleId    = infoAInspectorEvaluation.ruleId;
  let rulesetId = infoAInspectorEvaluation.rulesetId;
  let highlight = infoAInspectorEvaluation.highlight;
  let position  = infoAInspectorEvaluation.position;
  let highlightOnly   = infoAInspectorEvaluation.highlightOnly;
  let removeHighlight = infoAInspectorEvaluation.removeHighlight;

  if (debug) {
    console.log(`[getEvaluationInfo][           view]: ${view}`);
    console.log(`[getEvaluationInfo][      groupType]: ${groupType}`);
    console.log(`[getEvaluationInfo][        groupId]: ${groupId}`);
    console.log(`[getEvaluationInfo][         ruleId]: ${ruleId}`);
    console.log(`[getEvaluationInfo][      rulesetId]: ${rulesetId}`);
    console.log(`[getEvaluationInfo][      highlight]: ${highlight}`);
    console.log(`[getEvaluationInfo][       position]: ${position}`);
    console.log(`[getEvaluationInfo][  highlightOnly]: ${highlightOnly}`);
    console.log(`[getEvaluationInfo][removeHighlight]: ${removeHighlight}`);
  }

  let info = {};
  info.id       = 'info';
  info.title    = document.title;
  info.location = document.location.href
  info.ruleset  = rulesetId;

  switch(view) {
    case viewId.summary:
      highlightModule.removeHighlight(document);
      info.infoSummary = getSummaryInfo();
      break;

    case viewId.ruleResults:
      highlightModule.removeHighlight(document);
      info.infoRuleResults = getRuleResultsInfo(groupType, groupId);
      break;

    case viewId.elementResults:
      if (highlightOnly) {
        info.infoHighlight = highlightElements(highlight, position);
      } else {
        highlightModule.removeHighlight(document);
        info.infoElementResults = getElementResultsInfo(ruleId, highlight, position);
        highlightElements(highlight, position);
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
browser.runtime.onMessage.addListener(request => {
  // to be executed on receiving messages from the panel
  if ((request.option    === 'highlight') &&
      (request.highlight === 'none')) {
//    highlightModule.removeHighlight(document);
  }
});
