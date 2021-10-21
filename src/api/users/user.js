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
            this._id = db.collection("users").insert(this);
            console.debug(this);
        });
    }
}

module.exports = User;