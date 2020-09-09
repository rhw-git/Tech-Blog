const { Post, User, Comment } = require('../models');
const commentData = [
  {
    post_id: 1,
    user_id: 2,
    comment_text: 'nice post!',
  },
  {
    post_id: 1,
    user_id: 3,
    comment_text: 'great to learn about this!',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
