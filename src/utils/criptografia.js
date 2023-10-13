const bcrypt = require('bcrypt');

const criptografarSenha = async (senha) => {
    try {
        return await bcrypt.hash(senha, 10);
    } catch (error) {
        console.error(error.message);
    }
}

const validarSenha = async (senha, senhaCriptografada) => {
    try {
        return await bcrypt.compare(senha, senhaCriptografada);
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    criptografarSenha,
    validarSenha
}