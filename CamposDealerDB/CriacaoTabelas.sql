create database camposDealerDB;
use camposDealerDB;

create table Produtos(
idProduto int not null primary key,
dscProduto varchar(300) not null,
vlrUnitario float not null
);

create table Clientes(
idCliente int not null primary key,
nmCliente varchar(300) not null,
nmCidade varchar(300) not null
);

create table Vendas(
idVenda int not null primary key,
idCliente int not null,
dthVenda datetime2 not null,
vlrTotalVenda float not null,
foreign key (idCliente) REFERENCES Clientes(idCliente)
);

-- NORMALIZAÇÃO DAS TABELAS
create table ProdutosVendas(
idVenda int not null,
idProduto int not null,
qtdVenda float not null,
vlrUnitarioVenda float not null,
foreign key (idVenda) REFERENCES Vendas(idVenda),
foreign key (idProduto) REFERENCES Produtos(idProduto)
);

