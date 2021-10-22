const jwt = require('jsonwebtoken');

const secretKey = 'minha-chave-super-secreta';

function isValid(request, response, next) {
    const token = request.headers.authorization;
    const errMessage = { message: 'jwt malformed' };

    if (!token) {
        console.log('Not a token');
        return response.status(401).json(errMessage);
    }
    
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
          console.log('Token err', err);
          return response.status(401).json(errMessage);
      }
      
      request.userLoged = decoded.user;
      next();
    });
}

module.exports = {
    isValid,
    secretKey,
};