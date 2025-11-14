'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientesService, CreateClienteData } from '@/services/clientesService';
import CreateClienteForm from '@/components/clientes/CreateClienteForm';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

export default function CrearClientePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (data: CreateClienteData) => {
		try {
			setLoading(true);
			setError(null);
			const res = await clientesService.createCliente(data);
			
			console.log('respuesta crear cliente: ', res);
			
			
			setLoading(false);
			//router.push('/clientes');
		} catch (err) {
			const error = err as { message?: string };
			setError(error.message || 'Error al crear el cliente');
			setLoading(false);
		}
	};

	const handleCancel = () => {
		router.push('/clientes');
	};

	return (
		<div>
			<PageBreadcrumb pageTitle="Crear Nuevo Cliente" />
			<div className="mt-6">
				<CreateClienteForm
					onSubmit={handleSubmit}
					onCancel={handleCancel}
					loading={loading}
					error={error}
				/>
			</div>
		</div>
	);
}
