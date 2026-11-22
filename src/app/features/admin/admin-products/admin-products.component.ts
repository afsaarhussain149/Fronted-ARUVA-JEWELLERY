import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { AuthService } from '../../../core/services/auth.service';
import { IMG } from '../../../core/utils/image-processor';

const MAX_PHOTOS = 6;
const MAX_PRICE = 1_000_000;

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-products.component.html',
})
export class AdminProductsComponent implements OnInit {
  private admin = inject(AdminProductService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly IMG = IMG;
  readonly maxMb = IMG.maxFileBytes / 1024 / 1024;
  readonly maxPhotos = MAX_PHOTOS;

  email = this.auth.email;
  products = signal<Product[]>([]);
  loading = signal(true);
  loadError = signal('');

  editing = signal<Product | null>(null);
  images = signal<string[]>([]);
  price = 0;
  mrp = 0;
  busy = signal(false);
  error = signal('');
  success = signal('');

  async ngOnInit() {
    await this.reload();
  }

  get discount(): number {
    const price = Number(this.price);
    const mrp = Number(this.mrp);
    return mrp > 0 && price > 0 && price <= mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  }

  async reload() {
    this.loading.set(true);
    this.loadError.set('');
    try {
      this.products.set(await this.admin.listAll());
    } catch {
      this.loadError.set('Could not load products. Refresh the page or log in again.');
    } finally {
      this.loading.set(false);
    }
  }

  edit(p: Product) {
    this.editing.set(p);
    this.price = p.price;
    this.mrp = p.mrp;
    this.images.set([...(p.gallery?.length ? p.gallery : [p.image])]);
    this.error.set('');
    this.success.set('');
  }

  cancel() {
    if (this.busy()) return;
    this.editing.set(null);
  }

  async onFiles(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = ''; // so the same file can be chosen again
    if (!files.length) return;

    if (this.images().length + files.length > MAX_PHOTOS) {
      this.error.set(`You can keep at most ${MAX_PHOTOS} photos.`);
      return;
    }

    this.busy.set(true);
    this.error.set('');
    try {
      for (const f of files) {
        const url = await this.admin.uploadImage(f);
        this.images.update(a => [...a, url]);
      }
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      this.busy.set(false);
    }
  }

  makeMain(i: number) {
    this.images.update(a => [a[i], ...a.filter((_, k) => k !== i)]);
  }

  remove(i: number) {
    if (this.images().length === 1) {
      this.error.set('At least 1 photo is required.');
      return;
    }
    this.error.set('');
    this.images.update(a => a.filter((_, k) => k !== i));
  }

  async save() {
    const p = this.editing();
    if (!p) return;

    const price = Number(this.price);
    const mrp = Number(this.mrp);
    if (!Number.isFinite(price) || !Number.isFinite(mrp) || price <= 0 || mrp <= 0) {
      this.error.set('Price and MRP must be greater than 0.');
      return;
    }
    if (price > mrp) {
      this.error.set('Price cannot be higher than MRP.');
      return;
    }
    if (mrp > MAX_PRICE) {
      this.error.set('MRP is too high. Please check it again.');
      return;
    }

    const imgs = this.images();
    this.busy.set(true);
    this.error.set('');
    try {
      await this.admin.update(p.id, { price, mrp, image: imgs[0], gallery: imgs });
      await this.reload();
      this.editing.set(null);
      this.success.set(`"${p.name}" saved.`);
    } catch {
      this.error.set('Could not save. Please log in again and retry.');
    } finally {
      this.busy.set(false);
    }
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
