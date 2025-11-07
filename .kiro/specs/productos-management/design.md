# Design Document

## Overview

The Product Management System is built as a modern React application using Next.js 15 with TypeScript. It leverages TanStack Table for advanced table functionality and follows the existing TailAdmin design patterns. The system consists of two main views: a product list with TanStack Table and a detailed product view, connected through Next.js routing.

## Architecture

### Component Structure
```
src/
├── app/(admin)/(others-pages)/(productos)/
│   ├── productos/
│   │   └── page.tsx (Product List Page)
│   └── productos/[codmat]/
│       └── page.tsx (Product Detail Page)
├── components/
│   ├── productos/
│   │   ├── ProductTable.tsx (TanStack Table Component)
│   │   ├── ProductDetail.tsx (Product Detail Component)
│   │   └── ProductActions.tsx (Action Buttons)
│   └── ui/
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── services/
│   └── productService.ts (API Client)
├── types/
│   └── product.ts (TypeScript Interfaces)
└── hooks/
    ├── useProducts.ts (Product List Hook)
    └── useProduct.ts (Single Product Hook)
```

### Data Flow
1. **Product List**: Page → Hook → Service → API → TanStack Table
2. **Product Detail**: Page → Hook → Service → API → Detail Component
3. **Navigation**: Table Action → Next.js Router → Detail Page

## Components and Interfaces

### Core Interfaces

```typescript
interface Product {
  codmat: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  categoria?: string;
  stock?: number;
  activo?: boolean;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onViewProduct: (codmat: string) => void;
}

interface ProductDetailProps {
  product: Product | null;
  loading: boolean;
  error: string | null;
}
```

### TanStack Table Configuration

The ProductTable component will use TanStack Table v8 with the following features:
- Column definitions for all product fields
- Sorting functionality
- Pagination with configurable page sizes
- Global search filter
- Action column with "Ver" button
- Loading and error states
- Responsive design

### API Service Layer

```typescript
class ProductService {
  private baseUrl = 'http://localhost:3000';
  
  async getProducts(): Promise<Product[]>
  async getProduct(codmat: string): Promise<Product>
  private handleApiError(error: any): never
}
```

## Data Models

### Product Entity
- **codmat** (string, required): Unique product identifier
- **nombre** (string, required): Product name
- **descripcion** (string, optional): Product description
- **precio** (number, optional): Product price
- **categoria** (string, optional): Product category
- **stock** (number, optional): Available stock quantity
- **activo** (boolean, optional): Product active status
- **fechaCreacion** (string, optional): Creation timestamp
- **fechaModificacion** (string, optional): Last modification timestamp

### API Response Models
- **ProductListResponse**: Array of Product objects
- **ProductDetailResponse**: Single Product object
- **ErrorResponse**: Standardized error format

## Error Handling

### Error Types
1. **Network Errors**: Connection failures, timeouts
2. **HTTP Errors**: 404 (Not Found), 500 (Server Error)
3. **Data Errors**: Invalid JSON, missing required fields
4. **Validation Errors**: Invalid codmat format

### Error Handling Strategy
- Custom error boundary for React components
- Toast notifications for user feedback
- Fallback UI states for error scenarios
- Retry mechanisms for transient failures
- Graceful degradation when API is unavailable

## Testing Strategy

### Unit Tests
- Product service API calls
- Custom hooks (useProducts, useProduct)
- Component rendering and interactions
- Error handling scenarios

### Integration Tests
- End-to-end navigation flow
- API integration with mock server
- Table interactions and filtering
- Responsive behavior testing

### Performance Testing
- Large dataset rendering
- Virtual scrolling performance
- API response time optimization
- Bundle size analysis

## Implementation Notes

### TanStack Table Integration
- Use `@tanstack/react-table` for table functionality
- Implement column definitions with proper typing
- Add custom cell renderers for actions and formatting
- Configure pagination and sorting options

### Next.js Routing
- Utilize App Router with dynamic routes
- Implement proper loading and error pages
- Use Next.js navigation hooks for programmatic routing
- Ensure SEO-friendly URLs

### Styling and UI
- Follow existing TailAdmin design system
- Use Tailwind CSS classes consistently
- Implement responsive breakpoints
- Maintain accessibility standards

### State Management
- Use React hooks for local state
- Implement custom hooks for data fetching
- Consider React Query for advanced caching (optional)
- Handle loading and error states properly