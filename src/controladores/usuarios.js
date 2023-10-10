const knex = require("../conexao");
const { verificarPreenchimento } = require("../utils/verificacoes");
const { criptografarSenha } = require("../utils/criptografia");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .satus(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  try {
    const emailValido = await knex("usuarios").where("email", email).first();

    if (!emailValido) {
      return res.status(400).json("O email já existe.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada })
      .returning(["id", "nome", "email"]);

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
  try {
  } catch (error) {
    console.error(message.error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editarUsuario = async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario,
};
