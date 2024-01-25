/* authorizationRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const authorizationRules = {
  AUTHORIZATION_1: {
        ID:                    'Authorization 1',
        DEFINITION:            'A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of four ways of completing the test.',
        SUMMARY:               'Accessible Authorization (Minimum) ',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation cannot automatically verfiy if the page does not require remembering a password or solving a puzzle to login to an online resource. Verify the form controls on this page are for authentication, if they are make sure the authorization requirements are met.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify the form controls on this page are for authentication, if they are make sure the authorization requirements are met.'
        },
        PURPOSES: [
          'People with cognitive issues relating to memory, reading (for example, dyslexia), numbers (for example, dyscalculia), or perception-processing limitations will be able to authenticate irrespective of the level of their cognitive abilities.'
        ],
        TECHNIQUES: [
          'Email link authentication',
          'Providing properly marked up email and password inputs',
          'Providing WebAuthn as an alternative to username/password',
          'Providing a 3rd party login using OAuth',
          'Using two techniques to provide 2 factor authentication'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Accessible Authentication (Minimum)',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G218: Email link authentication',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G218'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'H100: Providing properly marked up email and password inputs',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/html/H100'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F109: Failure of Success Criterion 3.3.8 and 3.3.9 due to preventing password or code re-entry in the same format',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F109'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'OAuth 2.0 Specficiation',
            url:   'https://oauth.net/'
          }
        ]
  }
}

