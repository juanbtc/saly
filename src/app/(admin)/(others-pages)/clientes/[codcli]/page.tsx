'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCliente } from '@/hooks/useCliente';
import ClienteDetail from '@/components/clientes/ClienteDetail';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

export default function ClienteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const codcli = params.codcli as string;
  const { cliente, loading, error } = useCliente(codcli);

  const handleBack = () => {
    router.push('/clientes');
  };

  return (
    <div>
      <PageBreadcrumb 
        pageTitle={cliente ? `Cliente: ${cliente.name || cliente.codcli}` : 'Detalle del Cliente'} 
      />
      <div className="mt-6">
        <ClienteDetail
          cliente={cliente}
          loading={loading}
          error={error}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
