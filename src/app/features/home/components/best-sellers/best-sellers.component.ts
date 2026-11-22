import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './best-sellers.component.html',
})
export class BestSellersComponent {
  private productService = inject(ProductService);
  products = signal<Product[]>([]);
  stars = [1, 2, 3, 4, 5];

  constructor() {
    this.productService.getBestSellers()
      .then(p => this.products.set(p))
      .catch(() => this.products.set([]));
  }
}
