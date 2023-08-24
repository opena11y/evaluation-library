/* languageRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const languageRules = {

    LANGUAGE_1: {
        ID:                    'Language 1',
        DEFINITION:            'Page must define the language of its principal content using a valid IANA language code.',
        SUMMARY:               'Page must use language code',
        TARGET_RESOURCES_DESC: 'HTML element',
        RULE_RESULT_MESSAGES: {
          FAIL_S:  'Identify the principal language of the web page by using the @lang@ attribute on its @html@ element.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_PASS_1: 'The @html@ element defines the \'%1\' language code.',
          PAGE_FAIL_1: 'Add a @lang@ attribute with a valid IANA code to the  @html@ element of the page.',
          PAGE_FAIL_2: 'Change the language code \'%1\' defined in the @lang@ attribute of the @html@ element to a valid IANA code.'
        },
        PURPOSES: [
          'Assistive technologies like screen readers and other speech output technologies need to know the languages represented by the characters in order to speak the text content correctly.'
        ],
        TECHNIQUES: [
          'Use the @lang@ attribute on the @html@ or @xhtml@ element to define the principal language of the web page.',
          'Use the IANA codes to identify the principal language (e.g. en, fr, ...).'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML4: Specifying the language of content: the lang attribute',
            url:   'https://www.w3.org/TR/html4/struct/dirlang.html#adef-lang'
          },
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML5: The lang and xml:lang attributes',
            url:   'https://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Language tags in HTML and XML',
            url:   'https://www.w3.org/International/articles/language-tags/'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Choosing a Language Tag',
            url:   'https://www.w3.org/International/questions/qa-choosing-language-tags'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'H57: Using language attributes on the html element',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H57'
          }
        ]
    },
    LANGUAGE_2: {
        ID:                    'Language 2',
        DEFINITION:            'Elements with text content in a different language from the principal language of the page must use the @lang@ attribute with a valid IANA language code to identify the change.',
        SUMMARY:               'Identify language changes',
        TARGET_RESOURCES_DESC: 'Elements with text content that is in a different language than the principal language of the page',
        RULE_RESULT_MESSAGES: {
          FAIL_S:  'Change the @lang@ attribute value to a valid IANA language code for the element with the @lang@ attribute.',
          FAIL_P:  'Change the @lang@ attribute values of the %N_F elements with invalid codes to valid IANA language codes.',
          MANUAL_CHECK_S: 'Review the page for any text content that is different than the principal language of the page. If such content is found, use the @lang@ attribute on the appropriate container element to identify the language change.',
          MANUAL_CHECK_P: 'Review the page for any text content that is different than the principal language of the page. If any such content sections are found, use the @lang@ attribute on each of the appropriate container elements to identify the language changes.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_FAIL_1: 'Change the @lang@ attribute value on the element with an invalid code to a valid IANA language code.',
          PAGE_FAIL_2: 'Change the @lang@ attribute values on the %1 elements with invalid codes to valid IANA language codes.',
          PAGE_MC_1: 'One change in language was found on the page. Review the page for any other text content in languages that are different than the principal language of the page. If any more changes in language are found, use the @lang@ attribute to identify them.',
          PAGE_MC_2: '%1 changes in language were found on the page. Review the page for any other text content in languages that are different than the principal language of the page. If any more changes in language are found, use the @lang@ attribute to identify them.',
          PAGE_MC_3: 'Review the page for any text content in a languages that are different than the principal language of the page. If any changes in language are found, use the @lang@ attribute to identify them.',
          ELEMENT_PASS_1: 'The @%1@ element has the valid language code of \'%2\'',
          ELEMENT_FAIL_1: 'Change the value \'%2\' defined for the @lang@ attribute on the @%1@ element to a valid IANA language code.',
          ELEMENT_HIDDEN_1: 'The @%1@ element with the language code \'%2\' is hidden'
        },
        PURPOSES: [
          'Assistive technologies like screen readers and other speech output technologies need to know the language of the characters of an element to speak the text content correctly.'
        ],
        TECHNIQUES: [
          'Use the @lang@ attribute to define the IANA language of the text content of the element.',
          'Use the IANA codes to identify the language of the text in the element (e.g. en, fr, ...).'
        ],
        MANUAL_CHECKS: [
          'Review the page for any text content in languages that are different than the principal language of the page.',
          'If any changes in language are found, use the @lang@ attribute to identify them.'
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML4: Specifying the language of content: the lang attribute',
            url:   'https://www.w3.org/TR/html4/struct/dirlang.html#adef-lang'
          },
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML5: The lang and xml:lang attributes',
            url:   'https://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Language tags in HTML and XML',
            url:   'https://www.w3.org/International/articles/language-tags/'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Choosing a Language Tag',
            url:   'https://www.w3.org/International/questions/qa-choosing-language-tags'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'H58: Using language attributes to identify changes in the human language',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H58'
          }
        ]
    },
    LANGUAGE_3: {
        ID:                    'Language 3',
        DEFINITION:            'Elements with @lang@ attribute must have valid IANA language codes.',
        SUMMARY:               'Valid IANA language codes',
        TARGET_RESOURCES_DESC: 'Elements with lang attributes',
        RULE_RESULT_MESSAGES: {
          NOT_APPLICABLE: 'No elements with @lang@ attribute defined'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   'The @%1@ element defines the \'%2\' language code.',
          ELEMENT_FAIL_1: 'Change the language code \'%2\' defined in the @lang@ attribute of the @%1@ element to a valid IANA language code.',
          ELEMENT_HIDDEN_1: 'The @%1@ element with the language code \'%2\' is hidden.'
        },
        PURPOSES: [
          'Assistive technologies like screen readers and other speech output technologies need to know the language of the characters of an element in order to speak the text content correctly.'
        ],
        TECHNIQUES: [
          'Use the @lang@ attribute to define the IANA language of the text content of the element.',
          'Use the IANA codes to identify the language of the text in the element (e.g. en, fr, ...).'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML4: Specifying the language of content: the lang attribute',
            url:   'https://www.w3.org/TR/html4/struct/dirlang.html#adef-lang'
          },
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML5: The lang and xml:lang attributes',
            url:   'https://www.w3.org/TR/html5/dom.html#the-lang-and-xml:lang-attributes'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Language tags in HTML and XML',
            url:   'https://www.w3.org/International/articles/language-tags/'
          },
          { type:  REFERENCES.OTHER,
            title: 'W3C Internationalization: Choosing a Language Tag',
            url:   'https://www.w3.org/International/questions/qa-choosing-language-tags'
          }
        ]
    }
}
