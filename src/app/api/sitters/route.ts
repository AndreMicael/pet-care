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
        offeredServices: {
          include: {
            service: true
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
    const caregivers = sitters.map(sitter => {
      // Determinar o preço principal baseado na disponibilidade
      let priceDisplay = 'R$ 50,00/dia';
      let priceUnit = '/dia';
      
      if (sitter.dayRate && sitter.dayRate > 0) {
        priceDisplay = `R$ ${sitter.dayRate.toFixed(2)}/dia`;
        priceUnit = '/dia';
      } else if (sitter.hourlyRate && sitter.hourlyRate > 0) {
        priceDisplay = `R$ ${sitter.hourlyRate.toFixed(2)}/hora`;
        priceUnit = '/hora';
      } else if (sitter.weekRate && sitter.weekRate > 0) {
        priceDisplay = `R$ ${sitter.weekRate.toFixed(2)}/semana`;
        priceUnit = '/semana';
      } else if (sitter.monthRate && sitter.monthRate > 0) {
        priceDisplay = `R$ ${sitter.monthRate.toFixed(2)}/mês`;
        priceUnit = '/mês';
      }

      return {
        id: sitter.id,
        name: sitter.name,
        type: sitter.specialties.map(s => s.specialty.name).join(', ') || 'Cuidador',
        price: priceDisplay,
        image: sitter.avatar || '/placeholder-pet.jpg',
        services: sitter.offeredServices.map(s => s.service.name),
        about: sitter.bio || 'Cuidador experiente e apaixonado por animais.',
        experience: sitter.experience,
        address: sitter.address ? `${sitter.address.street}, ${sitter.address.number} - ${sitter.address.neighborhood}, ${sitter.address.city}` : 'Endereço não informado',
        phone: sitter.phone,
        email: sitter.email,
        // Adicionar todos os preços disponíveis
        prices: {
          hourly: sitter.hourlyRate || 0,
          daily: sitter.dayRate || 0,
          weekly: sitter.weekRate || 0,
          monthly: sitter.monthRate || 0
        },
        // Adicionar informações sobre o preço principal
        mainPrice: {
          value: sitter.dayRate || sitter.hourlyRate || sitter.weekRate || sitter.monthRate || 50,
          unit: priceUnit
        }
      };
    });

    return NextResponse.json({
      success: true,
      caregivers
    });

  } catch (error:any) {
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
