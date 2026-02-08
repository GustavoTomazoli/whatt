import { FastifyInstance } from 'fastify';
import { prisma } from '../../plugins/prisma.js';

export async function paymentRoutes(app: FastifyInstance) {
  app.post('/payments/checkout', async (request) => {
    const { orderId, method } = request.body as { orderId: string; method: 'PIX' | 'CREDIT_CARD' | 'WALLET' };

    const payment = await prisma.payment.create({
      data: {
        orderId,
        method,
        status: method === 'PIX' ? 'PENDING_QR' : 'AUTHORIZED',
        externalRef: `ext_${Date.now()}`,
      },
    });

    return {
      ...payment,
      pixQrCode: method === 'PIX' ? '00020126...BR.GOV.BCB.PIX...' : null,
    };
  });
}
