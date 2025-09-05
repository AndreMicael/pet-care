'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../(components)/ui/button'
import { Input } from '../(components)/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro quando usuário digitar
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email ou senha incorretos')
      } else {
        // Login bem-sucedido
        const session = await getSession()
        if (session?.user) {
          // Redirecionar baseado no tipo de usuário
          if (session.user.userType === 'OWNER') {
            router.push('/dashboard')
          } else {
            router.push('/dashboard')
          }
        }
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Erro ao fazer login com Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-[#4f30cb]" />
            <h1 className="text-3xl font-fredoka font-bold text-[#4f30cb]">PetCare</h1>
          </div>
          <p className="text-gray-600 font-inter">Conecte-se à sua conta</p>
        </div>

        {/* Card de login */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-fredoka text-gray-800">
              Bem-vindo de volta!
            </CardTitle>
            <CardDescription className="text-gray-600 font-inter">
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Exibir erro */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Campo de email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 font-inter">
                  Email
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Campo de senha */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 font-inter">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#4f30cb] focus:ring-[#4f30cb]"
                    required
                    disabled={isLoading}
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

              {/* Esqueci minha senha */}
              <div className="text-right">
                <Link 
                  href="/esqueci-senha" 
                  className="text-sm text-[#4f30cb] hover:text-[#4527a8] font-medium font-inter transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão de login */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[#4f30cb] hover:bg-[#4527a8] text-white font-medium font-inter transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
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

            {/* Botão do Google */}
            <Button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium font-inter transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Entrando...' : 'Entrar com Google'}
            </Button>

            {/* Botão de cadastro */}
            <div className="text-center">
              <p className="text-gray-600 font-inter mb-4">
                Ainda não tem uma conta?
              </p>
              <Link href="/cadastro">
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-[#4f30cb] text-[#4f30cb] hover:bg-[#4f30cb] hover:text-white font-medium font-inter transition-all duration-200"
                >
                  Criar conta
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

export default Login