import { z } from 'zod';
export interface Zona {
  codigo: string;
  nombre: string;
  label: string;
}

export interface ClientesTableProps {
  zonas: Zona[];
  loading: boolean;
  error: string | null;
  onViewCliente: (codcli: string) => void;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
