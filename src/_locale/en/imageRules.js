/* imageRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const imageRules = {
  IMAGE_1: {
    ID:         'Image 1',
    DEFINITION: 'Each @img@ element must specify an @alt@ attribute or equivalent markup that either defines a text alternative or identifies the image as being used for decoration, spacing or some other stylistic purpose.',
    SUMMARY:    'Images must have alt text',
    TARGET_RESOURCES_DESC: '@img@ and [role="img"]',
    RULE_RESULT_MESSAGES: {
      FAIL_S:   'Add an @alt@ attribute or equivalent markup to the image element with missing alt text, or identify the image as decorative.',
      FAIL_P:   'Add an @alt@ attribute or equivalent markup to each of the %N_F image elements with missing alt text, or identify the image as decorative.',
      HIDDEN_S: 'One image element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H image elements that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ or @[role="img"]@ elements found on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1: '@%1@ element has a role of @%1@ attribute to define an accessible name.',
      ELEMENT_FAIL_1: 'Use the  @alt@ attribute on the @%1@ element to add a text alternative, or to indentify the image as purley decorative set @alt=""@ attribute or change the image to a CSS @background-image@.',
      ELEMENT_FAIL_2: 'Use the @aria-labelledby@ or @aria-label@ attribute for the text alternative for @%1[role="img"]@ element, or change the role to @role="none"@ to identify the image as purely decorative.',
      ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'A text alternative for an image, usually specified with an @alt@ attribute, provides a summary of the purpose of the image for people with visual impairments, enabling them to understand the content or purpose of the image on the page.',
      'An image with a text alternative that is an empty string or that has @role="presentation"@ is ignored by assistive technologies. Such markup indicates that the image is being used for decoration, spacing or other stylistic purposes rather than meaningful content.'
    ],
    TECHNIQUES: [
      'A text alternative should summarize the purpose of an image as succinctly as possible (preferably with no more than 100 characters).',
      'The @alt@ attribute is the preferred and most commonly used way to provide a text alternative for @img@ and @area@ elements.',
      'The @aria-labelledby@ attribute can be used to provide a text alternative when an image can be described using text already associated with the image, or for elements with @role="img"@.',
      'The @aria-label@ attribute should only be used to provide a text alternative in the special case when an element has a @role="img"@ attribute. Use the @alt@ attribute for @img@ and @area@ elements.',
      'The @title@ attribute will be used by assistive technologies to provide a text alternative if no other specification technique is found.',
      'Use the attributes @alt=""@, @role="presentation"@ or include the image as a CSS @background-image@ to identify it as being used purely for stylistic or decorative purposes and one that should be ignored by people using assistive technologies.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 5 Specification: 12.2 The @img@ element',
        url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-img-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @img@ role',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#img'
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
        title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
        url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Web Accessibility Tutorials : Images',
        url:   'https://www.w3.org/WAI/tutorials/images/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Diagram Center: Image Description',
        url:   'http://diagramcenter.org/making-images-accessible.html'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G94: Providing text alternative for non-text content that serves the same purpose and presents the same information as the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G94'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G95: Providing text alternatives that provide a brief description of the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G95'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Alternative Text',
        url:   'https://webaim.org/techniques/alttext/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Accessibility at Penn State: Text Equivalents for Images',
        url:   'https://accessibility.psu.edu/images/'
      }
    ]
  },

  IMAGE_2: {
    ID:         'Image 2',
    DEFINITION: 'The text alternative for @img@ elements and elements with @[role="img"]@ must summarize the content and/or purpose of the image.',
    SUMMARY:    'Alt text must summarize purpose',
    TARGET_RESOURCES_DESC: '@img@, [role="img"] with short descriptions',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S: 'Verify that the text alternative of the @img@ element or element with @[role="img"]@ accurately and succinctly summarizes the content and/or purpose of the image.',
      MANUAL_CHECK_P: 'Verify that the text alternative for each of the %N_MC @img@ elements and/or elements with @[role="img"]@ accurately and succinctly summarizes the content and/or purpose of the image.',
      HIDDEN_S: 'One @img@ element or element with @[role="img"]@ element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H @img@ elements and/or elements with @[role="img"]@ that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ elements and/or elements with @[role="img"]@ on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1: 'Verify the @img@ element\'s text alternative accurately and succinctly summarizes the content and/or purpose of the image.',
      ELEMENT_MC_2: 'Verify the @%1[role=img]@ element\'s text alternative accurately and succinctly summarizes the content and/or purpose of the image.',
      ELEMENT_HIDDEN_1: '@img@ element was not evaluated because it is hidden from assistive technologies.',
      ELEMENT_HIDDEN_2: '@%1[role=img]@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'Images can convey a wide range of content and be used for many different purposes on a web page, from button and icon images that perform simple actions to complex graphics that help people visualize the features and relationships of large data sets.',
      'Markup supports creating both short and long text alternatives. A short text alternative is designed to orient people who cannot see the image to the type of content it contains or its purpose on the page.  A long text alternative or long description provides comprehensive details of the features of an image, e.g., the data used to generate a chart or graph, relationships in a flow chart, or a MathML version of a mathematical equation.',
      'Images that function as buttons and perform an action on the page should have a short text alternative that is as succinct as possible (e.g., "Increase text size").',
      'Informative images of photographs need a short text alternative and additionally can often benefit from long descriptions.',
      'Informative images of charts or graphs need both a short text alternative and a long description to describe its purpose and the data used to create it.',
      'If an image that is informative does not have text alternative content, users of assistive technologies will not have access to the information the image conveys.'
    ],
    TECHNIQUES: [
      'Use the @alt@ attribute on @img@ elements to provide a text alternative for the image. A rule of thumb is to use what you would say to someone over the phone to describe the image.',
      'The @aria-labelledby@ attribute can be used to provide a text alternative when images can be described using text already associated with the image, such as a visible caption, or for elements with @role="img"@.',
      'The @aria-label@ attribute should only be used to provide a text alternative in the special case when an element has a @role="img"@ attribute.',
      'The @title@ attribute will be used by assistive technologies to provide a text alternative if no other specification technique is found.  NOTE: Using the @title@ attribute will also generate a tooltip in some browsers.',
      'Use the attributes @alt=""@, @role="presentation"@ or include the image as a CSS @background-image@ to identify it as being used purely for stylistic or decorative purposes and that it should be ignored by people using assistive technologies.'
    ],
    MANUAL_CHECKS: [
      'Find each image on the page and verify that it is only being used decoratively or is redundant with other information on the page.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 5 Specification: 12.2 The @img@ element',
        url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-img-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @img@ role',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#img'
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
        title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
        url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Web Accessibility Tutorials : Images',
        url:   'https://www.w3.org/WAI/tutorials/images/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Diagram Center: Image Description',
        url:   'http://diagramcenter.org/making-images-accessible.html'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G94: Providing text alternative for non-text content that serves the same purpose and presents the same information as the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G94'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G95: Providing text alternatives that provide a brief description of the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G95'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Alternative Text',
        url:   'https://webaim.org/techniques/alttext/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Accessibility at Penn State: Text Equivalents for Images',
        url:   'https://accessibility.psu.edu/images/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Diagram Center: Digital Image And Graphic Resources for Accessible Materials',
        url:   'https://diagramcenter.org/'
      }

    ]
  },

  IMAGE_3: {
    ID:         'Image 3',
    DEFINITION: 'The source filename of the image element must not be part of its text alternative.',
    SUMMARY:    'Alt text must not include filename',
    TARGET_RESOURCES_DESC: '@img@, @area@ and @[role="img"]@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:   'Change the value of the @alt@ attribute on the image element to summarize the purpose of the image without referencing its source filename.',
      FAIL_P:   'Change the value of the @alt@ attribute on the %N_F out of %N_T image elements to summarize the purpose of each image without referencing its source filename.',
      HIDDEN_S: 'One image element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H image elements that are hidden were not evaluated.',
      NOT_APPLICABLE:  'No @img@, @area@ or @[role="img"]@ elements found on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1: 'The text alternative does not contain the source filename.',
      ELEMENT_FAIL_1: 'Change the text alternative to summarize the purpose of the image without referencing its source filename.',
      ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'A text alternative should summarize the purpose of an image for people with visual impairments.',
      'The source filename of the image should not be included because generally it is not useful information.',
      'An image with a text alternative that is an empty string is ignored by assistive technologies, and indicates that it is being used for styling purposes rather than meaningful content.'
    ],
    TECHNIQUES: [
      'A text alternative should describe the purpose of an image as succinctly as possible (preferably with no more than 100 characters). Do not include the source filename as part of the text content.',
      'The @alt@ attribute is the preferred and most commonly used way to provide a text alternative for @img@ and @area@ elements.',
      'The @aria-labelledby@ attribute can be used to provide a text alternative when images can be described using text already associated with the image, such as a visible caption, or for elements with @role="img"@.',
      'The @aria-label@ attribute should only be used to provide a text alternative in the special case when an element has a @role="img"@ attribute.',
      'The @title@ attribute will be used by assistive technologies to provide a text alternative if no other specification technique is found.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
        url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G94: Providing text alternative for non-text content that serves the same purpose and presents the same information as the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G94'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G95: Providing text alternatives that provide a brief description of the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G95'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F30'
      }
    ]
  },

  IMAGE_4_EN: {
    ID:         'Image 4 (English)',
    DEFINITION: 'The text alternative  for an image should be no more than 100 characters in length.',
    SUMMARY:    'Alt text no more than 100 characters',
    TARGET_RESOURCES_DESC: '@img@, @area@ and @[role="img"]@ elements',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S: 'Verify the image with the text alternative longer than 100 characters could not be reworded more succinctly or be rewritten to use a long description.',
      MANUAL_CHECK_P: 'Verify the %N_MC images with text alternatives longer than 100 characters can not be reworded more succinctly or be rewritten to use long descriptions.',
      HIDDEN_S: 'One image element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H image elements that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ or @[role="img"]@ elements on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1: 'The text alternative is %1 characters long.',
      ELEMENT_MC_1:   'The text alternative is %1 characters long. Check its content to determine whether it can be reworded to be no more than 100 characters. Also consider providing a long description using the @aria-describedby@, @title@ or @longdesc@ attribute, which would then allow shortening the text alternative content.',
      ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'A text alternative should summarize the purpose of an image as succinctly as possible for people with visual impairments.',
      'Overly long text alternatives can reduce usability by increasing the time it takes to read a web page and understand the significance of the included images.',
      'An image with a text alternative that is an empty string (e.g. @alt=""@) is ignored by assistive technologies, and indicates that it is being used for purely decorative, spacing or stylistic purposes rather than for meaningful content.'
    ],
    TECHNIQUES: [
      'A text alternative (e.g. in English and many other Western languages) should describe the purpose of an image as succinctly as possible (preferably with no more than 100 characters).',
      'If a text alternative requires more than 100 characters, consider using the @aria-describedby@, @title@ or @longdesc@ attribute for a longer, more detailed description of the image, along with shortening the text alternative content.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
        url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G94: Providing text alternative for non-text content that serves the same purpose and presents the same information as the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G94'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'G95: Providing text alternatives that provide a brief description of the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G95'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F30'
      }
    ]
  },

  IMAGE_5: {
    ID:         'Image 5',
    DEFINITION: 'Verify an image with @[alt=""]@ or @[role="presentation"]@ is only being used for purely decorative, spacing or stylistic purposes.',
    SUMMARY:    'Verify image is decorative',
    TARGET_RESOURCES_DESC: '@img[alt=""]@, @img[role="presentation"]@, @[role="img"]@ with an empty text alternative',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S: 'Verify the image is being used purely for decorative, spacing or styling purposes.',
      MANUAL_CHECK_P: 'Verify the %N_MC images are being used purely for decorative, spacing or styling purposes.',
      HIDDEN_S: 'One @img@ element or element with @[role="img"]@ element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H @img@ elements and/or elements with @[role="img"]@ that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ elements or elements with @[role="img"]@ on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1: 'Verify that the @img@ element is used only for decorative, spacing or styling purposes.',
      ELEMENT_MC_2: 'Verify that the @%1[role=img]@ element is used only for decorative, spacing or styling purposes.',
      ELEMENT_HIDDEN_1: '@img@ element was not evaluated because it is hidden from assistive technologies.',
      ELEMENT_HIDDEN_2: '@%1[role=img]@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'If an image is used purely for stylistic or decorative purposes, users of screen readers do not need to know that the image exists and no alternative is needed.',
      'If an image contains information, but is mistakenly identified as decorative, users of assistive technologies will not have access to the information.'
    ],
    TECHNIQUES: [
      'Use the attributes @alt=""@, @role="presentation"@ or include the image as a CSS @background-image@ to identify it as being used purely for stylistic or decorative purposes and that it should be ignored by people using assistive technologies.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 5 Specification: 12.2 The @img@ element',
        url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-img-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @presentation@ role',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'CSS Backgrounds and Borders Module Level 3: The @background-image@ property',
        url:   'https://www.w3.org/TR/css3-background/#the-background-image'
      }
    ]
  },

  IMAGE_6: {
    ID:         'Image 6',
    DEFINITION: 'Complex images, charts or graphs (e.g. images generated from tabular data) must have long descriptions to provide an additional detailed description of the information conveyed by the image.',
    SUMMARY:    'Long description for complex images',
    TARGET_RESOURCES_DESC: '@img@, [role="img"] that represent complex images and images generated from tabular data.',
    RULE_RESULT_MESSAGES: {
      FAIL_S: 'Update the undefined @idrefs@ of the @img@ element or element with @aria-describedby@ to include only defined @id@ values.',
      FAIL_P: 'Update the undefined @idrefs@ of the %N_MC @img@ elements and/or elements with @aria-describedby@ to include only defined @id@ values.',
      MANUAL_CHECK_S: 'Determine if the @img@ element or element with @[role="img"]@ can benefit from a long description, and if so, provide a detailed description of the content of the image.',
      MANUAL_CHECK_P: 'Determine if any of the %N_MC @img@ elements and/or elements with @[role="img"]@ can benefit from a long description, and for each that can, provide a detailed description of the content of the image.',
      HIDDEN_S: 'One @img@ element or element with @[role="img"]@ element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H @img@ elements and/or elements with @[role="img"]@ that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ elements and/or elements with @[role="img"]@ on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_FAIL_1: 'The @longdesc@ attribute is not supported by broswers to provide a long description.',
      ELEMENT_MC_1: 'Verify the long description defined by the @%1@ attribute provides a detailed description of the information conveyed by the image.',
      ELEMENT_MC_2: 'Determine whether the image is a complex image, chart or graph that needs a long description, and whether the text alternative could be used to indicate the presence and location of the long description.',
      ELEMENT_HIDDEN_1: 'The image was not evaluated because it is hidden from assistive technologies.',
    },
    PURPOSES: [
      'A long description should provide more information and detail than the text alternative for the image (e.g. @alt@ attribute).',
      'Images can convey a wide range of content and be used for many different purposes on a web page, from purely decorative to complex graphics helping people visualize the features and relationships of large data sets.',
      'All users can benefit from long descriptions by providing another modality for the author to convey information contained in the image and by providing search engines with information to more accurately return relevant results.',
      'Informative images of photographs or paintings can often benefit from long descriptions.',
      'Informative images like charts or graphs need long descriptions to describe the data used to create the chart or graph.'
    ],
    TECHNIQUES: [
      'Ideally, the long description of an image should be accessible to all users by including it as part of the page content, and in close proximity to the image it describes.',
      'Use the @aria-describedby@ attribute to reference one or more @id@s on the page that contain the long description. When this technique is used, assistive technologies extract the text content of the referenced @id@s and make it available as concatenated, unstructured text (i.e., stripping out any list markup, links, paragraphs, etc.).',
      'Use the @title@ attribute to provide a long description.',
      'Use the @alt@ attribute or equivalent markup to indicate the presence and location of the long description when it consists of structured content (e.g. tabular data, lists, links) in close proximity to the image. For example, @alt="..., for more information view the following data table"@.',
      'Use the @longdesc@ attribute, which requires a URI value, to link to a long description for an image. NOTES: (1) The URI can be an internal link on the same page as the image, or a link to an external page or a fragment thereof. (2) There is a discoverability problem with this technique in that the description will typically only be available to screen reader users. Therefore, until browser implementations for @longdesc@ have improved, alternative techniques that enable all users to access the long description are preferred.',
      'Use techniques that allow all users to view the long description. For example, the @summary/details@ elements can be used when the author prefers the detailed description to be initially hidden from users.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 5 Specification: 12.2 The @img@ element',
        url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-img-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @img@ role',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#img'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-describedby@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML5 Image Description Extension (longdesc)',
        url:   'https://www.w3.org/TR/html-longdesc/'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML 4.01 Specification: 13.8 How to specify alternate text',
        url:   'https://www.w3.org/TR/html4/struct/objects.html#adef-alt'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Web Accessibility Tutorials : Images',
        url:   'https://www.w3.org/WAI/tutorials/images/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Diagram Center: Image Description',
        url:   'http://diagramcenter.org/making-images-accessible.html'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'G94: Providing text alternative for non-text content that serves the same purpose and presents the same information as the non-text content',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G94'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Alternative Text',
        url:   'https://webaim.org/techniques/alttext/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Accessibility at Penn State: Text Equivalents for Images',
        url:   'https://accessibility.psu.edu/images/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'Diagram Center: Digital Image And Graphic Resources for Accessible Materials',
        url:   'https://diagramcenter.org/'
      }
    ]
  },

  IMAGE_7: {
    ID:         'Image 7',
    DEFINITION: 'Mathematical expressions should use MathJax instead of bitmapped images.',
    SUMMARY:    'Use MathJax for mathematical expressions',
    TARGET_RESOURCES_DESC: '@img@ and [role="img"] elements representing mathematical expressions',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S: 'If the @img@ element or element with @[role="img"]@ represents a mathematical expression, convert the image content to MathML.',
      MANUAL_CHECK_P: 'If the %N_MC @img@ elements and/or elements with @[role="img"]@ represents a mathematical expression, convert the image content to MathML.',
      HIDDEN_S: 'The @img@ element or element with @[role="img"]@ element that is hidden was not evaluated.',
      HIDDEN_P: '%N_H @img@ elements and/or elements with @[role="img"]@ that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@ elements and/or elements with @[role="img"]@ on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1: 'If the @img@ element represents a mathematical expression, convert the image content to MathML.',
      ELEMENT_MC_2: 'If the @%1[role=img]@ element represents a mathematical expression, convert the image content to MathML.',
      ELEMENT_HIDDEN_1: '@img@ element was not evaluated because it is hidden from assistive technologies.',
      ELEMENT_HIDDEN_2: '@%1[role=img]@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'Images used to convey mathematical expressions are not accessible to people with disabilities using assistive technologies.',
      'MathML is a W3C standard for representing mathematical expressions for web technologies and is the most accessible web math format for people using assistive technologies.',
      'MathML has capabilities similar to SVG graphics, providing the abilities to resize and style content without the loss of fidelity of the visual rendering to match the capabilities of people with visual impairments.'
    ],
    TECHNIQUES: [
      'Use MathML to represent the mathematical expressions.',
      'Use MathJax to support MathML rendering in a wide range of browsers with and without native support for rendering MathML.',
      'Design Science MathPlayer is a universal math reader that now enables math to be spoken in many assistive technology products.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      {type:  REFERENCES.SPECIFICATION,
        title: 'Mathematical Markup Language (MathML) Version 3.0',
        url:   'https://www.w3.org/TR/MathML/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'MathJax Javascript Library',
        url:   'https://www.mathjax.org/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'PSU Accessibility: MathML and MathJax',
        url:   'https://accessibility.psu.edu/math/mathml/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'Design Science: Math Type',
        url:   'https://www.dessci.com/en/products/mathtype/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'Design Science: Math Player',
        url:   'https://www.dessci.com/en/products/mathplayer/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'MathML in Daisy',
        url:   'https://www.daisy.org/project/mathml'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'EPUB 3 Accessibility Guidelines: MathML',
        url:   'https://www.idpf.org/accessibility/guidelines/content/mathml/desc.php'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'W3C Math Wiki: MathML Tools',
        url:   'https://www.w3.org/Math/wiki/Tools'
      }
    ]
  },
  IMAGE_8: {
    ID:         'Image 8',
    DEFINITION: 'When an image is used to represent stylized text, replace the image with text content and use CSS to style text.',
    SUMMARY:    'Use CSS to stylize text',
    TARGET_RESOURCES_DESC: '@img@ and [role="img"]',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:   'If the image is used to stylize text, replace the image with text content styled with CSS.',
      MANUAL_CHECK_P:   'If any of the %N_MC images are used to stylize text, replace the image with text content styled with CSS.',
      HIDDEN_S: 'One image element with an accessible name was not evaluated.',
      HIDDEN_P: '%N_H image elements with accessible names that are hidden were not evaluated.',
      NOT_APPLICABLE: 'No @img@, @area@ or @[role="img"]@ elements found on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1: 'If the image is used to represent stylized text, replace the image with text and use CSS to style text.',
      ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'To enable people with visual impairments who require a particular visual presentation of text to be able to adjust the text presentation as needed.',
      'Adjustments include the use of a particular font size, foreground and background color, font family, line spacing or alignment.'
    ],
    TECHNIQUES: [
      'Replace the image of text with text content that is styled using Cascading Style Sheets (CSS).'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      {type:  REFERENCES.SPECIFICATION,
        title: 'W3C Understanding Images of Text',
        url:   'https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html'
      },
      {type:  REFERENCES.SPECIFICATION,
        title: 'W3C CSS Snapshot',
        url:   'https://www.w3.org/TR/css/'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'MDN Cascading Style Sheets',
        url:   'https://developer.mozilla.org/en-US/docs/Web/CSS'
      },
      {type:  REFERENCES.REFERENCE,
        title: '22: Using CSS to control visual presentation of text',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C22'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'C30: Using CSS to replace text with images of text and providing user interface controls to switch',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C30'
      },
      {type:  REFERENCES.REFERENCE,
        title: 'G140: Separating information and structure from presentation to enable different presentations',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G140'
      }
    ]
  }
}


