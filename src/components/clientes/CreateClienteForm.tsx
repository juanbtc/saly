'use client';

import React, { useState } from 'react';
import { CreateClienteData } from '@/services/clientesService';
import { useClientes } from '@/hooks/useClientes';
import InputCodcli from './InputCodcli';
import InputDescrip from './InputDescrip';
import Select from 'react-select'
import { useZonas } from '@/hooks/useZonas';

interface CreateClienteFormProps {
	onSubmit: (data: CreateClienteData) => Promise<void>;
	onCancel: () => void;
	loading: boolean;
	error: string | null;
}

export default function CreateClienteForm({ onSubmit, onCancel, loading, error }: CreateClienteFormProps) {

	// const { clientes, clloading, clerror } = useClientes();
	const uClientes = useClientes();
	const list_zonas = useZonas();
	const [formData, setFormData] = useState<CreateClienteData>({
		codcli: '',
		name: '',
		direccion: '',
		zona: '',
		nit: '',
		razonSocial: '',
		telefono: '',
		telefono2: '',
		correo: '',
		contacto: '',
		correoContacto1: '',
		contacto2: '',
		correoContacto2: '',
		fechaCumple1: '',
		fechaCumple2: '',
		fechaAniversario: '',
		observaciones: '',
		label: ''
	});

	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	]

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		console.log('handleChange: ', name, value.toUpperCase());

		setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
	};

	const handleZonaChange = (selectedOption: any) => {
		setFormData(prev => ({
			...prev,
			zona: selectedOption?.value || ''
		}));
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('cliente a enviar: ', formData);
		console.log('tipo a enviar: ', typeof (formData));

		await onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
					<div className="flex">
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
								Error al crear cliente
							</h3>
							<div className="mt-2 text-sm text-red-700 dark:text-red-300">
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
			)}


			{/* componente extra */}


			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Información Básica
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputCodcli
						clientes={uClientes.clientes}
						value={formData.codcli}
						onChange={handleChange}
					// onChange={ (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=> {
					// 	console.log('valor v:', v.target.name);
					// 	console.log('valor v:', v.target.value);

					// 	//setFormData(prev => ({ ...prev, [name]: value }));
					// }
					// }
					/>
					{/* <div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Código Cliente <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="codcli"
							value={formData.codcli}
							onChange={handleChange}
							required
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div> */}
					<InputDescrip
						clientes={uClientes.clientes}
						value={formData.name}
						onChange={handleChange}
					/>
					{/* <div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Nombre <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div> */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Zona <span className="text-red-500">*</span>
						</label>
						<Select
							options={list_zonas.zonas.map(zona => ({
								value: zona.codigo,
								label: zona.nombre
							}))}
							onChange={handleZonaChange}
							value={{
    value: formData.zona,
    label: list_zonas.zonas.find(z => z.codigo === formData.zona)?.label || 'Seleccione una zona'
}}
							isLoading={list_zonas.loading}
							isDisabled={list_zonas.loading}
							className="w-full text-gray-900" // Asegura que el texto sea visible en modo oscuro
							classNamePrefix="select"
							placeholder="Seleccione una zona"
						/>
						{/* <input
							type="text"
							name="zona"
							value={formData.zona}
							onChange={handleChange}
							required
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/> */}

					</div>

					{/* <div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Zona <span className="text-red-500">*</span>
						</label>
						<Select options={list_zonas.zonas} />
					</div> */}

					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Dirección
						</label>
						<input
							type="text"
							name="direccion"
							value={formData.direccion}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							NIT
						</label>
						<input
							type="text"
							name="nit"
							value={formData.nit}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Razón Social
						</label>
						<input
							type="text"
							name="razonSocial"
							value={formData.razonSocial}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
				</div>
			</div>

			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Información de Contacto
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Teléfono Principal
						</label>
						<input
							type="tel"
							name="telefono"
							value={formData.telefono}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Teléfono Secundario
						</label>
						<input
							type="tel"
							name="telefono2"
							value={formData.telefono2}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Correo Electrónico
						</label>
						<input
							type="email"
							name="correo"
							value={formData.correo}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Contacto 1
						</label>
						<input
							type="text"
							name="contacto"
							value={formData.contacto}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Correo Contacto 1
						</label>
						<input
							type="email"
							name="correoContacto1"
							value={formData.correoContacto1}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Contacto 2
						</label>
						<input
							type="text"
							name="contacto2"
							value={formData.contacto2}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Correo Contacto 2
						</label>
						<input
							type="email"
							name="correoContacto2"
							value={formData.correoContacto2}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
				</div>
			</div>

			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Fechas Importantes
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Cumpleaños Contacto 1
						</label>
						<input
							type="date"
							name="fechaCumple1"
							value={formData.fechaCumple1}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Cumpleaños Contacto 2
						</label>
						<input
							type="date"
							name="fechaCumple2"
							value={formData.fechaCumple2}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							Aniversario
						</label>
						<input
							type="date"
							name="fechaAniversario"
							value={formData.fechaAniversario}
							onChange={handleChange}
							className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						/>
					</div>
				</div>
			</div>

			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Observaciones
				</h2>
				<div>
					<textarea
						name="observaciones"
						value={formData.observaciones}
						onChange={handleChange}
						rows={4}
						className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white px-4 py-2"
						placeholder="Notas adicionales sobre el cliente..."
					/>
				</div>
			</div>

			<div className="flex items-center justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					disabled={loading}
					className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50"
				>
					Cancelar
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
				>
					{loading ? 'Creando...' : 'Crear Cliente'}
				</button>
			</div>
		</form>
	);
}
