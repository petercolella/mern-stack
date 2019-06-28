const router = require('express').Router();
const demoController = require('../../controllers/demoController');

router.route('/').get(demoController.hello);
router.route('/bodies').get(demoController.getBodies);

module.exports = router;
