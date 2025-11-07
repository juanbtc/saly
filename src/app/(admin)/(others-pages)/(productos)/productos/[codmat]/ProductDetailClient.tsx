'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/hooks/useProduct';
import ProductDetail from '@/components/productos/ProductDetail';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

interface ProductDetailClientProps {
  codmat: string;
}

export default function ProductDetailClient({ codmat }: ProductDetailClientProps) {
  const router = useRouter();
  const decodedCodmat = decodeURIComponent(codmat);
  
  const { product, loading, error } = useProduct(decodedCodmat);

  const handleBack = () => {
    router.push('/productos');
  };

  return (
    <div>
      <PageBreadcrumb 
        pageTitle={product ? `Producto: ${product.nombre}` : 'Detalle del Producto'} 
      />
      <div className="mt-6">
        <ProductDetail
          product={product}
          loading={loading}
          error={error}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}