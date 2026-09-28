import { Injectable } from '@angular/core';
import { Category, CollectionItem, Product, Review } from '../models/product.model';

const P = '/images/products/';

@Injectable({ providedIn: 'root' })
export class ProductService {

  getCategories(): Category[] {
    return [
      { name: 'Earrings', slug: 'earrings', type: 'earring', image: P + 'flower-silver-earring-3.jpg' },
      { name: 'Necklaces', slug: 'necklaces', type: 'necklace', image: P + 'drop-silver-necklace-4.jpg' },
      { name: 'Rings', slug: 'rings', type: 'ring', image: P + 'flower-silver-earring-1.jpg' },
      { name: 'Bracelets', slug: 'bracelets', type: 'bracelet', image: P + 'braided-silver-bracelet-3.jpg' },
      { name: 'Pearls', slug: 'pearls', type: 'pearl', image: P + 'heart-pearl-earring-2.jpg' },
    ];
  }

  getBestSellers(): Product[] {
    return this.getAllProducts().slice(0, 4);
  }

  getAllProducts(): Product[] {
    return [
      {
        id: 1, name: 'Butterfly Black & Gold Drop Earrings', price: 280, mrp: 500, rating: 5, reviews: 89,
        badge: 'Bestseller', type: 'earring', image: P + 'butterfly-black-gold-earring-2.jpg',
        gallery: [P + 'butterfly-black-gold-earring-2.jpg', P + 'butterfly-black-gold-earring-1.jpg', P + 'butterfly-black-gold-earring-3.jpg'],
      },
      {
        id: 2, name: 'Butterfly Purple Crystal Drop Earrings', price: 280, mrp: 499, rating: 5, reviews: 64,
        badge: 'New', type: 'earring', image: P + 'butterfly-purple-earring-2.jpg',
        gallery: [P + 'butterfly-purple-earring-2.jpg', P + 'butterfly-purple-earring-1.jpg', P + 'butterfly-purple-earring-3.jpg'],
      },
      {
        id: 3, name: 'Flower Purple Pearl Drop Earrings', price: 250, mrp: 519, rating: 5, reviews: 72,
        type: 'earring', image: P + 'flower-purple-earring-2.jpg',
        gallery: [P + 'flower-purple-earring-2.jpg', P + 'flower-purple-earring-1.jpg', P + 'flower-purple-earring-3.jpg'],
      },
      {
        id: 4, name: 'Flower Silver Pearl Drop Earrings', price: 250, mrp: 469, rating: 4, reviews: 58,
        type: 'earring', image: P + 'flower-silver-earring-3.jpg',
        gallery: [P + 'flower-silver-earring-3.jpg', P + 'flower-silver-earring-1.jpg', P + 'flower-silver-earring-4.jpg'],
      },
      {
        id: 5, name: 'Sunflower Crystal Pendant Necklace', price: 550, mrp: 750, rating: 5, reviews: 46,
        badge: 'New', type: 'necklace', image: P + 'flower-silver-necklace-1.jpg',
        gallery: [P + 'flower-silver-necklace-1.jpg', P + 'flower-silver-necklace-2.jpg', P + 'flower-silver-necklace-3.jpg', P + 'flower-silver-necklace-4.jpg'],
      },
      {
        id: 6, name: 'Teardrop Halo Pendant Necklace', price: 380, mrp: 599, rating: 5, reviews: 51,
        type: 'necklace', image: P + 'drop-silver-necklace-4.jpg',
        gallery: [P + 'drop-silver-necklace-4.jpg', P + 'drop-silver-necklace-3.jpg', P + 'drop-silver-necklace-1.jpg', P + 'drop-silver-necklace-2.jpg'],
      },
      {
        id: 7, name: 'Floral Crystal Blossom Vine Bracelet', price: 550, mrp: 689, rating: 5, reviews: 38,
        type: 'bracelet', image: P + 'flower-silver-bracelet-2.jpg',
        gallery: [P + 'flower-silver-bracelet-2.jpg', P + 'flower-silver-bracelet-1.jpg'],
      },
      {
        id: 8, name: 'Golden Blossom Crystal Bracelet', price: 340, mrp: 529, rating: 5, reviews: 29,
        badge: 'New', type: 'bracelet', image: P + 'flower-gold-bracelet-1.jpg',
        gallery: [P + 'flower-gold-bracelet-1.jpg'],
      },
      {
        id: 9, name: 'Heart Pearl Drop Earrings', price: 250, mrp: 419, rating: 5, reviews: 33,
        type: 'earring', image: P + 'heart-pearl-earring-2.jpg',
        gallery: [P + 'heart-pearl-earring-2.jpg', P + 'heart-pearl-earring-1.jpg'],
      },
      {
        id: 10, name: 'Braided Herringbone Bracelet', price: 350, mrp: 559, rating: 4, reviews: 27,
        type: 'bracelet', image: P + 'braided-silver-bracelet-3.jpg',
        gallery: [P + 'braided-silver-bracelet-3.jpg', P + 'braided-silver-bracelet-1.jpg', P + 'braided-silver-bracelet-2.jpg'],
      },
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

    private details: Record<number, { description: string; material: string }> = {
    1: { description: 'Make a statement with these butterfly drop earrings. Black enamel wings, sparkling crystal detail and three delicate gold chains ending in lustrous pearls. Perfect for parties and special occasions.', material: 'Alloy + Enamel + Pearl' },
    2: { description: 'A pink crystal butterfly stud with an amethyst-toned teardrop and pearl-studded tassels. Soft, feminine and made to turn heads at weddings and festive evenings.', material: 'Alloy + Zircon + Pearl' },
    3: { description: 'Lilac crystal petals bloom beneath a rosy pearl stud in this graceful ear-jacket design. Light to wear and pretty enough for every occasion.', material: 'Alloy + Zircon + Pearl' },
    4: { description: 'A sparkling crystal flower paired with a lustrous pearl on a curved silver frame. Easy everyday elegance that also dresses up for special occasions.', material: 'Alloy + Zircon + Pearl' },
    5: { description: 'A dazzling sunflower pendant set with baguette crystals on a sparkling twisted-link chain. A gift-worthy piece for celebrations and everyday shine.', material: 'Alloy + Zircon' },
    6: { description: 'A brilliant teardrop crystal framed by a delicate halo of sparkling stones, on a fine cable chain with adjustable length.', material: 'Alloy + Zircon' },
    7: { description: 'Crystal blossoms and vine leaves flow along this delicate bracelet, finished with a lobster clasp and adjustable chain.', material: 'Alloy + Zircon' },
    8: { description: 'A gold-tone vine bracelet with sparkling oval and leaf-cut crystals. Pretty for weddings, parties and gifting.', material: 'Alloy + Zircon' },
    9: { description: 'A crystal-studded heart stud with a pearl centre and a beaded chain dropping to a lustrous pearl. Sweet, romantic and easy to style.', material: 'Alloy + Crystal + Pearl' },
    10: { description: 'A textured braided herringbone chain bracelet with an adjustable extension chain and lobster clasp. Minimal, modern and easy to layer.', material: 'Alloy' },
  };

  getProductById(id: number): Product | undefined {
    const product = this.getAllProducts().find(p => p.id === id);
    if (!product) return undefined;
    const d = this.details[id];
    return { ...product, description: d?.description, material: d?.material };
  }
}
