'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../(components)/ui/button'
import { Input } from '../(components)/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Heart, UserCheck } from 'lucide-react'

const Cadastro = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'owner' | 'sitter'>('owner')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bio: '',
    experience: '',
    hourlyRate: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erros quando usuário digitar
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          userType,
          bio: formData.bio,
          experience: formData.experience,
          hourlyRate: formData.hourlyRate,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Conta criada com sucesso! Redirecionando...')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(data.error || 'Erro ao criar conta')
      }
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-[#4f30cb]" />
            <h1 className="text-3xl font-fredoka font-bold text-[#4f30cb]">PetCare</h1>
          </div>
          <p className="text-gray-600 font-inter">Crie sua conta e comece a cuidar de pets</p>
        </div>

        {/* Card de cadastro */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-fredoka text-gray-800">
              Criar conta
            </CardTitle>
            <CardDescription className="text-gray-600 font-inter">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Seleção de tipo de usuário */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 font-inter mb-3 block">
                Tipo de conta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('owner')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    userType === 'owner'
                      ? 'border-[#4f30cb] bg-[#4f30cb]/5 text-[#4f30cb]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Heart className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium font-inter">Dono de Pet</p>
                  <p className="text-xs text-gray-500 mt-1">Busco cuidadores</p>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('sitter')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    userType === 'sitter'
                      ? 'border-[#4f30cb] bg-[#4f30cb]/5 text-[#4f30cb]'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <UserCheck className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-medium font-inter">Cuidador</p>
                  <p className="text-xs text-gray-500 mt-1">Ofereço serviços</p>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Exibir mensagens */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Informações básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 font-inter">
                    Nome completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 font-inter">
                  Telefone *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(65) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                    required
                  />
                </div>
              </div>

              {/* Campos específicos para cuidadores */}
              {userType === 'sitter' && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-700 font-inter">
                      Biografia
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      placeholder="Conte um pouco sobre você e sua experiência com pets..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
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
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
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
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        className="h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Senhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Senha */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 font-inter">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar senha */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 font-inter">
                    Confirmar senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Digite a senha novamente"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Termos e condições */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 text-[#4f30cb] border-gray-300 rounded focus:ring-[#4f30cb]"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 font-inter">
                  Eu concordo com os{' '}
                  <Link href="/termos" className="text-[#4f30cb] hover:underline">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacidade" className="text-[#4f30cb] hover:underline">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              {/* Botão de cadastro */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[#4f30cb] hover:bg-[#4527a8] text-white font-medium font-inter transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 font-inter">ou</span>
              </div>
            </div>

            {/* Link para login */}
            <div className="text-center">
              <p className="text-gray-600 font-inter mb-4">
                Já tem uma conta?
              </p>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-[#4f30cb] text-[#4f30cb] hover:bg-[#4f30cb] hover:text-white font-medium font-inter transition-all duration-200"
                >
                  Fazer login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Links adicionais */}
        <div className="text-center mt-6 space-y-2">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-[#4f30cb] font-inter transition-colors"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
