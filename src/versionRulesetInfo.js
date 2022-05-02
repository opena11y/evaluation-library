/* versionRulesetInfo.js */

export {
  version,
  getRulesetInfo
}

const version = '2.0.beta';

function getRulesetInfo () {
  return {
    id: 'ARIA_STRICT',
    date: '2022-04-30',
    title: "HTML and ARIA Techniques",
    abbrev: "HTML+ARIA",
    version: version
  }
}
