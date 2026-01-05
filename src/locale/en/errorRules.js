/* errorRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const errorRules = {

  ERROR_1: {
      ID:                    'Error 1',
      DEFINITION:            'Form controls with invalid values must provide information to assistive technologies that the values are invalid.',
      SUMMARY:               'Using @aria-invalid@ to identify the validity of control values.',
      TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the value of @aria-invalid@ property to @true@, on form control that is invalid and @aria-invalid="false"@.',
        FAIL_P:   'Change the value of @aria-invalid@ property to @true@, on %N_F form controls that are invalid and @aria-invalid="false"@.',
        MANUAL_CHECK_S:     'If the form control can be validated make sure it indicates invalid values when invalid.',
        MANUAL_CHECK_P:     'If the %N_MC form controls can be validated make sure they indicates invalid values when invalid.',
        HIDDEN_S: 'The control element that is hidden does not need to be tested for indicating invalid values.',
        HIDDEN_P: 'The %N_H control elements that are hidden do not need to be tested for indicating invalid values.',
        NOT_APPLICABLE:  'No form controls on this page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_FAIL_1:   '@%1@ is invalid (i.e. validity.valid property of the control is "false") change the value of "@aria-invalid@ attribute from @false@ to @true@.',
        ELEMENT_FAIL_2:   '@%1@ is valid (i.e. validity.valid property of the control is "true") change the value of "@aria-invalid@ attribute from @true@ to @false@.',
        ELEMENT_MC_1:     '@%1@ is invalid (i.e. validity.valid property of the control is "false"), verify the label contains information on the value being invalid or add the @aria-invalid="true"@ attribute to the control.',
        ELEMENT_MC_2:     '@%1@ is being tested for validity (i.e. @pattern@ attribute is present), verify the label contains information on the validity or add the @aria-invalid@ attribute to inidcate the state of validity of the control.',
        ELEMENT_MC_3:     'Verify if the @%1@ is being validated. If it is being validated verify it implements a technique to indicate the state of validity to assistive technologies.',
        ELEMENT_MC_4:     '@%1@ has set @aria-invalid@, verify the value represents the validity of the controls value.',
        ELEMENT_PASS_1:   '@%1@ is invalid (i.e. validity.valid property of the control is "false") and the "@aria-invalid=true@" has been set.',
        ELEMENT_PASS_2:   '@%1@ is valid (i.e. validity.valid property of the control is "true") and the "@aria-invalid=false@" has been set.',
        ELEMENT_HIDDEN_1: '%1 form control was not tested for indicating invalid values because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Users must be able to identify form control values which are invalid in order to successfully correct the values and submit the form.'
      ],
      TECHNIQUES: [
        'Native HTML form controls have a support for many types of validity testing, these features should be used before using @aria-invalid@ attribute.',
        'For custom ARIA widgets or when native HTML form control validation is not sufficient, the @aria-invalid@ attribute can used to identify invalid values.',
        'Use @aria-invalid@ attribute to indicate the form control has an invalid value.',
        'Add the text "invalid" to the label of the form control, the text can be placed off screen using CSS.',
        'Add the image to the label.  The image should be visible indicating an invalid value with the alt text \'invalid\'.',
        'NOTE: Native form controls with with validity testing should avoid using @aria-valid@ property, if the @aria-invalid@ is used it must be synchronized with the browsers computed validity value.'
      ],
      MANUAL_CHECKS: [
        'Enter invalid values into form controls that are validated and activate the validation event (i.e. form submission, change of focus...).',
        'For the form controls with invalid values check to make sure the technique for indicating the invalid value is present.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/#the-label-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: aria-invalid',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-invalid'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA21: Using Aria-invalid to Indicate An Error Field',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA21'
        }
      ]
  },
  ERROR_2: {
      ID:                    'Error 2',
      DEFINITION:            'If user input is required for a form control or custom widget the @required@ or @aria-required@ attribute must must used.',
      SUMMARY:               'Using @aria-required@ to identify required form controls and widgets',
      TARGET_RESOURCES_DESC: '@textarea@ and @input[type="text"]@ elements, and ARIA widgets',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Update the form control with @aria-required="false"@ and the @required@ attributes to indicate the true required state of the control.',
        FAUL_P:         'Update the %N_F form controls with @aria-required="false"@ and the @required@ attributes to indicate the true required state of the control.',
        HIDDEN_S:       'The form control element that is hidden does not need to be tested for being required.',
        HIDDEN_P:       'The %N_H form control elements that are hidden do not need to be tested for being required.',
        NOT_APPLICABLE: 'No form controls on this page that need testing for being required.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_FAIL_1:   'The @%1@ element with the attribute @aria-required="false"@ which conflicts with presence of the @required@ attribute.',
        ELEMENT_PASS_1:   'The @%1@ element has the @required@ attribute.',
        ELEMENT_PASS_2:   'The @%1@ element has the @aria-required@ attribute.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not tested because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Users benefit from information being informed if a input to a control is required for form submission or task completion.'
      ],
      TECHNIQUES: [
        'To identify a required form control, add the HTML5 @required@ attribute to the standard form controls.',
        'For custom ARIA widgets use the @aria-required@ attribute to identify widgets with required values to users.',
        'Use the @required@ attribute (or the @aria-required@ if used) as the CSS selector for visually styling the form control as required.  This ensures that the visual state stays synchronized with the accessibility API state used by assistive technologies.',
        'NOTE: Avoid using @aria-required@ attribute on elements that support the @required@ attribute, since the @required@ attribute value will override the @aria-required@ value.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: required attribute',
          url:   'https://www.w3.org/TR/html5/forms.html#attr-input-required'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: aria-required',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-required'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA2: Identifying a required field with the aria-required property',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA2'
        }
      ]
  },
  ERROR_3: {
      ID:                    'Error 3',
      DEFINITION:            'When input error is automatically detected and suggestions are automatically known, the suggestions must be provided to the user (some exceptions).',
      SUMMARY:               'Error correction suggestions',
      TARGET_RESOURCES_DESC: '@textarea@ and @input[type="text"]@ elements, and ARIA textbox, gridcell and combobox widgets',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If the form control element or widget can automatically detect errors and suggest corrections, make sure that at least one accessible technique is used to present the suggestion to the user.',
        MANUAL_CHECK_P: 'If the %N_MC form control elements and/or widgets can automatically detect errors and suggest corrections, make sure that at least one accessible technique is used to present the suggestion to the user.',
        HIDDEN_S:       'The form control element and/or widget that is hidden does not need to be tested for accessible suggestions.',
        HIDDEN_P:       'The %N_H form control elements and/or widgets that are hidden does not need to be tested for accessible suggestions.',
        NOT_APPLICABLE: 'No form controls or widgets on this page that typically can provide suggestions.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'If the @%1@ element can automatically detect errors and suggest corrections, use at least one accessible technique to provide the information to users.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not tested because it is hidden from assistive technologies.',
      },
      PURPOSES: [
        'Users benefit from being informed of invalid input and on how to correct invalid input.'
      ],
      TECHNIQUES: [
        'Add @aria-describedby@ reference on the form control or widget to reference suggestion information.',
        'Use a popup list to provide suggested values for valid input.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: The @label@ element',
          url:   'https://html.spec.whatwg.org/#the-label-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: aria-invalid',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-invalid'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA1'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA19: Using ARIA role=alert or Live Regions to Identify Errors',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19'
        }             ]
  },
  ERROR_4: {
      ID:                    'Error 4',
      DEFINITION:            'To prevent errors when input includes legal and/or financial transactions (e.g. online shopping, banking), the user must be able to either reverse, check or confirm the data before the transaction is finalized.',
      SUMMARY:               'Prevent errors',
      TARGET_RESOURCES_DESC: 'Forms that contain legal or financial transactions including online purchases',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If the form control or widget on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
        MANUAL_CHECK_P: 'If the %N_MC form controls and widgets on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
        HIDDEN_S:       'The form control element and/or widget that is hidden does not need to be tested for accessible suggestions.',
        HIDDEN_P:       'The %N_H form control elements and/or widgets that are hidden does not need to be tested for accessible suggestions.',
        NOT_APPLICABLE: 'No form controls or widgets on this page that typically can provide suggestions.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'If the form control or widget is used as part of a legal and/or financial transaction, make sure the information this control provides can be changed and/or confirmed before the transaction is finalized.',
        PAGE_MC_1:        'If form controls and widgets on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
        ELEMENT_HIDDEN_1: 'The form control or widget was not tested because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'The intent of this rule is to help users with disabilities avoid serious consequences as the result of a mistake when performing an action that cannot be reversed. For example, purchasing non-refundable airline tickets or submitting an order to purchase stock in a brokerage account are financial transactions with serious consequences.'
      ],
      TECHNIQUES: [
        'Provide a confirmation page showing all the user inputs before for final submission of the information for modification of user controlled data on a server.',
        'Provide a means for the user to review previous submissions and give them the ability to cancel or modify previous submissions of legal or financial information.',
        'Use a confirmation checkbox in addition to the submit button, to require the user to confirm the data is valid before submission.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'Understanding SC 3.3.4 Error Prevention (Legal, Financial, Data.)',
          url:   'https://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-reversible.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G164: Providing a stated time within which an online request (or transaction) may be amended or canceled by the user after making the request.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G164'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G98: Providing the ability for the user to review and correct answers before submitting.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G98'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G155: Providing a checkbox in addition to a submit button.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G155'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G99: Providing the ability to recover deleted information.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G99'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G168: Requesting confirmation to continue with selected action.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G168'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G155: Providing a checkbox in addition to a submit button.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G155'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G98: Providing the ability for the user to review and correct answers before submitting.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G98'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: ' G168: Requesting confirmation to continue with selected action.',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G168'
        }
      ]
  }
}
