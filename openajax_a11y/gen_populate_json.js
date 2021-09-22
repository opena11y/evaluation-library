var asRuleset = OpenAjax.a11y.RulesetManager.getRuleset('TEST');

// then needs to get an evaluatorFactory
var evaluatorFactory = OpenAjax.a11y.EvaluatorFactory.newInstance();

// and configure it...
evaluatorFactory.setParameter('ruleset', asRuleset);

evaluatorFactory.setFeature('eventProcessing',   'none');
evaluatorFactory.setFeature('brokenLinkTesting', false);

// before getting the actual evaluator
var evaluator = evaluatorFactory.newEvaluator();

var wcag20   = '\n"wcag20" : ' + OpenAjax.a11y.nls.WCAG20.getNLS('en-us').toJSON("\n      ") + ',\n';
var ruleCategories =  '\n"rule_categories" : ' + OpenAjax.a11y.nls.RuleCategories.getNLS('en-us').toJSON("\n      ") + ',\n';
var rules    =   '\n"rules" : ' + OpenAjax.a11y.RuleManager.toJSON("      ") + ",\n";
var rulesets =   '\n"rulesets" : ' + OpenAjax.a11y.RulesetManager.toJSON("      ");
var json = '{\n' + wcag20 + ruleCategories + rules + rulesets + '\n}';

var fs = require('fs');
fs.writeFileSync('export/populate/oaa_exported_rules.json', json);

