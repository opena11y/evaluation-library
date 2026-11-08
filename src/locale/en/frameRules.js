 /* frameRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const frameRules = {

  FRAME_1: {
    ID:                    'Frame 1',
    DEFINITION:            '@frame@ element must have an accessible name to support screen reader navigation.',
    SUMMARY:               '@frame@ must have accessible name',
    TARGET_RESOURCES_DESC: '@frame@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:   'Add a @title@ attribute to the @frame@ element that describes the contents of the frame.',
      FAIL_P:   'Add a @title@ attribute to the %N_F @frame@ elements that describes the contents of the frame.',
      MANUAL_CHECK_S:  'Verify the @frame@ element with empty accessible name (e.g. @title=""@ attribute) does not contain visible content.',
      MANUAL_CHECK_M:  'Verify the %N_MC @frame@ elements with empty accessible names (e.g. @title=""@ attribute) do not contain visible content.',
      HIDDEN_S: 'The @frame@ element that is hidden was not evaluated.',
      HIDDEN_P: 'The %N_H @frame@ elements that are hidden were not evaluated.',
      NOT_APPLICABLE:  'No visible @frame@ elements on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:   '@frame@ element has the accessible name: %1.',
      ELEMENT_FAIL_1:   'Add a @title@ attribute to the @frame@ element describing the contents of the frame.',
      ELEMENT_MC_1:     'Verify the @frame@ element with empty accessible name (e.g. @title=""@) is not intended to be a frame navigation target.',
      ELEMENT_HIDDEN_1: '@frame@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES:        [ 'Screen readers provide a means to navigate web page content using @frame@ elements.',
                      'The accessible name of the @frame@ element (the @title@ attribute value) must describe the contents of the frame.',
                      'The accessible name helps users decide whether they want to navigate to a frame.'
                    ],
    TECHNIQUES:     [ 'Use the @title@ attribute to provide an accessible name for a @frame@ element.',
                      'Accessible names should be short and describe the contents of the @frame@ element to help users to decide whether to navigate to a @frame@.',
                      'For @frame@s with no visible content, explicitly identify the @frame@ as having no information for the user (e.g. @title="No content"@).'
                    ],
    MANUAL_CHECKS:  [ 'View the accessible names of the frames in the document to verify that they help users identify the contents of each frame.'
    ],
    INFORMATIONAL_LINKS: [
                     { type:  REFERENCES.SPECIFICATION,
                       title: 'WCAG 2.0 Success Criterion 2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple Web pages',
                       url:   'https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip'
                     },
                     { type:  REFERENCES.WCAG_TECHNIQUE,
                       title: 'H64: Using the title attribute of the frame and iframe elements',
                       url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H64.html'
                     }
                    ]
  },

  FRAME_2: {
    ID:                    'Frame 2',
    DEFINITION:            '@iframe@ element must have an accessible name to support screen reader navigation.',
    SUMMARY:               '@iframe@ must have accessible name',
    TARGET_RESOURCES_DESC: '@iframe@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:   'Add an accessible name to @iframe@ element that describes the contents of the frame.',
      FAIL_P:   'Add accessible names to %N_F @iframe@ elements that describe the contents of the frame.',
      MANUAL_CHECK_S:  'Verify the @iframe@ elements with empty accessible name (e.g. @title=""@ attribute) does not contain visible content.',
      MANUAL_CHECK_M:  'Verify the %N_MC @iframe@ elements with empty accessible names (e.g. @title=""@ attribute) do not contain visible content.',
      HIDDEN_S: 'The @iframe@ element that is hidden was not evaluated.',
      HIDDEN_P: 'The %N_H @iframe@ elements that are hidden were not evaluated.',
      NOT_APPLICABLE:  'No visible @iframe@ elements on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:   '@iframe@ element has accessible name.',
      ELEMENT_FAIL_1:   'Add an accessible name to the @iframe@ element describing the contents of the @iframe@.',
      ELEMENT_MC_1:     'Verify the @iframe@ element with empty accessible name (e.g. @title=""@) does not contain visible content.',
      ELEMENT_HIDDEN_1: '@iframe@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES:        [ 'Screen readers provide a means to navigate web page content using @iframe@ elements.',
                      'The accessible name of the @iframe@ element must describe the contents of the @iframe@.',
                      'The accessible name helps users to decide whether they want to navigate to a @iframe@.'
    ],
    TECHNIQUES:     [ 'Use the @title@ attribute to define an accessible name for an @iframe@ element.',
                      'Use the @aria-label@ attribute to define an accessible name for an @iframe@ element.',
                      'Use the @aria-labelledby@ attribute to define an accessible name for an @iframe@ element.',
                      'Accessible names should be short and describe the contents of the @iframe@ element to help users to decide whether to navigate to the @iframe@.',
                      'For @iframe@s with no visible content, explicitly identify the @iframe@ as having no information for the user (e.g. @title="No content"@).'
    ],
    MANUAL_CHECKS:  [ 'View the accessible names of the @iframe@s in the page to verify that they help users identify the contents of each frame.'
    ],
    INFORMATIONAL_LINKS: [
                    { type:  REFERENCES.SPECIFICATION,
                      title: 'WCAG 2.0 Success Criterion 2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple Web pages',
                      url:   'https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip'
                    },
                    { type:  REFERENCES.WCAG_TECHNIQUE,
                      title: 'H64: Using the title attribute of the frame and iframe elements',
                      url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H64.html'
                    }
    ]
  },
  FRAME_3: {
      ID:                    'Frame 3',
      DEFINITION:            '@iframe@ elements should have unique accessible names to help users identify and differentiate the data tables on a page.',
      SUMMARY:               '@iframe@s must have unique names',
      TARGET_RESOURCES_DESC: '@iframe@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Change the accessible name of the @iframe@ to be unique.',
        FAIL_P:         'Change the accessible name of the %N_F out of %N_T @iframes@ that do not have unique names to be unique.',
        HIDDEN_S:       'One @iframe@ element that is hidden was not evaluated.',
        HIDDEN_P:       '%N_H @iframe@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'Multiple data tables were not found on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @iframes@\'s accessible name "%1" for @%2@ element is unique on the page.',
        ELEMENT_FAIL_1:   'The @iframes@\'s accessible name "%1" is not unique on the page for the @%2@ element, update the @title@ attribute to provide a unique and descriptive label for the @iframe@.',
        ELEMENT_FAIL_2:   'The @iframes@ does not have an accessible name, update the @title@ attribute to provide unique and descriptive label for the @iframe@.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        '@iframe@ elements that share the same accessible name make it difficult to users of assistive technologies to differentiate the differences in content of each @iframe@ on the same page.',
        'In rare cases when multiple @iframe@s have duplicate content, use "Copy 1", "Copy 2" and "Copy X" as part of the accessible name of each table to make it clear that there is more than one copy of the same information on the page.'
      ],
      TECHNIQUES: [
        'Use @title@ attribute to provide an accessible name for a @iframe@.',
        'Use @aria-label@ attribute can provide an accessible name for a @iframe@, but not recommended due to possible AT support issues.',
        'Use @aria-labelledby@ attribute can provide an accessible name for a @iframe@, but not recommended due to possible AT support issues.',
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The @iframe@ element',
          url:   'https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN: @iframe@ HTML inline frame element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @title@ attribute',
          url:   'https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H64: Using the @title@ attribute of the @iframe@ element',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H64'
        },
      ]
  },
  FRAME_4: {
    ID:                    'Frame 4',
    DEFINITION:            '@iframe@ that contains interactive element must not have a @tabindex@ value < 0.',
    SUMMARY:               '@iframe@ tabindex restrictions',
    TARGET_RESOURCES_DESC: '@iframe[tabindex < 0]@',
    RULE_RESULT_MESSAGES: {
      FAIL_S:         'Remove the @tabindex@ < 0 from the @iframe@ that contains interactive content.',
      FAIL_P:         'Remove the @tabindex@ < 0 from the %N_F @iframe@s that contains interactive content.',
      HIDDEN_S:       'The @iframe@ element that is hidden does not need to be tested for @tabindex@ value.',
      HIDDEN_P:       'The %N_H @iframe@ elements that are hidden do not need to be tested for @tabindex@ value.',
      NOT_APPLICABLE: 'No @iframe@s on the page containing interactive elements.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_FAIL_1:    'Remove the @tabindex@ attribute from the @iframe@ element to ensure that the %1 interactive elements within the @iframe@ are included in the sequential focus order of the page.',
      ELEMENT_HIDDEN_1:  'The @iframe@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'When @iframes@ have @tabindex=-1@ it removes the element and all it\'s contents from the focus order of the page.',
      'Support for tab key traversal of focusable elements is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
      'Native HTML links and form control elements have default keyboard support for tab key traversal that are built-in and standardized among browsers.',
      'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect, and a key part of implementing this support is understanding how the @tabindex@ attribute can be used for managing keyboard focus.',
      'The ARIA Authoring Practices Guide identifies how to use @tabindex@ to help manage keyboard focus for widget roles.',
      'NOTE: Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
    ],
    TECHNIQUES: [
      'Do not set the @tabindex@ value of the @iframe@.'
    ],
    MANUAL_CHECKS: [
      'Use the tab key to verify the tab sequence of interactive elements of the page is in a logical.',
      'Make a list of the functional feature of a web site.',
      'Using only the keyboard, perform all of the functional features provided the interactive components on the web page.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML: Focus',
        url:   'https://html.spec.whatwg.org/multipage/interaction.html#focus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Managing Focus and Supporting Keyboard Navigation',
        url:   'https://www.w3.org/TR/wai-aria-1.3/#managingfocus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'W3C ARIA Authoring Practices: Design Patterns',
        url:   'https://www.w3.org/WAI/ARIA/apg/patterns/'
      }
    ]
  }
}
