"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import CuidadorForm from './CuidadorForm'

// Dados mockados dos cuidadores (mesmos dados da página principal)
const cuidadoresData = {
  1: {
    id: 1,
    name: 'Ana Silva',
    title: 'Cuidadora de Cães',
    description: 'Especialista em cuidados com cães de todas as idades. Experiência de 5 anos.',
    price: 80,
    image: 'https://via.placeholder.com/150',
    rating: 4.8,
    location: 'São Paulo, SP',
    specialties: ['Cães', 'Puppies', 'Cães idosos'],
    experience: '5 anos',
    availability: 'Segunda a Sexta, 8h às 18h'
  },
  2: {
    id: 2,
    name: 'Carlos Santos',
    title: 'Pet Sitter',
    description: 'Cuidados completos para gatos e cães. Disponibilidade 24h.',
    price: 120,
    image: 'https://via.placeholder.com/150',
    rating: 4.9,
    location: 'Rio de Janeiro, RJ',
    specialties: ['Cães', 'Gatos', 'Emergências'],
    experience: '7 anos',
    availability: '24 horas, 7 dias por semana'
  },
  3: {
    id: 3,
    name: 'Maria Oliveira',
    title: 'Veterinária',
    description: 'Veterinária com especialização em cuidados domiciliares.',
    price: 150,
    image: 'https://via.placeholder.com/150',
    rating: 5.0,
    location: 'Belo Horizonte, MG',
    specialties: ['Cães', 'Gatos', 'Consultas veterinárias'],
    experience: '10 anos',
    availability: 'Segunda a Sábado, 7h às 19h'
  },
  4: {
    id: 4,
    name: 'João Costa',
    title: 'Dog Walker',
    description: 'Passeios e exercícios para cães ativos. Experiência com raças grandes.',
    price: 60,
    image: 'https://via.placeholder.com/150',
    rating: 4.6,
    location: 'Porto Alegre, RS',
    specialties: ['Passeios', 'Exercícios', 'Raças grandes'],
    experience: '3 anos',
    availability: 'Segunda a Domingo, 6h às 20h'
  },
  5: {
    id: 5,
    name: 'Lucia Ferreira',
    title: 'Pet Care',
    description: 'Cuidados especiais para pets idosos e com necessidades especiais.',
    price: 100,
    image: 'https://via.placeholder.com/150',
    rating: 4.7,
    location: 'Salvador, BA',
    specialties: ['Pets idosos', 'Necessidades especiais', 'Medicação'],
    experience: '6 anos',
    availability: 'Segunda a Sexta, 9h às 17h'
  }
}

export default function CuidadorFormPage() {
  const params = useParams()
  const cuidadorId = parseInt(params.cuidador as string)
  const cuidador = cuidadoresData[cuidadorId as keyof typeof cuidadoresData]

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