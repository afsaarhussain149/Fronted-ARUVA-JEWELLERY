import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { OurStoryComponent } from './components/our-story/our-story.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { CollectionsTeaserComponent } from './components/collections-teaser/collections-teaser.component';
import { NewsletterFormComponent } from '../../shared/components/newsletter-form/newsletter-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CategoriesComponent,
    BestSellersComponent,
    OurStoryComponent,
    ReviewsComponent,
    CollectionsTeaserComponent,
    NewsletterFormComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
