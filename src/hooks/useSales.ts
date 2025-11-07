import { useState, useEffect } from 'react';
import { Sale, ApiError } from '@/types/sales';
import { salesService } from '@/services/salesService';

interface UseSalesReturn {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSales(): UseSalesReturn {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = async () => {
    try {
      console.log('inicio peticion');
      
      setLoading(true);
      setError(null);
      const data = await salesService.getSales();
      setSales(data);
      console.log('fin peticion');
      
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar las ventas');
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const refetch = () => {
    fetchSales();
  };

  return {
    sales,
    loading,
    error,
    refetch,
  };
}