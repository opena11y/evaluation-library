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

const highlightElements = [];

// Helper functions

function isZeroDimension (rect) {
  return rect.height === 0 && rect.width === 0;
}

// Some elements have zero height and width, so use their child element
// sizes to determine dimensions

function getPositionAndDimensions (elem) {
  let rect = elem.getBoundingClientRect();

  const elemRect = {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
  };

  if (isZeroDimension(rect)) {
    let childElem = elem.firstElementChild;
    while (childElem) {
      const r = childElem.getBoundingClientRect();

      if (!isZeroDimension(r)) {
        elemRect.top    = Math.min(r.top,   elemRect.top);
        elemRect.right  = Math.max(r.right, elemRect.right);
        elemRect.bottom = Math.max(r.right, elemRect.bottom);
        elemRect.left   = Math.min(r.left,  elemRect.left);
      }

      childElem = childElem.nextElementSibling;
    }
  }
  elemRect.width  = elemRect.right  - elemRect.left;
  elemRect.height = elemRect.bottom - elemRect.top;
  console.log(`[getPositionAndDimensions][${elem.tagName}]: ${elem.textContent}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][ scrollTop]: ${elemRect.top} ${rect.top}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][scrollLeft]: ${elemRect.left} ${rect.left}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][       top]: ${elemRect.top} ${rect.top}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][      left]: ${elemRect.left} ${rect.left}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][    height]: ${elemRect.height} ${rect.height}`);
  console.log(`[getPositionAndDimensions][${elem.tagName}][     width]: ${elemRect.width} ${rect.width}`);
  return elemRect;
}

// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Highlight selected and/or all elements on a page
    if(request.highlightItems) {

//      const selectedItem = request.highlightItems.selectedItem;
      const allItems     = request.highlightItems.allItems;

      while (highlightElements.length) {
        highlightElements.pop().remove();
      }

      allItems.forEach( (item) => {

        debug && console.log(`[item][${item.position}][role: ${item.role}][name: ${item.name}][src: ${item.namesrc}] (${item.msgHidden})`);

        const info = `${item.role}: ${item.name} (${item.namesrc})`;

        const de = evaluationResult.getDomElementByPosition(item.position);
        if (de) {
          const rect = getPositionAndDimensions(de.node);

          const he = document.createElement(HIGHLIGHT_ELEMENT_NAME);
          highlightElements.push(he);
          de.node.appendChild(he);

          let attrValue = `${Math.round(rect.left)};${Math.round(rect.top)};${Math.round(rect.width)};${Math.round(rect.height)}`;
          attrValue += info ?
                       `;${info}` :
                       `;`;
          attrValue += item.msgHidden ?
                       `;${item.msgHidden}` :
                       `;`;

          attrValue += `;none`;

          he.setAttribute('highlight', attrValue);

          he.setAttribute('position', item.position);

        }
      });

    }

    // Remove highlights
    if(request.removeHighlight) {
      while (highlightElements.length) {
        highlightElements.pop().remove();
      }
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      getOptions().then( (options) => {
        highlightElements.forEach( (he) => {
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
      while (highlightElements.length) {
        highlightElements.pop().remove();
      }
      openFlag = true;
  });
}, 50);

