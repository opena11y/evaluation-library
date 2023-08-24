/* sensoryRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const sensoryRules = {

  SENSORY_1: {
    ID:                    'Sensory 1',
    DEFINITION:            'Understanding and operating on content on the page must not rely solely on the shape, size, visual location, orientation, or sound.',
    SUMMARY:               'Not only shape, size and location',
    TARGET_RESOURCES_DESC: 'Images used for links and controls',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:     'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1: 'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
    },
    PURPOSES: [
      'People with visual impairments and learning disabilities that affect the visual processing of information may not be able to perceive the content or identify the purpose of links and controls.',
      'People with hearing impairments and learning disabilities that affect the auditory processing of information may not be able to perceive the content or identify the purpose of links and controls.'
    ],
    TECHNIQUES: [
      'Provide redundant text labels and references in addition to references to shape, size, visual location or sound.'
    ],
    MANUAL_CHECKS: [
      'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'WCAG 2.0 Success Criterion 1.3.3 Sensory Characteristics',
        url:   'https://www.w3.org/TR/WCAG20/#content-structure-separation-understanding'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'How to meet Success Criterion 1.3.3 Sensory Characteristics',
        url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-understanding'
      }
    ]
}
}
