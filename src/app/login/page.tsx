'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../(components)/ui/button'
import { Input } from '../(components)/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a lógica de login
    console.log('Dados do login:', formData)
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
                className="w-full h-12 bg-[#4f30cb] hover:bg-[#4527a8] text-white font-medium font-inter transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Entrar
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