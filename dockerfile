# Base image with dependencies
FROM --platform=$BUILDPLATFORM node:lts-alpine as base

RUN apt-get update && apt-get install -y \
    xvfb \
    libgtk2.0-0 \
    libx11-xcb1 \
    libnss3 \
    libgbm-dev \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxtst6 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

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
