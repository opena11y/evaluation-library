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

function removeHighlightElements () {
  while (highlightElements[0]) {
    highlightElements.pop().remove();
  }
}

function isZeroDimension (rect) {
  return rect.height === 0 && rect.width === 0;
}

// Some elements have zero height and width, so use their child element
// sizes to determine dimensions

function getPositionAndDimensions (elem, posElem, posValue='static') {
  let rect = elem.getBoundingClientRect();
  let posRect = posElem ?
                posElem.getBoundingClientRect() :
                new DOMRect(0,0,0,0);

  const elemRect = {
    top:    rect.top,
    left:   rect.left,
    bottom: rect.bottom,
    right:  rect.right,
    height: rect.height,
    width:  rect.width
  };

  if (isZeroDimension(rect)) {
    let childElem = elem.firstElementChild;
    while (childElem) {
      const r = childElem.getBoundingClientRect();

      if (!isZeroDimension(r)) {
        elemRect.top    = Math.min(r.top,    elemRect.top);
        elemRect.right  = Math.max(r.right,  elemRect.right);
        elemRect.bottom = Math.max(r.bottom, elemRect.bottom);
        elemRect.left   = Math.min(r.left,   elemRect.left);
      }

      childElem = childElem.nextElementSibling;
    }

    elemRect.height = elemRect.bottom - elemRect.top;
    elemRect.width  = elemRect.right  - elemRect.left;
  }

  console.log(`\n[getPositionAndDimensions][${elem.tagName}][ accName]: ${elem.textContent} (${posValue})`);
  console.log(`[getPositionAndDimensions][ initial][elemRect][A] Top: ${elemRect.top} Left: ${elemRect.left} Bottom: ${elemRect.bottom} Right: ${elemRect.right}`);
  if (!isZeroDimension(elemRect)) {
    switch (posValue) {
      case 'absolute':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        console.log(`[getPositionAndDimensions][absolute][ posRect][B] Top: ${posRect.top} Left: ${posRect.left} Bottom: ${posRect.bottom} Right: ${posRect.right}`);
        break;

      case 'fixed':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        console.log(`[getPositionAndDimensions][   fixed][ posRect][B] Top: ${posRect.top} Left: ${posRect.left} Bottom: ${posRect.bottom} Right: ${posRect.right}`);
        break;

      case 'overflow':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        console.log(`[getPositionAndDimensions][overflow][ posRect][B] Top: ${posRect.top} Left: ${posRect.left} Bottom: ${posRect.bottom} Right: ${posRect.right}`);
        break;

      case 'static':
        elemRect.top   = elemRect.top  + window.scrollY;
        elemRect.left  = elemRect.left + window.scrollX;
        console.log(`[getPositionAndDimensions][scrollY]: ${window.scrollY} [scrollX]: ${scrollX}`);
        break;

      case 'sticky':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        console.log(`[getPositionAndDimensions][  sticky][ posRect][B] Top: ${posRect.top} Left: ${posRect.left} Bottom: ${posRect.bottom} Right: ${posRect.right}`);
        break;

    }

    elemRect.bottom  = elemRect.top  + elemRect.height;
    elemRect.right   = elemRect.left + elemRect.width;
  }

  console.log(`[getPositionAndDimensions][rendered][elemRect][C] Top: ${elemRect.top} Left: ${elemRect.left} Bottom: ${elemRect.bottom} Right: ${elemRect.right}`);
  return elemRect;
}

// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Highlight selected and/or all elements on a page
    if(request.highlightItems) {

      removeHighlightElements();

//      const selectedItem = request.highlightItems.selectedItem;
      const allItems     = request.highlightItems.allItems;

      debug && console.log(`[items][count]: ${request.highlightItems.allItems}`);

      allItems.forEach( (item) => {

        debug && console.log(`[item][${item.position}][role: ${item.role}][name: ${item.name}][src: ${item.namesrc}] (${item.msgHidden})`);

        const info = `${item.role}: ${item.name} (${item.namesrc})`;

        const de = evaluationResult.getDomElementByPosition(item.position);

        if (de) {
          const pe = de.parentInfo.positionDomElement;
          const rect = getPositionAndDimensions(de.node, pe.node, pe.colorContrast.positionValue);

          const he = document.createElement(HIGHLIGHT_ELEMENT_NAME);
          highlightElements.push(he);
          pe.node.appendChild(he);

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
      removeHighlightElements();
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

    // Update heading, region and link information
    if(request.runEvaluation) {
      debug && console.log(`[runEvaluation]`);
      removeHighlightElements();
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
  browserRuntime.sendMessage({ ['h2l-sidepanel-open']: true })
    .then((msgRes) => {
      if (msgRes !== true && openFlag) {
        openFlag = false;
      }
    })
    .catch( () => {
      removeHighlightElements();
      openFlag = true;
  });
}, 50);

