import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Arctic Code Hoodie",
    price: 89.99,
    image: "https://images.pexels.com/photos/9558618/pexels-photo-9558618.jpeg",
    category: "hoodies",
    description: "Premium heavyweight hoodie with tech-inspired graphics. Made from 100% organic cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal", "Navy"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Binary Storm Tee",
    price: 34.99,
    image: "https://images.pexels.com/photos/9594673/pexels-photo-9594673.jpeg",
    category: "t-shirts",
    description: "Soft cotton tee with digital-inspired print. Perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Cyber Joggers",
    price: 79.99,
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
    category: "bottoms",
    description: "Comfortable joggers with tapered fit and adjustable waistband.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Tech Bomber",
    price: 149.99,
    image: "https://images.pexels.com/photos/9558581/pexels-photo-9558581.jpeg",
    category: "jackets",
    description: "Premium bomber jacket with tech patches and embroidery.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 5,
    name: "Winter Tech Cap",
    price: 39.99,
    image: "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg",
    category: "accessories",
    description: "Structured snapback with embroidered logo and premium materials.",
    sizes: ["One Size"],
    colors: ["Black", "White"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 6,
    name: "Code Tank",
    price: 29.99,
    image: "https://images.pexels.com/photos/9594617/pexels-photo-9594617.jpeg",
    category: "t-shirts",
    description: "Lightweight tank top perfect for layering or solo wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 7,
    name: "Digital Denim Jacket",
    price: 119.99,
    image: "https://images.pexels.com/photos/9594590/pexels-photo-9594590.jpeg",
    category: "jackets",
    description: "Modern denim jacket with tech-inspired distressing and patches.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Indigo"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: 8,
    name: "Tech Cargo Shorts",
    price: 59.99,
    image: "https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg",
    category: "bottoms",
    description: "Utility-inspired cargo shorts with multiple pockets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Khaki", "Gray"],
    inStock: true,
    createdAt: "2025-01-01T00:00:00Z"
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'hoodies', name: 'Hoodies' },
  { id: 't-shirts', name: 'T-Shirts' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'jackets', name: 'Jackets' },
  { id: 'accessories', name: 'Accessories' }
]