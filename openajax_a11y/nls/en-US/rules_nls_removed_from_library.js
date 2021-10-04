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
  rules: {

    CONTROL_12: {
      ID:         'Control 12',
      DEFINITION: 'The label for each @button@, @select@, @textarea@ and @input@ element of type @text@, @checkbox@, @radio@, @password@, @submit@, @reset@ and @file@ on a page %s sufficiently describe its purpose.',
      SUMMARY:    'Form labels %s be descriptive',
      TARGET_RESOURCES_DESC: '@button@, @select@, @textarea@ and @input@ elements of type @text@, @checkbox@, @radio@, @password@, @submit@, @reset@ and @file@',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'To the form control missing a label, add a label that describes its purpose.',
        FAIL_P:   'To each of the %N_F form controls missing labels, add a label that uniquely describes its purpose.',
        MANUAL_CHECK_S: 'Verify that the label uniquely describes the purpose of the form control.',
        MANUAL_CHECK_P: 'Verify that the label for each of the %N_MC form controls uniquely describes its purpose.',
        HIDDEN_S: 'The control element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H control elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No form controls on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1: 'Verify that the label "%1" for the @%2@ form control describes its purpose and/or the required input.',
        ELEMENT_FAIL_1: 'Add a @label@ element, use @fieldset@/@legend@ elements or ARIA technique to provide a label for @%1@ form control.',
        ELEMENT_HIDDEN_1: '%1 element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Labels that are sufficiently descriptive make it possible for people to understand the purposes of, and required inputs for, the form controls on the page.'
      ],
      TECHNIQUES: [
        'The preferred technique for labeling form controls is by reference: First, include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.',
        'An alternative technique is to use the @label@ element to encapsulate the form control element.',
        'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
        'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.',
        'Use @aria-describedby@ to provide references to instructions or error information.'
      ],
      MANUAL_CHECKS: [
      'Good labels are both concise and descriptive of the form control purpose.',
      'If form controls are arranged in groups, use @filedset/Legend@ or ARIA labeling techniuqes to include grouping information.',
      'Consider using @aria-describedby@ to provide references to instructions or error information.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @label@ element',
          url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @title@ attribute',
          url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H44: Using label elements to associate text labels with form controls',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H44'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H65'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Labels for Form Controls Overview',
          url:   'https://html.cita.illinois.edu/nav/form/'
        }
      ]
    },

    HEADING_4: {
      ID:                    'Heading 4',
      DEFINITION:            'Heading elements %s describe the sections they label.',
      SUMMARY:               'Headings %s be descriptive',
      TARGET_RESOURCES_DESC: 'Heading elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add an accessible name to the empty heading element, or remove it if it is not needed.',
        FAIL_P:   'Add accessible names to the %N_F empty heading elements, or remove them if they are not needed.',
        MANUAL_CHECK_S:     'Verify that the heading element describes the section that it labels.',
        MANUAL_CHECK_P:     'Verify that each of the %N_MC heading elements describes the section that it labels.',
        HIDDEN_S: 'One heading element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H heading elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No heading elements on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:  'Check %1 element to make sure it describes the section it labels.',
        ELEMENT_FAIL_1:        'Add an accessible name to the %1 element that describes the section it labels, or remove it from the page if it is not needed.',
        ELEMENT_HIDDEN_1:        'The %1 element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'If headings are NOT descriptive or unique they will confuse users of assistive technologies.',
        'There is a balance needed between having too few headings and too many headings on a web page. Make sure that the heading structure provides a good "outline" of the sections and subsections of the page.'
      ],
      TECHNIQUES: [
        'Use the @h1@ element to indicate the start of the main content, by putting it just before the main content.',
        'Use the @h1@ element to provide a title for the web page.',
        'Include heading elements at the proper level for each section of a web page.',
        'Use @aria-describedby@ to provide context for a heading in a web page.',
        'Use headings as labels for ARIA landmarks to provide redundant page navigation capabilities for users of assistive technologies.',
        'Use the CSS @position@ property to remove headings from the graphical rendering, while keeping them accessible to users of assistive technologies.',
        'Do NOT use CSS @display: none@, @visibility: hidden@ or the @hidden@ attribute to hide headings when they are being used to provide section labeling information to users of assistive technologies. Instead use the CSS @position@ property to move the headings off-screen.'
      ],
      MANUAL_CHECKS: [
        'Check the heading structure to make sure the headings represent the sections and subsections of the web page.',
        'Check the headings against other headings on the page to make sure they uniquely describe the content of each section of the web page.',
        'If headings are too similar to each other, users of assistive technologies will not understand the differences between different sections of the web page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G130: Providing descriptive headings',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G130'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G141: Organizing a page using headings',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G141'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Unique Title',
          url:   'https://html.cita.illinois.edu/nav/title/'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Sub Headings',
          url:   'https://html.cita.illinois.edu/nav/heading/'
        }
      ]
    },

    IMAGE_5: {
      ID:         'Image 5',
      DEFINITION: 'If an image element has a width or height of 6 pixels or less, or its alt. text is an empty string, the image %s set its @role@ attribute to @presentation@, or it %s be removed from the page and CSS %s be used for its positioning.',
      SUMMARY:    'Small/decorative images use @role="presentation"@',
      TARGET_RESOURCES_DESC: '@img@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'For the one small image on the page, add @role="presentation"@ or change the text alternative to an empty string (i.e. @alt=""@).',
        FAIL_P:   'For the %N_F small images on the page, add @role="presentation"@ or change the text alternative to an empty string (i.e. @alt=""@).',
        HIDDEN_S: 'One image element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H image elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No small or decorative images with width or height of 6 pixels or less on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'Image element has @role="presentation"@.',
        ELEMENT_PASS_2:   'Image element has @alt=""@.',
        ELEMENT_FAIL_1: 'Add @role="presentation"@ or change the alt. text to an empty string (i.e. @alt=""@).',
        ELEMENT_HIDDEN_1: 'Small images set to @role="presentation"@ was not tested because the @img@ element is hidden from assistive technology'
      },
      PURPOSE: [
        'Small and decorative images (i.e. less than 6 pixels high or wide) can be ignored by assistive technologies',
        'Images with the @alt=""@ attribute should be set to the empty string'
      ],
      TECHNIQUES: [
        'Small images are usually purely stylistic or decorative and the @alt@ text content should be the empty string (i.e. @alt=""@)'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
          url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F30'
        }
      ]
    },

    IMAGE_7: {
      ID:         'Image 7',
      DEFINITION: 'Text markup and CSS %s be used instead of images of text.',
      SUMMARY:    'Verify no images of text',
      TARGET_RESOURCES_DESC: '@img@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Verify that the @img@ element is not an image of text. If it is, convert it to text markup styled with CSS.',
        MANUAL_CHECK_P:  'Verify that the %N_MC @img@ elements are not images of text. Convert any that are to text markup styled with CSS.',
        HIDDEN_S: 'One image element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H image elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No @img@ elements on this page'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'Verify that the @img@ element is not an image of text.  If it is, convert it to text markup styled with CSS.',
        ELEMENT_HIDDEN_1: 'The @img@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'People with visual impairments cannot easily change the font family, or the foreground and background colors of the text in the image to make the text readable.',
        'Images of text can become pixilated, reducing readability, when the text is zoomed.'
      ],
      TECHNIQUES: [
        'Convert images of text to text markup and use CSS styling techniques to style the text content.',
        'Text that is included in logos or that is part of a larger drawing, schematic or picture are excluded from this requirement.'
      ],
      MANUAL_CHECKS: [
        'Verify that the @img@ element is not an image of text. If it is, convert it to text markup styled with CSS.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'W3C Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification',
          url:   'https://www.w3.org/TR/CSS2/'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'How to meet Success Criterion 1.4.5 Images of Text',
          url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-text-presentation'
        }
      ]
    },

    LANDMARK_18: {
        ID:         'Landmark 18',
        DEFINITION: 'Landmark roles %s only be placed on @div@, @span@, @p@, @form@ or HTML5 sectioning elements, which include @nav@, @section@, @main@, @article@, @aside@, @header@, @footer@, @figure@ and @address@.',
        SUMMARY:    'Element restrictions: landmark roles',
        TARGET_RESOURCES_DESC: 'Landmarks',
        RULE_RESULT_MESSAGES: {
          FAIL_S:   'Review the placement of a landmark role on an element that already has default semantics in HTML.',
          FAIL_P:   'Review the placement of landmark roles on %N_F elements that already have default semantics in HTML.',
          HIDDEN_S: 'One landmark that is hidden was not evaluated.',
          HIDDEN_P: '%N_H landmarks that are hidden were not evaluated.',
          NOT_APPLICABLE: 'No landmarks on the page.'
        },
        NODE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '@%1@ landmark is on a @%2@ element.',
          ELEMENT_FAIL_1:   'Change the placement of the @%1@ landmark on the @%2@ element to a different container or sectioning element.',
          ELEMENT_HIDDEN_1: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
        },
        PURPOSE: [
          'Landmarks identify the sections of content on a page and should not obscure the semantic meaning of the elements that comprise the section.',
          'Putting landmark roles on @ul@, @ol@, @h1@, @table@ or other elements with native semantics will override the semantics of the element (e.g. a @ul@ or @ol@ list with a landmark role is no longer rendered as a list to assistive technologies).'
        ],
        TECHNIQUES: [
          'Landmarks should only be placed on@div@, @span@, @p@, @form@ or HTML5 sectioning elements, which include @nav@, @section@, @main@, @article@, @aside@, @header@, @footer@, @figure@ and @address@ elements that are used as containers for a section of content.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
            title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmarks',
            url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark'
          },
          { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
          },
          { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
          },
          { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
            title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
          }
        ]
    },

    LINK_3: {
      ID:                    'Link 3',
      DEFINITION:            'Links %s have width and height dimensions of at least 12 pixels.',
      SUMMARY:               'Link dimensions %s be adequate',
      TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Increase the dimensions of the @a@, @area@ or @[role=link]@ element to be at least 12 pixels in width and height.',
        FAIL_P:  'Increase the dimensions of the %N_F @a@, @area@ or @[role=link]@ elements to be at least 12 pixels in width and height.',
        MANUAL_CHECK_S:  'Verify the dimensions of the @a@, @area@ or @[role=link]@ element to be at least 12 pixels in width and height.',
        MANUAL_CHECK_P:  'Verify the dimensions of the %N_F @a@, @area@ or @[role=link]@ elements to be at least 12 pixels in width and height.',
        NOT_APPLICABLE:  'No @a@, @area@ or @[role=link]@ elements on page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The link has width and height dimensions of at least 12 pixels.',
        ELEMENT_MC_1:     'The rendered dimensions of the @%1@ element could not be determined. Verify the image link has width and height dimensions of at least 12 pixels.',
        ELEMENT_FAIL_1:   'The rendered dimensions of the @%1@ element is %2 pixels high by %3 pixels wide. Change the dimensions of the image to be at least 12 pixels high and 12 pixels wide.',
        ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'As interactive elements, links must be large enough for people to see and click or tap.'
      ],
      TECHNIQUES: [
        'Ensure that the wording and font size used for a link is adequate so that the link text will be rendered with width and height dimensions of at least 12 pixels.',
        'If an image is used as the sole content for a link, ensure that its width and height dimensions are at least 12 pixels.'
      ],
      MANUAL_CHECKS: [
        'Use visual inspection and browser development tools to determine if the image link is more than 12 pixels high and 12 pixels wide'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 12.2 The A element',
          url:   'https://www.w3.org/TR/html4/struct/links.html#edef-A'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'IITAA Implementation Guidelines 1.0: 9.3 - Avoid using small links.',
          url:   'https://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html'
        }
      ]
    },

    LINK_4: {
      ID:                    'Link 4',
      DEFINITION:            'Links that share the same @href@, but have different accessible names %s be checked to make sure each name is meaningful',
      SUMMARY:               'Links to the same URL %s be meaningful',
      TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_P:    'Verify all %N_MC @a@, @area@ or @[role=link]@ elements accessible name describes the target of each link, since there are different accessible names for the same @href@ values.',
        NOT_APPLICABLE:    'No @a@, @area@ or @[role=link]@ elements on page that share the same @href@ value'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ element has the same accessible name as the %2 links it shares the same @href@ with',
        ELEMENT_MC_1:     'Verify the @%1@ element has the an accessible name that makes sense to users, since the link shares the same @href@ with a link that has a different accessible name',
        ELEMENT_HIDDEN_1: 'Consistent link text for links sharing the same @href@ value was not tested because the @%1@ element is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Consistency of accessible names for a link makes interaction with web pages more predictable, but sometimes a link may have more than one accessible name associated with it, for example the same link may have the accessible names "Home" and "My Organization Name". When a the same link has more than one accessible name, make sure each name is meaningful to the user.  '
      ],
      TECHNIQUES: [
        'When ever possible use the same accessible name for links that point to the same URL',
        'Make sure the link text accurately describes the target of the link'
      ],
      MANUAL_CHECKS: [
        'In general accessible names should be the same for links that share the same @href@ values.  In some cases you may have two accessible names to the same @href@ avlue, for example a links with the accessible names \'Home\' and \'My Organization Name\''
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 12.2 The A element',
          url:   'https://www.w3.org/TR/html4/struct/links.html#edef-A'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 The LINK role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#link'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H30: Providing link text that describes the purpose of a link for anchor elements',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H30'
        }
      ]
    },

    ORDER_1: {
      ID:                    'Order 1',
      DEFINITION:            'The DOM ordering of section elements %s define a meaningful reading order to users of assistive technologies.',
      SUMMARY:               'Reading order: sectioning elements',
      TARGET_RESOURCES_DESC: '@article@, @aside@, @div@, @footer@, @header@, @main@, @nav@, @section@, @table[role="presentation"]@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:   'Verify the reading order of the sectioning element with renderable content is meaningful to users of assistive technologies.',
        MANUAL_CHECK_P:   'Verify the reading order of %N_MC sectioning elements with renderable content is meaningful to users of assistive technologies.',
        HIDDEN_S:         'One sectioning element that is hidden was not evaluated.',
        HIDDEN_P:         'The %N_H sectioning elements that are hidden were not evaluated.'
        },
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     'Verify the @%1@ element is rendered in the correct reading order with respect to its adjacent sectioning elements on the page. ',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'The reading order of content to people using assistive technologies is important for people to understand the content they are reading.',
        'Web page designs that rely upon @table@ markup for layout or advanced positioning techniques using CSS and JavaScript may result in visual rendering of content that differs in reading order from the actual DOM ordering used by assistive technologies. Thus while the visual rendering may appear to have the correct or desired reading order, the actual reading order will be incorrect and correspondingly illogical.',
        'Assistive technologies sequentially render sections of content on a web page based upon the DOM order in which the sectioning elements appear in the HTML document.',
        'Assistive technologies render web page content based upon the sequence of the DOM elements within the HTML document.',
        'The use of @table@ markup for layout, advanced CSS positioning techniques and Javascript to rearrange content can make content that looks visually in a meaningful sequence, disconnected and unorganized when exposed to accessibility APIs .',
        'The DOM order of content is therefore very important to make sure information is logically presented to users of assistive technologies.'
      ],
      TECHNIQUES: [
        'Use sectioning elements (e.g. @aside@, @article@, @footer@, @header@, @main@, @nav@, @section@) for layout of content on the page.',
        'Make sure related content moves as a block when repositioning content on a page.',
        'Avoid using tables for layout of content.',
        'Avoid using CSS absolute positioning to move blocks of content to new positions on the page.'
      ],
      MANUAL_CHECKS:  [
        'Disable layout tables (e.g. table[role="presentation"]) and CSS to make sure the content rendered has a meaningful sequence.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'WCAG 2.0 Success Criterion 1.3.2 Meaningful Sequence',
          url:   'https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 5.1: Sectioning Elements',
          url:   'https://www.w3.org/TR/html51/semantics.html#sections'
        }
      ]
    }
  }
});
