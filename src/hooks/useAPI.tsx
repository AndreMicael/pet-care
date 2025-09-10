import { useState, useEffect } from 'react';

// Tipos para os dados
interface Caregiver {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  services: string[];
  about?: string;
  experience?: string;
  address?: string;
  phone?: string;
  email?: string;
  rating?: number;
  reviews?: number;
  prices?: {
    hourly?: number;
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
}

interface BookingData {
  caregiverId: string;
  petName: string;
  petType: string;
  petAge: string;
  serviceType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  duration: string;
  specialRequirements: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  emergencyContact: string;
}

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Mock data para fallback
const mockCaregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Ana Silva',
    type: 'Cuidador de Pets',
    price: 'R$ 80/dia',
    image: 'https://i.pravatar.cc/150?img=44',
    services: ['Cães de grande porte', 'Passeio', 'Aplica medicação', 'Day Care'],
    about: 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    type: 'Veterinário',
    price: 'R$ 120/dia',
    image: 'https://i.pravatar.cc/150?img=13',
    services: ['Consultas veterinárias', 'Emergências', 'Medicação', 'Cuidados especiais'],
    about: 'Veterinário com 7 anos de experiência, especializado em cuidados domiciliares e emergências. Atendo 24 horas por dia, 7 dias por semana.'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    type: 'Pet Sitter',
    price: 'R$ 90/dia',
    image: 'https://i.pravatar.cc/150?img=25',
    services: ['Gatos', 'Pets idosos', 'Necessidades especiais', 'Hospedagem'],
    about: 'Especialista em cuidados com gatos e pets idosos. Tenho experiência com animais que precisam de atenção especial e medicação.'
  }
];

// Função genérica para chamadas de API
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  console.log('Fazendo chamada para:', endpoint);
  
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  console.log('Resposta recebida:', response.status, response.statusText);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Erro na API:', errorData);
    throw new Error(errorData.error || `API call failed: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Dados recebidos:', data);
  return data;
};

// Hook para buscar cuidadores
export const useCaregivers = (filters?: { serviceType?: string; location?: string }) => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construir URL com filtros
        const url = new URL('/api/sitters', window.location.origin);
        if (filters?.serviceType) {
          url.searchParams.set('serviceType', filters.serviceType);
        }
        if (filters?.location) {
          url.searchParams.set('location', filters.location);
        }
        
        const response = await fetch(url.toString());
        const data = await response.json();
        
        if (data.success && data.caregivers) {
          setCaregivers(data.caregivers);
        } else {
          // Fallback para dados mock se a API falhar
          setCaregivers(mockCaregivers);
        }
      } catch (err) {
        console.error('Erro ao buscar cuidadores:', err);
        // Fallback para dados mock em caso de erro
        setCaregivers(mockCaregivers);
        setError('Erro ao carregar cuidadores');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, [filters]);

  return { caregivers, loading, error };
};

// Hook para buscar um cuidador específico
export const useCaregiver = (id: string) => {
  const [caregiver, setCaregiver] = useState<Caregiver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaregiver = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/sitters/${id}`);
        const data = await response.json();
        
        if (data.success && data.caregiver) {
          setCaregiver(data.caregiver);
        } else {
          // Fallback para dados mock se a API falhar
          const mockCaregiver = mockCaregivers.find(c => c.id === id);
          if (mockCaregiver) {
            setCaregiver(mockCaregiver);
          } else {
            setError('Cuidador não encontrado');
          }
        }
      } catch (err) {
        console.error('Erro ao buscar cuidador:', err);
        // Fallback para dados mock em caso de erro
        const mockCaregiver = mockCaregivers.find(c => c.id === id);
        if (mockCaregiver) {
          setCaregiver(mockCaregiver);
        } else {
          setError('Cuidador não encontrado');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCaregiver();
    }
  }, [id]);

  return { caregiver, loading, error };
};

// Função para criar uma reserva (mockada para MVP)
export const createBooking = async (bookingData: BookingData): Promise<APIResponse<any>> => {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Retornar dados mockados
  return {
    success: true,
    data: {
      id: `booking_${Date.now()}`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      totalPrice: 80.00
    }
  };
};

// Função para buscar uma reserva (mockada para MVP)
export const getBooking = async (bookingId: string): Promise<APIResponse<any>> => {
  // Simular delay de carregamento
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Retornar dados mockados
  return {
    success: true,
    data: {
      id: bookingId,
      status: 'pending',
      caregiverId: '1',
      petName: 'Rex',
      petType: 'Cachorro',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      totalPrice: 80.00,
      createdAt: new Date().toISOString()
    }
  };
};

// Função para atualizar status de uma reserva (mockada para MVP)
export const updateBookingStatus = async (bookingId: string, status: string, message?: string): Promise<APIResponse<any>> => {
  // Simular delay de processamento
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Retornar dados mockados
  return {
    success: true,
    data: {
      id: bookingId,
      status: status,
      message: message,
      updatedAt: new Date().toISOString()
    }
  };
};

// Função para buscar reservas de um cuidador (mockada para MVP)
export const getCaregiverBookings = async (caregiverId: string): Promise<APIResponse<any[]>> => {
  // Simular delay de carregamento
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Retornar dados mockados
  return {
    success: true,
    data: [
      {
        id: 'booking_1',
        caregiverId: caregiverId,
        petName: 'Rex',
        petType: 'Cachorro',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        totalPrice: 80.00,
        createdAt: new Date().toISOString()
      }
    ]
  };
};