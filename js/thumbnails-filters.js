import {renderThumbnails} from './thumbnail-renderer.js';
import {getRandomInt, debounce} from './util.js';

const RANDOM_SORTED_THUMBNAILS_COUNT = 10;
const RERENDER_DELAY = 500;
const SORTING_VARIATIONS = {
  'filter-default':  (pictures) => pictures,
  'filter-random': (pictures) =>
    pictures
      .slice()
      .sort(() => getRandomInt(0, pictures.length) - getRandomInt(0, pictures.length))
      .slice(0, RANDOM_SORTED_THUMBNAILS_COUNT),
  'filter-discussed': (pictures) =>
    pictures
      .slice()
      .sort((pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length),
};

const imgFilters = document.querySelector('.img-filters');

let currentBtn = imgFilters.querySelector('#filter-default');

const onFiltersSortClick = (pictures) => (evt) => {
  const target = evt.target;
  if (target.closest('.img-filters__button') !== null) {
    renderThumbnails(SORTING_VARIATIONS[target.id](pictures));
  }
};

const onFiltersActiveClick = (evt) => {
  const target = evt.target;
  if (target.closest('.img-filters__button') !== null) {
    currentBtn.classList.remove('img-filters__button--active');
    currentBtn = target;
    currentBtn.classList.add('img-filters__button--active');
  }
};

const activateFilters = (pictures) => {
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', debounce(onFiltersSortClick(pictures), RERENDER_DELAY));
  imgFilters.addEventListener('click', onFiltersActiveClick);
};

export {activateFilters};
