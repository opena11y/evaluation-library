/* opena11y-for-h2l.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants and variables
const debug = true;

const HIGHLIGHT_ELEMENT_NAME = 'opena11y-h2l-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();

let evaluationResult = false;

import {
  getOptions
} from '../../../h2l-sidepanel/src/js/storage.js';

// Load element highlight custom element

debug && console.log(`[content.js]: loading...`);
// Imports


const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-h2l-highlight';
scriptNode.src = browserRuntime.getURL('h2l-highlight.js');
document.body.appendChild(scriptNode);

// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Highlight selected and/or all elements on a page
    if(request.highlightItems) {

      let he;

      const selectedItem = request.highlightItems.selectedItem;
      const allItems     = request.highlightItems.allItems;

      debug && console.log(`[selectedItem]: ${selectedItem}`);
      debug && console.log(`[allItems]: ${allItems}`);

      if (selectedItem && selectedItem.position) {

        debug && console.log(`[selectedItem][${selectedItem.type}]: ${selectedItem.position} (${selectedItem.info})`);

        const de = evaluationResult.getDomElementByPosition(selectedItem.position);
        if (de) {
          const rect = de.node.getBoundingClientRect();

          let hes = Array.from(document.querySelectorAll(HIGHLIGHT_ELEMENT_NAME));

          hes.forEach( (he) => {
            he.removeAttribute('selected');
          });

          if (hes.length === 0) {
            he = document.createElement(HIGHLIGHT_ELEMENT_NAME);
            const contentElem = document.body ?
                        document.body :
                        document.documentElement;

            contentElem.appendChild(he);
          }
          else {
            he = hes[0];
          }

          if (he) {
            getOptions().then( (options) => {
              let attrValue = `${selectedItem.type};${Math.round(rect.left)};${Math.round(rect.top)};${Math.round(rect.width)};${Math.round(rect.height)}`;
              attrValue += selectedItem.info ?
                           `;${selectedItem.info}` :
                           ``;
              he.setAttribute('highlight', attrValue);

              const highlightConfig = `${options.highlightSize};${options.highlightStyleSelected}`;
              he.setAttribute('highlight-config', highlightConfig);
              he.setAttribute('position', selectedItem.position);
            });
          }
        }
      }
    }

    // Remove highlights
    if(request.removeHighlight) {
      const hes = Array.from(document.querySelectorAll(HIGHLIGHT_ELEMENT_NAME));
      debug && console.log(`[removeHighlight]: ${hes.length}`);
      hes.forEach( (he) => {
        he.remove();
      });
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      getOptions().then( (options) => {
        const hes = Array.from(document.querySelectorAll(HIGHLIGHT_ELEMENT_NAME));
        hes.forEach( (he) => {
          const highlightConfig = he.hasAttribute('selected') ?
                                  `${options.highlightSize};${options.highlightStyleSelected}` :
                                  `${options.highlightSize};${options.highlightStyle}`;
           he.setAttribute('highlight-config', highlightConfig);
        });
      });
    }

    // Focus elements
    if(request.focusPosition) {
      debug && console.log(`[focusPosition]: ${request.focusPosition}`);
    }

    // Update heading, region and link information
    if(request.runEvaluation) {
      debug && console.log(`[runEvaluation]`);
      const doc = window.document;
      evaluationResult  = evaluationLibrary.evaluateWCAG(doc,
                                doc.title,
                                doc.location.href,
                                '',
                                '',
                                '',
                                '',
                                false);

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
      const hes = Array.from(document.querySelectorAll(HIGHLIGHT_ELEMENT_NAME));
      hes.forEach( (he) => {
        he.remove();
      });
      openFlag = true;
  });
}, 50);

