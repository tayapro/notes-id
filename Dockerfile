# Use an node:14 image from DockerHub as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy required files to the image
COPY index.js .
COPY keys.js .
COPY package-lock.json .
COPY package.json .
COPY models/user.js ./models/user.js 

# run npm command, which looks for package-lock.json and install all deps from where
# as result directory node_modules will be created
RUN npm install

# Make port available to the world outside this container
EXPOSE 3001

# Run npm start command when the container launches
CMD ["npm", "start"]
