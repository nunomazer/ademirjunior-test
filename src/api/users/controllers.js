const validations = require('../../helpers/validations');
const User = require('./user');

function validInputStore(request) {
    let valid = true;
    
    valid = valid && request.body.name;
    valid = valid && request.body.email;
    valid = valid && validations.isEmail(request.body.email);
    valid = valid && request.body.password;

    return valid;
}

async function store(request, response) {
    if (!validInputStore(request)) {
        response.status(400).json({ message: 'Invalid entries. Try again.' });
        return false;
    }

    const user = new User();

    user.emailExists(request.body.email)
        .then(async (exist) => {
            if (exist) {
                response.status(409).json({ message: 'Email already registered' });
                return false;
            }

            user.create(request.body.name, request.body.email, request.body.password)
            .then(() => {
                delete user.password;
                response.status(201).json({ user });    
            });        
        })
        .catch((e) => console.log(e));
}

module.exports = {
    store,
};