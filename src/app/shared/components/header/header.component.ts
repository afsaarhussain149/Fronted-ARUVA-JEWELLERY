import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

  navLinks = [
    { label: 'Home', link: '/', fragment: undefined },
    { label: 'Shop', link: '/', fragment: 'best-sellers' },
    { label: 'Collections', link: '/collections', fragment: undefined },
    { label: 'About', link: '/', fragment: 'our-story' },
    { label: 'Contact', link: '/', fragment: 'newsletter' },
  ];

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
  }
}
