import { useState, useEffect, useCallback } from 'react';
import { Product, ApiError } from '@/types/product';
import { productService } from '@/services/productService';

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(codmat: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!codmat) {
      setError('Código de producto requerido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProduct(codmat);
      setProduct(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Error al cargar el producto');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [codmat]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const refetch = () => {
    fetchProduct();
  };

  return {
    product,
    loading,
    error,
    refetch,
  };
}