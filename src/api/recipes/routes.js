const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.use(express.json());
router.get('/recipes/:id', controllers.getOne);
router.get('/recipes', controllers.getAll);
router.post('/recipes', controllers.store);

module.exports = router;