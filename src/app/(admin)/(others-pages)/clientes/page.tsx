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

  return (
    <div>
      <PageBreadcrumb pageTitle="Gestión de Clientes" />
      <div className="mt-6">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
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
