var database = require('../database');

class Auth {
    constructor() { }

    async login(email, password) {
        let db = await database.connect();
        console.debug('Logging user');
        let res = await db.collection("users").findOne({
            "email": email,
            "password": password
        }, {
            projection: { name: 1, email: 1, role: 1 },
        });
        
        if (res == null) {
            throw Error('Incorrect username or password')
        }

        return res;
    }

    async emailExists(email) {
        let db = await database.connect();
        let count = await db.collection("users").countDocuments({ "email" : email });
        return count > 0;
    }
}

module.exports = Auth;