// import router function from express npm package
const router = require('express').Router();
// import comment table model
const { Comment } = require('../../models');
// ---------------------- all the routes ----------------------//
// GET/api/comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log('FIND ALL COMMENTS =>', err);
      res.status(500).json(err);
    });
});
// GET/api/comments/:id
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log('FIND ONE COMMENT =>', err);
      res.status(500).json(err);
    });
});
// POST/api/comments
router.post('/', (req, res) => {
  Comment.create({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    comment_text: req.body.comment_text,
  })
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log('POST COMMENT =>', err);
      res.status(500).json(err);
    });
});
// PUT/api/comments
// DELETE/api/comments/:id

module.exports = router;
