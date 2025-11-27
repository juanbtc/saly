import { useState, useEffect, useCallback } from 'react';
import { Promotor, ApiError } from '@/types/promotores';
import { promotoresService } from '@/services/promotoresService';

interface UsePromotoresReturn {
    promotores: Promotor[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function usePromotores(): UsePromotoresReturn {
    const [promotores, setPromotores] = useState<Promotor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPromotores = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await promotoresService.getPromotores();
            const data_ordenada = data.sort((a, b) => a.codigo.localeCompare(b.codigo))

            console.log('data ordenada: ', data_ordenada);
            
            setPromotores(data_ordenada);
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al cargar las zonas');
            setPromotores([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPromotores();
    }, [fetchPromotores]);

    const refetch = () => {
        fetchPromotores();
    };

    return {
        promotores,
        loading,
        error,
        refetch,
    };
}
