/* linkResults.js */

/* Imports */
import DebugLogging from '../debug.js';

/* constants */
const debug = new DebugLogging('linkResults', false);
debug.flag = false;

/**
 * @class linkResults
 *
 * @desc Constructor for an object that contains information on links
 */

export default class LinkResults {
  constructor () {
    this.linkData = [];
  }

  get data () {
    return this.linkData;
  }

  update(domCache, url) {

    const parsedURL =  URL.parse(url);

    debug.flag && debug.log(`[parsedURL][hostname]: ${parsedURL.hostname}`);
    debug.flag && debug.log(`[parsedURL][pathname]: ${parsedURL.pathname}`);

    this.linkData = [];

    domCache.linkInfo.allLinkDomElements.forEach( de => {

      const parsedHREF = URL.parse(de.node.href);

      debug.flag && debug.log(`[parsedHREF]: ${parsedHREF}`);

      if (parsedHREF) {
        debug.flag && debug.log(`[parsedHREF][    href]: ${parsedHREF.href}`);
        debug.flag && debug.log(`[parsedHREF][hostname]: ${parsedHREF.hostname} (${parsedURL.hostname === parsedHREF.hostname})`);
        debug.flag && debug.log(`[parsedHREF][pathname]: ${parsedHREF.pathname}`);
        debug.flag && debug.log(`[parsedHREF][    hash]: ${parsedHREF.hash}`);
        debug.flag && debug.log(`[parsedHREF][  origin]: ${parsedHREF.origin}`);

        const sameHostname = parsedURL.hostname === parsedHREF.hostname;
        const samePathname = parsedURL.pathname === parsedHREF.pathname;

        const dataItem = {
          href: de.node.href,
          isInternal: sameHostname && samePathname,
          isExternal: !sameHostname,
          accName: de.accName.name,
          ordinalPosition: de.ordinalPosition
        };

        this.linkData.push(dataItem);

        debug.flag && debug.log(`[parsedHREF][isInternal]: ${dataItem.isInternal}`);
        debug.flag && debug.log(`[parsedHREF][isExternal]: ${dataItem.isExternal}`);

      }

    });

  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON object describing the document links
   *
   * @return {String} see @desc
   */

  toJSON () {
    return JSON.stringify(this.linkData);
  }
}
