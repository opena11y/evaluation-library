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
  }
];
