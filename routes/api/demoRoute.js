const router = require('express').Router();
const demoController = require('../../controllers/demoController');

router.route('/').get(demoController.hello);

module.exports = router;
