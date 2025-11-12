'use client';

import React from 'react';
import { Cliente } from '@/types/clientes';

interface ClienteDetailProps {
  cliente: Cliente | null;
  loading: boolean;
  error: string | null;
  onBack: () => void;
}

export default function ClienteDetail({ cliente, loading, error, onBack }: ClienteDetailProps) {
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
          ← Volver a clientes
        </button>
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error al cargar el cliente
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

  if (!cliente) {
    return (
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
        >
          ← Volver a clientes
        </button>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Cliente no encontrado</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (estado: boolean) => {
    return estado
      ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30'
      : 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30';
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
        >
          ← Volver a clientes
        </button>
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(cliente.estado)}`}>
            {cliente.estado ? 'Activo' : 'Inactivo'}
          </span>
        </div>
      </div>

      {/* Cliente header */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {cliente.name || 'Sin nombre'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Código: {cliente.codcli}
            </p>
            {cliente.zona && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Zona: {cliente.zona}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cliente details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Información Básica
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Dirección
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.direccion || 'No especificada'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Zona
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.zona || 'No especificada'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                NIT
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.nit || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Razón Social
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.razonSocial || 'No especificada'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Estado
              </dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ring-1 ring-inset ${getStatusColor(cliente.estado)}`}>
                  {cliente.estado ? 'Activo' : 'Inactivo'}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Información de Contacto */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Información de Contacto
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Teléfono Principal
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.telefono || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Teléfono Secundario
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.telefono2 || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Correo Electrónico
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.correo || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Contacto 1
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.contacto || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Correo Contacto 1
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.correoContacto1 || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Contacto 2
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.contacto2 || 'No especificado'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Correo Contacto 2
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.correoContacto2 || 'No especificado'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Fechas Importantes */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Fechas Importantes
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cumpleaños Contacto 1
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.fechaCumple1)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Cumpleaños Contacto 2
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.fechaCumple2)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Aniversario
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.fechaAniversario)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Última Visita
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.fechaVisita)}
            </dd>
          </div>
        </dl>
      </div>

      {/* Estado de Documentación */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Estado de Documentación
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Con Documentación
            </dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                cliente.conDocumentacion ? getStatusColor(true) : getStatusColor(false)
              }`}>
                {cliente.conDocumentacion ? 'Sí' : 'No'}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Documentación Completa
            </dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                cliente.documentacionCompleta ? getStatusColor(true) : getStatusColor(false)
              }`}>
                {cliente.documentacionCompleta ? 'Sí' : 'No'}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Visitado
            </dt>
            <dd className="mt-1">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                cliente.visitado ? getStatusColor(true) : getStatusColor(false)
              }`}>
                {cliente.visitado ? 'Sí' : 'No'}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Ubicación */}
      {(cliente.lat || cliente.lng) && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ubicación
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Latitud
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.lat || '-'}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Longitud
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                {cliente.lng || '-'}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Observaciones */}
      {cliente.observaciones && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Observaciones
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {cliente.observaciones}
          </p>
        </div>
      )}

      {/* Timestamps */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6 dark:bg-gray-800 dark:ring-white/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Información del Sistema
        </h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fecha de Creación
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Última Actualización
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {formatDate(cliente.updatedAt)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
