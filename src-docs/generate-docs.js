#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

import fs    from 'fs';
import os    from 'os';
import path  from 'path';
import util  from 'util';
import url   from 'url';

import  nunjucks from 'nunjucks';

import {
  RULE_CATEGORIES,
  WCAG_GUIDELINE
}
from '../src/constants.js'

import {
  getBaseResultMessages,
  getBaseResultMessage,
  getCommonMessage,
  getGuidelineInfo,
  getInformationLinks,
  getImplementationValue,
  getManualChecks,
  getPurposes,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleResultMessages,
  getRuleSummary,
  getRulesetInfo,
  getScope,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTargetResourcesDesc,
  getTechniques,
  setLocale,
  transformElementMarkup,
  setUseCodeTags
} from '../src/_locale/locale.js';

import {allRules} from '../src/rules/allRules.js';

/* Constants */

const outputDirectory = '../docs/';

const ruleCategories = [
  RULE_CATEGORIES.LANDMARKS,
  RULE_CATEGORIES.HEADINGS,
  RULE_CATEGORIES.STYLES_READABILITY,
  RULE_CATEGORIES.IMAGES,
  RULE_CATEGORIES.LINKS,
  RULE_CATEGORIES.TABLES,
  RULE_CATEGORIES.FORMS,
  RULE_CATEGORIES.WIDGETS_SCRIPTS,
  RULE_CATEGORIES.AUDIO_VIDEO,
  RULE_CATEGORIES.KEYBOARD_SUPPORT,
  RULE_CATEGORIES.TIMING,
  RULE_CATEGORIES.SITE_NAVIGATION
];

const wcagGuidelines = [
  WCAG_GUIDELINE.G_1_1,
  WCAG_GUIDELINE.G_1_2,
  WCAG_GUIDELINE.G_1_3,
  WCAG_GUIDELINE.G_1_4,
  WCAG_GUIDELINE.G_2_1,
  WCAG_GUIDELINE.G_2_2,
  WCAG_GUIDELINE.G_2_3,
  WCAG_GUIDELINE.G_2_4,
  WCAG_GUIDELINE.G_2_5,
  WCAG_GUIDELINE.G_3_1,
  WCAG_GUIDELINE.G_3_2,
  WCAG_GUIDELINE.G_3_3,
  WCAG_GUIDELINE.G_4_1
]

setUseCodeTags(true);

/* Helper functions */

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}

function getRuleInfo(rule) {
  const ruleInfo = {};
  const id = rule.rule_id;

  ruleInfo.id            = getRuleId(id);
  ruleInfo.filename      = 'rule-' + rule.rule_id.toLowerCase().replace('_', '-') + '.html';
  ruleInfo.last_updated  = rule.last_updated;

  ruleInfo.ruleset          = getRulesetInfo(rule.ruleset);
  ruleInfo.rule_scope       = rule.rule_scope;
  ruleInfo.rule_category    = getRuleCategoryInfo(rule.rule_category_id);
  ruleInfo.rule_category_id = rule.rule_category_id;
  ruleInfo.conformance      = rule.rule_required ? getCommonMessage('required') : getCommonMessage('recommended');

  ruleInfo.primary_id = rule.wcag_primary_id;
  ruleInfo.primary    = getSuccessCriterionInfo(rule.wcag_primary_id);
  ruleInfo.related    = getSuccessCriteriaInfo(rule.wcag_related_ids);

  ruleInfo.target_resources = rule.target_resources;

  ruleInfo.definition = getRuleDefinition(id);
  ruleInfo.summary    = getRuleSummary(id);
  ruleInfo.purposes   = getPurposes(id);

  ruleInfo.techniques = getTechniques(id);
  ruleInfo.information_links = getInformationLinks(id);

  return ruleInfo;
}

function getRulesByCategory(rc) {
  const rules = [];
  allRules.forEach( rule => {
    if (rule.rule_category_id & rc) {
      rules.push(getRuleInfo(rule));
    }
  });
  return rules;
}

function getRulesByGuideline(gl) {
  const rules = [];
  allRules.forEach( rule => {
    if (rule.wcag_primary_id.indexOf(gl) === 0) {
      rules.push(getRuleInfo(rule));
    }
  });

  rules.sort( (a, b) => {
    const aParts = a.primary_id.split('.');
    const bParts = b.primary_id.split('.');

    const p  = parseInt(aParts[0]) - parseInt(bParts[0]);
    const g  = parseInt(aParts[1]) - parseInt(bParts[1]);
    const sc = parseInt(aParts[2]) - parseInt(bParts[2]);

    if (p === 0) {
      if (g === 0) {
        return sc;
      }
      else {
        return g;
      }
    }
    return p;
  });

  return rules;
}

const allRulesInfo = getRulesByCategory(RULE_CATEGORIES.ALL);

const allRuleCategories = [];
const allGuidelines = [];

// Create data for creating index and rule files


ruleCategories.forEach( rc => {
  const rcInfo = getRuleCategoryInfo(rc);
  rcInfo.rules = getRulesByCategory(rc);

  console.log(`[RC]: ${rcInfo.title} (${rcInfo.rules.length})`);

  allRuleCategories.push(rcInfo);
});

wcagGuidelines.forEach( gl => {
  const glInfo = getGuidelineInfo(gl);
  glInfo.rules = getRulesByGuideline(glInfo.num);

  console.log(`[GL]: ${glInfo.title} (${glInfo.rules.length})`);

  allGuidelines.push(glInfo);
});


// Create index file

const htmlIndex = nunjucks.render('./templates/content-index.njk', {title: 'OpenA11y Evaluation Library'});
outputFile('index.html', htmlIndex);

// Create rule index
const htmlRuleIndex = nunjucks.render('./templates/content-rules.njk',
  {title: 'Rules',
  allRuleCategories: allRuleCategories,
  allGuidelines: allGuidelines
});
outputFile('rules.html', htmlRuleIndex);

// Create concepts and terms file
const htmlConcepts = nunjucks.render('./templates/content-concepts.njk', {title: 'Concepts and Terms'});
outputFile('concepts.html', htmlConcepts);

// Create apis file
const htmlAPIs = nunjucks.render('./templates/content-apis.njk', {title: 'Using the Evaluation Library'});
outputFile('apis.html', htmlAPIs);

// Create about file
const htmlAbout = nunjucks.render('./templates/content-about.njk', {title: 'About'});
outputFile('about.html', htmlAbout);


// Create rule files
console.log(`\n === Rule Files ===`)
allRulesInfo.forEach( ruleInfo => {
  console.log(`${ruleInfo.summary} => ${ruleInfo.filename}`);
  const htmlRule = nunjucks.render('./templates/content-rule.njk', {title: ruleInfo.summary, ruleInfo: ruleInfo});
  outputFile(ruleInfo.filename, htmlRule);
});
