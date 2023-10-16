![decordar banner](img/decodar-readme.png)


## :memo: Descrição
Este sistema é responsável por gerenciar dados do usuário para realizar o login e fazer alteração no mesmo, além de exibir as categorias que estão disponivel no sistema.

## :books: Funcionalidades
* <b>Cadastro do usuário</b>: Irá realizar o cadastro do usuário contendo o nome, email e senha onde a senha será criptografada. Esses dados irão ser encaminhado para o banco de dados.
* <b>Login de usuário</b>: Irá verificar se o email e a senha está de acordo com oque foi cadastrado no banco de dados e quando o usuário fizer o login será gerado um token de verificação para permiter que seja feito alteração no mesmo.
* <b>Verificar os dados do usuário logado</b>: Verifica se o usuário esta logado através do token e se estiver, exibi os dados dele menos a senha.
* <b>Alterar os dados do usuário logado</b>: Verifica se o usuário esta logado através do token e se estiver, permite alterar os dados verificando se o email é unico.
* <b>Listar categorias</b>: Lista todas as catégorias que podem ser usadas no sistema.
## :wrench: Tecnologias utilizadas
* Node.js, Express, pg, postgresql, nodemon, bcrypt, jsonwebtoken, knex, cors e dotenv.

## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para iniciar o projeto:
```
npm install express,
npm install -D nodemon,
npm install bcrypt,
npm install jsonwebtoken,
npm install pg,
npm install knex,
npm install cors,
npm install dotenv

```

## :soon: Implementação futura
* O que será implementado na próxima sprint?
*   [ ] Será inplementado a 2 sprint do projeto.

## :handshake: Colaboradores
<table>
  <tr align="center">
   <td>
      <a href="http://github.com/Geana-Almeida">
        <img src="img/geana.png" width="100px;" alt="Foto da Geana Almeida"/><br>
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

