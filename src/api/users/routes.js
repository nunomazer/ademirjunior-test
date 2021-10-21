var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.use(express.json());
router.get('/users', controllers.getAll);
router.post('/users', controllers.store);

module.exports = router;