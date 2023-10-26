const express = require('express');
const multer = require('./multer');
const validarLogin = require('./intermediarios/autenticacao');
const { cadastrarUsuario, detalharUsuario, editarUsuario } = require('./controladores/usuarios');
const login = require('./controladores/login');
const { cadastrarProduto, editarProduto, listarProdutos, detalharProdutoPorId, excluirProduto, listarCategorias, uploadImagemProduto } = require('./controladores/produtos');
const { cadastrarCliente, editarCliente, detalharClientePorId, listarClientes } = require('./controladores/clientes');
const { cadastrarPedido, listarPedidos } = require('./controladores/pedidos');

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
// rotas.post('/upload/:id', multer.single('arquivo'), uploadImagemProduto)

rotas.post('/cliente', cadastrarCliente);
rotas.put('/cliente/:id', editarCliente);
rotas.get('/cliente', listarClientes)
rotas.get('/cliente/:id', detalharClientePorId);

rotas.post('/pedido', cadastrarPedido);
rotas.get('/pedido', listarPedidos);

module.exports = rotas;