# Specify a base image
FROM node:alpine

# Specific work directory in Container
WORKDIR /usr/app

# Copy file in local work directory to container
COPY . .

# Install some dependencies
RUN npm install

# Default command
CMD ["npm", "start"]