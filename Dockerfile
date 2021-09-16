FROM node:latest

WORKDIR /app/

COPY package*.json .
COPY .npmrc ./.npmrc

RUN npm ci

COPY . .

RUN npm run build
CMD ["npm", "start"]