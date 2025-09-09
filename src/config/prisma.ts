import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "query"],
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export { prisma };
