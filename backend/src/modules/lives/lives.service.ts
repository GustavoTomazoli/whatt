import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export async function liveRoutes(app: FastifyInstance) {
  app.get('/lives/active', async () => {
    return prisma.live.findMany({ where: { status: 'LIVE' }, orderBy: { startsAt: 'desc' } });
  });

  app.post('/lives', async (request) => {
    const body = request.body as { sellerId: string; title: string; startsAt: string };
    return prisma.live.create({
      data: {
        sellerId: body.sellerId,
        title: body.title,
        startsAt: new Date(body.startsAt),
      },
    });
  });
}
