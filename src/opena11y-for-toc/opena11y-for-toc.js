/* opena11y-for-toc.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Contsants
const debug = true;

const HIGHLIGHT_ELEMENT_NAME = 'opena11y-highlight-element';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let evaluationResult;

debug && console.log(`[content.js]: loading...`);

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-opena11y-element-highlight';
scriptNode.src = browserRuntime.getURL('highlightElement.js');
document.body.appendChild(scriptNode);



// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    debug && console.log(sender.tab ?
                "[content.js]: from a content script:" + sender.tab.url :
                "[content.js]: from the extension");

    debug && console.log(`[content.js][request][runEvaluation    ]: ${request.runEvaluation}`);
    debug && console.log(`[content.js][request][highlightPosition]: ${request.highlightPosition}`);

    // Highlight elements
    if(request.highlightPosition) {
      debug && console.log(`[content.js][highlightElement]: ${request.highlightPosition}`);

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      debug && console.log(`[content.js][he]: ${he}`);

      if (he) {
        he.setAttribute('highlight-attr', 'data-opena11y-id');
        he.setAttribute('highlight-value', request.highlightPosition);
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


