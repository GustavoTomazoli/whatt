import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';
import { env } from '../../config/env.js';

export async function auctionRoutes(app: FastifyInstance) {
  app.post('/auctions/:auctionId/bid', async (request, reply) => {
    const { auctionId } = request.params as { auctionId: string };
    const { userId, amountCents } = request.body as { userId: string; amountCents: number };

    const auction = await prisma.auction.findUnique({ where: { id: auctionId } });
    if (!auction || auction.status !== 'RUNNING') return reply.badRequest('Leilão indisponível');
    if (amountCents <= auction.highestBidCents) return reply.badRequest('Lance abaixo do atual');

    const bid = await prisma.bid.create({ data: { auctionId, userId, amountCents } });
    await prisma.auction.update({
      where: { id: auctionId },
      data: { highestBidCents: amountCents, highestBidderId: userId },
    });

    app.io.to(`auction:${auctionId}`).emit('auction:newBid', bid);
    return { ok: true, bid };
  });

  app.post('/auctions/:auctionId/close', async (request) => {
    const { auctionId } = request.params as { auctionId: string };
    const auction = await prisma.auction.update({ where: { id: auctionId }, data: { status: 'ENDED' } });

    if (auction.highestBidderId) {
      const fee = Math.floor((auction.highestBidCents * env.APP_FEE_PERCENT) / 100);
      await prisma.order.create({
        data: {
          auctionId,
          buyerId: auction.highestBidderId,
          sellerId: (await prisma.live.findUniqueOrThrow({ where: { id: auction.liveId } })).sellerId,
          amountCents: auction.highestBidCents,
          platformFeeCents: fee,
          sellerNetCents: auction.highestBidCents - fee,
        },
      });
    }

    app.io.to(`auction:${auctionId}`).emit('auction:closed', { auctionId });
    return { ok: true };
  });
}
