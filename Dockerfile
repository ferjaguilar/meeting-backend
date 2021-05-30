# Pull image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

# Add app to container
COPY . /usr/src/app

RUN npm run build

# Start App
CMD [ "npm", "run", "start" ]