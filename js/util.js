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

export {checkLength, isEscapeKeyPressed, anyElementIsDuplicated};
