/*
*   highlight.js
*   Code is based on highlight.js module developed by
*   Nicholas Hoyt for page structure extension
*/

import {RESULT_VALUE} from '../constants.js'
import DebugLogging from '../debug.js';
import {computeCCR} from '../cache/colorContrast.js';

import {getCommonMessage} from '../locale/locale.js';


export { addHighlightStyle, highlightResults, clearHighlights };

const debug = new DebugLogging('highlight', false);
debug.flag = false;

const dataAttrResult    = 'data-ai-result';
const dataAttrSelected  = 'data-ai-selected';
const highlightClass    = 'ainspector-highlight';
const elementClass      = 'element';
const pageClass         = 'page';
const websiteClass      = 'website';
const styleName         = 'ainspector-styles';

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

const msg = {
  elementViolationLabel:   getCommonMessage('elementViolationLabel'),
  elementWarningLabel:     getCommonMessage('elementWarningLabel'),
  elementPassLabel:        getCommonMessage('elementPassLabel'),
  elementManualCheckLabel: getCommonMessage('elementManualCheckLabel'),

  pageViolationLabel:   getCommonMessage('pageViolationLabel'),
  pageWarningLabel:     getCommonMessage('pageWarningLabel'),
  pagePassLabel:        getCommonMessage('pagePassLabel'),
  pageManualCheckLabel: getCommonMessage('pageManualCheckLabel'),

  websiteViolationLabel:   getCommonMessage('websiteViolationLabel'),
  websiteWarningLabel:     getCommonMessage(' websiteWarningLabel'),
  websitePassLabel:        getCommonMessage('websitePassLabel'),
  websiteManualCheckLabel: getCommonMessage('websiteManualCheckLabel')

}


const selectedDark  = 'dark';
const selectedLight = 'light';
const selectedClose = '-close';

const minWidth = 68;
const minHeight = 27;
const offset = 5;
const radius = 3;

const styleTemplate = document.createElement('template');
styleTemplate.innerHTML = `
<style id="${styleName}">
  .${highlightClass} {
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    pointer-events: none;
    z-index: 10000;
  }

  .${highlightClass}:before,
  .${highlightClass}:after {
    color: white;
    font-family: sans-serif;
    font-size: 0.9em;
    font-weight: bold;
    position: absolute;
    overflow: visible;
    top: 3px;
  }

  .${highlightClass}:before {
    left: 0;
    padding-left: 3px
    z-index: 20000;
  }

  .${highlightClass}:after {
    right: 0;
    padding-right: 3px
    z-index: 20000;
  }

  .${highlightClass}[${dataAttrResult}=${manualCheckId}] {
    box-shadow: inset 0 0 0 3px ${manualCheckColor}, inset 0 0 0 5px white;
  }

  .${highlightClass}[${dataAttrResult}=${manualCheckId}]:before,
  .${highlightClass}[${dataAttrResult}=${manualCheckId}]:after {
    background-color: ${manualCheckColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}.${elementClass}[${dataAttrResult}=${manualCheckId}]:after {
    content: '${msg.elementManualCheckLabel}';
  }

  .${highlightClass}.${pageClass}[${dataAttrResult}=${manualCheckId}]:before {
    content: '${msg.pageManualCheckLabel}';
  }

  .${highlightClass}.${websiteClass}[${dataAttrResult}=${manualCheckId}]:before {
    content: '${msg.websiteManualCheckLabel}';
  }

  .${highlightClass}[${dataAttrResult}=${passId}] {
    box-shadow: inset 0 0 0 3px ${passColor}, inset 0 0 0 5px white;
  }

  .${highlightClass}[${dataAttrResult}=${passId}]:before,
  .${highlightClass}[${dataAttrResult}=${passId}]:after {
    background-color: ${passColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}.${elementClass}[${dataAttrResult}=${passId}]:after {
    content: '${msg.elementPassLabel}';
  }

  .${highlightClass}.${pageClass}[${dataAttrResult}=${passId}]:before {
    content: '${msg.pagePassLabel}';
  }

  .${highlightClass}.${websiteClass}[${dataAttrResult}=${passId}]:before {
    content: '${msg.websitePassLabel}';
  }

  .${highlightClass}[${dataAttrResult}=${violationId}] {
    box-shadow: inset 0 0 0 3px ${violationColor}, inset 0 0 0 5px white;
  }

  .${highlightClass}[${dataAttrResult}=${violationId}]:before,
  .${highlightClass}[${dataAttrResult}=${violationId}]:after {
    background-color: ${violationColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}.${elementClass}[${dataAttrResult}=${violationId}]:after {
    content: '${msg.elementViolationLabel}';
  }

  .${highlightClass}.${pageClass}[${dataAttrResult}=${violationId}]:before {
    content: '${msg.pageViolationLabel}';
  }

  .${highlightClass}.${websiteClass}[${dataAttrResult}=${violationId}]:before {
    content: '${msg.websiteViolationLabel}';
  }

  .${highlightClass}[${dataAttrResult}=${warningId}] {
    box-shadow: inset 0 0 0 3px ${warningColor}, inset 0 0 0 5px white;
  }

  .${highlightClass}[${dataAttrResult}=${warningId}]:before,
  .${highlightClass}[${dataAttrResult}=${warningId}]:after {
    background-color: ${warningColor};
    padding: 2px 7px 2px 8px;
  }

  .${highlightClass}.${elementClass}[${dataAttrResult}=${warningId}]:after {
    content: '${msg.elementWarningLabel}';
  }

  .${highlightClass}.${pageClass}[${dataAttrResult}=${warningId}]:before {
    content: '${msg.pageWarningLabel}';
  }

  .${highlightClass}.${websiteClass}[${dataAttrResult}=${warningId}]:before {
    content: '${msg.websiteWarningLabel}';
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
  if (document.querySelector(`style[id="${styleName}"]`) === null) {
    document.head.appendChild(styleTemplate.content.cloneNode(true));
    if (debug.flag) {debug.log(`Added style element (${styleName}) to document`); }
  }
}

/*
 *  @function  highlightResults
 *
 *  @desc  Iterates the current element, page and website results
 *         in the sidebar and highlights the positions of each element
 *         result based on the result value, the currently selected
 *         element result is receives an additional highlight border
 *
 *  @param  {Object}  allResuls  -  Array of results shown in the sidebar
 *  @param  {String}  option     -  Page highlighting option
 *  @param  {String}  resultId   -  Id of result object (e.g. elementResult,
 *                                  pageResult, websitePage)
 */

function highlightResults (allResults, option, resultId) {
  console.log(`[highlightResults][resultId]: ${resultId}`);
  let count = 0;
  clearHighlights();
  allResults.forEach( r => {
    const resultValue = r.getResultValue();
//    console.log(`[${r.getNode().tagName}][${r.getResultValue()}]: ${r.getResultId()}`);
    if (r.isElementResult) {
      const node = r.getNode();
      // Use background colors from parent element for styling selected element
      const parentDomElement = r.domElement.parentDomElement;
      const cc = parentDomElement ?
                 parentDomElement.colorContrast :
                 r.domElement.colorContrast;

      if (option === 'selected') {
        if (r.getResultId() === resultId) {
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
               (resultValue === RESULT_VALUE.WARNING) ||
               (r.getResultId() === resultId))) {
            highlightElement(node, resultValue);
            count += 1;
          }
        }
      }

      // Highlight selected element
      if (r.getResultId() === resultId) {
        // use the best contrast color for the outline of the selection
        const ccr1 = computeCCR(selectedColorDark, cc.backgroundColorHex);
        const ccr2 = computeCCR(selectedColorLight, cc.backgroundColorHex);
        if (ccr1 > ccr2) {
          highlightSelectedElement(node, selectedDark, option);
        }
        else {
          highlightSelectedElement(node, selectedLight, option);
        }
      }
    }
    else {
      const highlightClass = r.isPageResult ? pageClass : websiteClass;

      if (r.isPageResult) {
        if (option === 'selected') {
          if (r.getResultId() === resultId) {
            highlightPage(resultValue, highlightClass);
            highlightSelectedPage(selectedDark);
            count += 1;
          }
        }
        else {
          if (option === 'all') {
            highlightPage(resultValue, highlightClass);
            highlightSelectedPage(selectedDark);
            count += 1;
          }
          else {
            if ((option === 'vw') &&
                ((resultValue === RESULT_VALUE.VIOLATION) ||
                 (resultValue === RESULT_VALUE.WARNING) ||
                 (r.getResultId() === resultId))) {
              highlightPage(resultValue, highlightClass);
              highlightSelectedPage(selectedDark);
              count += 1;
            }
          }
        }
      }
    }
  });
  return count;
}

/*
 *  @function  highlightSelectedElement
 *
 *  @desc  Create an overlay element that appears as a highlighted border
 *         around element to visually identifying the selected element in the
 *         sidebar.
 *
 *  @param  {Object}  element  -  DOM element node to highlight
 *  @param  {String}  style    -  CSS selector for light or dark border
 *  @param  {String}  option   -  The page highlighting option
 */
function highlightSelectedElement (element, style, option) {

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
 *  @function  highlightSelectedPage
 *
 *  @desc  Create an overlay element that appears as a highlighted border
 *         around the page.
 *
 *  @param  {String}  style    -  CSS selector for light or dark border
 */
function highlightSelectedPage (style) {

  const div = getOverlayPage();
  div.setAttribute(`${dataAttrSelected}`, style);
  document.body.appendChild(div);
  div.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
 *  @param  {Object}  element          -  DOM element node to highlight
 *
 *  @returns {Object} DOM node element used for the Overlay
 */

function getOverlayElement (element) {

  const rect = element.getBoundingClientRect();
  const overlayElem = document.createElement('div');

  overlayElem.classList.add(highlightClass);
  overlayElem.classList.add(elementClass);

  overlayElem.style.setProperty('border-radius', radius + 'px');

  overlayElem.style.left   = Math.round(rect.left - offset + window.scrollX) + 'px';
  overlayElem.style.top    = Math.round(rect.top  - offset + window.scrollY) + 'px';

  overlayElem.style.width  = Math.max(rect.width  + offset * 2, minWidth)  + 'px';
  overlayElem.style.height = Math.max(rect.height + offset * 2, minHeight) + 'px';

  return overlayElem;
}

/*
 *  @function  highlightPage
 *
 *  @desc  Create an overlay element that appears as a highlighted border
 *         around the page of show the result value (e.h. pass, violation, etc.).
 *
 *  @param  {Number}  resultValue -  Used to determine the styling and icon
 *  @param  {String}  classValue  -  Identifies page or website result
 */
function highlightPage (resultValue, classValue) {

  const div = getOverlayPage(classValue);

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
 *  @function  getOverlayPage
 *
 *  @desc  Create an overlay for the page.
 *
 *  @param  {String}  resultTypeClass  -  Identifies the type of result
 *                                        page | website
 *
 *  @returns {Object} DOM node element used for the Overlay
 */

function getOverlayPage (resultTypeClass) {

  const overlayElem = document.createElement('div');

  overlayElem.classList.add(highlightClass);
  if (resultTypeClass) {
    overlayElem.classList.add(resultTypeClass);
  }
  overlayElem.style.setProperty('border-radius', radius + 'px');

  overlayElem.style.left   = Math.round(offset + window.scrollX) + 'px';
  overlayElem.style.top    = Math.round(offset + window.scrollY) + 'px';

  overlayElem.style.width  = Math.round(window.innerWidth  - (offset * 2))  + 'px';
  overlayElem.style.height = Math.round(window.innerHeight - (offset * 2)) + 'px';

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
//  console.log(`[clearHighlights]`);
  for (let i = 0; i < elements.length; i += 1) {
//    console.log(`[${elements[i].tagName}]: ${elements[i].className}`);
    document.body.removeChild(elements[i]);
  }
}

