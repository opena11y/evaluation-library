/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');
const EvaluationLibrary  = require('./releases/opena11y-evaluation-library.cjs');

const el = new EvaluationLibrary(true);

/* Constants */

const RULE_CATEGORIES = el.CONSTANTS.RULE_CATEGORIES;
const WCAG_GUIDELINE  = el.CONSTANTS.WCAG_GUIDELINE;

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

const outputDirectory = './docs/';

// setUseCodeTags(true);

/* Helper functions */

function outputFile(fname, data) {
  fs.writeFile(path.join(outputDirectory, fname), data, err => {
      if (err) {
        console.error(err)
        return
      }
  })
}


const allRulesInfo = el.getRuleInfo.getRulesByCategory(RULE_CATEGORIES.ALL);

const allRuleCategories = [];
const allGuidelines = [];

// Create data for creating index and rule files

ruleCategories.forEach( rc => {
  const rcInfo = el.getRuleInfo.getRuleCategoryInfo(rc);
  rcInfo.rules = el.getRuleInfo.getRulesByCategory(rc);

  console.log(`[RC]: ${rcInfo.title} (${rcInfo.rules.length})`);

  allRuleCategories.push(rcInfo);
});

wcagGuidelines.forEach( gl => {
  const glInfo =  el.getRuleInfo.getGuidelineInfo(gl);
  glInfo.rules =  el.getRuleInfo.getRulesByGuideline(glInfo.num);

  console.log(`[GL]: ${glInfo.title} (${glInfo.rules.length})`);

  allGuidelines.push(glInfo);
});

// Create index file

const htmlIndex = nunjucks.render('./src-docs/templates/content-index.njk', {title: 'OpenA11y Evaluation Library'});
outputFile('index.html', htmlIndex);

// Create rule index
const htmlRuleIndex = nunjucks.render('./src-docs/templates/content-rules.njk',
  {title: 'Rules',
  allRuleCategories: allRuleCategories,
  allGuidelines: allGuidelines
});
outputFile('rules.html', htmlRuleIndex);

// Create concepts and terms file
const htmlConcepts = nunjucks.render('./src-docs/templates/content-concepts.njk', {title: 'Concepts and Terms'});
outputFile('concepts.html', htmlConcepts);

// Create apis file
const htmlAPIs = nunjucks.render('./src-docs/templates/content-apis.njk', {title: 'Using the Evaluation Library'});
outputFile('apis.html', htmlAPIs);

// Create about file
const htmlAbout = nunjucks.render('./src-docs/templates/content-about.njk', {title: 'About'});
outputFile('about.html', htmlAbout);


// Create rule files
console.log(`\n === Rule Files ===`)
allRulesInfo.forEach( ruleInfo => {
  console.log(`[${ruleInfo.id}] ${ruleInfo.summary} => ${ruleInfo.filename}`);
  const htmlRule = nunjucks.render('./src-docs/templates/content-rule.njk', {title: ruleInfo.summary, ruleInfo: ruleInfo});
  outputFile(ruleInfo.filename, htmlRule);
});
