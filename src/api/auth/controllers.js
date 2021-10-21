var express = require('express');
var database = require('../database');
var validations = require('../../helpers/validations');

_validInputLogin = (request) => {
    let valid = true;
    
    valid = valid && request.body.email;
    valid = valid && request.body.password;

    return valid;
}

login = (request, response, next) => {
    console.log ('auth login');

    if ( ! _validInputLogin(request)) {
        response.status(401).json(
            {
                "message": "All fields must be filled"
            }
        );
        return false;
    }

    response.json(request.body);
}

module.exports = {
    login
};