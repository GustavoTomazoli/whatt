# Arquitetura proposta (MVP escalável)

## Componentes

1. **App Mobile (React Native + Expo)**
   - Feed de lives (estilo swipe)
   - Chat e lances em Socket.IO
   - Checkout PIX/cartão/carteira

2. **API Gateway (Fastify)**
   - REST para CRUD e processos de negócio
   - JWT, RBAC e validações

3. **Real-time Engine (Socket.IO + Redis pub/sub)**
   - Eventos de chat e leilão
   - Horizontal scaling via Redis adapter (próximo passo)

4. **Banco principal (PostgreSQL)**
   - Dados transacionais (usuários, pedidos, pagamentos)

5. **Armazenamento de mídia (S3 compatível)
   - Thumbnails, fotos, replays

6. **Admin Panel (React web)**
   - Aprovação de vendedores
   - Monitoramento de métricas e moderação

## Escalabilidade

- Stateless APIs atrás de load balancer.
- Redis para cache, filas e fan-out de eventos.
- CDN para mídia estática.
- Observabilidade com logs estruturados + métricas + tracing.

## Segurança

- JWT curto + refresh token rotativo.
- Rate limiting em endpoints críticos.
- Hash de senha (Argon2/Bcrypt).
- Criptografia em trânsito (TLS) e dados sensíveis.
