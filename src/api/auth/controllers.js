var express = require('express');
var database = require('../database');
var validations = require('../../helpers/validations');
var Auth = require('./auth');

_validInputLogin = (request) => {
    let valid = true;
    
    valid = valid && request.body.email;
    valid = valid && request.body.password;

    return valid;
}

async function login(request, response, next) {
    console.log ('auth login');

    if ( ! _validInputLogin(request)) {
        response.status(401).json({
                "message": "All fields must be filled"
            });
        return false;
    }

    let auth = new Auth();

    try {
        user = await auth.login(request.body.email, request.body.password)
        console.log('Logged', user);
        response.json(user);
    } catch (e) {
        response.status(401).json({
            "message": e.message
        });
    }    

}

module.exports = {
    login
};