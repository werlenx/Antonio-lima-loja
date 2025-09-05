#!/bin/bash

echo "🪵 Iniciando Antonio Lima Marcenaria E-commerce"
echo "=============================================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados"

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Construir e iniciar containers
echo "🏗️ Construindo e iniciando containers..."
docker-compose up --build -d

# Aguardar o banco de dados estar pronto
echo "⏳ Aguardando banco de dados estar pronto..."
sleep 10

# Executar migrações
echo "🔄 Executando migrações do banco de dados..."
docker-compose exec backend npm run migrate

# Executar seed
echo "🌱 Populando banco de dados com dados iniciais..."
docker-compose exec backend npm run seed

echo ""
echo "🎉 Setup concluído com sucesso!"
echo ""
echo "🌐 URLs de acesso:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:3001"
echo "   PostgreSQL: localhost:5432"
echo ""
echo "👤 Credenciais de teste:"
echo "   Email: joao@exemplo.com"
echo "   Senha: password"
echo ""
echo "📊 Para ver os logs:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 Para parar os serviços:"
echo "   docker-compose down"
echo ""
echo "✨ Aproveite o e-commerce!"
