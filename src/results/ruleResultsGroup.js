/* ruleResultsGroup.js */

/* Imports */
import DebugLogging from '../debug.js';

import {

} from '../constants.js';

/* constants */
const debug = new DebugLogging('ruleResultsGroup', false);
debug.flag = false;

import RuleResultsSummary     from './ruleResultsSummary.js';

/**
 * @class ruleResultsGroup
 *
 * @desc Constructor for an object that contains a summary of rule results for a group of rules
 */

export default class ruleResultsGroup {
  constructor (ids) {
    this.ruleGroups = [];

    for(let id in ids) {
      if (ids[id]) {
        const ruleGroupItem = {
          id: ids[id],
          summary: new RuleResultsSummary()
        }
        this.ruleGroups.push(ruleGroupItem);
      }
    }
  }

  get data () {
    const results = [];
    this.ruleGroups.forEach( (item) => {
      const result = {
        id: item.id,
        violations: item.summary.data.violations,
        warnings: item.summary.data.warnings,
        manual_checks: item.summary.data.manual_checks,
        passed: item.summary.data.passed
      }
      results.push(result);
    });

    return results;
  }

  clear() {
    this.ruleGroups.forEach( (rg) => {
      rg.summary.clear();
    });
  }

  update(id, ruleResult) {
    const items = this.ruleGroups.filter( (item) => {
      return item.id & id;
    });
    items.forEach( (item) => {
      item.summary.update(ruleResult);
    });
  }
}
