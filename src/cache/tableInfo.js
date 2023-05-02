/* tableInfo.js */

/* Imports */
import {
  TABLE_TYPE,
  HEADER_SOURCE
} from '../constants.js';

import {
  getCommonMessage
} from '../_locale/locale.js';

import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('tableInfo', false);
debug.flag = true;
debug.rows = true;
debug.cells = true;
debug.tableTree = true;
debug.headerCalc = true;

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
    this.domElement = domElement;
    this.parentTableElement = parentTableElement;

    this.tableType = TABLE_TYPE.UNKNOWN;

    this.children = [];

    this.rows = [];
    this.row = null;
    this.rowCount = 0;

    this.theadCount = 0;
    this.tbodyCount = 0;

    this.cellCount = 0;
    this.cellHeaderCount = 0;

    this.spannedCells = 0;

    this.currentParent = this;
  }

  addCaption (domElement) {
    this.captionDomElement = domElement;
  }

  addTHead (rowGroup, domElement) {
    this.theadCount += 1;
    const newRowGroup = new TableRowGroup(domElement);
    rowGroup.children.push(newRowGroup);
    return newRowGroup;
  }

  addTBody (rowGroup, domElement) {
    this.tbodyCount += 1;
    const newRowGroup = new TableRowGroup(domElement);
    rowGroup.children.push(newRowGroup);
    return newRowGroup;
  }

  addRow (rowGroup, domElement) {
    debug.log(`[addRow][rowGroup]: ${rowGroup}`);
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
    row.setCell(column, cell);

    this.cellCount += 1;
    if (cell.isHeader) {
      this.cellHeaderCount += 1;
    }

    if (colSpan > 1) {
      for (let i = 1; i < colSpan; i += 1) {
        row.setCell((column+i), cell);
      }
    }

    if (rowSpan > 1) {
      for (let i = 1; i < rowSpan; i += 1) {
        row = this.getRow(this.rowCount + i);
        row.setCell(column, cell);
      }
    }

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
    const row = this.getRow(rowNumber);
    for (let i = 0; i < row.cells.length; i += 1) {
      const cell = row.cells[i];
      if ((columnNumber >= cell.startColumn ) &&
          (columnNumber <= cell.endColumn )) {
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
                if (hc && hc.isHeader && (!hc.hasScope || hc.isScopeColumn)) {
                  cell.headers.push(hc.domElement.accName.name);
                }
              }

              // get Row Headers
              for (let i = 1; i < cell.startColumn; i += 1) {
                const hc = tableElement.getCell(row.rowNumber, i);
                debug.headerCalc && debug.log(`[rowHeaders][${row.rowNumber}][${i}]: ${hc}`)
                if (hc && hc.isHeader && (!hc.hasScope || hc.isScopeRow)) {
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
    const role = this.domElement.role;

    if ((role === 'none') ||
        (this.rows.length === 1)) {
      return TABLE_TYPE.LAYOUT;
    }

    if (this.headerCellCount) {
      if (this.spannedDataCells) {
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

  debugRowGroup (prefix, rowGroup) {
    debug.log(`${prefix}${rowGroup}`);
    rowGroup.children.forEach( child => {
      if (child.isGroup) {
        this.debugRowGroup(prefix + '  ', child);
      }
    });
  }

  debug () {
    if (debug.flag) {
      debug.log(`${this}`);
      if (debug.tableTree) {
        this.children.forEach( child => {
          if (child.isGroup) {
            this.debugRowGroup('  ', child);
          }
        });
      }
      for (let i = 0; i < this.rows.length; i += 1) {
        this.rows[i].debug('  ');
      }
    }
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

    this.isHeader = (tagName === 'th') ||
                    (role == 'columnheader') ||
                    (role == 'rowheader') ||
                    this.hasScope;


    this.startRow    = rowNumber;
    this.startColumn = columnNumber;

    this.endRow    = rowNumber    + rowSpan    - 1;
    this.endColumn = columnNumber + columnSpan - 1;

    this.headers = [];
    this.headersSource = HEADER_SOURCE.NONE;

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

    switch (domElement.role) {

      case 'table':
        te = new TableElement(te, domElement);
        rg = te;
        this.allTableElements.push(te);
        break;

      case 'caption':
        te.addCaption(domElement);
        break;

      case 'thead':
        rg = te.addTHead(rg, domElement);
        break;

      case 'tbody':
        rg= te.addTBody(rg, domElement);
        break;

      case 'tr':
        te.addRow(rowGroup, domElement);
        break;

      case 'th':
      case 'td':
        te.addCell(domElement);
        break;

      default:

        // Tables defined using ARIA markup

        switch (domElement.role) {

          case 'table':
            te = new TableElement(te, domElement);
            rowGroup = te;
            this.allTableElements.push(te);
            break;

          case 'row':
            te.addRow(rowGroup, domElement);
            break;

          case 'rowgroup':
            rg = te.addTHead(rg, domElement);
            break;

          case 'rowheader':
          case 'colheader':
          case 'cell':
          case 'gridcell':
            te.addCell(domElement);
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


