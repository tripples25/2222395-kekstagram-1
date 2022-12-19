export const getRandomInt = (min, max) => Math.floor( Math.random() * (max - min + 1) + min);

export const checkLength = (commentary, maxLength) => commentary.length <= maxLength;

export const isEscapeKeyPressed = (evt) => evt.key === 'Escape';
