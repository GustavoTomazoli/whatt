# API do MVP

## Auth
- `POST /auth/register`
- `POST /auth/login`

## Lives
- `GET /lives/active`
- `POST /lives`

## Auction
- `POST /auctions/:auctionId/bid`
- `POST /auctions/:auctionId/close`

## Chat
- `POST /lives/:liveId/chat`

## Payments
- `POST /payments/checkout`

## Orders
- `GET /orders/:userId`

## Admin
- `PATCH /admin/sellers/:sellerId/approve`
- `GET /admin/metrics`

## Eventos socket
- client -> server: `live:join`, `auction:join`, `chat:send`
- server -> client: `chat:newMessage`, `auction:newBid`, `auction:closed`
