import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Pakuuto',
      email: 'pakuuto@prisma.io',
      avatarUrl: "http://github.com/victornoleto.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Pakuuto Pool",
      code: "PAK123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    },
  });
  
  await prisma.game.create({
    data: {
      date: '2022-11-13T14:03:53.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'FR',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-15T14:03:53.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 2,

          participants: {
            connect : {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })


}

main();
