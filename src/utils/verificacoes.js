const knex = require('../conexao');

const verificaEmailSenha = (email, senha, res) => {
    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório!" })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório!" })
    }
}

const verificaIdExistente = (id) => {

}

module.exports = {
    verificaEmailSenha,
    verificaIdExistente
}