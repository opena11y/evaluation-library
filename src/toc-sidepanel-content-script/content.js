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
    const evaluationResult  = evaluationLibrary.evaluateWCAG(doc, doc.title, doc.location.href);

    debug && console.log(`[content.js][EvalResult][title]: ${evaluationResult.getTitle()}`);

    const headingNodes = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    const headingInfo = [];

    headingNodes.forEach( (h) => {
      console.log(`[heading][${h.tagName}]: ${h.textContent}`);

      const tag = h.tagName;
      const txt = h.textContent.trim();
      headingInfo.push({
        tagName: tag,
        name: txt
      });
    });

    const regionNodes = Array.from(
      document.querySelectorAll(`
        aside,
        body > footer,
        body > header,
        form,
        main,
        nav,
        search,
        section[aria-label],
        section[aria-labelledby]
      `));

    const regionInfo = [];

    regionNodes.forEach( (r) => {
      debug && console.log(`[region][${r.tagName}]`);

      const tag = r.tagName.toLowerCase();
      regionInfo.push({
        tagName: tag
      });
    });

    if(request.greeting) {
      sendResponse({headings: headingInfo, regions: regionInfo});
    }
    return true;
  }
);
