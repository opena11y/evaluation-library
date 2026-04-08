/* opena11y-for-h2l.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants and variables
const debug = false;

const HIGHLIGHT_ELEMENT_NAME = 'opena11y-h2l-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();

let evaluationResult = false;

const highlightElements = [];

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-h2l-highlight';
scriptNode.src = browserRuntime.getURL('h2l-highlight.js');
document.body.appendChild(scriptNode);


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

  if (!isZeroDimension(elemRect)) {
    switch (posValue) {
      case 'absolute':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        break;

      case 'fixed':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        break;

      case 'overflow':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        break;

      case 'static':
        elemRect.top   = elemRect.top  + window.scrollY;
        elemRect.left  = elemRect.left + window.scrollX;
        break;

      case 'sticky':
        elemRect.top   = elemRect.top  - posRect.top;
        elemRect.left  = elemRect.left - posRect.left;
        break;

    }

    elemRect.bottom  = elemRect.top  + elemRect.height;
    elemRect.right   = elemRect.left + elemRect.width;
  }
  return elemRect;
}

function highlightItems(dataObj) {

  function highlightPosition(position, elemRole, selected, showName) {

    const de = evaluationResult.getDomElementByPosition(position);

    if (de) {

      const pe = de.parentInfo.positionDomElement;
      const rect = getPositionAndDimensions(de.node, pe.node, pe.colorContrast.positionValue);

      const he = document.createElement(HIGHLIGHT_ELEMENT_NAME);

      const highlightConfig = selected ?
                            `${highlightSize};${highlightStyleSelected}` :
                            `${highlightSize};${highlightStyle}`;
      he.setAttribute('highlight-config', highlightConfig);

      highlightElements.push(he);
      pe.node.appendChild(he);

      he.setAttribute('position', position);

      he.setAttribute('elem-role',    elemRole);
      he.setAttribute('name',         de.accName.name);
      he.setAttribute('name-src',     de.accName.source);
      he.setAttribute('name-has-alt', de.accName.includesAlt || de.accName.includesAriaLabel);
      he.setAttribute('desc',         de.accDescription.name);
      he.setAttribute('desc-src',     de.accDescription.source);
      he.setAttribute('z-index',      de.visibility.zIndex);
      he.setAttribute('msg-hidden',   msgHidden);
      he.setAttribute('show-name',    showName);
      he.setAttribute('selected',     selected);

      let attrValue = `${Math.round(rect.left)}`;
      attrValue += `;${Math.round(rect.top)}`;
      attrValue += `;${Math.round(rect.width)}`;
      attrValue += `;${Math.round(rect.height)}`;
      attrValue += `;${selected ? scrollBehavior : 'none'}`;

      he.setAttribute('highlight', attrValue);
    }
  }

  const selectedItem           = dataObj.selectedItem;
  const allItems               = dataObj.allItems;
  const highlightSize          = dataObj.highlightSize;
  const highlightStyle         = dataObj.highlightStyle;
  const highlightStyleSelected = dataObj.highlightStyleSelected;
  const msgHidden              = dataObj.msgHidden;
  const scrollBehavior         = dataObj.scrollBehavior;
  const showName               = dataObj.showName;

  removeHighlightElements();

  if (allItems.length) {
    allItems.forEach( (item) => {
      const selected = item.position == selectedItem.position;
      highlightPosition(item.position, item.elemRole, selected, showName || selected);
    });
  }
  else {
    highlightPosition(selectedItem.position, selectedItem.elemRole, true, showName);
  }


}

// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Highlight selected and/or all elements on a page
    if(request.highlightItems) {
      debug && console.log(`[highlightItems]`);
      highlightItems(request.highlightItems);
    }

    // Remove highlights
    if(request.removeHighlight) {
      debug && console.log(`[removeHighlight]`);
      removeHighlightElements();
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      const config= request.updateHighlightConfig;

      highlightElements.forEach( (he) => {
        const highlightConfig = he.hasAttribute('selected') ?
                                `${config.highlightSize};${config.highlightStyleSelected}` :
                                `${config.highlightSize};${config.highlightStyle}`;
         he.setAttribute('highlight-config', highlightConfig);
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

