import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000';

export function Dashboard() {
  const [metrics, setMetrics] = useState({ users: 0, live: 0, orders: 0 });

  useEffect(() => {
    fetch(`${API_URL}/admin/metrics`)
      .then((res) => res.json())
      .then(setMetrics)
      .catch(() => undefined);
  }, []);

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', background: '#09090b', color: '#fff', minHeight: '100vh', padding: 24 }}>
      <h1>Whatt Admin</h1>
      <p>Painel operacional do marketplace live commerce.</p>
      <ul>
        <li>Usuários: {metrics.users}</li>
        <li>Lives ativas: {metrics.live}</li>
        <li>Pedidos: {metrics.orders}</li>
      </ul>
    </main>
  );
}
