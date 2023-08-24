/* readingOrderRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const readingOrderRules = {

  ORDER_1: {
    ID:                    'Order 1',
    DEFINITION:            'Elements positioned using CSS @absolute@, @relative@ or @fixed@ must maintain a meaningful reading order of content.',
    SUMMARY:               'Reading order: CSS positioning',
    TARGET_RESOURCES_DESC: '@article@, @aside@, @div@, @footer@, @header@, @main@, @nav@, @section@, @table[role="presentation"]@',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:   'Verify the element positioned with CSS maintains a reading order meaningful to users of assistive technologies.',
      MANUAL_CHECK_P:   'Verify the %N_MC elements positioned with CSS maintain a reading order meaningful to users of assistive technologies.',
      HIDDEN_S:         'The element positioned with CSS that is hidden was not evaluated.',
      HIDDEN_P:         '%N_H elements positioned with CSS that are hidden were not evaluated.'
      },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:     'Verify the @%1@ element with @position: %2@ maintains a meaningful reading order with other content on the page.',
      ELEMENT_HIDDEN_1: 'The @%1@ element with @position: %2@ was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'If the reading order of text content on the page is presented to users of assistive technologies in an order that does not match the intension of the author, reading comprehension will be affected. In worst-case scenarios, the meaning of the out-of-order content may contradict or bear little resemblance to the intended meaning.',
      'Assistive technologies render web page content based upon the sequence of the DOM elements within the HTML document.',
      'Web page designs that rely upon @table@ markup for layout or advanced CSS positioning techniques and JavaScript to rearrange content may result in a visual rendering of content that differs in reading order from the actual DOM ordering used by assistive technologies. Thus while the visual rendering may appear to have the correct or desired reading order, when rendered by assistive technologies such as screen readers, the actual reading order will be incorrect and correspondingly illogical.',
      'The relationship of the DOM order of content to the intended reading order is therefore very important for ensuring that information is logically presented to users of assistive technologies.'
    ],
    TECHNIQUES: [
      'Minimize the use of CSS @position@ values of @absolute@,  @relative@ and @fixed@.',
      'Make sure related content moves as a block when repositioning content on a page.'
    ],
    MANUAL_CHECKS: [
      'Disable layout tables (e.g. table[role="presentation"]) and CSS to make sure the content rendered has a meaningful sequence.'
    ],
    INFORMATIONAL_LINKS: [
      {
        type:  REFERENCES.SPECIFICATION,
        title: 'WCAG 2.0 Success Criterion 1.3.2 Meaningful Sequence',
        url:   'https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence'
      },
      {
        type:  REFERENCES.SPECIFICATION,
        title: 'Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification: position property',
        url:   'https://www.w3.org/TR/CSS2/visuren.html#propdef-position'
      }
    ]
  }
}
