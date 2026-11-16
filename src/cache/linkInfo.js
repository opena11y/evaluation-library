/* linkInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('linkInfo', false);

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
 * @class LinkElement
 *
 * @desc Information on a specific links on a web page
 */

export class LinkElement {

  constructor (domElement) {

    const de = domElement;

    this.domElement = de;

    this.hasImage = de.node.querySelector('img');
    this.imageAlt = this.hasImage ?
                    this.hasImage.alt :
                    '';

    this.textContent = de.node.textContent;

    this.duplicateName = this.textContent.trim().toLowerCase() === this.imageAlt.trim().toLowerCase();

    const parsedUrl   = URL.parse(window.location.href);
    const partsUrl    = parsedUrl && parsedUrl.hostname ?
                        parsedUrl.hostname.split('.') :
                        '';
    const partsUrlLen = parsedUrl && parsedUrl.hostname ?
                        partsUrl.length :
                        0;

    const parsedHref   = URL.parse(de.node.href);
    const partsHref    = parsedHref && parsedHref.hostname ?
                           parsedHref.hostname.split('.') :
                           '';
    const partsHrefLen = parsedHref && parsedHref.hostname ?
                           partsHref.length :
                           0;

    if (parsedHref && parsedHref.hostname) {

        this.hostName     = parsedHref.hostname;
        this.sameHostname = parsedUrl.hostname === parsedHref.hostname;
        this.sameDomain   = (partsUrlLen > 1 && partsHrefLen > 1) ?
                             (partsUrl[partsUrlLen-1] === partsHref[partsHrefLen-1]) &&
                             (partsUrl[partsUrlLen-2] === partsHref[partsHrefLen-2]) :
                             false;

        this.samePathname = parsedUrl.pathname === parsedHref.pathname;

        const periodIndex   = parsedHref.pathname.lastIndexOf('.');
        this.extension     = periodIndex > 0 ?
                              parsedHref.pathname.substring(periodIndex+1).trim().toLowerCase() :
                              '';

        this.extensionType = pdfExtensions.includes(this.extension) ?
                              'pdf' :
                              docExtensions.includes(this.extension) ?
                              'doc' :
                              mediaExtensions.includes(this.extension) ?
                              'media' :
                              zipExtensions.includes(this.extension) ?
                              'zip' :
                              '';
      }

  }

}


/**
 * @class LinkInfo
 *
 * @desc Collects information on the links in a web page
 */

export default class LinkInfo {
  constructor () {
    this.allLinkElements = [];
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement has a role of "link"
   *
   * @param  {Object}  domElement  - DOMElement object representing an element in the DOM
   * @param  {Boolean} inLink      - True if element is a descendant of a link, otherwise false
   */

  update (domElement, inLink) {
    if (domElement.isLink) {
      this.allLinkElements.push(new LinkElement(domElement));
      return true;
    }
    return inLink;
  }

  /**
   * @method showLinkInfo
   *
   * @desc showLinkInfo is used for debugging the LinkInfo object
   */

  showLinkInfo () {
    if (debug.flag) {
      debug.log('== All Links ==', 1);
      this.allLinkElements.forEach( le => {
        debug.domElement(le.domElement);
      });
    }
  }
}


