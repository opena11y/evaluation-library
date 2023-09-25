/* ruleScope.js */

import {RULE_SCOPE} from '../../constants.js';

export const ruleScopes = [
  {
    id           : RULE_SCOPE.ELEMENT,
    title        : 'Element',
    url          : '',
    description  : 'Accessibility requirements that apply to an element.'
  },
  {
    id           : RULE_SCOPE.PAGE,
    title        : 'Page',
    url          : '',
    description  : 'Accessibility requirements that apply to a web page.'
  },
  {
    id           : RULE_SCOPE.WEBSITE,
    title        : 'Website',
    url          : '',
    description  : 'Accessibility requirements that apply to the pages in a website.'
  },
  // Composite rule categories
  {
    id           : RULE_SCOPE.ALL,
    title        : 'All Rules',
    url          : '',
    description  : 'Includes all rules in the ruleset and provides a way to sort and compare the results of all the rules.'
  }
];
