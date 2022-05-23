/* allRules.js */

/* Imports */
import {colorRules}     from './colorRules.js';
import {headingRules}   from './headingRules.js';
import {linkRules}      from './linkRules.js';
import {landmarkRules}  from './landmarkRules.js';
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
addToArray(headingRules);
addToArray(linkRules);
addToArray(landmarkRules);


