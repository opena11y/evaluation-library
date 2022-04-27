/* ruleCategories.js */

import {RULE_CATEGORIES} from '../../constants.js';

export const ruleCategories = [
  {
    id           : RULE_CATEGORIES.LANDMARKS,
    title        : 'Landmarks',
    url          : '',
    description  : 'Use ARIA landmark roles to structure the content of each page and identify major sections of content, thus making them more findable and navigable. The use of landmarks will, in many cases, reflect the visual styling and page layouts that web designers utilize to set apart various sections of content.'
  },
  {
    id           : RULE_CATEGORIES.HEADINGS,
    title        : 'Headings',
    url          : '',
    description  : 'Use heading elements (H1-H6) to provide appropriate labels for landmarks, and to identify subsections of content within landmarks.'
  },
  {
    id           : RULE_CATEGORIES.STYLES_READABILITY,
    title        : 'Styles/Content',
    url          : '',
    description  : 'Use proper HTML markup to identify the semantics and language of text content. Ensure that text is readable by adhering to color contrast guidelines, and that information is not conveyed solely by the use of color, shape, location or sound.'
  },
  {
    id           : RULE_CATEGORIES.IMAGES,
    title        : 'Images',
    url          : '',
    description  : 'Provide appropriate text alternatives for static images and graphics.'
  },
  {
    id           : RULE_CATEGORIES.LINKS,
    title        : 'Links',
    url          : '',
    description  : 'Use link text that properly describes the target of each link. Ensure consistency and uniqueness for links that are usable, predictable and understandable.'
  },
  {
    id           : RULE_CATEGORIES.TABLES,
    title        : 'Tables',
    url          : '',
    description  : 'Provide table captions or other meta-information as needed. Provide row and column header references for data cells of data tables. Ensure that tables used for layout properly linearize text content.'
  },
  {
    id           : RULE_CATEGORIES.FORMS,
    title        : 'Forms',
    url          : '',
    description  : 'Provide meaningful labels for form elements and usable and understandable error feedback as needed.'
  },
  {
    id           : RULE_CATEGORIES.WIDGETS_SCRIPTS,
    title        : 'Widgets/Scripts',
    url          : '',
    description  : 'Use appropriate event handlers on elements to support native interactivity using JavaScript. Ensure that custom widgets created using JavaScript support keyboard interaction and include ARIA markup to describe their roles, properties and states.'
  },
  {
    id           : RULE_CATEGORIES.AUDIO_VIDEO,
    title        : 'Audio/Video',
    url          : '',
    description  : 'Provide appropriate text transcripts, captions or audio descriptions for elements used in rendering audio and video content.'
  },
  {
    id           : RULE_CATEGORIES.KEYBOARD_SUPPORT,
    title        : 'Keyboard Support',
    url          : '',
    description  : 'Provide logical and sequential keyboard navigation among interactive elements such as links and form controls. Use standard models of keyboard interaction for custom widgets.'
  },
  {
    id           : RULE_CATEGORIES.TIMING,
    title        : 'Timing',
    url          : '',
    description  : 'Eliminate accessibility problems caused by time limits on input and by content that moves, scrolls, flashes or auto-updates.'
  },
  {
    id           : RULE_CATEGORIES.SITE_NAVIGATION,
    title        : 'Site Navigation',
    url          : '',
    description  : 'Ensure the consistent labeling and ordering of recurrent page sections across all pages within a website. Provide a meaningful title for each page within a website.'
  },
  // Composite rule categories
  {
    id           : RULE_CATEGORIES.ALL,
    title        : 'All Rules',
    url          : '',
    description  : 'Includes all rules in the ruleset and provides a way to sort and compare the results of all the rules.'
  }
];
