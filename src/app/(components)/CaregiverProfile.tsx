'use client';

import { ArrowLeft, Calendar, MessageCircle, Heart } from 'lucide-react';
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
        <div className="bg-white h-16 w-full flex items-center justify-between px-4 border-b border-gray-200">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Perfil do Cuidador</h1>
          <button className="p-2">
            <Heart className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Profile Image */}
            <div className="flex items-center gap-4 mb-4">
              <div className="h-20 w-20 rounded-xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#4f30cb] text-lg mb-1 font-fredoka truncate">
                  {caregiver.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {caregiver.type}
                </p>
                
              </div>
            </div>

            {/* Price */}
            <div className="text-center mb-4">
              <span className="font-semibold text-green-600 text-lg">
                {caregiver.price}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 pb-4">
          <div className="flex gap-3">
            <button 
              onClick={handleSchedule}
              className="flex-1 bg-[#4f30cb] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#4527a8] transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Agendar
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg border border-gray-200">
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-gray-700 hidden sm:inline">Chat</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* About Me */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-3">Sobre Mim</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {caregiver.about || 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'}
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 mb-4" />

            {/* Services */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Serviços Oferecidos</h3>
              <div className="flex flex-wrap gap-2">
                {caregiver.services.map((service: string) => (
                  <span
                    key={service}
                    className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-md border border-purple-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="max-w-4xl mx-auto p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Profile Info */}
            <div>
              {/* Profile Header */}
              <div className="bg-[#4f30cb] rounded-lg p-6 text-white mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-white/20">
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
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Sobre Mim</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {caregiver.about || 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'}
                </p>
              </div>
            </div>

            {/* Right Column - Services */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Serviços Oferecidos</h3>
                <div className="grid grid-cols-1 gap-3">
                  {caregiver.services.map((service: string) => (
                    <div key={service} className="bg-purple-50 text-purple-700 px-4 py-3 rounded-md text-sm font-medium border border-purple-200">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}