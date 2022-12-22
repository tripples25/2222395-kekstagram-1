const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkLength = (commentary, maxLength) => {
  return commentary.length <= maxLength;
};

const arrayContainsElement = (array, element) => {
  return array.indexOf(element) >= 0;
};

const isEscapeKeyPressed = (evt) => {
  return evt.key === 'Escape';
};

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

export {getRandomInt, checkLength, isEscapeKeyPressed, anyElementIsDuplicated};
