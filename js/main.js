function GetRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) + min);
}

function CheckLength(commentary, maxLength)
{
  return commentary.length <= maxLength;
}

