export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

