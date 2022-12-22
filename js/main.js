import {getData} from './api.js';
import {renderThumbnails} from './thumbnail-renderer.js';
import {setUserFormSubmit, showSummaryUploadMessage, showAlert} from './form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

getData(
  (pictures) => {
    renderThumbnails(pictures);
  },
  () => {
    showAlert('Не удалось загрузить данные. Перезагрузите страницу либо попробуйте позже, мы уже исправляем это!');
  });

setUserFormSubmit(
  () => {
    showSummaryUploadMessage(successMessageTemplate);
  },
  () => {
    showSummaryUploadMessage(errorMessageTemplate);
  }
);
