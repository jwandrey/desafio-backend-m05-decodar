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

create table produtos (
  id serial primary key,
  descricao text not null,
  quantidade_estoque integer not null,
  valor integer not null,
  categoria_id integer not null references categorias(id)
);

create table clientes (
 	id serial primary key,
  nome text not null,
  email text not null unique,
  cpf text not null unique,
  cep text,
  rua text,
  numero text,
  bairro text,
  cidade text,
  estado text
);

create table pedidos (
  id serial primary key,
  observacao text,
  valor_total integer not null,
  cliente_id integer not null references clientes(id)
);

create table pedido_produtos (
  id serial primary key,
  quantidade_produto integer not null,
  valor_produto integer not null,
  pedido_id integer not null references pedidos(id),
  produto_id integer not null references produtos(id)
);

alter table produtos add column produto_imagem text;