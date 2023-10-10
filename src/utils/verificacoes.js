const verificarPreenchimento = (item) => {
    return !item;
}

const validarId = (id) => {
    return isNaN(id);
}

module.exports = {
    verificarPreenchimento,
    validarId
}