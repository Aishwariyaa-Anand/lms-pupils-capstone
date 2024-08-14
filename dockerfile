# Base image with dependencies
FROM --platform=$BUILDPLATFORM node:lts-alpine as base

RUN apk add --no-cache \
    xvfb-run \
    libx11 \
    libxkbcommon \
    libxcomposite \
    libxdamage \
    libxrandr \
    libxtst \
    gtk+3.0 \
    libnss3 \
    alsa-lib \
    dbus \
    ttf-freefont

WORKDIR /app

COPY package*.json /app/
EXPOSE 4000

# Production stage
FROM base as production
ENV NODE_ENV=production
RUN npm install
COPY . /app
CMD ["node", "index.js"]

# Development stage
FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /app
CMD ["npm", "run", "start"]
