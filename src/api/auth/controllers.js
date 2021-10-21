var express = require('express');
const { requests } = require('sinon');
var database = require('../database');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

_validInputLogin = (request) => {
    let valid = true;
    
    valid = valid && request.body.email;
    valid = valid && emailRegexp.test(request.body.email);
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