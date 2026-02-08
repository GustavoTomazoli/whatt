import { FastifyInstance } from 'fastify';

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', async () => {
    return { token: 'mock-jwt-token', role: 'BUYER' };
  });

  app.post('/auth/register', async () => {
    return { ok: true, message: 'Usuário registrado (MVP mock).' };
  });
}
