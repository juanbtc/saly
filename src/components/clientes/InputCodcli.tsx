import { Cliente } from "@/types/clientes";
import { useState } from "react";

export default function InputCodcli(
	{
		clientes,
		value,
		onChange

	} : {
		clientes: Cliente[],
		value: string,
		onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	}
) {
	const [query, setQuery] = useState(value)

	const [focused, setFocused] = useState(false)

	const resultados = clientes.filter(c =>
		c.codcli.toLowerCase().startsWith(query.toLowerCase())
	)

	{/* <div className="relative w-full max-w-md"> */}
	return (
			<div>
				{/* <input
					type="text"
					className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
					placeholder="Buscar cliente..."
					value={query}
					onChange={e => setQuery(e.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={() => setTimeout(() => setFocused(false), 100)} // delay para permitir click
				/> */}
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					Código Cliente <span className="text-red-500">*</span>
				</label>
				<input
					type="text"
					name="codcli"
					style={{ textTransform: 'uppercase' }}
					placeholder="Buscar cliente..."
					value={query}
					// onChange={onChange}
					onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
						onChange(e)
						setQuery(e.target.value)

					}}
					required
					onFocus={() => setFocused(true)}
					onBlur={() => setTimeout(() => setFocused(false), 100)} // delay para permitir click
					className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
					// className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
				/>

				{focused && query.length > 0 && resultados.length > 0 && (
					<ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-60 overflow-y-auto">
						{resultados.map(cliente => (
							<li
								key={cliente.codcli}
								className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
								onMouseDown={() => {
									setQuery(cliente.codcli)
									setFocused(false)
								}}
							>
								{cliente.codcli} - {cliente.name}
							</li>
						))}
					</ul>
				)}
			</div>
	)
}