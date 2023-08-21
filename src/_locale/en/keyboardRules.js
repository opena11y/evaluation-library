/* keyboardRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const keyboardRules = {
  KEYBOARD_1: {
    ID:                    'Keyboard 1',
    DEFINITION:            'Elements with ARIA widget roles must support the keyboard interactions required by those roles.',
    SUMMARY:               'Widget role requires specific keyboard support',
    TARGET_RESOURCES_DESC: 'Elements with ARIA widget roles',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:  'Verify the element with the widget role has the keyboard interactions required by its role.',
      MANUAL_CHECK_P:  'Verify the %N_MC elements with widget roles have the keyboard interactions required by their roles.',
      HIDDEN_S:        'One hidden element with a widget role was not evaluated.',
      HIDDEN_P:        '%N_H hidden elements with widget roles were not evaluated.',
      NOT_APPLICABLE:  'No elements with widget roles on the page'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:     'Verify the keyboard interaction required by the @%1@ role.',
      ELEMENT_HIDDEN_1: 'Element with @%1@ widget role was not evaluated because it is hidden.'
    },
    PURPOSES: [
      'Keyboard support is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
      'Native HTML4 and HTML5 link and form control elements have default keyboard interactions that are built-in and standardized among browsers.',
      'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect, and part of this support is understanding the keyboard interaction expected for the elements role.',
      'The ARIA Authoring Practices Guide identifies the keyboard interaction patterns that users expect and can rely upon, based on each ARIA widget role.',
      'NOTE: Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
    ],
    TECHNIQUES: [
      'Use the ARIA Authoring Practices guide to identify the keyboard interaction support needed for each ARIA Widget role being used.',
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
    DEFINITION:            'The sequential tab order of links, form controls, and widgets must be meaningful.',
    SUMMARY:               'Sequential tab order must be meaningful',
    TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@ and @select@ elements, and elements with widget roles with @tabindex@ values',
    RULE_RESULT_MESSAGES: {
      PASS_S:             'Only one link or form control element on the page and no other elements with @tabindex@ values, so no issues with sequential tab order.',
      PASS_P:             '%N_P link and/or form control elements on the page and no other elements with @tabindex@ values, so no issues with sequential tab order.',
      MANUAL_CHECK_S:     'Verify the sequential "tab" focus order of the page to make sure the sequence of focusable elements is meaningful.',
      MANUAL_CHECK_P:     'Verify the sequential "tab" focus order of the page to make sure the sequence of focusable elements is meaningful.',
      HIDDEN_S:           'The link, form control, or widget element that is hidden does not need to be tested for focus order.',
      HIDDEN_P:           'The %N_H links, form controls and/or widgets that are hidden do not need to be tested for focus order.',
      NOT_APPLICABLE:     'No or only one focusable element on the page'
    },
    BASE_RESULT_MESSAGES: {
      PAGE_PASS_1:       'No elements on the page using @tabindex@ attribute that might affect sequential tab navigation.',
      PAGE_MC_1:         'Use the "tab" key to verify the sequential focus order of the %1 interactive elements on the page (i.e. links, form controls, widgets ...).',
      ELEMENT_PASS_1:    'The @%1@ element does not have a @tabindex@ value, so no change in sequential tab navigation of the element.',
      ELEMENT_MC_1:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: @tabindex@ value greater than 0 should be avoided to inconsistency of browser implementation.',
      ELEMENT_MC_2:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: The element by default is part of the tab sequence of the page, there is no need to set @tabindex=0@.',
      ELEMENT_MC_3:      'Verify the @%1@ element should be part of the sequential tab order of the page.',
      ELEMENT_MC_4:      'Verify the @%1@ element should be part of the sequential tab order of the page. NOTE: It is unusual for a non-widget role to be part of the tab sequence of the page.',
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
      'HTML form controls and link elements do not need a @tabindex@ valuable to be part of the sequential tab order, assigning a @tabindex@ value to one of these elements means you intend to change their default behavior.',
      'Setting @tabindex@ attribute to @0@ allows an element to become focusable and makes it part of the tab sequence of the page',
      'Setting @tabindex@ attribute to @-1@ allows an element to become focusable through related keyboard event handlers through scripting',
      'Use the ARIA Authoring Practices to define keyboard support that is appropriate for widget roles.',
      'Use keyboard event handlers to implement keyboard support for interactive behaviors defined on the page.',
      'Avoid using @object@ and @embed@ elements due to the difficulty in providing the corresponding keyboard support for all of their inherent interactive behaviors.',
      'Avoid using @tabindex@ values greater than 0 to change tabbing order, since tab sequence for values greater than 0 is inconsistent and therefore can be unpredictable across web browsers.'
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
  }
}
