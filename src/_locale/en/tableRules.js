/* tableRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English              */
/* --------------------------------------------------------------------------- */

export const tableRules = {
  TABLE_1: {
      ID:                    'Table 1',
      DEFINITION:            'Data cells in data tables must have row and/or column header cells or use the @headers@ attribute.',
      SUMMARY:               'Data cells must have row/column headers',
      TARGET_RESOURCES_DESC: '@td@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Add @th@ elements to the first row and/or column of the data table or use the @header@ attribute.',
        FAIL_P:         'Add @th@ elements to the first row and/or column of the data table or use the @header@ attribute.',
        MANUAL_CHECK_S: 'The @td@ element does not have any text content. Verify that this cell is being used for formatting and does not need row or column headers.',
        MANUAL_CHECK_P: '%N_F @td@ elements do not have any text content. Verify that these cells are being used for formatting and do not need row or column headers.',
        HIDDEN_S:       'One @td@ element that is hidden was not evaluated.',
        HIDDEN_P:       '%N_H @td@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No data tables and/or @td@ cells on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @%1@ element has 1 header defined using row and/or column headers cells, header content: "%2".',
        ELEMENT_PASS_2:   'The @%1@ element has %2 headers defined using row and/or column headers cells, header content: "%3".',
        ELEMENT_PASS_3:   'The @%1@ element has 1 header defined using the @header@ attribute, header content: "%2".',
        ELEMENT_PASS_4:   'The @%1@ element has %2 headers defined using the @header@ attribute, header content: "%3".',
        ELEMENT_FAIL_1:   'Add table cells to be used as header cells for the @%1@ element using either row/column headers or the @headers@ attribute.',
        ELEMENT_MC_1:     'The @%1@ element does not have any text content and it does not have any header cells. Verify that this cell is being used for formatting and does not need headers.',
        ELEMENT_MC_2:     'The @%1@ element does not have any text content.  Verify it is not being used for identifying the context of a data cell.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'For screen reader users to understand the the context or meaning of the content in a data cell, the headings for the cell must be identified',
        'When header cells are properly identified, screen reader users can distinguish between header and data table cells.'
      ],
      TECHNIQUES: [
        'Use a @th@ element as the first cell in each row and/or column to define row and column headers in simple data tables.',
        'While not recommended, it is also valid to use @td@ element with a @scope@ attribute as a header cell.',
        'Avoid using empty rows and columns for formatting data tables. Use CSS instead.',
        'When row and/or column headers are not sufficient to describe a data cell, use the @header@ attribute to identify the appropriate header cells.  For example, when a data cell spans more than one column or row the column and row headers.'
      ],
      MANUAL_CHECKS: [
        'Verify that empty @td@ and @th@ elements do not need table headers.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The table element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-table-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: headers attribute',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#attr-tdth-headers'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: scope attribute',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#attr-th-scope'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H51: Using table markup to present tabular information',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H51'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H63: Using the scope attribute to associate header cells and data cells in data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H63'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'MDN: The Table element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Accessibility Requirements: 502.3.3 Row, Column and Headers',
          url:   'https://www.ibm.com/able/requirements/requirements/#502_3_3'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        }
      ]
  },
  TABLE_2: {
      ID:                    'Table 2',
      DEFINITION:            'Data tables must have an accessible name to identify the purpose of the table.',
      SUMMARY:               'Data tables must have name',
      TARGET_RESOURCES_DESC: '@table@',
      RULE_RESULT_MESSAGES: {
        FAIL_S:           'Add an accessible name for the data table using either the @caption@ element; or one of the following @table@ element attributes: @summary@, @title@, @aria-label@ or @aria-labelledby@.',
        FAIL_P:           'Add an accessible name to each of the %N_F out of %N_T data tables using either the @caption@ element; or one of the following @table@ element attributes: @summary@, @title@, @aria-label@ or @aria-labelledby@.',
        HIDDEN_S:         'One data table that is hidden was not evaluated.',
        HIDDEN_P:         '%N_H data tables that are hidden were not evaluated.',
        NOT_APPLICABLE:   'No data tables found on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @%1@ element\'s accessible name defined using: @%2@.',
        ELEMENT_FAIL_1:   'Add accessible name using either the @caption@ element; or one of the following @table@ element attributes: @aria-label@ or @aria-labelledby@.',
        ELEMENT_HIDDEN_1: 'The @table@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'An accessible name for a data table enables people using assistive technologies to identify the purpose of the table and to differentiate among multiple data tables on the same page.',
        'Screen readers include table navigation commands and the accessible name will provides context to the table.'
      ],
      TECHNIQUES: [
        'Use @caption@ element to provide an accessible name for a data table.',
        'Use @title@ attribute to provide an accessible name for a data table.',
        'Use @aria-label@ attribute to provide an accessible name for a data table (NOTE: inconsistent browser/AT support).',
        'Use @aria-labelledby@ attribute to provide an accessible name for a data table (NOTE: inconsistent browser/AT support).',
        'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on the @table@ element.'
      ],
      MANUAL_CHECKS: [
        'Make sure the the accessible name accurately and succinctly identifies the purpose of the data table.',
        'If the table markup is actually being used for laying out content in rows or columns, use @role="presentation"@ on the @table@ element.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The table element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-table-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The caption element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-caption-element'
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
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H39: Using caption elements to associate data table captions with data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H39'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H73: Using the summary attribute of the table element to give an overview of data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H73'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F46'
        }
      ]
  },
  TABLE_3: {
      ID:                    'Table 3',
      DEFINITION:            'Some data tables may have an accessible description (e.g. summary) of contents of the table.',
      SUMMARY:               'Data tables may have description',
      TARGET_RESOURCES_DESC: '@table[summary]@,  @table[title]@ or @aria-describedby@ attribute',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'For the data table without a summary, consider adding an @summary@, @title@ or @aria-describedby@ attribute to point to a summary of the information in the simple table.',
        MANUAL_CHECK_P: 'For the %N_F data tables without summary, consider adding an @summary@, @title@ or @aria-describedby@ attribute to point to a summary of the information in each simple table.',
        HIDDEN_S:       'One data @table@ element that is hidden was not evaluated.',
        HIDDEN_P:       'The %N_H data @table@ elements elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No data tables on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @%1@ element has an accessible description through the @aria-describedby@ reference.',
        ELEMENT_PASS_2:   'The @%1@ element has an accessible description through the @title@ attribute.',
        ELEMENT_MC_1:     'The @%1@ element is a simple table, consider adding a @summary@ or @aria-describedby@ attribute to reference a accessible description (e.g. a summary) of the content of the table.',
        ELEMENT_MC_2:     'The @%1@ element a complex table, it is highly recommended to add a @aria-describedby@ attribute to reference a accessible description (e.g. a summary) of the content of the table.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Complex data tables are defined as tables with row and/or column spans, or more than one header cell (e.g. @th@ element) in any row or column of the table.',
        'An accessible description providing a summary of the organization of the table or numerical values reduces the time for users of assistive technology to explore and understand the content of a table.',
        'An accessible description that includes a synopsis of the authors intended conclusions of viewing the content of a table make it easier for people using assistive technologies to understand importance of why the author provided the data table.'
        ],
      TECHNIQUES: [
        'Use the  @aria-describedby@ attribute to provide a reference to an accessible description of the information in a data table.',
        'Use the  @title@ attribute to provide a accessible description of the information in a data table.'
      ],
      MANUAL_CHECKS: [
        'Verify the content of the accessible description accurately summarizes the organization, numerical information in the table or authors intended conclusions from viewing the table.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The table element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-table-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-describedby@ attribute',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @title@ attribute',
          url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        }
      ]
  },
  TABLE_4: {
      ID:                    'Table 4',
      DEFINITION:            'Data tables should have unique accessible names to help users identify and differentiate the data tables on a page.',
      SUMMARY:               'Data tables should have unique names',
      TARGET_RESOURCES_DESC: '@table@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Change the accessible name of the @table@ to be unique.',
        FAIL_P:         'Change the accessible name of the %N_F out of %N_T data tables that do not have unique names to be unique.',
        HIDDEN_S:       'One @table@ element that is hidden was not evaluated.',
        HIDDEN_P:       '%N_H @table@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'Multiple data tables were not found on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The table\'s accessible name "%1" for @%2@ element is unique on the page.',
        ELEMENT_FAIL_1:   'The table\'s accessible name "%1" is not unique on the page for the @%2@ element, update the accessible table names to be unique and descriptive of the table content.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Data tables that share the same accessible name make it difficult to users of assistive technologies to differentiate the differences in content of the data tables on the same page.',
        'In rare cases when multiple data tables have duplicate data, use "Copy 1", "Copy 2" and "Copy X" as part of the accessible name of each table to make it clear that there is more than one copy of the same information on the page.'
      ],
      TECHNIQUES: [
        'Use @caption@ element to provide an accessible name for a data table.',
        'Use @summary@ attribute to provide an accessible name for a data table.',
        'Use @title@ attribute to provide an accessible name for a data table.',
        'Use @aria-label@ attribute to provide an accessible name for a data table (NOTE: inconsistent browser/AT support).',
        'Use @aria-labelledby@ attribute to provide an accessible name for a data table (NOTE: inconsistent browser/AT support).',
        'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on the @table@ element.'
      ],
      MANUAL_CHECKS: [
        'Verify the accessible names for tables are unique and identify the content in the data tables.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The table element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-table-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML Specification: 4.9.1 The caption element',
          url:   'https://html.spec.whatwg.org/multipage/tables.html#the-caption-element'
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
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H39: Using caption elements to associate data table captions with data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H39'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H73: Using the summary attribute of the table element to give an overview of data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H73'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F46'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Web checklist Checkpoint 1.3e: Tables',
          url:   'https://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
        }
      ]
  },
  TABLE_5: {
      ID:                    'Table 5',
      DEFINITION:            'Table markup must identify a table as either a data table or a layout table.',
      SUMMARY:               'Identify table markup as data or layout',
      TARGET_RESOURCES_DESC: '@table@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'The table without headers or @role="none"@, define the purpose of the table by adding header cells if the table is being used for tabular data or use @role="presentation"@ on the table elements if the table is being used to layout content.',
        FAIL_P:   'For the %N_F tables without headers or @role=none"@, define the purpose of the table by adding header cells if the table is being used for tabular data or use @role="presentation"@ on the table elements if the table is being used to layout content.',
        MANUAL_CHECK_S: 'Verify the @table@ element that only has one row or column is used only only for layout.',
        MANUAL_CHECK_P: 'Verify the %N_H @table@ elements that only have one row or column are used only only for layout.',
        HIDDEN_S: 'One @table@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @table@ elements elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No table markup found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @%1@ element is a layout table, since it has @role="%2"@.',
        ELEMENT_PASS_2:   'The @%1@ element is a simple data table, since it has header cells and/or an accessible name.',
        ELEMENT_PASS_3:   'The @%1@ element is a complex data table, since it has columns/row spans or multiple headers in a row or column.',
        ELEMENT_PASS_4:   'The @%1@ element is table, since it is using @role=table@.',
        ELEMENT_PASS_5:   'The @%1@ element is grid, since it is using @role=grid@.',
        ELEMENT_PASS_6:   'The @%1@ element is treegrid, since it is using @role=treegrid@.',
        ELEMENT_MC_1:     'Verify the @%1@ element with only one row is only used for layout purposes, if so add the @role@ attribute with a value of @none@.',
        ELEMENT_MC_2:     'Verify the @%1@ element with only one column is only used for layout purposes, if so add the @role@ attribute with a value of @none@.',
        ELEMENT_FAIL_1:   'Define the purpose of the @%1@ element by adding header cells if the table is being used for tabular data or use @role="none"@ on the table element if the table is being used to layout content.',
        ELEMENT_HIDDEN_1: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'The @table@ element is designed for representing tabular data in a web page, but table markup has also been used by web developers as a means to layout content in rows and columns.',
        'Users of assistive technology are confused when the purpose of table markup is not clearly identified (i.e. layout or for tabular data).',
        'Use @role="presentation"@ on the @table@ element to clearly identify a table markup for layout.',
        'Adding an accessible name and/or description to a @table@ element identifies table markup as a data table (e.g. layout tables must not have an accessible name or description).',
        'The use header cells (e.g. @th@ or @td[scope]@ elements) identifies a @table@ element as a data table.'
      ],
      TECHNIQUES: [
        'Use @th@ elements in the first row and/or first column to identify a table as a data table.',
        'Use @caption@ element; @summary@, @title@, @aria-label@, @aria-labelledby@ or @aria-describedby@ attribute to add an accessible name or description to a @table@ element.',
        'Use @role="presentation"@ on the @table@ element to identify a table and its child table elements (e.g. @tr@ and @td@ elements) are being used for layout.',
        'Layout tables must only use the @tr@ and @td@ table elements for layout content and must NOT have an accessible name or description.'
      ],
      MANUAL_CHECKS: [
        'If a table is used for layout verify the order of content still makes sense when the table markup is disabled.',
        'If a table is used for data tables, verify the each data cell has header cells that clearly identify the meaning of the content of the data cell.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: presentation role',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#presentation'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#edef-TD'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 11.2.2 Table Captions: The CAPTION element',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#h-11.2.2'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: summary attribute',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#adef-summary'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H51: Using table markup to present tabular information',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H51'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H63: Using the scope attribute to associate header cells and data cells in data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H63'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Web checklist Checkpoint 1.3e: Tables',
          url:   'https://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
        }
      ]
  },
  TABLE_6: {
      ID:                    'Table 6',
      DEFINITION:            'Each data table header cell should use @th@ elements rather than @td@ element with a @scope@ attribute.',
      SUMMARY:               'Header cells should be @th@ elements',
      TARGET_RESOURCES_DESC: '@th@ and @td[scope]@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the @td[scope]@ element to a @th@ element',
        FAIL_P:   'Change the @td[scope]@ element to a @th@ element for each of the %N_F header cells using @td[scope]@',
        HIDDEN_S: 'One @table@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @table@ elements elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No td[scope]@ elements on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @th@ element is used for header cell',
        ELEMENT_FAIL_1:   'Change the @td[scope]@ element to a @th[scope]@ element',
        ELEMENT_HIDDEN_1: 'The cells of the table were not evaluated because the table is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'The @%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        '@th@ element is the web standards way to identify header cells in a table, and makes the data table source code easier to read and debug for accessibility problems.'
      ],
      TECHNIQUES: [
        'Use @th@ elements in the first row or column to identify row and column headers in a simple data tables.',
        'Use @headers@ attribute on each @td@ element to identify header information in complex data tables.',
        'Use @th@ element for cells used as header cells in the table.'
      ],
      MANUAL_CHECKS: [
        'Verify the each data cell has header cells that clearly identify the meaning of the content of the data cell.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#edef-TD'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H51: Using table markup to present tabular information',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H51'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'H63: Using the scope attribute to associate header cells and data cells in data tables',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H63'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Web checklist Checkpoint 1.3e: Tables',
          url:   'https://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
        }
      ]
  },
  TABLE_7: {
      ID:                    'Table 7',
      DEFINITION:            'Data cells in complex data tables must use @headers@ attribute to identify header cells.',
      SUMMARY:               'Data cells must use @headers@ attribute',
      TARGET_RESOURCES_DESC: '@td@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Add a @headers@ attribute to the data cell to identify the header cells for the data cell.',
        FAIL_P:         'Add %N_F data cells use the @headers@ attribute to identify the header cells for the data cell.',
        HIDDEN_S:       'One @td@ element that is hidden was not evaluated.',
        HIDDEN_P:       '%N_H @td@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No complex data tables on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@headers@ attribute references the following header: \'%1\'.',
        ELEMENT_PASS_2:   '@headers@ attribute references the following %1 headers: \'%2\'.',
        ELEMENT_FAIL_1:   'Add header cells using the @headers@ attribute, since the cell spans more than one row and/or column table.',
        ELEMENT_HIDDEN_1: 'The cells of the table were not evaluated because the table is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'Data cell was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'The data cells in complex data tables need to use the @headers@ attribute to identify the appropriate header cells, since simple row/column relationships cannot be relied upon to provide header information.',
        'Complex data tables are defined as tables with row and/or column spans, or more than one header cell (e.g. @th@ element) in any row or column of the table.'
      ],
      TECHNIQUES: [
        'Use @headers@ attribute on each @td@ element used as a data cell to identify header information in complex data tables.'
      ],
      MANUAL_CHECKS: [
        'Verify the each data cell has header cells that clearly identify the meaning of the content of the data cell.',
        'Verify that empty @td@ and @th@ elements and does not need table headers.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#edef-TD'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'IBM Web checklist Checkpoint 1.3e: Tables',
          url:   'https://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
        }
      ]
  },
  TABLE_8: {
      ID:                    'Table 8',
      DEFINITION:            'The accessible name of a data table must be different from its accessible description.',
      SUMMARY:               'Name must be different than description',
      TARGET_RESOURCES_DESC: 'Data tables with both an accessible name and accessible description',
      RULE_RESULT_MESSAGES: {
        FAIL_S:         'Change the accessible name and/or accessible description of the data table with accessible name that is the same as the accessible description, make sure the accessible name identifies the content of the data table and the description provides a summary of the content.',
        FAIL_P:         'Change the accessible name and/or accessible description of the %N_F data tables with accessible name that is the same as the accessible description, make sure the accessible name identifies the content of each data table and the description provides a summary of the content.',
        MANUAL_CHECK_S: 'Verify the data table with an accessible name that is longer than the accessible description is actually providing a useful summary of the contents of the data table.',
        MANUAL_CHECK_P: 'Verify the %N_MC data tables with an accessible name that is longer than the accessible description is actually providing a useful summary of the contents of the data table.',
        HIDDEN_S:       'One @table@ element that is hidden was not evaluated.',
        HIDDEN_P:       '%N_H @table@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No data tables with both an accessible name and description on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'Accessible name and description are different.',
        ELEMENT_FAIL_1:   'Change the accessible name and/or accessible description, make sure the accessible name identifies the content of the table and the description provides a summary of the content.',
        ELEMENT_MC_1:     'Verify the data table with an accessible name that is longer than the accessible description is actually providing a useful summary of the contents of the data table.',
        ELEMENT_HIDDEN_1: 'The table was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSES: [
        'Accessible name and description are designed to provide two different types of information to users of assistive technologies and therefore should not duplicate each other.',
        'Accessible name is designed to provide a short title to identify the data table, so when users of assistive technology are using table navigation commands they can identify the table.',
        'Accessible description is designed to provide a longer summary of the table, this could include author intended conclusions of the data.'
      ],
      TECHNIQUES: [
        'Accessible name is typically defined using the @caption@ element, but the @title@, @aria-label@ and @aria-labelledby@ attribute can also be used.',
        'Accessible description is typically defined using the @aria-describedby@ attribute, but the @title@ attribute can also be used.'
      ],
      MANUAL_CHECKS: [
        'Verify the accessible name clearly identifies the purpose of the table.',
        'Verify the description summarizes the content of the table.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements',
          url:   'https://www.w3.org/TR/html4/struct/tables.html#edef-TD'
        },
        { type:  REFERENCES.EXAMPLE,
          title: 'W3C Web Accessibility Tutorials: Tables',
          url:   'https://www.w3.org/WAI/tutorials/tables/'
        }
      ]
  }
}
