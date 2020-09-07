const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// backend routers
router.use('/api', apiRoutes);
// frontend routers
router.use('/', homeRoutes);
router.use((req, res) => {
  // res.send('<h1> Wrong Route! </h1>');
  res.status(404).end();
});

module.exports = router;
