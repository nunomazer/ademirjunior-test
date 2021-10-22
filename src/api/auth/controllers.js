const auth = require('./auth');

function validInputLogin(request) {
    let valid = true;
    
    valid = valid && request.body.email;
    valid = valid && request.body.password;

    return valid;
}

async function login(request, response) {
    console.log('auth login');

    if (!validInputLogin(request)) {
        response.status(401).json({
                message: 'All fields must be filled',
            });
        return false;
    }

    try {
        const user = await auth.login(request.body.email, request.body.password);
        console.log('Logged', user);
        response.json(user);
    } catch (e) {
        response.status(401).json({
            message: e.message,
        });
    }    
}

module.exports = {
    login,
};