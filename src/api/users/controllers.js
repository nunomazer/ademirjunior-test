var express = require('express');
const { requests } = require('sinon');
var database = require('../database');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

_validInputStore = (request) => {
    let valid = true;
    
    valid = valid && request.body.name;
    valid = valid && request.body.email;
    valid = valid && emailRegexp.test(request.body.email);
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

    response.json(request.body);
}

getAll = (request, response, next) => {
    response.json(request);
}

module.exports = {
    store,
    getAll,
};