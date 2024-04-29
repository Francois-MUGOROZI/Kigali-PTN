# Get NPM packages
FROM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Get Production node packages
FROM node:18-alpine AS proddependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev


# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=proddependencies /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
