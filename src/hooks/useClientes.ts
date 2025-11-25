import { useState, useEffect, useCallback } from 'react';
import { Cliente, ApiError } from '@/types/clientes';
import { clientesService } from '@/services/clientesService';

interface UseClientesReturn {
	clientes: Cliente[];
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useClientes(): UseClientesReturn {
	const [clientes, setClientes] = useState<Cliente[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchClientes = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await clientesService.getClientes();
			const data_ordenada = data.sort((a, b) => a.codcli.localeCompare(b.codcli))

			console.log('data ordenada: ', data_ordenada);
			
			setClientes(data_ordenada);
		} catch (err) {
			const apiError = err as ApiError;
			setError(apiError.message || 'Error al cargar los clientes');
			setClientes([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchClientes();
	}, [fetchClientes]);

	const refetch = () => {
		fetchClientes();
	};

	return {
		clientes,
		loading,
		error,
		refetch,
	};
}
