
# Use a lightweight Node.js image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first for better build caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application code
COPY . .

# Document the port used by the application
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
