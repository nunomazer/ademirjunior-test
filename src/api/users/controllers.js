var express = require('express');
var validations = require('../../helpers/validations');
var User = require('./user');

_validInputStore = (request) => {
    let valid = true;
    
    valid = valid && request.body.name;
    valid = valid && request.body.email;
    valid = valid && validations.isEmail(request.body.email)
    valid = valid && request.body.password;

    return valid;
}

store = (request, response, next) => {
    console.log ('users store');

    if ( ! _validInputStore(request)) {
        response.status(400).json(
            {
                "message": "Invalid entries. Try again."
            }
        );
        return false;
    }

    let user = new User();
    user.create(
        request.body.name,
        request.body.email,
        request.body.password
    );

    console.log('User no controller ', user);

    response.status(201).json(user);
}

module.exports = {
    store
}