var asRuleset = OpenAjax.a11y.RulesetManager.getRuleset('TEST');

// then needs to get an evaluatorFactory
var evaluatorFactory = OpenAjax.a11y.EvaluatorFactory.newInstance();

// and configure it...
evaluatorFactory.setParameter('ruleset', asRuleset);

evaluatorFactory.setFeature('eventProcessing',   'none');
evaluatorFactory.setFeature('brokenLinkTesting', false);

// before getting the actual evaluator
var evaluator = evaluatorFactory.newEvaluator();

var ruleCategories = OpenAjax.a11y.nls.RuleCategories.getNLS('en-us').toJSON("\n  ");
var rules    = '{ "rules" : ' + OpenAjax.a11y.RuleManager.toJSON("      ") + '}\n';
var rulesets = '{ "rulesets" : ' + OpenAjax.a11y.RulesetManager.toJSON("      ") + '}\n';

var fs1 = require('fs');
fs1.writeFileSync('export/populate/rules.json', rules);

var fs2 = require('fs');
fs2.writeFileSync('export/populate/rulesets.json', rulesets);

var fs3 = require('fs');
fs3.writeFileSync('export/populate/rule_categories.json', ruleCategories);
