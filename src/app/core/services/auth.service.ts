import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sb = inject(SupabaseService).client;

  /** Email of the logged-in admin (shown in the UI) */
  email = signal<string | null>(null);

  /**
   * Returns true if a session exists AND the database is_admin() check confirms the user is an admin.
   * This check runs on the server, so it cannot be bypassed by changing anything in the browser.
   */
  async checkAdmin(): Promise<boolean> {
    const { data: { session } } = await this.sb.auth.getSession();
    if (!session) {
      this.email.set(null);
      return false;
    }
    const { data, error } = await this.sb.rpc('is_admin');
    if (error || data !== true) {
      this.email.set(null);
      return false;
    }
    this.email.set(session.user.email ?? null);
    return true;
  }

  async login(email: string, password: string): Promise<void> {
    const { error } = await this.sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Invalid email or password');

    // Logged in but not an admin -> sign out immediately (same generic message)
    if (!(await this.checkAdmin())) {
      await this.sb.auth.signOut();
      throw new Error('Invalid email or password');
    }
  }

  async logout(): Promise<void> {
    await this.sb.auth.signOut();
    this.email.set(null);
  }
}
