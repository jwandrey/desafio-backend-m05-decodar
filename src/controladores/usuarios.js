const knex = require('../conexao');
const { verificarPreenchimento } = require('../utils/verificacoes');
const { criptografarSenha } = require('../utils/criptografia');

const cadastrarUsuario = async (req, res) => {
    try {


	} catch (error) {
		console.error(error.message);
		return res.status(400).json({ mensagem: "Erro interno do servidor." });
	}
}

const detalharUsuario = async (req, res) => {
	try {


	} catch (error) {
        console.error(message.error);
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
}

const editarUsuario = async (req, res) => {
	try {


	} catch (error) {
        console.error(error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
}

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario
}