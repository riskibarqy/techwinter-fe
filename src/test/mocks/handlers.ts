import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock API endpoints for testing
  http.get('/api/products', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Test Product',
        price: 99.99,
        image: 'https://example.com/image.jpg',
        category: 'test',
        description: 'Test description',
        inStock: true,
      },
    ]);
  }),
];