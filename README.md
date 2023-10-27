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
* Node.js, Express, pg, postgresql, nodemon, bcrypt, jsonwebtoken, knex, cors e dotenv.

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
npm install dotenv
npm install joi
npm install axios
```
OBS: Lembre-se de configurar um arquivo .env com as variáveis de ambiente necessárias.

## :soon: Implementação futura
* Na segunda sprint haverão mais funcionalidades, em breve incluídas neste repositório.

## :outbox_tray: Deploy
* Fizemos o deploy da API com a ferramenta gratuita [Cyclic](https://www.cyclic.sh/), e a criação de banco de dados no [ElephantSQL](https://www.elephantsql.com/).
* [Link do Deploy](https://doubtful-cyan-harp-seal.cyclic.app/)

## :handshake: Colaboradores
<table>
  <tr align="center">
   <td>
      <a href="http://github.com/Geana-Almeida">
        <img src="img/geana.jpeg" width="100px;" border-radius= "50px;" alt="Foto da Geana Almeida"  /><br>
        <sub>
          <b>Geana Almeida</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="http://github.com/Darllisouza">
        <img src="img/darli.png" width="100px;" alt="Foto da darlliane"/><br>
        <sub>
          <b>darlliane</b>
        </sub>
      </a>
    </td>
    </td>
    <td align="center">
      <a href="http://github.com/jwandrey">
        <img src="img/jess (2).png" width="100px;" alt="Foto da Jéssica"/><br>
        <sub>
          <b>Jéssica</b>
        </sub>
      </a>
    </td>
    <td align="center">
        <a href="http://github.com/lettribeiros">
          <img src="img/leticia (2).png" width="100px;" alt="Foto da Leticia"/><br>
          <sub>
            <b>Leticia</b>
          </sub>
        </a>
      </td>
    <td align="center">
        <a href="http://github.com/luelencavalheiro">
          <img src="img/leticia (2).png" width="100px;" alt="Foto da Luelen"/><br>
          <sub>
            <b>Luelen Cavalheiro</b>
          </sub>
        </a>
      </td>
  </tr>
   
</table>
