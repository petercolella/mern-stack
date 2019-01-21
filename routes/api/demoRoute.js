const router = require('express').Router();
const indexController = require('../../controllers/indexController');

router.route('/').get(indexController.hello);

module.exports = router;
