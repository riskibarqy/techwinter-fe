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

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
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