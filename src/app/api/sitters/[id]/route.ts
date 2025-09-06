import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: sitterId } = await params;

    const sitter = await prisma.sitter.findUnique({
      where: { id: sitterId },
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
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!sitter) {
      return NextResponse.json(
        { error: 'Cuidador não encontrado' },
        { status: 404 }
      );
    }

    // Transformar os dados para o formato esperado pelo frontend
    const caregiver = {
      id: sitter.id,
      name: sitter.name,
      type: sitter.specialties.map(s => s.specialty.name).join(', ') || 'Cuidador',
      distance: '2.5 km', // Mock - pode ser calculado com coordenadas reais
      price: sitter.hourlyRate ? `R$ ${sitter.hourlyRate.toFixed(2)}/hora` : 'R$ 50,00/hora',
      image: sitter.avatar || '/placeholder-pet.jpg',
      services: sitter.offeredServices.map(s => s.service.name),
      about: sitter.bio || 'Cuidador experiente e apaixonado por animais.',
      experience: sitter.experience,
      address: sitter.address ? `${sitter.address.street}, ${sitter.address.number} - ${sitter.address.neighborhood}, ${sitter.address.city}` : 'Endereço não informado',
      phone: sitter.phone,
      email: sitter.email
    };

    return NextResponse.json({
      success: true,
      caregiver
    });

  } catch (error) {
    console.error('Erro ao buscar cuidador:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
