# ARUVA Jewellery — Frontend (Angular 19 + Tailwind CSS)

Ye ek **frontend-only** Angular 19 project hai, jo diye gaye design (Home page ke saare sections + alag Collections page) ke mutaabiq banaya gaya hai. Backend abhi connect nahi hai — saara data `ProductService` (`src/app/core/services/product.service.ts`) mein mock data ke roop mein hai. Baad mein isi service ke andar HTTP calls laga kar backend se connect kiya ja sakta hai, baaki UI code same rahega.

## Kaise chalayein

```bash
npm install
npm start        # http://localhost:4200 par dev server
```

Production build:
```bash
npm run build     # output: dist/aruva-jewellery
```

## Tech Stack
- **Angular 19** (standalone components, signals)
- **Tailwind CSS 3** (utility-first styling, custom theme in `tailwind.config.js`)
- **Route-level lazy loading** — Home aur Collections dono `loadComponent()` se lazy-loaded hain, isliye pehli load par sirf zaroori code aata hai.
- Product/category images ki jagah **inline SVG illustrations** (`shared/components/jewel-visual`) use kiye gaye hain — isse site bina kisi external image ke bhi turant load hoti hai; baad mein real photos daalne ke liye bas is component ko `<img [src]>` se replace karna hoga.

## Folder Structure

```
src/app/
├── core/
│   ├── models/product.model.ts       # TypeScript interfaces
│   └── services/product.service.ts   # Mock data (replace with API calls later)
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
│   └── collections/                  # Separate lazy-loaded page (/collections)
├── app.component.ts/html             # Root shell: Header + <router-outlet> + Footer
├── app.routes.ts                     # Route config (lazy loaded)
└── app.config.ts                     # Providers (router, scroll restoration)
```

## Pages / Routes
| Route          | Component              | Loading   |
|----------------|-------------------------|-----------|
| `/`            | `HomeComponent`         | Lazy (loadComponent) |
| `/collections` | `CollectionsComponent`  | Lazy (loadComponent), supports `?category=earrings` etc filter |

## Responsive
Fully responsive with Tailwind breakpoints (`sm`, `md`, `lg`) — mobile hamburger menu, stacked grids on small screens, tested layout from ~360px width upward.

## Next Steps (Backend Integration)
1. `ProductService` ke mock methods (`getCategories`, `getBestSellers`, `getAllProducts`, `getCollections`, `getReviews`) ko `HttpClient` calls se replace karein.
2. Cart / Wishlist state ke liye ek `CartService` / `WishlistService` add karein (abhi UI buttons hain, functionality baad mein).
3. Auth (login/signup) ke liye account icon par route add karein.
4. Product detail page (`/product/:id`) add kar sakte hain jab backend product data ready ho.
