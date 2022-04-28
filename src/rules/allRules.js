/* rules.js */

/* Imports */
import {colorRules} from './colorRules.js';
import Rule         from './rule.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rules', false)

export const allRules = [];

function addToRuleArray (ruleArray) {
  ruleArray.forEach( r => {
    allRules.push(new Rule(r));
  });
}

addToRuleArray(colorRules);


