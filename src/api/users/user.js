var database = require('../database');

const dbCollection = 'users';

class User {
    constructor() { }

    create(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "user";

        database.connect((db) => {
            console.debug('Creating user');
            db.collection("users").insertOne(this);
        });
    }
}

module.exports = User;