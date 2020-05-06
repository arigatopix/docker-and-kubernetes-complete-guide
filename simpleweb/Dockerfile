# Specify a base image
FROM node:alpine

# Specific work directory in Container
WORKDIR /usr/app

# Copy only package.json to container
COPY ./package.json .

# Install some dependencies
RUN npm install

# Copy file in local work directory to container
COPY . .

# Default command
CMD ["npm", "start"]