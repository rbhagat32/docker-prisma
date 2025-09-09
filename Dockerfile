FROM node:alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
# RUN npx prisma migrate dev --name init
COPY . .
RUN npm run build
EXPOSE 4000
# CMD ["npm", "start"]
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
