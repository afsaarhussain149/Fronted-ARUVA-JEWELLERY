import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { processImage } from '../utils/image-processor';
import { ProductRow, mapProduct } from './product.service';
import { SupabaseService } from './supabase.service';

const BUCKET = 'product-images';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private sb = inject(SupabaseService).client;

  /** Admins can see all products, including inactive ones */
  async listAll(): Promise<Product[]> {
    const { data, error } = await this.sb
      .from('products')
      .select('*')
      .order('sort_order')
      .order('id');
    if (error) throw error;
    return (data as ProductRow[]).map(mapProduct);
  }

  async update(
    id: number,
    patch: { price: number; mrp: number; image: string; gallery: string[] },
  ): Promise<void> {
    const { data, error } = await this.sb
      .from('products')
      .update(patch)
      .eq('id', id)
      .select('id');
    if (error) throw error;
    // If RLS blocks the update, no error is thrown; 0 rows are updated instead
    if (!data || data.length === 0) throw new Error('Update not allowed');
  }

  /** Crops and compresses the photo, uploads it to Supabase Storage and returns its public URL */
  async uploadImage(file: File): Promise<string> {
    const blob = await processImage(file);
    const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
    const path = `products/${crypto.randomUUID()}.${ext}`;

    const { error } = await this.sb.storage.from(BUCKET).upload(path, blob, {
      contentType: blob.type,
      cacheControl: '31536000',
      upsert: false,
    });
    if (error) throw new Error('Upload failed: ' + error.message);

    return this.sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }
}
