'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSale } from '@/hooks/useSale';
import SalesDetail from '@/components/ventas/SalesDetail';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

interface SalesDetailClientProps {
  id: string;
}

export default function SalesDetailClient({ id }: SalesDetailClientProps) {
  const router = useRouter();
  const decodedId = decodeURIComponent(id);
  
  const { sale, loading, error } = useSale(decodedId);

  const handleBack = () => {
    router.push('/ventas');
  };

  return (
    <div>
      <PageBreadcrumb 
        pageTitle={sale ? `Venta #${sale.id}` : 'Detalle de la Venta'} 
      />
      <div className="mt-6">
        <SalesDetail
          sale={sale}
          loading={loading}
          error={error}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}