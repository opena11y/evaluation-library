/* helpRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const helpRules = {
  HELP_1: {
        ID:                    'Help 1',
        DEFINITION:            'add definition',
        SUMMARY:               'Consistent Help',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  '',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: '',
        },
        PURPOSES: [
          'add purpose',
          ''
        ],
        TECHNIQUES: [
          'ass technique',
          ''
        ],
        MANUAL_CHECKS: [
          '',
          ''
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'add specification',
            url:   ''
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'add technique',
            url:   ''
          }
        ]
  }
}

