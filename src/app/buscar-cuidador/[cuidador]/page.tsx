"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import CuidadorForm from './CuidadorForm'
import { mockCuidadores } from '../BuscarCuidador'

// Dados mockados dos cuidadores (mesmos dados da página principal)
const cuidadoresData = mockCuidadores

export default function CuidadorFormPage() {
  const params = useParams()
  const cuidadorId = parseInt(params.cuidador as string)
  const cuidador = cuidadoresData.find(c => c.id === cuidadorId)

  if (!cuidador) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Cuidador não encontrado</h1>
          <p className="text-gray-600">O cuidador solicitado não existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CuidadorForm cuidador={cuidador} />
    </div>
  )
}