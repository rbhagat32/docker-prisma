FROM node:alpine
# not required if using full node image instead of alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
RUN npm run build
EXPOSE 4000
# migrate on run time because there is no database at build time
CMD ["sh", "-c", "npx prisma migrate dev && npm start"]