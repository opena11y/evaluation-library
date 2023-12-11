/* tableInfo.js */

/* Imports */
import {
  TABLE_TYPE,
  HEADER_SOURCE
} from '../constants.js';

import {
  getCommonMessage
} from '../locale/locale.js';

import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('tableInfo', false);
debug.flag = false;
debug.rows = false;
debug.cells = false;
debug.tableTree = false;
debug.headerCalc = false;

/**
 * @class TableElement
 *
 * @desc Identifies a DOM element as table.
 *
 * @param  {Object}  domElement    - Structural Information
 * @param  {Object}  tableElement  - Parent TableElement
 */

class TableElement {
  constructor (parentTableElement, domElement) {
    domElement.tableElement = this;
    this.domElement = domElement;
    this.parentTableElement = parentTableElement;

    this.tableType = TABLE_TYPE.UNKNOWN;
    this.hasCaption = false;

    this.nestingLevel = parentTableElement ?
                        parentTableElement.nestingLevel + 1 :
                        0;

    this.children = [];

    this.rows = [];
    this.row = null;
    this.rowCount = 0;
    this.colCount = 0;

    this.cells = [];

    this.rowGroupCount = 0;
    this.cellCount = 0;
    this.headerCellCount = 0;

    this.spannedDataCells = 0;

    this.currentParent = this;
  }

  addCaption (rowGroup, domElement) {
    this.hasCaption = true;
    const caption = new TableCaption(domElement);
    rowGroup.children.push(caption);
  }

  addRowGroup (rowGroup, domElement) {
    this.rowGroupCount += 1;
    const newRowGroup = new TableRowGroup(domElement);
    rowGroup.children.push(newRowGroup);
    return newRowGroup;
  }

  addRow (rowGroup, domElement) {
    this.rowCount += 1;
    this.row = this.getRow(this.rowCount, domElement);
    rowGroup.children.push(this.row);
  }

  addCell (domElement) {
    let rowSpan, colSpan;
    const tagName = domElement.tagName;
    const node    = domElement.node;

    if (tagName === 'th' || tagName === 'td') {
      rowSpan =  node.hasAttribute('rowspan') ? parseInt(node.getAttribute('rowspan')) : 1;
      colSpan =  node.hasAttribute('colspan') ? parseInt(node.getAttribute('colspan')) : 1;
    }
    else {
      rowSpan =  node.hasAttribute('aria-rowspan') ? parseInt(node.getAttribute('aria-rowspan')) : 1;
      colSpan =  node.hasAttribute('aria-colspan') ? parseInt(node.getAttribute('aria-colspan')) : 1;
    }

    rowSpan = isNaN(rowSpan) ? 1 : rowSpan;
    colSpan = isNaN(colSpan) ? 1 : colSpan;
    let row = this.getRow(this.rowCount);

    const column = row.getNextEmptyColumn();
    const cell = new TableCell(domElement, row.rowNumber, column, rowSpan, colSpan);
    this.cells.push(cell);

    this.cellCount += 1;
    if (cell.isHeader) {
      this.headerCellCount += 1;
    }

    for (let i = column; i < (column + colSpan); i++) {
      for (let j = 0; j < rowSpan; j++) {
        row = this.getRow(this.rowCount + j);
        row.setCell(i, cell);
      }
    }

    if (!cell.isHeader &&
        ((cell.rowSpan > 1) || (cell.colSpan > 1))) {
      this.spannedDataCells += 1;
    }

    return column;
  }

  updateColumnCount (col) {
    this.colCount = Math.max(this.colCount, col);
  }

  getRow(rowNumber, domElement=null) {
    let rowIndex = rowNumber >= 1 ? (rowNumber - 1) : 0;
    if (!this.rows[rowIndex]) {
      this.rows[rowIndex] = new TableRow(domElement, rowNumber);
    }
    else {
      if (domElement) {
        this.rows[rowIndex].setDomElement(domElement);
      }
    }
    return this.rows[rowIndex];
  }

  getCell(rowNumber, columnNumber) {
    for (let i = 0; i < this.cells.length; i += 1) {
      const cell = this.cells[i];
      if ((rowNumber >= cell.startRow) &&
          (rowNumber < cell.endRow) &&
          (columnNumber >= cell.startColumn ) &&
          (columnNumber < cell.endColumn )) {
        return  cell;
      }
    }
    return null;
  }

  computeHeaders (domCache) {
    const tableElement = this;
    this.rows.forEach( row => {
      row.cells.forEach( cell => {
        debug.headerCalc && debug.log(`${cell}`, 1);
        if (cell.headerSource === HEADER_SOURCE.HEADER_NONE) {
          if (!cell.isHeader) {
            const node = cell.domElement.node;
            if (node.hasAttribute('headers')) {
              const ids = node.getAttribute('headers').split(' ');
              debug.headesCalc && debug.log(`[headers]: ${ids.join(' ')}`);
              for (let i = 0; i < ids.length; i += 1) {
                const de = domCache.getDomElementById(ids[i]);
                if (de && de.accName.name) {
                  cell.headers.push(de.accName.name);
                }
              }
              if (cell.headers.length) {
                cell.headerSource = HEADER_SOURCE.HEADERS_ATTR;
              }
            }
            else {
              // get Column Headers
              for (let i = 1; i < row.rowNumber; i += 1) {
                const hc = tableElement.getCell(i, cell.startColumn);
                debug.headerCalc && debug.log(`[columnHeaders][${i}][${cell.startColumn}]: ${hc}`)
                if (hc && hc.isHeader &&
                    (!hc.hasScope || hc.isScopeColumn) &&
                    hc.domElement.accName.name) {
                  cell.headers.push(hc.domElement.accName.name);
                }
              }

              // get Row Headers
              for (let i = 1; i < cell.startColumn; i += 1) {
                const hc = tableElement.getCell(row.rowNumber, i);
                debug.headerCalc && debug.log(`[rowHeaders][${row.rowNumber}][${i}]: ${hc}`)
                if (hc && hc.isHeader &&
                    (!hc.hasScope || hc.isScopeRow) &&
                    hc.domElement.accName.name) {
                  cell.headers.push(hc.domElement.accName.name);
                }
              }

              if (cell.headers.length) {
                cell.headerSource = HEADER_SOURCE.ROW_COLUMN;
              }
            }
            debug.headerCalc && debug.log(`${cell}`);
          }
        }
      });
    });
  }

  getTableType () {

    const de = this.domElement;

    if (de.hasRole) {
      switch (de.role) {
        case 'none':
        case 'presentation':
          return TABLE_TYPE.LAYOUT;

        case 'grid':
          return TABLE_TYPE.ARIA_GRID;

        case 'table':
          return TABLE_TYPE.ARIA_TABLE;

        case 'treegrid':
          return TABLE_TYPE.ARIA_TREEGRID;

        default:
          break;
      }
    }

    if (((this.headerCellCount > 0) ||
         (this.domElement.accName.name)) &&
       (this.rowCount > 1) &&
       (this.colCount > 1)) {
      if (this.spannedDataCells > 0) {
        return TABLE_TYPE.COMPLEX;
      }
      else {
        return TABLE_TYPE.DATA;
      }
    }
    return TABLE_TYPE.UNKNOWN;
  }

  toString () {
    return `[TableElement][type=${getCommonMessage('tableType', this.tableType)}][role=${this.domElement.role}]: ${this.children.length} children ${this.rows.length} rows`;
  }

  debugRowGroup (prefix, item) {
    debug.log(`${prefix}${item}`);
    if (item.isGroup) {
      item.children.forEach( child => {
        if (child) {
          this.debugRowGroup(prefix + '  ', child);
        }
      });
    }
  }

  debug () {
    if (debug.flag) {
      debug.log(`${this}`);
      if (debug.tableTree) {
        this.children.forEach( child => {
          this.debugRowGroup('  ', child);
        });
      }
      debug.separator();
      for (let i = 0; i < this.rows.length; i += 1) {
        this.rows[i].debug('  ');
      }
    }
  }
}

/**
 * @class TableCaption
 *
 * @desc Identifies a DOM element as caption (e.g. CAPTION) in a table
 *
 * @param  {Object}  domElement - Structural Information
 */

class TableCaption {
  constructor (domElement) {
    if (domElement) {
      this.domElement   = domElement;
    }
  }

  get isGroup () {
    return false;
  }

  get isRow () {
    return false;
  }

  toString() {
    return `[TableCaption]: ${this.domElement.accName.name}`;
  }
}

/**
 * @class TableRowGroup
 *
 * @desc Identifies a DOM element as row group (e.g. THEAD or TBODY) in a table
 *
 * @param  {Object}  domElement - Structural Information
 */

class TableRowGroup {
  constructor (domElement) {
    if (domElement) {
      this.domElement   = domElement;
    }
    this.children = [];
  }

  get isGroup () {
    return true;
  }

  get isRow () {
    return false;
  }

  toString() {
    return `[TableRowGroup][${this.domElement.tagName}]: ${this.children.length} children`;
  }
}


/**
 * @class TableRow
 *
 * @desc Identifies a DOM element as row in a table
 *
 * @param  {Object}  domElement - Structural Information
 * @param  {Number}  rowNumber  - Number of the row in the table
 */

class TableRow {
  constructor (domElement, rowNumber) {
    if (domElement) {
      this.domElement   = domElement;
    }
    this.cells = [];
    this.rowNumber = rowNumber;
  }

  get isGroup () {
    return false;
  }

  get isRow () {
    return true;
  }

  getNextEmptyColumn () {
    let nextColumn = 1;
    while (this.cells[nextColumn-1]) {
      nextColumn += 1;
    }
    return nextColumn;
  }

  setDomElement(domElement) {
    this.domElement = domElement;
  }

  setCell(columnNumber, cell) {
    if (columnNumber > 0) {
      this.cells[columnNumber - 1] = cell;
    }
  }

  toString () {
    return `[TableRow]: Row ${this.rowNumber} with ${this.cells.length} columns`;
  }

  debug (prefix='') {
    if (debug.flag && debug.rows) {
      debug.log(`${prefix}${this}`);
      for (let i = 0; i < this.cells.length; i += 1) {
        const cell = this.cells[i];
        if (cell) {
          cell.debug(prefix + '  ');
        }
        else {
          debug.log(`${prefix}[${this.rowNumber}][${i+1}]: undefined`);
        }
      }
    }
  }
}

/**
 * @class TableCell
 *
 * @desc Identifies a DOM element as a table or grid cell
 *
 * @param  {Object}  domElement    - Structural Information
 * @param  {Number}  row        - Starting row in table
 * @param  {Number}  column     - Starting column in table
 * @param  {Number}  rowSpan    - Number of rows the cell spans, default is 1
 * @param  {Number}  columnSpan - Number of columns the cell spans, default is 1
 */

class TableCell {
  constructor (domElement, rowNumber, columnNumber, rowSpan=1, columnSpan=1) {
    // Provide a reference for elementResult object to get information about table cells
    domElement.tableCell = this;

    this.domElement   = domElement;

    const node    = domElement.node;
    const tagName = domElement.tagName;
    const role    = domElement.role;
    const scope   = node.hasAttribute('scope') ?
                    node.getAttribute('scope').toLowerCase() :
                    '';

    this.isScopeRow    = (scope === 'row') || (role == 'rowheader');
    this.isScopeColumn = (scope === 'col') || (role == 'columnheader');
    this.hasScope = this.isScopeRow || this.isScopeColumn;
    this.isParentTHead = node.parentNode ?
                         node.parentNode.tagName.toLowerCase() === 'thead' :
                         false;

    this.isHeader = (tagName === 'th') ||
                    (role == 'columnheader') ||
                    (role == 'rowheader') ||
                    this.hasScope ||
                    this.isParentTHead;

    this.startRow    = rowNumber;
    this.startColumn = columnNumber;

    this.endRow    = rowNumber    + rowSpan;
    this.endColumn = columnNumber + columnSpan;

    this.headers = [];
    this.headersSource = HEADER_SOURCE.NONE;

    this.hasContent = (node.textContent.trim().length > 0) || (node.firstElementChild !== null);

  }

  get columnSpan () {
    let span = this.endColumn - this.startColumn;
    span = isNaN(span) ? 1 : span;
    return span;
  }

  get rowSpan () {
    let span = this.endRow - this.startRow;
    span = isNaN(span) ? 1 : span;
    return span;
  }

  toString () {
    const node = this.domElement.node;
    let str = `[TableCell][${this.startRow}][${this.startColumn}]`;
    str += ` ${node.textContent}`;
    str += ` ${this.isHeader ? '(Header)' : ''}`;
    const headerSource = getCommonMessage('headerSource', this.headerSource);
    const headerInfo = this.headers.length ? `${this.headers.join(' | ')} (${headerSource})` : 'none';
    str += !this.isHeader ? ` Headers: ${headerInfo}` : '';
    return str;
  }

  debug (prefix='') {
    if (debug.flag) {
      debug.log(`${prefix}${this}`);
    }
  }

}

/**
 * @class TableInfo
 *
 * @desc Collects information on table elements and their children
 */

export default class TableInfo {
  constructor () {
    this.allTableElements = [];
  }

  update (tableElement, rowGroup, domElement) {

    let te = tableElement;
    let rg = rowGroup;

    switch (domElement.tagName) {

      case 'table':
        te = new TableElement(te, domElement);
        this.allTableElements.push(te);
        rg = te;
        break;

      case 'caption':
        if (te) {
          te.addCaption(rg, domElement);
        }
        break;

      case 'thead':
        if (te) {
          rg = te.addRowGroup(rg, domElement);
        }
        break;

      case 'tbody':
        if (te) {
          rg= te.addRowGroup(rg, domElement);
        }
        break;

      case 'tr':
        if (te) {
          te.addRow(rg, domElement);
        }
        break;

      case 'th':
      case 'td':
        if (te) {
          te.updateColumnCount(te.addCell(domElement));
        }
        break;

      default:

        // Tables defined using ARIA markup

        switch (domElement.role) {

          case 'table':
            te = new TableElement(te, domElement);
            this.allTableElements.push(te);
            rg = te;
            break;

          case 'row':
            if (te) {
              te.addRow(rg, domElement);
            }
            break;

          case 'rowgroup':
            if (te) {
              rg = te.addRowGroup(rg, domElement);
            }
            break;

          case 'rowheader':
          case 'colheader':
          case 'cell':
          case 'gridcell':
            if (te) {
              te.addCell(domElement);
            }
            break;

          default:
            break;

        }
      break;
    }

    return [te, rg];
  }

  computeHeaders (domCache) {
    this.allTableElements.forEach( te => {
      te.computeHeaders(domCache);
    });
  }

  computeTableTypes () {
    this.allTableElements.forEach( te => {
      te.tableType = te.getTableType();
    });
  }


  /**
   * @method showTableInfo
   *
   * @desc showTableInfo is used for debugging the TableInfo objects
   */

  showTableInfo () {
    if (debug.flag) {
      debug.log('== All Tables ==', 1);
        this.allTableElements.forEach( te => {
          te.debug()
        });
    }
  }
}


