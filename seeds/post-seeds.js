const { Post, User } = require('../models');
const postData = [
  {
    title: 'Why MVC is so important',
    content:
      'MVC allows developers to maintain a true sepqaration of concrens, devising their code between the Model layer for data.',
    user_id: 3,
  },
  {
    title: 'Authentication vs Authorization',
    content:
      'Authentication means confirming your own identity, whereas authorization means being allowed acces to the system.',
    user_id: 4,
  },
  {
    title: 'Object-Relational Mapping',
    content:
      'I have really loved learning about ORMs. It is really simplified the way I create queriers in SQL',
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
