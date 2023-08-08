# Stage 1
# Build react app using Node image as the builder
FROM node:lts-alpine AS builder
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

# Stage 2
# Nginx image for serving the assets
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d

COPY --from=builder /react/build /var/www/react

# Copy Policy Privacy and TOC pages
COPY additional_pages/privacy.html /var/www/react
COPY additional_pages/toc.html /var/www/react