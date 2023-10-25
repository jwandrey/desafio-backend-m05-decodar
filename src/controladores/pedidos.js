const knex = require('../conexao');
const joi = require("joi"); 
const { verificaNumeroValido } = require("../utils/verificacoes");
const transportador = require("../servicos/nodemailer");
const compiladorHtml = require("../utils/compiladorHtml");

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    if (pedido_produtos.length < 1) {
        return res
            .status(400)
            .json({ mensagem: "Deve-se incluir pelo menos um produto no pedido." })
    }

    if (verificaNumeroValido(cliente_id)) {
        return res
            .status(400)
            .json({ mensagem: "O id do cliente deve ser um número válido." });
      }

    const clienteExistente = await knex("clientes")
        .where("id", cliente_id)
        .first();

    if (!clienteExistente) {
        return res
            .status(404)
            .json({ mensagem: "Cliente não encontrado" });
    }
  
    try {
        const schemaPedido = joi.object({
            cliente_id: joi.number().integer().required(),
            observacao: joi.string(),
            pedido_produtos: joi.array().items(
                joi.object({
                    produto_id: joi.number().integer().required(),
                    quantidade_produto: joi.number().integer().required()
                })
            ).sparse().unique('produto_id').required()
        });
  
        await schemaPedido.validateAsync(req.body);

        let valorTotalDoPedido = 0;

        for (const pedido of pedido_produtos) {
            const produtoExistente = await knex("produtos")
                .where("id", pedido.produto_id)
                .first();

            if (!produtoExistente) {
                return res
                    .status(400)
                    .json({ mensagem: "Não existe produto cadastrado com o id informado." });
            }

            if (produtoExistente.quantidade_estoque < pedido.quantidade_produto) {
                return res
                    .status(400)
                    .json({ mensagem: "Estoque insuficiente. Pedido não efetuado." });
            }

            let estoqueAposVenda = produtoExistente.quantidade_estoque - pedido.quantidade_produto;

            await knex("produtos")
                .where("id", pedido.produto_id)
                .update({ quantidade_estoque: estoqueAposVenda });

            const valorPedidoProduto = pedido.quantidade_produto * produtoExistente.valor;
            valorTotalDoPedido += valorPedidoProduto;
        }
  
        await knex("pedidos").insert({
            cliente_id,
            observacao,
            valor_total: valorTotalDoPedido
        });

        for (const pedido of pedido_produtos) {
            const produtoExistente = await knex("produtos")
                .where("id", pedido.produto_id)
                .first();

            if (!produtoExistente) {
                return res
                    .status(400)
                    .json({ mensagem: "Não existe produto cadastrado com o id informado." });
            }

            const pedidoId = await knex("pedidos")
            .max("id")
            .first();

            await knex("pedido_produtos")
            .insert({
                quantidade_produto: pedido.quantidade_produto,
                valor_produto: produtoExistente.valor,
                pedido_id: pedidoId.max,
                produto_id: produtoExistente.id,
            })
        }

        const cliente = await knex("clientes")
            .select("nome", "email", )
            .where("id", cliente_id)
            .first();

        const html = await compiladorHtml("./src/templates/login.html", {
            nomeusuario: cliente.nome,
          });

        transportador.sendMail({
            from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: "Pedido efetuado com sucesso!",
            html
        });
  
        return res
            .status(201)
            .json({ mensagem: "Pedido cadastrado com sucesso!" });
    } catch (error) {
      console.error(error.message)
      return res.status(400).json({ mensagem: error.message });
    }
}

const listarPedidos = async (req, res) => {
    try {
        const { cliente_id } = req.query; 

        const consultaPedidos = knex('pedidos') 
            .select(
                'pedidos.id',
                'pedidos.observacao',
                'pedidos.valor_total',
                'pedidos.cliente_id',
                'pedido_produtos.id',
                'pedido_produtos.quantidade_produto',
                'pedido_produtos.valor_produto',
                'pedido_produtos.pedido_id',
                'pedido_produtos.produto_id'
            )
            .leftJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id') // Realiza um JOIN entre 'pedidos' e 'pedido_produtos'.

            .where(builder => {
                if (cliente_id) {
                    builder.where('pedidos.cliente_id', cliente_id); // Filtra por 'cliente_id' se fornecido.
                }
            });

        const resultadoConsulta = await consultaPedidos; // Executa a consulta e aguarda o resultado.

        const pedidosAgrupados = {}; // Inicializa um objeto para agrupar os resultados.

        resultadoConsulta.forEach(row => { // Percorre os resultados da consulta.
            if (!pedidosAgrupados[row.pedido_id]) {
                pedidosAgrupados[row.pedido_id] = {
                    pedido: {
                        id: row.pedido_id,
                        valor_total: row.valor_total,
                        observacao: row.observacao,
                        cliente_id: row.cliente_id,
                    },
                    pedido_produtos: [],
                };
            }

            if (row.pedido_produto_id) { // Verifica se a linha contém informações de produto.
                pedidosAgrupados[row.pedido_id].pedido_produtos.push({
                    id: row.pedido_produto_id,
                    quantidade_produto: row.quantidade_produto,
                    valor_produto: row.valor_produto,
                    pedido_id: row.pedido_id,
                    produto_id: row.produto_id
                });
            }
        });

        const response = Object.values(pedidosAgrupados); // Transforma o objeto em uma matriz de pedidos agrupados.

        res.status(200).json(response); 
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
};


module.exports = {
    cadastrarPedido,
    listarPedidos
}