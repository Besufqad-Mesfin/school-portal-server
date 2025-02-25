# Use a lightweight Alpine-based Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies more efficiently
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on was here


# Run the application
CMD ["node", "index.js"]
