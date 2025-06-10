/* linkResults.js */

/* Imports */
import DebugLogging from '../debug.js';

import {
  cleanName
} from '../utils.js';

/* constants */
const debug = new DebugLogging('linkResults', false);
debug.flag = false;

const pdfExtensions = [
  'pdf'   // Protable document format
]

const docExtensions = [
  'csv',   // Comma separated spaces
  'doc',   // Microsoft Word Document
  'docx',
  'epub',  // Electronic book format
  'odg',   // Open Document Graphics
  'odp',   // Open Document Presentations
  'ods',   // Open Document Spreadsheet
  'odt',   // Open Document Text
  'ppt',   // Microsoft Powerpoint document
  'pptx',
  'rtf',   // Rich text format
  'rtfd',
  'txt',   // Text file
  'xls',   // Microsoft Spreadsheet document
  'xlsx'
]

const mediaExtensions = [
  'aif',   // AIF audio file
  'bmp',   // Bitmap image
  'cda',   // CD (Compact Disc) audio track file
  'ico',   // Icon file
  'jpeg',  // JPEG (Joint Photographic Experts Group) image
  'jpg',
  'gif',   // GIF (Graphics Interchange Format) image
  'mid',   // MIDI (Musical Instrument Digital Interface) audio file
  'midi',
  'mp3',   // MP3 audio file
  'mpa',   // MPEG-2 audio file
  'png',   // PNG (Portable Network Graphics) image
  'ogg',   // Ogg Vorbis audio file
  'ps',    // PostScript file
  'psd',   // PSD (Photoshop document) image
  'svg',   // Scalable Vector Graphics file
  'tif',   // TIFF (Tagged Image File Format) image
  'tiff',
  'wav',   // WAV file
  'webp',  // WebP image.
  'wma',   // WMA (Windows Media Audio) audio file
  'wpl'   // Windows Media Player playlist
]

const zipExtensions = [
  'tar',   // Linux / Unix tarball file archive
  'gz',    // Tarball compressed file'
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

    const parsedUrl   = URL.parse(url);
    const partsUrl    = parsedUrl && parsedUrl.hostname ?
                        parsedUrl.hostname.split('.') :
                        '';
    const partsUrlLen = parsedUrl && parsedUrl.hostname ?
                        partsUrl.length :
                        0;

    this.linkData = [];

    domCache.linkInfo.allLinkDomElements.forEach( de => {

      const parsedHref = URL.parse(de.node.href);
      const partsHref  = parsedHref && parsedHref.hostname ?
                         parsedHref.hostname.split('.') :
                         '';
      const partsHrefLen = parsedHref && parsedHref.hostname ?
                           partsHref.length :
                           0;

      if (parsedHref && parsedHref.hostname) {

        const sameHostname = parsedUrl.hostname === parsedHref.hostname;
        const sameDomain   = (partsUrlLen > 1 && partsHrefLen > 1) ?
                             (partsUrl[partsUrlLen-1] === partsHref[partsHrefLen-1]) &&
                             (partsUrl[partsUrlLen-2] === partsHref[partsHrefLen-2]) :
                             false;

        const samePathname = parsedUrl.pathname === parsedHref.pathname;

        const periodIndex   = parsedHref.pathname.lastIndexOf('.');
        const extension     = periodIndex > 0 ?
                              parsedHref.pathname.substring(periodIndex+1).trim().toLowerCase() :
                              '';

        const extensionType = pdfExtensions.includes(extension) ?
                              'pdf' :
                              docExtensions.includes(extension) ?
                              'doc' :
                              mediaExtensions.includes(extension) ?
                              'media' :
                              zipExtensions.includes(extension) ?
                              'zip' :
                              '';

        const dataItem = {
          url:               de.node.href,
          name:              cleanName(de.accName.name),
          desc:              cleanName(de.accDescription.name),
          ordinalPosition:   de.ordinalPosition,
          isInternal:        sameHostname && samePathname,
          isExternal:        !sameDomain,
          isSameDomain:      sameDomain,
          isSameSubDomain:   sameHostname,
          extension:         extension,
          extensionType:     extensionType,
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
