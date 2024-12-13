import { PrismaClient } from "@prisma/client";

let prismaDB: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaDB = new PrismaClient()
} else {
    prismaDB = new PrismaClient()
    prismaDB.$connect()
}

export { prismaDB }
