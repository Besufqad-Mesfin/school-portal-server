# Use the official Node.js image based on Alpine Linux
FROM node:alpine

# Install bash
RUN apk add --no-cache bash

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install the dependencies specified in package.json
RUN npm install

# Copy all the files from the current directory to the working directory
COPY . .

# Copy the wait-for-it script
COPY wait-for-it.sh .

# Specify the command to run the application
CMD ["./wait-for-it.sh", "mysql-container:3306", "--", "npm", "start"]