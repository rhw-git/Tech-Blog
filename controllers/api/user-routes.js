// import router function from express npm package
const router = require('express').Router();
// import user table models
const { User, Post, Vote, Comment } = require('../../models');
// ------------------ all the routes ------------------- //
// GET/api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at'],
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_post',
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
    ],
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log('FIND ALL USERS =>', err);
      res.status(500).json(err);
    });
});
// GET/api/users/:id
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at'],
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_post',
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
    ],
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({
          message: 'NO user found with this id',
        });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log('FINE ONE USER =>', err);
      res.status(500).json(err);
    });
});
// POST/api/users
router.post('/', (req, res) => {
  /* expects
    {
      username: "Lernantino",
      email: "xxxx@gmail.com",
      password: 'password1234'
    }
  */
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log('CREATE ONE NEW USER =>', err);
      res.status(500).json(err);
    });
});
// route for login
router.post('/login', (req, res) => {
  /* expects
    {
      email: "xxxx@gmail.com",
      password: 'password1234'
    }
  */
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});
// route for Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// PUT/api/users/:id
router.put('/:id', (req, res) => {
  /* expects
    {
      username: "Lernantino",
      email: "xxxx@gmail.com",
      password: 'password1234'
    }
  */
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404), json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log("UPDATE ONE USER'S INFO =>", err);
      res.status(500).json(err);
    });
});
// DELETE/api/users/:id
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log('DELECT USER =>', err);
      res.status(500).json(err);
    });
});

module.exports = router;
