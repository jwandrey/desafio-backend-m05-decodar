const knex = require('../conexao');
const { verificarPreenchimento, validarId } = require('../utils/verificacoes');

const listarCategorias = async (req, res) => {
    try {
      const categoriasListadas = await knex("categorias").select("descricao")
      return res.json(categoriasListadas)
  
    } catch (error) {
      console.error(message.error);
      return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
  };

module.exports = {
    listarCategorias
}