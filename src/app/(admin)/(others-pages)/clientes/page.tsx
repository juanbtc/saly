'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useClientes } from '@/hooks/useClientes';
import ClientesTable from '@/components/clientes/ClientesTable';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

export default function ClientesPage() {
	const router = useRouter();
	const { clientes, loading, error } = useClientes();

	const handleViewCliente = (codcli: string) => {
		router.push(`/clientes/${codcli}`);
	};

	const handleCreateCliente = () => {
		router.push('/clientes/crear');
	};

	return (
		<div>
			<PageBreadcrumb pageTitle="Gestión de Clientes" />
			<div className="mt-6">
				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
					<div className="mb-4 flex justify-end">
						<button
							onClick={handleCreateCliente}
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							+ Crear Cliente
						</button>
					</div>
					<ClientesTable
						clientes={clientes}
						loading={loading}
						error={error}
						onViewCliente={handleViewCliente}
					/>
				</div>
			</div>
		</div>
	);
}
