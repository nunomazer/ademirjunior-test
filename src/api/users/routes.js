const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.use(express.json());
router.post('/users', controllers.store);

module.exports = router;