/* rules.js */

/* Imports */
import {colorRules} from './colorRules.js';
import Rule         from './rule.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rules', false)

export let rules = [];

colorRules.forEach( r => {
  rules.push(new Rule(r));
});


