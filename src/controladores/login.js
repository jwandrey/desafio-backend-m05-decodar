const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const { verificarPreenchimento } = require('../utils/verificacoes');
const { validarSenha } = require('../utils/criptografia');

const login = async (req, res) => {
    try {
        
 
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = login;