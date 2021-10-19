var { MongoClient } = require('mongodb');

class Database {
  dbUrl = 'mongodb://localhost:27017/Cookmaster';

  async connect(onSuccess, onFailure){
    try {
      var connection = await MongoClient.connect(this.dbUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
      });
      this.db = connection.db('Cookmaster');
      console.debug("Db conectado URI: " + this.dbUrl);
      onSuccess();
    }
    catch(ex) {
      console.error("Erro na conexão,", ex);
      onFailure(ex);
    }
  }
}

module.exports.db = new Database();