/* resizeRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const resizeRules = {

 RESIZE_1: {
      ID:                    'Resize 1',
      DEFINITION:            'When the text of a page is resized the text content must reflow to fill available view and all text content should remain visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).',
      SUMMARY:               'Resize text content',
      TARGET_RESOURCES_DESC: 'Page',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Resize the text using the zoom feature of the browser to check to make sure text content is visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1:      'Resize the text using the zoom feature of the browser to check to make sure text content is visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).'
      },
      PURPOSES: [
        'People with visual impairments may increase the size of text and the text should reflow to fit the available viewing area to make it easier to read.',
        'If text is clipped by limits on iframe sizes or CSS overflow properties some text content will be impossible to view.'
      ],
      TECHNIQUES: [
        'Use relative CSS sized like @em@ and @percentage@ rather than pixels and point sizes.',
        'If using the CSS overflow property, @iframe@ or @frame@ check to make sure content reflows and is not clipped by changes in zoom levels.',
        'Verify when font sizes are increased to at least 400% (4 times the original size of the font), the content reflows and does not require horizontal scrolling.',
        'Verify that font sizes are descreases content reflows to fill the width of the screen.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'How to meet 1.4.4 Resize Text',
          url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-scale'
        }
      ]
  },

  RESIZE_2: {
      ID:                    'Resize 2',
      DEFINITION:            'Content is viewable without scrolling for window dimensions as small as 320 x 256 pixels.',
      SUMMARY:               'Support small screen dimensions',
      TARGET_RESOURCES_DESC: 'Page',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Resize the screen to 320 x 256 CSS pixels and check to make sure content is viewable without using horizontal or vertical scrolling.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1:  'Resize the screen to the equivalent of 320 x 256 CSS pixels by either adjusting the window size or using the browser\'s zoom features and check to make sure content is viewable without using horizontal or vertical scrolling.'
      },
      PURPOSES: [
        'People with visual impairments using the browser zoom features benefit when content on the site reflows to fit the screen without scrolling.'
      ],
      TECHNIQUES: [
        'Use CSS media queries or flexbox code to reflow content based on screen width and height.',
        'No vertical scrolling required when the window width is the equivalent to 320 CSS pixels.',
        'No horizontal scrolling required when the window width is the equivalent to 256 CSS pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_SPECIFICATION,
          title: 'How to meet 1.4.10 Reflow',
          url:   'https://www.w3.org/TR/WCAG21/#reflow'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'C32: Using media queries and grid CSS to reflow columns',
          url:   'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'C31: Using CSS Flexbox to reflow content',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/css/C31'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'C33: Allowing for Reflow with Long URLs and Strings of Text',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/css/C33'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'C38: Using CSS width, max-width and flexbox to fit labels and inputs',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/css/C38'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'SCR34: Calculating size and position in a way that scales with text size',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR34'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G206: Providing options within the content to switch to a layout that does not require the user to scroll horizontally to read a line of text',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G206'
        }
      ]
  }

}
