/* ruleResultsSummary.js */

/* Imports */
import DebugLogging from '../debug.js';

/* constants */
const debug = new DebugLogging('ruleResultsSummary', false);
debug.flag = false;

/**
 * @class ruleResultsSummary
 *
 * @desc Constructor for an object that contains a summary of rule results
 */

export default class ruleResultsSummary {
  constructor () {
    this.summary = {
      violations:  0,
      warnings:  0,
      manual_checks: 0,
      passed:  0,
      not_applicable: 0
    }
  }

  get data () {
    return this.summary;
  }

  clear() {
    this.summary.violations     = 0;
    this.summary.warnings       = 0;
    this.summary.manual_checks  = 0;
    this.summary.passed         = 0;
    this.summary.not_applicable = 0;
  }

  update(ruleResult) {
    const rs = ruleResult.getResultsSummary();

    if (rs.violations) {
      this.summary.violations += 1;
    }
    else {
      if (rs.warnings) {
        this.summary.warnings += 1;
      }
      else {
        if (rs.manual_checks) {
          this.summary.manual_checks += 1;
        }
        else {
          if (rs.passed) {
            this.summary.passed += 1;
          }
          else {
            this.summary.not_applicable += 1;
          }
        }
      }
    }
  }
}
