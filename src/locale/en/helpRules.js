/* helpRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const helpRules = {
  HELP_1: {
        ID:                    'Help 1',
        DEFINITION:            'Help and contact information occurs in the same order relative to other page content within a website.  Exceptions for websites that do not contain help or contact information or if the user initiated a change in ordering.',
        SUMMARY:               'Consistent ordering of help',
        TARGET_RESOURCES_DESC: 'Pages in a website',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation library can not automatically determine if a page contains help or contact information and if it does, it\'s order on the page.  Verification requires understanding the requirements, determining of the the requirement applies to a page and then verifying through inspection of the page if the ordering requirements have been met.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify the consistent ordering of help and contact information on web pages within a website.',
        },
        PURPOSES: [
          'The intent of this Success Criterion is to ensure users can find help for completing tasks on a Web site, when it is available. When the placement of the help mechanism is kept consistent across a set of pages, users looking for help will find it easier to identify. This is distinct from interface-level help, such as contextual help, features like spell checkers, and instructional text in a form. ',
          'ocating the help mechanism in a consistent location across pages makes it easier for users to find it.'
        ],
        TECHNIQUES: [
          'Example: On-line job application: Some of the application questions may be hard for new job seekers to understand even after reading the contextual help. For example, the form may request their identification number, but they may have several and not know which one to enter. Consistently located contact information will enable them to use phone or email so they can get an answer to their question. ',
          'Example: Medical appointment scheduling form: When the service a patient is trying to book is not easily findable within the interface, they may need human help. A consistently located messaging option (chat client) enables them to quickly interact with a staff person that can help, without requiring them to manage a second interface. ',
          'Example: Finding a specific policy or procedure: An employee who needs to complete a work task may have difficulty locating the specific policy or procedure document on their employer\'s Web site. A consistently located "How Do I" page may include the information that enables them to independently complete this task. '
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG Understanding Consistent Help',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G220: Provide a contact-us link in a consistent location',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G220'
          }
        ]
  }
}

