const knex = require('../conexao');
const { verificaIdExistente } = require('../utils/verificacoes');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const editarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const listarClientes = async (req, res) => {
    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const detalharClientePorId = async (req, res) => {
    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharClientePorId
}