const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
	}

	const token = authorization.split(' ')[1];

	try {
		const { id } = jwt.verify(token, process.env.SENHAJWT);

		// const usuarioExistente = await knex('usuarios')
		// 	.where({ id }) 
        //  .first()

		// if (!usuarioExistente) {
		// 	return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
		// }

		// req.usuario = usuarioExistente;

		// next();
	} catch (error) {
		return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." });
	}
}

module.exports = validarLogin;