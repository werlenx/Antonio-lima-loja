# 🪵 Antonio Lima Marcenaria - E-commerce

E-commerce completo para marcenaria artesanal com portas de madeira maciça personalizadas.

## 🏗️ Arquitetura do Projeto

```
AntonioLimaMarcenaria/
├── frontend/                 # Next.js 15 (React)
├── backend/                  # Node.js + Express + PostgreSQL
├── database/                 # Scripts SQL e configurações
├── docker-compose.yml        # Orquestração de todos os serviços
└── README.md
```

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** com App Router
- **React 19** com TypeScript
- **NextAuth.js** para autenticação
- **CSS Modules** para estilização
- **Axios** para requisições HTTP

### Backend
- **Node.js** com Express
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **Express Validator** para validação

### Infraestrutura
- **Docker** e **Docker Compose**
- **PostgreSQL 15** em container
- **Nginx** (opcional para produção)

## 📋 Funcionalidades

### 🛍️ E-commerce
- ✅ Catálogo de produtos com imagens
- ✅ Página de produto detalhada
- ✅ Carrinho de compras persistente
- ✅ Sistema de variações (acabamentos)
- ✅ Medidas personalizadas
- ✅ Avaliações de clientes
- ✅ FAQ dinâmico

### 👤 Autenticação
- ✅ Login e registro de usuários
- ✅ Perfil do usuário
- ✅ Recuperação de senha
- ✅ Sessões seguras com JWT

### 🎨 Interface
- ✅ Design responsivo
- ✅ Menu de navegação
- ✅ Busca de produtos
- ✅ Carrinho lateral
- ✅ Formulários de contato

## 🛠️ Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd AntonioLimaMarcenaria
```

### 2. Execute com Docker (Recomendado)
```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 3. Desenvolvimento Local

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Banco de Dados
```bash
# Usar o PostgreSQL do Docker
docker-compose up postgres -d

# Ou executar migrações manualmente
cd backend
npm run migrate
npm run seed
```

## 🌐 URLs de Acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## 📊 Estrutura do Banco de Dados

### Tabelas Principais
- `usuarios` - Dados dos usuários
- `produtos` - Catálogo de produtos
- `categorias` - Categorias de produtos
- `imagens_produto` - Imagens dos produtos
- `variacoes` - Variações (acabamentos, cores)
- `avaliacoes` - Avaliações dos clientes
- `pedidos` - Pedidos realizados
- `itens_pedido` - Itens dos pedidos
- `pagamentos` - Dados de pagamento

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=marcenaria
DB_USER=admin
DB_PASSWORD=admin
PORT=3001
JWT_SECRET=sua-chave-secreta
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta
```

## 📱 APIs Disponíveis

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário
- `PUT /api/auth/profile` - Atualizar perfil

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Produto específico
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Excluir produto (admin)

### Categorias
- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Categoria específica
- `POST /api/categories` - Criar categoria (admin)

## 🎯 Próximos Passos

- [ ] Sistema de pedidos completo
- [ ] Integração com gateway de pagamento
- [ ] Painel administrativo
- [ ] Upload de imagens
- [ ] Sistema de notificações
- [ ] Relatórios de vendas
- [ ] SEO otimizado
- [ ] PWA (Progressive Web App)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

**Antonio Lima Marcenaria**
- Website: [em breve]
- Email: contato@antoniolimamarcenaria.com
- WhatsApp: (11) 99999-9999

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
