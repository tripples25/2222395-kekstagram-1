const randomComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const names = ['Артём', 'Андрей', 'Наруто'];
let lastCommentIndex = 1;

function getRandomInt(min, max)
{
  return Math.floor( Math.random() * (max - min + 1) + min);
}

function checkLength(commentary, maxLength)
{
  return commentary.length <= maxLength;
}

function generateComments(count)
{
  let comments = [];
  for (let i = 0; i < count; i++)
  {
    let comment = {
      id: lastCommentIndex++,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: randomComments[getRandomInt(0, randomComments.length - 1)],
      name: names[getRandomInt(0, names.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
}

function generatePhotos(count)
{
  let photos = [];
  for (let i = 0; i < count; i++)
  {
    let photo = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'Мудрое дерево.',
      likes: getRandomInt(15, 200),
      comments: generateComments(10)
    };
    photos.push(photo);
  }
  return photos;
}

getRandomInt(0, 10);
checkLength('abx', 10);
generatePhotos(25);
