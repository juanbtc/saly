import React from 'react';
import ProductDetailClient from './ProductDetailClient';

interface ProductDetailPageProps {
  params: Promise<{
    codmat: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { codmat } = await params;
  
  return <ProductDetailClient codmat={codmat} />;
}