FROM node:23-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

USER node

CMD ["bash"]