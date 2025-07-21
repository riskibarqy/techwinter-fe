import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Death Valley Hoodie",
    price: 89.99,
    image: "https://images.pexels.com/photos/9558618/pexels-photo-9558618.jpeg",
    category: "hoodies",
    description: "Premium heavyweight hoodie with embroidered graphics. Made from 100% organic cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy"],
    inStock: true
  },
  {
    id: 2,
    name: "Skull Roses Tee",
    price: 34.99,
    image: "https://images.pexels.com/photos/9594673/pexels-photo-9594673.jpeg",
    category: "t-shirts",
    description: "Soft cotton tee with vintage-inspired print. Perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    inStock: true
  },
  {
    id: 3,
    name: "Shadow Joggers",
    price: 79.99,
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
    category: "bottoms",
    description: "Comfortable joggers with tapered fit and adjustable waistband.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    inStock: true
  },
  {
    id: 4,
    name: "Midnight Bomber",
    price: 149.99,
    image: "https://images.pexels.com/photos/9558581/pexels-photo-9558581.jpeg",
    category: "jackets",
    description: "Premium bomber jacket with custom patches and embroidery.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    inStock: true
  },
  {
    id: 5,
    name: "Venom Snapback",
    price: 39.99,
    image: "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg",
    category: "accessories",
    description: "Structured snapback with embroidered logo and premium materials.",
    sizes: ["One Size"],
    colors: ["Black", "White"],
    inStock: true
  },
  {
    id: 6,
    name: "Underground Tank",
    price: 29.99,
    image: "https://images.pexels.com/photos/9594617/pexels-photo-9594617.jpeg",
    category: "t-shirts",
    description: "Lightweight tank top perfect for layering or solo wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    inStock: true
  },
  {
    id: 7,
    name: "Denim Distress Jacket",
    price: 119.99,
    image: "https://images.pexels.com/photos/9594590/pexels-photo-9594590.jpeg",
    category: "jackets",
    description: "Vintage-style denim jacket with custom distressing and patches.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Indigo"],
    inStock: true
  },
  {
    id: 8,
    name: "Cargo Shorts",
    price: 59.99,
    image: "https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg",
    category: "bottoms",
    description: "Utility-inspired cargo shorts with multiple pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Khaki", "Gray"],
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 't-shirts', name: 'T-Shirts' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'accessories', name: 'Accessories' }
];