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
        ROLE_1: {
            ID:               'Role 1',
            DEFINITION:       'Overriding a @main@ element\'s default @role@ of @main@ landmark %s only be done in special cases. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@main@ element @role@ semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@main@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute from the @main@ element to support the default @main@ landmark semantics, if the content does not represent @main@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content.',
              FAIL_P:         'Remove the @role@ attribute from the %N_F @main@ elements to support the default @main@ landmark semantics, if the content does not represent @main@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content.',
              MANUAL_CHECK_S: 'Verify that the @main@ element with @role="presentation"@ does not contain @main@ landmark semantics.',
              MANUAL_CHECK_P: 'Verify that the %N_MC @main@ elements with @role="presentation"@ do not contain @main@ landmark semantics.',
              HIDDEN_S:       'One @main@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @main@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @main@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the attribute @role="%1"@ to support the default semantics of a @main@ landmark or if the element does not identify the primary content change the role to @role="presentation"@ or use a different element that does identify the semantics of content.',
              ELEMENT_MC_1:     'Verify the @main@ element with @role="presentation"@ does not contain the primary content of the page.',
              ELEMENT_HIDDEN_1: '@main@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @main@ element has role restrictions as part of its definition in the W3C HTML5 Specification.',
              'The @main@ element semantics are to identify the primary content on the page.',
              'If the @main@ element does not contain the primary content of the web page the @main@ landmark semantics the of the element must be changed.'
            ],
            TECHNIQUES: [
              'HTML5 enabled browsers and modern assistive technologies identify the @main@ element as a @main@ landmark without @role="main"@ being specified, but @role="main"@ is allowed for backward compatibility.',
              'If the @main@ element does not contain the primary content of the web page due to author error use @role="presentation"@ to override the @main@ landmark semantics or change element to an element that correctly identifies the semantics of the content.',
              'If you need to support Microsoft Internet Explorer(IE) 8, use @div[role="main"]@ instead of the @main@ element to indicate primary content, since IE 8 does not support accessibility features of HTML5 elements.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The main element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-main-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Using WAI-ARIA in HTML',
                url:   'https://www.w3.org/TR/aria-in-html/'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: main role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }
            ]
        },
        ROLE_2: {
            ID:               'Role 2',
            DEFINITION:       'The @body@ element %s only @document@ (default) or @application@ role semantics. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@body@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@body@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Change the role attribute on the @body@ element to either @document@ or @application@, or remove the @role@ attribute all together.',
              FAIL_P:         'Change the role attribute on the %N_F @body@ elements to either @document@ or @application@, or remove the role attribute all together.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1: 'Change the attribute @role="%1"@ to @role="document"@ or @role="application"@, or remove the @role@ attribute all together.'
            },
            PURPOSE: [
              'The @body@ element has role restrictions as part of its definition in the W3C HTML5 Specification.',
              'The @body@ element should only be used to indicate whether the page is primarily has @document@ or @application@ semantics.',
              'The default (e.g. no @role@ attribute) is @document@ role semantics.'
            ],
            TECHNIQUES: [
              'If the web page is primarily composed of forms and widgets that benefit from using the @role="application"@ on the @body@ element.',
              'If the web page is primarily composed of non interactive text and images do not use the @role@ attribute on the @body@ element.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The body element',
                url:   'https://www.w3.org/TR/html5/sections.html#the-body-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: document role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#document'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: application role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#application'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Using WAI-ARIA in HTML',
                url:   'https://www.w3.org/TR/aria-in-html/'
              }
            ]
        },
        ROLE_3: {
            ID:               'Role 3',
            DEFINITION:       '@ol@ and @ul@ elements %s only have grouping role values of @directory, @group@, @listbox@, @menu@, @menubar@, @presentation@, @radiogroup@, @tablist@, @toolbar@ or @tree@. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@ol@ and @ul@ role grouping semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@ol@ and @ul@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ on the @ol@ and @ul@ element or change the @role@ semantics to an allowed grouping widget role.',
              FAIL_P:         'Remove the @role@ on the %N_F @ol@ and @ul@ elements or change the @role@ semantics to an allowed grouping widget role.',
              MANUAL_CHECK_S: 'Verify that the  @ol@ and @ul@ element with @role="presentation"@ does not contain content related to the semantics of a list element or grouping widget role.',
              MANUAL_CHECK_P: 'Verify that the %N_MC  @ol@ and @ul@ elements with @role="presentation"@ do not contain content related to the semantics of a list element or grouping widget role.',
              HIDDEN_S:       'One @ol@ and @ul@ element with @role@ attribute that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @ol@ and @ul@ elements with @role@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @ol@ and @ul@ elements with @role@ attribute found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute on the @%1@ element, change the attribute @role="%2"@ to an allowed role, or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:     'Verify the @%1@ element with @role="presentation"@ does not contain content that could be considered part of a list.',
              ELEMENT_HIDDEN_1: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @ol@ and @ul@ elements have role restrictions as part of their definition in the W3C HTML5 Specification.',
              'When @ol@ and @ul@ elements only need to use the @role@ attribute when they are part of interactive widgets and are restricted to widget grouping roles.',
              'The @role@ values used identify grouping widget roles to ensure that their native grouping semantics are not inadvertently overridden by non-grouping widget or landmark roles.'
            ],
            TECHNIQUES: [
              'Do not use the @role@ attribute if the default semantics of @ol@ or @ul@ represent a container of a non-interactive list.',
              'The @ol@ and @ul@ elements when used as part of widgets must be used to indicate the grouping of a list of related widget roles.',
              'Allowed role values include: @directory, @group@, @listbox@, @menu@, @menubar@, @presentation@, @radiogroup@, @tablist@, @toolbar@ or @tree@.',
              'In rare cases @role="presentation"@ is allowed on a @ol@ and @ul@ element when the element is not being used to represent a group of related items in a list.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The ol element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ol-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The ul element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-ul-element'
              }
            ]
        },
        ROLE_4: {
            ID:               'Role 4',
            DEFINITION:       '@article@ element %s only have @role@ semantics of @region@, @article@ (default), @main@, @document@ or @application@. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@article@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@article@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute or change the @role@ attribute on the @article@ element to an allowed @role@ value or remove the @role@ attribute all together.',
              FAIL_P:         'Remove the @role@ attributes and/or change the @role@ attribute on the %N_F @article@ elements to an allowed @role@ value or remove the role attribute all together.',
              HIDDEN_S:       'One @article@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @article@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @article@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to one of the allowed roles, or use a different element that does semantically identify the content',
              ELEMENT_HIDDEN_1: '@article@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @article@ element has role restrictions as part of its definition in the W3C HTML5 Specification.',
              'The @article@ element can be primarily be used to identify news paper or magazine articles, a list or nested messages in a comment or discussion list.',
              'The @article@ element might also be used to identify static text and image content in a web application using the @region@ or @document@ role.',
              'The @article@ element might also be used to identify a section of form controls and widgets in a web application using the @region@ or @application@ role.'

            ],
            TECHNIQUES: [
              'If the content of the @article@ element is primarily form controls and/or widgets use @role="application"@ on the @article@ element.',
              'If the content of the @article@ element is used as the container for the main content of the page use @role="main"@ on the @article@ element or preferably change the element to a @main@ element.',
              'If the content of the @article@ element is used as the container for a message in nested discussion list, comment to a blog, or as a magazine/news story use @role="article"@ on the @article@ element.',
              'If the content of the @article@ element is used as a sub-section of another landmark use @role="region"@ with an accessible name to identify the sub-section.',
              'If the content of the @article@ element does not meet any of the other techniques do not use the @role@ attribute.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The article element',
                url:   'https://www.w3.org/TR/html5/sections.html#the-article-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: document role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#document'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: application role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#application'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: main role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: article role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#article'
              }

            ]
        },
        ROLE_5: {
            ID:               'Role 5',
            DEFINITION:       '@section@ element %s only have role semantics of @alert@, @alertdialog@, @application@, @contentinfo@, @dialog@, @document@, @log@, @main@, @marquee@, @presentation@, @region@, @search@ or @status@. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@section@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@section@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute on the @section@ element or change the role to an allowed role that semantically identifies the content:  @alert@, @alertdialog@, @application@, @contentinfo@, @dialog@, @document@, @log@, @main@, @marquee@, @presentation@, @region@, @search@ or @status@, or remove the @role@ attribute all together.',
              FAIL_P:         'Remove the @role@ attribute on the %N_F @section@ elements and/or change their roles to an allowed role that semantically identifies the content:  @alert@, @alertdialog@, @application@, @contentinfo@, @dialog@, @document@, @log@, @main@, @marquee@, @presentation@, @region@, @search@ or @status@, or remove the @role@ attribute all together.',
              HIDDEN_S:       'One @section@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @section@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @section@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to one of the allowed roles, or use a different element that does semantically identify the content',
              ELEMENT_HIDDEN_1: '@section@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @section@ element has role restrictions as part of its definition in the W3C HTML5 Specification.',
              'The @section@ element can be used to for identifying many types of of sections and sub sections within a web page and a limited number of widget roles, review the techniques for the possible uses of the section element with ARIA @role@ semantics.',
              'The @section@ element should not be used when there is a more semantically meaningful elements available (e.g. @main@, @header@, @footer@,..)',
              'The default (e.g. no @role@ attribute) is @role="region"@, if the @section@ element has an accessible name it will be considered a landmark in the document.'
            ],
            TECHNIQUES: [
              'If the content of the @section@ element is used as a sub-section of another landmark use @role="region"@ with an accessible name to identify the sub-section.',
              'If the content of the @section@ element is used to provide a time sensitive text message to the user that is very important for the user to know use the live region @role="alert"@ on the @section@ element.',
              'If the content of the @section@ element is used to create a error dialog box with a message that is very important for the user to know use the @role="alertdialog"@ on the @section@ element.',
              'If the content of the @section@ element is primarily form controls and/or widgets use @role="application"@ on the @section@ element.',
              'If the content of the @section@ element is used as the container for footer information that is repeated on most pages of the website use @role="contentinfo"@ on the @section@ element.',
              'If the content of the @section@ element is used to create a non-error message related dialog box use the @role="dialog"@ on the @section@ element.',
              'If the content of the @section@ element is primarily composed of non interactive text and images and the @section@ element is embedded inside an container element with @role="application""@ use the @role="document"@ attribute on the @section@ element.',
              'If the content of the @section@ element is used as the container a list of messages use @role="log"@ on the @section@ element.',
              'If the content of the @section@ element is used as the container for the main content of the page use @role="main"@ on the @section@ element.',
              'If the content of the @section@ element is used as for periodically changing text on the page that is considered more informational (e.g. news tag line) use @role="marquee"@ on the @section@ element.',
              'If the content of the @section@ element is NOT being used as the container for a region landmark use @role="presentation"@ on the @section@ element to remove it from landmark navigation.',
              'If the content of the @section@ element is used as the container for sub section within a landmark use @role="region"@ on the @section@ element.',
              'If the content of the @section@ element is used as the container for a search the website form use @role="search"@ on the @section@ element.',
              'If the content of the @section@ element is used as the container for a status message that will be automatically be updated on some pending transaction use @role="status"@ on the @section@ element.',
              'If the content of the @section@ element does not meet any of the other techniques do not use the @role@ attribute.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The article element',
                url:   'https://www.w3.org/TR/html5/sections.html#the-article-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: alert role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#alert'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: alertdialog role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#alertdialog'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: application role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#application'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2:contentinfo role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: dialog role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#dialog'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: document role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#document'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: log role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#log'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: main role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: marquee role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#marquee'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: search role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#search'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: status role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#status'
              }
            ]
        },
        ROLE_6: {
            ID:               'Role 6',
            DEFINITION:       'Overriding a @nav@ element\'s default @role@ of @navigation@ landmark %s only be done in special cases. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          'Do not override @nav@ element semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@nav@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute on the @nav@ element to support the default semantics of a @navigation@ landmark, change the @role@ attribute to @presentation@ if the content does not represent a @navigation@ landmark or change the element to an element that better represents the semantics of the content.',
              FAIL_P:         'Remove the @role@ attribute on the %N_F @nav@ elements to support the default semantics of a @navigation@ landmark, change the @role@ attribute to @presentation@ if the content does not represent a @navigation@ landmark or change the element to an element that better represents the semantics of the content.',
              HIDDEN_S:       'One @nav@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @nav@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @nav@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to @navigation@ or @role="presentation"@ or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:     'Verify the @nav[role="presentation"]@ does not contain content that represents a @navigation@ landmark.',
              ELEMENT_HIDDEN_1: '@nav@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A @nav@ element has role restrictions as part of its definition in the W3C HTML5 Specification to help ensure the @nav@ element semantics of identifying @navigation@ landmark content.',
              'A @nav@ element should only use @role="presentation"@ if the content of the @nav@ element is not being used to identify @navigation@ landmark content (e.g. repairing poor page semantics).'
            ],
            TECHNIQUES: [
              'The @nav@ element with no @role@ value by default defines a @navigation@ landmark, but the @role="navigation"@ is allowed to support legacy pages.',
              'If the @nav@ element does not identify a @navigation@ landmark content use a different element that does identify the semantics of content.',
              'In rare cases @role="presentation"@ can be used when the @nav@ element does not represent the website or page navigation links on the page (e.g. repairing poor page semantics).',
              'Any other @role@ values are not allowed on @nav@ elements.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The nav element',
                url:   'https://www.w3.org/TR/html5/sections.html#the-nav-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: navigation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#navigation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }

            ]
        },
        ROLE_7: {
            ID:               'Role 7',
            DEFINITION:       '@aside@ element %s only have role semantics of @complementary@ (default do not set), @note@, @region@, @search@ or @presentation@. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@aside@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@aside@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute on the @aside@ element, change the role to an allowed role that semantically identifies the content: @complementary@ (default do not set), @note@, @region@, @search@ or @presentation@ .',
              FAIL_P:         'Remove the @role@ attribute on the %N_F @section@ elements, change their roles to an allowed role that semantically identifies the content:  @complementary@ (default do not set), @note@, @region@, @search@ or @presentation@.',
              HIDDEN_S:       'One @aside@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @aside@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @aside@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to one of the allowed roles, or use a different element that does semantically identify the content',
              ELEMENT_HIDDEN_1: '@aside@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @aside@ element has role restrictions as part of its definition in the W3C HTML5 Specification.',
              'The @aside@ element is used for tangentially related content to main content of the page and are often represented as sidebars in printed typography.',
              'Tangentially related content should be identified as a @role="complementary"@, @role="search"@ or role of @role="note"@.',
              'The difference between @complementary@ and @search@ roles and the @note@ role is that @complementary@ and @search@ are landmark roles and support and @note@ is not a landmark role.',
              'The @search@ role should be used if the content of the @aside@ element are form controls or widgets used for searching the website content.'
            ],
            TECHNIQUES: [
              'If the content of the @aside@ element is used for tangentially related content to main content of the page use @role="complementary"@ to make the content part of the landmark navigation of the page.',
              'If the content of the @aside@ element is used for website content search form controls use @role="search"@ to identify the search semantics and make the content part of the landmark navigation of the page.',
              'If the content of the @aside@ element is used for tangentially related content to main content of the page use @role="note"@.  The @note@ role is not part of the landmark navigation of the page and therefore is less commonly used.',
              'If the content of the @aside@ element is used as a sub-section of another landmark use @role="region"@ with an accessible name to identify the sub-section.',
              'If the content of the @aside@ element is used for any other purpose than for tangentially related content to main content use @role="presentation"@ to remove the @aside@ semantics.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The aside element',
                url:   'https://www.w3.org/TR/html5/sections.html#the-aside-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: complementary role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#complementary'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: note role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#note'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: search role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#search'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }
            ]
        },
        ROLE_8: {
            ID:               'Role 8',
            DEFINITION:       'Overriding a @header@ element\'s default @role@ of @banner@ landmark %s only be done in special cases. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          'Do not override @header@ element @role@. (Deprecated)',
            TARGET_RESOURCES_DESC: '@header@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute from the @header@ element to support the default @banner@ landmark semantics, if the content does not represent @banner@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content .',
              FAIL_P:         'Remove the @role@ attribute from the %N_F @header@ elements to support the default @banner@ landmark semantics, if the content does not represent @banner@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content .',
              MANUAL_CHECK_S: 'Verify that the @header@ element with @role="presentation"@ does not contain @banner@ landmark semantics.',
              MANUAL_CHECK_P: 'Verify that the %N_MC @header@ elements with @role="presentation"@ do not contain @banner@ landmark semantics.',
              HIDDEN_S:       'One @header@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @header@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @header@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to @banner@ or @role="presentation"@, or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:     'Verify the @header[role="presentation"]@ does not contain content that represents a @banner@ landmark.',
              ELEMENT_HIDDEN_1: '@header@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A top-level @header@ element has role restrictions as part of its definition in the W3C HTML5 Specification to help ensure the @header@ element semantics of identifying @banner@ landmark content.',
              'A top-level @header@ element should only use @role="presentation"@ if the content of the @header@ element is not being used to identify @banner@ landmark content (e.g. repairing poor page semantics).'
            ],
            TECHNIQUES: [
              'The top level @header@ element with no @role@ value by default defines a @banner@ landmark, but the @role="banner"@ is allowed to support legacy pages.',
              'If the top level @header@ element does not identify a @banner@ landmark content use a different element that does identify the semantics of content.',
              'In rare cases @role="presentation"@ can be used when the @header@ element does not represent the @banner@ landmark content on the page (e.g. repairing poor page semantics).',
              'Any other @role@ values are not allowed on @header@ elements.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The main element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-main-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: banner role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }
            ]
        },
        ROLE_9: {
            ID:               'Role 9',
            DEFINITION:       'Overriding a @footer@ element\'s default @role@ of @contentinfo@ landmark %s only be done in special cases. NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          'Do not override @footer@ element @role@. (Deprecated)',
            TARGET_RESOURCES_DESC: '@footer@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute from the @footer@ element to support the default @contentinfo@ landmark semantics, if the content does not represent @contentinfo@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content .',
              FAIL_P:         'Remove the @role@ attribute from the %N_F @footer@ elements to support the default @contnentinfo@ landmark semantics, if the content does not represent @contentinfo@ landmark semantics use @role="presentation"@ or change the element to one that does identify the semantics of the content .',
              MANUAL_CHECK_S: 'Verify that the @footer@ element with @role="presentation"@ does not contain @banner@ landmark semantics.',
              MANUAL_CHECK_P: 'Verify that the %N_MC @footer@ elements with @role="presentation"@ do not contain @banner@ landmark semantics.',
              HIDDEN_S:       'One @footer@ element that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @footer@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @footer@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute, change the attribute @role="%1"@ to @contentinfo@ or @role="presentation"@, or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:     'Verify the @footer[role="presentation"]@ does not contain content that represents a @contentinfo@ landmark.',
              ELEMENT_HIDDEN_1: '@footer@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A top-level @footer@ element has role restrictions as part of its definition in the W3C HTML5 Specification to help ensure the @footer@ element semantics of identifying @contentinfo@ landmark content.',
              'A top-level @footer@ element should only use @role="presentation"@ if the content of the @footer@ element is not being used to identify @contentinfo@ landmark content (e.g. repairing poor page semantics).'
            ],
            TECHNIQUES: [
              'The top level @footer@ element with no @role@ value by default defines a @contentinfo@ landmark, but the @role="contentinfo"@ is allowed to support legacy pages.',
              'If the top level @footer@ element does not identify a @contentinfo@ landmark content use a different element that does identify the semantics of the content.',
              'In rare cases @role="presentation"@ can be used when the @footer@ element does not represent the @contentinfo@ landmark content on the page (e.g. repairing poor page semantics).',
              'Any other @role@ values are not allowed on @footer@ elements.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The main element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-main-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: contentinfo role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }
            ]
        },
        ROLE_10: {
            ID:               'Role 10',
            DEFINITION:       'Overriding heading element\'s (@h1-h6@) default @role@ of @heading@  %s only be done in special cases.  NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          'Overriding @h1-h6@ role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@h1@, @h2@, @h3@, @h4@, @h5@, @h6@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ attribute from the heading element to support the default @heading@ semantics, use @tab@ if the heading represents a @tab@ in a @tabpanel@, or use @role="presentation"@ if the content does not represent @heading@ or @tab@ semantics.',
              FAIL_P:         'Remove the @role@ attribute from the %N_F heading elements to support the default @heading@ semantics, use @tab@ if the heading represents a @tab@ in a @tabpanel@, and/or use @role="presentation"@ if the content does not represent @heading@ or @tab@ semantics.',
              MANUAL_CHECK_S: 'Verify that the heading element (@h1-h6@) with @role="presentation"@ does not contain @banner@ landmark semantics.',
              MANUAL_CHECK_P: 'Verify that the %N_MC heading elements (@h1-h6@) with @role="presentation"@ do not contain @banner@ landmark semantics.',
              HIDDEN_S:       'One heading element (@h1-h6@) that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H heading elements (@h1-h6@) that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @heading@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute form the %1 element to support the default semantics of @heading@, change the attribute @[role="%2"]@ to @tab@ or @presentation@, or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:     'Verify the @%1[role="presentation"]@ does not contain content that represents a @heading@ semantics.',
              ELEMENT_HIDDEN_1: '@%1[role="%2"]@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Heading elements (@h1-h6@) have role restrictions as part of its definition in the W3C HTML5 Specification to help ensure the heading element semantics of identifying @heading@ and @tab@ content.',
              'Heading elements (@h1-h6@) should only use @role="presentation"@ if the content of the heading element is not being used to identify @heading@ and @tab@ content (e.g. repairing poor page semantics).'
            ],
            TECHNIQUES: [
              'Heading elements (@h1-h6@) typically do not need any role definition, there default role is @heading@.',
              'Heading elements (@h1-h6@) used as the @tab@s in a @tabpanel@ widget need to have the @role="tab"@.',
              'In rare cases @role="presentation"@ can be used when a heading element does not provide a label for a section of content or is a tab in a tabpanel widget. Although a better solution is to change the element to something more semantically meaningful.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The main element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-main-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: heading role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#heading'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: tab role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#tab'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
              }
            ]
        },
        ROLE_11: {
            ID:               'Role 11',
            DEFINITION:       '@li@ elements %s only have group item role values of @listitem@ (default - do not set), @menuitem@, @menuitemcheckbox@, @menuitemradio@, @option@, @tab@, @treeitem@ or @presentation@.  NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@li@ element group item semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@li@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ on the @li@ element to support the default @listitem@ semantics or change the @role@ semantics to an allowed grouping widget role.',
              FAIL_P:         'Remove the @role@ on the %N_F @li@ elements to support the default @listitem@ semantics and/or change the @role@ semantics to an allowed grouping widget role.',
              MANUAL_CHECK_S: 'Verify that the @li@ element with @role="presentation"@ does not contain content related to the semantics of the @listitem@ or other allowed @grouping@ widget roles.',
              MANUAL_CHECK_P: 'Verify that the %N_MC @li@ elements with @role="presentation"@ do not contain content related to the semantics of the @listitem@ or other allowed @grouping@ widget roles.',
              HIDDEN_S:       'One @li@ element with @role@ attribute that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @li@ elements with @role@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @li@ elements with @role@ attribute found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'Remove the @role@ attribute on the @li@ element, change the attribute @role="%1"@ to an allowed role, or use a different element that represents the semantics of the content.',
              ELEMENT_MC_1:   'Verify the @li@ element with @role="presentation"@ does not contain content that could be considered part of a list.',
              ELEMENT_HIDDEN_1: '@li@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @li@ element have role restrictions as part of their definition in the W3C HTML5 Specification.',
              'When @li@ elements only need to use the @role@ attribute when they are part of interactive widgets and are restricted to widget group item roles.',
              'The @role@ values used identify grouping widget roles to ensure that their native grouping semantics are not inadvertently overridden by non-grouping widget or landmark roles.'
            ],
            TECHNIQUES: [
              'The @li@ elements when used as part of widgets must be used to indicate an item in a grouping widget role.',
              'In rare cases @role="presentation"@ is allowed on a @li@ element when the element is not being used to represent an item in a list.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The li element',
                url:   'https://www.w3.org/TR/html5/grouping-content.html#the-li-element'
              }
            ]
        },
        ROLE_12: {
            ID:               'Role 12',
            DEFINITION:       '@a[href]@ elements %s only have role values of @link@ (default), @button@, @checkbox@, @menuitem@, @menuitemcheckbox@, @menuitemradio@, @tab@, @switch@ or @treeitem@.  NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@a[href]@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@a[href]@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ on the @a@ element to support the default @link@ semantics or change the @role@ semantics to an allowed grouping widget role.',
              FAIL_P:         'Remove the @role@ on the %N_F @a@ elements to support the default @link@ semantics and/or change the @role@ semantics to an allowed grouping widget role.',
              HIDDEN_S:       'One @a[href]@ element with @role@ attribute that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @a[href]@ elements with @role@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @a[href]@ elements with @role@ attribute found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   'The @role=%1@ is an allowed role value for the @a[href]@ element.',
              ELEMENT_FAIL_1:   'Remove the @role@ attribute on the @a[href]@ element, change the attribute @role="%1"@ to an allowed role, or use a different element that represents the semantics of the content.',
              ELEMENT_HIDDEN_1: '@a[href]@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @a[href]@ has a default role of @link@ and the browser natively supports the behavior of being part of the tab order of the page (e.g. @tabindex=0@) and will repsond to click events and the enter key.',
              'When @a[href]@ elements only need to use the @role@ attribute when they are part of interactive widgets and are restricted to subset of widget roles: @button@, @checkbox@, @menuitem@, @menuitemcheckbox@, @menuitemradio@, @tab@, @switch@ or @treeitem@.'
            ],
            TECHNIQUES: [
              'The @a[href]@ element\'s default role of @link@ can only be overridden with following roles: @button@, @checkbox@, @menuitem@, @menuitemcheckbox@, @menuitemradio@, @tab@, @switch@ or @treeitem@.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The a element',
                url:   'https://www.w3.org/TR/html51/semantics.html#the-a-element'
              }
            ]
        },
        ROLE_13: {
            ID:               'Role 13',
            DEFINITION:       '@select@ elements %s only have role values of @listbox@ (default) or @menu@.  NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@select@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@select]@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ on the @select@ element to support the default @listbox@ semantics or change the @role@ semantics to the @menu@ role.',
              FAIL_P:         'Remove the @role@ on the %N_F @select@ elements to support the default @listbox@ semantics and/or change the @role@ semantics to the @menu@ role.',
              HIDDEN_S:       'One @select@ element with @role@ attribute that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @select@ elements with @role@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @select@ elements with @role@ attribute found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   'The @role=%1@ is an allowed role value for the @select@ element.',
              ELEMENT_FAIL_1:   'Remove the @role@ attribute on the @select@ element, change the attribute @role="%1"@ to an allowed role, or use a different element that represents the semantics of the content.',
              ELEMENT_HIDDEN_1: '@select@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @select@ element has a default role of @listbox@ and the browser natively supports the behavior of being part of the tab order of the page (e.g. @tabindex=0@) and will repsond to click events and the enter key.',
              'When @select@ elements only need to use the @role@ attribute when it semantics are a @menu@ instead of a @listbox@.'
            ],
            TECHNIQUES: [
              'The @select@ element\'s default role of @listbox@ can only be overridden with @menu@.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The select element',
                url:   'https://www.w3.org/TR/html51/semantics.html#the-select-element'
              }
            ]
        },
        ROLE_14: {
            ID:               'Role 14',
            DEFINITION:       '@textarea@ elements %s only have role values of @listbox@ (default) or @menu@.  NOTE: Deprecated in favor of HTML 3 a more general rule on role restrictions based on ARIA in HTML specification.',
            SUMMARY:          '@textarea@ element role semantics. (Deprecated)',
            TARGET_RESOURCES_DESC: '@textarea]@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Remove the @role@ on the @textarea@ element to support the default @textbox@ semantics or use a different element to represent the semantics of the content.',
              FAIL_P:         'Remove the @role@ on the %N_F @textarea@ elements to support the default @editbox@ semantics and/or use a different element to represent the semantics of the content.',
              HIDDEN_S:       'One @textarea@ element with @role@ attribute that is hidden was not evaluated.',
              HIDDEN_P:       '%N_H @textarea@ elements with @role@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @textarea@ elements with @role@ attribute found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   'The @role=%1@ is an allowed role value for the @textarea@ element, but it should be removed since a @textarea@ element can only have the semantics of a @textbox@.',
              ELEMENT_FAIL_1:   'Remove the @role@ attribute on the @textarea@ element, either remove the role to allow the default role of @textbox@, or use a different element that represents the semantics of the content.',
              ELEMENT_HIDDEN_1: '@textarea@ element with @role="%1"@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The @textarea@ element has a default role of @textbox@ can have no other role value.'
            ],
            TECHNIQUES: [
              'The @textarea@ element\'s default role of @textbox@ it can have NO other role, do NOT set.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 5 Specification: The textarea element',
                url:   'https://www.w3.org/TR/html51/semantics.html#the-textarea-element'
              }
            ]
        }
   }
});
