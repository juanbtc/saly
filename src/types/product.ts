export interface Product {
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

export interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onViewProduct: (codmat: string) => void;
}

export interface ProductDetailProps {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type ProductListResponse = ApiResponse<Product[]>;
export type ProductDetailResponse = ApiResponse<Product>;

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}