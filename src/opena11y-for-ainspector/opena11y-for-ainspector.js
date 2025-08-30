/* opena11y-for-ainspector.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants
const debug = true;

const HIGHLIGHT_ELEMENT_NAME = 'ai-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let evaluationResult;

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

      debug && console.log(`[.   ruleset]: ${r.ruleset}`);
      debug && console.log(`[      level]: ${r.level}`);
      debug && console.log(`[scopeFilter]: ${r.scopeFilter}`);
      debug && console.log(`[ariaVersion]: ${r.ariaVersion}`);
      debug && console.log(`[ resultView]: ${r.resultView}`);

      const doc = window.document;
      evaluationResult  = evaluationLibrary.evaluateWCAG(doc,
                                doc.title,
                                doc.location.href,
                                r.ruleset,
                                r.level,
                                r.scopeFilter,
                                r.ariaVersion,
                                true);

      sendResponse({title:        evaluationResult.getTitle(),
                    url:          evaluationResult.getURL(),
                    rulesetLabel: evaluationResult.getRulesetLabel()
                  });
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
