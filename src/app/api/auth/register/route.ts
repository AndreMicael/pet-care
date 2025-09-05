import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@/generated/prisma"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, phone, userType, bio, experience, hourlyRate } = body

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe com este email" },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userType: userType.toUpperCase(),
        emailVerified: new Date(),
      }
    })

    // Criar endereço padrão (será atualizado posteriormente)
    const defaultAddress = await prisma.address.upsert({
      where: { 
        street_number_city: {
          street: "Endereço não informado",
          number: "0",
          city: "CUIABA"
        }
      },
      update: {},
      create: {
        street: "Endereço não informado",
        number: "0",
        neighborhood: "Não informado",
        city: "CUIABA",
        zipCode: "78000-000"
      }
    })

    // Criar perfil específico baseado no tipo
    if (userType === "owner") {
      await prisma.owner.create({
        data: {
          userId: user.id,
          name,
          email,
          phone,
          addressId: defaultAddress.id,
        }
      })
    } else if (userType === "sitter") {
      await prisma.sitter.create({
        data: {
          userId: user.id,
          name,
          email,
          phone,
          addressId: defaultAddress.id,
          bio: bio || "",
          experience: experience || "",
          hourlyRate: hourlyRate ? parseFloat(hourlyRate.toString()) : null,
        }
      })
    }

    return NextResponse.json(
      { 
        message: "Usuário criado com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Erro no cadastro:", error)
    console.error("Detalhes do erro:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error.message },
      { status: 500 }
    )
  }
}
