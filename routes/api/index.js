const router = require('express').Router();
const demoRoutes = require('./demoRoute');

router.use('/hello', demoRoutes);

module.exports = router;
