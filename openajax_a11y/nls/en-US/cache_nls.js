/**
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

/* -------------------------------------------------------------------------------------- */
/* OpenAjax Alliance Cache Properties and Values National Language Support (NLS): English */
/* -------------------------------------------------------------------------------------- */


OpenAjax.a11y.nls.Cache.addCacheNLSFromJSON('en-us', {

    /*
     * Boolean values
     */
    boolean_values : {
     true_value  : 'True',
     false_value : 'False'
    },

    not_boolean_value : "Not a boolean value",

    yes_no_values : {
     yes_value : 'Yes',
     no_value  : 'No'
    },

    required    : 'Required',
    recommended : 'Recommended',

    filteredItem  : "filtered element",
    filteredItems : "filtered elements",

    filteredRule  : "filtered rule",
    filteredRules : "filtered rules",

    undefined : "undefined",
    empty     : "empty",

    message   : "Message",

    rules     : "rules",
    rule      : "rule",

    noAction  : "No action needed",


    /*
     * Relative implementation priorities of complying to rule requirements
     */
    priorities: ['Undefined', 'First Priority', 'Second Priority', 'Third Priority'],

    /*
     * Types of rule references to a requirement
     */
    references: ['Unknown', 'Requirement', 'Coding Technique', 'Manual Evaluation', 'Best Practice', 'Authoring Technique', 'Other'],

    /*
     * Abbreviation for the types of rule references to a requirement
     */
    reference_abbreviations: ['U', 'R', 'C', 'ME', 'BP', 'A', 'O'],

    /*
     * Media constant values
     */
    reference_media_contants: ['Undefined', 'No', 'Maybe', 'Yes'],

    missing_label : {
      label : "no label",
      style : "missing_label"
    },

    empty_alt_text : {
      label : "empty alt",
      style : "empty_alt"
    },

    missing_alt : {
      label : "missing alt attribute",
      style : "empty_alt"
    },

    invalid_attribute : {
      label : "invalid attribute",
      value : "",
      style : "invalid"
    },

    invalid_value : {
      label : "",
      value : " (invalid)",
      style : "invalid"
    },

    element_result_nls: ['Undefined','P','H','MC','W','V'],

    rule_result_nls: ['Undefined','n/a','P','MC','W','V'],

    /*
     * Status of a rule for evaluating a requirement
     */
    status: ['Undefined', 'Proposed', 'Accepted', 'Deprecated'],

    resource_properties : {

    /*
     * DOMElement object properties
     */

      'document_order' : {
        label       : 'Order',
        description : 'The ordinal position of the item in the list',
        style       : 'doc_order'
      },
      'tag_name' : {
        label       : 'Tag Name',
        description : 'Tag (or element) name of the item',
        style       : 'element'
      },
      'id' : {
        label       : 'id',
        description :  'Value of the id attribute'
      },
      'id_unique'   : {
        label       : 'ID unique',
        description :  'Information about the id attribute value',
        values      : ['Undefined value', 'Not defined', 'Unique', 'Not unique'],
        style       : ['','','','warning']
      },
      'character_count' : {
        label       : 'Text Count',
        description :  'Number of characters in the text content of this tag'
      },
      'class_name'  : {
        label       : 'class',
        description :  'Value of the HTML class attribute'
      },
      'role'        : {
        label       : 'role',
        description :  'Can be used to redefine the role of an element into a landmark or widget'
      },
      'alt'         : {
        label       : 'alt',
        description :  'Value of the HTML alt attribute'
      },
      'alt_for_comparison' : {
        label       : 'Normlized Alt',
        description : 'Normalized version of the alt text content used for comparison'
      },
      'has_alt' : {
        label       : 'Alt Defined',
        description : 'True if the alt attribute was defined in markup'
      },
      'alt_length' : {
        label       : 'Alt text length',
        description : 'The length of the text in the alt text attribute'
      },
      'title'       : {
        label       : 'title',
        description : 'Value of the HTML title attribute'
      },
      'aria_describedby' : {
        label       : 'aria-describedby',
        description : 'aria-describedby can be used to provide additional information about an element to AT users'
      },
      'aria_hidden' : {
        label       : 'aria-hidden',
        description :  'aria-hidden can be used to hide information from assistive technologies that is visible graphically'
      },
      'aria_label'  : {
        label       : 'aria-label',
        description :  'aria-label can be used to label form controls and widgets'
      },
      'aria_labelledby' : {
        label       : 'aria-labelledby',
        description :  'aria-labelledby can be used to label form controls and widgets'
      },
      'xpath'       : {
        label       : 'XPath',
        description : 'XPath information used for identifying the location of the element in the DOM'
      },
      'has_aria_describedby' : {
        label       : 'Description',
        description : 'Description defined using the aria-describedby attribute'
      },
      'calculated_aria_description' : {
        label       : 'Calculated Description',
        description : 'Calculated text content of a description defined using the aria-describedby attribute'
      },
      'for_id'  : {
        label       : 'for',
        description : 'Value of the for attribute of a label element'
      },
      'parent_landmark_role'  : {
        label       : 'Parent landmark role',
        description : 'Role of the landmark that contains this content'
      },
      'parent_landmark'  : {
        label       : 'Containing landmark element',
        description : 'Landmark element that contains this content'
      },
      'is_widget'  : {
        label       : 'ARIA widget role',
        description : 'If element is part of an aria widget'
      },
      'is_landmark'  : {
        label       : 'ARIA landmark role',
        description : 'If element is part of an aria widget'
      },


    /*
     * Calculated values based on CSS properties
     */

      'graphical' : {
        label       : 'Graphical Visibility',
        description : 'Can the item be seen visually',
        values      : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      },
      'is_large_font' : {
        label       : 'Large Font',
        description : 'Boolean value used in WCAG 2.0 evaluation of color contrast ratio'
      },
      'is_visible_to_at' : {
        label       : 'AT Visible',
        description : 'Is the element and its content visible to Assistive Technology',
        values : ['undefined', 'unknown', 'hidden', 'visible']
      },
      'is_visible_onscreen' : {
        label       : 'Screen Visible',
        description : 'Is the element and its content visible on screen',
        values : ['undefined', 'unknown', 'hidden', 'visible']
      },


    /*
     * Run time CSS style properties
     */

      'display'              : {
        label       : 'display',
        description :  'The value of the CSS display property'
      },
      'visibility'           : {
        label       : 'visibility',
        description :  'The value of the CSS visibility property'
      },
      'color'                : {
        label       : 'color',
        description :  'The value of the CSS color property'
      },
      'background_color' : {
        label       : 'background-color',
        description :  'The value of the CSS background-color property'
      },
      'background_image' : {
        label       : 'background-image',
        description :  'The value of the CSS background-image property'
      },
      'font_family'          : {
        label       : 'font-family',
        description :  'The value of the CSS font-family property'
      },
      'font_size'            : {
        label       : 'font-size',
        description :  'The value of the CSS font-size property'
      },
      'font_weight'          : {
        label       : 'font-weight',
        description :  'The value of the CSS font-weight property'
      },
      'position'             : {
        label       : 'position',
        description :  'The value of the CSS position property'
      },
      'left'                 :  {
        label       : 'left',
        description :  'The value of the CSS left property'
      },
      'top'                  : {
        label       : 'top',
        description :  'The value of the CSS top property'
      },
      'height'                 :  {
        label       : 'height',
        description :  'The value of the CSS height property'
      },
      'width'                  : {
        label       : 'width',
        description :  'The value of the CSS width property'
      },
      'area'                  : {
        label       : 'area',
        description :  'The product of the width and height of an element'
      },

    /*
     * Abbreviation Cache object properties
     */
      'abbreviation_text' : {
        label       : 'Abbreviation',
        description :  'The text content of an ABBR or ACROYMN element'
      },

    /*
     * Image Cache object attributes
     */
      'source' : {
        label       : 'src',
        description : 'Value of the src attribute'
      },


    /*
     * Control Cache object attributes
     */
      'computed_label' : {
        label       : 'Label',
        description : 'The label communicated to assistive technologies for identifying the form control.'
      },
      'computed_label_source' : {
        label       : 'Labeling Technique',
        description : 'The technique used for defining the label',
        values      : ['unknown', 'none', 'label by reference', 'label encapsulation', 'title attribute', 'value attribute', 'alt attribute', 'button type', 'child text content', 'aria labelledby', 'aria label', 'caption', 'summary']
      },
      'num_main_landmarks' : {
        label       : 'Main landmarks',
        description : 'Number of main landmarks'
      },
      'num_visible_main_landmarks' : {
        label       : 'Visibile main landmarks',
        description : 'Number of visible main landmarks'
      },
      'fieldset_element' : {
        label       : 'Fieldset/Legend',
        description : 'Content of the fieldset legend element'
      },
      'legend_count' : {
        label       : 'Legend Count',
        description : 'Number of legend elements contained in a fieldset element'
      },
      'accessible_name' : {
        label       : 'Accessible Name',
        description : 'The name of content, link, form control or widget that is communicated to assistive technologies.'
      },
      'accessible_name_for_comparison' : {
        label       : 'Accessible Name (normalized)',
        description : 'Normailzed name of a widget for use in comparisons.'
      },
      'accessible_description' : {
        label       : 'Description',
        description : 'The description of content, image, link, form control or widget that is communicated to assistive technologies.'
      },
      'accessible_description_source' : {
        label       : 'Description Technique',
        description : 'The technique used for defining the description',
        values      : ['unknown', 'none', 'title attribute', 'aria describedby', 'summary']
      },
      'accessible_description_for_comparison' : {
        label       : 'Description (normalized)',
        description : 'Normalized description used for comparisons.'
      },
    /*
     * Link Cache object attributes
     */
      'is_url' : {
        label       : 'is a url',
        description : 'Boolean value indicating if a href contains a URL'
      },
      'is_target' : {
        label       : 'is a target',
        description : 'Boolean value indicating if the link can be a target'
      },
      'link_type' : {
        label       : 'Type of link',
        description : 'Type of link',
        values      : ['empty', 'other', 'internal link', 'link', 'secure link', 'ftp', 'secure ftps', 'file', 'javascript', 'mail to', 'target only']
      },
      'accessible_name_source' : {
        label       : 'Name from',
        description : 'The technique for defining the accessible name of a link',
        values      : ['unknown', 'none', 'label by reference', 'label encapsulation', 'title attribute', 'value attribute', 'alt attribute', 'button type', 'child text content', 'aria-labelledby attribute', 'aria-label attribute', 'caption', 'summary']
      },
      'is_broken' : {
        label       : 'Link broken',
        description : 'Tests to see if the link is broken, valid or has an error',
        values      : ['unkown',  'broken', 'vaild', 'not tested', 'error']
      },
      'name_attribute' : {
        label       : 'Name attribute',
        description : 'Value of the name attribute'
      },
      'target' : {
        label       : 'target',
        description : 'Value of the target attribute'
      },

    /*
     * Media Cache object properties
     */

      'is_live'  : {
        label       : 'Live',
        description :  'Is the media live video or audio',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']

      },

      'is_video'  : {
        label       : 'Video',
        description :  'Does the media object contain video',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']

      },

      'is_audio'  : {
        label       : 'Audio',
        description :  'Does the media object contain audio',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']
      },

      'has_caption'  : {
        label       : 'Caption',
        description :  'Does the media object have captions',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']
      },

      'has_text_alternative' : {
        label       : 'Text Equivalent',
        description :  'Does the media object have a text equivalent',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']
      },

      'has_audio_description' : {
        label       : 'Audio Equivalent',
        description :  'Does the media object have a audio equivalent',
        values      :  ['undefined', 'No', 'Maybe, manual verification required', 'Yes']
      },

    /*
     * Name Cache object properties
     */

      'name'  : {
        label       : 'Name',
        description : 'Text content of the element'
      },
      'name_for_comparison' : {
        label       : 'Normalized name',
        description : 'Text content of the element normalized for use in comparisons'
      },
      'name_from_text_nodes' : {
        label       : 'Name from text',
        description : 'Text content of the element that comes from text dom nodes'
      },
      'name_from_image_alt' : {
        label       : 'Name from alt',
        description : 'Text content of the element that comes from alt text of images'
      },
      'image_count' : {
        label       : 'Image count',
        description : 'Number of images contained in the element'
      },
      'text_only_from_image' : {
        label       : 'Image only',
        description : 'Does the text content only come from images'
      },

    /*
     * List Cache object properties
     */

      'list_type'  : {
        label       : 'List Type',
        values      : ['Undefined', 'Container element', 'Item element', 'Landmark element'],
        description : 'Type of list cache element'
      },

    /*
     * Table Cache object properties
     */

      'row'                      : {
        label       : 'Row',
        description :  'The row of the cell in a table'
      },
      'column'                   : {
        label       : 'Column',
        description :  'The column of the cell in a table'
      },
      'cell_count'                   : {
        label       : 'Cell Count',
        description :  'Number of TH and TD elements in the table'
      },
      'max_row'                      : {
        label       : 'Rows',
        description :  'Number of rows in a table'
      },
      'max_column'                   : {
        label       : 'Columns',
        description :  'Number of columns in a table'
      },
      'number_of_header_ids' : {
        label       : 'Header ID Num',
        description :  'Number of ids in a headers attribute'
      },
      'text_content'             : {
        label       : 'Text',
        description :  'Text content of a table cell'
      },
      'header_content'             : {
        label       : 'Header',
        description :  'Text content of header cells associated with the data cell'
      },
      'header_source'  : {
        label       : 'Header Source',
        values      : ["Undefined", "none", "headers attribute", "Column/Row header cells"],
        description : 'How header cells were calculated for the table'
      },
      'text_normalized'    : {
        label       : 'Text',
        description : 'Text content of a element'
      },
      'caption'        : {
        label       : 'Caption',
        description : 'Caption is used to identify the information in the table'
      },
      'caption_source' : {
        label       : 'Caption Source',
        description : 'The technique used for defining the text content of the caption',
        values      : ['unknown', 'none', 'label by reference', 'label encapsulation', 'title attribute', 'value attribute', 'alt attribute', 'button type', 'child text content', 'aria labelledby', 'aria label', 'caption', 'summary']
      },
      'summary'        : {
        label       : 'Summary',
        description : 'A summary of the table content or author intended conclusions of the information in the table'
      },
      'summary_source' : {
        label       : 'Summary Source',
        description : 'The technique for defining the text content of the summary',
        values      : ['unknown', 'none', 'title', 'aria describedby', 'summary']
      },
      'is_data_table'            : {
        label       : 'Data Table',
        description :  'True if a table has been identified as a data table, otherwise false'
      },
      'is_complex_data_table'            : {
        label       : 'Complex Data Table',
        description :  'True if a table has been identified as a complex data table, otherwise false'
      },
      'first_row_th_count'       : {
        label       : 'Header Count',
        description :  'The number of header cells in the first row or column of a data table'
      },
      'first_row_cell_count' : {
        label       : 'Cell Count',
        description :  'The number of none empty cells in the first row or column of a data table'
      },
      'scope'               : {
        label       : 'scope',
        description :  'The value of the scope attribute of a table cell'
      },
      'headers'             : {
        label       : 'headers',
        description :  'The value of the headers attribute of a table cell'
      },
      'row_span'            : {
        label       : 'rowspan',
        description :  'The value of the rowspan attribute of a table cell'
      },
      'column_span'         : {
        label       : 'colspan',
        description :  'The value of the colspan attribute of a table cell'
      },
      'nesting_level'         : {
        label       : 'Nesting',
        description :  'The level of nesting of a layout table in other tables that are wider than 1 column and are not data tables'
      },
      'table_type'  : {
        label       : 'Table Type',
        values      : ["Undefined", "Table","Caption","Table Head","Table Body", "Row", "Header Cell", "Data Cell"],
        description : 'Type of table element'
      },
      'table_role'  : {
        label       : 'Table Role',
        values      : ["Undefined", "Unknown", "Layout Table", "Data Table", "Complex Data Table"],
        description : 'Identifies if the table is being used for layout or tabular data on the page, and if the data table is a complex data table'
      }

    }
  }
);
