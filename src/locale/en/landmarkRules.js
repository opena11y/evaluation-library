/* landmarkRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const landmarkRules = {

  // ----------------------------------------------------------------
  // LANDMARK_1: main landmark: at least one
  // ----------------------------------------------------------------

  LANDMARK_1: {
      ID:         'Landmark 1',
      DEFINITION: 'Each page must have at least one @main@ landmark, used to identify the main content.',
      SUMMARY:    '@main@ landmark: at least one',
      TARGET_RESOURCES_DESC: '@[role="main"]@ and @main@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a @main@ landmark to the page.',
        FAIL_P:   'Add a @main@ landmark to the page.',
        HIDDEN_S: 'One @main@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @main@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'Page has one @main@ landmark.',
        PAGE_PASS_2: 'Page has %1 @main@ landmarks.',
        PAGE_FAIL_1: 'Add a @main@ landmark that identifies the main content of the page.',
        ELEMENT_PASS_1:   '@%1[role="main"]@ defines a @main@ landmark.',
        ELEMENT_PASS_2:   '@main@ element defines a @main@ landmark.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="main"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@main@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'A @main@ landmark provides a navigation point to the primary content of the page for users of assistive technologies.',
        'Most pages only need one @main@ landmark, but in the case of portals or mashups, there may be more than one @main@ landmark on a "page".'
      ],
      TECHNIQUES: [
        'A @main@ element or an element with a @role="main"@ attribute defines a @main@ landmark.',
        'When there is only one @main@ landmark on the page (the typical case), do not use a label.',
        'When there is more than one @main@ landmark, use the @aria-labelledby@ or @aria-label@ attribute to describe the content of each.',
        'If you need to support Microsoft Internet Explorer 8, you must NOT use the @main@ element since the element is supported in the accessibility API, just use @role="main"@ to identify the main landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: main role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The MAIN element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-main-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_2: Page structure must/should be defined by landmarks
  // ----------------------------------------------------------------

  LANDMARK_2: {
      ID:         'Landmark 2',
      DEFINITION: 'All rendered content must be placed inside of container elements with appropriate ARIA landmark roles.',
      SUMMARY:    'All content must be contained in landmarks',
      TARGET_RESOURCES_DESC: 'all rendered content',
      RULE_RESULT_MESSAGES: {
        FAIL_S: 'Update the landmark structure of the page by placing the one element not contained in a landmark into a container element with a proper landmark role.',
        FAIL_P: 'Update the landmark structure of the page by placing the %N_F elements not contained in landmarks into one or more container elements with proper landmark roles.',
        MANUAL_CHECK_S: 'One element may contain renderable content.  If so, move it into a container element with proper landmark role.',
        MANUAL_CHECK_P: '%N_MC elements may contain renderable content.  If so, move them into container elements with proper landmark roles.',
        HIDDEN_S: 'One hidden element with renderable content was found.  If it could become visible make sure it is in a container element with a proper landmark role.',
        HIDDEN_P: '%N_H hidden elements with renderable content were found.  If any could become visible make sure they are in container elements with proper landmark roles.',
        NOT_APPLICABLE: 'No renderable content found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'All %1 elements with content are contained in landmarks.',
        PAGE_MC_1:   '%1 element(s) may contain renderable content. If so, move it/them into appropriate landmarks.',
        PAGE_FAIL_1: 'Move %1 element(s) into appropriate landmarks. (This may require creating additional landmarks.)',
        ELEMENT_PASS_1:   '@%1@ element is contained in @%2@ landmark.',
        ELEMENT_MC_1:     '@%1@ element may contain renderable content. If so, move it into an appropriate landmark.',
        ELEMENT_FAIL_1:   'Move @%1@ element into an appropriate landmark. (This may require creating an additional landmark.)',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Landmarks provide a way to organize the various types of content on a page for users of assistive technologies. The organization of content regions using landmarks is functionally similar to the way visual designers organize information for people who rely on a graphical rendering of the content.',
        'When content is not contained in a landmark, it will be unreachable using landmark navigation, which is an important feature provided by assistive technologies such as screen readers.',
        'EXCEPTION: Dialog content is not required to be in a landmark.'
      ],
      TECHNIQUES: [
        'Use the appropriate landmarks to identify the different regions of content on a web page.',
        'The most important landmark roles are @main@ and @navigation@, as nearly every page will include at least those regions.',
        'Other commonly used landmark roles include @banner@, @contentinfo@, @complementary@ and @search@.',
        'Use HTML sectioning elements that have a default ARIA landmark role: @main@ (@main@), @nav@ (@navigation@), @aside@ (@complementary@), @search@ (@search@) and in some situations @header@ (@banner@) and @footer@ (@contentinfo@). When using these elements, the @role@ attribute should NOT be defined.',
        'A landmark can be created using a @div@ element with a @role@ attribute and the appropriate ARIA landmark role value (e.g., @role="main"@).',
        'The @search@ role is typically placed on a @form@ element or a @div@ that surrounds the search form.'
      ],
      MANUAL_CHECKS: [
        '@object@, @embed@ and @applet@ tags may be used to render content. Use inspection tools to determine if any of these elements actually render content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: Sections',
          url:   'https://html.spec.whatwg.org/multipage/sections.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_3: navigation landmark: at least one
  // ----------------------------------------------------------------

  LANDMARK_3: {
      ID:         'Landmark 3',
      DEFINITION: 'Each page in a website must have at least one @navigation@ landmark, used to identify website navigation links.',
      SUMMARY:    '@navigation@ landmark: at least one',
      TARGET_RESOURCES_DESC: '@[role="navigation"]@ or top-level @nav@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add one or more @navigation@ landmarks that identify groups of links that support website navigation.',
        FAIL_P:   'Add one or more @navigation@ landmarks that identify groups of links that support website navigation.',
        HIDDEN_S: 'One @navigation@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @navigation@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No lists of links found on page.'
      },
      BASE_RESULT_MESSAGES: {
        WEBSITE_PASS_1: 'The page contains one @navigation@ landmark.',
        WEBSITE_PASS_2: 'The page contains %1 @navigation@ landmarks.',
        WEBSITE_FAIL_1: 'Add at least one @navigation@ landmark to the page to identify the links used for website or page content navigation.',
        ELEMENT_PASS_1:   '@%1[role="navigation"]@ defines a @navigation@ landmark.',
        ELEMENT_PASS_2:   '@nav@ element defines a @navigation@ landmark.',
        ELEMENT_FAIL_1:   '@%1@ list element has %2 links and they are not in a @navigation@ landmark.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="navigation"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Navigation landmarks provide a way to identify groups (e.g. lists) of links that are intended to be used for website or page content navigation.'
      ],
      TECHNIQUES: [
        'Reserve the @navigation@ landmark for website and page navigation links.',
        'Website and page navigation links should be top-level @navigation@ landmarks (i.e. not contained in other landmarks).',
        'The @nav@ element or an element with @role="navigation"@ attribute defines a @navigation@ landmark and must be on a container element (e.g., @div@) for @ol@ and @ul@ elements that contain li elements with links. (This may require adding a container element.)',
        'If there is only one @navigation@ landmark on the page, do not use a label.',
        'If there is more than one @navigation@ landmark, use the @aria-labelledby@, @aria-label@ oe @title@ attribute to describe the purpose of the links (e.g., Table of Contents, Site Map, etc.) contained in each.',
        'If the same set of links is used in more than one place on a page, use "Copy 1", "Copy 2" ... "Copy N" as a part of the accessible name to make the navigation labels unique and help orient assistive technology users that the group of links is repeated on the page.'
      ],
      MANUAL_CHECKS: [
        'A list of links to other pages in the website, or to content sections of the current page, should use a @navigation@ landmark.',
        'Verify the links are used for website or page navigation purposes.',
        'Verify the labels uniquely identify each set of navigational links.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: navigation role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#navigation'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The NAV element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-nav-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H97: Grouping related links using the nav element',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H97.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_4: banner landmark: for branding content
  // ----------------------------------------------------------------

  LANDMARK_4: {
      ID:         'Landmark 4',
      DEFINITION: 'Website branding content, typically at the top of a web page, must be identified by using the @banner@ landmark.',
      SUMMARY:    '@banner@ landmark: identifies branding content',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If there is branding content, typically at the top of the page, use the @banner@ landmark to identify it.',
        MANUAL_CHECK_P: 'If there is branding content, typically at the top of the page, use the @banner@ landmark to identify it.',
        HIDDEN_S: 'One @banner@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H@ banner@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:   'Page has @banner@ landmark.',
        PAGE_PASS_2:   'Page has %1 @banner@ landmarks.',
        PAGE_MC_1:     'If the page has a branding banner, use @role="banner"@ on its container element.',
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a @banner@ landmark.',
        ELEMENT_PASS_2:   'The top level @header@ element defines a @banner@ landmark.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'A top level @header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'A @banner@ landmark provides a way to identify organizational or company branding content, usually replicated across all pages and located at the top of each page.'
      ],
      TECHNIQUES: [
        'The @header@ element defines a @banner@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@, @search@ or @section@.',
        'If the @header@ element technique is not being used, a @role="banner"@ attribute on the container element for the branding content can be used to define a @banner@ landmark.',
        'In websites that support mashups using @iframe@ or custom web components, a @banner@ landmark is allowed in each iframe or shadowRoot.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate @banner@ landmarks in each frame.'
      ],
     MANUAL_CHECKS: [
        'Banners are a convention used on most web sites to convey branding information, and may also be used as a location for advertising information.',
        'The @banner@ landmark identifies the banner content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning content',
          url:   'https://www.w3.org/TR/html5/dom.html#sectioning-content-0'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning root',
          url:   'https://www.w3.org/TR/html5/sections.html#sectioning-root'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_5: banner landmark: no more than one
  // ----------------------------------------------------------------

  LANDMARK_5: {
      ID:         'Landmark 5',
      DEFINITION: 'Each page must contain no more than one @banner@ landmark.',
      SUMMARY:    '@banner@ landmark: no more than one',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S: 'More than one @banner@ landmark found on the page. Only one @banner@ landmark is allowed per page or iframe.',
        FAIL_P: 'More than one @banner@ landmark found on the page. Only one @banner@ landmark is allowed per page or iframe.',
        HIDDEN_S: 'One @banner@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H@ banner@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:      'The page contains one @banner@ landmark.',
        PAGE_FAIL_1:      'The page contains %1 @banner@ landmarks. Modify the page to have only one container element with a @banner@ landmark role.',
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a @banner@ landmark.',
        ELEMENT_PASS_2:   'Top level @header@ element defines a @banner@ landmark.',
        ELEMENT_FAIL_1:   '@%1[role="banner"]@ defines a @banner@ landmark.  Modify the page to include only one @banner@ element.',
        ELEMENT_FAIL_2:   'Top level @header@ element defines a @banner@ landmark.  Modify the page to include only one @banner@ element.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'Top level @header@ element  was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'A banner landmark provides a way to identify redundant branding content, usually placed at the top of each web page.'
      ],
      TECHNIQUES: [
        'The @header@ element defines a @banner@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@, @search@ or @section@.',
        'If the @header@ element technique is not being used, a @role="banner"@ attribute on the container element for the branding content can be used to define a @banner@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @banner@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate @banner@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Banners are a convention used on most web sites to convey branding information, and may also be used as a location for advertising information.',
        'The @banner@ landmark identifies the banner content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_6: contentinfo landmark: for admin content
  // ----------------------------------------------------------------

  LANDMARK_6: {
      ID:         'Landmark 6',
      DEFINITION: 'Website administrative content (e.g., copyright, contact, privacy info, etc., typically at the bottom of a web page) must be identified by using the @contentinfo@ landmark.',
      SUMMARY:    '@contentinfo@ landmark: identifies admin content',
      TARGET_RESOURCES_DESC: '@[role="contentinfo"]@ and top-level @footer@ element',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'If there is administrative content (e.g., copyright, contact, privacy info, etc.), typically at the bottom of the page, use the @contentinfo@ landmark or top level @footer@ element to identify it.',
        MANUAL_CHECK_P: 'If there is administrative content (e.g., copyright, contact, privacy info, etc.), typically at the bottom of the page, use the @contentinfo@ landmark or top level @footer@ element to identify it.',
        HIDDEN_S: 'One @contentinfo@ landmark or @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @contentinfo@ landmarks or @footer@ elements that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1: 'Page has @contentinfo@ landmark or top level @footer@ element.',
        PAGE_PASS_2: 'Page has %1 @contentinfo@ landmarks and/or top level @footer@ elements.',
        PAGE_MC_1:   'If the page has administrative content, use @role="contentinfo"@ or @footer@ element on its container element.',
        ELEMENT_PASS_1:   '@%1@ element has @role="contentinfo"@.',
        ELEMENT_PASS_2:   'Top level @footer@ element with the default @role="contentinfo"@.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'The @contentinfo@ landmark provides a way to identify administrative content, typically found at the bottom of each page in a website and referred to as footer information in publishing contexts.',
        'The @contentinfo@ landmark typically includes information and/or links to copyright, contact info, privacy policies and other general information found on all pages in the website.'
      ],
      TECHNIQUES: [
        'The @footer@ element defines a @contentinfo@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@, @search@ or @section@.',
        'If the @footer@ element technique is not being used, a @role="contentinfo"@ attribute on the container element for the administrative content can be used to define a @contentinfo@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @contentinfo@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate possible @contentinfo@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Footers are a convention used on most web sites to provide copyright, contact, privacy and other types of adminstrative content.',
        'The @contentinfo@ landmark identifies the footer content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning content',
          url:   'https://www.w3.org/TR/html5/dom.html#sectioning-content-0'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: Sectioning root',
          url:   'https://www.w3.org/TR/html5/sections.html#sectioning-root'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_7: contentinfo landmark: no more than one
  // ----------------------------------------------------------------

  LANDMARK_7: {
      ID:         'Landmark 7',
      DEFINITION: 'Each page must contain no more than one @contentinfo@ landmark.',
      SUMMARY:    '@contentinfo@ landmark: no more than one',
      TARGET_RESOURCES_DESC: '@[role="contentinfo"]@ and top-level @footer@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'More than one @contentinfo@ landmark found on the page. Only one @contentinfo@ landmark is allowed per page or iframe.',
        FAIL_P:   'More than one @contentinfo@ landmark found on the page. Only one @contentinfo@ landmark is allowed per page or iframe.',
        HIDDEN_S: 'One @contentinfo@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @contentinfo@ landmarks that are hidden were not evaluated.'
      },
      BASE_RESULT_MESSAGES: {
        PAGE_PASS_1:      'The page contains one @contentinfo@ landmark.',
        PAGE_FAIL_1:      'The page contains %1 @contentinfo@ landmarks and/or @footer@ elements. Modify the page to have only one container element with a @contentinfo@ landmark role or @footer@ element.',
        ELEMENT_PASS_1:   '@%1[role="contentinfo"]@ defines a @contentinfo@ landmark.',
        ELEMENT_PASS_2:   'Top level @footer@ element defines a @contentinfo@ landmark.',
        ELEMENT_FAIL_1:   '@%1[role="contentinfo"]@ defines a @contentinfo@ landmark.  Modify the page to include only one @contentinfo@ element.',
        ELEMENT_FAIL_2:   'Top level @footer@ element defines a @contentinfo@ landmark.  Modify the page to include only one @contentinfo@ element.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'The @contentinfo@ landmark provides a way to identify administrative content, typically found at the bottom of each page in a website and referred to as footer information in publishing contexts.',
        'The @contentinfo@ landmark typically includes information and/or links to copyright, contact info, privacy policies and other general information found on all pages in the website.',
        'The @footer@ element that is NOT contained in an @section@ and @aside@ element has the default role of @contentinfo@ landmark.'
      ],
      TECHNIQUES: [
        'The @footer@ element defines a @contentinfo@ landmark, except when it is a descendant of any of the following elements: @article@, @aside@, @main@, @nav@, @search@ or @section@.',
        'If the @footer@ element technique is not being used, a @role="contentinfo"@ attribute on the container element for the administrative content can be used to define a @contentinfo@ landmark.',
        'In websites that support mashups using @iframe@ or @frame@ elements, a @contentinfo@ landmark is allowed in each frame.',
        'If the page is part of a website supporting mashups, use the @aria-labelledby@ or @aria-label@ attribute to differentiate possible @contentinfo@ landmarks in each frame.'
      ],
      MANUAL_CHECKS: [
        'Footers are a convention used on most web sites to provide copyright, contact, privacy and other types of adminstrative content.',
        'The @contentinfo@ landmark identifies the footer content on the page.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_8: banner landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_8: {
      ID:         'Landmark 8',
      DEFINITION: 'The @banner@ landmark must be a top-level landmark.',
      SUMMARY:    '@banner@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@[role="banner"]@ and top-level @header@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @banner@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the @banner@ landmarks on the page to ensure that each is a top-level landmark.',
        HIDDEN_S: 'One element with @[role="hidden"]@ attribute or @header@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="hidden"]@ attributes or @header@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with @[role="banner"]@ or @header@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="banner"]@ defines a top-level @banner@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="banner"]@ defines a top-level @banner@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@header@ element defines a top-level @banner@ landmark.',
        ELEMENT_PASS_4:   '@header@ element defines a top-level @banner@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="banner"]@ element is a top-level landmark (it is currently the child of a @%2@ landmark region).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @header@ element is a top-level landmark (it is currently the child of a @%1@ landmark region).',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.',
        'Banner content is usually the content at beginning of a page that repeats on most pages within a website.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @banner@ landmark or @header@ element is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'A @header@ element with the context of the @body@ element or an element with @[role="contentinfo"]@ attribute defines a @banner@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The HEADER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-header-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_9: banner landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_9: {
      ID:         'Landmark 9',
      DEFINITION: 'The @banner@ landmark must only contain @navigation@, @region@ or @search@ landmarks.',
      SUMMARY:    '@banner@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@banner@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @banner@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        FAIL_P:   'Update the %N_F landmarks that are part of the @banner@ landmark to ensure that the @banner@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        HIDDEN_S: 'One element with @[role="banner"]@ or top-level @header@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="banner"]@ or top-level @header@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="banner"]@ or top-level @header@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @banner@ landmark.',
        ELEMENT_PASS_2:   '@banner@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@banner@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@banner@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page so that the @%1@ landmark is not contained in the @banner@ landmark or @header@ element. Depending on the content in this landmark, consider moving it outside the @banner@ landmark.',
        ELEMENT_FAIL_2:   'The  @banner@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @banner@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="banner"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@header@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
         'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @banner@ landmark, use only @navigation@, @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: banner role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#banner'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: The HEADER element',
          url:   'https://html.spec.whatwg.org/multipage/sections.html#the-header-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: Sections',
          url:   'https://html.spec.whatwg.org/multipage/sections.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_10: navigation landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_10: {
      ID:         'Landmark 10',
      DEFINITION: 'The @navigation@ landmark must only contain @region@ or @search@ landmarks.',
      SUMMARY:    '@navigation@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@navigation@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @navigation@ landmark only contains @region@ or @search@ landmarks.',
        FAIL_P:   'Update the %N_F @navigation@ landmarks on the page to ensure that they only contain  @region@ or @search@ landmarks.',
        HIDDEN_S: 'One @navigation@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @navigation@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @navigation@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @navigation@ landmark.',
        ELEMENT_PASS_2:   '@navigation@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@navigation@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@navigation@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page such that the @%1@ landmark is not contained by the @navigation@ landmark. Depending on the content in this landmark, consider moving it outside the @navigation@ landmark.',
        ELEMENT_FAIL_2:   'The  @navigation@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @navigation@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="navigation"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@nav@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @navigation@ landmark, use only @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: navigation role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#navigation'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The NAV element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-nav-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_11: main landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_11: {
      ID:         'Landmark 11',
      DEFINITION: 'The @main@ landmark must be a top-level landmark.',
      SUMMARY:    '@main@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@main@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @main@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the  @main@ landmarks on the page to ensure that each is a top-level @main@ landmark.',
        HIDDEN_S: 'One element with @[role="main"]@ attribute or a @main@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="main"]@ attribute and/or @main@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="main"]@ attributes or @main@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="main"]@ attribute defines a top-level @main@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="main"]@ attribute defines a top-level @main@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@main@ element defines a top-level @main@ landmark.',
        ELEMENT_PASS_4:   '@main@ element defines a top-level @main@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="main"]@ element defines a top-level @main@ landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @main@ element defines a top-level @main@ landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1[role="main"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@main@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Top-level landmarks are the easiest landmarks to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @main@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'The @main@ element or an element with @[role="main"]@ attribute defines a @main@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: main role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#main'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The MAIN element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-main-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_12: contentinfo landmark: must/should be top-level
  // ----------------------------------------------------------------

  LANDMARK_12: {
      ID:         'Landmark 12',
      DEFINITION: 'The @contentinfo@ landmark must be a top-level landmark.',
      SUMMARY:    '@contentinfo@ landmark: must be top-level',
      TARGET_RESOURCES_DESC: '@contentinfo@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @contentinfo@ landmark on the page to ensure that it is a top-level landmark.',
        FAIL_P:   'Update the @contentinfo@ landmarks on the page to ensure that each @contentinfo@ landmark is a top-level landmark.',
        HIDDEN_S: 'One element with @[role="contentinfo"]@ attribute or @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with  @[role="contentinfo"]@ attributes and/or @footer@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with @[role="contentinfo"]@ attribute and/or @footer@ elements landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="contentinfo"]@ attribute defines a top-level @contentinfo@ landmark.',
        ELEMENT_PASS_2:   '@%1[role="contentinfo"]@ attribute defines a top-level @contentinfo@ landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@footer@ element defines a top-level @contentinfo@ landmark.',
        ELEMENT_PASS_4:   '@footer@ element defines a top-level @contentinfo@ landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="contentinfo"]@ element defines a top-level @contentinfo@ landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @footer@ element defines a top-level @contentinfo@ landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@%1@ element with @role="contentinfo"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'When creating the landmark structure on the page, ensure that the @contentinfo@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).',
        'A @footer@ element with the context of the @body@ element or an element with @[role="contentinfo"]@ attribute defines a @contentinfo@ landmark.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The FOOTER element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-footer-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_13: contentinfo landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_13: {
      ID:         'Landmark 13',
      DEFINITION: 'The @contentinfo@ landmark must only contain @navigation@, @region@ or @search@ landmarks.',
      SUMMARY:    '@contentinfo@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@contentinfo@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @contentinfo@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        FAIL_P:   'Update the %N_F landmarks that are part of the @contentinfo@ landmark to ensure that the @contentinfo@ landmark only contains @navigation@, @region@ and @search@ landmarks.',
        HIDDEN_S: 'One element with @[role="contentinfo"]@ or top-level @footer@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="contentinfo"]@ or top-level @footer@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="contentinfo"]@ or top-level @footer@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @contentinfo@ landmark.',
        ELEMENT_PASS_2:   '@contentinfo@ landmark does not contain any other landmarks.',
        ELEMENT_PASS_3:   '@contentinfo@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4:   '@contentinfo@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1:   'Update the landmarks on the page so that the @%1@ landmark is not contained in the @contentinfo@ landmark. Depending on the content in this landmark, consider moving it outside the @contentinfo@ landmark.',
        ELEMENT_FAIL_2:   'The  @contentinfo@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @contentinfo@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1[role="contentinfo"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@footer@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
         'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'If landmarks are needed within a @contentinfo@ landmark, use only @navigation@, @region@ or @search@.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: contentinfo role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#contentinfo'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: The FOOTER element',
          url:   'https://html.spec.whatwg.org/multipage/sections.html#the-footer-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: Sections',
          url:   'https://html.spec.whatwg.org/multipage/sections.html'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_14: search landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_14: {
      ID:         'Landmark 14',
      DEFINITION: 'The @search@ landmark must only contain @region@ landmarks.',
      SUMMARY:    '@search@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@search@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmarks on the page to ensure that the @search@ landmark only contains @region@ landmarks.',
        FAIL_P:   'Update the %N_F @search@ landmarks on the page to ensure that each only contains  @region@ landmarks.',
        HIDDEN_S: 'One @search@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @search@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @search@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ landmark can be part of @search@ landmark.',
        ELEMENT_PASS_2: '@search@ landmark does not contain any @region@ landmarks.',
        ELEMENT_PASS_3: '@search@ landmark contains one allowed landmark: %1.',
        ELEMENT_PASS_4: '@search@ landmark contains %1 allowed landmarks: %2.',
        ELEMENT_FAIL_1: 'Update the landmark structure on the page such that the @%1@ landmark is not contained by the @search@ landmark. Depending on the content in this landmark, consider moving it outside the @search@ landmark.',
        ELEMENT_FAIL_2:   'The  @search@ landmark should NOT contain the following landmark: %1.',
        ELEMENT_FAIL_3:   'The  @search@ landmark should NOT contain the following %1 landmarks: %2.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="search"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@%1@ element with @role="@%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'A @search@ landmark identifies a form on the page used to search for content across the entire website.',
        'For @search@ landmarks containing more than one search option and where each option can be represented as its own section, use @region@ landmarks to identify these sections.',
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'Website search options should be top-level @search@ landmarks (e.g. not contained in other landmarks).',
        'Include a @role="search"@ attribute on an element that contains all of the search form controls.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: search role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#search'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_15: form landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_15: {
      ID:         'Landmark 15',
      DEFINITION: 'The @form@ landmark must only contain @region@ landmarks.',
      SUMMARY:    '@form@ landmark: restrictions',
      TARGET_RESOURCES_DESC: '@form@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the landmark structure on the page to ensure that the @form@ landmark only contains @region@ landmarks.',
        FAIL_P:   'Update the %N_F @form@ landmarks on the page to ensure that each only contains @region@ landmarks.',
        HIDDEN_S: 'One @form@ landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @form@ landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @form@ landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark can be part of @form@ landmark.',
        ELEMENT_PASS_2:   '@form@ landmark does not contain any @region@ landmarks.',
        ELEMENT_PASS_3:   '@form@ landmark contains one @region@ landmark.',
        ELEMENT_PASS_4:   '@form@ landmark contains %1 @region@ landmarks.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1@ landmark is not contained by the @form@ landmark. Depending on the content in this landmark, consider moving it outside the @form@ landmark.',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @form@ landmarks contains only @region@ landmarks, the following %1 landamrks were found: %2.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="form"@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@form@ element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_3: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Form landmarks provide a way to identify groups of form controls and widgets on the page.',
        'For @form@ landmarks containing more than one group of controls, where each is considered its own section, use @region@ landmarks to identify these sections.',
        'Ensuring that the landmark structure of a page is not overly complex enables users of assistive technologies to more easily find and navigate to the desired content.'
      ],
      TECHNIQUES: [
        'A @form@ element or an element with a @role="form"@ attribute, which also has an author-defined accessible name, will be considered an @form@ landmark.',
        'A @form@ landmark should be a container element of all the form controls in the form.',
        'Use a element @[role=region]@ attribute or a @section@ on an element that identifies subgroups or sections of controls.',
        'Use ARIA labeling techniques to give each region an accessible name describing the contents of the region.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: form role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#form'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_16: region landmark labeling
  // ----------------------------------------------------------------

  LANDMARK_16: {
      ID:         'Landmark 16',
      DEFINITION: 'Each element with an @[role=region]@ that should be an @region@ landmark must have an accessible name.',
      SUMMARY:    '@region@ landmark must have accessible name',
      TARGET_RESOURCES_DESC: 'Elements with @role="region"@ and @section@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Determine whether the element with ARIA role of @region@ should be a landmark and if so, add an accessible name to the element.',
        MANUAL_CHECK_P: 'Determine if any of the %N_MC elements with ARIA role of @region@ should be landmarks, and if so, add an accessible name to the those elements.',
        HIDDEN_S: 'One element with ARIA role of @region@ that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with ARIA role of @region@ that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No elements with ARIA role of @region@ on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="region"]@ element has an accessible name and is considered an ARIA landmark.',
        ELEMENT_MC_1:     'Determine if the @%1[role="region"]@ element should be an ARIA landmark, and if so, add an accessible name.',
        ELEMENT_HIDDEN_1: '@%1[role="region"]@ element was not evaluated because it is hidden from assistive technologies.',
      },
      PURPOSES: [
        'The @region@ landmark is used to identify subsections of @banner@, @complementary@, @contentinfo@, @main@, @navigation@ and @search@ landmarks.',
        'For an element with an @[role=region]@ to be considered an @region@ landmark on the page, it must have an accessible name that identifies the contents of the region.'
      ],
      TECHNIQUES: [
        'A @section@ element or an element with a @role="region"@ attribute, which also has an author-defined accessible name, will be considered an @region@ landmark.',
        'Use the @aria-labelledby@ attribute to provide an accessible name by referencing the @id@s of one or more heading (e.g. h2, h3, h4 element) or other elements that identify the contents of the region.',
        'Use the @aria-label@ attribute to provide an accessible name that identifies the contents of the region.',
        'The @title@ attribute may also be used to provide an accessible name to identify the contents of the region. Note, however, that this technique also generates a tooltip in many  web browsers.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: region role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#region'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The SECTION element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-section-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA20: Using the region role to identify a region of the page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA20'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }

      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_17: unique acc. names for landmarks with same role
  // ----------------------------------------------------------------

  LANDMARK_17: {
      ID:         'Landmark 17',
      DEFINITION: 'Multiple instances of landmarks with the same role must have unique accessible names.',
      SUMMARY:    'Landmarks must be uniquely identifiable',
      TARGET_RESOURCES_DESC: 'Landmarks',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Review the landmark labeling to ensure that its accessible name is unique among other landmarks of the same type.',
        FAIL_P:   'Review the labeling of %N_T landmarks to ensure that, if any other landmarks of the same type exist on the page, each has a unique accessible name.',
        HIDDEN_S: 'One landmark that is hidden was not evaluated.',
        HIDDEN_P: '%N_H landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1@ landmark has a unique label.',
        ELEMENT_FAIL_1:   'Change the accessible name "%1" of the @%2@ landmark (or the other duplicates) so that it is unique on the page.',
        ELEMENT_HIDDEN_1: '@%1@ element with @role="%2"@ was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Landmarks identify the regions of content on a page.',
        'When a landmark does not have an author-defined accessible name, assistive technologies will use its ARIA role as an identifier.',
        'When there is more than one landmark of the same type on the page (e.g., multiple @navigation@ and/or @region@ landmarks), additional labeling through the use of author-defined accessible names is needed to allow users to differentiate among them.'
      ],
      TECHNIQUES: [
        'Use the @aria-labelledby@ attribute to provide a unique accessible name by referencing the @id@ of a heading or other element on the page that describes the content of the landmark.',
        'Use the @aria-label@ attribute to provide a unique accessible name that describes the content of the landmark.',
        'The @title@ attribute may be used to provide a unique accessible name that describes the content of the landmark. Note, however, that many browsers will also generate a tooltip from the @title@ attribute value.',
        'While ARIA landmarks may be defined using the @role@ attribute, some HTML5 sectioning elements have default landmark roles (e.g., @main@, @nav@, @aside@, @search@ and in some situations, @header@ and @footer@). Thus when multiple @nav@ elements, for example, are used on a page, define a unique accessible name for each of them.'
                    ],
      MANUAL_CHECKS: [
        'Verify that the label describes the content of the landmark.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: region role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#region'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: Sections',
          url:   'https://html.spec.whatwg.org/multipage/sections.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_18: Landmarks must be descriptive
  // ----------------------------------------------------------------

  LANDMARK_18: {
      ID:         'Landmark 18',
      DEFINITION: 'Landmarks must identify regions of content on the page according to the ARIA Landmark Roles specification.',
      SUMMARY:    'Landmarks must identify content regions',
      TARGET_RESOURCES_DESC: 'Elements with ARIA Landmark roles',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:  'Verify that the landmark role correctly identifies the content region for which the element is a container.',
        MANUAL_CHECK_P:  'Verify that each of the %N_MC landmark roles correctly identifies the content region for which its corresponding element is a container.',
        HIDDEN_S:        'One landmark that is hidden was not evaluated.',
        HIDDEN_P:        '%N_H landmarks that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No landmarks on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1:      'Verify the @%1@ landmark with the label "%2" describes the type of content it contains.',
        ELEMENT_HIDDEN_1:  'The @%1@ landmark was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'When ARIA landmarks are used to identify regions of content on the page, users of assistive technologies gain programmatic access to those regions through built-in navigation commands.',
        'Proper use of landmarks provides a navigable structure where common sections or features of pages can be easily accessed or, conversely, skipped over if they represent repeated blocks of content.',
        'If the appropriate landmark roles are NOT used, the type or purpose of each content region will be less obvious to users of assistive technologies.',
        'In the worst-case scenario, when NO landmark roles are present, the content on the page will be presented to users of assistive technologies as a single undifferentiated block.',
        'Visual styling of blocks of content are often good indicators of potential landmarks (e.g. @banner@, @main@, @navigation@, @contentinfo@).'
      ],
      TECHNIQUES: [
        'Use the appropriate landmarks to identify the different regions of content on a web page.',
        'The most important landmark roles are @main@ and @navigation@, as nearly every page will include at least those regions.',
        'Other commonly used landmark roles include @banner@, @contentinfo@, @complementary@ and @search@.',
        'Use HTML5 sectioning elements that have a default ARIA landmark role: @main@ (@main@), @nav@ (@navigation@), @aside@ (@complementary@) and in some situations @header@ (@banner@) and @footer@ (@contentinfo@). When using these elements, the @role@ attribute should NOT be defined.',
        'In HTML4 and XHTML 1.0 documents, a landmark can be created using a @div@ element with a @role@ attribute and the appropriate ARIA landmark role value (e.g., @role="main"@).',
        'The @search@ role is typically placed on a @form@ element or a @div@ that surrounds the search form.',
        'When there are multiple instances of a particular landmark role on a page, provide a unique accessible name for each landmark with the same role to enable users to differentiate among them.',
        'An alternative landmark can be created in HTML5 by using the @section@ element, which has a default landmark role of @region@, with an author-defined accessible name (e.g., using @aria-labelledby@ to reference a heading element).',
        'Do not nest landmarks with the same role (e.g., do not place navigation landmarks within a navigation landmark). Instead, use the @section@ element technique described above to provide additional subsections within a standard landmark.',
        'If a region on a page does not correspond to one of the defined ARIA landmark roles, the @section@ element technique described above can be used to create a landmark container for the content.'
      ],
      MANUAL_CHECKS: [
        'View the accessible names of the landmarks on the page and verify that each uniquely describes the type of content the landmark contains.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML: Sections',
          url:   'https://html.spec.whatwg.org/multipage/sections.html'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }

      ]
  },

  // ----------------------------------------------------------------
  // LANDMARK_19: complementary landmark: restrictions
  // ----------------------------------------------------------------

  LANDMARK_19: {
      ID:         'Landmark 19',
      DEFINITION: 'The @complementary@ landmark must be a top-level landmark.',
      SUMMARY:    '@complementary@ landmark: must be top level',
      TARGET_RESOURCES_DESC: '@complementary@ landmark',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Update the @complementary@ landmark on the page to ensure that it is a top-level @complementary@ landmark.',
        FAIL_P:   'Update the @complementary@ landmarks on the page to ensure that each is a top-level  @complementary@ landmark or a child of a @main@ landmark.',
        HIDDEN_S: 'One element with @[role="complementary"]@ attribute or @aside@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H elements with @[role="complementary"]@ attribute and/or @aside@ elements  that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @[role="complementary"]@ attributes and/or @aside@ elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@%1[role="complementary"]@ attribute defines a @complementary@ landmark that is a top-level landmark.',
        ELEMENT_PASS_2:   '@%1[role="complementary"]@ attribute defines a @complementary@ landmark that is a top-level landmark in the @frame@ or @iframe@.',
        ELEMENT_PASS_3:   '@aside@ element defines a @complementary@ landmark that is a top-level landmark.',
        ELEMENT_PASS_4:   '@aside@ element defines a @complementary@ landmark is a top-level landmark in the @frame@ or @iframe@.',
        ELEMENT_FAIL_1:   'Update the landmark structure on the page such that the @%1[role="complementary"]@ attribute defines a @complementary@ that is a top-level landmark (it is currently the child of a @%2@ landmark).',
        ELEMENT_FAIL_2:   'Update the landmark structure on the page such that the @aside@ element is a top-level landmark (it is currently the child of a @%1@ landmark).',
        ELEMENT_HIDDEN_1: '@%1[role="complementary"]@ was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: '@aside@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        '@complementary@ landmarks provide a way to identify sections of a page that may not be considered the main content, but that provide important supporting or related information to the main content.',
        'Top-level landmarks are the easiest to find and navigate to using assistive technologies.'
      ],
      TECHNIQUES: [
        'Use an @aside@ element to define a @complementary@ landmark.',
        'If the @aside@ element technique is not being used, a @role="complementary"@ attribute on the container element of the supporting content can be used to define a @complementary@ landmark.',
        'When creating the landmark structure on the page, ensure that the @complementary@ landmark is a top-level landmark (i.e., it is not contained within any other landmarks).'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: complementary role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#complementary'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML5: The ASIDE element',
          url:   'https://www.w3.org/TR/html5/sections.html#the-aside-element'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmarks',
          url:   'https://www.w3.org/WAI/ARIA/apg/#aria_landmark'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'WAI-ARIA Authoring Practices 1.2: Landmark Example',
          url:   'https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C Web Accessibility Tutorials: Page Structure',
          url:   'https://www.w3.org/WAI/tutorials/page-structure/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA11: Using ARIA landmarks to identify regions of a page',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA11'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA13: Using aria-labelledby to name regions and landmarks',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA13'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA14: Using aria-label to provide an invisible label where a visible label cannot be used',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA14'
        }
      ]
  }
};
