# Use the official Node.js image
FROM node:14

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
EXPOSE 4002

# Start the application
CMD ["npm", "run", "start:prod"]
