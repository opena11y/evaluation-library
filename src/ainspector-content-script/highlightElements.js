/* highlightElements.js */

import {highlightModule} from './highlightModule.js';

/*
*   highlightElements
*/

export function highlightElements(highlight, position) {

  function validElementResults () {
    // NOTE: ainspectorSidebarRuleResult is a global variable in the page
    return ainspectorSidebarRuleResult && // eslint-disable-line
      ainspectorSidebarRuleResult.getElementResultsArray; // eslint-disable-line
  }

/*
  function getElementResultByPosition() {
    if (validElementResults()) {
      const elementResults = ainspectorSidebarRuleResult.getElementResultsArray();

      for (let i = 0; i < elementResults.length; i++) {
        if (elementResults[i].getOrdinalPosition() === position) {
          return elementResults[i];
        }
      }
    }
    return false;
  }
*/
  let domNode = false;

  let info = {};

  info.option = 'highlight';

  if (validElementResults()) {
    // NOTE: ainspectorSidebarRuleResult is a global variable in the page
    const elementResults = ainspectorSidebarRuleResult.getElementResultsArray(); // eslint-disable-line

    if (elementResults) {
      highlightModule.initHighlight();

      switch(highlight) {
        case 'all':
          highlightModule.highlightElementResults(document, elementResults);
          domNode = elementResults[0].getDOMElement();
          break;

        case 'none':
          highlightModule.removeHighlight(document);
          break;

        case 'selected':
          for (let i = 0; i < elementResults.length; i++) {
            if (elementResults[i].getOrdinalPosition() === position) {
              highlightModule.highlightElementResults(document, [elementResults[i]]);
              domNode = elementResults[i].getDOMElement();
              break;
            }
          }
          break;

        case 'vw':
          highlightModule.setHighlightPreferences(false, false, false, false);
          highlightModule.highlightElementResults(document, elementResults);
          domNode = elementResults[0].getDOMElement();
          break;

        default:
          break;
      }

      if (domNode && domNode.scrollIntoView) {
        domNode.scrollIntoView();
      }

    }
  }

  return info;
}
