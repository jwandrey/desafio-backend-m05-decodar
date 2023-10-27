![decordar banner](img/decodar-readme.png)


## :memo: Descrição
Este sistema é responsável por gerenciar dados do usuário para efetuar cadastro, realizar o login, editar informações do cadastro, além de exibir as categorias disponíveis no sistema.

## :books: Funcionalidades
* <b>Cadastro do usuário</b>: Realiza o cadastro do usuário contendo o nome, email e senha (criptografada). Esses dados serão encaminhados para um banco de dados SQL.
* <b>Login de usuário</b>: Verifica se o email e a senha estão de acordo com o que foi cadastrado no banco de dados e quando o usuário fizer o login será gerado um token de verificação para autenticar o acesso.
* <b>Verificar os dados do usuário logado</b>: Verifica se o usuário esta logado através do token e se estiver, exibe os dados do cadastro.
* <b>Alterar os dados do usuário logado</b>: Verifica se o usuário está logado através do token e se estiver, permite alterar os dados. O email deve ser único, retornando uma mensagem de erro, caso não seja.
* <b>Listar categorias</b>: Lista todas as categorias que podem ser usadas no sistema.
## :wrench: Tecnologias utilizadas
* Node.js, Express, pg, postgresql, nodemon, bcrypt, jsonwebtoken, knex, cors, dotenv, joi, axios, multer, aws-sdk, handlebars e fs.

## :rocket: Rodando o projeto
Para rodar localmente, clone o repositório, e instale as seguintes bibliotecas:
```
npm install express,
npm install -D nodemon,
npm install bcrypt,
npm install jsonwebtoken,
npm install pg,
npm install knex,
npm install cors,
npm install dotenv,
npm install joi,
npm install axios,
npm install multer,
npm install aws-sdk,
npm install handlebars,
npm install fs

```
OBS: Lembre-se de configurar um arquivo .env com as variáveis de ambiente necessárias.


## :outbox_tray: Deploy
* Fizemos o deploy da API com a ferramenta gratuita [Cyclic](https://www.cyclic.sh/), e a criação de banco de dados no [ElephantSQL](https://www.elephantsql.com/).
* [Link do Deploy](https://doubtful-cyan-harp-seal.cyclic.app/)

## :handshake: Colaboradores
* [Geana Almeida](http://github.com/Geana-Almeida).
* [Darlliane Souza](http://github.com/Darllisouza).
* [Jéssica Wandrey](http://github.com/jwandrey).
* [Leticia Ribeiro](http://github.com/lettribeiros).
* [Luelen Cavalheiro](http://github.com/luelencavalheiro).
