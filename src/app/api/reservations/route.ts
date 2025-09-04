import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

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

    // Verificar se o sitter existe
    const sitter = await prisma.sitter.findUnique({
      where: { id: sitterId }
    });

    if (!sitter) {
      return NextResponse.json(
        { error: 'Cuidador não encontrado' },
        { status: 404 }
      );
    }

    // Buscar ou criar o owner
    let owner = await prisma.owner.findUnique({
      where: { email: ownerEmail }
    });

    if (!owner) {
      owner = await prisma.owner.create({
        data: {
          name: ownerName,
          email: ownerEmail,
          phone: ownerPhone
        }
      });

      // Criar endereço padrão para o owner (pode ser atualizado depois)
      await prisma.address.create({
        data: {
          street: 'Endereço não informado',
          number: '0',
          city: 'Cuiabá',
          state: 'MT',
          cep: '78000-000',
          neighborhood: 'Centro',
          ownerId: owner.id
        }
      });
    } else {
      // Atualizar dados do owner se necessário
      owner = await prisma.owner.update({
        where: { id: owner.id },
        data: {
          name: ownerName,
          phone: ownerPhone
        }
      });
    }

    // Buscar o serviço baseado no tipo
    const service = await prisma.service.findFirst({
      where: {
        name: {
          contains: serviceType,
          mode: 'insensitive'
        },
        isActive: true
      },
      include: {
        serviceType: true
      }
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      );
    }

    // Criar o pet
    const pet = await prisma.pet.create({
      data: {
        name: petName,
        kind: petType,
        age: petAge ? parseInt(petAge) : null,
        comorbidity: specialRequirements || null,
        ownerId: owner.id
      }
    });

    // Calcular preço total (simplificado - pode ser melhorado)
    const totalPrice = service.price;

    // Criar a reserva
    const reservation = await prisma.reservation.create({
      data: {
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : new Date(startDate),
        totalPrice,
        observations: specialRequirements || null,
        ownerId: owner.id,
        sitterId: sitter.id,
        serviceId: service.id,
        status: 'PENDING'
      },
      include: {
        owner: true,
        sitter: true,
        service: {
          include: {
            serviceType: true
          }
        }
      }
    });

    // Associar o pet à reserva
    await prisma.reservationPet.create({
      data: {
        reservationId: reservation.id,
        petId: pet.id
      }
    });

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation.id,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        status: reservation.status,
        totalPrice: reservation.totalPrice,
        observations: reservation.observations,
        owner: {
          name: reservation.owner.name,
          email: reservation.owner.email,
          phone: reservation.owner.phone,
          address: reservation.owner.address ? `${reservation.owner.address.street}, ${reservation.owner.address.number} - ${reservation.owner.address.neighborhood}, ${reservation.owner.address.city} - ${reservation.owner.address.state}` : 'Endereço não informado'
        },
        sitter: {
          id: reservation.sitter.id,
          name: reservation.sitter.name,
          email: reservation.sitter.email,
          phone: reservation.sitter.phone,
          address: reservation.sitter.address ? `${reservation.sitter.address.street}, ${reservation.sitter.address.number} - ${reservation.sitter.address.neighborhood}, ${reservation.sitter.address.city} - ${reservation.sitter.address.state}` : 'Endereço não informado'
        },
        service: {
          name: reservation.service.name,
          price: reservation.service.price,
          serviceType: reservation.service.serviceType.name
        },
        pet: {
          name: pet.name,
          kind: pet.kind,
          age: pet.age
        }
      }
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
    const { searchParams } = new URL(request.url);
    const ownerEmail = searchParams.get('ownerEmail');
    const sitterId = searchParams.get('sitterId');

    let whereClause: any = {};

    if (ownerEmail) {
      whereClause.owner = { email: ownerEmail };
    }

    if (sitterId) {
      whereClause.sitterId = sitterId;
    }

    const reservations = await prisma.reservation.findMany({
      where: whereClause,
      include: {
        owner: {
          include: {
            address: true
          }
        },
        sitter: {
          include: {
            address: true
          }
        },
        service: {
          include: {
            serviceType: true
          }
        },
        pets: {
          include: {
            pet: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      reservations: reservations.map(reservation => ({
        id: reservation.id,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        status: reservation.status,
        totalPrice: reservation.totalPrice,
        observations: reservation.observations,
        owner: {
          name: reservation.owner.name,
          email: reservation.owner.email,
          phone: reservation.owner.phone,
          address: reservation.owner.address ? `${reservation.owner.address.street}, ${reservation.owner.address.number} - ${reservation.owner.address.neighborhood}, ${reservation.owner.address.city} - ${reservation.owner.address.state}` : 'Endereço não informado'
        },
        sitter: {
          id: reservation.sitter.id,
          name: reservation.sitter.name,
          email: reservation.sitter.email,
          phone: reservation.sitter.phone,
          address: reservation.sitter.address ? `${reservation.sitter.address.street}, ${reservation.sitter.address.number} - ${reservation.sitter.address.neighborhood}, ${reservation.sitter.address.city} - ${reservation.sitter.address.state}` : 'Endereço não informado'
        },
        service: {
          name: reservation.service.name,
          price: reservation.service.price,
          serviceType: reservation.service.serviceType.name
        },
        pets: reservation.pets.map(rp => ({
          name: rp.pet.name,
          kind: rp.pet.kind,
          age: rp.pet.age
        }))
      }))
    });

  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
