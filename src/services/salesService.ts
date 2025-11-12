import { Sale, ApiError, ApiSaleDetailResponse, SaleProduct } from '@/types/sales';
import { URL_SERVER_OWN } from '@/lib/config';

export class SalesService {
	async getSales(): Promise<Sale[]> {
		try {
			const response = await fetch(`${URL_SERVER_OWN}/api/proxy/ventas`, {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Si la respuesta es un array directo, lo devolvemos
			if (Array.isArray(data)) {
				return data as Sale[];
			}

			// Si la respuesta tiene una estructura con data, extraemos el array
			if (data.data && Array.isArray(data.data)) {
				return data.data as Sale[];
			}

			// Si no es ninguno de los casos anteriores, devolvemos array vacío
			return [];
		} catch (error) {
			throw this.handleApiError(error);
		}
	}

	async getSale(id: string | number): Promise<Sale> {
		try {
			const response = await fetch(`${URL_SERVER_OWN}/api/proxy/ventas/${encodeURIComponent(id)}`, {
				credentials: 'include',
			});

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error(`Venta con ID ${id} no encontrada`);
				}
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Check if response has nested structure (venta, cliente, detalle)
			if (data && data.data && data.data.venta && data.data.cliente && data.data.detalle) {
				return this.mapApiResponseToSale(data.data);
			}

			// Si la respuesta es un objeto directo, lo devolvemos
			if (data && typeof data === 'object' && !Array.isArray(data)) {
				// Si tiene una estructura con data, extraemos el objeto
				if (data.data && typeof data.data === 'object') {
					return data.data as Sale;
				}
				// Si es el objeto directo
				return data as Sale;
			}

			throw new Error('Formato de respuesta inválido');
		} catch (error) {
			throw this.handleApiError(error);
		}
	}

	private mapApiResponseToSale(apiResponse: ApiSaleDetailResponse): Sale {
		const { venta, cliente, detalle } = apiResponse;

		// Map estado number to string
		const estadoMap: { [key: number]: string } = {
			0: 'pendiente',
			1: 'completada',
			2: 'cancelada',
		};

		// Transform detalle array to productos
		const productos: SaleProduct[] = detalle.map((item) => ({
			codmat: item.codmat,
			nombre: item.producto,
			cantidad: item.cantidad,
			precio: item.precio,
			subtotal: item.importe_acumulado,
		}));

		// Calculate total discount from detalle
		const totalDescuento = detalle.reduce((sum, item) => sum + item.oferta_acumulada, 0);

		return {
			id: venta.id,
			fecha: venta.createdAt,
			cliente: cliente.name,
			total: venta.total,
			estado: estadoMap[venta.estado] || 'pendiente',
			metodoPago: venta.tipotran,
			productos,
			descuento: totalDescuento,
			impuestos: 0, // Not provided in API
			vendedor: venta.usuario_cod,
			notas: venta.observaciones,
			fechaCreacion: venta.createdAt,
			fechaModificacion: venta.updatedAt,
		};
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
export const salesService = new SalesService();