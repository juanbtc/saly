import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';

//OBTENER CLIENTES
export async function GET() {
	console.log('obtener lista de clientes');
	
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
	console.log('res: ', res);
	

	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Error al obtener clientes' },
			{ status: res.status }
		);
	}

	const data = await res.json();
	console.log('data: ', data);

	return NextResponse.json(data);
}

//CREAR CLIENTE
export async function POST(request: Request) {
	console.log('creanmdo cliente obteniendo cookies');
	
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
	}


	const bd = await request.json();
	console.log('body: ',bd);
	

	const res = await fetch(`${env.URL_SERVER_VENTAS}/v2/clientes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(bd),
	});

	console.log('*****************************************************');
	
	console.log('res: ',res);
	const status = res.status;
	const statusText = res.statusText;
	const bodyUsed = res.bodyUsed;
	const headers = res.headers;
	const ok = res.ok;
	const body = await res.json().catch(() => ({ error: 'Error al crear cliente' }))

	const respuesta = {
		status,
		statusText,
		bodyUsed,
		headers,
		ok,
		body
	}
	console.log('res body: ',respuesta);

	

	if (!res.ok) {
		const errorData = bd;
		return NextResponse.json(
			{ error: errorData.error || 'Error al crear cliente' },
			{ status: res.status }
		);
	}

	// const data = bd;
	return NextResponse.json({
		msg: "Cliente creado exitosamente",
		data: respuesta
		
	}

	);
}
