# Antonio Lima Marcenaria - E-commerce de Portas Artesanais

## Descrição
Sistema de e-commerce especializado em portas artesanais de madeira maciça, com foco na experiência do usuário e funcionalidades completas de compra.

## Funcionalidades Implementadas

### 🏠 Página Inicial
- Listagem de produtos em cards responsivos
- Navegação intuitiva
- Design moderno e limpo

### 🚪 Página de Produto Detalhada
- **Galeria interativa** com múltiplas imagens em alta qualidade
- **Miniaturas clicáveis** para navegação entre fotos
- **Placeholder para vídeo** do produto (mostrando material e movimento)
- **Variações de acabamento** (Natural, Encerado, Vernizado) com preços diferentes
- **Atualização dinâmica** da imagem principal ao selecionar variações
- **Seleção de medidas** padrão e personalizadas
- **Controles de quantidade** integrados
- **Botão "Adicionar ao Carrinho"** com validação

### 🛒 Sistema de Carrinho Completo
- **Contexto global** com React Context para gerenciar o estado
- **Persistência** no localStorage para manter itens entre sessões
- **Adição/remoção** de produtos com variações e medidas personalizadas
- **Controles de quantidade** com validação
- **Cálculo automático** de subtotais, frete e total
- **Interface responsiva** com animações suaves
- **Badge de contagem** no menu principal
- **Integração completa** com a página de produto

### 🔐 Sistema de Autenticação Completo
- **NextAuth.js** integrado com autenticação por credenciais
- **Páginas de login e registro** com validação completa
- **Recuperação de senha** funcional
- **Sessões persistentes** com JWT
- **Proteção de rotas** para usuários autenticados
- **Menu dinâmico** com opções de usuário logado
- **Dropdown de usuário** com navegação para perfil e configurações

### 👤 Perfil do Usuário
- **Página de perfil completa** com navegação por abas
- **Informações pessoais** editáveis
- **Histórico de pedidos** (estrutura preparada)
- **Gestão de endereços** (estrutura preparada)
- **Sistema de favoritos** (estrutura preparada)
- **Configurações de notificações** com toggles
- **Interface responsiva** e intuitiva

### 📱 Interface e UX
- **Design responsivo** para todos os dispositivos
- **Interface moderna** com animações e transições
- **CSS modular** para melhor organização
- **TypeScript** para tipagem estática
- **Componentes React** otimizados
- **Layout grid** responsivo e flexível

## Tecnologias Utilizadas

- **Next.js 14** com App Router
- **TypeScript** para tipagem estática
- **NextAuth.js** para autenticação
- **bcryptjs** para hash de senhas
- **CSS Modules** para estilização
- **React Hooks** para gerenciamento de estado
- **Design responsivo** para todos os dispositivos

## Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── auth.module.css
│   ├── perfil/
│   │   ├── page.tsx
│   │   └── perfil.module.css
│   └── produto/
│       ├── [id]/
│       │   └── page.tsx (Página de Produto)
│       └── product.module.css
├── components/
│   ├── CardProduct.tsx
│   ├── cardProduct.module.css
│   ├── Cart.tsx
│   ├── cart.module.css
│   ├── Footer.tsx
│   ├── footer.module.css
│   ├── Menu.tsx
│   ├── menu.module.css
│   └── SessionProvider.tsx
├── contexts/
│   └── CartContext.tsx
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts
```

## Características Técnicas

### Autenticação
- **NextAuth.js** com provider de credenciais
- **Hash seguro** de senhas com bcryptjs
- **Sessões JWT** persistentes
- **Proteção de rotas** automática
- **Contexto de sessão** global

### Carrinho de Compras
- **Contexto React** para estado global
- **Persistência local** com localStorage
- **Validação de dados** em tempo real
- **Cálculos automáticos** de preços
- **Suporte a variações** e medidas personalizadas

### Responsividade
- Design mobile-first
- Breakpoints em 1024px, 768px e 480px
- Layout adaptativo para tablets e smartphones
- Formulários otimizados para dispositivos móveis

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   # .env.local
   NEXTAUTH_SECRET=sua-chave-secreta-aqui
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar:**
   - Home: `http://localhost:3000`
   - Produto: `http://localhost:3000/produto/1` ou `/produto/2`
   - Login: `http://localhost:3000/auth/login`
   - Registro: `http://localhost:3000/auth/register`
   - Perfil: `http://localhost:3000/perfil`

## Credenciais de Demonstração

### Usuário Normal
- **Email:** joao@exemplo.com
- **Senha:** password

### Administrador
- **Email:** admin@marcenaria.com
- **Senha:** password

## Funcionalidades dos Formulários

### Login
- Validação de email e senha
- Mensagens de erro personalizadas
- Redirecionamento automático após login
- Estado de loading durante autenticação

### Registro
- Validação completa de dados
- Confirmação de senha
- Validação de CPF e telefone
- Termos de uso e política de privacidade
- Redirecionamento para login após registro

### Recuperação de Senha
- Validação de email
- Simulação de envio de email
- Instruções claras para o usuário
- Links para outras páginas de autenticação

## Perfil do Usuário

### Abas Disponíveis
1. **Informações Pessoais** - Dados básicos editáveis
2. **Meus Pedidos** - Histórico de compras (estrutura preparada)
3. **Meus Endereços** - Gestão de endereços (estrutura preparada)
4. **Favoritos** - Produtos favoritados (estrutura preparada)
5. **Configurações** - Preferências de notificações

### Funcionalidades
- **Avatar personalizado** com inicial do nome
- **Formulários responsivos** com validação
- **Toggles de configuração** para notificações
- **Estados vazios** com call-to-action
- **Navegação por abas** intuitiva

## Personalização

### Produtos
- Adicione novos produtos no array `products` em `page.tsx`
- Inclua imagens na pasta `public/`
- Configure variações, especificações e avaliações

### Autenticação
- Modifique usuários padrão em `api/auth/[...nextauth]/route.ts`
- Personalize campos de registro em `auth/register/page.tsx`
- Ajuste validações e mensagens de erro

### Estilos
- Modifique arquivos CSS para personalizar cores e layout
- Use variáveis CSS para consistência visual
- Mantenha a responsividade ao fazer alterações

## Próximos Passos Sugeridos

### **Alta Prioridade (MVP)**
- [x] ✅ Sistema de usuários e autenticação
- [x] ✅ Sistema de carrinho de compras
- [ ] Sistema de pagamento (Mercado Pago/Stripe)
- [ ] Checkout completo funcional
- [ ] Gestão básica de estoque

### **Média Prioridade**
- [ ] Painel administrativo
- [ ] Sistema de frete com APIs
- [ ] Busca e filtros avançados
- [ ] Sistema de avaliações completo
- [ ] Integração com banco de dados

### **Baixa Prioridade**
- [ ] Marketing avançado e cupons
- [ ] Funcionalidades premium
- [ ] Internacionalização
- [ ] Aplicativo móvel

## Suporte

Para dúvidas ou sugestões, entre em contato através dos canais disponíveis na aplicação.

## Segurança

- **Senhas hasheadas** com bcryptjs
- **Sessões JWT** seguras
- **Proteção de rotas** para usuários autenticados
- **Validação de dados** em todos os formulários
- **HTTPS obrigatório** em produção
