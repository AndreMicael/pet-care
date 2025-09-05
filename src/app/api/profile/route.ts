import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@/generated/prisma"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      )
    }

    // Retornar dados baseados no tipo de usuário
    let profileData = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      userType: user.userType,
      phone: '',
      address: '',
      bio: '',
      experience: '',
      hourlyRate: null
    }

    if (user.userType === 'SITTER' && user.sitter) {
      profileData = {
        ...profileData,
        phone: user.sitter.phone,
        address: user.sitter.address ? `${user.sitter.address.street}, ${user.sitter.address.number} - ${user.sitter.address.neighborhood}, ${user.sitter.address.city}` : '',
        bio: user.sitter.bio || '',
        experience: user.sitter.experience || '',
        hourlyRate: user.sitter.hourlyRate
      }
    } else if (user.userType === 'OWNER' && user.owner) {
      profileData = {
        ...profileData,
        phone: user.owner.phone,
        address: user.owner.address ? `${user.owner.address.street}, ${user.owner.address.number} - ${user.owner.address.neighborhood}, ${user.owner.address.city}` : ''
      }
    }

    return NextResponse.json({
      success: true,
      profile: profileData
    })

  } catch (error) {
    console.error("Erro ao buscar perfil:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
