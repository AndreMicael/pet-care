"use client"

import React, { useState } from 'react'
import Link from 'next/link'

interface Cuidador {
  id: number
  name: string
  title: string
  description: string
  price: number
  image: string
  rating: number
  location: string
  specialties: string[]
  experience: string
  availability: string
}
interface FormData {
  petName: string
  petType: string
  petAge: string
  petBreed: string
  ownerName: string
  ownerEmail: string
  ownerPhone: string
  serviceType: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  address: string
  specialInstructions: string
  emergencyContact: string
  emergencyPhone: string
}

const CuidadorForm = ({ cuidador }: { cuidador: Cuidador }) => {
  const [formData, setFormData] = useState<FormData>({
    petName: '',
    petType: '',
    petAge: '',
    petBreed: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    serviceType: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    address: '',
    specialInstructions: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate) return 0
    
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    
    return diffDays * cuidador.price
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simula envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>)
    }

    return stars
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4 font-fredoka">Agendamento Enviado!</h2>
          <p className="text-green-700 mb-6">
            Seu agendamento foi enviado com sucesso para {cuidador.name}. 
            Você receberá uma confirmação por email em breve.
          </p>
          <div className="space-y-2">
            <Link 
              href="/buscar-cuidador"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Voltar para Buscar Cuidadores
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header do Cuidador */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start space-x-6">
          <img 
            src={cuidador.image} 
            alt={cuidador.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-fredoka">{cuidador.name}</h1>
            <p className="text-xl text-blue-600 mb-2 font-fredoka">{cuidador.title}</p>
            <p className="text-gray-600 mb-4">{cuidador.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <span className="text-sm text-gray-500">📍 Localização</span>
                <p className="font-medium">{cuidador.location}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">⭐ Avaliação</span>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(cuidador.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({cuidador.rating})</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">💰 Preço</span>
                <p className="font-medium text-green-600">R$ {cuidador.price}/dia</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">🎯 Especialidades</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cuidador.specialties.map((specialty, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">⏰ Disponibilidade</span>
                <p className="text-sm">{cuidador.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Agendamento */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 font-fredoka">Agendar Cuidado com Pet</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Pet */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-fredoka">Informações do Pet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Pet *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Pet *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Idade
                </label>
                <input
                  type="text"
                  name="petAge"
                  value={formData.petAge}
                  onChange={handleInputChange}
                  placeholder="Ex: 2 anos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Raça
                </label>
                <input
                  type="text"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleInputChange}
                  placeholder="Ex: Golden Retriever"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Informações do Dono */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-fredoka">Informações do Dono</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Detalhes do Serviço */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-fredoka">Detalhes do Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Serviço *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="passeio">Passeio</option>
                  <option value="cuidado-domiciliar">Cuidado Domiciliar</option>
                  <option value="hospedagem">Hospedagem</option>
                  <option value="consulta-veterinaria">Consulta Veterinária</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Fim *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horário de Início
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-fredoka">Informações Adicionais</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instruções Especiais
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Alguma instrução especial para o cuidado do seu pet?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contato de Emergência
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Nome do contato"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone de Emergência
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Telefone do contato"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumo e Total */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-fredoka">Resumo do Agendamento</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">
                  {formData.startDate && formData.endDate ? (
                    <>
                      {new Date(formData.startDate).toLocaleDateString('pt-BR')} até{' '}
                      {new Date(formData.endDate).toLocaleDateString('pt-BR')}
                    </>
                  ) : (
                    'Selecione as datas'
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  {formData.startDate && formData.endDate ? (
                    <>
                      {Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} dias
                    </>
                  ) : (
                    '0 dias'
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  R$ {calculateTotal().toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  R$ {cuidador.price}/dia
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-between items-center pt-6">
            <Link 
              href="/buscar-cuidador"
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Voltar para Buscar Cuidadores
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Agendamento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CuidadorForm
