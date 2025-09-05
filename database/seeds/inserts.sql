-- Inserir categorias
INSERT INTO categorias (nome, descricao) VALUES
('Portas', 'Portas de madeira maciça artesanais'),
('Janelas', 'Janelas personalizadas em madeira'),
('Móveis', 'Móveis sob medida'),
('Decoração', 'Pecas decorativas em madeira');

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, email, senha_hash, telefone, endereco) VALUES
('João Silva', 'joao@exemplo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '11999999999', 'Rua das Flores, 123 - São Paulo/SP'),
('Admin', 'admin@marcenaria.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '11988888888', 'Rua Principal, 456 - São Paulo/SP'),
('Maria Santos', 'maria@exemplo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '11977777777', 'Av. Central, 789 - São Paulo/SP');

-- Inserir produtos
INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id) VALUES
('Porta de Madeira Maciça Estilo Mexicana #01', 'Porta artesanal de madeira maciça com design único inspirado na arquitetura mexicana. Fabricada com madeira de lei selecionada e acabamento premium.', 299.99, 5, 1),
('Porta de Madeira Maciça Estilo Mexicana #02', 'Porta artesanal com design contemporâneo e acabamento refinado. Perfeita para ambientes modernos que buscam sofisticação.', 199.99, 8, 1),
('Porta de Madeira Maciça Estilo Mexicana #03', 'Porta com acabamento rústico e charme especial. Ideal para decoração country ou rústica.', 249.99, 3, 1),
('Janela de Madeira com Vidro', 'Janela de madeira maciça com vidro temperado. Perfeita para iluminação natural.', 399.99, 4, 2),
('Mesa de Jantar Rústica', 'Mesa de jantar para 6 pessoas em madeira maciça. Design rústico e durável.', 899.99, 2, 3);

-- Inserir imagens dos produtos
INSERT INTO imagens_produto (produto_id, url, destaque) VALUES
(1, '/porta-mexicana01.webp', true),
(1, '/porta-mexicana02.png', false),
(2, '/porta-mexicana02.png', true),
(2, '/porta-mexicana01.webp', false),
(3, '/porta-mexicana02.png', true),
(4, '/janela-madeira.jpg', true),
(5, '/mesa-rustica.jpg', true);

-- Inserir variações dos produtos
INSERT INTO variacoes (produto_id, nome, valor, preco_extra) VALUES
(1, 'Acabamento', 'Natural', 0.00),
(1, 'Acabamento', 'Encerado', 50.00),
(1, 'Acabamento', 'Vernizado', 80.00),
(2, 'Acabamento', 'Natural', 0.00),
(2, 'Acabamento', 'Encerado', 30.00),
(3, 'Acabamento', 'Natural', 0.00),
(3, 'Acabamento', 'Envelhecido', 40.00);

-- Inserir avaliações
INSERT INTO avaliacoes (produto_id, usuario_id, nota, comentario) VALUES
(1, 1, 5, 'Porta linda e de excelente qualidade! Superou minhas expectativas.'),
(1, 3, 5, 'Acabamento perfeito e instalação foi muito bem feita.'),
(2, 1, 4, 'Muito bonita, só demorou um pouco mais para chegar.'),
(2, 3, 5, 'Qualidade excepcional pelo preço. Recomendo!'),
(3, 1, 5, 'Exatamente como na foto. Madeira de primeira qualidade.'),
(4, 3, 4, 'Janela muito bem feita, ilumina bem o ambiente.'),
(5, 1, 5, 'Mesa linda e resistente. Perfeita para nossa família.');

-- Inserir pedidos de exemplo
INSERT INTO pedidos (usuario_id, status, total, endereco_entrega) VALUES
(1, 'entregue', 299.99, 'Rua das Flores, 123 - São Paulo/SP'),
(1, 'processando', 449.98, 'Rua das Flores, 123 - São Paulo/SP'),
(3, 'pendente', 199.99, 'Av. Central, 789 - São Paulo/SP');

-- Inserir itens dos pedidos
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 1, 299.99),
(2, 2, 1, 199.99),
(2, 3, 1, 249.99),
(3, 2, 1, 199.99);

-- Inserir pagamentos
INSERT INTO pagamentos (pedido_id, metodo, status, valor, transacao_id) VALUES
(1, 'pix', 'aprovado', 299.99, 'PIX123456789'),
(2, 'cartao', 'processando', 449.98, 'CARD987654321'),
(3, 'pix', 'pendente', 199.99, 'PIX111222333');
