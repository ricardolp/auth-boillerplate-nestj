import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const prisma = new PrismaClient()

async function main() {
    const check = await prisma.user.findUnique({ where: { email: 'admin@admin.io' }})

    if(check) return;

    const user = await prisma.user.upsert({
        where: { email: 'admin@admin.io' },
        update: {},
        create: {
            id: randomUUID(),
            first_name: 'Admin',
            last_name: '',
            password: '123456',
            email: 'admin@admin.io'
        },
    })

    console.log('Usuário Admin criado com sucesso!')
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