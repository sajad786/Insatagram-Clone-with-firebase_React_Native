import { USERS } from "./users"

export const POSTS = [
  {
    imageUrl:
      'https://i.pinimg.com/236x/c5/c6/3c/c5c63c1cc5bfca51ffc0ceb705dbd553.jpg',
    user: USERS[0].user,
    likes: 7870,
    caption:
      'This is awesome! right?  well here I am trying to write some dummy text for caption, will see how it looks',
    profilePicture: USERS[0].Image,
    comments: [
      {
        user: 'Abass',
        comment: 'wow this build looks fire. Super excited to see next',
      },
      {
        user: 'waseem',
        comment: 'cool Looks so great, this is awesome ',
      },
      {
        user: 'Zakir',
        comment: ' this is awesome ',
      },
    ],
  },

  {
    imageUrl:
      'https://i.pinimg.com/236x/da/8b/29/da8b29d1f8ffd7ea8054531400a4f932.jpg',
    user: USERS[1].user,
    likes: 3500,
    caption: 'This is awesome! right? ',
    profilePicture: USERS[1].Image,
    comments: [
      {
        user: 'Abass',
        comment: 'wow this build looks fire. Super excited to see next',
      },
      {
        user: 'waseem',
        comment: 'cool Looks so great, this is awesome ',
      },
      {
        user: 'Zakir',
        comment: ' this is awesome ',
      },
    ],
  },
];