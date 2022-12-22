import {isEscapeKeyPressed, checkLength, anyElementIsDuplicated} from './util.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REG = /^#[A-za-zА-Яа-яЁё\d]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const scaleControl = document.querySelector('.scale__control--value');
const descriptionField = uploadForm.querySelector('[name="description"]');
const hashtagsField = uploadForm.querySelector('[name="hashtags"]');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

const validateHashtagsCount = (value) =>
  (value === '')
    ? true
    : value.split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtagFormat = (value) =>
  (value === '')
    ? true
    : value.split(' ').every((hashtag) => HASHTAG_REG.test(hashtag));

const validateDuplicateHashtag = (value) =>
  (value === '')
    ? true
    : !anyElementIsDuplicated(value.toLowerCase().split(' '));

pristine.addValidator(
  hashtagsField,
  validateHashtagFormat,
  `Хэш-тэги должны быть вида #hashtag и разделены пробелами. Макс. длинна хэш-тега - ${MAX_HASHTAG_LENGTH}`,
  3
);

pristine.addValidator(
  hashtagsField,
  validateDuplicateHashtag,
  'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру',
  2
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  1
);

pristine.addValidator(
  descriptionField,
  (description) => checkLength(description, MAX_DESCRIPTION_LENGTH),
  `До ${MAX_DESCRIPTION_LENGTH} символов (включительно)`
);

descriptionField.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

const submitForm = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

const addSubmitButtonHandler = () => {
  uploadForm.addEventListener('submit', submitForm);
};

const removeSubmitButtonHandler = () => {
  uploadForm.removeEventListener('submit', submitForm);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.value = '';
  scaleControl.value = '100%';
  overlay.querySelector('.text__hashtags').value = '';
  overlay.querySelector('.text__description').value = '';
  uploadFileInput.value = '';
  removeSubmitButtonHandler();
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscKeydown);
  addSubmitButtonHandler();
};

export const prepareForm = () => {
  uploadForm.onchange = openForm;
};

function onEscKeydown (evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeForm();
  }
}
