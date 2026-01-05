/*  gen-documentation.js */

/* Requirements */

const fs = require('fs');
const path = require('path');
const nunjucks  = require('nunjucks');
const EvaluationLibrary  = require('./releases/opena11y-evaluation-library.cjs');

/* Constants */

const el = new EvaluationLibrary(true);
const levelA   = el.constants.WCAG_LEVEL.A;
const levelAA  = el.constants.WCAG_LEVEL.AA;
const levelAAA = el.constants.WCAG_LEVEL.AAA;
const version  = el.constants.VERSION;

const projectName = "Evaluation Library";
const issuesURL   = "https://github.com/opena11y/evaluation-library/issues";
const issuesEmail = "jongund@illinois.edu";
const tagLineName = "OpenA11y Evaluation Library";

const axeVersion = '4.1.1';

const outputDirectory   = './docs/';
const websiteURL        = 'https://opena11y.github.io/evaluation-library/';
const repositoryURL     = 'https://github.com/opena11y/evaluation-library/';

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
const allRuleLinksByFirstStepRules =[];
const allRuleLinksByWaveRules = [];
const allRuleLinksByAxeRules = [];

const firstStepRules = [];
const axeRules = [];
const waveRules = [];

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

const axe = {
  title: 'Related aXe Rules',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

const wave = {
  title: 'Related WAVE/popetech Rules',
  aCount: 0,
  aaCount: 0,
  aaaCount: 0,
  totalCount: 0
}

// Create data for creating index and rule files

const allRules = [];
const allAxeRules = el.getAllAxeRules();
const unmappedAxeRules = el.getUnmappedAxeRules();
const allWaveRules = el.getAllWaveRules();
const unmappedWaveRules = el.getUnmappedWaveRules();

el.getAllRules.forEach( r => {
  allRules.push(el.getRuleInfo(r));
});

el.getRuleCategories.forEach( rc => {
  const rcInfo = Object.assign(rc);

  rcInfo.rules = [];
  rcInfo.aCount   = 0;
  rcInfo.aaCount  = 0;
  rcInfo.aaaCount = 0;
  rcInfo.hasAxeRules = false;
  rcInfo.hasWaveRules = false;

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
      if (ruleInfo.has_axe) {
        console.log(`[${ruleInfo.id}][has_axe]`)
        rcInfo.hasAxeRules = true;
      }
      if (ruleInfo.has_wave) {
        console.log(`[${ruleInfo.id}][has_wave]`)
        rcInfo.hasWaveRules = true;
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

el.getAllRules.forEach( r => {
  const ruleInfo = el.getRuleInfo(r);
  if (r.first_step) {
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

  if (r.axe_refs.length) {
    axeRules.push(ruleInfo);
    allRuleLinksByAxeRules.push(ruleInfo.filename);

    if (ruleInfo.wcag_primary.level == levelA) {
      axe.aCount += 1;
      axe.totalCount += 1;
    }
    else {
      if (ruleInfo.wcag_primary.level == levelAA) {
        axe.aaCount += 1;
        axe.totalCount += 1;
      }
      else {
        axe.aaaCount += 1;
        axe.totalCount += 1;
      }
    }
  }

  if (r.wave_refs.length) {
    waveRules.push(ruleInfo);
    allRuleLinksByWaveRules.push(ruleInfo.filename);

    if (ruleInfo.wcag_primary.level == levelA) {
      wave.aCount += 1;
      wave.totalCount += 1;
    }
    else {
      if (ruleInfo.wcag_primary.level == levelAA) {
        wave.aaCount += 1;
        wave.totalCount += 1;
      }
      else {
        wave.aaaCount += 1;
        wave.totalCount += 1;
      }
    }
  }

});


// Create main navigation pages

const mainPages = [
  { content: 'content-home.njk',
    title: 'Welcome to the OpenA11y Evaluation Library',
    link: 'Home',
    filename: 'index.html'
  },
  { content: 'content-concepts.njk',
    title: 'Concepts and Terms',
    link: 'Concepts',
    filename: 'concepts.html'
  },
  {
    dropdown: 'Rules',
    pages: [
      { content: 'content-rulesets.njk',
        title: 'Rulesets',
        link: 'Rulesets',
        filename: 'rulesets.html'
      },
      { content: 'content-rules-rc.njk',
        title: 'Rules by Rule Categories',
        link: 'Rule Categories',
        filename: 'rules-rc.html'
      },
      { content: 'content-rules-gl.njk',
        title: 'Rules by WCAG Guidelines',
        link: 'WCAG Guidelines',
        filename: 'rules-gl.html'
      },
      { content: 'content-rules-rs.njk',
        title: 'Rules by Rule Scopes',
        link: 'Rule Scopes',
        filename: 'rules-rs.html'
      },
      { content: 'content-rules-fs.njk',
        title: 'First Step Rules',
        link: 'First Step',
        filename: 'rules-fs.html'
      },
      /*
      { content: 'content-rules-wave.njk',
        title: 'WAVE Rules',
        link: 'WAVE Rules',
        filename: 'rules-wave.html'
      },
      { content: 'content-rules-axe.njk',
        title: 'aXe Rules',
        link: 'aXe Rules',
        filename: 'rules-axe.html'
      }
      */
    ]
  },
  { content: 'content-apis.njk',
    title: 'Using Evaluation Library',
    link: 'APIs',
    filename: 'apis.html'
  },
  {
    dropdown: 'About',
    pages: [
      { content: 'content-about-history.njk',
        title: 'History',
        link: 'History',
        filename: 'about-history.html'
      },
      { content: 'content-about-privacy.njk',
        title: 'Privacy',
        link: 'Privacy',
        filename: 'about-privacy.html'
      },
      { content: 'content-about-feedback.njk',
        title: 'Feedback',
        link: 'Feedback',
        filename: 'about-feedback.html'
      }
    ]
  }
];

function createNavigation(pages) {
  console.log(`[create Navigation]`);
  let html = '\n';
  pages.forEach( item => {
    console.log(`[create Navigation]: ${item.dropdown} ${item.filename}`);
    if (item.dropdown) {
      html += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"
             data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-expanded="false">${item.dropdown}</a>
          <ul class="dropdown-menu">`;

      item.pages.forEach( p => {
        console.log(`[dropdown][page]: ${p.filename}`);
        if (p.filename) {
          html += `<li><a class="dropdown-item" href="${p.filename}">${p.link}</a></li>`;
        }
        else {
          html += `<li><hr class="dropdown-divider"></li>`;
        }
      });

      html += `
          </ul>
        </li>
      `;
    }
    else {
      html += `
        <li class="nav-item">
          <a class="nav-link" href="${item.filename}">${item.link}</a>
        </li>
      `;
    }
  });
  html += '\n';

  return html;
}

const mainNav = createNavigation(mainPages);

function createPage(page, mainNav, dropdownName='', dropdownPages=false) {
  if (page.filename) {
    console.log(`  ${page.title} => ${page.filename}`);

    const content = nunjucks.render('./src-docs/templates/page.njk', {
        content: page.content,
        navigation: mainNav,
        dropdownName: 'dropdownName',
        dropdownPages: dropdownPages,
        websiteURL: websiteURL,
        repositoryURL: repositoryURL,
        tagLineName: tagLineName,
        projectName: projectName,
        issuesURL: issuesURL,
        issuesEmail: issuesEmail,

        title: page.title,
        version: version,
        wcag20: wcag20,
        wcag21: wcag21,
        wcag22: wcag22,
        firstStepRules: firstStepRules,
        axeRules: axeRules,
        waveRules: waveRules,
        allRuleCategories: allRuleCategories,
        allGuidelines: allGuidelines,
        allRuleScopes: allRuleScopes,
        allWaveRules: allWaveRules,
        unmappedWaveRules: unmappedWaveRules,
        allAxeRules: allAxeRules,
        unmappedAxeRules: unmappedAxeRules
      });

    outputFile(page.filename, content);
  }
}

function createPages(pages) {
  console.log(`[create pages]`);
  pages.forEach( item => {
    if (item.dropdown) {
      item.pages.forEach( p => {
        createPage(p, mainNav, item.dropdown, item.pages);
      });
    }
    else {
      createPage(item, mainNav);
    }
  });
}

createPages(mainPages);

// Create rule files
console.log(`\n === Rule Files ===`)
let count = 0;
el.getAllRules.forEach( rule => {
  const ruleInfo = el.getRuleInfo(rule);
  console.log(`[${ruleInfo.id}] ${ruleInfo.summary} => ${ruleInfo.filename}`);

    const content = nunjucks.render('./src-docs/templates/page.njk', {
        content: 'content-rule.njk',
        navigation: mainNav,
        dropdownName: '',
        dropdownPages: false,
        websiteURL: websiteURL,
        repositoryURL: repositoryURL,
        tagLineName: tagLineName,
        projectName: projectName,
        issuesURL: issuesURL,
        issuesEmail: issuesEmail,
        version: version,
        linkId: ruleInfo.htmlId,

        title: ruleInfo.summary,
        ruleInfo: ruleInfo
      });

  outputFile(ruleInfo.filename, content);
  count += 1;
});

const jsRuleLinks = nunjucks.render('./src-docs/templates/js-rulelinks.njk',
  { allRuleLinksByGuidelines: allRuleLinksByGuidelines,
    allRuleLinksByRuleCategories: allRuleLinksByRuleCategories,
    allRuleLinksByScope: allRuleLinksByScope,
    allRuleLinksByFirstStepRules: allRuleLinksByFirstStepRules,
    allRuleLinksByWaveRules: allRuleLinksByWaveRules,
    allRuleLinksByAxeRules: allRuleLinksByAxeRules
});
outputFile('js/rulelinks.js', jsRuleLinks);


console.log(`Total Rules: ${count}`);

console.log(`wcag: ${el.getWCAG.abbreviation}`);
