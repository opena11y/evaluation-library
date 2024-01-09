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
    const node = domElement.node;
    const type = node.getAttribute('type');

    this.domElement = domElement;
    this.tracks = [];
    this.params = [];

    this.hasAutoPlay = domElement.node.hasAttribute('autoplay');
    this.type = (typeof type === 'string') ? type.toLowerCase() : '';
  }

  get isAudio () {
    return this.type.includes('audio') || this.domElement.tagName === 'audio';
  }

  get isVideo () {
    return this.type.includes('video') || this.domElement.tagName === 'video';
  }

  get allowsTracks () {
    return ['audio', 'video'].includes(this.domElement.tagName);
  }

  get isEmbed () {
    return this.domElement.tagName === 'embed';
  }

  get isObject () {
    return this.domElement.tagName === 'object';
  }

  get hasCaptionTrack () {
    return this.checkForTrackKind('captions');
  }

  get hasDescriptionTrack () {
    return this.checkForTrackKind('descriptions');
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
 * @class MediaInfo
 *
 * @desc Collects information on the media elements on a web page for use in
 *       rules
 */

export default class MediaInfo {
  constructor () {
    this.allMediaElements = [];
  }

  update (mediaElement, domElement) {

    switch (domElement.tagName) {

      case 'audio':
        mediaElement = new MediaElement(domElement);
        this.allMediaElements.push(mediaElement);
        break;

      case 'embed':
        mediaElement = new MediaElement(domElement);
        this.allMediaElements.push(mediaElement);
        break;

      case 'object':
        mediaElement = new MediaElement(domElement);
        this.allMediaElements.push(mediaElement);
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
        this.allMediaElements.push(mediaElement);
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
      debug.log('== Media Elements ==', 1);
      this.allElements.forEach( me => {
        debug.log(me);
      });

    }
  }
}


