const router = require('express').Router();
const apiRoutes = require('./api');
const withAuth = require('../utils/auth');
// require different pages
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
// backend routers
router.use('/api', apiRoutes);
// frontend routers
router.use('/', homeRoutes);
router.use('/dashboard', withAuth);
router.use('/dashboard', dashboardRoutes);
router.use((req, res) => {
  // res.send('<h1> Wrong Route! </h1>');
  res.status(404).end();
});

module.exports = router;
