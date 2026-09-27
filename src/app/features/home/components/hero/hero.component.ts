import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    { eyebrow: 'Timeless Elegance', title: 'The Tulip Bow Drop Earrings', subtitle: 'Delicate. Feminine. Forever.', image: '/images/products/flower-silver-earring-1.jpg' },
    { eyebrow: 'New Arrival', title: 'The Crystal Pearl Cluster Set', subtitle: 'Handcrafted. Radiant. Yours.', image: '/images/products/flower-gold-bracelet-1.jpg' },
    { eyebrow: 'Most Loved', title: 'The Floral Pearl Drops', subtitle: 'Soft petals, endless grace.', image: '/images/products/duplicate-drop-silver-necklace-1.jpg' },
  ];

  active = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timer = setInterval(() => this.next(), 5000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  next() {
    this.active.update(i => (i + 1) % this.slides.length);
  }

  prev() {
    this.active.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(i: number) {
    this.active.set(i);
  }
}
