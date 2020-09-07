const router = require('express').Router();
// connect to database through sequelize
const sequelize = require('../config/connection');
// import all the models
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log('HOME ROUTE REQUEST SESSION =>', req.session);
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)',
        ),
        'vote_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      // get all the posts
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch((err) => {
      console.log('RENDER POSTS =>', err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    console.log('LOGGED IN ALREADY=>');
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
