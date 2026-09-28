import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private categories = this.productService.getCategories();

  product = signal<Product | undefined>(undefined);
  activeImage = signal('');
  quantity = signal(1);
  wishlisted = signal(false);
  toast = signal('');
  zooming = signal(false);
  zoomOrigin = signal('50% 50%');
  stars = [1, 2, 3, 4, 5];

  images = computed(() => {
    const p = this.product();
    if (!p) return [];
    return p.gallery?.length ? p.gallery : [p.image];
  });

  discount = computed(() => {
    const p = this.product();
    return p ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  });

  category = computed(() => this.categories.find(c => c.type === this.product()?.type));

  related = computed(() =>
    this.productService.getAllProducts().filter(x => x.id !== this.product()?.id).slice(0, 4)
  );

  constructor() {
    this.route.paramMap.subscribe(params => {
      const p = this.productService.getProductById(Number(params.get('id')));
      this.product.set(p);
      this.activeImage.set(p ? (p.gallery?.[0] ?? p.image) : '');
      this.quantity.set(1);
      this.wishlisted.set(false);
      this.toast.set('');
    });
  }

  increase() { this.quantity.update(q => Math.min(q + 1, 10)); }
  decrease() { this.quantity.update(q => Math.max(q - 1, 1)); }

  onEnter(e: PointerEvent) {
    if (e.pointerType === 'mouse') this.zooming.set(true);
  }

  onMove(e: PointerEvent) {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    this.zoomOrigin.set(`${x}% ${y}%`);
  }

  addToCart() {
    // TODO: connect with cart service / backend later
    this.showToast(`Added ${this.quantity()} item(s) to your cart`);
  }

  buyNow() {
    // TODO: go to checkout later
    this.showToast('Checkout will be available soon');
  }

  toggleWishlist() {
    this.wishlisted.update(v => !v);
    this.showToast(this.wishlisted() ? 'Added to wishlist' : 'Removed from wishlist');
  }

  async share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: this.product()?.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        this.showToast('Link copied!');
      }
    } catch {
      /* user cancelled share */
    }
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(''), 2500);
  }
}