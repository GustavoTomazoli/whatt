# Whatt — Live Commerce Brasil (MVP)

Monorepo com arquitetura inicial para um app estilo Whatnot, focado no Brasil:

- **Mobile (React Native/Expo)** para compradores e vendedores.
- **Backend Node.js (Fastify + Socket.IO + Prisma/PostgreSQL + Redis)** para APIs, eventos em tempo real e leilões.
- **Admin Web (React + Vite)** para operação da plataforma.

## Estrutura

- `backend/`: API REST, WebSocket, regras de leilão e pagamentos.
- `mobile/`: app iOS/Android com feed de lives, chat e lances.
- `admin/`: painel administrativo.
- `docs/`: arquitetura, LGPD, deploy e roadmap.

## Funcionalidades do MVP

- Autenticação JWT com papéis: buyer, seller, admin.
- Lives com status e agenda.
- Leilão em tempo real com contagem e maior lance.
- Chat em tempo real com moderação básica.
- Fluxo de pagamento com abstração para PIX/cartão.
- Pedidos, pós-venda e histórico.
- Painel admin para aprovar vendedores e monitorar métricas.

## Como rodar (resumo)

### 1) Infra local

```bash
docker compose up -d postgres redis
```

### 2) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run prisma:migrate
npm run dev
```

### 3) Mobile

```bash
cd mobile
npm install
npm run start
```

### 4) Admin

```bash
cd admin
npm install
npm run dev
```

## Deploy

Veja `docs/deploy.md` para estratégia com containers, CDN e observabilidade.

## LGPD

Veja `docs/lgpd.md` para bases legais, retenção e direitos dos titulares.
