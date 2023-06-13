/*
*   highlight.js
*/

import {RESULT_VALUE} from '../constants.js'
import DebugLogging from '../debug.js';

export { addHighlightStyle, highlightResults, clearHighlights };

const debug = new DebugLogging('highlight', false);
debug.flag = true;

const dataAttrName     = 'data-ainspector';
const highlightClass   = 'ainspector-highlight';
const styleName        = 'ainspector-styles';
const violationColor   = 'red';
const warningColor     = 'yellow';
const passColor        = 'blue';
const manualCheckColor = 'gray';

const styleTemplate = document.createElement('template');
styleTemplate.innerHTML = `
<style title="${styleName}">
  .${highlightClass} {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 10000;
  }
  .${highlightClass}:after {
    color: white;
    font-family: sans-serif;
    font-size: 1.2em;
    font-weight: bold;
    position: absolute;
    overflow: visible;
    top: 3px;
    right: 0;
    z-index: 20000;
  }
  .${highlightClass}[${dataAttrName}=violation] {
    box-shadow: inset 0 0 0 3px ${violationColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrName}=violation]:after {
    content: 'V';
    background-color: ${violationColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrName}=warning] {
    box-shadow: inset 0 0 0 3px ${warningColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrName}=warning]:after {
    content: 'W';
    background-color: ${warningColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrName}=pass] {
    box-shadow: inset 0 0 0 3px ${passColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrName}=pass]:after {
    content: 'P';
    background-color: ${passColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrName}=mc] {
    box-shadow: inset 0 0 0 3px ${manualCheckColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrName}=mc]:after {
    content: 'P';
    background-color: ${manualCheckColor};
    padding: 2px 7px 2px 8px;
  }
</style>
`;

// Add highlighting stylesheet to document if not already there
function addHighlightStyle () {
  if (document.querySelector(`style[title="${styleName}"]`) === null) {
    document.body.appendChild(styleTemplate.content.cloneNode(true));
    if (debug) { console.debug(`Added style element (${styleName}) to document`); }
  }
}

function highlightResults (elementResults, option, position) {

  clearHighlights();

  let highlightedElementCount = 0;

  if (!elementResults || !elementResults.length) {
    return highlightedElementCount;
  }

  switch (option) {
    case 'all':
    case 'vw':
      elementResults.forEach( er => {
        if (er.isElementResult) {

          const resultValue = er.getResultValue();

          switch (er.getResultValue()) {
            case RESULT_VALUE.VIOLATION:
            case RESULT_VALUE.WARNING:
              highlightElement(er.getNode(), resultValue);
              highlightedElementCount += 1;
              break;

            case RESULT_VALUE.PASS:
            case RESULT_VALUE.MANUAL_CHECK:
              if (option === 'all') {
                highlightElement(er.getNode(), resultValue);
                highlightedElementCount += 1;
              }
              break;

            default:
              break;
          }
        }
      });
      break;

    case 'selected':
      elementResults.forEach( er => {
        if (er.isElementResult) {
          if (er.getOrdinalPosition() === position) {
            highlightElement(er.getNode(), er.resultValue());
            highlightedElementCount += 1;
          }
        }
      });
      break;
  }

  return highlightedElementCount;
}

function highlightElement (element, resultValue) {

  debug.flag && debug.log(`highlightElement: ${dataAttrName}="${resultValue}"`);
  if (element === null) {
    console.warn(`Unable highlight element with attribute: ${dataAttrName}="${resultValue}"`);
    return;
  }

  const elementInfo = { element: element, resultValue: resultValue };
  addHighlightBox(elementInfo);
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/*
*   clearHighlights: Utilize 'highlightClass' to remove highlight overlays created
*   by previous calls to 'addHighlightBox'.
*/

function clearHighlights () {
  const selector = `div.${highlightClass}`;
  const elements = document.querySelectorAll(selector);
  Array.prototype.forEach.call(elements, function (element) {
    document.body.removeChild(element);
  });
}

/*
*   addHighlightBox: Clear previous highlighting and add highlight border box
*   to specified element.
*/
function addHighlightBox (elementInfo) {
  const { element, resultValue } = elementInfo;
  if (element) {
    const boundingRect = element.getBoundingClientRect();
    const overlayDiv = createOverlay(boundingRect, resultValue);
    document.body.appendChild(overlayDiv);
  }
}

/*
*   createOverlay: Use bounding client rectangle and offsets to create an element
*   that appears as a highlighted border around element corresponding to 'rect'.
*/
function createOverlay (rect, resultValue) {

  const minWidth = 68, minHeight = 27;
  const offset = 5;
  const radius = 3;

  const div = document.createElement('div');
  div.setAttribute('class', highlightClass);
  div.setAttribute(dataAttrName, resultValue);
  div.style.setProperty('border-radius', radius + 'px');

  div.style.left   = Math.round(rect.left - offset + window.scrollX) + 'px';
  div.style.top    = Math.round(rect.top  - offset + window.scrollY) + 'px';

  div.style.width  = Math.max(rect.width  + offset * 2, minWidth)  + 'px';
  div.style.height = Math.max(rect.height + offset * 2, minHeight) + 'px';

  return div;
}


