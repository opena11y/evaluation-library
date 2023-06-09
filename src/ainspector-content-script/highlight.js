/*
*   highlight.js
*   Code is based on highlight.js module developed by
*   Nicholas Hoyt for page structure extension
*/

import {RESULT_VALUE} from '../constants.js'
import DebugLogging from '../debug.js';
import {computeCCR} from '../cache/colorContrast.js';

export { addHighlightStyle, highlightElements, clearHighlights };

const debug = new DebugLogging('highlight', false);
debug.flag = false;

const dataAttrResult     = 'data-ai-result';
const dataAttrSelected   = 'data-ai-selected';
const highlightClass     = 'ainspector-highlight';
const styleName          = 'ainspector-styles';

const violationColor   = 'hsl(0, 100%, 50%)';
const warningColor     = 'hsl(49, 100%, 50%)';
const passColor        = 'hsl(90, 67%, 40%)';
const manualCheckColor = 'hsl(198, 52%, 45%);';
const selectedColorDark   = '333333';
const selectedColorLight  = 'dddddd';

const violationId   = 'v';
const warningId     = 'w';
const passId        = 'p';
const manualCheckId = 'mc';

const selectedDark  = 'dark';
const selectedLight = 'light';
const selectedClose = '-close';

const minWidth = 68;
const minHeight = 27;
const offset = 5;
const radius = 3;

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
    font-size: 0.9em;
    font-weight: bold;
    font-style: italic;
    position: absolute;
    overflow: visible;
    top: 3px;
    right: 0;
    padding-right: 3px
    z-index: 20000;
  }

  .${highlightClass}[${dataAttrResult}=${manualCheckId}] {
    box-shadow: inset 0 0 0 3px ${manualCheckColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrResult}=${manualCheckId}]:after {
    content: 'MC';
    background-color: ${manualCheckColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrResult}=${passId}] {
    box-shadow: inset 0 0 0 3px ${passColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrResult}=${passId}]:after {
    content: 'P';
    background-color: ${passColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrResult}=${violationId}] {
    box-shadow: inset 0 0 0 3px ${violationColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrResult}=${violationId}]:after {
    content: 'V';
    background-color: ${violationColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrResult}=${warningId}] {
    box-shadow: inset 0 0 0 3px ${warningColor}, inset 0 0 0 5px white;
  }
  .${highlightClass}[${dataAttrResult}=${warningId}]:after {
    content: 'W';
    background-color: ${warningColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}[${dataAttrSelected}=${selectedLight}] {
    outline: 3px dashed #${selectedColorLight};
    outline-offset: 3px;
  }

  .${highlightClass}[${dataAttrSelected}=${selectedDark}] {
    outline: 3px dashed #${selectedColorDark};
    outline-offset: 3px;
  }

  .${highlightClass}[${dataAttrSelected}=${selectedLight}${selectedClose}] {
    outline: 3px dashed #${selectedColorLight};
    outline-offset: 1px;
  }

  .${highlightClass}[${dataAttrSelected}=${selectedDark}${selectedClose}] {
    outline: 3px dashed #${selectedColorDark};
    outline-offset: 1px;
  }

</style>
`;

// Add highlighting stylesheet to document if not already there
function addHighlightStyle () {
  if (document.querySelector(`style[title="${styleName}"]`) === null) {
    document.body.appendChild(styleTemplate.content.cloneNode(true));
    if (debug.flag) {debug.log(`Added style element (${styleName}) to document`); }
  }
}

/*
 *  @function  highlightElements
 *
 *  @desc  Iterates the current element results in the sidebar
 *         and highlights the positions of each element result
 *         based on the result value, the currently selected
 *         element result is receives an additional highlight border
 *
 *  @param  {Object}  allResuls  -  Array of results shown in the sidebar
 *  @param  {String}  option     -  Page highlighting option
 *  @param  {String}  position   -  The ordinal position of the selected
 *                                  element result
 */

function highlightElements (allResults, option, position) {
  let count = 0;
  clearHighlights();
  allResults.forEach( r => {
    if (r.isElementResult) {
      const resultValue = r.getResultValue();
      const node = r.getNode();
      // Use backgroung colors from parent element for styling selected element
      const parentDomElement = r.domElement.parentDomElement;
      const cc = parentDomElement ?
                 parentDomElement.colorContrast :
                 r.domElement.colorContrast;

      if (option === 'selected') {
        if (r.getOrdinalPosition() === parseInt(position)) {
          highlightElement(node, resultValue);
          count += 1;
        }
      }
      else {
        if (option === 'all') {
          highlightElement(node, resultValue);
          count += 1;
        }
        else {
          if ((option === 'vw') &&
              ((resultValue === RESULT_VALUE.VIOLATION) ||
               (resultValue === RESULT_VALUE.WARNING))) {
            highlightElement(node, resultValue);
            count += 1;
          }
        }
      }

      // Highlight selected element
      if ((option !== 'selected') &&
          (r.getOrdinalPosition() === parseInt(position))) {
        // use the best contrast color for the outline of the selection
        const ccr1 = computeCCR(selectedColorDark, cc.backgroundColorHex);
        const ccr2 = computeCCR(selectedColorLight, cc.backgroundColorHex);
        if (ccr1 > ccr2) {
          highlightSelected(node, selectedDark, option);
        }
        else {
          highlightSelected(node, selectedLight, option);
        }
      }
    }
  });
  return count;
}

/*
 *  @function  highlightSelected
 *
 *  @desc  Create an overlay element that appears as a highlighted border
 *         around element to visually identifying the selected element in the
 *         sidebar.
 *
 *  @param  {Object}  element  -  DOM element node to highlight
 *  @param  {String}  style    -  CSS selector for light or dark border
 *  @param  {String}  style    -  The page highlighting option
 */
function highlightSelected (element, style, option) {

  if (element === null) {
    console.warn(`Unable highlight selected element`);
    return;
  }

  const selectedStyle = (option === 'none') ? (style+selectedClose) : style;

  const div = getOverlayElement(element);
  div.setAttribute(`${dataAttrSelected}`, selectedStyle);
  document.body.appendChild(div);
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/*
 *  @function  highlightElement
 *
 *  @desc  Create an overlay element that appears as a highlighted border
 *         around element to visually identifying it's location and the
 *         result value (e.h. pass, violation, etc.).
 *
 *  @param  {Object}  element     -  DOM element node to highlight
 *  @param  {Number}  resultValue -  Used to determine the styling and icon
 */
function highlightElement (element, resultValue) {

  if (element === null) {
    console.warn(`Unable highlight element with "${resultValue}" result value`);
    return;
  }

  const div = getOverlayElement(element);

  switch (resultValue) {
    case RESULT_VALUE.MANUAL_CHECK:
      div.setAttribute(dataAttrResult, manualCheckId);
      break;

    case RESULT_VALUE.PASS:
      div.setAttribute(dataAttrResult, passId);
      break;

    case RESULT_VALUE.VIOLATION:
      div.setAttribute(dataAttrResult, violationId);
      break;

    case RESULT_VALUE.WARNING:
      div.setAttribute(dataAttrResult, warningId);
      break;

    case 'selected-light':
    case 'selected-dark':
      div.setAttribute(dataAttrResult, resultValue);
      break;

    default:
      break;
  }

  document.body.appendChild(div);
}

/*
 *  @function  getOverlayElement
 *
 *  @desc  Create an overlay element and set its position on the page.
 *
 *  @param  {Object}  element  -  DOM element node to highlight
 *
 *  @returns {Object} DOM node element used for the Overlay
 */

function getOverlayElement (element) {

  const rect = element.getBoundingClientRect();
  const overlayElem = document.createElement('div');

  overlayElem.setAttribute('class', highlightClass);
  overlayElem.style.setProperty('border-radius', radius + 'px');

  overlayElem.style.left   = Math.round(rect.left - offset + window.scrollX) + 'px';
  overlayElem.style.top    = Math.round(rect.top  - offset + window.scrollY) + 'px';

  overlayElem.style.width  = Math.max(rect.width  + offset * 2, minWidth)  + 'px';
  overlayElem.style.height = Math.max(rect.height + offset * 2, minHeight) + 'px';

  return overlayElem;
}

/*
*   clearHighlights: Utilize 'highlightClass' to remove highlight overlays created
*   by previous calls to 'addHighlightBox'.
*/

/*
 *  @function  clearHighlights
 *
 *  @desc  Utilize 'highlightClass' to remove highlight overlays created
 *   by previous calls to 'addHighlightBox'.
 */

function clearHighlights () {
  const selector = `div.${highlightClass}`;
  const elements = document.querySelectorAll(selector);
  for (let i = 0; i < elements.length; i += 1) {
    document.body.removeChild(elements[i]);
  }
}

