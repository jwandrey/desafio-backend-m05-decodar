const knex = require('../conexao');
const joi = require("joi"); 
const { retornarEndereco } = require('../utils/endereco');
const { verificaNumeroValido } = require('../utils/verificacoes');

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, numero } = req.body;

  const dadosObrigatorios = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    cpf: joi.string().length(11).required(),
    cep: joi.string().length(8).allow(null),
    rua: joi.string().allow(null),
    numero: joi.string().allow(null),
    bairro: joi.string().allow(null),
    cidade: joi.string().allow(null),
    estado: joi.string().allow(null),
  });

  try {
    const dadosEndereco = await retornarEndereco(cep);

    const { error } = dadosObrigatorios.validate(req.body);
    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    const clienteComEmail = await knex("clientes").where({ email }).first();
    const clienteComCPF = await knex("clientes").where({ cpf }).first();

    if (clienteComEmail) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    if (clienteComCPF) {
      return res.status(400).json({ mensagem: "CPF já cadastrado" });
    }

    await knex("clientes").insert({
      nome,
      email,
      cpf,
      cep: dadosEndereco.cep,
      rua: dadosEndereco.logradouro,
      numero,
      bairro: dadosEndereco.bairro,
      cidade: dadosEndereco.localidade,
      estado: dadosEndereco.uf
    });

    return res
      .status(201)
      .json({ mensagem: "Cliente cadastrado com sucesso!" });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  const dadosObrigatorios = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    cpf: joi.string().length(11).required(),
    cep: joi.string().length(8).allow(null),
    rua: joi.string().allow(null),
    numero: joi.string().allow(null),
    bairro: joi.string().allow(null),
    cidade: joi.string().allow(null),
    estado: joi.string().allow(null),
  });

  try {
    const dadosEndereco = await retornarEndereco(cep);

    const { error } = dadosObrigatorios.validate(req.body);

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

    const clienteExistente = await knex("clientes").where({ id }).first();

    if (!clienteExistente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    const clienteComEmail = await knex("clientes").where({ email }).whereNot({ id }).first();
    const clienteComCPF = await knex("clientes").where({ cpf }).whereNot({ id }).first();

    if (clienteComEmail) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    if (clienteComCPF) {
      return res.status(400).json({ mensagem: "CPF já cadastrado" });
    }

    await knex("clientes")
      .where({ id })
      .update({ 
        nome, 
        email, 
        cpf, 
        cep: dadosEndereco.cep, 
        rua: dadosEndereco.logradouro, 
        numero, 
        bairro: dadosEndereco.bairro, 
        cidade: dadosEndereco.localidade, 
        estado: dadosEndereco.uf });

    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

const listarClientes = async (req, res) => {
  try {
    const clientesCadastrados = await knex("clientes").select("*").orderBy("id", "asc");

    return res.status(200).json(clientesCadastrados);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

const detalharClientePorId = async (req, res) => {
  const { id } = req.params;

  if (verificaNumeroValido(id)) {
    return res
      .status(400)
      .json({ mensagem: "O id do cliente deve ser um número válido." });
  }

  try {
    const cliente = await knex("clientes").where({ id }).first();

    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    return res.status(200).json(cliente);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

module.exports = {
  cadastrarCliente,
  editarCliente,
  listarClientes,
  detalharClientePorId
}