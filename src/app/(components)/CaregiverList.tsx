'use client';

import { Search, ArrowUpDown, Filter, ChevronDown } from 'lucide-react';
import { useCaregivers } from '../../hooks/useAPI';
import { ImageWithFallback } from '@/app/(components)/ImageWithFallback';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';

interface Caregiver {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  services: string[];
  about?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  email?: string;
  prices?: {
    hourly?: number;
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  mainPrice?: {
    value: number;
    unit: string;
  };
}

interface CaregiverListProps {
  onBack?: () => void;
  onSelectCaregiver?: (caregiver: Caregiver) => void;
}


export default function CaregiverList({ onBack, onSelectCaregiver }: CaregiverListProps) {
  const { caregivers, loading, error } = useCaregivers();
  const router = useRouter();
  
  // Estados para filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [visibleCount, setVisibleCount] = useState(10);
  
  // Ref para o select de ordenação
  const sortRef = useRef<HTMLDivElement>(null);
  
  // Filtros disponíveis (baseados nos serviços que realmente existem no banco)
  const availableFilters = [
    'Passeio',
    'Creche Meio Período',
    'Creche Integral',
    'Hotelzinho'
  ];
  
  // Fechar select de ordenação quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Função para obter o preço principal do cuidador
  const getMainPrice = (caregiver: Caregiver) => {
    // Usar mainPrice da API se disponível
    if (caregiver.mainPrice && caregiver.mainPrice.value > 0) {
      return caregiver.mainPrice.value;
    }
    
    // Fallback: prioridade daily > hourly > weekly > monthly
    if (caregiver.prices?.daily && caregiver.prices.daily > 0) {
      return caregiver.prices.daily;
    }
    if (caregiver.prices?.hourly && caregiver.prices.hourly > 0) {
      return caregiver.prices.hourly;
    }
    if (caregiver.prices?.weekly && caregiver.prices.weekly > 0) {
      return caregiver.prices.weekly;
    }
    if (caregiver.prices?.monthly && caregiver.prices.monthly > 0) {
      return caregiver.prices.monthly;
    }
    return 50; // Preço padrão se não houver preços
  };
  
  // Filtrar e ordenar cuidadores
  const filteredCaregivers = useMemo(() => {
    let filtered = [...caregivers];
    
    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(caregiver => 
        caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caregiver.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caregiver.services.some(service => 
          service.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Filtro por tags
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(caregiver =>
        selectedFilters.some(filter => 
          caregiver.services.some(service => 
            service.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }
    
    // Ordenação
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'price':
          aValue = getMainPrice(a);
          bValue = getMainPrice(b);
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  }, [caregivers, searchTerm, selectedFilters, sortBy, sortOrder]);
  
  // Cuidadores visíveis (paginação)
  const visibleCaregivers = filteredCaregivers.slice(0, visibleCount);
  const hasMore = visibleCaregivers.length < filteredCaregivers.length;
  
  const handleSelectCaregiver = (caregiver: Caregiver) => {
    if (onSelectCaregiver) {
      onSelectCaregiver(caregiver);
    } else {
      router.push(`/buscar-cuidador/${caregiver.id}`);
    }
  };
  
  const handleFilterToggle = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const handleSortSelect = (sort: 'price' | 'name') => {
    setSortBy(sort);
    setIsSortOpen(false);
  };
  
  const handleSortOrderToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };
  
  // Função para formatar preços
  const formatPrice = (price: number | undefined | null) => {
    if (!price || price === 0) return '0';
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  };
  
  return (
    <div className="w-full">
        {/* Mobile Layout */}
        <div className="lg:hidden bg-white relative size-full overflow-y-auto">
          {/* Search Bar Mobile */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar Cuidadores"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Tags Mobile */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 flex-wrap">
              {availableFilters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleFilterToggle(tag)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedFilters.includes(tag)
                      ? 'bg-[#4f30cb] text-white border-[#4f30cb]'
                      : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Select Mobile */}
          <div className="px-4 pb-4">
            <div className="flex justify-end gap-2">
              <div className="relative" ref={sortRef}>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                >
                  <span>
                    {sortBy === 'price' ? 'Preço' : 'Nome'}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                    <button
                      onClick={() => handleSortSelect('price')}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 hover:text-black ${
                        sortBy === 'price' ? 'bg-[#4f30cb] text-white' : 'text-gray-700'
                      }`}
                    >
                      Preço
                    </button>
                    <button
                      onClick={() => handleSortSelect('name')}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 hover:text-black ${
                        sortBy === 'name' ? 'bg-[#4f30cb] text-white' : 'text-gray-700'
                      }`}
                    >
                      Nome
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={handleSortOrderToggle}
                className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                title={sortOrder === 'asc' ? 'Menor para maior' : 'Maior para menor'}
              >
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-xs">
                  {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
                </span>
              </button>
            </div>
          </div>

          {/* Results Count Mobile */}
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-600">
              {loading ? 'Carregando...' : `${filteredCaregivers.length} cuidadores encontrados.`}
            </p>
          </div>

          {/* Loading/Error States */}
          {error && (
            <div className="px-4 py-8 text-center text-red-500">
              <p>Erro ao carregar cuidadores: {error}</p>
            </div>
          )}

          {/* Caregiver Cards Mobile */}
          <div className="px-4 space-y-4 pb-8">
            {!loading && !error && visibleCaregivers.map((caregiver) => (
              <div 
                key={caregiver.id}
                onClick={() => handleSelectCaregiver(caregiver)}
                className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Profile Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={caregiver.image}
                      alt={caregiver.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Caregiver Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#4f30cb] text-sm mb-1 font-fredoka truncate">
                      {caregiver.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2 truncate">
                      {caregiver.type}
                    </p>

                    {/* Services */}
                    <div className="flex gap-1 flex-wrap">
                      {caregiver.services.slice(0, 2).map((service: string) => (
                        <span key={service} className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded-md">
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

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <span className="font-semibold text-green-600 text-sm">
                      R$ {formatPrice(getMainPrice(caregiver))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Load More Button Mobile */}
            {hasMore && (
              <div className="pt-4">
                <button 
                  onClick={handleLoadMore}
                  className="w-full py-3 bg-[#4f30cb] text-white rounded-lg hover:bg-[#4527a8] transition-all font-medium"
                >
                  Carregar mais cuidadores
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#4f30cb] text-white p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-fredoka mb-1">Cuidadores Encontrados</h2>
                  <p className="text-purple-200">
                    {loading ? 'Carregando...' : `${filteredCaregivers.length} cuidadores disponíveis na sua região`}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-sm">Cuiabá - MT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar cuidadores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4f30cb] focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {availableFilters.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleFilterToggle(tag)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                          selectedFilters.includes(tag)
                            ? 'bg-[#4f30cb] text-white border-[#4f30cb]'
                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative" ref={sortRef}>
                    <button 
                      onClick={() => setIsSortOpen(!isSortOpen)}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      <span>
                        {sortBy === 'price' ? 'Preço' : 'Nome'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isSortOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                        <button
                          onClick={() => handleSortSelect('price')}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 hover:text-black ${
                            sortBy === 'price' ? 'bg-[#4f30cb] text-white' : 'text-gray-700'
                          }`}
                        >
                          Preço
                        </button>
                        <button
                          onClick={() => handleSortSelect('name')}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 hover:text-black ${
                            sortBy === 'name' ? 'bg-[#4f30cb] text-white' : 'text-gray-700'
                          }`}
                        >
                          Nome
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSortOrderToggle}
                    className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
                    title={sortOrder === 'asc' ? 'Menor para maior' : 'Maior para menor'}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span className="text-xs">
                      {sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
                    </span>
                  </button>
                </div>
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
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-24 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Caregivers Grid */}
          {!loading && !error && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-4">
                  {visibleCaregivers.map((caregiver) => (
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
                                R$ {formatPrice(getMainPrice(caregiver))}
                              </div>
                              <div className="text-xs text-gray-500">por dia</div>
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

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-6">
                    <button 
                      onClick={handleLoadMore}
                      className="px-6 py-2 bg-[#4f30cb] text-white rounded-lg hover:bg-[#4527a8] transition-all"
                    >
                      Carregar mais cuidadores
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

export type { Caregiver };