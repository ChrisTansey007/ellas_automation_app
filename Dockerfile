# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Build the React app for production
RUN npm run build

# Install `serve` to serve the app on a container
RUN npm install -g serve

# Define environment variable
ENV PORT 3000

# Run `serve` when the container launches
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the port the app runs on
EXPOSE 3000
