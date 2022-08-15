/* allRules.js */

/* Imports */
import {colorRules}     from './colorRules.js';
import {focusRules}     from './focusRules.js';
import {controlRules}   from './controlRules.js';
import {headingRules}   from './headingRules.js';
import {imageRules}     from './imageRules.js';
import {linkRules}      from './linkRules.js';
import {landmarkRules}  from './landmarkRules.js';
import {widgetRules}      from './widgetRules.js';

import Rule             from './rule.js';
import DebugLogging     from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rules', false)

export const allRules = [];

function addToArray (ruleArray) {
  ruleArray.forEach( r => {
    allRules.push(new Rule(r));
  });
}

addToArray(colorRules);
addToArray(focusRules);
addToArray(controlRules);
addToArray(headingRules);
addToArray(imageRules);
addToArray(linkRules);
addToArray(landmarkRules);
addToArray(widgetRules);


if (debug.flag) {
  console.log('All rules loaded');
}