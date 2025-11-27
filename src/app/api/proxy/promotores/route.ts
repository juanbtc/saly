import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from '@/lib/enviroment';
import Label from '@/components/form/Label';

//OBTENER PROMOTORES
export async function GET() {
	console.log('obtener lista de promotores');
	
	const cookieStore = await cookies();
	const token = cookieStore.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
	}

	const res = await fetch(`${env.URL_SERVER_PY}/vt/promotores `, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	console.log('res: ', res);
	

	if (!res.ok) {
		
		return NextResponse.json(
			{ error: 'Error al obtener promotores' },
			{ status: res.status }
		);
	}

	const data = await res.json();
	data.data.forEach((promotor:any) => {
		promotor.label=`${promotor.codigo} - ${promotor.nombre}`;
	});
	console.log('data: ', data);

	return NextResponse.json(data);
}
