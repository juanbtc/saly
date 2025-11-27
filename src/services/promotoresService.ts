import { Cliente, ApiError } from '@/types/clientes';
import { URL_SERVER_OWN } from '@/lib/config';
import { Promotor } from '@/types/promotores';



export class PromotoresService {
    async getPromotores(): Promise<Promotor[]> {
        try {
            const response = await fetch(`/api/proxy/promotores`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                return data as Promotor[];
            }

            if (data.data && Array.isArray(data.data)) {
                return data.data as Promotor[];
            }

            return [];
        } catch (error:any) {
            console.log('catch : ', error.message);
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

export const promotoresService = new PromotoresService();
