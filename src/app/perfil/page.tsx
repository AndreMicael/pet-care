'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../(components)/ui/button'
import { Input } from '../(components)/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { User, MapPin, Phone, Mail, Camera, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProfileData {
  name: string
  email: string
  phone: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  zipCode: string
  bio: string
  experience: string
  hourlyRate: string
  avatar: string
}

export default function PerfilPage() {
  const { user, isAuthenticated } = useAuth()
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    zipCode: '',
    bio: '',
    experience: '',
    hourlyRate: '',
    avatar: ''
  })

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Carregar dados do perfil
  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        setLoading(true)
        try {
          const response = await fetch('/api/profile')
          const data = await response.json()
          
          if (data.success) {
            const profile = data.profile
            // Parse do endereço se existir
            let addressParts = {
              street: '',
              number: '',
              complement: '',
              neighborhood: '',
              city: '',
              zipCode: ''
            }
            
            if (profile.address) {
              // Formato: "Rua, número - bairro, cidade"
              const parts = profile.address.split(', ')
              if (parts.length >= 3) {
                const streetNumber = parts[0].split(' ')
                addressParts.street = streetNumber.slice(0, -1).join(' ')
                addressParts.number = streetNumber[streetNumber.length - 1]
                addressParts.neighborhood = parts[1].replace(' - ', '')
                addressParts.city = parts[2]
              }
            }
            
            setProfileData({
              name: profile.name || '',
              email: profile.email || '',
              phone: profile.phone || '',
              street: addressParts.street,
              number: addressParts.number,
              complement: addressParts.complement,
              neighborhood: addressParts.neighborhood,
              city: addressParts.city,
              zipCode: addressParts.zipCode,
              bio: profile.bio || '',
              experience: profile.experience || '',
              hourlyRate: profile.hourlyRate ? profile.hourlyRate.toString() : '',
              avatar: profile.image || ''
            })
            setAvatarPreview(profile.image || '')
          }
        } catch (error) {
          console.error('Erro ao carregar perfil:', error)
          // Fallback para dados básicos do usuário
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            phone: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            zipCode: '',
            bio: '',
            experience: '',
            hourlyRate: '',
            avatar: user.image || ''
          })
          setAvatarPreview(user.image || '')
        } finally {
          setLoading(false)
        }
      }
    }

    loadProfile()
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('name', profileData.name)
      formData.append('email', profileData.email)
      formData.append('phone', profileData.phone)
      formData.append('street', profileData.street)
      formData.append('number', profileData.number)
      formData.append('complement', profileData.complement)
      formData.append('neighborhood', profileData.neighborhood)
      formData.append('city', profileData.city)
      formData.append('zipCode', profileData.zipCode)
      formData.append('bio', profileData.bio)
      formData.append('experience', profileData.experience)
      formData.append('hourlyRate', profileData.hourlyRate)
      
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Perfil atualizado com sucesso!')
        // Atualizar dados do usuário
        if (data.avatar) {
          setProfileData(prev => ({ ...prev, avatar: data.avatar }))
        }
      } else {
        setError(data.error || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      setError('Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated || loading) {
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-[#4f30cb] hover:text-[#4527a8] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Dashboard
          </Link>
          <h1 className="text-3xl font-fredoka font-bold text-gray-800">
            Editar Perfil
          </h1>
          <p className="text-gray-600 font-inter">
            Atualize suas informações pessoais e profissionais
          </p>
        </div>

        {/* Mensagens */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Foto do Perfil
              </CardTitle>
              <CardDescription className="font-inter">
                Adicione uma foto para que os clientes possam te conhecer melhor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#4f30cb] text-white rounded-lg hover:bg-[#4527a8] transition-colors cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    Alterar Foto
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, PNG ou GIF. Máximo 5MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription className="font-inter">
                Seus dados pessoais principais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 font-inter">
                    Nome completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 font-inter">
                  Telefone *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(65) 99999-9999"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="h-12"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Endereço
              </CardTitle>
              <CardDescription className="font-inter">
                Informe seu endereço completo para que os clientes saibam sua localização
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="street" className="text-sm font-medium text-gray-700 font-inter">
                    Rua *
                  </label>
                  <Input
                    id="street"
                    name="street"
                    type="text"
                    placeholder="Nome da rua"
                    value={profileData.street}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="number" className="text-sm font-medium text-gray-700 font-inter">
                    Número *
                  </label>
                  <Input
                    id="number"
                    name="number"
                    type="text"
                    placeholder="123"
                    value={profileData.number}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="complement" className="text-sm font-medium text-gray-700 font-inter">
                  Complemento
                </label>
                <Input
                  id="complement"
                  name="complement"
                  type="text"
                  placeholder="Apto 45, Casa 2, etc."
                  value={profileData.complement}
                  onChange={handleInputChange}
                  className="h-12"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="neighborhood" className="text-sm font-medium text-gray-700 font-inter">
                    Bairro *
                  </label>
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    placeholder="Nome do bairro"
                    value={profileData.neighborhood}
                    onChange={handleInputChange}
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium text-gray-700 font-inter">
                    Cidade *
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4f30cb] focus-visible:border-[#4f30cb] h-12"
                    required
                  >
                    <option value="">Selecione a cidade</option>
                    <option value="CUIABA">Cuiabá</option>
                    <option value="VARZEA_GRANDE">Várzea Grande</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="zipCode" className="text-sm font-medium text-gray-700 font-inter">
                  CEP *
                </label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="78000-000"
                  value={profileData.zipCode}
                  onChange={handleInputChange}
                  className="h-12"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações Profissionais (apenas para cuidadores) */}
          {user?.userType === 'SITTER' && (
            <Card>
              <CardHeader>
                <CardTitle className="font-fredoka">
                  Informações Profissionais
                </CardTitle>
                <CardDescription className="font-inter">
                  Dados sobre seus serviços e experiência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium text-gray-700 font-inter">
                    Biografia
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Conte um pouco sobre você e sua experiência com pets..."
                    value={profileData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#4f30cb] focus-visible:border-[#4f30cb]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium text-gray-700 font-inter">
                      Experiência
                    </label>
                    <Input
                      id="experience"
                      name="experience"
                      type="text"
                      placeholder="Ex: 5 anos cuidando de cães"
                      value={profileData.experience}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="hourlyRate" className="text-sm font-medium text-gray-700 font-inter">
                      Valor por hora (R$)
                    </label>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      placeholder="50"
                      value={profileData.hourlyRate}
                      onChange={handleInputChange}
                      className="h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-4 justify-end">
            <Link href="/dashboard">
              <Button 
                type="button" 
                variant="outline" 
                className="h-12 px-6"
              >
                Cancelar
              </Button>
            </Link>
            <Button 
              type="submit" 
              disabled={saving}
              className="h-12 px-6 bg-[#4f30cb] hover:bg-[#4527a8] text-white"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
