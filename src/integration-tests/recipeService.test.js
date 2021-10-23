const { expect } = require('chai');
const MongoClient = require('mongodb/lib/mongo_client');
const database = require('../api/database');
const recipe = require('../api/recipes/recipe');

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

describe('Recipe service', () => {
    let connection;
    let db;
  
    it('Inserir receita no banco', async () => {
      let db = await database.connect();
      await db.collection('recipes').deleteMany({});

      const rec = await recipe.create('Omelete especial', 'ovos, queijo, pimenta, whisky', 
          'Quebre e misture os ovos, adicione a pimenta e o queijo, sirva o whisky e beba');

      expect(rec).to.have.property('_id');
    });

    it('Recuperar todas as receitas do banco', async () => {
      let db = await database.connect();
      await db.collection('recipes').deleteMany({});
      console.log('Apagou', await db.collection('recipes').find({}).toArray());

      let rec = await recipe.create('Omelete comum', 'ovos, queijo, pimenta', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo');

      delete await rec._id;

      // rec = await recipe.create('Omelete especial', 'ovos, queijo, pimenta, whisky', 
      //       'Quebre e misture os ovos, adicione a pimenta e o queijo, sirva o whisky e beba');
      // console.log(await rec);

      rec = await recipe.getAll();
      console.log(await rec.toArray());
      expect(await rec.toArray()).to.not.be.equal([]);
    });

    it('Recuperar uma a receita do banco', async () => {
      let db = await database.connect();
      await db.collection('recipes').deleteMany({});
      console.log('Apagou', await db.collection('recipes').find({}).toArray());

      let rec = await recipe.create('Omelete comum', 'ovos, queijo, pimenta', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo');

      let recCheck = await recipe.findById(await rec._id);
      expect(await recCheck._id.equals(rec._id)).to.be.equal(true);
    });

    it('Atualizar uma a receita do banco', async () => {
      let db = await database.connect();
      await db.collection('recipes').deleteMany({});
      console.log('Apagou', await db.collection('recipes').find({}).toArray());

      let rec = await recipe.create('Omelete comum', 'ovos, queijo, pimenta', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo');

      let recCheck = await recipe.findById(await rec._id);
      recCheck.name = 'editado';

      await recipe.update(recCheck._id, recCheck, { role: 'admin' });

      recCheck = await recipe.findById(await rec._id);

      expect(await recCheck.name).to.be.equal('editado');
    });

    it('Excluir uma a receita do banco', async () => {
      let db = await database.connect();
      await db.collection('recipes').deleteMany({});
      console.log('Apagou', await db.collection('recipes').find({}).toArray());

      let rec = await recipe.create('Omelete comum', 'ovos, queijo, pimenta', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo');

      await recipe.remove(rec._id, { role: 'admin' });

      recCheck = await recipe.findById(await rec._id);

      expect(await recCheck).to.be.equal(null);
    });

  });
