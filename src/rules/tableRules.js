/* tableRules.js */

/* Imports */
import {
  HEADER_SOURCE,
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TABLE_TYPE,
  TEST_RESULT
} from '../constants.js';

/*
import {
  getCommonMessage
} from '../_locale/locale.js';
*/

import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Table Rules', false);
debug.flag = false;

/*
 * OpenA11y Rules
 * Rule group: Table Rules
 */

export const tableRules = [

/**
 * @object TABLE_1
 *
 * @desc If a table is a data table, if each data cell has headers
 */
{ rule_id             : 'TABLE_1',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['td'],
  validate          : function (dom_cache, rule_result) {

    dom_cache.tableInfo.allTableElements.forEach(te => {
      te.cells.forEach( cell => {
        const de = cell.domElement;
        if (de.visibility.isVisibleToAT) {
          if (cell.isHeader) {
            if (!de.accName.name) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
            }
          }
          else {
            if (de.accName.name) {
              const headerCount = cell.headers.length;
              const headerStr = cell.headers.join (' | ');
              if (headerCount) {
                if (cell.headerSource === HEADER_SOURCE.ROW_COLUMN) {
                  if (headerCount === 1) {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, headerStr]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName, headerCount, headerStr]);
                  }
                }
                else {
                  if (headerCount === 1) {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.elemName, headerStr]);
                  }
                  else {
                    rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', [de.elemName, headerCount, headerStr]);
                  }
                }
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
              }
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
        }
      });
    });
  } // end validation function
 },

/**
 * @object TABLE_2
 *
 * @desc Data table %s have an accessible name
 */
{ rule_id             : 'TABLE_2',
  last_updated        : '2023-05-03',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1'],
  target_resources    : ['table', 'caption'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.tableInfo.allTableElements.forEach(te => {
      const de = te.domElement;
      if (de.visibility.isVisibleToAT) {
        if ((te.tableType === TABLE_TYPE.DATA) ||
            (te.tableType === TABLE_TYPE.COMPLEX)) {
          if (de.accName.name) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, de.accName.source]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
          }
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });
  } // end validation function
 },

/**
 * @object TABLE_3
 *
 * @desc  Complex data tables should have a text description or summary of data in the table
 */

{ rule_id             : 'TABLE_3',
  last_updated        : '2023-05-03',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['table'],
  validate          : function (dom_cache, rule_result) {

    dom_cache.tableInfo.allTableElements.forEach(te => {
      const de = te.domElement;
      if (de.visibility.isVisibleToAT) {
        if ((te.tableType === TABLE_TYPE.DATA) || (te.tableType === TABLE_TYPE.COMPLEX)) {
          if (de.accDescription.name) {
            if (de.accDescription.source === 'aria-describedby') {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName]);
            }
          }
          else {
            if (te.tableType === TABLE_TYPE.DATA){
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
            }
          }
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });
  } // end validation function
 },

/**
 * @object TABLE_4
 *
 * @desc   Data tables with accessible names must be unique
 */

{ rule_id             : 'TABLE_4',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.ALL,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['table'],
  validate          : function (dom_cache, rule_result) {

    const visibleDataTables = []

    dom_cache.tableInfo.allTableElements.forEach(te => {
      const de = te.domElement;
      if (de.visibility.isVisibleToAT) {
        if (te.tableType > TABLE_TYPE.LAYOUT) {
          visibleDataTables.push(te);
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });

    visibleDataTables.forEach(te1 => {
      let count = 0;
      const de = te1.domElement;
      const accName1 = te1.domElement.accName.name;
      if (accName1) {
        visibleDataTables.forEach(te2 => {
          if (te1 !== te2) {
            const accName2 = te2.domElement.accName.name;
            if (accName2) {
              if (accName1.toLowerCase() === accName2.toLowerCase()) {
                count += 1;
              }
            }
          }
        });
        if (count) {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [accName1, de.elemName]);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [accName1, de.elemName]);
        }
      }
    });
  } // end validation function
},

/**
 * @object TABLE_5
 *
 * @desc  Identifies a table is being used for layout or tabular data, or cannot be determined form markup
 */

 { rule_id             : 'TABLE_5',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['table'],
  validate          : function (dom_cache, rule_result) {

    dom_cache.tableInfo.allTableElements.forEach(te => {
      const de = te.domElement;
      if (de.visibility.isVisibleToAT) {
        switch (te.tableType) {
          case TABLE_TYPE.LAYOUT:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.elemName, de.role]);
            break;

          case TABLE_TYPE.DATA:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.elemName]);
            break;

          case TABLE_TYPE.COMPLEX:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.elemName]);
            break;

          case TABLE_TYPE.ARIA_TABLE:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', [de.elemName]);
            break;

          case TABLE_TYPE.ARIA_GRID:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_5', [de.elemName]);
            break;

          case TABLE_TYPE.ARIA_TREEGRID:
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_6', [de.elemName]);
            break;

          default:

            if (te.rowCount === 1) {
              rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [de.elemName]);
            }
            else {
              if (te.colCount === 1) {
                rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.elemName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.elemName]);
              }
            }
            break;
        }
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });
  } // end validation function
 },

/**
 * @object TABLE_6
 *
 * @desc    Tests if table headers use TH elements instead of TD with SCOPE
 */

{ rule_id             : 'TABLE_6',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.ALL,
  rule_required       : false,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['td[scope]'],
  validate          : function (dom_cache, rule_result) {

    dom_cache.tableInfo.allTableElements.forEach(te => {
      const de = te.domElement;
      if (de.visibility.isVisibleToAT) {
        te.cells.forEach( cell => {
          const cde = cell.domElement;
          if (cde.visibility.isVisibleToAT) {
            if (cell.isHeader) {
              if (cde.tagName === 'td') {
                rule_result.addElementResult(TEST_RESULT.FAIL, cde, 'ELEMENT_FAIL_1', [cde.elemName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, cde, 'ELEMENT_PASS_1', [cde.elemName]);
              }
            }
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, cde, 'ELEMENT_HIDDEN_2', [cde.elemName]);
          }
        });
      }
      else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.elemName]);
      }
    });
  } // end validation function
},

/**
 * @object TABLE_7
 *
 * @desc  Data cells in complex table must use headers attributes
 */

{ rule_id             : 'TABLE_7',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['td'],
  validate          : function (dom_cache, rule_result) {

    debug.flag && debug.log(`TABLE 7 Rule ${dom_cache} ${rule_result}`);

/*
    function allReadyDone(span_cell) {

      var span_cells_len = span_cells.length;

      for (var i = 0; i < span_cells_len; i++) {
        if (span_cell === span_cells[i]) return true;
      }

      span_cells.push(span_cell);
      return false;
    }

    var TEST_RESULT   = TEST_RESULT;
    var HEADER_SOURCE = HEADER_SOURCE;
    var VISIBILITY    = VISIBILITY;
    var TABLE_ROLE    = TABLE_ROLE;

    var span_cells = [];

    var table_elements   = dom_cache.tables_cache.table_elements;
    var table_elements_len = table_elements.length;

//     logger.debug("[Table Rule 7] Table Elements on page: " + table_elements_len);

    // Check to see if valid cache reference
    if (table_elements && table_elements_len) {

      for (var i=0; i < table_elements_len; i++) {
        var te = table_elements[i];
        var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;

//         logger.debug("[Table Rule 1] Table Element: " + te + "   is data table: " + te.table_role);

        if (te.table_role === TABLE_ROLE.COMPLEX) {

          var max_row    = te.max_row;
          var max_column = te.max_column;
          var cells      = te.cells;

//         logger.debug("[Table Rule 1] Cell: " + cell + " headers: " + cell.headers);


          for (var r = 0; r < max_row; r++) {
            for (var c = 0; c < max_column; c++) {

              var cell = cells[r][c];

              if (cell &&
                  (cell.table_type === TABLE.TD_ELEMENT)) {

                if (is_visible_to_at == VISIBILITY.VISIBLE) {

                  if(cell.has_spans && allReadyDone(cell)) continue;

                  if (!cell.has_content) {
                    rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cell, 'ELEMENT_MC_1', []);
                  }
                  else {
                    if (cell.header_source === HEADER_SOURCE.HEADERS_ATTRIBUTE) {
                      if (cell.has_content) {
                        rule_result.addResult(TEST_RESULT.PASS, cell, 'ELEMENT_PASS_1', [cell.headers]);
                      }
                      else {
                        rule_result.addResult(TEST_RESULT.FAIL, cell, 'ELEMENT_FAIL_1', [cell.headers]);
                      }
                    }
                    else {
                      if (cell.headers && cell.headers.length > 0) {
                        rule_result.addResult(TEST_RESULT.FAIL, cell, 'ELEMENT_FAIL_5', [cell.headers]);
                      }
                      else {
                        rule_result.addResult(TEST_RESULT.FAIL, cell, 'ELEMENT_FAIL_1', []);
                      }
                    }
                  }
                }
                else {
                 rule_result.addResult(TEST_RESULT.HIDDEN, cell, 'ELEMENT_HIDDEN_1', []);
                }
              }
            }
          }
        }
      } // end loop
    }
    */

  }
},

/**
 * @object TABLE_8
 *
 * @desc  Accessible name and description must be different, description longer than name
 */

{ rule_id             : 'TABLE_8',
  last_updated        : '2023-04-21',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.TABLES,
  ruleset             : RULESET.ALL,
  rule_required       : true,
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.6'],
  target_resources    : ['caption', 'table[summary]', 'table[title]'],
  validate          : function (dom_cache, rule_result) {

    debug.flag && debug.log(`TABLE 8 Rule ${dom_cache} ${rule_result}`);

/*
    var TEST_RESULT   = TEST_RESULT;
    var VISIBILITY    = VISIBILITY;
    var TABLE_ROLE    = TABLE_ROLE;

    var table_elements   = dom_cache.tables_cache.table_elements;
    var table_elements_len = table_elements.length;

    // Check to see if valid cache reference
    if (table_elements && table_elements_len) {

      for (var i=0; i < table_elements_len; i++) {
        var te = table_elements[i];
        var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;

//        logger.debug("[Table Rule 8]          Table Element: " + te);
//        logger.debug("[Table Rule 8]        Accessible Name: " + te.accessible_name_for_comparison);
//        logger.debug("[Table Rule 8] Accessible Description: " + te.accessible_description_for_comparison);

        if (((te.table_role === TABLE_ROLE.DATA) ||
             (te.table_role === TABLE_ROLE.COMPLEX)) &&
            te.accessible_name_for_comparison.length &&
            te.accessible_description_for_comparison.length) {

          if (is_visible_to_at === VISIBILITY.VISIBLE) {
            if (te.accessible_name_for_comparison === te.accessible_description_for_comparison ) {
              rule_result.addResult(TEST_RESULT.FAIL, te, 'ELEMENT_FAIL_1', []);
            }
            else {
              if (te.accessible_name_for_comparison.length >= te.accessible_description_for_comparison.length) {
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, te, 'ELEMENT_MC_1', []);
              }
              else {
                rule_result.addResult(TEST_RESULT.PASS, te, 'ELEMENT_PASS_1', []);
              }
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, te, 'ELEMENT_HIDDEN_1', []);
          }
        }
      }
    }
    */

  } // end validation function
}
];




