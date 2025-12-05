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
	const body = await res.json().catch(() => ({ msg: 'Error al crear cliente y obtener información', data: {msg:"Error al crear cliente en Versus y obtener información"} }))

	const respuesta = {
		msg: body.msg,//"Cliente creado exitosamente",
		data: body.data,
		status,
		statusText,
		bodyUsed,
		headers,
		ok,
	}
	console.log('res body: ',respuesta);

	

	if (res.ok) {
		return NextResponse.json(respuesta)
	} else {
		return NextResponse.json(respuesta, { status: res.status })
		// const errorData = bd;
		// return NextResponse.json(
		// 	{ error: errorData.error || 'Error al crear cliente' },
		// 	{ status: res.status }
		// );
	}
}
