/* highlightElements.js */

import {highlightModule} from './highlightModule.js';

/* Constants */

var ainspectorSidebarRuleResult = ainspectorSidebarRuleResult || {};

/*
*   highlightElements
*/

export function highlightElements(highlight, position) {

  function validElementResults () {
    return ainspectorSidebarRuleResult &&
      ainspectorSidebarRuleResult.getElementResultsArray;
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
    const elementResults = ainspectorSidebarRuleResult.getElementResultsArray();

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
