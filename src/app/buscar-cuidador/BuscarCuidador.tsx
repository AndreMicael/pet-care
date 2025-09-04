"use client"

import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import ServiceCard from '../(components)/ServiceCard'

// Dados mockados dos cuidadores
export const mockCuidadores = [
  {
    id: 1,
    name: 'Ana Silva',
    title: 'Pet Sitter',
    description: 'Especialista em cuidados com cães de todas as idades. Experiência de 5 anos.',
    price: 80,
    image: 'https://i.pravatar.cc/150?img=44',
    rating: 4.8,
    location: 'São Paulo, SP',
    specialties: ['Cães', 'Puppies', 'Cães idosos'],
    experience: '5 anos',
    availability: 'Segunda a Sexta, 8h às 18h',
    linkForm: '/buscar-cuidador/1'
  },
  {
    id: 2,
    name: 'Carlos Santos',
    title: 'Pet Sitter',
    description: 'Cuidados completos para gatos e cães. Disponibilidade 24h.',
    price: 120,
    image: 'https://i.pravatar.cc/150?img=13',
    rating: 4.9,
    location: 'Rio de Janeiro, RJ',
    specialties: ['Cães', 'Gatos', 'Emergências'],
    experience: '7 anos',
    availability: '24 horas, 7 dias por semana',
    linkForm: '/buscar-cuidador/2'
  },
  {
    id: 3,
    name: 'Maria Oliveira',
    title: 'Veterinária',
    description: 'Veterinária com especialização em cuidados domiciliares.',
    price: 150,
    image: 'https://i.pravatar.cc/150',
    rating: 5.0,
    location: 'Belo Horizonte, MG',
    specialties: ['Cães', 'Gatos', 'Consultas veterinárias'],
    experience: '10 anos',
    availability: 'Segunda a Sábado, 7h às 19h',
    linkForm: '/buscar-cuidador/3'
  },
  {
    id: 4,
    name: 'João Costa',
    title: 'Dog Walker',
    description: 'Passeios e exercícios para cães ativos. Experiência com raças grandes.',
    price: 60,
    image: 'https://i.pravatar.cc/150',
    rating: 4.6,
    location: 'Porto Alegre, RS',
    specialties: ['Passeios', 'Exercícios', 'Raças grandes'],
    experience: '3 anos',
    availability: 'Segunda a Domingo, 6h às 20h',
    linkForm: '/buscar-cuidador/4'
  },
  {
    id: 5,
    name: 'Lucia Ferreira',
    title: 'Pet Care',
    description: 'Cuidados especiais para pets idosos e com necessidades especiais.',
    price: 100,
    image: 'https://i.pravatar.cc/150',
    rating: 4.7,
    location: 'Salvador, BA',
    specialties: ['Pets idosos', 'Necessidades especiais', 'Medicação'],
    experience: '6 anos',
    availability: 'Segunda a Sexta, 9h às 17h',
    linkForm: '/buscar-cuidador/5'
  }
]

interface Cuidador {
  id: number
  title: string
  description: string
  price: number
  image: string
  rating: number
  location: string
  linkForm: string
}

const BuscarCuidador = () => {
    const [cuidadores, setCuidadores] = useState<Cuidador[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
  
    // Simula carregamento dos dados
    useEffect(() => {
        const loadCuidadores = () => {
            setLoading(true)
            // Simula delay de API
            setTimeout(() => {
                setCuidadores(mockCuidadores)
                setLoading(false)
                setError(null)
            }, 1000)
        }
        
        loadCuidadores()
    }, [])

    const handleCuidador = (cuidador: Cuidador) => {
        console.log('Cuidador selecionado:', cuidador)
        // Aqui você pode adicionar lógica para navegar para detalhes do cuidador
        // router.push(`/cuidador/${cuidador.id}`)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Carregando cuidadores...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">Erro ao carregar cuidadores: {error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 font-fredoka">Encontre o Cuidador Ideal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cuidadores.map((cuidador: Cuidador) => (
                    <ServiceCard 
                        key={cuidador.id} 
                        {...cuidador} 
                        handleCuidador={handleCuidador} 
                    />
                ))}
            </div>
        </div>
    )
}

export default BuscarCuidador