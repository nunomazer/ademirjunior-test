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

    recipe.create(request.body.name, request.body.ingredients, request.body.preparation, request.userLogged._id)
    .then(rec => {
        response.status(201).json({ recipe: rec });    
    });        
}

async function getOne(request, response) {
    const res = await recipe.findById(request.params.id);

    if (res == null) {
        response.status(404).json({ message: 'recipe not found' });
        return false;
    }

    response.json(res);
}

async function getAll(request, response) {
    let res = await recipe.getAll();
    res = await res.toArray();
    response.json(res);
}

async function update(request, response) {
    let res = await recipe.update(request.params.id, request.body);
    const rec = recipe.findById(request.params.id);
    response.json(await rec);
}

async function remove(request, response) {
    let res = await recipe.remove(request.params.id);
    response.status(204).json();
}

module.exports = {
    store,
    getAll,
    getOne,
    remove,
    update,
};