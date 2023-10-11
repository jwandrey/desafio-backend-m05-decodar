const knex = require('../conexao');
const jwt = require('jsonwebtoken');
const { verificarPreenchimento, verificaEmailSenha } = require('../utils/verificacoes');
const { validarSenha } = require('../utils/criptografia');

const login = async (req, res) => {
    const { email, senha } = req.body
    verificaEmailSenha(email, senha, res);
    
    try {
        const emailExistente = await knex("usuarios").where("email", email).first();

        if (!emailExistente) {
            return res.status(400).json({ mensagem: 'Email e senha inválido' })
        }

        const { senha: senhaUsuario, ...usuario } = emailExistente;
        const senhaCorreta = await validarSenha(senha, senhaUsuario)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Senha inválida' })
        }

        const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '8h' })
        return res.json({
            usuario,
            token
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = login;
