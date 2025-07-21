import { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: "ord_001",
    userId: "user_123",
    items: [
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
        productId: 1,
        quantity: 1,
        selectedSize: "M",
        selectedColor: "Black"
      },
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",
        productId: 5,
        quantity: 2,
        selectedSize: "One Size",
        selectedColor: "White"
      }
    ],
    total: 89.99 + 2 * 39.99,
    status: "pending",
    createdAt: "2025-07-20T10:00:00Z",
    shippingAddress: {
      name: "Alice Johnson",
      address: "123 Tech Street",
      city: "San Francisco",
      zipCode: "94105",
      country: "USA"
    }
  },
  {
    id: "ord_002",
    userId: "user_456",
    items: [
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",        
        productId: 3,
        quantity: 1,
        selectedSize: "L",
        selectedColor: "Charcoal"
      },
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",        
        productId: 6,
        quantity: 3,
        selectedSize: "M",
        selectedColor: "White"
      }
    ],
    total: 79.99 + 3 * 29.99,
    status: "processing",
    createdAt: "2025-07-18T14:45:00Z",
    shippingAddress: {
      name: "Bob Smith",
      address: "456 Binary Ave",
      city: "New York",
      zipCode: "10001",
      country: "USA"
    },
    trackingNumber: "TRACK123456789"
  },
  {
    id: "ord_003",
    userId: "user_789",
    items: [
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",        
        productId: 4,
        quantity: 1,
        selectedSize: "XL",
        selectedColor: "Olive"
      }
    ],
    total: 149.99,
    status: "shipped",
    createdAt: "2025-07-15T08:30:00Z",
    shippingAddress: {
      name: "Charlie Nguyen",
      address: "789 Cloud Blvd",
      city: "Seattle",
      zipCode: "98101",
      country: "USA"
    },
    trackingNumber: "SHIP99887766"
  },
  {
    id: "ord_004",
    userId: "user_999",
    items: [
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",        
        productId: 2,
        quantity: 2,
        selectedSize: "S",
        selectedColor: "Black"
      },
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
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T00:00:00Z",        
        productId: 8,
        quantity: 1,
        selectedSize: "M",
        selectedColor: "Khaki"
      }
    ],
    total: 2 * 34.99 + 59.99,
    status: "cancelled",
    createdAt: "2025-07-10T17:10:00Z",
    shippingAddress: {
      name: "Dina Park",
      address: "22 Cancelled Lane",
      city: "Los Angeles",
      zipCode: "90001",
      country: "USA"
    }
  }
];
