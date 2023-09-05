/* allRules.js */

/* Imports */
import {audioRules}         from './audioRules.js';
import {bypassRules}        from './bypassRules.js';
import {colorRules}         from './colorRules.js';
import {errorRules}         from './errorRules.js';
import {frameRules}         from './frameRules.js';
import {controlRules}       from './controlRules.js';
import {headingRules}       from './headingRules.js';
import {htmlRules}          from './htmlRules.js';
import {imageRules}         from './imageRules.js';
import {keyboardRules}      from './keyboardRules.js';
import {landmarkRules}      from './landmarkRules.js';
import {languageRules}      from './languageRules.js';
// import {layoutRules}        from './layoutRules.js';
import {linkRules}          from './linkRules.js';
import {listRules}          from './listRules.js';
import {navigationRules}    from './navigationRules.js';
import {readingOrderRules}  from './readingOrderRules.js';
import {resizeRules}        from './resizeRules.js';
import {sensoryRules}       from './sensoryRules.js';
import {tableRules}         from './tableRules.js';
import {timingRules}        from './timingRules.js';
import {titleRules}         from './titleRules.js';
import {videoRules}         from './videoRules.js';
import {widgetRules}        from './widgetRules.js';

import Rule                 from './rule.js';
import DebugLogging         from '../debug.js';

/* Constants */
const debug = new DebugLogging('All Rules', false)

export const allRules = [];

function addToArray (ruleArray) {
  ruleArray.forEach( r => {
    allRules.push(new Rule(r));
  });
}

addToArray(audioRules);
addToArray(bypassRules);
addToArray(colorRules);
addToArray(errorRules);
addToArray(frameRules);
addToArray(controlRules);
addToArray(headingRules);
addToArray(htmlRules);
addToArray(imageRules);
addToArray(keyboardRules);
addToArray(landmarkRules);
addToArray(languageRules);
// addToArray(layoutRules);
addToArray(linkRules);
addToArray(listRules);
addToArray(navigationRules);
addToArray(readingOrderRules);
addToArray(resizeRules);
addToArray(sensoryRules);
addToArray(tableRules);
addToArray(titleRules);
addToArray(timingRules);
addToArray(videoRules);
addToArray(widgetRules);


if (debug.flag) {
  console.log('All rules loaded');
}
