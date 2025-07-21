import { Product } from "./product";

export interface CartItem extends Product {
  productId: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}