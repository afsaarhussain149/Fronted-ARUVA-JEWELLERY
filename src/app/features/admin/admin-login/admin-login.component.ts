import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

const MAX_FAILS = 5;
const LOCK_MS = 60_000;

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  private fails = 0;
  private lockUntil = 0;

  async ngOnInit() {
    // Pehle se login admin ho to seedha dashboard
    if (await this.auth.checkAdmin()) {
      this.router.navigate(['/admin/products']);
    }
  }

  async submit() {
    if (Date.now() < this.lockUntil) {
      this.error.set('Bahut zyada koshish ho gayi. 1 minute baad dobara try karo.');
      return;
    }
    if (!this.email.trim() || !this.password) {
      this.error.set('Email aur password daalo.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    try {
      await this.auth.login(this.email.trim(), this.password);
      this.fails = 0;
      await this.router.navigate(['/admin/products']);
    } catch {
      this.fails++;
      if (this.fails >= MAX_FAILS) {
        this.lockUntil = Date.now() + LOCK_MS;
        this.fails = 0;
      }
      this.error.set('Email ya password galat hai.');
    } finally {
      this.password = '';
      this.loading.set(false);
    }
  }
}
