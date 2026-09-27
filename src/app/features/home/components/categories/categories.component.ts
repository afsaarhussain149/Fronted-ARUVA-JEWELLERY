import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  private productService = inject(ProductService);
  categories = this.productService.getCategories();

  perks = [
    { title: 'Premium Quality', subtitle: 'Every piece crafted with care', icon: 'gem' },
    { title: 'Secure Payments', subtitle: 'Safe & trusted checkout', icon: 'lock' },
    { title: 'Free Shipping', subtitle: 'On all orders above ₹999', icon: 'truck' },
  ];
}
