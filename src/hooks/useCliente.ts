import { useState, useEffect, useCallback } from 'react';
import { Cliente, ApiError } from '@/types/clientes';
import { clientesService } from '@/services/clientesService';

interface UseClienteReturn {
  cliente: Cliente | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCliente(codcli: string): UseClienteReturn {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCliente = useCallback(async () => {
    if (!codcli) {
      setError('Código de cliente requerido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await clientesService.getCliente(codcli);
      setCliente(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar el cliente');
      setCliente(null);
    } finally {
      setLoading(false);
    }
  }, [codcli]);

  useEffect(() => {
    fetchCliente();
  }, [fetchCliente]);

  const refetch = () => {
    fetchCliente();
  };

  return {
    cliente,
    loading,
    error,
    refetch,
  };
}
