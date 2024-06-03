# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install

# Copy the source code.
COPY . .

# Expose the port.
EXPOSE 4000

# Run the application.
CMD ["npm", "start"]
