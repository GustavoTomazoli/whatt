import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export async function orderRoutes(app: FastifyInstance) {
  app.get('/orders/:userId', async (request) => {
    const { userId } = request.params as { userId: string };
    return prisma.order.findMany({ where: { OR: [{ buyerId: userId }, { sellerId: userId }] } });
  });
}
