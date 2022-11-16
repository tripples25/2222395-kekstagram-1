import {getRandomInt} from './util.js';

const RANDOM_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Артём', 'Андрей', 'Наруто'];
let lastCommentIndex = 1;


function generateComments(count)
{
  const comments = [];
  const minPictureIndex = 1;
  const maxPictureIndex = 6;
  for (let i = 0; i < count; i++)
  {
    const comment = {
      id: lastCommentIndex++,
      avatar: `img/avatar-${getRandomInt(minPictureIndex, maxPictureIndex)}.svg`,
      message: RANDOM_COMMENTS[getRandomInt(0, RANDOM_COMMENTS - 1)],
      name: NAMES[getRandomInt(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
}

export function generatePhotos(count)
{
  const photos = [];
  const minLikesCount = 15;
  const maxLikesCount = 200;
  const commentsCount = 10;
  for (let i = 0; i < count; i++)
  {
    const photo = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: 'Мудрое дерево.',
      likes: getRandomInt(minLikesCount, maxLikesCount),
      comments: generateComments(commentsCount)
    };
    photos.push(photo);
  }
  return photos;
}
