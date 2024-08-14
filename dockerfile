# Base image with dependencies
FROM --platform=$BUILDPLATFORM node:lts-alpine as base

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
    xvfb 


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
