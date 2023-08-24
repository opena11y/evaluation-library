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
      TARGET_RESOURCES_DESC: 'All pages',
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
        'If using the CSS overflow property, @iframe@ or @frame@ check to make sure content reflows and is not clipped by changes in zoom levels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'How to meet 1.4.4 Resize Text',
          url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-scale'
        }
      ]
  }
}
