const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/', require('./auth/routes'));
app.use('/', require('./users/routes'));

app.get('/teste', (request, response) => {
  db.connect(() => {
    console.log('conectado no endpoint teste');
  }, () => {
    console.log('erro ao conectar');
  });
  response.send('Funcionando ....');
});

module.exports = app;
