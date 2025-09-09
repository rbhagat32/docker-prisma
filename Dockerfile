# FROM node:alpine
# # not required if using full node image instead of alpine
# RUN apk add --no-cache openssl
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY prisma ./prisma/
# RUN npx prisma generate
# COPY . .
# RUN npm run build
# EXPOSE 4000
# # migrate on run time because there is no database at build time
# CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]




FROM node AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]