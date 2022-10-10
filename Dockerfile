FROM node:lts-alpine3.15
WORKDIR /react
COPY . .
RUN npm run build