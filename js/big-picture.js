import {isEscapeKeyPressed} from './util.js';

const COMMENTS_ON_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-count');

let pictureComments;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.removeEventListener('click', loadMoreComments);
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscKeydown);
};

const addModalCloseHandlers = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadCommentsButton.addEventListener('click', loadMoreComments);
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscKeydown);
};

export const openBigPicture = (picture) => {
  addModalCloseHandlers();
  bigPicture.querySelector('.big-picture__img').lastElementChild.src = picture.url;
  bigPicture.querySelector('.big-picture__img').lastElementChild.alt = picture.description;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.social__comments').innerHTML = '';
  pictureComments = picture.comments.slice();
  loadMoreComments();
};

function loadMoreComments() {
  const currentCommentsCount = commentsList.children.length;
  const commentsCountAfterAdding = pictureComments.length > COMMENTS_ON_LOAD + currentCommentsCount
    ? COMMENTS_ON_LOAD + currentCommentsCount
    : pictureComments.length;
  if (commentsCountAfterAdding === pictureComments.length) {
    loadCommentsButton.classList.add('hidden');
  }
  commentsCount.innerHTML = '';
  commentsCount.insertAdjacentHTML('beforeend', `
    ${commentsCountAfterAdding} из <span className="comments-count">${pictureComments.length}</span> комментариев`);

  for (let i = currentCommentsCount; i < commentsCountAfterAdding; i++) {
    commentsList.insertAdjacentHTML('beforeend', `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${pictureComments[i].avatar}"
            alt="${pictureComments[i].name}"
            width="35" height="35">
        <p class="social__text">${pictureComments[i].message}</p>
    </li>`);
  }
}

function onEscKeydown (evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}
