'use client'

import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { Heart, UserCheck, Calendar, Star } from 'lucide-react'

const Dashboard = () => {
  const { user, isOwner, isSitter } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f30cb] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-fredoka font-bold text-gray-800 mb-2">
            Bem-vindo, {user.name || user.email}!
          </h1>
          <p className="text-gray-600 font-inter">
            {isOwner ? 'Gerencie seus pets e reservas' : 'Gerencie seus serviços e agendamentos'}
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-inter">
                {isOwner ? 'Meus Pets' : 'Serviços Ativos'}
              </CardTitle>
              {isOwner ? <Heart className="h-4 w-4 text-[#4f30cb]" /> : <UserCheck className="h-4 w-4 text-[#4f30cb]" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-fredoka">0</div>
              <p className="text-xs text-muted-foreground font-inter">
                {isOwner ? 'Pets cadastrados' : 'Serviços disponíveis'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-inter">
                Reservas
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#4f30cb]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-fredoka">0</div>
              <p className="text-xs text-muted-foreground font-inter">
                {isOwner ? 'Reservas feitas' : 'Reservas recebidas'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-inter">
                {isOwner ? 'Favoritos' : 'Avaliações'}
              </CardTitle>
              <Star className="h-4 w-4 text-[#4f30cb]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-fredoka">0</div>
              <p className="text-xs text-muted-foreground font-inter">
                {isOwner ? 'Cuidadores favoritos' : 'Média de avaliações'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-inter">
                Tipo de Conta
              </CardTitle>
              {isOwner ? <Heart className="h-4 w-4 text-[#4f30cb]" /> : <UserCheck className="h-4 w-4 text-[#4f30cb]" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-fredoka">
                {isOwner ? 'Dono' : 'Cuidador'}
              </div>
              <p className="text-xs text-muted-foreground font-inter">
                {isOwner ? 'Busca cuidadores' : 'Oferece serviços'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka">Ações Rápidas</CardTitle>
              <CardDescription className="font-inter">
                {isOwner ? 'Gerencie seus pets e faça reservas' : 'Configure seus serviços e veja agendamentos'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isOwner ? (
                <>
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium font-inter">Adicionar Pet</h3>
                    <p className="text-sm text-gray-600 font-inter">Cadastre um novo pet</p>
                  </button>
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium font-inter">Buscar Cuidador</h3>
                    <p className="text-sm text-gray-600 font-inter">Encontre cuidadores próximos</p>
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium font-inter">Configurar Serviços</h3>
                    <p className="text-sm text-gray-600 font-inter">Defina seus serviços e preços</p>
                  </button>
                  <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium font-inter">Ver Agendamentos</h3>
                    <p className="text-sm text-gray-600 font-inter">Gerencie suas reservas</p>
                  </button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka">Informações da Conta</CardTitle>
              <CardDescription className="font-inter">
                Dados do seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium font-inter">Nome:</span>
                <span className="text-sm text-gray-600 font-inter">{user.name || 'Não informado'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium font-inter">Email:</span>
                <span className="text-sm text-gray-600 font-inter">{user.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium font-inter">Tipo:</span>
                <span className="text-sm text-gray-600 font-inter">
                  {isOwner ? 'Dono de Pet' : 'Cuidador'}
                </span>
              </div>
              <button className="w-full mt-4 p-3 bg-[#4f30cb] text-white rounded-lg hover:bg-[#4527a8] transition-colors font-medium font-inter">
                Editar Perfil
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
