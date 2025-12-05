'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientesService, CreateClienteData } from '@/services/clientesService';
import CreateClienteForm from '@/components/clientes/CreateClienteForm';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { showToast } from 'nextjs-toast-notify';

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
			// const resapp = res.body

			if (res.ok) {
				// setLoading(false);
				showToast.success(res.msg,{
					duration: 4000,
                    progress: true,
					position: 'top-right',
                    transition: "bounceIn",
                    icon: '',
                    sound: true,
				})
				// router.push('/clientes');
			} else {
				showToast.error(res.msg,{
					duration: 4000,
					progress: true,
					position: 'top-right',
					transition: "bounceIn",
					icon: '',
					sound: true,
				})
			}

			const resvs = res.data;
			if (resvs.ok2) {
				showToast.success(resvs.msg2, {
					duration: 4000,
					progress: true,
					position: 'top-right',
					transition: "bounceIn",
					icon: '',
					sound: true,
				})
			} else {
				showToast.error(resvs.msg2, {
					duration: 4000,
					progress: true,
					position: 'top-right',
					transition: "bounceIn",
					icon: '',
					sound: true,
				})
			}



			
			// if (res.success) {
			// 	setLoading(false);
			// 	router.push('/clientes');
			// }
			
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
