import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL;

    // In dev, usage of GLOBAL prisma instance is critical.
    // We restrict connection limit to 1 to prevent HMR from exhausting the pool.
    const finalUrl = url?.includes('connection_limit')
        ? url
        : `${url}&connection_limit=1&pool_timeout=45`;

    return new PrismaClient({
        datasources: {
            db: {
                url: finalUrl,
            },
        },
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
