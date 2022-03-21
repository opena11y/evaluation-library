/* debug.js */

// Debug tools

export function debugMessage(message, moduleName='debug') {
  console.log(`[${moduleName}]` + message);
}

export function debugTag (node, moduleName) {
  if (node && node.tagName) {
    debugMessage(`[${node.tagName}]: ${node.textContent.trim().substring(0, 20).trim()}`, moduleName);
  }
}

export function debugSeparator (moduleName) {
    debugMessage('-----------------------------', moduleName);
}
