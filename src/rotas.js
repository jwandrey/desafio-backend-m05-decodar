const express = require('express');
const validarLogin = require('./intermediarios/autenticacao');
const { listarCategorias } = require('./controladores/transacoes');
const { cadastrarUsuario, detalharUsuario, editarUsuario } = require('./controladores/usuarios');
const login = require('./controladores/login');


const rotas = express();


rotas.get('/categoria', listarCategorias); 
rotas.post('/usuario', cadastrarUsuario); 
rotas.post('/login', login); 

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario); 
rotas.put('/usuario', editarUsuario); 

module.exports = rotas;