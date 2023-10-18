create table usuarios (
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
 );

create table categorias (
  id serial primary key,
  descricao text not null
 );

insert into categorias (descricao) values 
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

                              --Segunda sprint
create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque integer not null,
  valor decimal not null,
  categoria_id integer not null references categorias(id)
 );

 create table clientes (
 	 id serial primary key,
   nome text not null,
   email text not null unique,
   cpf text not null unique,
   cep text not null,
   rua text not null,
   numero text not null,
   bairro text not null,
   cidade text not null,
   estado text not null
 );
