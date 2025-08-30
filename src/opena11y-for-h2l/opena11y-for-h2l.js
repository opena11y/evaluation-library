/* opena11y-for-h2l.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants
const debug = false;

const HIGHLIGHT_ELEMENT_NAME = 'h2l-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let evaluationResult;

debug && console.log(`[content.js]: loading...`);

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-h2l-highlight';
scriptNode.src = browserRuntime.getURL('h2l-highlight.js');
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

    // Focus elements
    if(request.focusPosition) {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('data-attr', 'data-opena11y-id');
        he.setAttribute('focus-position', request.focusPosition);
      }
    }

    // Update heading, region and link information
    if(request.runEvaluation) {
      const doc = window.document;
      evaluationResult  = evaluationLibrary.evaluateWCAG(doc,
                                doc.title,
                                doc.location.href,
                                '',
                                '',
                                '',
                                '',
                                true);

      sendResponse({title: evaluationResult.getTitle(),
                    url: evaluationResult.getURL(),
                    headings: evaluationResult.headings.data,
                    regions: evaluationResult.landmarkRegions.data,
                    links: evaluationResult.links.data});
    }
    return true;
  }
);

/*
 * Detecting side panel closing
 */

// Check if side panel is open

let openFlag = true;

setInterval(() => {
  chrome.runtime
    .sendMessage({ ['h2l-sidepanel-open']: true })
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

