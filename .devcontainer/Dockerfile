FROM node:23-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

USER node

CMD ["npm", "run", "dev"]