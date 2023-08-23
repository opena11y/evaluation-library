/* timingRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English              */
/* --------------------------------------------------------------------------- */

export const timingRules = {
  TIMING_1: {
      ID:                    'Timing 1',
      DEFINITION:            'A page that contains time limits for user interaction or viewing content must provide a way to turn off, adjust or extend the time limits.',
      SUMMARY:               'Control time limits',
      TARGET_RESOURCES_DESC: 'Pages with scripting or other embedded technologies to control the response time for input or the amount of time to view content',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'If the page contains time limits, verify that there is a way to turn off, adjust or extend the time limits; or that one of the three exceptions applies.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1:      'If the page contains time limits, verify that there is a way to turn off, adjust or extend the time limits; or that one of the three exceptions applies.'
      },
      PURPOSES: [
        'People with physical disabilities may need more time to respond to web sites with time limits for selecting an option.',
        'People with visual impairments and visual processing learning disabilities may need more time to read material if the rendering of the material is automatically removed or obscured after a time period.',
        'Providing adjustable time periods in line with the persons capabilities makes it possible for people to complete the tasks associated with the website.'
      ],
      TECHNIQUES: [
        'Turn off: The user is allowed to turn off the time limit before encountering it.',
        'Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting.',
        'Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten time.',
        'Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible.',
        'Essential Exception: The time limit is essential and extending it would invalidate the activity.',
        '20 Hour Exception: The time limit is longer than 20 hours.'
      ],
      MANUAL_CHECKS: [
        'If the page contains time limits, verify that there is a way to turn off, adjust or extend the time limits; or that one of the three exceptions applies.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Understanding 2.2.1 Timing Adjustable',
          url:   'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html'
        }
      ]
  },
  TIMING_2: {
      ID:                    'Timing 2',
      DEFINITION:            'A page that includes moving, blinking, scrolling or auto-updating content that starts automatically and lasts more than 5 seconds must have a mechanism to pause, stop, or hide such content.',
      SUMMARY:               'Control moving, blinking or auto-updating content',
      TARGET_RESOURCES_DESC: 'Canvas, SVG and image animations; moving, blinking, scrolling or auto-updating text content; and embedded applications',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'If the page includes moving, blinking, scrolling or auto-updating content, verify there has a mechanism to pause, stop, or hide the information.',
        MANUAL_CHECK_P:     'If the page includes moving, blinking, scrolling or auto-updating content, verify there has a mechanism to pause, stop, or hide the information.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'If the %1 element includes moving, blinking, scrolling or auto-updating content, verify there has a mechanism to pause, stop, or hide the information.',
        ELEMENT_HIDDEN_1: 'The %1 element has not evaluated for moving, blinking, scrolling or auto-updating content',
        PAGE_MC_1:        'If the page includes moving, blinking, scrolling or auto-updating content, verify there has a mechanism to pause, stop, or hide the information.'
      },
      PURPOSES: [
        'People with visual impairments and visual processing learning disabilities may not be able to read or understand content that is blinking, scrolling or auto updating'
      ],
      TECHNIQUES: [
        'Pause/Resume: Through configuration or controls on the page, enable the user to pause and resume the moving, blinking, scrolling or auto-updating content.',
        'Stop: Through configuration or controls on the page, enable the user to stop the moving, blinking, scrolling or auto-updating content and see all of the content at one time.',
        'Hide: Through configuration or controls on the page, enable the user to hide the moving, blinking, scrolling or auto-updating content if it is not essential for the activity.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Understanding 2.2.2 Pause, Stop, Hide',
          url:   'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html'
        }
      ]
  },
  TIMING_3: {
      ID:                    'Timing 3',
      DEFINITION:            'A page must not include content that flashes more than three times in one second, unless below general flash and red flash thresholds.',
      SUMMARY:               'Flashing limits',
      TARGET_RESOURCES_DESC: 'Canvas, SVG and image animations; flashing text content; video; and embedded applications',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify the page does not include content that flashes more than three times in one second, unless below general flash and red flash thresholds.',
        MANUAL_CHECK_P:     'Verify the page does not include content that flashes more than three times in one second, unless below general flash and red flash thresholds.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'Verify the %1 element does not include content that flashes more than three times in one second, unless below general flash and red flash thresholds.',
        ELEMENT_HIDDEN_1: 'The %1 element has not evaluated for moving, blinking, scrolling or auto-updating content',
        PAGE_MC_1:        'Verify the page does not include any content that flashes more than three times in one second, unless below general flash and red flash thresholds.'
      },
      PURPOSES: [
        'People who have photosensitive seizure disorders can have a seizure triggered by content that flashes at certain frequencies for more than a few flashes.',
        'People are even more sensitive to red flashing than to other colors.',
        'NOTE: This flashing requirements was adapted from the broadcasting industry standards (e.g. content is viewed from a closer distance and using a larger angle of vision).'
      ],
      TECHNIQUES: [
        'There is no remedication technique, the content must be removed or disabled from flashing.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Understanding 2.3.1 Three Flashes or Below Threshold',
          url:   'https://www.w3.org/WAI/WCAG20/Understanding/three-flashes-or-below-threshold'
        }
      ]
  }
}
