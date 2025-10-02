import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

prisma
  .$connect()
  .then(() => {
    console.log("Connected to Postgres !");
  })
  .catch((e) => {
    console.error("Error connecting to Postgres", e);
    process.exit(1);
  });

export { prisma };
