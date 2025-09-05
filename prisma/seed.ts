import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Criar especialidades iniciais
  const specialties = [
    {
      name: 'Day Care',
      description: 'Oferece day care para pets'
    },
    {
      name: 'Hospedagem',
      description: 'Aceita hospedagem por vários dias'
    },
    {
      name: 'Passeio',
      description: 'Oferece serviços de passeio'
    },
    {
      name: 'Visita em Casa',
      description: 'Visita na casa do pet'
    },
    {
      name: 'Aplicação de Medicação',
      description: 'Capacitado para aplicar medicação'
    },
    {
      name: 'Cães de Grande Porte',
      description: 'Especializado em cães de grande porte'
    },
    {
      name: 'Gatos',
      description: 'Especializado em cuidados com gatos'
    },
    {
      name: 'Pets Idosos',
      description: 'Especializado em pets idosos'
    },
    {
      name: 'Necessidades Especiais',
      description: 'Cuidados especiais para pets com necessidades'
    }
  ]

  console.log('🌱 Iniciando seed das especialidades...')

  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: {},
      create: specialty
    })
    console.log(`✅ Especialidade criada: ${specialty.name}`)
  }

  // Criar tipos de serviço iniciais
  const serviceTypes = [
    {
      name: 'Passeio',
      description: 'Passeio com o pet'
    },
    {
      name: 'Hospedagem',
      description: 'Hospedagem do pet'
    },
    {
      name: 'Day Care',
      description: 'Cuidado durante o dia'
    },
    {
      name: 'Visita em Casa',
      description: 'Visita na casa do pet'
    },
    {
      name: 'Medicação',
      description: 'Aplicação de medicação'
    }
  ]

  console.log('🌱 Iniciando seed dos tipos de serviço...')

  for (const serviceType of serviceTypes) {
    await prisma.serviceType.upsert({
      where: { name: serviceType.name },
      update: {},
      create: serviceType
    })
    console.log(`✅ Tipo de serviço criado: ${serviceType.name}`)
  }

  // Criar serviços
  const services = [
    {
      name: 'Passeio Básico',
      description: 'Passeio de 30 minutos',
      price: 25.00,
      duration: 30,
      serviceTypeName: 'Passeio'
    },
    {
      name: 'Passeio Longo',
      description: 'Passeio de 1 hora',
      price: 40.00,
      duration: 60,
      serviceTypeName: 'Passeio'
    },
    {
      name: 'Day Care - Meio Período',
      description: 'Cuidado por 4 horas',
      price: 50.00,
      duration: 240,
      serviceTypeName: 'Day Care'
    },
    {
      name: 'Day Care - Período Integral',
      description: 'Cuidado por 8 horas',
      price: 80.00,
      duration: 480,
      serviceTypeName: 'Day Care'
    },
    {
      name: 'Hospedagem - 1 Dia',
      description: 'Hospedagem por 24 horas',
      price: 120.00,
      duration: 1440,
      serviceTypeName: 'Hospedagem'
    },
    {
      name: 'Visita Domiciliar',
      description: 'Visita de 1 hora na casa do pet',
      price: 35.00,
      duration: 60,
      serviceTypeName: 'Visita em Casa'
    },
    {
      name: 'Aplicação de Medicação',
      description: 'Aplicação de medicação prescrita',
      price: 20.00,
      duration: 15,
      serviceTypeName: 'Medicação'
    }
  ]

  console.log('🌱 Iniciando seed dos serviços...')

  for (const service of services) {
    const serviceType = await prisma.serviceType.findUnique({
      where: { name: service.serviceTypeName }
    })

    if (serviceType) {
      await prisma.service.upsert({
        where: { 
          id: `${service.name}-${serviceType.id}`
        },
        update: {},
        create: {
          id: `${service.name}-${serviceType.id}`,
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          serviceTypeId: serviceType.id
        }
      })
      console.log(`✅ Serviço criado: ${service.name}`)
    }
  }

  // Criar cuidadores (sitters)
  const sitters = [
    {
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(65) 99999-1111',
      address: {
        street: 'Rua das Flores',
        number: '123',
        city: 'CUIABA',
        zipCode: '78000-000',
        neighborhood: 'Centro',
        complement: 'Apto 45',
        latitude: -15.6014,
        longitude: -56.0979
      },
      bio: 'Sou apaixonada por animais desde criança e tenho mais de 5 anos de experiência cuidando de pets de todos os tamanhos. Ofereço um ambiente seguro, carinhoso e divertido para seu companheiro.',
      experience: '5 anos de experiência com pets',
      rating: 4.8,
      totalReviews: 127,
      hourlyRate: 45.00,
      specialties: ['Day Care', 'Hospedagem', 'Passeio', 'Cães de Grande Porte']
    },
    {
      name: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      phone: '(65) 99999-2222',
      address: {
        street: 'Av. Fernando Corrêa da Costa',
        number: '456',
        city: 'CUIABA',
        zipCode: '78000-000',
        neighborhood: 'Boa Esperança',
        complement: 'Sala 12',
        latitude: -15.6014,
        longitude: -56.0979
      },
      bio: 'Veterinário com 7 anos de experiência, especializado em cuidados domiciliares e emergências. Atendo 24 horas por dia, 7 dias por semana.',
      experience: '7 anos como veterinário',
      rating: 4.9,
      totalReviews: 89,
      hourlyRate: 60.00,
      specialties: ['Aplicação de Medicação', 'Necessidades Especiais', 'Pets Idosos', 'Hospedagem']
    },
    {
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '(65) 99999-3333',
      address: {
        street: 'Rua dos Pássaros',
        number: '789',
        city: 'VARZEA_GRANDE',
        zipCode: '78100-000',
        neighborhood: 'Centro',
        complement: 'Casa 2',
        latitude: -15.6467,
        longitude: -56.1325
      },
      bio: 'Especialista em cuidados com gatos e pets idosos. Tenho experiência com animais que precisam de atenção especial e medicação.',
      experience: '4 anos com gatos e pets idosos',
      rating: 4.7,
      totalReviews: 156,
      hourlyRate: 40.00,
      specialties: ['Gatos', 'Pets Idosos', 'Necessidades Especiais', 'Visita em Casa']
    },
    {
      name: 'João Costa',
      email: 'joao.costa@email.com',
      phone: '(65) 99999-4444',
      address: {
        street: 'Rua dos Cães',
        number: '321',
        city: 'CUIABA',
        zipCode: '78000-000',
        neighborhood: 'Porto',
        complement: 'Apto 78',
        latitude: -15.6014,
        longitude: -56.0979
      },
      bio: 'Especialista em passeios e exercícios para cães ativos. Trabalho principalmente com raças grandes que precisam de muita atividade física.',
      experience: '3 anos como dog walker',
      rating: 4.6,
      totalReviews: 78,
      hourlyRate: 35.00,
      specialties: ['Passeio', 'Cães de Grande Porte', 'Day Care']
    },
    {
      name: 'Lucia Ferreira',
      email: 'lucia.ferreira@email.com',
      phone: '(65) 99999-5555',
      address: {
        street: 'Rua das Árvores',
        number: '654',
        city: 'VARZEA_GRANDE',
        zipCode: '78100-000',
        neighborhood: 'Jardim Glória',
        complement: 'Casa 5',
        latitude: -15.6467,
        longitude: -56.1325
      },
      bio: 'Cuidadora especializada em pets idosos e com necessidades especiais. Ofereço serviços de fisioterapia e cuidados médicos básicos.',
      experience: '6 anos com pets especiais',
      rating: 4.8,
      totalReviews: 94,
      hourlyRate: 50.00,
      specialties: ['Pets Idosos', 'Necessidades Especiais', 'Aplicação de Medicação', 'Hospedagem']
    }
  ]

  console.log('🌱 Iniciando seed dos cuidadores...')

  for (const sitterData of sitters) {
    // Criar usuário primeiro
    const user = await prisma.user.upsert({
      where: { email: sitterData.email },
      update: {},
      create: {
        name: sitterData.name,
        email: sitterData.email,
        userType: 'SITTER',
        emailVerified: new Date()
      }
    })

      // Criar endereço
  const address = await prisma.address.upsert({
    where: { 
      street_number_city: {
        street: sitterData.address.street,
        number: sitterData.address.number,
        city: sitterData.address.city as 'CUIABA' | 'VARZEA_GRANDE'
      }
    },
    update: {},
    create: {
      street: sitterData.address.street,
      number: sitterData.address.number,
      complement: sitterData.address.complement,
      neighborhood: sitterData.address.neighborhood,
      city: sitterData.address.city as 'CUIABA' | 'VARZEA_GRANDE',
      zipCode: sitterData.address.zipCode,
      latitude: sitterData.address.latitude,
      longitude: sitterData.address.longitude
    }
  })

  // Criar sitter
  const sitter = await prisma.sitter.upsert({
    where: { email: sitterData.email },
    update: {},
    create: {
      userId: user.id,
      name: sitterData.name,
      email: sitterData.email,
      phone: sitterData.phone,
      addressId: address.id,
      bio: sitterData.bio,
      experience: sitterData.experience,
        rating: sitterData.rating,
        totalReviews: sitterData.totalReviews,
        hourlyRate: sitterData.hourlyRate
      }
    })

    // Endereço já está incluído no campo address do sitter

    // Associar especialidades ao cuidador
    for (const specialtyName of sitterData.specialties) {
      const specialty = await prisma.specialty.findUnique({
        where: { name: specialtyName }
      })

      if (specialty) {
        await prisma.sitterSpecialty.upsert({
          where: {
            sitterId_specialtyId: {
              sitterId: sitter.id,
              specialtyId: specialty.id
            }
          },
          update: {},
          create: {
            sitterId: sitter.id,
            specialtyId: specialty.id
          }
        })
      }
    }

    console.log(`✅ Cuidador criado: ${sitterData.name}`)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
