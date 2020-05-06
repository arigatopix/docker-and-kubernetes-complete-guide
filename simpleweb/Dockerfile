# Specify a base image
FROM node:alpine

# Copy file in work directory to container
COPY . .

# Install some dependencies
RUN npm install

# Default command
CMD ["npm", "start"]