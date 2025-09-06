'use client';

import { Heart, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import './styles.css'

const Cadastro = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Voltar</span>
            </button>
            
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-[#4f30cb]" />
              <h1 className="text-lg sm:text-xl font-bold text-[#4f30cb] font-fredoka">
                Cadastro de Cuidador
              </h1>
            </div>
            
            <div className="w-16 sm:w-20"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Google Form Embed */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#4f30cb] text-white p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold font-fredoka mb-2">
              Formulário de Cadastro
            </h2>
            <p className="text-purple-200 text-sm">
              Preencha todos os dados para se tornar um cuidador PetCare
            </p>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="google-form-container">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeF4L83019IHsXGDpXTlguZVsuYSpaq3XDBy_GOBstUCqPapg/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="google-form-iframe"
                title="Formulário de Cadastro"
                loading="lazy"
              >
                <div className="google-form-loading">
                  Carregando formulário...
                </div>
              </iframe>
              <div className="google-form-overlay"></div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Problemas? 
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeF4L83019IHsXGDpXTlguZVsuYSpaq3XDBy_GOBstUCqPapg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4f30cb] hover:underline ml-1"
                >
                  Abrir em nova aba
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro