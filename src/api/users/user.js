const database = require('../database');

class User {
    async create(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = 'user';

        const db = await database.connect();
        console.debug('Creating user');
        const res = await db.collection('users').insertOne(this);
        this._id = res.insertedId;
    }

    async emailExists(email) {
        const db = await database.connect();
        const count = await db.collection('users').countDocuments({ email });
        return count > 0;
    }
}

module.exports = User;