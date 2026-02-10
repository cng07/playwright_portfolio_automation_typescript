# Use official Playwright image with all browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install Playwright browsers (already included in base image, but ensuring latest)
RUN npx playwright install --with-deps

# Create directories for reports and results
RUN mkdir -p playwright-report test-results

# Set environment variables for headless execution
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Default command - can be overridden in Jenkins or docker-compose
CMD ["npx", "playwright", "test"]
