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
// get the single-post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      'id',
      'content',
      'title',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)',
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize the data
      const post = dbPostData.get({ plain: true });
      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
