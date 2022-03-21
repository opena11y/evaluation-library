/* debug.js */

// Debug tools

// If called with only two parameters, assume the second is the message string
// and use 'debug' for the moduleName
export function debugMessage(debug, moduleName, message) {
  if (typeof message !== 'string') {
    message = moduleName;
    moduleName = 'debug';
  }
  if (debug) {
    console.log(`[${moduleName}]` + message);
  }
}

export function debugTag (debug, moduleName, node) {
  if (node && node.tagName) {
    debugMessage(debug, moduleName, `[${node.tagName}]: ${node.textContent.trim().substring(0, 20).trim()}`);
  }
}

export function debugSeparator (debug, moduleName) {
    debugMessage(debug, moduleName, '-----------------------------');
}
