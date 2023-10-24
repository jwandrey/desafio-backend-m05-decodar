const fs = require('fs/promises');
const handlebars = require('handlebars');

const compiladorHtml = async (arquivo, contexto) => {
    const arquivoHtml = await fs.readFile(arquivo);
    const compilador = handlebars.compile(arquivoHtml.toString());
    const htmlString = compilador(contexto);

    return htmlString;
}

module.exports = compiladorHtml;