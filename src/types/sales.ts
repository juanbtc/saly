export interface SaleProduct {
  codmat: string;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  label:string;
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

// Nested API response interfaces for backend structure
export interface ApiVenta {
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
}

export interface ApiCliente {
  codcli: string;
  name: string;
  direccion: string | null;
  zona: string;
  estado: boolean;
  lat: number | null;
  lng: number | null;
  conDocumentacion: boolean;
  visitado: boolean;
  nit: string | null;
  contacto: string | null;
  fechaCumple1: string | null;
  contacto2: string | null;
  fechaCumple2: string | null;
  fechaAniversario: string | null;
  telefono: string | null;
  telefono2: string | null;
  fechaVisita: string | null;
  razonSocial: string | null;
  documentacionCompleta: boolean;
  observaciones: string | null;
  correo: string | null;
  correoContacto1: string | null;
  correoContacto2: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiDetalle {
  id: number;
  notaventa_id: number;
  precio: number;
  precio_desc: number | null;
  cantidad: number;
  oferta: number;
  oferta_acumulada: number;
  importe_acumulado: number;
  d06d28: number;
  d07d58: number;
  preciod10d10: number;
  preciod11d17: number;
  preciod12d30: number;
  preciod12d17: number;
  preciod13d21: number;
  preciod14prd01: number;
  precio_cac33: number | null;
  precio_cac40: number | null;
  d08sep: number;
  d09clubk: number;
  bloque_id: number | null;
  codmat: string;
  producto: string;
}

export interface ApiSaleDetailResponse {
  venta: ApiVenta;
  cliente: ApiCliente;
  detalle: ApiDetalle[];
}

export type ApiSaleDetailWrappedResponse = ApiResponse<ApiSaleDetailResponse>;