const recipe = require('./recipe');

function validInputStore(request) {
    let valid = true;
    
    valid = valid && request.body.name;
    valid = valid && request.body.ingredients;
    valid = valid && request.body.preparation;

    return valid;
}

async function store(request, response) {
    if (!validInputStore(request)) {
        response.status(400).json({ message: 'Invalid entries. Try again.' });
        return false;
    }

    recipe.create(request.body.name, request.body.ingredients, request.body.preparation)
    .then(() => {
        response.status(201).json({ recipe });    
    });        
}

async function getOne(request, response) {
    const res = await recipe.findById(request.params.id);
    console.log('Recipe', res);

    if (res == null) {
        response.status(404).json({ message: 'recipe not found' });
        return false;
    }

    response.json(res);
}

async function getAll(request, response) {
    let res = await recipe.getAll();
    res = await res.toArray();
    console.log('Recipes', res);
    response.json(res);
}

module.exports = {
    store,
    getAll,
    getOne,
};