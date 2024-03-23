import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const seedUsers = () => {
    return prisma.user.createMany({
      data: [
        {
          email: 'eechemane29@gmail.com',
          username: 'eric echemane',
          role: 1,
          verified: true,
          firstName: 'Eric',
          lastName: 'Echemane',
          contactNumber: '08123456789',
        },
      ],
    })
  }

  const seedVehicles = () => {
    return prisma.vehicle.createMany({
      data: [
        {
          model: 'MD F6',
          name: 'Isuzu Truck ZXR',
          photoUrl:
            'https://res.cloudinary.com/dmwjwtg1g/image/upload/v1711165562/loreto/avh6qfq8dswpoomg6plw.jpg',
          plateNumber: 'KJA-1234',
          purchaseDate: new Date('2021-03-29'),
          serviceFeePerHour: 500,
          lastMaintenance: new Date('2022-03-29'),
        },
        {
          model: 'H100',
          name: 'Hyundai Truck',
          photoUrl:
            'https://res.cloudinary.com/dmwjwtg1g/image/upload/v1711165562/loreto/hfrls2roy2efj2k1yffo.webp',
          plateNumber: 'HTA-1234',
          purchaseDate: new Date('2021-01-29'),
          serviceFeePerHour: 200,
          lastMaintenance: new Date('2022-01-29'),
        },
      ],
    })
  }

  await Promise.all([seedUsers(), seedVehicles()])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
