import { useState, useEffect } from 'react';

// Mock data para desenvolvimento
const mockCaregivers = [
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
  },
  {
    id: '4',
    name: 'João Costa',
    type: 'Dog Walker',
    rating: 4.6,
    reviews: 78,
    distance: '1.2 km',
    price: 'R$ 60/dia',
    image: 'https://i.pravatar.cc/150?img=32',
    services: ['Passeios', 'Exercícios', 'Raças grandes', 'Atividades'],
    about: 'Especialista em passeios e exercícios para cães ativos. Trabalho principalmente com raças grandes que precisam de muita atividade física.'
  },
  {
    id: '5',
    name: 'Lucia Ferreira',
    type: 'Cuidador Especializado',
    rating: 4.8,
    reviews: 94,
    distance: '4.1 km',
    price: 'R$ 100/dia',
    image: 'https://i.pravatar.cc/150?img=18',
    services: ['Pets idosos', 'Necessidades especiais', 'Medicação', 'Fisioterapia'],
    about: 'Cuidadora especializada em pets idosos e com necessidades especiais. Ofereço serviços de fisioterapia e cuidados médicos básicos.'
  }
];

interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useCaregivers() {
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        setLoading(true);
        // Simula delay de API
        await delay(1000);
        setCaregivers(mockCaregivers);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, []);

  return { caregivers, loading, error };
}

export function useCaregiver(id: string) {
  const [caregiver, setCaregiver] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCaregiver = async () => {
      try {
        setLoading(true);
        // Simula delay de API
        await delay(500);
        const foundCaregiver = mockCaregivers.find(c => c.id === id);
        if (foundCaregiver) {
          setCaregiver(foundCaregiver);
        } else {
          setError('Cuidador não encontrado');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchCaregiver();
  }, [id]);

  return { caregiver, loading, error };
}

export async function createBooking(bookingData: any): Promise<APIResponse<any>> {
  try {
    // Simula delay de API
    await delay(1500);
    
    // Simula sucesso na criação
    return {
      success: true,
      data: {
        id: Date.now().toString(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao criar agendamento'
    };
  }
}

export async function getBooking(bookingId: string): Promise<APIResponse<any>> {
  try {
    await delay(500);
    return {
      success: true,
      data: {
        id: bookingId,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar agendamento'
    };
  }
}

export async function updateBookingStatus(bookingId: string, status: string, message?: string): Promise<APIResponse<any>> {
  try {
    await delay(500);
    return {
      success: true,
      data: {
        id: bookingId,
        status,
        message,
        updatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao atualizar agendamento'
    };
  }
}

export async function getCaregiverBookings(caregiverId: string): Promise<APIResponse<any[]>> {
  try {
    await delay(500);
    return {
      success: true,
      data: []
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao buscar agendamentos'
    };
  }
}
