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

const scriptElem = document.createElement('script');
scriptElem.type  = 'text/javascript';
scriptElem.id    = 'id-h2l-highlight';
scriptElem.src   = browserRuntime.getURL('h2l-highlight.js');
document.body.appendChild(scriptElem);


// Helper functions

/*
 *   @function removeHighlightElements
 *
 *   @desc  Removes highlight elements from web page
 *
 *   @param {Boolean} flag : If true leave last highlight element
 */

function removeHighlightElements (flag=false) {
  while (highlightElements[flag ? 1 : 0]) {
    const firstElem = highlightElements.shift();
    firstElem.remove();
  }
}

/*
 *   @function isZeroDimension
 *
 *   @desc  Returns true if element is not visible
 *
 *   @param {Object} rect : Rect of element to test height
 *
 *   @returns see @desc
 */

function isZeroDimension (rect) {
  return rect.height === 0 && rect.width === 0;
}

/*
 *   @function isElementInViewport
 *
 *   @desc  Returns true if element is already visible in view port,
 *          otherwise false
 *
 *   @param {Object} rect : Rect of element to highlight
 *
 *   @returns see @desc
 */

function isElementInViewport(rect) {
  return (
    rect.top >= window.screenY &&
    rect.left >= window.screenX &&
    rect.bottom <= ((window.screenY + window.innerHeight) ||
                    (window.screenY + document.documentElement.clientHeight)) &&
    rect.right <= ((window.screenX + window.innerWidth) ||
                   (window.screenX + document.documentElement.clientWidth)));
}

/*
 *   @function isElementStartInViewport
 *
 *   @desc  Returns true if start of the element is already visible in view port,
 *          otherwise false
 *
 *   @param {Object} rect : Rect of element to highlight
 *
 *   @returns see @desc
 */

function isElementStartInViewport(rect) {
  return (
      rect.top >= window.screenY &&
      rect.top <= ((window.screenY + window.innerHeight) ||
                   (window.screenY + document.documentElement.clientHeight)) &&
      rect.left >= window.screenX &&
      rect.left <= ((window.screenX + window.innerWidth) ||
                   (window.screenX + document.documentElement.clientWidth)));
}

/*
 *   @function isElementHeightLarge
 *
 *   @desc  Returns true if element client height is larger than clientHeight,
 *          otheriwse false
 *
 *   @param {Object} rect : Bounding rect of element to highlight
 *
 *   @returns see @desc
 */

function isElementInHeightLarge(rect) {
  return (1.2 * rect.height) > (window.innerHeight || document.documentElement.clientHeight);
}

// Main functions

function highlightItems(dataObj) {

  function getRect (elem) {
    let rect = elem.getBoundingClientRect();
    if (isZeroDimension(rect)) {
      rect = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        height: 0,
        width: 0
      };
      let childElem = elem.firstElementChild;
      while (childElem) {
        const r = childElem.getBoundingClientRect();

        if (!isZeroDimension(r)) {
          rect.top    = Math.min(r.top,    rect.top);
          rect.right  = Math.max(r.right,  rect.right);
          rect.bottom = Math.max(r.bottom, rect.bottom);
          rect.left   = Math.min(r.left,   rect.left);
        }

        childElem = childElem.nextElementSibling;
      }

      rect.height = rect.bottom - rect.top;
      rect.width  = rect.right  - rect.left;
    }
    return rect;
  } /* end getRect */


  function highlightPosition(domPos, elemRole, selected, showName) {

    const de = evaluationResult.getDomElementByPosition(domPos);

    if (de && de.parentInfo && de.parentInfo.document) {

      const rect = getRect(de.node);

      const he = document.createElement(HIGHLIGHT_ELEMENT_NAME);

      const docElem = de.parentInfo.document ?
                      de.parentInfo.document :
                      window.document;

      const attachElem = docElem.body ?
                         docElem.body :
                         docElem.documentElement;

      if (attachElem && attachElem.appendChild) {
        // Append the highlight element to the document object that contains the DOM element
        attachElem.appendChild(he);
        highlightElements.push(he);

        const highlightConfig = selected ?
                              `${highlightSize};${highlightStyleSelected}` :
                              `${highlightSize};${highlightStyle}`;
        he.setAttribute('highlight-config', highlightConfig);


        he.setAttribute('position', domPos);

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
        attrValue += `;${de.colorContrast ? de.colorContrast.positionValue : 'static'}`;

        he.setAttribute('highlight', attrValue);
      }

    }
  } /* end highlightPosition */

  const selectedItem           = dataObj.selectedItem;
  const allItems               = dataObj.allItems;
  const highlightSize          = dataObj.highlightSize;
  const highlightStyle         = dataObj.highlightStyle;
  const highlightStyleSelected = dataObj.highlightStyleSelected;
  const msgHidden              = dataObj.msgHidden;
  const scrollBehavior         = dataObj.scrollBehavior;
  const showName               = dataObj.showName;

  // If there is a selected item and scrollto enabled
  const mediaQuery = window.matchMedia(`(prefers-reduced-motion: reduce)`);
  const isReduced = !mediaQuery || mediaQuery.matches;

  if (selectedItem.position && (scrollBehavior !== 'none') && !isReduced) {
    const de = evaluationResult.getDomElementByPosition(selectedItem.position);
    if (de && de.node) {
      const deRect = getRect(de.node);

      if (isElementInHeightLarge(deRect)) {
        if (!isElementStartInViewport(deRect)) {
          de.node.scrollIntoView({ behavior: scrollBehavior, block: 'start', inline: 'nearest' });
        }
      }
      else {
        if (!isElementInViewport(deRect)) {
          de.node.scrollIntoView({ behavior: scrollBehavior, block: 'center', inline: 'nearest' });
        }
      }
    }
  }

  if (allItems.length) {
    removeHighlightElements();
    allItems.forEach( (item) => {
      const selected = item.position == selectedItem.position;
      highlightPosition(item.position, item.elemRole, selected, showName || selected);
    });
  }
  else {
    if (selectedItem.position) {
      removeHighlightElements();
      highlightPosition(selectedItem.position, selectedItem.elemRole, true, showName);
    }
    else {
      removeHighlightElements(debug);
    }
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

