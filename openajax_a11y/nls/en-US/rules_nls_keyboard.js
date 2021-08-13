/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../../openajax_a11y_constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenAjax Alliance Rules National Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesNLSFromJSON('en-us', {

  //
  //  OAA Rules title and message string National Language Support (NLS)
  //
  rules: {

    KEYBOARD_1: {
      ID:                    'Keyboard 1',
      DEFINITION:            'Elements with ARIA widget roles %s have event handlers that support the keyboard interactions required by those roles.',
      SUMMARY:               'Widget roles require keyboard support',
      TARGET_RESOURCES_DESC: 'Elements with ARIA widget roles',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Verify the element with the widget role has the keyboard interactions required by its role.',
        MANUAL_CHECK_P:  'Verify the %N_MC elements with widget roles have the keyboard interactions required by their roles.',
        HIDDEN_S:        'One hidden element with a widget role was not evaluated.',
        HIDDEN_P:        '%N_H hidden elements with widget roles were not evaluated.',
        NOT_APPLICABLE:  'No elements with widget roles on the page'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'Verify the "%1" event handlers on the element support the keyboard interactions required by the @%2@ widget role.',
        ELEMENT_MC_2:     'Verify the "%1" event handlers on ancestor elements, or on the document object, support the keyboard interactions required by the @%2@ widget role.',
        ELEMENT_MC_3:     'Verify the "%1" event handlers on the @%2@ owner widget (through @aria-owns@) support the keyboard interactions on its descendant components required by the @%3@ widget role.',
        ELEMENT_MC_4:     'Verify the "%1" event handlers on the widget subcomponents support the keyboard interactions required by the @%2@ widget role.',
        ELEMENT_MC_5:     'Verify the keyboard interaction required by the @%1@ widget role.',
        ELEMENT_HIDDEN_1: 'Element with @%1@ widget role was not evaluated because it is hidden.'
      },
      PURPOSE: [
        'Keyboard support is required by people who cannot use the mouse and/or gestures to select the options and perform the actions made available to them by interactive elements.',
        'Native HTML4 and HTML5 link and form control elements have default keyboard interactions that are built-in and standardized among browsers.',
        'When authors create custom interactive elements they need to support the keyboard interaction patterns that users have come to expect.',
        'The ARIA Authoring Practices Guide identifies the keyboard interaction patterns that users expect and can rely upon, based on each ARIA widget role.'
      ],
      TECHNIQUES: [
        'Use the ARIA Authoring Practices guide to identify the keyboard interaction support needed for each ARIA Widget role being used.',
        'Add custom @keydown@, @keypress@ and/or @keyup@ event handlers to support the keyboard interactions required by the ARIA widget role.',
        'Verify that keyboard interactions are consistent among browsers and devices (e.g., desktop computers and mobile devices using Bluetooth keyboards).'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1: Widget Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.1/#widget_roles'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'WAI-ARIA Authoring Practices 1.1: Design Patterns and Widgets',
          url:   'https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'Mozilla Developer Network: DOM on-event handlers',
          url:   'https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'Mozilla Developer Network: EventTarget.addEventListener()',
          url:   'https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G108'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'OAA Web Accessibility ARIA Examples',
          url:   'https://oaa-accessibility.org/examples/'
        }
      ]
    },
    KEYBOARD_2: {
      ID:                    'Keyboard 2',
      DEFINITION:            'All functionality provided by the interactive elements on the page %s be operable through the keyboard interface.',
      SUMMARY:               'Interactive functionality %s be keyboard operable',
      TARGET_RESOURCES_DESC: 'Links, form controls, widgets, @object@, @embed@ and @applet@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:   'Verify that the functionality provided by the link, form control, element with event handlers or embedded application is operable through the keyboard.',
        MANUAL_CHECK_P:   'Verify that the functionality provided by the %N_MC links, form controls, elements with event handlers and/or embedded applications is operable through the keyboard.',
        HIDDEN_S:         'The hidden link, form control, element with event handlers, @object@ or @applet@ element was not evaluated.',
        HIDDEN_P:         '%N_H hidden links, form controls, elements with event handlers, @object@ and/or @applet@ elements were not evaluated.',
        NOT_APPLICABLE:   'No interactive elements on the page.'
      },
      NODE_RESULT_MESSAGES: {
        PAGE_PASS_1:       'The interactive element on the page does not have an explicit @tabindex@ value or added event handlers that might change its default functionality or ARIA role.',
        PAGE_PASS_2:       'The @%1@ interactive elements on the page do not have explicit @tabindex@ values or added event handlers that might change their default functionalities or ARIA roles.',
        ELEMENT_PASS_1:    'The @%1@ element does not have an explicit @tabindex@ value or added event handlers that might change its default functionality or ARIA role.',
        PAGE_MC_1:         'Verify that the functionality provided by the added event handler or explicitly defined @tabindex@ value on the interactive element has the corresponding keyboard support.',
        PAGE_MC_2:         'Verify that the functionality provided by the added event handlers or explicitly defined @tabindex@ values on the %1 interactive elements has the corresponding keyboard support.',
        ELEMENT_MC_1:      'Verify that the functionality provided by the added event handlers on the @%1@ element have the corresponding keyboard support.',
        ELEMENT_MC_2:      'Verify that the functionality that results from assigning @tabindex=%1@ on the @%2@ element has the corresponding keyboard support.',
        ELEMENT_MC_3:      'Verify that the functionality provided by the @%1@ element has the corresponding keyboard support.',
        ELEMENT_HIDDEN_1:  'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Many users are unable to use the mouse, either because of visual impairments, which make it difficult or impossible for them to see the pointer, or motor skill impairments, which prevent them from being able to accurately position the mouse pointer.',
        'This requirement is not intended to discourage support for mouse behaviors, but rather to make sure there is an equivalent way of using the keyboard for all interactive tasks that can be performed using the mouse.',
        'The recommended and most efficient way to include keyboard support for interactive elements is to follow computing platform conventions. This will make it it easier for all users to benefit from keyboard support, since the keystrokes and shortcuts will be easier to discover and familiar to the greatest number of users.',
        'Touch typists often prefer keyboard commands over mouse actions, especially for frequently performed operations, since they are much more efficient from a hand motion perspective.'
      ],
      TECHNIQUES: [
        'Use the WAI-ARIA 1.0 Authoring Practices to determine the keyboard support that is appropriate for common widget types.',
        'Use keyboard event handers to implement keyboard support for interactive behaviors defined on the page.',
        'Avoid using @object@ and @embed@ elements due to the difficulty in providing the corresponding keyboard support for all of their inherent interactive behaviors.',
        'Avoid using @tabindex@ values greater than 0 to change tabbing order, since tabbing behavior is inconsistent and therefore unpredictable across web browsers.'
      ],
      MANUAL_CHECKS: [
        'Make a list of the functional feature of a web site.',
        'Using only the keyboard, perform all of the functions provided by all of the interactive components on the web page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'WAI-ARIA 1.0 Authoring Practices',
          url:   'https://www.w3.org/WAI/PF/aria-practices/'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'OAA Web Accessibility ARIA Examples',
          url:   'https://oaa-accessibility.org/examples/'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'Accessible jQuery-ui Components Demonstration',
          url:   'https://access.aol.com/aegis/'
        }
      ]
    },

    KEYBOARD_3: {
      ID:                    'Keyboard 3',
      DEFINITION:            '@object@ and @applet@ elements %s not trap the keyboard.',
      SUMMARY:               'No keyboard trap',
      TARGET_RESOURCES_DESC: '@object@ and @applet@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Verify the embedded application to make sure the application does not trap the keyboard.',
        MANUAL_CHECK_P:  'Verify the %N_MC embedded applications to make sure application does not trap the keyboard.',
        HIDDEN_S:        'One hidden @object@ or @applet@ element was not evaluated.',
        HIDDEN_P:        '%N_H hidden @object@ and/or @applet@ elements were not evaluated.',
        NOT_APPLICABLE:  'No @applet@ and @object@ elements on the page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:  'Verify the %1 element to see if it traps the keyboard.',
        ELEMENT_HIDDEN_1:        '%1 element is hidden, so it cannot trap the keyboard.'
      },
      PURPOSE: [
        'If an embedded application (i.e. @object@ or @applet@ element) traps the keyboard, keyboard users will not be able to use the web page.'
      ],
      TECHNIQUES: [
        'Use @tabindex="-1"@ on the element to remove it from "tab" order of the page.',
        'If the embedded application does support accessibility, use a button to move focus to the application.'
      ],
      MANUAL_CHECKS: [
        'Move keyboard focus to the embedded application and see if you can move focus back to the web content using just the keyboard.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G108'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'OAA Web Accessibility ARIA Examples',
          url:   'https://oaa-accessibility.org/examples/'
        }
      ]
    }
  }
});
