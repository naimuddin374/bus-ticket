# Use the official Node.js image
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the project
RUN npm run build

# Expose the port
EXPOSE 4003

# Start the application
CMD ["npm", "run", "start:prod"]
