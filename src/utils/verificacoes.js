const knex = require('../conexao');

const verificaEmailSenha = (email, senha, res) => {
    if (!email) {
        return res.status(400).json({ mensagem: "O campo email é obrigatório!" })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: "O campo senha é obrigatório!" })
    }
}

const verificaNumeroValido = (numero) => {
    return isNaN(numero);
}

const verficarSeExistePedidoComProduto = async (produto) => {
    return await knex('pedido_produtos').where('produto_id', produto).first();
}

module.exports = {
    verificaEmailSenha,
    verificaNumeroValido,
    verficarSeExistePedidoComProduto
}