/* keyboardRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const keyboardRules = {
  KEYBOARD_1: {
    ID:                    'Keyboard 1',
    DEFINITION:            'Elements with ARIA widget roles must support the keyboard interactions required by those roles.',
    SUMMARY:               'ARIA widget role requires specific keyboard support',
    TARGET_RESOURCES_DESC: 'Elements with ARIA widget roles',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:  'Verify the element with the ARIA widget role implements the keyboard interactions required by its role.',
      MANUAL_CHECK_P:  'Verify the %N_MC elements with ARIA widget roles implement the keyboard interactions required by their roles.',
      HIDDEN_S:        'One hidden element with an ARIA widget role was not evaluated.',
      HIDDEN_P:        '%N_H hidden elements with ARIA widget roles were not evaluated.',
      NOT_APPLICABLE:  'No elements with ARIA widget roles on the page'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:     'Verify that the keyboard interactions required by the ARIA @%1@ role are properly implemented.',
      ELEMENT_HIDDEN_1: 'Element with ARIA @%1@ widget role was not evaluated because it is hidden.'
    },
    PURPOSES: [
      'Keyboard support is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
      'Native HTML4 and HTML5 link and form control elements have default keyboard interactions that are built-in and standardized among browsers.',
      'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect, and a key part of implementing this support is understanding the specific keyboard interactions required by the element\'s ARIA role.',
      'The ARIA Authoring Practices Guide identifies the keyboard interaction patterns that users expect and can rely upon, based on each ARIA widget role.',
      'NOTE: Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
    ],
    TECHNIQUES: [
      'Use the ARIA Authoring Practices guide to identify the keyboard interaction support needed for each ARIA widget role being used.',
      'Add custom @keydown@, @keypress@ and/or @keyup@ event handlers to support the keyboard interactions required by the ARIA widget role.',
      'Verify that keyboard interactions are consistent among browsers and devices (e.g., desktop computers and mobile devices using Bluetooth keyboards).'
      ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML: Focus',
        url:   'https://html.spec.whatwg.org/multipage/interaction.html#focus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Managing Focus and Supporting Keyboard Navigation',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#managingfocus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Widget Roles',
        url:   'https://www.w3.org/TR/wai-aria/#widget_roles'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'W3C ARIA Authoring Practices: Design Patterns',
        url:   'https://www.w3.org/WAI/ARIA/apg/patterns/'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'Mozilla Developer Network: DOM on-event handlers',
        url:   'https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'Mozilla Developer Network: EventTarget.addEventListener()',
        url:   'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
      }
    ]
  },
  KEYBOARD_2: {
    ID:                    'Keyboard 2',
    DEFINITION:            'The sequential tab order of all links, form controls, and ARIA widgets on the page must be meaningful.',
    SUMMARY:               'Sequential tab order of focusable elements must be meaningful',
    TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@, and @select@ elements, and elements with a @tabindex@ value greater than or equal to 0',
    RULE_RESULT_MESSAGES: {
      PASS_S:             'Only one link or form control element on the page and no other elements with @tabindex@ values greater than or equal to 0, so no issues with sequential tab order.',
      PASS_P:             '%N_P link and/or form control elements on the page and no other elements with @tabindex@ values greater than or equal to 0, so no issues with sequential tab order.',
      MANUAL_CHECK_S:     'Verify that the sequential order of traversing all focusable elements on the page using only the tab key is meaningful.',
      MANUAL_CHECK_P:     'Verify that the sequential order of traversing all focusable elements on the page using only the tab key is meaningful.',
      HIDDEN_S:           'The link, form control, or widget element that is hidden does not need to be tested for focus order.',
      HIDDEN_P:           'The %N_H links, form controls and/or widgets that are hidden do not need to be tested for focus order.',
      NOT_APPLICABLE:     'Only one or no focusable elements on the page'
    },
    BASE_RESULT_MESSAGES: {
      PAGE_PASS_1:       'No elements on the page are using @tabindex@ attribute that might affect sequential tab traversal.',
      PAGE_MC_1:         'Use the "tab" key to verify the sequential focus order of the %1 interactive elements on the page (i.e. links, form controls, widgets ...).',
      ELEMENT_PASS_1:    'The @%1@ element does not have a @tabindex@ value, so it effects no change in sequential tab traveral on the page.',
      ELEMENT_MC_1:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: @tabindex@ values greater than 0 should be avoided due to inconsistencies with browser implementations.',
      ELEMENT_MC_2:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: The element by default is part of the tab sequence of the page, there is no need to set @tabindex=0@.',
      ELEMENT_MC_3:      'Verify the @%1@ element should be part of the sequential tab order of the page.',
      ELEMENT_MC_4:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: It is unusual for a non-widget role to be part of the tab sequence of the page.',
      ELEMENT_HIDDEN_1:  'The @%1@ element with the @tabindex=%2@ was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'Support for tab key traversal of focusable elements is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
      'Native HTML links and form control elements have default keyboard support for tab key traversal that are built-in and standardized among browsers.',
      'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect, and a key part of implementing this support is understanding how the @tabindex@ attribute can be used for managing keyboard focus.',
      'The ARIA Authoring Practices Guide identifies how to use @tabindex@ to help manage keyboard focus for widget roles.',
      'NOTE: Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
    ],
    TECHNIQUES: [
      'HTML form controls and link elements do not need an explicit @tabindex@ value to be part of the sequential tab order; assigning a @tabindex@ value to one of these elements means you intend to change its default behavior.',
      'Setting @tabindex@ attribute to @0@ allows an element to become focusable and makes it part of the tab sequence of the page',
      'Setting @tabindex@ attribute to @-1@ allows an element to become focusable through related keyboard event handlers / scripting',
      'Use the ARIA Authoring Practices Guide to define keyboard support that is appropriate for particular ARIA widget roles.',
      'Use keyboard event handlers to implement keyboard support for interactive behaviors defined on the page.',
      'Avoid using @object@ and @embed@ elements due to the difficulty in providing the corresponding keyboard support for all of their inherent interactive behaviors.',
      'Avoid using @tabindex@ values greater than 0 to change the tabbing order, since tab sequence implementations for values greater than 0 are inconsistent and their associated behaviors can be unpredictable across web browsers.'
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
        url:   'https://www.w3.org/TR/wai-aria-1.2/#managingfocus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'W3C ARIA Authoring Practices: Design Patterns',
        url:   'https://www.w3.org/WAI/ARIA/apg/patterns/'
      }
    ]
  },

  KEYBOARD_3: {
    ID:                    'Keyboard 3',
    DEFINITION:            '@object@ and @embed@ elements must not trap the keyboard.',
    SUMMARY:               'No keyboard trap',
    TARGET_RESOURCES_DESC: '@object@ and @embed@ elements',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:  'Verify the embedded application to make sure the application does not trap the keyboard.',
      MANUAL_CHECK_P:  'Verify the %N_MC embedded applications to make sure application does not trap the keyboard.',
      HIDDEN_S:        'One hidden @object@ or @embed@ element was not evaluated.',
      HIDDEN_P:        '%N_H hidden @object@ and/or @embed@ elements were not evaluated.',
      NOT_APPLICABLE:  'No @applet@ and @object@ elements on the page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:     'Verify the %1 element to see if it traps the keyboard.',
      ELEMENT_HIDDEN_1: '%1 element is hidden, so it cannot trap the keyboard.'
    },
    PURPOSES: [
      'If an embedded application (i.e. @object@ or @embed@ element) traps the keyboard, keyboard users will not be able to use the web page.'
    ],
    TECHNIQUES: [
      'Use @tabindex="-1"@ on the element to remove it from "tab" order of the page.',
      'If the embedded application does support accessibility, use a button to move focus to the application.'
    ],
    MANUAL_CHECKS: [
      'Move keyboard focus to the embedded application and see if you can move focus back to the web content using just the keyboard.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
      }
    ]
  },

  KEYBOARD_4: {
    ID:                    'Keyboard 4',
    DEFINITION:            'Avoid @tabindex@ values greater than 0.',
    SUMMARY:               'Avoid @tabindex@ > 0',
    TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@ and @select@ elements, and elements with widget roles with @tabindex@ values',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:     'Verify the sequential "tab" focus order of the page for the element with @tabindex@ greater than 0 is consistent across browsers and operating systems.',
      MANUAL_CHECK_P:     'Verify the sequential "tab" focus order of the page for the %N_MC elements with @tabindex@ greater than 0 is consistent across browsers and operating systems.',
      HIDDEN_S:           'The link, form control, or widget element that is hidden does not need to be tested for focus order.',
      HIDDEN_P:           'The %N_H links, form controls and/or widgets that are hidden do not need to be tested for focus order.',
      NOT_APPLICABLE:     'No elements with @tabindex@ value greater than 0'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:      'Verify the @%1@ element with the @tabindex@ value of %2 is consistently in he same sequential order across browsers and operating systemsx.',
      ELEMENT_HIDDEN_1:  'The @%1@ element with the @tabindex=%2@ was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'Keyboard support is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
      'Native HTML4 and HTML5 link and form control elements have default keyboard interactions that are built-in and standardized among browsers.',
      'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect, and part of this support is understanding how the @tabindex@ attribute value in managing keyboard focus.',
      'The ARIA Authoring Practices Guide identifies how to use @tabindex@ to help manage keyboard focus for widget roles.',
      'NOTE: Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
    ],
    TECHNIQUES: [
      'Avoid using @tabindex@ values greater than 0 to change tabbing order, since tab sequence for values greater than 0 is inconsistent and therefore can be unpredictable across web browsers.',
      'HTML form controls and link elements do not need a @tabindex@ valuable to be part of the sequential tab order, assigning a @tabindex@ value to one of these elements means you intend to change their default behavior.',
      'Setting @tabindex@ attribute to @0@ allows an element to become focusable and makes it part of the tab sequence of the page',
      'Setting @tabindex@ attribute to @-1@ allows an element to become focusable through related keyboard event handlers through scripting',
      'Use the ARIA Authoring Practices to define keyboard support that is appropriate for widget roles.',
      'Use keyboard event handlers to implement keyboard support for interactive behaviors defined on the page.'
    ],
    MANUAL_CHECKS: [
      'Use the tab key to verify the tab sequence of interactive elements of the page is in a logical.',
      'Make sure the elements with @tabindex@ > 0 make sense in the tab sequence of the page.',
      'Test on both Windows, macOS, Android and iOS using more than one browser to make sure there is consistent keyboard navigation support.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML: Focus',
        url:   'https://html.spec.whatwg.org/multipage/interaction.html#focus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Managing Focus and Supporting Keyboard Navigation',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#managingfocus'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'W3C ARIA Authoring Practices: Design Patterns',
        url:   'https://www.w3.org/WAI/ARIA/apg/patterns/'
      }
    ]
  },

  KEYBOARD_5: {
      ID:                    'Keyboard 5',
      DEFINITION:            'The element with keyboard focus must have a visible focus style that is different from the non-focus state.',
      SUMMARY:               'Focus must be visible',
      TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@ and @select@ elements and elements with widget roles with @tabindex@ values',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Use the "tab" key to move focus between links, form controls, embedded apps and widgets and check the visibility of focus styling for each element as it receives focus.',
        MANUAL_CHECK_P:     'Use the "tab" key to move focus between links, form controls, embedded apps and widgets and check the visibility of focus styling for each element as it receives focus.',
        HIDDEN_S: 'The link, form control, embedded app or widget element that is hidden does not need to be tested for focus order.',
        HIDDEN_P: 'The %N_H links, form controls, embedded apps and/or widgets that are hidden do not need to be tested for focus order.',
        NOT_APPLICABLE:  'No focusable elements on the page'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1:        'Use keyboard commands to check the keyboard focus styling of the %1 interactive elements on the page (i.e. links, form controls, ...).',
        PAGE_MC_2:        'Use keyboard commands to check the keyboard focus styling of the %1 interactive elements on the page (i.e. links, form controls, ...); NOTE: %2 interactive elements are hidden.',
        ELEMENT_MC_1:     'Verify the visual focus styling of the @%1@ element includes a solid discernible focus border at least 2 pixels in width.',
        ELEMENT_HIDDEN_1: '%1 element is hidden, so is not visible for observing the focus styling.'
      },
      PURPOSES: [
        'Many browsers don\'t provide a prominent or consistent visible keyboard focus styling for interactive elements, making it difficult for users to identify and track the element with keyboard focus.',
        'Author defined visible keyboard focus style makes it easier for users to know which interactive element has keyboard focus and provides more consistent user experience between browsers and operating systems.'
      ],
      TECHNIQUES: [
        'Use CSS psuedo element selector @:focus@ to change the styling of elements with keyboard focus to include a 2 pixel border.',
        'Use @focus@ and @blur@ event handlers on checkboxes and radio buttons to change the styling of not only the form control, but also its label text to make it easier to see.',
        'Styling changes should include creating at least a 2 pixel border around the interactive element and its label, typically using the CSS @border@ or @outline@ properties.',
        'For consistent look and feel to the website it is often useful for the focus and hover styles to be the same or similar.'
      ],
      MANUAL_CHECKS: [
        'Use the the keyboard (i.e. typically he "tab" key, but in the case of widgets other keys) to move focus through the links, form controls, embedded applications and widgets on the page.',
        'Check if the element with keyboard focus is clearly visible for all focusable elements on the page as you move focus between elements, and that it changes more than just color (i.e. border/outline around element with focus).',
        'Test keyboard focus styling using more than one browser and operating system, since there is a wide variability of between operating systems and browsers for styling keyboard focus.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'C15: Using CSS to change the presentation of a user interface component when it receives focus ',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/css/C15.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G195: Using an author-supplied, highly visible focus indicator',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G195'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G149: Using user interface components that are highlighted by the user agent when they receive focus ',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G149.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G165: Using the default focus indicator for the platform so that high visibility default focus indicators will carry over ',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G165.html'
        }
      ]
  },

  KEYBOARD_6: {
      ID:                    'Keyboard 6',
      DEFINITION:            '@select@ elements with @onchange@ or other event handlers must not automatically change the user\'s context when keyboard focus moves between options.',
      SUMMARY:               '@select@ must not change context',
      TARGET_RESOURCES_DESC: '@a@, @area@ and @role="link"@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Check the @select@ element to make sure that when keyboard focus moves between options does not cause a change in context (e.g. moving to a new URL or focus being moved from the @select@ element).',
        MANUAL_CHECK_P:     'Check the %N_MC @select@ elements to make sure that when keyboard focus moves between options in each control does not cause a change in context (e.g. moving to a new URL or focus being moved from the @select@ element).',
        HIDDEN_S: 'The @select@ element that is hidden does not need to be tested for automatically changing user context.',
        HIDDEN_P: 'The %N_H @select@ elements that are hidden do not need to be tested for automatically changing user context.',
        NOT_APPLICABLE:  'No @select@ elements on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1: 'Check to make sure moving keyboard focus between options in the @select@ box does not move focus from the list of options.',
        ELEMENT_HIDDEN_1: '@select@ element is hidden and therefore not operable by any user.'
      },
      PURPOSES: [
        'User\'s can become disoriented if the focus changes cause unpredicatable actions.',
        'When the user is using the kyboard to explore @select@ box options, the focus must stay on the options, until the user selects one of the options.'
      ],
      TECHNIQUES: [
        'Do not use @onchange@ event handlers on @select@ elements.',
        'Use selections should be made using the enter key.'
      ],
      MANUAL_CHECKS: [
        'Move focus to the @selection@ box and use the keyboard to move the focus between options, check to make sure the focus changes are not causing the context to change (i.e. focus movig to a new window or focus moving from the current option in the select box).'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G200: Opening new windows and tabs from a link only when necessary',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G200'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G201: Giving users advanced warning when opening a new window',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G201'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'F52: Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F52'
        }
      ]
  },
  KEYBOARD_7: {
        ID:                    'Keyboard 7',
        DEFINITION:            'Add description.',
        SUMMARY:               'Content on Hover or Focus',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if the page supports ....'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify...'
        },
        PURPOSES: [
          'add purpose 1',
          'add purpose 2'
        ],
        TECHNIQUES: [
          'add technique 1',
          'add technique 2',
          'add technique 3'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding ',
            url:   ''
          },
          { type:  REFERENCES.TECHNIQUE,
            title: '',
            url:   ''
          }
        ]
  },
  KEYBOARD_8: {
        ID:                    'Keyboard 8',
        DEFINITION:            'Add description.',
        SUMMARY:               'Focus Order',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if the page supports ....'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify...'
        },
        PURPOSES: [
          'add purpose 1',
          'add purpose 2'
        ],
        TECHNIQUES: [
          'add technique 1',
          'add technique 2',
          'add technique 3'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding ',
            url:   ''
          },
          { type:  REFERENCES.TECHNIQUE,
            title: '',
            url:   ''
          }
        ]
  },
  KEYBOARD_9: {
        ID:                    'Keyboard 9',
        DEFINITION:            'Add description.',
        SUMMARY:               'Focus Not Obscured (Minimum)',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if the page supports ....'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify...'
        },
        PURPOSES: [
          'add purpose 1',
          'add purpose 2'
        ],
        TECHNIQUES: [
          'add technique 1',
          'add technique 2',
          'add technique 3'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding ',
            url:   ''
          },
          { type:  REFERENCES.TECHNIQUE,
            title: '',
            url:   ''
          }
        ]
  }



}
