# ARUVA Jewellery — Frontend (Angular 19 + Tailwind CSS)

An Angular 19 storefront built to the provided design (all Home page sections + a separate Collections page and a Product detail page). Product data comes from **Supabase**, and an **admin panel** lets the owner change product prices and photos. Categories, curated collections, reviews and the Instagram grid are still static data inside `ProductService` (`src/app/core/services/product.service.ts`).

## How to run

```bash
npm install
npm start        # dev server at http://localhost:4200
```

Production build:
```bash
npm run build     # output: dist/aruva-jewellery
```

## Tech Stack
- **Angular 19** (standalone components, signals)
- **Tailwind CSS 3** (utility-first styling, custom theme in `tailwind.config.js`)
- **Supabase** (Postgres database, Auth and Storage) via `@supabase/supabase-js`
- **Route-level lazy loading** — every page is lazy-loaded with `loadComponent()`, so only the required code is loaded on the first visit.

## Backend setup (Supabase)
- Products live in the `products` table. Row Level Security (RLS) lets everyone read active products, while only users listed in the `admins` table can create, update or delete them.
- Product photos uploaded from the admin panel are stored in the public `product-images` Storage bucket.
- The Supabase URL and publishable key are in `src/app/core/config/supabase.config.ts`. Never put a secret / `service_role` key in the frontend.

## Admin panel
| Route | Purpose |
|-------|---------|
| `/admin/login` | Email + password login (public sign-ups are disabled in Supabase) |
| `/admin/products` | Edit product price, MRP and photos (protected by `adminGuard`) |

The route guard is only for user experience. Real security is enforced by the database through RLS.

**Photo rules:** photos must be square (1:1), best size 1200 × 1200 px, minimum 800 × 800 px, JPG / PNG / WebP up to 10 MB. The admin panel center-crops non-square photos, resizes them to at most 1200 × 1200 px and compresses them to WebP before upload.

## Folder Structure

```
src/app/
├── core/
│   ├── config/supabase.config.ts     # Supabase URL + publishable key
│   ├── guards/admin.guard.ts         # Protects /admin/products
│   ├── models/product.model.ts       # TypeScript interfaces
│   ├── services/
│   │   ├── supabase.service.ts       # Supabase client
│   │   ├── auth.service.ts           # Admin login / logout / admin check
│   │   ├── product.service.ts        # Public product reads + static data
│   │   └── admin-product.service.ts  # Admin reads, updates, photo upload
│   └── utils/image-processor.ts      # Square crop + resize + compress
├── shared/
│   └── components/
│       ├── header/                   # Responsive nav + mobile menu
│       ├── footer/
│       ├── newsletter-form/
│       └── jewel-visual/             # SVG jewellery illustrations
├── features/
│   ├── home/                         # Single-page home (all sections)
│   │   ├── home.component.ts/html
│   │   └── components/
│   │       ├── hero/
│   │       ├── categories/           # Shop by Category
│   │       ├── best-sellers/
│   │       ├── our-story/
│   │       ├── collections-teaser/
│   │       └── reviews/              # Reviews + Instagram grid
│   ├── collections/                  # Separate lazy-loaded page (/collections)
│   ├── product-detail/               # Product page (/product/:id)
│   └── admin/
│       ├── admin-login/              # /admin/login
│       └── admin-products/           # /admin/products
├── app.component.ts/html             # Root shell: Header + <router-outlet> + Footer
├── app.routes.ts                     # Route config (lazy loaded)
└── app.config.ts                     # Providers (router, scroll restoration)
```

## Pages / Routes
| Route             | Component                | Loading   |
|-------------------|--------------------------|-----------|
| `/`               | `HomeComponent`          | Lazy (loadComponent) |
| `/collections`    | `CollectionsComponent`   | Lazy (loadComponent), supports `?category=earrings` etc. filter |
| `/product/:id`    | `ProductDetailComponent` | Lazy (loadComponent) |
| `/admin/login`    | `AdminLoginComponent`    | Lazy (loadComponent) |
| `/admin/products` | `AdminProductsComponent` | Lazy (loadComponent), guarded by `adminGuard` |

## Responsive
Fully responsive with Tailwind breakpoints (`sm`, `md`, `lg`) — mobile hamburger menu, stacked grids on small screens, tested layout from ~360px width upward.

## Next Steps
1. Move the remaining static data (categories, curated collections, reviews) into Supabase tables.
2. Add a `CartService` / `WishlistService` for cart and wishlist state (the UI buttons exist, the functionality does not yet).
3. Add a customer account / login flow if needed.
4. Let the admin edit more fields (name, description, badge, visibility) and manage the hero slider images.