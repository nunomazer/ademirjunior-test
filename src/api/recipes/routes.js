const express = require('express');
const jwt = require('../auth/jwt');
const controllers = require('./controllers');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (request, file, callback) {
        return callback(null, request.params.id + '.' + file.mimetype.split("/").pop() ); 
    }
});

const uploadImage = multer({ storage: storage });

router.use(express.json());
router.get('/recipes/:id', controllers.getOne);
router.put('/recipes/:id', jwt.isValid, controllers.update);
router.put('/recipes/:id/image', [jwt.isValid, uploadImage.single('image')], controllers.updateImageField);
router.delete('/recipes/:id', jwt.isValid, controllers.remove);
router.get('/recipes', controllers.getAll);
router.post('/recipes', jwt.isValid, controllers.store);

module.exports = router;