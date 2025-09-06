import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      ownerName,
      ownerEmail,
      ownerPhone,
      emergencyContact,
      petName,
      petType,
      petAge,
      serviceType,
      startDate,
      endDate,
      duration,
      specialRequirements,
      sitterId
    } = body;

    // Validar dados obrigatórios
    if (!ownerName || !ownerEmail || !ownerPhone || !petName || !petType || !serviceType || !startDate || !sitterId) {
      return NextResponse.json(
        { error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      );
    }

    // Simular delay de processamento para MVP
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Retornar dados mockados para MVP
    const mockReservation = {
      id: `reservation_${Date.now()}`,
      ownerName,
      ownerEmail,
      ownerPhone,
      emergencyContact,
      petName,
      petType,
      petAge,
      serviceType,
      startDate,
      endDate,
      duration,
      specialRequirements,
      sitterId,
      status: 'pending',
      totalPrice: 80.00,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      reservation: mockReservation,
      message: 'Reserva criada com sucesso! Você receberá um email de confirmação em breve.'
    });

  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simular delay de carregamento para MVP
    await new Promise(resolve => setTimeout(resolve, 800));

    // Retornar dados mockados para MVP
    const mockReservations = [
      {
        id: 'reservation_1',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
        totalPrice: 80.00,
        observations: 'Pet precisa de medicação',
        owner: {
          name: 'João Silva',
          email: 'joao@email.com',
          phone: '(65) 99999-9999',
          address: 'Rua das Flores, 123 - Centro, Cuiabá - MT'
        },
        sitter: {
          id: '1',
          name: 'Ana Silva',
          email: 'ana@email.com',
          phone: '(65) 88888-8888',
          address: 'Rua dos Cuidadores, 456 - Centro, Cuiabá - MT'
        },
        service: {
          name: 'Day Care',
          price: 80.00,
          serviceType: 'Hospedagem'
        },
        pets: [
          {
            name: 'Rex',
            kind: 'Cachorro',
            age: 3
          }
        ]
      }
    ];

    return NextResponse.json({
      success: true,
      reservations: mockReservations
    });

  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}