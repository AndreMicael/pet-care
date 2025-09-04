'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useCaregiver } from '../../../../hooks/useAPI';
import BookingConfirmation from '../../../(components)/BookingConfirmation';
import LoadingSpinner from '../../../(components)/LoadingSpinner';

export default function ConfirmacaoPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const cuidadorId = params.cuidador as string;
  const { caregiver, loading, error } = useCaregiver(cuidadorId);

  // Dados do agendamento vindos dos parâmetros da URL
  const bookingData = {
    caregiverId: cuidadorId,
    petName: searchParams.get('petName') || 'Rex',
    petType: searchParams.get('petType') || 'Cachorro',
    petAge: searchParams.get('petAge') || '2 anos',
    serviceType: searchParams.get('serviceType') || 'Day Care',
    startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : new Date(),
    endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
    duration: searchParams.get('duration') || 'Período integral',
    specialRequirements: searchParams.get('specialRequirements') || '',
    ownerName: searchParams.get('ownerName') || 'João Silva',
    ownerPhone: searchParams.get('ownerPhone') || '(65) 99999-9999',
    ownerEmail: searchParams.get('ownerEmail') || 'joao@email.com',
    emergencyContact: searchParams.get('emergencyContact') || ''
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cuidador não encontrado</h1>
          <p className="text-gray-600 mb-6">{error || 'O cuidador solicitado não foi encontrado.'}</p>
          <a 
            href="/buscar-cuidador" 
            className="bg-[#4f30cb] text-white px-6 py-3 rounded-lg hover:bg-[#4527a8] transition-colors"
          >
            Voltar para Busca
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BookingConfirmation caregiver={caregiver} bookingData={bookingData} />
    </div>
  );
}
