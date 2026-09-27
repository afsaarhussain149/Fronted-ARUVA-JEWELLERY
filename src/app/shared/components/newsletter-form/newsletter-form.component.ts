import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter-form.component.html',
})
export class NewsletterFormComponent {
  email = '';
  submitted = signal(false);

  subscribe() {
    if (!this.email.trim()) return;
    // TODO: connect to backend subscribe API later
    this.submitted.set(true);
    this.email = '';
    setTimeout(() => this.submitted.set(false), 4000);
  }
}
