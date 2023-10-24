const knex = require('../conexao');
const { criptografarSenha } = require('../utils/criptografia');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  try {
     const emailExistente = await knex("usuarios").where("email", email).first();

     if (emailExistente) {
       return res.status(400).json({ mensagem: "O email já existe." });
    }

    const senhaCriptografada = await criptografarSenha(senha)

    const usuario = await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const editarUsuario = async (req, res) => {
  const id = req.usuario.id;
  const { nome, senha, email } = req.body

  try {
    const senhaCriptografada = await criptografarSenha(senha)

    let verificarEmailUsuario = await knex("usuarios").select("email").where("id", id).first();
    let verificarEmails = await knex("usuarios").select("email").where("email", email).first();

    if(email == verificarEmailUsuario.email){
      await knex("usuarios").update({nome, senha: senhaCriptografada}).where("id", id);
      return res.status(201).json();
    }

    if(verificarEmails){
      return res.status(400).json({ mensagem: "O email informado está vinculado a outra conta." });
    }

    await knex("usuarios").update({ nome, email, senha: senhaCriptografada }).where("id", id);
    return res.status(200).json();
    
  } catch (error) {
     return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

const detalharUsuario = async (req, res) => {
	const idToken = req.usuario.id;

	try {
		const usuario = await knex("usuarios").where("id", idToken)

		if (!usuario) {
			return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
		}

		const usuarioAutenticado = {
			id: idToken,
			nome: req.usuario.nome,
			email: req.usuario.email
		}

		return res.json(usuarioAutenticado);
	} catch (error) {
      console.error(error);
		return res.status(500).json({ mensagem: "Erro interno do servidor." });
	}
};


module.exports = {
  cadastrarUsuario,
  detalharUsuario,
  editarUsuario
};

