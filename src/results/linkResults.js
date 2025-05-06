/* linkResults.js */

/* Imports */
import DebugLogging from '../debug.js';

import {
  cleanName
} from '../utils.js';

/* constants */
const debug = new DebugLogging('linkResults', false);
debug.flag = false;

const allowedExtensions = [
  'ai',    // Adobe Illustrator file'
  'aif',   // AIF audio file
  'bmp',   // Bitmap image
  'cda',   // CD (Compact Disc) audio track file
  'csv',   // Comma separated spaces
  'doc',   // Microsoft Word Document
  'docx',
  'epub',  // Electronic book format
  'ico',   // Icon file
  'jpeg',  // JPEG (Joint Photographic Experts Group) image
  'jpg',
  'gif',   // GIF (Graphics Interchange Format) image
  'mid',   // MIDI (Musical Instrument Digital Interface) audio file
  'midi',
  'mp3',   // MP3 audio file
  'mpa',   // MPEG-2 audio file
  'png',   // PNG (Portable Network Graphics) image
  'odg',   // Open Document Graphics
  'odp',   // Open Document Presentations
  'ods',   // Open Document Spreadsheet
  'odt',   // Open Document Text
  'ogg',   // Ogg Vorbis audio file
  'pdf',   // Protable document format
  'ppt',   // Microsoft Powerpoint document
  'pptx',
  'ps',    // PostScript file
  'psd',   // PSD (Photoshop document) image
  'rtf',   // Rich text format
  'rtfd',
  'svg',   // Scalable Vector Graphics file
  'tar',   // Linux / Unix tarball file archive
  'gz',    // Tarball compressed file'
  'tif',   // TIFF (Tagged Image File Format) image
  'tiff',
  'txt',   // Text file
  'wav',   // WAV file
  'webp',  // WebP image.
  'wma',   // WMA (Windows Media Audio) audio file
  'wpl',   // Windows Media Player playlist
  'xls',   // Microsoft Spreadsheet document
  'xlsx',
  'zip',   // Comprerssed file format
  '7z'     // 7-Zip compressed file
]


/**
 *
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

        const periodIndex   = parsedURL.pathname.lastIndexOf('.');
        const extension     = periodIndex > 0 &&
                              ((parsedURL.pathname - periodIndex) < 5) ?
                              parsedURL.pathname.substring(periodIndex).trim().toLowerCase() :
                              '';

        const allowedExt    = allowedExtensions.includes(extension) ?
                              extension :
                              '';

        const dataItem = {
          url:               de.node.href,
          name:              cleanName(de.accName.name),
          ordinalPosition:   de.ordinalPosition,
          isInternal:        sameHostname && samePathname,
          isExternal:        !sameHostname,
          isSameDomain:      sameHostname && !samePathname,
          extension:         allowedExt,
          isVisibleOnScreen: de.visibility.isVisibleOnScreen,
          isVisibleToAT:     de.visibility.isVisibleToAT
        };

        this.linkData.push(dataItem);

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
