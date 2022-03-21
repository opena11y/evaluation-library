/* debug.js */

// Debug tools

// If called with only two parameters, assume the second is the message string
// and use 'debug' for the moduleName
export function debugConsole(debug, moduleName, message) {
  if (typeof message !== 'string') {
    message = moduleName;
    moduleName = 'debug';
  }
  if (debug) {
    console.log(`[${moduleName}]` + s);
  }
}

// If called with only two parameters, assume the second is the element node
// and use 'debug' for the moduleName
export function debugTag (debug, moduleName, node) {
  if (typeof moduleName !== 'string') {
    node = moduleName;
    moduleName = 'debug';
  }
  if (debug && node) {
    console.log(`[${moduleName}][` + node.tagName + ']: ' + node.textContent.trim().substring(0, 20).trim());
  }
}

// If called with only one parameter, use 'debug' for the moduleName
export function debugSeparator (debug, moduleName) {
  if (typeof moduleName !== 'string') {
    moduleName = 'debug';
  }
  if (debug) {
    console.log(`[${moduleName}] ------------------- `);
  }
}
