FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY prisma ./prisma/
COPY prisma.config.ts ./prisma.config.ts

RUN npx prisma generate

COPY dist ./dist

EXPOSE 3000

CMD [ "sh" , "-c" , "npx prisma migrate deploy && node dist/src/main.js" ]