Version 2.0.5 Overview
=============================
* Added element result id to element result information
* Added manual check for form control labels when form is in a data table

Version 2.0.4 Overview
=============================
* Fixed bug identifying parent widget roles

Version 2.0.3 Overview
=============================
* Fixed bug in color contrast calculatio when background color is defined for the body element
* Improved messaging for "Label in Name" rules and ignore elements with DPUB role in control 14 rule.

Version 2.0.2 Overview
=============================
* Updated aria information for row role in the context of a table, grid and treegrid
* Added initial support for use of ARIA 1.3 features (currently ARIA 1.2)
* Uodated CCR rules to include absolute positioned elements with transparent backgrounds to report a manual check

Version 2.0.1 Overview
=============================
* Added rule navigation links to rules pages in documentation
* Initial release of a bookmarklet example using the OpenA11y Library

Version 2.0 Overview
=============================
* Completely rewrote evaluation library and rules to use modules and modern JS techniques
* Improved modeling of accessible DOM, especially for tables
* Improved I18N support
* Updated unit tests to use QUNIT 2.19
* Generates content script for AInspector for Firefox
* Updated evaluation library APIs
* Rules Changes
  * CONTORL_4: Updated purpose and test for using text content for elements with role=button, to support OS and browser color and size adjustments of graphically rendered labels
  * KEYBOARD_1: Support ARIA Authoring Practices guidance for keyboard support of ARIA widget roles
  * KEYBOARD_2: Updated for testing event handlers to verifying tabindex values
  * Adding rules for new WCAG 2.1 Single-A and Double-A Success Criteria (in process)
  * Adding rules for new WCAG 2.2 Single-A and Double-A Success Criteria (in process)
  * Created a rule to avoid using accesskey attribute
  * Moved CONTROL_14 to LIVE_1


Version 1.3.1 Overview
=============================
* Fixed bug in inheriting background color
* Fixed bug in computing colors with opacity values

Version 1.3 Overview
=============================
* Added methods ElementResult object for use in AInspector Element Results view:
  * getTagName
  * getHTMLAttributes
  * getAriaAttributes
  * getAccessibleNameInfo
  * getColorContrastInfo
  * getVisibilityInfo
* Added support for analyzing custom elements with "open" shadow DOM
* Added support for analyzing SLOT element content
* Updated WIDGET 16 to only require manual checking of custom elements with closed shadow DOMs
* Fixed bugs with landmark rules related to header and footer elements
* Removed ROLE_* rules from strict ruleset on role restrictions for certain HTML elements. The requirements are now part of the new HTML_3 rule which is more robust and is based on the ARIA in HTML specification requirements.

Version 1.2 Overview
=============================

* Updated Widget rule references to use ARIA 1.2 spec, ARIA Authoring Practices, MDN resources for ARIA and Web Foundation references for ARIA.
* Updated references to remove references to iCITA website
* Updated references to include W3C WAI Web Accessibility Tutorials
* Updated regression tests based on ARIA 1.2 changes
* Fixed bugs in CONTROL 11 rule on unique names for submit and reset buttons when there are multiple forms
* Fixed bugs in WIDGET 7 rule on owned elements
* Fixed bugs in WIDGET 8 rule related to being owned by another element
* Fixed bugs in WIDGET 9 rule related to having required parent roles
* Fixed bugs in WIDGET 10 rule related to range control attributes
* Changed WIDGET 13 to test for name prohibited requirement (from prohibiting any ARIA markup and this original rule was not included in any rulesets)
* Added HTML 3 rule to support W3C ARIA in HTML specification
* Added WIDGET 15 rule to test for use of deprecated ARIA states and properties on selected roles
* Added WIDGET 16 rule to raise awareness of web components being user on a page and the need for manual checking


Version 1.1.2 Overview
=============================

toCSV and toHTML
-----
* FILE: evaluation_result.js
* FILE: evaluation_export.js
* FILE: element_result.js
* FILES: nls/en-US/ directory

* Moved toCSV and toHTML methods from evaluation_result.js to evaluation_export.js
* Updated links from ARIA 1.0 references to ARIA 1.1 references
* Added getAccessibleName to element result object
* Cleaned source code files to remove DOS line breaks, tabs and spaces at the ends of lines

Version 1.1.1 Overview
=============================

toCSV and toHTML
-----
* FILE: evaluation_result.js
* FILE: element_result.js
* FILE: cache_dom_element.js

* Added toCSV function for exporting evaluation results to a CSV format
* Added toHTML function for exporting evaluation results to a HTML format
* This included creating a DOM element property text_content

Landmark Rule NLS References
----------------------------
* FILE: rules_nls_landmarks.js

* Fixed some references to the wrong HTML elements in INFORMATIONAL_LINKS section of several rules


Version 1.1.0 Overview
=============================

Computed Style
---------------
* FILE: cache_style.js

* Added "rgba(0, 0, 0, 0)" as a definition of a transparent background-color

HTML
----
* FILE: wcag20_aria_strict_ruleset.js (from Revision 2,926)
* FILE: wcag20_aria_transitional_ruleset.js (from Revision 2,926)

### HTML 1: Verify semantics @b@ and @i@ elements
* Removed rule from rulesets


KEYBOARD
--------
* FILE: rules_keyboard.js (from Revision 2,926)
* FILE: rules_nls_keyboard.js (from Revision 2,926)

### Keyboard 1: Widgets must have keyboard support required by their roles
* Has been changed to only generate manual checks


LAYOUT
------
* FILE: rules_layout.js (from Revision 2,926)
* FILE: rules_nls_layout.js (from Revision 2,926)

### Layout 1: Layout tables must have meaningful sequence
* Updated purpose messaging to help make rule requirements clearer

### Layout 3: Verify aria-flowto supports reading order
* Added new rule


LANDMARK
--------
* FILE: cache_headings_landmark.js (from Revision 2,926)

### Landmark 2: All content must be contained in landmarks
* Updated he cached array of elements with render-able content to not include imput[type="hidden"]


WIDGET
------
* FILE: rules_widget.js (from Revision 2,926)
* FILE: rules_nls_widget.js (from Revision 2,926)

### Widget 14: Verify live region is appropriate
* Added new rule, included



