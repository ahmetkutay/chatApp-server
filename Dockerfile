# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application's code to the working directory
COPY . .

# Install the application's dependencies inside the container
RUN npm install

# Make port 3000 available outside the container
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:dev"]