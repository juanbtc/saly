import { Cliente, ApiError } from '@/types/clientes';
import { URL_SERVER_OWN } from '@/lib/config';

export interface CreateClienteData {
	codcli: string;
	name: string;
	direccion?: string;
	zona: string;
	ciudad: number;
	nit?: string;
	razonSocial?: string;
	telefono?: string;
	telefono2?: string;
	correo?: string;
	contacto?: string;
	correoContacto1?: string;
	contacto2?: string;
	correoContacto2?: string;
	fechaCumple1?: string;
	fechaCumple2?: string;
	fechaAniversario?: string;
	observaciones?: string;
	promotor: string
}

export class ClientesService {
	async getClientes(): Promise<Cliente[]> {
		try {
			const response = await fetch(`/api/proxy/clientes`, {
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
		} catch (error:any) {
			console.log('catch : ', error.message);
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

	async createCliente(data: CreateClienteData): Promise<any> {
		try {
			const response = await fetch(`/api/proxy/clientes`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});
			console.log('response front: ',response);
			

			/*if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error + `HTTP -> error! status: ${response.status}`);
			}*/

			const result = await response.json();
			console.log('response body front: ',result);
			

			// if (result.data && typeof result.data === 'object') {
			// 	return result.data;
			// }

			return {
				msg: result.msg,
				data: result.data,
				ok: response.ok,
				status: response.status,
				statusText: response.status,
			};
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
