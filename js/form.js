import {isEscapeKeyPressed, checkLength, anyElementIsDuplicated} from './util.js';
import {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler} from './effects.js';
import {changeImageScale, DEFAULT_SCALE_VALUE, removeZoomButtonsClickHandlers, addZoomButtonsClickHandlers} from './scale-slider.js';
import {sendData} from './api.js';

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
const noneEffects = uploadForm.querySelector('#effect-none');
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

const setToDefaults = () => {
  changeImageScale(DEFAULT_SCALE_VALUE);
  setSlider('none');
  hashtagsField.value = '';
  descriptionField.value = '';
  noneEffects.checked = true;
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
  uploadFileInput.value = '';
  setToDefaults();
  removeZoomButtonsClickHandlers();
  removeEffectsListClickHandler();
  removeSubmitButtonHandler();
};

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', onEscKeydown);
  addEffectsListClickHandler();
  addZoomButtonsClickHandlers();
  addSubmitButtonHandler();
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeSuccessUploadMessage();
  }
};

const onErrorEscKeydown = (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeErrorUploadMessage();
  }
};

const onSuccessOuterAreaClick = (evt) => {
  if (evt.target.closest('.success__inner') === null) {
    closeSuccessUploadMessage();
  }
};

const onErrorOuterAreaClick = (evt) => {
  if (evt.target.closest('.error__inner') === null) {
    closeErrorUploadMessage();
  }
};

function closeSuccessUploadMessage() {
  closeForm();
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('keydown', closeForm);
  document.removeEventListener('click', onSuccessOuterAreaClick);
}

function closeErrorUploadMessage() {
  closeForm();
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('keydown', closeForm);
  document.removeEventListener('click', onErrorOuterAreaClick);
}

const setUserFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      sendData(
        () => {
          onSuccess();
        },
        () => {
          onError();
        },
        new FormData(uploadForm)
      );
    }
  });
};

const showSummaryUploadMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = '10000';
  document.body.append(message);
  document.removeEventListener('keydown', closeForm);
  if (messageTemplate.classList.contains('success')) {
    setToDefaults();
    document.querySelector('.success__button').addEventListener('click', closeSuccessUploadMessage);
    document.addEventListener('keydown', onSuccessEscKeydown);
    document.addEventListener('click', onSuccessOuterAreaClick);
  } else if (messageTemplate.classList.contains('error')) {
    document.querySelector('.error__button').addEventListener('click', closeErrorUploadMessage);
    document.addEventListener('keydown', onErrorEscKeydown);
    document.addEventListener('click', onErrorOuterAreaClick);
  }
};

function onEscKeydown (evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('load-error-message');
  alertContainer.style.zIndex = '100';
  alertContainer.style.width = '500px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.backgroundColor = '#f04848';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.textTransform = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

uploadForm.onchange = openForm;

export {setUserFormSubmit, showSummaryUploadMessage, showAlert};
