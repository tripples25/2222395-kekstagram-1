const SCALE_CHANGE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const PERCENTAGES_FOR_FRACTIONAL_PART = 100;

const uploadModal = document.querySelector('.img-upload');
const scaleSlider = document.querySelector('.img-upload__scale');
const zoomOutButton = scaleSlider.querySelector('.scale__control--smaller');
const zoomInButton = scaleSlider.querySelector('.scale__control--bigger');
const scaleControlValue = scaleSlider.querySelector('.scale__control--value');
const uploadedImg = uploadModal.querySelector('.img-upload__preview img');

const changeImageScale = (scaleValue) => {
  uploadedImg.style.transform = `scale(${scaleValue / PERCENTAGES_FOR_FRACTIONAL_PART})`;
  scaleControlValue.value = `${scaleValue}%`;
};

const increaseScale = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue === MAX_SCALE_VALUE) {
    return;
  }
  currentScaleValue += SCALE_CHANGE_STEP;
  changeImageScale(currentScaleValue);
};

const decreaseScale = () => {
  let currentScaleValue = parseInt(scaleControlValue.value, 10);
  if (currentScaleValue === MIN_SCALE_VALUE) {
    return;
  }
  currentScaleValue -= SCALE_CHANGE_STEP;
  changeImageScale(currentScaleValue);
};

const addZoomButtonsClickHandlers = () => {
  zoomOutButton.addEventListener('click', decreaseScale);
  zoomInButton.addEventListener('click', increaseScale);
};

const removeZoomButtonsClickHandlers = () => {
  zoomOutButton.removeEventListener('click', decreaseScale);
  zoomInButton.removeEventListener('click', increaseScale);
};

export {changeImageScale, addZoomButtonsClickHandlers, removeZoomButtonsClickHandlers, DEFAULT_SCALE_VALUE};
