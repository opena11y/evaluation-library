/* aiRuleResult.js */

/* Imports */
import DebugLogging from '../debug.js';

import {
  getRuleDefinition
} from '../locale/locale.js';


/* constants */
const debug = new DebugLogging('aiRuleResult', false);
debug.flag = false;

export default function aiRuleResult (all_rule_results, rule_id) {
  debug.log(`[aiRuleResult][rule_id]: ${rule_id}`);

  const rule_result = all_rule_results.find( (rr) => {
    return rr.rule.getId() === rule_id;
  });

  debug.log(`[aiRuleResult][rule_result]: ${rule_result}`);

  const ruleTitle       = rule_result.rule.getSummary();

  const s = rule_result.getResultsSummary()
  const element_summary = {
          violations:    s.violations,
          warnings:      s.warnings,
          manual_checks: s.manual_checks,
          passed:        s.passed,
          hidden:        s.hidden
        };

  let page_result    = false;
  let website_result = false;

  const element_results = [];

  rule_result.getAllResultsArray().forEach( (er) => {
    if (er.isElementResult) {
      const de = er.domElement;
      const element_result = {
        id:               er.getResultId(),
        element:          er.getResultIdentifier(),
        scope:            er.getResultType(),
        result_value:     er.getResultValue(),
        result_abbrev:    er.getResultValueNLS(),
        result_long:      er.getResultValueLongNLS(),
        position:         er.getOrdinalPosition(),
        action:           er.getResultMessage(),
        definition:       getRuleDefinition(rule_id),
        implied_role:     !de.hasRole,
        role:             de.role,
        role_description: de.roleDescription,
        tag_name:         de.elemName.includes('#') ?
                          de.elemName.split('#')[0] :
                          de.elemName,

        accessible_name_required:   de.ariaInfo.isNameRequired,
        accessible_name_prohibited: de.ariaInfo.isNameProhibited,

        accessible_name:            de.accName,
        accessible_description:     de.accDescription,
        error_message:              de.errMessage,

        html_attributes:            de.html_attrs,
        aria_attributes:            de.aria_attrs,

        is_element: true,
        is_page: false,
        is_website: false
      }

      // For color contrast rules add color contrast information
      if ((rule_id === 'COLOR_1') || (rule_id === 'COLOR_3')) {
        const cc = de.colorContrast;
        const cc_result = element_result.color_contrast = {};

        cc_result.has_text_nodes         = cc.hasTextNodes;
        cc_result.opacity                = cc.opacity;
        cc_result.background_color_elem  = cc.backgroundColorElem;
        cc_result.background_color       = cc.backgroundColorHex;
        cc_result.color                  = cc.color;
        cc_result.colorHex               = cc.colorHex;

        cc_result.has_background_image   = cc.hasBackgroundImage;
        cc_result.background_image       = cc.backgroundImage;
        cc_result.background_repeat      = cc.backgroundRepeat;
        cc_result.background_position    = cc.backgroundPosition;

        cc_result.font_family            = cc.fontFamily;
        cc_result.font_size              = cc.fontSize;
        cc_result.font_weight            = cc.fontWeight;
        cc_result.is_large_font          = cc.is_large_font;

        cc_result.ccr                    = cc.colorContrastRatio;

        cc_result.is_positioned          = cc.isPositioned;
        cc_result.is_transparent         = cc.isTransparent;
      }

      // For table cell header rule add table cell information
      if (rule_id === 'TABLE_1') {
        const tc = de.tableCell;
        const tc_result = element_result.table_cell = {};

        tc_result.is_header       = tc.isHeader;

        tc_result.start_row       = tc.startRow;
        tc_result.start_column    = tc.startColumn;
        tc_result.end_row         = tc.endRow;
        tc_result.end_column      = tc.endColumn;

        tc_result.headers         = tc.headers;
        tc_result.headers_source  = tc.headersSource;

        tc_result.has_content     = tc.hasContent;
      }

      // For table rules related to purpose, naming and size information
      if ((rule_id.indexOf('TABLE') === 0) && (rule_id !== 'TABLE_1')){
        const te = de.tableElement;
        const te_result = element_result.table = {};
        te_result.table_type         = te.tableType;

        te_result.rows               = te.rowCount;
        te_result.columns            = te.colCount;
        te_result.spanned_data_cells = te.spannedDataCells;

        te_result.cell_count         = te.cellCoount;
        te_result.header_cell_count  = te.headerCellCoount;
      }

      element_results.push(element_result);
    }

    if (er.isPageResult) {
      page_result = {
        id:            er.getResultId(),
        element:       er.getResultIdentifier(),
        scope:         er.getResultType(),
        result_value:  er.getResultValue(),
        result_abbrev: er.getResultValueNLS(),
        result_long:   er.getResultValueLongNLS(),
        action:        er.getResultMessage(),
        definition:    getRuleDefinition(rule_id),
        position:      '',
        is_element: false,
        is_page: true,
        is_website: false
      }
    }

    if (er.isWebsiteResult) {
      website_result = {
        id:            er.getResultId(),
        element:       er.getResultIdentifier(),
        scope:         er.getResultType(),
        result_value:  er.getResultValue(),
        result_abbrev: er.getResultValueNLS(),
        result_long:   er.getResultValueLongNLS(),
        action:        er.getResultMessage(),
        definition:    getRuleDefinition(rule_id),
        position:      '',
        is_element: false,
        is_page: false,
        is_website: true
      }
    }

  });

  return [ruleTitle, element_summary, website_result, page_result, element_results];
}
