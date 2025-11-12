// import { URL_SERVER_VENTAS } from '@/lib/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';

export async function GET() {
    const cookieStore = await cookies()
    console.log("cookieStore: ",cookieStore);
    
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // console.log("URL_SERVER_VENTAS: ",URL_SERVER_VENTAS);
    const res = await fetch(env.URL_SERVER_VENTAS + '/productos', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    console.log("data server: ",data.length);
    
    return NextResponse.json(data);
}
