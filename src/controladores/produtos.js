const knex = require('../conexao');
const { verificaIdExistente } = require('../utils/verificacoes');

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const editarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({ mensagem: "Erro interno do servidor." });
    }
}

const listarProdutos = async (req, res) => {
//incluir condiçao caso tenha filtro

    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const detalharProdutoPorId = async (req, res) => {
    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

const excluirProduto = async (req, res) => {
    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(400).json({ mensagem: "Erro interno do servidor." });
     }
}

module.exports = {
    cadastrarProduto,
    editarProduto,
    listarProdutos,
    detalharProdutoPorId,
    excluirProduto
}