/* widgetRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const widgetRules = {
    WIDGET_1: {
        ID:                    'Widget 1',
        DEFINITION:            'Widget roles must have an accessible name.',
        SUMMARY:               'Widget roles must have an accessible name',
        TARGET_RESOURCES_DESC: 'Elements with widget roles that allow accessible names',
        RULE_RESULT_MESSAGES: {
          FAIL_S:         'Add an accessible name to the element with a widget role that requires an accessible name.',
          FAIL_P:         'Add accessible names to the %N_F elements with widget roles that require an accessible name.',
          MANUAL_CHECK_S: 'Check the element with a role that may need an accessible name.',
          MANUAL_CHECK_P: 'Check the %N_MC elements with widget roles that may need an accessible name.',
          HIDDEN_S:       'An element with a widget role that allows an accessible name is hidden and was not evaluated.',
          HIDDEN_P:       '%N_H elements with widget roles that allow an accessible name are hidden and were not evaluated.',
          NOT_APPLICABLE: 'No elements with widget roles that allow an accessible name'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1: '@%1[role=%2]@ element has the accessible name: %3.',
          ELEMENT_MC_1:   '@%1[role=%2]@ element may require an accessible name depending on context (i.e multiple elements with the same widget role) in the page, adding an accessible name will improve accessibility.',
          ELEMENT_FAIL_1: 'Add an accessible name to the @%1[role=%2]@ element.',
          ELEMENT_HIDDEN_1: '@%1[role=%2]@ element is hidden from assistive technologies and was not evaluated.'
        },
        PURPOSES: [
          'An accessible name identifies the purpose or action of a widget on the page.',
          'For example when a widget role receives keyboard focus, both the role and the accessible name is spoken by screen readers.',
          'This rule does not test HTML form controls and links, since the accessible name requirement for them is covered in other rules.'
        ],
        TECHNIQUES: [
          'Some ARIA roles allow child text content and @alt@ attribute content from descendant image elements to be used for the accessible name.',
          'Use the @aria-labelledby@ attribute to reference the id(s) of visible content on the page to define an accessible name.',
          'Use the @aria-label@ attribute to provide an explicit accessible name for an element.',
          'Elements with grouping widget roles may not receive keyboard focus, but giving them a label provides users of assistive technologies a more accurate description of the purpose of the element'
        ],
        MANUAL_CHECKS: [
          'Good labels are both concise and descriptive of the element with widget role purpose.',
          'If element with widget roles are arranged in groups, make sure labels include grouping information.',
          'Consider using @aria-describedby@ to provide references to instructions or error information.',
          'When there is more than one widget of the same type on a page, they need an label for users to uniquely identify the form control.'
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'ARIA Authoring Practices: Providing Accessible Names and Descriptions',
            url:   'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-labelledby',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-label',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Accessible Name (e.g. label) Calculation',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#namecalculation'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA6: Using aria-label to provide labels for objects',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA9'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
    WIDGET_2: {
        ID:                    'Widget 2',
        DEFINITION:            'Elements with @onClick@ event handlers must be a link, button or have a widget role.',
        SUMMARY:               '@onClick@ event handlers must have widget role',
        TARGET_RESOURCES_DESC: 'Elements with @onClick@ event handler values that are defined as widgets',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Add widget role name to element.',
          FAIL_P:   'Add widget roles to each of the %N_F elements.',
          MANUAL_CHECK_S:     'Verify that any child elements that can respond to element with an @onclick@ event handler are a link, form control or has a widget role, and can be accessed with the keyboard alone.',
          MANUAL_CHECK_P:     'Verify that any child elements that can respond to %N_MC elements with an @onclick@ event handler are a link, form control or has a widget role, and can be accessed with the keyboard alone.',
          HIDDEN_S: 'The element with an @onClick@ event handler that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H elements with @onClick@ events handler that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No elements with @onClick@ event handlers on the page'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '@%1@ element has the @%2@ widget role.',
          ELEMENT_FAIL_1:   'Change the role of the @%1[role=%2]@ element to a widget role.',
          ELEMENT_FAIL_2:   'Add a widget role to the @%1@ element that describes the action of the element.',
          ELEMENT_MC_1:     'The @%1@ element has an @onclick@ event handler, verify any child elements that can respond to the @onclick@ event handler are a link, form control or have a widget role, and can be access with the keyboard alone.',
          ELEMENT_HIDDEN_1: 'The @%1@ element with an onClick events having a @role@ was not tested because %1 element with @onClick@ event handler is hidden from assistive technologies and/or not visible on screen.'
        },
        PURPOSES: [
          'Elements with @onClick@ event handlers must be a link, form control or have a widget role.',
          'NOTE: This rule can only identify elements using the @onclick@ attribute.  There is currently no programatic way to detect elements with @click@ events added using @addEventListener@.'
        ],
        TECHNIQUES: [
          'Use ARIA widget roles on non-form controls to describe their function on the page.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'ARIA Authoring Practices:  Keyboard Navigation Inside Components',
            url:   'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA4.html'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/patterns/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
    WIDGET_3: {
        ID:                    'Widget 3',
        DEFINITION:            '@role@ attribute value must be a widget, section, landmark or live region role.',
        SUMMARY:               '@role@ must be valid',
        TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Add a valid widget, section, landmark or live region role value to the element.',
          FAIL_P:   'Add a valid widget, section, landmark or live region role values to %N_F out of %N_T elements with @role@ attributes.',
          HIDDEN_S: 'The element with a role that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H elements with a role that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No elements with @role@ attribute on this page'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '@%1@ is a widget role.',
          ELEMENT_PASS_2:   '@%1@ is a landmark role.',
          ELEMENT_PASS_3:   '@%1@ is a live region role.',
          ELEMENT_PASS_4:   '@%1@ is a section role.',
          ELEMENT_PASS_5:   '@%1@ is a valid ARIA role.',
          ELEMENT_FAIL_1:   '@%1@ is not a defined ARIA role, change the @role@ attribute value to an appropriate widget, landmark, section or live region role.',
          ELEMENT_FAIL_2:   '@%1@ is an abstract ARIA role, change the role attribute to a widget, landmark or live region role.',
          ELEMENT_HIDDEN_1: '@role@ attribute value was not validated because the %1 element is hidden from assistive technologies and/or not visible on screen.'
        },
        PURPOSES: [
          'Elements with @role@ attributes describe the sections of a document (i.e landmarks) or the types of interactive elements (i.e. widgets) to users of assistive technologies, especially screen reader users.'
        ],
        TECHNIQUES: [
          'Use ARIA landmark roles to describe the sections of a web page.',
          'Use ARIA widget roles to describe interactive elements on a web page'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA4.html'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA19: Using ARIA role=alert or Live Regions to Identify Errors',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19.html'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
    WIDGET_4: {
        ID:                    'Widget 4',
        DEFINITION:            'ARIA property and state values must be valid types.',
        SUMMARY:               'ARIA values must be valid',
        TARGET_RESOURCES_DESC: 'Elements with aria attributes',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Change ARIA attribute to a valid type.',
          FAIL_P:   'Change %N_F out of %N_T ARIA attributes to a valid types.',
          HIDDEN_S: 'The widget that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H widgets that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No ARIA attributes on this page'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1: 'The @%1@ attribute with the value "@%2@" is a valid.',
          ELEMENT_PASS_2: 'The @%1@ attribute with the value "@%2@" is a valid "%3" type.',
          ELEMENT_FAIL_1: 'The @%1@ attribute must have one of the following values: %2.',
          ELEMENT_FAIL_2: 'The @%1@ attribute with the value "@%2@" must change to one of the following values: %3.',
          ELEMENT_FAIL_3: 'The @%1@ attribute must have one or more of the following values: %2.',
          ELEMENT_FAIL_4: 'The @%1@ attribute with the value "@%2@" must change to one or more of the following values: %3.',
          ELEMENT_FAIL_5: 'The @%1@ attribute is empty and must change to a valid integer value.',
          ELEMENT_FAIL_6: 'The @%1@ attribute with the value "@%2@" must change to a integer greater than or equal to 0, if the value cannot be determined use "-1".',
          ELEMENT_FAIL_7: 'The @%1@ attribute with the value "@%2@" must change to a integer greater than or equal to 1.',
          ELEMENT_FAIL_8: 'The @%1@ attribute with the value "@%2@" must change to a value with type of \'%3\'.',
          ELEMENT_HIDDEN_1: 'The @%1@ attribute with an empty value was not tested for validity because it is hidden from assistive technologies.',
          ELEMENT_HIDDEN_2: 'The @%1@ attribute with the value "@%2@" was not tested for validity because it is hidden from assistive technologies.'
        },
        PURPOSES: [
          'ARIA attributes must be a valid type to accurately describe web content to users of assistive technologies, especially screen reader users.'
        ],
        TECHNIQUES: [
          'Use valid values for ARIA attributes.',
          'Check W3C WAI Accessible Rich Internet Applications specification for allowed values for ARIA attributes.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Supported Property and States',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#states_and_properties'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
  },
  WIDGET_5: {
        ID:                    'Widget 5',
        DEFINITION:            'Elements with the attributes that start with @aria-@must be a valid ARIA property or state.',
        SUMMARY:               'Attributes that start with @aria-@ must be defined.',
        TARGET_RESOURCES_DESC: 'Elements with aria attributes',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Change ARIA attribute to a defined property or state.',
          FAIL_P:   'Change all %N_F out of %N_T ARIA attributes to a defined properties or states.',
          HIDDEN_S: 'The widget that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H widgets that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No undefined ARIA attributes on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:    'The @%1@ attribute is a defined ARIA property or state.',
          ELEMENT_FAIL_1:  'The @%1@ attribute must be changed to a defined ARIA property or state, otherwise remove.',
          ELEMENT_HIDDEN_1:  'Valid ARIA attribute was not tested becasue the @%1@ attribute with the value "@%2@" is hidden from assistive technologies.'
        },
        PURPOSES: [
          'ARIA attributes must be defined properties or states to accurately describe web content to users of assistive technologies, especially screen reader users'
        ],
        TECHNIQUES: [
          'Use defined ARIA properties and states in the ARIA specification.',
          'Check W3C WAI Accessible Rich Internet Applications specifications for allowed values for ARIA attributes.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Supported Property and States',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#states_and_properties'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
  },
  WIDGET_6: {
        ID:                    'Widget 6',
        DEFINITION:            'Widgets must set required properties and states.',
        SUMMARY:               'Widgets must set properties',
        TARGET_RESOURCES_DESC: 'Widgets with required properties and states',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Add required properties and states to widget.',
          FAIL_P:   'Add required properties and states to the %N_F of the %N_T widgets with required properties and/or states on the page.',
          HIDDEN_S: 'The widget with required properties and states that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H widgets that have required properties and states that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No widgets with required properties and states on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1: '@%1@ widget has the required @%2@ attribute with the value @%3@.',
          ELEMENT_FAIL_1: 'Add the required @%2@ attribute to the @%1@ widget.',
          ELEMENT_HIDDEN_1: 'Required ARA properties and states was not tested because the %1 widget is hidden from assistive technologies and/or not visible on screen.'
        },
        PURPOSES: [
          'ARIA roles, properties and states describe the features and options of widgets to users of assistive technologies, especially screen reader users.'
        ],
        TECHNIQUES: [
          'Required ARIA properties and states are needed accurately describe the features and options of a widget.'
        ],
        MANUAL_CHECKS: [
          'Verify that the values of properties and states accurately describe a widget'
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
  WIDGET_7: {
        ID:                    'Widget 7',
        DEFINITION:            'Container widgets must have required owned elements.',
        SUMMARY:               'Widgets must have owned elements',
        TARGET_RESOURCES_DESC: 'Widgets with required owned elements',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Add required child element to the widget.',
          FAIL_P:   'Add required child elements for the %N_F out of %N_T widgets missing required child elements.',
          MANUAL_CHECK_S: 'Verify the widget with @aria-busy=true@ children are being populated with required child elements.',
          MANUAL_CHECK_P: 'Verify the %N_MC widgets with @aria-busy=true@ children are being populated with required child elements.',
          HIDDEN_S: 'The widget with requires child elements that is is hidden and was not evaluated.',
          HIDDEN_P: '%N_H hidden widgets that require child elements were not evaluated.',
          NOT_APPLICABLE:  'No widgets with required child elements on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '@%1@ widget contains at least one required owned element with the role of: @%2@.',
          ELEMENT_MC_1:     'When @aria-busy@ is set to @true@, verify for the child nodes are being populated.',
          ELEMENT_FAIL_1:   '@%1@ widget does not contain one or more of following required owned elements with a role of: @%2@.',
          ELEMENT_HIDDEN_1: 'Required owned elements was not tested because the @%1@ widget is hidden from assistive technologies and not visible on screen.'
        },
        PURPOSES: [
          'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.',
          'Roles that are associated with container widgets have important parent/child relationships with other roles.',
          'Parent/Child relationships are used by assistive technologies for computing the number of items in a container and the item position.',
          'Container roles are also used by assistive technologies to provide enhanced navigation features for moving between items in lists, tables, grids and treegrids.'
        ],
        TECHNIQUES: [
          'Required owned elements can be defined using the HTML DOM structure or the @aria-owns@ attribute.',
          'Use the DOM structure to add required owned elements by making them a descendant of the container element.',
          'When the owned elements are not descendants of the container element, use the @aria-owns@ attribute on the container element to reference the owned elements.',
          'When @aria-busy@ attribute is set to @true@ on the container element, the container element does not need to own any required elements.  @aria-busy@ should be used when a container element is being dynamically populated.',
          'NOTE: The DOM structure technique is preferred over the @aria-owns@ technique, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
 WIDGET_8: {
        ID:                    'Widget 8',
        DEFINITION:            'Role must have a required parent role using the HTML DOM structure or the @aria-owns@ attribute.',
        SUMMARY:               'Role must have parent',
        TARGET_RESOURCES_DESC: 'Role with required parent role',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Update the parent/child structure of the page so the element descends from a required parent role.',
          FAIL_P:   'Update the parent/child structure of the page so the %N_F elements descend from a required parent role.',
          HIDDEN_S: 'The role that requires a parent role that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H widgets that require a parent roles that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No widgets with required parent role on this page'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '@%1@ role is a descendant of the a @%2@ role.',
          ELEMENT_FAIL_1:   'The @%1@ role requires a ancestor role of "@%2@", check your HTML DOM structure to ensure an ancestor element or an @aria-owns@ attributes identifies a required parent role.',
          ELEMENT_HIDDEN_1: 'Required parent role was not tested because the @%1@ widget is hidden from assistive technologies and/or not visible on screen.'
        },
        PURPOSES: [
          'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.',
          'Roles that are associated with container widgets have important parent/child relationships with other roles.',
          'Parent/child relationships are used by assistive technologies for computing the number of items owned by a container and the position of an item (e.g. "third of five links").',
          'Container roles are also used by assistive technologies to provide enhanced navigation features for moving between items in lists, tables, grids and treegrids.'
        ],
        TECHNIQUES: [
          'Parent roles can be defined using the HTML DOM structure or the @aria-owns@ attribute.',
          'Required parent role is a DOM ancestor of the element.',
          'Required parent role references the element using the @aria-owns@ attribute.',
          'NOTE: HTML DOM parent/child relationships for defining relationships is preferred over the use of @aria-owns@ attribute, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
 WIDGET_9: {
        ID:                    'Widget 9',
        DEFINITION:            'Elements must be owned by only one parent role.',
        SUMMARY:               'Only one owner',
        TARGET_RESOURCES_DESC: 'Roles with required parent roles',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Update elements with aria-owns to make sure elements are only referenced once.',
          FAIL_P:   'Update %N_F out of %N_T elements with aria-owns to make sure they reference an element only once.',
          NOT_APPLICABLE:  'No elements are referenced using aria-owns on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1: '@%1@ element is referenced only by one container element using aria-owns.',
          ELEMENT_FAIL_1: '@%1@ element is referenced only by %2 container elements using aria-owns.',
        },
        PURPOSES: [
          'ARIA container elements  have require child elements.',
          'When the HTML DOM parent/child relationships do not identify the child elements the @aria-owns@ attribute can be used to reference the child elements.',
          'A child element can only be referenced using @aria-owns@ by one container element.'
        ],
        TECHNIQUES: [
          'Container elements using @aria-owns@ attribute must accurately reference the associated child elements.',
          'A child element can only be referenced by one container element using the @aria-owns@ attribute.',
          'Update the application to use the DOM parent/child relationships instead of using @aria-owns@ technique.',
          'NOTE: HTML DOM parent/child relationships for defining relationships is preferred over the use of @aria-owns@ attribute, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
 WIDGET_10: {
        ID:                    'Widget 10',
        DEFINITION:            'Range widget must have value between minimum and maximum values, or have an indeterminate state.',
        SUMMARY:               'Value in range',
        TARGET_RESOURCES_DESC: 'Range widgets',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Update @range@ widget attributes of the range widget so the @aria-valuenow@ attribute is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes.',
          FAIL_P:   'Update @range@ widget attributes of the %N_F out of %N_T range widgets so the @aria-valuenow@ attribute of each widget is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes.',
          HIDDEN_S: 'The @range@ widget that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H @range@ widgets that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No @range@ widgets on the page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:  '@%1@ is using @aria-valuetext@ attribute with a value of @%2@ which should provide a better description of the value than the @aria-valuenow@ of @%3@.',
          ELEMENT_PASS_2:  '@%1@ has a value of %2 is in the range %3 and %4.',
          ELEMENT_PASS_3:  '@%1@ has no @aria-valuenow@ value and is considered an indeterminate.',
          ELEMENT_FAIL_1:  'Update the numeric values of @aria-valuenow@ ("%1"), @aria-valuemin@ ("%2") and @aria-valuemax@ ("%3") so the @aria-valuenow@ value is between the minimum and maximum values.',
          ELEMENT_FAIL_2:  'Update the values of @aria-valuemin@ ("%1") and @aria-valuemax@ ("%2") to be numeric values, make sure the @aria-valuemin@ value is less than the @aria-valuemax@ value.',
          ELEMENT_FAIL_3:  'Update the value of @aria-valuenow@ ("%1") to be a valid numeric value.',
          ELEMENT_FAIL_4:  '@%1@ is missing the @aria-valuenow@ attribute.',
          ELEMENT_HIDDEN_1:  'Widget range values were not tested because the @%1@ range widget is hidden from assistive technologies.'
        },
        PURPOSES: [
          'Range roles identify a value between a minimum or maximum value and whether the value can be changed by the user (e.g. @scrollbar@, @slider@ or @spinbutton@).',
          'Screen readers typically render the value of a range widget as a percentage of the total range defined by the minimum and maximum values.',
          'Elements with the role @separator@ that are focusable (e.r. @tabindex=0@) are considered a range role with the same requirements as a @scrollbar@.',
          '@aria-valuetext@ can be used to render an alternative to the percentage when a numerical values and/or a units of measure are more descriptive.',
          'Some range roles (e.g. @progress@ and @spinbutton@) allow an unknown current value indicating indeterminate or no current value.'
        ],
        TECHNIQUES: [
          'Use the @aria-valuenow@ attributes numerical value must be in the range defined by @aria-valuemin@ and @aria-valuemax@.',
          'Screen reader typically render the slider value as a percentage, requiring a valid @aria-valuenow@ attribute.',
          'Use the @aria-valuetext@ to provide an alternative to the percentage typically spoken by assistive technologies (e.g. "32 dollars", "78 degrees")',
          'For most range roles, if @aria-valuemin@ is not defined it\'s default value is 0.',
          'For most range roles, if @aria-valuemax@ is not defined it\'s default value is 100.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices: Communicating Value and Limits for Range Widgets',
            url:   'https://www.w3.org/WAI/ARIA/apg/#range_related_properties'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Meter',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#meter'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Progress',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#progress'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Scollbar',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#scollbar'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Separator',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#separator'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Slider',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#slider'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Spinbutton',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#spinbutton'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
          }
        ]
    },
 WIDGET_11: {
        ID:                    'Widget 11',
        DEFINITION:            'Elements with UI event handlers %s have widget roles that accurately describe the options and actions available to the user upon interacting with the element.',
        SUMMARY:               'Elements with event handlers %s have roles',
        TARGET_RESOURCES_DESC: 'Elements with event handlers',
        RULE_RESULT_MESSAGES: {
          FAIL_S:          'Add an ARIA widget role to the interactive element, or to its descendants, to describe the user interactions associated with the event handler or handlers on the element.',
          FAIL_P:          'Add ARIA widget roles to the %N_F interactive elements, or to their descendants, to describe the user interactions associated with the event handlers on those elements.',
          MANUAL_CHECK_S:  'Verify the user interactions associated with the interactive element with one or more event handlers are accurately described by the element\'s widget role and/or those of its descendants.',
          MANUAL_CHECK_P:  'Verify the user interactions associated with the %N_MC interactive elements with one or more event handlers are accurately described by each element\'s widget role and/or their descendants.',
          HIDDEN_S:        'The hidden interactive element with event handlers was not evaluated.',
          HIDDEN_P:        'The %N_H interactive elements with event handlers were not evaluated.',
          NOT_APPLICABLE:  'No interactive elements with event handlers found on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MANUAL_CHECK_1:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by the @%1@ widget role.',
          ELEMENT_MANUAL_CHECK_2:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by native role semantics of the @%1@ element.',
          ELEMENT_MANUAL_CHECK_3:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by the descendant elements with widget roles or the native role semantics of the interactive elements.',
          ELEMENT_FAIL_1:   'Add widget role(s) to the element and/or its descendants that accurately describe the user options and actions of the @%1@ element with the following event handlers: %2.',
          ELEMENT_HIDDEN_1: 'Roles for interactive elements was not tested because the %1 element is hidden from assistive technologies with following event handlers: %2'
        },
        PURPOSES: [
          'ARIA widget roles describe the user options and actions, or more generally, the expected behavior, of interactive elements to users of assistive technologies.',
          'Standard HTML form controls and links have default widget roles that describe their behavior.',
          'When UI event handlers are used to create user options and actions that change the expected behavior of an interactive element, ensure that the appropriate widget role is assigned to the element.',
          'Conversely, ensure that the event handlers are adding appropriate behaviors that align with the ARIA widget role.'
        ],
        TECHNIQUES: [
          'Use the @role@ attribute with an ARIA widget role value to describe the user options, actions and expected behavior of custom interactive elements.',
          'Use ARIA property and state attributes to describe the features of each widget role. Note that some widget roles have required properties and states.',
          'Ensure that all options and actions of interactive elements are available through keyboard-only interaction.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML5: INPUT element widget role semantics',
            url:   'https://www.w3.org/TR/html51/sec-forms.html#state-of-the-type-attribute'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML5: SELECT element widget role semantics',
            url:   'https://www.w3.org/TR/html51/sec-forms.html#the-select-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML5: TEXTAREA element widget role semantics',
            url:   'https://www.w3.org/TR/html51/sec-forms.html#the-textarea-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML5: BUTTON element widget role semantics',
            url:   'https://www.w3.org/TR/html51/sec-forms.html#the-button-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML5: A element widget role semantics',
            url:   'https://www.w3.org/TR/html51/textlevel-semantics.html#the-a-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'UI Events Specification',
            url:   'https://www.w3.org/TR/DOM-Level-3-Events/'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes.',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes.',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
    WIDGET_12: {
        ID:         'Widget 12',
        DEFINITION: 'The label for elements with a widget roles on a page %s sufficiently describe its purpose.',
        SUMMARY:    'Widget labels %s be descriptive',
        TARGET_RESOURCES_DESC: 'Elements with widget roles on a page',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'To the element with widget role missing a label, add a label that describes its purpose.',
          FAIL_P:   'To each of the %N_F element with widget roles missing labels, add a label that uniquely describes its purpose.',
          MANUAL_CHECK_S: 'Verify that the label uniquely describes the purpose of the element with widget role.',
          MANUAL_CHECK_P: 'Verify that the label for each of the %N_MC element with widget roles uniquely describes its purpose.',
          HIDDEN_S: 'The control element that is hidden was not evaluated.',
          HIDDEN_P: 'The %N_H control elements that are hidden were not evaluated.',
          NOT_APPLICABLE: 'No element with widget roles on this page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1:     'Verify the label "%1" for the @%2@ element with @%3@ widget role describes its purpose.',
          ELEMENT_MC_2:     'Verify the @%1@ element with @%2@ widget role does not need a label, a label is only needed  if it clarifies the purpose of the widget on the page.',
          ELEMENT_FAIL_1:   'Add a label to the @%1@ element with @%2@ widget role.',
          ELEMENT_HIDDEN_1: '@%1@ element with the %2@ widget role was not evaluated because it is hidden from assistive technologies.'
        },
        PURPOSES: [
          'Labels that are sufficiently descriptive make it possible for people to understand the purposes of elements with widget roles on the page.'
        ],
        TECHNIQUES: [
          'In some cases the child text nodes and @alt@ from descendant image elements will be used as the label for elements with widget roles.',
          'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page to label elements with widget roles.',
          'Use @aria-label@ attribute to provide a explicit label for an element with a widget role.',
          'Elements with grouping widget roles may not receive keyboard focus, but giving them a label provides users of assistive technologies a more accurate description of the purpose of the widget'
        ],
        MANUAL_CHECKS: [
          'Good labels are both concise and descriptive of the element with widget role purpose.',
          'If element with widget roles are arranged in groups, make sure labels include grouping information.',
          'Consider using @aria-describedby@ to provide references to instructions or error information.',
          'When there is more than one widget of the same type on a page, they need an label for users to uniquely identify the form control.'
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML Specification: The @label@ element',
            url:   'https://html.spec.whatwg.org/#the-label-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML Specification: The @title@ attribute',
            url:   'https://html.spec.whatwg.org/#the-title-attribute'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H65'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA6: Using aria-label to provide labels for objects',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA9'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'MDN Web Docs: ARIA ',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'Web Fundamentals: Introduction to ARIA',
            url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
          }
        ]
    },
    WIDGET_13: {
        ID:                    'Widget 13',
        DEFINITION:            'ARIA roles that prohibit accessible names %s not have an accessible name defined using @aria-label@ or @aria-labelledby@ attributes.',
        SUMMARY:               'Role does not support accessible name.',
        TARGET_RESOURCES_DESC: 'ARIA roles which prohibit an accessible name',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Remove @aria-label@ or @aria-labelledby@ from the element with a role that prohibits the use of naming techniques.',
          FAIL_P:   'Remove @aria-label@ or @aria-labelledby@ from the %N_F elements with roles that prohibit the use of naming techniques.',
          HIDDEN_S: 'The element with an widget role that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H elements with @aria-label@ or @aria-labelledby@ that are on elements and/or have roles that prohibit the use of naming techniques.',
          NOT_APPLICABLE:  'No elements with @aria-label@ or @aria-labelledby@ that are on elements and/or have roles that prohibit the use of naming techniques where found.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_FAIL_1:    'Remove @aria-label@ or @aria-labelledby@ attribute from @%1@ element with role @%2@.',
          ELEMENT_FAIL_2:    'Remove @aria-label@ or @aria-labelledby@ attribute from @%1@ element.',
          ELEMENT_HIDDEN_1:  'Element @%1[role="%2"]@ was not tested because it is hidden from assistive technologies.',
          ELEMENT_HIDDEN_2:  'Element @%1@ was not tested because it is hidden from assistive technologies.'
        },
        PURPOSES: [
          'Providing an accessible name for elements or roles provides a way for users to identify the purpose of each landmark, widget, link, table and form control on a web page.',
          'Versions of the ARIA specification before 1.2 allowed @aria-label@ or @aria-labelledby@  to be used on any element, even if an accessible name was not useful .',
          'For example, defining an accessible name on a @p@ element or an element with @role=none@ does not provide any useful accessibility information to assistive technologies.  For a @p@ element the text content is the only part that is needed by assistive technologies.'
        ],
        TECHNIQUES: [
          'Remove @aria-label@ or @aria-labelledby@ attribute from the element.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          }
        ]
    },
    WIDGET_14: {
        ID:                    'Widget 14',
        DEFINITION:            'Verify the live region has the appropriate ARIA markup to indicate whether or how the screen reader will interrupt the user with a change notification.',
        SUMMARY:               'Verify appropriate use of live region',
        TARGET_RESOURCES_DESC: 'Elements with @alert@, @log@ or @status@ roles or the @aria-live@ attribute',
        RULE_RESULT_MESSAGES: {
          FAIL_S:          'One element identified as a live region has a conflict between the implied attribute values of the role and the defined attribute values.',
          FAIL_P:          'The %N_F elements identified as live regions have conflicts between the implied attribute values of their roles and the defined attribute values.',
          HIDDEN_S:        'One element identified as a live region is hidden and was not evaluated.',
          MANUAL_CHECK_S:  'Verify the element identified as a live region has the appropriate ARIA markup for the type of informational change that can occur.',
          MANUAL_CHECK_P:  'Verify the %N_MC elements identified as live regions have the appropriate ARIA markup for the type of informational changes that can occur in those regions.',
          HIDDEN_P:        '%N_H elements identified as live regions are hidden and were not evaluated.',
          NOT_APPLICABLE:  'No elements were identified as live regions on the page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_FAIL_1:     'The @aria-live@ attribute value of @%1@ conflicts with the default value of @%2@ for the @aria-live@ property of the @%3@ role.',
          ELEMENT_FAIL_2:     'The @aria-atomic@ attribute value of @false@ conflicts with the default value of @true@ for the @aria-atomic@ property of the @%1@ role.',
          ELEMENT_MC_1:       'Verify the @aria-live@ attribute value of @%1@ is appropriate for the type of informational change that can occur in the region.',
          ELEMENT_MC_2:       'Verify the @alert@ role identifies a live region with critical time-sensitive information.',
          ELEMENT_MC_3:       'Verify the @log@ role identifies a live region where new information added and deleted in a meaningful order.',
          ELEMENT_MC_4:       'Verify the @alert@ role identifies a live region with advisory information.',
          ELEMENT_HIDDEN_1:   '@%1[arial-live="%2"]@ was not evaluated because it is hidden from assistive technologies.',
          ELEMENT_HIDDEN_2:   '@%1[role="%2"]@ was not evaluated because it is hidden from assistive technologies.'
        },
        PURPOSES: [
          'ARIA live regions provide a mechanism for displaying dynamic text content on a page such that changes in the content will be automatically announced to screen reader users while they are focusing on other parts of the page.',
          'The manner in which informational changes in live regions are announced to screen reader users is controlled by three separate ARIA roles that may be assigned to the region: @alert@, @log@ and @status@.',
          'In general, live regions should be used sparingly, since live regions that are constantly announcing changes become distracting, and may prevent the user from completing the task they are working on.',
          'A common misuse of live regions is to announce the opening of pull down menus or dialog boxes: These types of announcements are better handled through the appropriate use of other ARIA markup such as the @menu@ and @dialog@ roles.'
        ],
        TECHNIQUES: [
          'The @alert@ role identifies a live region with very important, and usually time-sensitive, information. When the information changes in this type of live region, a message is typically sent that interrupts the current speech being spoken by a screen reader. Examples includes transaction errors that are cancelling or impeding the progress of completing a financial transaction.',
          'The @log@ role identifies a type of live region where new information is added in a meaningful order and old information may disappear. Examples include chat logs, messaging history, game log, or an error log.',
          'The @status@ role identifies a live region that contains an advisory message, but one that is not important enough to justify an @alert@ role. This type of region is often, but not necessarily, presented as a status bar, and announcements of informational changes are typically delayed until a break occurs in the current speech being read by the screen reader software.',
          'When the @aria-atomic@ attribute is specified for a live region, it indicates to assistive technologies that when a change occurs, it should re-render all of the content or just the changes.',
          'The optional @aria-relevant@ attribute on a live region indicates what types of informational changes should be communicated to the user (e.g. @additions@, @deletions@, @text@ and @all@).',
          'The @aria-live@ attribute can be used to create custom live regions, with possible values of @polite@, @assertive@ and @off@. When used in conjunction with the ARIA @alert@, @log@ or @status@ roles, care must be taken in order to avoid conflicts with the default properties of those roles.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.OTHER,
            title: 'Mozilla Developer Network: ARIA Live Regions',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/WIDGET_Live_Regions'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Alert Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#alert'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Log Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#log'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Status Role',
            url:   'https://www.w3.org/TR/wai-aria-1.2/roles#status'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-live',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-live'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-atomic',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-atomic'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-relevant',
            url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-relevant'
          }

        ]
    },
    WIDGET_15: {
        ID:                    'Widget 15',
        DEFINITION:            'ARIA attributes that have been deprecated for a role %s be removed.',
        SUMMARY:               'Remove deprecated ARIA attributes.',
        TARGET_RESOURCES_DESC: 'Roles where ARIA attributes are deprecated.',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Remove the deprecated ARIA attribute from the element.',
          FAIL_P:   'Remove the deprecated ARIA attributes from the %N_F elements.',
          HIDDEN_S: 'The element with deprecated ARIA attribute that is hidden and was not evaluated.',
          HIDDEN_P: '%N_H elements with deprecated ARIA attributes that are hidden were not evaluated.',
          NOT_APPLICABLE:  'No elements with deprecated ARIA attributes found.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_FAIL_1:    'Remove @%1@ attribute from @%2@ element with role @%3@.',
          ELEMENT_FAIL_2:    'Remove @%1@ attribute from @%2@ element which has an implicit role of "@%3@".',
          ELEMENT_HIDDEN_1:  'The @%1@ attribute on the @%2[role="%3"]@ element was not tested because it is hidden from assistive technologies.',
          ELEMENT_HIDDEN_2:  'The @%1@ attribute on the @%2@ element which has the implicit role of "@%3@"" was not tested because it is hidden from assistive technologies.'
        },
        PURPOSES: [
          'Not all ARIA properties and states are useful on every ARIA role and starting with ARIA 1.2 certain states and properties that were once considered global have been deprecated on specific roles.',
          'The ARIA in HTML specification defines implicit roles for most HTML elememnts.',
          'The same ARIA property and state restrictions on explicit roles apply to implicit roles.'
        ],
        TECHNIQUES: [
          'Remove the deprecated ARIA attribute from the element.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'ARIA in HTML',
            url:   'https://www.w3.org/TR/html-aria/'
          },
          { type: REFERENCES.WCAG_TECHNIQUE,
            title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          }
        ]
    },
    WIDGET_16: {
        ID:                    'Widget 16',
        DEFINITION:            'Custom elements (HTML elements created using the Web Components APIs) with closed Shadow DOMs %s be manually checked for accessibility requirements.',
        SUMMARY:               'Closed shadow DOM requires manual check.',
        TARGET_RESOURCES_DESC: 'Custom elements created using web components API with closed shadow DOM.',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify the custom element with a closed shadow DOM meets WCAG accessibility requirments.',
          MANUAL_CHECK_P:  'Verify the %N_MC custom elements with a closed shadow DOM meet WCAG accessibility requirments.',
          HIDDEN_S: 'A custom element with a closed shadow DOM is hidden and only needs to be checked if has features that become visible need to be checked for accessbility.',
          HIDDEN_P: '%N_H custom elements with a closed shadow DOM are hidden and only the custom elements with features that may become visible need to be checked for accessibility.',
          NOT_APPLICABLE:  'No custom elements found on the page.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1:       'Verify the accessibility of the "@%1@"" custom component with a closed shadow DOM using manual checking techniques or automated tools that can anlyze the shadow DOM of custom elements.',
          ELEMENT_HIDDEN_1:  'The @%1@ custom element with a closed shadow DOM is hidden from assistive technologies.',
        },
        PURPOSES: [
          'Custom elements, defined using the Web Components APIs of HTML 5, are typically used for creating interactive widgets on a web page. A custom element effectively creates a self-scoped package of HTML, CSS and JavaScript that uses the Shadow DOM to insulate itself from other CSS and JavaScript defined by the parent document.',
          'Because custom elements use the Shadow DOM and thus are not part of the legacy DOM, they can only be accessed by the evaluation library for programmatic checking of accessibility features when the shadow DOM is "open".',
          'The evaluation library is unable to analyze custom elements created with "closed" shadow DOMs. In the case of the "closed" shadow DOM all accessibility requirements require manual checks, possibly by using other DOM inspection tools to identify accessibility issues and features.'
        ],
        TECHNIQUES: [
          'In evaluating custom elements with "closed" shadow DOMs that render as interactive widgets, the most important manual checks involve keyboard navigation and operability, and focus styling, which are related to the various ways a user may interact with the widget.',
          'Test with screen readers to verify functionality is operable by a screen reader user.',
          'Test the graphical rendering in operating system using high contrast settings to verify content is perceivable by people with visual impairments.',
          'Use accessibility tools in browser DOM inspectors to assist with manual inspection, since the DOM inspector of most  browsers allows access to the Shadow DOM of the custom element.',
          'You can use the accessibility rules in this tool to help guide your manual testing procedures.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'MDN: Web Components',
            url:   'https://developer.mozilla.org/en-US/docs/Web/Web_Components'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'WebComponents.org: Introduction',
            url:   'https://www.webcomponents.org/introduction'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Web Content Accessibility Guidelines (WCAG)',
            url:   'https://www.w3.org/TR/WCAG/'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification',
            url:   'https://www.w3.org/TR/wai-aria-1.2/'
          },
          { type: REFERENCES.EXAMPLE,
            title: 'ARIA Authoring Practices',
            url:   'https://www.w3.org/WAI/ARIA/apg/'
          }
        ]
    }
}
