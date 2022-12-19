import {renderComments} from './comment-renderer.js';
import {isEscapeKeyPressed} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKeydown);
};

const addModalCloseHandlers = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKeydown);
};

export const openBigPicture = (picture) => {
  addModalCloseHandlers();
  bigPicture.querySelector('.big-picture__img').lastElementChild.src = picture.url;
  bigPicture.querySelector('.big-picture__img').lastElementChild.alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comments').innerHTML = '';

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  renderComments(picture.comments);
};

function onEscKeydown (evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
