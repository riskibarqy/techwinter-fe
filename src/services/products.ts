import { apiService } from './api';
import { Product } from '@/types/product';
import { PaginatedResponse } from '@/types/api';

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductsQuery extends ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const productsService = {
  async getProducts(query: ProductsQuery = {}) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    return apiService.get<PaginatedResponse<Product>>(`/products?${params.toString()}`);
  },

  async getProduct(id: number) {
    return apiService.get<Product>(`/products/${id}`);
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return apiService.post<Product>('/products', product);
  },

  async updateProduct(id: number, product: Partial<Product>) {
    return apiService.put<Product>(`/products/${id}`, product);
  },

  async deleteProduct(id: number) {
    return apiService.delete(`/products/${id}`);
  },

  async getCategories() {
    return apiService.get<string[]>('/products/categories');
  },
};