# Deploy sugerido

## Backend
- Build de imagem Docker.
- Deploy em Kubernetes/ECS/Fly/Render com autoscaling.
- Variáveis seguras em secret manager.

## Banco e cache
- PostgreSQL gerenciado com read replicas.
- Redis gerenciado para pub/sub e fila.

## Mobile
- Build EAS (Expo) para iOS e Android.
- Distribuição via TestFlight e Play Internal Test.

## Admin
- Build estático em CDN (Vercel/Netlify/S3+CloudFront).

## Observabilidade
- Logs: Datadog/ELK.
- Métricas: Prometheus + Grafana.
- Alertas de latência, erro de pagamento e queda de eventos em tempo real.
