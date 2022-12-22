import {generatePhotos} from './data.js';
import {checkLength} from './util.js';
import {renderThumbnails} from './thumbnail-renderer.js';
import {prepareForm} from './form.js';

checkLength('abc', 10);
renderThumbnails(generatePhotos(25));
prepareForm();
