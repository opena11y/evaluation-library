/* content.js (generated file)*/

/* Copyright 2025 */

import EvaluationLibrary from '../evaluationLibrary.js';

const debug = true;

debug && console.log(`[content.js]: loading...`);

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

debug && console.log(`[content.js][browserRuntime]: ${browserRuntime}`);

browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    debug && console.log(sender.tab ?
                "[content.js]: from a content script:" + sender.tab.url :
                "[content.js]: from the extension");

    debug && console.log(`[content.js][request]: ${request.greeting}`);

    const doc = window.document;
    const evaluationLibrary = new EvaluationLibrary();
    const evaluationResult  = evaluationLibrary.evaluateWCAG(doc,
                              doc.title,
                              doc.location.href,
                              '',
                              '',
                              '',
                              '',
                              true);

    debug && console.log(`[content.js][EvalResult][title]: ${evaluationResult.getTitle()}`);
    debug && console.log(`[content.js][EvalResult][headings]: ${evaluationResult.headings.toJSON()}`);
    debug && console.log(`[content.js][EvalResult][ regions]: ${evaluationResult.landmarkRegions.toJSON()}`);
    debug && console.log(`[content.js][EvalResult][   links]: ${evaluationResult.links.toJSON()}`);

    if(request.greeting) {
      sendResponse({title: evaluationResult.getTitle(),
                    headings: evaluationResult.headings.data,
                    regions: evaluationResult.landmarkRegions.data,
                    links: evaluationResult.links.data});
    }
    return true;
  }
);
