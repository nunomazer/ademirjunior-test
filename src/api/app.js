const express = require('express');

const app = express();

var { db } = require('./database');

var users = require('./users');

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(users);

app.get('/teste', (request, response) => {
  db.connect(function(){
    console.log('conectado no endpoint teste');
  },
  function (){
    console.log('erro ao conectar');
  });
  response.send('Funcionando ....');
});

module.exports = app;
