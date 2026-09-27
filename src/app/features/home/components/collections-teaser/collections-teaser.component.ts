import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-collections-teaser',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collections-teaser.component.html',
})
export class CollectionsTeaserComponent {
  private productService = inject(ProductService);
  collections = this.productService.getCollections().slice(0, 3);
}
