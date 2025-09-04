'use client';

import { ArrowLeft, Calendar, MessageCircle, Star, MapPin, Heart, Shield, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '@/app/(components)/ImageWithFallback';
import { useRouter } from 'next/navigation';
import type { Caregiver } from './CaregiverList';

interface CaregiverProfileProps {
  caregiver: Caregiver;
  onBack?: () => void;
  onSchedule?: (caregiver: Caregiver) => void;
}

export default function CaregiverProfile({ caregiver, onBack, onSchedule }: CaregiverProfileProps) {
  const router = useRouter();
  
  const services = [
    'Cães de grande porte',
    'Passeio', 
    'Espaço Amplo',
    'Aplica Medicação',
    'Day Care'
  ];

  const reviews = [
    {
      id: 1,
      author: "Maria Silva",
      rating: 5,
      comment: "Excelente cuidadora! Meu cachorro ficou muito bem cuidado.",
      date: "2 dias atrás"
    },
    {
      id: 2,
      author: "João Santos",
      rating: 5,
      comment: "Muito atenciosa e carinhosa. Recomendo!",
      date: "1 semana atrás"
    },
    {
      id: 3,
      author: "Ana Costa",
      rating: 4,
      comment: "Ótimo serviço, meu pet se divertiu muito.",
      date: "2 semanas atrás"
    }
  ];

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule(caregiver);
    } else {
      router.push(`/buscar-cuidador/${caregiver.id}/agendar`);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white relative size-full overflow-y-auto">
        {/* Header */}
        <div className="bg-white h-[90px] w-full flex items-center justify-between px-6 border-b border-gray-200">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Perfil do Cuidador</h1>
          <button className="p-2">
            <Heart className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-6">
          <div className="bg-white h-[186px] rounded-lg border border-gray-200 p-6">
            {/* Profile Image */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[105px] w-[105px] rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h2 className="font-bold text-[#4f30cb] text-lg mb-1 font-fredoka">
                  {caregiver.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {caregiver.type}
                </p>
                
                {/* Rating and Distance */}
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-600 text-sm">
                    {caregiver.rating} ({caregiver.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">
                    {caregiver.distance}
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="text-center">
              <span className="font-semibold text-green-600 text-lg">
                {caregiver.price}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex gap-4">
            <button 
              onClick={handleSchedule}
              className="flex-1 bg-[#4f30cb] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#4527a8] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Agendar
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg border border-gray-200">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-gray-700">Chat</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="px-6 pb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* About Me */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Sobre Mim</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {caregiver.about || 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'}
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-6" />

            {/* Services */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Serviços Oferecidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <div key={service} className="h-[19px] px-3 rounded-lg border border-gray-200 flex items-center">
                    <span className="text-xs text-gray-700 whitespace-nowrap">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Avaliações</h3>
              <p className="text-gray-600 text-sm">
                {caregiver.rating} ⭐ ({caregiver.reviews} avaliações)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* Left Column - Profile Info */}
          <div>
            {/* Profile Header */}
            <div className="bg-[#4f30cb] rounded-lg p-6 text-white mb-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/20">
                  <ImageWithFallback
                    src={caregiver.image}
                    alt={caregiver.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold font-fredoka mb-1">
                    {caregiver.name}
                  </h1>
                  <p className="text-purple-200 mb-3">{caregiver.type}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-current" />
                      <span className="text-white/90 text-sm">
                        {caregiver.rating} ({caregiver.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{caregiver.distance}</span>
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-green-300">
                    {caregiver.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleSchedule}
                className="flex-1 bg-[#4f30cb] text-white px-4 py-3 rounded-lg hover:bg-[#4527a8] transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <Calendar className="w-4 h-4" />
                Agendar Cuidado
              </button>

              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>

              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-3 rounded-lg transition-all">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 rounded-lg p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Sobre Mim</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {caregiver.about || 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Serviços Oferecidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => (
                  <div key={service} className="bg-purple-50 text-purple-700 px-3 py-2 rounded-md text-sm text-center font-medium">
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Reviews and Additional Info */}
          <div>
            {/* Reviews Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Avaliações ({caregiver.reviews})
              </h3>
              
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#4f30cb] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{review.author}</div>
                          <div className="text-xs text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors text-sm">
                Ver todas as avaliações
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Informações Adicionais
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 text-sm">Verificada e aprovada</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 text-sm">Seguro para pets incluído</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 text-sm">Disponível finais de semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 text-sm">Primeira consulta gratuita</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
