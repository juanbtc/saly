import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ codmat: string }> }
) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { codmat } = await params;

    const res = await fetch(`${env.URL_SERVER_VENTAS}/productos/${codmat}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return NextResponse.json(
            { error: 'Producto no encontrado' },
            { status: res.status }
        );
    }

    const data = await res.json();
    return NextResponse.json(data);
}
