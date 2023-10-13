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