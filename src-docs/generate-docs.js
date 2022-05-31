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

import {allRules} from '../src/rules/allRules.js';

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
  transformElementMarkup
} from '../src/_locale/locale.js';

const outputDirectory = '../docs/';

// Helper functions

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}


const allRuleInfo = [];

// Create data for creating index and rule files

allRules.forEach( rule => {
  const ruleInfo = {};
  const id = rule.rule_id;

  ruleInfo.id         = getRuleId(id);
  ruleInfo.filename   = 'rule-' + rule.rule_id.toLowerCase().replace('_', '-') + '.html';
  ruleInfo.definition = getRuleDefinition(id);
  ruleInfo.summary    = getRuleSummary(id);
  ruleInfo.primary_id = rule.wcag_primary_id;
  ruleInfo.primary    = getSuccessCriterionInfo(rule.wcag_primary_id);

  allRuleInfo.push(ruleInfo);
});

// Create index file

const htmlIndex = nunjucks.render('./templates/index.njk', {title: 'Rules', allRuleInfo: allRuleInfo});
outputFile('index.html', htmlIndex);

// Create apis file
const htmlAPIs = nunjucks.render('./templates/apis.njk', {title: 'Using the Evaluation Library'});
outputFile('apis.html', htmlAPIs);

// Create about file
const htmlAbout = nunjucks.render('./templates/about.njk', {title: 'About'});
outputFile('about.html', htmlAbout);


// Create rule files

allRuleInfo.forEach( ruleInfo => {
  console.log(ruleInfo.summary);
  const htmlRule = nunjucks.render('./templates/rule.njk', {title: ruleInfo.summary, ruleInfo: ruleInfo});
  fs.writeFile(path.join(outputDirectory, ruleInfo.filename), htmlRule, err => {
      if (err) {
        console.error(err)
        return
      }
  });
});
