'use client';

import React from 'react';
import { Sale } from '@/types/sales';

interface SalesDetailProps {
	sale: Sale | null;
	loading: boolean;
	error: string | null;
	onBack: () => void;
}

export default function SalesDetail({ sale, loading, error, onBack }: SalesDetailProps) {
	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="space-y-4">
				<button
					onClick={onBack}
					className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
				>
					← Volver a ventas
				</button>
				<div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
					<div className="flex">
						<div className="ml-3">
							<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
								Error al cargar la venta
							</h3>
							<div className="mt-2 text-sm text-red-700 dark:text-red-300">
								<p>{error}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!sale) {
		return (
			<div className="space-y-4">
				<button
					onClick={onBack}
					className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
				>
					← Volver a ventas
				</button>
				<div className="text-center">
					<p className="text-gray-500 dark:text-gray-400">Venta no encontrada</p>
				</div>
			</div>
		);
	}

	const formatDate = (dateString?: string) => {
		if (!dateString) return '-';
		try {
			return new Date(dateString).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
		} catch {
			return dateString;
		}
	};

	const formatCurrency = (amount: number) => {
		// return `$${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
		return `${amount}`
	};

	const getStatusColor = (status?: string) => {
		if (!status) return 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30';

		switch (status.toLowerCase()) {
			case 'completada':
			case 'pagada':
				return 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30';
			case 'pendiente':
				return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/30';
			case 'cancelada':
				return 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30';
			default:
				return 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30';
		}
	};

	return (
		<div className="space-y-6">
			{/* Header with back button */}
			<div className="flex items-center justify-between">
				<button
					onClick={onBack}
					className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
				>
					← Volver a ventas
				</button>
				<div className="flex items-center space-x-2">
					<span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(sale.estado)}`}>
						{sale.estado ? sale.estado.charAt(0).toUpperCase() + sale.estado.slice(1) : 'Sin estado'}
					</span>
				</div>
			</div>

			{/* Sale header */}
			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Venta #{sale.id}
						</h1>
						<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
							Fecha: {formatDate(sale.fecha)}
						</p>
						{sale.cliente && (
							<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
								Cliente: {sale.cliente}
							</p>
						)}
					</div>
					<div className="text-right">
						<p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
							{formatCurrency(sale.total)}
						</p>
						{sale.metodoPago && (
							<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
								{sale.metodoPago}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Sale details */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Basic Information */}
				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Información de la Venta
					</h2>
					<dl className="space-y-4">
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Vendedor
							</dt>
							<dd className="mt-1 text-sm text-gray-900 dark:text-white">
								{sale.vendedor || 'No especificado'}
							</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Método de Pago
							</dt>
							<dd className="mt-1 text-sm text-gray-900 dark:text-white">
								{sale.metodoPago || 'No especificado'}
							</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Estado
							</dt>
							<dd className="mt-1">
								<span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor(sale.estado)}`}>
									{sale.estado ? sale.estado.charAt(0).toUpperCase() + sale.estado.slice(1) : 'Sin estado'}
								</span>
							</dd>
						</div>
					</dl>
				</div>

				{/* Financial Information */}
				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Información Financiera
					</h2>
					<dl className="space-y-4">
						<div>
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Subtotal
							</dt>
							<dd className="mt-1 text-sm text-gray-900 dark:text-white">
								{formatCurrency(sale.total - (sale.impuestos || 0) + (sale.descuento || 0))}
							</dd>
						</div>
						{sale.descuento && sale.descuento > 0 && (
							<div>
								<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Descuento
								</dt>
								<dd className="mt-1 text-sm text-red-600 dark:text-red-400">
									-{formatCurrency(sale.descuento)}
								</dd>
							</div>
						)}
						{sale.impuestos && sale.impuestos > 0 && (
							<div>
								<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
									Impuestos
								</dt>
								<dd className="mt-1 text-sm text-gray-900 dark:text-white">
									{formatCurrency(sale.impuestos)}
								</dd>
							</div>
						)}
						<div className="border-t border-gray-200 dark:border-gray-600 pt-4">
							<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
								Total
							</dt>
							<dd className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
								{formatCurrency(sale.total)}
							</dd>
						</div>
					</dl>
				</div>
			</div>

			{/* Products */}
			{sale.productos && sale.productos.length > 0 && (
				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Productos Vendidos
					</h2>
					<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
										Código
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
										Producto
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
										Cantidad
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
										Precio Unit.
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
										Subtotal
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
								{sale.productos.map((producto, index) => (
									<tr key={index}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
											{producto.codmat}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
											{producto.nombre}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
											{producto.cantidad}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
											{formatCurrency(producto.precio)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
											{formatCurrency(producto.subtotal)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Notes */}
			{sale.notas && (
				<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						Notas
					</h2>
					<p className="text-sm text-gray-600 dark:text-gray-300">
						{sale.notas}
					</p>
				</div>
			)}

			{/* Timestamps */}
			<div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Información de Fechas
				</h2>
				<dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
							Fecha de Creación
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-white">
							{formatDate(sale.fechaCreacion)}
						</dd>
					</div>
					<div>
						<dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
							Última Modificación
						</dt>
						<dd className="mt-1 text-sm text-gray-900 dark:text-white">
							{formatDate(sale.fechaModificacion)}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}