var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server;

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

let _db;

function connect(callback){
    MongoClient.connect(MONGO_DB_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    },
      (err, conn) => {
        console.debug('Connected');
        _db = conn.db(DB_NAME);
        callback(_db);
    });
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