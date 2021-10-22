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

async function store(request, response, next) {
    console.log ('users store');

    if ( ! _validInputStore(request)) {
        response.status(400).json({
                "message": "Invalid entries. Try again."
        });
        return false;
    }

    let user = new User();

    user.emailExists(request.body.email)
        .then(async (exist) => {
            console.log('Existe email', exist);
            if (exist) {
                response.status(409).json({
                    "message" : "Email already registered"
                })
                return false;
            }

            user.create(
                request.body.name,
                request.body.email,
                request.body.password
            ).then(() => {
                delete user.password;
                console.log(user);
            
                response.status(201).json({ "user": user });    
            });
        
        })
        .catch((e) => console.log(e));
}

module.exports = {
    store
}