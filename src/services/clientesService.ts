import { Cliente, ApiError } from '@/types/clientes';
import { URL_SERVER_OWN } from '@/lib/config';

export class ClientesService {
  async getClientes(): Promise<Cliente[]> {
    try {
      const response = await fetch(`${URL_SERVER_OWN}/api/proxy/clientes`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data as Cliente[];
      }

      if (data.data && Array.isArray(data.data)) {
        return data.data as Cliente[];
      }

      return [];
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async getCliente(codcli: string): Promise<Cliente> {
    try {
      const response = await fetch(`${URL_SERVER_OWN}/api/proxy/clientes/${encodeURIComponent(codcli)}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Cliente con código ${codcli} no encontrado`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && typeof data === 'object' && !Array.isArray(data)) {
        if (data.data && typeof data.data === 'object') {
          return data.data as Cliente;
        }
        return data as Cliente;
      }

      throw new Error('Formato de respuesta inválido');
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private handleApiError(error: unknown): ApiError {
    if (error instanceof Error) {
      return {
        message: error.message,
        status: error.name === 'TypeError' ? 0 : undefined,
      };
    }

    return {
      message: 'Error desconocido al conectar con el servidor',
      status: 0,
    };
  }
}

export const clientesService = new ClientesService();
