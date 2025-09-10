'use client';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Calendar, User, Phone, Mail, MessageCircle, Shield, Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/(components)/ImageWithFallback';
import { useRouter } from 'next/navigation';
import type { Caregiver } from './CaregiverList';
import type { BookingData } from './BookingForm';

interface BookingConfirmationProps {
  caregiver: Caregiver;
  bookingData: BookingData;
  onBackToHome?: () => void;
}

export default function BookingConfirmation({ caregiver, bookingData, onBackToHome }: BookingConfirmationProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      router.push('/buscar-cuidador');
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white min-h-screen p-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
          <h1 className="text-2xl font-semibold text-[#4f30cb] mb-2">
            Solicitação Enviada!
          </h1>
          <p className="text-gray-600 text-base">
            Sua solicitação foi enviada para {caregiver.name}
          </p>
        </div>

        {/* Booking Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#4f30cb] mb-4">
              Resumo da Solicitação
            </h2>
            
            {/* Caregiver Info */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <ImageWithFallback
                src={caregiver.image}
                alt={caregiver.name}
                className="w-16 h-16 bg-gray-200 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-[#4f30cb]">{caregiver.name}</h3>
                <p className="text-sm text-gray-600">{caregiver.type}</p>
                <p className="text-sm font-semibold text-green-600">{caregiver.price}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-600">
                    {caregiver.rating || 5.0} ({caregiver.reviews || 0} avaliações)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Pet Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pet:</h4>
                <p className="text-gray-600">
                  {bookingData.petName} ({bookingData.petType})
                  {bookingData.petAge && ` - ${bookingData.petAge}`}
                </p>
              </div>

              {/* Service Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Serviço:</h4>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#4f30cb]" />
                  <span className="text-gray-600">
                    {bookingData.serviceType}
                    {bookingData.duration && ` - ${bookingData.duration}`}
                  </span>
                </div>
                {bookingData.startDate && (
                  <p className="text-gray-600">
                    Início: {bookingData.startDate.toLocaleDateString('pt-BR')}
                    {bookingData.endDate && 
                      ` até ${bookingData.endDate.toLocaleDateString('pt-BR')}`
                    }
                  </p>
                )}
              </div>

              {/* Special Requirements */}
              {bookingData.specialRequirements && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Necessidades Especiais:</h4>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                    {bookingData.specialRequirements}
                  </p>
                </div>
              )}

              {/* Contact Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Seus Dados:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#4f30cb]" />
                    <span className="text-gray-600">{bookingData.ownerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#4f30cb]" />
                    <span className="text-gray-600">{bookingData.ownerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#4f30cb]" />
                    <span className="text-gray-600">{bookingData.ownerEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-base font-semibold text-[#4f30cb] mb-4">
              Próximos Passos
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  {caregiver.name} receberá sua solicitação e analisará a disponibilidade
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Você receberá uma resposta por WhatsApp ou telefone em até 24 horas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Se aprovado, vocês poderão acertar os detalhes finais e confirmar o agendamento
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleBackToHome}
            className="w-full bg-[#4f30cb] hover:bg-[#4527a8] text-white py-3 text-base font-semibold"
          >
            Buscar Outros Cuidadores
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.open(`https://wa.me/55${caregiver.phone || '11999999999'}`, '_blank')}
            className="w-full border-[#4f30cb] text-[#4f30cb] hover:bg-[#4f30cb] hover:text-white py-3 text-base font-semibold"
          >
            Entrar em Contato Direto
          </Button>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Número de solicitação: #{Date.now().toString().slice(-6)}
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm p-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#4f30cb] font-fredoka mb-3">
              Solicitação Enviada com Sucesso!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sua solicitação foi enviada para <strong>{caregiver.name}</strong>. 
              Em breve você receberá uma resposta!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Booking Details */}
            <div>
              {/* Booking Summary */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#4f30cb] mb-4">
                    Resumo da Solicitação
                  </h2>
                  
                  {/* Caregiver Info */}
                  <div className="bg-purple-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={caregiver.image}
                          alt={caregiver.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#4f30cb] font-fredoka">
                          {caregiver.name}
                        </h3>
                        <p className="text-gray-600 mb-1">{caregiver.type}</p>
                        <p className="text-xl font-bold text-green-600">{caregiver.price}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-600 text-sm">
                            {caregiver.rating || 5.0} ({caregiver.reviews || 0})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Pet Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Informações do Pet</h4>
                      <p className="text-gray-700">
                        <strong>{bookingData.petName}</strong> ({bookingData.petType})
                        {bookingData.petAge && <span className="text-gray-600"> - {bookingData.petAge}</span>}
                      </p>
                    </div>

                    {/* Service Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Detalhes do Serviço</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#4f30cb]" />
                          <span className="text-gray-700">
                            <strong>{bookingData.serviceType}</strong>
                            {bookingData.duration && ` - ${bookingData.duration}`}
                          </span>
                        </div>
                        {bookingData.startDate && (
                          <p className="text-gray-700 text-sm ml-6">
                            <strong>Início:</strong> {bookingData.startDate.toLocaleDateString('pt-BR')}
                            {bookingData.endDate && 
                              <span> até <strong>{bookingData.endDate.toLocaleDateString('pt-BR')}</strong></span>
                            }
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Special Requirements */}
                    {bookingData.specialRequirements && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Necessidades Especiais</h4>
                        <p className="text-gray-700 text-sm">
                          {bookingData.specialRequirements}
                        </p>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Seus Dados</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#4f30cb]" />
                          <span className="text-gray-700 text-sm">{bookingData.ownerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#4f30cb]" />
                          <span className="text-gray-700 text-sm">{bookingData.ownerPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#4f30cb]" />
                          <span className="text-gray-700 text-sm">{bookingData.ownerEmail}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Next Steps and Actions */}
            <div>
              {/* Next Steps */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#4f30cb] mb-4">
                    Próximos Passos
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Análise da Solicitação</h4>
                        <p className="text-gray-600 text-sm">
                          {caregiver.name} receberá sua solicitação e analisará a disponibilidade.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Resposta em 24h</h4>
                        <p className="text-gray-600 text-sm">
                          Você receberá uma resposta por WhatsApp ou telefone em até 24 horas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#4f30cb] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Confirmação Final</h4>
                        <p className="text-gray-600 text-sm">
                          Vocês poderão acertar os detalhes finais e confirmar o agendamento.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleBackToHome}
                  className="w-full bg-[#4f30cb] hover:bg-[#4527a8] text-white py-3 font-semibold rounded-lg"
                >
                  Buscar Outros Cuidadores
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/55${caregiver.phone || '11999999999'}`, '_blank')}
                  className="w-full border-[#4f30cb] text-[#4f30cb] hover:bg-[#4f30cb] hover:text-white py-3 font-semibold rounded-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Entrar em Contato Direto
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Informações Importantes
                </h4>
                <div className="space-y-2 text-green-700 text-sm">
                  <p>✓ E-mail de confirmação enviado</p>
                  <p>✓ Seus dados estão seguros</p>
                  <p>✓ Primeira consulta gratuita</p>
                </div>
              </div>

              <p className="text-center text-gray-500 mt-4 text-sm">
                <strong>Número da solicitação:</strong> #{Date.now().toString().slice(-6)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
