const express = require('express');
const jwt = require('../auth/jwt');
const controllers = require('./controllers');

const router = express.Router();

router.use(express.json());
router.get('/recipes/:id', controllers.getOne);
router.put('/recipes/:id', jwt.isValid, controllers.update);
router.delete('/recipes/:id', jwt.isValid, controllers.remove);
router.get('/recipes', controllers.getAll);
router.post('/recipes', jwt.isValid, controllers.store);

module.exports = router;