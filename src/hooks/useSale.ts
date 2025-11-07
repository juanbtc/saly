import { useState, useEffect, useCallback } from 'react';
import { Sale, ApiError } from '@/types/sales';
import { salesService } from '@/services/salesService';

interface UseSaleReturn {
  sale: Sale | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSale(id: string | number): UseSaleReturn {
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSale = useCallback(async () => {
    if (!id) {
      setError('ID de venta requerido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await salesService.getSale(id);
      setSale(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar la venta');
      setSale(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSale();
  }, [fetchSale]);

  const refetch = () => {
    fetchSale();
  };

  return {
    sale,
    loading,
    error,
    refetch,
  };
}