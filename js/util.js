const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const checkLength = (commentary, maxLength) => commentary.length <= maxLength;

const arrayContainsElement = (array, element) => array.indexOf(element) >= 0;

const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

const anyElementIsDuplicated = (array) => {
  const temp = array.slice();
  const length = temp.length;
  for (let i = 0; i < length; i++) {
    const element = temp[0];
    temp.splice(0, 1);
    if (arrayContainsElement(temp, element)) {
      return true;
    }
  }
  return false;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomInt, checkLength, isEscapeKeyPressed, anyElementIsDuplicated, debounce, throttle};
