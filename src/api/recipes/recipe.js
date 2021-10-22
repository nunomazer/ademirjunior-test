const { ObjectID } = require('mongodb');
const database = require('../database');

async function create(name, ingredients, preparation, userId) {
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;

    const db = await database.connect();
    console.debug('Creating recipe');
    const res = await db.collection('recipes').insertOne(this);
    const rec = await findById(res.insertedId);
    console.log('Recipe created', await rec._id);
    return await rec;
}

async function getAll() {
    console.log('Geting all recipes');
    const db = await database.connect();
    const res = await db.collection('recipes').find({});
    return res;
}

async function findById(id) {
    console.log('Find recipe');
    const db = await database.connect();
    
    let res = null;
    try {
        const oId = ObjectID(id);
        res = await db.collection('recipes').findOne({ _id: oId });
    } catch (e) {
        console.log(e);
    }

    return res;
}

async function update(id, data) {
    console.log('Update recipe');
    const db = await database.connect();
    
    const oId = ObjectID(id);

    const res = await db.collection('recipes').updateOne(
        { _id: oId },
        {
            $set: {
                name: data.name,
                ingredients: data.ingredients,
                preparation: data.preparation,
            },
        },
    );
    
    return res;    
}

async function remove(id) {
    console.log('Delete recipe');
    const db = await database.connect();
    
    const oId = ObjectID(id);

    const res = await db.collection('recipes').deleteOne(
        { _id: oId },
    );
    
    return res;    
}


module.exports = {
    create,
    findById,
    getAll,
    update,
};