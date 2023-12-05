/* motionRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const motionRules = {
  MOTION_1: {
        ID:                    'Motion 1',
        DEFINITION:            'Verify there are alternatives to motion activation, unless the motion is essential for the function and doing so would invalidate the activity.',
        SUMMARY:               'Motion Actuation',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify there are alternatives to motion activation, unless the motion is essential for the function and doing so would invalidate the activity.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify there are alternatives to motion activation, unless the motion is essential for the function and doing so would invalidate the activity.',
        },
        PURPOSES: [
          'The intent of this success criterion is to ensure that functions triggered by moving a device (for example, shaking or tilting) or by gesturing towards the device (so that sensors like a camera can pick up and interpret the gesturing), can also be operated by more conventional user interface components.',
          'Alternatives to motion activation helps people who may be unable to perform particular motions (such as tilting, shaking, or gesturing) because the device may be mounted or users may be physically unable to perform the necessary movement. This success criterion ensures that users can still operate all functionality by other means such as touch or via assistive technologies. ',
          'All users benefit when they are in situations where they are unable to move their devices.'
        ],
        TECHNIQUES: [
          'Example: A user can choose an application setting which turns off Shake to Undo and other motion-activated features. ',
          'Example: After text is input in a field, shaking a device shows a dialog offering users to undo the input. A cancel button next to the text field offers the same functionality.',
          'Example: A user can tilt a device to advance to the next or a previous page. Buttons are also provided to perform the same function. ',
          'Example: A user can move or pan a device to change the view in an interactive photo. A control is also available to perform these same functions. ',
          'Example: A user can gesture towards the device to navigate content. Controls are also available to navigate. '
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG Understanding Motion Actuation',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G213: Provide conventional controls and an application setting for motion activated input',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G213'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F106: Failure due to inability to deactivate motion actuation',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F106'
          }
        ]
  }
}

