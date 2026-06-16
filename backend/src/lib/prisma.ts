// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Previne múltiplas instâncias do Prisma Client em desenvolvimento (Hot Reloading)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'], // Útil para ver o SQL gerado no console
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma