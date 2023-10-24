const knex = require("../conexao");
const joi = require("joi"); 
const { verificaNumeroValido } = require("../utils/verificacoes");

const listarCategorias = async (req, res) => {
  try {
    const categoriasListadas = await knex("categorias").select("descricao");
    return res.json(categoriasListadas);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const cadastrarProduto = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const schemaProduto = joi.object({
      descricao: joi.string().required(),
      quantidade_estoque: joi.number().integer().required(),
      valor: joi.number().integer().required(),
      categoria_id: joi.number().integer().required()
    });

    await schemaProduto.validateAsync(req.body);

    const categoriaExistente = await knex("categorias")
      .where("id", categoria_id)
      .first();

    if (!categoriaExistente) {
      return res
        .status(400)
        .json({ mensagem: "Não existe categoria com o id informado." });
    }

    await knex("produtos").insert({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id,
    });

    return res
      .status(201)
      .json({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ mensagem: error.message });
  }
};

const editarProduto = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
		return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
	}

  try {
    const verificarId = await knex("produtos").select("id").where("id", id).first();

    const verificarCategoriaId = await knex("categorias").select("id").where("id", categoria_id).first();

    if(!verificarId){
      return res.json("Id inválido!")
    }

    if(!verificarCategoriaId){
      return res.json("Id da categoria inválido!")
    }

    await knex("produtos").update({ descricao, quantidade_estoque, valor, categoria_id }).where("id", id);

    return res.status(201).json();
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

const listarProdutos = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    let produtosListados = await knex("produtos").select("*");

    if (categoria_id) {
      if (verificaNumeroValido(categoria_id)) {
        return res
          .status(400)
          .json({ mensagem: "O id da categoria deve ser um número válido." });
      }

      const categoriaExistente = await knex("categorias")
        .where("id", categoria_id)
        .first();

      if (!categoriaExistente) {
        return res
          .status(400)
          .json({ mensagem: "Não existe categoria com o id informado." });
      }

      produtosListados = await knex("produtos")
        .select("*")
        .where("categoria_id", categoria_id);

      if (produtosListados.length === 0) {
        return res
          .status(400)
          .json({
            mensagem:
              "Não existem produtos cadastrados na categoria informada.",
          });
      }
    }

    return res.json(produtosListados);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharProdutoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where("id", id).first().returning("*");

    if (!produto) {
      return res.status(400).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await knex("produtos").where("id", id).first();

    if (!produto) {
      return res.status(400).json({ mensagem: "Produto não encontrado." });
    }

    await knex('produtos').where('id', id).del();

    return res.status(200).json({mensagem: 'Produto excluído com sucesso!'});
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  listarCategorias,
  cadastrarProduto,
  editarProduto,
  listarProdutos,
  detalharProdutoPorId,
  excluirProduto,
};