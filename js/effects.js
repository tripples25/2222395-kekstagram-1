const SLIDER_EFFECT_OPTIONS = {
  'none': getSliderEffectOptions(0, 100, 100, 1),
  'chrome': getSliderEffectOptions(0, 1, 1, 0.1),
  'sepia': getSliderEffectOptions(0, 1, 1, 0.1),
  'marvin': getSliderEffectOptions(0, 100, 100, 1),
  'phobos': getSliderEffectOptions(0, 3, 3, 0.1),
  'heat': getSliderEffectOptions(0, 3, 3, 0.1)
};

const SLIDER_STYLES = {
  'none': () => 'none',
  'chrome': (value) => `grayscale(${value})`,
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'heat': (value) => `brightness(${value})`
};

const uploadModal = document.querySelector('.img-upload');
const uploadedImg = uploadModal.querySelector('.img-upload__preview img');
const effectsList = uploadModal.querySelector('.effects__list');
const slider = uploadModal.querySelector('.img-upload__effect-level');
const sliderElement = uploadModal.querySelector('.effect-level__slider');
const effectLevelValue = uploadModal.querySelector('.effect-level__value');

let currentFilter = 'none';

noUiSlider.create(sliderElement, SLIDER_EFFECT_OPTIONS[currentFilter]);

function getSliderEffectOptions(min, max, start, step) {
  return {
    range: {min, max},
    start,
    step,
    connect: 'lower'
  };
}

const setSlider = (filter) => {
  if (filter === 'none') {
    slider.classList.add('hidden');
  } else {
    slider.classList.remove('hidden');
  }
  // На тернарку ругается линт
  // filter === 'none' ? slider.classList.add('hidden') : slider.classList.remove('hidden');

  uploadedImg.classList.remove(`effects__preview--${currentFilter}`);
  currentFilter = filter;
  uploadedImg.classList.add(`effects__preview--${currentFilter}`);
  sliderElement.noUiSlider.updateOptions(SLIDER_EFFECT_OPTIONS[currentFilter]);
  uploadedImg.style.filter = SLIDER_STYLES[currentFilter](effectLevelValue);
};

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
  uploadedImg.style.filter = SLIDER_STYLES[currentFilter](effectLevelValue.value);
});

const changeImgEffect = (evt) => {
  const effectsItem = evt.target.closest('.effects__item');
  if (effectsItem) {
    setSlider(effectsItem.querySelector('.effects__radio').value);
  }
};

const addEffectsListClickHandler = () => {
  effectsList.addEventListener('click', changeImgEffect);
};

const removeEffectsListClickHandler = () => {
  effectsList.removeEventListener('click', changeImgEffect);
};

export {setSlider, addEffectsListClickHandler, removeEffectsListClickHandler};

