import { Cliente, ApiError } from '@/types/clientes';
import { URL_SERVER_OWN } from '@/lib/config';
import { Zona } from '@/types/zonas';



export class ZonasService {
    async getZonas(): Promise<Zona[]> {
        try {
            const response = await fetch(`/api/proxy/zonas`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (Array.isArray(data)) {
                return data as Zona[];
            }

            if (data.data && Array.isArray(data.data)) {
                return data.data as Zona[];
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

export const zonasService = new ZonasService();
