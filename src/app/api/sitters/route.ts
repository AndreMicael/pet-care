import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

// Instanciar PrismaClient de forma mais robusta
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get('serviceType');
    const location = searchParams.get('location');

    let whereClause: any = {
      isActive: true
    };

    // Se houver filtro por tipo de serviço, buscar sitters que oferecem esse serviço
    if (serviceType) {
      whereClause.specialties = {
        some: {
          specialty: {
            name: {
              contains: serviceType,
              mode: 'insensitive'
            }
          }
        }
      };
    }

    const sitters = await prisma.sitter.findMany({
      where: whereClause,
      include: {
        address: true,
        specialties: {
          include: {
            specialty: true
          }
        },
        reviews: {
          include: {
            owner: true
          }
        }
      },
      orderBy: {
        rating: 'desc'
      }
    });

    // Transformar os dados para o formato esperado pelo frontend
    const caregivers = sitters.map(sitter => ({
      id: sitter.id,
      name: sitter.name,
      type: sitter.specialties.map(s => s.specialty.name).join(', ') || 'Cuidador',
      rating: sitter.rating,
      reviews: sitter.totalReviews,
      distance: '2.5 km', // Mock - pode ser calculado com coordenadas reais
      price: sitter.hourlyRate ? `R$ ${sitter.hourlyRate.toFixed(2)}/hora` : 'R$ 50,00/hora',
      image: sitter.avatar || '/placeholder-pet.jpg',
      services: sitter.specialties.map(s => s.specialty.name),
      about: sitter.bio || 'Cuidador experiente e apaixonado por animais.',
      experience: sitter.experience,
      address: sitter.address ? `${sitter.address.street}, ${sitter.address.number} - ${sitter.address.neighborhood}, ${sitter.address.city}` : 'Endereço não informado',
      phone: sitter.phone,
      email: sitter.email
    }));

    return NextResponse.json({
      success: true,
      caregivers
    });

  } catch (error) {
    console.error('Erro ao buscar cuidadores:', error);
    console.error('Detalhes do erro:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    );
  }
}
