var database = require('../database');

const dbCollection = 'users';

class User {
    constructor() { }

    async create(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = "user";

        let db = await database.connect();
        console.debug('Creating user');
        let res = await db.collection("users").insertOne(this);
        this._id = res.insertedId;
    }

    async emailExists(email) {
        let db = await database.connect();
        let count = await db.collection("users").countDocuments({ "email" : email });
        return count > 0;
    }
}

module.exports = User;