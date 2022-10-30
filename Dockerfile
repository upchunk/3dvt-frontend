# Stage 1
# Build react app using Node image as the builder
FROM node:lts-alpine AS builder
WORKDIR /react
ENV PATH /react/node_modules/.bin:$PATH
ENV MODE='server'
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
FROM linuxserver/swag:latest

ENV PUID=1000
ENV PGID=1000
ENV TZ=Asia/Jakarta
ENV URL=3dvtusg.com
ENV SUBDOMAINS=www
ENV VALIDATION=http
ENV EMAIL=prabuega55@gmail.com
ENV STAGING=false

# Copy server configuration to SWAG conf folder
COPY ./nginx/default.conf /config/nginx/site-confs/default.conf
# Copy React App Build folder to SWAG www folder
COPY --from=builder /react/build /config/www/react