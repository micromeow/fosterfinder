import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: process.env.MASTER_ADMIN_ID,
      username: 'master-admin',
    },
  });
  await prisma.animal.createMany({
    data: [
      {
        name: 'Pip',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Bo',
        birthday: new Date(),
        category: 'Cat',
        status: 'Adopted',
      },
      {
        name: 'Bartholomew',
        birthday: new Date(),
        category: 'Cat',
        status: 'Pre-adoption',
      },
      {
        name: 'Oliver',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Buddy',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Max',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Rocky',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Jake',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Jack',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Toby',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Cody',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Buster',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Duke',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Cooper',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Riley',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Harley',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Bear',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Tucker',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Murphy',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Lucky',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Sam',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
      {
        name: 'Zeus',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Teddy',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'Winston',
        birthday: new Date(),
        category: 'Dog',
        status: 'Available',
      },
      {
        name: 'James',
        birthday: new Date(),
        category: 'Cat',
        status: 'Available',
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
