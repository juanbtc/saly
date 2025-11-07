import React from 'react';
import SalesDetailClient from './SalesDetailClient';

interface SalesDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SalesDetailPage({ params }: SalesDetailPageProps) {
  const { id } = await params;
  
  return <SalesDetailClient id={id} />;
}