# evaluation-library
Javascript library for evaluating WCAG and ARIA conformance.  The library is designed to be used in browser extensions or emulators to evaluate accessibility features and issues.  The evaluation results can be accessed through APIs or exporting the results in a JSON format.

[change.log](openajax_a11y/release-notes.md)

# NPM development commands

| Command         | Description |
| --------------- | ----------- |
| npm run eslint  | Uses `eslint` to validate Javascript files in the `src` directory |
| npm run bundle  | Uses `rollup` to compile module files in `src` into a single JS file `releases/evaluation-library.js` |        |
| npm run build   | runs `eslint` and then the `bundle` command   |
| npm run aria-spec   | Generates files representing the requirements of the ARIA specification   |
| npm run aria-in-html   | Generates a JSON file representing the requirements of the ARIA in HTML specification   |

