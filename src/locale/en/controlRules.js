/* controlRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const controlRules = {
  CONTROL_1: {
      ID:         'Control 1',
      DEFINITION: 'Each @input@, @select@, @textarea@, @progress@ and @meter@ element must have an accessible name using @label@ elements.',
      SUMMARY:    'Form controls must have labels',
      TARGET_RESOURCES_DESC: '@input@, @select@, @textarea@, @progress@ and @meter@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a label to the form control element that is unlabelled.',
        FAIL_P:   'Add labels to the %N_F form control elements that are unlabelled.',
        MANUAL_CHECK_S: 'Verify the visual rendering of the SVG content of the element with @role=button@ adapts to operating system and browser color and size settings.',
        MANUAL_CHECK_P: 'Verify the visual rendering of the SVG content of the %N_MC elements with @role=button@ adapt to operating system and browser color and size settings.',
        NOT_APPLICABLE: 'No @input@, @select@, @textarea@, @progress@ or @meter@ elements on the page.',
        HIDDEN_S: 'One form control element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H form control elements that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ control has the label: "%2"',
        ELEMENT_FAIL_1:   'Add label to @%1@ control.',
        ELEMENT_MC_1:     'Verify the table cell headers provide a descriptive label for the @%1@ control..',
        ELEMENT_HIDDEN_1: '@%1@ control was not tested because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'A label associated with a form control ensures that information about the form control is spoken by screen readers when it receives focus.'
      ],
      TECHNIQUES: [
        'The preferred technique for labeling form controls is by reference: First, include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.',
        'NOTE: An alternative technique of using the @label@ element to encapsulate a the form control element does not fully support some assistve technologies, like speech input for activating the control.',
        'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
        'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.',
        'In special cases, the @title@ attribute on the form control element can be used to provide an explicit text description of its purpose.',
        'EXCEPTION: When form controls are in a @table@, @grid@ or @treegrid@ the row number and the header cells is a common practice to identify the purpose of the form control.  While this technique is widely used it has not been identified as a definitive way to meet WCAG labeling requirements.'
      ],
      MANUAL_CHECKS: [
        'Good labels are both concise and descriptive of the control elements purpose.',
        'If control elements are arranged in groups, use @fieldset/legend@ elements@ to provide a grouping label.',
        'Consider using @aria-describedby@ to provide references to instructions or error information related to the form control.',
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/multipage/forms.html#the-label-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @title@ attribute',
          url:   'https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H65'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
        }
      ]
  },
  CONTROL_2: {
      ID:         'Control 2',
      DEFINITION: 'Every @input@ type @image@ element must have an @alt@ or @title@ attribute with content.',
      SUMMARY:    'Image button must have alt. content',
      TARGET_RESOURCES_DESC: '@input[type="image"]@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add an @alt@ attribute to the @input[type="image"]@ element that does not have alt. content.',
        FAIL_P:   'Add an @alt@ attribute to the %N_F @input[type="image"]@ elements that do not have alt. content.',
        HIDDEN_S: 'The @input@ type @image@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @input@ type @image@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @input[type="image"]@ elements on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: 'Image button has an accessible name: %1',
        ELEMENT_FAIL_1: 'Add @alt@ attribute with text content.',
        ELEMENT_FAIL_2: 'Add text content to the @alt@ attribute.',
        ELEMENT_HIDDEN_1: 'Image button was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Alternate content associated with an image-based form control ensures that information about the control is spoken by screen readers when it receives focus.'
      ],
      TECHNIQUES: [
        'The @alt@ attribute is the preferred and most commonly used way to provide an accessible label for @input@ type @image@ elements.',
        'In special cases, the @title@ attribute can be used on the @input@ type @image@ element to provide an explicit text description of its purpose.',
        'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
        'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @input[type=image]@ element',
          url:   'https://html.spec.whatwg.org/#image-button-state-(type=image)'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @title@ attribute',
          url:   'https://html.spec.whatwg.org/#attr-title'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H36: Using alt attributes on images used as submit buttons',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H36'
        }
      ]
  },
  CONTROL_3: {
      ID:         'Control 3',
      DEFINITION: 'A related group of radio buttons must have a grouping label.',
      SUMMARY:    'Radio buttons must have grouping label',
      TARGET_RESOURCES_DESC: '@input[type="radio"]@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a @fieldset@ container with a @legend@ label for the @input[type="radio"]@ element NOT in a grouping container.',
        FAIL_P:   'Add a @fieldset@ container with a @legend@ label for each group of the %N_F @input[type="radio"]@ elements NOT in a grouping container.',
        HIDDEN_S: 'The @input[type="radio"]@ that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @input[type="radio"]@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @input[type="radio"]@ elements on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: 'Radio button has grouping label "%1" from @fieldset/legend@ elements.',
        ELEMENT_PASS_2: 'Radio button has grouping label "%3x" from @%1[role=%2]@ element.',
        ELEMENT_FAIL_1: 'Add a @fieldset@ element with a @legend@ element to provide a grouping label for the radio buttons.',
        ELEMENT_FAIL_2: 'The @fieldset@ element has a missing or empty @legend@ element.',
        ELEMENT_FAIL_3: 'The @%1[role=%2]@ grouping element does not have an accessible name.',
        ELEMENT_HIDDEN_1: 'Radio button was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Radio buttons that provide a set of related options need grouping information and a common grouping label to provide the overall context for those options.',
        'Screen readers treat grouping labels differently than standard labels, typically speaking the grouping label only once when focus is first moved to one the groups controls.'
      ],
      TECHNIQUES: [
        'The @fieldset@/@legend@ element combination is the preferred technique for providing a grouping information and label for a related group of radio buttons.',
        'If the @fieldset@/@legend@ technique cannot be used, use @[role=group]@ on a container element that contains the related radio buttons, and the container element must have an accessible name representing the grouping label.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @fieldset@ element',
          url:   'https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @legend@ element',
          url:   'https://html.spec.whatwg.org/multipage/form-elements.html#the-legend-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @group@ role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/roles#group'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Web checklist: HTML example 6',
          url:   'https://www-03.ibm.com/able/guidelines/web/webstructure.html'
        }
      ]
  },
  CONTROL_4: {
      ID:         'Control 4',
      DEFINITION: '@button@ elements should have visible text content.',
      SUMMARY:    '@button@s should have text content',
      TARGET_RESOURCES_DESC: '@button@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Use text content to define the visible label of the element with @role=button@.',
        FAIL_P:   'Use text content to define the visible labels of the %N_F elements with @role=button@.',
        MANUAL_CHECK_S: 'Verify the visual rendering of the SVG content of the element with @role=button@ adapts to operating system and browser color and size settings.',
        MANUAL_CHECK_P: 'Verify the visual rendering of the SVG content of the %N_MC elements with @role=button@ adapt to operating system and browser color and size settings.',
        HIDDEN_S: 'The @button@ that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @button@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No @button@ elements on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: 'The @input[type=%1]@ uses the @value@ attribute to define the graphically rendered label.',
        ELEMENT_FAIL_1: 'Use the @value@ attribute of the @input[type=%1]@ element to define the graphically rendered label.',
        ELEMENT_HIDDEN_1: '@input[type=%1]@ element was not evaluated because it is hidden from the graphical rendering.',
        ELEMENT_PASS_2: '@button@ element uses the text content for the graphically rendered label.',
        ELEMENT_FAIL_2: 'Use text content to define the graphically rendered label for the @button@ element.',
        ELEMENT_MC_2:   'Verify the SVG content of the @button@ element adapts to operating system and browser color preference settings.',
        ELEMENT_HIDDEN_2: '@button@ element was not evaluated because it is hidden from graphical rendering.',
        ELEMENT_PASS_3: 'The @%1[role=button]@ element uses text content for the graphically rendered label.',
        ELEMENT_FAIL_3: 'Use text content to define the graphically rendered label for the @%1[role=button]@ element.',
        ELEMENT_FAIL_4: 'Change the @input[type=image]@ to a button that can use text content for the visual label.',
        ELEMENT_MC_3:   'Verify the SVG content of the @%1[role=button]@ element adapts to operating system and browser color preference settings.',
        ELEMENT_HIDDEN_3: '@%1[role=button]@ element was not evaluated because it is hidden from graphical rendering.'
      },
      PURPOSES: [
        'The use of rendered text supports people with visual impairments and learning disabilities to use operating system and browser settings to adjust size and color to make it esaier to perceive the purpose of the button.',
        'The use of text content as the accessible name insures that the visible name and the accessible name are the same, reducing the chance the accessible name not describing the purpose of the button.'
      ],
      TECHNIQUES: [
        'The accessible name of a @button@ element or an element with @role=button@ by default is its text content.',
        'The accessible name of a @input[type=button]@ element is the @value@ attribute content.',
        'SVG graphics can be used to create content (e.g. icons) that can adapt to operating system and browser settings for color and size, but requires manual testing to insure content adapts to user preferences.',
        'Do not use @input[type=image]@ elements, instead use other botton elements that support text content for the visual label.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @button@ element',
          url:   'https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @input[type=button]@ element',
          url:   'https://html.spec.whatwg.org/multipage/input.html#button-state-(type=button)'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        }
      ]
  },
  CONTROL_5: {
      ID:         'Control 5',
      DEFINITION: 'All @id@ attribute values must be unique on the page.',
      SUMMARY:               '@id@ must be unique',
      TARGET_RESOURCES_DESC: 'Form control elements with @id@ attributes',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update elements with @id@ attributes so that each attribute value is unique.',
        FAIL_P:   'Update elements with @id@ attributes so that each attribute value is unique.',
        NOT_APPLICABLE:  'No elements or only one element with an @id@ attribute on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '\'%1\' @id@ attribute value is unique.',
        ELEMENT_FAIL_1: '@%1@ element shares the \'%2\' @id@ value with another element on the page, update the elements to make the @id@s unique.',
        ELEMENT_FAIL_2: 'The hidden @%1@ element shares the \'%2\' @id@ value with another element on the page, update the elements to make the @id@s unique.',
      },
      PURPOSES: [
        '@id@ attribute values on form control elements can be used as references by @label@ elements. When @id@ attribute values on the page are not unique, form controls may be incorrectly labelled.',
        '@aria-labelledby@ and @aria-describedby@ atributes also depend on unique @id@ values for labeling and adding descriptions to form controls.'
      ],
      TECHNIQUES: [
        'If a form control defines an @id@ attribute, ensure that its value is unique on the page.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: @id@ attribute',
          url:   'https://dom.spec.whatwg.org/#concept-id'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'F77: Failure of Success Criterion 4.1.1 due to duplicate values of type ID',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F77'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H88: Using HTML according to spec',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H88'
        }
      ]
  },
  CONTROL_6: {
      ID:         'Control 6',
      DEFINITION: 'Each @label@ element using the @for@ attribute must reference a form control on the page.',
      SUMMARY:    '@label@ must reference control',
      TARGET_RESOURCES_DESC: '@label@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the @label@ element to use the @for@ attribute to label its form control.',
        FAIL_P:   'Change the %N_F @label@ elements to use the @for@ attribute to label their respective form controls.',
        MANUAL_CHECK_S: 'There is one form control being labeled by more than one labeling technique.',
        MANUAL_CHECK_P: 'There are %N_MC form controls being labeled by more than one labeling technique.',
        HIDDEN_S: 'The @label@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @label@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No visible @label@ elements with invalid @for@ references on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@label[for=%1]@ references a form control.',
        ELEMENT_FAIL_1: 'Change the @label@ element with the @for@ attribute value \'%1\' to reference a form control.',
        ELEMENT_MC_1:   'The @label[for=%1]@ is being ingored as a label because the form control is being labeled with @aria-labelledby@ or @aria-label@ attribute.',
        ELEMENT_HIDDEN_1: 'The @label@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        '@label@ elements are useful for accessibility only when they reference form controls.  The use of labels increase the effective size for activation of the control and provide a speak-able label for speech input activation.'
      ],
      TECHNIQUES: [
        'For a @label@ element to properly reference a form control, ensure that the @for@ attribute value on the @label@ element exactly matches the @id@ attribute value on the form control.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element @for@ attribute',
          url:   'https://html.spec.whatwg.org/#attr-label-for'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        }
      ]
  },
  CONTROL_7: {
      ID:         'Control 7',
      DEFINITION: 'Every @label@ and @legend@ element must contain text content.',
      SUMMARY:    '@label@ must have content',
      TARGET_RESOURCES_DESC: '@label@ and @legend@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Use text content in @label@ or @legend@ element for the visual rendering to adapt to operating system and browser color and size settings.',
        FAIL_P:   'Use text content in %N_F @label@ or @legend@ elements for the visual rendering to adapt to operating system and browser color and size settings.',
        MANUAL_CHECK_S: 'Verify the visual rendering of the SVG content of the @label@ or @legend@ element adapts to operating system and browser color and size settings.',
        MANUAL_CHECK_P: 'Verify the visual rendering of the SVG content of the %N_MC @label@ or @legend@ elements adapt to operating system and browser color and size settings.',
        HIDDEN_S: 'The @label@ or @legend@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @label@ or @legend@  elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No @label@ or @legend@  elements on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element uses the text content for the graphically rendered label.',
        ELEMENT_FAIL_1: 'Use text content to define the graphically rendered content for the @%1@ element.',
        ELEMENT_MC_1:   'Verify the SVG content of the @%1@ element adapts to operating system and browser color preference settings.',
        ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from graphical rendering.',
      },
      PURPOSES: [
        'The use of rendered text supports people with visual impairments and learning disabilities to use operating system and browser settings to adjust size and color to make it esaier to perceive the purpose of the button.',
        'The use of text content as the accessible name insures that the visible name and the accessible name are the same, reducing the chance the accessible name not describing the purpose of the button.'
      ],
      TECHNIQUES: [
        'The accessible name of a @label@ and @legend@ elements is its text content.',
        'SVG graphics can be used to create content (e.g. icons) that can adapt to operating system and browser settings for color and size, but requires manual testing to insure content adapts to user preferences.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/dev/forms.html#the-label-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN <label>: The Input Label element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @legend@ element',
          url:   'https://html.spec.whatwg.org/dev/form-elements.html#the-legend-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN <legend>: The Field Set Legend element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using @label@ elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H88: Using HTML according to spec',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H88'
        }
      ]
  },
  CONTROL_8: {
      ID:         'Control 8',
      DEFINITION: 'Every @fieldset@ element must contain exactly one @legend@ element.',
      SUMMARY:    '@fieldset@ must have one @legend@',
      TARGET_RESOURCES_DESC: '@fieldset@ and @legend@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @fieldset@ element such that it contains only one @legend@ element.',
        FAIL_P:   'Update %N_F @fieldset@ elements such that each contains only one @legend@ element.',
        HIDDEN_S: 'One @fieldset@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @fieldset@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @fieldset@ elements on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@fieldset@ has one @legend@ element.',
        ELEMENT_FAIL_1: 'Add @legend@ element.',
        ELEMENT_FAIL_2: '@legend@ element is hidden from assistive technologies. Use CSS off-screen positioning instead of CSS display or visibility properties to remove @legend@ from graphical rendering.',
        ELEMENT_FAIL_3: 'There are %1 @legend@ elements, update the code so the @feildset@ contains only one @legend@ element.',
        ELEMENT_HIDDEN_1: '@fieldset@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Multiple @legend@ elements contained in the same @fieldset@ may result in the improper calculation of labels for assistive technologies.'
      ],
      TECHNIQUES: [
        'A @fieldset@ element should have one and only one @legend@ element to describe the purpose of the form controls it contains.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @fieldset@ element',
          url:   'https://html.spec.whatwg.org/dev/form-elements.html#the-fieldset-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @legend@ element',
          url:   'https://html.spec.whatwg.org/dev/form-elements.html#the-legend-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN <legend>: The Field Set Legend element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H88: Using HTML according to spec',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H88'
        }
      ]
  },
  CONTROL_9: {
      ID:         'Control 9',
      DEFINITION: 'Verify that the @title@ attribute content serves as an appropriate label for the form control, and not only as a tooltip.',
      SUMMARY:    'Verify @title@ is the label.',
      TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Verify that the @title@ attribute is an appropriate label for the form control, and that it is not being used only as a tooltip.',
        MANUAL_CHECK_P: 'Verify that the @title@ attribute is an appropriate label for each of the %N_F form controls, and that it is not being used only as a tooltip.',
        HIDDEN_S: 'The form control element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H form control elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @textarea@, @select@ or @input@ elements on this page with a @title@ attribute.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:   'If possible use the @label@ element or an ARIA technique to label %1 form control instead of using the @title@ attribute.',
        ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'When the @title@ attribute is used for tooltips, it often uses more words than needed to label a form control for users of assistive technologies.',
        'Use @aria-label@ to provide a shorter label to users of assistive technologies if the @title@ attribute content is determined not to be an optimal label.'
      ],
      TECHNIQUES: [
        'The preferred technique for labeling form controls is to use the @label@ element and its @for@ attribute to reference the @id@ attribute value of the form control element.',
        'NOTE: The alternative technique of using the @label@ element to encapsulate a the form control element does not fully support some assistve technologies, like speech input for activating the control.',
        'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
        'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.',
        'The @title@ attribute will be used as the last resort to provide a label for the form control.'
      ],
      MANUAL_CHECKS: [
        'If the @title@ attribute is the labeling technique of last resort, use other form labeling techniques.',
        'Reserve the @title@ attribute for tooltips if they are needed for your form.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: @title@ attribute',
          url:   'https://html.spec.whatwg.org/dev/dom.html#attr-title'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN title attribute',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H88: Using HTML according to spec',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H88'
        }
      ]
  },
  CONTROL_10: {
      ID:         'Control 10',
      DEFINITION: 'Each standard HTML form control and ARIA widget role must have an accessible name that is unique on the page.',
      SUMMARY:    'Accessible name must be unique',
      TARGET_RESOURCES_DESC: '@select@, @textarea@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@, @file@ and ARIA widget roles',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the accessible name for the %N_F form controls and ARIA widgets with duplicate names to uniquely identify the purpose of each control on the page.',
        FAIL_P:   'Update the accessible names for the %N_F form controls and ARIA widgets with duplicate names to uniquely identify the purpose of each control on the page.',
        MANUAL_CHECK_S: 'Verify the accessible name of the button accurately describes the function of the button.',
        MANUAL_CHECK_P: 'Verify the accessible names of the %N_MC buttons with duplicate names accurately describe the function of each button.',
        HIDDEN_S: 'The form control or ARIA widget element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H form control and/or ARIA widget elements or widgets that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No form controls or only one form control on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: 'Accessible name is unique.',
        ELEMENT_FAIL_1: 'Change the accessible name of the @%1[role=%2]@ element, consider using @fieldset@ and @legend@ elements to provide grouping label or an ARIA technique to make the accessible name unique on the page.',
        ELEMENT_FAIL_2: 'Change the accessible name of the @%1@ element, consider using @fieldset@ and @legend@ elements to provide grouping label or an ARIA technique to make the accessible name unique on the page.',
        ELEMENT_MC_1:   'Verify the accessible name of the @%1[role=%2]@ element accurately describes the action of the button, since it shares the same name as other buttons.',
        ELEMENT_MC_2:   'Verify the accessible name of the @%1@ element accurately describes the action of the button, since it shares the same name as other buttons',
        ELEMENT_MC_3:   'Verify the cell headers of the cell containing the @%1@ element accurately describes the purpose of the control',
        ELEMENT_HIDDEN_1: '@%1[role=%2]@ control was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@%1@ control was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Accessibe names that are unique make it possible for people to understand the different purposes of form controls on the same page.',
        'For controls with required parent elements, the accessible name only needs to be unique with the sibling controls.'
      ],
      TECHNIQUES: [
        'The preferred technique for labeling standard HTML form controls is by reference: First, include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.',
        'NOTE: The alternative technique of using the @label@ element to encapsulate a the form control element does not fully support some assistve technologies, like speech input for activating the control.',
        'The @fieldset@ and @legend@ elements can be used add a grouping label to the form controls contained in the @fieldeset@ element.',
        'For ARIA widgets and special cases of standard HTML form controls, the @aria-labelledby@ attribute can be used to reference the id(s) of the elements on the page that describe its purpose.',
        'For ARIA widgets and special cases of standard HTML form controls, the @aria-label@ attribute can be used to provide an explicit text description of its purpose.',
        'For ARIA widgets and special cases of standard HTML form controls, the @title@ attribute can be used to provide an explicit text description of its purpose.',
        'For @input[type=submit]@ the default label is "Submit", but the label can be changed using other labeling techniques if there is more than one submit button on the page.',
        'For @input[type=reset]@ the default label is "Reset", but the label can be changed using other labeling techniques if there is more than one reset button on the page.',
        'For @input[type=image]@ the default label is defined using the @alt@ attribute.',
        'For @input[type=button]@ the default label is defined using the @value@ attribute.',
        'For the @button@ element, the child text content can be used to define its purpose.',
        'For some ARIA widgets (e.g. @menuitem@, @tab@, @treeitem@), the child text content can be used to define its purpose.',
        'EXCEPTION: When form controls are in a @table@, @grid@ or @treegrid@ the row number and the header cells is a common practice to identify the purpose of the form control.  While this technique is widely used it has not been identified as a definitive way to meet WCAG labeling requirements.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA APG: Providing Accessible Names and Descriptions',
          url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/'
        },        
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN: The Input Label element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN: The Fieldset/Legend element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H65'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/dev/forms.html#the-label-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @legend@ element',
          url:   'https://html.spec.whatwg.org/dev/form-elements.html#the-legend-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @title@ attribute',
          url:   'https://html.spec.whatwg.org/multipage/dom.html#attr-title'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
        }
      ]
  },
  CONTROL_11: {
      ID:         'Control 11',
      DEFINITION: 'If there is more than one form on a page, each submit and reset button must have a unique label.',
      SUMMARY:    'Submit and reset button labels must be unique',
      TARGET_RESOURCES_DESC: 'submit and reset buttons',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the labeling of the submit or reset button to uniquely identify which form on the page will be sumnitted or reset on the page.',
        FAIL_P:   'Change the labeling of the %N_F submit or reset buttons to uniquely identify which form on the page will be sumnitted or reset on the page.',
        HIDDEN_S: 'The submit or reset button that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H submit and/or reset buttons that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No forms or only one form with submit or reset buttons on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_FAIL_1: 'Change the accessible name of the @%1[type="%2"]@ element to create a unique name for the form\'s %2 button, current accessible name is "%4".',
        ELEMENT_PASS_1: 'The accessible name of the @%1[type="%2"]@ element is unique for form\'s %2 button on the page, current accessible name is "%3".',
        ELEMENT_HIDDEN_1: '@%1[type="%2"]@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page.',
        '@submit@ and @reset@ form controls have default labels and if these are present on more than one form on a page, the user may not understand which form they are submitting.'
      ],
      TECHNIQUES: [
        'The preferred technique for changing the default label for @input[type="submit"]@ and @input[type="reset"]@ controls is the @value@ attribute.',
        'The preferred technique for changing the default label for @button[type="submit"]@ and @button[type="reset"]@ controls is the text content of the button.',
        'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
        'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
          url: 'https://www.w3.org/WAI/tutorials/forms/'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA APG: Providing Accessible Names and Descriptions',
          url: 'https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/'
        } ,
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @form@ element',
          url:   'https://html.spec.whatwg.org/multipage/forms.html#the-form-element'
        },
      ]
  },

  CONTROL_12: {
      ID:         'Control 12',
      DEFINITION: 'Forms must use @input[type="submit"]@ or other form control buttons for submitting forms.',
      SUMMARY:    'Forms submitted using buttons',
      TARGET_RESOURCES_DESC: '@input[type="submit"]@, @input[type="button"]@, @input[type="image"]@, @button@, @[role="button"]@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Verify that the form has uses a button to submit the form.',
        MANUAL_CHECK_P: 'Verify that each of the %N_MC forms has a button used to submit the form.',
        FAIL_S:    'No button elements found for submitting the form.',
        FAIL_P:    'No button elements found for submitting %N_MC forms.',
        HIDDEN_S:  'The form that is hidden was not evaluated.',
        HIDDEN_P:  'The %N_H forms that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No form controls on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: 'The form has an @input[type="submit"]@.',
        ELEMENT_PASS_2: '@input[type="submit"]@ is used for form submission.',
        ELEMENT_FAIL_1: 'The form has no button elements.',
        ELEMENT_MC_1: 'Verify that the button element contained in the form can be used for form submission.',
        ELEMENT_MC_2: 'Verify that at least one of the %1 button elements contained in the form can be used for form submission.',
        ELEMENT_MC_3: 'Verify if the @input[type="%1"]@ element can be used to  submit the form.',
        ELEMENT_MC_4: 'Verify if the @button@ element can be used to  submit the form.',
        ELEMENT_MC_5: 'Verify if the @%1[role="button"]@ element can be used to  submit the form.',
        ELEMENT_HIDDEN_1: '@form@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@input[type="submit"]@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_3: '@input[type="%1"]@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_4: '@button@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_5: '@%1[role="button"]@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Using a submit button allows users to easily identify and control how to  submit form information to a server for processing.  Forms that are submitted through changes in focus or selection may result in users prematurely submitting the form or not being aware they submitted the form.'
      ],
      TECHNIQUES: [
        'The preferred technique for submitting forms is with the use of the input[type="submit"] form control.',
        'An alternative techniques include using other HTML form control elements, including @input[type="button"]@, @input[type="image"]@ or @button@ elements with an accessible name indicating that the button is for submitting form information.',
        'In the case when a non-form control element (e.g. @a@ or @div@ element) is being used to submit the form, the element can use ARIA [role="button"] attribute with the accessible name indicating that the button is for submitting form information.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @input[type="submit"]@ element',
          url:   'https://html.spec.whatwg.org/#submit-button-state-(type=submit)'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H32: Providing submit buttons',
          url:   'https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/H32'
        }
      ]
  },
 CONTROL_13: {
      ID:         'Control 13',
      DEFINITION: 'For @input@ elements use the @name@ attribute to define inputs that support auto fill.',
      SUMMARY:    '@name@ attribute supports auto fill',
      TARGET_RESOURCES_DESC: '@input@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:   'Determine if users would benefit if the @input@ element could be auto filled, if the would use the @name@ attribute.',
        MANUAL_CHECK_P:   'Determine if users would benefit if any of the %N_MC @input@ elements could be auto filled, if the would use the @name@ attribute.',
        NOT_APPLICABLE: 'No @input@ elements on the page.',
        HIDDEN_S: 'The @input@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @input@ elements that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:   'Determine if users would benefit if the @%1@ element would benefit from ',
        ELEMENT_PASS_1:   'The @%1@ element has the @name@ attribute value of @%2@.x',
        ELEMENT_HIDDEN_1: '@%1@ control was not tested because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'People with language and memory related disabilities or disabilities that affects executive function and decision-making benefit from the browser auto-filling personal information (such as name or address) when the autocomplete attribute is used to meet this Success Criterion, which means information does not need to be remembered by the user.',
        'People with cerebral palsy, stroke, head injury, motor neuron disease or learning disability sometimes prefer images for communication. They can employ assistive technology which adds icons to input fields to communicate the purpose of the fields visually.',
        'People with motor impairments also benefit from reducing the need for manual input when filling out forms.'
      ],
      TECHNIQUES: [
        'Use the @name@ attribute to support auto-fill for @input@ elements.'
      ],
      MANUAL_CHECKS: [
        'Determine of the user would benefit from supporting auto-fill',
        'If the user could benefit, use the @name@ attribute and one of the predefined auto-fill values to support auto-fill for the control.',
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_SPECIFICATION,
          title: 'Understanding SC 1.3.5: Identify Input Purpose',
          url:   'https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html'
        },
        { type:  REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG 2.1 Section 7. Input Purposes for User Interface Componentse',
          url:   'https://www.w3.org/TR/WCAG21/#input-purposes'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'How to Create Autofill Forms',
          url:   'https://www.mightyforms.com/blog/how-to-create-autofill-forms'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev: Autofill',
          url:   'https://web.dev/learn/forms/autofill/'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Technique H98:Using HTML 5.2 autocomplete attributes',
          url: 'https://www.w3.org/WAI/WCAG21/Techniques/html/H98'
        },
        {type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Technique F107: Failure of Success Criterion 1.3.5 due to incorrect autocomplete attribute values',
          url: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/F107'
        }
      ]
  },
  CONTROL_14: {
        ID:                    'Control 14',
        DEFINITION:            '@button@, @fieldset@, @input@, @option@, @select@ and @textarea@ form controls must use native HTML attribute, instead of related ARIA attributes, when available.',
        SUMMARY:               'Use native HTML attributes when available',
        TARGET_RESOURCES_DESC: '@button@, @fieldset@, @input@, @option@, @select@ and @textarea@',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'For the form element use a native HTML attribute instead of the related ARIA attribute.',
          FAIL_P:   'For the %N_F form elements use native HTML attributes instead of the related ARIA attributes.',
          MANUAL_CHECK_S:   'Verify for the form control that you do not want the native disabled behavior of the form control when using @aria-disabled@ attribute, instead of the @disabled@ attribute.',
          MANUAL_CHECK_P:   'Verify for the %N_MC form controls that you do not want the native disabled behavior of the form control when using @aria-disabled@ attribute, instead of the @disabled@ attribute.',
          HIDDEN_S: 'The form control is hidden and was not evaluated.',
          HIDDEN_P: 'The %N_H form controls are hidden were not evaluated.',
          NOT_APPLICABLE:  'No form controls related ARIA attributes.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_FAIL_1:   'Use the @%1@ attribute instead of @%2@ attribute on the @%3@ element.',
          ELEMENT_MC_1:     'Verify the use of the @%1@ attribute instead of the native @%2@ attribute on the @%3@ element.',
          ELEMENT_HIDDEN_1: 'The @%1@ element with the @%2@ attribute was not tested because it is hidden from assistive technologies and/or not visible on screen.'
        },
        PURPOSES: [
          'The native HTML form control attributes, including @checked@, @disabled@, @invalid@, @multple@ and @required@ are related to the ARIA attributes @aria-checked@, @aria-disabled@, @aria-invalid@, @aria-multiselectable@ and @aria-required@ attributes since they communicate the same information to assistive technologies.',
          'If both are used on a HTML form control there is the possibility they might provide conflicting information to the assistive technology, for example the @checked@ attribute is @true@ and the @aria-checked@ attribute is set to @false@.',
          'The native HTML form attributes also effect browser behavior, where the ARIA attributes only effect information communicated to assistive technologies. For example, using the @disabled@ attribute removes the form control from the tab sequence of the page, where setting @aria-disabled=true@ does not effect tab sequence.',
          'Browsers are required by the ARIA specification to always communicate the native HTML attribute information to assistive technologies when their is conflicting information. '
        ],
        TECHNIQUES: [
          'To avoid conflicting information to assistive technologies, use native HTML attributes, instead of related ARIA attributes.',
          'Use @checked@ attribute, instead of @aria-checked@, for the for @input[type=checkbox]@ and @input[type=radio@ elements.',
          'Use @disabled@ attribute, instead of @aria-disabled@, for the for @button@, @fieldset@, @input@, @option@, @select@ and @textarea@ elements.',
          'Use @invalid@ attribute, instead of @aria-invalid@, for the for @button@, @fieldset@, @input@, @option@, @select@ and @textarea@ elements.',
          'Use @mutiple@ attribute, instead of @aria-multiselectable@, for the for the @select@ element.',
          'Use @required@ attribute, instead of @aria-required@, for the for @button@, @fieldset@, @input@, @option@, @select@ and @textarea@ elements.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type: REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Conflicts with Host Language Semantics',
            url:   'https://www.w3.org/TR/wai-aria/#host_general_conflict'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Button Element',
            url:   'https://html.spec.whatwg.org/#the-button-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Fieldset Element',
            url:   'https://html.spec.whatwg.org/#the-fieldset-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Input Element',
            url:   'https://html.spec.whatwg.org/#the-input-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Option Element',
            url:   'https://html.spec.whatwg.org/#the-option-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Select Element',
            url:   'https://html.spec.whatwg.org/#the-select-element'
          },
          { type: REFERENCES.SPECIFICATION,
            title: 'HTML: Textara Element',
            url:   'https://html.spec.whatwg.org/#the-textarea-element'
          }
        ]
    },

    CONTROL_15: {
        ID:                    'Control 15',
        DEFINITION:            'The labels (e.g. accessible name) for controls and widgets that include text or images of text, the name contains the text that is presented visually.',
        SUMMARY:               'Label in name for controls',
        TARGET_RESOURCES_DESC: '@input@, @select@, @textarea@ and widgets',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify the control with images, @aria-label@ and/or references to hidden content contain the same text associated with the visually rendered label associated with the control.',
          MANUAL_CHECK_P:  'Verify that each of the %N_MC controls with images, @aria-label@ and/or references to hidden content contain the same text associated with each of the visually rendered labels associated with each control.',
          HIDDEN_S:  'One control with images, @aria-label@ and/or references to hidden content was not tested because it is hidden from assistive technologies',
          HIDDEN_P:  '%N_H controls with images, @aria-label@ and/or references were not tested because they are hidden from assistive technologies',
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1: 'Verify the image @alt@ text contains any text represented in the image.',
          ELEMENT_MC_2: 'Verify the @aria-label@ contains the same text associated the visually rendered label associated with the control.',
          ELEMENT_MC_3: 'Verify that the computed name of the referenced content includes any rendered text for the control.',
          ELEMENT_HIDDEN_1: 'The hidden control with an accessible name that includes image content was not tested.',
          ELEMENT_HIDDEN_2: 'The hidden control with an accessible name with @aria-label@ content was not tested.',
          ELEMENT_HIDDEN_3: 'The hidden control with an accessible name that includes references to hidden content was not tested.',
          PAGE_MC_1: 'The pages contains '
        },
        PURPOSES: [
          'Voice recognition users can directly activate controls on a page with fewer surprising changes of focus.',
          'Screen reader users will have a better experience because the labels that they hear match the visible text labels that they see on the screen.',
          'In general avoid using images and hidden text for defining accessible names whenever possible.'
        ],
        TECHNIQUES: [
          'If images of text that are part of an accessible name (e.g. label), the alt text must be the same as the text of the image.',
          'If @aria-label@ is used as part of an accessible name (e.g. label), the @aria-label@ contains the same text associated the visually rendered content associated with the control.',
          'If a hidden @aria-labelledby@ reference is used as part of the accessible name (e.g. label), verify the computed name of all the referenced contain has the same text associated the visually rendered label associated with the control.',
          'Accessible names may contain additional information useful to people using assistive technologies, but should start with the visible text associated with the control.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG Understanding Label in Name',
            url:   'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'W3C Accessible Name and Description Computation 1.1',
            url:   'https://www.w3.org/TR/accname-1.1/'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G208: Including the text of the visible label as part of the accessible name',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G208'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G211: Matching the accessible name to the visible label',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G211'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G162: Positioning labels to maximize predictability of relationships',
            url:   'https://www.w3.org/WAI/GL/2016/WD-WCAG20-TECHS-20160105/G162'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F96: Failure due to the accessible name not containing the visible label text',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F96'
          }
        ]
    },

    CONTROL_16: {
        ID:                    'Control 16',
        DEFINITION:            'Use @autocomplete@ attributes or other programmatic techniques that support auto-populating form controls with information previously entered by the user, unless the content meets one of the exceptions related to gaming, security or data validity.',
        SUMMARY:               'Redundant Entry',
        TARGET_RESOURCES_DESC: '@input@, @select@, @textarea@ and widgets',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify if the user benefits from the control supporting auto population.',
          MANUAL_CHECK_P:  'Verify if the user benefits from the any of the %N_MC controls supporting auto population.',
          HIDDEN_S:  'One control was not tested for auto-population because it is hidden from assistive technologies.',
          HIDDEN_P:  '%N_H controls were not tested for auto-population because they are hidden from assistive technologies.',
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1: 'The @autocomplete=%1@ supports auto-populating the form control.',
          ELEMENT_MC_1: 'Verify if the @%1@ element would benefit users by using an @autocomplete@ attribute or other programmatic techniques that supports auto-populating the form control.',
          ELEMENT_MC_2: 'Verify if the @%1@ element would benefit users by using a programmatic techniques that supports auto-populating the form control.',
          ELEMENT_HIDDEN_1: 'The @%1% element is hidden and was not tested for auto-population.'
        },
        PURPOSES: [
          'To ensure that users can successfully complete multi-step processes.',
          'Users with cognitive disabilities experience short-term, working memory difficulty. Not having to repeatedly remember particular information reduces stress and the likelihood of mistakes.',
          'Users who experience difficulty forming new memories, recalling information, and other functions related to cognition can complete processes without having to unnecessarily rely on their memory.',
          'Users with mobility impairments, for example using switch control or voice input, benefit from a reduced need for text entry.'
        ],
        TECHNIQUES: [
          'Add an @autocomplete@ attribute to the form control that would support auto-populating the form control from previously entered information.',
          'There are many other programmatic techniques to support auto-population, including but not limited to the use of cookies, HTTP session variables and server side stored information.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C ARIA Universtanding Redundant Entry',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'MDN HTML attribute: autocomplete',
            url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G221: Provide data from a previous step in a process',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G221'
          }
        ]
    },

  CONTROL_17: {
      ID:                    'Control 17',
      DEFINITION:            'Some assistive technologies, including speech input, do not reliably associate labels with the controls when only label encapsulation is used for labeling.',
      SUMMARY:               'Avoid label encapsulation',
      TARGET_RESOURCES_DESC: '@input@, @select@, @textarea@, @progress@ and @meter@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a an @id@ to the control and use the @ a label to the form control element that is unlabelled.',
        FAIL_P:   'Add labels to the %N_F form control elements that are unlabelled.',
        HIDDEN_S: 'One form control element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H form control elements that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ control is labeled using: %2',
        ELEMENT_FAIL_1:   'Add a @for@ attribute to the @label@ element to reference an @id@ on the associated @%1@ control',
        ELEMENT_HIDDEN_1: '@%1@ control was not tested because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Speech input and other assistive technologies cannot reliably use the label encapsulation method for identifying a label with it\'s associated form control.',
        'Speech input uses the label as part of commands to move focus or change the state of form controls.  Examples of speech input commands include: "click first name" for moving focus to a textbox, "click thick crust" to select a radio button associated with a pizza crust selection.'
      ],
      TECHNIQUES: [
        'When using the @label@ element include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/multipage/forms.html#the-label-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'W3C ARIA Authoring Practices Issue: Naming Form Controls with the Label Element',
          url:   'https://github.com/w3c/aria-practices/issues/2870'
        }

      ]
  }
};


