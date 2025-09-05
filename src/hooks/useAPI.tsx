import { useState, useEffect } from 'react';

// Tipos para os dados
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
  experience?: string;
  address?: string;
  phone?: string;
  email?: string;
  reviewList?: Review[];
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  ownerName: string;
  date: Date;
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
    rating: 4.8,
    reviews: 127,
    distance: '2.5 km',
    price: 'R$ 80/dia',
    image: 'https://i.pravatar.cc/150?img=44',
    services: ['Cães de grande porte', 'Passeio', 'Aplica medicação', 'Day Care'],
    about: 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    type: 'Veterinário',
    rating: 4.9,
    reviews: 89,
    distance: '1.8 km',
    price: 'R$ 120/dia',
    image: 'https://i.pravatar.cc/150?img=13',
    services: ['Consultas veterinárias', 'Emergências', 'Medicação', 'Cuidados especiais'],
    about: 'Veterinário com 7 anos de experiência, especializado em cuidados domiciliares e emergências. Atendo 24 horas por dia, 7 dias por semana.'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    type: 'Pet Sitter',
    rating: 4.7,
    reviews: 156,
    distance: '3.2 km',
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
        
        // Construir query string com filtros
        const queryParams = new URLSearchParams();
        if (filters?.serviceType) {
          queryParams.append('serviceType', filters.serviceType);
        }
        if (filters?.location) {
          queryParams.append('location', filters.location);
        }

        const queryString = queryParams.toString();
        const endpoint = `/api/sitters${queryString ? `?${queryString}` : ''}`;
        
        const response = await apiCall(endpoint);
        
        if (response.success) {
          setCaregivers(response.caregivers);
        } else {
          throw new Error(response.error || 'Erro ao carregar cuidadores');
        }
      } catch (err) {
        console.error('Erro ao buscar cuidadores:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar cuidadores');
        
        // Fallback para dados mock em caso de erro
        setCaregivers(mockCaregivers);
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
        
        const response = await apiCall(`/api/sitters/${id}`);
        
        if (response.success) {
          setCaregiver(response.caregiver);
        } else {
          throw new Error(response.error || 'Erro ao carregar cuidador');
        }
      } catch (err) {
        console.error('Erro ao buscar cuidador:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar cuidador');
        
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

// Função para criar uma reserva
export const createBooking = async (bookingData: BookingData): Promise<APIResponse<any>> => {
  try {
    console.log('Criando reserva:', bookingData);
    
    const response = await apiCall('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
    
    if (response.success) {
      return {
        success: true,
        data: {
          id: response.reservation.id,
          ...response.reservation,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
    } else {
      throw new Error(response.error || 'Erro ao criar reserva');
    }
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar reserva'
    };
  }
};

// Função para buscar uma reserva
export const getBooking = async (bookingId: string): Promise<APIResponse<any>> => {
  try {
    const response = await apiCall(`/api/reservations/${bookingId}`);
    
    if (response.success) {
      return {
        success: true,
        data: response.reservation
      };
    } else {
      throw new Error(response.error || 'Erro ao buscar reserva');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar agendamento'
    };
  }
};

// Função para atualizar status de uma reserva
export const updateBookingStatus = async (bookingId: string, status: string, message?: string): Promise<APIResponse<any>> => {
  try {
    const response = await apiCall(`/api/reservations/${bookingId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, message })
    });
    
    if (response.success) {
      return {
        success: true,
        data: response.reservation
      };
    } else {
      throw new Error(response.error || 'Erro ao atualizar reserva');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar agendamento'
    };
  }
};

// Função para buscar reservas de um cuidador
export const getCaregiverBookings = async (caregiverId: string): Promise<APIResponse<any[]>> => {
  try {
    const response = await apiCall(`/api/reservations?sitterId=${caregiverId}`);
    
    if (response.success) {
      return {
        success: true,
        data: response.reservations
      };
    } else {
      throw new Error(response.error || 'Erro ao buscar reservas');
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar agendamentos'
    };
  }
};