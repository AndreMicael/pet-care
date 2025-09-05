import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from "@/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const street = formData.get('street') as string
    const number = formData.get('number') as string
    const complement = formData.get('complement') as string
    const neighborhood = formData.get('neighborhood') as string
    const city = formData.get('city') as string
    const zipCode = formData.get('zipCode') as string
    const bio = formData.get('bio') as string
    const experience = formData.get('experience') as string
    const hourlyRate = formData.get('hourlyRate') as string
    const avatarFile = formData.get('avatar') as File | null

    // Validar dados obrigatórios
    if (!name || !email || !phone || !street || !number || !neighborhood || !city || !zipCode) {
      return NextResponse.json(
        { error: "Nome, email, telefone e endereço completo são obrigatórios" },
        { status: 400 }
      )
    }

    // Verificar se o email já existe em outro usuário
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
        id: { not: session.user.id }
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está sendo usado por outro usuário" },
        { status: 400 }
      )
    }

    let avatarUrl = null

    // Processar upload do avatar se fornecido
    if (avatarFile && avatarFile.size > 0) {
      // Em um ambiente real, você faria upload para um serviço como AWS S3, Cloudinary, etc.
      // Por enquanto, vamos simular o upload
      const bytes = await avatarFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Aqui você salvaria o arquivo e obteria a URL
      // Por simplicidade, vamos usar uma URL mock
      avatarUrl = `/uploads/avatars/${Date.now()}-${avatarFile.name}`
      
      // Em produção, você salvaria o buffer no sistema de arquivos ou serviço de nuvem
      console.log(`Avatar salvo: ${avatarUrl}`)
    }

    // Criar ou atualizar endereço
    const address = await prisma.address.upsert({
      where: { 
        street_number_city: {
          street,
          number,
          city: city as 'CUIABA' | 'VARZEA_GRANDE'
        }
      },
      update: {
        complement,
        neighborhood,
        zipCode
      },
      create: {
        street,
        number,
        complement,
        neighborhood,
        city: city as 'CUIABA' | 'VARZEA_GRANDE',
        zipCode
      }
    })

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
        image: avatarUrl || undefined
      }
    })

    // Atualizar perfil específico baseado no tipo de usuário
    if (session.user.userType === 'SITTER') {
      await prisma.sitter.update({
        where: { userId: session.user.id },
        data: {
          name,
          email,
          phone,
          addressId: address.id,
          bio: bio || null,
          experience: experience || null,
          hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
          avatar: avatarUrl || undefined
        }
      })
    } else if (session.user.userType === 'OWNER') {
      await prisma.owner.update({
        where: { userId: session.user.id },
        data: {
          name,
          email,
          phone,
          addressId: address.id,
          avatar: avatarUrl || undefined
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: "Perfil atualizado com sucesso",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        userType: updatedUser.userType
      },
      avatar: avatarUrl
    })

  } catch (error) {
    console.error("Erro ao atualizar perfil:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
