var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let _db;

async function connect(callback){
    conn = await MongoClient.connect(MONGO_DB_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    return conn.db(DB_NAME);
}

function getDB(){
    return _db;
}

function close(){
    _db.close();
}

module.exports = {
    connect,
    getDB,
    close
};