export type Category = 'wishlist' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  category: Category;
  review?: string;
  rating?: number; // 1-5
}