-- Criação do banco de dados (opcional, remova se já existir)
CREATE DATABASE antoniolima_marcenaria;
\c antoniolima_marcenaria;

-- Tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela de produtos
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco NUMERIC(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    categoria_id INT REFERENCES categorias(id),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de imagens dos produtos
CREATE TABLE imagens_produto (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    destaque BOOLEAN DEFAULT FALSE
);

-- Tabela de pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    status VARCHAR(50) DEFAULT 'pendente',
    total NUMERIC(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    endereco_entrega TEXT
);

-- Tabela de itens do pedido
CREATE TABLE itens_pedido (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
    produto_id INT REFERENCES produtos(id),
    quantidade INT NOT NULL,
    preco_unitario NUMERIC(10,2) NOT NULL
);

-- Tabela de avaliações
CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuarios(id),
    nota INT CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de variações (ex: acabamento, tamanho)
CREATE TABLE variacoes (
    id SERIAL PRIMARY KEY,
    produto_id INT REFERENCES produtos(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    valor VARCHAR(100) NOT NULL,
    preco_extra NUMERIC(10,2) DEFAULT 0
);

-- Tabela de pagamentos
CREATE TABLE pagamentos (
    id SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
    metodo VARCHAR(50),
    status VARCHAR(50),
    valor NUMERIC(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transacao_id VARCHAR(100)
);

-- Índices e constraints extras podem ser adicionados conforme necessidade.