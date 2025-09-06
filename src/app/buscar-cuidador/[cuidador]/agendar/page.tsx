'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCaregiver } from '../../../../hooks/useAPI';
import LoadingSpinner from '../../../(components)/LoadingSpinner';
import { ImageWithFallback } from '../../../(components)/ImageWithFallback';
import { ArrowLeft, Calendar, MapPin, Heart } from 'lucide-react';
import './styles.css';

export default function AgendarPage() {
  const params = useParams();
  const router = useRouter();
  const cuidadorId = params.cuidador as string;
  const { caregiver, loading, error } = useCaregiver(cuidadorId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cuidador não encontrado</h1>
          <p className="text-gray-600 mb-6">{error || 'O cuidador solicitado não foi encontrado.'}</p>
          <a 
            href="/buscar-cuidador" 
            className="bg-[#4f30cb] text-white px-6 py-3 rounded-lg hover:bg-[#4527a8] transition-colors inline-block"
          >
            Voltar para Busca
          </a>
        </div>
      </div>
    );
  }

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
            
            <h1 className="text-lg sm:text-xl font-bold text-[#4f30cb] font-fredoka">
              Agendar Serviço
            </h1>
            
            <div className="w-16 sm:w-20"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6">
          {/* Caregiver Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 font-fredoka">
              Informações do Cuidador
            </h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#4f30cb] text-lg font-fredoka truncate">
                  {caregiver.name}
                </h3>
                <p className="text-gray-600 text-sm">{caregiver.type}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{caregiver.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">{caregiver.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Serviços Oferecidos</h4>
                <div className="flex flex-wrap gap-1">
                  {caregiver.services.slice(0, 2).map((service: string) => (
                    <span
                      key={service}
                      className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-md"
                    >
                      {service}
                    </span>
                  ))}
                  {caregiver.services.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                      +{caregiver.services.length - 2}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Garantias</span>
                </div>
                <ul className="text-xs text-green-700 space-y-0.5">
                  <li>• Cuidador verificado</li>
                  <li>• Seguro incluído</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Google Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#4f30cb] text-white p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold font-fredoka mb-2">
                Formulário de Agendamento
              </h2>
              <p className="text-purple-200 text-sm">
                Complete os dados para agendar com {caregiver.name}
              </p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="google-form-container">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdw7reOnOKmv-LJ1jgRmYfPSSmaRmbiDSlTkeW6aNcRd2TRhg/viewform?embedded=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="google-form-iframe"
                  title="Formulário de Agendamento"
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
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdw7reOnOKmv-LJ1jgRmYfPSSmaRmbiDSlTkeW6aNcRd2TRhg/viewform"
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
    </div>
  );
}