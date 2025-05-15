/* opena11y-for-toc.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants
const debug = false;

const HIGHLIGHT_ELEMENT_NAME = 'toc-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let evaluationResult;

debug && console.log(`[content.js]: loading...`);

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-toc-highlight';
scriptNode.src = browserRuntime.getURL('toc-highlight.js');
document.body.appendChild(scriptNode);



// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    debug && console.log(sender.tab ?
                "[content.js]: from a content script:" + sender.tab.url :
                "[content.js]: from the extension");

    // Highlight elements
    if(request.highlight) {
      debug && console.log(`[content.js][highlight][position]: ${request.highlight.position}`);
      debug && console.log(`[content.js][highlight][    info]: ${request.highlight.info}`);

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      debug && console.log(`[content.js][he]: ${he}`);

      if (he) {
        he.setAttribute('data-attr', 'data-opena11y-id');
        he.setAttribute('highlight-position', request.highlight.position + ';' + request.highlight.info);
      }
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      const hc = request.updateHighlightConfig;
      debug && console.log(`[content.js][hc]: ${hc}`);

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      debug && console.log(`[content.js][he]: ${he}`);

      if (he) {
        he.setAttribute('highlight-config', `${hc.size} ${hc.style}`);
      }
    }

    // Focus elements
    if(request.focusPosition) {
      debug && console.log(`[content.js][focusElement]: ${request.focusPosition}`);

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      debug && console.log(`[content.js][he]: ${he}`);

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

      debug && console.log(`[content.js][EvalResult][   title]: ${evaluationResult.getTitle()}`);
      debug && console.log(`[content.js][EvalResult][headings]: ${evaluationResult.headings.toJSON()}`);
      debug && console.log(`[content.js][EvalResult][ regions]: ${evaluationResult.landmarkRegions.toJSON()}`);
      debug && console.log(`[content.js][EvalResult][   links]: ${evaluationResult.links.toJSON()}`);

      sendResponse({title: evaluationResult.getTitle(),
                    headings: evaluationResult.headings.data,
                    regions: evaluationResult.landmarkRegions.data,
                    links: evaluationResult.links.data});
    }
    return true;
  }
);


