/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');
const EvaluationLibrary  = require('./releases/opena11y-evaluation-library.cjs');

const el = new EvaluationLibrary(true);

/* Constants */


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

const allRuleCategories = [];
const allGuidelines = [];

// Create data for creating index and rule files

el.getRuleCategories.forEach( rc => {
  const rcInfo = Object.assign(rc);

  rcInfo.rules = [];

  el.getAllRules.forEach( r => {
    const ruleInfo = el.getRuleInfo(r);
    if (r.rule_category_id === rcInfo.id) {
      rcInfo.rules.push(ruleInfo);
    }
  });

  console.log(`[RC]: ${rcInfo.title} (${rcInfo.rules.length})`);

  allRuleCategories.push(rcInfo);
});

for(const p in el.getWCAG.principles) {
  console.log(`[Principle]: ${p})`);
  const guidelines = el.getWCAG.principles[p].guidelines;
  for (const g in guidelines) {
    console.log(`[Guideline]: ${g})`);

    const glInfo = Object.assign(guidelines[g]);
    glInfo.successCriteria = [];

    const success_criteria = guidelines[g].success_criteria;
    for(const sc in success_criteria) {

      scInfo = Object.assign(success_criteria[sc]);
      scInfo.id = sc;
      scInfo.rules =  [];

      console.log(`[Success Criteria]: ${scInfo.id} level=${scInfo.level} )`);

      if (scInfo.level > 1) {

        el.getAllRules.forEach( r => {
          const ruleInfo = el.getRuleInfo(r);
          if (r.wcag_primary.id === scInfo.id) {
            scInfo.rules.push(ruleInfo);
          }
        });

        glInfo.successCriteria.push(scInfo);
      }
    }
    allGuidelines.push(glInfo);
  }
};


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
let count = 0;
el.getAllRules.forEach( rule => {
  const ruleInfo = el.getRuleInfo(rule);
  console.log(`[${ruleInfo.id}] ${ruleInfo.summary} => ${ruleInfo.filename}`);
  const htmlRule = nunjucks.render('./src-docs/templates/content-rule.njk', {title: ruleInfo.summary, ruleInfo: ruleInfo});
  outputFile(ruleInfo.filename, htmlRule);
  count += 1;
});


console.log(`Total Rules: ${count}`);

console.log(`wcag: ${el.getWCAG.abbreviation}`);
