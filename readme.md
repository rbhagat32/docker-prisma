## Steps to use Prisma

1. Install Prisma CLI as a dev dependency:

```bash
npm install prisma --save-dev
```

2. Initialize Prisma in your project:

```bash
npx prisma init --datasource-provider postgresql
```

3. Configure your database connection in the `.env` file:

```env
DATABASE_URL="your_database_url"
```

4. Define your data model in the `prisma/schema.prisma` file:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    String @id @default(uuid())
  email String @unique
  name  String
}
```

5. Run the following command to create the database and generate the Prisma Client:

```bash
npx prisma migrate dev --name init
```

6. Use the Prisma Client in `src/config/prisma.ts` file:

```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```
