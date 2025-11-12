import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const res = await fetch(env.URL_SERVER_VENTAS + '/list-ventas', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    return NextResponse.json(data);
}
