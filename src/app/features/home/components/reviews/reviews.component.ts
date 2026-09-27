import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
})
export class ReviewsComponent {
  private productService = inject(ProductService);
  reviews = this.productService.getReviews();
  stars = [1, 2, 3, 4, 5];
  instagramImages = this.productService.getInstagramImages();
}
