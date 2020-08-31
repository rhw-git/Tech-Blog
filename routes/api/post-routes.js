// import router function from express npm package
const router = require('express').Router();
// import post table and user table models
const { Post, User } = require('../../models');
// ------------------ all the routes ------------------- //
// GET/api/posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'post_url', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('FIND ALL POSTS =>', err);
      res.status(500).json(err);
    });
});
// GET/api/post/:id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'post_url', 'created_at'],
    include: [
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('IN ONE POST =>', err);
      res.status(500).json(err);
    });
});
// POST/api/posts
router.post('/', (req, res) => {
  /* expects
    {
      title: 'Taskmaster goes public!',
      post_url: 'https://taskmaster.com/press',
      user_id: 1
    }
  */
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('CREATE ONE NEW POST =>', err);
      res.status(500).json(err);
    });
});
// PUT/api/posts/:id
router.put('/:id', (req, res) => {
  /* expects
    {
      title: 'Taskmaster goes public!',
      post_url: 'https://taskmaster.com/press',
      user_id: 1
    }
  */
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('UPDATE ONE POST =>', err);
      res.status(500).json(err);
    });
});
// DELETE/api/posts/:id
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log('DELECT POST =>', err);
      res.status(500).json(err);
    });
});

module.exports = router;
