# PrimeCommerce

A full-stack e-commerce web application built with React and Vite, featuring a customer-facing storefront and a separate admin dashboard.

## Features

**Storefront**
- 3D interactive hero section (Three.js / React Three Fiber)
- Product browsing with category filtering, search, and sorting
- Product detail pages with variant selection (color, size)
- Cart, Wishlist, and Recently Viewed functionality
- Checkout powered by [Chapa](https://chapa.co) payment gateway
- Multi-currency support
- Responsive design with Tailwind CSS

**Admin Dashboard**
- Sales analytics with charts (Recharts)
- Purchase & product approval queues
- User and product management
- Category management
- Finance overview
- Out-of-stock monitoring

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Routing | React Router v7 |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Admin Charts | Recharts |
| Icons | Lucide React |
| Payments | Chapa |
| Backend (proxy) | Node.js (port 4000) |

## Project Structure

```
Frontend/
├── src/                  # Customer storefront
│   ├── components/       # Layout, UI, and product components
│   ├── context/          # Cart, Wishlist, Currency, Toast contexts
│   ├── data/             # Static product data
│   ├── lib/              # Chapa helpers, currency utils
│   └── pages/            # Home, Products, Cart, Wishlist, etc.
├── admin/                # Admin dashboard (separate Vite app)
│   └── src/
│       ├── components/   # Dashboard, Sidebar, Charts
│       └── pages/        # Approvals, Users, Finance, etc.
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Frontend
   ```

2. Install storefront dependencies:
   ```bash
   npm install
   ```

3. Install admin dashboard dependencies:
   ```bash
   cd admin && npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your values in `.env`:
   ```
   FRONTEND_ORIGIN=http://localhost:5173
   SERVER_BASE_URL=http://localhost:4000
   PORT=4000
   CHAPA_SECRET_KEY=your_chapa_secret_key
   CHAPA_WEBHOOK_SECRET=your_webhook_secret
   ```

### Running the App

**Storefront** (http://localhost:5173):
```bash
npm run dev
```

**Admin Dashboard** (http://localhost:5174):
```bash
cd admin && npm run dev
```

**Backend server**:
```bash
npm run server
```

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, new arrivals, categories, best sellers |
| `/products` | Product listing with filters |
| `/products/:id` | Product detail with variant picker |
| `/cart` | Shopping cart |
| `/wishlist` | Saved items |
| `/login` / `/register` | Authentication |
| `/about` | About page |
| `/faq` | FAQ |
| `/returns` | Returns policy |
| `/privacy-policy` | Privacy policy |

## Environment Variables

| Variable | Description |
|---|---|
| `FRONTEND_ORIGIN` | Storefront URL (for CORS) |
| `SERVER_BASE_URL` | Backend API base URL |
| `PORT` | Backend server port |
| `CHAPA_SECRET_KEY` | Chapa payment secret key |
| `CHAPA_WEBHOOK_SECRET` | Chapa webhook verification secret |

## License

MIT
