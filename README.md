# Littlethings Store

A small MERN shop with a React storefront, Express API, MongoDB products and orders, and JWT sign-in.

## Project structure

```
frontend/src/
  components/   Page sections, product cards, cart and account dialogs
  data/         Demo catalog and category names
  hooks/        Cart, product filters, and account state
  services/     Calls to the Express API
  utils/        Price and image helpers
  App.jsx       Puts the page sections together

backend/
  data/         Starter products for a new database
  middleware/   Authentication and async error handling
  models/       User, product, and order schemas
  routes/       Auth, product, and order endpoints
  server.js     Express setup and database startup
```

## Run it locally

1. Install Node.js and start MongoDB locally, or use a MongoDB Atlas connection string.
2. In `backend`, copy `.env.example` to `.env`. Set `MONGO_URI` and a private `JWT_SECRET`.
3. Open a terminal in `backend` and run:

   ```sh
   npm install
   npm run dev
   ```

4. In a second terminal, open `frontend` and run:

   ```sh
   npm install
   npm run dev
   ```

5. Open the Vite address shown in the terminal (usually http://localhost:5173). On first API start, eight sample products are added if the database is empty.

## Included

- Product catalog with search, category filters, sorting, and saved favorites
- Persistent shopping bag with quantity controls
- Account registration and sign-in with hashed passwords and JWTs
- Authenticated checkout and order history endpoint
- Admin-protected product and order management endpoints
- Responsive storefront and a newsletter signup demo

To make an account an admin for local development, register normally first, then update that user's `role` to `admin` in the MongoDB `users` collection. Admin API routes are `POST/PUT/DELETE /api/products`, `GET /api/orders`, and `PATCH /api/orders/:id/status`.

Orders are stored in MongoDB, but this starter does not connect a real payment provider. The newsletter form is a front-end demo.
