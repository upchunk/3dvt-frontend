FROM node:lts-alpine
WORKDIR /react
ENV PATH /react/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@latest
RUN npm install --omit=dev
COPY ./build ./build
COPY ./src ./src
COPY ./public ./public
RUN npm dedupe
RUN npm prune
RUN npm run build