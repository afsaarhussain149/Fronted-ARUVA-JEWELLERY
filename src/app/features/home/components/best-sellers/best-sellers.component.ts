import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './best-sellers.component.html',
})
export class BestSellersComponent {
  private productService = inject(ProductService);
  products = this.productService.getBestSellers();
  stars = [1, 2, 3, 4, 5];
}
