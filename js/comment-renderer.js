const body = document.querySelector('body');
const commentTemplate = body.querySelector('#social__comment');
const commentsParent = body.querySelector('.social__comments');

const getSocialCommentDomElement = (comment) => {
  const commentElement = commentTemplate.content.querySelector('.social__comment').cloneNode(true);
  const picture = commentElement.querySelector('.social__picture');
  const text = commentElement.querySelector('.social__text');

  picture.src = comment.avatar;
  picture.alt = comment.name;
  text.textContent = comment.message;

  return commentElement;
};

const getSocialCommentDomElements = (picObjects) => {
  const pictures = [];

  picObjects.forEach((picObject, i) => {
    pictures[i] = getSocialCommentDomElement(picObject);
  });

  return pictures;
};

const insertSocialCommentDomElement = (pictureDomElement) => {
  const documentFragment = new DocumentFragment();
  documentFragment.appendChild(pictureDomElement);

  commentsParent.appendChild(documentFragment);
};

const insertSocialCommentDomElements = (pictureDomElements) => {
  pictureDomElements.forEach((pictureDomElement) => {
    insertSocialCommentDomElement(pictureDomElement);
  });
};

export const renderComments = (comments) => {
  insertSocialCommentDomElements(getSocialCommentDomElements(comments));
};
