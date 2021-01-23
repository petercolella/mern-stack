const router = require('express').Router();
const demoRoutes = require('./demoRoute');
const userRoutes = require('./users');

router.use('/hello', demoRoutes);
router.use('/users', userRoutes);

module.exports = router;
