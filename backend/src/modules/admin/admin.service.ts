import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export async function adminRoutes(app: FastifyInstance) {
  app.patch('/admin/sellers/:sellerId/approve', async (request) => {
    const { sellerId } = request.params as { sellerId: string };
    return prisma.sellerProfile.update({ where: { userId: sellerId }, data: { isApproved: true } });
  });

  app.get('/admin/metrics', async () => {
    const [users, live, orders] = await Promise.all([
      prisma.user.count(),
      prisma.live.count({ where: { status: 'LIVE' } }),
      prisma.order.count(),
    ]);

    return { users, live, orders };
  });
}
