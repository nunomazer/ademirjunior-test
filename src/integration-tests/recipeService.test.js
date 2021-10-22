const { expect } = require('chai');
const recipe = require('../api/recipes/recipe');

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

describe('Recipe service', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(mongoDbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db('Cookmaster');
    });
  
    beforeEach(async () => {
      await db.collection('recipes').deleteMany({});
    });
  
    afterAll(async () => {
      await connection.close();
    });

    it('Inserir receita no banco', async () => {
        const rec = await recipe.create('Omelete especial', 'ovos, queijo, pimenta, whisky', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo, sirva o whisky e beba');

        expect(rec).to.have.property('_id');
    });

    it('Recuperar todas as receitas do banco', async () => {
        await recipe.create('Omelete comum', 'ovos, queijo, pimenta', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo');

        await recipe.create('Omelete especial', 'ovos, queijo, pimenta, whisky', 
            'Quebre e misture os ovos, adicione a pimenta e o queijo, sirva o whisky e beba');

            const rec = await recipe.getAll();
console.log(await rec.toArray());
        expect(await rec.toArray().length).to.be.greaterThan(0);
    });
});
