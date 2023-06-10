/* listInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('MediaInfo', false);
debug.flag = false;

/**
 * @class MediaElement
 *
 * @desc Identifies a DOM element as an audio or video element.
 *
 * @param  {Object}  domElement   - DOM element object
 */

class MediaElement {
  constructor (domElement) {
    this.domElement = domElement;
    this.tracks = [];
    this.hasAutoPlay = domElement.node.hasAttribute('autoplay');
  }

  get allowsTracks () {
    return true;
  }

  get isObject () {
    return false;
  }

  get hasCaptionTrack () {
    return this.checkForTrackKind('captions');
  }

  get hasDescriptionTrack () {
    return this.checkForTrackKind('descriptions');
  }

  get hasSubtitleTrack () {
    return this.checkForTrackKind('subtitles');
  }

  get hasChaptersTrack () {
    return this.checkForTrackKind('chapters');
  }

  checkForTrackKind (type) {
    for (let i = 0; i < this.tracks.length; i += 1) {
      if (this.tracks[i].kind.includes(type)) {
        return true;
      }
    }
    return false;
  }

  toString() {
    return `[MediaElement]: ${this.domElement}`;
  }
}

/**
 * @class TrackElement
 *
 * @desc Identifies a DOM element as a track element.
 *
 * @param  {Object}  domElement   - DOM element object
 */

class TrackElement {
  constructor (domElement) {
    const node = domElement.node;
    this.domElement = domElement;
    this.kind = node.hasAttribute('kind') ? node.kind.toLowerCase() : '';
  }

  toString() {
    return `[TrackElement]: ${this.domElement}`;
  }
}


/**
 * @class ObjectElement
 *
 * @desc Identifies a DOM element as an object element.
 *
 * @param  {Object}  domElement   - DOM element object
 */

class ObjectElement {
  constructor (domElement) {
    const node = domElement.node;
    this.domElement = domElement;
    this.params = [];
    this.type = node.hasAttribute('type') ? node.type.toLowerCase() : '';
  }
  get allowsTracks () {
    return false;
  }

  get isObject () {
    return true;
  }

  get isAudio () {
    return this.type.includes('audio');
  }

  get isVideo () {
    return this.type.includes('video');
  }

  toString() {
    return `[ObjectElement]: ${this.domElement}`;
  }
}

/**
 * @class ParamElement
 *
 * @desc Identifies a DOM element as a param element.
 *
 * @param  {Object}  domElement   - DOM element object
 */

class ParamElement {
  constructor (domElement) {
    this.domElement = domElement;
  }

  toString() {
    return `[ParamElement]: ${this.domElement}`;
  }

}

/**
 * @class EmbedElement
 *
 * @desc Identifies a DOM element as an embed element.
 *
 * @param  {Object}  domElement   - DOM element object
 */

class EmbedElement {
  constructor (domElement) {
    const node = domElement.node;
    this.domElement = domElement;
    this.type = node.hasAttribute('type') ? node.type.toLowerCase() : '';
  }

  get allowsTracks () {
    return false;
  }

  get isAudio () {
    return this.type.includes('audio');
  }

 get isVideo () {
    return this.type.includes('video');
  }

  get isObject () {
    return false;
  }

  toString() {
    return `[EmbedElement]: ${this.domElement}`;
  }
}

/**
 * @class MediaInfo
 *
 * @desc Collects information on the media elements on a web page for use in
 *       rules
 */

export default class MediaInfo {
  constructor () {
    this.audioElements  = [];
    this.embedElements  = [];
    this.objectElements = [];
    this.videoElements  = [];
  }

  update (mediaElement, domElement) {

    switch (domElement.tagName) {

      case 'audio':
        mediaElement = new MediaElement(domElement);
        this.audioElements.push(mediaElement);
        break;

      case 'embed':
        mediaElement = new EmbedElement(domElement);
        this.embedElements.push(mediaElement);
        break;

      case 'object':
        mediaElement = new ObjectElement(domElement);
        this.objectElements.push(mediaElement);
        break;

      case 'param':
        if (mediaElement && mediaElement.isObject) {
          const param = new ParamElement(domElement);
          mediaElement.params.push(param);
        }
        break;

      case 'track':
        if (mediaElement &&
            mediaElement.allowsTracks) {
          const track = new TrackElement(domElement);
          mediaElement.tracks.push(track);
        }
        break;

      case 'video':
        mediaElement = new MediaElement(domElement);
        this.videoElements.push(mediaElement);
        break;

      default:
        break;

    }

    return mediaElement;
  }

  /**
   * @method showMediaInfo
   *
   * @desc showMediaInfo is used for debugging the MediaInfo and other media objects
   */

  showListInfo () {
    if (debug.flag) {
      debug.log('== Audio Elements ==', 1);
      this.audioElements.forEach( ae => {
        debug.log(ae);
      });

      debug.log('== Video Elements ==', 1);
      this.videoElements.forEach( ve => {
        debug.log(ve);
      });

      debug.log('== Object Elements ==', 1);
      this.objectElements.forEach( oe => {
        debug.log(oe);
      });

      debug.log('== Embed Elements ==', 1);
      this.embedElements.forEach( ee => {
        debug.log(ee);
      });


    }
  }
}


