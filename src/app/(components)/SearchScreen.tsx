'use client';

import { useState } from 'react';
import { Search, MapPin, Heart, Stethoscope, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchScreenProps {
  onSearch?: (type: string, location: string) => void;
}

export default function SearchScreen({ onSearch }: SearchScreenProps) {
  const [selectedType, setSelectedType] = useState('Cuidador');
  const [location, setLocation] = useState('Cuiabá - Mato Grosso');
  const router = useRouter();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(selectedType, location);
    } else {
      // Navega para a página de busca com parâmetros
      const params = new URLSearchParams({
        type: selectedType,
        location: location
      });
      router.push(`/buscar-cuidador?${params.toString()}`);
    }
  };

  const serviceOptions = [
    { type: 'Cuidador', icon: Heart, color: 'from-purple-500 to-blue-500' },
    { type: 'Veterinária', icon: Stethoscope, color: 'from-green-500 to-teal-500' },
    { type: 'Creche', icon: Home, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white relative size-full">
        {/* Header */}
        <div className="bg-[#4f30cb] h-[90px] w-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffb347] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PC</span>
            </div>
            <h1 className="text-2xl font-bold text-[#ffb347] font-fredoka">PetCare</h1>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">☰</span>
          </div>
        </div>

        {/* Hero Image */}
        <div className="h-[267px] bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold font-fredoka mb-2">O que você procura?</h2>
            <p className="text-lg opacity-90">Encontre os melhores cuidadores para seu pet</p>
          </div>
        </div>

        {/* Location Input */}
        <div className="px-6 py-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent"
              placeholder="Digite sua localização"
            />
          </div>
        </div>

        {/* Service Options */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-3 gap-2">
            {serviceOptions.map((service) => {
              const IconComponent = service.icon;
              return (
                <button
                  key={service.type}
                  onClick={() => setSelectedType(service.type)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedType === service.type
                      ? 'border-[#4f30cb] bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                    selectedType === service.type ? 'text-[#4f30cb]' : 'text-gray-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedType === service.type ? 'text-[#4f30cb]' : 'text-gray-700'
                  }`}>
                    {service.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Button */}
        <div className="px-6 py-4">
          <button
            onClick={handleSearch}
            className="w-full bg-[#4f30cb] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#4527a8] transition-colors"
          >
            <Search className="w-5 h-5" />
            Buscar
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="relative mb-6">
              <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <Heart className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-[#4f30cb] mb-4 font-fredoka">
              O que você procura?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Encontre os melhores cuidadores, veterinárias e creches para seu pet em Cuiabá e região
            </p>
          </div>

          {/* Service Selection */}
          <div className="mb-8">
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {serviceOptions.map((service) => {
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.type}
                    onClick={() => setSelectedType(service.type)}
                    className={`group p-6 rounded-lg border-2 transition-all duration-200 ${
                      selectedType === service.type
                        ? 'border-[#4f30cb] bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform group-hover:scale-110 ${
                      selectedType === service.type ? 'bg-[#4f30cb] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className={`font-semibold mb-1 font-fredoka ${
                      selectedType === service.type ? 'text-[#4f30cb]' : 'text-gray-700'
                    }`}>
                      {service.type}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {service.type === 'Cuidador' && 'Cuidadores especializados'}
                      {service.type === 'Veterinária' && 'Clínicas veterinárias'}
                      {service.type === 'Creche' && 'Creches e hotéis'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Input */}
          <div className="mb-8 max-w-md mx-auto">
            <label className="font-semibold text-gray-700 mb-3 text-center flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Onde você está?
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent shadow-sm text-center"
                placeholder="Digite sua localização"
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center">
            <button
              onClick={handleSearch}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#4f30cb] text-white font-semibold rounded-lg hover:bg-[#4527a8] transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Search className="w-5 h-5" />
              <span className="font-fredoka">Buscar {selectedType}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
