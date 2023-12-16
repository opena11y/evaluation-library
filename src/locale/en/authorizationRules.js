/* authorizationRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const authorizationRules = {
  AUTHORIZATION_1: {
        ID:                    'Authorization 1',
        DEFINITION:            'Add description.',
        SUMMARY:               'Accessible Authorization (Minimum) ',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if the page supports text spacing requirements.  Use a browser add-on or assistive technology that supports changes in text spacing to verify support for this requirements.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify all functionality that uses multi-touch or tracing a path for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.'
        },
        PURPOSES: [
          'add purpose 1',
          'add purpose 2'
        ],
        TECHNIQUES: [
          'add technique 1',
          'add technique 2',
          'add technique 3'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Text Spacing',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C36:Allowing for text spacing override',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C36'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C35: Allowing for text spacing without wrapping',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C35'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C8: Using CSS letter-spacing to control spacing within a word ',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C8'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C21: Specifying line spacing in CSS',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C21'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C28:Specifying the size of text containers using em units',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C21'
          }
        ]
  }
}

