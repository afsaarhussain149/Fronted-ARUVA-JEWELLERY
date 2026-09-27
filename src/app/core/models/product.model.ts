export type JewelType = 'earring' | 'necklace' | 'ring' | 'bracelet' | 'pearl';

export interface Category {
  name: string;
  slug: string;
  type: JewelType;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge?: string;
  type: JewelType;
  image: string;
  gallery?: string[];
}

export interface Review {
  name: string;
  date: string;
  rating: number;
  text: string;
}

export interface CollectionItem {
  name: string;
  tags: string;
  type: JewelType;
  count: number;
  image: string;
}
