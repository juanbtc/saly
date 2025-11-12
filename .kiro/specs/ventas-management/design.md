# Design Document

## Overview

The Sales Management System is built as a modern React application using Next.js 15 with TypeScript. It leverages TanStack Table for advanced table functionality and follows the existing TailAdmin design patterns. The system consists of two main views: a sales list with TanStack Table and a detailed sales view, connected through Next.js routing.

## Architecture

### Component Structure
```
src/
├── app/(admin)/(others-pages)/(ventas)/
│   ├── ventas/
│   │   └── page.tsx (Sales List Page)
│   └── ventas/[id]/
│       └── page.tsx (Sales Detail Page)
├── components/
│   ├── ventas/
│   │   ├── SalesTable.tsx (TanStack Table Component)
│   │   ├── SalesDetail.tsx (Sales Detail Component)
│   │   └── SalesActions.tsx (Action Buttons)
├── services/
│   └── salesService.ts (API Client)
├── types/
│   └── sales.ts (TypeScript Interfaces)
└── hooks/
    ├── useSales.ts (Sales List Hook)
    └── useSale.ts (Single Sale Hook)
```

### Data Flow
1. **Sales List**: Page → Hook → Service → API → TanStack Table
2. **Sales Detail**: Page → Hook → Service → API → Detail Component
3. **Navigation**: Table Action → Next.js Router → Detail Page

## Components and Interfaces

### Core Interfaces

```typescript
interface Sale {
  id: string | number;
  fecha: string;
  cliente?: string;
  total: number;
  estado?: string;
  metodoPago?: string;
  productos?: SaleProduct[];
  descuento?: number;
  impuestos?: number;
  vendedor?: string;
  notas?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
}

interface SaleProduct {
  codmat: string;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

interface SalesTableProps {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  onViewSale: (id: string | number) => void;
}

interface SalesDetailProps {
  sale: Sale | null;
  loading: boolean;
  error: string | null;
}
```

### TanStack Table Configuration

The SalesTable component will use TanStack Table v8 with the following features:
- Column definitions for all sales fields
- Sorting functionality
- Pagination with configurable page sizes
- Global search filter
- Action column with "Ver" button
- Loading and error states
- Responsive design

### API Service Layer

```typescript
class SalesService {
  private baseUrl = 'http://localhost:3000';
  
  async getSales(): Promise<Sale[]>
  async getSale(id: string | number): Promise<Sale>
  private handleApiError(error: any): never
  private mapApiResponseToSale(apiResponse: ApiSaleDetailResponse): Sale
}
```

### API Response Structure

The backend returns a nested structure for sale details:

```typescript
interface ApiSaleDetailResponse {
  venta: {
    id: number;
    nrotran: number;
    tipotran: string;
    observaciones: string;
    total: number;
    estado: number;
    nulo: string | null;
    price_mod: number;
    codcam: string | null;
    rcod: string;
    rdays: number;
    roff: number;
    rpts_used: number;
    lat: number;
    lng: number;
    createdAt: string;
    updatedAt: string;
    usuario_cod: string;
    cliente_cod: string;
    prom_cod: string | null;
  };
  cliente: {
    codcli: string;
    name: string;
    direccion: string | null;
    zona: string;
    estado: boolean;
    // ... other customer fields
  };
  detalle: Array<{
    id: number;
    notaventa_id: number;
    precio: number;
    precio_desc: number | null;
    cantidad: number;
    oferta: number;
    oferta_acumulada: number;
    importe_acumulado: number;
    codmat: string;
    producto: string;
    // ... other detail fields
  }>;
}
```

The service layer must transform this nested structure into the flat Sale interface used by the frontend components.

## Data Models

### Sale Entity
- **id** (string | number, required): Unique sale identifier
- **fecha** (string, required): Sale date
- **cliente** (string, optional): Customer name
- **total** (number, required): Total sale amount
- **estado** (string, optional): Sale status
- **metodoPago** (string, optional): Payment method
- **productos** (SaleProduct[], optional): List of sold products
- **descuento** (number, optional): Discount amount
- **impuestos** (number, optional): Tax amount
- **vendedor** (string, optional): Salesperson name
- **notas** (string, optional): Additional notes
- **fechaCreacion** (string, optional): Creation timestamp
- **fechaModificacion** (string, optional): Last modification timestamp

### API Response Models
- **SalesListResponse**: Array of Sale objects
- **SalesDetailResponse**: Single Sale object
- **ApiSaleDetailResponse**: Nested backend response structure with venta, cliente, and detalle
- **ErrorResponse**: Standardized error format

### Data Transformation
The API returns a nested structure that must be transformed:
- `venta` object → Sale base properties (id, total, estado, observaciones, etc.)
- `cliente` object → Sale.cliente property (customer name)
- `detalle` array → Sale.productos array (mapped to SaleProduct interface)

Mapping rules:
- `venta.id` → `Sale.id`
- `venta.total` → `Sale.total`
- `venta.observaciones` → `Sale.notas`
- `venta.createdAt` → `Sale.fechaCreacion`
- `venta.updatedAt` → `Sale.fechaModificacion`
- `venta.usuario_cod` → `Sale.vendedor`
- `cliente.name` → `Sale.cliente`
- `detalle[].codmat` → `SaleProduct.codmat`
- `detalle[].producto` → `SaleProduct.nombre`
- `detalle[].cantidad` → `SaleProduct.cantidad`
- `detalle[].precio` → `SaleProduct.precio`
- `detalle[].importe_acumulado` → `SaleProduct.subtotal`

## Error Handling

### Error Types
1. **Network Errors**: Connection failures, timeouts
2. **HTTP Errors**: 404 (Not Found), 500 (Server Error)
3. **Data Errors**: Invalid JSON, missing required fields
4. **Validation Errors**: Invalid sale ID format

### Error Handling Strategy
- Custom error boundary for React components
- Toast notifications for user feedback
- Fallback UI states for error scenarios
- Retry mechanisms for transient failures
- Graceful degradation when API is unavailable

## Testing Strategy

### Unit Tests
- Sales service API calls
- Custom hooks (useSales, useSale)
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
- Handle loading and error states properly