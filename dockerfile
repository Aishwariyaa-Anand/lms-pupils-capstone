# Base image with dependencies
FROM node:21-focal AS base

# Set environment variables to avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install required packages
RUN apt-get update && apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json /app/
EXPOSE 4000

# Production stage
FROM base AS production
ENV NODE_ENV=production
RUN npm install
COPY . /app
CMD ["node", "index.js"]

# Development stage
FROM base AS dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /app
CMD ["npm", "run", "start"]
