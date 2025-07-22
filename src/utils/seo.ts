import { SEOData, BreadcrumbItem } from '@/types/seo';

export const generateSEOData = (data: Partial<SEOData>): SEOData => {
  const baseTitle = 'TechWinter - Where Technology Meets Style';
  const baseDescription = 'Discover premium tech-inspired fashion at TechWinter. Shop hoodies, t-shirts, and accessories that blend cutting-edge style with comfort.';

  return {
    title: data.title ? `${data.title} | TechWinter` : baseTitle,
    description: data.description || baseDescription,
    keywords: data.keywords || 'tech fashion, streetwear, hoodies, t-shirts, premium clothing',
    canonical: data.canonical,
    ogTitle: data.ogTitle || data.title || baseTitle,
    ogDescription: data.ogDescription || data.description || baseDescription,
    ogImage: data.ogImage || '/og-image.jpg',
    ogType: data.ogType || 'website',
    twitterCard: data.twitterCard || 'summary_large_image',
    twitterTitle: data.twitterTitle || data.title || baseTitle,
    twitterDescription: data.twitterDescription || data.description || baseDescription,
    twitterImage: data.twitterImage || data.ogImage || '/og-image.jpg',
    structuredData: data.structuredData,
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${window.location.origin}${item.url}`,
    })),
  };
};

export const generateProductStructuredData = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'TechWinter',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };
};