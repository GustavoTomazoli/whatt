import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_URL, getActiveLives } from '../api/client';

const socket = io(API_URL);

type Live = { id: string; title: string; startsAt: string };

export function useLiveFeed() {
  const [lives, setLives] = useState<Live[]>([]);

  useEffect(() => {
    getActiveLives().then(setLives).catch(() => setLives([]));
  }, []);

  function joinLive(liveId: string) {
    socket.emit('live:join', { liveId });
  }

  return { lives, joinLive };
}
