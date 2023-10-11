const verificarPreenchimento = (item) => {
    return !item;
}

const verificaEmailSenha = (email, senha, res) => {
    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório!' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório!' })
    }
}

const validarId = (id) => {
    return isNaN(id);
}

module.exports = {
    verificarPreenchimento,
    verificaEmailSenha,
    validarId
}