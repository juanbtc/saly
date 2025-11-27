//import { z } from 'zod';
export interface Promotor {
  sistema : string;
  codigo : string;
  nombre : string;
  estado: number;
  label:string;
}

export interface ClientesTableProps {
  promotores: Promotor[];
  loading: boolean;
  error: string | null;
  onViewCliente: (codcli: string) => void;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
