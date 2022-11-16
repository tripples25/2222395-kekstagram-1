export function getRandomInt(min, max)
{
  return Math.floor( Math.random() * (max - min + 1) + min);
}

export function checkLength(commentary, maxLength)
{
  return commentary.length <= maxLength;
}
