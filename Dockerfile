FROM node:lts-alpine3.15
WORKDIR /react
COPY . .
RUN npm install
RUN npm run build