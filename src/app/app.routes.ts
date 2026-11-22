import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'ARUVA Jewellery — Timeless Elegance',
  },
  {
    path: 'collections',
    loadComponent: () =>
      import('./features/collections/collections.component').then(m => m.CollectionsComponent),
    title: 'Collections — ARUVA Jewellery',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent),
    title: 'Product — ARUVA Jewellery',
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/admin-login/admin-login.component')
        .then(m => m.AdminLoginComponent),
    title: 'Admin Login — ARUVA Jewellery',
  },
  {
    path: 'admin/products',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/admin/admin-products/admin-products.component')
        .then(m => m.AdminProductsComponent),
    title: 'Manage Products — ARUVA Jewellery',
  },
  { path: 'admin', redirectTo: 'admin/products', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
