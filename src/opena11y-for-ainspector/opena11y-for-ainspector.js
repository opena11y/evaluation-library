/* opena11y-for-ainspector.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants
const debug = true;

const HIGHLIGHT_ELEMENT_NAME = 'ai-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let er;

debug && console.log(`[content.js]: loading...`);

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-ai-highlight';
scriptNode.src = browserRuntime.getURL('ai-highlight.js');
document.body.appendChild(scriptNode);



// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Highlight elements
    if(request.highlight) {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('data-attr', 'data-opena11y-id');
        he.setAttribute('highlight-position', request.highlight.position + ';' + request.highlight.info);
      }
    }

    // Removed highlight
    if(request.removeHighlight) {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('highlight-position', '');
      }
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      const hc = request.updateHighlightConfig;

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('highlight-config', `${hc.size} ${hc.style}`);
      }
    }


    // Update heading, region and link information
    if(request.aiRunEvaluation) {
      const r = request.aiRunEvaluation;

      debug && console.log(`[.    ruleset]: ${r.ruleset}`);
      debug && console.log(`[       level]: ${r.level}`);
      debug && console.log(`[scope_filter]: ${r.scope_filter}`);
      debug && console.log(`[aria_version]: ${r.aria_version}`);
      debug && console.log(`[ result_view]: ${r.result_view}`);

      const doc = window.document;
      er  = evaluationLibrary.evaluateWCAG(
              doc,
              doc.title,
              doc.location.href,
              r.ruleset,
              r.level,
              r.scope_filter,
              r.aria_version,
              true);

      let response = {
        title:         er.getTitle(),
        location:      er.getURL(),
        ruleset_label: er.getRulesetLabel(),
        result_view:   r.result_view
      };
      debug && console.log(`[response][            title]: ${response.title}`);
      debug && console.log(`[response][         location]: ${response.location}`);
      debug && console.log(`[response][      result_view]: ${response.result_view}`);
      debug && console.log(`[response][ruleResultSummary]: ${er.ruleResultSummary}`);
      debug && console.log(`[response][             data]: ${er.ruleResultSummary.data}`);

      switch (response.result_view) {
        case 'rules-all':
          response.summary = er.ruleResultSummary.data;
          debug && console.log(`[response][summary]: ${response.summary.violations}`);
          debug && console.log(`[response][summary]: ${response.summary.warnings}`);
          break;

        case 'rules-group':
          break;

        case 'rule':
          break;

      }

      sendResponse(response);
    }
    return true;
  }
);

/*
 * Detecting side panel closing
 */

// Check if side panel is open
/*
let openFlag = true;

setInterval(() => {
  chrome.runtime
    .sendMessage({ ['ai-sidepanel-open']: true })
    .then((msgRes) => {
      if (msgRes !== true && openFlag) {
        openFlag = false;
      }
    })
    .catch( () => {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      if (he) {
        he.setAttribute('highlight-position', '');
      }
      openFlag = true;
  });
}, 50);
*/
