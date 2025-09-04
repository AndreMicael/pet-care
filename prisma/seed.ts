import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  // Criar especialidades iniciais
  const specialties = [
    {
      name: 'GRANDE_PORTE',
      description: 'Especializado em cães de grande porte'
    },
    {
      name: 'ESPACO_AMPLO',
      description: 'Possui espaço amplo para os pets'
    },
    {
      name: 'VARIOS_DIAS',
      description: 'Aceita hospedagem por vários dias'
    },
    {
      name: 'PASSEIO',
      description: 'Oferece serviços de passeio'
    },
    {
      name: 'DAY_CARE',
      description: 'Oferece day care para pets'
    },
    {
      name: 'APLICA_MEDICACAO',
      description: 'Capacitado para aplicar medicação'
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
      name: 'Visita Domiciliar',
      description: 'Visita na casa do pet'
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
