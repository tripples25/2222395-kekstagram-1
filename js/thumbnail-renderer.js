import {openBigPicture} from './big-picture.js';

const body = document.querySelector('body');
const picTemplate = body.querySelector('#picture');
const picturesParent = body.querySelector('.pictures');

const getUserPictureDomElement = (pictureObject) => {
  const picture = picTemplate.content.querySelector('.picture').cloneNode(true);

  picture.querySelector('.picture__img').src = pictureObject.url;
  picture.querySelector('.picture__likes').textContent = pictureObject.likes;
  picture.querySelector('.picture__comments').textContent = pictureObject.comments.length;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureObject);
  });

  return picture;
};

const getUserPictureDomElements = (picObjects) => {
  const pictures = [];

  picObjects.forEach((picObject, i) => {
    pictures[i] = getUserPictureDomElement(picObject);
  });

  return pictures;
};

const insertUserPictureDomElement = (pictureDomElement) => {
  const documentFragment = new DocumentFragment();
  documentFragment.appendChild(pictureDomElement);

  picturesParent.appendChild(documentFragment);
};

const insertUserPictureDomElements = (pictureDomElements) => {
  pictureDomElements.forEach((pictureDomElement) => {
    insertUserPictureDomElement(pictureDomElement);
  });
};

export const renderThumbnails = (photos) => {
  insertUserPictureDomElements(getUserPictureDomElements(photos));
};
