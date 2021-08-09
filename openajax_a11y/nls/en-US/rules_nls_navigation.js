/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
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
        NAVIGATION_1: {
            ID:         'Navigation 1',
            DEFINITION: 'At least two of the following features %s be provided for finding content in a website: a website search feature; a list of links on the home page to all pages in the website; a list of links on each page for navigation between pages; bread crumb links on each page for hierarchical navigation of the website and/or a dedicated page that serves as a site map of all the pages in the website.',
            SUMMARY:    'At least two ways of finding content',
            TARGET_RESOURCES_DESC: 'Website navigational links and search form controls',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that this page can be found from other pages in the website using at least two of the following features: a website search feature; a list of links for navigation from at least one other page in the website and/or from a page in the web site that serves as a site map.',
              MANUAL_CHECK_P: 'Verify that this page can be found from other pages in the website using at least two of the following features: a website search feature; a list of links for navigation from at least one other page in the website and/or from a page in the web site that serves as a site map.',
              NOT_APPLICABLE: 'Single page web resource: no other pages to link to or to search from.'
            },
            NODE_RESULT_MESSAGES: {
              WEBSITE_MC_1: 'This page has both @navigation@ and @search@ landmarks. Verify that they provide links for navigating and the ability to search for content in this website.',
              WEBSITE_MC_2: 'Verify that this page can be found from at least two of the following website features: a website search feature; a list of links for navigation from at least one other page in the website and/or from a page in the web site that serves as a site map.',
              ELEMENT_MC_1: 'Verify that this @navigation@ landmark can be used for navigation of the content in this website.',
              ELEMENT_MC_2: 'Verify that this @search@ landmark can be used to search for content in this website.'
            },
            PURPOSE: [
              'One of the fundamental features of the web is the provision of easy access to useful information. By providing multiple ways to find information within a website, people with disabilities are able to locate content in a manner that best meets their needs.'
            ],
            TECHNIQUES: [
              'Website search feature identified by the @search@ landmark.',
              'A list of links for navigation between pages using the @navigation@ landmark.',
              'Sandtrail/bread crumb links for hierarchical navigation of the website using the @navigation@ landmark.',
              'A dedicated page that serves as a site map of all the pages in the website.'
            ],
            MANUAL_CHECKS: [
              'Verify that at least two of the techniques are implemented for finding content on this page.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G63: Providing a site map',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G63'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G64: Providing a Table of Contents',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G64'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G125: Providing links to navigate to related Web pages',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G125'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G126: Providing a list of links to all other Web pages',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G126'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G161: Providing a search function to help users find content',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G161'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G185: Linking to all of the pages on the site from the home page',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G185'
              }
            ]
        },
        NAVIGATION_2: {
            ID:         'Navigation 2',
            DEFINITION: 'Consistent ordering of @main@, @navigation@, @search@, @banner@, @contentinfo@, @complementary@ and any other shared landmarks used across all pages in a website.',
            SUMMARY:    'Consistent ordering of landmarks',
            TARGET_RESOURCES_DESC: '@main@, @navigation@, @search@, @banner@ and @contentinfo@ landmarks',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that this page uses the same ordering of@main@, @navigation@, @search@, @banner@, @contentinfo@, @complementary@ and any other shared landmarks as other pages within the website.',
              MANUAL_CHECK_P: 'Verify that this page uses the same ordering of @main@, @navigation@, @search@, @banner@, @contentinfo@, @complementary@ and any other shared landmarks as other pages within the website.',
              NOT_APPLICABLE: 'No landmarks found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              WEBSITE_MC_1:   'Verify that this page uses the same ordering of the following landmarks as other pages in the website: %1.',
              ELEMENT_MC_1:   'Verify that the ordering of the @main@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.',
              ELEMENT_MC_2:   'Verify that the ordering of the @navigation@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.',
              ELEMENT_MC_3:   'Verify that the ordering of the @banner@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.',
              ELEMENT_MC_4:   'Verify that the ordering of the @contentinfo@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.',
              ELEMENT_MC_5:   'Verify that the ordering of the @search@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.',
              ELEMENT_MC_6:   'Verify that the ordering of the @complementary@ landmark relative to other landmarks on this page is the same as the ordering used on the other pages in this website.'
            },
            PURPOSE: [
              'One of the fundamental features of the web is the provision of easy access to useful information. Providing consistent ordering of landmarks across all pages of a website will make it easier for people to find the information they are seeking and to navigate between and within pages.'
            ],
            TECHNIQUES: [
              'Include the basic @main@, @navigation@, @banner@ and @contentinfo@ landmarks in your page templates for the website.',
              'If the page includes a website search form, use the @search@ landmark.',
              'Use consistent ordering of the @main@, @navigation@, @search@, @banner@, @contentinfo@, @complementary@ and any other landmarks that are a part of each page within a website.'
            ],
            MANUAL_CHECKS: [
              'Verify that the ordering of the @main@, @navigation@, @search@, @banner@, @contentinfo@, @complementary@ and any other landmarks that are part of each page is consistent with the ordering of these landmarks on other pages.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G61: Presenting repeated components in the same relative order each time they appear',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G61'
              }
            ]
        },
        NAVIGATION_3: {
            ID:         'Navigation 3',
            DEFINITION: 'Consistent ordering of @h1@ and @h2@ elements that label recurring page sections common across all pages in a website.',
            SUMMARY:    'Consistent ordering of @h1@ and @h2@ labels',
            TARGET_RESOURCES_DESC: '@h1@ and @h2@ elements used to identify recurring sections of pages within a website',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that this page uses the same ordering of @h1@ and @h2@ elements used to mark recurring page sections as the ordering used on the other pages within the website.',
              MANUAL_CHECK_P: 'Verify that this page uses the same ordering of @h1@ and @h2@ elements used to mark recurring page sections as the ordering used on the other pages within the website.',
              FAIL_S:         'No @h1@ or @h2@ elements found on the page.',
              FAIL_P:         'No @h1@ or @h2@ elements found on the page.',
              NOT_APPLICABLE: 'Single page web resource: consistent ordering of @h1@ and @h2@ does not apply.'
            },
            NODE_RESULT_MESSAGES: {
              WEBSITE_FAIL_1: 'No @h1@ or @h2@ elements found on the page.',
              WEBSITE_MC_1:   'Verify that the ordering of @h1@ and @h2@ elements used to mark recurring page sections on this page is the same as the ordering used on the other pages within the website.',
              ELEMENT_MC_1:   'Verify that if this @h1@ heading is used to identify the main content of the page, it is in the same order relative to any @h2@ elements that identify recurring page sections as the ordering used on the other pages within the website.',
              ELEMENT_MC_2:   'Verify that if this @h2@ heading is used to identify a recurring page section, it is in the same order relative to other comparable @h2@ elements as the ordering used on the other pages within the website.'
            },
            PURPOSE: [
              'One of the fundamental features of the web is the provision of easy access to useful information. Consistent ordering of @h1@ and @h2@ elements used to identify recurring page sections common across all pages in the website will make it easier for people to find information they are seeking and to navigate between and within pages.'
            ],
            TECHNIQUES: [
              'Use an @h1@ element to identify the main content within a page.',
              'Use @h2@ elements to identify other recurring page sections such as navigation bars, web site search forms, footer information, etc.'
            ],
            MANUAL_CHECKS: [
              'View the @h1@ and @h2@ heading structure of the page, and verify that it has the same or a similar structure as other pages within the website, especially with respect to recurring page sections.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G61: Presenting repeated components in the same relative order each time they appear',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G61'
              }
            ]
        },
        NAVIGATION_4: {
            ID:         'Navigation 4',
            DEFINITION: 'Consistent labeling of landmarks across all pages in a website.',
            SUMMARY:    'Consistent labeling of landmarks',
            TARGET_RESOURCES_DESC: '@main@, @navigation@, @search@, @banner@, @complementary@ and @contentinfo@ landmarks',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that the labeling of the @main@, @navigation@, @search@, @banner@, @complementary@ and @contentinfo@ landmarks on this page is consistent with the labeling of all comparable landmarks on all other pages within the website.',
              MANUAL_CHECK_P: 'Verify that the labeling of the @main@, @navigation@, @search@, @banner@, @complementary@ and @contentinfo@ landmarks on this page is consistent with the labeling of all comparable landmarks on all other pages within the website.',
              NOT_APPLICABLE:  'No landmarks found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              WEBSITE_MC_1: 'Verify that the labeling of landmarks on this page is consistent with the labeling of comparable landmarks on all other pages within the website.',
              ELEMENT_MC_1: 'Verify that the labeling of the @main@ landmark on this page is consistent with the labeling of comparable @main@ landmarks on all other pages within the website.',
              ELEMENT_MC_2: 'Verify that the labeling of the @navigation@ landmark on this page is consistent with the labeling of comparable @navigation@ landmarks on all other pages within the website.',
              ELEMENT_MC_3: 'Verify that the labeling of the @banner@ landmark on this page is consistent with the labeling of comparable @banner@ landmarks on all other pages within the website.',
              ELEMENT_MC_4: 'Verify that the labeling of the @contentinfo@ landmark on this page is consistent with the labeling of comparable @contentinfo@ landmarks on all other pages within the website.',
              ELEMENT_MC_5: 'Verify that the labeling of the @search@ landmark on this page is consistent with the labeling of comparable @search@ landmarks on all other pages within the website.',
              ELEMENT_MC_6: 'Verify that the labeling of the @complementary@ landmark on this page is consistent with the labeling of comparable @complementary@ landmarks on all other pages within the website.'
            },
            PURPOSE: [
              'One of the fundamental features of the web is the provision of easy access to useful information. Consistent labeling of comparable landmark-identified content across all pages of a website will make it easier for people to find information they are seeking and to navigate between and within pages.'
            ],
            TECHNIQUES: [
              'Most pages have sections associated with the @main@, @navigation@, @banner@ and @contentinfo@ landmarks in your page templates for the website.',
              'If the page includes a website search form, use the @search@ landmark.',
              'Landmarks only need labels (using @aria-label@ or @aria-labelledby@) if there is more than one landmark of the same type on a page.',
              'If landmarks have labels, use consistent labeling of the landmarks across all pages within the website.'
            ],
            MANUAL_CHECKS: [
              'Verify that the main content of the page is contained within the @main@ landmark.',
              'Verify that recurring content at the top of each page is contained within a @banner@ landmark.',
              'Verify that website navigational links are contained within @navigation@ landmarks.',
              'Verify that recurring content at the bottom of each page is contained within a @contentinfo@ landmark.',
              'Verify that if a landmark has a label and there are comparable landmarks on other pages in the website, the labels are the same on each page.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G61: Presenting repeated components in the same relative order each time they appear',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G61'
              }
            ]
        },
        NAVIGATION_5: {
            ID:         'Navigation 5',
            DEFINITION: 'Consistent accessible names for @h1@ and @h2@ elements that identify recurring page sections common across all pages in a website.',
            SUMMARY:    'Consistent @h1@ and @h2@ page section labels',
            TARGET_RESOURCES_DESC: '@h1@ and @h2@ elements used to identify recurring page sections within a website',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that the accessible names of @h1@ and @h2@ elements used to identify recurring page sections are consistent with those on all other pages within the website.',
              MANUAL_CHECK_P: 'Verify that the accessible names of @h1@ and @h2@ elements used to identify recurring page sections are consistent with those on all other pages within the website.',
              FAIL_S: 'No @h1@ or @h2@ elements found on the page.',
              FAIL_P: 'No @h1@ or @h2@ elements found on the page.',
              NOT_APPLICABLE: 'Single page web resource: consistency of accessible names does not apply.'
            },
            NODE_RESULT_MESSAGES: {
              WEBSITE_FAIL_1: 'No @h1@ or @h2@ elements found on the page',
              WEBSITE_MC_1:   'Verify that the accessible names of @h1@ and @h2@ elements used to identify recurring page sections are the same as those of comparable @h1@ and @h2@ elements found on the other pages within the website.',
              ELEMENT_MC_1:   'Verify that if this @h1@ heading is used to identify the main content of the page, it has the same accessible name as comparable @h1@ elements on the other pages within the website.',
              ELEMENT_MC_2:   'Verify that if this @h2@ heading is used to identify a recurring page section, it has the same accessible name as comparable @h2@ elements on the other pages within the website.'
            },
            PURPOSE: [
              'One of the fundamental features of the web is the provision of easy access to useful information. Consistent accessible names of @h1@ and @h2@ elements used to identify recurring page sections common across all pages in the website will make it easier for people to find information they are seeking and to navigate between and within pages.'
            ],
            TECHNIQUES: [
              'Use @h1@ elements to identify the main content within a page.',
              'Use @h2@ elements to identify other major sections within pages, e.g. navigation bars, web site search forms, footer information, etc.'
            ],
            MANUAL_CHECKS: [
              'View the @h1@ and @h2@ heading structure of the page, and verify that it has the same relative order as other pages within the website'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G61: Presenting repeated components in the same relative order each time they appear',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G61'
              }
            ]
        }
   }
});
