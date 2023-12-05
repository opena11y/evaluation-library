/* liveRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const liveRules = {
    LIVE_1: {
        ID:                    'Live 1',
        DEFINITION:            'Verify the live regions have the appropriate ARIA markup to indicate whether or how the screen reader will interrupt the user with a change in a status or error message.',
        SUMMARY:               'Live regions for status and error messages',
        TARGET_RESOURCES_DESC: 'Elements with @alert@, @log@ or @status@ roles or the @aria-live@ attribute',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify the page has properly identified live regions for status and error messages.',
          MANUAL_CHECK_P:  'Verify the page has properly identified live regions for status and error messages, and the %N_MC live regions identified have appropriate ARIA markup for the type of change in status or error messages that can occur.',
          HIDDEN_S:        'One element identified as a live region is hidden and was not evaluated.',
          HIDDEN_P:        '%N_H elements identified as live regions are hidden and were not evaluated.',
          NOT_APPLICABLE:  'No elements were identified as live regions on the page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1:       'Verify the @aria-live@ attribute value of "%1" is appropriate for the type of informational change that can occur in the region.',
          ELEMENT_MC_2:       'Verify the @alert@ role identifies a live region with critical time-sensitive information.',
          ELEMENT_MC_3:       'Verify the @log@ role identifies a live region where new information added and deleted in a meaningful order.',
          ELEMENT_MC_4:       'Verify the @status@ role identifies a live region with advisory information.',
          ELEMENT_HIDDEN_1:   '@%1[aria-live=%2]@ was not evaluated because it is hidden from assistive technologies.',
          ELEMENT_HIDDEN_2:   '@%1[role="%2"]@ was not evaluated because it is hidden from assistive technologies.',
          PAGE_MC_1:          'Verify the %1 live regions include all of the status and error messages on the page.',
          PAGE_MC_2:          'Verify if the page contains any status or error messages that must be represented by live regions.'
        },
        PURPOSES: [
          'ARIA live regions provide a mechanism for identifying status and error messages on a page such that changes in the content will be automatically announced to screen reader users while they are focusing on other parts of the page.',
          'The manner in which informational changes in live regions are announced to screen reader users is controlled by three separate ARIA roles that may be assigned to the region: @alert@, @log@ and @status@.',
          'In general, live regions should be used sparingly, since live regions that are constantly announcing changes become distracting, and may prevent the user from completing the task they are working on.',
          'A common misuse of live regions is to announce the opening of pull down menus or dialog boxes: These types of announcements are better handled through the appropriate use of other ARIA markup such as the @menu@ and @dialog@ roles.'
        ],
        TECHNIQUES: [
          'The @alert@ role identifies a live region with very important, and usually time-sensitive, information. When the information changes in this type of live region, a message is typically sent that interrupts the current speech being spoken by a screen reader. Examples includes transaction errors that are cancelling or impeding the progress of completing a financial transaction.',
          'The @log@ role identifies a type of live region where new information is added in a meaningful order and old information may disappear. Examples include chat logs, messaging history, game log, or an error log.',
          'The @status@ role identifies a live region that contains an advisory message, but one that is not important enough to justify an @alert@ role. This type of region is often, but not necessarily, presented as a status bar, and announcements of informational changes are typically delayed until a break occurs in the current speech being read by the screen reader software.',
          'When the @aria-atomic@ attribute is specified for a live region, it indicates to assistive technologies that when a change occurs, it should re-render all of the content or just the changes.',
          'The optional @aria-relevant@ attribute on a live region indicates what types of informational changes should be communicated to the user (e.g. @additions@, @deletions@, @text@ and @all@).',
          'The @aria-live@ attribute can be used to create custom live regions, with possible values of @polite@, @assertive@ and @off@. When used in conjunction with the ARIA @alert@, @log@ or @status@ roles, care must be taken in order to avoid conflicts with the default properties of those roles.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.OTHER,
            title: 'Mozilla Developer Network: ARIA Live Regions',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/WIDGET_Live_Regions'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Alert Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#alert'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Log Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#log'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Status Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#status'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-live',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-live'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-atomic',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-atomic'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-relevant',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-relevant'
          }
        ]
    }
}
