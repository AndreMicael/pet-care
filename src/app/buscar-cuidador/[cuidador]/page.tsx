'use client';

import { useParams } from 'next/navigation';
import { useCaregiver } from '../../../hooks/useAPI';
import CaregiverProfile from '../../(components)/CaregiverProfile';
import LoadingSpinner from '../../(components)/LoadingSpinner';

export default function CuidadorPage() {
  const params = useParams();
  const cuidadorId = params.cuidador as string;
  const { caregiver, loading, error } = useCaregiver(cuidadorId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Cuidador não encontrado</h1>
          <p className="text-gray-600 mb-6">{error || 'O cuidador solicitado não foi encontrado.'}</p>
          <a 
            href="/buscar-cuidador" 
            className="bg-[#4f30cb] text-white px-6 py-3 rounded-lg hover:bg-[#4527a8] transition-colors inline-block"
          >
            Voltar para Busca
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <CaregiverProfile caregiver={caregiver} />
    </div>
  );
}