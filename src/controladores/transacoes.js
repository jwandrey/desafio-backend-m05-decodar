const knex = require('../conexao');
const { verificarPreenchimento, validarId } = require('../utils/verificacoes');

const listarCategorias = async (req, res) => {
    try {
    
	} catch (error) {
        console.error(error.message);
		return res.status(500).json({ mensagem: "Erro interno do servidor" });
	}
}

module.exports = {
    listarCategorias
}