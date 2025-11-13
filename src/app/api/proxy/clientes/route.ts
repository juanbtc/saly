import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';

//OBTENER CLIENTES
export async function GET() {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
	}

	const res = await fetch(`${env.URL_SERVER_VENTAS}/clientes`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Error al obtener clientes' },
			{ status: res.status }
		);
	}

	const data = await res.json();
	return NextResponse.json(data);
}

//CREAR CLIENTE
export async function POST(request: Request) {
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
	}

	const body = await request.json();

	const res = await fetch(`${env.URL_SERVER_VENTAS}/clientes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errorData = await res.json().catch(() => ({ error: 'Error al crear cliente' }));
		return NextResponse.json(
			{ error: errorData.error || 'Error al crear cliente' },
			{ status: res.status }
		);
	}

	const data = await res.json();
	return NextResponse.json(data);
}
