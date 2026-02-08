import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { env } from './config/env.js';
import { authRoutes } from './modules/auth/auth.service.js';
import { liveRoutes } from './modules/lives/lives.service.js';
import { auctionRoutes } from './modules/auctions/auctions.service.js';
import { chatRoutes } from './modules/chat/chat.service.js';
import { paymentRoutes } from './modules/payments/payments.service.js';
import { orderRoutes } from './modules/orders/orders.service.js';
import { adminRoutes } from './modules/admin/admin.service.js';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}

const fastify = Fastify({ logger: true });
const httpServer = createServer(fastify.server);
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

fastify.decorate('io', io);
await fastify.register(cors, { origin: true });
await fastify.register(jwt, { secret: env.JWT_SECRET });
await fastify.register(sensible);

await authRoutes(fastify);
await liveRoutes(fastify);
await auctionRoutes(fastify);
await chatRoutes(fastify);
await paymentRoutes(fastify);
await orderRoutes(fastify);
await adminRoutes(fastify);

fastify.get('/health', async () => ({ ok: true }));

io.on('connection', (socket) => {
  socket.on('live:join', ({ liveId }) => socket.join(`live:${liveId}`));
  socket.on('auction:join', ({ auctionId }) => socket.join(`auction:${auctionId}`));
  socket.on('chat:send', ({ liveId, message }) => io.to(`live:${liveId}`).emit('chat:newMessage', message));
});

httpServer.listen(env.PORT, '0.0.0.0', () => {
  fastify.log.info(`Backend on ${env.PORT}`);
});
