// import router function from express npm package
const router = require('express').Router();
// import from user-router
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
module.exports = router;
