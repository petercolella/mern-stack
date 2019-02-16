const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, process.env.NODE_ENV === 'production' ? '../client/build/index.html' : '../client/public/index.html'));
});

module.exports = router;
