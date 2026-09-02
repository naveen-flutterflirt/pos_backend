# Stage 1: Build
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy production dependencies (including prisma generated files)
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copy built application
COPY --from=builder /usr/src/app/dist ./dist

# Expose port (default NestJS port is 5001 from .env, but usually platforms inject PORT)
EXPOSE 5001

# Start the application
CMD [ "npm", "run", "start:prod" ]
