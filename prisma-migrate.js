const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE Project ADD COLUMN customSettings TEXT NOT NULL DEFAULT '[]'`);
    console.log("Added customSettings to Project");
  } catch (e) { console.log(e.message); }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE Project ADD COLUMN routing TEXT NOT NULL DEFAULT '{}'`);
    console.log("Added routing to Project");
  } catch (e) { console.log(e.message); }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE Page ADD COLUMN isCollection BOOLEAN NOT NULL DEFAULT 0`);
    console.log("Added isCollection to Page");
  } catch (e) { console.log(e.message); }

  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE Page ADD COLUMN collectionFilter TEXT NOT NULL DEFAULT ''`);
    console.log("Added collectionFilter to Page");
  } catch (e) { console.log(e.message); }
}

main().finally(() => prisma.$disconnect());
