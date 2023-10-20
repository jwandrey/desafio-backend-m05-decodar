const knex = require('../conexao');
const { verificaIdExistente } = require('../utils/verificacoes');
const joi = require("joi"); //usado para validação de dados

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(500).json({ mensagem: "Erro interno do servidor." });
     }
}

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  // Define as regras de validação usando Joi
  const dadosObrigatorios = joi.object({
    nome: joi.string().required(), //obrigatorio
    email: joi.string().email().required(),//obrigatorio
    cpf: joi.string().length(11).required(),//obrigatorio
    cep: joi.string().length(8).allow(null), //daqui pra baixo e opcional
    rua: joi.string().allow(null),
    numero: joi.string().allow(null),
    bairro: joi.string().allow(null),
    cidade: joi.string().allow(null),
    estado: joi.string().allow(null),
  });

  try {
    // Validar os dados recebidos no corpo da requisição
    const { error } = dadosObrigatorios.validate(req.body); 

    if (error) {
      return res.status(400).json({ mensagem: error.details[0].message });
    }

   //Validar se existe cliente para o id enviado como parâmetro na rota.
    const clienteExistente = await knex("clientes").where({ id }).first();

    if (!clienteExistente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    //não permitindo dois clientes possuírem o mesmo e-mail e o mesmo cpf.
    const clienteComEmail = await knex("clientes").where({ email }).whereNot({ id }).first();
    const clienteComCPF = await knex("clientes").where({ cpf }).whereNot({ id }).first();

    if (clienteComEmail) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    if (clienteComCPF) {
      return res.status(400).json({ mensagem: "CPF já cadastrado" });
    }

    // Atualiza os dados do cliente no banco de dados
    await knex("clientes")
      .where({ id })
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado });
    
    return res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
}

const listarClientes = async (req, res) => {
    try {
        
     } catch (error) {
       console.error(error.message);
       return res.status(500).json({ mensagem: "Erro interno do servidor." });
     }
}

const detalharClientePorId = async (req, res) => {
    try {
      const { id } = req.params;
    // Consultar o banco de dados para encontrar o cliente pelo id.
    const cliente = await knex("clientes").where({ id }).first();

    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    return res.json(cliente);
        
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