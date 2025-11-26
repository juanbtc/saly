import { env } from "@/lib/enviroment";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	console.log('login post');
	
	try {
		const body = await request.json()

		const res = await fetch(`${env.URL_SERVER_VENTAS}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		})
		console.log('algo as: ', res);
		

		if (!res.ok) {
			return NextResponse.json({ error: "Credenciales inválidas" }, { status: res.status })
		}

		const data = await res.json()
		const jwt: string | undefined = data?.jwt

		if (!jwt) {
			return NextResponse.json({ error: "Respuesta sin token" }, { status: 500 })
		}

		const response = NextResponse.json({ ok: true })

		// Set cookie HttpOnly con el token
		response.cookies.set("token", jwt, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			// maxAge: 60 * 60 * 24, // 1 día, opcional
		})

		console.log('se guardo la cookie');
		
		

		// return NextResponse.json(response)
		return response
	} catch (err) {
		console.log('error: ', err);
		
		return NextResponse.json({ error: "Error en login" }, { status: 500 })
	}
}
export async function GET(request: Request) {
	// const token = request.cookies.get("token")?.value
	console.log('token: ', 'asfgsag', request);
	
	return NextResponse.json({ msg: 'oks' })
}
