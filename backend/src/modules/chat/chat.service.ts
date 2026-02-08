import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export async function chatRoutes(app: FastifyInstance) {
  app.post('/lives/:liveId/chat', async (request) => {
    const { liveId } = request.params as { liveId: string };
    const { userId, content } = request.body as { userId: string; content: string };
    const msg = await prisma.chatMessage.create({ data: { liveId, userId, content } });
    app.io.to(`live:${liveId}`).emit('chat:newMessage', msg);
    return msg;
  });
}
