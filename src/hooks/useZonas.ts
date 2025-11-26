import { useState, useEffect, useCallback } from 'react';
import { Zona, ApiError } from '@/types/zonas';
//import { zonasService } from '@/services/zonasService';
import { zonasService } from '@/services/zonasService';

interface UseZonasReturn {
    zonas: Zona[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useZonas(): UseZonasReturn {
    const [zonas, setZonas] = useState<Zona[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchZonas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await zonasService.getZonas();
            const data_ordenada = data.sort((a, b) => a.codcli.localeCompare(b.codcli))

            console.log('data ordenada: ', data_ordenada);
            
            setZonas(data_ordenada);
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Error al cargar los clientes');
            setZonas([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchZonas();
    }, [fetchZonas]);

    const refetch = () => {
        fetchZonas();
    };

    return {
        zonas,
        loading,
        error,
        refetch,
    };
}
