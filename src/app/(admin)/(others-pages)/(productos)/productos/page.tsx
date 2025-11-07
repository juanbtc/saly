'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import ProductTable from '@/components/productos/ProductTable';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

export default function ProductosPage() {
  const router = useRouter();
  const { products, loading, error } = useProducts();

  const handleViewProduct = (codmat: string) => {
    router.push(`/productos/${encodeURIComponent(codmat)}`);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Gestión de Productos" />
      <div className="mt-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Lista de Productos
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gestiona y visualiza todos los productos del sistema
            </p>
          </div>
          <ProductTable
            products={products}
            loading={loading}
            error={error}
            onViewProduct={handleViewProduct}
          />
        </div>
      </div>
    </div>
  );
}
