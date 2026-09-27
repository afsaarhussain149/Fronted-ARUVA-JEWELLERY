import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-our-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-story.component.html',
})
export class OurStoryComponent {
  points = [
    { title: 'Premium Quality', subtitle: 'High-grade materials' },
    { title: 'Crafted with Care', subtitle: 'Attention to every detail' },
    { title: 'Inspired by Korea', subtitle: 'Modern & elegant designs' },
  ];
}
