export interface Cliente {
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

export interface ClientesTableProps {
  clientes: Cliente[];
  loading: boolean;
  error: string | null;
  onViewCliente: (codcli: string) => void;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
