var express = require('express');
var router = express.Router();
var controllers = require('./controllers');

router.use(express.json());
router.post('/login', controllers.login);

module.exports = router;