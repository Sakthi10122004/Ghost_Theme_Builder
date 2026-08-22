import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:dev.db';
}

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient>;
};

// Pass the configuration object directly to the adapter
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL,
} as any);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;