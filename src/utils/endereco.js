const axios = require("axios")

const retornarEndereco = async (cep) => {
    try {
      const enderecoEncontrado = await axios.get(
        `https://viacep.com.br/ws/${cep}/json/`
        );

        return enderecoEncontrado.data;
    } catch (error) {
      console.error(error.message);
    }
}

module.exports = {
    retornarEndereco
}