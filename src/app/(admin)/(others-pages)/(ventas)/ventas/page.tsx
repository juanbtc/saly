'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSales } from '@/hooks/useSales';
import SalesTable from '@/components/ventas/SalesTable';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

export default function VentasPage() {
  const router = useRouter();
  const { sales, loading, error } = useSales();

  const handleViewSale = (id: string | number) => {
    router.push(`/ventas/${encodeURIComponent(id)}`);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Gestión de Ventas" />
      <div className="mt-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Lista de Ventas
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y visualiza todas las ventas del sistema
            </p>
          </div>
          <SalesTable
            sales={sales}
            loading={loading}
            error={error}
            onViewSale={handleViewSale}
          />
        </div>
      </div>
    </div>
  );
}