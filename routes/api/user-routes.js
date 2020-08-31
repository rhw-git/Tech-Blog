// import router function from express npm package
const router = require('express').Router();
// import user table models
const { User } = require('../../models');
// ------------------ all the routes ------------------- //
// GET/api/users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
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
      password: 'password1234'
    }
  */
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log('CREATE ONE NEW USER =>', err);
      res.status(500).json(err);
    });
});
// PUT/api/users/:id
router.put('/:id', (req, res) => {
  /* expects
    {
      username: "Lernantino",
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
