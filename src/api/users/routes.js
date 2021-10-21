var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.use(express.json());
router.get('/', controllers.getAll);
router.post('/', controllers.store);

module.exports = router;