import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { JewelType } from '../../core/models/product.model';


@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './collections.component.html',
})
export class CollectionsComponent {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  allProducts = this.productService.getAllProducts();
  curatedCollections = this.productService.getCollections();
  categories = this.productService.getCategories();
  stars = [1, 2, 3, 4, 5];

  activeFilter = signal<JewelType | 'all'>('all');

  filteredProducts = computed(() => {
    const f = this.activeFilter();
    return f === 'all' ? this.allProducts : this.allProducts.filter(p => p.type === f);
  });

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const cat = params.get('category');
      const found = this.categories.find(c => c.slug === cat);
      this.activeFilter.set(found ? found.type : 'all');
    });
  }

  setFilter(type: JewelType | 'all') {
    this.activeFilter.set(type);
  }
}
