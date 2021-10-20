var router = require('express').Router();
var { db } = require('./database');

function users() {
    router.get('/users', function(request, response) {
        response.send('usuários');
    });
}

module.exports = users;