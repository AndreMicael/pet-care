'use client';

import { Search, ArrowUpDown, Star, MapPin } from 'lucide-react';
import { useCaregivers } from '../../hooks/useAPI';
import { ImageWithFallback } from '@/app/(components)/ImageWithFallback';
import { useRouter } from 'next/navigation';

interface Caregiver {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  image: string;
  services: string[];
  about?: string;
}

interface CaregiverListProps {
  onBack?: () => void;
  onSelectCaregiver?: (caregiver: Caregiver) => void;
}

export default function CaregiverList({ onBack, onSelectCaregiver }: CaregiverListProps) {
  const { caregivers, loading, error } = useCaregivers();
  const router = useRouter();
  
  const handleSelectCaregiver = (caregiver: Caregiver) => {
    if (onSelectCaregiver) {
      onSelectCaregiver(caregiver);
    } else {
      router.push(`/buscar-cuidador/${caregiver.id}`);
    }
  };
  
  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="lg:hidden bg-white relative size-full overflow-y-auto">
        {/* Header */}
        
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar Cuidadores"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tags */}
        <div className="px-4 pb-4">
          <div className="flex gap-2 flex-wrap">
            {['Cães de grande porte', 'Aplica medicação', 'Disponível vários dias', 'Passeio'].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Button */}
        <div className="px-4 pb-4">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
              <span>Ordenar por</span>
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-4 pb-2">
          <p className="text-sm text-gray-600">
            {loading ? 'Carregando...' : `${caregivers.length} cuidadores encontrados.`}
          </p>
        </div>

        {/* Loading/Error States */}
        {error && (
          <div className="px-4 py-8 text-center text-red-500">
            <p>Erro ao carregar cuidadores: {error}</p>
          </div>
        )}

        {/* Caregiver Cards */}
        <div className="px-4 space-y-4 pb-8">
          {!loading && !error && caregivers.map((caregiver) => (
            <div 
              key={caregiver.id}
              onClick={() => handleSelectCaregiver(caregiver)}
              className="bg-white h-[109px] rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {/* Profile Image */}
              <div className="absolute h-[75px] left-4 rounded-lg top-4 w-[82px] overflow-hidden">
                <ImageWithFallback
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Caregiver Info */}
              <div className="ml-24">
                <h3 className="font-bold text-[#4f30cb] text-sm mb-1 font-fredoka">
                  {caregiver.name}
                </h3>
                <p className="text-gray-600 text-xs mb-2">
                  {caregiver.type}
                </p>
                
                {/* Rating and Distance */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-gray-600 text-xs">
                      {caregiver.rating} ({caregiver.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-2 h-3 text-gray-400" />
                    <span className="text-gray-600 text-xs">
                      {caregiver.distance}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="flex gap-2 mb-2">
                  {caregiver.services.slice(0, 2).map((service: string) => (
                    <div key={service} className="h-[19px] px-2 rounded-lg border border-gray-200 flex items-center">
                      <span className="text-xs text-gray-700 whitespace-nowrap">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="absolute top-4 right-4">
                <span className="font-semibold text-green-600 text-sm">
                  {caregiver.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-[#4f30cb] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-fredoka mb-1">Cuidadores Encontrados</h2>
              <p className="text-purple-200">
                {loading ? 'Carregando...' : `${caregivers.length} cuidadores disponíveis na sua região`}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Cuiabá - MT</span>
            </div>
          </div>
        </div>

        {/* Search and Filters Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar cuidadores..."
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['Cães de grande porte', 'Aplica medicação', 'Disponível vários dias', 'Passeio'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-md border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                <span>Ordenar por</span>
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-8 text-center text-red-500">
            <p>Erro ao carregar cuidadores: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="p-6">
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-24 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Caregivers Grid */}
        {!loading && !error && (
          <div className="p-6">
            <div className="grid gap-4">
              {caregivers.map((caregiver) => (
                <div
                  key={caregiver.id}
                  onClick={() => handleSelectCaregiver(caregiver)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="flex gap-4">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                        <ImageWithFallback
                          src={caregiver.image}
                          alt={caregiver.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Caregiver Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#4f30cb] font-fredoka mb-1">
                            {caregiver.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{caregiver.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">
                            {caregiver.price}
                          </div>
                          <div className="text-xs text-gray-500">por dia</div>
                        </div>
                      </div>

                      {/* Rating and Distance */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-gray-600 text-sm">
                            {caregiver.rating} ({caregiver.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{caregiver.distance}</span>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="flex gap-2 flex-wrap">
                        {caregiver.services.slice(0, 3).map((service: string) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-md"
                          >
                            {service}
                          </span>
                        ))}
                        {caregiver.services.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                            +{caregiver.services.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button (if needed) */}
            {caregivers.length > 0 && (
              <div className="text-center mt-6">
                <button className="px-6 py-2 bg-[#4f30cb] text-white rounded-lg hover:bg-[#4527a8] transition-all">
                  Carregar mais cuidadores
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export type { Caregiver };
