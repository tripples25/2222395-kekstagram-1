import {generatePhotos} from './data.js';
import {checkLength} from './util.js';
import {renderThumbnails} from './renderer.js';

checkLength('abc', 10);
renderThumbnails(generatePhotos(25));
