 /* listRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const listRules = {

  LIST_1: {
      ID:                    'List 1',
      DEFINITION:            'Page must use semantic markup for lists: to identify the type of list container (ordered, unordered or description list) and to group its related list item elements.',
      SUMMARY:               'Use semantic markup for lists',
      TARGET_RESOURCES_DESC: '@ul@, @ol@ and @li@ elements, and elements with @[role="list"]@ and @[role="listitem"]@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:   'Verify the list element is used semantically.',
        MANUAL_CHECK_P:   'Verify the %N_MC list elements are used semantically.',
        HIDDEN_S:         'The hidden list element was not evaluated.',
        HIDDEN_P:         'The %N_H hidden list elements were not evaluated.',
        NOT_APPLICABLE:   'No list elements found on the page.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_MC_1:         'Verify the %1 list elements are used semantically and that list markup was not omitted.',
        ELEMENT_MC_1:      'Verify the @%1@ element identifies a container element for a related group of list items.',
        ELEMENT_MC_2:      'Verify the @%1@ element identifies a list item element in a meaningfully grouped list of items.',
        ELEMENT_HIDDEN_1:  'The hidden @%1@ element was not evaluated.'
      },
      PURPOSES: [
        'When list markup is used semantically, assistive technologies are able to convey information to users as they navigate to and within lists, such as the total number of items and the relative position of each item in the list.',
        'Assistive technologies also provide additional navigation commands for lists, such as "Go to next list item" and "Go to next list".',
        'Concision of list item content is important for accessibility, since assistive technologies read the entire content of each list item when users navigate through lists.',
        'When list markup is used in ways that violate the semantics of lists, it will be confusing to users of assistive technologies and diminish the accessibility of the page.'
      ],
      TECHNIQUES: [
        'Ensure that list item content is concise.',
        'You can use ARIA labeling techniques to give a list container element a descriptive label.',
        'Use @ol@ as a container element for an ordered list of items.',
        'Use @ul@ as a container element for an unordered list of items.',
        'Use @li@ elements to identify items in ordered (@ol@) and unordered (@ul@) lists.',
        'Use @dl@ as a container element for a description list (a.k.a. definition list) that contains contiguous groupings of terms and their associated descriptions or definitions.',
        'Use @dt@ elements to identify terms being described or defined in a description list (@dl@).',
        'Use @dd@ elements to identify descriptions or definitions for a term in a description list (@dl@).',
        'For repairing existing content that does not use list elements, you can use the ARIA @role@ attributes with value @[role="list"]@ or @[role="group"]to identify list container elements and @[role="listitem"]@ to identify list item elements.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: ol element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ol-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: ul element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ul-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: li element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-li-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: dl element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-dl-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: dt element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-dt-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: dd element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-dd-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: group role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#group'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: list role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#list'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: listitem role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#listitem'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: aria-posinset',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-posinset'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: aria-setsize',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-setsize'
        }
      ]
  },
  LIST_2: {
      ID:                    'List 2',
      DEFINITION:            'When appropriate, a list container element (@ul@, @ol@, @[role="list"]@ should include a label that describes the purpose or contents of the list.',
      SUMMARY:               'Provide list labels when appropriate',
      TARGET_RESOURCES_DESC: '@ul@ and @ol@ elements, and container elements with @[role="list"]@',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:   'Determine whether the container element benefits from a label and, if so, verify that it accurately describes the contents of the list.',
        MANUAL_CHECK_P:   'Determine whether the %N_MC list container elements benefit from labels and, if so, verify that each accurately describes the contents of the list.',
        HIDDEN_S:         'The hidden list element was not evaluated.',
        HIDDEN_P:         'The %N_H hidden list elements were not evaluated.',
        NOT_APPLICABLE:   'No list elements elements found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:      'Verify the label "%1" accurately describes the contents of the list.',
        ELEMENT_MC_2:      'Verify the @%1@ list container element does not benefit from a label, or add a label that describes the contents of the list.',
        ELEMENT_HIDDEN_1:  'The hidden @%1@ element was not evaluated.'
      },
      PURPOSES: [
        'Assistive technologies use labels on @ul@ and @ol@ elements, and elements with @[role="list"]@ attributes to help screen reader users understand the purpose or contents of lists.'
      ],
      TECHNIQUES: [
        'Use the @aria-labelledby@ attribute to add a label to a list container element to reference the @id@(s) of one or more elements on the page that describe its contents.',
        'Use the @aria-label@ attribute to add a label to a list container element to provide an explicit text description of its contents.',
        'The @title@ attribute can also be used to add a label to a list container element to provide an explicit text description of its contents.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: ol element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ol-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: ul element',
          url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ul-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: list role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#list'
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
          title: 'HTML 4.01 Specification: The @title@ attribute',
          url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
        }
      ]
  }
}

