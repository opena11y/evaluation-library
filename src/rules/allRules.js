/* allRules.js */

/* Imports */
import {colorRules}  from './colorRules.js';
import Rule          from './rule.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rules', false)

export const allRules = [];

function addToArray (ruleArray) {
  ruleArray.forEach( r => {
    allRules.push(new Rule(r));
  });
}

addToArray(colorRules);


