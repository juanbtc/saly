'use client';

import React, { useMemo, useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
	ColumnDef,
	SortingState,
	ColumnFiltersState,
} from '@tanstack/react-table';
import { Sale } from '@/types/sales';

interface SalesTableProps {
	sales: Sale[];
	loading: boolean;
	error: string | null;
	onViewSale: (id: string | number) => void;
}

export default function SalesTable({ sales, loading, error, onViewSale }: SalesTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const columns = useMemo<ColumnDef<Sale, unknown>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'ID',
				cell: (info) => (
					<span className="font-medium text-gray-900 dark:text-white">
						{info.getValue() as string | number}
					</span>
				),
			},
			{
				accessorKey: 'fecha_',
				header: 'Fecha',
				cell: (info) => {
					const fecha = info.getValue() as string;
					try {
						return (
							<span className="text-gray-900 dark:text-white">
								{new Date(fecha).toLocaleDateString('es-ES')}
							</span>
						);
					} catch {
						return (
							<span className="text-gray-900 dark:text-white">
								{fecha}
							</span>
						);
					}
				},
			},
			{
				accessorKey: 'cliente',
				header: 'Cliente',
				cell: (info) => (
					<span className="text-gray-900 dark:text-white">
						{(info.getValue() as string) || 'Sin especificar'}
					</span>
				),
			},
			{
				accessorKey: 'total',
				header: 'Total',
				cell: (info) => {
					const total = info.getValue() as number;
					return (
						<span className="font-semibold text-gray-900 dark:text-white">
							${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
						</span>
					);
				},
			},
			{
				accessorKey: 'estado',
				header: 'Estado',
				cell: (info) => {
					const estado = (info.getValue() as string) || 'pendiente';
					const getStatusColor = (status: string) => {
						console.log('status: ', status);
						console.log('status typeof: ', typeof (status));

						if (typeof (status) === "string") {
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
						} else if (typeof (status) === "number") {
							return ""
						}

					};

					return (
						<span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(estado)}`}>

							{(typeof (estado) === "string") ? estado.charAt(0).toUpperCase() + estado.slice(1) : estado}

						</span>
					);
				},
			},
			{
				accessorKey: 'metodoPago',
				header: 'Método de Pago',
				cell: (info) => (
					<span className="text-gray-600 dark:text-gray-300">
						{(info.getValue() as string) || '-'}
					</span>
				),
			},
			{
				accessorKey: 'vendedor',
				header: 'Vendedor',
				cell: (info) => (
					<span className="text-gray-600 dark:text-gray-300">
						{(info.getValue() as string) || '-'}
					</span>
				),
			},
			{
				id: 'actions',
				header: 'Acciones',
				cell: (info) => (
					<button
						onClick={() => onViewSale(info.row.original.id)}
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
					>
						Ver
					</button>
				),
			},
		],
		[onViewSale]
	);

	const table = useReactTable({
		data: sales,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
	});

	if (loading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
				<div className="flex">
					<div className="ml-3">
						<h3 className="text-sm font-medium text-red-800 dark:text-red-200">
							Error al cargar ventas
						</h3>
						<div className="mt-2 text-sm text-red-700 dark:text-red-300">
							<p>{error}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{/* Search */}
			<div className="flex items-center justify-between">
				<div className="flex-1 max-w-sm">
					<input
						value={globalFilter ?? ''}
						onChange={(e) => setGlobalFilter(e.target.value)}
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400"
						placeholder="Buscar ventas..."
					/>
				</div>
				<div className="text-sm text-gray-700 dark:text-gray-300">
					{table.getFilteredRowModel().rows.length} venta(s)
				</div>
			</div>

			{/* Table */}
			<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
				<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
					<thead className="bg-gray-50 dark:bg-gray-800">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer select-none"
										onClick={header.column.getToggleSortingHandler()}
									>
										<div className="flex items-center space-x-1">
											<span>
												{header.isPlaceholder
													? null
													: flexRender(header.column.columnDef.header, header.getContext())}
											</span>
											<span>
												{{
													asc: '↑',
													desc: '↓',
												}[header.column.getIsSorted() as string] ?? null}
											</span>
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<button
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
					>
						Primera
					</button>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
					>
						Anterior
					</button>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
					>
						Siguiente
					</button>
					<button
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
					>
						Última
					</button>
				</div>
				<div className="flex items-center space-x-2">
					<span className="text-sm text-gray-700 dark:text-gray-300">
						Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
					</span>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => table.setPageSize(Number(e.target.value))}
						className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-600"
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Mostrar {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}