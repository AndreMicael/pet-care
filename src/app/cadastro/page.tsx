'use client';

import { Button } from '../(components)/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../(components)/ui/card'
import { Heart, UserCheck, ExternalLink, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Cadastro = () => {
  const router = useRouter()

  const handleGoogleFormRedirect = () => {
    // URL do Google Form para cuidadores
    const formUrl = 'https://forms.gle/SEU_FORM_SITTER_AQUI'
    
    window.open(formUrl, '_blank')
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
          <p className="text-gray-600 font-inter">Cadastre-se como cuidador de pets</p>
        </div>

        {/* Card de cadastro */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-fredoka text-gray-800">
              Seja um Cuidador PetCare
            </CardTitle>
            <CardDescription className="text-gray-600 font-inter">
              Preencha nosso formulário para começar a oferecer seus serviços
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Card de cadastro único */}
            <div className="p-6 sm:p-8 border-2 border-[#4f30cb] rounded-lg bg-gradient-to-br from-[#4f30cb]/5 to-[#4f30cb]/10 cursor-pointer group transition-all duration-200 hover:shadow-lg"
                 onClick={handleGoogleFormRedirect}>
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-[#4f30cb]/20 rounded-full flex items-center justify-center group-hover:bg-[#4f30cb]/30 transition-colors">
                  <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-[#4f30cb]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 font-fredoka">
                  Cadastre-se como Cuidador
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">
                  Ofereça seus serviços de cuidado para pets e conecte-se com donos que precisam de ajuda
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#4f30cb] text-base sm:text-lg font-medium group-hover:text-[#4527a8] transition-colors">
                  <span>Preencher formulário</span>
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Como funciona?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Clique no botão acima para acessar o formulário</li>
                <li>• Preencha todas as informações solicitadas</li>
                <li>• Nossa equipe analisará seu cadastro</li>
                <li>• Você receberá um email de confirmação</li>
                <li>• Seu perfil será publicado na plataforma</li>
              </ul>
            </div>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Botão voltar */}
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cadastro