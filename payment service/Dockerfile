# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the application's port
EXPOSE 4000

# Start the service
CMD ["npm", "start"]
