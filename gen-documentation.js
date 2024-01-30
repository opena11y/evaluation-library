/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');
const EvaluationLibrary  = require('./releases/opena11y-evaluation-library.cjs');

const el = new EvaluationLibrary(true);
const levelA   = el.constants.WCAG_LEVEL.A;
const levelAA  = el.constants.WCAG_LEVEL.AA;
const levelAAA = el.constants.WCAG_LEVEL.AAA;

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
const allRuleScopes = [];
const ruleSummary = {};

const allRuleLinksByGuidelines = [];
const allRuleLinksByRuleCategories = [];
let allRuleLinksByScope = [];
const allRuleLinksByFirstStepRules = [];

const wcag20 = {
  title: 'WCAG 2.0',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

const wcag21 = {
  title: 'WCAG 2.1',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

const wcag22 = {
  title: 'WCAG 2.2',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

const firstStep = {
  title: 'First Step Rules',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

// Create data for creating index and rule files

const allRules = [];

el.getAllRules.forEach( r => {
  allRules.push(el.getRuleInfo(r));
});

el.getRuleCategories.forEach( rc => {
  const rcInfo = Object.assign(rc);

  rcInfo.rules = [];
  rcInfo.aCount   = 0;
  rcInfo.aaCount  = 0;
  rcInfo.aaaCount = 0;

  el.getAllRules.forEach( r => {
    const ruleInfo = el.getRuleInfo(r);
    if (r.rule_category_id === rcInfo.id) {
      rcInfo.rules.push(ruleInfo);
      allRuleLinksByRuleCategories.push(ruleInfo.filename);
      if (ruleInfo.wcag_primary.level == levelA) {
        rcInfo.aCount += 1;
      }
      else {
        if (ruleInfo.wcag_primary.level == levelAA) {
          rcInfo.aaCount += 1;
        }
        else {
          rcInfo.aaaCount += 1;
        }
      }
    }
  });

  console.log(`[Rule Category]: ${rcInfo.title} (${rcInfo.rules.length})`);
  if (rcInfo.rules.length) {
    allRuleCategories.push(rcInfo);
  }
});

el.getRuleScopes.forEach( rs => {
  const rsInfo = Object.assign(rs);

  rsInfo.rules = [];
  rsInfo.allRuleLinks = [];
  rsInfo.aCount   = 0;
  rsInfo.aaCount  = 0;
  rsInfo.aaaCount = 0;



  el.getAllRules.forEach( r => {
    const ruleInfo = el.getRuleInfo(r);

    if (r.rule_scope_id === rsInfo.id) {
      rsInfo.rules.push(ruleInfo);
      rsInfo.allRuleLinks.push(ruleInfo.filename);
      if (ruleInfo.wcag_primary.level == levelA) {
        rsInfo.aCount += 1;
      }
      else {
        if (ruleInfo.wcag_primary.level == levelAA) {
          rsInfo.aaCount += 1;
        }
        else {
          rsInfo.aaaCount += 1;
        }
      }
    }
  });

  console.log(`[Rule Scope]: ${rsInfo.title} (${rsInfo.rules.length})`);
  if (rsInfo.rules.length) {
    allRuleScopes.push(rsInfo);
  }
});

allRuleScopes.reverse();
allRuleScopes.forEach( rs => {
  console.log(`[rs.allRuleLinks]: ${rs.allRuleLinks}`);
  allRuleLinksByScope = allRuleLinksByScope.concat(rs.allRuleLinks);
});

for(const p in el.getWCAG.principles) {
  console.log(`[Principle]: ${p})`);
  const guidelines = el.getWCAG.principles[p].guidelines;
  for (const g in guidelines) {
    console.log(`[Guideline]: ${g})`);

    const glInfo = Object.assign(guidelines[g]);
    glInfo.successCriteria = [];
    glInfo.aCount   = 0;
    glInfo.aaCount  = 0;
    glInfo.aaaCount = 0;
    glInfo.totalCount = 0;

    const success_criteria = guidelines[g].success_criteria;
    for(const sc in success_criteria) {

      scInfo = Object.assign(success_criteria[sc]);
      scInfo.id = sc;
      scInfo.wcagVersion = el.getWCAGVersion(sc);
      scInfo.rules =  [];

      console.log(`[Success Criteria]: ${scInfo.id} level=${scInfo.level} )`);

      el.getAllRules.forEach( r => {
        const ruleInfo = el.getRuleInfo(r);
        if (r.wcag_primary.id === scInfo.id) {
          scInfo.rules.push(ruleInfo);
          allRuleLinksByGuidelines.push(ruleInfo.filename);
          glInfo.totalCount += 1;
          if (ruleInfo.wcag_primary.level == levelA) {
            glInfo.aCount += 1;
            wcag22.aCount +=1;
            wcag22.totalCount +=1;
            if (ruleInfo.wcag_version !== 'WCAG22') {
              wcag21.aCount +=1;
              wcag21.totalCount +=1;
            }
            if (ruleInfo.wcag_version === 'WCAG20') {
              wcag20.aCount +=1;
              wcag20.totalCount +=1;
            }
          }
          else {
            if (ruleInfo.wcag_primary.level == levelAA) {
              glInfo.aaCount += 1;
              wcag22.aaCount +=1;
              wcag22.totalCount +=1;
              if (ruleInfo.wcag_version !== 'WCAG22') {
                wcag21.aaCount +=1;
                wcag21.totalCount +=1;
              }
              if (ruleInfo.wcag_version === 'WCAG20') {
                wcag20.aaCount +=1;
                wcag20.totalCount +=1;
              }
            }
            else {
              glInfo.aaaCount += 1;
              wcag22.aaaCount +=1;
              wcag22.totalCount +=1;
              if (ruleInfo.wcag_version !== 'WCAG22') {
                wcag21.aaaCount +=1;
                wcag21.totalCount +=1;
              }
              if (ruleInfo.wcag_version === 'WCAG20') {
                wcag20.aaaCount +=1;
                wcag20.totalCount +=1;
              }
            }
          }
        }
      });

      glInfo.successCriteria.push(scInfo);
    }
    allGuidelines.push(glInfo);
  }
};

firstStepRules = [];

el.getAllRules.forEach( r => {
  if (r.first_step) {
    const ruleInfo = el.getRuleInfo(r);
    firstStepRules.push(ruleInfo);
    allRuleLinksByFirstStepRules.push(ruleInfo.filename);

    if (ruleInfo.wcag_primary.level == levelA) {
      firstStep.aCount += 1;
      firstStep.totalCount += 1;
    }
    else {
      if (ruleInfo.wcag_primary.level == levelAA) {
        firstStep.aaCount += 1;
        firstStep.totalCount += 1;
      }
      else {
        firstStep.aaaCount += 1;
        firstStep.totalCount += 1;
      }
    }
  }
});

// Create index file

const htmlIndex = nunjucks.render('./src-docs/templates/content-index.njk', {title: 'Welcome to the OpenA11y Evaluation Library'});
outputFile('index.html', htmlIndex);

// Create rule indexes
// Rules by rule category

const htmlRuleRC = nunjucks.render('./src-docs/templates/content-rules-rc.njk',
  {title: 'Rules by Rule Categories',
  allRuleCategories: allRuleCategories
});
outputFile('rules-rc.html', htmlRuleRC);

// Rules by WCAG guidelines
const htmlRuleGL = nunjucks.render('./src-docs/templates/content-rules-gl.njk',
  {title: 'Rules by WCAG Guidelines',
  allGuidelines: allGuidelines
});
outputFile('rules-gl.html', htmlRuleGL);

// Rules by scope
const htmlRuleRS = nunjucks.render('./src-docs/templates/content-rules-rs.njk',
  {title: 'Rules by Rule Scope',
  allRuleScopes: allRuleScopes
});
outputFile('rules-rs.html', htmlRuleRS);

// First Step Rules
const htmlRuleFS = nunjucks.render('./src-docs/templates/content-rules-fs.njk',
  {title: 'First Step Ruleset',
  firstStepRules: firstStepRules
});
outputFile('rules-fs.html', htmlRuleFS);

// Rule summary
const htmlRuleSum = nunjucks.render('./src-docs/templates/content-rulesets.njk',
  {title: 'Rulesets',
  wcag20: wcag20,
  wcag21: wcag21,
  wcag22: wcag22,
  firstStep: firstStep,
  allRuleCategories: allRuleCategories,
  allGuidelines: allGuidelines,
  allRuleScopes: allRuleScopes
});
outputFile('rulesets.html', htmlRuleSum);

// Create concepts and terms file
const htmlConcepts = nunjucks.render('./src-docs/templates/content-concepts.njk', {title: 'Concepts and Terms'});
outputFile('concepts.html', htmlConcepts);

// Create apis file
const htmlAPIs = nunjucks.render('./src-docs/templates/content-apis.njk', {title: 'Using the Evaluation Library'});
outputFile('apis.html', htmlAPIs);

// Create about file
const htmlAbout = nunjucks.render('./src-docs/templates/content-about.njk', {title: 'About'});
outputFile('about.html', htmlAbout);

// Quality assurance page
const htmlQA = nunjucks.render('./src-docs/templates/content-rules-qa.njk',
  {title: 'Quality Assurance',
   allRules: allRules
 });
outputFile('rules-qa.html', htmlQA);

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

const jsRuleLinks = nunjucks.render('./src-docs/templates/js-rulelinks.njk',
  { allRuleLinksByGuidelines: allRuleLinksByGuidelines,
    allRuleLinksByRuleCategories: allRuleLinksByRuleCategories,
    allRuleLinksByScope: allRuleLinksByScope,
    allRuleLinksByFirstStepRules: allRuleLinksByFirstStepRules
});
outputFile('rulelinks.js', jsRuleLinks);


console.log(`Total Rules: ${count}`);

console.log(`wcag: ${el.getWCAG.abbreviation}`);
