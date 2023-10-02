FROM node:18-alpine as builder

ENV NODE_ENV build

USER root
WORKDIR /app

COPY . /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install \
    && npm run build \
    && npm prune --production

EXPOSE 3000

CMD ["node", "dist/src/main.js"]