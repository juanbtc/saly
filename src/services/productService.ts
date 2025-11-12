import { URL_SERVER_OWN } from '@/lib/config';
import { Product, ApiError } from '@/types/product';

export class ProductService {
	private baseUrl = 'http://localhost:3000';

	async getProducts(): Promise<Product[]> {
		try {
			/*
			const response = await fetch(`${this.baseUrl}/productos`, {
			  method: 'GET',
			  headers: {
				'Content-Type': 'application/json',
			  },
			});
			*/

			const response = await fetch(`${URL_SERVER_OWN}/api/proxy/productos`, {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const xres = await response.json();
			console.log("xres: ", xres);

			// Si la respuesta es un array directo, lo devolvemos
			if (Array.isArray(xres)) {
				return xres as Product[];
			}

			// Si la respuesta tiene una estructura con data, extraemos el array
			if (xres.data && Array.isArray(xres.data)) {
				return xres.data as Product[];
			}

			// Si no es ninguno de los casos anteriores, devolvemos array vacío
			return [];
		} catch (error) {
			throw this.handleApiError(error);
		}
	}

	async getProduct(codmat: string): Promise<Product> {
		try {
			/*const response = await fetch(`${this.baseUrl}/productos/${encodeURIComponent(codmat)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});*/
			const response = await fetch(`${URL_SERVER_OWN}/api/proxy/productos/${encodeURIComponent(codmat)}`, {
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error(`Producto con código ${codmat} no encontrado`);
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Si la respuesta es un objeto directo, lo devolvemos
			if (data && typeof data === 'object' && !Array.isArray(data)) {
				// Si tiene una estructura con data, extraemos el objeto
				if (data.data && typeof data.data === 'object') {
					return data.data as Product;
				}
				// Si es el objeto directo
				return data as Product;
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

// Instancia singleton del servicio
export const productService = new ProductService();