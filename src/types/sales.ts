export interface SaleProduct {
  codmat: string;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export interface Sale {
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

export interface SalesTableProps {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  onViewSale: (id: string | number) => void;
}

export interface SalesDetailProps {
  sale: Sale | null;
  loading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type SalesListResponse = ApiResponse<Sale[]>;
export type SalesDetailResponse = ApiResponse<Sale>;

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}