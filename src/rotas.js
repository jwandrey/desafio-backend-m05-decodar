const express = require('express');
const validarLogin = require('./intermediarios/autenticacao');
const { listarCategorias } = require('./controladores/transacoes');
const { cadastrarUsuario, detalharUsuario, editarUsuario } = require('./controladores/usuarios');
const login = require('./controladores/login');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProdutoPorId, excluirProduto } = require('./controladores/produtos');
const { cadastrarCliente, editarCliente, detalharClientePorId, listarClientes } = require('./controladores/clientes');

const rotas = express();

rotas.get('/categoria', listarCategorias); 
rotas.post('/usuario', cadastrarUsuario); 
rotas.post('/login', login); 

rotas.use(validarLogin);

rotas.get('/usuario', detalharUsuario); 
rotas.put('/usuario', editarUsuario); 

rotas.post('/produto', cadastrarProduto);
rotas.put('/produto/:id', editarProduto);
rotas.get('/produto', listarProdutos);
rotas.get('/produto/:id', detalharProdutoPorId);
rotas.delete('/produto/:id', excluirProduto);

rotas.post('/cliente', cadastrarCliente);
rotas.put('/cliente/:id', editarCliente);
rotas.get('cliente', listarClientes)
rotas.get('cliente/:id', detalharClientePorId);

module.exports = rotas;