const database = require('../database');
const jwt = require('jsonwebtoken');

async function login(email, password) {
    const db = await database.connect();
    console.debug('Logging user');
    const res = await db.collection('users').findOne({
        email,
        password,
    }, {
        projection: { name: 1, email: 1, role: 1 },
    });
    
    if (res == null) {
        throw Error('Incorrect username or password');
    }

    const token = jwt.sign({ res }, 'my-secret-configurar', {
        expiresIn: 300 // expires in 5min
      });

    return token;
}

async function emailExists(email) {
    const db = await database.connect();
    const count = await db.collection('users').countDocuments({ email });
    return count > 0;
}

module.exports = {
    login,
    emailExists,
};