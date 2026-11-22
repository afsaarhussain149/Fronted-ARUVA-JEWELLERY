import { Injectable, inject } from '@angular/core';
import { Category, CollectionItem, JewelType, Product, Review } from '../models/product.model';
import { SupabaseService } from './supabase.service';

const P = '/images/products/';

/** One row of the Supabase `products` table */
export interface ProductRow {
  id: number;
  name: string;
  price: number | string;
  mrp: number | string;
  rating: number;
  reviews: number;
  badge: string | null;
  type: JewelType;
  image: string;
  gallery: string[] | null;
  description: string | null;
  material: string | null;
  is_active: boolean;
}

export function mapProduct(r: ProductRow): Product {
  return {
    id: r.id,
    name: r.name,
    price: Number(r.price),
    mrp: Number(r.mrp),
    rating: r.rating,
    reviews: r.reviews,
    badge: r.badge ?? undefined,
    type: r.type,
    image: r.image,
    gallery: r.gallery && r.gallery.length ? r.gallery : undefined,
    description: r.description ?? undefined,
    material: r.material ?? undefined,
    isActive: r.is_active,
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private sb = inject(SupabaseService).client;

  // ---------- Products (Supabase se) ----------

  private async fetchActive(): Promise<Product[]> {
    const { data, error } = await this.sb
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')
      .order('id');
    if (error) throw error;
    return (data as ProductRow[]).map(mapProduct);
  }

  getAllProducts(): Promise<Product[]> {
    return this.fetchActive();
  }

  async getBestSellers(): Promise<Product[]> {
    return (await this.fetchActive()).slice(0, 4);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    if (!Number.isInteger(id)) return undefined;
    const { data, error } = await this.sb
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();
    if (error) throw error;
    return data ? mapProduct(data as ProductRow) : undefined;
  }

  // ---------- Static data (abhi ke liye code mein hi) ----------

  getCategories(): Category[] {
    return [
      { name: 'Earrings', slug: 'earrings', type: 'earring', image: P + 'flower-silver-earring-3.jpg' },
      { name: 'Necklaces', slug: 'necklaces', type: 'necklace', image: P + 'drop-silver-necklace-4.jpg' },
      { name: 'Rings', slug: 'rings', type: 'ring', image: P + 'flower-silver-earring-1.jpg' },
      { name: 'Bracelets', slug: 'bracelets', type: 'bracelet', image: P + 'braided-silver-bracelet-3.jpg' },
      { name: 'Pearls', slug: 'pearls', type: 'pearl', image: P + 'heart-pearl-earring-2.jpg' },
    ];
  }

  getReviews(): Review[] {
    return [
      { name: 'Priya Sharma', date: '12 Aug 2025', rating: 5, text: 'Absolutely in love with these earrings! So elegant and lightweight. Perfect for daily wear and the packaging was so premium.' },
      { name: 'Neha Verma', date: '29 Jul 2025', rating: 5, text: 'Exactly as shown in the pictures. Looks even more beautiful in real life. Got so many compliments. Highly recommend ARUVA!' },
      { name: 'Ananya Gupta', date: '15 Jul 2025', rating: 5, text: 'The design is so unique and classy. I wear them to college and even for small functions. Worth every penny!' },
    ];
  }

  getInstagramImages(): string[] {
    return [
      P + 'butterfly-black-gold-earring-1.jpg',
      P + 'heart-pearl-earring-1.jpg',
      P + 'drop-silver-necklace-1.jpg',
      P + 'flower-purple-earring-1.jpg',
      P + 'flower-gold-bracelet-1.jpg',
      P + 'braided-silver-bracelet-1.jpg',
    ];
  }

  getCollections(): CollectionItem[] {
    return [
      { name: 'Butterfly Edit', tags: 'Playful · Statement · Crystal', type: 'earring', count: 6, image: P + 'butterfly-black-gold-earring-2.jpg' },
      { name: 'Floral Bloom', tags: 'Delicate · Feminine · Pearl', type: 'earring', count: 8, image: P + 'flower-purple-earring-2.jpg' },
      { name: 'Silver Necklaces', tags: 'Elegant · Everyday · Timeless', type: 'necklace', count: 6, image: P + 'flower-silver-necklace-3.jpg' },
      { name: 'Bracelets', tags: 'Minimal · Chic · Sparkle', type: 'bracelet', count: 6, image: P + 'braided-silver-bracelet-1.jpg' },
    ];
  }
}
